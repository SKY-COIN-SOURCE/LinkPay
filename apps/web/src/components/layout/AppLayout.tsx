import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Link2,
  Wallet,
  Settings,
  LogOut,
  PlusSquare,
  Smartphone,
  Zap,
  BarChart2,
  Cpu,
  Users,
} from 'lucide-react';

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // NAV DEFINITIVA
  const navItems = [
    { icon: LayoutDashboard, label: 'Resumen',          path: '/app' },
    { icon: PlusSquare,      label: 'Crear Link',       path: '/app/create' },
    { icon: Smartphone,      label: 'Bio Page',         path: '/app/bio-editor' },
    { icon: BarChart2,       label: 'Analytics',        path: '/app/analytics' },
    { icon: Link2,           label: 'Mis Enlaces',      path: '/app/links' },
    { icon: Wallet,          label: 'Finanzas',         path: '/app/payouts' },
    { icon: Users,           label: 'Red de Referidos', path: '/app/referrals' },
    { icon: Settings,        label: 'Ajustes',          path: '/app/settings' },
    { icon: Cpu,             label: 'Tecnología',       path: '/app/technology' },
  ];

  const mobileNavItems = navItems;

  return (
    <div className="lp-app-shell">
      <style>{layoutStyles}</style>

      {/* SIDEBAR DESKTOP */}
      <aside className="lp-sidebar-desktop">
        <div className="lp-sidebar-header">
          <div className="lp-sidebar-logo-orb">
            <div className="lp-sidebar-logo-inner">
              <Zap size={16} color="#e5f2ff" />
            </div>
          </div>
          <div className="lp-sidebar-brand">
            <div className="lp-sidebar-title-row">
              <span className="lp-sidebar-title">LinkPay</span>
            </div>
            <span className="lp-sidebar-sub">Creator Studio</span>
          </div>
        </div>

        <nav className="lp-sidebar-nav">
          <div className="lp-nav-section-label">Panel principal</div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) =>
                'lp-nav-item' + (isActive ? ' active' : '')
              }
            >
              <span className="lp-nav-icon-wrap">
                <item.icon className="lp-nav-icon" size={18} strokeWidth={2.1} />
              </span>
              <span className="lp-nav-label">
                {item.label === 'Red de Referidos' ? 'Red de referidos' : item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="lp-sidebar-footer">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="lp-logout-btn"
          >
            <span className="lp-logout-icon-wrap">
              <LogOut size={16} />
            </span>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* NAV INFERIOR MÓVIL */}
      <nav className="lp-mobile-nav">
        <div className="lp-mobile-nav-inner">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) =>
                'lp-mobile-item' + (isActive ? ' active' : '')
              }
            >
              <div className="lp-mobile-icon-pill">
                <item.icon className="lp-mobile-icon" size={20} strokeWidth={2.1} />
              </div>
              <span className="lp-mobile-label">
                {item.label === 'Red de Referidos' ? 'Referidos' : item.label}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* CONTENIDO */}
      <main className="lp-main-shell">
        <Outlet />
      </main>
    </div>
  );
}

// ===================== ESTILOS LAYOUT =====================

const layoutStyles = `
  .lp-app-shell {
    display: flex;
    min-height: 100vh;
    background: #020617;
    position: relative;
    color: #e5e7eb;
    font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  }

  /* ===== SIDEBAR DESKTOP ===== */
  .lp-sidebar-desktop {
    width: 258px;
    padding: 20px 18px 20px 18px;
    border-right: 1px solid rgba(30, 64, 175, 0.7);
    background:
      radial-gradient(circle at 0% 0%, rgba(15,23,42,0.98), rgba(15,23,42,0.96)),
      radial-gradient(circle at 100% 100%, rgba(15,23,42,0.96), rgba(2,6,23,0.98));
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 0 0 1px rgba(15, 23, 42, 0.9),
      0 18px 60px rgba(0, 0, 0, 0.9);
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    z-index: 40;
  }

  .lp-sidebar-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 26px;
    padding-left: 4px;
  }

  .lp-sidebar-logo-orb {
    width: 34px;
    height: 34px;
    border-radius: 999px;
    background: radial-gradient(circle at 30% 0%, #4f46e5, #22c55e);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 0 0 1px rgba(191, 219, 254, 0.35),
      0 16px 30px rgba(15, 23, 42, 1);
  }

  .lp-sidebar-logo-inner {
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background: radial-gradient(circle at 30% 0%, #1d4ed8, #0f172a);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      inset 0 0 0 1px rgba(148, 163, 184, 0.6),
      0 10px 22px rgba(15, 23, 42, 0.9);
  }

  .lp-sidebar-brand {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .lp-sidebar-title-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .lp-sidebar-title {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: #f9fafb;
  }

  .lp-sidebar-sub {
    font-size: 11px;
    color: #9ca3af;
  }

  .lp-sidebar-nav {
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    overflow-y: auto;
    padding-right: 4px;
  }

  .lp-nav-section-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #6b7280;
    margin: 0 0 6px 6px;
  }

  .lp-nav-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 999px;
    text-decoration: none;
    color: #9ca3af;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition:
      background 0.18s ease,
      color 0.18s ease,
      transform 0.18s ease,
      box-shadow 0.18s ease;
  }

  .lp-nav-item::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: radial-gradient(circle at 0 0, rgba(59, 130, 246, 0.4), transparent 60%);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.18s ease;
  }

  .lp-nav-item:hover {
    background: rgba(15, 23, 42, 0.9);
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.9);
  }

  .lp-nav-item:hover::before {
    opacity: 0.7;
  }

  .lp-nav-item.active {
    background: radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.35), rgba(15,23,42,0.96));
    color: #f9fafb;
    box-shadow:
      0 0 0 1px rgba(191, 219, 254, 0.55),
      0 14px 32px rgba(15, 23, 42, 0.96);
  }

  .lp-nav-item.active::before {
    opacity: 0.9;
  }

  .lp-nav-icon-wrap {
    width: 26px;
    height: 26px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 0 0 1px rgba(30, 64, 175, 0.7);
  }

  .lp-nav-icon {
    color: #9ca3af;
  }

  .lp-nav-item.active .lp-nav-icon-wrap {
    background: radial-gradient(circle at 30% 0, #4f46e5, #1e293b);
    box-shadow:
      0 0 0 1px rgba(191, 219, 254, 0.65),
      0 10px 24px rgba(59, 130, 246, 0.7);
  }

  .lp-nav-item.active .lp-nav-icon {
    color: #e5f2ff;
  }

  .lp-nav-label {
    white-space: nowrap;
  }

  .lp-sidebar-footer {
    border-top: 1px solid rgba(30, 64, 175, 0.7);
    padding-top: 12px;
    margin-top: 12px;
  }

  .lp-logout-btn {
    width: 100%;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 999px;
    border: none;
    background: rgba(15, 23, 42, 0.9);
    color: #9ca3af;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.95);
    transition:
      background 0.18s ease,
      color 0.18s ease,
      transform 0.18s ease,
      box-shadow 0.18s ease;
  }

  .lp-logout-btn:hover {
    background: rgba(30, 64, 175, 0.95);
    color: #e5e7eb;
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(15, 23, 42, 1);
  }

  .lp-logout-icon-wrap {
    width: 22px;
    height: 22px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.96);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lp-logout-icon-wrap svg {
    color: #9ca3af;
  }

  .lp-logout-btn:hover .lp-logout-icon-wrap svg {
    color: #e5e7eb;
  }

  /* ===== MAIN ===== */
  .lp-main-shell {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 24px 24px 110px 24px;
    position: relative;
    z-index: 1;
  }

  /* ===== MOBILE NAV ===== */
  .lp-mobile-nav {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px 12px 14px 12px;
    display: none;
    z-index: 60;
    pointer-events: none;
  }

  .lp-mobile-nav-inner {
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px;
    border-radius: 999px;
    background: radial-gradient(circle at 50% 0%, rgba(15,23,42,0.94), rgba(15,23,42,0.96));
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(30, 64, 175, 0.9);
    box-shadow:
      0 0 0 1px rgba(15, 23, 42, 0.95),
      0 -8px 40px rgba(0, 0, 0, 0.9);
    overflow-x: auto;
  }

  .lp-mobile-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    text-decoration: none;
    color: #9ca3af;
    font-size: 9px;
    font-weight: 600;
    min-width: 64px;
    padding: 2px 4px;
    position: relative;
    transition: color 0.18s ease, transform 0.18s ease;
  }

  .lp-mobile-item.active {
    color: #e5e7eb;
    transform: translateY(-1px);
  }

  .lp-mobile-icon-pill {
    width: 28px;
    height: 28px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 23, 42, 0.96);
    box-shadow: inset 0 0 0 1px rgba(51, 65, 85, 0.9);
    transition:
      background 0.18s ease,
      box-shadow 0.18s ease,
      transform 0.18s ease;
  }

  .lp-mobile-item.active .lp-mobile-icon-pill {
    background: radial-gradient(circle at 30% 0%, #4f46e5, #1e293b);
    box-shadow:
      0 0 0 1px rgba(191, 219, 254, 0.65),
      0 10px 20px rgba(15, 23, 42, 1);
    transform: translateY(-1px);
  }

  .lp-mobile-icon {
    color: #9ca3af;
    transition: color 0.18s ease;
  }

  .lp-mobile-item.active .lp-mobile-icon {
    color: #e5f2ff;
  }

  .lp-mobile-label {
    white-space: nowrap;
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 768px) {
    .lp-sidebar-desktop {
      display: none;
    }
    .lp-main-shell {
      padding: 18px 14px 110px 14px;
      max-width: 520px;
    }
    .lp-mobile-nav {
      display: block;
    }
  }

  @media (min-width: 769px) {
    .lp-mobile-nav {
      display: none;
    }
  }
`;
