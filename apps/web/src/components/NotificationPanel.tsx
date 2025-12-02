import React from 'react';
import { Bell, CheckCircle, AlertTriangle, DollarSign, X } from 'lucide-react';

export const NotificationPanel = ({ onClose }: { onClose: () => void }) => {
  const notifications = [
    { id: 1, type: 'success', title: 'Pago Procesado', msg: 'Hemos enviado €1,240.50 a tu PayPal.', time: 'Hace 2h' },
    { id: 2, type: 'warning', title: 'Alerta de Tráfico', msg: 'Detectamos tráfico inusual desde Indonesia.', time: 'Hace 5h' },
    { id: 3, type: 'info', title: 'Nuevo Récord', msg: '¡Has superado las 10k visitas hoy!', time: 'Hace 8h' },
  ];

  return (
    <div className="animate-enter" style={{
      position: 'absolute', top: '60px', right: '0', width: '320px',
      background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0',
      boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)', zIndex: 100, overflow: 'hidden'
    }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700' }}>Notificaciones</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><X size={14} color="#94A3B8" /></button>
      </div>
      
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {notifications.map(n => (
          <div key={n.id} style={{ padding: '16px', borderBottom: '1px solid #F8FAFC', display: 'flex', gap: '12px', cursor: 'pointer', transition: 'background 0.1s' }} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
             <div style={{ marginTop: '2px' }}>
               {n.type === 'success' && <div style={{ background: '#DCFCE7', padding: '6px', borderRadius: '50%' }}><DollarSign size={14} color="#15803D" /></div>}
               {n.type === 'warning' && <div style={{ background: '#FEF2F2', padding: '6px', borderRadius: '50%' }}><AlertTriangle size={14} color="#DC2626" /></div>}
               {n.type === 'info' && <div style={{ background: '#EFF6FF', padding: '6px', borderRadius: '50%' }}><Bell size={14} color="#2563EB" /></div>}
             </div>
             <div>
               <div style={{ fontSize: '13px', fontWeight: '600', color: '#0F172A', marginBottom: '2px' }}>{n.title}</div>
               <div style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.4' }}>{n.msg}</div>
               <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '4px' }}>{n.time}</div>
             </div>
          </div>
        ))}
      </div>
      
      <div style={{ padding: '10px', textAlign: 'center', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <button style={{ background: 'none', border: 'none', fontSize: '12px', fontWeight: '600', color: '#2563EB', cursor: 'pointer' }}>Marcar todo como leído</button>
      </div>
    </div>
  );
};
