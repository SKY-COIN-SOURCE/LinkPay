import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Shield, BarChart3, Smartphone, Rocket, CreditCard, CheckCircle2 } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  // --- ESTILOS PREMIUM (CSS-IN-JS BLINDADO) ---
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
      padding: '20px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative' as 'relative',
      zIndex: 50
    },
    hero: {
      maxWidth: '1000px',
      margin: '80px auto 60px',
      textAlign: 'center' as 'center',
      padding: '0 20px',
      position: 'relative' as 'relative',
      zIndex: 10
    },
    h1: {
      fontSize: 'clamp(40px, 8vw, 72px)', // Responsive font size
      fontWeight: 900,
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
      margin: '24px 0',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(99, 102, 241, 0.1)',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      color: '#818CF8',
      padding: '6px 16px',
      borderRadius: '100px',
      fontSize: '14px',
      fontWeight: 600,
      marginBottom: '24px',
      animation: 'fadeIn 1s ease-out'
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
      color: 'white',
      padding: '18px 40px',
      borderRadius: '12px',
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
    bentoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      maxWidth: '1100px',
      margin: '0 auto 120px',
      padding: '0 24px'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column' as 'column',
      gap: '16px',
      backdropFilter: 'blur(10px)',
      transition: 'transform 0.3s ease',
      overflow: 'hidden' as 'hidden',
      position: 'relative' as 'relative'
    },
    glow: {
      position: 'absolute' as 'absolute',
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(0,0,0,0) 70%)',
      top: '-150px',
      left: '50%',
      transform: 'translateX(-50%)',
      pointerEvents: 'none' as 'none'
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* CSS Animaciones Globales */}
      <style>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade { animation: fadeIn 0.8s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .hover-card:hover { transform: translateY(-5px); border-color: rgba(99, 102, 241, 0.3); }
      `}</style>

      {/* --- FONDO AMBIENTAL --- */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '100vh', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, rgba(0,0,0,0) 70%)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, rgba(0,0,0,0) 70%)' }}></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav style={styles.nav}>
        <div style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)' }}>
            <Zap size={20} color="white" fill="white" />
          </div>
          LinkPay
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} style={{ background: 'transparent', color: '#94A3B8', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '15px' }}>Login</button>
          <button onClick={() => navigate('/register')} style={{ background: 'white', color: '#0F172A', padding: '10px 24px', borderRadius: '100px', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '14px', transition: 'transform 0.2s' }} className="hover:scale-105">Empezar Gratis</button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div style={styles.hero} className="animate-slide-up">
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', color: '#818CF8', padding: '6px 16px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, marginBottom: '32px' }}>
          <span style={{ width: '8px', height: '8px', background: '#818CF8', borderRadius: '50%', boxShadow: '0 0 10px #818CF8' }}></span>
          La Nueva Era de la Monetización
        </div>
        
        <h1 style={{ fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 900, lineHeight: '1.1', letterSpacing: '-0.03em', marginBottom: '32px', background: 'linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Convierte tu Audiencia <br/> en <span style={{ color: '#818CF8', WebkitTextFillColor: '#818CF8' }}>Ingresos Reales.</span>
        </h1>
        
        <p style={{ fontSize: '20px', color: '#94A3B8', maxWidth: '640px', margin: '0 auto 48px auto', lineHeight: '1.6' }}>
          LinkPay es la plataforma todo-en-uno para creadores. Crea tu Bio Page, acorta enlaces inteligentes y cobra por cada visita automáticamente.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/register')} style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', color: 'white', padding: '20px 48px', borderRadius: '16px', fontSize: '18px', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 0 40px rgba(79, 70, 229, 0.4)', display: 'flex', alignItems: 'center', gap: '10px', transition: 'transform 0.2s' }} className="hover:scale-105">
            Crear mi cuenta <ArrowRight size={20} />
          </button>
        </div>

        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '32px', color: '#64748B', fontSize: '14px', fontWeight: 600 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#22C55E" /> Sin tarjetas de crédito</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#22C55E" /> Pagos diarios</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#22C55E" /> Setup en 2 min</div>
        </div>

        {/* 3D MOCKUP */}
        <div style={{ marginTop: '100px', perspective: '1000px' }}>
          <div className="animate-float glass-card" style={{ 
            padding: '20px', borderRadius: '24px', transform: 'rotateX(10deg) scale(0.95)', 
            boxShadow: '0 50px 100px -20px rgba(0,0,0,0.6)', maxWidth: '900px', margin: '0 auto', position: 'relative' 
          }}>
            {/* Fake UI Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }}></div>
              </div>
              <div style={{ width: '200px', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px' }}></div>
            </div>
            
            {/* Fake UI Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', textAlign: 'left' }}>
                <div style={{ color: '#94A3B8', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>INGRESOS HOY</div>
                <div style={{ color: '#10B981', fontSize: '32px', fontWeight: 800 }}>€124.50</div>
                <div style={{ width: '60%', height: '4px', background: '#10B981', borderRadius: '100px', marginTop: '16px' }}></div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', textAlign: 'left' }}>
                <div style={{ color: '#94A3B8', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>VISITAS</div>
                <div style={{ color: '#F8FAFC', fontSize: '32px', fontWeight: 800 }}>8,420</div>
                <div style={{ width: '80%', height: '4px', background: '#3B82F6', borderRadius: '100px', marginTop: '16px' }}></div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)', padding: '24px', borderRadius: '16px', textAlign: 'left' }}>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>RPM MEDIO</div>
                <div style={{ color: '#FFFFFF', fontSize: '32px', fontWeight: 800 }}>€2.10</div>
                <div style={{ width: '90%', height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '100px', marginTop: '16px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FEATURES BENTO GRID --- */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 20px' }}>
        <h2 style={{ fontSize: '40px', fontWeight: 800, textAlign: 'center', marginBottom: '60px' }}>Todo lo que necesitas. <span style={{ color: '#64748B' }}>Y más.</span></h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
          
          {/* CARD 1 */}
          <div className="glass-card hover-glow" style={{ padding: '40px', gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ padding: '12px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '12px', color: '#EC4899', width: 'fit-content', marginBottom: '24px' }}><Smartphone size={32} /></div>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Link-in-Bio Definitivo</h3>
                <p style={{ color: '#94A3B8', fontSize: '18px', maxWidth: '400px' }}>Crea una página bio profesional. Personaliza fondos, botones y monetiza cada visita automáticamente.</p>
              </div>
              <div style={{ width: '200px', height: '200px', background: '#1E293B', borderRadius: '24px', border: '8px solid #334155', opacity: 0.8 }}></div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="glass-card hover-glow" style={{ padding: '40px' }}>
            <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: '#3B82F6', width: 'fit-content', marginBottom: '24px' }}><Rocket size={32} /></div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Smart Links</h3>
            <p style={{ color: '#94A3B8', fontSize: '16px' }}>Acorta URLs y activa el modo Turbo para maximizar ingresos en cada clic.</p>
          </div>

          {/* CARD 3 */}
          <div className="glass-card hover-glow" style={{ padding: '40px' }}>
            <div style={{ padding: '12px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '12px', color: '#22C55E', width: 'fit-content', marginBottom: '24px' }}><CreditCard size={32} /></div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Pagos Globales</h3>
            <p style={{ color: '#94A3B8', fontSize: '16px' }}>Retira tus ganancias vía PayPal o Banco. Sin mínimos absurdos. Tú ganas, tú cobras.</p>
          </div>

          {/* CARD 4 */}
          <div className="glass-card hover-glow" style={{ padding: '40px', gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', color: '#F59E0B', width: 'fit-content', marginBottom: '24px' }}><BarChart3 size={32} /></div>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Analítica en Tiempo Real</h3>
                <p style={{ color: '#94A3B8', fontSize: '18px' }}>Control total sobre tu tráfico. RPM, clics por país, dispositivos y más.</p>
              </div>
              <div style={{ flex: 1, display: 'flex', gap: '8px', alignItems: 'end', height: '160px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px' }}>
                {[40, 70, 50, 90, 60, 80].map((h, i) => (
                  <div key={i} style={{ flex: 1, background: '#4F46E5', height: `${h}%`, borderRadius: '4px', opacity: 0.8 }}></div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '80px 20px', background: '#020617' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', background: '#4F46E5', borderRadius: '8px' }}></div> LinkPay
            </div>
            <p style={{ color: '#64748B', maxWidth: '300px', fontSize: '14px' }}>La plataforma all-in-one para creadores.</p>
          </div>
          <div style={{ display: 'flex', gap: '80px' }}>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '20px' }}>Producto</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#94A3B8', fontSize: '14px' }}>
                <span>Bio Pages</span>
                <span>Smart Links</span>
                <span>Analytics</span>
              </div>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '20px' }}>Legal</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#94A3B8', fontSize: '14px' }}>
                <span>Términos</span>
                <span>Privacidad</span>
                <span>Contacto</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '80px auto 0', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: '#475569', fontSize: '13px' }}>
          © 2025 LinkPay Inc. Todos los derechos reservados.
        </div>
      </footer>

    </div>
  );
}
