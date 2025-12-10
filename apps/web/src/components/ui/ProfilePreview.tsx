import React from 'react';
import { ExternalLink, Eye } from 'lucide-react';

interface ProfilePreviewProps {
    profile: {
        avatar_url?: string;
        display_name?: string;
        full_name?: string;
        description?: string;
        username?: string;
        theme?: string;
        accent_color?: string;
    };
    bioProfile?: {
        username?: string;
        theme?: string;
        links?: any[];
    };
}

export function ProfilePreview({ profile, bioProfile }: ProfilePreviewProps) {
    const username = bioProfile?.username || profile.username;
    const displayName = profile.display_name || profile.full_name || 'Usuario';
    const linkCount = bioProfile?.links?.length || 0;

    const getThemeColors = () => {
        const theme = bioProfile?.theme || 'dark';
        const themes: Record<string, { bg: string; text: string; muted: string }> = {
            light: { bg: '#f8fafc', text: '#0f172a', muted: '#64748b' },
            dark: { bg: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)', text: '#f8fafc', muted: '#94a3b8' },
            blue: { bg: 'linear-gradient(180deg, #1e40af 0%, #3b82f6 100%)', text: '#ffffff', muted: '#bfdbfe' },
            gradient: { bg: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)', text: '#ffffff', muted: '#e9d5ff' },
            neon: { bg: '#0a0a0a', text: '#22d3ee', muted: '#67e8f9' },
            pastel: { bg: 'linear-gradient(135deg, #fce7f3 0%, #ddd6fe 100%)', text: '#1e1b4b', muted: '#6b7280' },
            brutalist: { bg: '#fef3c7', text: '#1c1917', muted: '#78716c' }
        };
        return themes[theme] || themes.dark;
    };

    const colors = getThemeColors();

    return (
        <>
            <style>{previewStyles}</style>
            <div className="lp-profile-preview">
                <div className="lp-preview-header">
                    <Eye size={14} />
                    <span>Vista previa de tu página</span>
                </div>

                <div
                    className="lp-preview-phone"
                    style={{ background: colors.bg }}
                >
                    <div className="lp-preview-notch" />

                    <div className="lp-preview-content">
                        {/* Avatar */}
                        <div className="lp-preview-avatar">
                            {profile.avatar_url ? (
                                <img src={profile.avatar_url} alt="" />
                            ) : (
                                <span style={{ color: colors.text }}>{displayName[0]}</span>
                            )}
                        </div>

                        {/* Name */}
                        <h4 className="lp-preview-name" style={{ color: colors.text }}>
                            {displayName}
                        </h4>

                        {/* Username */}
                        {username && (
                            <p className="lp-preview-username" style={{ color: colors.muted }}>
                                @{username}
                            </p>
                        )}

                        {/* Bio */}
                        {profile.description && (
                            <p className="lp-preview-bio" style={{ color: colors.muted }}>
                                {profile.description.length > 60
                                    ? profile.description.slice(0, 60) + '...'
                                    : profile.description}
                            </p>
                        )}

                        {/* Links placeholders */}
                        <div className="lp-preview-links">
                            {[...Array(Math.min(linkCount, 3))].map((_, i) => (
                                <div
                                    key={i}
                                    className="lp-preview-link-placeholder"
                                    style={{
                                        background: `rgba(${colors.text === '#ffffff' || colors.text === '#f8fafc' ? '255,255,255' : '0,0,0'}, 0.1)`,
                                        borderColor: `rgba(${colors.text === '#ffffff' || colors.text === '#f8fafc' ? '255,255,255' : '0,0,0'}, 0.2)`
                                    }}
                                />
                            ))}
                            {linkCount === 0 && (
                                <p className="lp-preview-empty" style={{ color: colors.muted }}>
                                    Sin enlaces aún
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {username && (
                    <a
                        href={`/@${username}`}
                        target="_blank"
                        rel="noopener"
                        className="lp-preview-link"
                    >
                        <ExternalLink size={14} />
                        Ver página completa
                    </a>
                )}
            </div>
        </>
    );
}

const previewStyles = `
  .lp-profile-preview {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .lp-preview-header {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #64748b;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .lp-preview-phone {
    position: relative;
    width: 200px;
    height: 360px;
    border-radius: 28px;
    border: 3px solid rgba(148, 163, 184, 0.2);
    overflow: hidden;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    margin: 0 auto;
  }

  .lp-preview-notch {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 20px;
    background: #000;
    border-radius: 12px;
  }

  .lp-preview-content {
    padding: 48px 16px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .lp-preview-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(148, 163, 184, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .lp-preview-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .lp-preview-name {
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 2px 0;
  }

  .lp-preview-username {
    font-size: 11px;
    margin: 0 0 8px 0;
  }

  .lp-preview-bio {
    font-size: 10px;
    line-height: 1.4;
    margin: 0 0 16px 0;
    max-width: 160px;
  }

  .lp-preview-links {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lp-preview-link-placeholder {
    height: 32px;
    border-radius: 8px;
    border: 1px solid;
  }

  .lp-preview-empty {
    font-size: 10px;
    margin: 0;
  }

  .lp-preview-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 10px;
    color: #60a5fa;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .lp-preview-link:hover {
    background: rgba(59, 130, 246, 0.2);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .lp-preview-phone {
      width: 160px;
      height: 280px;
    }
    
    .lp-preview-avatar {
      width: 44px;
      height: 44px;
      font-size: 18px;
    }
    
    .lp-preview-name {
      font-size: 12px;
    }
  }
`;

export default ProfilePreview;
