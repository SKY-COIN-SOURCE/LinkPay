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
  Link as LinkIcon
} from 'lucide-react';
import { BioService, BioProfile } from '../../lib/bioService';
import { supabase } from '../../lib/supabase';
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

export function BioEditorPage() {
  const [profile, setProfile] = useState<BioProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'links' | 'appearance' | 'earn' | 'settings'>('links');
  const [saving, setSaving] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Expanded card state
  const [expandedLinkId, setExpandedLinkId] = useState<string | null>(null);

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
      title: '',
      url: '',
      active: true,
      clicks: 0,
      block_type: 'link' as const,
      order_index: (profile.links?.length || 0) + 1
    };
    setProfile({ ...profile, links: [...profile.links, newLink] });
    setExpandedLinkId(tempId); // Auto expand new link
    await BioService.addLink(profile.id, 'Nuevo enlace', '');
    loadProfile();
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
    setProfile({ ...profile, links: [...profile.links, newBlock] });
    if (blockType !== 'divider') setExpandedLinkId(tempId);
    await BioService.addLink(profile.id, titles[blockType], blockType === 'divider' ? '' : '#');
    loadProfile();
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
    if (!confirm('¿Eliminar este enlace permanentemente?')) return;
    setProfile({ ...profile, links: profile.links.filter((l: any) => l.id !== id) });
    await BioService.deleteLink(id);
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
      alert('Error local: ' + err);
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
      alert('Error al subir miniatura');
    }
  };

  if (loading) return <div className="h-screen w-full bg-slate-950 flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>;
  if (!profile) return null;

  return (
    <div className="lp-bio-shell-v3">
      {/* MOBILE PREVIEW FAB */}
      <button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl md:hidden text-black"
        onClick={() => setShowMobilePreview(true)}
      >
        <Eye size={24} />
      </button>

      {/* MOBILE PREVIEW MODAL */}
      {showMobilePreview && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center backdrop-blur-sm p-4">
          <button className="absolute top-4 right-4 text-white bg-white/10 px-4 py-2 rounded-full" onClick={() => setShowMobilePreview(false)}>Cerrar</button>
          <div className="w-full h-full max-w-[360px] max-h-[700px] border-[8px] border-slate-800 rounded-[40px] overflow-hidden bg-white">
            <iframe src={`/b/${profile.username}`} className="w-full h-full border-none" />
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
            <div className="lp-nav-actions">
              <button className="lp-btn-basic lp-btn-primary" onClick={() => window.open(`/b/${profile.username}`, '_blank')}>
                <Share2 size={14} /> Compartir
              </button>
            </div>
          </div>

          <div className="lp-tabs-container">
            <div className="lp-tabs-list">
              <div className={`lp-tab ${activeTab === 'links' ? 'active' : ''}`} onClick={() => setActiveTab('links')}>Enlaces</div>
              <div className={`lp-tab ${activeTab === 'appearance' ? 'active' : ''}`} onClick={() => setActiveTab('appearance')}>Apariencia</div>
              <div className={`lp-tab ${activeTab === 'earn' ? 'active' : ''}`} onClick={() => setActiveTab('earn')}>Earn</div>
              <div className={`lp-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Ajustes</div>
            </div>
          </div>

          <div className="lp-scroll-area">
            <div className="lp-content-max">

              {/* --- LINKS TAB --- */}
              {activeTab === 'links' && (
                <>
                  <div className="lp-add-buttons-row">
                    <button className="lp-btn-add" onClick={addLink}>
                      <Plus size={18} /> Enlace
                    </button>
                    <button className="lp-btn-add lp-btn-header" onClick={() => addSpecialBlock('header')}>
                      <Type size={18} /> Header
                    </button>
                    <button className="lp-btn-add lp-btn-divider" onClick={() => addSpecialBlock('divider')}>
                      <Minus size={18} /> Divisor
                    </button>
                    <button className="lp-btn-add lp-btn-spotlight" onClick={() => addSpecialBlock('spotlight')}>
                      <Star size={18} /> Spotlight
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
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>

                  {profile.links.length === 0 && (
                    <div className="text-center py-10 opacity-40">
                      <p>No tienes enlaces. Añade uno para empezar.</p>
                    </div>
                  )}
                </>
              )}

              {/* --- APPEARANCE TAB --- */}
              {activeTab === 'appearance' && (
                <>
                  <div className="lp-section-title">Perfil</div>
                  <div className="lp-profile-edit">
                    <label className="lp-avatar-upload">
                      {profile.avatar_url ? (
                        <img src={profile.avatar_url} />
                      ) : (
                        <div className="lp-avatar-placeholder">{profile.username[0]}</div>
                      )}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'avatar')} />
                    </label>

                    <div className="lp-form-group">
                      <input
                        className="lp-input-field"
                        value={profile.display_name}
                        onChange={(e) => updateProfile('display_name', e.target.value)}
                        placeholder="Título del Perfil"
                      />
                    </div>
                    <div className="lp-form-group">
                      <textarea
                        className="lp-textarea-field"
                        value={profile.description}
                        onChange={(e) => updateProfile('description', e.target.value)}
                        placeholder="Biografía corta..."
                      />
                    </div>
                  </div>

                  <div className="lp-section-title">Temas</div>
                  <div className="lp-theme-grid">
                    <div
                      className={`lp-theme-opt ${profile.theme === 'light' ? 'selected' : ''}`}
                      style={{ background: '#f8fafc' }}
                      onClick={() => updateProfile('theme', 'light')}
                    >
                      <span style={{ color: '#334155', fontSize: '10px', fontWeight: 700 }}>Claro</span>
                    </div>
                    <div
                      className={`lp-theme-opt ${profile.theme === 'dark' ? 'selected' : ''}`}
                      style={{ background: '#0f172a' }}
                      onClick={() => updateProfile('theme', 'dark')}
                    >
                      <span style={{ color: '#94a3b8', fontSize: '10px', fontWeight: 700 }}>Oscuro</span>
                    </div>
                    <div
                      className={`lp-theme-opt ${profile.theme === 'blue' ? 'selected' : ''}`}
                      style={{ background: '#2563eb' }}
                      onClick={() => updateProfile('theme', 'blue')}
                    >
                      <span style={{ color: 'white', fontSize: '10px', fontWeight: 700 }}>Azul</span>
                    </div>
                    <div
                      className={`lp-theme-opt ${profile.theme === 'gradient' ? 'selected' : ''}`}
                      style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}
                      onClick={() => updateProfile('theme', 'gradient')}
                    >
                      <span style={{ color: 'white', fontSize: '10px', fontWeight: 700 }}>Gradiente</span>
                    </div>
                  </div>

                  <div className="lp-section-title">Estilo de Botones</div>
                  <div className="lp-theme-grid">
                    <div
                      className={`lp-theme-opt ${profile.button_style === 'rounded' ? 'selected' : ''}`}
                      style={{ background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => updateProfile('button_style', 'rounded')}
                    >
                      <div style={{ width: '80%', height: '24px', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
                    </div>
                    <div
                      className={`lp-theme-opt ${profile.button_style === 'pill' ? 'selected' : ''}`}
                      style={{ background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => updateProfile('button_style', 'pill')}
                    >
                      <div style={{ width: '80%', height: '24px', background: 'rgba(255,255,255,0.15)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)' }} />
                    </div>
                    <div
                      className={`lp-theme-opt ${profile.button_style === 'square' ? 'selected' : ''}`}
                      style={{ background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => updateProfile('button_style', 'square')}
                    >
                      <div style={{ width: '80%', height: '24px', background: 'rgba(255,255,255,0.15)', borderRadius: '0px', border: '1px solid rgba(255,255,255,0.2)' }} />
                    </div>
                    <div
                      className={`lp-theme-opt ${profile.button_style === 'shadow' ? 'selected' : ''}`}
                      style={{ background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => updateProfile('button_style', 'shadow')}
                    >
                      <div style={{ width: '80%', height: '24px', background: 'white', borderRadius: '8px', border: '2px solid black', boxShadow: '3px 3px 0 black' }} />
                    </div>
                    {/* Outline - Solo borde, fondo transparente */}
                    <div
                      className={`lp-theme-opt ${profile.button_style === 'outline' ? 'selected' : ''}`}
                      style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => updateProfile('button_style', 'outline')}
                    >
                      <div style={{ width: '80%', height: '24px', background: 'transparent', borderRadius: '8px', border: '2px solid white' }} />
                    </div>
                    {/* Glass - Semitransparente grisáceo */}
                    <div
                      className={`lp-theme-opt ${profile.button_style === 'glass' ? 'selected' : ''}`}
                      style={{ background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => updateProfile('button_style', 'glass')}
                    >
                      <div style={{ width: '80%', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(4px)' }} />
                    </div>
                  </div>

                  <div className="lp-section-title">Fondo Personalizado</div>
                  <div className="lp-theme-grid">
                    {/* Sin fondo */}
                    <div
                      className={`lp-theme-opt ${!profile.background_url ? 'selected' : ''}`}
                      style={{ background: '#0f172a', color: '#64748b', fontSize: '10px', fontWeight: 700 }}
                      onClick={() => updateProfile('background_url', '')}
                    >
                      Sin fondo
                    </div>
                    {/* Fondo actual si existe */}
                    {profile.background_url && (
                      <div
                        className="lp-theme-opt selected"
                        style={{
                          backgroundImage: `url(${profile.background_url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        title="Fondo actual"
                      />
                    )}
                    {/* Subir nuevo */}
                    <label className="lp-theme-opt lp-upload-label">
                      <span>+ Subir</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageUpload(e, 'background')}
                      />
                    </label>
                  </div>

                  <div className="lp-section-title">Color de Acento</div>
                  <div className="lp-accent-picker">
                    <input
                      type="color"
                      value={profile.accent_color || '#6366f1'}
                      onChange={(e) => updateProfile('accent_color', e.target.value)}
                      className="lp-color-input"
                    />
                    <div className="lp-accent-presets">
                      {['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#10b981', '#3b82f6', '#f59e0b', '#06b6d4'].map(color => (
                        <button
                          key={color}
                          type="button"
                          className={`lp-accent-preset ${profile.accent_color === color ? 'selected' : ''}`}
                          style={{ background: color }}
                          onClick={() => updateProfile('accent_color', color)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* --- EARN TAB --- */}
              {activeTab === 'earn' && (
                <div className="lp-earn-row">
                  <div className={`lp-earn-item ${profile.monetization_mode === 'lite' ? 'active' : ''}`} onClick={() => updateProfile('monetization_mode', 'lite')}>
                    <TrendingUp size={32} className="text-emerald-400" />
                    <div>
                      <h3 className="font-bold text-white">Lite Mode</h3>
                      <p className="text-sm text-slate-400">Anuncios discretos. RPM $0.30</p>
                    </div>
                  </div>
                  <div className={`lp-earn-item ${profile.monetization_mode === 'standard' ? 'active' : ''}`} onClick={() => updateProfile('monetization_mode', 'standard')}>
                    <DollarSign size={32} className="text-blue-400" />
                    <div>
                      <h3 className="font-bold text-white">Standard Mode</h3>
                      <p className="text-sm text-slate-400">Balanceado. RPM $1.50</p>
                    </div>
                  </div>
                  <div className={`lp-earn-item ${profile.monetization_mode === 'turbo' ? 'active' : ''}`} onClick={() => updateProfile('monetization_mode', 'turbo')}>
                    <Zap size={32} className="text-amber-400" />
                    <div>
                      <h3 className="font-bold text-white">Turbo Mode</h3>
                      <p className="text-sm text-slate-400">Max Ingresos. RPM $5.00+</p>
                    </div>
                  </div>
                </div>
              )}

              {/* --- SETTINGS TAB (SEO) --- */}
              {activeTab === 'settings' && (
                <>
                  <div className="lp-section-title">SEO & Metadatos</div>
                  <div className="lp-profile-edit">
                    <div className="w-full text-left">
                      <label className="text-xs font-bold text-slate-400 mb-1 block">Meta Page Title</label>
                      <input
                        className="lp-input-field text-left"
                        value={profile.display_name}
                        onChange={(e) => updateProfile('display_name', e.target.value)}
                        placeholder="Ej. Mis Enlaces Oficiales"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">Se usará como título en Google.</p>
                    </div>

                    <div className="w-full text-left">
                      <label className="text-xs font-bold text-slate-400 mb-1 block">Meta Description</label>
                      <textarea
                        className="lp-textarea-field text-left"
                        value={profile.description}
                        onChange={(e) => updateProfile('description', e.target.value)}
                        placeholder="Descripción para buscadores..."
                      />
                    </div>
                  </div>

                  <div className="lp-section-title">Estadísticas</div>
                  <div className="p-4 rounded-xl border border-slate-700 bg-slate-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BarChart2 size={20} className="text-blue-500" />
                      <span className="text-sm">Mostrar conteo de vistas</span>
                    </div>
                    <div className="lp-switch active">
                      <div className="lp-switch-dot"></div>
                    </div>
                  </div>
                </>
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

// === SUBCOMPONENT: LinkCardV3 ===
function LinkCardV3({ link, onUpdate, onDelete, isExpanded, onToggleExpand, onThumbnailUpload }: any) {
  const {
    attributes, listeners, setNodeRef, transform, transition, isDragging
  } = useSortable({ id: link.id });

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);

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

  const blockClass = link.block_type && link.block_type !== 'link' ? `block-${link.block_type}` : '';

  return (
    <div ref={setNodeRef} style={style} className={`lp-card ${isDragging ? 'dragging' : ''} ${blockClass}`}>

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
            placeholder="Título del enlace"
            onClick={(e) => e.stopPropagation()}
          />
          <input
            className="lp-input-sub"
            value={link.url}
            onChange={(e) => onUpdate(link.id, 'url', e.target.value)}
            placeholder="URL"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Stats Badge */}
        {typeof link.clicks === 'number' && link.clicks > 0 && (
          <div className="lp-link-stats" onClick={(e) => e.stopPropagation()}>
            <BarChart2 size={12} />
            <span>{link.clicks}</span>
          </div>
        )}

        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <div className={`lp-switch ${link.active ? 'active' : ''}`} onClick={() => onUpdate(link.id, 'active', !link.active)}>
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
              <button className="lp-action-btn" onClick={() => alert('Función Pro: Programación de enlaces')}>
                <Calendar size={16} /> Programar
              </button>
            </div>
            <button className="lp-action-btn danger" onClick={() => onDelete(link.id)}>
              <Trash2 size={16} /> Eliminar
            </button>
          </div>
        </div>
      )}
    </div >
  );
}


// === LIVE PREVIEW COMPONENT ===
function LivePreview({ profile }: { profile: any }) {
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
                {link.link_type === 'monetized' && <span className="lp-badge green">💰</span>}
                {link.link_type === 'paywall' && <span className="lp-badge orange">⚡</span>}
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
}
