import { supabase } from './supabaseClient';

// ============================================================
// SISTEMA DE NOTIFICACIONES PROFESIONAL - 50+ TIPOS
// ============================================================

export type NotificationType =
  // === ACTIVIDAD DE LINKS ===
  | 'link_click'              // Nuevo clic en un link
  | 'link_first_click'        // Primer clic en un link
  | 'link_milestone_10'       // 10 clics
  | 'link_milestone_25'       // 25 clics
  | 'link_milestone_50'       // 50 clics
  | 'link_milestone_100'      // 100 clics
  | 'link_milestone_250'      // 250 clics
  | 'link_milestone_500'      // 500 clics
  | 'link_milestone_1k'       // 1,000 clics
  | 'link_milestone_2.5k'     // 2,500 clics
  | 'link_milestone_5k'       // 5,000 clics
  | 'link_milestone_10k'      // 10,000 clics
  | 'link_milestone_25k'      // 25,000 clics
  | 'link_milestone_50k'      // 50,000 clics
  | 'link_milestone_100k'     // 100,000 clics
  | 'link_milestone_250k'     // 250,000 clics
  | 'link_milestone_500k'     // 500,000 clics
  | 'link_milestone_1m'       // 1,000,000 clics
  | 'link_viral'              // Link se vuelve viral
  | 'link_trending'           // Link trending
  | 'link_top_performer_day'  // Top performer del día
  | 'link_top_performer_week' // Top performer de la semana
  | 'link_top_performer_month'// Top performer del mes
  | 'link_expiring_soon'      // Link próximo a expirar
  | 'link_expiring_1d'        // Link expira en 1 día
  | 'link_expiring_3d'        // Link expira en 3 días
  | 'link_expiring_7d'        // Link expira en 7 días
  | 'link_expired'            // Link expirado
  | 'link_max_clicks_reached' // Link alcanzó máximo de clics
  | 'link_max_clicks_80pct'   // Link al 80% del máximo
  | 'link_max_clicks_90pct'   // Link al 90% del máximo
  | 'link_deleted'            // Link eliminado (backup)
  | 'link_created'            // Link creado
  | 'link_password_protected' // Link protegido con contraseña
  | 'link_private_created'    // Link privado creado
  | 'link_new_country'        // Nuevo clic desde país nuevo
  | 'link_new_device_type'    // Nuevo tipo de dispositivo
  | 'link_no_clicks_7d'       // Sin actividad 7 días
  | 'link_daily_10'           // 10 clics diarios
  | 'link_daily_25'           // 25 clics diarios
  | 'link_daily_50'           // 50 clics diarios
  | 'link_daily_100'          // 100 clics diarios
  | 'link_daily_500'          // 500 clics diarios
  | 'link_daily_1000'         // 1000 clics diarios

  // === INGRESOS Y FINANZAS ===
  | 'revenue_milestone_1'     // €1 en ingresos
  | 'revenue_milestone_5'     // €5
  | 'revenue_milestone_10'    // €10 en ingresos
  | 'revenue_milestone_25'    // €25
  | 'revenue_milestone_50'    // €50
  | 'revenue_milestone_75'    // €75
  | 'revenue_milestone_100'   // €100
  | 'revenue_milestone_150'   // €150
  | 'revenue_milestone_200'   // €200
  | 'revenue_milestone_250'   // €250
  | 'revenue_milestone_300'   // €300
  | 'revenue_milestone_400'   // €400
  | 'revenue_milestone_500'   // €500
  | 'revenue_milestone_750'   // €750
  | 'revenue_milestone_1k'    // €1,000
  | 'revenue_milestone_1.5k'  // €1,500
  | 'revenue_milestone_2k'    // €2,000
  | 'revenue_milestone_2.5k'  // €2,500
  | 'revenue_milestone_3k'    // €3,000
  | 'revenue_milestone_4k'    // €4,000
  | 'revenue_milestone_5k'    // €5,000
  | 'revenue_milestone_7.5k'  // €7,500
  | 'revenue_milestone_10k'   // €10,000
  | 'revenue_milestone_15k'   // €15,000
  | 'revenue_milestone_20k'   // €20,000
  | 'revenue_milestone_25k'   // €25,000
  | 'revenue_milestone_50k'   // €50,000
  | 'revenue_milestone_100k'  // €100,000
  | 'first_earning'           // Primera ganancia
  | 'daily_earnings_record'   // Récord diario de ganancias
  | 'weekly_earnings_record'  // Récord semanal
  | 'monthly_earnings_record' // Récord mensual
  | 'daily_earnings_1e'       // €1 diario
  | 'daily_earnings_5e'       // €5 diarios
  | 'daily_earnings_10e'      // €10 diarios
  | 'daily_earnings_25e'      // €25 diarios
  | 'daily_earnings_50e'      // €50 diarios
  | 'daily_earnings_100e'     // €100 diarios
  | 'weekend_bonus'           // Bonus de fin de semana
  | 'morning_rush'            // Pico de actividad matutino
  | 'night_owl'               // Actividad nocturna destacada

  // === PAYOUTS ===
  | 'payout_available'        // Payout disponible
  | 'payout_processed'        // Payout procesado
  | 'payout_failed'           // Payout fallido
  | 'payout_pending'          // Payout pendiente
  | 'payout_threshold_reached'// Umbral mínimo alcanzado
  | 'payout_5e_available'     // €5 disponibles
  | 'payout_10e_available'    // €10 disponibles
  | 'payout_25e_available'    // €25 disponibles
  | 'payout_50e_available'    // €50 disponibles
  | 'payout_100e_available'   // €100 disponibles

  // === REFERIDOS ===
  | 'referral_signup'         // Nuevo referido se registra
  | 'referral_first_earning'  // Referido hace su primera ganancia
  | 'referral_earnings'       // Ganancias por referido
  | 'referral_milestone_1'    // 1 referido
  | 'referral_milestone_3'    // 3 referidos
  | 'referral_milestone_5'    // 5 referidos
  | 'referral_milestone_10'   // 10 referidos
  | 'referral_milestone_15'   // 15 referidos
  | 'referral_milestone_20'   // 20 referidos
  | 'referral_milestone_25'   // 25 referidos
  | 'referral_milestone_30'   // 30 referidos
  | 'referral_milestone_40'   // 40 referidos
  | 'referral_milestone_50'   // 50 referidos
  | 'referral_milestone_75'   // 75 referidos
  | 'referral_milestone_100'  // 100 referidos
  | 'referral_milestone_150'  // 150 referidos
  | 'referral_milestone_200'  // 200 referidos
  | 'referral_milestone_300'  // 300 referidos
  | 'referral_milestone_500'  // 500 referidos
  | 'referral_milestone_1000' // 1000 referidos

  // === BIO PAGE ===
  | 'bio_page_view'           // Nueva vista en Bio Page
  | 'bio_page_milestone_10'   // 10 vistas
  | 'bio_page_milestone_25'   // 25 vistas
  | 'bio_page_milestone_50'   // 50 vistas
  | 'bio_page_milestone_100'  // 100 vistas
  | 'bio_page_milestone_250'  // 250 vistas
  | 'bio_page_milestone_500'  // 500 vistas
  | 'bio_page_milestone_1k'   // 1,000 vistas
  | 'bio_page_milestone_2.5k' // 2,500 vistas
  | 'bio_page_milestone_5k'   // 5,000 vistas
  | 'bio_page_milestone_10k'  // 10,000 vistas
  | 'bio_page_milestone_25k'  // 25,000 vistas
  | 'bio_page_milestone_50k'  // 50,000 vistas
  | 'bio_page_milestone_100k' // 100,000 vistas

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
  | 'achievement_10_links'     // 10 links creados
  | 'achievement_25_links'     // 25 links creados
  | 'achievement_50_links'     // 50 links creados
  | 'achievement_100_links'    // 100 links creados
  | 'achievement_250_links'    // 250 links creados
  | 'achievement_500_links'    // 500 links creados
  | 'achievement_1000_links'   // 1000 links creados
  | 'achievement_consistent_week' // 7 días consecutivos activo
  | 'achievement_consistent_month' // 30 días consecutivos activo

  // === SEGURIDAD ===
  | 'security_new_login'       // Nuevo login desde dispositivo
  | 'security_suspicious_activity' // Actividad sospechosa
  | 'security_password_changed'   // Contraseña cambiada
  | 'security_2fa_enabled'    // 2FA activado
  | 'security_2fa_disabled'    // 2FA desactivado
  | 'security_session_revoked' // Sesión cerrada
  | 'security_new_device'     // Nuevo dispositivo detectado
  | 'security_new_location'   // Nueva ubicación detectada

  // === CONFIGURACIÓN ===
  | 'profile_completed'       // Perfil completado
  | 'payment_method_added'    // Método de pago añadido
  | 'payment_method_verified' // Método de pago verificado
  | 'api_key_created'         // API key creada
  | 'api_key_used'            // API key usada
  | 'settings_updated'        // Configuración actualizada
  | 'push_enabled'            // Push notifications activadas
  | 'push_disabled'           // Push notifications desactivadas

  // === RESUMENES ===
  | 'daily_summary'           // Resumen diario
  | 'weekly_summary'          // Resumen semanal
  | 'monthly_summary'         // Resumen mensual
  | 'yearly_summary'          // Resumen anual

  // === ALERTAS Y RECORDATORIOS ===
  | 'low_balance_warning'     // Balance bajo
  | 'inactivity_reminder'     // Recordatorio de inactividad
  | 'setup_reminder'          // Recordatorio de completar setup
  | 'profile_incomplete'      // Perfil incompleto
  | 'comeback_bonus'          // Bonus por volver

  // === SISTEMA ===
  | 'system_maintenance'      // Mantenimiento programado
  | 'system_update'           // Actualización del sistema
  | 'new_feature'             // Nueva funcionalidad
  | 'announcement'            // Anuncio importante
  | 'welcome'                 // Bienvenida
  | 'streak_bonus'            // Bonus por racha
  | 'tip_of_the_day'          // Consejo del día
  | 'promo_special';          // Promoción especial

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

    // 🔔 Trigger local push notification for high/urgent priority
    if ((priority === 'high' || priority === 'urgent') && typeof window !== 'undefined') {
      this.triggerLocalPush(title, message, priority);
    }

    return {
      ...data,
      category: getNotificationCategory(type),
    };
  },

  // Trigger local push notification via service worker
  async triggerLocalPush(title: string, body: string, priority: NotificationPriority): Promise<void> {
    try {
      // Check if we have permission and service worker
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        const registration = await navigator.serviceWorker.ready;

        // Using extended options supported by service worker notifications
        const options = {
          body,
          icon: '/icons/icon-192.png',
          badge: '/icons/icon-192.png',
          vibrate: priority === 'urgent' ? [200, 100, 200, 100, 200] : [200, 100, 200],
          tag: `linkpay-${priority}-${Date.now()}`,
          requireInteraction: priority === 'urgent',
          silent: false,
          data: {
            url: '/app',
            priority,
            timestamp: Date.now(),
          },
        };

        await registration.showNotification(title, options as NotificationOptions);

        console.log('🔔 Local push notification sent:', title);
      }
    } catch (error) {
      console.warn('Could not send local push:', error);
    }
  },

  // ============================================================
  // HELPERS ESPECÍFICOS - CREAR NOTIFICACIONES AUTOMÁTICAS
  // ============================================================

  async notifyLinkClick(
    userId: string,
    linkId: string,
    linkAlias: string,
    revenue: number,
    isPaid: boolean = false,
    device?: string,
    country?: string
  ): Promise<void> {
    const deviceInfo = device ? ` desde ${device}` : '';
    const countryInfo = country ? ` (${country})` : '';
    const revenueInfo = revenue > 0 ? ` +€${revenue.toFixed(4)}` : '';

    await this.create(
      userId,
      'link_click',
      isPaid ? '💰 Clic monetizado' : '👆 Nuevo clic',
      `"${linkAlias}" recibió un clic${deviceInfo}${countryInfo}.${revenueInfo}`,
      isPaid ? 'medium' : 'low',
      { link_id: linkId, link_alias: linkAlias, revenue, is_paid: isPaid, device, country }
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
    const typeMap: Record<'day' | 'week' | 'month', NotificationType> = {
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

  // ============================================================
  // NUEVAS FUNCIONES - REQUERIDAS POR useNotificationEvents
  // ============================================================

  async notifyDailyClicks(userId: string, linkId: string, linkAlias: string, clicks: number): Promise<void> {
    const milestoneMap: Record<number, NotificationType> = {
      10: 'link_daily_10',
      25: 'link_daily_25',
      50: 'link_daily_50',
      100: 'link_daily_100',
      500: 'link_daily_500',
      1000: 'link_daily_1000',
    };

    const type = milestoneMap[clicks];
    if (!type) return;

    const emoji = clicks >= 500 ? '🔥' : clicks >= 100 ? '⭐' : '📈';

    await this.create(
      userId,
      type,
      `${emoji} ¡${clicks} clics hoy!`,
      `"${linkAlias}" ha recibido ${clicks} clics hoy. ¡Sigue así!`,
      clicks >= 100 ? 'high' : 'medium',
      { link_id: linkId, link_alias: linkAlias, clicks, period: 'day' }
    );
  },

  async notifyLinkCreated(
    userId: string,
    linkId: string,
    linkAlias: string,
    hasPassword: boolean = false,
    isPrivate: boolean = false
  ): Promise<void> {
    let type: NotificationType = 'link_created';
    let title = '🔗 Link creado';
    let message = `"${linkAlias}" está listo para compartir.`;

    if (hasPassword) {
      type = 'link_password_protected';
      title = '🔒 Link protegido creado';
      message = `"${linkAlias}" está protegido con contraseña.`;
    } else if (isPrivate) {
      type = 'link_private_created';
      title = '🔐 Link privado creado';
      message = `"${linkAlias}" es privado y solo tú puedes verlo.`;
    }

    await this.create(
      userId,
      type,
      title,
      message,
      'low',
      { link_id: linkId, link_alias: linkAlias, has_password: hasPassword, is_private: isPrivate }
    );
  },

  async notifyLinkExpiring(userId: string, linkId: string, linkAlias: string, daysLeft: number): Promise<void> {
    const typeMap: Record<number, NotificationType> = {
      1: 'link_expiring_1d',
      3: 'link_expiring_3d',
      7: 'link_expiring_7d',
    };

    const type = typeMap[daysLeft] || 'link_expiring_soon';
    const emoji = daysLeft === 1 ? '⚠️' : daysLeft <= 3 ? '⏰' : '📅';
    const priority = daysLeft === 1 ? 'high' : daysLeft <= 3 ? 'medium' : 'low';

    await this.create(
      userId,
      type,
      `${emoji} Link expira en ${daysLeft} día${daysLeft > 1 ? 's' : ''}`,
      `"${linkAlias}" expirará en ${daysLeft} día${daysLeft > 1 ? 's' : ''}. Renuévalo si quieres mantenerlo activo.`,
      priority as 'low' | 'medium' | 'high' | 'urgent',
      { link_id: linkId, link_alias: linkAlias, days_left: daysLeft }
    );
  },

  // Generar notificaciones históricas para nuevas cuentas
  async generateHistoricalNotifications(userId: string): Promise<void> {
    const now = new Date();
    const notifications = [
      // === SISTEMA Y BIENVENIDA ===
      {
        type: 'welcome' as NotificationType,
        title: '🎉 ¡Bienvenido a LinkPay!',
        message: 'Estamos emocionados de tenerte aquí. Empieza a crear links y gana dinero.',
        priority: 'high' as const,
        createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000), // Hace 24 horas
      },
      {
        type: 'tip_of_the_day' as NotificationType,
        title: '💡 Consejo del día',
        message: 'Comparte tus links en redes sociales para maximizar tus ganancias.',
        priority: 'low' as const,
        createdAt: new Date(now.getTime() - 23 * 60 * 60 * 1000),
      },
      {
        type: 'new_feature' as NotificationType,
        title: '✨ Nueva función disponible',
        message: 'Ahora puedes ver estadísticas geográficas de tus clics. ¡Descúbrelo en Analytics!',
        priority: 'medium' as const,
        createdAt: new Date(now.getTime() - 22 * 60 * 60 * 1000),
      },

      // === ACTIVIDAD DE LINKS ===
      {
        type: 'link_created' as NotificationType,
        title: '🔗 Link creado',
        message: 'Tu primer link está listo para compartir. ¡Copia y pega en tus redes!',
        priority: 'low' as const,
        createdAt: new Date(now.getTime() - 20 * 60 * 60 * 1000),
      },
      {
        type: 'link_first_click' as NotificationType,
        title: '🎯 ¡Primer clic recibido!',
        message: 'Tu link recibió su primer clic. ¡El comienzo de algo grande!',
        priority: 'medium' as const,
        createdAt: new Date(now.getTime() - 18 * 60 * 60 * 1000),
      },
      {
        type: 'link_click' as NotificationType,
        title: '👆 Nuevo clic desde España',
        message: 'Tu link recibió un clic desde móvil. +€0.0012',
        priority: 'low' as const,
        createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000),
      },
      {
        type: 'link_new_country' as NotificationType,
        title: '🌍 Nuevo país: México',
        message: 'Tu link recibió su primer clic desde México. ¡Tu alcance crece!',
        priority: 'low' as const,
        createdAt: new Date(now.getTime() - 10 * 60 * 60 * 1000),
      },
      {
        type: 'link_milestone_10' as NotificationType,
        title: '🎉 ¡10 clics alcanzados!',
        message: 'Tu link alcanzó 10 clics. ¡Sigue compartiéndolo!',
        priority: 'medium' as const,
        createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000),
      },
      {
        type: 'link_daily_10' as NotificationType,
        title: '📈 ¡10 clics hoy!',
        message: 'Tu link está en racha, ha recibido 10 clics hoy.',
        priority: 'medium' as const,
        createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000),
      },
      {
        type: 'link_milestone_50' as NotificationType,
        title: '⭐ ¡50 clics!',
        message: 'Tu link alcanzó 50 clics. ¡Vas por buen camino!',
        priority: 'medium' as const,
        createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000),
      },
      {
        type: 'link_viral' as NotificationType,
        title: '🔥 ¡Tu link se está volviendo viral!',
        message: 'Tu link ha crecido un 200% en las últimas 24h. ¡Está explotando!',
        priority: 'high' as const,
        createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      },
      {
        type: 'link_milestone_100' as NotificationType,
        title: '🎊 ¡100 clics!',
        message: 'Tu link alcanzó 100 clics. ¡Increíble progreso!',
        priority: 'high' as const,
        createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      },

      // === INGRESOS Y FINANZAS ===
      {
        type: 'first_earning' as NotificationType,
        title: '💰 ¡Primera ganancia!',
        message: 'Has ganado tu primer €0.05. ¡El comienzo de algo grande!',
        priority: 'high' as const,
        createdAt: new Date(now.getTime() - 16 * 60 * 60 * 1000),
      },
      {
        type: 'revenue_milestone_1' as NotificationType,
        title: '💵 ¡€1 en ingresos!',
        message: 'Has alcanzado €1 en ingresos totales. ¡Primer euro ganado!',
        priority: 'medium' as const,
        createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000),
      },
      {
        type: 'revenue_milestone_5' as NotificationType,
        title: '💵 ¡€5 en ingresos!',
        message: 'Has alcanzado €5 en ingresos. ¡Sigue creciendo!',
        priority: 'medium' as const,
        createdAt: new Date(now.getTime() - 2.5 * 60 * 60 * 1000),
      },
      {
        type: 'daily_earnings_1e' as NotificationType,
        title: '📈 €1 ganado hoy',
        message: 'Has ganado €1 hoy. ¡Buen día de trabajo!',
        priority: 'medium' as const,
        createdAt: new Date(now.getTime() - 1.5 * 60 * 60 * 1000),
      },
      {
        type: 'payout_5e_available' as NotificationType,
        title: '💰 Payout disponible',
        message: 'Tienes €5.00 disponibles para retirar. ¡Ya puedes solicitar tu primer payout!',
        priority: 'high' as const,
        createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      },

      // === REFERIDOS ===
      {
        type: 'referral_signup' as NotificationType,
        title: '🎁 Nuevo referido',
        message: 'Un nuevo usuario se registró usando tu código. Ganarás 5% de sus ingresos.',
        priority: 'medium' as const,
        createdAt: new Date(now.getTime() - 14 * 60 * 60 * 1000),
      },
      {
        type: 'referral_first_earning' as NotificationType,
        title: '🎉 Tu referido ganó dinero',
        message: 'Tu referido hizo su primera ganancia. ¡Tú también ganas!',
        priority: 'medium' as const,
        createdAt: new Date(now.getTime() - 7 * 60 * 60 * 1000),
      },
      {
        type: 'referral_earnings' as NotificationType,
        title: '💸 Ganancias por referido',
        message: 'Has ganado €0.50 por la actividad de tu referido.',
        priority: 'low' as const,
        createdAt: new Date(now.getTime() - 45 * 60 * 1000),
      },

      // === LOGROS ===
      {
        type: 'achievement_first_link' as NotificationType,
        title: '🏆 Logro: Primer Link',
        message: 'Has creado tu primer link. ¡Bienvenido al mundo de los creadores!',
        priority: 'medium' as const,
        createdAt: new Date(now.getTime() - 21 * 60 * 60 * 1000),
      },
      {
        type: 'achievement_first_earning' as NotificationType,
        title: '🏆 Logro: Primera Ganancia',
        message: 'Has ganado tu primer dinero en LinkPay. ¡Eres oficialmente un creador!',
        priority: 'medium' as const,
        createdAt: new Date(now.getTime() - 15 * 60 * 60 * 1000),
      },
      {
        type: 'achievement_100_clicks' as NotificationType,
        title: '🏆 Logro: 100 Clics',
        message: 'Tus links han recibido 100 clics en total. ¡Vas genial!',
        priority: 'medium' as const,
        createdAt: new Date(now.getTime() - 30 * 60 * 1000),
      },

      // === SEGURIDAD ===
      {
        type: 'security_new_login' as NotificationType,
        title: '🔐 Nuevo inicio de sesión',
        message: 'Se detectó un inicio de sesión desde Chrome en MacOS, España.',
        priority: 'medium' as const,
        createdAt: new Date(now.getTime() - 19 * 60 * 60 * 1000),
      },

      // === RECIENTES (últimos minutos) ===
      {
        type: 'link_click' as NotificationType,
        title: '👆 Nuevo clic',
        message: 'Tu link recibió un clic desde desktop. +€0.0025',
        priority: 'low' as const,
        createdAt: new Date(now.getTime() - 15 * 60 * 1000),
      },
      {
        type: 'streak_bonus' as NotificationType,
        title: '🔥 Bonus por racha',
        message: 'Llevas 3 días seguidos con actividad. ¡Sigue así para desbloquear más bonuses!',
        priority: 'medium' as const,
        createdAt: new Date(now.getTime() - 5 * 60 * 1000),
      },
    ];

    // Crear todas las notificaciones históricas
    for (const notif of notifications) {
      await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          type: notif.type,
          title: notif.title,
          message: notif.message,
          priority: notif.priority,
          read: false,
          metadata: {},
          created_at: notif.createdAt.toISOString(),
        });
    }
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
