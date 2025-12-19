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
    const [isVisible, setIsVisible] = useState(false);
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

        // Animación de entrada suave
        requestAnimationFrame(() => {
            setIsVisible(true);
        });

        // Rotar tips cada 1.2 segundos (más rápido para más variedad)
        const tipInterval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % TIPS.length);
        }, 1200);

        // Progreso de carga usando requestAnimationFrame para suavidad máxima
        const updateProgress = () => {
            const elapsed = Date.now() - startTimeRef.current;
            // Progreso ultra suave con easing cubic
            const progressRatio = elapsed / minDuration;
            const easedProgress = progressRatio < 0.5
                ? 4 * progressRatio * progressRatio * progressRatio
                : 1 - Math.pow(-2 * progressRatio + 2, 3) / 2;
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
                    appShell.classList.remove('lp-hidden');
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
                transform: 'none',
                transformOrigin: 'center center',
                visibility: 'visible',
                opacity: 1,
                background: '#020617',
            }}
        >
            <style>{splashStyles}</style>

            {/* FONDO PREMIUM ULTRA MEJORADO - Múltiples capas de profundidad */}
            <div className="lp-splash-bg">
                <div className="lp-splash-bg-base" />
                <div className="lp-splash-bg-gradient" />
                <div className="lp-splash-bg-glow" />
                <div className="lp-splash-bg-glow-secondary" />
                <div className="lp-splash-bg-particles" />
                <div className="lp-splash-bg-particles-secondary" />
                <div className="lp-splash-bg-orb" />
                <div className="lp-splash-bg-orb-secondary" />
                <div className="lp-splash-bg-mesh" />
            </div>

            {/* Contenido principal - perfectamente centrado con animación de entrada */}
            <div className="lp-splash-wrapper">
                <div className={`lp-splash-content ${isVisible ? 'content-visible' : ''}`}>
                    {/* Logo con efectos premium mejorados */}
                    <div className="lp-splash-logo-container">
                        <div className="lp-splash-logo-orb" />
                        <div className="lp-splash-logo-orb-secondary" />
                        <div className="lp-splash-logo-glow" />
                        <div className="lp-splash-logo-glow-secondary" />
                        <div className="lp-splash-logo">
                            <img
                                src="/icons/icon-192.png"
                                alt="LinkPay"
                                className="lp-splash-logo-img"
                                loading="eager"
                            />
                            <div className="lp-splash-logo-shine" />
                            <div className="lp-splash-logo-shine-secondary" />
                        </div>
                    </div>

                    {/* Nombre de la app con efecto de brillo mejorado */}
                    <div className="lp-splash-title-container">
                        <h1 className="lp-splash-title">
                            <span className="lp-splash-title-text">LinkPay</span>
                            <span className="lp-splash-title-glow" />
                            <span className="lp-splash-title-glow-secondary" />
                        </h1>
                        <p className="lp-splash-subtitle">Creator Studio</p>
                    </div>

                    {/* Barra de progreso premium mejorada */}
                    <div className="lp-splash-progress-container">
                        <div className="lp-splash-progress-track">
                            <div
                                className="lp-splash-progress-bar"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="lp-splash-progress-shine" />
                                <div className="lp-splash-progress-glow" />
                            </div>
                        </div>
                        <div className="lp-splash-progress-percent">{Math.round(progress)}%</div>
                    </div>

                    {/* Tip rotativo con animación mejorada */}
                    <div className="lp-splash-tip-container" key={currentTip}>
                        <div className="lp-splash-tip">
                            <span className="lp-splash-tip-icon">{tip.icon}</span>
                            <span className="lp-splash-tip-text">{tip.text}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer con efecto de pulso mejorado */}
            <div className="lp-splash-footer">
                <div className="lp-splash-footer-dot" />
                <div className="lp-splash-footer-dot-secondary" />
                <span>Cargando tu panel...</span>
            </div>
        </div>
    );
}

const splashStyles = `
  /* ============================================
     SPLASH SCREEN ULTRA PREMIUM - MARTÍN ANDRIGHETTI
     AUDITORÍA COMPLETA - MEJORAS MASIVAS
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
    isolation: isolate !important;
    backface-visibility: hidden !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;
  }

  .lp-splash.visible {
    animation: splash-fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes splash-fade-in {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .lp-splash.fade-out {
    opacity: 0 !important;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
    pointer-events: none !important;
  }

  /* === FONDO PREMIUM ULTRA MEJORADO - MÚLTIPLES CAPAS === */
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

  /* Base gradient oscuro mejorado */
  .lp-splash-bg-base {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg,
      #020617 0%,
      #0a0f1f 15%,
      #0f172a 25%,
      #1a2332 40%,
      #1e293b 50%,
      #1a2332 60%,
      #0f172a 75%,
      #0a0f1f 85%,
      #020617 100%);
    z-index: 1;
    opacity: 1;
  }

  /* Gradientes de luminosidad mejorados - más capas */
  .lp-splash-bg-gradient {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 180% 100% at 50% -25%, rgba(99, 102, 241, 0.35) 0%, rgba(99, 102, 241, 0.2) 25%, transparent 60%),
      radial-gradient(ellipse 120% 90% at 10% 15%, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0.15) 30%, transparent 55%),
      radial-gradient(ellipse 110% 80% at 90% 25%, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0.15) 35%, transparent 50%),
      radial-gradient(ellipse 130% 70% at 50% 100%, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 40%, transparent 55%),
      radial-gradient(ellipse 100% 60% at 25% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 45%),
      radial-gradient(ellipse 90% 50% at 75% 70%, rgba(236, 72, 153, 0.12) 0%, transparent 40%);
    z-index: 2;
    opacity: 1;
    animation: splash-bg-fade 0.6s ease-out;
  }

  @keyframes splash-bg-fade {
    from { opacity: 0; transform: scale(1.05); }
    to { opacity: 1; transform: scale(1); }
  }

  /* Glow central pulsante mejorado */
  .lp-splash-bg-glow {
    position: absolute;
    top: -300px;
    left: 50%;
    transform: translateX(-50%);
    width: 1200px;
    height: 1200px;
    background: radial-gradient(circle,
      rgba(99, 102, 241, 0.5) 0%,
      rgba(168, 85, 247, 0.4) 15%,
      rgba(59, 130, 246, 0.3) 30%,
      rgba(34, 197, 94, 0.2) 45%,
      transparent 70%);
    pointer-events: none;
    z-index: 3;
    animation: splash-glow-pulse 5s ease-in-out infinite alternate;
    filter: blur(100px);
  }

  .lp-splash-bg-glow-secondary {
    position: absolute;
    top: 50%;
    left: 20%;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle,
      rgba(168, 85, 247, 0.3) 0%,
      rgba(99, 102, 241, 0.2) 25%,
      transparent 55%);
    pointer-events: none;
    z-index: 2;
    animation: splash-glow-float 8s ease-in-out infinite;
    filter: blur(80px);
  }

  @keyframes splash-glow-pulse {
    0% { 
      opacity: 0.7; 
      transform: translateX(-50%) scale(1) rotate(0deg); 
    }
    100% { 
      opacity: 1; 
      transform: translateX(-50%) scale(1.15) rotate(5deg); 
    }
  }

  @keyframes splash-glow-float {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
    50% { transform: translate(50px, -30px) scale(1.2); opacity: 0.5; }
  }

  /* Partículas flotantes mejoradas - más partículas */
  .lp-splash-bg-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.7;
    z-index: 2;
    background-image:
      radial-gradient(2px 2px at 8% 12%, rgba(99, 102, 241, 0.5), transparent),
      radial-gradient(2px 2px at 18% 25%, rgba(168, 85, 247, 0.4), transparent),
      radial-gradient(3px 3px at 28% 8%, rgba(59, 130, 246, 0.45), transparent),
      radial-gradient(2px 2px at 38% 35%, rgba(34, 197, 94, 0.4), transparent),
      radial-gradient(2px 2px at 48% 18%, rgba(99, 102, 241, 0.3), transparent),
      radial-gradient(3px 3px at 58% 42%, rgba(168, 85, 247, 0.5), transparent),
      radial-gradient(2px 2px at 68% 28%, rgba(59, 130, 246, 0.35), transparent),
      radial-gradient(2px 2px at 78% 52%, rgba(34, 197, 94, 0.4), transparent),
      radial-gradient(3px 3px at 88% 15%, rgba(99, 102, 241, 0.4), transparent),
      radial-gradient(2px 2px at 12% 58%, rgba(168, 85, 247, 0.3), transparent),
      radial-gradient(2px 2px at 22% 72%, rgba(59, 130, 246, 0.4), transparent),
      radial-gradient(3px 3px at 32% 88%, rgba(34, 197, 94, 0.45), transparent),
      radial-gradient(2px 2px at 42% 65%, rgba(99, 102, 241, 0.35), transparent),
      radial-gradient(2px 2px at 52% 78%, rgba(168, 85, 247, 0.4), transparent),
      radial-gradient(3px 3px at 62% 55%, rgba(59, 130, 246, 0.3), transparent),
      radial-gradient(2px 2px at 72% 82%, rgba(34, 197, 94, 0.4), transparent),
      radial-gradient(2px 2px at 82% 68%, rgba(99, 102, 241, 0.35), transparent),
      radial-gradient(3px 3px at 92% 45%, rgba(168, 85, 247, 0.4), transparent);
    background-size: 500px 400px;
    animation: splash-particles-float 30s linear infinite;
  }

  .lp-splash-bg-particles-secondary {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.4;
    z-index: 2;
    background-image:
      radial-gradient(1px 1px at 15% 20%, rgba(255, 255, 255, 0.3), transparent),
      radial-gradient(1px 1px at 35% 40%, rgba(255, 255, 255, 0.25), transparent),
      radial-gradient(2px 2px at 55% 15%, rgba(255, 255, 255, 0.35), transparent),
      radial-gradient(1px 1px at 75% 50%, rgba(255, 255, 255, 0.3), transparent),
      radial-gradient(1px 1px at 25% 75%, rgba(255, 255, 255, 0.25), transparent),
      radial-gradient(2px 2px at 65% 85%, rgba(255, 255, 255, 0.3), transparent);
    background-size: 600px 500px;
    animation: splash-particles-float-reverse 35s linear infinite;
  }

  @keyframes splash-particles-float {
    0% { transform: translateY(0) translateX(0); }
    100% { transform: translateY(-250px) translateX(20px); }
  }

  @keyframes splash-particles-float-reverse {
    0% { transform: translateY(0) translateX(0); }
    100% { transform: translateY(200px) translateX(-15px); }
  }

  /* Orb flotante mejorado */
  .lp-splash-bg-orb {
    position: absolute;
    width: 700px;
    height: 700px;
    bottom: -8%;
    right: -18%;
    background: radial-gradient(circle,
      rgba(168, 85, 247, 0.4) 0%,
      rgba(99, 102, 241, 0.3) 30%,
      rgba(59, 130, 246, 0.2) 50%,
      transparent 65%);
    border-radius: 50%;
    filter: blur(70px);
    animation: splash-orb-float 20s ease-in-out infinite;
    pointer-events: none;
    z-index: 2;
  }

  .lp-splash-bg-orb-secondary {
    position: absolute;
    width: 500px;
    height: 500px;
    top: 60%;
    left: -10%;
    background: radial-gradient(circle,
      rgba(34, 197, 94, 0.3) 0%,
      rgba(59, 130, 246, 0.2) 35%,
      transparent 60%);
    border-radius: 50%;
    filter: blur(60px);
    animation: splash-orb-float-secondary 15s ease-in-out infinite;
    pointer-events: none;
    z-index: 2;
  }

  @keyframes splash-orb-float {
    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
    33% { transform: translate(-40px, -50px) scale(1.1) rotate(120deg); }
    66% { transform: translate(30px, -60px) scale(0.95) rotate(240deg); }
  }

  @keyframes splash-orb-float-secondary {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(60px, -50px) scale(1.15); }
  }

  /* Mesh pattern para más profundidad */
  .lp-splash-bg-mesh {
    position: absolute;
    inset: 0;
    opacity: 0.03;
    background-image: 
      linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: 1;
    pointer-events: none;
  }

  /* === CONTENIDO PRINCIPAL - MEJORADO === */
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
    transform: translateY(20px);
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .lp-splash-content.content-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Logo Container Premium Mejorado */
  .lp-splash-logo-container {
    position: relative;
    width: 160px;
    height: 160px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  /* Orb de fondo animado mejorado */
  .lp-splash-logo-orb {
    position: absolute;
    inset: -50px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      rgba(99, 102, 241, 0.3),
      rgba(168, 85, 247, 0.3),
      rgba(34, 197, 94, 0.3),
      rgba(59, 130, 246, 0.3),
      rgba(99, 102, 241, 0.3)
    );
    animation: splash-orb-rotate 5s linear infinite;
    filter: blur(25px);
    will-change: transform;
  }

  .lp-splash-logo-orb-secondary {
    position: absolute;
    inset: -35px;
    border-radius: 50%;
    background: conic-gradient(
      from 180deg,
      rgba(168, 85, 247, 0.25),
      rgba(99, 102, 241, 0.25),
      rgba(59, 130, 246, 0.25),
      rgba(34, 197, 94, 0.25),
      rgba(168, 85, 247, 0.25)
    );
    animation: splash-orb-rotate-reverse 6s linear infinite;
    filter: blur(20px);
    will-change: transform;
  }

  @keyframes splash-orb-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes splash-orb-rotate-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }

  /* Glow pulsante mejorado */
  .lp-splash-logo-glow {
    position: absolute;
    inset: -32px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%);
    animation: splash-glow-pulse-logo 3s ease-in-out infinite;
    will-change: transform, opacity;
    filter: blur(20px);
  }

  .lp-splash-logo-glow-secondary {
    position: absolute;
    inset: -25px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 65%);
    animation: splash-glow-pulse-logo-secondary 3.5s ease-in-out infinite;
    will-change: transform, opacity;
    filter: blur(16px);
  }

  @keyframes splash-glow-pulse-logo {
    0%, 100% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.4);
      opacity: 1;
    }
  }

  @keyframes splash-glow-pulse-logo-secondary {
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
    width: 140px;
    height: 140px;
    border-radius: 32px;
    overflow: hidden;
    box-shadow:
      0 0 100px rgba(99, 102, 241, 0.8),
      0 0 60px rgba(168, 85, 247, 0.6),
      0 0 30px rgba(59, 130, 246, 0.4),
      inset 0 0 60px rgba(99, 102, 241, 0.3);
    animation: splash-logo-float 5s ease-in-out infinite;
    will-change: transform;
    margin: 0 auto;
    transform: translateZ(0);
  }

  @keyframes splash-logo-float {
    0%, 100% { 
      transform: translateY(0) scale(1) rotate(0deg); 
    }
    50% { 
      transform: translateY(-15px) scale(1.05) rotate(2deg); 
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
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    );
    animation: splash-logo-shine 4.5s ease-in-out infinite;
    will-change: transform;
  }

  .lp-splash-logo-shine-secondary {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    animation: splash-logo-shine-secondary 5.5s ease-in-out infinite;
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

  @keyframes splash-logo-shine-secondary {
    0% { 
      transform: translateX(200%) translateY(200%) rotate(-45deg); 
    }
    100% { 
      transform: translateX(-100%) translateY(-100%) rotate(-45deg); 
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
    font-size: 56px;
    font-weight: 900;
    letter-spacing: -0.06em;
    margin: 0 0 14px 0;
    position: relative;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    text-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
  }

  .lp-splash-title-text {
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      #a5b4fc 15%,
      #c084fc 30%,
      #4ade80 50%,
      #60a5fa 70%,
      #a5b4fc 85%,
      #ffffff 100%
    );
    background-size: 500% 500%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: splash-title-gradient 6s ease infinite;
    will-change: background-position;
    display: inline-block;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.4));
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
      rgba(99, 102, 241, 0.4),
      rgba(168, 85, 247, 0.4),
      rgba(34, 197, 94, 0.4),
      rgba(59, 130, 246, 0.4)
    );
    filter: blur(30px);
    z-index: -1;
    animation: splash-title-glow 4s ease-in-out infinite;
    opacity: 0.8;
  }

  .lp-splash-title-glow-secondary {
    position: absolute;
    inset: -20px;
    background: radial-gradient(
      ellipse 120% 100%,
      rgba(99, 102, 241, 0.25),
      transparent 70%
    );
    filter: blur(40px);
    z-index: -2;
    animation: splash-title-glow-secondary 5s ease-in-out infinite;
    opacity: 0.6;
  }

  @keyframes splash-title-glow {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.15); }
  }

  @keyframes splash-title-glow-secondary {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.2); }
  }

  .lp-splash-subtitle {
    font-size: 16px;
    font-weight: 600;
    color: #94a3b8;
    margin: 0;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    opacity: 0.95;
    text-shadow: 0 0 15px rgba(148, 163, 184, 0.3);
  }

  /* Barra de progreso Premium Mejorada */
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
    box-shadow: 
      inset 0 2px 8px rgba(0, 0, 0, 0.6),
      0 0 20px rgba(99, 102, 241, 0.2);
  }

  .lp-splash-progress-bar {
    height: 100%;
    background: linear-gradient(
      90deg,
      #6366f1 0%,
      #8b5cf6 15%,
      #a855f7 30%,
      #22c55e 50%,
      #60a5fa 70%,
      #a855f7 85%,
      #6366f1 100%
    );
    background-size: 500% 100%;
    border-radius: 999px;
    position: relative;
    transition: width 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
    animation: splash-progress-gradient 4s linear infinite;
    will-change: width, transform;
    box-shadow:
      0 0 30px rgba(99, 102, 241, 0.8),
      0 0 60px rgba(168, 85, 247, 0.6),
      inset 0 0 10px rgba(255, 255, 255, 0.2);
    transform: translateZ(0);
  }

  .lp-splash-progress-glow {
    position: absolute;
    inset: -2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    border-radius: 999px;
    animation: splash-progress-glow 2s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes splash-progress-gradient {
    0% { background-position: 0% 0%; }
    100% { background-position: 500% 0%; }
  }

  @keyframes splash-progress-glow {
    0%, 100% { opacity: 0; transform: translateX(-50%); }
    50% { opacity: 1; transform: translateX(50%); }
  }

  .lp-splash-progress-shine {
    position: absolute;
    top: -4px;
    left: 0;
    right: 0;
    height: 16px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.3) 50%,
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
    top: -32px;
    right: 0;
    font-size: 14px;
    font-weight: 700;
    color: #a5b4fc;
    letter-spacing: 0.14em;
    text-shadow: 
      0 0 20px rgba(165, 180, 252, 0.8),
      0 0 40px rgba(99, 102, 241, 0.5);
  }

  /* Tip rotativo Premium Mejorado */
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
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 24px;
    box-shadow:
      0 12px 50px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 0 30px rgba(99, 102, 241, 0.2);
    animation: splash-tip-fade 1.2s ease-in-out;
    will-change: opacity, transform;
    transform: translateZ(0);
  }

  @keyframes splash-tip-fade {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.92);
    }
    20% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    80% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0.8;
      transform: translateY(-12px) scale(0.98);
    }
  }

  .lp-splash-tip-icon {
    font-size: 32px;
    flex-shrink: 0;
    filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.7));
    animation: splash-tip-icon-bounce 3s ease-in-out infinite;
    will-change: transform;
  }

  @keyframes splash-tip-icon-bounce {
    0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
    50% { transform: translateY(-6px) scale(1.15) rotate(5deg); }
  }

  .lp-splash-tip-text {
    font-size: 15px;
    color: #e2e8f0;
    line-height: 1.7;
    text-align: left;
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  /* Footer Premium Mejorado */
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
    box-shadow: 
      0 0 20px rgba(99, 102, 241, 1),
      0 0 40px rgba(99, 102, 241, 0.6);
    animation: splash-footer-dot-pulse 1.8s ease-in-out infinite;
    will-change: transform, opacity;
  }

  .lp-splash-footer-dot-secondary {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(99, 102, 241, 0.4);
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.8);
    animation: splash-footer-dot-pulse-secondary 2.2s ease-in-out infinite;
    will-change: transform, opacity;
  }

  @keyframes splash-footer-dot-pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.6);
      opacity: 0.8;
    }
  }

  @keyframes splash-footer-dot-pulse-secondary {
    0%, 100% {
      transform: scale(1);
      opacity: 0.4;
    }
    50% {
      transform: scale(1.8);
      opacity: 0.7;
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
      width: 140px;
      height: 140px;
      margin-bottom: 36px;
      display: flex !important;
    }

    .lp-splash-logo {
      width: 120px;
      height: 120px;
      border-radius: 28px;
      display: block !important;
    }

    .lp-splash-logo-img {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }

    .lp-splash-logo-orb {
      inset: -40px;
      filter: blur(20px);
      display: block !important;
    }

    .lp-splash-logo-glow {
      inset: -28px;
      filter: blur(16px);
      display: block !important;
    }

    .lp-splash-title {
      font-size: 48px;
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
      width: 280px;
      margin-bottom: 40px;
      display: block !important;
      visibility: visible !important;
    }

    .lp-splash-progress-track {
      height: 7px;
      display: block !important;
    }

    .lp-splash-progress-bar {
      display: block !important;
      visibility: visible !important;
    }

    .lp-splash-tip {
      padding: 20px 28px;
      max-width: 360px;
      gap: 16px;
      display: flex !important;
      visibility: visible !important;
    }

    .lp-splash-tip-icon {
      font-size: 28px;
      display: inline-block !important;
    }

    .lp-splash-tip-text {
      font-size: 14px;
      line-height: 1.65;
      display: inline-block !important;
    }

    .lp-splash-footer {
      bottom: 48px;
      font-size: 13px;
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
      width: 900px;
      height: 900px;
      filter: blur(90px);
      display: block !important;
      visibility: visible !important;
    }

    .lp-splash-bg-orb {
      width: 450px;
      height: 450px;
      filter: blur(55px);
      display: block !important;
      visibility: visible !important;
    }

    .lp-splash-bg-particles {
      background-size: 400px 300px;
      opacity: 0.6;
      display: block !important;
      visibility: visible !important;
    }
  }

  /* Reducir animaciones en dispositivos con preferencia de movimiento reducido */
  @media (prefers-reduced-motion: reduce) {
    .lp-splash-bg-gradient,
    .lp-splash-bg-glow,
    .lp-splash-bg-glow-secondary,
    .lp-splash-bg-particles,
    .lp-splash-bg-particles-secondary,
    .lp-splash-bg-orb,
    .lp-splash-bg-orb-secondary,
    .lp-splash-logo-orb,
    .lp-splash-logo-orb-secondary,
    .lp-splash-logo-glow,
    .lp-splash-logo-glow-secondary,
    .lp-splash-logo,
    .lp-splash-title-text,
    .lp-splash-title-glow,
    .lp-splash-title-glow-secondary,
    .lp-splash-progress-bar,
    .lp-splash-tip-icon,
    .lp-splash-footer-dot,
    .lp-splash-footer-dot-secondary {
      animation: none;
    }
  }
`;
