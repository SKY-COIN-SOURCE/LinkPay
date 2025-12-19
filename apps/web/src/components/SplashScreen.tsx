import React, { useState, useEffect, useRef } from 'react';

// Consejos que rotan mientras carga
const TIPS = [
    { icon: '💡', text: 'Comparte tus Smart Links en redes sociales para maximizar ganancias' },
    { icon: '🎯', text: 'Personaliza tu BioPage para aumentar la confianza de tus seguidores' },
    { icon: '📊', text: 'Revisa tus Analytics para saber qué contenido genera más clics' },
    { icon: '🔗', text: 'Usa alias personalizados para que tus links sean más memorables' },
    { icon: '💰', text: 'Los enlaces con buenas descripciones generan 2x más clics' },
    { icon: '🚀', text: 'Activa el modo Monetización para ganar con cada visita' },
    { icon: '👥', text: 'Invita amigos y gana comisiones con el programa de referidos' },
    { icon: '⚡', text: 'Crea tu primer enlace en menos de 30 segundos' },
];

interface SplashScreenProps {
    onComplete: () => void;
    minDuration?: number;
}

export function SplashScreen({ onComplete, minDuration = 2000 }: SplashScreenProps) {
    const [currentTip, setCurrentTip] = useState(0);
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
    const animationFrameRef = useRef<number>();
    const startTimeRef = useRef<number>(Date.now());

    // Generar partículas aleatorias para el fondo
    useEffect(() => {
        const particleCount = 30;
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 2,
        }));
        setParticles(newParticles);
    }, []);

    useEffect(() => {
        // Rotar tips cada 1.5 segundos
        const tipInterval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % TIPS.length);
        }, 1500);

        // Progreso de carga usando requestAnimationFrame para suavidad
        const updateProgress = () => {
            const elapsed = Date.now() - startTimeRef.current;
            const newProgress = Math.min((elapsed / minDuration) * 100, 100);
            setProgress(newProgress);

            if (elapsed < minDuration) {
                animationFrameRef.current = requestAnimationFrame(updateProgress);
            } else {
                setFadeOut(true);
                setTimeout(onComplete, 600); // Tiempo para la animación de fadeOut
            }
        };

        animationFrameRef.current = requestAnimationFrame(updateProgress);

        return () => {
            clearInterval(tipInterval);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [minDuration, onComplete]);

    const tip = TIPS[currentTip];

    return (
        <div className={`lp-splash ${fadeOut ? 'fade-out' : ''}`}>
            <style>{splashStyles}</style>

            {/* Fondo con gradientes animados */}
            <div className="lp-splash-bg">
                <div className="lp-splash-gradient lp-splash-gradient-1" />
                <div className="lp-splash-gradient lp-splash-gradient-2" />
                <div className="lp-splash-gradient lp-splash-gradient-3" />
                
                {/* Partículas flotantes */}
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="lp-splash-particle"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animationDelay: `${particle.delay}s`,
                        }}
                    />
                ))}
            </div>

            <div className="lp-splash-content">
                {/* Logo con efectos premium */}
                <div className="lp-splash-logo-container">
                    <div className="lp-splash-logo-glow-ring" />
                    <div className="lp-splash-logo-glow-pulse" />
                    <div className="lp-splash-logo">
                        <img
                            src="/icons/icon-192.png"
                            alt="LinkPay"
                            className="lp-splash-logo-img"
                            loading="eager"
                        />
                        <div className="lp-splash-logo-shine" />
                    </div>
                </div>

                {/* Nombre de la app con efecto de brillo */}
                <div className="lp-splash-title-container">
                    <h1 className="lp-splash-title">
                        <span className="lp-splash-title-text">LinkPay</span>
                        <span className="lp-splash-title-shine" />
                    </h1>
                    <p className="lp-splash-subtitle">Creator Studio</p>
                </div>

                {/* Barra de progreso premium */}
                <div className="lp-splash-progress-container">
                    <div className="lp-splash-progress-track">
                        <div
                            className="lp-splash-progress-bar"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="lp-splash-progress-glow" />
                            <div className="lp-splash-progress-shine" />
                        </div>
                    </div>
                    <div className="lp-splash-progress-percent">{Math.round(progress)}%</div>
                </div>

                {/* Tip rotativo con animación suave */}
                <div className="lp-splash-tip-container" key={currentTip}>
                    <div className="lp-splash-tip">
                        <span className="lp-splash-tip-icon">{tip.icon}</span>
                        <span className="lp-splash-tip-text">{tip.text}</span>
                    </div>
                </div>
            </div>

            {/* Footer con efecto de pulso */}
            <div className="lp-splash-footer">
                <div className="lp-splash-footer-dot" />
                <span>Cargando tu panel...</span>
            </div>
        </div>
    );
}

const splashStyles = `
  .lp-splash {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    min-height: 100vh;
    min-height: 100dvh;
    max-height: 100vh;
    max-height: 100dvh;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #000000;
    overflow: hidden;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity, transform;
    margin: 0;
    padding: 0;
  }


  .lp-splash.fade-out {
    opacity: 0;
    transform: scale(1.08);
    pointer-events: none;
  }

  /* === FONDO ANIMADO PREMIUM === */
  .lp-splash-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    max-height: 100vh;
    max-height: 100dvh;
    overflow: hidden;
    pointer-events: none;
  }

  .lp-splash-gradient {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    will-change: transform, opacity;
  }

  .lp-splash-gradient-1 {
    width: 600px;
    height: 600px;
    top: -200px;
    left: -200px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, rgba(99, 102, 241, 0.2) 50%, transparent 70%);
    animation: splash-gradient-1 8s ease-in-out infinite;
  }

  .lp-splash-gradient-2 {
    width: 700px;
    height: 700px;
    bottom: -250px;
    right: -250px;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 70%);
    animation: splash-gradient-2 10s ease-in-out infinite;
  }

  .lp-splash-gradient-3 {
    width: 500px;
    height: 500px;
    bottom: 30%;
    left: 20%;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, rgba(34, 197, 94, 0.1) 50%, transparent 70%);
    animation: splash-gradient-3 12s ease-in-out infinite;
  }

  @keyframes splash-gradient-1 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
    33% { transform: translate(50px, 30px) scale(1.1); opacity: 0.8; }
    66% { transform: translate(-30px, 50px) scale(0.9); opacity: 0.5; }
  }

  @keyframes splash-gradient-2 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
    50% { transform: translate(-60px, -40px) scale(1.15); opacity: 0.7; }
  }

  @keyframes splash-gradient-3 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
    50% { transform: translate(40px, -60px) scale(1.2); opacity: 0.6; }
  }

  /* Partículas flotantes */
  .lp-splash-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(99, 102, 241, 0.6);
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(99, 102, 241, 0.8);
    will-change: transform, opacity;
    animation: splash-particle-float 15s ease-in-out infinite;
  }

  @keyframes splash-particle-float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.3;
    }
    25% {
      transform: translate(30px, -40px) scale(1.2);
      opacity: 0.6;
    }
    50% {
      transform: translate(-20px, -60px) scale(0.8);
      opacity: 0.4;
    }
    75% {
      transform: translate(40px, -20px) scale(1.1);
      opacity: 0.7;
    }
  }

  /* === CONTENIDO === */
  .lp-splash-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 24px;
    text-align: center;
    will-change: transform;
  }

  /* Logo Container Premium */
  .lp-splash-logo-container {
    position: relative;
    width: 140px;
    height: 140px;
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lp-splash-logo-glow-ring {
    position: absolute;
    inset: -30px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      rgba(99, 102, 241, 0.4),
      rgba(168, 85, 247, 0.4),
      rgba(34, 197, 94, 0.4),
      rgba(99, 102, 241, 0.4)
    );
    animation: splash-glow-ring-rotate 3s linear infinite;
    filter: blur(20px);
    will-change: transform;
  }

  @keyframes splash-glow-ring-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .lp-splash-logo-glow-pulse {
    position: absolute;
    inset: -20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%);
    animation: splash-glow-pulse 2s ease-in-out infinite;
    will-change: transform, opacity;
  }

  @keyframes splash-glow-pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.3);
      opacity: 1;
    }
  }

  .lp-splash-logo {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 28px;
    overflow: hidden;
    box-shadow:
      0 0 80px rgba(99, 102, 241, 0.6),
      0 0 40px rgba(168, 85, 247, 0.4),
      inset 0 0 40px rgba(99, 102, 241, 0.2);
    animation: splash-logo-float 3s ease-in-out infinite;
    will-change: transform;
  }

  @keyframes splash-logo-float {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-8px) scale(1.02); }
  }

  .lp-splash-logo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .lp-splash-logo-shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
    animation: splash-logo-shine 3s ease-in-out infinite;
    will-change: transform;
  }

  @keyframes splash-logo-shine {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(200%) translateY(200%) rotate(45deg); }
  }

  /* Título Premium */
  .lp-splash-title-container {
    margin-bottom: 40px;
    position: relative;
  }

  .lp-splash-title {
    font-size: 48px;
    font-weight: 900;
    letter-spacing: -0.04em;
    margin: 0 0 8px 0;
    position: relative;
    display: inline-block;
  }

  .lp-splash-title-text {
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      #a5b4fc 30%,
      #c084fc 60%,
      #4ade80 100%
    );
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: splash-title-gradient 3s ease infinite;
    will-change: background-position;
    display: inline-block;
  }

  @keyframes splash-title-gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .lp-splash-title-shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    );
    animation: splash-title-shine 2.5s ease-in-out infinite;
    will-change: transform;
  }

  @keyframes splash-title-shine {
    0% { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(200%) skewX(-15deg); }
  }

  .lp-splash-subtitle {
    font-size: 14px;
    font-weight: 600;
    color: #94a3b8;
    margin: 0;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    opacity: 0.8;
  }

  /* Barra de progreso Premium */
  .lp-splash-progress-container {
    width: 280px;
    margin-bottom: 40px;
    position: relative;
  }

  .lp-splash-progress-track {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .lp-splash-progress-bar {
    height: 100%;
    background: linear-gradient(
      90deg,
      #6366f1 0%,
      #8b5cf6 30%,
      #a855f7 60%,
      #22c55e 100%
    );
    background-size: 200% 100%;
    border-radius: 999px;
    position: relative;
    transition: width 0.1s cubic-bezier(0.4, 0, 0.2, 1);
    animation: splash-progress-gradient 2s linear infinite;
    will-change: width;
    box-shadow:
      0 0 20px rgba(99, 102, 241, 0.6),
      0 0 40px rgba(168, 85, 247, 0.4);
  }

  @keyframes splash-progress-gradient {
    0% { background-position: 0% 0%; }
    100% { background-position: 200% 0%; }
  }

  .lp-splash-progress-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    );
    animation: splash-progress-shine 1.5s ease-in-out infinite;
    will-change: transform;
  }

  .lp-splash-progress-shine {
    position: absolute;
    top: -2px;
    left: 0;
    right: 0;
    height: 10px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 100%
    );
    border-radius: 999px;
  }

  @keyframes splash-progress-shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .lp-splash-progress-percent {
    position: absolute;
    top: -24px;
    right: 0;
    font-size: 11px;
    font-weight: 700;
    color: #a5b4fc;
    letter-spacing: 0.1em;
    text-shadow: 0 0 10px rgba(165, 180, 252, 0.5);
  }

  /* Tip rotativo Premium */
  .lp-splash-tip-container {
    width: 100%;
    max-width: 360px;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lp-splash-tip {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 28px;
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    animation: splash-tip-fade 1.5s ease-in-out;
    will-change: opacity, transform;
  }

  @keyframes splash-tip-fade {
    0% {
      opacity: 0;
      transform: translateY(15px) scale(0.95);
    }
    15% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    85% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0.7;
      transform: translateY(-8px) scale(0.98);
    }
  }

  .lp-splash-tip-icon {
    font-size: 28px;
    flex-shrink: 0;
    filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.5));
    animation: splash-tip-icon-bounce 2s ease-in-out infinite;
    will-change: transform;
  }

  @keyframes splash-tip-icon-bounce {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-4px) scale(1.1); }
  }

  .lp-splash-tip-text {
    font-size: 13px;
    color: #cbd5e1;
    line-height: 1.6;
    text-align: left;
    font-weight: 500;
  }

  /* Footer Premium */
  .lp-splash-footer {
    position: absolute;
    bottom: calc(env(safe-area-inset-bottom, 0px) + 48px);
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 500;
    letter-spacing: 0.05em;
    /* Asegurar que esté dentro del viewport */
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }

  .lp-splash-footer-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #6366f1;
    box-shadow: 0 0 12px rgba(99, 102, 241, 0.8);
    animation: splash-footer-dot-pulse 1.5s ease-in-out infinite;
    will-change: transform, opacity;
  }

  @keyframes splash-footer-dot-pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.3);
      opacity: 0.7;
    }
  }

  /* Optimizaciones móvil */
  @media (max-width: 768px) {
    .lp-splash-logo-container {
      width: 120px;
      height: 120px;
      margin-bottom: 28px;
    }

    .lp-splash-logo {
      width: 100px;
      height: 100px;
    }

    .lp-splash-title {
      font-size: 40px;
    }

    .lp-splash-progress-container {
      width: 240px;
    }

    .lp-splash-tip {
      padding: 16px 24px;
      max-width: 320px;
    }

    .lp-splash-tip-text {
      font-size: 12px;
    }

    /* Reducir partículas en móvil para mejor rendimiento */
    .lp-splash-particle {
      display: none;
    }

    /* Reducir blur en móvil */
    .lp-splash-gradient {
      filter: blur(80px);
    }
  }

  /* Reducir animaciones en dispositivos con preferencia de movimiento reducido */
  @media (prefers-reduced-motion: reduce) {
    .lp-splash-gradient,
    .lp-splash-particle,
    .lp-splash-logo-glow-ring,
    .lp-splash-logo-glow-pulse,
    .lp-splash-logo,
    .lp-splash-title-text,
    .lp-splash-progress-bar,
    .lp-splash-tip-icon,
    .lp-splash-footer-dot {
      animation: none;
    }
  }
`;
