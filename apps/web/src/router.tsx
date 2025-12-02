import { createBrowserRouter, Navigate } from 'react-router-dom';

// Páginas Públicas / Auth
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Páginas Públicas de Enlaces (EL CORE DE NEGOCIO)
import { RedirectPage } from './pages/link/RedirectPage';
import { PublicBioPage } from './pages/bio/PublicBioPage';

// App / Dashboard (Protegidas)
import { DashboardPage } from './pages/app/DashboardPage';
import { CreateLinkPage } from './pages/app/CreateLinkPage';
import { LinksPage } from './pages/app/LinksPage';
import { AnalyticsPage } from './pages/app/AnalyticsPage';
import { TechnologyPage } from './pages/app/TechnologyPage';
import { DevelopersPage } from './pages/app/DevelopersPage';
import { PayoutsPage } from './pages/app/PayoutsPage';
import { SettingsPage } from './pages/app/SettingsPage';
import { BioEditorPage } from './pages/app/BioEditorPage';
import { ReferralsPage } from './pages/app/ReferralsPage'; // <--- NUEVA IMPORTACIÓN

// Admin / Staff
import { AdminPage } from './pages/admin/AdminPage';

// Layouts y Seguridad
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

export const router = createBrowserRouter([
  // 1. Landing y Auth (Públicas)
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },

  // 2. RUTAS CRÍTICAS DE MONETIZACIÓN (Públicas)
  { path: "/l/:slug", element: <RedirectPage /> }, 
  { path: "/b/:username", element: <PublicBioPage /> },

  // 3. Panel de Administración (Staff)
  { path: "/admin", element: <AdminPage /> },

  // 4. Panel de Creador (Protegido con Login)
  { 
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "create", element: <CreateLinkPage /> },
      { path: "links", element: <LinksPage /> },
      { path: "finance", element: <PayoutsPage /> },
      { path: "payouts", element: <PayoutsPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "technology", element: <TechnologyPage /> },
      { path: "developers", element: <DevelopersPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "bio-editor", element: <BioEditorPage /> },
      { path: "referrals", element: <ReferralsPage /> }, // <--- NUEVA RUTA CONECTADA
    ],
  },

  // 5. Fallback
  { path: "*", element: <Navigate to="/" replace /> },
]);
