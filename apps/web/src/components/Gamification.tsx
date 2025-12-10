import React, { useState, useEffect } from 'react';
import { X, Zap, Link as LinkIcon, Palette, TrendingUp } from 'lucide-react';

interface OnboardingProps {
    onComplete: () => void;
    username?: string;
}

export function OnboardingModal({ onComplete, username }: OnboardingProps) {
    const [step, setStep] = useState(0);

    const steps = [
        {
            emoji: '🚀',
            title: '¡Bienvenido a LinkPay!',
            subtitle: 'Tu página de enlaces profesional en segundos. Vamos a configurar tu perfil.',
            content: [
                { num: 1, text: 'Añade tus <strong>enlaces</strong> más importantes' },
                { num: 2, text: 'Personaliza tu <strong>apariencia</strong>' },
                { num: 3, text: 'Comparte tu URL: <strong>linkpay.com/' + (username || 'tu-usuario') + '</strong>' }
            ]
        },
        {
            emoji: '🔗',
            title: 'Tipos de Enlaces',
            subtitle: 'Cada enlace puede ser diferente según tu objetivo.',
            content: [
                { num: 1, text: '<strong>Normal</strong> — Link estándar gratuito' },
                { num: 2, text: '<strong>Monetizado</strong> — Gana con cada click' },
                { num: 3, text: '<strong>Paywall</strong> — Contenido exclusivo de pago' }
            ]
        },
        {
            emoji: '🎨',
            title: 'Personalización',
            subtitle: 'Haz que tu página destaque con estilos únicos.',
            content: [
                { num: 1, text: '7 <strong>temas</strong> disponibles (incluye Premium)' },
                { num: 2, text: '6 <strong>estilos de botón</strong> diferentes' },
                { num: 3, text: '<strong>Bloques especiales</strong>: Headers, Divisores, Spotlights' }
            ]
        }
    ];

    const currentStep = steps[step];
    const isLastStep = step === steps.length - 1;

    const handleNext = () => {
        if (isLastStep) {
            localStorage.setItem('linkpay_onboarding_complete', 'true');
            onComplete();
        } else {
            setStep(step + 1);
        }
    };

    return (
        <div className="lp-onboarding-overlay" onClick={(e) => e.target === e.currentTarget && onComplete()}>
            <div className="lp-onboarding-modal">
                <div className="lp-onboarding-header">
                    <span className="lp-onboarding-emoji">{currentStep.emoji}</span>
                    <h2 className="lp-onboarding-title">{currentStep.title}</h2>
                    <p className="lp-onboarding-subtitle">{currentStep.subtitle}</p>
                </div>

                <div className="lp-onboarding-steps">
                    {currentStep.content.map((item, i) => (
                        <div key={i} className="lp-onboarding-step">
                            <div className="lp-onboarding-step-num">{item.num}</div>
                            <div className="lp-onboarding-step-text" dangerouslySetInnerHTML={{ __html: item.text }} />
                        </div>
                    ))}
                </div>

                <div className="lp-onboarding-actions">
                    <button className="lp-onboarding-btn secondary" onClick={onComplete}>
                        Saltar
                    </button>
                    <button className="lp-onboarding-btn primary" onClick={handleNext}>
                        {isLastStep ? '¡Empezar!' : 'Siguiente'}
                    </button>
                </div>

                <div className="lp-progress-dots">
                    {steps.map((_, i) => (
                        <div key={i} className={`lp-progress-dot ${i === step ? 'active' : ''}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Sparkline component for link analytics
interface SparklineProps {
    data: number[];
    height?: number;
}

export function Sparkline({ data, height = 20 }: SparklineProps) {
    const max = Math.max(...data, 1);

    return (
        <div className="lp-sparkline" style={{ height }}>
            {data.map((value, i) => {
                const h = Math.max((value / max) * height, 2);
                const isLast = i === data.length - 1;
                return (
                    <div
                        key={i}
                        className={`lp-sparkline-bar ${isLast ? 'accent' : ''} ${value < max * 0.3 ? 'low' : ''}`}
                        style={{ height: h }}
                    />
                );
            })}
        </div>
    );
}

// Trending badge component
interface TrendingBadgeProps {
    change: number; // Percentage change
    isHot?: boolean;
}

export function TrendingBadge({ change, isHot }: TrendingBadgeProps) {
    if (isHot) {
        return (
            <span className="lp-trending-badge hot">
                🔥 Hot
            </span>
        );
    }

    if (change === 0) return null;

    const isUp = change > 0;
    return (
        <span className={`lp-trending-badge ${isUp ? 'up' : 'down'}`}>
            <TrendingUp size={10} style={{ transform: isUp ? 'none' : 'rotate(180deg)' }} />
            {Math.abs(change)}%
        </span>
    );
}

// Check if user needs onboarding
export function useOnboarding(): [boolean, () => void] {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const completed = localStorage.getItem('linkpay_onboarding_complete');
        if (!completed) {
            // Small delay for better UX
            const timer = setTimeout(() => setShow(true), 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const complete = () => setShow(false);

    return [show, complete];
}
