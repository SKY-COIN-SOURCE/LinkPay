import React, { useState, useEffect, useRef } from 'react';
import {
  User, Shield, Wallet, Camera, CheckCircle2, Mail, Loader2, Save, LogOut,
  Landmark, Palette, Bell, Lock, Plug, HelpCircle, Eye, DollarSign,
  ExternalLink, Copy, Zap, Moon, Sun, Smartphone, Globe, Key, Trash2, AlertTriangle, Plus, X
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from '../../i18n';
import { useToast } from '../../components/ui/Toast';
import { ToggleSwitch } from '../../components/ui/ToggleSwitch';
import { SettingsSection, SettingsItem, SettingsInput } from '../../components/ui/SettingsSection';
import { ProfilePreview } from '../../components/ui/ProfilePreview';
import { useTheme, ACCENT_COLORS } from '../../context/ThemeContext';
import { sessionsService, apiKeysService, accountService, preferencesService, UserSession, ApiKey } from '../../lib/settingsService';
import { PremiumLoader } from '../../components/PremiumLoader';
import '../../styles/PremiumBackground.css';
import './Settings.css';

// Tipos de sección para navegación
type SettingsTab = 'profile' | 'security' | 'visual' | 'monetization' | 'notifications' | 'privacy' | 'integrations' | 'account';

const SECTION_CONFIG: { id: SettingsTab; icon: any; label: string; color: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'cyan' }[] = [
  { id: 'profile', icon: User, label: 'Perfil', color: 'blue' },
  { id: 'security', icon: Shield, label: 'Seguridad', color: 'green' },
  { id: 'visual', icon: Palette, label: 'Apariencia', color: 'purple' },
  { id: 'monetization', icon: Wallet, label: 'Finanzas', color: 'orange' },
  { id: 'notifications', icon: Bell, label: 'Alertas', color: 'pink' },
  { id: 'privacy', icon: Lock, label: 'Privacidad', color: 'cyan' },
  { id: 'integrations', icon: Plug, label: 'Integraciones', color: 'purple' },
  { id: 'account', icon: HelpCircle, label: 'Cuenta', color: 'blue' },
];

export function SettingsPage() {
  const { t } = useTranslation();
  const toast = useToast();
  const { theme, accentColor, setTheme, setAccentColor } = useTheme();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ESTADO GLOBAL DEL PERFIL
  const [profile, setProfile] = useState<any>({
    id: '',
    username: '',
    full_name: '',
    email: '',
    bio: '',
    avatar_url: '',
    two_factor_enabled: false,
    is_verified: false,
    paypal_email: '',
    bank_details: ''
  });

  // Estados adicionales para nuevas funcionalidades
  const [bioProfile, setBioProfile] = useState<any>(null);
  const [showQR, setShowQR] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados para Fase 3
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [loadingApiKeys, setLoadingApiKeys] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [createdKey, setCreatedKey] = useState<string | null>(null);

  // Preferencias locales (notificaciones y privacidad - tema y acento vienen del ThemeContext)
  const [preferences, setPreferences] = useState({
    notificationsEnabled: true,
    weeklyReport: true,
    bioPublic: true,
    hidePublicStats: false
  });

  useEffect(() => {
    loadProfile();
    // Cargar preferencias de localStorage
    const saved = localStorage.getItem('lp_preferences');
    if (saved) {
      try {
        setPreferences(prev => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) { }
    }
  }, []);

  // Guardar preferencias en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('lp_preferences', JSON.stringify(preferences));
  }, [preferences]);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Cargar perfil de auth
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile({
          ...data,
          email: user.email,
          paypal_email: data?.paypal_email || '',
          bank_details: data?.bank_details || ''
        });

        // Cargar bio_profile para monetización
        const { data: bioData } = await supabase
          .from('bio_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (bioData) {
          setBioProfile(bioData);
        }
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
      toast.success('Avatar actualizado correctamente');
    } catch (error) {
      toast.error('Error al subir imagen');
    }
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
      toast.success('Cambios guardados correctamente');
    } catch (e) {
      toast.error('Error al guardar cambios');
    }
    finally { setTimeout(() => setSaving(false), 500); }
  };

  const toggle2FA = async () => {
    if (!profile.two_factor_enabled) {
      setShowQR(true);
    } else if (confirm('¿Desactivar autenticación 2FA?')) {
      setProfile({ ...profile, two_factor_enabled: false });
      await supabase.from('profiles').update({ two_factor_enabled: false }).eq('id', profile.id);
      toast.info('2FA desactivado');
    }
  };

  const confirm2FA = async () => {
    setProfile({ ...profile, two_factor_enabled: true });
    await supabase.from('profiles').update({ two_factor_enabled: true }).eq('id', profile.id);
    setShowQR(false);
    toast.success('2FA activado correctamente');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const copyPublicUrl = () => {
    if (bioProfile?.username) {
      navigator.clipboard.writeText(`${window.location.origin}/@${bioProfile.username}`);
      toast.success('URL copiada al portapapeles');
    }
  };

  // CPM según modo de monetización
  const getCPM = () => {
    const rates: Record<string, number> = { lite: 0.10, standard: 0.50, turbo: 1.50 };
    return rates[bioProfile?.monetization_mode] || 0.10;
  };

  // ===== FUNCIONES PARA SESIONES =====
  const loadSessions = async () => {
    setLoadingSessions(true);
    try {
      const data = await sessionsService.getActive();
      setSessions(data);
    } catch (e) {
      console.error('Error loading sessions:', e);
    } finally {
      setLoadingSessions(false);
    }
  };

  const revokeSession = async (sessionId: string) => {
    const success = await sessionsService.revoke(sessionId);
    if (success) {
      setSessions(prev => prev.filter(s => s.id !== sessionId));
      toast.success('Sesión cerrada correctamente');
    } else {
      toast.error('Error al cerrar sesión');
    }
  };

  const revokeAllSessions = async () => {
    const success = await sessionsService.revokeAll();
    if (success) {
      setSessions(prev => prev.filter(s => s.is_current));
      toast.success('Todas las otras sesiones han sido cerradas');
    } else {
      toast.error('Error al cerrar sesiones');
    }
  };

  // ===== FUNCIONES PARA API KEYS =====
  const loadApiKeys = async () => {
    setLoadingApiKeys(true);
    try {
      const data = await apiKeysService.getAll();
      setApiKeys(data);
    } catch (e) {
      console.error('Error loading API keys:', e);
    } finally {
      setLoadingApiKeys(false);
    }
  };

  const createApiKey = async () => {
    if (!newKeyName.trim()) {
      toast.warning('Ingresa un nombre para la API key');
      return;
    }

    const result = await apiKeysService.create(newKeyName.trim());
    if (result) {
      setCreatedKey(result.key);
      setNewKeyName('');
      await loadApiKeys();
      toast.success('API Key creada correctamente');
    } else {
      toast.error('Error al crear API Key');
    }
  };

  const deleteApiKey = async (keyId: string) => {
    if (!confirm('¿Eliminar esta API Key? Esta acción no se puede deshacer.')) return;

    const success = await apiKeysService.delete(keyId);
    if (success) {
      setApiKeys(prev => prev.filter(k => k.id !== keyId));
      toast.success('API Key eliminada');
    } else {
      toast.error('Error al eliminar API Key');
    }
  };

  // ===== ELIMINAR CUENTA =====
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'ELIMINAR') {
      toast.warning('Escribe "ELIMINAR" para confirmar');
      return;
    }

    setDeletingAccount(true);
    try {
      const success = await accountService.deleteAccount();
      if (success) {
        window.location.href = '/';
      } else {
        toast.error('Error al eliminar cuenta. Contacta a soporte.');
      }
    } catch (e) {
      toast.error('Error al eliminar cuenta');
    } finally {
      setDeletingAccount(false);
    }
  };

  // Cargar sesiones cuando se navega a la pestaña de seguridad
  useEffect(() => {
    if (activeTab === 'security' && sessions.length === 0) {
      loadSessions();
    }
    if (activeTab === 'integrations' && apiKeys.length === 0) {
      loadApiKeys();
    }
  }, [activeTab]);

  if (loading) return <PremiumLoader size="medium" text="AJUSTES" subtext="Cargando configuración..." />;

  return (
    <div className="lp-settings-shell-v2 lp-premium-bg">
      <div className="lp-settings-container-v2">

        {/* HEADER */}
        <header className="lp-settings-header-v2">
          <div className="lp-settings-title-block-v2">
            <h1>Ajustes</h1>
            <p>Personaliza tu experiencia LinkPay</p>
          </div>
          {profile.is_verified && (
            <div className="lp-verified-badge-v2">
              <CheckCircle2 size={14} />
              VERIFICADO
            </div>
          )}
        </header>

        {/* MOBILE NAV TOGGLE */}
        <button
          className="lp-settings-mobile-toggle"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          <span>{SECTION_CONFIG.find(s => s.id === activeTab)?.label}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="lp-settings-layout-v2">
          {/* SIDEBAR NAV */}
          <nav className={`lp-settings-nav-v2 ${mobileNavOpen ? 'open' : ''}`}>
            {SECTION_CONFIG.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => { setActiveTab(section.id); setMobileNavOpen(false); }}
                  className={`lp-settings-nav-item ${activeTab === section.id ? 'active' : ''}`}
                  data-color={section.color}
                >
                  <div className="lp-settings-nav-icon">
                    <Icon size={18} />
                  </div>
                  <span>{section.label}</span>
                </button>
              );
            })}

            <div className="lp-settings-nav-divider" />

            <button onClick={handleLogout} className="lp-settings-nav-item logout">
              <div className="lp-settings-nav-icon">
                <LogOut size={18} />
              </div>
              <span>Cerrar sesión</span>
            </button>
          </nav>

          {/* CONTENT AREA */}
          <main className="lp-settings-content-v2">

            {/* ==================== PERFIL ==================== */}
            {activeTab === 'profile' && (
              <div className="lp-settings-section-stack">
                <SettingsSection icon={User} title="Perfil e Identidad" description="Tu información pública" accentColor="blue">
                  {/* Avatar y datos básicos */}
                  <div className="lp-profile-header-v2">
                    <div className="lp-avatar-upload-v2" onClick={() => fileInputRef.current?.click()}>
                      {profile.avatar_url ? (
                        <img src={profile.avatar_url} alt="Avatar" />
                      ) : (
                        <span className="lp-avatar-initial">{profile.full_name?.[0] || '?'}</span>
                      )}
                      <div className="lp-avatar-overlay-v2">
                        <Camera size={20} />
                      </div>
                      <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleAvatarUpload} />
                    </div>
                    <div className="lp-profile-info-v2">
                      <h3>{profile.full_name || 'Usuario'}</h3>
                      <p className="lp-profile-email">{profile.email}</p>
                      {bioProfile?.username && (
                        <div className="lp-profile-url-row">
                          <span className="lp-profile-url">@{bioProfile.username}</span>
                          <button className="lp-icon-btn" onClick={copyPublicUrl} title="Copiar URL">
                            <Copy size={14} />
                          </button>
                          <a
                            href={`/@${bioProfile.username}`}
                            target="_blank"
                            rel="noopener"
                            className="lp-icon-btn"
                            title="Ver página pública"
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <SettingsItem>
                    <SettingsInput
                      label="Nombre completo"
                      value={profile.full_name || ''}
                      onChange={v => setProfile({ ...profile, full_name: v })}
                      placeholder="Tu nombre"
                      icon={User}
                    />
                  </SettingsItem>

                  <SettingsItem>
                    <div className="lp-settings-input-group">
                      <label className="lp-settings-input-label">Bio</label>
                      <textarea
                        className="lp-settings-textarea"
                        value={profile.bio || ''}
                        onChange={e => setProfile({ ...profile, bio: e.target.value })}
                        placeholder="Cuéntanos sobre ti..."
                        rows={3}
                      />
                    </div>
                  </SettingsItem>

                  <div className="lp-settings-actions">
                    <button onClick={handleSave} disabled={saving} className="lp-btn-save">
                      {saving ? <Loader2 className="spin" size={18} /> : <><Save size={18} /> Guardar cambios</>}
                    </button>
                  </div>
                </SettingsSection>

                {/* Preview del perfil público */}
                {bioProfile && (
                  <SettingsSection icon={Eye} title="Vista Previa" description="Así se ve tu página pública" accentColor="cyan">
                    <ProfilePreview
                      profile={{
                        avatar_url: profile.avatar_url,
                        full_name: profile.full_name,
                        description: profile.bio,
                        username: bioProfile.username
                      }}
                      bioProfile={{
                        username: bioProfile.username,
                        theme: bioProfile.theme,
                        links: bioProfile.links || []
                      }}
                    />
                  </SettingsSection>
                )}
              </div>
            )}

            {/* ==================== SEGURIDAD ==================== */}
            {activeTab === 'security' && (
              <div className="lp-settings-section-stack">
                <SettingsSection icon={Shield} title="Seguridad" description="Protege tu cuenta" accentColor="green">

                  <SettingsItem>
                    <div className="lp-security-row">
                      <div className="lp-security-info">
                        <h4>Autenticación en dos pasos (2FA)</h4>
                        <p>{profile.two_factor_enabled ? 'Activado - Tu cuenta está protegida' : 'Desactivado - Añade una capa extra de seguridad'}</p>
                      </div>
                      <button
                        onClick={toggle2FA}
                        className={`lp-btn-outline ${profile.two_factor_enabled ? 'danger' : 'success'}`}
                      >
                        {profile.two_factor_enabled ? 'Desactivar' : 'Activar'}
                      </button>
                    </div>
                  </SettingsItem>

                  {showQR && (
                    <div className="lp-2fa-setup">
                      <p className="lp-2fa-instruction">Escanea este código con Google Authenticator o similar:</p>
                      <div className="lp-2fa-qr-wrap">
                        <QRCodeSVG value={`otpauth://totp/LinkPay:${profile.email}?secret=DEMO123&issuer=LinkPay`} size={160} />
                      </div>
                      <p className="lp-2fa-note">
                        <strong>Importante:</strong> Guarda el código de respaldo en un lugar seguro antes de confirmar.
                      </p>
                      <button onClick={confirm2FA} className="lp-btn-save">
                        Confirmar configuración
                      </button>
                    </div>
                  )}

                  <SettingsItem>
                    <div className="lp-security-row">
                      <div className="lp-security-info">
                        <h4>Cambiar contraseña</h4>
                        <p>Actualiza tu contraseña de acceso</p>
                      </div>
                      <button
                        onClick={() => {
                          window.location.href = '/forgot-password';
                        }}
                        className="lp-btn-outline"
                      >
                        Cambiar
                      </button>
                    </div>
                  </SettingsItem>

                  <SettingsItem border={false}>
                    <div className="lp-sessions-section">
                      <div className="lp-sessions-header">
                        <div>
                          <h4>Sesiones activas</h4>
                          <p>Dispositivos conectados a tu cuenta</p>
                        </div>
                        {sessions.length > 1 && (
                          <button onClick={revokeAllSessions} className="lp-btn-outline danger">
                            Cerrar otras
                          </button>
                        )}
                      </div>

                      {loadingSessions ? (
                        <div className="lp-sessions-loading">
                          <Loader2 className="spin" size={20} />
                          <span>Cargando sesiones...</span>
                        </div>
                      ) : sessions.length > 0 ? (
                        <div className="lp-sessions-list">
                          {sessions.map(session => (
                            <div key={session.id} className={`lp-session-item ${session.is_current ? 'current' : ''}`}>
                              <div className="lp-session-icon">
                                {session.device_type === 'mobile' ? <Smartphone size={18} /> : <Globe size={18} />}
                              </div>
                              <div className="lp-session-info">
                                <span className="lp-session-device">
                                  {session.device_name || session.browser || 'Dispositivo desconocido'}
                                  {session.is_current && <span className="lp-current-badge">Este dispositivo</span>}
                                </span>
                                <span className="lp-session-details">
                                  {session.os} • {session.location || 'Ubicación desconocida'}
                                </span>
                              </div>
                              {!session.is_current && (
                                <button
                                  onClick={() => revokeSession(session.id)}
                                  className="lp-session-revoke"
                                  title="Cerrar sesión"
                                >
                                  <X size={16} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="lp-sessions-empty">
                          <p>No hay otras sesiones activas. Solo estás conectado desde este dispositivo.</p>
                        </div>
                      )}
                    </div>
                  </SettingsItem>
                </SettingsSection>
              </div>
            )}

            {/* ==================== APARIENCIA ==================== */}
            {activeTab === 'visual' && (
              <div className="lp-settings-section-stack">
                <SettingsSection icon={Palette} title="Preferencias Visuales" description="Personaliza tu experiencia" accentColor="purple">

                  <SettingsItem>
                    <div className="lp-theme-selector">
                      <div className="lp-theme-info">
                        <h4>Tema de la aplicación</h4>
                        <p>Elige entre modo claro u oscuro</p>
                      </div>
                      <div className="lp-theme-options">
                        <button
                          className={`lp-theme-btn ${theme === 'light' ? 'active' : ''}`}
                          onClick={() => setTheme('light')}
                        >
                          <Sun size={18} />
                          Claro
                        </button>
                        <button
                          className={`lp-theme-btn ${theme === 'dark' ? 'active' : ''}`}
                          onClick={() => setTheme('dark')}
                        >
                          <Moon size={18} />
                          Oscuro
                        </button>
                      </div>
                    </div>
                  </SettingsItem>

                  <SettingsItem>
                    <div className="lp-accent-selector">
                      <div className="lp-accent-info">
                        <h4>Color de acento</h4>
                        <p>Personaliza el color principal de tu interfaz</p>
                      </div>
                      <div className="lp-accent-options">
                        {ACCENT_COLORS.map(({ name, value }) => (
                          <button
                            key={value}
                            className={`lp-accent-btn ${accentColor === value ? 'active' : ''}`}
                            style={{ '--accent': value } as React.CSSProperties}
                            onClick={() => setAccentColor(value)}
                            title={name}
                          />
                        ))}
                      </div>
                    </div>
                  </SettingsItem>

                  <div className="lp-settings-note">
                    <Palette size={16} />
                    <span>El tema y color de acento se aplican a toda la aplicación y se guardan automáticamente.</span>
                  </div>
                </SettingsSection>
              </div>
            )}

            {/* ==================== MONETIZACIÓN ==================== */}
            {activeTab === 'monetization' && (
              <div className="lp-settings-section-stack">
                <SettingsSection icon={Wallet} title="Monetización y Finanzas" description="Gestiona tus ingresos" accentColor="orange">

                  {bioProfile && (
                    <SettingsItem>
                      <div className="lp-monetization-status">
                        <div className="lp-monetization-info">
                          <h4>Estado de monetización</h4>
                          <p>Modo actual: <strong className="lp-mode-badge">{bioProfile.monetization_mode?.toUpperCase()}</strong></p>
                        </div>
                        <div className="lp-cpm-display">
                          <DollarSign size={16} />
                          <span>CPM: €{getCPM().toFixed(2)}</span>
                        </div>
                      </div>
                    </SettingsItem>
                  )}

                  <SettingsItem>
                    <div className="lp-payment-card-v2">
                      <div className="lp-payment-header-v2">
                        <div className="lp-payment-icon-v2" style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
                          <Mail size={18} color="#60a5fa" />
                        </div>
                        <span>PayPal</span>
                      </div>
                      <SettingsInput
                        label="Email de PayPal"
                        value={profile.paypal_email || ''}
                        onChange={v => setProfile({ ...profile, paypal_email: v })}
                        placeholder="tu@paypal.com"
                        type="email"
                        helper="Se usará para pagos automáticos mensuales"
                      />
                    </div>
                  </SettingsItem>

                  <SettingsItem>
                    <div className="lp-payment-card-v2">
                      <div className="lp-payment-header-v2">
                        <div className="lp-payment-icon-v2" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                          <Landmark size={18} color="#a78bfa" />
                        </div>
                        <span>Transferencia Bancaria</span>
                      </div>
                      <SettingsInput
                        label="IBAN / Cuenta"
                        value={profile.bank_details || ''}
                        onChange={v => setProfile({ ...profile, bank_details: v })}
                        placeholder="ES91 0000 0000 0000 0000"
                        helper="Solo para retiros superiores a €500"
                      />
                    </div>
                  </SettingsItem>

                  <div className="lp-settings-actions">
                    <button onClick={handleSave} disabled={saving} className="lp-btn-save">
                      {saving ? <Loader2 className="spin" size={18} /> : <><Save size={18} /> Guardar métodos de pago</>}
                    </button>
                  </div>
                </SettingsSection>
              </div>
            )}

            {/* ==================== NOTIFICACIONES ==================== */}
            {activeTab === 'notifications' && (
              <div className="lp-settings-section-stack">
                <SettingsSection icon={Bell} title="Notificaciones" description="Controla tus alertas" accentColor="pink">

                  <SettingsItem>
                    <ToggleSwitch
                      checked={preferences.notificationsEnabled}
                      onChange={v => setPreferences(p => ({ ...p, notificationsEnabled: v }))}
                      label="Notificaciones de actividad"
                      description="Recibe alertas de clics e ingresos importantes"
                      color="pink"
                    />
                  </SettingsItem>

                  <SettingsItem>
                    <ToggleSwitch
                      checked={preferences.weeklyReport}
                      onChange={v => setPreferences(p => ({ ...p, weeklyReport: v }))}
                      label="Resumen semanal"
                      description="Recibe un email con el rendimiento de la semana"
                      color="pink"
                    />
                  </SettingsItem>

                  <SettingsItem border={false}>
                    <div className="lp-coming-soon-block">
                      <Zap size={20} />
                      <div>
                        <h4>Alertas de viralidad</h4>
                        <p>Notificaciones cuando un link supere umbrales de visitas</p>
                      </div>
                      <span className="lp-badge-soon">Próximamente</span>
                    </div>
                  </SettingsItem>

                  <div className="lp-settings-note">
                    <Bell size={16} />
                    <span>Tus preferencias de notificaciones se guardan automáticamente.</span>
                  </div>
                </SettingsSection>
              </div>
            )}

            {/* ==================== PRIVACIDAD ==================== */}
            {activeTab === 'privacy' && (
              <div className="lp-settings-section-stack">
                <SettingsSection icon={Lock} title="Privacidad y Control" description="Gestiona tu visibilidad" accentColor="cyan">

                  <SettingsItem>
                    <ToggleSwitch
                      checked={preferences.bioPublic}
                      onChange={v => setPreferences(p => ({ ...p, bioPublic: v }))}
                      label="Página Bio pública"
                      description="Tu página de enlaces es visible para todos"
                      color="blue"
                    />
                  </SettingsItem>

                  <SettingsItem>
                    <ToggleSwitch
                      checked={preferences.hidePublicStats}
                      onChange={v => setPreferences(p => ({ ...p, hidePublicStats: v }))}
                      label="Ocultar estadísticas públicas"
                      description="No mostrar contadores de visitas en tu página"
                      color="blue"
                    />
                  </SettingsItem>

                  <div className="lp-settings-note">
                    <Lock size={16} />
                    <span>Tus preferencias de privacidad se guardan automáticamente.</span>
                  </div>
                </SettingsSection>
              </div>
            )}

            {/* ==================== INTEGRACIONES ==================== */}
            {activeTab === 'integrations' && (
              <div className="lp-settings-section-stack">
                <SettingsSection icon={Plug} title="Integraciones" description="Conecta servicios externos" accentColor="purple">

                  <SettingsItem>
                    <div className="lp-coming-soon-block">
                      <div className="lp-integration-icon">🔗</div>
                      <div>
                        <h4>Redes Sociales</h4>
                        <p>Conecta Instagram, TikTok, YouTube y más</p>
                      </div>
                      <span className="lp-badge-soon">Próximamente</span>
                    </div>
                  </SettingsItem>

                  <SettingsItem>
                    <div className="lp-api-keys-section">
                      <div className="lp-api-keys-header">
                        <div>
                          <h4>API Keys</h4>
                          <p>Genera claves para integrar LinkPay en tu app</p>
                        </div>
                      </div>

                      {/* Crear nueva key */}
                      <div className="lp-api-key-create">
                        <input
                          type="text"
                          value={newKeyName}
                          onChange={e => setNewKeyName(e.target.value)}
                          placeholder="Nombre de la API key (ej: Mi App)"
                          className="lp-settings-input"
                        />
                        <button onClick={createApiKey} className="lp-btn-save">
                          <Plus size={16} />
                          Crear
                        </button>
                      </div>

                      {/* Key recién creada */}
                      {createdKey && (
                        <div className="lp-api-key-created">
                          <AlertTriangle size={16} />
                          <div>
                            <strong>Guarda esta key - no se mostrará de nuevo:</strong>
                            <code>{createdKey}</code>
                          </div>
                          <button onClick={() => {
                            navigator.clipboard.writeText(createdKey);
                            toast.success('Key copiada');
                          }}>
                            <Copy size={14} />
                          </button>
                          <button onClick={() => setCreatedKey(null)}>
                            <X size={14} />
                          </button>
                        </div>
                      )}

                      {/* Lista de keys */}
                      {loadingApiKeys ? (
                        <div className="lp-sessions-loading">
                          <Loader2 className="spin" size={20} />
                          <span>Cargando API keys...</span>
                        </div>
                      ) : apiKeys.length > 0 ? (
                        <div className="lp-api-keys-list">
                          {apiKeys.map(key => (
                            <div key={key.id} className="lp-api-key-item">
                              <div className="lp-api-key-icon">
                                <Key size={16} />
                              </div>
                              <div className="lp-api-key-info">
                                <span className="lp-api-key-name">{key.name}</span>
                                <span className="lp-api-key-prefix">{key.key_prefix}•••••••</span>
                              </div>
                              <span className={`lp-api-key-status ${key.is_active ? 'active' : 'inactive'}`}>
                                {key.is_active ? 'Activa' : 'Inactiva'}
                              </span>
                              <button
                                onClick={() => deleteApiKey(key.id)}
                                className="lp-api-key-delete"
                                title="Eliminar"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="lp-sessions-empty">
                          <p>No tienes API keys. Crea una para empezar.</p>
                        </div>
                      )}
                    </div>
                  </SettingsItem>

                  <SettingsItem border={false}>
                    <div className="lp-coming-soon-block">
                      <div className="lp-integration-icon">📊</div>
                      <div>
                        <h4>Analytics Avanzados</h4>
                        <p>Conecta Google Analytics, Facebook Pixel, UTMs</p>
                      </div>
                      <span className="lp-badge-soon">Próximamente</span>
                    </div>
                  </SettingsItem>
                </SettingsSection>
              </div>
            )}

            {/* ==================== CUENTA ==================== */}
            {activeTab === 'account' && (
              <div className="lp-settings-section-stack">
                <SettingsSection icon={HelpCircle} title="Cuenta y Soporte" description="Ayuda y opciones de cuenta" accentColor="blue">

                  <SettingsItem>
                    <div className="lp-support-row">
                      <div className="lp-support-info">
                        <h4>Contactar soporte</h4>
                        <p>¿Necesitas ayuda? Escríbenos</p>
                      </div>
                      <a href="mailto:support@linkpay.io" className="lp-btn-outline">
                        Enviar email
                      </a>
                    </div>
                  </SettingsItem>

                  <SettingsItem>
                    <div className="lp-danger-zone">
                      <div className="lp-danger-info">
                        <h4>Cerrar sesión</h4>
                        <p>Salir de tu cuenta en este dispositivo</p>
                      </div>
                      <button onClick={handleLogout} className="lp-btn-outline danger">
                        <LogOut size={16} />
                        Cerrar sesión
                      </button>
                    </div>
                  </SettingsItem>

                  <SettingsItem border={false}>
                    <div className="lp-danger-zone critical">
                      <div className="lp-danger-info">
                        <h4>Eliminar cuenta</h4>
                        <p>Eliminar permanentemente tu cuenta y todos los datos</p>
                      </div>
                      <button
                        className="lp-btn-outline danger"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        <Trash2 size={16} />
                        Eliminar cuenta
                      </button>
                    </div>
                  </SettingsItem>
                </SettingsSection>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* ===== MODAL ELIMINAR CUENTA ===== */}
      {showDeleteModal && (
        <div className="lp-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="lp-modal-content" onClick={e => e.stopPropagation()}>
            <div className="lp-modal-header">
              <AlertTriangle size={24} color="#ef4444" />
              <h3>Eliminar cuenta permanentemente</h3>
            </div>

            <div className="lp-modal-body">
              <p className="lp-modal-warning">
                Esta acción es <strong>irreversible</strong>. Se eliminarán:
              </p>
              <ul className="lp-delete-list">
                <li>Tu perfil y datos personales</li>
                <li>Todos tus links y BioPages</li>
                <li>Historial de ganancias y clics</li>
                <li>API Keys y webhooks</li>
                <li>Todas las sesiones activas</li>
              </ul>
              <p className="lp-modal-confirm-text">
                Escribe <strong>ELIMINAR</strong> para confirmar:
              </p>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={e => setDeleteConfirmText(e.target.value.toUpperCase())}
                placeholder="ELIMINAR"
                className="lp-settings-input"
              />
            </div>

            <div className="lp-modal-actions">
              <button
                className="lp-btn-outline"
                onClick={() => { setShowDeleteModal(false); setDeleteConfirmText(''); }}
              >
                Cancelar
              </button>
              <button
                className="lp-btn-danger"
                onClick={handleDeleteAccount}
                disabled={deletingAccount || deleteConfirmText !== 'ELIMINAR'}
              >
                {deletingAccount ? <Loader2 className="spin" size={16} /> : <Trash2 size={16} />}
                Eliminar cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

