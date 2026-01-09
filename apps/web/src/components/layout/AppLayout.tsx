import React, { useState, useEffect } from 'react';
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
  Users,
  Menu,
  X,
  ChevronRight,
  Home,
  User,
} from 'lucide-react';
import { useTranslation } from '../../i18n';
import { useAuth } from '../../context/AuthContext';
import { PWAInstallButton } from '../PWAInstall';
import { SplashScreen } from '../SplashScreen';
import { MobileHeader } from '../MobileHeader';

// Key para sessionStorage - solo mostrar splash una vez por sesión
const SPLASH_SHOWN_KEY = 'lp_splash_shown';

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, setLanguage, language } = useTranslation();
  const { signOut } = useAuth();
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Solo mostrar splash una vez por sesión (no en cada navegación)
  const [showSplash, setShowSplash] = useState(() => {
    const alreadyShown = sessionStorage.getItem(SPLASH_SHOWN_KEY);
    return !alreadyShown;
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem(SPLASH_SHOWN_KEY, 'true');
    setShowSplash(false);
  };

  // Función de logout real que cierra sesión de Supabase
  const handleLogout = async () => {
    setMoreMenuOpen(false);
    await signOut();
    navigate('/login', { replace: true });
  };

  // NAV DEFINITIVA - DESKTOP (sin Technology)
  const navItems = [
    { icon: LayoutDashboard, label: 'Resumen', path: '/app' },
    { icon: PlusSquare, label: 'Crear Link', path: '/app/create' },
    { icon: Smartphone, label: 'Bio Page', path: '/app/bio-editor' },
    { icon: BarChart2, label: 'Analytics', path: '/app/analytics' },
    { icon: Link2, label: 'Mis Enlaces', path: '/app/links' },
    { icon: Wallet, label: 'Finanzas', path: '/app/payouts' },
    { icon: Users, label: 'Red de Referidos', path: '/app/referrals' },
    { icon: Settings, label: 'Ajustes', path: '/app/settings' },
  ];

  // MOBILE NAV - 5 ITEMS: Bio, Links, Inicio, Billetera, Análisis
  const mobileNavLeft = [
    { icon: User, label: 'Bio', path: '/app/bio-editor' },
    { icon: Link2, label: 'Links', path: '/app/links' },
  ];

  const mobileNavRight = [
    { icon: Wallet, label: 'Billetera', path: '/app/payouts' },
    { icon: BarChart2, label: 'Análisis', path: '/app/analytics' },
  ];

  const handleMoreNavClick = (path: string) => {
    setMoreMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* SPLASH SCREEN - Solo en primera carga de sesión */}
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} minDuration={2800} />
      )}

      <div
        className={`lp-app-shell ${showSplash ? 'lp-hidden' : ''}`}
        style={{
          opacity: showSplash ? 0 : 1,
          transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          visibility: showSplash ? 'hidden' : 'visible',
        }}
      >
        <style>{layoutStyles}</style>

        {/* MOBILE HEADER - Avatar + Settings */}
        <MobileHeader />

        {/* SIDEBAR DESKTOP */}
        <aside className="lp-sidebar-desktop">
          <div className="lp-sidebar-header">
            <div className="lp-sidebar-logo-orb">
              <img
                src="/icons/icon-192.png"
                alt="LinkPay"
                className="lp-sidebar-logo-img"
                style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }}
              />
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

        {/* NAV INFERIOR MÓVIL - PREMIUM CENTERED DASHBOARD */}
        <nav className="lp-mobile-nav">
          <div className="lp-mobile-nav-inner">
            {/* LEFT SIDE: Bio, Create */}
            {mobileNavLeft.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
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

            {/* CENTER: DASHBOARD - ELEVATED & GLOWING */}
            <NavLink
              to="/app"
              end
              className={({ isActive }) =>
                'lp-mobile-item lp-mobile-center' + (isActive ? ' active' : '')
              }
            >
              <div className="lp-mobile-center-orb">
                <Home className="lp-mobile-center-icon" size={26} strokeWidth={2.2} />
              </div>
              <span className="lp-mobile-label">Inicio</span>
            </NavLink>

            {/* RIGHT SIDE: Referidos, Wallet */}
            {mobileNavRight.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
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
          </div>
        </nav>

        {/* CONTENIDO */}
        <main className="lp-main-shell">
          <Outlet />
        </main>

        {/* PWA Install Button for iOS Safari */}
        <PWAInstallButton />
      </div>
    </>
  );
}

// ===================== ESTILOS LAYOUT =====================

const layoutStyles = `
      .lp-app-shell {
        display: flex;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      min-height: 100vh;
      min-height: 100dvh;
      height: calc(var(--vh, 1vh) * 100);
      background: #020617;
      color: #e5e7eb;
      font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      margin: 0;
      padding: 0;
  }

      /* Extender fondo del app shell más abajo en móvil */
      @media (max-width: 768px) {
        .lp-app-shell {
          height: 100vh !important;
          height: calc(var(--vh, 1vh) * 100) !important;
        }
        
        .lp-app-shell::after {
          content: "";
          position: fixed;
          left: 0;
          right: 0;
          bottom: -200px;
          height: 200px;
          background: #020617;
          z-index: -1;
          pointer-events: none;
        }
      }

  /* Hide app shell during splash - completamente invisible */
  .lp-app-shell.lp-hidden {
    opacity: 0 !important;
    pointer-events: none !important;
    z-index: -1 !important;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }

  /* Fade-in suave cuando aparece la app */
  .lp-app-shell:not(.lp-hidden) {
    opacity: 1 !important;
    visibility: visible !important;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }

  .lp-app-shell.lp-hidden .lp-mobile-nav,
  .lp-app-shell.lp-hidden .lp-sidebar-desktop {
    display: none !important;
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
      height: 100%;
      min-height: 100%;
      padding: 24px 24px 110px 24px;
      position: relative;
      z-index: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
  }

      /* ===== MOBILE NAV - MOCK 1:1 (simple icons + green active) ===== */
      .lp-mobile-nav {
        position: fixed !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      display: none;
      z-index: 60;
      padding: 0 !important;
      margin: 0 !important;
      height: auto;
      max-height: none;
      background: transparent;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      border-top: none;
  }

      /* Remove legacy split background */
      .lp-mobile-nav::before {
        display: none;
  }

      .lp-mobile-nav::after {
        display: none;
  }

      .lp-mobile-nav-inner {
        display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(2, 6, 23, 0.88);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      padding: 0 18px calc(env(safe-area-inset-bottom, 14px) + 10px) 18px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: none;
      margin: 0;
      min-height: auto;
      height: fit-content;
  }

      .lp-mobile-item {
        display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      text-decoration: none;
      color: rgba(148, 163, 184, 0.85);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.02em;
      flex: 1;
      min-height: 48px;
      padding: 0 2px 6px 2px;
      border: none;
      background: transparent;
      cursor: pointer;
      position: relative;
      transition: all 0.2s ease;
      -webkit-tap-highlight-color: transparent;
  }

      .lp-mobile-item:active {
        transform: scale(0.98);
  }

      .lp-mobile-item.active {
        color: #4ade80;
  }

      .lp-mobile-icon-pill {
        width: 28px;
      height: 28px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

      .lp-mobile-item.active .lp-mobile-icon-pill {
        background: transparent;
      box-shadow: none;
      transform: none;
  }

      .lp-mobile-icon {
        color: rgba(148, 163, 184, 0.85);
      transition: all 0.25s ease;
  }

      .lp-mobile-item.active .lp-mobile-icon {
        color: #4ade80;
      filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.35));
  }

      .lp-mobile-label {
        white-space: nowrap;
      transition: all 0.2s ease;
      color: rgba(148, 163, 184, 0.85);
  }

      .lp-mobile-item.active .lp-mobile-label {
        font-weight: 700;
      color: #4ade80;
  }

      /* ===== CENTER (Inicio) - same style, just a touch bigger icon ===== */
      .lp-mobile-center {
        position: relative;
      flex: 1;
  }

      .lp-mobile-center-orb {
        width: 28px;
      height: 28px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      box-shadow: none;
      transform: none;
      transition: all 0.2s ease;
  }

      .lp-mobile-center:active .lp-mobile-center-orb {
        transform: scale(0.98);
  }

      .lp-mobile-center.active .lp-mobile-center-orb {
        background: transparent;
      box-shadow: none;
      transform: none;
  }

      .lp-mobile-center-icon {
        color: rgba(148, 163, 184, 0.85);
      transition: all 0.25s ease;
  }

      .lp-mobile-center.active .lp-mobile-center-icon {
        color: #4ade80;
      filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.4));
  }

      .lp-mobile-center .lp-mobile-label {
        font-weight: 700;
      color: rgba(148, 163, 184, 0.85);
  }

      .lp-mobile-center.active .lp-mobile-label {
        color: #4ade80;
  }

      /* More Button specific */
      .lp-more-btn {
        border: none;
      background: transparent;
  }

      /* ===== MORE MENU OVERLAY - PREMIUM SHEET ===== */
      .lp-more-backdrop {
        position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 100;
      animation: fadeIn 0.2s ease-out;
  }

      @keyframes fadeIn {
        from {opacity: 0; }
      to {opacity: 1; }
  }

      .lp-more-sheet {
        position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.99) 100%);
      border-top-left-radius: 28px;
      border-top-right-radius: 28px;
      padding: 0 0 calc(env(safe-area-inset-bottom, 20px) + 20px) 0;
      z-index: 101;
      animation: slideUp 0.35s cubic-bezier(0.32, 0.72, 0, 1);
      box-shadow:
      0 -12px 50px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(99, 102, 241, 0.1) inset;
      border-top: 1px solid rgba(99, 102, 241, 0.2);
  }

      @keyframes slideUp {
        from {transform: translateY(100%); }
      to {transform: translateY(0); }
  }

      .lp-more-header {
        display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 20px 16px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

      .lp-more-title {
        font-size: 18px;
      font-weight: 700;
      color: #f1f5f9;
      letter-spacing: -0.02em;
  }

      .lp-more-close {
        width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94a3b8;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
  }

      .lp-more-close:active {
        transform: scale(0.95);
      background: rgba(255, 255, 255, 0.1);
      color: #f1f5f9;
  }

      .lp-more-list {
        padding: 12px 16px;
  }

      .lp-more-item {
        width: 100%;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 14px;
      border-radius: 18px;
      border: none;
      background: transparent;
      color: #94a3b8;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      text-align: left;
      transition: all 0.2s ease;
      -webkit-tap-highlight-color: transparent;
  }

      .lp-more-item:active {
        transform: scale(0.99);
      background: rgba(99, 102, 241, 0.12);
      color: #f1f5f9;
  }

      .lp-more-item.active {
        background: rgba(99, 102, 241, 0.12);
      color: #a5b4fc;
  }

      .lp-more-icon {
        width: 48px;
      height: 48px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
  }

      .lp-more-item:active .lp-more-icon {
        background: rgba(99, 102, 241, 0.15);
      border-color: rgba(99, 102, 241, 0.2);
  }

      .lp-more-item.active .lp-more-icon {
        background: rgba(99, 102, 241, 0.15);
      border-color: rgba(99, 102, 241, 0.25);
  }

      .lp-more-label {
        flex: 1;
  }

      .lp-more-chevron {
        color: #475569;
      transition: all 0.2s ease;
  }

      .lp-more-item:active .lp-more-chevron {
        transform: translateX(4px);
      color: #94a3b8;
  }

      .lp-more-footer {
        padding: 16px 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      margin-top: 8px;
  }

      .lp-more-logout {
        width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 16px;
      border-radius: 16px;
      border: 1px solid rgba(239, 68, 68, 0.25);
      background: rgba(239, 68, 68, 0.08);
      color: #f87171;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      -webkit-tap-highlight-color: transparent;
  }

      .lp-more-logout:active {
        transform: scale(0.98);
      background: rgba(239, 68, 68, 0.15);
      border-color: rgba(239, 68, 68, 0.35);
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 768px) {
    .lp-sidebar-desktop {
      display: none;
    }
    .lp-main-shell {
      /* Padding-top for header, padding-bottom for nav */
      padding-top: 56px;
      padding-bottom: 80px;
      padding-left: 0;
      padding-right: 0;
      max-width: 100%;
      height: 100%;
      min-height: 100%;
    }
    .lp-mobile-nav {
      display: block !important;
      bottom: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    .lp-app-shell {
      height: 100vh !important;
      height: 100dvh !important;
      min-height: 100vh !important;
      min-height: 100dvh !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
    }
  }

  @media (min-width: 769px) {
    .lp-mobile-nav {
      display: none;
    }
  }
`;
