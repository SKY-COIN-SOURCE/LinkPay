import React from 'react';
import { Cpu, Zap, Activity, Network, ShieldCheck, Server } from 'lucide-react';

export function TechnologyPage() {
  return (
    <div className="animate-enter" style={{ maxWidth: '900px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '32px' }}>
        <h1 className="font-heading" style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
          LinkPay Neural Engine™
        </h1>
        <p style={{ color: '#64748B', fontSize: '16px' }}>
          Tecnología propietaria de optimización de subastas publicitarias en tiempo real.
        </p>
      </div>

      {/* DASHBOARD TECNOLÓGICO "BLACK BOX" */}
      <div style={{ background: '#0F172A', borderRadius: '20px', padding: '32px', color: 'white', marginBottom: '32px', boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.5)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '12px', height: '12px', background: '#22C55E', borderRadius: '50%', boxShadow: '0 0 10px #22C55E' }}></div>
              <span style={{ fontWeight: '700', letterSpacing: '1px', fontSize: '14px' }}>SISTEMA ONLINE</span>
           </div>
           <div style={{ fontFamily: 'monospace', color: '#94A3B8', fontSize: '13px' }}>
              v2.4.0-stable :: latency 12ms
           </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
           <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
              <Zap size={24} color="#FCD34D" style={{ marginBottom: '12px' }} />
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>VELOCIDAD DE SUBASTA</div>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>0.04s</div>
           </div>
           <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
              <Activity size={24} color="#3B82F6" style={{ marginBottom: '12px' }} />
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>PREDICCIÓN DE IA</div>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>99.8%</div>
           </div>
           <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
              <Network size={24} color="#A855F7" style={{ marginBottom: '12px' }} />
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>NODOS ACTIVOS</div>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>1,240</div>
           </div>
        </div>

        <div style={{ marginTop: '32px', padding: '16px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
           <ShieldCheck size={20} color="#22C55E" />
           <span style={{ fontSize: '13px', color: '#DCFCE7' }}>
             <strong>Protección Activa:</strong> El algoritmo está filtrando el 99% del tráfico bot para proteger tu reputación.
           </span>
        </div>

      </div>

      {/* EXPLICACIÓN DE LA INNOVACIÓN */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
         <div className="card-panel" style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Cpu size={18} /> Predictive CPM
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.6' }}>
               No vendemos tu tráfico al mejor postor. Nuestra IA predice qué anunciante pagará más en el futuro inmediato y reserva el espacio.
            </p>
         </div>
         <div className="card-panel" style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Server size={18} /> Edge Computing
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.6' }}>
               Tus enlaces cargan desde 240 puntos globales. La monetización ocurre en el borde (edge), eliminando latencia y aumentando conversiones.
            </p>
         </div>
      </div>

    </div>
  );
}
