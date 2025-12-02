import React, { useState, useEffect } from 'react';
import { Search, Filter, ExternalLink, Copy, Trash2, BarChart2, Loader2, Zap, Shield, Rocket, Lock, Clock, EyeOff } from 'lucide-react';
import { LinkService, Link } from '../../lib/linkService';

export function LinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadLinks = async () => {
    setLoading(true);
    try {
      const data = await LinkService.getAll();
      setLinks(data as any[]);
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  useEffect(() => { loadLinks(); }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Eliminar enlace?')) {
      try {
        await LinkService.deleteLink(id);
        setLinks(prev => prev.filter(l => l.id !== id));
      } catch (err) { alert("Error al eliminar."); }
    }
  };

  const copyLink = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/l/${slug}`);
    alert('Copiado');
  };

  const filteredLinks = links.filter(l => {
    const term = searchTerm.toLowerCase();
    return (l.slug?.toLowerCase().includes(term) || l.original_url.toLowerCase().includes(term));
  });

  const renderModeBadge = (mode: string) => {
    const styles = {
      lite: { bg: '#ECFDF5', color: '#047857', icon: <Shield size={12} /> },
      standard: { bg: '#EFF6FF', color: '#1D4ED8', icon: <Zap size={12} /> },
      turbo: { bg: '#FFF7ED', color: '#C2410C', icon: <Rocket size={12} /> },
    };
    const current = styles[mode as keyof typeof styles] || styles.standard;
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: current.bg, color: current.color, padding: '4px 8px', borderRadius: '100px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
        {current.icon} {mode}
      </span>
    );
  };

  return (
    <div className="animate-enter" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div><h1 style={{ fontSize: '28px', fontWeight: '900', margin: 0, color: '#0F172A' }}>Mis Enlaces</h1><p style={{ color: '#64748B', margin: '4px 0 0 0' }}>Gestiona tus activos digitales.</p></div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94A3B8' }} />
            <input placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '10px 16px 10px 40px', borderRadius: '12px', border: '1px solid #CBD5E1', width: '260px', outline: 'none' }} />
          </div>
          <button onClick={loadLinks} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '10px', borderRadius: '12px', cursor: 'pointer', color: '#64748B' }}><Filter size={20} /></button>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        {loading ? <div style={{ padding: '80px', textAlign: 'center' }}><Loader2 className="animate-spin" size={32} /></div> : 
         filteredLinks.length === 0 ? <div style={{ padding: '80px', textAlign: 'center', color: '#94A3B8' }}>No hay enlaces.</div> : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead><tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}><th style={{ padding: '16px 24px', fontSize: '12px', color: '#64748B' }}>ENLACE</th><th style={{ padding: '16px', fontSize: '12px', color: '#64748B' }}>MODO</th><th style={{ padding: '16px', fontSize: '12px', color: '#64748B' }}>VISITAS</th><th style={{ padding: '16px', fontSize: '12px', color: '#64748B' }}>REVENUE</th><th style={{ padding: '16px', textAlign: 'right' }}>ACCIONES</th></tr></thead>
              <tbody>
                {filteredLinks.map((link) => (
                  <tr key={link.id} style={{ borderBottom: '1px solid #F1F5F9' }} className="hover:bg-slate-50">
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '700', color: '#0F172A' }}>/{link.slug}</span>
                          {link.password && <Lock size={12} color="#F97316" />}
                          {link.expires_at && <Clock size={12} color="#EF4444" />}
                          {link.is_private && <EyeOff size={12} color="#8B5CF6" />}
                        </div>
                        <span style={{ fontSize: '13px', color: '#64748B', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.original_url}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>{renderModeBadge(link.monetization_mode || 'standard')}</td>
                    <td style={{ padding: '16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><BarChart2 size={16} color="#94A3B8" />{link.views}</div></td>
                    <td style={{ padding: '16px' }}><div style={{ fontWeight: '700', color: '#16A34A', fontFamily: 'monospace' }}>€{(link.earnings || 0).toFixed(4)}</div></td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button onClick={() => copyLink(link.slug)} style={{ background: '#EFF6FF', border: '1px solid #DBEAFE', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#2563EB' }}><Copy size={16} /></button>
                        <button onClick={() => handleDelete(link.id)} style={{ background: 'white', border: '1px solid #FECACA', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#DC2626' }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <style>{`.animate-spin { animation: spin 1s linear infinite; } .hover\\:bg-slate-50:hover { background-color: #F8FAFC; }`}</style>
    </div>
  );
}
