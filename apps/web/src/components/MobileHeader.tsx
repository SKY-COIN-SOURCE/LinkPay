import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Camera, Users, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationsContext';
import { NotificationsPanel } from './NotificationsPanel';

export function MobileHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

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

      <div className="lp-header-left">
        <button className="lp-header-avatar-btn" onClick={() => navigate('/app/settings')}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="lp-header-avatar-img" />
          ) : (
            <div className="lp-header-avatar-placeholder">
              <Camera size={16} className="lp-header-camera-icon" />
              <span className="lp-header-avatar-pulse" />
            </div>
          )}
        </button>
        <button className="lp-header-icon-btn" onClick={() => navigate('/app/referrals')}>
          <Users size={20} />
        </button>
      </div>

      <div className="lp-header-brand">
        <span className="lp-header-title">LinkPay</span>
      </div>

      <div className="lp-header-right">
        <button 
          className="lp-header-icon-btn lp-header-notifications-btn" 
          onClick={() => setNotificationsOpen(true)}
          style={{ position: 'relative' }}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <motion.span
              className="lp-notification-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.15 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </motion.span>
          )}
        </button>
        <button className="lp-header-icon-btn" onClick={() => navigate('/app/settings')}>
          <Settings size={20} />
        </button>
      </div>

      <NotificationsPanel isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
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
    z-index: 100;
    height: calc(48px + env(safe-area-inset-top, 0px));
    padding-top: env(safe-area-inset-top, 0px);
    padding-left: 12px;
    padding-right: 12px;
    background: transparent;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    .lp-mobile-header {
      display: flex;
    }
  }

  .lp-header-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 50px;
    flex-shrink: 0;
  }

  .lp-header-avatar-btn {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;
    padding: 0;
    cursor: pointer;
    background: transparent;
    position: relative;
  }

  .lp-header-avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(99, 102, 241, 0.5);
  }

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

  .lp-header-avatar-pulse {
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 2px solid rgba(99, 102, 241, 0.6);
    animation: lp-pulse-ring 2s ease-out infinite;
  }

  @keyframes lp-pulse-ring {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(1.4); opacity: 0; }
  }

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
  }

  .lp-header-right {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 50px;
    flex-shrink: 0;
  }

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
  }

  .lp-header-icon-btn:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #f9fafb;
  }

  .lp-header-icon-btn:active {
    transform: scale(0.95);
  }

  .lp-header-notifications-btn {
    position: relative;
  }

  .lp-notification-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    min-width: 20px;
    height: 20px;
    padding: 0 5px;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #0f172a;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.5);
    animation: lp-badge-pulse 2s ease-in-out infinite;
    z-index: 10;
  }

  @keyframes lp-badge-pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 2px 8px rgba(239, 68, 68, 0.5);
    }
    50% {
      transform: scale(1.1);
      box-shadow: 0 2px 12px rgba(239, 68, 68, 0.7);
    }
  }
`;
