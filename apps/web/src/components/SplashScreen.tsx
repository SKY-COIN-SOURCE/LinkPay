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
    const animationFrameRef = useRef<number>();
    const startTimeRef = useRef<number>(Date.now());

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
                setTimeout(onComplete, 600);
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
                <div className="lp-splash-grid" />
            </div>

            {/* Contenido principal - perfectamente centrado */}
            <div className="lp-splash-wrapper">
                <div className="lp-splash-content">
                    {/* Logo con efectos premium */}
                    <div className="lp-splash-logo-container">
                        <div className="lp-splash-logo-orb" />
                        <div className="lp-splash-logo-glow" />
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
                            <span className="lp-splash-title-glow" />
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
  /* ============================================
     SPLASH SCREEN PREMIUM - MARTÍN ANDRIGHETTI
     ============================================ */
  
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
    z-index: 99999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #000000;
    overflow: hidden;
    margin: 0;
    padding: 0;
    /* CRÍTICO: Prevenir cualquier rotación o transformación */
    transform: none !important;
    transform-origin: center center !important;
    /* Asegurar que esté siempre centrado */
    text-align: center;
  }

  /* Extender fondo más abajo en móvil */
  @media (max-width: 768px) {
    .lp-splash {
      height: 100vh;
      height: calc(var(--vh, 1vh) * 100);
      /* Forzar orientación correcta */
      transform: none !important;
      transform-origin: center center !important;
    }
    
    .lp-splash::after {
      content: "";
      position: fixed;
      left: 0;
      right: 0;
      bottom: -200px;
      height: 200px;
      background: #000000;
      z-index: -1;
      pointer-events: none;
    }
  }

  .lp-splash.fade-out {
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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
    overflow: hidden;
    pointer-events: none;
  }

  /* Grid pattern sutil */
  .lp-splash-grid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.4;
  }

  .lp-splash-gradient {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    will-change: transform, opacity;
    /* NO usar rotate - solo translate y scale */
  }

  .lp-splash-gradient-1 {
    width: 400px;
    height: 400px;
    top: -100px;
    left: -100px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 70%);
    animation: splash-gradient-1 12s ease-in-out infinite;
  }

  .lp-splash-gradient-2 {
    width: 500px;
    height: 500px;
    bottom: -150px;
    right: -150px;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(168, 85, 247, 0.08) 50%, transparent 70%);
    animation: splash-gradient-2 15s ease-in-out infinite;
  }

  .lp-splash-gradient-3 {
    width: 350px;
    height: 350px;
    bottom: 20%;
    left: 10%;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.25) 0%, rgba(34, 197, 94, 0.06) 50%, transparent 70%);
    animation: splash-gradient-3 18s ease-in-out infinite;
  }

  /* Animaciones SIN rotación - solo translate y scale */
  @keyframes splash-gradient-1 {
    0%, 100% { 
      transform: translate(0, 0) scale(1); 
      opacity: 0.4; 
    }
    50% { 
      transform: translate(40px, 30px) scale(1.15); 
      opacity: 0.6; 
    }
  }

  @keyframes splash-gradient-2 {
    0%, 100% { 
      transform: translate(0, 0) scale(1); 
      opacity: 0.35; 
    }
    50% { 
      transform: translate(-50px, -40px) scale(1.2); 
      opacity: 0.55; 
    }
  }

  @keyframes splash-gradient-3 {
    0%, 100% { 
      transform: translate(0, 0) scale(1); 
      opacity: 0.25; 
    }
    50% { 
      transform: translate(30px, -50px) scale(1.25); 
      opacity: 0.45; 
    }
  }

  /* === CONTENIDO PRINCIPAL - PERFECTAMENTE CENTRADO === */
  .lp-splash-wrapper {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Asegurar centrado perfecto */
    margin: 0 auto;
    padding: 0;
  }

  .lp-splash-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    text-align: center;
    width: 100%;
    max-width: 100%;
    /* Centrado perfecto */
    margin: 0 auto;
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
    /* Centrado perfecto */
    margin-left: auto;
    margin-right: auto;
  }

  /* Orb de fondo animado */
  .lp-splash-logo-orb {
    position: absolute;
    inset: -40px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      rgba(99, 102, 241, 0.2),
      rgba(168, 85, 247, 0.2),
      rgba(34, 197, 94, 0.2),
      rgba(99, 102, 241, 0.2)
    );
    animation: splash-orb-rotate 4s linear infinite;
    filter: blur(20px);
    will-change: transform;
  }

  @keyframes splash-orb-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Glow pulsante */
  .lp-splash-logo-glow {
    position: absolute;
    inset: -25px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%);
    animation: splash-glow-pulse 2.5s ease-in-out infinite;
    will-change: transform, opacity;
    filter: blur(15px);
  }

  @keyframes splash-glow-pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.3);
      opacity: 0.9;
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
    animation: splash-logo-float 4s ease-in-out infinite;
    will-change: transform;
    /* Centrado perfecto */
    margin: 0 auto;
  }

  @keyframes splash-logo-float {
    0%, 100% { 
      transform: translateY(0) scale(1); 
    }
    50% { 
      transform: translateY(-10px) scale(1.03); 
    }
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
    animation: splash-logo-shine 3.5s ease-in-out infinite;
    will-change: transform;
  }

  @keyframes splash-logo-shine {
    0% { 
      transform: translateX(-100%) translateY(-100%) rotate(45deg); 
    }
    100% { 
      transform: translateX(200%) translateY(200%) rotate(45deg); 
    }
  }

  /* Título Premium */
  .lp-splash-title-container {
    margin-bottom: 40px;
    position: relative;
    /* Centrado perfecto */
    margin-left: auto;
    margin-right: auto;
  }

  .lp-splash-title {
    font-size: 48px;
    font-weight: 900;
    letter-spacing: -0.04em;
    margin: 0 0 10px 0;
    position: relative;
    display: inline-block;
    /* Centrado perfecto */
    margin-left: auto;
    margin-right: auto;
  }

  .lp-splash-title-text {
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      #a5b4fc 25%,
      #c084fc 50%,
      #4ade80 75%,
      #ffffff 100%
    );
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: splash-title-gradient 4s ease infinite;
    will-change: background-position;
    display: inline-block;
    position: relative;
    z-index: 1;
  }

  @keyframes splash-title-gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .lp-splash-title-glow {
    position: absolute;
    inset: -10px;
    background: linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.3),
      rgba(168, 85, 247, 0.3),
      rgba(34, 197, 94, 0.3)
    );
    filter: blur(20px);
    z-index: -1;
    animation: splash-title-glow 3s ease-in-out infinite;
    opacity: 0.6;
  }

  @keyframes splash-title-glow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.1); }
  }

  .lp-splash-subtitle {
    font-size: 14px;
    font-weight: 600;
    color: #94a3b8;
    margin: 0;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    opacity: 0.85;
  }

  /* Barra de progreso Premium */
  .lp-splash-progress-container {
    width: 280px;
    margin-bottom: 40px;
    position: relative;
    /* Centrado perfecto */
    margin-left: auto;
    margin-right: auto;
  }

  .lp-splash-progress-track {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
  }

  .lp-splash-progress-bar {
    height: 100%;
    background: linear-gradient(
      90deg,
      #6366f1 0%,
      #8b5cf6 25%,
      #a855f7 50%,
      #22c55e 75%,
      #6366f1 100%
    );
    background-size: 300% 100%;
    border-radius: 999px;
    position: relative;
    transition: width 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    animation: splash-progress-gradient 3s linear infinite;
    will-change: width;
    box-shadow:
      0 0 20px rgba(99, 102, 241, 0.6),
      0 0 40px rgba(168, 85, 247, 0.4);
  }

  @keyframes splash-progress-gradient {
    0% { background-position: 0% 0%; }
    100% { background-position: 300% 0%; }
  }

  .lp-splash-progress-shine {
    position: absolute;
    top: -2px;
    left: 0;
    right: 0;
    height: 10px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 100%
    );
    border-radius: 999px;
    animation: splash-progress-shine 2s ease-in-out infinite;
    will-change: transform;
  }

  @keyframes splash-progress-shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .lp-splash-progress-percent {
    position: absolute;
    top: -26px;
    right: 0;
    font-size: 12px;
    font-weight: 700;
    color: #a5b4fc;
    letter-spacing: 0.1em;
    text-shadow: 0 0 12px rgba(165, 180, 252, 0.6);
  }

  /* Tip rotativo Premium */
  .lp-splash-tip-container {
    width: 100%;
    max-width: 360px;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Centrado perfecto */
    margin-left: auto;
    margin-right: auto;
  }

  .lp-splash-tip {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 28px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 20px;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4),
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
    animation: splash-tip-icon-bounce 2.5s ease-in-out infinite;
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
    bottom: 48px;
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
    padding: 0 24px;
    /* Centrado perfecto */
    margin: 0 auto;
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
      transform: scale(1.4);
      opacity: 0.7;
    }
  }

  /* ============================================
     OPTIMIZACIONES MÓVIL - MOBILE FIRST
     ============================================ */
  @media (max-width: 768px) {
    .lp-splash {
      /* Asegurar que ocupe toda la pantalla */
      height: 100vh;
      height: calc(var(--vh, 1vh) * 100);
      /* CRÍTICO: Prevenir cualquier rotación */
      transform: none !important;
      transform-origin: center center !important;
    }

    .lp-splash-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .lp-splash-content {
      padding: 0 20px;
      width: 100%;
      max-width: 100%;
    }

    .lp-splash-logo-container {
      width: 120px;
      height: 120px;
      margin-bottom: 28px;
    }

    .lp-splash-logo {
      width: 100px;
      height: 100px;
      border-radius: 24px;
    }

    .lp-splash-logo-orb {
      inset: -30px;
      filter: blur(15px);
    }

    .lp-splash-logo-glow {
      inset: -20px;
      filter: blur(12px);
    }

    .lp-splash-title {
      font-size: 40px;
    }

    .lp-splash-subtitle {
      font-size: 13px;
    }

    .lp-splash-progress-container {
      width: 240px;
      margin-bottom: 32px;
    }

    .lp-splash-progress-track {
      height: 5px;
    }

    .lp-splash-tip {
      padding: 16px 24px;
      max-width: 320px;
      gap: 12px;
    }

    .lp-splash-tip-icon {
      font-size: 24px;
    }

    .lp-splash-tip-text {
      font-size: 12px;
      line-height: 1.5;
    }

    .lp-splash-footer {
      bottom: 40px;
      font-size: 11px;
    }

    /* Reducir blur en móvil para mejor rendimiento */
    .lp-splash-gradient {
      filter: blur(50px);
    }

    .lp-splash-gradient-1 {
      width: 300px;
      height: 300px;
    }

    .lp-splash-gradient-2 {
      width: 350px;
      height: 350px;
    }

    .lp-splash-gradient-3 {
      width: 250px;
      height: 250px;
    }

    .lp-splash-grid {
      background-size: 40px 40px;
    }
  }

  /* Reducir animaciones en dispositivos con preferencia de movimiento reducido */
  @media (prefers-reduced-motion: reduce) {
    .lp-splash-gradient,
    .lp-splash-logo-orb,
    .lp-splash-logo-glow,
    .lp-splash-logo,
    .lp-splash-title-text,
    .lp-splash-title-glow,
    .lp-splash-progress-bar,
    .lp-splash-tip-icon,
    .lp-splash-footer-dot {
      animation: none;
    }
  }
`;
