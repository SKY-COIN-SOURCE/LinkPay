import React from 'react';
import { Link2, Layout, X, ArrowRight, Zap } from 'lucide-react';

interface CreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateLink: () => void;
  onCreateBio: () => void;
}

export const CreationModal = ({ isOpen, onClose, onCreateLink, onCreateBio }: CreationModalProps) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: 'white', width: '100%', maxWidth: '600px', borderRadius: '24px',
        padding: '32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative', animation: 'scaleIn 0.2s ease-out'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', right: '24px', top: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
          <X size={24} />
        </button>

        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '8px', textAlign: 'center' }}>
          Centro de Creación
        </h2>
        <p style={{ textAlign: 'center', color: '#64748B', marginBottom: '32px' }}>Elige cómo quieres monetizar tu audiencia hoy.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* OPCIÓN 1: LINK CORTO */}
          <button 
            onClick={onCreateLink}
            className="hover-card"
            style={{ 
              background: '#F8FAFC', border: '2px solid #E2E8F0', borderRadius: '16px', padding: '24px',
              textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '16px'
            }}
          >
            <div style={{ background: '#DBEAFE', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
              <Link2 size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', margin: '0 0 4px 0' }}>Enlace Inteligente</h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: '1.4' }}>Acorta una URL, añade anuncios intermedios y gana por clic.</p>
            </div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#2563EB', display: 'flex', alignItems: 'center', gap: '4px', marginTop: 'auto' }}>
              Crear Link <ArrowRight size={14} />
            </div>
          </button>

          {/* OPCIÓN 2: BIO PAGE (NUEVO) */}
          <button 
            onClick={onCreateBio}
            className="hover-card"
            style={{ 
              background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', border: '2px solid #1E293B', borderRadius: '16px', padding: '24px',
              textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '100px' }}>NUEVO</div>
            <div style={{ background: 'rgba(255,255,255,0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F8FAFC' }}>
              <Layout size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'white', margin: '0 0 4px 0' }}>Link-in-Bio Page</h3>
              <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, lineHeight: '1.4' }}>Un perfil unificado para todas tus redes. Monetizable y personalizable.</p>
            </div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#60A5FA', display: 'flex', alignItems: 'center', gap: '4px', marginTop: 'auto' }}>
              Diseñar Página <Zap size={14} fill="#60A5FA" />
            </div>
          </button>

        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .hover-card:hover { transform: translateY(-4px); box-shadow: 0 10px 20px -5px rgba(0,0,0,0.1); border-color: #3B82F6 !important; }
      `}</style>
    </div>
  );
};
