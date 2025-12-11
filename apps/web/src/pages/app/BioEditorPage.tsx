import React, { useState, useEffect } from 'react';
import {
  Layout,
  Palette,
  Settings,
  Share2,
  Plus,
  Trash2,
  GripVertical,
  Loader2,
  Eye,
  TrendingUp,
  DollarSign,
  Zap,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  BarChart2,
  Calendar,
  Square,
  Circle,
  MousePointer2,
  Type,
  Minus,
  Star,
  // Social Icons
  Instagram,
  Twitter,
  Youtube,
  Twitch,
  Github,
  Linkedin,
  Facebook,
  Music,
  ShoppingBag,
  Mail,
  Globe,
  Link as LinkIcon,
  User,
  Camera,
  Sparkles,
  QrCode
} from 'lucide-react';
import { BioService, BioProfile, BioLink, BioAchievement } from '../../lib/bioService';
import { supabase } from '../../lib/supabaseClient';
import { useToast, useConfirm } from '../../components/ui/Toast';
import { QRCodeGenerator } from '../../components/QRCodeGenerator';
import { ProfileCompletion, AchievementsBadges, XPBar } from '../../components/Gamification';
import { Award, Clock } from 'lucide-react';
import './BioEditor.css'; // V3 Styles

// Drag & Drop
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// === TYPESCRIPT INTERFACES ===
interface LinkCardV3Props {
  link: BioLink;
  onUpdate: (id: string, field: string, value: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onThumbnailUpload: (linkId: string, file: File) => Promise<void>;
  onToggleActive: (id: string, newState: boolean) => void;
}

interface LivePreviewProps {
  profile: BioProfile;
}

export function BioEditorPage() {
  const [profile, setProfile] = useState<BioProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'links' | 'appearance' | 'earn' | 'settings'>('links');
  const [saving, setSaving] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Toast & Confirm hooks
  const toast = useToast();
  const { confirm, ConfirmDialog } = useConfirm();

  // Expanded card state
  const [expandedLinkId, setExpandedLinkId] = useState<string | null>(null);

  // Achievements from DB
  const [achievements, setAchievements] = useState<BioAchievement[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const data = await BioService.getOrCreateProfile(user);
        setProfile(data as BioProfile);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Load achievements when profile loads
  useEffect(() => {
    if (profile?.id) {
      BioService.getAchievements(profile.id).then(setAchievements);
    }
  }, [profile?.id]);

  // Keyboard shortcuts for power users
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S = Show save confirmation
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        toast.success('✓ Cambios guardados automáticamente');
      }
      // Ctrl/Cmd + K = Add new link
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        addLink();
      }
      // Escape = Close expanded card
      if (e.key === 'Escape' && expandedLinkId) {
        setExpandedLinkId(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [expandedLinkId, profile]);

  const updateProfile = async (field: keyof BioProfile, value: any) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
    setSaving(true);
    await BioService.updateProfile(profile.id, { [field]: value });
    setTimeout(() => setSaving(false), 500);
  };

  const addLink = async () => {
    if (!profile) return;
    const tempId = 'temp-' + Date.now();
    const newLink = {
      id: tempId,
      title: 'Nuevo enlace',
      url: '',
      active: true,
      clicks: 0,
      block_type: 'link' as const,
      order_index: (profile.links?.length || 0) + 1
    };
    // Optimistic update
    setProfile({ ...profile, links: [...profile.links, newLink] });
    setExpandedLinkId(tempId);

    // Server call - replace temp with real ID
    const created = await BioService.addLink(profile.id, 'Nuevo enlace', '');
    if (created) {
      setProfile(prev => prev ? {
        ...prev,
        links: prev.links.map(l => l.id === tempId ? { ...created } : l)
      } : prev);
      setExpandedLinkId(created.id);
    }
  };

  const addSpecialBlock = async (blockType: 'header' | 'divider' | 'spotlight') => {
    if (!profile) return;
    const tempId = 'temp-' + Date.now();
    const titles: Record<string, string> = {
      header: 'Nuevo Header',
      divider: '---',
      spotlight: '⭐ Destacado'
    };
    const newBlock = {
      id: tempId,
      title: titles[blockType],
      url: blockType === 'divider' ? '' : '#',
      active: true,
      clicks: 0,
      block_type: blockType,
      order_index: (profile.links?.length || 0) + 1
    };
    // Optimistic update
    setProfile({ ...profile, links: [...profile.links, newBlock] });
    if (blockType !== 'divider') setExpandedLinkId(tempId);

    // Server call with options
    const created = await BioService.addLink(profile.id, titles[blockType], blockType === 'divider' ? '' : '#', { block_type: blockType });
    if (created) {
      setProfile(prev => prev ? {
        ...prev,
        links: prev.links.map(l => l.id === tempId ? { ...created } : l)
      } : prev);
      if (blockType !== 'divider') setExpandedLinkId(created.id);
    }
  };

  const updateLink = async (id: string, field: string, value: any) => {
    if (!profile) return;
    const updatedLinks = profile.links.map((l: any) =>
      l.id === id ? { ...l, [field]: value } : l
    );
    setProfile({ ...profile, links: updatedLinks });
    if (!id.startsWith('temp-')) {
      await BioService.updateLink(id, { [field]: value });
    }
  };

  const deleteLink = async (id: string) => {
    if (!profile) return;
    const confirmed = await confirm('Eliminar enlace', '¿Estás seguro de que quieres eliminar este enlace permanentemente?', 'danger');
    if (!confirmed) return;
    setProfile({ ...profile, links: profile.links.filter((l: any) => l.id !== id) });
    await BioService.deleteLink(id);
    toast.success('Enlace eliminado');
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!profile) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = profile.links.findIndex((l: any) => l.id === active.id);
    const newIndex = profile.links.findIndex((l: any) => l.id === over.id);
    const newLinks = arrayMove(profile.links, oldIndex, newIndex).map((l, idx) => ({ ...l, order_index: idx }));
    setProfile({ ...profile, links: newLinks });
    await BioService.reorderLinks(newLinks);
    toast.success('Orden actualizado');
  };

  const toggleActive = async (id: string, newState: boolean) => {
    await updateLink(id, 'active', newState);
    toast.success(newState ? 'Enlace activado' : 'Enlace desactivado');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'background') => {
    if (!profile || !e.target.files?.[0]) return;
    try {
      setSaving(true);
      const url = await BioService.uploadImage(e.target.files[0], profile.user_id, type);
      if (type === 'avatar') updateProfile('avatar_url', url);
      else {
        updateProfile('background_url', url);
        updateProfile('theme', 'custom');
      }
    } catch (err) {
      toast.error('Error al subir imagen');
    } finally {
      setSaving(false);
    }
  };

  // Upload thumbnail para un enlace específico
  const handleThumbnailUpload = async (linkId: string, file: File) => {
    if (!profile) return;
    try {
      const url = await BioService.uploadImage(file, profile.user_id, 'thumbnail');
      await updateLink(linkId, 'thumbnail_url', url);
    } catch (err) {
      console.error('Thumbnail upload failed:', err);
      toast.error('Error al subir miniatura');
    }
  };

  if (loading) return <div className="h-screen w-full bg-slate-950 flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>;
  if (!profile) return null;

  return (
    <div className="lp-bio-shell-v3">
      {/* MOBILE PREVIEW FAB - IMPROVED */}
      <button
        className="lp-preview-fab md:hidden"
        onClick={() => setShowMobilePreview(true)}
      >
        <Eye size={18} />
        <span>Vista Previa</span>
      </button>

      {/* MOBILE PREVIEW MODAL - IMPROVED */}
      {showMobilePreview && (
        <div className="lp-preview-modal-overlay" onClick={() => setShowMobilePreview(false)}>
          <div className="lp-preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="lp-preview-modal-header">
              <span>Vista Previa en Vivo</span>
              <button onClick={() => setShowMobilePreview(false)}>✕</button>
            </div>
            <div className="lp-preview-modal-frame">
              <LivePreview profile={profile} />
            </div>
          </div>
        </div>
      )}

      <div className="lp-container">

        {/* === EDITOR COLUMN === */}
        <div className="lp-editor-col">

          <div className="lp-nav">
            <div className="lp-logo text-white">
              <Layout size={20} className="text-blue-500" />
              LinkPay
            </div>

            {/* Global Stats */}
            <div className="lp-global-stats">
              <div className="lp-stat-pill">
                <Eye size={14} />
                <span>{profile.views || 0}</span>
              </div>
              <div className="lp-stat-pill">
                <MousePointer2 size={14} />
                <span>{profile.links?.reduce((sum: number, l: any) => sum + (l.clicks || 0), 0) || 0}</span>
              </div>
            </div>

            <div className="lp-nav-actions">
              {saving && (
                <div className="lp-saving-indicator">
                  <Loader2 size={12} className="animate-spin" />
                  <span>Guardando</span>
                </div>
              )}
              <button
                className="lp-btn-basic lp-btn-primary"
                onClick={async () => {
                  const url = `${window.location.origin}/b/${profile.username}`;
                  await navigator.clipboard.writeText(url);
                  toast.success('URL copiada al portapapeles');
                }}
              >
                <Share2 size={14} /> Compartir
              </button>
            </div>
          </div>

          <div className="lp-tabs-container">
            <div className="lp-tabs-list" role="tablist" aria-label="Editor sections">
              <button
                role="tab"
                aria-selected={activeTab === 'links'}
                className={`lp-tab ${activeTab === 'links' ? 'active' : ''}`}
                onClick={() => setActiveTab('links')}
              >
                Enlaces
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'appearance'}
                className={`lp-tab ${activeTab === 'appearance' ? 'active' : ''}`}
                onClick={() => setActiveTab('appearance')}
              >
                Apariencia
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'earn'}
                className={`lp-tab ${activeTab === 'earn' ? 'active' : ''}`}
                onClick={() => setActiveTab('earn')}
              >
                Earn
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'settings'}
                className={`lp-tab ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                Ajustes
              </button>
            </div>
          </div>

          <div className="lp-scroll-area">
            <div className="lp-content-max">

              {/* --- LINKS TAB --- */}
              {activeTab === 'links' && (
                <>
                  {/* Botón principal de añadir */}
                  <button className="lp-btn-add-primary" onClick={addLink}>
                    <Plus size={20} /> Añadir enlace
                  </button>

                  {/* Bloques especiales - secundarios */}
                  <div className="lp-add-special-row">
                    <span className="lp-add-special-label">Añadir bloque:</span>
                    <button className="lp-btn-special" onClick={() => addSpecialBlock('header')}>
                      <Type size={14} /> Header
                    </button>
                    <button className="lp-btn-special" onClick={() => addSpecialBlock('divider')}>
                      <Minus size={14} /> Divisor
                    </button>
                    <button className="lp-btn-special" onClick={() => addSpecialBlock('spotlight')}>
                      <Star size={14} /> Spotlight
                    </button>
                  </div>

                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={profile.links.map(l => l.id)} strategy={verticalListSortingStrategy}>
                      <div className="flex flex-col gap-4">
                        {profile.links.map(link => (
                          <LinkCardV3
                            key={link.id}
                            link={link}
                            onUpdate={updateLink}
                            onDelete={deleteLink}
                            isExpanded={expandedLinkId === link.id}
                            onToggleExpand={() => setExpandedLinkId(expandedLinkId === link.id ? null : link.id)}
                            onThumbnailUpload={handleThumbnailUpload}
                            onToggleActive={toggleActive}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>

                  {profile.links.length === 0 && (
                    <div className="lp-empty-state-premium">
                      <div className="lp-empty-icon">
                        <LinkIcon size={32} />
                      </div>
                      <h3 className="lp-empty-title">Tu página está vacía</h3>
                      <p className="lp-empty-desc">
                        Añade tu primer enlace y empieza a compartir tu contenido con el mundo
                      </p>
                      <button className="lp-empty-cta" onClick={addLink}>
                        <Plus size={18} /> Crear mi primer enlace
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* --- APPEARANCE TAB - PREMIUM REDESIGN --- */}
              {activeTab === 'appearance' && (
                <div className="lp-appearance-container">

                  {/* PROFILE CARD */}
                  <div className="lp-settings-card">
                    <div className="lp-settings-card-header">
                      <div className="lp-settings-icon-box">
                        <User size={18} />
                      </div>
                      <div>
                        <h3>Perfil</h3>
                        <p>Tu foto y datos principales</p>
                      </div>
                    </div>

                    <div className="lp-profile-row">
                      <label className="lp-avatar-upload-v2">
                        {profile.avatar_url ? (
                          <img src={profile.avatar_url} alt="Avatar" />
                        ) : (
                          <div className="lp-avatar-placeholder-v2">{profile.username[0]?.toUpperCase()}</div>
                        )}
                        <div className="lp-avatar-edit-overlay">
                          <Camera size={16} />
                        </div>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'avatar')} />
                      </label>

                      <div className="lp-settings-fields" style={{ flex: 1 }}>
                        <div className="lp-input-group">
                          <label>Nombre</label>
                          <input
                            value={profile.display_name}
                            onChange={(e) => updateProfile('display_name', e.target.value)}
                            placeholder="Tu nombre o marca"
                          />
                        </div>
                        <div className="lp-input-group">
                          <label>Bio</label>
                          <textarea
                            value={profile.description}
                            onChange={(e) => updateProfile('description', e.target.value)}
                            placeholder="Cuéntale al mundo quién eres..."
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* THEMES CARD */}
                  <div className="lp-settings-card">
                    <div className="lp-settings-card-header">
                      <div className="lp-settings-icon-box" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)' }}>
                        <Palette size={18} />
                      </div>
                      <div>
                        <h3>Tema</h3>
                        <p>Elige el look de tu página</p>
                      </div>
                    </div>

                    <div className="lp-theme-selector">
                      {[
                        { id: 'light', name: 'Claro', bg: '#f8fafc', text: '#334155' },
                        { id: 'dark', name: 'Oscuro', bg: '#0f172a', text: '#94a3b8' },
                        { id: 'blue', name: 'Azul', bg: '#2563eb', text: 'white' },
                        { id: 'gradient', name: 'Gradiente', bg: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', text: 'white' },
                        { id: 'neon', name: 'Neon', bg: '#000', text: '#39ff14' },
                        { id: 'pastel', name: 'Pastel', bg: 'linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)', text: '#6b21a8' },
                      ].map(theme => (
                        <div
                          key={theme.id}
                          className={`lp-theme-item ${profile.theme === theme.id ? 'active' : ''}`}
                          style={{ background: theme.bg }}
                          onClick={() => updateProfile('theme', theme.id)}
                        >
                          <span style={{ color: theme.text }}>{theme.name}</span>
                          {profile.theme === theme.id && <div className="lp-theme-check">✓</div>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BUTTON STYLES CARD */}
                  <div className="lp-settings-card">
                    <div className="lp-settings-card-header">
                      <div className="lp-settings-icon-box blue">
                        <MousePointer2 size={18} />
                      </div>
                      <div>
                        <h3>Estilo de Botones</h3>
                        <p>Personaliza la forma de tus enlaces</p>
                      </div>
                    </div>

                    <div className="lp-button-style-grid">
                      {[
                        { id: 'rounded', label: 'Rounded', radius: '8px', fill: true },
                        { id: 'pill', label: 'Pill', radius: '100px', fill: true },
                        { id: 'square', label: 'Square', radius: '0px', fill: true },
                        { id: 'shadow', label: 'Shadow', radius: '8px', shadow: true },
                        { id: 'outline', label: 'Outline', radius: '8px', outline: true },
                        { id: 'glass', label: 'Glass', radius: '8px', glass: true },
                      ].map(style => (
                        <div
                          key={style.id}
                          className={`lp-button-style-item ${profile.button_style === style.id ? 'active' : ''}`}
                          onClick={() => updateProfile('button_style', style.id)}
                        >
                          <div
                            className="lp-button-preview"
                            style={{
                              borderRadius: style.radius,
                              background: style.fill ? 'rgba(255,255,255,0.12)' : 'transparent',
                              border: style.outline ? '2px solid white' : style.shadow ? '2px solid black' : '1px solid rgba(255,255,255,0.2)',
                              boxShadow: style.shadow ? '3px 3px 0 black' : 'none',
                              backdropFilter: style.glass ? 'blur(4px)' : 'none',
                            }}
                          />
                          <span>{style.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BACKGROUND CARD */}
                  <div className="lp-settings-card">
                    <div className="lp-settings-card-header">
                      <div className="lp-settings-icon-box" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                        <ImageIcon size={18} />
                      </div>
                      <div>
                        <h3>Fondo</h3>
                        <p>Imagen de fondo personalizada</p>
                      </div>
                    </div>

                    <div className="lp-background-options">
                      <div
                        className={`lp-bg-option ${!profile.background_url ? 'active' : ''}`}
                        onClick={() => updateProfile('background_url', '')}
                      >
                        <div className="lp-bg-preview none">✕</div>
                        <span>Sin fondo</span>
                      </div>

                      {profile.background_url && (
                        <div className="lp-bg-option active">
                          <div
                            className="lp-bg-preview"
                            style={{ backgroundImage: `url(${profile.background_url})` }}
                          />
                          <span>Actual</span>
                        </div>
                      )}

                      <label className="lp-bg-option upload">
                        <div className="lp-bg-preview upload-icon">
                          <Plus size={20} />
                        </div>
                        <span>Subir</span>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'background')} />
                      </label>
                    </div>
                  </div>

                  {/* ACCENT COLOR CARD */}
                  <div className="lp-settings-card">
                    <div className="lp-settings-card-header">
                      <div className="lp-settings-icon-box" style={{ background: profile.accent_color || '#6366f1' }}>
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <h3>Color de Acento</h3>
                        <p>Define el color principal de tu página</p>
                      </div>
                    </div>

                    <div className="lp-accent-colors">
                      {['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#10b981', '#3b82f6', '#f59e0b', '#06b6d4', '#ef4444', '#84cc16'].map(color => (
                        <button
                          key={color}
                          type="button"
                          className={`lp-accent-btn ${profile.accent_color === color ? 'active' : ''}`}
                          style={{ background: color }}
                          onClick={() => updateProfile('accent_color', color)}
                        />
                      ))}
                      <label className="lp-accent-custom">
                        <input
                          type="color"
                          value={profile.accent_color || '#6366f1'}
                          onChange={(e) => updateProfile('accent_color', e.target.value)}
                        />
                        <span>Custom</span>
                      </label>
                    </div>
                  </div>

                </div>
              )}

              {/* --- EARN TAB - PREMIUM REDESIGN --- */}
              {activeTab === 'earn' && (
                <div className="lp-earn-container">
                  <p className="lp-earn-subtitle">Elige el modo de monetización que mejor se adapte a tu audiencia</p>

                  <div className="lp-earn-cards">
                    {/* STANDARD MODE */}
                    <div
                      className={`lp-earn-card ${profile.monetization_mode === 'standard' ? 'active' : ''}`}
                      onClick={() => updateProfile('monetization_mode', 'standard')}
                    >
                      <div className="lp-earn-card-icon" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
                        <DollarSign size={24} />
                      </div>
                      <div className="lp-earn-card-content">
                        <h3>Standard</h3>
                        <p>Equilibrio perfecto entre experiencia de usuario y ganancias.</p>
                        <div className="lp-earn-rpm">
                          <span className="lp-rpm-value">$1.50</span>
                          <span className="lp-rpm-label">RPM</span>
                        </div>
                      </div>
                    </div>

                    {/* TURBO MODE - DESTACADO */}
                    <div
                      className={`lp-earn-card turbo ${profile.monetization_mode === 'turbo' ? 'active' : ''}`}
                      onClick={() => updateProfile('monetization_mode', 'turbo')}
                    >
                      <div className="lp-earn-badge">⚡ Recomendado</div>
                      <div className="lp-earn-card-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
                        <Zap size={24} />
                      </div>
                      <div className="lp-earn-card-content">
                        <h3>Turbo</h3>
                        <p>Máximas ganancias. Ideal para creadores con audiencia comprometida.</p>
                        <div className="lp-earn-rpm">
                          <span className="lp-rpm-value">$5.00+</span>
                          <span className="lp-rpm-label">RPM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lp-earn-tip">
                    <span className="lp-tip-icon">💡</span>
                    <p>Turbo Mode puede generar hasta <strong>3x más ingresos</strong> con la misma audiencia.</p>
                  </div>
                </div>
              )}

              {/* --- SETTINGS TAB - IMPROVED --- */}
              {activeTab === 'settings' && (
                <div className="lp-settings-container">

                  {/* URL & USERNAME SECTION */}
                  <div className="lp-settings-card">
                    <div className="lp-settings-card-header">
                      <div className="lp-settings-icon-box" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
                        <LinkIcon size={18} />
                      </div>
                      <div>
                        <h3>Tu URL</h3>
                        <p>La dirección única de tu BioPage</p>
                      </div>
                    </div>

                    <div className="lp-settings-fields">
                      <div className="lp-input-group">
                        <label>Username</label>
                        <div className="lp-input-with-prefix">
                          <span className="lp-input-prefix">linkpay.me/b/</span>
                          <input
                            value={profile.username}
                            onChange={(e) => {
                              const val = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
                              if (val.length <= 30) updateProfile('username', val);
                            }}
                            placeholder="tu-username"
                            maxLength={30}
                          />
                        </div>
                        <span className="lp-input-hint">Solo letras, números y guión bajo. Máx 30 caracteres.</span>
                      </div>
                    </div>
                  </div>

                  {/* SEO SECTION */}
                  <div className="lp-settings-card">
                    <div className="lp-settings-card-header">
                      <div className="lp-settings-icon-box">
                        <Globe size={18} />
                      </div>
                      <div>
                        <h3>SEO & Metadatos</h3>
                        <p>Optimiza cómo apareces en buscadores</p>
                      </div>
                    </div>

                    <div className="lp-settings-fields">
                      <div className="lp-input-group">
                        <label>Meta Título</label>
                        <input
                          value={profile.display_name}
                          onChange={(e) => updateProfile('display_name', e.target.value)}
                          placeholder="Ej. Mis Enlaces Oficiales"
                        />
                        <span className="lp-input-hint">Se mostrará como título en Google</span>
                      </div>

                      <div className="lp-input-group">
                        <label>Meta Descripción</label>
                        <textarea
                          value={profile.description}
                          onChange={(e) => updateProfile('description', e.target.value)}
                          placeholder="Descripción breve para buscadores..."
                          rows={2}
                        />
                        <span className="lp-input-hint">Máximo 160 caracteres recomendado</span>
                      </div>
                    </div>
                  </div>

                  {/* STATS SECTION */}
                  <div className="lp-settings-card">
                    <div className="lp-settings-row">
                      <div className="lp-settings-info">
                        <div className="lp-settings-icon-box blue">
                          <BarChart2 size={18} />
                        </div>
                        <div>
                          <h4>Mostrar estadísticas</h4>
                          <p>Muestra el contador de visitas en tu Bio</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`lp-switch ${profile.show_views !== false ? 'active' : ''}`}
                        onClick={() => updateProfile('show_views', !(profile.show_views !== false))}
                      >
                        <div className="lp-switch-dot"></div>
                      </button>
                    </div>
                  </div>

                  {/* QR CODE SECTION */}
                  <div className="lp-settings-card">
                    <div className="lp-settings-card-header">
                      <div className="lp-settings-icon-box" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                        <QrCode size={18} />
                      </div>
                      <div>
                        <h3>Código QR</h3>
                        <p>Comparte tu BioPage fácilmente</p>
                      </div>
                    </div>

                    <QRCodeGenerator
                      url={`https://linkpay.me/b/${profile.username}`}
                      username={profile.username}
                      accentColor={profile.accent_color}
                    />
                  </div>

                  {/* GAMIFICATION SECTION */}
                  <div className="lp-settings-card">
                    <div className="lp-settings-card-header">
                      <div className="lp-settings-icon-box" style={{ background: 'linear-gradient(135deg, #eab308 0%, #f59e0b 100%)' }}>
                        <Award size={18} />
                      </div>
                      <div>
                        <h3>Progreso y Logros</h3>
                        <p>Completa tu perfil y desbloquea badges</p>
                      </div>
                    </div>

                    {/* Profile Completion */}
                    <ProfileCompletion profile={profile} />

                    {/* XP Bar */}
                    <div style={{ marginTop: '16px' }}>
                      <XPBar level={profile.level || 1} xp={profile.xp || 0} />
                    </div>

                    {/* Achievements */}
                    <div className="lp-gamification-section">
                      <h4><Star size={16} /> Logros Desbloqueados</h4>
                      <AchievementsBadges achievements={achievements} />
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>


        {/* === PREVIEW (DESKTOP) - LIVE === */}
        <div className="lp-preview-col">
          <div className="lp-mobile-frame">
            <LivePreview profile={profile} />
            {/* Scroll Indicator */}
            <div className="lp-scroll-indicator">
              <ChevronDown size={16} />
              <span>Desliza para ver más</span>
            </div>
          </div>
        </div>

      </div>

      {/* Confirm Dialog for deletions */}
      <ConfirmDialog />
    </div>
  );
}


// === SOCIAL ICONS MAP ===
const SOCIAL_ICONS: Record<string, { icon: any; label: string; color: string }> = {
  instagram: { icon: Instagram, label: 'Instagram', color: '#E4405F' },
  twitter: { icon: Twitter, label: 'Twitter/X', color: '#1DA1F2' },
  youtube: { icon: Youtube, label: 'YouTube', color: '#FF0000' },
  twitch: { icon: Twitch, label: 'Twitch', color: '#9146FF' },
  github: { icon: Github, label: 'GitHub', color: '#333' },
  linkedin: { icon: Linkedin, label: 'LinkedIn', color: '#0A66C2' },
  facebook: { icon: Facebook, label: 'Facebook', color: '#1877F2' },
  tiktok: { icon: Music, label: 'TikTok', color: '#000' },
  shop: { icon: ShoppingBag, label: 'Tienda', color: '#16a34a' },
  email: { icon: Mail, label: 'Email', color: '#EA4335' },
  website: { icon: Globe, label: 'Web', color: '#6366f1' },
  link: { icon: LinkIcon, label: 'Enlace', color: '#64748b' },
};

// === SUBCOMPONENT: LinkCardV3 (MEMOIZED) ===
const LinkCardV3 = React.memo(function LinkCardV3({ link, onUpdate, onDelete, isExpanded, onToggleExpand, onThumbnailUpload, onToggleActive }: LinkCardV3Props) {
  const {
    attributes, listeners, setNodeRef, transform, transition, isDragging
  } = useSortable({ id: link.id });

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [showScheduling, setShowScheduling] = React.useState(Boolean(link.visible_from || link.visible_until));

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.5 : 1
  };

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onThumbnailUpload) return;
    setUploading(true);
    try {
      await onThumbnailUpload(link.id, file);
    } catch (err) {
      console.error('Thumbnail upload error:', err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const blockType = link.block_type || 'link';
  const isSpecialBlock = blockType === 'header' || blockType === 'divider';
  const isActive = link.active !== false; // undefined = true

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`lp-card ${isDragging ? 'dragging' : ''} ${isSpecialBlock ? 'lp-card-special' : ''} ${blockType === 'header' ? 'lp-card-header-block' : ''} ${blockType === 'divider' ? 'lp-card-divider-block' : ''} ${!isActive ? 'lp-card-disabled' : ''}`}
    >

      {/* HEADER: Always Visible */}
      <div className="lp-card-header" onClick={onToggleExpand}>
        <div className="lp-drag-handle" {...attributes} {...listeners} onClick={(e) => e.stopPropagation()}>
          <GripVertical size={20} />
        </div>

        {/* Social Icon (si seleccionado) */}
        {link.icon && SOCIAL_ICONS[link.icon] && (
          <div
            className="lp-link-icon"
            style={{ background: SOCIAL_ICONS[link.icon].color }}
            onClick={(e) => e.stopPropagation()}
          >
            {React.createElement(SOCIAL_ICONS[link.icon].icon, { size: 18 })}
          </div>
        )}

        {/* Thumbnail Preview (si existe y no hay icono) */}
        {link.thumbnail_url && !link.icon && (
          <div className="lp-link-thumb" onClick={(e) => e.stopPropagation()}>
            <img src={link.thumbnail_url} alt="" />
          </div>
        )}

        <div className="lp-card-inputs">
          <input
            className="lp-input-main"
            value={link.title}
            onChange={(e) => onUpdate(link.id, 'title', e.target.value)}
            placeholder={blockType === 'header' ? 'Título de sección' : blockType === 'divider' ? 'Divisor' : 'Título del enlace'}
            onClick={(e) => e.stopPropagation()}
          />
          {/* Solo mostrar URL para links normales y spotlight */}
          {!isSpecialBlock && (
            <input
              className="lp-input-sub"
              value={link.url}
              onChange={(e) => onUpdate(link.id, 'url', e.target.value)}
              placeholder="https://..."
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>

        {/* Stats Badge - Always visible for analytics */}
        {link.block_type === 'link' || !link.block_type ? (
          <div className="lp-link-stats" onClick={(e) => e.stopPropagation()}>
            <MousePointer2 size={12} />
            <span>{link.clicks || 0}</span>
          </div>
        ) : null}

        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <div
            className={`lp-switch ${isActive ? 'active' : ''}`}
            onClick={() => onToggleActive(link.id, !isActive)}
            title={isActive ? 'Desactivar enlace' : 'Activar enlace'}
          >
            <div className="lp-switch-dot"></div>
          </div>
        </div>

        {/* Chevron indicator */}
        <div className="lp-chevron-indicator">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {/* BODY: Collapsible */}
      {isExpanded && (
        <div className="lp-card-body">
          {/* Solo mostrar opciones avanzadas para links normales */}
          {!isSpecialBlock && (
            <>
              {/* Icon Selector */}
              <div className="lp-icon-selector">
                <label className="lp-icon-label">Icono</label>
                <div className="lp-icon-grid">
                  {Object.entries(SOCIAL_ICONS).map(([key, { icon: Icon, label, color }]) => (
                    <button
                      key={key}
                      type="button"
                      className={`lp-icon-opt ${link.icon === key ? 'selected' : ''}`}
                      onClick={() => onUpdate(link.id, 'icon', key)}
                      title={label}
                      style={{ '--icon-color': color } as React.CSSProperties}
                    >
                      <Icon size={18} />
                    </button>
                  ))}
                  {link.icon && (
                    <button
                      type="button"
                      className="lp-icon-opt lp-icon-clear"
                      onClick={() => onUpdate(link.id, 'icon', null)}
                      title="Sin icono"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Link Type Selector */}
              <div className="lp-link-type-selector">
                <label className="lp-icon-label">Tipo de Enlace</label>
                <div className="lp-link-type-grid">
                  <button
                    type="button"
                    className={`lp-link-type-opt ${(!link.link_type || link.link_type === 'normal') ? 'selected' : ''}`}
                    onClick={() => onUpdate(link.id, 'link_type', 'normal')}
                  >
                    <LinkIcon size={14} />
                    Normal
                  </button>
                  <button
                    type="button"
                    className={`lp-link-type-opt monetized ${link.link_type === 'monetized' ? 'selected' : ''}`}
                    onClick={() => onUpdate(link.id, 'link_type', 'monetized')}
                  >
                    <DollarSign size={14} />
                    Monetizado
                  </button>
                  <button
                    type="button"
                    className={`lp-link-type-opt paywall ${link.link_type === 'paywall' ? 'selected' : ''}`}
                    onClick={() => onUpdate(link.id, 'link_type', 'paywall')}
                  >
                    <Zap size={14} />
                    Paywall
                  </button>
                </div>
              </div>

              <div className="lp-card-actions">
                <div className="lp-action-row">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button
                    className="lp-action-btn"
                    onClick={handleThumbnailClick}
                    disabled={uploading}
                  >
                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
                    {uploading ? 'Subiendo...' : link.thumbnail_url ? 'Cambiar' : 'Miniatura'}
                  </button>
                </div>

                {/* SCHEDULING UI - COLLAPSIBLE */}
                <div className={`lp-scheduling-section ${showScheduling ? 'expanded' : ''}`}>
                  <div
                    className="lp-scheduling-header"
                    onClick={() => setShowScheduling(!showScheduling)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Clock size={14} />
                    <span>Programar visibilidad</span>
                    {(link.visible_from || link.visible_until) && (
                      <span className="lp-schedule-badge">Activo</span>
                    )}
                    <ChevronDown
                      size={14}
                      style={{
                        marginLeft: 'auto',
                        transform: showScheduling ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.2s'
                      }}
                    />
                  </div>
                  {showScheduling && (
                    <>
                      <div className="lp-scheduling-inputs">
                        <div className="lp-schedule-field">
                          <label>Desde:</label>
                          <input
                            type="datetime-local"
                            value={link.visible_from ? link.visible_from.slice(0, 16) : ''}
                            onChange={(e) => onUpdate(link.id, 'visible_from', e.target.value ? new Date(e.target.value).toISOString() : null)}
                          />
                        </div>
                        <div className="lp-schedule-field">
                          <label>Hasta:</label>
                          <input
                            type="datetime-local"
                            value={link.visible_until ? link.visible_until.slice(0, 16) : ''}
                            onChange={(e) => onUpdate(link.id, 'visible_until', e.target.value ? new Date(e.target.value).toISOString() : null)}
                          />
                        </div>
                      </div>
                      {(link.visible_from || link.visible_until) && (
                        <button
                          className="lp-schedule-clear"
                          onClick={() => {
                            onUpdate(link.id, 'visible_from', null);
                            onUpdate(link.id, 'visible_until', null);
                          }}
                        >
                          Quitar programación
                        </button>
                      )}
                    </>
                  )}
                </div>

                <button className="lp-action-btn danger" onClick={() => onDelete(link.id)}>
                  <Trash2 size={16} /> Eliminar
                </button>
              </div>
            </>
          )}

          {/* Para bloques especiales, solo mostrar eliminar */}
          {isSpecialBlock && (
            <div className="lp-special-block-actions">
              <div className="lp-special-block-info">
                {blockType === 'header' && <><Type size={16} /> Este es un encabezado de sección</>}
                {blockType === 'divider' && <><Minus size={16} /> Este es un divisor visual</>}
              </div>
              <button className="lp-action-btn danger" onClick={() => onDelete(link.id)}>
                <Trash2 size={16} /> Eliminar
              </button>
            </div>
          )}
        </div>
      )}
    </div >
  );
});


// === LIVE PREVIEW COMPONENT (MEMOIZED) ===
const LivePreview = React.memo(function LivePreview({ profile }: LivePreviewProps) {
  const getBackground = () => {
    if (profile.background_url) return { backgroundImage: `url(${profile.background_url})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    const themes: Record<string, string> = {
      light: '#f8fafc',
      dark: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      blue: 'linear-gradient(180deg, #1e40af 0%, #3b82f6 100%)',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)'
    };
    return { background: themes[profile.theme] || themes.dark };
  };

  const getButtonStyle = () => {
    const base = { display: 'flex', alignItems: 'center', width: '100%', padding: '14px 18px', marginBottom: '12px', textDecoration: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer', position: 'relative' as const, overflow: 'hidden', border: 'none' };
    let shape = { borderRadius: '10px' };
    if (profile.button_style === 'square') shape = { borderRadius: '0px' };
    if (profile.button_style === 'pill') shape = { borderRadius: '100px' };

    let color: any = {};
    if (profile.button_style === 'outline') {
      const borderColor = profile.accent_color || 'white';
      color = { background: 'transparent', color: borderColor, border: `2px solid ${borderColor}` };
    } else if (profile.button_style === 'glass') {
      color = { background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' };
    } else if (profile.button_style === 'shadow') {
      color = { background: profile.accent_color || 'white', color: profile.accent_color ? 'white' : 'black', border: '2px solid black', boxShadow: '4px 4px 0px black' };
    } else if (profile.accent_color) {
      color = { background: profile.accent_color, color: 'white', boxShadow: `0 4px 14px ${profile.accent_color}40` };
    } else {
      const isLight = profile.theme === 'light';
      color = isLight ? { background: 'white', color: '#1F2937', border: '1px solid #E5E7EB' } : { background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' };
    }
    return { ...base, ...shape, ...color };
  };

  const isLight = profile.theme === 'light';

  return (
    <div className="lp-live-preview" style={{ ...getBackground(), color: isLight ? '#1f2937' : 'white' }}>
      <div className="lp-preview-content">
        {/* Avatar */}
        <div className="lp-preview-avatar">
          {profile.avatar_url ? <img src={profile.avatar_url} alt="" /> : <span>{profile.username?.[0]?.toUpperCase()}</span>}
        </div>

        {/* Name & Bio */}
        <h2 className="lp-preview-name">@{profile.display_name || profile.username}</h2>
        <p className="lp-preview-bio">{profile.description || 'Tu bio aquí...'}</p>

        {/* Links */}
        <div className="lp-preview-links">
          {profile.links?.filter((l: any) => l.active !== false).map((link: any, i: number) => {
            const blockType = link.block_type || 'link';
            const socialIcon = link.icon && SOCIAL_ICONS[link.icon];

            if (blockType === 'header') {
              return <div key={link.id} className="lp-preview-header">{link.title}</div>;
            }
            if (blockType === 'divider') {
              return <div key={link.id} className="lp-preview-divider" style={{ background: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)' }} />;
            }
            if (blockType === 'spotlight') {
              return (
                <div key={link.id} className="lp-preview-spotlight" style={{ background: `linear-gradient(135deg, ${profile.accent_color || '#f59e0b'} 0%, ${profile.accent_color || '#fbbf24'} 100%)` }}>
                  ⭐ {link.title}
                </div>
              );
            }

            return (
              <div key={link.id} style={getButtonStyle()}>
                {socialIcon && (
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: socialIcon.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', color: 'white' }}>
                    {React.createElement(socialIcon.icon, { size: 16 })}
                  </div>
                )}
                {link.thumbnail_url && !link.icon && (
                  <img src={link.thumbnail_url} style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover', marginRight: '10px' }} alt="" />
                )}
                <span style={{ flex: 1, textAlign: 'center' }}>{link.title || 'Sin título'}</span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="lp-preview-footer">
          <Zap size={10} /> LinkPay
        </div>
      </div>
    </div>
  );
});
