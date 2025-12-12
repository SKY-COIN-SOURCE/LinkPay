import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

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

    const handleUpdate = () => {
        // Tell the waiting SW to skip waiting
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then((registration) => {
                if (registration.waiting) {
                    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                }
            });
        }
        // Reload the page
        window.location.reload();
    };

    if (!showUpdate) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)',
            zIndex: 10001,
            animation: 'slideDown 0.3s ease-out'
        }}>
            <style>{`
        @keyframes slideDown {
          from { transform: translateX(-50%) translateY(-100px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `}</style>
            <RefreshCw size={18} />
            <span style={{ fontWeight: 600, fontSize: '14px' }}>
                Nueva versión disponible
            </span>
            <button
                onClick={handleUpdate}
                style={{
                    background: 'white',
                    color: '#6366f1',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    marginLeft: '4px'
                }}
            >
                Actualizar
            </button>
        </div>
    );
}
