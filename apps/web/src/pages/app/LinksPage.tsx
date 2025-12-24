import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Filter,
  ExternalLink,
  Copy,
  Trash2,
  BarChart2,
  Loader2,
  Zap,
  Shield,
  Rocket,
  Lock,
  Clock,
  EyeOff,
} from 'lucide-react';
import { LinkService, Link } from '../../lib/linkService';
import { useCachedLinks } from '../../context/DataCacheContext';
import { useToast, useConfirm } from '../../components/ui/Toast';
import '../../styles/PremiumBackground.css';

export function LinksPage() {
  // ═══════════════════════════════════════════════════════════════════════════
  // DATOS CACHEADOS - Navegación instantánea
  // ═══════════════════════════════════════════════════════════════════════════
  const { links, loading, refresh } = useCachedLinks();
  const toast = useToast();
  const { confirm, ConfirmDialog } = useConfirm();

  const [searchTerm, setSearchTerm] = useState('');
  const [animatedCount, setAnimatedCount] = useState(0);
  const prevCountRef = useRef(0);

  // Estado local para eliminar links (actualización optimista)
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());

  // Links filtrados (excluyendo los eliminados localmente)
  const activeLinks = links.filter(l => !deletedIds.has(l.id));

  const handleDelete = async (id: string) => {
    const confirmed = await confirm(
      '¿Eliminar enlace?',
      'Esta acción no se puede deshacer. El enlace dejará de funcionar inmediatamente.',
      'danger'
    );

    if (confirmed) {
      try {
        // Actualización optimista - marcar como eliminado inmediatamente
        setDeletedIds(prev => new Set(prev).add(id));
        await LinkService.deleteLink(id);
        // Refrescar caché en background
        refresh();
        toast.success('Enlace eliminado correctamente');
      } catch (err) {
        // Revertir si falla
        setDeletedIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        toast.error('Error al eliminar el enlace');
      }
    }
  };

  const copyLink = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/l/${slug}`);
    toast.success('¡Enlace copiado al portapapeles!');
  };

  const filteredLinks = activeLinks.filter((l) => {
    const term = searchTerm.toLowerCase();
    return (
      l.slug?.toLowerCase().includes(term) ||
      l.original_url.toLowerCase().includes(term)
    );
  });

  const visibleCount = filteredLinks.length;

  // 🔢 contador animado de enlaces visibles
  useEffect(() => {
    const start = prevCountRef.current;
    const end = visibleCount;

    if (start === end) return;

    const diff = end - start;
    const duration = 480; // ms
    const startTime = performance.now();
    let frame: number;

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress; // easeInOutQuad

      const value = Math.round(start + diff * eased);
      setAnimatedCount(value);

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        prevCountRef.current = end;
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [visibleCount]);

  const renderModeBadge = (mode: string) => {
    const styles = {
      lite: {
        bg: 'rgba(16,185,129,0.16)',
        color: '#6EE7B7',
        border: 'rgba(16,185,129,0.7)',
        icon: <Shield size={12} />,
      },
      standard: {
        bg: 'rgba(59,130,246,0.18)',
        color: '#BFDBFE',
        border: 'rgba(59,130,246,0.7)',
        icon: <Zap size={12} />,
      },
      turbo: {
        bg: 'rgba(249,115,22,0.16)',
        color: '#FED7AA',
        border: 'rgba(249,115,22,0.7)',
        icon: <Rocket size={12} />,
      },
    } as const;

    const current = styles[mode as keyof typeof styles] || styles.standard;

    return (
      <span
        className="lp-links-mode"
        style={{
          background: current.bg,
          color: current.color,
          borderColor: current.border,
        }}
      >
        {current.icon}
        {mode}
      </span>
    );
  };

  return (
    <div className="lp-links-shell">
      <style>{linksStyles}</style>
      <ConfirmDialog />
      <div className="lp-links-inner">

        {/* SEARCH BAR - Minimal, transparent */}
        <div className="lp-search-container">
          <div className="lp-search-bar">
            <Search className="lp-search-icon" size={18} />
            <input
              placeholder="Buscar enlaces..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="button" onClick={refresh} className="lp-refresh-btn">
            <Zap size={16} />
          </button>
        </div>

        {/* STATS ROW - Clean minimal */}
        <div className="lp-stats-row">
          <span className="lp-stat-count">
            <strong>{animatedCount}</strong> enlaces
          </span>
        </div>

        {/* LINKS LIST - Direct, no wrapper card */}
        {loading ? (
          <div className="lp-loading-state">
            <Loader2 size={24} className="spin" />
            <span>Cargando...</span>
          </div>
        ) : filteredLinks.length === 0 ? (
          <div className="lp-empty-state">
            <ExternalLink size={32} />
            <p>No hay enlaces aún</p>
            <span>Crea tu primer link desde "Crear Link"</span>
          </div>
        ) : (
          <div className="lp-links-list">
            {/* DESKTOP TABLE */}
            <table className="lp-links-table lp-desktop-only">
              <thead>
                <tr>
                  <th>Enlace</th>
                  <th>Modo</th>
                  <th>Visitas</th>
                  <th>Revenue</th>
                  <th className="lp-th-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredLinks.map((link) => (
                  <tr key={link.id}>
                    <td>
                      <div className="lp-link-main">
                        <div className="lp-link-slug-row">
                          <span className="lp-link-slug">/{link.slug}</span>
                          {link.password && (
                            <Lock
                              size={12}
                              className="lp-link-flag lp-link-flag-orange"
                            />
                          )}
                          {link.expires_at && (
                            <Clock
                              size={12}
                              className="lp-link-flag lp-link-flag-red"
                            />
                          )}
                          {link.is_private && (
                            <EyeOff
                              size={12}
                              className="lp-link-flag lp-link-flag-purple"
                            />
                          )}
                        </div>
                        <span className="lp-link-url">
                          {link.original_url}
                        </span>
                      </div>
                    </td>
                    <td>{renderModeBadge(link.monetization_mode || 'standard')}</td>
                    <td>
                      <div className="lp-link-visits">
                        <BarChart2 size={15} />
                        {link.views}
                      </div>
                    </td>
                    <td>
                      <div className="lp-link-revenue">
                        €{(link.earnings || 0).toFixed(4)}
                      </div>
                    </td>
                    <td className="lp-td-right">
                      <div className="lp-link-actions">
                        <button
                          type="button"
                          onClick={() => copyLink(link.slug)}
                          className="lp-btn-ghost"
                        >
                          <Copy size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(link.id)}
                          className="lp-btn-danger"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* MOBILE CARDS */}
            <div className="lp-links-list lp-mobile-only">
              {filteredLinks.map((link) => (
                <div key={link.id} className="lp-link-card">
                  <div className="lp-link-card-top">
                    <div className="lp-link-card-main">
                      <div className="lp-link-slug-row">
                        <span className="lp-link-slug">/{link.slug}</span>
                        {link.password && (
                          <Lock
                            size={11}
                            className="lp-link-flag lp-link-flag-orange"
                          />
                        )}
                        {link.expires_at && (
                          <Clock
                            size={11}
                            className="lp-link-flag lp-link-flag-red"
                          />
                        )}
                        {link.is_private && (
                          <EyeOff
                            size={11}
                            className="lp-link-flag lp-link-flag-purple"
                          />
                        )}
                      </div>
                      <span className="lp-link-url lp-link-url-mobile">
                        {link.original_url}
                      </span>
                    </div>
                    <div className="lp-link-card-mode">
                      {renderModeBadge(link.monetization_mode || 'standard')}
                    </div>
                  </div>

                  <div className="lp-link-card-bottom">
                    <div className="lp-link-card-stats">
                      <span className="lp-chip-stat">
                        <BarChart2 size={12} />
                        {link.views} visitas
                      </span>
                      <span className="lp-chip-money">
                        €{(link.earnings || 0).toFixed(4)}
                      </span>
                    </div>
                    <div className="lp-link-card-actions">
                      <button
                        type="button"
                        onClick={() => copyLink(link.slug)}
                        className="lp-btn-ghost"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(link.id)}
                        className="lp-btn-danger"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================== ESTILOS MIS ENLACES ================== */

const linksStyles = `
  .spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    100% { transform: rotate(360deg); }
  }

  .lp-bg {
    min-height: 100dvh;
    background:
      radial-gradient(circle at 0% 0%, #1e3a8a 0, transparent 55%),
      radial-gradient(circle at 100% 100%, #020617 0, #000 65%);
    background-color: #020617;
    position: relative;
    overflow: hidden;
  }

  .lp-bg::before,
  .lp-bg::after {
    content: "";
    position: absolute;
    inset: -40%;
    background:
      radial-gradient(circle at 20% 0%, rgba(56,189,248,0.15), transparent 60%),
      radial-gradient(circle at 80% 100%, rgba(129,140,248,0.16), transparent 55%);
    opacity: 0.9;
    filter: blur(32px);
    pointer-events: none;
    animation: lp-nebula 22s ease-in-out infinite alternate;
  }
  .lp-bg::after {
    background:
      radial-gradient(circle at 0% 100%, rgba(34,197,94,0.18), transparent 55%),
      radial-gradient(circle at 100% 0%, rgba(59,130,246,0.16), transparent 55%);
    mix-blend-mode: screen;
    animation: lp-orbit 32s linear infinite;
  }
  @keyframes lp-nebula {
    0% { transform: translate3d(-10px,-10px,0) scale(1); opacity: 0.85; }
    100% { transform: translate3d(20px,10px,0) scale(1.08); opacity: 1; }
  }
  @keyframes lp-orbit {
    0% { transform: rotate(0deg) scale(1.04); }
    100% { transform: rotate(360deg) scale(1.04); }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     SHELL & INNER - Transparent, inherits LinksHub background
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-links-shell {
    position: relative;
    background: transparent;
    z-index: 1;
  }

  .lp-links-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro', system-ui, sans-serif;
    color: #e5e7eb;
    background: transparent;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     SEARCH BAR - Modern, minimal glassmorphism
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-search-container {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
  }

  .lp-search-bar {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: rgba(30, 20, 28, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(251, 113, 133, 0.2);
    border-radius: 14px;
    transition: all 0.25s;
  }

  .lp-search-bar:focus-within {
    border-color: rgba(251, 113, 133, 0.5);
    box-shadow: 0 0 30px rgba(251, 113, 133, 0.15);
  }

  .lp-search-icon {
    color: #fda4af;
    flex-shrink: 0;
  }

  .lp-search-bar input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 15px;
    color: #fff;
  }

  .lp-search-bar input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .lp-refresh-btn {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(30, 20, 28, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(251, 113, 133, 0.2);
    border-radius: 14px;
    color: #fda4af;
    cursor: pointer;
    transition: all 0.25s;
  }

  .lp-refresh-btn:hover {
    border-color: rgba(251, 113, 133, 0.5);
    background: rgba(251, 113, 133, 0.15);
  }

  .lp-refresh-btn:active {
    transform: scale(0.95);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     STATS ROW - Clean, minimal
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-stats-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 0 4px;
  }

  .lp-stat-count {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
  }

  .lp-stat-count strong {
    color: #fda4af;
    font-weight: 700;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     LOADING & EMPTY STATES
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-loading-state,
  .lp-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 60px 20px;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
  }

  .lp-loading-state svg {
    color: #fda4af;
  }

  .lp-empty-state svg {
    color: #fda4af;
    opacity: 0.5;
  }

  .lp-empty-state p {
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }

  .lp-empty-state span {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     LINKS LIST - Clean container
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-links-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .lp-links-card:hover {
    transform: translateY(-3px) scale(1.005);
    box-shadow:
      0 30px 80px rgba(0,0,0,1),
      0 0 0 1px rgba(191,219,254,0.6);
    border-color: rgba(191,219,254,0.75);
  }

  /* FILTROS */
  .lp-links-filters-row {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .lp-links-search {
    position: relative;
    flex: 1 1 0;
    min-width: 0;
    max-width: 360px;
  }

  .lp-links-search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
  }

  .lp-links-search input {
    width: 100%;
    padding: 10px 12px 10px 30px;
    border-radius: 999px;
    border: 1px solid rgba(148,163,184,0.8);
    background: rgba(15,23,42,0.96);
    color: #e5e7eb;
    font-size: 13px;
    outline: none;
    box-shadow:
      0 0 0 1px rgba(15,23,42,0.95),
      0 10px 30px rgba(15,23,42,0.9);
  }

  .lp-links-search input::placeholder {
    color: #6b7280;
  }

  .lp-links-search input:focus {
    border-color: rgba(129,140,248,0.9);
    box-shadow:
      0 0 0 1px rgba(129,140,248,0.9),
      0 0 24px rgba(79,70,229,0.8);
  }

  .lp-links-refresh {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba(56,189,248,0.8);
    background: radial-gradient(circle at 0% 0%, rgba(56,189,248,0.2), rgba(15,23,42,0.98));
    color: #e0f2fe;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 10px 30px rgba(15,23,42,0.9);
    transition: all 0.18s ease-out;
  }

  .lp-links-refresh svg {
    color: #7dd3fc;
  }

  .lp-links-refresh:hover {
    transform: translateY(-1px);
    box-shadow:
      0 18px 40px rgba(8,47,73,1),
      0 0 24px rgba(56,189,248,0.75);
  }

  .lp-links-meta {
    margin-top: 10px;
    font-size: 11px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #9ca3af;
    gap: 8px;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }

  /* 🔥 contador con glow + pulso */
  .lp-links-count {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 999px;
    background: radial-gradient(circle at 0% 0%, rgba(37,99,235,0.4), rgba(15,23,42,0.96));
    border: 1px solid rgba(129,140,248,0.9);
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 0 22px rgba(79,70,229,0.8);
    overflow: hidden;
    animation: lp-count-pulse 3.4s ease-in-out infinite;
  }

  .lp-links-count-glow {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(56,189,248,0.2), transparent, rgba(129,140,248,0.3));
    opacity: 0.7;
    mix-blend-mode: screen;
    transform: translateX(-40%);
    animation: lp-count-sheen 5s linear infinite;
    pointer-events: none;
  }

  .lp-links-count strong {
    position: relative;
    font-variant-numeric: tabular-nums;
    font-size: 13px;
    font-weight: 800;
    color: #e0f2fe;
  }

  .lp-links-count-label {
    position: relative;
    font-size: 11px;
    color: #cbd5f5;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  @keyframes lp-count-pulse {
    0%,100% {
      transform: translateY(0);
      box-shadow:
        0 0 0 1px rgba(15,23,42,1),
        0 0 18px rgba(79,70,229,0.7);
    }
    50% {
      transform: translateY(-1px);
      box-shadow:
        0 0 0 1px rgba(129,140,248,1),
        0 0 28px rgba(129,140,248,1);
    }
  }

  @keyframes lp-count-sheen {
    0% { transform: translateX(-60%); opacity: 0; }
    10% { opacity: 0.8; }
    50% { transform: translateX(60%); opacity: 0.5; }
    100% { transform: translateX(120%); opacity: 0; }
  }

  .lp-links-meta-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 999px;
    border: 1px solid rgba(148,163,184,0.7);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #cbd5f5;
    background: rgba(15,23,42,0.96);
  }

  .lp-links-meta-pill svg {
    color: #9ca3af;
  }

  /* CARD HEADER LISTADO */
  .lp-links-card-header {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 12px;
  }

  .lp-links-card-icon {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 30% 0%, #6366f1, #1e293b);
    color: #e0e7ff;
    box-shadow:
      0 14px 30px rgba(15,23,42,0.95),
      0 0 0 1px rgba(15,23,42,1);
  }

  .lp-links-card-title h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 800;
    color: #f9fafb;
  }

  .lp-links-card-title p {
    margin: 2px 0 0 0;
    font-size: 12px;
    color: #9ca3af;
  }

  /* LOADING / EMPTY */
  .lp-links-loading,
  .lp-links-empty {
    position: relative;
    z-index: 1;
    border-radius: 18px;
    border: 1px dashed rgba(148,163,184,0.7);
    background: rgba(15,23,42,0.97);
    padding: 26px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    text-align: center;
  }

  .lp-links-orb {
    width: 48px;
    height: 48px;
    border-radius: 999px;
    background: radial-gradient(circle at 30% 0, #6366f1, #22c55e);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 0 0 1px rgba(191,219,254,0.5),
      0 18px 42px rgba(15,23,42,1);
    margin-bottom: 10px;
  }

  .lp-links-orb svg {
    color: #e5f2ff;
  }

  .lp-links-loading p {
    margin: 0;
    font-size: 13px;
  }

  .lp-links-empty-icon {
    width: 42px;
    height: 42px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15,23,42,0.98);
    box-shadow:
      0 10px 26px rgba(15,23,42,0.95),
      0 0 0 1px rgba(30,64,175,0.8);
    margin-bottom: 10px;
  }

  .lp-links-empty-icon svg {
    color: #64748b;
  }

  .lp-links-empty-title {
    margin: 0 0 4px 0;
    font-size: 13px;
    font-weight: 600;
    color: #e5e7eb;
  }

  .lp-links-empty-sub {
    margin: 0;
    font-size: 11px;
    color: #9ca3af;
  }

  /* TABLA ESCRITORIO */
  .lp-links-table-wrapper {
    position: relative;
    z-index: 1;
    margin-top: 4px;
  }

  .lp-links-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    color: #e5e7eb;
  }

  .lp-links-table thead tr {
    background: radial-gradient(circle at 0% 0%, rgba(30,64,175,0.7), rgba(15,23,42,0.98));
  }

  .lp-links-table th,
  .lp-links-table td {
    padding: 10px 12px;
  }

  .lp-links-table th {
    text-align: left;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #9ca3af;
    border-bottom: 1px solid rgba(51,65,85,0.8);
  }

  .lp-links-table tbody tr {
    border-bottom: 1px solid rgba(30,41,59,0.95);
    transition: background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
  }

  .lp-links-table tbody tr:hover {
    background: radial-gradient(circle at 0% 0%, rgba(30,64,175,0.55), rgba(15,23,42,0.96));
    transform: translateY(-1px);
    box-shadow: 0 0 0 1px rgba(129,140,248,0.6);
  }

  .lp-th-right,
  .lp-td-right {
    text-align: right;
  }

  .lp-link-main {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .lp-link-slug-row {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .lp-link-slug {
    font-weight: 700;
    color: #fff;
    font-size: 14px;
  }

  .lp-link-flag-orange { color: #fb923c; }
  .lp-link-flag-red { color: #fda4af; }
  .lp-link-flag-purple { color: #f472b6; }

  .lp-link-url {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    max-width: 280px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lp-link-visits {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: #cbd5f5;
    font-weight: 500;
  }

  .lp-link-visits svg {
    color: #9ca3af;
  }

  .lp-link-revenue {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    font-weight: 700;
    color: #4ade80;
    font-size: 12px;
  }

  .lp-link-actions {
    display: inline-flex;
    gap: 6px;
    justify-content: flex-end;
  }

  .lp-btn-ghost,
  .lp-btn-danger {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(251, 113, 133, 0.15);
    background: rgba(30, 20, 28, 0.6);
    color: #e5e7eb;
    cursor: pointer;
    transition: all 0.2s ease-out;
  }

  .lp-btn-ghost svg { color: #fda4af; }
  .lp-btn-danger svg { color: #fca5a5; }

  .lp-btn-ghost:hover {
    border-color: rgba(251, 113, 133, 0.5);
    background: rgba(251, 113, 133, 0.15);
  }

  .lp-btn-danger:hover {
    border-color: rgba(248, 113, 113, 0.6);
    background: rgba(248, 113, 113, 0.2);
  }

  .lp-links-mode {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     MOBILE LINK CARDS - Transparent Premium Design (Coral/Pink palette)
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-link-card {
    position: relative;
    border-radius: 16px;
    padding: 16px;
    /* TRANSPARENT glassmorphism - see the vibrant background through */
    background: rgba(30, 20, 28, 0.5);
    backdrop-filter: blur(16px) saturate(1.3);
    -webkit-backdrop-filter: blur(16px) saturate(1.3);
    border: 1px solid rgba(251, 113, 133, 0.2);
    box-shadow:
      0 0 30px rgba(251, 113, 133, 0.08),
      0 8px 32px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .lp-link-card:hover {
    border-color: rgba(251, 113, 133, 0.4);
    background: rgba(30, 20, 28, 0.6);
    transform: translateY(-2px);
    box-shadow:
      0 0 50px rgba(251, 113, 133, 0.12),
      0 16px 48px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .lp-link-card:active {
    transform: scale(0.98);
  }

  .lp-link-card-top {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: flex-start;
  }

  .lp-link-card-main {
    min-width: 0;
  }

  .lp-link-url-mobile {
    max-width: 100%;
  }

  .lp-link-card-mode {
    flex-shrink: 0;
  }

  .lp-link-card-bottom {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(251, 113, 133, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .lp-link-card-stats {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
  }

  .lp-chip-stat,
  .lp-chip-money {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 6px 10px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
  }

  .lp-chip-stat {
    background: rgba(30, 20, 28, 0.7);
    border: 1px solid rgba(251, 113, 133, 0.15);
    color: rgba(255, 255, 255, 0.8);
  }

  .lp-chip-stat svg {
    color: #fda4af;
  }

  .lp-chip-money {
    background: rgba(34, 197, 94, 0.15);
    border: 1px solid rgba(34, 197, 94, 0.3);
    color: #86efac;
  }

  .lp-link-card-actions {
    display: inline-flex;
    gap: 6px;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     RESPONSIVE - Mobile First
     ═══════════════════════════════════════════════════════════════════════════ */

  /* Desktop */
  .lp-desktop-only { display: table; }
  .lp-mobile-only { display: none; }

  /* Tablet */
  @media (max-width: 900px) {
    .lp-desktop-only { display: none; }
    .lp-mobile-only { display: flex; flex-direction: column; gap: 12px; }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .lp-search-bar {
      padding: 14px 16px;
    }

    .lp-search-bar input {
      font-size: 16px;
    }

    .lp-refresh-btn {
      width: 52px;
      height: 52px;
    }

    .lp-link-card {
      padding: 14px;
    }

    .lp-btn-ghost,
    .lp-btn-danger {
      width: 40px;
      height: 40px;
    }

    .lp-chip-stat,
    .lp-chip-money {
      padding: 7px 12px;
      font-size: 11px;
    }
  }
`;
