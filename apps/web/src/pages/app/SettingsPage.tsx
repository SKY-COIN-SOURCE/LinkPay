import React, { useState, useEffect, useRef } from 'react';
import { User, Shield, CreditCard, Camera, CheckCircle2, AlertCircle, Mail, Lock, Loader2, Save, LogOut, QrCode, ChevronRight, Landmark, Wallet } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { QRCodeSVG } from 'qrcode.react';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'billing'>('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ESTADO GLOBAL DEL PERFIL (Incluye datos de pago ahora)
  const [profile, setProfile] = useState<any>({
    username: '', full_name: '', email: '', bio: '', avatar_url: '',
    two_factor_enabled: false, is_verified: false,
    paypal_email: '', bank_details: ''
  });

  const [showQR, setShowQR] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { loadProfile(); }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        // Fusionamos datos
        setProfile({
          ...data,
          email: user.email,
          paypal_email: data.paypal_email || '',
          bank_details: data.bank_details || ''
        });
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setSaving(true);
    try {
      const file = e.target.files[0];
      const fileName = `${profile.id}/${Date.now()}.png`;
      await supabase.storage.from('avatars').upload(fileName, file, { upsert: true });
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);

      setProfile({ ...profile, avatar_url: data.publicUrl });
      await supabase.from('profiles').update({ avatar_url: data.publicUrl }).eq('id', profile.id);
    } catch (error) { alert('Error al subir imagen'); }
    finally { setSaving(false); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Guardamos TODO: Perfil + Datos de Pago
      await supabase.from('profiles').update({
        full_name: profile.full_name,
        username: profile.username,
        bio: profile.bio,
        paypal_email: profile.paypal_email,
        bank_details: profile.bank_details
      }).eq('id', profile.id);
    } catch (e) { alert('Error al guardar'); }
    finally { setTimeout(() => setSaving(false), 800); }
  };

  // ... (Funciones 2FA se mantienen igual que antes) ...
  const toggle2FA = async () => {
    if (!profile.two_factor_enabled) setShowQR(true);
    else if (confirm('¿Desactivar seguridad 2FA?')) {
      setProfile({ ...profile, two_factor_enabled: false });
      await supabase.from('profiles').update({ two_factor_enabled: false }).eq('id', profile.id);
    }
  };
  const confirm2FA = async () => {
    setProfile({ ...profile, two_factor_enabled: true });
    await supabase.from('profiles').update({ two_factor_enabled: true }).eq('id', profile.id);
    setShowQR(false);
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>;

  // ESTILOS RESPONSIVOS
  const css = `
    .lp-settings-container {
      max-width: 1100px;
      margin: 0 auto;
      padding-bottom: 80px;
    }
    .lp-settings-header {
      margin-bottom: 40px;
      display: flex;
      justify-content: space-between;
      align-items: end;
    }
    .lp-settings-grid {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 40px;
      align-items: start;
    }
    .lp-settings-sidebar {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .lp-settings-btn {
      width: 100%;
      padding: 18px 24px;
      border-radius: 16px;
      border: none;
      background: transparent;
      color: #64748B;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      text-align: left;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.2s ease-in-out;
    }
    .lp-settings-btn:hover {
      background: rgba(15, 23, 42, 0.03);
      color: #334155;
    }
    .lp-settings-btn.active {
      background: #0F172A;
      color: white;
      font-weight: 700;
      box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.3);
      transform: translateX(5px);
    }
    .lp-settings-card {
      background: white;
      border-radius: 24px;
      border: 1px solid #E2E8F0;
      padding: 40px;
      box-shadow: 0 4px 20px -2px rgba(0,0,0,0.03);
      position: relative;
      overflow: hidden;
    }
    
    /* MÓVIL */
    @media (max-width: 768px) {
      .lp-settings-header {
        flex-direction: column;
        align-items: start;
        gap: 16px;
        margin-bottom: 24px;
      }
      .lp-settings-grid {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      .lp-settings-sidebar {
        flex-direction: row;
        overflow-x: auto;
        padding-bottom: 4px;
        width: 100%;
      }
      .lp-settings-btn {
        width: auto;
        white-space: nowrap;
        padding: 10px 16px;
        border-radius: 100px;
        font-size: 13px;
        background: white;
        border: 1px solid #E2E8F0;
      }
      .lp-settings-btn.active {
        background: #0F172A;
        transform: none;
        box-shadow: 0 4px 12px rgba(15,23,42,0.2);
        border-color: #0F172A;
      }
      .lp-settings-card {
        padding: 24px;
        border-radius: 20px;
      }
    }
  `;

  // Helper para estilos
  const styles = {
    title: { fontSize: '36px', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-1px' },
    subtitle: { color: '#64748B', fontSize: '16px', marginTop: '8px' },
    label: { display: 'block', fontSize: '12px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' as 'uppercase', marginBottom: '10px', letterSpacing: '1px' },
    input: { width: '100%', padding: '16px', borderRadius: '14px', border: '2px solid #F1F5F9', fontSize: '16px', fontWeight: 600, outline: 'none', transition: 'all 0.2s', color: '#0F172A', background: '#F8FAFC' },
    avatarContainer: { width: '120px', height: '120px', borderRadius: '50%', position: 'relative' as 'relative', cursor: 'pointer', overflow: 'hidden', border: '4px solid white', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', transition: 'transform 0.2s' },
    saveBtn: { padding: '16px 40px', borderRadius: '100px', background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)', transition: 'transform 0.2s', fontSize: '16px' }
  };

  return (
    <div className="animate-enter lp-settings-container">
      <style>{css}</style>
      <div className="lp-settings-header">
        <div><h1 style={styles.title}>Ajustes</h1><p style={styles.subtitle}>Gestiona tu identidad, seguridad y pagos.</p></div>
        {profile.is_verified && <div className="bg-blue-50 text-blue-600 px-5 py-2.5 rounded-full text-xs font-black tracking-wide flex items-center gap-2 border border-blue-100 shadow-sm"><CheckCircle2 size={16} /> VERIFICADO</div>}
      </div>

      <div className="lp-settings-grid">
        <div className="lp-settings-sidebar">
          <button onClick={() => setActiveTab('profile')} className={`lp-settings-btn ${activeTab === 'profile' ? 'active' : ''}`}><User size={20} /> Perfil</button>
          <button onClick={() => setActiveTab('security')} className={`lp-settings-btn ${activeTab === 'security' ? 'active' : ''}`}><Shield size={20} /> Seguridad</button>
          <button onClick={() => setActiveTab('billing')} className={`lp-settings-btn ${activeTab === 'billing' ? 'active' : ''}`}><CreditCard size={20} /> Pagos</button>

          <button onClick={handleLogout} className="lp-settings-btn" style={{ color: '#EF4444' }}><LogOut size={20} /> Salir</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* TAB: PERFIL */}
          {activeTab === 'profile' && (
            <div className="lp-settings-card animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginBottom: '40px' }}>
                <div style={styles.avatarContainer} onClick={() => fileInputRef.current?.click()} className="group hover:scale-105">
                  {profile.avatar_url ? <img src={profile.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{profile.full_name?.[0]}</div>}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Camera className="text-white" size={32} /></div>
                  <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleAvatarUpload} />
                </div>
                <div><h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>{profile.full_name || 'Usuario'}</h3><p style={{ color: '#64748B', fontSize: '16px', margin: '4px 0' }}>{profile.email}</p></div>
              </div>
              <div style={{ marginBottom: '20px' }}><label style={styles.label}>Nombre</label><input value={profile.full_name} onChange={e => setProfile({ ...profile, full_name: e.target.value })} style={styles.input} /></div>
              <div style={{ marginBottom: '40px' }}><label style={styles.label}>Bio</label><textarea value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} style={{ ...styles.input, minHeight: '100px', resize: 'none' }} /></div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}><button onClick={handleSave} disabled={saving} style={styles.saveBtn}>{saving ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Guardar</>}</button></div>
            </div>
          )}

          {/* TAB: SEGURIDAD (Mismo código de antes) */}
          {activeTab === 'security' && (
            <div className="lp-settings-card animate-fade-in">
              {/* ... Contenido 2FA existente ... */}
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}><Shield className="text-indigo-600" size={20} /> Autenticación 2FA</h3>
              {!profile.two_factor_enabled ? (
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 flex justify-between items-center">
                  <div><p className="font-bold text-slate-900">Proteger mi cuenta</p><p className="text-sm text-slate-500">Usa Google Authenticator.</p></div>
                  <button onClick={toggle2FA} className="bg-black text-white px-6 py-3 rounded-xl font-bold">Activar</button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 p-6 rounded-2xl flex items-center justify-between"><p className="text-green-800 font-bold">2FA Activado</p><button onClick={toggle2FA} className="text-red-500 font-bold text-sm">Desactivar</button></div>
              )}
              {showQR && <div className="mt-6 bg-white p-6 rounded-xl border"><QRCodeSVG value={`otpauth://totp/LinkPay:${profile.email}?secret=XYZ&issuer=LinkPay`} size={140} /><button onClick={confirm2FA} className="mt-4 text-indigo-600 font-bold text-sm">Ya escaneado</button></div>}
            </div>
          )}

          {/* --- NUEVA TAB: FACTURACIÓN --- */}
          {activeTab === 'billing' && (
            <div className="lp-settings-card animate-fade-in">
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Wallet className="text-emerald-500" size={24} /> Métodos de Cobro
              </h3>

              {/* PAYPAL */}
              <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"><Mail className="text-blue-600" size={20} /></div>
                  <h4 className="font-bold text-slate-900">PayPal</h4>
                </div>
                <label style={styles.label}>Correo de PayPal</label>
                <input
                  value={profile.paypal_email}
                  onChange={e => setProfile({ ...profile, paypal_email: e.target.value })}
                  placeholder="tu@paypal.com"
                  style={styles.input}
                />
                <p className="text-xs text-slate-400 mt-2 font-medium">Se usará automáticamente para retiros.</p>
              </div>

              {/* BANCO */}
              <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"><Landmark className="text-slate-600" size={20} /></div>
                  <h4 className="font-bold text-slate-900">Cuenta Bancaria</h4>
                </div>
                <label style={styles.label}>IBAN / SWIFT</label>
                <input
                  value={profile.bank_details}
                  onChange={e => setProfile({ ...profile, bank_details: e.target.value })}
                  placeholder="ES91 0000..."
                  style={styles.input}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleSave} disabled={saving} style={styles.saveBtn}>
                  {saving ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Guardar Métodos</>}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
      <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
