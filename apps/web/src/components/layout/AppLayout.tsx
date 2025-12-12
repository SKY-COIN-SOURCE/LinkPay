import React, { useState } from 'react';
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
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from '../../i18n';
import { useAuth } from '../../context/AuthContext';
import { PWAInstallButton } from '../PWAInstall';

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, setLanguage, language } = useTranslation();
  const { signOut } = useAuth();
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Función de logout real que cierra sesión de Supabase
  const handleLogout = async () => {
    setMoreMenuOpen(false);
    await signOut();
    navigate('/login', { replace: true });
  };

  // NAV DEFINITIVA - DESKTOP (all items)
  const navItems = [
    { icon: LayoutDashboard, label: 'Resumen', path: '/app' },
    { icon: PlusSquare, label: 'Crear Link', path: '/app/create' },
    { icon: Smartphone, label: 'Bio Page', path: '/app/bio-editor' },
    { icon: BarChart2, label: 'Analytics', path: '/app/analytics' },
    { icon: Link2, label: 'Mis Enlaces', path: '/app/links' },
    { icon: Wallet, label: 'Finanzas', path: '/app/payouts' },
    { icon: Users, label: 'Red de Referidos', path: '/app/referrals' },
    { icon: Settings, label: 'Ajustes', path: '/app/settings' },
    { icon: Cpu, label: 'Tecnología', path: '/app/technology' },
  ];

  // MOBILE PRIMARY NAV - 5 items (Wallet ALWAYS visible - bank-grade)
  const primaryMobileNav = [
    { icon: LayoutDashboard, label: 'Inicio', path: '/app' },
    { icon: PlusSquare, label: 'Crear', path: '/app/create' },
    { icon: Wallet, label: 'Wallet', path: '/app/payouts' },
    { icon: Smartphone, label: 'Bio', path: '/app/bio-editor' },
  ];

  // MOBILE MORE MENU - Secondary items
  const secondaryMobileNav = [
    { icon: Link2, label: 'Mis Enlaces', path: '/app/links' },
    { icon: BarChart2, label: 'Analytics', path: '/app/analytics' },
    { icon: Users, label: 'Red de Referidos', path: '/app/referrals' },
    { icon: Settings, label: 'Ajustes', path: '/app/settings' },
    { icon: Cpu, label: 'Tecnología', path: '/app/technology' },
  ];

  const handleMoreNavClick = (path: string) => {
    setMoreMenuOpen(false);
    navigate(path);
  };

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
          <div className="lp-lang-switcher">
            <button
              className={`lp-lang-btn ${language === 'es' ? 'active' : ''}`}
              onClick={() => setLanguage('es')}
            >
              ES
            </button>
            <button
              className={`lp-lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button
              className={`lp-lang-btn ${language === 'fr' ? 'active' : ''}`}
              onClick={() => setLanguage('fr')}
            >
              FR
            </button>
            <button
              className={`lp-lang-btn ${language === 'it' ? 'active' : ''}`}
              onClick={() => setLanguage('it')}
            >
              IT
            </button>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="lp-logout-btn"
          >
            <span className="lp-logout-icon-wrap">
              <LogOut size={16} />
            </span>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* NAV INFERIOR MÓVIL - BANK GRADE */}
      <nav className="lp-mobile-nav">
        <div className="lp-mobile-nav-inner">
          {primaryMobileNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) =>
                'lp-mobile-item' + (isActive ? ' active' : '')
              }
            >
              <div className="lp-mobile-icon-pill">
                <item.icon className="lp-mobile-icon" size={22} strokeWidth={2} />
              </div>
              <span className="lp-mobile-label">{item.label}</span>
            </NavLink>
          ))}

          {/* MORE BUTTON */}
          <button
            className={`lp-mobile-item lp-more-btn ${moreMenuOpen ? 'active' : ''}`}
            onClick={() => setMoreMenuOpen(true)}
          >
            <div className="lp-mobile-icon-pill">
              <Menu className="lp-mobile-icon" size={22} strokeWidth={2} />
            </div>
            <span className="lp-mobile-label">Más</span>
          </button>
        </div>
      </nav>

      {/* MORE MENU OVERLAY - BANK GRADE SHEET */}
      {moreMenuOpen && (
        <>
          <div
            className="lp-more-backdrop"
            onClick={() => setMoreMenuOpen(false)}
          />
          <div className="lp-more-sheet">
            <div className="lp-more-header">
              <span className="lp-more-title">Más opciones</span>
              <button
                className="lp-more-close"
                onClick={() => setMoreMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="lp-more-list">
              {secondaryMobileNav.map((item) => (
                <button
                  key={item.path}
                  className={`lp-more-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => handleMoreNavClick(item.path)}
                >
                  <div className="lp-more-icon">
                    <item.icon size={20} />
                  </div>
                  <span className="lp-more-label">{item.label}</span>
                  <ChevronRight size={16} className="lp-more-chevron" />
                </button>
              ))}
            </div>
            <div className="lp-more-footer">
              <button className="lp-more-logout" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* CONTENIDO */}
      <main className="lp-main-shell">
        <Outlet />
      </main>

      {/* PWA Install Button for iOS Safari */}
      <PWAInstallButton />
    </div>
  );
}

// ===================== ESTILOS LAYOUT =====================

const layoutStyles = `
  .lp-app-shell {
    display: flex;
    min-height: 100dvh;
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
    height: 100dvh;
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
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .lp-lang-switcher {
    display: flex;
    gap: 4px;
    justify-content: center;
    margin-bottom: 4px;
  }

  .lp-lang-btn {
    background: transparent;
    border: 1px solid rgba(148, 163, 184, 0.4);
    color: #9ca3af;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .lp-lang-btn:hover {
    border-color: rgba(148, 163, 184, 0.8);
    color: #e5e7eb;
  }

  .lp-lang-btn.active {
    background: rgba(59, 130, 246, 0.2);
    border-color: #3b82f6;
    color: #60a5fa;
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

  /* ===== MOBILE NAV - BANK GRADE ===== */
  .lp-mobile-nav {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 8px 16px calc(env(safe-area-inset-bottom, 8px) + 8px) 16px;
    display: none;
    z-index: 60;
    pointer-events: none;
  }

  .lp-mobile-nav-inner {
    pointer-events: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 8px 4px;
    border-radius: 24px;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(2, 6, 23, 0.98) 100%);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(59, 130, 246, 0.2);
    box-shadow:
      0 -4px 24px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(15, 23, 42, 0.9);
  }

  .lp-mobile-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    text-decoration: none;
    color: #64748b;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.02em;
    min-width: 56px;
    min-height: 56px;
    padding: 4px;
    border: none;
    background: transparent;
    cursor: pointer;
    position: relative;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .lp-mobile-item:active {
    transform: scale(0.95);
  }

  .lp-mobile-item.active {
    color: #f1f5f9;
  }

  .lp-mobile-icon-pill {
    width: 40px;
    height: 40px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .lp-mobile-item.active .lp-mobile-icon-pill {
    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
    box-shadow:
      0 4px 16px rgba(99, 102, 241, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  .lp-mobile-icon {
    color: #64748b;
    transition: color 0.2s ease;
  }

  .lp-mobile-item.active .lp-mobile-icon {
    color: #ffffff;
  }

  .lp-mobile-label {
    white-space: nowrap;
  }

  /* More Button specific */
  .lp-more-btn {
    border: none;
    background: transparent;
  }

  /* ===== MORE MENU OVERLAY - BANK GRADE SHEET ===== */
  .lp-more-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 100;
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .lp-more-sheet {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding: 0 0 calc(env(safe-area-inset-bottom, 16px) + 16px) 0;
    z-index: 101;
    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.5);
    border-top: 1px solid rgba(59, 130, 246, 0.2);
  }

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  .lp-more-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 16px 20px;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  }

  .lp-more-title {
    font-size: 18px;
    font-weight: 700;
    color: #f1f5f9;
    letter-spacing: -0.02em;
  }

  .lp-more-close {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(148, 163, 184, 0.1);
    border: none;
    color: #94a3b8;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .lp-more-close:hover {
    background: rgba(148, 163, 184, 0.2);
    color: #f1f5f9;
  }

  .lp-more-list {
    padding: 8px 12px;
  }

  .lp-more-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 12px;
    border-radius: 14px;
    border: none;
    background: transparent;
    color: #94a3b8;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    transition: all 0.2s ease;
  }

  .lp-more-item:hover {
    background: rgba(59, 130, 246, 0.08);
    color: #f1f5f9;
  }

  .lp-more-item.active {
    background: rgba(99, 102, 241, 0.15);
    color: #a5b4fc;
  }

  .lp-more-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: rgba(148, 163, 184, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .lp-more-item:hover .lp-more-icon {
    background: rgba(59, 130, 246, 0.15);
  }

  .lp-more-item.active .lp-more-icon {
    background: rgba(99, 102, 241, 0.2);
  }

  .lp-more-label {
    flex: 1;
  }

  .lp-more-chevron {
    color: #475569;
    transition: transform 0.2s ease;
  }

  .lp-more-item:hover .lp-more-chevron {
    transform: translateX(2px);
    color: #94a3b8;
  }

  .lp-more-footer {
    padding: 12px 20px;
    border-top: 1px solid rgba(148, 163, 184, 0.1);
    margin-top: 8px;
  }

  .lp-more-logout {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px;
    border-radius: 14px;
    border: 1px solid rgba(239, 68, 68, 0.2);
    background: rgba(239, 68, 68, 0.08);
    color: #f87171;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .lp-more-logout:hover {
    background: rgba(239, 68, 68, 0.15);
    border-color: rgba(239, 68, 68, 0.3);
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 768px) {
    .lp-sidebar-desktop {
      display: none;
    }
    .lp-main-shell {
      padding: 16px 16px 120px 16px;
      max-width: 100%;
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
