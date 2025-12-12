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

export function LinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [animatedCount, setAnimatedCount] = useState(0);
  const prevCountRef = useRef(0);

  const loadLinks = async () => {
    setLoading(true);
    try {
      const data = await LinkService.getAll();
      setLinks(data as any[]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Eliminar enlace?')) {
      try {
        await LinkService.deleteLink(id);
        setLinks((prev) => prev.filter((l) => l.id !== id));
      } catch (err) {
        alert('Error al eliminar.');
      }
    }
  };

  const copyLink = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/l/${slug}`);
    alert('Copiado');
  };

  const filteredLinks = links.filter((l) => {
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
    <div className="lp-links-shell lp-bg">
      <style>{linksStyles}</style>
      <div className="lp-links-inner">
        {/* HEADER */}
        <header className="lp-links-header">
          <div className="lp-chip lp-chip-center">
            <span className="lp-chip-dot" />
            SMART LINKS
          </div>
          <p>
            Gestiona todos tus enlaces monetizados desde un solo panel. Copia,
            borra y filtra al vuelo.
          </p>
        </header>

        {/* FILTROS / BUSCADOR */}
        <section className="lp-links-card lp-links-card-filters">
          <div className="lp-links-filters-row">
            <div className="lp-links-search">
              <Search className="lp-links-search-icon" size={16} />
              <input
                placeholder="Buscar por slug o URL…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={loadLinks}
              className="lp-links-refresh"
            >
              <Zap size={16} />
              Refrescar
            </button>
          </div>
          <div className="lp-links-meta">
            <span className="lp-links-count">
              <span className="lp-links-count-glow" />
              <strong>{animatedCount}</strong>
              <span className="lp-links-count-label">enlaces visibles</span>
            </span>
            <span className="lp-links-meta-pill">
              <Filter size={12} />
              Filtro instantáneo
            </span>
          </div>
        </section>

        {/* LISTADO */}
        <section className="lp-links-card lp-links-card-main">
          <div className="lp-links-card-header">
            <div className="lp-links-card-icon">
              <BarChart2 size={18} />
            </div>
            <div className="lp-links-card-title">
              <h3>Todos tus enlaces</h3>
              <p>
                Vista avanzada con visitas, revenue y modo de monetización de
                cada Smart Link.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="lp-links-loading">
              <div className="lp-links-orb">
                <Loader2 size={22} className="spin" />
              </div>
              <p>Cargando enlaces…</p>
            </div>
          ) : filteredLinks.length === 0 ? (
            <div className="lp-links-empty">
              <div className="lp-links-empty-icon">
                <ExternalLink size={24} />
              </div>
              <p className="lp-links-empty-title">No hay enlaces aún.</p>
              <p className="lp-links-empty-sub">
                Crea tu primer Smart Link desde la pestaña <strong>Crear Link</strong>.
              </p>
            </div>
          ) : (
            <div className="lp-links-table-wrapper">
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
        </section>
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

  .lp-links-shell {
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
    .lp-links-shell {
      left: 260px;
    }
  }

  .lp-links-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1080px;
    padding: 26px 16px 100px 16px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    color: #e5e7eb;
  }

  /* HEADER */
  .lp-links-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .lp-links-header p {
    margin: 6px 0 0 0;
    font-size: 13px;
    color: #9ca3af;
  }

  .lp-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(30, 64, 175, 0.8);
    color: #e5e7eb;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border: 1px solid rgba(148, 163, 184, 0.7);
    box-shadow:
      0 0 0 1px rgba(15, 23, 42, 0.9),
      0 0 18px rgba(59, 130, 246, 0.6);
    animation: lp-chip-glow 4.5s ease-in-out infinite;
  }

  .lp-chip-center {
    justify-content: center;
    width: 100%;
  }

  .lp-chip-dot {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.35);
  }

  @keyframes lp-chip-glow {
    0%,100% {
      box-shadow:
        0 0 0 1px rgba(15,23,42,0.9),
        0 0 12px rgba(59,130,246,0.4);
    }
    50% {
      box-shadow:
        0 0 0 1px rgba(129,140,248,0.9),
        0 0 24px rgba(129,140,248,0.9);
    }
  }

  /* CARDS */
  .lp-links-card {
    position: relative;
    border-radius: 22px;
    border: 1px solid rgba(148, 163, 184, 0.7);
    background: radial-gradient(circle at top, rgba(15,23,42,0.98), rgba(15,23,42,0.96));
    box-shadow:
      0 20px 60px rgba(0,0,0,0.95),
      0 0 0 1px rgba(15,23,42,0.9);
    padding: 16px 16px 18px;
    margin-bottom: 18px;
    overflow: hidden;
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    transition:
      transform 0.22s cubic-bezier(0.22, 0.61, 0.36, 1),
      box-shadow 0.22s ease,
      border-color 0.22s ease;
  }

  .lp-links-card::before {
    content: "";
    position: absolute;
    inset: -120px;
    background:
      radial-gradient(circle at 0% 0%, rgba(59,130,246,0.35), transparent 55%),
      radial-gradient(circle at 100% 100%, rgba(129,140,248,0.25), transparent 55%);
    opacity: 0.6;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  .lp-links-card-main {
    animation: lp-card-float 10s ease-in-out infinite;
  }

  @keyframes lp-card-float {
    0%,100% { transform: translateY(-1px); }
    50% { transform: translateY(2px); }
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
    color: #e5e7eb;
    font-size: 13px;
  }

  .lp-link-flag-orange { color: #fdba74; }
  .lp-link-flag-red { color: #fca5a5; }
  .lp-link-flag-purple { color: #c4b5fd; }

  .lp-link-url {
    font-size: 11px;
    color: #9ca3af;
    max-width: 260px;
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
    width: 28px;
    height: 28px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    background: rgba(15,23,42,0.98);
    color: #e5e7eb;
    cursor: pointer;
    transition: all 0.18s ease-out;
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 10px 24px rgba(15,23,42,0.9);
  }

  .lp-btn-ghost svg { color: #bfdbfe; }
  .lp-btn-danger svg { color: #fecaca; }

  .lp-btn-ghost:hover {
    border-color: rgba(129,140,248,0.9);
    box-shadow:
      0 0 0 1px rgba(129,140,248,0.95),
      0 0 22px rgba(79,70,229,0.9);
  }

  .lp-btn-danger:hover {
    border-color: rgba(248,113,113,0.9);
    box-shadow:
      0 0 0 1px rgba(248,113,113,0.95),
      0 0 22px rgba(248,113,113,0.9);
  }

  .lp-links-mode {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 999px;
    border-width: 1px;
    border-style: solid;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  /* LISTA MOBILE */
  .lp-links-list {
    margin-top: 6px;
    display: none;
  }

  .lp-link-card {
    border-radius: 16px;
    padding: 10px 10px 10px;
    margin-bottom: 10px;
    border: 1px solid rgba(30,64,175,0.8);
    background: radial-gradient(circle at 0% 0%, rgba(30,64,175,0.7), rgba(15,23,42,0.96));
    box-shadow:
      0 16px 40px rgba(15,23,42,1),
      0 0 0 1px rgba(15,23,42,1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .lp-link-card:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow:
      0 22px 60px rgba(15,23,42,1),
      0 0 0 1px rgba(191,219,254,0.7);
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
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .lp-link-card-stats {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    align-items: center;
  }

  .lp-chip-stat,
  .lp-chip-money {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 600;
  }

  .lp-chip-stat {
    background: rgba(15,23,42,0.96);
    border: 1px solid rgba(148,163,184,0.7);
    color: #cbd5f5;
  }

  .lp-chip-stat svg {
    color: #9ca3af;
  }

  .lp-chip-money {
    background: rgba(22,163,74,0.16);
    border: 1px solid rgba(34,197,94,0.8);
    color: #bbf7d0;
  }

  .lp-link-card-actions {
    display: inline-flex;
    gap: 6px;
  }

  /* RESPONSIVE */
  .lp-desktop-only { display: table; }
  .lp-mobile-only { display: none; }

  @media (max-width: 900px) {
    .lp-links-inner {
      max-width: 100%;
      padding: 20px 16px 140px 16px;
    }
  }

  @media (max-width: 768px) {
    .lp-links-shell {
      left: 0;
    }
    .lp-desktop-only { display: none; }
    .lp-mobile-only { display: block; }

    .lp-links-filters-row {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }

    .lp-links-search {
      max-width: 100%;
    }

    .lp-links-search input {
      padding: 14px 14px 14px 38px;
      font-size: 16px;
      border-radius: 14px;
    }

    .lp-links-refresh {
      justify-content: center;
      width: 100%;
      padding: 14px;
      border-radius: 14px;
    }

    .lp-links-meta {
      font-size: 11px;
      align-items: flex-start;
      flex-direction: column;
      gap: 10px;
    }

    .lp-links-meta-pill {
      width: 100%;
      justify-content: center;
      padding: 8px 12px;
    }

    .lp-link-card {
      padding: 14px;
      margin-bottom: 12px;
    }

    .lp-btn-ghost,
    .lp-btn-danger {
      width: 40px;
      height: 40px;
    }

    .lp-chip-stat,
    .lp-chip-money {
      padding: 6px 10px;
      font-size: 11px;
    }
  }
`;
