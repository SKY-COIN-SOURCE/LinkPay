import React, { useState, useEffect } from 'react';

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

    useEffect(() => {
        // Rotar tips cada 1.5 segundos
        const tipInterval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % TIPS.length);
        }, 1500);

        // Progreso de carga simulado
        const startTime = Date.now();
        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / minDuration) * 100, 100);
            setProgress(newProgress);

            if (elapsed >= minDuration) {
                clearInterval(progressInterval);
                setFadeOut(true);
                setTimeout(onComplete, 500); // Tiempo para la animación de fadeOut
            }
        }, 50);

        return () => {
            clearInterval(tipInterval);
            clearInterval(progressInterval);
        };
    }, [minDuration, onComplete]);

    const tip = TIPS[currentTip];

    return (
        <div className={`lp-splash ${fadeOut ? 'fade-out' : ''}`}>
            <style>{splashStyles}</style>

            {/* Fondo animado */}
            <div className="lp-splash-bg">
                <div className="lp-splash-orb lp-splash-orb-1" />
                <div className="lp-splash-orb lp-splash-orb-2" />
                <div className="lp-splash-orb lp-splash-orb-3" />
            </div>

            <div className="lp-splash-content">
                {/* Logo */}
                <div className="lp-splash-logo">
                    <img
                        src="/icons/icon-192.png"
                        alt="LinkPay"
                        className="lp-splash-logo-img"
                    />
                    <div className="lp-splash-logo-glow" />
                </div>

                {/* Nombre de la app */}
                <h1 className="lp-splash-title">LinkPay</h1>
                <p className="lp-splash-subtitle">Creator Studio</p>

                {/* Barra de progreso */}
                <div className="lp-splash-progress">
                    <div
                        className="lp-splash-progress-bar"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Tip rotativo */}
                <div className="lp-splash-tip" key={currentTip}>
                    <span className="lp-splash-tip-icon">{tip.icon}</span>
                    <span className="lp-splash-tip-text">{tip.text}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="lp-splash-footer">
                <span>Cargando tu panel...</span>
            </div>
        </div>
    );
}

const splashStyles = `
  .lp-splash {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #020617;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .lp-splash.fade-out {
    opacity: 0;
    transform: scale(1.05);
  }

  /* === FONDO ANIMADO === */
  .lp-splash-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .lp-splash-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.6;
  }

  .lp-splash-orb-1 {
    width: 400px;
    height: 400px;
    top: -100px;
    left: -100px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%);
    animation: splash-float-1 6s ease-in-out infinite;
  }

  .lp-splash-orb-2 {
    width: 500px;
    height: 500px;
    bottom: -150px;
    right: -150px;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%);
    animation: splash-float-2 8s ease-in-out infinite;
  }

  .lp-splash-orb-3 {
    width: 300px;
    height: 300px;
    bottom: 20%;
    left: 30%;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.35) 0%, transparent 70%);
    animation: splash-float-3 7s ease-in-out infinite;
  }

  @keyframes splash-float-1 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(30px, 20px); }
  }

  @keyframes splash-float-2 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-40px, -30px); }
  }

  @keyframes splash-float-3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(20px, -20px) scale(1.1); }
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
  }

  /* Logo */
  .lp-splash-logo {
    position: relative;
    width: 100px;
    height: 100px;
    margin-bottom: 24px;
    animation: splash-logo-pulse 2s ease-in-out infinite;
  }

  .lp-splash-logo-img {
    width: 100%;
    height: 100%;
    border-radius: 24px;
    object-fit: cover;
    box-shadow: 0 0 60px rgba(99, 102, 241, 0.5);
  }

  .lp-splash-logo-glow {
    position: absolute;
    inset: -20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
    animation: splash-glow 2s ease-in-out infinite alternate;
  }

  @keyframes splash-logo-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes splash-glow {
    0% { opacity: 0.5; transform: scale(1); }
    100% { opacity: 1; transform: scale(1.2); }
  }

  /* Título */
  .lp-splash-title {
    font-size: 36px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #f9fafb;
    margin: 0 0 4px 0;
    background: linear-gradient(135deg, #f9fafb 0%, #a5b4fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .lp-splash-subtitle {
    font-size: 14px;
    font-weight: 500;
    color: #64748b;
    margin: 0 0 40px 0;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  /* Barra de progreso */
  .lp-splash-progress {
    width: 200px;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 32px;
  }

  .lp-splash-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #22c55e 100%);
    border-radius: 999px;
    transition: width 0.1s ease-out;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
  }

  /* Tip rotativo */
  .lp-splash-tip {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    max-width: 320px;
    animation: splash-tip-fade 1.5s ease-in-out;
  }

  @keyframes splash-tip-fade {
    0% { opacity: 0; transform: translateY(10px); }
    20% { opacity: 1; transform: translateY(0); }
    80% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0.8; transform: translateY(-5px); }
  }

  .lp-splash-tip-icon {
    font-size: 24px;
    flex-shrink: 0;
  }

  .lp-splash-tip-text {
    font-size: 13px;
    color: #94a3b8;
    line-height: 1.5;
    text-align: left;
  }

  /* Footer */
  .lp-splash-footer {
    position: absolute;
    bottom: calc(env(safe-area-inset-bottom, 20px) + 40px);
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
    color: #475569;
    animation: splash-footer-pulse 1.5s ease-in-out infinite;
  }

  @keyframes splash-footer-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
`;
