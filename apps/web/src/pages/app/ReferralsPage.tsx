import React, { useEffect, useState } from 'react';
import { Users, Copy, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { ReferralService, ReferralNode } from '../../lib/referralService';
import { supabase } from '../../lib/supabaseClient';
import { PremiumLoader } from '../../components/PremiumLoader';
import '../../styles/PremiumBackground.css';

export function ReferralsPage() {
  const [network, setNetwork] = useState<ReferralNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [refCode, setRefCode] = useState('');
  const [totalNetworkEarnings, setTotalNetworkEarnings] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const code = await ReferralService.getMyReferralCode();
      setRefCode(code || '');

      const data = await ReferralService.getNetwork();
      setNetwork(data || null);

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profileRow } = await supabase
          .from('profiles')
          .select('referral_earnings')
          .eq('id', user.id)
          .single();
        setTotalNetworkEarnings(Number(profileRow?.referral_earnings || 0));
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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  function getTotalMembers(node: ReferralNode | null): number {
    if (!node) return 0;
    let total = node.children?.length || 0;
    node.children?.forEach(child => { total += getTotalMembers(child); });
    return total;
  }

  const totalMembers = getTotalMembers(network);

  // Network Node Component - Visual Galaxy Style
  const NetworkNode = ({ node, isRoot, depth = 0 }: { node: ReferralNode; isRoot?: boolean; depth?: number }) => {
    const hasChildren = node.children && node.children.length > 0;
    const levelColor = isRoot ? '#22c55e' : node.level === 1 ? '#8b5cf6' : '#3b82f6';

    return (
      <div className="net-node-wrapper">
        {/* Connection line from parent */}
        {!isRoot && <div className="net-connection-line" style={{ background: `linear-gradient(180deg, ${levelColor}50, ${levelColor})` }} />}

        <div className={`net-node ${isRoot ? 'net-node-root' : ''}`} style={{ '--node-color': levelColor } as React.CSSProperties}>
          {/* Glow ring */}
          <div className="net-node-glow" />

          {/* Avatar */}
          <div className="net-node-avatar">
            {node.avatar_url ? (
              <img src={node.avatar_url} alt={node.username || ''} />
            ) : (
              <span>{(node.username || '?')[0]?.toUpperCase()}</span>
            )}
          </div>

          {/* Info */}
          <div className="net-node-info">
            <span className="net-node-name">@{node.username}</span>
            <span className="net-node-value">€{Number(node.total_earnings || 0).toFixed(2)}</span>
          </div>

          {/* Level badge */}
          {!isRoot && (
            <div className="net-node-badge" style={{ background: levelColor }}>
              {node.level === 1 ? '10%' : '5%'}
            </div>
          )}
        </div>

        {/* Children */}
        {hasChildren && (
          <div className="net-children">
            {node.children!.map((child, i) => (
              <NetworkNode key={child.id} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <PremiumLoader size="medium" text="RED" subtext="Cargando tu network..." />;
  }

  return (
    <div className="ref-shell lp-premium-bg">
      <style>{refStyles}</style>

      {/* Hero Stats */}
      <section className="ref-hero">
        <div className="ref-hero-bg" />

        <div className="ref-stats-row">
          <div className="ref-stat-card ref-stat-earnings">
            <div className="ref-stat-icon">
              <TrendingUp size={20} />
            </div>
            <div className="ref-stat-content">
              <span className="ref-stat-value">€{totalNetworkEarnings.toFixed(2)}</span>
              <span className="ref-stat-label">Comisiones</span>
            </div>
          </div>

          <div className="ref-stat-card ref-stat-members">
            <div className="ref-stat-icon">
              <Users size={20} />
            </div>
            <div className="ref-stat-content">
              <span className="ref-stat-value">{totalMembers}</span>
              <span className="ref-stat-label">Red</span>
            </div>
          </div>
        </div>

        {/* Commission rates */}
        <div className="ref-rates">
          <div className="ref-rate">
            <Zap size={14} />
            <span>Nivel 1: <strong>10%</strong></span>
          </div>
          <div className="ref-rate">
            <Sparkles size={14} />
            <span>Nivel 2: <strong>5%</strong></span>
          </div>
        </div>
      </section>

      {/* Invite Link */}
      <section className="ref-invite-card">
        <div className="ref-invite-header">
          <Sparkles size={16} />
          <span>Tu enlace único</span>
        </div>
        <div className="ref-invite-box">
          <span className="ref-invite-link">
            {refCode ? `linkpay.gg/r/${refCode}` : '...'}
          </span>
          <button
            className={`ref-copy-btn ${copied ? 'copied' : ''}`}
            onClick={copyLink}
            disabled={!refCode}
          >
            <Copy size={16} />
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>
      </section>

      {/* Network Visualization */}
      <section className="ref-network-section">
        <div className="ref-network-header">
          <h2>Tu Red</h2>
          {totalMembers === 0 && <span className="ref-network-empty-badge">Vacía</span>}
        </div>

        {!network || totalMembers === 0 ? (
          <div className="ref-empty-network">
            <div className="ref-empty-orbs">
              <div className="ref-empty-orb ref-empty-orb-1" />
              <div className="ref-empty-orb ref-empty-orb-2" />
              <div className="ref-empty-orb ref-empty-orb-3" />
            </div>
            <p>Comparte tu enlace para empezar a construir</p>
          </div>
        ) : (
          <div className="ref-network-tree">
            <NetworkNode node={network} isRoot />
          </div>
        )}
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STYLES - DARK MATTER GALAXY NETWORK
   ═══════════════════════════════════════════════════════════════════════════ */

const refStyles = `
  /* ─── SHELL ─────────────────────────────────────────────────────────────── */
  .ref-shell {
    position: fixed;
    inset: 0;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding: 16px;
    padding-bottom: 140px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    color: #fff;
    background: linear-gradient(180deg, #0a0f1a 0%, #020617 50%, #000 100%);
  }

  @media (max-width: 768px) {
    .ref-shell {
      top: calc(48px + env(safe-area-inset-top, 0px));
    }
  }

  @media (min-width: 769px) {
    .ref-shell {
      left: 260px;
      padding: 24px;
      padding-bottom: 100px;
    }
  }

  /* ─── HERO SECTION ──────────────────────────────────────────────────────── */
  .ref-hero {
    position: relative;
    padding: 20px 0;
    margin-bottom: 16px;
  }

  .ref-hero-bg {
    position: absolute;
    inset: -50px -100px;
    background: 
      radial-gradient(ellipse 80% 60% at 50% 20%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
      radial-gradient(ellipse 60% 40% at 30% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 40%);
    pointer-events: none;
    animation: hero-pulse 8s ease-in-out infinite;
  }

  @keyframes hero-pulse {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }

  /* Stats Row */
  .ref-stats-row {
    display: flex;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .ref-stat-card {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border-radius: 20px;
    background: 
      linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%),
      rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(148, 163, 184, 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow:
      0 0 60px rgba(139, 92, 246, 0.1),
      0 20px 40px -10px rgba(0, 0, 0, 0.5);
  }

  .ref-stat-earnings {
    border-top: 2px solid rgba(34, 197, 94, 0.7);
  }

  .ref-stat-members {
    border-top: 2px solid rgba(139, 92, 246, 0.7);
  }

  .ref-stat-icon {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%);
    color: #a5b4fc;
  }

  .ref-stat-earnings .ref-stat-icon {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.2) 100%);
    color: #86efac;
  }

  .ref-stat-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ref-stat-value {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .ref-stat-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
  }

  /* Rates */
  .ref-rates {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 16px;
    position: relative;
    z-index: 1;
  }

  .ref-rate {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
  }

  .ref-rate strong {
    color: #a5b4fc;
    font-weight: 700;
  }

  .ref-rate svg {
    color: #8b5cf6;
  }

  /* ─── INVITE CARD ───────────────────────────────────────────────────────── */
  .ref-invite-card {
    background: 
      linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%),
      rgba(15, 23, 42, 0.95);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 20px;
    padding: 16px;
    margin-bottom: 20px;
    box-shadow:
      0 0 80px rgba(139, 92, 246, 0.15),
      0 20px 50px -10px rgba(0, 0, 0, 0.6);
  }

  .ref-invite-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-size: 13px;
    font-weight: 600;
    color: #a5b4fc;
  }

  .ref-invite-header svg {
    color: #8b5cf6;
  }

  .ref-invite-box {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .ref-invite-link {
    flex: 1;
    padding: 14px 16px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 14px;
    font-family: ui-monospace, SFMono-Regular, monospace;
    font-size: 13px;
    color: #e5e7eb;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .ref-copy-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 14px 18px;
    border: none;
    border-radius: 14px;
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
    min-height: 48px;
    white-space: nowrap;
  }

  .ref-copy-btn:active {
    transform: scale(0.95);
  }

  .ref-copy-btn.copied {
    background: linear-gradient(135deg, #22c55e 0%, #10b981 100%);
    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.4);
  }

  .ref-copy-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* ─── NETWORK SECTION ───────────────────────────────────────────────────── */
  .ref-network-section {
    background: 
      linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 24px;
    padding: 20px;
    min-height: 300px;
  }

  .ref-network-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .ref-network-header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #f1f5f9;
  }

  .ref-network-empty-badge {
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 500;
  }

  /* Empty state */
  .ref-empty-network {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 20px;
    text-align: center;
  }

  .ref-empty-orbs {
    position: relative;
    width: 120px;
    height: 80px;
    margin-bottom: 20px;
  }

  .ref-empty-orb {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.3) 100%);
    border: 2px solid rgba(139, 92, 246, 0.5);
    animation: orb-float 3s ease-in-out infinite;
  }

  .ref-empty-orb-1 {
    width: 50px;
    height: 50px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .ref-empty-orb-2 {
    width: 35px;
    height: 35px;
    bottom: 0;
    left: 15px;
    animation-delay: 0.5s;
  }

  .ref-empty-orb-3 {
    width: 35px;
    height: 35px;
    bottom: 0;
    right: 15px;
    animation-delay: 1s;
  }

  @keyframes orb-float {
    0%, 100% { transform: translateY(0) translateX(-50%); opacity: 0.7; }
    50% { transform: translateY(-8px) translateX(-50%); opacity: 1; }
  }

  .ref-empty-orb-2, .ref-empty-orb-3 {
    animation-name: orb-float-side;
  }

  @keyframes orb-float-side {
    0%, 100% { transform: translateY(0); opacity: 0.6; }
    50% { transform: translateY(-6px); opacity: 0.9; }
  }

  .ref-empty-network p {
    margin: 0;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }

  /* ─── NETWORK TREE ──────────────────────────────────────────────────────── */
  .ref-network-tree {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .net-node-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  /* Connection line */
  .net-connection-line {
    width: 3px;
    height: 24px;
    border-radius: 2px;
    margin-bottom: -2px;
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.5);
  }

  /* Node */
  .net-node {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: 
      linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%),
      rgba(15, 23, 42, 0.95);
    border: 1px solid rgba(148, 163, 184, 0.25);
    border-radius: 16px;
    min-width: 180px;
    transition: all 0.3s;
    box-shadow:
      0 0 40px rgba(139, 92, 246, 0.08),
      0 15px 35px -10px rgba(0, 0, 0, 0.5);
  }

  .net-node:hover {
    transform: scale(1.03);
    box-shadow:
      0 0 60px rgba(139, 92, 246, 0.15),
      0 20px 45px -10px rgba(0, 0, 0, 0.6);
  }

  .net-node-root {
    background: 
      linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%),
      rgba(15, 23, 42, 0.95);
    border-color: rgba(34, 197, 94, 0.5);
    box-shadow:
      0 0 60px rgba(34, 197, 94, 0.2),
      0 20px 45px -10px rgba(0, 0, 0, 0.6);
  }

  /* Glow effect */
  .net-node-glow {
    position: absolute;
    inset: -2px;
    border-radius: 18px;
    background: linear-gradient(135deg, var(--node-color, #8b5cf6) 0%, transparent 50%);
    opacity: 0.3;
    filter: blur(8px);
    pointer-events: none;
  }

  /* Avatar */
  .net-node-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--node-color, #8b5cf6);
    flex-shrink: 0;
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%);
    font-weight: 700;
    font-size: 16px;
    color: #fff;
  }

  .net-node-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .net-node-root .net-node-avatar {
    border-color: #22c55e;
    box-shadow: 0 0 25px rgba(34, 197, 94, 0.4);
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.2) 100%);
  }

  /* Info */
  .net-node-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .net-node-name {
    font-size: 13px;
    font-weight: 600;
    color: #f1f5f9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .net-node-value {
    font-size: 12px;
    color: #86efac;
    font-family: ui-monospace, SFMono-Regular, monospace;
    font-weight: 600;
  }

  /* Badge */
  .net-node-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border: 2px solid rgba(0, 0, 0, 0.2);
  }

  /* Children container */
  .net-children {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    padding-left: 20px;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .ref-stat-card {
      padding: 14px;
    }

    .ref-stat-value {
      font-size: 20px;
    }

    .net-node {
      min-width: 160px;
      padding: 10px 14px;
    }

    .net-node-avatar {
      width: 40px;
      height: 40px;
    }

    .net-node-name {
      font-size: 12px;
    }
  }
`;
