import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { BioService } from '../../lib/bioService';
import {
  Loader2,
  Zap,
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

// Social Icons Map
const SOCIAL_ICONS: Record<string, { icon: any; color: string }> = {
  instagram: { icon: Instagram, color: '#E4405F' },
  twitter: { icon: Twitter, color: '#1DA1F2' },
  youtube: { icon: Youtube, color: '#FF0000' },
  twitch: { icon: Twitch, color: '#9146FF' },
  github: { icon: Github, color: '#333' },
  linkedin: { icon: Linkedin, color: '#0A66C2' },
  facebook: { icon: Facebook, color: '#1877F2' },
  tiktok: { icon: Music, color: '#000' },
  shop: { icon: ShoppingBag, color: '#16a34a' },
  email: { icon: Mail, color: '#EA4335' },
  website: { icon: Globe, color: '#6366f1' },
  link: { icon: LinkIcon, color: '#64748b' },
};

export function PublicBioPage() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (username) {
        const data = await BioService.getPublicProfile(username);
        setProfile(data);
        // NOTA: Ya NO cobramos por la visita visual. Cobramos en el clic.
        // Pero registramos la vista para estadísticas
        BioService.trackView(data.id, data.monetization_mode).catch(err => console.error("View track error", err));
      }
      setLoading(false);
    };
    load();
  }, [username]);

  // SEO: Dynamic meta tags
  useEffect(() => {
    if (!profile) return;

    // Title
    document.title = `${profile.display_name} | LinkPay`;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', profile.description || `Visita los enlaces de ${profile.display_name}`);

    // Open Graph
    const setOG = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setOG('og:title', `${profile.display_name} | LinkPay`);
    setOG('og:description', profile.description || `Visita los enlaces de ${profile.display_name}`);
    setOG('og:type', 'profile');
    if (profile.avatar_url) setOG('og:image', profile.avatar_url);
    setOG('og:url', window.location.href);

  }, [profile]);

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}><Loader2 className="animate-spin text-slate-400" /></div>;

  if (!profile) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px' }}>Perfil no encontrado</h1>
      <p style={{ color: '#64748B', marginBottom: '24px' }}>El usuario @{username} no existe.</p>
      <a href="/" style={{ background: '#000', color: '#fff', padding: '12px 24px', borderRadius: '100px', textDecoration: 'none', fontWeight: 'bold' }}>Crear mi LinkPay</a>
    </div>
  );

  // --- ESTILOS ---
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    padding: '60px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: ['light', 'pastel'].includes(profile.theme) ? '#1F2937' : '#FFFFFF'
  };

  // Theme backgrounds - includes all premium themes
  const isLightTheme = ['light', 'pastel'].includes(profile.theme);

  if (profile.theme === 'custom' && profile.background_url) {
    containerStyle.backgroundImage = `url(${profile.background_url})`;
  } else {
    const themes: Record<string, React.CSSProperties> = {
      light: { backgroundColor: '#F8FAFC' },
      dark: { backgroundColor: '#111827' },
      blue: { backgroundColor: '#2563EB' },
      gradient: { background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)' },
      neon: {
        backgroundColor: '#000000',
        boxShadow: 'inset 0 0 100px rgba(57, 255, 20, 0.1)'
      },
      pastel: {
        background: 'linear-gradient(135deg, #fce7f3 0%, #ede9fe 50%, #dbeafe 100%)'
      },
      brutalist: {
        backgroundColor: '#FFFFFF',
        border: '4px solid #000000'
      }
    };
    Object.assign(containerStyle, themes[profile.theme] || themes.light);
  }

  const getButtonStyle = () => {
    const base = {
      display: 'flex', alignItems: 'center', width: '100%', padding: '16px 20px',
      marginBottom: '16px', textDecoration: 'none', fontWeight: 700, fontSize: '16px',
      transition: 'transform 0.1s', cursor: 'pointer', position: 'relative' as 'relative', overflow: 'hidden',
      border: 'none'
    };

    let shape = { borderRadius: '12px' };
    if (profile.button_style === 'square') shape = { borderRadius: '0px' };
    if (profile.button_style === 'pill') shape = { borderRadius: '100px' };

    let color: any = {};

    if (profile.button_style === 'outline') {
      // Outline - Solo borde, fondo transparente
      const borderColor = profile.accent_color || 'white';
      color = {
        background: 'transparent',
        color: borderColor,
        border: `2px solid ${borderColor}`,
        boxShadow: 'none'
      };
    } else if (profile.button_style === 'glass') {
      // Glass - Semitransparente grisáceo
      color = {
        background: 'rgba(255,255,255,0.1)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      };
    } else if (profile.button_style === 'shadow') {
      shape = { borderRadius: '12px' };
      const accentBg = profile.accent_color || 'white';
      const isDarkAccent = profile.accent_color && parseInt(profile.accent_color.replace('#', ''), 16) < 0x888888;
      color = {
        background: accentBg,
        color: isDarkAccent ? 'white' : 'black',
        border: '2px solid black',
        boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)'
      };
    } else if (profile.accent_color) {
      // Use accent color for button background
      color = {
        background: profile.accent_color,
        color: 'white',
        border: 'none',
        boxShadow: `0 4px 14px ${profile.accent_color}40`
      };
    } else {
      // Use the isLightTheme variable defined above
      color = isLightTheme
        ? { background: 'white', color: '#1F2937', border: '1px solid #E5E7EB', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }
        : { background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' };
    }
    return { ...base, ...shape, ...color };
  };

  // Helper: Check if link is visible based on scheduling
  const isLinkVisible = (link: any): boolean => {
    if (!link.active) return false;
    const now = new Date();
    if (link.visible_from && new Date(link.visible_from) > now) return false;
    if (link.visible_until && new Date(link.visible_until) < now) return false;
    return true;
  };

  // Helper: Detect embed type from URL
  const getEmbedType = (url: string): 'youtube' | 'spotify' | 'tiktok' | null => {
    if (!url) return null;
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('spotify.com')) return 'spotify';
    if (url.includes('tiktok.com')) return 'tiktok';
    return null;
  };

  // Helper: Get embed URL
  const getEmbedUrl = (url: string, type: string): string | null => {
    try {
      if (type === 'youtube') {
        const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
      }
      if (type === 'spotify') {
        // Convert open.spotify.com/track/xxx to embed
        const match = url.match(/spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/);
        return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0` : null;
      }
      if (type === 'tiktok') {
        // TikTok embeds require their own embed script - return null for now
        return null;
      }
    } catch (e) {
      console.error('Embed URL error:', e);
    }
    return null;
  };

  // --- LA MAGIA: REDIRECCIÓN AL TÚNEL ---
  const handleLinkClick = (e: React.MouseEvent, link: any) => {
    e.preventDefault();

    // Datos para la RedirectPage
    const dest = encodeURIComponent(link.url);
    const title = encodeURIComponent(link.title);
    const mode = profile.monetization_mode || 'lite';
    const pid = profile.id;

    // Enviamos al usuario a nuestra página de anuncios
    window.location.href = `/l/bio-redirect?url=${dest}&title=${title}&m=${mode}&pid=${pid}`;
  };

  return (
    <div style={containerStyle}>
      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>

        <div style={{ marginBottom: '24px', position: 'relative', display: 'inline-block' }}>
          {profile.avatar_url ? (
            <img src={profile.avatar_url} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }} alt="Avatar" />
          ) : (
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '4px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', opacity: 0.8 }}>
              {profile.display_name?.[0]}
            </div>
          )}
        </div>

        <h1 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px', letterSpacing: '-0.5px' }}>@{profile.display_name}</h1>
        <p style={{ fontSize: '15px', opacity: 0.9, marginBottom: '40px', lineHeight: 1.6, maxWidth: '320px', margin: '0 auto 40px auto', whiteSpace: 'pre-wrap' }}>
          {profile.description}
        </p>

        <div style={{ width: '100%', paddingBottom: '80px' }}>
          {/* CTA Principal */}
          {profile.cta_text && profile.cta_url && (
            <a
              href={profile.cta_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '18px 24px',
                marginBottom: '24px',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '17px',
                borderRadius: '100px',
                background: profile.accent_color || 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                color: 'white',
                border: 'none',
                boxShadow: `0 4px 20px ${profile.accent_color || '#f59e0b'}60, 0 0 0 4px ${profile.accent_color || '#f59e0b'}20`,
                cursor: 'pointer',
                animation: 'fadeInUp 0.4s ease-out both',
                transition: 'transform 0.2s, box-shadow 0.2s',
                gap: '10px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = `0 6px 25px ${profile.accent_color || '#f59e0b'}80`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 20px ${profile.accent_color || '#f59e0b'}60, 0 0 0 4px ${profile.accent_color || '#f59e0b'}20`;
              }}
            >
              <Zap size={20} fill="currentColor" />
              {profile.cta_text}
            </a>
          )}

          {profile.links?.filter((l: any) => isLinkVisible(l)).map((link: any, index: number) => {
            const socialIcon = link.icon && SOCIAL_ICONS[link.icon];
            const IconComponent = socialIcon?.icon;
            const blockType = link.block_type || 'link';

            // DEBUG: Log block types to verify data
            console.log(`[PublicBioPage] Link: "${link.title}", block_type: ${link.block_type}, resolved: ${blockType}`);

            // IMPORTANT: Check special blocks FIRST (before embeds)
            // Header Block
            if (blockType === 'header') {
              return (
                <div
                  key={link.id}
                  style={{
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: isLightTheme ? '#1f2937' : 'white',
                    opacity: 0.9,
                    margin: '24px 0 16px',
                    animation: `fadeInUp 0.4s ease-out ${index * 0.08}s both`
                  }}
                >
                  {link.title}
                </div>
              );
            }

            // Divider Block
            if (blockType === 'divider') {
              return (
                <div
                  key={link.id}
                  style={{
                    width: '100%',
                    height: '1px',
                    background: isLightTheme ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)',
                    margin: '16px 0',
                    animation: `fadeInUp 0.4s ease-out ${index * 0.08}s both`
                  }}
                />
              );
            }

            // Check for embeddable content (only for regular links)
            const embedType = getEmbedType(link.url);
            const embedUrl = embedType ? getEmbedUrl(link.url, embedType) : null;

            // YouTube/Spotify Embed
            if (embedUrl && (embedType === 'youtube' || embedType === 'spotify')) {
              return (
                <div
                  key={link.id}
                  style={{
                    width: '100%',
                    marginBottom: '16px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    animation: `fadeInUp 0.4s ease-out ${index * 0.08}s both`
                  }}
                >
                  {link.title && (
                    <div style={{
                      padding: '12px 16px',
                      background: isLightTheme ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: isLightTheme ? '#1f2937' : 'white'
                    }}>
                      {embedType === 'youtube' ? '🎬' : '🎵'} {link.title}
                    </div>
                  )}
                  <iframe
                    src={embedUrl}
                    style={{
                      width: '100%',
                      height: embedType === 'youtube' ? '215px' : '152px',
                      border: 'none'
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              );
            }

            // Spotlight Block (highlighted link)
            if (blockType === 'spotlight') {
              return (
                <a
                  key={link.id}
                  href={link.url}
                  onClick={(e) => handleLinkClick(e, link)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '20px 24px',
                    marginBottom: '16px',
                    textDecoration: 'none',
                    fontWeight: 800,
                    fontSize: '17px',
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${profile.accent_color || '#f59e0b'} 0%, ${profile.accent_color ? profile.accent_color + 'cc' : '#fbbf24'} 100%)`,
                    color: 'white',
                    border: 'none',
                    boxShadow: `0 8px 30px ${profile.accent_color || '#f59e0b'}40`,
                    cursor: 'pointer',
                    animation: `fadeInUp 0.4s ease-out ${index * 0.08}s both, pulse 2s ease-in-out infinite`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    gap: '10px'
                  }}
                  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                  onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  ⭐ {link.title}
                </a>
              );
            }

            // Normal/Monetized/Paywall Link (default)
            return (
              <a
                key={link.id}
                href={link.url}
                onClick={(e) => handleLinkClick(e, link)}
                style={{
                  ...getButtonStyle(),
                  animation: `fadeInUp 0.4s ease-out ${index * 0.08}s both`
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {/* Social Icon con color de marca */}
                {IconComponent && (
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: socialIcon.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}>
                    <IconComponent size={20} />
                  </div>
                )}
                {/* Thumbnail si no hay icono */}
                {link.thumbnail_url && !link.icon && (
                  <img
                    src={link.thumbnail_url}
                    style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
                    alt=""
                  />
                )}
                <span style={{ flex: 1, textAlign: 'center', padding: (link.thumbnail_url || link.icon) ? '0 40px' : '0' }}>
                  {link.title}
                </span>
              </a>
            );
          })}
        </div>

        <div style={{ position: 'fixed', bottom: '24px', left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', textDecoration: 'none', opacity: 0.6, color: 'inherit', pointerEvents: 'auto', background: 'rgba(0,0,0,0.05)', padding: '6px 12px', borderRadius: '100px', backdropFilter: 'blur(4px)' }}>
            <div style={{ padding: '2px', background: 'currentColor', borderRadius: '4px', color: isLightTheme ? 'white' : 'black' }}>
              <Zap size={10} fill="currentColor" />
            </div>
            LinkPay
          </a>
        </div>

      </div>
    </div>
  );
}
