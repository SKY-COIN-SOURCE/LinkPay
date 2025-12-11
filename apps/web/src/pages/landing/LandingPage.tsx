import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Shield, BarChart3, Smartphone, Rocket, CreditCard, CheckCircle2, Play, MousePointer2, DollarSign } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export function LandingPage() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // =====================================================
  // DETECCIÓN DE SESIÓN ACTIVA
  // Si el usuario ya está autenticado → Dashboard directo
  // =====================================================
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Usuario autenticado, redirigir al Dashboard
          navigate('/app', { replace: true });
          return;
        }
      } catch (e) {
        console.warn('[LandingPage] Error checking session:', e);
      }
      setCheckingAuth(false);
    };
    checkSession();
  }, [navigate]);

  // Rotación automática de features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { title: "Bio Pages", desc: "Tu tarjeta de visita digital. Unifica tus redes y monetiza cada visita.", icon: Smartphone, color: "#EC4899" },
    { title: "Smart Links", desc: "Acorta URLs y gana dinero con cada clic gracias a nuestra tecnología publicitaria.", icon: Rocket, color: "#3B82F6" },
    { title: "Pagos Globales", desc: "Recibe tus ganancias en cualquier lugar del mundo. Rápido y seguro.", icon: CreditCard, color: "#22C55E" }
  ];

  // --- ESTILOS PREMIUM ---
  const styles = {
    wrapper: {
      background: '#030014',
      minHeight: '100vh',
      color: '#FFFFFF',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden' as 'hidden',
      position: 'relative' as 'relative'
    },
    nav: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative' as 'relative',
      zIndex: 50
    },
    hero: {
      maxWidth: '1200px',
      margin: '60px auto 100px',
      padding: '0 24px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      alignItems: 'center',
      position: 'relative' as 'relative',
      zIndex: 10
    },
    h1: {
      fontSize: 'clamp(48px, 6vw, 72px)',
      fontWeight: 900,
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
      marginBottom: '24px',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
      color: 'white',
      padding: '18px 40px',
      borderRadius: '100px',
      fontSize: '18px',
      fontWeight: 700,
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 0 40px rgba(79, 70, 229, 0.4)',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px'
    },
    glassCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      backdropFilter: 'blur(10px)',
      overflow: 'hidden' as 'hidden',
      transition: 'transform 0.3s ease'
    },
    featureCard: (isActive: boolean) => ({
      padding: '24px',
      borderRadius: '16px',
      background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
      border: isActive ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      gap: '16px',
      alignItems: 'start'
    })
  };

  // --- LOADING MIENTRAS VERIFICA SESIÓN ---
  if (checkingAuth) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#030014',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <style>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
        @keyframes pulse-ring { 0% { transform: scale(0.33); opacity: 1; } 80%, 100% { transform: scale(1); opacity: 0; } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .hover-glow:hover { box-shadow: 0 0 30px rgba(79, 70, 229, 0.2); border-color: rgba(79, 70, 229, 0.4); transform: translateY(-5px); }
        @media (max-width: 1024px) { .hero-grid { grid-template-columns: 1fr !important; text-align: center; } .hero-content { margin: 0 auto; } .mockup-container { display: none; } }
      `}</style>

      {/* Background Glows */}
      <div style={{ position: 'fixed', top: '-20%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'fixed', bottom: '-20%', left: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }}></div>

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <div style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)' }}>
            <Zap size={22} color="white" fill="white" />
          </div>
          LinkPay
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} style={{ background: 'transparent', color: '#94A3B8', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '15px' }}>Login</button>
          <button onClick={() => navigate('/register')} style={{ background: 'white', color: '#0F172A', padding: '10px 24px', borderRadius: '100px', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '14px', transition: 'transform 0.2s' }} className="hover:scale-105">Empezar Gratis</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div style={styles.hero} className="hero-grid">

        {/* Left Content */}
        <div className="hero-content">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', color: '#818CF8', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, marginBottom: '32px' }}>
            <span style={{ width: '8px', height: '8px', background: '#818CF8', borderRadius: '50%', boxShadow: '0 0 10px #818CF8' }}></span>
            Nueva Plataforma de Monetización v2.0
          </div>

          <h1 style={styles.h1}>
            Monetiza cada <br />
            <span style={{ color: '#818CF8', WebkitTextFillColor: '#818CF8' }}>Enlace y Visita.</span>
          </h1>

          <p style={{ fontSize: '18px', color: '#94A3B8', lineHeight: '1.6', marginBottom: '40px', maxWidth: '500px' }}>
            LinkPay transforma tu tráfico en ingresos. Crea Bio Pages impresionantes, acorta enlaces y gana dinero automáticamente. Sin complicaciones.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/register')} style={styles.ctaButton} className="hover:scale-105">
              Crear cuenta gratis <ArrowRight size={20} />
            </button>
            <button style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '18px 32px', borderRadius: '100px', fontSize: '16px', fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Play size={18} fill="currentColor" /> Ver Demo
            </button>
          </div>

          <div style={{ marginTop: '48px', display: 'flex', gap: '32px', color: '#64748B', fontSize: '14px', fontWeight: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="#10B981" /> Pagos Diarios</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="#10B981" /> Sin Comisiones Ocultas</div>
          </div>
        </div>

        {/* Right Mockup (Interactive) */}
        <div className="mockup-container" style={{ position: 'relative' }}>
          <div className="animate-float" style={{ ...styles.glassCard, padding: '32px', maxWidth: '500px', position: 'relative', zIndex: 20, boxShadow: '0 40px 100px -20px rgba(79, 70, 229, 0.3)' }}>

            {/* Header Mockup */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#1E293B' }}></div>
                <div>
                  <div style={{ width: '100px', height: '12px', background: '#334155', borderRadius: '4px', marginBottom: '6px' }}></div>
                  <div style={{ width: '60px', height: '8px', background: '#1E293B', borderRadius: '4px' }}></div>
                </div>
              </div>
              <div style={{ padding: '8px 16px', background: '#10B981', borderRadius: '8px', color: 'white', fontSize: '12px', fontWeight: 700 }}>+ €124.50</div>
            </div>

            {/* Feature List (Interactive) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {features.map((f, i) => (
                <div
                  key={i}
                  style={styles.featureCard(activeFeature === i)}
                  onClick={() => setActiveFeature(i)}
                >
                  <div style={{ padding: '10px', borderRadius: '10px', background: `${f.color}20`, color: f.color }}>
                    <f.icon size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px', color: activeFeature === i ? 'white' : '#94A3B8' }}>{f.title}</h4>
                    {activeFeature === i && (
                      <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.4' }}>{f.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Cursor Simulation */}
            <div style={{
              position: 'absolute',
              top: activeFeature === 0 ? '35%' : activeFeature === 1 ? '60%' : '85%',
              left: '80%',
              transition: 'all 0.5s ease',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
            }}>
              <MousePointer2 size={32} fill="white" color="black" />
            </div>

          </div>

          {/* Back Glow */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120%', height: '120%', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, rgba(0,0,0,0) 70%)', zIndex: 10 }}></div>
        </div>

      </div>

      {/* --- STATS SECTION --- */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
          {[
            { label: "Usuarios Activos", val: "10K+" },
            { label: "Pagos Procesados", val: "€500K+" },
            { label: "Enlaces Creados", val: "1M+" },
            { label: "Países", val: "150+" }
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: '40px', fontWeight: 900, color: 'white', marginBottom: '8px' }}>{s.val}</div>
              <div style={{ fontSize: '14px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CTA FINAL --- */}
      <div style={{ textAlign: 'center', padding: '120px 24px' }}>
        <h2 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '24px' }}>¿Listo para monetizar tu influencia?</h2>
        <p style={{ fontSize: '18px', color: '#94A3B8', marginBottom: '40px' }}>Únete a los creadores que ya están ganando con LinkPay.</p>
        <button onClick={() => navigate('/register')} style={styles.ctaButton} className="hover:scale-105">
          Comenzar Ahora <Rocket size={20} />
        </button>
      </div>

      {/* --- FOOTER --- */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '80px 24px', background: '#020617' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', background: '#4F46E5', borderRadius: '8px' }}></div> LinkPay
            </div>
            <p style={{ color: '#64748B', maxWidth: '300px', fontSize: '14px' }}>La plataforma definitiva para creadores de contenido.</p>
          </div>
          <div style={{ display: 'flex', gap: '80px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '20px', color: 'white' }}>Producto</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#94A3B8', fontSize: '14px' }}>
                <span>Bio Pages</span>
                <span>Smart Links</span>
                <span>Analytics</span>
              </div>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '20px', color: 'white' }}>Legal</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#94A3B8', fontSize: '14px' }}>
                <span>Términos</span>
                <span>Privacidad</span>
                <span>Contacto</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '80px auto 0', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: '#475569', fontSize: '13px' }}>
          © 2025 LinkPay Inc. Todos los derechos reservados.
        </div>
      </footer>

    </div>
  );
}
