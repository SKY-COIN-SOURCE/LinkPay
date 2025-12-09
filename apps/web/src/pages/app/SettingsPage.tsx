import React, { useState, useEffect, useRef } from 'react';
import { User, Shield, CreditCard, Camera, CheckCircle2, Mail, Loader2, Save, LogOut, Landmark, Wallet } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from '../../i18n';
import './Settings.css';

export function SettingsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'billing'>('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ESTADO GLOBAL DEL PERFIL
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

  if (loading) return (
    <div className="lp-bg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Loader2 className="spin" color="#3b82f6" size={32} />
    </div>
  );

  return (
    <div className="lp-bg lp-settings-shell">
      <div className="lp-settings-container animate-enter">

        <div className="lp-settings-header">
          <div className="lp-settings-title-block">
            <h1>{t('settings.header.title')}</h1>
            <p>{t('settings.header.subtitle')}</p>
          </div>
          {profile.is_verified && (
            <div className="lp-verified-badge">
              <CheckCircle2 size={14} /> {t('settings.header.verified')}
            </div>
          )}
        </div>

        <div className="lp-settings-grid">
          {/* SIDEBAR */}
          <div className="lp-settings-sidebar">
            <button onClick={() => setActiveTab('profile')} className={`lp-settings-btn ${activeTab === 'profile' ? 'active' : ''}`}>
              <User size={18} /> {t('settings.nav.profile')}
            </button>
            <button onClick={() => setActiveTab('security')} className={`lp-settings-btn ${activeTab === 'security' ? 'active' : ''}`}>
              <Shield size={18} /> {t('settings.nav.security')}
            </button>
            <button onClick={() => setActiveTab('billing')} className={`lp-settings-btn ${activeTab === 'billing' ? 'active' : ''}`}>
              <Wallet size={18} /> {t('settings.nav.billing')}
            </button>
            <button onClick={handleLogout} className="lp-settings-btn logout">
              <LogOut size={18} /> {t('settings.nav.logout')}
            </button>
          </div>

          {/* CONTENT AREA */}
          <div className="lp-settings-content">

            {/* TAB: PERFIL */}
            {activeTab === 'profile' && (
              <div className="lp-settings-card">
                <div className="lp-profile-header">
                  <div className="lp-avatar-upload" onClick={() => fileInputRef.current?.click()}>
                    {profile.avatar_url ? (
                      <img src={profile.avatar_url} alt="Avatar" />
                    ) : (
                      <span>{profile.full_name?.[0]}</span>
                    )}
                    <div className="lp-avatar-overlay">
                      <Camera size={24} color="white" />
                    </div>
                    <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleAvatarUpload} />
                  </div>
                  <div className="lp-profile-info">
                    <h3>{profile.full_name || 'Usuario'}</h3>
                    <p>{profile.email}</p>
                    <p style={{ marginTop: '4px', fontSize: '13px', color: '#3b82f6' }}>@{profile.username}</p>
                  </div>
                </div>

                <div className="lp-form-group">
                  <label className="lp-label">{t('settings.profile.name_label')}</label>
                  <input
                    className="lp-input"
                    value={profile.full_name}
                    onChange={e => setProfile({ ...profile, full_name: e.target.value })}
                  />
                </div>

                <div className="lp-form-group">
                  <label className="lp-label">{t('settings.profile.bio_label')}</label>
                  <textarea
                    className="lp-textarea"
                    value={profile.bio}
                    onChange={e => setProfile({ ...profile, bio: e.target.value })}
                    placeholder={t('settings.profile.bio_placeholder')}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleSave} disabled={saving} className="lp-save-btn">
                    {saving ? <Loader2 className="spin" size={18} /> : <><Save size={18} /> {t('settings.common.save')}</>}
                  </button>
                </div>
              </div>
            )}

            {/* TAB: SEGURIDAD */}
            {activeTab === 'security' && (
              <div className="lp-settings-card">
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>{t('settings.security.title')}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '14px' }}>{t('settings.security.desc')}</p>
                </div>

                <div className="lp-security-block">
                  <div className="lp-security-info">
                    <h4>{t('settings.security.2fa_title')}</h4>
                    <p>{profile.two_factor_enabled ? t('settings.security.2fa_on') : t('settings.security.2fa_off')}</p>
                  </div>
                  <button
                    onClick={toggle2FA}
                    className={`lp-btn-outline ${profile.two_factor_enabled ? 'lp-btn-danger' : ''}`}
                  >
                    {profile.two_factor_enabled ? t('settings.security.disable') : t('settings.security.enable')}
                  </button>
                </div>

                {showQR && (
                  <div style={{ marginTop: '24px', background: 'white', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <p style={{ color: '#0f172a', fontWeight: '600', fontSize: '14px' }}>{t('settings.security.scan')}</p>
                    <QRCodeSVG value={`otpauth://totp/LinkPay:${profile.email}?secret=XYZ&issuer=LinkPay`} size={160} />
                    <button onClick={confirm2FA} className="lp-save-btn">
                      {t('settings.security.confirm')}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB: BILLING */}
            {activeTab === 'billing' && (
              <div className="lp-settings-card">
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>{t('settings.billing.title')}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '14px' }}>{t('settings.billing.desc')}</p>
                </div>

                <div className="lp-payment-card">
                  <div className="lp-payment-header">
                    <div className="lp-payment-icon">
                      <Mail size={18} color="#60a5fa" />
                    </div>
                    <span className="lp-payment-title">PayPal</span>
                  </div>
                  <div className="lp-form-group" style={{ marginBottom: 0 }}>
                    <label className="lp-label">{t('settings.billing.paypal_label')}</label>
                    <input
                      className="lp-input"
                      value={profile.paypal_email}
                      onChange={e => setProfile({ ...profile, paypal_email: e.target.value })}
                      placeholder="tu@paypal.com"
                    />
                    <p className="lp-helper-text">{t('settings.billing.paypal_help')}</p>
                  </div>
                </div>

                <div className="lp-payment-card">
                  <div className="lp-payment-header">
                    <div className="lp-payment-icon">
                      <Landmark size={18} color="#a78bfa" />
                    </div>
                    <span className="lp-payment-title">{t('settings.billing.bank_title')}</span>
                  </div>
                  <div className="lp-form-group" style={{ marginBottom: 0 }}>
                    <label className="lp-label">{t('settings.billing.bank_label')}</label>
                    <input
                      className="lp-input"
                      value={profile.bank_details}
                      onChange={e => setProfile({ ...profile, bank_details: e.target.value })}
                      placeholder="ES91 0000..."
                    />
                    <p className="lp-helper-text">{t('settings.billing.bank_help')}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleSave} disabled={saving} className="lp-save-btn">
                    {saving ? <Loader2 className="spin" size={18} /> : <><Save size={18} /> {t('settings.common.save')}</>}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

