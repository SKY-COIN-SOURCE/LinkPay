import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Share, PlusSquare } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}

// Detect iOS Safari
function isIOSSafari(): boolean {
    const ua = window.navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const webkit = /WebKit/.test(ua);
    const notChrome = !/CriOS/.test(ua);
    const notFirefox = !/FxiOS/.test(ua);
    return iOS && webkit && notChrome && notFirefox;
}

// Check if running in standalone mode (already installed)
function isStandalone(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true;
}

export function usePWAInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Check if already installed
        if (isStandalone()) {
            setIsInstalled(true);
            return;
        }

        // Check if iOS Safari
        if (isIOSSafari()) {
            setIsIOS(true);
            setIsInstallable(true);
            return;
        }

        const handleBeforeInstall = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };

        const handleAppInstalled = () => {
            setIsInstalled(true);
            setIsInstallable(false);
            setDeferredPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstall);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const promptInstall = async () => {
        if (!deferredPrompt) return false;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setIsInstalled(true);
            setIsInstallable(false);
        }
        setDeferredPrompt(null);
        return outcome === 'accepted';
    };

    return { isInstallable, isInstalled, promptInstall, isIOS };
}

// Floating Install Button Component
export function PWAInstallButton() {
    const { isInstallable, promptInstall, isIOS } = usePWAInstall();
    const [dismissed, setDismissed] = useState(false);
    const [showIOSInstructions, setShowIOSInstructions] = useState(false);

    // Check if user dismissed before
    useEffect(() => {
        const wasDismissed = localStorage.getItem('pwa-install-dismissed');
        if (wasDismissed) {
            const dismissedTime = parseInt(wasDismissed);
            // Show again after 7 days
            if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
                setDismissed(true);
            }
        }
    }, []);

    const handleDismiss = () => {
        setDismissed(true);
        setShowIOSInstructions(false);
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    };

    const handleInstallClick = () => {
        if (isIOS) {
            setShowIOSInstructions(true);
        } else {
            promptInstall();
        }
    };

    if (!isInstallable || dismissed) return null;

    // iOS Instructions Modal
    if (showIOSInstructions && isIOS) {
        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                zIndex: 10000,
                animation: 'fadeIn 0.3s ease-out'
            }}>
                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideUp {
                        from { transform: translateY(100px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `}</style>
                <div style={{
                    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                    borderRadius: '24px',
                    padding: '28px 24px',
                    maxWidth: '340px',
                    width: '100%',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                    animation: 'slideUp 0.4s ease-out'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px'
                        }}>
                            <Smartphone size={32} color="white" />
                        </div>
                        <h3 style={{
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: 700,
                            marginBottom: '8px'
                        }}>
                            Instalar LinkPay
                        </h3>
                        <p style={{
                            color: '#a5b4fc',
                            fontSize: '14px',
                            margin: 0
                        }}>
                            Sigue estos pasos para añadir la app
                        </p>
                    </div>

                    <div style={{
                        background: 'rgba(99, 102, 241, 0.15)',
                        borderRadius: '16px',
                        padding: '20px',
                        marginBottom: '20px'
                    }}>
                        {/* Step 1 */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            marginBottom: '18px'
                        }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Share size={22} color="white" />
                            </div>
                            <div>
                                <p style={{
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '15px',
                                    marginBottom: '2px'
                                }}>
                                    1. Toca el botón Compartir
                                </p>
                                <p style={{
                                    color: '#94a3b8',
                                    fontSize: '13px',
                                    margin: 0
                                }}>
                                    El icono con la flecha hacia arriba ↑
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px'
                        }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <PlusSquare size={22} color="white" />
                            </div>
                            <div>
                                <p style={{
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '15px',
                                    marginBottom: '2px'
                                }}>
                                    2. "Añadir a pantalla de inicio"
                                </p>
                                <p style={{
                                    color: '#94a3b8',
                                    fontSize: '13px',
                                    margin: 0
                                }}>
                                    Desplázate y pulsa esta opción
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleDismiss}
                        style={{
                            width: '100%',
                            background: 'white',
                            color: '#1e1b4b',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '14px',
                            fontWeight: 700,
                            fontSize: '15px',
                            cursor: 'pointer'
                        }}
                    >
                        Entendido
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            right: '24px',
            maxWidth: '400px',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            borderRadius: '16px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(99, 102, 241, 0.2)',
            zIndex: 9999,
            animation: 'slideUp 0.4s ease-out'
        }}>
            <style>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

            <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>
                <Smartphone size={24} color="white" />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '15px',
                    marginBottom: '4px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    Instalar LinkPay
                </h4>
                <p style={{
                    color: '#a5b4fc',
                    fontSize: '13px',
                    margin: 0
                }}>
                    {isIOS ? 'Añade a tu pantalla de inicio' : 'Añade a tu pantalla de inicio'}
                </p>
            </div>

            <button
                onClick={handleInstallClick}
                style={{
                    background: 'white',
                    color: '#1e1b4b',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 16px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                    transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                {isIOS ? <Share size={16} /> : <Download size={16} />}
                {isIOS ? 'Cómo instalar' : 'Instalar'}
            </button>

            <button
                onClick={handleDismiss}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#64748b',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                title="Cerrar"
            >
                <X size={18} />
            </button>
        </div>
    );
}

// Navbar Install Button (compact)
export function PWAInstallNavButton() {
    const { isInstallable, promptInstall } = usePWAInstall();

    if (!isInstallable) return null;

    return (
        <button
            onClick={promptInstall}
            style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '100px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.4)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
            }}
        >
            <Download size={14} />
            Instalar App
        </button>
    );
}
