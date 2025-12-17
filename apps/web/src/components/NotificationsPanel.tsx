import React, { useState, useEffect, useRef } from 'react';
import {
  X, Bell, Check, Trash2, Volume2, VolumeX, BellRing, Zap
} from 'lucide-react';
import { useNotifications } from '../context/NotificationsContext';
import { Notification as AppNotification, NotificationType } from '../lib/notificationsService';
import { pushNotificationService } from '../lib/pushNotifications';
import { supabase } from '../lib/supabaseClient';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper para obtener el nombre de la categoría
const getCategoryName = (category?: string): string => {
  const categoryMap: Record<string, string> = {
    'activity': 'Actividad',
    'financial': 'Finanzas',
    'social': 'Social',
    'security': 'Seguridad',
    'system': 'Sistema',
    'analytics': 'Analytics'
  };
  return categoryMap[category || 'system'] || 'Sistema';
};

// Iconos por tipo de notificación
const getNotificationIcon = (type: NotificationType, priority: string) => {
  const iconClass = 'w-5 h-5';

  if (type.startsWith('link_') || type.startsWith('bio_page_')) {
    return <Bell className={iconClass} />;
  }
  if (type.startsWith('revenue_') || type.startsWith('payout_') || type.startsWith('first_earning')) {
    return <Bell className={iconClass} />;
  }
  if (type.startsWith('referral_') || type.startsWith('achievement_')) {
    return <Bell className={iconClass} />;
  }
  if (type.startsWith('security_')) {
    return <Bell className={iconClass} />;
  }
  return <Bell className={iconClass} />;
};

// ============================================================
// ESTILOS POR TIPO DE NOTIFICACIÓN - Colores únicos por categoría
// ============================================================
const getNotificationStyle = (type: NotificationType, priority: string, read: boolean) => {
  // Si está leída, siempre muy sutil
  if (read) {
    return {
      background: 'rgba(255, 255, 255, 0.02)',
      borderColor: 'rgba(148, 163, 184, 0.1)',
      iconBg: 'rgba(148, 163, 184, 0.05)',
      iconColor: '#64748b',
      glow: 'none',
      opacity: 0.4,
      borderWidth: '1px',
    };
  }

  // === INGRESOS / DINERO === (Verde/Dorado brillante)
  if (type.startsWith('revenue_') || type.startsWith('first_earning') || type.startsWith('payout_') ||
    type.startsWith('daily_earnings') || type.startsWith('weekly_earnings') || type.startsWith('monthly_earnings')) {
    return {
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(234, 179, 8, 0.2) 100%)',
      borderColor: 'rgba(34, 197, 94, 0.7)',
      iconBg: 'linear-gradient(135deg, rgba(34, 197, 94, 0.4), rgba(234, 179, 8, 0.3))',
      iconColor: '#4ade80',
      glow: '0 0 30px rgba(34, 197, 94, 0.5)',
      opacity: 1,
      borderWidth: '2px',
    };
  }

  // === SEGURIDAD === (Rojo intenso)
  if (type.startsWith('security_')) {
    return {
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(220, 38, 38, 0.2) 100%)',
      borderColor: 'rgba(239, 68, 68, 0.7)',
      iconBg: 'rgba(239, 68, 68, 0.35)',
      iconColor: '#f87171',
      glow: '0 0 30px rgba(239, 68, 68, 0.5)',
      opacity: 1,
      borderWidth: '2px',
    };
  }

  // === REFERIDOS === (Morado/Violeta vibrante)
  if (type.startsWith('referral_')) {
    return {
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.2) 100%)',
      borderColor: 'rgba(139, 92, 246, 0.7)',
      iconBg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.3))',
      iconColor: '#a78bfa',
      glow: '0 0 30px rgba(139, 92, 246, 0.5)',
      opacity: 1,
      borderWidth: '2px',
    };
  }

  // === VIRAL / HITOS IMPORTANTES === (Rosa/Magenta brillante)
  if (type === 'link_viral' || type.includes('viral') || type.includes('trending') ||
    type.includes('top_performer') || type.includes('record')) {
    return {
      background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.35) 0%, rgba(168, 85, 247, 0.25) 100%)',
      borderColor: 'rgba(236, 72, 153, 0.8)',
      iconBg: 'linear-gradient(135deg, rgba(236, 72, 153, 0.45), rgba(168, 85, 247, 0.35))',
      iconColor: '#f472b6',
      glow: '0 0 35px rgba(236, 72, 153, 0.6)',
      opacity: 1,
      borderWidth: '2px',
    };
  }

  // === LOGROS / ACHIEVEMENTS === (Dorado/Ámbar)
  if (type.startsWith('achievement_') || type === 'streak_bonus' || type.includes('milestone')) {
    return {
      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.2) 100%)',
      borderColor: 'rgba(251, 191, 36, 0.7)',
      iconBg: 'rgba(251, 191, 36, 0.35)',
      iconColor: '#fbbf24',
      glow: '0 0 30px rgba(251, 191, 36, 0.5)',
      opacity: 1,
      borderWidth: '2px',
    };
  }

  // === SISTEMA / BIENVENIDA === (Azul eléctrico)
  if (type === 'welcome' || type === 'announcement' || type === 'new_feature' ||
    type === 'system_update' || type === 'push_enabled') {
    return {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(14, 165, 233, 0.2) 100%)',
      borderColor: 'rgba(59, 130, 246, 0.7)',
      iconBg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(14, 165, 233, 0.3))',
      iconColor: '#60a5fa',
      glow: '0 0 30px rgba(59, 130, 246, 0.5)',
      opacity: 1,
      borderWidth: '2px',
    };
  }

  // === ACTIVIDAD DE LINKS === (Cyan/Turquesa)
  if (type.startsWith('link_') || type.startsWith('bio_page_')) {
    return {
      background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)',
      borderColor: 'rgba(14, 165, 233, 0.6)',
      iconBg: 'rgba(14, 165, 233, 0.3)',
      iconColor: '#38bdf8',
      glow: '0 0 25px rgba(14, 165, 233, 0.4)',
      opacity: 1,
      borderWidth: '2px',
    };
  }

  // === TIPS / CONSEJOS === (Slate claro)
  if (type === 'tip_of_the_day' || type === 'daily_summary' || type === 'weekly_summary') {
    return {
      background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.2) 0%, rgba(71, 85, 105, 0.12) 100%)',
      borderColor: 'rgba(100, 116, 139, 0.5)',
      iconBg: 'rgba(100, 116, 139, 0.25)',
      iconColor: '#94a3b8',
      glow: '0 0 15px rgba(100, 116, 139, 0.3)',
      opacity: 1,
      borderWidth: '1px',
    };
  }

  // === DEFAULT basado en prioridad ===
  if (priority === 'urgent') {
    return {
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(220, 38, 38, 0.15) 100%)',
      borderColor: 'rgba(239, 68, 68, 0.6)',
      iconBg: 'rgba(239, 68, 68, 0.3)',
      iconColor: '#f87171',
      glow: '0 0 25px rgba(239, 68, 68, 0.5)',
      opacity: 1,
      borderWidth: '2px',
    };
  }

  if (priority === 'high') {
    return {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.15) 100%)',
      borderColor: 'rgba(59, 130, 246, 0.6)',
      iconBg: 'rgba(59, 130, 246, 0.3)',
      iconColor: '#60a5fa',
      glow: '0 0 25px rgba(59, 130, 246, 0.5)',
      opacity: 1,
      borderWidth: '2px',
    };
  }

  // Default para medium/low
  return {
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(79, 70, 229, 0.12) 100%)',
    borderColor: 'rgba(99, 102, 241, 0.5)',
    iconBg: 'rgba(99, 102, 241, 0.25)',
    iconColor: '#a5b4fc',
    glow: '0 0 20px rgba(99, 102, 241, 0.3)',
    opacity: 1,
    borderWidth: '2px',
  };
};

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllRead,
    refresh: refreshNotifications,
  } = useNotifications();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Push notification state
  const [pushPermission, setPushPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [pushLoading, setPushLoading] = useState(false);

  // Enable push notifications
  const enablePushNotifications = async () => {
    setPushLoading(true);
    try {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        setPushLoading(false);
        return;
      }

      await pushNotificationService.initialize();
      const subscription = await pushNotificationService.subscribe(data.user.id);

      if (subscription) {
        setPushPermission('granted');

        // Create in-app notification in database
        const { notificationsService } = await import('../lib/notificationsService');
        await notificationsService.create(
          data.user.id,
          'push_enabled',
          '🔔 ¡Notificaciones Push Activadas!',
          'Ahora recibirás alertas en tiempo real de clics, ganancias, hitos y más. ¡Nunca te perderás nada importante!',
          'high',
          { source: 'settings', device: navigator.userAgent }
        );

        // Refresh the notifications list
        await refreshNotifications();

        // Also send browser push
        await pushNotificationService.sendLocalNotification(
          '🎉 ¡Notificaciones activadas!',
          {
            body: 'Ahora recibirás alertas de clics, ganancias y más directamente aquí.',
            icon: '/icons/icon-192.png',
          }
        );
      } else {
        setPushPermission(Notification.permission);
      }
    } catch (error) {
      console.error('Push setup error:', error);
    } finally {
      setPushLoading(false);
    }
  };

  // Cerrar al hacer clic fuera
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Prevenir scroll del body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Ordenar: no leídas primero, luego por fecha
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.read !== b.read) return a.read ? 1 : -1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const handleNotificationClick = async (notification: AppNotification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(notification.id)) {
        newSet.delete(notification.id);
      } else {
        newSet.add(notification.id);
      }
      return newSet;
    });
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 9998,
            }}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <motion.div
        ref={panelRef}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        exit={{ x: '100%' }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
        }}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '420px',
          height: '100vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          borderLeft: '1px solid rgba(148, 163, 184, 0.1)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px',
            paddingTop: 'calc(env(safe-area-inset-top, 0px) + 20px)',
            borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Bell size={22} color="#a5b4fc" />
              </motion.div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#f9fafb', margin: 0 }}>
                Notificaciones
              </h2>
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '999px',
                    minWidth: '22px',
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
                  }}
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </motion.span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  border: 'none',
                  background: soundEnabled ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  color: soundEnabled ? '#4ade80' : '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}
                title={soundEnabled ? 'Sonidos activados' : 'Sonidos desactivados'}
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <button
                onClick={onClose}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#94a3b8';
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Acciones rápidas */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {unreadCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={markAllAsRead}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.1) 100%)',
                  color: '#4ade80',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                }}
              >
                <Check size={14} />
                Marcar todas como leídas
              </motion.button>
            )}
            {notifications.filter((n) => n.read).length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={deleteAllRead}
                style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.1) 100%)',
                  color: '#f87171',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                }}
              >
                <Trash2 size={14} />
                Limpiar
              </motion.button>
            )}
          </div>
        </div>

        {/* 🔔 PUSH NOTIFICATION CTA - Prominent activation banner */}
        {pushPermission !== 'granted' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              margin: '12px',
              marginBottom: '0',
              padding: '16px',
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
              border: '2px solid rgba(236, 72, 153, 0.4)',
              borderRadius: '16px',
              boxShadow: '0 0 30px rgba(236, 72, 153, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(236, 72, 153, 0.4)',
                }}
              >
                <BellRing size={22} color="white" />
              </motion.div>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#f8fafc' }}>
                  🚀 Activa notificaciones
                </h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                  Recibe alertas en tu pantalla al instante
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(236, 72, 153, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              onClick={enablePushNotifications}
              disabled={pushLoading || pushPermission === 'denied'}
              style={{
                width: '100%',
                padding: '14px',
                background: pushPermission === 'denied'
                  ? 'rgba(100, 116, 139, 0.3)'
                  : 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 700,
                cursor: pushPermission === 'denied' ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 20px rgba(236, 72, 153, 0.3)',
                opacity: pushLoading ? 0.7 : 1,
              }}
            >
              {pushLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Zap size={18} />
                  </motion.div>
                  Activando...
                </>
              ) : pushPermission === 'denied' ? (
                <>Bloqueado - Habilita en configuración del navegador</>
              ) : (
                <>
                  <BellRing size={18} />
                  Activar Notificaciones Push
                </>
              )}
            </motion.button>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginTop: '12px',
              justifyContent: 'center',
            }}>
              {['💰 Ganancias', '📈 Hitos', '🔥 Viral', '🎁 Referidos'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '4px 8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    fontSize: '10px',
                    color: '#cbd5e1',
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Lista de notificaciones */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '12px',
            paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <AnimatePresence mode="popLayout">
            {sortedNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '80px 20px',
                  textAlign: 'center',
                  color: '#64748b',
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Bell size={64} style={{ marginBottom: '20px', opacity: 0.3 }} />
                </motion.div>
                <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#94a3b8' }}>
                  No hay notificaciones
                </p>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Te notificaremos cuando haya actividad importante
                </p>
              </motion.div>
            ) : (
              sortedNotifications.map((notification, index) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  index={index}
                  onClick={() => handleNotificationClick(notification)}
                  onMarkRead={() => markAsRead(notification.id)}
                  onDelete={() => deleteNotification(notification.id)}
                  isExpanded={expandedIds.has(notification.id)}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

interface NotificationItemProps {
  notification: AppNotification;
  index: number;
  onClick: () => void;
  onMarkRead: () => void;
  onDelete: () => void;
  isExpanded: boolean;
}

function NotificationItem({ notification, index, onClick, onMarkRead, onDelete, isExpanded }: NotificationItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(notification.created_at), {
    addSuffix: true,
    locale: es,
  });

  const style = getNotificationStyle(notification.type, notification.priority, notification.read);
  const icon = getNotificationIcon(notification.type, notification.priority);
  const categoryName = getCategoryName(notification.category);

  const handleDelete = async () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete();
    }, 300);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{
        opacity: isDeleting ? 0 : (notification.read ? 0.4 : 1),
        x: isDeleting ? 100 : 0,
        scale: isDeleting ? 0.8 : 1,
      }}
      exit={{ opacity: 0, x: -50, scale: 0.9 }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300,
        delay: index * 0.03,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ x: -4, scale: notification.read ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        padding: '16px',
        borderRadius: '16px',
        background: style.background,
        border: `${style.borderWidth} solid ${style.borderColor}`,
        cursor: 'pointer',
        marginBottom: '8px',
        position: 'relative',
        overflow: 'hidden',
        opacity: style.opacity,
        boxShadow: !notification.read && isHovered
          ? `0 8px 24px rgba(0, 0, 0, 0.5), ${style.glow}`
          : !notification.read
            ? `0 4px 12px rgba(0, 0, 0, 0.3), ${style.glow}`
            : '0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Indicador de no leída - más visible */}
      {!notification.read && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '5px',
            height: '70%',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            borderRadius: '0 4px 4px 0',
            boxShadow: '0 0 12px rgba(99, 102, 241, 0.8)',
            zIndex: 1,
          }}
        />
      )}

      {/* Efecto de brillo para no leídas */}
      {!notification.read && isHovered && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
      )}

      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        {/* Icono */}
        <motion.div
          animate={!notification.read ? {
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: style.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: style.iconColor,
            flexShrink: 0,
            boxShadow: !notification.read ? `0 4px 16px ${style.iconBg}` : 'none',
          }}
        >
          {icon}
        </motion.div>

        {/* Contenido */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
            <div style={{ flex: 1 }}>
              {/* Categoría en el mensaje */}
              <div style={{
                display: 'inline-block',
                marginBottom: '6px',
                padding: '2px 8px',
                borderRadius: '6px',
                background: notification.read
                  ? 'rgba(148, 163, 184, 0.1)'
                  : 'rgba(99, 102, 241, 0.2)',
                color: notification.read ? '#64748b' : '#a5b4fc',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                {categoryName}
              </div>

              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: notification.read ? 500 : 700,
                  color: notification.read ? '#94a3b8' : '#f9fafb',
                  margin: '0 0 6px 0',
                  lineHeight: '1.4',
                }}
              >
                {notification.title}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: notification.read ? '#64748b' : '#cbd5e1',
                  margin: '0 0 8px 0',
                  lineHeight: '1.5',
                }}
              >
                {notification.message}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    color: notification.read ? '#475569' : '#64748b',
                    fontWeight: 500,
                  }}
                >
                  {timeAgo}
                </span>
                {notification.priority === 'urgent' && (
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#f87171',
                    background: 'rgba(239, 68, 68, 0.2)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}>
                    URGENTE
                  </span>
                )}
              </div>
            </div>

            {/* Acciones */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  display: 'flex',
                  gap: '4px',
                  flexShrink: 0,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {!notification.read && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onMarkRead}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'rgba(34, 197, 94, 0.15)',
                      color: '#4ade80',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                    title="Marcar como leída"
                  >
                    <Check size={14} />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDelete}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#f87171',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  title="Eliminar"
                >
                  <Trash2 size={14} />
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
