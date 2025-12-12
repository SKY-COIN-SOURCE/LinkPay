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

// Detect iOS Safari (more robust detection)
function isIOSSafari(): boolean {
    const ua = window.navigator.userAgent.toLowerCase();
    const platform = (window.navigator as any).platform?.toLowerCase() || '';

    // Check for iOS devices
    const isIOS = /iphone|ipad|ipod/.test(ua) ||
        (platform === 'macintel' && navigator.maxTouchPoints > 1) || // iPadOS 13+
        /\(ip/.test(ua);

    // Check if it's Safari (not Chrome, Firefox, or other browsers on iOS)
    const isSafari = /safari/.test(ua) && !/crios|fxios|opios|mercury|focus/.test(ua);

    // Also detect if user is on iOS but NOT in standalone mode (can still install)
    const notStandalone = !(window.navigator as any).standalone &&
        !window.matchMedia('(display-mode: standalone)').matches;

    return isIOS && isSafari && notStandalone;
}

// Detect any iOS device (Safari or other browsers)
function isAnyiOS(): boolean {
    const ua = window.navigator.userAgent.toLowerCase();
    const platform = (window.navigator as any).platform?.toLowerCase() || '';

    return /iphone|ipad|ipod/.test(ua) ||
        (platform === 'macintel' && navigator.maxTouchPoints > 1);
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
    const { isInstallable, isInstalled, promptInstall, isIOS } = usePWAInstall();
    const [dismissed, setDismissed] = useState(false);
    const [showIOSInstructions, setShowIOSInstructions] = useState(false);

    // Inline iOS check for reliability at click time
    const checkIsIOSDevice = (): boolean => {
        if (typeof window === 'undefined') return false;
        const ua = window.navigator.userAgent.toLowerCase();
        const platform = ((window.navigator as any).platform || '').toLowerCase();
        return /iphone|ipad|ipod/.test(ua) ||
            (platform === 'macintel' && navigator.maxTouchPoints > 1);
    };

    // Check if user dismissed before (shows again after 1 day)
    useEffect(() => {
        const wasDismissed = localStorage.getItem('pwa-install-dismissed');
        if (wasDismissed) {
            const dismissedTime = parseInt(wasDismissed);
            if (Date.now() - dismissedTime < 24 * 60 * 60 * 1000) {
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
        // Check iOS at click time for maximum reliability
        const isIOSDevice = isIOS || checkIsIOSDevice();
        if (isIOSDevice) {
            setShowIOSInstructions(true);
        } else {
            promptInstall();
        }
    };

    // Don't show if already installed or dismissed
    if (isInstalled || !isInstallable || dismissed) return null;

    // Is this an iOS device? (for button display)
    const showIOSButton = isIOS || checkIsIOSDevice();

    // iOS Instructions Modal - ALWAYS show if showIOSInstructions is true
    if (showIOSInstructions) {
        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.85)',
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
                            Sigue estos 2 pasos en Safari
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
                                width: '48px',
                                height: '48px',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Share size={24} color="white" />
                            </div>
                            <div>
                                <p style={{
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '15px',
                                    marginBottom: '4px'
                                }}>
                                    1. Toca Compartir
                                </p>
                                <p style={{
                                    color: '#94a3b8',
                                    fontSize: '13px',
                                    margin: 0
                                }}>
                                    El icono <span style={{ fontSize: '18px' }}>↑</span> en la barra de Safari
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
                                width: '48px',
                                height: '48px',
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <PlusSquare size={24} color="white" />
                            </div>
                            <div>
                                <p style={{
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '15px',
                                    marginBottom: '4px'
                                }}>
                                    2. "Añadir a inicio"
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
                            padding: '16px',
                            fontWeight: 700,
                            fontSize: '15px',
                            cursor: 'pointer',
                            minHeight: '52px'
                        }}
                    >
                        ¡Entendido!
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '160px',
            left: '16px',
            right: '16px',
            maxWidth: '400px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            borderRadius: '16px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(99, 102, 241, 0.3)',
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
                    {showIOSButton ? 'Usa Safari para añadir' : 'Añade a pantalla de inicio'}
                </p>
            </div>

            <button
                onClick={handleInstallClick}
                style={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                    transition: 'transform 0.2s',
                    minHeight: '44px',
                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                {showIOSButton ? <Share size={16} /> : <Download size={16} />}
                {showIOSButton ? 'Ver pasos' : 'Instalar'}
            </button>

            <button
                onClick={handleDismiss}
                style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '32px',
                    minHeight: '32px'
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

// Settings Row for iOS Safari installation - Always visible on iOS
export function PWAInstallSettingsRow() {
    const [showInstructions, setShowInstructions] = useState(false);
    const { isInstalled, isIOS } = usePWAInstall();

    // Check if we're on any iOS device
    const ua = typeof window !== 'undefined' ? window.navigator.userAgent.toLowerCase() : '';
    const platform = typeof window !== 'undefined' ? ((window.navigator as any).platform?.toLowerCase() || '') : '';
    const isIOSDevice = /iphone|ipad|ipod/.test(ua) ||
        (platform === 'macintel' && typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1);

    // Don't show if already installed as PWA
    if (isInstalled) return null;

    // Only show on iOS devices
    if (!isIOSDevice && !isIOS) return null;

    return (
        <>
            <div style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '20px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    flexWrap: 'wrap'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Smartphone size={24} color="white" />
                        </div>
                        <div>
                            <h4 style={{
                                fontSize: '15px',
                                fontWeight: 700,
                                color: 'white',
                                marginBottom: '4px'
                            }}>
                                Instalar LinkPay
                            </h4>
                            <p style={{
                                fontSize: '13px',
                                color: '#94a3b8',
                                margin: 0
                            }}>
                                Añade la app a tu pantalla de inicio
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowInstructions(true)}
                        style={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px 20px',
                            fontWeight: 600,
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            minHeight: '44px'
                        }}
                    >
                        <Download size={16} />
                        Instalar
                    </button>
                </div>
            </div>

            {/* iOS Instructions Modal */}
            {showInstructions && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    zIndex: 10000
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                        borderRadius: '24px',
                        padding: '28px 24px',
                        maxWidth: '360px',
                        width: '100%',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
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
                                Sigue estos 2 sencillos pasos
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
                                    width: '48px',
                                    height: '48px',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Share size={24} color="white" />
                                </div>
                                <div>
                                    <p style={{
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '15px',
                                        marginBottom: '4px'
                                    }}>
                                        1. Toca el botón Compartir
                                    </p>
                                    <p style={{
                                        color: '#94a3b8',
                                        fontSize: '13px',
                                        margin: 0
                                    }}>
                                        El icono <span style={{ fontSize: '16px' }}>↑</span> en la barra de Safari
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
                                    width: '48px',
                                    height: '48px',
                                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <PlusSquare size={24} color="white" />
                                </div>
                                <div>
                                    <p style={{
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '15px',
                                        marginBottom: '4px'
                                    }}>
                                        2. "Añadir a inicio"
                                    </p>
                                    <p style={{
                                        color: '#94a3b8',
                                        fontSize: '13px',
                                        margin: 0
                                    }}>
                                        Busca y pulsa esta opción
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowInstructions(false)}
                            style={{
                                width: '100%',
                                background: 'white',
                                color: '#1e1b4b',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '16px',
                                fontWeight: 700,
                                fontSize: '15px',
                                cursor: 'pointer',
                                minHeight: '52px'
                            }}
                        >
                            ¡Entendido!
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
