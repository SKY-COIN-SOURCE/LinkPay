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

  // ESTILOS
  const styles = {
    container: { maxWidth: '1100px', margin: '0 auto', paddingBottom: '80px' },
    header: { marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'end' },
    title: { fontSize: '36px', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-1px' },
    subtitle: { color: '#64748B', fontSize: '16px', marginTop: '8px' },
    grid: { display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px', alignItems: 'start' },
    sidebar: { display: 'flex', flexDirection: 'column' as 'column', gap: '8px' },
    sidebarBtn: (active: boolean) => ({
      width: '100%', padding: '18px 24px', borderRadius: '16px', border: 'none',
      background: active ? '#0F172A' : 'transparent', color: active ? 'white' : '#64748B',
      fontWeight: active ? 700 : 600, fontSize: '15px', cursor: 'pointer', textAlign: 'left' as 'left',
      display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s ease-in-out',
      boxShadow: active ? '0 10px 25px -5px rgba(15, 23, 42, 0.3)' : 'none',
      transform: active ? 'translateX(5px)' : 'none'
    }),
    card: { background: 'white', borderRadius: '24px', border: '1px solid #E2E8F0', padding: '40px', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.03)', position: 'relative' as 'relative', overflow: 'hidden' },
    label: { display: 'block', fontSize: '12px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' as 'uppercase', marginBottom: '10px', letterSpacing: '1px' },
    input: { width: '100%', padding: '16px', borderRadius: '14px', border: '2px solid #F1F5F9', fontSize: '16px', fontWeight: 600, outline: 'none', transition: 'all 0.2s', color: '#0F172A', background: '#F8FAFC' },
    avatarContainer: { width: '120px', height: '120px', borderRadius: '50%', position: 'relative' as 'relative', cursor: 'pointer', overflow: 'hidden', border: '4px solid white', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', transition: 'transform 0.2s' },
    saveBtn: { padding: '16px 40px', borderRadius: '100px', background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)', transition: 'transform 0.2s', fontSize: '16px' }
  };

  return (
    <div className="animate-enter" style={styles.container}>
      <div style={styles.header}>
        <div><h1 style={styles.title}>Ajustes</h1><p style={styles.subtitle}>Gestiona tu identidad, seguridad y pagos.</p></div>
        {profile.is_verified && <div className="bg-blue-50 text-blue-600 px-5 py-2.5 rounded-full text-xs font-black tracking-wide flex items-center gap-2 border border-blue-100 shadow-sm"><CheckCircle2 size={16} /> VERIFICADO</div>}
      </div>

      <div style={styles.grid}>
        <div style={styles.sidebar}>
          <button onClick={() => setActiveTab('profile')} style={styles.sidebarBtn(activeTab === 'profile')}><User size={20} /> Perfil Público</button>
          <button onClick={() => setActiveTab('security')} style={styles.sidebarBtn(activeTab === 'security')}><Shield size={20} /> Seguridad</button>
          <button onClick={() => setActiveTab('billing')} style={styles.sidebarBtn(activeTab === 'billing')}><CreditCard size={20} /> Facturación</button>
          <div style={{ height: '1px', background: '#E2E8F0', margin: '20px 0' }}></div>
          <button onClick={handleLogout} style={{ ...styles.sidebarBtn(false), color: '#EF4444' }}><LogOut size={20} /> Cerrar Sesión</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* TAB: PERFIL */}
          {activeTab === 'profile' && (
            <div style={styles.card} className="animate-fade-in">
               <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginBottom: '40px' }}>
                  <div style={styles.avatarContainer} onClick={() => fileInputRef.current?.click()} className="group hover:scale-105">
                    {profile.avatar_url ? <img src={profile.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{profile.full_name?.[0]}</div>}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Camera className="text-white" size={32} /></div>
                    <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleAvatarUpload} />
                  </div>
                  <div><h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>{profile.full_name || 'Usuario'}</h3><p style={{ color: '#64748B', fontSize: '16px', margin: '4px 0' }}>{profile.email}</p></div>
               </div>
               <div style={{ marginBottom: '20px' }}><label style={styles.label}>Nombre</label><input value={profile.full_name} onChange={e => setProfile({...profile, full_name: e.target.value})} style={styles.input} /></div>
               <div style={{ marginBottom: '40px' }}><label style={styles.label}>Bio</label><textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} style={{ ...styles.input, minHeight: '100px', resize: 'none' }} /></div>
               <div style={{ display: 'flex', justifyContent: 'flex-end' }}><button onClick={handleSave} disabled={saving} style={styles.saveBtn}>{saving ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Guardar</>}</button></div>
            </div>
          )}

          {/* TAB: SEGURIDAD (Mismo código de antes) */}
          {activeTab === 'security' && (
            <div style={styles.card} className="animate-fade-in">
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
               {showQR && <div className="mt-6 bg-white p-6 rounded-xl border"><QRCodeSVG value={`otpauth://totp/LinkPay:${profile.email}?secret=XYZ&issuer=LinkPay`} size={140}/><button onClick={confirm2FA} className="mt-4 text-indigo-600 font-bold text-sm">Ya escaneado</button></div>}
            </div>
          )}

          {/* --- NUEVA TAB: FACTURACIÓN --- */}
          {activeTab === 'billing' && (
            <div style={styles.card} className="animate-fade-in">
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
                   onChange={e => setProfile({...profile, paypal_email: e.target.value})} 
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
                   onChange={e => setProfile({...profile, bank_details: e.target.value})} 
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
