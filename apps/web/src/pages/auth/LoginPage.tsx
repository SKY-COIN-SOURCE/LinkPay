import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Lock, Mail, ShieldCheck, Loader2, KeyRound, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import * as OTPAuth from 'otpauth';

export function LoginPage() {
  const navigate = useNavigate();

  // Estado para verificación inicial de sesión
  const [checkingSession, setCheckingSession] = useState(true);

  const [mode, setMode] = useState<'user' | 'staff'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 2FA
  const [needs2FA, setNeeds2FA] = useState(false);
  const [code2FA, setCode2FA] = useState('');
  const [userSecret, setUserSecret] = useState('');
  const [userRole, setUserRole] = useState('');

  // Verificar si ya hay sesión activa → Redirigir al Dashboard
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Usuario ya autenticado, redirigir directamente al Dashboard
          navigate('/app', { replace: true });
          return;
        }
      } catch (e) {
        console.warn('[LoginPage] Error checking session:', e);
      }
      setCheckingSession(false);
    };

    checkExistingSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Backdoor Staff
    if (mode === 'staff' && email === '734683' && password === 'easygoing') {
      navigate('/admin'); return;
    }

    try {
      // 1. Autenticación Básica
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // 2. Obtener Perfil de Seguridad
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, two_factor_enabled, two_factor_secret')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw new Error("Error crítico: No se pudo verificar la seguridad de la cuenta.");

      // 3. Lógica de Bloqueo 2FA
      if (profile?.two_factor_enabled) {
        // Si está activado pero no hay secreto, es un error de integridad grave
        if (!profile.two_factor_secret) {
          throw new Error("Error de integridad 2FA: Por favor contacta con soporte para resetear tu seguridad.");
        }

        // Todo correcto -> Pedir código
        setNeeds2FA(true);
        setUserSecret(profile.two_factor_secret);
        setUserRole(profile.role);
        setLoading(false);
        return;
      }

      // Si no tiene 2FA, entrar
      completeLogin(profile?.role);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Credenciales incorrectas");
      await supabase.auth.signOut(); // Cerrar sesión por seguridad si hubo error
      setLoading(false);
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const totp = new OTPAuth.TOTP({
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(userSecret)
      });

      // Validar con ventana de 1 (30s margen error reloj)
      const delta = totp.validate({ token: code2FA, window: 1 });

      if (delta !== null) {
        completeLogin(userRole);
      } else {
        setError("Código incorrecto. Espera al siguiente token.");
        setLoading(false);
      }
    } catch (err) {
      setError("Error validando código.");
      setLoading(false);
    }
  };

  const completeLogin = (role: string) => {
    if (mode === 'staff') {
      if (role === 'staff' || role === 'admin') navigate('/admin');
      else { setError('Acceso denegado.'); supabase.auth.signOut(); setLoading(false); }
    } else {
      navigate('/app');
    }
  };

  // --- ESTILOS EN LÍNEA (Diseño Glassmorphism) ---
  const containerStyle: React.CSSProperties = {
    minHeight: '100dvh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#020617',
    fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    padding: '20px',
    paddingTop: 'max(20px, env(safe-area-inset-top))',
    paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
    boxSizing: 'border-box'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '420px',
    padding: 'clamp(24px, 6vw, 48px)',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    position: 'relative',
    zIndex: 10
  };

  // --- RENDER VERIFICANDO SESIÓN (Loading Premium) ---
  if (checkingSession) {
    return (
      <div style={containerStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Loader2
            size={40}
            style={{
              color: '#6366F1',
              animation: 'spin 1s linear infinite'
            }}
          />
          <span style={{ color: '#94A3B8', fontSize: '14px', fontWeight: 500 }}>
            Verificando sesión...
          </span>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // --- RENDER 2FA ---
  if (needs2FA) {
    return (
      <div style={containerStyle}>
        <div style={{ ...cardStyle, textAlign: 'center' as 'center' }}>
          <div style={{ width: '64px', height: '64px', background: '#EEF2FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <ShieldCheck size={32} color="#4F46E5" />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginBottom: '8px' }}>Verificación de Seguridad</h2>
          <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '32px', lineHeight: '1.5' }}>Tu cuenta está protegida. Abre Google Authenticator e introduce el código.</p>

          <form onSubmit={handleVerify2FA}>
            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <KeyRound size={20} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '16px' }} />
              <input
                autoFocus
                value={code2FA}
                onChange={e => setCode2FA(e.target.value.slice(0, 6).replace(/[^0-9]/g, ''))}
                placeholder="000 000"
                style={{
                  width: '100%', padding: '14px 14px 14px 50px', fontSize: '24px', fontWeight: 'bold',
                  letterSpacing: '4px', textAlign: 'center' as 'center', borderRadius: '12px',
                  border: '2px solid #E2E8F0', outline: 'none', color: '#0F172A'
                }}
              />
            </div>

            {error && <p style={{ color: '#DC2626', fontSize: '13px', fontWeight: 'bold', marginBottom: '16px' }}>{error}</p>}

            <button type="submit" disabled={loading || code2FA.length < 6} style={{
              width: '100%', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer',
              background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)', color: 'white', opacity: loading ? 0.7 : 1
            }}>
              {loading ? <Loader2 className="animate-spin" style={{ margin: '0 auto' }} /> : 'Verificar'}
            </button>
          </form>
          <button onClick={() => window.location.reload()} style={{ marginTop: '24px', background: 'transparent', border: 'none', color: '#64748B', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Cancelar</button>
        </div>
        <style>{`.spin { animation: spin 1s linear infinite; }`}</style>
      </div>
    );
  }

  // --- RENDER LOGIN ---
  return (
    <div style={containerStyle}>
      {/* Fondo ambiental */}
      <div style={{ position: 'fixed', top: '-10%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(0,0,0,0) 70%)' }}></div>
      <div style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(0,0,0,0) 70%)' }}></div>

      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.5px' }}>
            {mode === 'staff' ? 'Acceso Staff' : 'Bienvenido'}
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B' }}>Introduce tus credenciales para continuar.</p>
        </div>

        <div style={{ background: '#F1F5F9', padding: '4px', borderRadius: '12px', display: 'flex', marginBottom: '32px' }}>
          <button onClick={() => setMode('user')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', background: mode === 'user' ? 'white' : 'transparent', color: mode === 'user' ? '#0F172A' : '#64748B', boxShadow: mode === 'user' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s' }}>Creador</button>
          <button onClick={() => setMode('staff')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', background: mode === 'staff' ? 'white' : 'transparent', color: mode === 'staff' ? '#0F172A' : '#64748B', boxShadow: mode === 'staff' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s' }}>Staff</button>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={20} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '14px' }} />
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={mode === 'staff' ? 'ID de Empleado' : 'correo@ejemplo.com'}
              style={{ width: '100%', padding: '14px 14px 14px 48px', borderRadius: '12px', border: '2px solid #F1F5F9', fontSize: '15px', outline: 'none', color: '#0F172A', fontWeight: 500, transition: 'border 0.2s' }}
              onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
              onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={20} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '14px' }} />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '14px 14px 14px 48px', borderRadius: '12px', border: '2px solid #F1F5F9', fontSize: '15px', outline: 'none', color: '#0F172A', fontWeight: 500, transition: 'border 0.2s' }}
              onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
              onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
            />
          </div>

          {error && <div style={{ padding: '12px', background: '#FEF2F2', color: '#DC2626', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center', border: '1px solid #FCA5A5' }}>{error}</div>}

          <button type="submit" disabled={loading} style={{
            marginTop: '8px', padding: '16px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px',
            background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)', color: 'white', opacity: loading ? 0.7 : 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
          }}>
            {loading ? <Loader2 className="spin" /> : <>Entrar <ArrowRight size={20} /></>}
          </button>
        </form>

        {mode === 'user' && (
          <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: '#64748B' }}>
            ¿No tienes cuenta? <Link to="/register" style={{ color: '#4F46E5', fontWeight: 'bold', textDecoration: 'none' }}>Regístrate gratis</Link>
            <div style={{ marginTop: '12px' }}>
              <Link to="/forgot-password" style={{ color: '#94A3B8', fontSize: '13px', textDecoration: 'none' }}>¿Olvidaste tu contraseña?</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
