import { supabase } from './supabaseClient';

// ============================================================
// SISTEMA DE NOTIFICACIONES PROFESIONAL - 50+ TIPOS
// ============================================================

export type NotificationType =
  // === ACTIVIDAD DE LINKS ===
  | 'link_click'              // Nuevo clic en un link
  | 'link_milestone_100'      // 100 clics
  | 'link_milestone_500'      // 500 clics
  | 'link_milestone_1k'       // 1,000 clics
  | 'link_milestone_5k'       // 5,000 clics
  | 'link_milestone_10k'      // 10,000 clics
  | 'link_milestone_50k'      // 50,000 clics
  | 'link_milestone_100k'     // 100,000 clics
  | 'link_viral'              // Link se vuelve viral
  | 'link_trending'           // Link trending
  | 'link_top_performer_day'  // Top performer del día
  | 'link_top_performer_week' // Top performer de la semana
  | 'link_top_performer_month'// Top performer del mes
  | 'link_expiring_soon'       // Link próximo a expirar
  | 'link_expired'            // Link expirado
  | 'link_max_clicks_reached' // Link alcanzó máximo de clics
  | 'link_deleted'            // Link eliminado (backup)
  
  // === INGRESOS Y FINANZAS ===
  | 'revenue_milestone_10'    // €10 en ingresos
  | 'revenue_milestone_25'    // €25
  | 'revenue_milestone_50'    // €50
  | 'revenue_milestone_100'   // €100
  | 'revenue_milestone_250'   // €250
  | 'revenue_milestone_500'   // €500
  | 'revenue_milestone_1k'    // €1,000
  | 'revenue_milestone_2.5k'   // €2,500
  | 'revenue_milestone_5k'     // €5,000
  | 'revenue_milestone_10k'   // €10,000
  | 'first_earning'           // Primera ganancia
  | 'daily_earnings_record'    // Récord diario de ganancias
  | 'weekly_earnings_record'   // Récord semanal
  | 'monthly_earnings_record'  // Récord mensual
  
  // === PAYOUTS ===
  | 'payout_available'        // Payout disponible
  | 'payout_processed'        // Payout procesado
  | 'payout_failed'           // Payout fallido
  | 'payout_pending'          // Payout pendiente
  | 'payout_threshold_reached'// Umbral mínimo alcanzado
  
  // === REFERIDOS ===
  | 'referral_signup'         // Nuevo referido se registra
  | 'referral_first_earning'  // Referido hace su primera ganancia
  | 'referral_earnings'       // Ganancias por referido
  | 'referral_milestone_5'    // 5 referidos
  | 'referral_milestone_10'   // 10 referidos
  | 'referral_milestone_25'   // 25 referidos
  | 'referral_milestone_50'   // 50 referidos
  | 'referral_milestone_100'  // 100 referidos
  
  // === BIO PAGE ===
  | 'bio_page_view'           // Nueva vista en Bio Page
  | 'bio_page_milestone_100'  // 100 vistas
  | 'bio_page_milestone_500'  // 500 vistas
  | 'bio_page_milestone_1k'   // 1,000 vistas
  | 'bio_page_milestone_5k'   // 5,000 vistas
  | 'bio_page_milestone_10k' // 10,000 vistas
  
  // === LOGROS Y CONQUISTAS ===
  | 'achievement_first_link'  // Primer link creado
  | 'achievement_first_earning'// Primera ganancia
  | 'achievement_100_clicks'   // 100 clics totales
  | 'achievement_1k_clicks'    // 1,000 clics totales
  | 'achievement_10k_clicks'   // 10,000 clics totales
  | 'achievement_100k_clicks'  // 100,000 clics totales
  | 'achievement_1m_clicks'    // 1,000,000 clics totales
  | 'achievement_power_user'   // Usuario power (muchos links)
  | 'achievement_viral_master' // Maestro viral
  | 'achievement_earner'       // Ganador consistente
  
  // === SEGURIDAD ===
  | 'security_new_login'       // Nuevo login desde dispositivo
  | 'security_suspicious_activity' // Actividad sospechosa
  | 'security_password_changed'   // Contraseña cambiada
  | 'security_2fa_enabled'    // 2FA activado
  | 'security_2fa_disabled'    // 2FA desactivado
  | 'security_session_revoked' // Sesión cerrada
  
  // === CONFIGURACIÓN ===
  | 'profile_completed'       // Perfil completado
  | 'payment_method_added'    // Método de pago añadido
  | 'payment_method_verified' // Método de pago verificado
  | 'api_key_created'         // API key creada
  | 'api_key_used'            // API key usada
  | 'settings_updated'        // Configuración actualizada
  
  // === RESUMENES ===
  | 'daily_summary'           // Resumen diario
  | 'weekly_summary'          // Resumen semanal
  | 'monthly_summary'         // Resumen mensual
  
  // === ALERTAS Y RECORDATORIOS ===
  | 'low_balance_warning'     // Balance bajo
  | 'inactivity_reminder'      // Recordatorio de inactividad
  | 'setup_reminder'           // Recordatorio de completar setup
  | 'profile_incomplete'       // Perfil incompleto
  
  // === SISTEMA ===
  | 'system_maintenance'      // Mantenimiento programado
  | 'system_update'            // Actualización del sistema
  | 'new_feature'             // Nueva funcionalidad
  | 'announcement'            // Anuncio importante
  | 'welcome'                 // Bienvenida
  | 'streak_bonus';          // Bonus por racha

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  read: boolean;
  metadata: Record<string, any>;
  created_at: string;
  read_at: string | null;
  category?: 'activity' | 'financial' | 'social' | 'security' | 'system';
}

// ============================================================
// SERVICIO DE NOTIFICACIONES
// ============================================================

export const notificationsService = {
  // Obtener todas las notificaciones
  async getAll(userId: string, limit = 200, offset = 0): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }

    return (data || []).map(n => ({
      ...n,
      category: getNotificationCategory(n.type),
    }));
  },

  // Obtener no leídas
  async getUnread(userId: string): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .eq('read', false)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching unread notifications:', error);
      return [];
    }

    return (data || []).map(n => ({
      ...n,
      category: getNotificationCategory(n.type),
    }));
  },

  // Contar no leídas
  async getUnreadCount(userId: string): Promise<number> {
    const { data, error } = await supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('read', false);

    if (error) {
      console.error('Error counting unread notifications:', error);
      return 0;
    }

    return data?.length || 0;
  },

  // Marcar como leída
  async markAsRead(notificationId: string): Promise<boolean> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true, read_at: new Date().toISOString() })
      .eq('id', notificationId);

    if (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }

    return true;
  },

  // Marcar todas como leídas
  async markAllAsRead(userId: string): Promise<boolean> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true, read_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('read', false);

    if (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }

    return true;
  },

  // Eliminar
  async delete(notificationId: string): Promise<boolean> {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) {
      console.error('Error deleting notification:', error);
      return false;
    }

    return true;
  },

  // Eliminar todas las leídas
  async deleteAllRead(userId: string): Promise<boolean> {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', userId)
      .eq('read', true);

    if (error) {
      console.error('Error deleting read notifications:', error);
      return false;
    }

    return true;
  },

  // Crear notificación
  async create(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    priority: NotificationPriority = 'medium',
    metadata: Record<string, any> = {}
  ): Promise<Notification | null> {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type,
        title,
        message,
        priority,
        metadata,
        read: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating notification:', error);
      return null;
    }

    return {
      ...data,
      category: getNotificationCategory(type),
    };
  },

  // ============================================================
  // HELPERS ESPECÍFICOS - CREAR NOTIFICACIONES AUTOMÁTICAS
  // ============================================================

  async notifyLinkClick(userId: string, linkId: string, linkAlias: string, revenue: number): Promise<void> {
    await this.create(
      userId,
      'link_click',
      'Nuevo clic en tu link',
      `"${linkAlias}" recibió un nuevo clic. +€${revenue.toFixed(4)}`,
      'low',
      { link_id: linkId, link_alias: linkAlias, revenue }
    );
  },

  async notifyLinkMilestone(userId: string, linkId: string, linkAlias: string, clicks: number): Promise<void> {
    const milestoneMap: Record<number, NotificationType> = {
      100: 'link_milestone_100',
      500: 'link_milestone_500',
      1000: 'link_milestone_1k',
      5000: 'link_milestone_5k',
      10000: 'link_milestone_10k',
      50000: 'link_milestone_50k',
      100000: 'link_milestone_100k',
    };

    const type = milestoneMap[clicks];
    if (!type) return;

    const emoji = clicks >= 100000 ? '🚀' : clicks >= 10000 ? '🔥' : clicks >= 1000 ? '⭐' : '🎉';
    
    await this.create(
      userId,
      type,
      `${emoji} ¡${clicks.toLocaleString()} clics!`,
      `"${linkAlias}" alcanzó ${clicks.toLocaleString()} clics. ¡Increíble!`,
      clicks >= 10000 ? 'high' : 'medium',
      { link_id: linkId, link_alias: linkAlias, clicks }
    );
  },

  async notifyRevenueMilestone(userId: string, totalRevenue: number): Promise<void> {
    const milestoneMap: Record<number, NotificationType> = {
      10: 'revenue_milestone_10',
      25: 'revenue_milestone_25',
      50: 'revenue_milestone_50',
      100: 'revenue_milestone_100',
      250: 'revenue_milestone_250',
      500: 'revenue_milestone_500',
      1000: 'revenue_milestone_1k',
      2500: 'revenue_milestone_2.5k',
      5000: 'revenue_milestone_5k',
      10000: 'revenue_milestone_10k',
    };

    const type = milestoneMap[totalRevenue];
    if (!type) return;

    const emoji = totalRevenue >= 10000 ? '💎' : totalRevenue >= 1000 ? '💰' : totalRevenue >= 100 ? '💵' : '💸';
    
    await this.create(
      userId,
      type,
      `${emoji} ¡€${totalRevenue} en ingresos!`,
      `Has alcanzado €${totalRevenue} en ingresos totales. ¡Felicidades!`,
      totalRevenue >= 1000 ? 'high' : 'medium',
      { total_revenue: totalRevenue }
    );
  },

  async notifyReferralSignup(userId: string, referredUserId: string, referredEmail: string): Promise<void> {
    await this.create(
      userId,
      'referral_signup',
      '🎁 Nuevo referido',
      `${referredEmail} se registró usando tu código de referido.`,
      'medium',
      { referred_user_id: referredUserId, referred_email: referredEmail }
    );
  },

  async notifyReferralEarnings(userId: string, amount: number, fromUser: string): Promise<void> {
    await this.create(
      userId,
      'referral_earnings',
      '💰 Ganancias por referido',
      `Has ganado €${amount.toFixed(2)} por referido de ${fromUser}.`,
      'medium',
      { amount, from_user: fromUser }
    );
  },

  async notifyPayoutProcessed(userId: string, amount: number, method: string): Promise<void> {
    await this.create(
      userId,
      'payout_processed',
      '✅ Payout procesado',
      `Tu payout de €${amount.toFixed(2)} ha sido procesado vía ${method}.`,
      'high',
      { amount, method }
    );
  },

  async notifyPayoutFailed(userId: string, amount: number, reason: string): Promise<void> {
    await this.create(
      userId,
      'payout_failed',
      '⚠️ Payout fallido',
      `Tu payout de €${amount.toFixed(2)} falló: ${reason}`,
      'urgent',
      { amount, reason }
    );
  },

  async notifyPayoutAvailable(userId: string, amount: number): Promise<void> {
    await this.create(
      userId,
      'payout_available',
      '💰 Payout disponible',
      `Tienes €${amount.toFixed(2)} disponibles para retirar.`,
      'high',
      { amount }
    );
  },

  async notifyLinkViral(userId: string, linkId: string, linkAlias: string, growth: number): Promise<void> {
    await this.create(
      userId,
      'link_viral',
      '🔥 ¡Tu link se está volviendo viral!',
      `"${linkAlias}" ha crecido un ${growth}% en las últimas 24h.`,
      'high',
      { link_id: linkId, link_alias: linkAlias, growth }
    );
  },

  async notifyTopPerformer(userId: string, linkId: string, linkAlias: string, period: 'day' | 'week' | 'month'): Promise<void> {
    const typeMap = {
      day: 'link_top_performer_day',
      week: 'link_top_performer_week',
      month: 'link_top_performer_month',
    };

    await this.create(
      userId,
      typeMap[period],
      '⭐ Top Performer',
      `"${linkAlias}" es tu link con más clics este ${period === 'day' ? 'día' : period === 'week' ? 'semana' : 'mes'}.`,
      'medium',
      { link_id: linkId, link_alias: linkAlias, period }
    );
  },

  async notifySecurityAlert(userId: string, event: string, location?: string): Promise<void> {
    await this.create(
      userId,
      'security_suspicious_activity',
      '🔒 Alerta de seguridad',
      `${event}${location ? ` desde ${location}` : ''}. Si no fuiste tú, cambia tu contraseña.`,
      'urgent',
      { event, location }
    );
  },

  async notifyFirstLink(userId: string, linkId: string): Promise<void> {
    await this.create(
      userId,
      'achievement_first_link',
      '🎉 ¡Primer link creado!',
      'Has creado tu primer link. ¡Comparte y empieza a ganar!',
      'high',
      { link_id: linkId }
    );
  },

  async notifyFirstEarning(userId: string, amount: number): Promise<void> {
    await this.create(
      userId,
      'achievement_first_earning',
      '💰 ¡Primera ganancia!',
      `Has ganado tu primer €${amount.toFixed(2)}. ¡Sigue así!`,
      'high',
      { amount }
    );
  },

  async notifyAchievement(userId: string, achievementName: string, description: string, type: NotificationType): Promise<void> {
    await this.create(
      userId,
      type,
      `🏆 Logro: ${achievementName}`,
      description,
      'medium',
      { achievement_name: achievementName }
    );
  },

  async notifyBioPageView(userId: string, viewerLocation?: string): Promise<void> {
    await this.create(
      userId,
      'bio_page_view',
      '👁️ Nueva vista en tu Bio Page',
      `Alguien visitó tu Bio Page${viewerLocation ? ` desde ${viewerLocation}` : ''}.`,
      'low',
      { viewer_location: viewerLocation }
    );
  },

  async notifyBioPageMilestone(userId: string, views: number): Promise<void> {
    const milestoneMap: Record<number, NotificationType> = {
      100: 'bio_page_milestone_100',
      500: 'bio_page_milestone_500',
      1000: 'bio_page_milestone_1k',
      5000: 'bio_page_milestone_5k',
      10000: 'bio_page_milestone_10k',
    };

    const type = milestoneMap[views];
    if (!type) return;

    await this.create(
      userId,
      type,
      `🎉 ${views.toLocaleString()} vistas en tu Bio Page`,
      `Tu Bio Page alcanzó ${views.toLocaleString()} vistas. ¡Sigue creciendo!`,
      'medium',
      { views }
    );
  },
};

// Helper para categorizar notificaciones
function getNotificationCategory(type: NotificationType): Notification['category'] {
  if (type.startsWith('link_') || type.startsWith('bio_page_')) return 'activity';
  if (type.startsWith('revenue_') || type.startsWith('payout_') || type.startsWith('first_earning')) return 'financial';
  if (type.startsWith('referral_') || type.startsWith('achievement_')) return 'social';
  if (type.startsWith('security_')) return 'security';
  return 'system';
}
