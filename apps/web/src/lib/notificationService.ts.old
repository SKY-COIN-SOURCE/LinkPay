import { supabase } from './supabaseClient';

export const NotificationService = {
  // Obtener notificaciones no leídas
  getUnread: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_read', false)
      .order('created_at', { ascending: false });

    return data || [];
  },

  // Marcar como leída
  markAsRead: async (id: string) => {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
  },

  // SISTEMA AUTOMÁTICO DE EVENTOS
  // Esto normalmente iría en un Edge Function (Backend), pero lo haremos aquí para que funcione YA sin configurar servidores externos.

  // 1. Check de Logros (Se llama cada vez que hay una acción importante)
  checkAchievements: async (userId: string) => {
    // Obtener stats del usuario
    const { data: links } = await supabase.from('links').select('clicks').eq('user_id', userId);
    const totalClicks = links?.reduce((acc, l) => acc + (l.clicks || 0), 0) || 0;

    // LOGRO: 1,000 CLICS
    if (totalClicks >= 1000) {
      const { data: exists } = await supabase.from('notifications').select('*').eq('user_id', userId).eq('type', 'achievement_1k').single();
      if (!exists) {
        await supabase.from('notifications').insert({
          user_id: userId,
          type: 'achievement_1k',
          title: '🏆 ¡Hito Desbloqueado!',
          message: 'Has superado los 1,000 clics totales. Tu cuenta empieza a destacar.'
        });
      }
    }

    // LOGRO: PRIMER LINK
    if (links && links.length === 1) {
      const { data: exists } = await supabase.from('notifications').select('*').eq('user_id', userId).eq('type', 'first_link').single();
      if (!exists) {
        await supabase.from('notifications').insert({
          user_id: userId,
          type: 'first_link',
          title: '🚀 Primer Enlace Creado',
          message: 'Felicidades por dar el primer paso. ¡Comparte tu enlace para empezar a ganar!'
        });
      }
    }
  },

  // 2. Check de Referidos (Se llama al registrarse alguien con tu código)
  notifyReferral: async (referrerId: string, newUserName: string) => {
    await supabase.from('notifications').insert({
      user_id: referrerId,
      type: 'referral',
      title: '👥 ¡Nuevo Referido!',
      message: `${newUserName} se ha registrado con tu código. Ganarás un % de sus ingresos.`
    });
  }
};
