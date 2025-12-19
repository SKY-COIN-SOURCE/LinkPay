import React, { useState, useEffect, useRef } from 'react';

// Consejos que rotan mientras carga - MILES DE CONSEJOS VARIADOS
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
    { icon: '📚', text: 'Organiza tus enlaces en categorías para mejor navegación' },
    { icon: '🌟', text: 'Destaca tus enlaces más importantes en tu BioPage' },
    { icon: '🎪', text: 'Crea landing pages personalizadas para eventos especiales' },
    { icon: '💼', text: 'Usa LinkPay para tu portafolio profesional' },
    { icon: '🎵', text: 'Comparte tus canciones y álbumes con enlaces directos' },
    { icon: '📖', text: 'Monetiza tu blog con enlaces a tus artículos' },
    { icon: '🎮', text: 'Crea enlaces para tus streams y contenido gaming' },
    { icon: '🏃', text: 'Comparte tus rutinas de ejercicio y planes de entrenamiento' },
    { icon: '🍳', text: 'Monetiza tus recetas y tutoriales de cocina' },
    { icon: '✈️', text: 'Comparte tus viajes y recomendaciones de destinos' },
    { icon: '📝', text: 'Usa QR codes para compartir tus links offline' },
    { icon: '🎓', text: 'Crea cursos y comparte el material con enlaces protegidos' },
    { icon: '💻', text: 'Comparte recursos de programación y herramientas útiles' },
    { icon: '🎭', text: 'Monetiza tu contenido artístico y creativo' },
    { icon: '📱', text: 'Añade tu BioPage a tu perfil de Instagram' },
    { icon: '🐦', text: 'Comparte tus Smart Links en Twitter para más alcance' },
    { icon: '📘', text: 'Añade tus enlaces a tu perfil de Facebook' },
    { icon: '💬', text: 'Comparte tus links en grupos de Telegram y WhatsApp' },
    { icon: '🎥', text: 'Incluye tus enlaces en la descripción de tus videos' },
    { icon: '📧', text: 'Añade tus Smart Links a tu firma de email' },
    { icon: '🏆', text: 'Los creadores top ganan más de $1000/mes con LinkPay' },
    { icon: '💳', text: 'Configura tus métodos de pago para recibir ganancias rápido' },
    { icon: '📅', text: 'Programa tus publicaciones para mantener consistencia' },
    { icon: '🎨', text: 'Experimenta con diferentes estilos de BioPage' },
    { icon: '🔔', text: 'Activa notificaciones para estar al día con tus estadísticas' },
    { icon: '📊', text: 'Revisa tus métricas diarias para optimizar tu estrategia' },
    { icon: '💡', text: 'Los enlaces cortos son más fáciles de recordar y compartir' },
    { icon: '🎯', text: 'Enfócate en nichos específicos para mejores resultados' },
    { icon: '🚀', text: 'Usa A/B testing para encontrar los mejores títulos' },
    { icon: '💎', text: 'Los usuarios Premium tienen prioridad en soporte' },
    { icon: '🌟', text: 'Sé consistente con tu marca personal en todos los enlaces' },
    { icon: '📱', text: 'Prueba tus links en diferentes dispositivos antes de publicar' },
    { icon: '🔍', text: 'Usa analytics para entender el comportamiento de tu audiencia' },
    { icon: '💬', text: 'Interactúa con tus seguidores a través de tus BioPages' },
    { icon: '🎁', text: 'Crea enlaces exclusivos para tus suscriptores más fieles' },
    { icon: '📈', text: 'Compara tus métricas semana a semana para ver el crecimiento' },
    { icon: '🌐', text: 'Traduce tus descripciones para llegar a audiencias globales' },
    { icon: '🎪', text: 'Organiza tus enlaces por temporadas y eventos' },
    { icon: '💼', text: 'Usa LinkPay para tu negocio y genera ingresos pasivos' },
    { icon: '🎵', text: 'Comparte playlists y recomendaciones musicales' },
    { icon: '📖', text: 'Monetiza tus reseñas de libros y recomendaciones' },
    { icon: '🎮', text: 'Crea enlaces para tus guías de videojuegos' },
    { icon: '🏃', text: 'Comparte tus logros fitness y motivación' },
    { icon: '🍳', text: 'Monetiza tus tutoriales de cocina y recetas' },
    { icon: '✈️', text: 'Comparte tus experiencias de viaje y recomendaciones' },
    { icon: '📝', text: 'Usa QR codes en eventos físicos para dirigir tráfico online' },
    { icon: '🎓', text: 'Crea contenido educativo y monetízalo con enlaces' },
    { icon: '💻', text: 'Comparte recursos técnicos y herramientas para desarrolladores' },
    { icon: '🎭', text: 'Monetiza tu arte digital y contenido creativo' },
    { icon: '📱', text: 'Optimiza tu BioPage para que se vea perfecta en móviles' },
    { icon: '🐦', text: 'Usa hashtags relevantes al compartir en redes sociales' },
    { icon: '📘', text: 'Crea contenido específico para cada plataforma social' },
    { icon: '💬', text: 'Responde a comentarios y construye una comunidad activa' },
    { icon: '🎥', text: 'Incluye llamadas a la acción en tus videos' },
    { icon: '📧', text: 'Usa email marketing con tus Smart Links' },
    { icon: '🏆', text: 'Establece metas mensuales de clics y ganancias' },
    { icon: '💳', text: 'Diversifica tus fuentes de ingresos con múltiples enlaces' },
    { icon: '📅', text: 'Crea un calendario de contenido para mantenerte organizado' },
    { icon: '🎨', text: 'Mantén una identidad visual consistente en todos tus enlaces' },
    { icon: '🔔', text: 'Revisa tus notificaciones regularmente para no perder oportunidades' },
    { icon: '📊', text: 'Usa gráficos y visualizaciones para entender mejor tus datos' },
    { icon: '💡', text: 'Los enlaces con emojis reciben 25% más clics' },
    { icon: '🎯', text: 'Define tu público objetivo para crear contenido más efectivo' },
    { icon: '🚀', text: 'Colabora con otros creadores para ampliar tu alcance' },
    { icon: '💎', text: 'Invierte en Premium para desbloquear todo el potencial' },
    { icon: '🌟', text: 'Sé auténtico - tu audiencia valora la autenticidad' },
    { icon: '📱', text: 'Asegúrate de que todos tus enlaces funcionen en móviles' },
    { icon: '🔍', text: 'Investiga qué tipo de contenido funciona mejor en tu nicho' },
    { icon: '💬', text: 'Crea contenido que invite a la interacción y participación' },
    { icon: '🎁', text: 'Ofrece valor antes de pedir algo a cambio' },
    { icon: '📈', text: 'Celebra tus pequeños logros y compártelos con tu audiencia' },
    { icon: '🌐', text: 'Considera crear contenido en múltiples idiomas' },
    { icon: '🎪', text: 'Organiza tus enlaces por categorías temáticas' },
    { icon: '💼', text: 'Trata tu presencia online como un negocio serio' },
    { icon: '🎵', text: 'Comparte música que inspire y motive a tu audiencia' },
    { icon: '📖', text: 'Crea contenido educativo que resuelva problemas reales' },
    { icon: '🎮', text: 'Comparte tus estrategias y tips de gaming' },
    { icon: '🏃', text: 'Motiva a otros con tu transformación personal' },
    { icon: '🍳', text: 'Comparte recetas que sean fáciles de seguir' },
    { icon: '✈️', text: 'Crea guías de viaje detalladas y útiles' },
    { icon: '📝', text: 'Usa enlaces para crear una biblioteca de recursos' },
    { icon: '🎓', text: 'Comparte conocimiento y construye autoridad en tu nicho' },
    { icon: '💻', text: 'Ayuda a otros desarrolladores con recursos útiles' },
    { icon: '🎭', text: 'Expresa tu creatividad a través de tus enlaces' },
    { icon: '📱', text: 'Aprovecha las notificaciones push para mantener engagement' },
    { icon: '🐦', text: 'Usa Twitter para compartir actualizaciones rápidas' },
    { icon: '📘', text: 'Crea grupos de Facebook para tu comunidad' },
    { icon: '💬', text: 'Usa Telegram para crear comunidades más íntimas' },
    { icon: '🎥', text: 'Crea series de videos y compártelas con enlaces' },
    { icon: '📧', text: 'Construye una lista de email con contenido valioso' },
    { icon: '🏆', text: 'Participa en desafíos y competiciones de la comunidad' },
    { icon: '💳', text: 'Diversifica tus métodos de monetización' },
    { icon: '📅', text: 'Planifica tu contenido con anticipación' },
    { icon: '🎨', text: 'Experimenta con diferentes formatos de contenido' },
    { icon: '🔔', text: 'Mantén a tu audiencia informada sobre nuevos enlaces' },
    { icon: '📊', text: 'Aprende de tus métricas y ajusta tu estrategia' },
    { icon: '💡', text: 'Los mejores creadores prueban constantemente nuevas ideas' },
    { icon: '🎯', text: 'Enfócate en crear valor, las ganancias vendrán después' },
    { icon: '🚀', text: 'No tengas miedo de experimentar con contenido nuevo' },
    { icon: '💎', text: 'Invierte en herramientas Premium que te ayuden a crecer' },
    { icon: '🌟', text: 'Sé consistente - la consistencia construye audiencias' },
    { icon: '📱', text: 'Optimiza cada aspecto de tu presencia móvil' },
    { icon: '🔍', text: 'Investiga a tus competidores y aprende de ellos' },
    { icon: '💬', text: 'Construye relaciones genuinas con tu audiencia' },
    { icon: '🎁', text: 'Sorprende a tu audiencia con contenido inesperado' },
    { icon: '📈', text: 'Establece KPIs claros y trabaja para alcanzarlos' },
    { icon: '🌐', text: 'Piensa globalmente pero actúa localmente' },
    { icon: '🎪', text: 'Crea experiencias memorables para tus seguidores' },
    { icon: '💼', text: 'Trata cada enlace como una oportunidad de negocio' },
    { icon: '🎵', text: 'Usa música para crear atmósfera en tu contenido' },
    { icon: '📖', text: 'Comparte historias que inspiren y motiven' },
    { icon: '🎮', text: 'Crea contenido gaming que entretenga y eduque' },
    { icon: '🏃', text: 'Comparte tu viaje personal para inspirar a otros' },
    { icon: '🍳', text: 'Haz que la cocina sea accesible para todos' },
    { icon: '✈️', text: 'Ayuda a otros a descubrir nuevos destinos' },
    { icon: '📝', text: 'Crea recursos descargables y compártelos con enlaces' },
    { icon: '🎓', text: 'Comparte tu conocimiento y experiencia' },
    { icon: '💻', text: 'Ayuda a otros a aprender nuevas habilidades técnicas' },
    { icon: '🎭', text: 'Expresa tu arte de manera única y auténtica' },
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
        // Forzar que el splash sea visible inmediatamente
        const splashEl = document.querySelector('.lp-splash') as HTMLElement;
        if (splashEl) {
            splashEl.style.display = 'flex';
            splashEl.style.visibility = 'visible';
            splashEl.style.opacity = '1';
            splashEl.style.zIndex = '999999';
        }

        // Rotar tips cada 1.5 segundos
        const tipInterval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % TIPS.length);
        }, 1500);

        // Progreso de carga usando requestAnimationFrame para suavidad
        const updateProgress = () => {
            const elapsed = Date.now() - startTimeRef.current;
            // Progreso más suave con easing
            const progressRatio = elapsed / minDuration;
            const easedProgress = progressRatio < 0.5 
                ? 2 * progressRatio * progressRatio 
                : 1 - Math.pow(-2 * progressRatio + 2, 2) / 2;
            const newProgress = Math.min(easedProgress * 100, 100);
            setProgress(newProgress);

            if (elapsed < minDuration) {
                animationFrameRef.current = requestAnimationFrame(updateProgress);
            } else {
                // CRÍTICO: Pre-cargar y mostrar la app ANTES del fade-out del splash
                const appShell = document.querySelector('.lp-app-shell') as HTMLElement;
                const root = document.getElementById('root');
                
                // Asegurar que la app esté lista y visible
                if (appShell) {
                    // Remover clase hidden primero
                    appShell.classList.remove('lp-hidden');
                    // Forzar visibilidad inmediata pero con opacity 0
                    appShell.style.visibility = 'visible';
                    appShell.style.opacity = '0';
                    appShell.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    appShell.style.zIndex = '1';
                }
                
                // Asegurar que el root tenga el fondo correcto
                if (root) {
                    root.style.background = 'linear-gradient(180deg, #020617 0%, #0f172a 25%, #1e293b 50%, #0f172a 75%, #020617 100%)';
                    root.style.opacity = '1';
                }
                
                // Iniciar fade-in de la app inmediatamente
                requestAnimationFrame(() => {
                    if (appShell) {
                        appShell.style.opacity = '1';
                    }
                });
                
                // Fade-out suave del splash DESPUÉS de que la app empiece a aparecer
                setTimeout(() => {
                    setFadeOut(true);
                }, 50);
                
                // Completar después de que ambas transiciones terminen
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
            className={`lp-splash ${fadeOut ? 'fade-out' : ''}`}
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
                transform: 'none',
                transformOrigin: 'center center',
                visibility: 'visible',
                opacity: 1,
                background: '#020617',
            }}
        >
            <style>{splashStyles}</style>

            {/* FONDO PREMIUM PERSONALIZADO - Igual que Dashboard */}
            <div className="lp-splash-bg">
                <div className="lp-splash-bg-base" />
                <div className="lp-splash-bg-gradient" />
                <div className="lp-splash-bg-glow" />
                <div className="lp-splash-bg-particles" />
                <div className="lp-splash-bg-orb" />
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
     SPLASH SCREEN ULTRA PREMIUM - MARTÍN ANDRIGHETTI
     FONDO PERSONALIZADO PREMIUM - MOBILE FIRST
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
    transform: none !important;
    transform-origin: center center !important;
    text-align: center !important;
    visibility: visible !important;
    opacity: 1 !important;
    background: #020617 !important;
    /* Asegurar que esté por encima de TODO */
    isolation: isolate !important;
  }

  /* CRÍTICO: Móvil - asegurar visibilidad */
  @media (max-width: 768px) {
    .lp-splash {
      height: 100vh !important;
      height: calc(var(--vh, 1vh) * 100) !important;
      height: 100dvh !important;
      transform: none !important;
      transform-origin: center center !important;
      visibility: visible !important;
      opacity: 1 !important;
      display: flex !important;
      z-index: 999999 !important;
      background: #020617 !important;
    }
  }

  .lp-splash.fade-out {
    opacity: 0 !important;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
    pointer-events: none !important;
  }

  /* === FONDO PREMIUM PERSONALIZADO - IGUAL QUE DASHBOARD === */
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
  }

  /* Base gradient oscuro - VISIBLE DESDE EL INICIO */
  .lp-splash-bg-base {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg,
      #020617 0%,
      #0f172a 25%,
      #1e293b 50%,
      #0f172a 75%,
      #020617 100%);
    z-index: 1;
    opacity: 1;
  }

  /* Gradientes de luminosidad */
  .lp-splash-bg-gradient {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 150% 80% at 50% -20%, rgba(99, 102, 241, 0.3) 0%, rgba(99, 102, 241, 0.15) 30%, transparent 55%),
      radial-gradient(ellipse 100% 80% at 15% 20%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse 90% 70% at 85% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 45%),
      radial-gradient(ellipse 100% 60% at 50% 95%, rgba(34, 197, 94, 0.15) 0%, transparent 50%);
    z-index: 2;
    opacity: 1;
    animation: splash-bg-fade 0.5s ease-out;
  }

  @keyframes splash-bg-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Glow central pulsante */
  .lp-splash-bg-glow {
    position: absolute;
    top: -250px;
    left: 50%;
    transform: translateX(-50%);
    width: 1000px;
    height: 1000px;
    background: radial-gradient(circle,
      rgba(99, 102, 241, 0.4) 0%,
      rgba(168, 85, 247, 0.3) 20%,
      rgba(59, 130, 246, 0.2) 40%,
      transparent 65%);
    pointer-events: none;
    z-index: 3;
    animation: splash-glow-pulse 4s ease-in-out infinite alternate;
  }

  @keyframes splash-glow-pulse {
    0% { opacity: 0.6; transform: translateX(-50%) scale(1); }
    100% { opacity: 1; transform: translateX(-50%) scale(1.1); }
  }

  /* Partículas flotantes */
  .lp-splash-bg-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.6;
    z-index: 2;
    background-image:
      radial-gradient(2px 2px at 12% 18%, rgba(99, 102, 241, 0.4), transparent),
      radial-gradient(2px 2px at 28% 32%, rgba(168, 85, 247, 0.3), transparent),
      radial-gradient(3px 3px at 45% 12%, rgba(59, 130, 246, 0.35), transparent),
      radial-gradient(2px 2px at 58% 42%, rgba(34, 197, 94, 0.3), transparent),
      radial-gradient(2px 2px at 72% 22%, rgba(99, 102, 241, 0.25), transparent),
      radial-gradient(3px 3px at 88% 48%, rgba(168, 85, 247, 0.4), transparent),
      radial-gradient(2px 2px at 8% 68%, rgba(59, 130, 246, 0.3), transparent),
      radial-gradient(2px 2px at 32% 78%, rgba(34, 197, 94, 0.35), transparent),
      radial-gradient(3px 3px at 62% 72%, rgba(99, 102, 241, 0.3), transparent),
      radial-gradient(2px 2px at 82% 82%, rgba(168, 85, 247, 0.25), transparent),
      radial-gradient(2px 2px at 48% 58%, rgba(59, 130, 246, 0.3), transparent),
      radial-gradient(3px 3px at 18% 88%, rgba(34, 197, 94, 0.4), transparent);
    background-size: 450px 350px;
    animation: splash-particles-float 25s linear infinite;
  }

  @keyframes splash-particles-float {
    0% { transform: translateY(0); }
    100% { transform: translateY(-200px); }
  }

  /* Orb flotante inferior */
  .lp-splash-bg-orb {
    position: absolute;
    width: 600px;
    height: 600px;
    bottom: -5%;
    right: -15%;
    background: radial-gradient(circle,
      rgba(168, 85, 247, 0.3) 0%,
      rgba(99, 102, 241, 0.2) 35%,
      transparent 60%);
    border-radius: 50%;
    filter: blur(60px);
    animation: splash-orb-float 18s ease-in-out infinite;
    pointer-events: none;
    z-index: 2;
  }

  @keyframes splash-orb-float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-30px, -40px) scale(1.1); }
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
  }

  /* Logo Container Premium */
  .lp-splash-logo-container {
    position: relative;
    width: 150px;
    height: 150px;
    margin-bottom: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  /* Orb de fondo animado */
  .lp-splash-logo-orb {
    position: absolute;
    inset: -45px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      rgba(99, 102, 241, 0.25),
      rgba(168, 85, 247, 0.25),
      rgba(34, 197, 94, 0.25),
      rgba(99, 102, 241, 0.25)
    );
    animation: splash-orb-rotate 4.5s linear infinite;
    filter: blur(22px);
    will-change: transform;
  }

  @keyframes splash-orb-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Glow pulsante */
  .lp-splash-logo-glow {
    position: absolute;
    inset: -28px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.55) 0%, transparent 70%);
    animation: splash-glow-pulse 2.8s ease-in-out infinite;
    will-change: transform, opacity;
    filter: blur(18px);
  }

  @keyframes splash-glow-pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.55;
    }
    50% {
      transform: scale(1.35);
      opacity: 0.95;
    }
  }

  .lp-splash-logo {
    position: relative;
    width: 130px;
    height: 130px;
    border-radius: 30px;
    overflow: hidden;
    box-shadow:
      0 0 90px rgba(99, 102, 241, 0.7),
      0 0 50px rgba(168, 85, 247, 0.5),
      inset 0 0 50px rgba(99, 102, 241, 0.25);
    animation: splash-logo-float 4.5s ease-in-out infinite;
    will-change: transform;
    margin: 0 auto;
  }

  @keyframes splash-logo-float {
    0%, 100% { 
      transform: translateY(0) scale(1); 
    }
    50% { 
      transform: translateY(-12px) scale(1.04); 
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
      rgba(255, 255, 255, 0.35) 50%,
      transparent 100%
    );
    animation: splash-logo-shine 4s ease-in-out infinite;
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
    margin-bottom: 44px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-splash-title {
    font-size: 52px;
    font-weight: 900;
    letter-spacing: -0.05em;
    margin: 0 0 12px 0;
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
      #a5b4fc 80%,
      #ffffff 100%
    );
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: splash-title-gradient 5s ease infinite;
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
    inset: -12px;
    background: linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.35),
      rgba(168, 85, 247, 0.35),
      rgba(34, 197, 94, 0.35)
    );
    filter: blur(25px);
    z-index: -1;
    animation: splash-title-glow 3.5s ease-in-out infinite;
    opacity: 0.7;
  }

  @keyframes splash-title-glow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.12); }
  }

  .lp-splash-subtitle {
    font-size: 15px;
    font-weight: 600;
    color: #94a3b8;
    margin: 0;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    opacity: 0.9;
  }

  /* Barra de progreso Premium */
  .lp-splash-progress-container {
    width: 300px;
    margin-bottom: 44px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-splash-progress-track {
    width: 100%;
    height: 7px;
    background: rgba(255, 255, 255, 0.12);
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
      #8b5cf6 20%,
      #a855f7 40%,
      #22c55e 60%,
      #a855f7 80%,
      #6366f1 100%
    );
    background-size: 400% 100%;
    border-radius: 999px;
    position: relative;
    transition: width 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
    animation: splash-progress-gradient 3.5s linear infinite;
    will-change: width, transform;
    box-shadow:
      0 0 25px rgba(99, 102, 241, 0.7),
      0 0 50px rgba(168, 85, 247, 0.5);
    transform: translateZ(0);
  }

  @keyframes splash-progress-gradient {
    0% { background-position: 0% 0%; }
    100% { background-position: 400% 0%; }
  }

  .lp-splash-progress-shine {
    position: absolute;
    top: -3px;
    left: 0;
    right: 0;
    height: 13px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.5) 0%,
      transparent 100%
    );
    border-radius: 999px;
    animation: splash-progress-shine 2.5s ease-in-out infinite;
    will-change: transform;
  }

  @keyframes splash-progress-shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .lp-splash-progress-percent {
    position: absolute;
    top: -28px;
    right: 0;
    font-size: 13px;
    font-weight: 700;
    color: #a5b4fc;
    letter-spacing: 0.12em;
    text-shadow: 0 0 15px rgba(165, 180, 252, 0.7);
  }

  /* Tip rotativo Premium */
  .lp-splash-tip-container {
    width: 100%;
    max-width: 380px;
    min-height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-splash-tip {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 32px;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 22px;
    box-shadow:
      0 10px 40px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
    animation: splash-tip-fade 1.5s ease-in-out;
    will-change: opacity, transform;
  }

  @keyframes splash-tip-fade {
    0% {
      opacity: 0;
      transform: translateY(18px) scale(0.94);
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
      opacity: 0.75;
      transform: translateY(-10px) scale(0.97);
    }
  }

  .lp-splash-tip-icon {
    font-size: 30px;
    flex-shrink: 0;
    filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.6));
    animation: splash-tip-icon-bounce 2.8s ease-in-out infinite;
    will-change: transform;
  }

  @keyframes splash-tip-icon-bounce {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-5px) scale(1.12); }
  }

  .lp-splash-tip-text {
    font-size: 14px;
    color: #cbd5e1;
    line-height: 1.65;
    text-align: left;
    font-weight: 500;
  }

  /* Footer Premium */
  .lp-splash-footer {
    position: absolute;
    bottom: 52px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 13px;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-weight: 500;
    letter-spacing: 0.06em;
    padding: 0 24px;
    margin: 0 auto;
    z-index: 3;
  }

  .lp-splash-footer-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #6366f1;
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.9);
    animation: splash-footer-dot-pulse 1.6s ease-in-out infinite;
    will-change: transform, opacity;
  }

  @keyframes splash-footer-dot-pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.75;
    }
  }

  /* ============================================
     OPTIMIZACIONES MÓVIL - MOBILE FIRST CRÍTICO
     ============================================ */
  @media (max-width: 768px) {
    .lp-splash {
      height: 100vh !important;
      height: calc(var(--vh, 1vh) * 100) !important;
      height: 100dvh !important;
      transform: none !important;
      transform-origin: center center !important;
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

    .lp-splash-wrapper {
      width: 100% !important;
      height: 100% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    .lp-splash-content {
      padding: 0 20px;
      width: 100%;
      max-width: 100%;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
    }

    .lp-splash-logo-container {
      width: 130px;
      height: 130px;
      margin-bottom: 32px;
      display: flex !important;
    }

    .lp-splash-logo {
      width: 110px;
      height: 110px;
      border-radius: 26px;
      display: block !important;
    }

    .lp-splash-logo-img {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }

    .lp-splash-logo-orb {
      inset: -35px;
      filter: blur(18px);
      display: block !important;
    }

    .lp-splash-logo-glow {
      inset: -24px;
      filter: blur(14px);
      display: block !important;
    }

    .lp-splash-title {
      font-size: 44px;
      display: block !important;
      visibility: visible !important;
    }

    .lp-splash-title-text {
      display: inline-block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }

    .lp-splash-subtitle {
      font-size: 14px;
      display: block !important;
      visibility: visible !important;
    }

    .lp-splash-progress-container {
      width: 260px;
      margin-bottom: 36px;
      display: block !important;
      visibility: visible !important;
    }

    .lp-splash-progress-track {
      height: 6px;
      display: block !important;
    }

    .lp-splash-progress-bar {
      display: block !important;
      visibility: visible !important;
    }

    .lp-splash-tip {
      padding: 18px 26px;
      max-width: 340px;
      gap: 14px;
      display: flex !important;
      visibility: visible !important;
    }

    .lp-splash-tip-icon {
      font-size: 26px;
      display: inline-block !important;
    }

    .lp-splash-tip-text {
      font-size: 13px;
      line-height: 1.6;
      display: inline-block !important;
    }

    .lp-splash-footer {
      bottom: 44px;
      font-size: 12px;
      display: flex !important;
      visibility: visible !important;
    }

    /* Optimizaciones de fondo en móvil */
    .lp-splash-bg {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }

    .lp-splash-bg-base {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }

    .lp-splash-bg-gradient {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }

    .lp-splash-bg-glow {
      width: 800px;
      height: 800px;
      filter: blur(80px);
      display: block !important;
      visibility: visible !important;
    }

    .lp-splash-bg-orb {
      width: 400px;
      height: 400px;
      filter: blur(50px);
      display: block !important;
      visibility: visible !important;
    }

    .lp-splash-bg-particles {
      background-size: 350px 250px;
      opacity: 0.5;
      display: block !important;
      visibility: visible !important;
    }
  }

  /* Reducir animaciones en dispositivos con preferencia de movimiento reducido */
  @media (prefers-reduced-motion: reduce) {
    .lp-splash-bg-gradient,
    .lp-splash-bg-glow,
    .lp-splash-bg-particles,
    .lp-splash-bg-orb,
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
