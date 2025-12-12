import { useState, useEffect } from 'react';
import { RefreshCw, X } from 'lucide-react';

export function UpdateNotification() {
    const [showUpdate, setShowUpdate] = useState(false);

    useEffect(() => {
        // Listen for SW update messages
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'SW_UPDATED') {
                    console.log('[App] New version available:', event.data.version);
                    setShowUpdate(true);
                }
            });

            // Also check for waiting service worker
            navigator.serviceWorker.ready.then((registration) => {
                if (registration.waiting) {
                    setShowUpdate(true);
                }

                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                setShowUpdate(true);
                            }
                        });
                    }
                });
            });
        }
    }, []);

    const handleDismiss = () => {
        setShowUpdate(false);
        sessionStorage.setItem('update-dismissed', 'true');
    };

    useEffect(() => {
        if (sessionStorage.getItem('update-dismissed')) {
            setShowUpdate(false);
        }
    }, []);

    if (!showUpdate) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            padding: '14px 20px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)',
            zIndex: 10001,
            maxWidth: '340px',
            animation: 'slideDown 0.3s ease-out'
        }}>
            <style>{`
        @keyframes slideDown {
          from { transform: translateX(-50%) translateY(-100px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `}</style>
            <RefreshCw size={20} />
            <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: '14px', marginBottom: '2px' }}>
                    Nueva actualización
                </p>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                    Cierra la app y vuelve a abrirla
                </p>
            </div>
            <button
                onClick={handleDismiss}
                style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <X size={16} />
            </button>
        </div>
    );
}
