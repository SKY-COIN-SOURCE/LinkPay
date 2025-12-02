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
  Users 
} from 'lucide-react';

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // NAV DEFINITIVA (sin Developers, Tecnología debajo de Ajustes)
  const navItems = [
    { icon: LayoutDashboard, label: 'Resumen',         path: '/app' },
    { icon: PlusSquare,      label: 'Crear Link',      path: '/app/create' },
    { icon: Smartphone,      label: 'Bio Page',        path: '/app/bio-editor' },
    { icon: BarChart2,       label: 'Analytics',       path: '/app/analytics' },
    { icon: Link2,           label: 'Mis Enlaces',     path: '/app/links' },
    { icon: Wallet,          label: 'Finanzas',        path: '/app/payouts' },
    { icon: Users,           label: 'Red de Referidos',path: '/app/referrals' },
    { icon: Settings,        label: 'Ajustes',         path: '/app/settings' },
    { icon: Cpu,             label: 'Tecnología',      path: '/app/technology' },
  ];

  // En móvil ahora usamos TODOS los items (con scroll horizontal)
  const mobileNavItems = navItems;

  return (
    <div className="app-shell" style={{ display: 'flex', minHeight: '100vh', background: '#F8F9FC' }}>
      
      {/* SIDEBAR DESKTOP */}
      <aside
        className="sidebar-desktop"
        style={{ 
          width: '260px',
          background: 'white',
          borderRight: '1px solid #E2E8F0',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 50
        }}
      >
        <div style={{ marginBottom: '32px', paddingLeft: '12px' }}>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: '800',
              letterSpacing: '-0.5px',
              color: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                background: '#2563EB',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Zap size={14} color="white" fill="white" />
            </div>
            LinkPay
          </h1>
          <p
            style={{
              fontSize: '12px',
              color: '#64748B',
              marginTop: '4px',
              fontWeight: '500'
            }}
          >
            Creator Studio
          </p>
        </div>

        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flex: 1,
            overflowY: 'auto'
          }}
        >
          {navItems.map((item) => {
            const isActiveItem = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/app'}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: isActive ? '#0F172A' : '#64748B',
                  background: isActive ? '#F1F5F9' : 'transparent',
                  fontWeight: isActive ? '600' : '500',
                  transition: 'all 0.1s',
                  fontSize: '14px'
                })}
              >
                <item.icon
                  size={18}
                  strokeWidth={2}
                  color={isActiveItem ? '#2563EB' : 'currentColor'}
                />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              color: '#94A3B8',
              fontSize: '13px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 12px',
              fontWeight: '500'
            }}
          >
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* NAV INFERIOR MÓVIL (scroll horizontal con todas las secciones) */}
      <nav
        className="mobile-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid #E2E8F0',
          padding: '8px 8px 20px 8px',
          display: 'flex',
          alignItems: 'flex-end',
          zIndex: 100,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.03)',
          overflowX: 'auto',
          gap: '8px'
        }}
      >
        {mobileNavItems.map((item) => {
          const isCurrent = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              style={({ isActive }) => ({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
                color: isActive ? '#2563EB' : '#94A3B8',
                fontSize: '9px',
                fontWeight: '600',
                minWidth: '64px',
                padding: '4px 4px'
              })}
            >
              <item.icon size={20} strokeWidth={isCurrent ? 2.5 : 2} />
              <span>
                {item.label === 'Red de Referidos' ? 'Referidos' : item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <main
        style={{
          flex: 1,
          padding: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          paddingBottom: '110px' // espacio para que no tape la nav móvil
        }}
      >
        <Outlet />
      </main>

      <style>{`
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}
