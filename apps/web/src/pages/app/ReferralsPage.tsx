import React, { useEffect, useState } from 'react';
import { Users, Copy, Share2, Network } from 'lucide-react';
import { ReferralService, ReferralNode } from '../../lib/referralService';
import { supabase } from '../../lib/supabaseClient';
import { PremiumLoader } from '../../components/PremiumLoader';

export function ReferralsPage() {
  const [network, setNetwork] = useState<ReferralNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [refCode, setRefCode] = useState('');
  const [totalNetworkEarnings, setTotalNetworkEarnings] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // 1) Código de referido
      const code = await ReferralService.getMyReferralCode();
      setRefCode(code || '');

      // 2) Árbol de red
      const data = await ReferralService.getNetwork();
      setNetwork(data || null);

      // 3) Comisiones desde profiles
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profileRow } = await supabase
          .from('profiles')
          .select('referral_earnings')
          .eq('id', user.id)
          .single();

        setTotalNetworkEarnings(Number(profileRow?.referral_earnings || 0));
      } else {
        setTotalNetworkEarnings(0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    if (!refCode) return;
    const link = `${window.location.origin}/register?ref=${refCode}`;
    navigator.clipboard.writeText(link);
    alert('Enlace copiado');
  };

  // Contar miembros totales (sin incluir al root)
  function getTotalMembers(node: ReferralNode | null): number {
    if (!node) return 0;
    let total = node.children ? node.children.length : 0;
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        total += getTotalMembers(child);
      }
    }
    return total;
  }

  const totalMembers = getTotalMembers(network);

  // --- COMPONENTE RECURSIVO DE NODO (ÁRBOL VERTICAL, SIN SCROLL HORIZONTAL) ---
  const NodeCard = ({ node, isRoot }: { node: ReferralNode; isRoot?: boolean }) => (
    <div className="lp-ref-node">
      <div className={`lp-ref-node-card ${isRoot ? 'is-root' : ''}`}>
        <div className="lp-ref-node-avatar">
          {node.avatar_url ? (
            <img
              src={node.avatar_url}
              alt={node.username || 'user'}
            />
          ) : (
            <div className="lp-ref-node-avatar-fallback">
              {(node.username || '?')[0]?.toUpperCase?.() || '?'}
            </div>
          )}
        </div>
        <div className="lp-ref-node-text">
          <span className="lp-ref-node-username">@{node.username}</span>
          <span className="lp-ref-node-earnings">
            €{Number(node.total_earnings || 0).toFixed(2)}
          </span>
        </div>

        {!isRoot && (
          <span className={`lp-ref-node-badge lp-ref-node-badge-l${node.level}`}>
            {node.level === 1 ? '10%' : '5%'}
          </span>
        )}
      </div>

      {node.children && node.children.length > 0 && (
        <div className="lp-ref-children">
          {node.children.map((child) => (
            <div key={child.id} className="lp-ref-child-branch">
              <div className="lp-ref-branch-line" />
              <NodeCard node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (loading) {
    return <PremiumLoader size="medium" text="REFERIDOS" subtext="Cargando tu red..." />;
  }

  return (
    <div className="lp-ref-shell lp-ref-bg">
      <style>{refStyles}</style>
      <div className="lp-ref-inner animate-enter">
        {/* HEADER */}
        <header className="lp-ref-header">
          <div className="lp-ref-chip">
            <span className="lp-ref-chip-dot" />
            CREATOR NETWORK
          </div>
          <h1>
            <Network size={20} />
            Creator referrals
          </h1>
          <p>
            Construye tu propia red de creadores. Ganas un{' '}
            <strong>10%</strong> de tus invitados directos y un{' '}
            <strong>5%</strong> de lo que generen sus invitados.
          </p>

          <div className="lp-ref-kpis">
            <div className="lp-ref-kpi">
              <span className="lp-ref-kpi-label">Comisiones acumuladas</span>
              <div className="lp-ref-kpi-value">
                <span className="lp-ref-kpi-currency">€</span>
                <span>{totalNetworkEarnings.toFixed(4)}</span>
              </div>
            </div>
            <div className="lp-ref-kpi">
              <span className="lp-ref-kpi-label">Miembros en tu red</span>
              <div className="lp-ref-kpi-value lp-ref-kpi-members">
                <Users size={18} />
                <span>{totalMembers}</span>
              </div>
            </div>
          </div>
        </header>

        {/* ENLACE DE INVITACIÓN */}
        <section className="lp-ref-card lp-ref-invite">
          <div className="lp-ref-invite-left">
            <div className="lp-ref-invite-icon">
              <Share2 size={18} />
            </div>
            <div>
              <h3>Tu enlace único de invitación</h3>
              <p>
                Copia tu enlace y compártelo con otros creadores. Cada euro que
                generen queda conectado a tu red.
              </p>
            </div>
          </div>

          <div className="lp-ref-invite-right">
            <div className="lp-ref-link-box">
              <span className="lp-ref-link-text">
                {refCode
                  ? `${window.location.origin}/register?ref=${refCode}`
                  : 'Generando enlace...'}
              </span>
              <button
                type="button"
                onClick={copyLink}
                disabled={!refCode}
                className="lp-ref-copy-btn"
              >
                <Copy size={14} />
                Copiar
              </button>
            </div>
          </div>
        </section>

        {/* ÁRBOL / LISTA DE RED */}
        <section className="lp-ref-card lp-ref-network-card">
          <div className="lp-ref-network-header">
            <div className="lp-ref-network-icon">
              <Network size={16} />
            </div>
            <div>
              <h3>Mapa de tu red</h3>
              <p>
                Visualiza la estructura de tu red de referidos en vertical. Cada
                nivel baja un escalón.
              </p>
            </div>
          </div>

          {!network ? (
            <div className="lp-ref-empty">
              <p className="lp-ref-empty-title">Todavía no tienes invitados.</p>
              <p className="lp-ref-empty-sub">
                Comparte tu enlace de invitación y el árbol se irá llenando
                automáticamente con cada nuevo creador.
              </p>
            </div>
          ) : (
            <div className="lp-ref-tree-wrapper">
              <NodeCard node={network} isRoot />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* =============== ESTILOS REFERIDOS =============== */

const refStyles = `
  .lp-ref-spin {
    animation: lp-ref-spin 1s linear infinite;
  }
  @keyframes lp-ref-spin { 100% { transform: rotate(360deg); } }

  .lp-ref-bg {
    min-height: 100dvh;
    background:
      radial-gradient(circle at 0% 0%, #1e3a8a 0, transparent 55%),
      radial-gradient(circle at 100% 100%, #020617 0, #000 65%);
    background-color: #020617;
    position: relative;
    overflow: hidden;
  }

  .lp-ref-bg::before,
  .lp-ref-bg::after {
    content: "";
    position: absolute;
    inset: -40%;
    background:
      radial-gradient(circle at 10% 0%, rgba(56,189,248,0.16), transparent 60%),
      radial-gradient(circle at 90% 100%, rgba(129,140,248,0.18), transparent 55%);
    opacity: 0.9;
    filter: blur(26px);
    pointer-events: none;
  }
  .lp-ref-bg::after {
    background:
      radial-gradient(circle at 0% 100%, rgba(34,197,94,0.2), transparent 55%),
      radial-gradient(circle at 100% 0%, rgba(79,70,229,0.18), transparent 55%);
    mix-blend-mode: screen;
    animation: lp-ref-orbit 32s linear infinite;
  }
  @keyframes lp-ref-orbit {
    0% { transform: rotate(0deg) scale(1.02); }
    100% { transform: rotate(360deg) scale(1.02); }
  }

  .lp-ref-shell {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding-top: env(safe-area-inset-top, 0);
    padding-bottom: env(safe-area-inset-bottom, 0);
    z-index: 1;
  }

  /* respetar sidebar en escritorio */
  @media (min-width: 769px) {
    .lp-ref-shell {
      left: 260px;
    }
  }

  .lp-ref-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1080px;
    padding: 24px 16px 110px 16px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    color: #e5e7eb;
  }

  .lp-ref-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100dvh;
    width: 100%;
  }

  .lp-ref-header {
    text-align: center;
    margin-bottom: 24px;
  }

  .lp-ref-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 999px;
    background: radial-gradient(circle at 0% 0%, rgba(37,99,235,0.9), rgba(15,23,42,0.98));
    border: 1px solid rgba(191,219,254,0.8);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #e5e7eb;
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 0 24px rgba(79,70,229,0.9);
    margin: 0 auto 10px;
    animation: lp-ref-chip-glow 4.2s ease-in-out infinite;
  }

  .lp-ref-chip-dot {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.3);
  }

  @keyframes lp-ref-chip-glow {
    0%,100% {
      box-shadow:
        0 0 0 1px rgba(15,23,42,1),
        0 0 18px rgba(79,70,229,0.6);
    }
    50% {
      box-shadow:
        0 0 0 1px rgba(129,140,248,1),
        0 0 28px rgba(129,140,248,1);
    }
  }

  .lp-ref-header h1 {
    margin: 0;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -0.04em;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #f9fafb;
  }

  .lp-ref-header h1 svg {
    color: #a5b4fc;
  }

  .lp-ref-header p {
    margin: 8px auto 0;
    max-width: 520px;
    font-size: 13px;
    color: #9ca3af;
  }

  .lp-ref-kpis {
    margin-top: 18px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }

  .lp-ref-kpi {
    min-width: 180px;
    border-radius: 16px;
    padding: 10px 12px;
    border: 1px solid rgba(148,163,184,0.8);
    background: radial-gradient(circle at top, rgba(15,23,42,0.99), rgba(15,23,42,0.97));
    box-shadow:
      0 16px 38px rgba(0,0,0,0.9),
      0 0 0 1px rgba(15,23,42,0.9);
  }

  .lp-ref-kpi-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #9ca3af;
  }

  .lp-ref-kpi-value {
    margin-top: 4px;
    display: flex;
    align-items: baseline;
    gap: 4px;
    font-weight: 800;
    color: #f9fafb;
  }

  .lp-ref-kpi-currency {
    font-size: 16px;
    color: #a5b4fc;
  }

  .lp-ref-kpi-value span:last-child {
    font-size: 20px;
    font-variant-numeric: tabular-nums;
  }

  .lp-ref-kpi-members {
    font-size: 18px;
    gap: 6px;
  }

  .lp-ref-kpi-members svg {
    color: #a5b4fc;
  }

  /* CARD GENÉRICA */
  .lp-ref-card {
    position: relative;
    border-radius: 22px;
    border: 1px solid rgba(148,163,184,0.7);
    background: radial-gradient(circle at top, rgba(15,23,42,0.99), rgba(15,23,42,0.97));
    box-shadow:
      0 20px 55px rgba(0,0,0,1),
      0 0 0 1px rgba(15,23,42,0.9);
    padding: 18px 16px 18px;
    overflow: hidden;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    margin-bottom: 16px;
  }

  .lp-ref-card::before {
    content: "";
    position: absolute;
    inset: -120px;
    background:
      radial-gradient(circle at 0% 0%, rgba(59,130,246,0.28), transparent 55%),
      radial-gradient(circle at 120% 120%, rgba(129,140,248,0.18), transparent 55%);
    opacity: 0.75;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  .lp-ref-card > * {
    position: relative;
    z-index: 1;
  }

  /* INVITACIÓN */
  .lp-ref-invite {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    align-items: center;
  }

  .lp-ref-invite-left {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1 1 220px;
    min-width: 0;
  }

  .lp-ref-invite-icon {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(37,99,235,0.15);
    border: 1px solid rgba(129,140,248,0.9);
    color: #bfdbfe;
    box-shadow:
      0 10px 26px rgba(15,23,42,0.9),
      0 0 0 1px rgba(15,23,42,1);
  }

  .lp-ref-invite-left h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 800;
    color: #f9fafb;
  }

  .lp-ref-invite-left p {
    margin: 2px 0 0 0;
    font-size: 12px;
    color: #9ca3af;
  }

  .lp-ref-invite-right {
    flex: 1 1 260px;
    min-width: 0;
  }

  .lp-ref-link-box {
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 999px;
    border: 1px solid rgba(148,163,184,0.8);
    background: rgba(15,23,42,0.96);
    padding: 6px 6px 6px 12px;
  }

  .lp-ref-link-text {
    flex: 1;
    min-width: 0;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    font-size: 12px;
    color: #e5e7eb;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lp-ref-copy-btn {
    border: none;
    border-radius: 999px;
    padding: 7px 10px;
    font-size: 11px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: radial-gradient(circle at 0% 0%, rgba(79,70,229,0.95), rgba(15,23,42,1));
    color: #f9fafb;
    cursor: pointer;
    box-shadow:
      0 0 0 1px rgba(191,219,254,0.9),
      0 14px 38px rgba(15,23,42,1);
    transition: transform 0.16s ease, box-shadow 0.16s ease, opacity 0.16s ease;
  }

  .lp-ref-copy-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .lp-ref-copy-btn:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow:
      0 0 0 1px rgba(221,239,254,1),
      0 20px 50px rgba(15,23,42,1);
  }

  /* NETWORK CARD */
  .lp-ref-network-card {
    margin-top: 4px;
  }

  .lp-ref-network-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .lp-ref-network-icon {
    width: 30px;
    height: 30px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 30% 0, #6366f1, #1e293b);
    color: #e0e7ff;
    box-shadow:
      0 14px 30px rgba(15,23,42,0.95),
      0 0 0 1px rgba(15,23,42,1);
  }

  .lp-ref-network-header h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 800;
    color: #f9fafb;
  }

  .lp-ref-network-header p {
    margin: 2px 0 0 0;
    font-size: 12px;
    color: #9ca3af;
  }

  .lp-ref-tree-wrapper {
    margin-top: 6px;
    padding-top: 4px;
  }

  /* VACÍO */
  .lp-ref-empty {
    border-radius: 16px;
    border: 1px dashed rgba(148,163,184,0.7);
    background: rgba(15,23,42,0.98);
    padding: 18px 14px;
    text-align: center;
  }

  .lp-ref-empty-title {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 600;
    color: #e5e7eb;
  }

  .lp-ref-empty-sub {
    margin: 0;
    font-size: 11px;
    color: #9ca3af;
  }

  /* ÁRBOL VERTICAL */
  .lp-ref-node {
    position: relative;
    padding-left: 14px;
  }

  /* línea vertical izquierda */
  .lp-ref-node::before {
    content: "";
    position: absolute;
    left: 6px;
    top: 22px;
    bottom: 0;
    width: 2px;
    background: rgba(148,163,184,0.6);
    opacity: 0.6;
  }

  .lp-ref-node-card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 14px;
    padding: 8px 10px;
    margin-bottom: 8px;
    background: rgba(15,23,42,0.98);
    border: 1px solid rgba(148,163,184,0.8);
    box-shadow:
      0 10px 26px rgba(15,23,42,0.95),
      0 0 0 1px rgba(15,23,42,1);
  }

  .lp-ref-node-card.is-root {
    border-color: rgba(129,140,248,0.95);
    box-shadow:
      0 0 0 1px rgba(129,140,248,1),
      0 0 30px rgba(79,70,229,0.9);
  }

  .lp-ref-node-avatar {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    overflow: hidden;
    border: 1px solid rgba(148,163,184,0.8);
    flex-shrink: 0;
  }

  .lp-ref-node-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .lp-ref-node-avatar-fallback {
    width: 100%;
    height: 100%;
    background: rgba(30,64,175,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    color: #e5e7eb;
  }

  .lp-ref-node-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .lp-ref-node-username {
    font-size: 12px;
    font-weight: 700;
    color: #e5e7eb;
  }

  .lp-ref-node-earnings {
    font-size: 11px;
    color: #a5b4fc;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
  }

  .lp-ref-node-badge {
    position: absolute;
    top: 6px;
    right: 8px;
    border-radius: 999px;
    padding: 2px 6px;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #f9fafb;
  }

  .lp-ref-node-badge-l1 {
    background: rgba(79,70,229,0.9);
    border: 1px solid rgba(191,219,254,0.9);
  }

  .lp-ref-node-badge-l2 {
    background: rgba(16,185,129,0.9);
    border: 1px solid rgba(187,247,208,0.9);
  }

  .lp-ref-children {
    margin-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-bottom: 4px;
  }

  .lp-ref-child-branch {
    position: relative;
  }

  .lp-ref-branch-line {
    position: absolute;
    left: -12px;
    top: 16px;
    width: 12px;
    height: 2px;
    background: rgba(148,163,184,0.7);
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .lp-ref-shell { left: 0; }
    .lp-ref-inner {
      max-width: 100%;
      padding: 20px 16px 140px 16px;
    }
    .lp-ref-invite {
      align-items: flex-start;
    }
    .lp-ref-link-box {
      border-radius: 16px;
      padding: 10px 10px 10px 14px;
    }
    .lp-ref-copy-btn {
      padding: 10px 14px;
      font-size: 12px;
      min-height: 44px;
    }
    .lp-ref-card {
      padding: 16px 14px;
    }
  }
`;
