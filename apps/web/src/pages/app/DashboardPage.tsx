import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  MousePointer2, 
  BarChart3, 
  Plus, 
  Users, 
  Copy, 
  Loader2, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';

import { LinkService } from '../../lib/linkService';
import { BioService } from '../../lib/bioService';
import { supabase } from '../../lib/supabase';

type DashboardStats = {
  revenue: number;          // total enlaces + bio
  clicks: number;           // total enlaces + bio
  rpm: number;
  referralEarnings: number;

  // desglose
  revenueShort: number;
  revenueBio: number;
  clicksShort: number;
  clicksBio: number;
};

export function DashboardPage() {
  const navigate = useNavigate();
  
  const [stats, setStats] = useState<DashboardStats>({
    revenue: 0,
    clicks: 0,
    rpm: 0,
    referralEarnings: 0,
    revenueShort: 0,
    revenueBio: 0,
    clicksShort: 0,
    clicksBio: 0,
  });

  const [links, setLinks] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Perfil principal (para referidos, etc.)
      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(prof);

      // 2. Enlaces "normales" (convertidor)
      const realLinks = await LinkService.getAll();
      const safeLinks = realLinks || [];
      setLinks(safeLinks);

      const revenueShort = safeLinks.reduce(
        (acc: number, l: any) => acc + (Number(l.earnings) || 0),
        0
      );
      const clicksShort = safeLinks.reduce(
        (acc: number, l: any) => acc + (Number(l.views) || 0),
        0
      );

      // 3. BioPage (stats guardadas en bio_profiles)
      const bioProfile = await BioService.getOrCreateProfile(user);

      const revenueBio = Number(bioProfile?.earnings || 0);
      const clicksBio = Number(bioProfile?.views || 0);

      // 4. Totales combinados
      const totalRevenue = revenueShort + revenueBio;
      const totalClicks = clicksShort + clicksBio;
      const rpm =
        totalClicks > 0 ? (totalRevenue / totalClicks) * 1000 : 0;

      setStats({
        revenue: totalRevenue,
        clicks: totalClicks,
        rpm,
        referralEarnings: Number(prof?.referral_earnings) || 0,
        revenueShort,
        revenueBio,
        clicksShort,
        clicksBio,
      });
    } catch (error) {
      console.error('Error cargando dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyReferral = () => {
    if (profile?.id) {
      const refLink = `${window.location.origin}/register?ref=${
        profile.referral_code || profile.id
      }`;
      navigator.clipboard.writeText(refLink);
      alert('Link de referido copiado');
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div
      className="animate-enter pb-20 dashboard-root"
      style={{ maxWidth: '1200px', margin: '0 auto' }}
    >
      {/* HEADER */}
      <div
        className="dashboard-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div className="dashboard-header-text">
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '900',
              margin: '0 0 4px 0',
              color: '#0F172A',
              letterSpacing: '-0.5px',
            }}
          >
            Panel de Control
          </h1>
          <p
            style={{
              color: '#64748B',
              margin: 0,
              fontSize: '16px',
            }}
          >
            Resumen de tu actividad financiera en tiempo real.
          </p>
        </div>
        <button
          onClick={() => navigate('/app/create')}
          className="dashboard-cta-btn"
          style={{
            background: '#0F172A',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Plus size={20} /> Crear Nuevo Link
        </button>
      </div>

      {/* TARJETAS PRINCIPALES */}
      <div
        className="dashboard-cards-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {/* INGRESOS */}
        <div
          className="dashboard-card"
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                padding: '10px',
                background: '#DCFCE7',
                borderRadius: '12px',
                color: '#166534',
              }}
            >
              <DollarSign size={20} />
            </div>
            <p
              style={{
                margin: 0,
                color: '#64748B',
                fontSize: '13px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Ingresos Totales
            </p>
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: '32px',
              fontWeight: '800',
              color: '#0F172A',
            }}
          >
            €{stats.revenue.toFixed(4)}
          </h2>
          <div
            style={{
              marginTop: '8px',
              fontSize: '13px',
              color: '#16A34A',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: '600',
            }}
          >
            <TrendingUp size={14} /> Activo
          </div>
          <p
            style={{
              marginTop: '8px',
              fontSize: '12px',
              color: '#64748B',
            }}
          >
            De enlaces: €{stats.revenueShort.toFixed(4)} · De bio:
            €{stats.revenueBio.toFixed(4)}
          </p>
        </div>

        {/* CLICS */}
        <div
          className="dashboard-card"
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                padding: '10px',
                background: '#EFF6FF',
                borderRadius: '12px',
                color: '#1E40AF',
              }}
            >
              <MousePointer2 size={20} />
            </div>
            <p
              style={{
                margin: 0,
                color: '#64748B',
                fontSize: '13px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Clics Totales
            </p>
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: '32px',
              fontWeight: '800',
              color: '#0F172A',
            }}
          >
            {stats.clicks}
          </h2>
          <p
            style={{
              marginTop: '8px',
              fontSize: '12px',
              color: '#64748B',
            }}
          >
            De enlaces: {stats.clicksShort} · De bio: {stats.clicksBio}
          </p>
        </div>

        {/* REFERIDOS */}
        <div
          className="dashboard-card"
          style={{
            background:
              'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
            padding: '24px',
            borderRadius: '20px',
            color: 'white',
            boxShadow:
              '0 10px 15px -3px rgba(79, 70, 229, 0.2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '16px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  padding: '10px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                }}
              >
                <Users size={20} color="white" />
              </div>
              <p
                style={{
                  margin: 0,
                  opacity: 0.9,
                  fontSize: '13px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Referidos
              </p>
            </div>
            <button
              onClick={copyReferral}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                padding: '6px',
              }}
              title="Copiar Link"
            >
              <Copy size={16} color="white" />
            </button>
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: '32px',
              fontWeight: '800',
            }}
          >
            €{stats.referralEarnings.toFixed(2)}
          </h2>
          <p
            style={{
              fontSize: '13px',
              opacity: 0.7,
              marginTop: '8px',
            }}
          >
            Ganado por invitaciones
          </p>
        </div>

        {/* RPM */}
        <div
          className="dashboard-card"
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                padding: '10px',
                background: '#FFF7ED',
                borderRadius: '12px',
                color: '#9A3412',
              }}
            >
              <BarChart3 size={20} />
            </div>
            <p
              style={{
                margin: 0,
                color: '#64748B',
                fontSize: '13px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              RPM Medio
            </p>
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: '32px',
              fontWeight: '800',
              color: '#0F172A',
            }}
          >
            €{stats.rpm.toFixed(2)}
          </h2>
          <p
            style={{
              fontSize: '13px',
              color: '#64748B',
              marginTop: '8px',
            }}
          >
            Ingreso por 1000 visitas
          </p>
        </div>
      </div>

      {/* ULTIMOS ENLACES */}
      <div
        className="dashboard-recent"
        style={{
          background: 'white',
          border: '1px solid #E2E8F0',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '800',
              color: '#0F172A',
            }}
          >
            Actividad Reciente
          </h3>
          <button
            onClick={() => navigate('/app/links')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#4F46E5',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Ver todos <ArrowRight size={16} />
          </button>
        </div>

        {links.length === 0 ? (
          <div
            style={{
              padding: '60px',
              textAlign: 'center',
              color: '#94A3B8',
            }}
          >
            <p>No hay actividad aún.</p>
          </div>
        ) : (
          <>
            {/* Vista DESKTOP: tabla */}
            <table
              className="recent-table"
              style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <thead style={{ background: '#F8FAFC' }}>
                <tr>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '16px 24px',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#64748B',
                    }}
                  >
                    ENLACE
                  </th>
                  <th
                    style={{
                      textAlign: 'right',
                      padding: '16px 24px',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#64748B',
                    }}
                  >
                    VISITAS
                  </th>
                  <th
                    style={{
                      textAlign: 'right',
                      padding: '16px 24px',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#64748B',
                    }}
                  >
                    GENERADO
                  </th>
                </tr>
              </thead>
              <tbody>
                {links.slice(0, 5).map((link: any) => (
                  <tr
                    key={link.id}
                    style={{
                      borderBottom: '1px solid #F8FAFC',
                    }}
                  >
                    <td style={{ padding: '16px 24px' }}>
                      <div
                        style={{
                          fontWeight: '700',
                          color: '#0F172A',
                        }}
                      >
                        /{link.slug}
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: '#64748B',
                          maxWidth: '260px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {link.original_url}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: '16px 24px',
                        textAlign: 'right',
                        fontWeight: '600',
                        color: '#64748B',
                      }}
                    >
                      {link.views}
                    </td>
                    <td
                      style={{
                        padding: '16px 24px',
                        textAlign: 'right',
                      }}
                    >
                      <span
                        style={{
                          background: '#DCFCE7',
                          color: '#166534',
                          padding: '4px 10px',
                          borderRadius: '100px',
                          fontSize: '13px',
                          fontWeight: '700',
                        }}
                      >
                        €
                        {Number(link.earnings || 0).toFixed(4)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Vista MÓVIL: lista de tarjetas */}
            <div className="recent-list" style={{ display: 'none', padding: '16px' }}>
              {links.slice(0, 5).map((link: any) => (
                <div
                  key={link.id}
                  style={{
                    borderRadius: '14px',
                    border: '1px solid #E2E8F0',
                    padding: '12px 14px',
                    marginBottom: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    background: '#F9FAFB',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: '14px',
                          color: '#0F172A',
                        }}
                      >
                        /{link.slug}
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: '#64748B',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '100%',
                        }}
                      >
                        {link.original_url}
                      </div>
                    </div>
                    <span
                      style={{
                        background: '#DCFCE7',
                        color: '#166534',
                        padding: '4px 8px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      €{Number(link.earnings || 0).toFixed(4)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      color: '#94A3B8',
                      marginTop: '2px',
                    }}
                  >
                    <span>Visitas: {link.views}</span>
                    <span>Modo: {link.monetization_mode || 'standard'}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* CSS RESPONSIVE INLINE */}
      <style>{`
        @media (max-width: 768px) {
          .dashboard-root {
            padding: 0 16px 100px 16px;
          }
          .dashboard-header {
            align-items: flex-start;
          }
          .dashboard-header-text h1 {
            font-size: 24px !important;
          }
          .dashboard-header-text p {
            font-size: 13px !important;
          }
          .dashboard-cta-btn {
            width: 100%;
            justify-content: center;
            font-size: 14px;
            padding: 10px 16px !important;
          }
          .dashboard-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .dashboard-card {
            padding: 18px !important;
            border-radius: 16px !important;
          }
          .dashboard-card h2 {
            font-size: 22px !important;
          }
          .dashboard-card p {
            font-size: 11px !important;
          }
          .dashboard-recent {
            border-radius: 16px !important;
          }
          .recent-table {
            display: none !important;
          }
          .recent-list {
            display: block !important;
          }
        }

        @media (min-width: 769px) {
          .dashboard-root {
            padding-bottom: 80px;
          }
          .recent-table {
            display: table;
          }
          .recent-list {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
