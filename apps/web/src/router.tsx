import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Páginas Públicas / Auth (carga estática - críticas para SEO y primera impresión)
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Páginas Públicas de Enlaces (EL CORE DE NEGOCIO - carga estática)
import { RedirectPage } from './pages/link/RedirectPage';
import { PublicBioPage } from './pages/bio/PublicBioPage';

// Layouts y Seguridad (carga estática)
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// =====================================================
// LAZY LOADING - Páginas del Panel de Creador
// Estas se cargan bajo demanda cuando el usuario navega
// =====================================================

const DashboardPage = lazy(() => import('./pages/app/DashboardPage').then(m => ({ default: m.DashboardPage })));
const CreateLinkPage = lazy(() => import('./pages/app/CreateLinkPage').then(m => ({ default: m.CreateLinkPage })));
const LinksPage = lazy(() => import('./pages/app/LinksPage').then(m => ({ default: m.LinksPage })));
const LinksHub = lazy(() => import('./pages/app/LinksHub').then(m => ({ default: m.LinksHub })));
const AnalyticsPage = lazy(() => import('./pages/app/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const TechnologyPage = lazy(() => import('./pages/app/TechnologyPage').then(m => ({ default: m.TechnologyPage })));
const DevelopersPage = lazy(() => import('./pages/app/DevelopersPage').then(m => ({ default: m.DevelopersPage })));
const PayoutsPage = lazy(() => import('./pages/app/PayoutsPage').then(m => ({ default: m.PayoutsPage })));
const SettingsPage = lazy(() => import('./pages/app/SettingsPage').then(m => ({ default: m.SettingsPage })));
const BioEditorPage = lazy(() => import('./pages/app/BioEditorPage').then(m => ({ default: m.BioEditorPage })));
const ReferralsPage = lazy(() => import('./pages/app/ReferralsPage').then(m => ({ default: m.ReferralsPage })));

// Admin (lazy - solo staff accede)
const AdminPage = lazy(() => import('./pages/admin/AdminPage').then(m => ({ default: m.AdminPage })));

// =====================================================
// SKELETON LOADER PREMIUM para Suspense
// =====================================================
function PageSkeleton() {
  return (
    <div style={{
      width: '100%',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '3px solid rgba(99, 102, 241, 0.2)',
        borderTopColor: '#6366F1',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// Helper para envolver componentes con Suspense
function withSuspense(Component: React.LazyExoticComponent<React.ComponentType>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  // 1. Landing y Auth (Públicas - carga estática)
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },

  // 2. RUTAS CRÍTICAS DE MONETIZACIÓN (Públicas - carga estática)
  { path: "/l/:slug", element: <RedirectPage /> },
  { path: "/b/:username", element: <PublicBioPage /> },

  // 3. Panel de Administración (Staff - lazy)
  { path: "/admin", element: withSuspense(AdminPage) },

  // 4. Panel de Creador (Protegido con Login - Lazy Loading)
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: withSuspense(DashboardPage) },
      { path: "create", element: <Navigate to="/app/links" replace /> },
      { path: "links", element: withSuspense(CreateLinkPage) },
      { path: "my-links", element: withSuspense(LinksPage) },
      { path: "payouts", element: withSuspense(PayoutsPage) },
      { path: "finance", element: withSuspense(PayoutsPage) },
      { path: "analytics", element: withSuspense(AnalyticsPage) },
      { path: "technology", element: withSuspense(TechnologyPage) },
      { path: "developers", element: withSuspense(DevelopersPage) },
      { path: "settings", element: withSuspense(SettingsPage) },
      { path: "bio-editor", element: withSuspense(BioEditorPage) },
      { path: "referrals", element: withSuspense(ReferralsPage) },
    ],
  },

  // 5. Fallback
  { path: "*", element: <Navigate to="/" replace /> },
]);

