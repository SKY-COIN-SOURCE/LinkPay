import React from 'react';
import {
    Award,
    Link as LinkIcon,
    MousePointer2,
    DollarSign,
    Zap,
    Star,
    Trophy,
    Target
} from 'lucide-react';

// Badge definitions
const BADGES = {
    first_link: {
        icon: LinkIcon,
        label: 'Primer Enlace',
        description: 'Añadiste tu primer enlace',
        color: '#3b82f6'
    },
    link_builder: {
        icon: Target,
        label: 'Constructor',
        description: '5 enlaces creados',
        color: '#8b5cf6'
    },
    first_100_clicks: {
        icon: MousePointer2,
        label: '100 Clicks',
        description: 'Alcanzaste 100 clicks',
        color: '#10b981'
    },
    viral: {
        icon: Zap,
        label: 'Viral',
        description: '1000+ clicks totales',
        color: '#f59e0b'
    },
    first_dollar: {
        icon: DollarSign,
        label: 'Primer Dólar',
        description: 'Ganaste tu primer dólar',
        color: '#22c55e'
    },
    earning_machine: {
        icon: Trophy,
        label: 'Máquina de Dinero',
        description: 'Ganaste $10+',
        color: '#eab308'
    }
};

interface ProfileCompletionProps {
    profile: {
        avatar_url?: string;
        display_name?: string;
        description?: string;
        links?: any[];
        theme?: string;
    };
}

export function ProfileCompletion({ profile }: ProfileCompletionProps) {
    const steps = [
        { key: 'avatar', label: 'Avatar', done: !!profile.avatar_url },
        { key: 'name', label: 'Nombre', done: !!profile.display_name && profile.display_name.length > 2 },
        { key: 'bio', label: 'Bio', done: !!profile.description && profile.description.length > 10 },
        { key: 'links', label: '3+ Enlaces', done: (profile.links?.length || 0) >= 3 },
        { key: 'theme', label: 'Tema', done: profile.theme !== 'light' },
    ];

    const completed = steps.filter(s => s.done).length;
    const percentage = Math.round((completed / steps.length) * 100);

    if (percentage === 100) return null; // Don't show when complete

    return (
        <div className="lp-completion-card">
            <div className="lp-completion-header">
                <Star size={18} />
                <span>Completa tu perfil</span>
                <span className="lp-completion-pct">{percentage}%</span>
            </div>
            <div className="lp-completion-bar">
                <div
                    className="lp-completion-fill"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className="lp-completion-steps">
                {steps.map(step => (
                    <div
                        key={step.key}
                        className={`lp-completion-step ${step.done ? 'done' : ''}`}
                    >
                        {step.done ? '✓' : '○'} {step.label}
                    </div>
                ))}
            </div>
        </div>
    );
}

interface AchievementsBadgesProps {
    achievements: Array<{ badge_type: string; earned_at: string }>;
}

export function AchievementsBadges({ achievements }: AchievementsBadgesProps) {
    if (!achievements || achievements.length === 0) {
        return (
            <div className="lp-achievements-empty">
                <Award size={32} />
                <p>Consigue logros para desbloquear badges</p>
            </div>
        );
    }

    return (
        <div className="lp-achievements-grid">
            {achievements.map(ach => {
                const badge = BADGES[ach.badge_type as keyof typeof BADGES];
                if (!badge) return null;
                const Icon = badge.icon;

                return (
                    <div
                        key={ach.badge_type}
                        className="lp-badge"
                        title={badge.description}
                    >
                        <div
                            className="lp-badge-icon"
                            style={{ background: badge.color }}
                        >
                            <Icon size={20} />
                        </div>
                        <span className="lp-badge-label">{badge.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

// Mini XP bar for nav
interface XPBarProps {
    level: number;
    xp: number;
}

export function XPBar({ level = 1, xp = 0 }: XPBarProps) {
    const xpForNextLevel = level * 100;
    const progress = Math.min((xp / xpForNextLevel) * 100, 100);

    return (
        <div className="lp-xp-container">
            <div className="lp-level-badge">Lv. {level}</div>
            <div className="lp-xp-bar">
                <div className="lp-xp-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="lp-xp-text">{xp}/{xpForNextLevel} XP</span>
        </div>
    );
}
