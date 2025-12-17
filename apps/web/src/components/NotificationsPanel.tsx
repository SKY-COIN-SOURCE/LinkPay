import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Bell, Check, Trash2, ExternalLink, DollarSign, TrendingUp, Users, Shield, 
  Zap, Award, Link2, Eye, Sparkles, Filter, Settings, Volume2, VolumeX,
  Activity, Calendar, Star, AlertTriangle, CheckCircle2, Info, Gift, Trophy
} from 'lucide-react';
import { useNotifications } from '../context/NotificationsContext';
import { Notification, NotificationType } from '../lib/notificationsService';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterType = 'all' | 'unread' | 'activity' | 'financial' | 'social' | 'security' | 'system';

// Iconos por tipo de notificación con animaciones
const getNotificationIcon = (type: NotificationType, priority: string) => {
  const iconClass = 'w-5 h-5';
  const urgent = priority === 'urgent';
  
  // Iconos animados según tipo
  switch (type) {
    case 'link_click':
    case 'link_milestone_100':
    case 'link_milestone_500':
    case 'link_milestone_1k':
    case 'link_milestone_5k':
    case 'link_milestone_10k':
    case 'link_milestone_50k':
    case 'link_milestone_100k':
    case 'link_viral':
    case 'link_trending':
    case 'link_top_performer_day':
    case 'link_top_performer_week':
    case 'link_top_performer_month':
      return <Link2 className={iconClass} />;
    case 'revenue_milestone_10':
    case 'revenue_milestone_25':
    case 'revenue_milestone_50':
    case 'revenue_milestone_100':
    case 'revenue_milestone_250':
    case 'revenue_milestone_500':
    case 'revenue_milestone_1k':
    case 'revenue_milestone_2.5k':
    case 'revenue_milestone_5k':
    case 'revenue_milestone_10k':
    case 'first_earning':
    case 'payout_processed':
    case 'payout_available':
    case 'payout_failed':
      return <DollarSign className={iconClass} />;
    case 'referral_signup':
    case 'referral_first_earning':
    case 'referral_earnings':
    case 'referral_milestone_5':
    case 'referral_milestone_10':
    case 'referral_milestone_25':
    case 'referral_milestone_50':
    case 'referral_milestone_100':
      return <Users className={iconClass} />;
    case 'security_new_login':
    case 'security_suspicious_activity':
    case 'security_password_changed':
    case 'security_2fa_enabled':
    case 'security_2fa_disabled':
    case 'security_session_revoked':
      return <Shield className={iconClass} />;
    case 'achievement_first_link':
    case 'achievement_first_earning':
    case 'achievement_100_clicks':
    case 'achievement_1k_clicks':
    case 'achievement_10k_clicks':
    case 'achievement_100k_clicks':
    case 'achievement_1m_clicks':
    case 'achievement_power_user':
    case 'achievement_viral_master':
    case 'achievement_earner':
      return <Trophy className={iconClass} />;
    case 'bio_page_view':
    case 'bio_page_milestone_100':
    case 'bio_page_milestone_500':
    case 'bio_page_milestone_1k':
    case 'bio_page_milestone_5k':
    case 'bio_page_milestone_10k':
      return <Eye className={iconClass} />;
    case 'daily_summary':
    case 'weekly_summary':
    case 'monthly_summary':
      return <Calendar className={iconClass} />;
    case 'new_feature':
    case 'announcement':
      return <Sparkles className={iconClass} />;
    case 'welcome':
      return <Gift className={iconClass} />;
    default:
      return <Bell className={iconClass} />;
  }
};

// Color y gradiente por tipo y prioridad
const getNotificationStyle = (type: NotificationType, priority: string, read: boolean) => {
  const baseOpacity = read ? 0.4 : 1;
  
  if (priority === 'urgent') {
    return {
      background: `linear-gradient(135deg, rgba(239, 68, 68, ${0.15 * baseOpacity}) 0%, rgba(220, 38, 38, ${0.08 * baseOpacity}) 100%)`,
      borderColor: `rgba(239, 68, 68, ${0.4 * baseOpacity})`,
      iconBg: `rgba(239, 68, 68, ${0.2 * baseOpacity})`,
      iconColor: '#f87171',
      glow: '0 0 20px rgba(239, 68, 68, 0.3)',
    };
  }
  
  if (priority === 'high') {
    return {
      background: `linear-gradient(135deg, rgba(59, 130, 246, ${0.15 * baseOpacity}) 0%, rgba(37, 99, 235, ${0.08 * baseOpacity}) 100%)`,
      borderColor: `rgba(59, 130, 246, ${0.4 * baseOpacity})`,
      iconBg: `rgba(59, 130, 246, ${0.2 * baseOpacity})`,
      iconColor: '#60a5fa',
      glow: '0 0 20px rgba(59, 130, 246, 0.3)',
    };
  }

  // Colores por categoría
  if (type.startsWith('link_') || type.startsWith('bio_page_')) {
    return {
      background: `linear-gradient(135deg, rgba(168, 85, 247, ${0.12 * baseOpacity}) 0%, rgba(139, 92, 246, ${0.06 * baseOpacity}) 100%)`,
      borderColor: `rgba(168, 85, 247, ${0.3 * baseOpacity})`,
      iconBg: `rgba(168, 85, 247, ${0.15 * baseOpacity})`,
      iconColor: '#c084fc',
      glow: '0 0 15px rgba(168, 85, 247, 0.2)',
    };
  }
  
  if (type.startsWith('revenue_') || type.startsWith('payout_') || type.startsWith('first_earning')) {
    return {
      background: `linear-gradient(135deg, rgba(34, 197, 94, ${0.12 * baseOpacity}) 0%, rgba(22, 163, 74, ${0.06 * baseOpacity}) 100%)`,
      borderColor: `rgba(34, 197, 94, ${0.3 * baseOpacity})`,
      iconBg: `rgba(34, 197, 94, ${0.15 * baseOpacity})`,
      iconColor: '#4ade80',
      glow: '0 0 15px rgba(34, 197, 94, 0.2)',
    };
  }
  
  if (type.startsWith('referral_') || type.startsWith('achievement_')) {
    return {
      background: `linear-gradient(135deg, rgba(249, 115, 22, ${0.12 * baseOpacity}) 0%, rgba(234, 88, 12, ${0.06 * baseOpacity}) 100%)`,
      borderColor: `rgba(249, 115, 22, ${0.3 * baseOpacity})`,
      iconBg: `rgba(249, 115, 22, ${0.15 * baseOpacity})`,
      iconColor: '#fb923c',
      glow: '0 0 15px rgba(249, 115, 22, 0.2)',
    };
  }
  
  if (type.startsWith('security_')) {
    return {
      background: `linear-gradient(135deg, rgba(239, 68, 68, ${0.12 * baseOpacity}) 0%, rgba(220, 38, 38, ${0.06 * baseOpacity}) 100%)`,
      borderColor: `rgba(239, 68, 68, ${0.3 * baseOpacity})`,
      iconBg: `rgba(239, 68, 68, ${0.15 * baseOpacity})`,
      iconColor: '#f87171',
      glow: '0 0 15px rgba(239, 68, 68, 0.2)',
    };
  }

  // Default
  return {
    background: `linear-gradient(135deg, rgba(99, 102, 241, ${0.1 * baseOpacity}) 0%, rgba(79, 70, 229, ${0.05 * baseOpacity}) 100%)`,
    borderColor: `rgba(99, 102, 241, ${0.25 * baseOpacity})`,
    iconBg: `rgba(99, 102, 241, ${0.12 * baseOpacity})`,
    iconColor: '#a5b4fc',
    glow: '0 0 10px rgba(99, 102, 241, 0.15)',
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
  } = useNotifications();

  const [filter, setFilter] = useState<FilterType>('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

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

  const filteredNotifications = (() => {
    let filtered = notifications;
    
    if (filter === 'unread') {
      filtered = filtered.filter((n) => !n.read);
    } else if (filter !== 'all') {
      filtered = filtered.filter((n) => n.category === filter);
    }
    
    return filtered;
  })();

  const handleNotificationClick = async (notification: Notification) => {
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

  const filterOptions: { value: FilterType; label: string; icon: any; count?: number }[] = [
    { value: 'all', label: 'Todas', icon: Bell, count: notifications.length },
    { value: 'unread', label: 'No leídas', icon: AlertTriangle, count: unreadCount },
    { value: 'activity', label: 'Actividad', icon: Activity },
    { value: 'financial', label: 'Finanzas', icon: DollarSign },
    { value: 'social', label: 'Social', icon: Users },
    { value: 'security', label: 'Seguridad', icon: Shield },
    { value: 'system', label: 'Sistema', icon: Settings },
  ];

  return (
    <>
      {/* Overlay con animación */}
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

      {/* Panel con animación de slide */}
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
        {/* Header con gradiente animado */}
        <div
          style={{
            padding: '20px',
            paddingTop: 'calc(env(safe-area-inset-top, 0px) + 20px)',
            borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Efecto de partículas en el fondo del header */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
              `,
              animation: 'lp-header-shimmer 3s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
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

          {/* Filtros horizontales con scroll */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            overflowX: 'auto',
            paddingBottom: '4px',
            position: 'relative',
            zIndex: 1,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}>
            <style>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>
            {filterOptions.map((option) => {
              const Icon = option.icon;
              const isActive = filter === option.value;
              return (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(option.value)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    background: isActive 
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(79, 70, 229, 0.2) 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: isActive ? '#a5b4fc' : '#94a3b8',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 2px 8px rgba(99, 102, 241, 0.2)' : 'none',
                  }}
                >
                  <Icon size={14} />
                  <span>{option.label}</span>
                  {option.count !== undefined && option.count > 0 && (
                    <span style={{
                      background: isActive ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                      padding: '2px 6px',
                      borderRadius: '999px',
                      fontSize: '10px',
                      fontWeight: 700,
                    }}>
                      {option.count}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Acciones rápidas */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', position: 'relative', zIndex: 1 }}>
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

        {/* Lista de notificaciones con animaciones */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '12px',
            paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)',
            WebkitOverflowScrolling: 'touch',
            position: 'relative',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredNotifications.length === 0 ? (
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
                  {filter === 'unread' ? 'No hay notificaciones no leídas' : 'No hay notificaciones'}
                </p>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  {filter === 'unread'
                    ? 'Todas tus notificaciones están leídas'
                    : 'Te notificaremos cuando haya actividad importante'}
                </p>
              </motion.div>
            ) : (
              filteredNotifications.map((notification, index) => (
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

      <style>{`
        @keyframes lp-header-shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}

interface NotificationItemProps {
  notification: Notification;
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
        opacity: isDeleting ? 0 : 1, 
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
      whileHover={{ x: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      style={{
        padding: '16px',
        borderRadius: '16px',
        background: style.background,
        border: `1px solid ${style.borderColor}`,
        cursor: 'pointer',
        marginBottom: '8px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isHovered ? `0 8px 24px rgba(0, 0, 0, 0.4), ${style.glow}` : '0 2px 8px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Indicador de no leída con animación */}
      {!notification.read && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '4px',
            height: '60%',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            borderRadius: '0 4px 4px 0',
            boxShadow: '0 0 8px rgba(99, 102, 241, 0.6)',
          }}
        />
      )}

      {/* Efecto de brillo al hover */}
      {isHovered && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
      )}

      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        {/* Icono con animación */}
        <motion.div
          animate={!notification.read ? {
            scale: [1, 1.1, 1],
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
            boxShadow: `0 4px 12px ${style.iconBg}`,
          }}
        >
          {icon}
        </motion.div>

        {/* Contenido */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: notification.read ? '#cbd5e1' : '#f9fafb',
                  margin: '0 0 4px 0',
                  lineHeight: '1.4',
                }}
              >
                {notification.title}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: notification.read ? '#64748b' : '#94a3b8',
                  margin: '0 0 8px 0',
                  lineHeight: '1.5',
                }}
              >
                {notification.message}
              </p>
              
              {/* Metadata expandida */}
              {isExpanded && notification.metadata && Object.keys(notification.metadata).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    marginTop: '8px',
                    padding: '8px',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#94a3b8',
                    fontFamily: 'monospace',
                  }}
                >
                  {JSON.stringify(notification.metadata, null, 2)}
                </motion.div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#64748b',
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
                    background: 'rgba(239, 68, 68, 0.15)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}>
                    URGENTE
                  </span>
                )}
              </div>
            </div>

            {/* Acciones con animación */}
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
