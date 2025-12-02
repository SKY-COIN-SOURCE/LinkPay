import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { BioService } from '../../lib/bioService';
import { Loader2, Zap } from 'lucide-react';

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
      }
      setLoading(false);
    };
    load();
  }, [username]);

  if (loading) return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC'}}><Loader2 className="animate-spin text-slate-400" /></div>;
  
  if (!profile) return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: '20px', textAlign: 'center'}}>
      <h1 style={{fontSize: '24px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px'}}>Perfil no encontrado</h1>
      <p style={{color: '#64748B', marginBottom: '24px'}}>El usuario @{username} no existe.</p>
      <a href="/" style={{background: '#000', color: '#fff', padding: '12px 24px', borderRadius: '100px', textDecoration: 'none', fontWeight: 'bold'}}>Crear mi LinkPay</a>
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
    color: ['light'].includes(profile.theme) ? '#1F2937' : '#FFFFFF'
  };

  if (profile.theme === 'custom' && profile.background_url) {
    containerStyle.backgroundImage = `url(${profile.background_url})`;
  } else {
    const themes = {
      light: { backgroundColor: '#F8FAFC' },
      dark: { backgroundColor: '#111827' },
      blue: { backgroundColor: '#2563EB' },
      gradient: { background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)' }
    };
    Object.assign(containerStyle, themes[profile.theme as keyof typeof themes] || themes.light);
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
    
    let color = {};
    if (profile.button_style === 'shadow') {
      shape = { borderRadius: '12px' };
      color = { background: 'white', color: 'black', border: '2px solid black', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' };
    } else {
      const isLight = ['light'].includes(profile.theme);
      color = isLight 
        ? { background: 'white', color: '#1F2937', border: '1px solid #E5E7EB', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }
        : { background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' };
    }
    return { ...base, ...shape, ...color };
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
      <style>{`.animate-spin { animation: spin 1s linear infinite; }`}</style>
      
      <div style={{width: '100%', maxWidth: '600px', textAlign: 'center'}}>
        
        <div style={{marginBottom: '24px', position: 'relative', display: 'inline-block'}}>
          {profile.avatar_url ? (
            <img src={profile.avatar_url} style={{width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)'}} alt="Avatar" />
          ) : (
            <div style={{width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '4px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', opacity: 0.8}}>
              {profile.display_name?.[0]}
            </div>
          )}
        </div>

        <h1 style={{fontSize: '24px', fontWeight: 900, marginBottom: '8px', letterSpacing: '-0.5px'}}>@{profile.display_name}</h1>
        <p style={{fontSize: '15px', opacity: 0.9, marginBottom: '40px', lineHeight: 1.6, maxWidth: '320px', margin: '0 auto 40px auto', whiteSpace: 'pre-wrap'}}>
          {profile.description}
        </p>

        <div style={{width: '100%', paddingBottom: '80px'}}>
          {profile.links?.filter((l: any) => l.active !== false).map((link: any) => (
            <a 
              key={link.id}
              href={link.url}
              onClick={(e) => handleLinkClick(e, link)} // <--- INTERCEPTAMOS EL CLIC
              style={getButtonStyle()}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {link.thumbnail_url && (
                <img 
                  src={link.thumbnail_url} 
                  style={{width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)'}} 
                  alt=""
                />
              )}
              <span style={{flex: 1, textAlign: 'center', padding: link.thumbnail_url ? '0 40px' : '0'}}>
                {link.title}
              </span>
            </a>
          ))}
        </div>

        <div style={{position: 'fixed', bottom: '24px', left: 0, right: 0, textAlign: 'center', pointerEvents: 'none'}}>
          <a href="/" style={{display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', textDecoration: 'none', opacity: 0.6, color: 'inherit', pointerEvents: 'auto', background: 'rgba(0,0,0,0.05)', padding: '6px 12px', borderRadius: '100px', backdropFilter: 'blur(4px)'}}>
            <div style={{padding: '2px', background: 'currentColor', borderRadius: '4px', color: ['light'].includes(profile.theme) ? 'white' : 'black'}}>
              <Zap size={10} fill="currentColor" />
            </div>
            LinkPay
          </a>
        </div>

      </div>
    </div>
  );
}
