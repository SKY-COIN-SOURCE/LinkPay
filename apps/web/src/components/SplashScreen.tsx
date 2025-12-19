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
    { icon: '🎨', text: 'Personaliza los colores de tu BioPage para destacar tu marca' },
    { icon: '📱', text: 'Optimiza tus enlaces para móviles - el 80% del tráfico viene de ahí' },
    { icon: '🔍', text: 'Usa palabras clave en tus descripciones para mejorar el SEO' },
    { icon: '⏰', text: 'Publica tus links en horarios de mayor actividad para más clics' },
    { icon: '📈', text: 'Analiza qué días de la semana generan más tráfico' },
    { icon: '🎁', text: 'Crea enlaces especiales para promociones y ofertas limitadas' },
    { icon: '🌍', text: 'Personaliza tus links según el país de origen de tus visitantes' },
    { icon: '💎', text: 'Los usuarios Premium tienen acceso a analytics avanzados' },
    { icon: '🔐', text: 'Protege tus enlaces con contraseñas para contenido exclusivo' },
    { icon: '📸', text: 'Añade imágenes a tus enlaces para aumentar el engagement' },
    { icon: '🎬', text: 'Crea enlaces para tus videos de YouTube y TikTok' },
    { icon: '🛍️', text: 'Monetiza tus recomendaciones de productos con Smart Links' },
];

interface SplashScreenProps {
    onComplete: () => void;
    minDuration?: number;
}

export function SplashScreen({ onComplete, minDuration = 2000 }: SplashScreenProps) {
    const [currentTip, setCurrentTip] = useState(0);
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const animationFrameRef = useRef<number>();
    const startTimeRef = useRef<number>(Date.now());
    const lastUpdateRef = useRef<number>(0);

    useEffect(() => {
        // Forzar que el splash sea visible inmediatamente
        const splashEl = document.querySelector('.lp-splash') as HTMLElement;
        if (splashEl) {
            splashEl.style.display = 'flex';
            splashEl.style.visibility = 'visible';
            splashEl.style.opacity = '1';
            splashEl.style.zIndex = '999999';
        }

        // Animación de entrada suave
        requestAnimationFrame(() => {
            setIsVisible(true);
        });

        // Rotar tips cada 1.5 segundos
        const tipInterval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % TIPS.length);
        }, 1500);

        // Progreso optimizado con throttling para evitar lag
        const updateProgress = () => {
            const now = Date.now();
            const elapsed = now - startTimeRef.current;
            
            // Throttle: solo actualizar cada 16ms (60fps)
            if (now - lastUpdateRef.current < 16 && elapsed < minDuration) {
                animationFrameRef.current = requestAnimationFrame(updateProgress);
                return;
            }
            
            lastUpdateRef.current = now;
            
            // Progreso suave con easing
            const progressRatio = elapsed / minDuration;
            const easedProgress = progressRatio < 0.5
                ? 2 * progressRatio * progressRatio
                : 1 - Math.pow(-2 * progressRatio + 2, 2) / 2;
            const newProgress = Math.min(easedProgress * 100, 100);
            setProgress(newProgress);

            if (elapsed < minDuration) {
                animationFrameRef.current = requestAnimationFrame(updateProgress);
            } else {
                // Pre-cargar y mostrar la app ANTES del fade-out del splash
                const appShell = document.querySelector('.lp-app-shell') as HTMLElement;
                const root = document.getElementById('root');

                if (appShell) {
                    appShell.classList.remove('lp-hidden');
                    appShell.style.visibility = 'visible';
                    appShell.style.opacity = '0';
                    appShell.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    appShell.style.zIndex = '1';
                }

                if (root) {
                    root.style.background = 'linear-gradient(180deg, #020617 0%, #0f172a 25%, #1e293b 50%, #0f172a 75%, #020617 100%)';
                    root.style.opacity = '1';
                }

                requestAnimationFrame(() => {
                    if (appShell) {
                        appShell.style.opacity = '1';
                    }
                });

                setTimeout(() => {
                    setFadeOut(true);
                }, 50);

                setTimeout(onComplete, 650);
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
        <div
            className={`lp-splash ${fadeOut ? 'fade-out' : ''} ${isVisible ? 'visible' : ''}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                height: '100dvh',
                minHeight: '100vh',
                minHeight: '100dvh',
                zIndex: 999999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                margin: 0,
                padding: 0,
                visibility: 'visible',
                opacity: 1,
                background: '#020617',
            }}
        >
            <style>{splashStyles}</style>

            {/* FONDO OPTIMIZADO - Menos capas para mejor rendimiento */}
            <div className="lp-splash-bg">
                <div className="lp-splash-bg-base" />
                <div className="lp-splash-bg-gradient" />
                <div className="lp-splash-bg-glow" />
                <div className="lp-splash-bg-particles" />
            </div>

            {/* Contenido principal */}
            <div className="lp-splash-wrapper">
                <div className={`lp-splash-content ${isVisible ? 'content-visible' : ''}`}>
                    {/* Logo con efectos optimizados */}
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

                    {/* Título mejorado */}
                    <div className="lp-splash-title-container">
                        <h1 className="lp-splash-title">
                            <span className="lp-splash-title-text">LinkPay</span>
                            <span className="lp-splash-title-glow" />
                        </h1>
                        <p className="lp-splash-subtitle">Creator Studio</p>
                    </div>

                    {/* Barra de progreso optimizada */}
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

                    {/* Tip rotativo */}
                    <div className="lp-splash-tip-container" key={currentTip}>
                        <div className="lp-splash-tip">
                            <span className="lp-splash-tip-icon">{tip.icon}</span>
                            <span className="lp-splash-tip-text">{tip.text}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="lp-splash-footer">
                <div className="lp-splash-footer-dot" />
                <span>Cargando tu panel...</span>
            </div>
        </div>
    );
}

const splashStyles = `
  /* ============================================
     SPLASH SCREEN OPTIMIZADO - SIN LAG
     Diseño Premium Mejorado
     ============================================ */
  
  .lp-splash {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;
    min-height: 100vh !important;
    min-height: 100dvh !important;
    z-index: 999999 !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: hidden !important;
    margin: 0 !important;
    padding: 0 !important;
    visibility: visible !important;
    opacity: 1 !important;
    background: #020617 !important;
    isolation: isolate !important;
    transform: translateZ(0) !important;
    will-change: opacity !important;
  }

  .lp-splash.visible {
    animation: splash-fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes splash-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .lp-splash.fade-out {
    opacity: 0 !important;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
    pointer-events: none !important;
  }

  /* === FONDO OPTIMIZADO - Menos capas === */
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
    z-index: 0;
    transform: translateZ(0);
  }

  /* Base gradient */
  .lp-splash-bg-base {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg,
      #020617 0%,
      #0f172a 20%,
      #1e293b 50%,
      #0f172a 80%,
      #020617 100%);
    z-index: 1;
    opacity: 1;
  }

  /* Gradientes optimizados - menos capas */
  .lp-splash-bg-gradient {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 150% 90% at 50% -20%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
      radial-gradient(ellipse 100% 80% at 20% 30%, rgba(168, 85, 247, 0.2) 0%, transparent 45%),
      radial-gradient(ellipse 90% 70% at 80% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 40%),
      radial-gradient(ellipse 110% 60% at 50% 100%, rgba(34, 197, 94, 0.15) 0%, transparent 50%);
    z-index: 2;
    opacity: 1;
  }

  /* Glow central optimizado */
  .lp-splash-bg-glow {
    position: absolute;
    top: -200px;
    left: 50%;
    transform: translateX(-50%) translateZ(0);
    width: 900px;
    height: 900px;
    background: radial-gradient(circle,
      rgba(99, 102, 241, 0.4) 0%,
      rgba(168, 85, 247, 0.3) 20%,
      transparent 60%);
    pointer-events: none;
    z-index: 3;
    animation: splash-glow-pulse 6s ease-in-out infinite;
    filter: blur(80px);
    will-change: transform, opacity;
  }

  @keyframes splash-glow-pulse {
    0%, 100% { 
      opacity: 0.6; 
      transform: translateX(-50%) translateZ(0) scale(1); 
    }
    50% { 
      opacity: 0.9; 
      transform: translateX(-50%) translateZ(0) scale(1.1); 
    }
  }

  /* Partículas simplificadas */
  .lp-splash-bg-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.5;
    z-index: 2;
    background-image:
      radial-gradient(2px 2px at 15% 20%, rgba(99, 102, 241, 0.4), transparent),
      radial-gradient(2px 2px at 35% 40%, rgba(168, 85, 247, 0.3), transparent),
      radial-gradient(2px 2px at 55% 15%, rgba(59, 130, 246, 0.35), transparent),
      radial-gradient(2px 2px at 75% 50%, rgba(34, 197, 94, 0.3), transparent),
      radial-gradient(2px 2px at 25% 70%, rgba(99, 102, 241, 0.25), transparent),
      radial-gradient(2px 2px at 65% 80%, rgba(168, 85, 247, 0.3), transparent),
      radial-gradient(2px 2px at 85% 30%, rgba(59, 130, 246, 0.25), transparent),
      radial-gradient(2px 2px at 45% 90%, rgba(34, 197, 94, 0.3), transparent);
    background-size: 400px 300px;
    animation: splash-particles-float 25s linear infinite;
    transform: translateZ(0);
    will-change: transform;
  }

  @keyframes splash-particles-float {
    0% { transform: translateY(0) translateZ(0); }
    100% { transform: translateY(-200px) translateZ(0); }
  }

  /* === CONTENIDO PRINCIPAL === */
  .lp-splash-wrapper {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 0;
  }

  .lp-splash-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    text-align: center;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(15px) translateZ(0);
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .lp-splash-content.content-visible {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }

  /* Logo Container Optimizado */
  .lp-splash-logo-container {
    position: relative;
    width: 150px;
    height: 150px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  /* Orb de fondo optimizado */
  .lp-splash-logo-orb {
    position: absolute;
    inset: -40px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      rgba(99, 102, 241, 0.25),
      rgba(168, 85, 247, 0.25),
      rgba(34, 197, 94, 0.25),
      rgba(99, 102, 241, 0.25)
    );
    animation: splash-orb-rotate 6s linear infinite;
    filter: blur(20px);
    transform: translateZ(0);
    will-change: transform;
  }

  @keyframes splash-orb-rotate {
    from { transform: rotate(0deg) translateZ(0); }
    to { transform: rotate(360deg) translateZ(0); }
  }

  /* Glow pulsante optimizado */
  .lp-splash-logo-glow {
    position: absolute;
    inset: -25px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%);
    animation: splash-glow-pulse-logo 3.5s ease-in-out infinite;
    filter: blur(16px);
    transform: translateZ(0);
    will-change: transform, opacity;
  }

  @keyframes splash-glow-pulse-logo {
    0%, 100% {
      transform: scale(1) translateZ(0);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.3) translateZ(0);
      opacity: 0.8;
    }
  }

  .lp-splash-logo {
    position: relative;
    width: 130px;
    height: 130px;
    border-radius: 28px;
    overflow: hidden;
    box-shadow:
      0 0 80px rgba(99, 102, 241, 0.6),
      0 0 40px rgba(168, 85, 247, 0.4),
      inset 0 0 40px rgba(99, 102, 241, 0.2);
    animation: splash-logo-float 5s ease-in-out infinite;
    margin: 0 auto;
    transform: translateZ(0);
    will-change: transform;
  }

  @keyframes splash-logo-float {
    0%, 100% { 
      transform: translateY(0) translateZ(0); 
    }
    50% { 
      transform: translateY(-10px) translateZ(0); 
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
    animation: splash-logo-shine 5s ease-in-out infinite;
    transform: translateZ(0);
    will-change: transform;
  }

  @keyframes splash-logo-shine {
    0% { 
      transform: translateX(-100%) translateY(-100%) rotate(45deg) translateZ(0); 
    }
    100% { 
      transform: translateX(200%) translateY(200%) rotate(45deg) translateZ(0); 
    }
  }

  /* Título Premium Mejorado */
  .lp-splash-title-container {
    margin-bottom: 48px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-splash-title {
    font-size: 54px;
    font-weight: 900;
    letter-spacing: -0.05em;
    margin: 0 0 16px 0;
    position: relative;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-splash-title-text {
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      #a5b4fc 20%,
      #c084fc 40%,
      #4ade80 60%,
      #60a5fa 80%,
      #ffffff 100%
    );
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: splash-title-gradient 5s ease infinite;
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
    inset: -12px;
    background: linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.3),
      rgba(168, 85, 247, 0.3),
      rgba(34, 197, 94, 0.3)
    );
    filter: blur(20px);
    z-index: -1;
    animation: splash-title-glow 4s ease-in-out infinite;
    opacity: 0.7;
    transform: translateZ(0);
    will-change: transform, opacity;
  }

  @keyframes splash-title-glow {
    0%, 100% { opacity: 0.5; transform: scale(1) translateZ(0); }
    50% { opacity: 0.9; transform: scale(1.1) translateZ(0); }
  }

  .lp-splash-subtitle {
    font-size: 15px;
    font-weight: 600;
    color: #94a3b8;
    margin: 0;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    opacity: 0.9;
  }

  /* Barra de progreso Optimizada */
  .lp-splash-progress-container {
    width: 320px;
    margin-bottom: 48px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-splash-progress-track {
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.5);
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
    transition: width 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
    animation: splash-progress-gradient 3s linear infinite;
    box-shadow:
      0 0 20px rgba(99, 102, 241, 0.6),
      0 0 40px rgba(168, 85, 247, 0.4);
    transform: translateZ(0);
    will-change: width;
  }

  @keyframes splash-progress-gradient {
    0% { background-position: 0% 0%; }
    100% { background-position: 300% 0%; }
  }

  .lp-splash-progress-shine {
    position: absolute;
    top: -3px;
    left: 0;
    right: 0;
    height: 14px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.5) 0%,
      transparent 100%
    );
    border-radius: 999px;
    animation: splash-progress-shine 2.5s ease-in-out infinite;
    transform: translateZ(0);
    will-change: transform;
  }

  @keyframes splash-progress-shine {
    0% { transform: translateX(-100%) translateZ(0); }
    100% { transform: translateX(100%) translateZ(0); }
  }

  .lp-splash-progress-percent {
    position: absolute;
    top: -30px;
    right: 0;
    font-size: 14px;
    font-weight: 700;
    color: #a5b4fc;
    letter-spacing: 0.1em;
    text-shadow: 0 0 15px rgba(165, 180, 252, 0.7);
  }

  /* Tip Container Premium */
  .lp-splash-tip-container {
    width: 100%;
    max-width: 400px;
    min-height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-splash-tip {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 22px 36px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 24px;
    box-shadow:
      0 10px 40px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.12),
      0 0 20px rgba(99, 102, 241, 0.15);
    animation: splash-tip-fade 1.2s ease-in-out;
    transform: translateZ(0);
  }

  @keyframes splash-tip-fade {
    0% {
      opacity: 0;
      transform: translateY(15px) scale(0.95) translateZ(0);
    }
    20% {
      opacity: 1;
      transform: translateY(0) scale(1) translateZ(0);
    }
    80% {
      opacity: 1;
      transform: translateY(0) scale(1) translateZ(0);
    }
    100% {
      opacity: 0.85;
      transform: translateY(-8px) scale(0.98) translateZ(0);
    }
  }

  .lp-splash-tip-icon {
    font-size: 32px;
    flex-shrink: 0;
    filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.6));
    animation: splash-tip-icon-bounce 3s ease-in-out infinite;
    transform: translateZ(0);
    will-change: transform;
  }

  @keyframes splash-tip-icon-bounce {
    0%, 100% { transform: translateY(0) translateZ(0); }
    50% { transform: translateY(-5px) translateZ(0); }
  }

  .lp-splash-tip-text {
    font-size: 15px;
    color: #e2e8f0;
    line-height: 1.7;
    text-align: left;
    font-weight: 500;
  }

  /* Footer */
  .lp-splash-footer {
    position: absolute;
    bottom: 56px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 14px;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    padding: 0 24px;
    margin: 0 auto;
    z-index: 3;
  }

  .lp-splash-footer-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #6366f1;
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.9);
    animation: splash-footer-dot-pulse 1.8s ease-in-out infinite;
    transform: translateZ(0);
    will-change: transform, opacity;
  }

  @keyframes splash-footer-dot-pulse {
    0%, 100% {
      transform: scale(1) translateZ(0);
      opacity: 1;
    }
    50% {
      transform: scale(1.5) translateZ(0);
      opacity: 0.8;
    }
  }

  /* ============================================
     OPTIMIZACIONES MÓVIL
     ============================================ */
  @media (max-width: 768px) {
    .lp-splash {
      height: 100vh !important;
      height: calc(var(--vh, 1vh) * 100) !important;
      height: 100dvh !important;
      visibility: visible !important;
      opacity: 1 !important;
      display: flex !important;
      z-index: 999999 !important;
      background: #020617 !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
    }

    .lp-splash-content {
      padding: 0 20px;
      width: 100%;
      max-width: 100%;
    }

    .lp-splash-logo-container {
      width: 140px;
      height: 140px;
      margin-bottom: 36px;
    }

    .lp-splash-logo {
      width: 120px;
      height: 120px;
      border-radius: 26px;
    }

    .lp-splash-title {
      font-size: 48px;
    }

    .lp-splash-subtitle {
      font-size: 14px;
    }

    .lp-splash-progress-container {
      width: 280px;
      margin-bottom: 40px;
    }

    .lp-splash-tip {
      padding: 20px 28px;
      max-width: 360px;
      gap: 16px;
    }

    .lp-splash-tip-icon {
      font-size: 28px;
    }

    .lp-splash-tip-text {
      font-size: 14px;
    }

    .lp-splash-footer {
      bottom: 48px;
      font-size: 13px;
    }

    .lp-splash-bg-glow {
      width: 700px;
      height: 700px;
      filter: blur(60px);
    }

    .lp-splash-bg-particles {
      background-size: 350px 250px;
      opacity: 0.4;
    }
  }

  /* Reducir animaciones en dispositivos con preferencia de movimiento reducido */
  @media (prefers-reduced-motion: reduce) {
    .lp-splash-bg-gradient,
    .lp-splash-bg-glow,
    .lp-splash-bg-particles,
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
