import React from 'react';
import {
    Star,
    Link as LinkIcon,
    MousePointer2,
    DollarSign,
    Eye,
    Users,
    Palette,
    Image as ImageIcon,
    FileText,
    Share2,
    CheckCircle2,
    Circle
} from 'lucide-react';

// Logros con progreso - más motivadores
const ACHIEVEMENTS = [
    {
        id: 'first_link',
        icon: LinkIcon,
        label: 'Primer Enlace',
        description: 'Añade tu primer enlace',
        color: '#3b82f6',
        check: (p: any) => (p.links?.length || 0) >= 1
    },
    {
        id: 'link_collector',
        icon: LinkIcon,
        label: 'Coleccionista',
        description: 'Añade 5 enlaces',
        color: '#8b5cf6',
        check: (p: any) => (p.links?.length || 0) >= 5
    },
    {
        id: 'profile_pic',
        icon: ImageIcon,
        label: 'Con Cara',
        description: 'Sube tu foto de perfil',
        color: '#f59e0b',
        check: (p: any) => !!p.avatar_url
    },
    {
        id: 'bio_writer',
        icon: FileText,
        label: 'Escritor',
        description: 'Añade una bio de +10 caracteres',
        color: '#10b981',
        check: (p: any) => (p.description?.length || 0) >= 10
    },
    {
        id: 'theme_changer',
        icon: Palette,
        label: 'Diseñador',
        description: 'Personaliza tu tema',
        color: '#ec4899',
        check: (p: any) => p.theme && p.theme !== 'light'
    },
    {
        id: 'first_view',
        icon: Eye,
        label: 'Primera Visita',
        description: 'Recibe tu primera visita',
        color: '#6366f1',
        check: (p: any) => (p.views || 0) >= 1
    },
    {
        id: 'popular',
        icon: Users,
        label: 'Popular',
        description: 'Alcanza 100 visitas',
        color: '#14b8a6',
        check: (p: any) => (p.views || 0) >= 100
    },
    {
        id: 'first_click',
        icon: MousePointer2,
        label: 'Primer Click',
        description: 'Alguien hizo click en tu enlace',
        color: '#22c55e',
        check: (p: any) => {
            const totalClicks = p.links?.reduce((sum: number, l: any) => sum + (l.clicks || 0), 0) || 0;
            return totalClicks >= 1;
        }
    },
    {
        id: 'viral',
        icon: Share2,
        label: 'Viral',
        description: 'Consigue 100 clicks',
        color: '#eab308',
        check: (p: any) => {
            const totalClicks = p.links?.reduce((sum: number, l: any) => sum + (l.clicks || 0), 0) || 0;
            return totalClicks >= 100;
        }
    },
    {
        id: 'money_maker',
        icon: DollarSign,
        label: 'Monetizado',
        description: 'Activa la monetización',
        color: '#22c55e',
        check: (p: any) => p.monetization_mode && p.monetization_mode !== 'none'
    }
];

interface ProfileCompletionProps {
    profile: any;
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

    if (percentage === 100) return null;

    return (
        <div className="lp-completion-card">
            <div className="lp-completion-header">
                <Star size={18} />
                <span>Completa tu perfil</span>
                <span className="lp-completion-pct">{percentage}%</span>
            </div>
            <div className="lp-completion-bar">
                <div className="lp-completion-fill" style={{ width: `${percentage}%` }} />
            </div>
            <div className="lp-completion-steps">
                {steps.map(step => (
                    <div key={step.key} className={`lp-completion-step ${step.done ? 'done' : ''}`}>
                        {step.done ? '✓' : '○'} {step.label}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Nuevo: Lista de logros con progreso visual
interface AchievementsListProps {
    profile: any;
}

export function AchievementsList({ profile }: AchievementsListProps) {
    const completedCount = ACHIEVEMENTS.filter(a => a.check(profile)).length;

    return (
        <div className="lp-achievements-list">
            <div className="lp-achievements-header">
                <span className="lp-achievements-count">
                    {completedCount}/{ACHIEVEMENTS.length} logros
                </span>
            </div>
            <div className="lp-achievements-items">
                {ACHIEVEMENTS.map(achievement => {
                    const isComplete = achievement.check(profile);
                    const Icon = achievement.icon;

                    return (
                        <div
                            key={achievement.id}
                            className={`lp-achievement-item ${isComplete ? 'complete' : ''}`}
                        >
                            <div
                                className="lp-achievement-icon"
                                style={{
                                    background: isComplete ? achievement.color : 'rgba(255,255,255,0.1)',
                                    opacity: isComplete ? 1 : 0.5
                                }}
                            >
                                <Icon size={16} />
                            </div>
                            <div className="lp-achievement-info">
                                <span className="lp-achievement-label">{achievement.label}</span>
                                <span className="lp-achievement-desc">{achievement.description}</span>
                            </div>
                            <div className="lp-achievement-status">
                                {isComplete ? (
                                    <CheckCircle2 size={18} style={{ color: '#22c55e' }} />
                                ) : (
                                    <Circle size={18} style={{ color: 'rgba(255,255,255,0.3)' }} />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Legacy exports for compatibility (pueden eliminarse después)
interface AchievementsBadgesProps {
    achievements: Array<{ badge_type: string; earned_at: string }>;
}

export function AchievementsBadges({ achievements }: AchievementsBadgesProps) {
    // Deprecated - use AchievementsList instead
    return null;
}

interface XPBarProps {
    level: number;
    xp: number;
}

export function XPBar({ level = 1, xp = 0 }: XPBarProps) {
    // Deprecated - removed by user request
    return null;
}
