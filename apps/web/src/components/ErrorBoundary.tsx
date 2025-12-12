import React, { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('[ErrorBoundary] Caught error:', error, errorInfo);
    }

    handleReload = () => {
        // Clear all caches and reload
        if ('caches' in window) {
            caches.keys().then((names) => {
                names.forEach((name) => caches.delete(name));
            });
        }
        // Unregister service workers
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                registrations.forEach((registration) => registration.unregister());
            });
        }
        // Clear storage
        localStorage.clear();
        sessionStorage.clear();
        // Hard reload
        window.location.href = window.location.origin + '?cache-bust=' + Date.now();
    };

    render() {
        if (this.state.hasError) {
            const isModuleError = this.state.error?.message?.includes('module') ||
                this.state.error?.message?.includes('import') ||
                this.state.error?.message?.includes('chunk');

            return (
                <div style={{
                    minHeight: '100dvh',
                    background: 'linear-gradient(135deg, #020617 0%, #1e1b4b 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '24px'
                    }}>
                        <img
                            src="/icons/icon-192.png"
                            alt="LinkPay"
                            style={{ width: '60px', height: '60px', borderRadius: '12px' }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    </div>

                    <h1 style={{
                        color: 'white',
                        fontSize: '22px',
                        fontWeight: 700,
                        marginBottom: '12px',
                        textAlign: 'center'
                    }}>
                        {isModuleError ? 'Nueva versión disponible' : 'Algo salió mal'}
                    </h1>

                    <p style={{
                        color: '#94a3b8',
                        fontSize: '15px',
                        textAlign: 'center',
                        marginBottom: '32px',
                        maxWidth: '300px',
                        lineHeight: 1.5
                    }}>
                        {isModuleError
                            ? 'Hay una actualización pendiente. Pulsa el botón para cargar la última versión.'
                            : 'Ha ocurrido un error inesperado. Intenta recargar la aplicación.'}
                    </p>

                    <button
                        onClick={this.handleReload}
                        style={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '14px',
                            padding: '16px 32px',
                            fontSize: '16px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 10px 40px rgba(99, 102, 241, 0.3)',
                            minHeight: '52px'
                        }}
                    >
                        Recargar LinkPay
                    </button>

                    <p style={{
                        color: '#64748b',
                        fontSize: '12px',
                        marginTop: '24px',
                        textAlign: 'center'
                    }}>
                        Si el problema persiste, elimina la app y vuelve a instalarla.
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}
