import React, { useEffect, useState } from 'react';
import { Users, Copy, Share2, Network, Loader2 } from 'lucide-react';
import { ReferralService, ReferralNode } from '../../lib/referralService';
import { supabase } from '../../lib/supabase';
export function ReferralsPage() {
  const [network, setNetwork] = useState<ReferralNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [refCode, setRefCode] = useState('');
  const [totalNetworkEarnings, setTotalNetworkEarnings] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // 1) Código de referido
      const code = await ReferralService.getMyReferralCode();
      setRefCode(code || '');

      // 2) Árbol de red (para el gráfico)
      const data = await ReferralService.getNetwork();
      setNetwork(data);

      // 3) Comisiones reales desde la tabla profiles
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profileRow } = await supabase
          .from('profiles')
          .select('referral_earnings')
          .eq('id', user.id)
          .single();

        setTotalNetworkEarnings(
          Number(profileRow?.referral_earnings || 0)
        );
      } else {
        setTotalNetworkEarnings(0);
      }

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const copyLink = () => {
    const link = `${window.location.origin}/register?ref=${refCode}`;
    navigator.clipboard.writeText(link);
    alert('Enlace copiado');
  };

  // --- COMPONENTE DE NODO (CORREGIDO VISUALMENTE) ---
  const NodeCard = ({ node, isRoot }: { node: ReferralNode, isRoot?: boolean }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', padding: '0 12px' }}>
      
      {/* TARJETA DEL USUARIO */}
      <div style={{ 
        background: 'white', 
        padding: '12px', 
        borderRadius: '16px', 
        border: isRoot ? '2px solid #4F46E5' : '1px solid #E2E8F0',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        minWidth: '120px'
      }}>
        {/* Avatar Controlado */}
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 8px', border: '2px solid #F1F5F9' }}>
          {node.avatar_url ? (
            <img src={node.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#64748B' }}>
              {node.username?.[0]?.toUpperCase()}
            </div>
          )}
        </div>
        
        <div style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A' }}>@{node.username}</div>
        <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>€{node.total_earnings.toFixed(2)}</div>
        
        {!isRoot && (
          <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: node.level === 1 ? '#4F46E5' : '#10B981', color: 'white', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '10px' }}>
            {node.level === 1 ? '10%' : '5%'}
          </div>
        )}
      </div>

      {/* LÍNEA CONECTOR HACIA ABAJO */}
      {node.children.length > 0 && (
        <div style={{ width: '2px', height: '20px', background: '#CBD5E1' }}></div>
      )}

      {/* CONTENEDOR DE HIJOS (RAMAS) */}
      {node.children.length > 0 && (
        <div style={{ display: 'flex', position: 'relative', paddingTop: '20px' }}>
          {/* Barra Horizontal Superior que une a los hijos */}
          {node.children.length > 1 && (
            <div style={{ 
              position: 'absolute', top: 0, 
              left: '50%', right: '50%', // Truco CSS: expandiremos esto con JS o CSS calc si fuera dinámico, pero flex lo maneja visualmente mejor así:
              width: 'calc(100% - 120px)', // Ajuste aproximado
              marginLeft: '60px', // Offset
              height: '2px', background: '#CBD5E1', zIndex: 0 
            }}></div>
          )}
          {/* Barra conector individual para cada hijo */}
           <div style={{ display: 'flex', gap: '16px' }}>
            {node.children.map((child, idx) => (
              <div key={child.id} style={{ position: 'relative' }}>
                {/* Línea vertical hacia arriba para conectar con la barra horizontal */}
                <div style={{ position: 'absolute', top: '-22px', left: '50%', width: '2px', height: '22px', background: '#CBD5E1', transform: 'translateX(-50%)' }}></div>
                {/* Línea horizontal para conectar hermanos (Versión simplificada visual) */}
                {node.children.length > 1 && (
                  <div style={{ 
                    position: 'absolute', top: '-22px', height: '2px', background: '#CBD5E1',
                    left: idx === 0 ? '50%' : '0', 
                    right: idx === node.children.length - 1 ? '50%' : '0' 
                  }}></div>
                )}
                <NodeCard node={child} />
              </div>
            ))}
           </div>
        </div>
      )}
    </div>
  );

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}><Loader2 className="animate-spin text-indigo-600" /></div>;

  return (
    <div className="animate-enter" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '80px' }}>
      
      {/* HEADER */}
      <div style={{ background: '#1E1B4B', borderRadius: '24px', padding: '40px', color: 'white', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Network /> Red de Afiliados
          </h1>
          <p style={{ color: '#A5B4FC', maxWidth: '500px' }}>Invita creadores y construye tu imperio. Gana 10% de tus directos y 5% de sus invitados.</p>
          
          <div style={{ marginTop: '32px', display: 'flex', gap: '40px' }}>
             <div>
               <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#818CF8', textTransform: 'uppercase' }}>Tus Comisiones</div>
               <div style={{ fontSize: '36px', fontWeight: '900' }}>€{totalNetworkEarnings.toFixed(4)}</div>
             </div>
             <div>
               <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#818CF8', textTransform: 'uppercase' }}>Miembros</div>
               <div style={{ fontSize: '36px', fontWeight: '900' }}>{network?.children.length || 0}</div>
             </div>
          </div>
        </div>
        {/* Decoración fondo */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '300px', height: '300px', background: '#4338CA', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.5 }}></div>
      </div>

      {/* ENLACE DE INVITACIÓN */}
      <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', background: '#EFF6FF', borderRadius: '50%', color: '#2563EB' }}><Share2 size={24} /></div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>Tu Enlace Único</h3>
            <p style={{ fontSize: '14px', color: '#64748B' }}>Comparte para crecer.</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F8FAFC', padding: '10px 16px', borderRadius: '12px', border: '1px solid #E2E8F0', flex: 1, maxWidth: '500px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '14px', color: '#334155', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {window.location.origin}/register?ref={refCode}
          </span>
          <button onClick={copyLink} style={{ background: '#2563EB', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
            <Copy size={14} /> Copiar
          </button>
        </div>
      </div>

      {/* VISUALIZADOR DE ARBOL */}
      <div style={{ background: '#F8FAFC', borderRadius: '24px', border: '1px solid #E2E8F0', padding: '60px 20px', overflowX: 'auto', textAlign: 'center', minHeight: '400px' }}>
        <div style={{ display: 'inline-block', minWidth: '100%' }}>
          {network ? (
             <NodeCard node={network} isRoot={true} />
          ) : (
             <div style={{ color: '#94A3B8' }}>Cargando red...</div>
          )}
        </div>
      </div>

    </div>
  );
}
