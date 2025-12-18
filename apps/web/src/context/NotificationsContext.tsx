import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { notificationsService, Notification, NotificationType, ensureUserHasWelcome } from '../lib/notificationsService';
import { supabase } from '../lib/supabaseClient';
import { useNotificationEvents } from '../hooks/useNotificationEvents';

interface NotificationsContextValue {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  deleteAllRead: () => Promise<void>;
  refresh: () => Promise<void>;
  createNotification: (
    type: NotificationType,
    title: string,
    message: string,
    priority?: 'low' | 'medium' | 'high' | 'urgent',
    metadata?: Record<string, any>
  ) => Promise<void>;
  playNotificationSound: () => void;
  showToastNotification: (notification: Notification) => void;
}

const NotificationsContext = createContext<NotificationsContextValue | undefined>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const soundEnabledRef = useRef(true);
  const lastNotificationTimeRef = useRef<number>(0);

  // ¡IMPORTANTE! Activar detección automática de eventos
  useNotificationEvents();

  // Cargar notificaciones iniciales
  const loadNotifications = useCallback(async () => {
    if (!user?.id) {
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    try {
      const [all, unread] = await Promise.all([
        notificationsService.getAll(user.id, 200),
        notificationsService.getUnreadCount(user.id),
      ]);



      setNotifications(all);
      setUnreadCount(unread);
    } catch (error) {
      console.error('🔔 [Notifications] Error loading:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Cargar al montar y cuando cambie el usuario
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Generar notificaciones históricas para nuevas cuentas Y asegurar bienvenida
  useEffect(() => {
    if (!user?.id) return;

    const initializeUserNotifications = async () => {
      // Primero: Asegurar que TODOS los usuarios tengan bienvenida
      // (incluso usuarios existentes que no la tenían)
      await ensureUserHasWelcome(user.id, user.user_metadata?.username);

      // Segundo: Verificar si el usuario ya tiene notificaciones
      const { data: existing } = await supabase
        .from('notifications')
        .select('id')
        .eq('user_id', user.id)
        .limit(2);

      // Si solo tiene la bienvenida (1 notificación), generar históricas
      if (!existing || existing.length <= 1) {
        await notificationsService.generateHistoricalNotifications(user.id);
        // Recargar después de generar
        setTimeout(() => {
          loadNotifications();
        }, 1000);
      }
    };

    initializeUserNotifications();
  }, [user?.id, loadNotifications]);

  // Real-time subscription con animaciones
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        async (payload) => {
          const newNotification = payload.new as Notification;
          const now = Date.now();

          // Throttle: no más de una notificación cada 500ms
          if (now - lastNotificationTimeRef.current < 500) {
            return;
          }
          lastNotificationTimeRef.current = now;

          // Añadir categoría
          const notificationWithCategory = {
            ...newNotification,
            category: getNotificationCategory(newNotification.type),
          };

          // Animación de entrada
          setNotifications((prev) => {
            // Evitar duplicados
            if (prev.some(n => n.id === newNotification.id)) {
              return prev;
            }
            return [notificationWithCategory, ...prev];
          });

          if (!newNotification.read) {
            setUnreadCount((prev) => prev + 1);

            // Reproducir sonido (solo para notificaciones importantes)
            if (newNotification.priority === 'high' || newNotification.priority === 'urgent') {
              playNotificationSound();
            }

            // Mostrar toast si el panel no está abierto
            if (typeof window !== 'undefined') {
              const panelOpen = document.querySelector('.lp-notifications-panel[style*="right: 0"]');
              if (!panelOpen) {
                showToastNotification(notificationWithCategory);
              }
            }
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const updated = payload.new as Notification;
          setNotifications((prev) =>
            prev.map((n) => (n.id === updated.id ? { ...updated, category: getNotificationCategory(updated.type) } : n))
          );
          if (updated.read) {
            setUnreadCount((prev) => Math.max(0, prev - 1));
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const deletedId = payload.old.id;
          setNotifications((prev) => {
            const deleted = prev.find((n) => n.id === deletedId);
            const newList = prev.filter((n) => n.id !== deletedId);
            if (deleted && !deleted.read) {
              setUnreadCount((prev) => Math.max(0, prev - 1));
            }
            return newList;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  // Reproducir sonido de notificación
  const playNotificationSound = useCallback(() => {
    if (!soundEnabledRef.current) return;

    try {
      // Crear audio context para sonido suave
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Sonido suave y profesional
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      // Silenciar si no hay soporte de audio
    }
  }, []);

  // Mostrar toast notification
  const showToastNotification = useCallback((notification: Notification) => {
    // Crear elemento toast
    const toast = document.createElement('div');
    toast.className = 'lp-notification-toast';
    toast.style.cssText = `
      position: fixed;
      top: calc(env(safe-area-inset-top, 0px) + 80px);
      right: 20px;
      max-width: 320px;
      padding: 16px;
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(20px);
      z-index: 10000;
      transform: translateX(400px);
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: auto;
      cursor: pointer;
    `;

    const priorityColor = {
      low: 'rgba(148, 163, 184, 0.3)',
      medium: 'rgba(99, 102, 241, 0.3)',
      high: 'rgba(59, 130, 246, 0.3)',
      urgent: 'rgba(239, 68, 68, 0.3)',
    }[notification.priority];

    toast.innerHTML = `
      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <div style="
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: ${priorityColor};
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a5b4fc;
          flex-shrink: 0;
        ">
          🔔
        </div>
        <div style="flex: 1; min-width: 0;">
          <h4 style="
            font-size: 14px;
            font-weight: 600;
            color: #f9fafb;
            margin: 0 0 4px 0;
            line-height: 1.4;
          ">${notification.title}</h4>
          <p style="
            font-size: 12px;
            color: #94a3b8;
            margin: 0;
            line-height: 1.5;
          ">${notification.message}</p>
        </div>
      </div>
    `;

    document.body.appendChild(toast);

    // Animación de entrada
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });

    // Auto-cerrar después de 5 segundos
    const timeout = setTimeout(() => {
      toast.style.transform = 'translateX(400px)';
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 400);
    }, 5000);

    // Cerrar al hacer clic
    toast.addEventListener('click', () => {
      clearTimeout(timeout);
      toast.style.transform = 'translateX(400px)';
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 400);
    });
  }, []);

  const markAsRead = useCallback(
    async (id: string) => {
      const success = await notificationsService.markAsRead(id);
      if (success) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: true, read_at: new Date().toISOString() } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    },
    []
  );

  const markAllAsRead = useCallback(async () => {
    if (!user?.id) return;
    const success = await notificationsService.markAllAsRead(user.id);
    if (success) {
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true, read_at: new Date().toISOString() }))
      );
      setUnreadCount(0);
    }
  }, [user?.id]);

  const deleteNotification = useCallback(async (id: string) => {
    const success = await notificationsService.delete(id);
    if (success) {
      const deleted = notifications.find((n) => n.id === id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      if (deleted && !deleted.read) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    }
  }, [notifications]);

  const deleteAllRead = useCallback(async () => {
    if (!user?.id) return;
    const success = await notificationsService.deleteAllRead(user.id);
    if (success) {
      setNotifications((prev) => prev.filter((n) => !n.read));
    }
  }, [user?.id]);

  const createNotification = useCallback(
    async (
      type: NotificationType,
      title: string,
      message: string,
      priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium',
      metadata: Record<string, any> = {}
    ) => {
      if (!user?.id) return;
      await notificationsService.create(user.id, type, title, message, priority, metadata);
    },
    [user?.id]
  );

  const refresh = useCallback(async () => {
    await loadNotifications();
  }, [loadNotifications]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        deleteAllRead,
        refresh,
        createNotification,
        playNotificationSound,
        showToastNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}

// Helper para categorizar
function getNotificationCategory(type: NotificationType): Notification['category'] {
  if (type.startsWith('link_') || type.startsWith('bio_page_')) return 'activity';
  if (type.startsWith('revenue_') || type.startsWith('payout_') || type.startsWith('first_earning')) return 'financial';
  if (type.startsWith('referral_') || type.startsWith('achievement_')) return 'social';
  if (type.startsWith('security_')) return 'security';
  return 'system';
}
