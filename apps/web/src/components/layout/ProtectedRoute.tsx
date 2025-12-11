import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type Props = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
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

