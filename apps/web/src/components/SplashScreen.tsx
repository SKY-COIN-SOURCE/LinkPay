import React, { useState, useEffect, useRef } from 'react';

// Consejos profesionales que rotan mientras carga
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

export function SplashScreen({ onComplete, minDuration = 2800 }: SplashScreenProps) {
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

        // Animación de entrada suave y elegante
        setTimeout(() => {
            setIsVisible(true);
        }, 100);

        // Rotar tips cada 2 segundos para dar tiempo a leer
        const tipInterval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % TIPS.length);
        }, 2000);

        // Progreso optimizado con throttling - PERFECTAMENTE SINCRONIZADO
        const updateProgress = () => {
            const now = Date.now();
            const elapsed = now - startTimeRef.current;
            
            // Throttle: solo actualizar cada 16ms (60fps)
            if (now - lastUpdateRef.current < 16 && elapsed < minDuration) {
                animationFrameRef.current = requestAnimationFrame(updateProgress);
                return;
            }
            
            lastUpdateRef.current = now;
            
            // Progreso REAL basado en tiempo - sin easing para que sea preciso
            const progressRatio = Math.min(elapsed / minDuration, 1);
            // Progreso lineal para que el porcentaje y la barra coincidan perfectamente
            const newProgress = Math.min(progressRatio * 100, 100);
            
            // Asegurar que siempre se muestre el valor exacto
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
                    appShell.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
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
                }, 100);

                setTimeout(onComplete, 900);
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
                height: '100dvh',
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

            {/* FONDO PREMIUM PROFESIONAL */}
            <div className="lp-splash-bg">
                <div className="lp-splash-bg-base" />
                <div className="lp-splash-bg-gradient" />
                <div className="lp-splash-bg-glow" />
                <div className="lp-splash-bg-particles" />
                <div className="lp-splash-bg-grid" />
            </div>

            {/* Contenido principal */}
            <div className="lp-splash-wrapper">
                <div className={`lp-splash-content ${isVisible ? 'content-visible' : ''}`}>
                    {/* Logo con efectos premium profesionales */}
                    <div className="lp-splash-logo-container">
                        <div className="lp-splash-logo-orb" />
                        <div className="lp-splash-logo-glow" />
                        <div className="lp-splash-logo-ring" />
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

                    {/* Título ultra profesional */}
                    <div className="lp-splash-title-container">
                        <h1 className="lp-splash-title">
                            <span className="lp-splash-title-text">LinkPay</span>
                            <span className="lp-splash-title-glow" />
                        </h1>
                        <p className="lp-splash-subtitle">Creator Studio</p>
                        <div className="lp-splash-divider" />
                    </div>

                    {/* Barra de progreso premium profesional */}
                    <div className="lp-splash-progress-container">
                        <div className="lp-splash-progress-label">Cargando experiencia premium</div>
                        <div className="lp-splash-progress-track">
                            <div
                                className="lp-splash-progress-bar"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="lp-splash-progress-shine" />
                                <div className="lp-splash-progress-glow" />
                            </div>
                        </div>
                        <div className="lp-splash-progress-percent">{Math.floor(progress)}%</div>
                    </div>

                    {/* Tip rotativo profesional */}
                    <div className="lp-splash-tip-container" key={currentTip}>
                        <div className="lp-splash-tip">
                            <div className="lp-splash-tip-icon-wrapper">
                                <span className="lp-splash-tip-icon">{tip.icon}</span>
                            </div>
                            <span className="lp-splash-tip-text">{tip.text}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer profesional */}
            <div className="lp-splash-footer">
                <div className="lp-splash-footer-content">
                    <div className="lp-splash-footer-dot" />
                    <span>Preparando tu panel de control</span>
                </div>
            </div>
        </div>
    );
}

const splashStyles = `
  /* ============================================
     SPLASH SCREEN ULTRA PROFESIONAL
     Diseño Premium para Millones de Usuarios
     ============================================ */
  
  .lp-splash {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100dvh !important;
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
    animation: splash-fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
    pointer-events: none !important;
  }

  /* === FONDO PREMIUM PROFESIONAL === */
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

  /* Base gradient profesional */
  .lp-splash-bg-base {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg,
      #020617 0%,
      #0a0f1f 12%,
      #0f172a 25%,
      #1a2332 40%,
      #1e293b 50%,
      #1a2332 60%,
      #0f172a 75%,
      #0a0f1f 88%,
      #020617 100%);
    z-index: 1;
    opacity: 1;
  }

  /* Gradientes profesionales refinados */
  .lp-splash-bg-gradient {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 160% 100% at 50% -15%, rgba(99, 102, 241, 0.22) 0%, rgba(99, 102, 241, 0.12) 20%, transparent 55%),
      radial-gradient(ellipse 110% 85% at 15% 25%, rgba(168, 85, 247, 0.18) 0%, rgba(168, 85, 247, 0.1) 25%, transparent 50%),
      radial-gradient(ellipse 100% 75% at 85% 35%, rgba(59, 130, 246, 0.18) 0%, rgba(59, 130, 246, 0.1) 30%, transparent 45%),
      radial-gradient(ellipse 120% 65% at 50% 105%, rgba(34, 197, 94, 0.12) 0%, rgba(34, 197, 94, 0.06) 35%, transparent 55%);
    z-index: 2;
    opacity: 1;
  }

  /* Glow central profesional */
  .lp-splash-bg-glow {
    position: absolute;
    top: -250px;
    left: 50%;
    transform: translateX(-50%) translateZ(0);
    width: 1000px;
    height: 1000px;
    background: radial-gradient(circle,
      rgba(99, 102, 241, 0.35) 0%,
      rgba(168, 85, 247, 0.25) 18%,
      rgba(59, 130, 246, 0.18) 35%,
      transparent 65%);
    pointer-events: none;
    z-index: 3;
    animation: splash-glow-pulse 7s ease-in-out infinite;
    filter: blur(90px);
    will-change: transform, opacity;
  }

  @keyframes splash-glow-pulse {
    0%, 100% { 
      opacity: 0.55; 
      transform: translateX(-50%) translateZ(0) scale(1); 
    }
    50% { 
      opacity: 0.85; 
      transform: translateX(-50%) translateZ(0) scale(1.12); 
    }
  }

  /* Partículas profesionales sutiles */
  .lp-splash-bg-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.45;
    z-index: 2;
    background-image:
      radial-gradient(2px 2px at 12% 18%, rgba(99, 102, 241, 0.35), transparent),
      radial-gradient(2px 2px at 28% 32%, rgba(168, 85, 247, 0.28), transparent),
      radial-gradient(2px 2px at 45% 12%, rgba(59, 130, 246, 0.32), transparent),
      radial-gradient(2px 2px at 62% 42%, rgba(34, 197, 94, 0.28), transparent),
      radial-gradient(2px 2px at 78% 22%, rgba(99, 102, 241, 0.22), transparent),
      radial-gradient(2px 2px at 88% 48%, rgba(168, 85, 247, 0.3), transparent),
      radial-gradient(2px 2px at 22% 68%, rgba(59, 130, 246, 0.25), transparent),
      radial-gradient(2px 2px at 38% 78%, rgba(34, 197, 94, 0.3), transparent),
      radial-gradient(2px 2px at 55% 72%, rgba(99, 102, 241, 0.25), transparent),
      radial-gradient(2px 2px at 72% 82%, rgba(168, 85, 247, 0.22), transparent);
    background-size: 450px 350px;
    animation: splash-particles-float 28s linear infinite;
    transform: translateZ(0);
    will-change: transform;
  }

  @keyframes splash-particles-float {
    0% { transform: translateY(0) translateZ(0); }
    100% { transform: translateY(-220px) translateZ(0); }
  }

  /* Grid pattern sutil profesional */
  .lp-splash-bg-grid {
    position: absolute;
    inset: 0;
    opacity: 0.04;
    background-image: 
      linear-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99, 102, 241, 0.15) 1px, transparent 1px);
    background-size: 60px 60px;
    z-index: 1;
    pointer-events: none;
  }

  /* === CONTENIDO PRINCIPAL PROFESIONAL === */
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
    padding: 0 32px;
    text-align: center;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(20px) translateZ(0);
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .lp-splash-content.content-visible {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }

  /* Logo Container Ultra Profesional */
  .lp-splash-logo-container {
    position: relative;
    width: 170px;
    height: 170px;
    margin-bottom: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  /* Orb de fondo profesional */
  .lp-splash-logo-orb {
    position: absolute;
    inset: -45px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      rgba(99, 102, 241, 0.28),
      rgba(168, 85, 247, 0.28),
      rgba(34, 197, 94, 0.28),
      rgba(59, 130, 246, 0.28),
      rgba(99, 102, 241, 0.28)
    );
    animation: splash-orb-rotate 7s linear infinite;
    filter: blur(22px);
    transform: translateZ(0);
    will-change: transform;
  }

  @keyframes splash-orb-rotate {
    from { transform: rotate(0deg) translateZ(0); }
    to { transform: rotate(360deg) translateZ(0); }
  }

  /* Glow pulsante profesional */
  .lp-splash-logo-glow {
    position: absolute;
    inset: -30px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.55) 0%, transparent 72%);
    animation: splash-glow-pulse-logo 4s ease-in-out infinite;
    filter: blur(18px);
    transform: translateZ(0);
    will-change: transform, opacity;
  }

  @keyframes splash-glow-pulse-logo {
    0%, 100% {
      transform: scale(1) translateZ(0);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.35) translateZ(0);
      opacity: 0.85;
    }
  }

  /* Ring profesional alrededor del logo */
  .lp-splash-logo-ring {
    position: absolute;
    inset: -20px;
    border: 2px solid rgba(99, 102, 241, 0.2);
    border-radius: 50%;
    animation: splash-ring-pulse 3s ease-in-out infinite;
    transform: translateZ(0);
    will-change: transform, opacity;
  }

  @keyframes splash-ring-pulse {
    0%, 100% {
      transform: scale(1) translateZ(0);
      opacity: 0.2;
    }
    50% {
      transform: scale(1.1) translateZ(0);
      opacity: 0.4;
    }
  }

  .lp-splash-logo {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 32px;
    overflow: hidden;
    box-shadow:
      0 0 90px rgba(99, 102, 241, 0.65),
      0 0 50px rgba(168, 85, 247, 0.45),
      0 0 25px rgba(59, 130, 246, 0.3),
      inset 0 0 50px rgba(99, 102, 241, 0.25);
    animation: splash-logo-float 6s ease-in-out infinite;
    margin: 0 auto;
    transform: translateZ(0);
    will-change: transform;
  }

  @keyframes splash-logo-float {
    0%, 100% { 
      transform: translateY(0) translateZ(0); 
    }
    50% { 
      transform: translateY(-12px) translateZ(0); 
    }
  }

  .lp-splash-logo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(1.05) contrast(1.05);
  }

  .lp-splash-logo-shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(255, 255, 255, 0.35) 50%,
      transparent 100%
    );
    animation: splash-logo-shine 6s ease-in-out infinite;
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

  /* Título Ultra Profesional */
  .lp-splash-title-container {
    margin-bottom: 52px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-splash-title {
    font-size: 62px;
    font-weight: 900;
    letter-spacing: -0.06em;
    margin: 0 0 20px 0;
    position: relative;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-splash-title-text {
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      #a5b4fc 18%,
      #c084fc 36%,
      #4ade80 54%,
      #60a5fa 72%,
      #a5b4fc 90%,
      #ffffff 100%
    );
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: splash-title-gradient 6s ease infinite;
    display: inline-block;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 0 30px rgba(99, 102, 241, 0.3));
  }

  @keyframes splash-title-gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .lp-splash-title-glow {
    position: absolute;
    inset: -15px;
    background: linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.35),
      rgba(168, 85, 247, 0.35),
      rgba(34, 197, 94, 0.35),
      rgba(59, 130, 246, 0.35)
    );
    filter: blur(25px);
    z-index: -1;
    animation: splash-title-glow 5s ease-in-out infinite;
    opacity: 0.75;
    transform: translateZ(0);
    will-change: transform, opacity;
  }

  @keyframes splash-title-glow {
    0%, 100% { opacity: 0.6; transform: scale(1) translateZ(0); }
    50% { opacity: 0.95; transform: scale(1.12) translateZ(0); }
  }

  .lp-splash-subtitle {
    font-size: 16px;
    font-weight: 600;
    color: #94a3b8;
    margin: 0 0 24px 0;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    opacity: 0.95;
  }

  /* Divider profesional */
  .lp-splash-divider {
    width: 80px;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(99, 102, 241, 0.5),
      rgba(168, 85, 247, 0.5),
      rgba(99, 102, 241, 0.5),
      transparent
    );
    margin: 0 auto;
    border-radius: 2px;
  }

  /* Barra de progreso Ultra Profesional */
  .lp-splash-progress-container {
    width: 360px;
    margin-bottom: 52px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-splash-progress-label {
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 16px;
    text-align: center;
    opacity: 0.8;
  }

  .lp-splash-progress-track {
    width: 100%;
    height: 10px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    overflow: hidden;
    position: relative;
    box-shadow: 
      inset 0 2px 8px rgba(0, 0, 0, 0.6),
      0 0 25px rgba(99, 102, 241, 0.15);
  }

  .lp-splash-progress-bar {
    height: 100%;
    background: linear-gradient(
      90deg,
      #6366f1 0%,
      #8b5cf6 20%,
      #a855f7 40%,
      #22c55e 60%,
      #60a5fa 80%,
      #6366f1 100%
    );
    background-size: 400% 100%;
    border-radius: 999px;
    position: relative;
    transition: width 0.15s linear !important;
    animation: splash-progress-gradient 4s linear infinite;
    box-shadow:
      0 0 25px rgba(99, 102, 241, 0.7),
      0 0 50px rgba(168, 85, 247, 0.5),
      inset 0 0 12px rgba(255, 255, 255, 0.15);
    transform: translateZ(0);
    will-change: width;
  }

  .lp-splash-progress-glow {
    position: absolute;
    inset: -3px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    border-radius: 999px;
    animation: splash-progress-glow 2.5s ease-in-out infinite;
    pointer-events: none;
    transform: translateZ(0);
    will-change: transform;
  }

  @keyframes splash-progress-gradient {
    0% { background-position: 0% 0%; }
    100% { background-position: 400% 0%; }
  }

  @keyframes splash-progress-glow {
    0%, 100% { opacity: 0; transform: translateX(-50%) translateZ(0); }
    50% { opacity: 1; transform: translateX(50%) translateZ(0); }
  }

  .lp-splash-progress-shine {
    position: absolute;
    top: -4px;
    left: 0;
    right: 0;
    height: 18px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
    border-radius: 999px;
    animation: splash-progress-shine 3s ease-in-out infinite;
    transform: translateZ(0);
    will-change: transform;
  }

  @keyframes splash-progress-shine {
    0% { transform: translateX(-100%) translateZ(0); }
    100% { transform: translateX(100%) translateZ(0); }
  }

  .lp-splash-progress-percent {
    position: absolute;
    top: -36px;
    right: 0;
    font-size: 15px;
    font-weight: 700;
    color: #a5b4fc;
    letter-spacing: 0.12em;
    text-shadow: 
      0 0 20px rgba(165, 180, 252, 0.8),
      0 0 40px rgba(99, 102, 241, 0.5);
  }

  /* Tip Container Ultra Profesional */
  .lp-splash-tip-container {
    width: 100%;
    max-width: 440px;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-splash-tip {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px 40px;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 28px;
    box-shadow:
      0 12px 50px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 0 30px rgba(99, 102, 241, 0.2);
    animation: splash-tip-fade 1.5s ease-in-out;
    transform: translateZ(0);
  }

  @keyframes splash-tip-fade {
    0% {
      opacity: 0;
      transform: translateY(18px) scale(0.96) translateZ(0);
    }
    25% {
      opacity: 1;
      transform: translateY(0) scale(1) translateZ(0);
    }
    75% {
      opacity: 1;
      transform: translateY(0) scale(1) translateZ(0);
    }
    100% {
      opacity: 0.9;
      transform: translateY(-10px) scale(0.98) translateZ(0);
    }
  }

  .lp-splash-tip-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(99, 102, 241, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(99, 102, 241, 0.2);
  }

  .lp-splash-tip-icon {
    font-size: 28px;
    flex-shrink: 0;
    filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.7));
    animation: splash-tip-icon-bounce 3.5s ease-in-out infinite;
    transform: translateZ(0);
    will-change: transform;
  }

  @keyframes splash-tip-icon-bounce {
    0%, 100% { transform: translateY(0) translateZ(0); }
    50% { transform: translateY(-6px) translateZ(0); }
  }

  .lp-splash-tip-text {
    font-size: 15px;
    color: #e2e8f0;
    line-height: 1.75;
    text-align: left;
    font-weight: 500;
    flex: 1;
  }

  /* Footer Profesional */
  .lp-splash-footer {
    position: absolute;
    bottom: 64px;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 3;
  }

  .lp-splash-footer-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
    letter-spacing: 0.1em;
    padding: 0 32px;
    margin: 0 auto;
  }

  .lp-splash-footer-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #6366f1;
    box-shadow: 
      0 0 20px rgba(99, 102, 241, 1),
      0 0 40px rgba(99, 102, 241, 0.6);
    animation: splash-footer-dot-pulse 2s ease-in-out infinite;
    transform: translateZ(0);
    will-change: transform, opacity;
  }

  @keyframes splash-footer-dot-pulse {
    0%, 100% {
      transform: scale(1) translateZ(0);
      opacity: 1;
    }
    50% {
      transform: scale(1.6) translateZ(0);
      opacity: 0.85;
    }
  }

  /* ============================================
     OPTIMIZACIONES MÓVIL
     ============================================ */
  @media (max-width: 768px) {
    .lp-splash {
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
      padding: 0 24px;
      width: 100%;
      max-width: 100%;
    }

    .lp-splash-logo-container {
      width: 160px;
      height: 160px;
      margin-bottom: 40px;
    }

    .lp-splash-logo {
      width: 140px;
      height: 140px;
      border-radius: 30px;
    }

    .lp-splash-title {
      font-size: 52px;
    }

    .lp-splash-subtitle {
      font-size: 15px;
    }

    .lp-splash-progress-container {
      width: 300px;
      margin-bottom: 44px;
    }

    .lp-splash-tip {
      padding: 22px 32px;
      max-width: 380px;
      gap: 18px;
    }

    .lp-splash-tip-icon-wrapper {
      width: 44px;
      height: 44px;
    }

    .lp-splash-tip-icon {
      font-size: 26px;
    }

    .lp-splash-tip-text {
      font-size: 14px;
    }

    .lp-splash-footer {
      bottom: 52px;
    }

    .lp-splash-footer-content {
      font-size: 13px;
    }

    .lp-splash-bg-glow {
      width: 800px;
      height: 800px;
      filter: blur(70px);
    }

    .lp-splash-bg-particles {
      background-size: 400px 300px;
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
    .lp-splash-logo-ring,
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
