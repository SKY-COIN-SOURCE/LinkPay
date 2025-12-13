import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Camera } from 'lucide-react';

interface MobileHeaderProps {
    userAvatar?: string | null;
    userName?: string;
}

export function MobileHeader({ userAvatar, userName }: MobileHeaderProps) {
    const navigate = useNavigate();

    return (
        <header className="lp-mobile-header">
            <style>{mobileHeaderStyles}</style>

            {/* Avatar / Camera placeholder */}
            <button
                className="lp-header-avatar-btn"
                onClick={() => navigate('/app/settings')}
                aria-label="Perfil"
            >
                {userAvatar ? (
                    <img
                        src={userAvatar}
                        alt={userName || 'Avatar'}
                        className="lp-header-avatar-img"
                    />
                ) : (
                    <div className="lp-header-avatar-placeholder">
                        <Camera size={18} className="lp-header-camera-icon" />
                        <span className="lp-header-avatar-pulse" />
                    </div>
                )}
            </button>

            {/* App name / branding */}
            <div className="lp-header-brand">
                <span className="lp-header-title">LinkPay</span>
            </div>

            {/* Settings button */}
            <button
                className="lp-header-settings-btn"
                onClick={() => navigate('/app/settings')}
                aria-label="Ajustes"
            >
                <Settings size={22} />
            </button>
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
    padding-left: 16px;
    padding-right: 16px;
    background: linear-gradient(180deg, rgba(2, 6, 23, 0.98) 0%, rgba(2, 6, 23, 0.95) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(99, 102, 241, 0.15);
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    .lp-mobile-header {
      display: flex;
    }
  }

  /* Avatar Button */
  .lp-header-avatar-btn {
    width: 36px;
    height: 36px;
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
    inset: -4px;
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
      transform: scale(1.5);
      opacity: 0;
    }
  }

  /* Brand / Title */
  .lp-header-brand {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .lp-header-title {
    font-size: 18px;
    font-weight: 700;
    background: linear-gradient(135deg, #f9fafb 0%, #a5b4fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
  }

  /* Settings Button */
  .lp-header-settings-btn {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: none;
    background: rgba(255, 255, 255, 0.05);
    color: #94a3b8;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .lp-header-settings-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #f9fafb;
  }

  .lp-header-settings-btn:active {
    transform: scale(0.95);
  }
`;
