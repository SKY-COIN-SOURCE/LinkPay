import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DataCacheProvider } from './context/DataCacheContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { ToastProvider } from './components/ui/Toast';
import { UpdateNotification } from './components/UpdateNotification';
import { ErrorBoundary } from './components/ErrorBoundary';
import { router } from './router';
import './index.css';

import { I18nProvider } from './i18n';

// Fix para eliminar hueco negro en móvil - forzar altura completa
function AppWrapper() {
  useEffect(() => {
    // Forzar que html/body/#root ocupen toda la pantalla en móvil
    const fixMobileHeight = () => {
      if (window.innerWidth <= 768) {
        const vh = window.innerHeight;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.body.style.height = `${vh}px`;
        const root = document.getElementById('root');
        if (root) {
          root.style.height = `${vh}px`;
        }
      }
    };

    fixMobileHeight();
    window.addEventListener('resize', fixMobileHeight);
    window.addEventListener('orientationchange', fixMobileHeight);

    return () => {
      window.removeEventListener('resize', fixMobileHeight);
      window.removeEventListener('orientationchange', fixMobileHeight);
    };
  }, []);

  return (
    <ErrorBoundary>
      <I18nProvider>
        <ThemeProvider>
          <AuthProvider>
            <NotificationsProvider>
              <DataCacheProvider>
                <ToastProvider>
                  <UpdateNotification />
                  <RouterProvider router={router} />
                </ToastProvider>
              </DataCacheProvider>
            </NotificationsProvider>
          </AuthProvider>
        </ThemeProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
);
