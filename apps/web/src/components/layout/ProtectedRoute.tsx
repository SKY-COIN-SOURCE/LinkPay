import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDataCache } from "../../context/DataCacheContext";

// Polyfill para requestIdleCallback en navegadores que no lo soportan
const requestIdleCallback = window.requestIdleCallback || ((cb: IdleRequestCallback) => {
  const start = Date.now();
  return setTimeout(() => {
    cb({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
    });
  }, 1);
}) as typeof window.requestIdleCallback;

type Props = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { prefetchAll } = useDataCache();

  // ═══════════════════════════════════════════════════════════════════════════
  // PREFETCH DATOS CRÍTICOS cuando el usuario está autenticado
  // Esto hace la navegación instantánea porque los datos ya están cacheados
  // Optimizado: Se ejecuta de forma asíncrona sin bloquear el render
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (user && !loading) {
      // Prefetch en background con delay para no interferir con la carga inicial
      // Usar setTimeout para que se ejecute después del primer render
      const timeoutId = setTimeout(() => {
        // Ejecutar en el siguiente tick para no bloquear
        requestIdleCallback(() => {
          prefetchAll().catch(console.error);
        }, { timeout: 2000 });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [user, loading, prefetchAll]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#020617',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {/* Logo animado */}
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4F46E5 0%, #22C55E 100%)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        <span style={{
          color: '#64748B',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '0.5px'
        }}>
          Cargando LinkPay...
        </span>
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    // Redirigir a /login para usuarios no autenticados
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

