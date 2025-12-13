import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Camera, Users, Bell } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export function MobileHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Load user profile with avatar
  useEffect(() => {
    if (!user?.id) return;

    const loadProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single();

      if (data?.avatar_url) {
        setAvatarUrl(data.avatar_url);
      }
    };

    loadProfile();

    // Subscribe to profile changes (when user updates avatar in settings)
    const channel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${user.id}` },
        (payload) => {
          if (payload.new?.avatar_url) {
            setAvatarUrl(payload.new.avatar_url as string);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return (
    <header className="lp-mobile-header">
      <style>{mobileHeaderStyles}</style>

      {/* Left side: Avatar + Notifications */}
      <div className="lp-header-left">
        {/* Avatar / Camera placeholder */}
        <button
          className="lp-header-avatar-btn"
          onClick={() => navigate('/app/settings')}
          aria-label="Perfil"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="lp-header-avatar-img"
            />
          ) : (
            <div className="lp-header-avatar-placeholder">
              <Camera size={16} className="lp-header-camera-icon" />
              <span className="lp-header-avatar-pulse" />
            </div>
          )}
        </button>

        {/* Notifications / Alerts */}
        <button
          className="lp-header-icon-btn"
          onClick={() => {/* TODO: Open notifications */ }}
          aria-label="Notificaciones"
        >
          <Bell size={20} />
        </button>
      </div>

      {/* App name / branding */}
      <div className="lp-header-brand">
        <span className="lp-header-title">LinkPay</span>
      </div>

      {/* Right icons: Referrals + Settings */}
      <div className="lp-header-right">
        <button
          className="lp-header-icon-btn"
          onClick={() => navigate('/app/referrals')}
          aria-label="Referidos"
        >
          <Users size={20} />
        </button>
        <button
          className="lp-header-icon-btn"
          onClick={() => navigate('/app/settings')}
          aria-label="Ajustes"
        >
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}

const mobileHeaderStyles = `
  .lp-mobile-header {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    height: calc(56px + env(safe-area-inset-top, 0px));
    padding-top: env(safe-area-inset-top, 0px);
    padding-left: 12px;
    padding-right: 12px;
    /* TRANSPARENT - se integra con el fondo de cada página */
    background: transparent;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    .lp-mobile-header {
      display: flex;
    }
  }

  /* Left Container */
  .lp-header-left {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* Avatar Button */
  .lp-header-avatar-btn {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;
    padding: 0;
    cursor: pointer;
    background: transparent;
    position: relative;
    overflow: visible;
  }

  .lp-header-avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(99, 102, 241, 0.5);
  }

  /* Camera placeholder with animation */
  .lp-header-avatar-placeholder {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border: 2px solid rgba(99, 102, 241, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .lp-header-camera-icon {
    color: #94a3b8;
    animation: lp-camera-bounce 2s ease-in-out infinite;
  }

  @keyframes lp-camera-bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
  }

  /* Pulsing ring animation */
  .lp-header-avatar-pulse {
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 2px solid rgba(99, 102, 241, 0.6);
    animation: lp-pulse-ring 2s ease-out infinite;
  }

  @keyframes lp-pulse-ring {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.4);
      opacity: 0;
    }
  }

  /* Brand / Title */
  .lp-header-brand {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .lp-header-title {
    font-size: 17px;
    font-weight: 700;
    background: linear-gradient(135deg, #f9fafb 0%, #a5b4fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
  }

  /* Right Icons Container */
  .lp-header-right {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  /* Icon Buttons */
  .lp-header-icon-btn {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    border: none;
    background: rgba(255, 255, 255, 0.05);
    color: #94a3b8;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    position: relative;
  }

  .lp-header-icon-btn:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #f9fafb;
  }

  .lp-header-icon-btn:active {
    transform: scale(0.95);
  }
`;
