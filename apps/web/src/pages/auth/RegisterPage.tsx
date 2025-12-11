import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User, Loader2, AlertCircle, Users, Briefcase, Gift } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { ReferralService } from '../../lib/referralService';

export function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '', fullName: '', role: 'user' });

  // Código de referido (Autodetectado)
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) setReferralCode(ref);
  }, [searchParams]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Crear usuario en Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.fullName, role: formData.role }
        }
      });

      if (authError) throw authError;

      // 2. Registrar Referido (Si existe código)
      if (referralCode && data.user) {
        await ReferralService.registerReferral(referralCode);
      }

      alert(`Cuenta creada con éxito. Revisa tu email.`);
      navigate('/login');

    } catch (err: any) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  // ESTILOS BLINDADOS
  const containerStyle = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', padding: '20px', fontFamily: 'sans-serif' };
  const cardStyle = { width: '100%', maxWidth: '480px', background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' };

  return (
    <div style={containerStyle}>
      <div className="animate-enter" style={cardStyle}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', marginBottom: '8px' }}>Únete a LinkPay</h1>
          <p style={{ color: '#64748B', fontSize: '14px' }}>Crea tu cuenta y empieza a monetizar hoy.</p>
        </div>

        {/* AVISO DE REFERIDO */}
        {referralCode && (
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', padding: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', color: '#166534', fontSize: '13px', fontWeight: '600' }}>
            <div style={{ background: '#DCFCE7', padding: '6px', borderRadius: '50%' }}><Gift size={16} /></div>
            <div>Has sido invitado. ¡Estás en la red!</div>
          </div>
        )}

        {error && (<div style={{ background: '#FEF2F2', color: '#DC2626', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}><AlertCircle size={16} /> {error}</div>)}

        {/* SELECCIÓN DE ROL */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button type="button" onClick={() => setFormData({ ...formData, role: 'user' })} style={{ flex: 1, padding: '16px', borderRadius: '12px', border: formData.role === 'user' ? '2px solid #2563EB' : '1px solid #E2E8F0', background: formData.role === 'user' ? '#EFF6FF' : 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
            <Users size={20} color={formData.role === 'user' ? '#2563EB' : '#64748B'} style={{ marginBottom: '8px' }} />
            <div style={{ fontWeight: '800', color: '#0F172A', fontSize: '14px' }}>Creador</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Monetiza tu tráfico.</div>
          </button>
          <button type="button" onClick={() => setFormData({ ...formData, role: 'advertiser' })} style={{ flex: 1, padding: '16px', borderRadius: '12px', border: formData.role === 'advertiser' ? '2px solid #DC2626' : '1px solid #E2E8F0', background: formData.role === 'advertiser' ? '#FEF2F2' : 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
            <Briefcase size={20} color={formData.role === 'advertiser' ? '#DC2626' : '#64748B'} style={{ marginBottom: '8px' }} />
            <div style={{ fontWeight: '800', color: '#0F172A', fontSize: '14px' }}>Anunciante</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Compra tráfico premium.</div>
          </button>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: '#94A3B8' }} />
            <input type="text" required placeholder="Nombre Completo" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} style={{ width: '100%', padding: '14px 14px 14px 48px', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '15px', outline: 'none', fontWeight: 500 }} />
          </div>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: '#94A3B8' }} />
            <input type="email" required placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '14px 14px 14px 48px', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '15px', outline: 'none', fontWeight: 500 }} />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: '#94A3B8' }} />
            <input type="password" required placeholder="Contraseña" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} style={{ width: '100%', padding: '14px 14px 14px 48px', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '15px', outline: 'none', fontWeight: 500 }} />
          </div>

          {/* Input Opcional de Código (si no vino por URL) */}
          {!searchParams.get('ref') && (
            <div style={{ position: 'relative' }}>
              <Gift size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: '#94A3B8' }} />
              <input type="text" placeholder="Código de Invitación (Opcional)" value={referralCode} onChange={e => setReferralCode(e.target.value)} style={{ width: '100%', padding: '14px 14px 14px 48px', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '15px', outline: 'none', fontWeight: 500 }} />
            </div>
          )}

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px', marginTop: '8px', background: formData.role === 'advertiser' ? '#DC2626' : '#2563EB', color: 'white', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
            {loading ? <Loader2 className="spin" /> : <>Crear Cuenta <ArrowRight size={18} /></>}
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: '#64748B' }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#2563EB', fontWeight: 'bold', textDecoration: 'none' }}>Inicia Sesión</Link>
        </div>
      </div>
      <style>{`.spin { animation: spin 1s linear infinite; }`}</style>
    </div>
  );
}
