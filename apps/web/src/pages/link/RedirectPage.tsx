import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Loader2, ExternalLink, AlertTriangle, Clock } from 'lucide-react';
import { LinkService } from '../../lib/linkService';
import { BioService } from '../../lib/bioService';

// --------- HELPER: INFO DEL CLIENTE (DEVICE + COUNTRY APROX) ----------
function getClientInfo() {
  let device: string = 'Desktop';
  if (typeof navigator !== 'undefined') {
    const ua = navigator.userAgent || '';
    if (/tablet|ipad|playbook|silk/i.test(ua)) device = 'Tablet';
    else if (/Mobile|Android|iPhone|iPod|IEMobile|BlackBerry/i.test(ua)) device = 'Mobile';
  }

  let country = 'Unknown';
  if (typeof navigator !== 'undefined' && navigator.language) {
    const parts = navigator.language.split('-'); // es-ES -> ['es','ES']
    if (parts[1]) country = parts[1].toUpperCase();
  }

  return { device, country };
}

export function RedirectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  const [linkData, setLinkData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(5);
  const [canContinue, setCanContinue] = useState(false);
  const adsInjected = useRef(false);

  // ======================================================
  // 1. CARGA DEL ENLACE (BIO REDIRECT o SMART LINK NORMAL)
  // ======================================================
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setError('');

      try {
        // ---- CASO A: Link generado desde Bio Page ----
        if (slug === 'bio-redirect') {
          const url = searchParams.get('url');
          const title = searchParams.get('title');
          const mode = searchParams.get('m') || 'lite';
          const pid = searchParams.get('pid'); // id del bio_profile

          if (!url) {
            throw new Error('Destino no válido.');
          }

          const client = getClientInfo();

          // Datos mínimos para la UI
          setLinkData({
            title: title || 'Sitio Externo',
            original_url: url,
            monetization_mode: mode,
          });
          setLoading(false);

          // Registrar click en Bio (AHORA SE HACE EN EL TIMER)
          // if (pid) BioService.trackLinkClick(...)

          // ---- CASO B: Smart Link normal (tabla links) ----
        } else if (slug) {
          try {
            const data = await LinkService.getLinkBySlug(slug);

            if (data) {
              setLinkData(data);
              setLoading(false);

              // Registrar click normal (AHORA SE HACE EN EL TIMER)
              // LinkService.trackClick(...)
            } else {
              setError('Enlace no encontrado.');
              setLoading(false);
            }
          } catch (dberr: any) {
            console.error('[RedirectPage] Supabase error', dberr);
            setError('Error de servidor al cargar el enlace.');
            setLoading(false);
          }

        } else {
          // No hay slug
          setError('Enlace no encontrado.');
          setLoading(false);
        }
      } catch (err) {
        console.error('[RedirectPage] Error procesando el enlace', err);
        setError('Error procesando el enlace.');
        setLoading(false);
      }
    };

    init();
  }, [slug, searchParams]);

  // ===================================
  // 2. INYECCIÓN DE PUBLICIDAD (IGUAL)
  // ===================================
  useEffect(() => {
    if (loading || !linkData || adsInjected.current) return;

    const injectAd = () => {
      const body = document.body;
      const script = document.createElement('script');
      const mode = linkData.monetization_mode;

      if (mode === 'lite') {
        script.innerHTML = `(function(s){s.dataset.zone='10241642',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`;
      } else if (mode === 'standard') {
        script.innerHTML = `(function(s){s.dataset.zone='10241641',s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`;
      } else if (mode === 'turbo') {
        script.src = 'https://quge5.com/88/tag.min.js';
        script.dataset.zone = '188350';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
      }

      body.appendChild(script);
      adsInjected.current = true;
    };

    injectAd();
  }, [loading, linkData]);

  // ========================
  // 3. TIMER & TRACKING (Prevent Bots)
  // ========================
  useEffect(() => {
    if (loading || error) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanContinue(true);

          // --- SECURE TRACKING TRIGGER ---
          // Solo contamos la visita si el usuario esperó los 5 segundos.
          const client = getClientInfo();

          if (slug === 'bio-redirect') {
            // Tracking para Bio Page
            const pid = searchParams.get('pid');
            const mode = searchParams.get('m') || 'lite';
            if (pid) {
              BioService.trackLinkClick(pid, mode, {
                country: client.country,
                device: client.device,
              }).catch(console.error);
            }
          } else if (slug) {
            // Tracking para Smart Link normal
            LinkService.trackClick(slug, {
              device: client.device,
              country: client.country,
            }).catch(console.error);
          }
          // -------------------------------

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, error, slug, searchParams]);

  const handleContinue = () => {
    if (linkData?.original_url) {
      window.location.href = linkData.original_url;
    }
  };

  // =====================
  // 4. ESTILOS DE LA UI
  // =====================

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    background: 'radial-gradient(circle at top, #0F172A 0%, #020617 55%, #020617 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    color: '#E5E7EB',
  };

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: 420,
    borderRadius: 24,
    padding: 20,
    background: 'rgba(15,23,42,0.92)',
    boxShadow: '0 24px 60px rgba(0,0,0,0.65)',
    border: '1px solid rgba(148,163,184,0.3)',
    backdropFilter: 'blur(18px)',
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 12px',
    borderRadius: 999,
    background: 'rgba(22,163,74,0.1)',
    border: '1px solid rgba(34,197,94,0.4)',
    color: '#BBF7D0',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 16,
  };

  const titleBoxStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 600,
    color: '#9CA3AF',
    marginBottom: 6,
    textAlign: 'left',
  };

  const targetStyle: React.CSSProperties = {
    fontSize: 17,
    fontWeight: 700,
    color: '#E5E7EB',
    background: 'rgba(15,23,42,0.9)',
    borderRadius: 16,
    padding: 14,
    border: '1px solid rgba(55,65,81,0.8)',
    maxHeight: 80,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    marginBottom: 20,
  };

  const footerBrandStyle: React.CSSProperties = {
    marginTop: 18,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#6B7280',
    textAlign: 'center',
  };

  const timeCircleWrapper: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  };

  const circleStyle: React.CSSProperties = {
    width: 96,
    height: 96,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 30% 20%, #4F46E5 0%, #1E40AF 35%, #020617 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    boxShadow: '0 0 0 4px rgba(79,70,229,0.3)',
  };

  // =====================
  // 5. VISTAS PRINCIPALES
  // =====================

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <Loader2 className="animate-spin" size={32} />
            <p style={{ fontSize: 13, color: '#9CA3AF', margin: 0 }}>Preparando tu enlace seguro…</p>
          </div>
        </div>
        <style>
          {`.animate-spin { animation: spin 1s linear infinite; }
            @keyframes spin { 100% { transform: rotate(360deg); } }`}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(248,113,113,0.7)',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AlertTriangle size={30} color="#F87171" />
              </div>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px', color: '#F9FAFB' }}>
              Enlace no encontrado.
            </h2>
            <p style={{ fontSize: 13, color: '#9CA3AF', margin: '0 0 20px' }}>
              Es posible que haya expirado o que la URL sea incorrecta.
            </p>
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '10px 18px',
                borderRadius: 999,
                background: '#111827',
                color: 'white',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid #1F2937',
              }}
            >
              Volver a LinkPay
            </a>
            <div style={footerBrandStyle}>LinkPay · Infraestructura de monetización</div>
          </div>
        </div>
      </div>
    );
  }

  const safeTitle =
    linkData?.title ? decodeURIComponent(linkData.title) : 'Sitio externo';

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Badge superior */}
        <div style={badgeStyle}>
          <ShieldCheck size={14} />
          <span>Enlace verificado por LinkPay</span>
        </div>

        {/* Info del destino */}
        <div style={titleBoxStyle}>Te diriges a</div>
        <div style={targetStyle}>{safeTitle}</div>

        {/* Cuenta atrás / botón */}
        <div style={timeCircleWrapper}>
          {!canContinue ? (
            <div style={circleStyle}>
              <Clock size={18} style={{ opacity: 0.9, marginBottom: 4 }} />
              <div style={{ fontSize: 32, fontWeight: 900, lineHeight: 1 }}>{timeLeft}</div>
              <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.9 }}>segundos</div>
            </div>
          ) : (
            <button
              onClick={handleContinue}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                background:
                  'linear-gradient(135deg, #4F46E5 0%, #6366F1 40%, #22C55E 100%)',
                color: 'white',
                fontSize: 15,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow:
                  '0 18px 40px rgba(79,70,229,0.45), 0 0 0 1px rgba(255,255,255,0.05)',
              }}
            >
              Continuar
              <ExternalLink size={18} />
            </button>
          )}
        </div>

        {/* Barra de progreso */}
        {!canContinue && (
          <div
            style={{
              height: 4,
              width: '100%',
              background: 'rgba(31,41,55,0.9)',
              borderRadius: 999,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${((5 - timeLeft) / 5) * 100}%`,
                background: 'linear-gradient(to right, #4F46E5, #22C55E)',
                transition: 'width 1s linear',
              }}
            />
          </div>
        )}

        <div style={{ marginTop: 14, fontSize: 11, color: '#6B7280', textAlign: 'center' }}>
          Protegido por la capa anti-fraude de LinkPay. Nunca compartas tus contraseñas.
        </div>

        <div style={footerBrandStyle}>LinkPay · Monetiza cada clic</div>
      </div>

      <style>
        {`.animate-spin { animation: spin 1s linear infinite; }
          @keyframes spin { 100% { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
}
