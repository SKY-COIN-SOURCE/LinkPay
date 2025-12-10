import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

// Types
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (type: ToastType, message: string, duration?: number) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// Hook para usar toasts en cualquier componente
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Provider que envuelve la app
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((type: ToastType, message: string, duration = 4000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    setToasts(prev => [...prev, { id, type, message, duration }]);

    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
  }, [removeToast]);

  const success = useCallback((message: string) => showToast('success', message), [showToast]);
  const error = useCallback((message: string) => showToast('error', message, 6000), [showToast]);
  const info = useCallback((message: string) => showToast('info', message), [showToast]);
  const warning = useCallback((message: string) => showToast('warning', message, 5000), [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

// Contenedor de toasts (posición fija)
function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <>
      <style>{toastStyles}</style>
      <div className="lp-toast-container">
        {toasts.map((toast, index) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={() => onRemove(toast.id)}
            index={index}
          />
        ))}
      </div>
    </>
  );
}

// Toast individual
function ToastItem({ toast, onRemove, index }: { toast: Toast; onRemove: () => void; index: number }) {
  const icons = {
    success: <CheckCircle size={18} />,
    error: <AlertCircle size={18} />,
    info: <Info size={18} />,
    warning: <AlertTriangle size={18} />
  };

  const colors = {
    success: { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.4)', icon: '#4ade80', glow: 'rgba(34, 197, 94, 0.3)' },
    error: { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)', icon: '#f87171', glow: 'rgba(239, 68, 68, 0.3)' },
    info: { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.4)', icon: '#60a5fa', glow: 'rgba(59, 130, 246, 0.3)' },
    warning: { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)', icon: '#fbbf24', glow: 'rgba(245, 158, 11, 0.3)' }
  };

  const color = colors[toast.type];

  return (
    <div
      className="lp-toast"
      style={{
        background: color.bg,
        borderColor: color.border,
        boxShadow: `0 8px 32px ${color.glow}, 0 0 0 1px ${color.border}`,
        animationDelay: `${index * 50}ms`
      }}
    >
      <div className="lp-toast-icon" style={{ color: color.icon }}>
        {icons[toast.type]}
      </div>
      <span className="lp-toast-message">{toast.message}</span>
      <button className="lp-toast-close" onClick={onRemove}>
        <X size={14} />
      </button>
    </div>
  );
}

// Estilos CSS
const toastStyles = `
  .lp-toast-container {
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 12px;
    pointer-events: none;
    max-width: 400px;
  }

  @media (max-width: 768px) {
    .lp-toast-container {
      top: auto;
      bottom: 100px;
      left: 16px;
      right: 16px;
      max-width: none;
    }
  }

  .lp-toast {
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 14px;
    border: 1px solid;
    backdrop-filter: blur(20px);
    animation: lp-toast-enter 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
  }

  @keyframes lp-toast-enter {
    from {
      opacity: 0;
      transform: translateX(100%) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @media (max-width: 768px) {
    @keyframes lp-toast-enter {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  }

  .lp-toast-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .lp-toast-message {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    color: #f1f5f9;
    line-height: 1.4;
  }

  .lp-toast-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.15s ease;
    flex-shrink: 0;
  }

  .lp-toast-close:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #f1f5f9;
  }

  /* Confirm Modal Styles */
  .lp-confirm-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .lp-confirm-modal {
    width: 100%;
    max-width: 400px;
    background: #0f172a;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 24px;
    animation: slideUp 0.25s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .lp-confirm-title {
    font-size: 18px;
    font-weight: 700;
    color: #f1f5f9;
    margin: 0 0 12px 0;
  }

  .lp-confirm-title.danger { color: #ef4444; }

  .lp-confirm-message {
    font-size: 14px;
    color: #94a3b8;
    line-height: 1.6;
    margin: 0 0 24px 0;
  }

  .lp-confirm-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }

  .lp-confirm-btn {
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .lp-confirm-btn.secondary {
    background: rgba(255,255,255,0.08);
    color: #94a3b8;
  }

  .lp-confirm-btn.secondary:hover {
    background: rgba(255,255,255,0.12);
    color: #f1f5f9;
  }

  .lp-confirm-btn.danger {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
  }

  .lp-confirm-btn.danger:hover {
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
  }
`;

// === CONFIRM MODAL ===
interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  variant?: 'danger' | 'warning' | 'default';
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({ isOpen, title, message, variant = 'default', onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <style>{toastStyles}</style>
      <div className="lp-confirm-overlay" onClick={onCancel}>
        <div className="lp-confirm-modal" onClick={e => e.stopPropagation()}>
          <h3 className={`lp-confirm-title ${variant}`}>{title}</h3>
          <p className="lp-confirm-message">{message}</p>
          <div className="lp-confirm-actions">
            <button className="lp-confirm-btn secondary" onClick={onCancel}>Cancelar</button>
            <button className={`lp-confirm-btn ${variant === 'danger' ? 'danger' : 'primary'}`} onClick={onConfirm}>
              {variant === 'danger' ? 'Eliminar' : 'Confirmar'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// === useConfirm Hook ===
export function useConfirm() {
  const [state, setState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    variant: 'danger' | 'warning' | 'default';
    resolve: ((value: boolean) => void) | null;
  }>({
    isOpen: false,
    title: '',
    message: '',
    variant: 'default',
    resolve: null
  });

  const confirm = useCallback((
    title: string,
    message: string,
    variant: 'danger' | 'warning' | 'default' = 'default'
  ): Promise<boolean> => {
    return new Promise(resolve => {
      setState({ isOpen: true, title, message, variant, resolve });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    state.resolve?.(true);
    setState(prev => ({ ...prev, isOpen: false, resolve: null }));
  }, [state.resolve]);

  const handleCancel = useCallback(() => {
    state.resolve?.(false);
    setState(prev => ({ ...prev, isOpen: false, resolve: null }));
  }, [state.resolve]);

  const ConfirmDialog = useCallback(() => (
    <ConfirmModal
      isOpen={state.isOpen}
      title={state.title}
      message={state.message}
      variant={state.variant}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  ), [state.isOpen, state.title, state.message, state.variant, handleConfirm, handleCancel]);

  return { confirm, ConfirmDialog };
}

export default ToastProvider;
