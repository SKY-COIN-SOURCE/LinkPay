import React, { useState, useEffect } from 'react';
import {
  Layout,
  Palette,
  Settings,
  ExternalLink,
  Plus,
  Trash2,
  GripVertical,
  Shield,
  Zap,
  Rocket,
  Loader2,
} from 'lucide-react';
import { BioService } from '../../lib/bioService';
import { supabase } from '../../lib/supabase';

// Drag & Drop
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function BioEditorPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'links' | 'appearance' | 'settings'>('links');
  const [saving, setSaving] = useState(false);

  // Sensores de drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  useEffect(() => {
    const load = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const data = await BioService.getOrCreateProfile(user);
          setProfile(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // --- LOGICA DE GUARDADO (DEBOUNCE LIGERO) ---
  const handleUpdateProfile = async (field: string, value: any) => {
    if (!profile) return;
    // Actualización optimista
    const updated = { ...profile, [field]: value };
    setProfile(updated);

    setSaving(true);
    await BioService.updateProfile(profile.id, { [field]: value });
    setTimeout(() => setSaving(false), 400);
  };

  const handleAddLink = async () => {
    if (!profile) return;
    // UI rápida
    const tempLink = {
      id: 'temp-' + Date.now(),
      title: 'Nuevo enlace',
      url: '',
      active: true,
      order_index: (profile.links?.length || 0) + 1,
    };
    setProfile({
      ...profile,
      links: [...(profile.links || []), tempLink],
    });

    // Guardar en DB
    await BioService.addLink(profile.id, 'Nuevo enlace', '');

    // Recargar para sincronizar IDs reales y orden
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const data = await BioService.getOrCreateProfile(user);
      setProfile(data);
    }
  };

  const handleUpdateLink = async (id: string, field: string, value: any) => {
    if (!profile) return;
    const updatedLinks = profile.links.map((l: any) =>
      l.id === id ? { ...l, [field]: value } : l
    );
    setProfile({ ...profile, links: updatedLinks });
    await BioService.updateLink(id, { [field]: value });
  };

  const handleDeleteLink = async (id: string) => {
    if (!profile) return;
    if (!confirm('¿Borrar enlace?')) return;
    setProfile({
      ...profile,
      links: profile.links.filter((l: any) => l.id !== id),
    });
    await BioService.deleteLink(id);
  };

  // Drag & drop: cuando termina un drag, reordenamos
  const handleDragEnd = async (event: any) => {
    if (!profile) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = profile.links.findIndex((l: any) => l.id === active.id);
    const newIndex = profile.links.findIndex((l: any) => l.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newLinks = arrayMove(profile.links, oldIndex, newIndex).map(
      (l: any, idx: number) => ({
        ...l,
        order_index: idx,
      })
    );

    setProfile({ ...profile, links: newLinks });
    // Persistimos en Supabase
    await BioService.reorderLinks(newLinks);
  };

  // Subida de imágenes (avatar / background)
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'avatar' | 'background'
  ) => {
    if (!profile) return;
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSaving(true);
      const url = await BioService.uploadImage(file, profile.user_id, type);
      if (type === 'avatar') {
        await handleUpdateProfile('avatar_url', url);
      } else {
        await handleUpdateProfile('background_url', url);
        // Forzamos tema custom si sube fondo
        await handleUpdateProfile('theme', 'custom');
      }
    } catch (err) {
      console.error('Error subiendo imagen', err);
      alert('Error subiendo la imagen. Inténtalo de nuevo.');
    } finally {
      setSaving(false);
      // Reset input
      e.target.value = '';
    }
  };

  if (loading)
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader2 className="spin" />
      </div>
    );

  if (!profile) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>No se ha podido cargar tu perfil.</p>
      </div>
    );
  }

  // ESTILOS CSS-IN-JS
  const styles = {
    container: {
      display: 'flex',
      height: 'calc(100vh - 80px)',
      background: '#F3F4F6',
      gap: '20px',
      padding: '20px',
    },
    editorColumn: {
      flex: 1,
      background: 'white',
      borderRadius: '20px',
      border: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'hidden',
    },
    previewColumn: {
      width: '450px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#F3F4F6',
    },
    header: {
      padding: '20px',
      borderBottom: '1px solid #F3F4F6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tabs: {
      display: 'flex',
      borderBottom: '1px solid #E5E7EB',
      padding: '0 20px',
    },
    tab: (isActive: boolean) => ({
      padding: '16px 20px',
      cursor: 'pointer',
      fontWeight: 700,
      fontSize: '14px',
      color: isActive ? '#4F46E5' : '#6B7280',
      borderBottom: isActive
        ? '2px solid #4F46E5'
        : '2px solid transparent',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }),
    content: {
      flex: 1,
      padding: '24px',
      overflowY: 'auto' as const,
      background: '#F9FAFB',
    },
    phone: {
      width: '320px',
      height: '650px',
      background: '#111827',
      borderRadius: '45px',
      border: '10px solid #111827',
      position: 'relative' as const,
      overflow: 'hidden',
      boxShadow:
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    phoneScreen: (theme: string, backgroundUrl?: string) => {
      const base: React.CSSProperties = {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        padding: '60px 20px',
        color: theme === 'light' ? '#1F2937' : 'white',
      };

      if (theme === 'custom' && backgroundUrl) {
        return {
          ...base,
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#020617',
        };
      }

      const byTheme: Record<string, React.CSSProperties> = {
        dark: { background: '#111827' },
        blue: { background: '#2563EB' },
        gradient: {
          background:
            'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
        },
        light: { background: '#FFFFFF' },
      };

      return { ...base, ...(byTheme[theme] || byTheme.light) };
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
      fontSize: '14px',
      outline: 'none',
      fontWeight: 600,
      marginBottom: '12px',
    },
    card: {
      background: 'white',
      padding: '16px',
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
      marginBottom: '12px',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    },
    addButton: {
      width: '100%',
      padding: '14px',
      background: '#4F46E5',
      color: 'white',
      borderRadius: '12px',
      fontWeight: 700,
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '24px',
      boxShadow:
        '0 4px 6px -1px rgba(79, 70, 229, 0.2)',
    },
    themeButton: (isActive: boolean, bg: string) => ({
      flex: 1,
      height: '80px',
      borderRadius: '12px',
      border: isActive
        ? '2px solid #4F46E5'
        : '1px solid #E5E7EB',
      cursor: 'pointer',
      background: bg,
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    }),
    monetizationCard: (isActive: boolean) => ({
      padding: '20px',
      borderRadius: '16px',
      border: isActive
        ? '2px solid #4F46E5'
        : '1px solid #E5E7EB',
      background: isActive ? '#EEF2FF' : 'white',
      cursor: 'pointer',
      marginBottom: '12px',
      transition: 'all 0.2s',
    }),
  };

  return (
    <div style={styles.container}>
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>

      {/* EDITOR */}
      <div style={styles.editorColumn}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2
              style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: 800,
                color: '#111827',
              }}
            >
              linkpay.bio
            </h2>
            {saving && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  color: '#10B981',
                  fontWeight: 700,
                }}
              >
                <Loader2 size={12} className="spin" />
                Guardando...
              </div>
            )}
          </div>
          <a
            href={`/b/${profile.username}`}
            target="_blank"
            rel="noreferrer"
            style={{
              color: '#4F46E5',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: '#EEF2FF',
              padding: '6px 12px',
              borderRadius: '100px',
            }}
          >
            {profile.username}
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <div
            onClick={() => setActiveTab('links')}
            style={styles.tab(activeTab === 'links')}
          >
            <Layout size={16} /> Enlaces
          </div>
          <div
            onClick={() => setActiveTab('appearance')}
            style={styles.tab(activeTab === 'appearance')}
          >
            <Palette size={16} /> Apariencia
          </div>
          <div
            onClick={() => setActiveTab('settings')}
            style={styles.tab(activeTab === 'settings')}
          >
            <Settings size={16} /> Ajustes
          </div>
        </div>

        {/* Contenido */}
        <div style={styles.content}>
          {/* PESTAÑA ENLACES */}
          {activeTab === 'links' && (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <button
                onClick={handleAddLink}
                style={styles.addButton}
              >
                <Plus size={18} /> Añadir nuevo enlace
              </button>

              {profile.links?.length > 0 ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={profile.links.map((l: any) => l.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {profile.links.map((link: any) => (
                      <SortableLinkRow
                        key={link.id}
                        link={link}
                        styles={styles}
                        onUpdate={handleUpdateLink}
                        onDelete={handleDeleteLink}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              ) : (
                <p
                  style={{
                    textAlign: 'center',
                    color: '#9CA3AF',
                    marginTop: '40px',
                  }}
                >
                  Tu bio está vacía. ¡Añade algo!
                </p>
              )}
            </div>
          )}

          {/* PESTAÑA APARIENCIA */}
          {activeTab === 'appearance' && (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              {/* Perfil */}
              <div style={{ marginBottom: '32px' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 700,
                    color: '#374151',
                  }}
                >
                  Perfil
                </label>
                <div
                  style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '16px',
                    border: '1px solid #E5E7EB',
                    textAlign: 'center',
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      margin: '0 auto 16px',
                      overflow: 'hidden',
                      border: '2px dashed #D1D5DB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#F3F4F6',
                    }}
                  >
                    {profile.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="Avatar"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: '24px',
                          fontWeight: 700,
                          color: '#9CA3AF',
                        }}
                      >
                        {profile.display_name?.[0]}
                      </span>
                    )}
                  </div>
                  <label
                    style={{
                      display: 'inline-block',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#4F46E5',
                      cursor: 'pointer',
                      marginBottom: '12px',
                    }}
                  >
                    Subir avatar
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) =>
                        handleImageUpload(e, 'avatar')
                      }
                    />
                  </label>

                  <input
                    value={profile.display_name}
                    onChange={(e) =>
                      handleUpdateProfile(
                        'display_name',
                        e.target.value
                      )
                    }
                    style={{
                      ...styles.input,
                      textAlign: 'center',
                    }}
                    placeholder="Nombre visible"
                  />
                  <textarea
                    value={profile.description}
                    onChange={(e) =>
                      handleUpdateProfile(
                        'description',
                        e.target.value
                      )
                    }
                    style={{
                      ...styles.input,
                      minHeight: '80px',
                      textAlign: 'center',
                      resize: 'none',
                    }}
                    placeholder="Biografía..."
                  />

                  {/* Fondo personalizado */}
                  <div
                    style={{
                      marginTop: '16px',
                      paddingTop: '12px',
                      borderTop: '1px solid #E5E7EB',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: '8px',
                      }}
                    >
                      Fondo personalizado
                    </p>
                    <label
                      style={{
                        display: 'inline-block',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#4B5563',
                        cursor: 'pointer',
                      }}
                    >
                      Subir imagen de fondo
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) =>
                          handleImageUpload(
                            e,
                            'background'
                          )
                        }
                      />
                    </label>
                    {profile.background_url && (
                      <div
                        style={{
                          marginTop: '8px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border:
                            '1px solid #E5E7EB',
                        }}
                      >
                        <img
                          src={profile.background_url}
                          alt="Fondo"
                          style={{
                            width: '100%',
                            height: '80px',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Temas */}
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '12px',
                    fontWeight: 700,
                    color: '#374151',
                  }}
                >
                  Temas
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                  }}
                >
                  <div
                    onClick={() =>
                      handleUpdateProfile('theme', 'light')
                    }
                    style={styles.themeButton(
                      profile.theme === 'light',
                      '#FFFFFF'
                    )}
                  />
                  <div
                    onClick={() =>
                      handleUpdateProfile('theme', 'dark')
                    }
                    style={styles.themeButton(
                      profile.theme === 'dark',
                      '#111827'
                    )}
                  />
                  <div
                    onClick={() =>
                      handleUpdateProfile('theme', 'blue')
                    }
                    style={styles.themeButton(
                      profile.theme === 'blue',
                      '#2563EB'
                    )}
                  />
                  <div
                    onClick={() =>
                      handleUpdateProfile(
                        'theme',
                        'gradient'
                      )
                    }
                    style={styles.themeButton(
                      profile.theme === 'gradient',
                      'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)'
                    )}
                  />
                  {/* Tema custom (fondo por imagen) */}
                  <div
                    onClick={() =>
                      handleUpdateProfile('theme', 'custom')
                    }
                    style={styles.themeButton(
                      profile.theme === 'custom',
                      '#020617'
                    )}
                  >
                    {/* Pequeño texto opcional */}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PESTAÑA AJUSTES (MONETIZACIÓN BIO) */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div
                style={{
                  background:
                    'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
                  padding: '24px',
                  borderRadius: '16px',
                  color: 'white',
                  marginBottom: '24px',
                  boxShadow:
                    '0 10px 15px -3px rgba(79, 70, 229, 0.2)',
                }}
              >
                <h3
                  style={{
                    margin: '0 0 8px',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Rocket size={20} />
                  Monetización de linkpay.bio
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    opacity: 0.9,
                    margin: 0,
                  }}
                >
                  Elige cómo quieres que moneticemos los
                  clics que vengan desde tu página de bio.
                </p>
              </div>

              <div
                onClick={() =>
                  handleUpdateProfile('monetization_mode', 'lite')
                }
                style={styles.monetizationCard(
                  profile.monetization_mode === 'lite'
                )}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                  }}
                >
                  <Shield color="#10B981" />
                  <div>
                    <strong
                      style={{
                        display: 'block',
                        color: '#064E3B',
                      }}
                    >
                      Lite
                    </strong>
                    <span
                      style={{
                        fontSize: '13px',
                        color: '#6B7280',
                      }}
                    >
                      Publicidad mínima. Experiencia casi
                      limpia.
                    </span>
                  </div>
                </div>
              </div>

              <div
                onClick={() =>
                  handleUpdateProfile(
                    'monetization_mode',
                    'standard'
                  )
                }
                style={styles.monetizationCard(
                  profile.monetization_mode === 'standard'
                )}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                  }}
                >
                  <Zap color="#2563EB" />
                  <div>
                    <strong
                      style={{
                        display: 'block',
                        color: '#1E3A8A',
                      }}
                    >
                      Estándar
                    </strong>
                    <span
                      style={{
                        fontSize: '13px',
                        color: '#6B7280',
                      }}
                    >
                      Equilibrio entre ingresos y
                      experiencia.
                    </span>
                  </div>
                </div>
              </div>

              <div
                onClick={() =>
                  handleUpdateProfile('monetization_mode', 'turbo')
                }
                style={styles.monetizationCard(
                  profile.monetization_mode === 'turbo'
                )}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                  }}
                >
                  <Rocket color="#F59E0B" />
                  <div>
                    <strong
                      style={{
                        display: 'block',
                        color: '#78350F',
                      }}
                    >
                      Turbo
                    </strong>
                    <span
                      style={{
                        fontSize: '13px',
                        color: '#6B7280',
                      }}
                    >
                      Máxima monetización con formatos
                      agresivos.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PREVIEW MÓVIL */}
      <div style={styles.previewColumn} className="hidden lg:flex">
        <div style={styles.phone}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '24px',
              background: '#111827',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
              zIndex: 10,
            }}
          ></div>

          <div
            style={styles.phoneScreen(
              profile.theme,
              profile.background_url
            )}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  margin: '0 auto 16px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'rgba(255,255,255,0.15)',
                }}
              >
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: '32px',
                      fontWeight: 700,
                      color:
                        profile.theme === 'light'
                          ? '#CBD5E1'
                          : 'white',
                    }}
                  >
                    {profile.display_name?.[0]}
                  </span>
                )}
              </div>
              <h3
                style={{
                  margin: '0 0 8px',
                  fontSize: '20px',
                  fontWeight: 800,
                }}
              >
                @{profile.display_name}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  opacity: 0.85,
                  lineHeight: 1.4,
                  marginBottom: '32px',
                }}
              >
                {profile.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {profile.links?.map((link: any) => (
                  <div
                    key={link.id}
                    style={{
                      display: 'block',
                      padding: '14px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '14px',
                      background:
                        profile.theme === 'light'
                          ? 'white'
                          : 'rgba(255,255,255,0.15)',
                      color:
                        profile.theme === 'light'
                          ? '#1F2937'
                          : 'white',
                      border:
                        profile.theme === 'light'
                          ? '1px solid #E5E7EB'
                          : '1px solid rgba(255,255,255,0.2)',
                      boxShadow:
                        '0 2px 4px rgba(0,0,0,0.05)',
                      cursor: 'default',
                    }}
                  >
                    {link.title}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: '40px',
                  opacity: 0.5,
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  fontWeight: 900,
                  letterSpacing: '1px',
                }}
              >
                LinkPay
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// FILA ORDENABLE DE ENLACE
function SortableLinkRow({
  link,
  styles,
  onUpdate,
  onDelete,
}: {
  link: any;
  styles: any;
  onUpdate: (id: string, field: string, value: any) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style: React.CSSProperties = {
    ...styles.card,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    background: isDragging ? '#EEF2FF' : styles.card.background,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        {...attributes}
        {...listeners}
        style={{
          marginTop: '12px',
          cursor: 'grab',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <GripVertical size={20} color="#9CA3AF" />
      </div>
      <div style={{ flex: 1 }}>
        <input
          value={link.title}
          onChange={(e) =>
            onUpdate(link.id, 'title', e.target.value)
          }
          style={{
            ...styles.input,
            marginBottom: '8px',
            border: 'none',
            padding: '0',
            fontSize: '16px',
            background: 'transparent',
          }}
          placeholder="Título del botón"
        />
        <input
          value={link.url}
          onChange={(e) =>
            onUpdate(link.id, 'url', e.target.value)
          }
          style={{
            ...styles.input,
            border: 'none',
            padding: '0',
            fontSize: '13px',
            color: '#6B7280',
            background: 'transparent',
          }}
          placeholder="https://"
        />
      </div>
      <button
        onClick={() => onDelete(link.id)}
        style={{
          padding: '8px',
          background: '#FEF2F2',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          color: '#EF4444',
        }}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
