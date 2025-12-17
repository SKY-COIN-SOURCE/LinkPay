import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { notificationsService } from '../lib/notificationsService';
import { supabase } from '../lib/supabaseClient';

/**
 * Hook automático que detecta eventos en tiempo real y crea notificaciones
 * Conectado a TODOS los eventos de la app - sistema completo y funcional
 */
export function useNotificationEvents() {
  const { user } = useAuth();
  const hasCheckedFirstLink = useRef(false);
  const hasCheckedFirstEarning = useRef(false);
  const linkMilestones = useRef<Map<string, number>>(new Map());
  const revenueMilestones = useRef<Set<number>>(new Set());
  const referralMilestones = useRef<Set<number>>(new Set());
  const dailyClicks = useRef<Map<string, { count: number; date: string }>>(new Map());
  const linkCountries = useRef<Map<string, Set<string>>>(new Map());
  const linkDevices = useRef<Map<string, Set<string>>>(new Map());

  useEffect(() => {
    if (!user?.id) return;

    // ============================================================
    // SUSCRIPCIÓN A CLICS EN LINKS Y CLICK_EVENTS
    // ============================================================
    const clicksChannel = supabase
      .channel(`link-clicks:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'links',
          filter: `user_id=eq.${user.id}`,
        },
        async (payload) => {
          const link = payload.new as any;
          const oldLink = payload.old as any;

          // Si aumentaron los clics
          if (link.views > (oldLink?.views || 0)) {
            const clicksIncrease = link.views - (oldLink?.views || 0);
            const revenue = link.earnings - (oldLink?.earnings || 0);
            
            // Obtener información del último clic
            const { data: lastClicks } = await supabase
              .from('click_events')
              .select('device, country, is_paid, earned_amount')
              .eq('link_id', link.id)
              .order('created_at', { ascending: false })
              .limit(1);
            
            const lastClick = lastClicks?.[0];

            // Notificar clic (solo si es pagado o es el primer clic)
            if (revenue > 0 || (clicksIncrease === 1 && (oldLink?.views || 0) === 0)) {
              await notificationsService.notifyLinkClick(
                user.id,
                link.id,
                link.slug || link.title || 'Link',
                revenue || lastClick?.earned_amount || 0,
                lastClick?.is_paid || false,
                lastClick?.device,
                lastClick?.country
              );
            }

            // Verificar si es el primer clic
            if ((oldLink?.views || 0) === 0 && link.views === 1) {
              await notificationsService.create(
                user.id,
                'link_first_click',
                '🎯 Primer clic recibido',
                `"${link.slug || link.title}" recibió su primer clic. ¡Empieza a crecer!`,
                'medium',
                { link_id: link.id, link_alias: link.slug || link.title }
              );
            }

            // Verificar milestones de clics
            const currentClicks = link.views;
            const previousClicks = oldLink?.views || 0;
            const milestones = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];

            for (const milestone of milestones) {
              if (previousClicks < milestone && currentClicks >= milestone) {
                await notificationsService.notifyLinkMilestone(
                  user.id,
                  link.id,
                  link.slug || link.title || 'Link',
                  milestone
                );
                break;
              }
            }

            // Verificar clics diarios
            const today = new Date().toDateString();
            const linkKey = link.id;
            const daily = dailyClicks.current.get(linkKey);
            
            if (!daily || daily.date !== today) {
              dailyClicks.current.set(linkKey, { count: clicksIncrease, date: today });
            } else {
              daily.count += clicksIncrease;
              dailyClicks.current.set(linkKey, daily);
            }

            const dailyCount = dailyClicks.current.get(linkKey)?.count || 0;
            if ([10, 50, 100, 500, 1000].includes(dailyCount)) {
              await notificationsService.notifyDailyClicks(
                user.id,
                link.id,
                link.slug || link.title || 'Link',
                dailyCount
              );
            }

            // Verificar crecimiento viral (>50% en 24h)
            const { data: clicks24h } = await supabase
              .from('click_events')
              .select('id')
              .eq('link_id', link.id)
              .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

            const clicks24hAgo = (oldLink?.views || 0) - (clicks24h?.length || 0);
            if (clicks24hAgo > 0) {
              const growth = ((clicks24h?.length || 0) / clicks24hAgo) * 100;
              if (growth > 50) {
                await notificationsService.notifyLinkViral(
                  user.id,
                  link.id,
                  link.slug || link.title || 'Link',
                  Math.round(growth)
                );
              }
            }

            // Verificar nuevo país
            if (lastClick?.country) {
              const countries = linkCountries.current.get(linkKey) || new Set();
              if (!countries.has(lastClick.country)) {
                countries.add(lastClick.country);
                linkCountries.current.set(linkKey, countries);
                await notificationsService.create(
                  user.id,
                  'link_new_country',
                  '🌍 Nuevo país',
                  `"${link.slug || link.title}" recibió su primer clic desde ${lastClick.country}.`,
                  'low',
                  { link_id: link.id, country: lastClick.country }
                );
              }
            }

            // Verificar nuevo tipo de dispositivo
            if (lastClick?.device) {
              const devices = linkDevices.current.get(linkKey) || new Set();
              if (!devices.has(lastClick.device)) {
                devices.add(lastClick.device);
                linkDevices.current.set(linkKey, devices);
                await notificationsService.create(
                  user.id,
                  'link_new_device_type',
                  '📱 Nuevo dispositivo',
                  `"${link.slug || link.title}" recibió su primer clic desde ${lastClick.device}.`,
                  'low',
                  { link_id: link.id, device: lastClick.device }
                );
              }
            }

            // Verificar si está cerca del máximo de clics
            if (link.max_clicks) {
              const percentage = (link.views / link.max_clicks) * 100;
              if (percentage >= 90 && percentage < 100 && (oldLink?.views || 0) / (oldLink?.max_clicks || 1) < 0.9) {
                await notificationsService.create(
                  user.id,
                  'link_max_clicks_90pct',
                  '⚠️ Link al 90% del máximo',
                  `"${link.slug || link.title}" está al ${Math.round(percentage)}% de su máximo de clics.`,
                  'medium',
                  { link_id: link.id, percentage, max_clicks: link.max_clicks }
                );
              } else if (percentage >= 80 && percentage < 90 && (oldLink?.views || 0) / (oldLink?.max_clicks || 1) < 0.8) {
                await notificationsService.create(
                  user.id,
                  'link_max_clicks_80pct',
                  '📊 Link al 80% del máximo',
                  `"${link.slug || link.title}" está al ${Math.round(percentage)}% de su máximo de clics.`,
                  'low',
                  { link_id: link.id, percentage, max_clicks: link.max_clicks }
                );
              }
            }

            // Verificar expiración
            if (link.expires_at) {
              const daysLeft = Math.ceil((new Date(link.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              if ([1, 3, 7].includes(daysLeft) && daysLeft > 0) {
                await notificationsService.notifyLinkExpiring(
                  user.id,
                  link.id,
                  link.slug || link.title || 'Link',
                  daysLeft
                );
              }
            }
          }

          // Si aumentaron los earnings
          if (link.earnings > (oldLink?.earnings || 0)) {
            const revenue = link.earnings - (oldLink?.earnings || 0);
            // La notificación de clic ya se encarga de esto
          }
        }
      )
      .subscribe();

    // ============================================================
    // SUSCRIPCIÓN A CAMBIOS EN INGRESOS TOTALES
    // ============================================================
    const revenueChannel = supabase
      .channel(`revenue:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`,
        },
        async (payload) => {
          const profile = payload.new as any;
          const oldProfile = payload.old as any;

          // Verificar milestone de ingresos totales
          if (profile.total_earnings > (oldProfile?.total_earnings || 0)) {
            const totalRevenue = Math.floor(profile.total_earnings || 0);
            const oldTotal = Math.floor(oldProfile?.total_earnings || 0);
            const milestones = [1, 5, 10, 25, 50, 75, 100, 150, 200, 250, 300, 400, 500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 7500, 10000, 15000, 20000, 25000, 50000, 100000];

            for (const milestone of milestones) {
              if (oldTotal < milestone && totalRevenue >= milestone) {
                if (!revenueMilestones.current.has(milestone)) {
                  revenueMilestones.current.add(milestone);
                  await notificationsService.notifyRevenueMilestone(user.id, milestone);
                }
                break;
              }
            }

            // Notificar primera ganancia
            if (!hasCheckedFirstEarning.current && totalRevenue > 0) {
              hasCheckedFirstEarning.current = true;
              await notificationsService.notifyFirstEarning(user.id, totalRevenue);
            }

            // Verificar récords diarios/semanales/mensuales
            const today = new Date().toDateString();
            const { data: todayEarnings } = await supabase
              .rpc('get_daily_earnings', { p_user_id: user.id, p_date: today });

            if (todayEarnings) {
              const dailyAmount = todayEarnings as number;
              if ([1, 5, 10, 25, 50, 100].includes(dailyAmount)) {
                await notificationsService.create(
                  user.id,
                  `daily_earnings_${dailyAmount}e` as any,
                  `💰 €${dailyAmount} ganados hoy`,
                  `Has ganado €${dailyAmount} hoy. ¡Sigue así!`,
                  dailyAmount >= 50 ? 'high' : 'medium',
                  { amount: dailyAmount, period: 'day' }
                );
              }
            }
          }
        }
      )
      .subscribe();

    // ============================================================
    // SUSCRIPCIÓN A NUEVOS REFERIDOS
    // ============================================================
    const referralsChannel = supabase
      .channel(`referrals:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'profiles',
        },
        async (payload) => {
          const newProfile = payload.new as any;
          
          // Verificar si es un referido
          if (newProfile.referred_by === user.id) {
            await notificationsService.notifyReferralSignup(
              user.id,
              newProfile.id,
              newProfile.email || 'Usuario'
            );

            // Verificar milestones de referidos
            const { data: referralCount } = await supabase
              .from('profiles')
              .select('id', { count: 'exact', head: true })
              .eq('referred_by', user.id);

            const count = referralCount?.length || 0;
            const milestones = [1, 3, 5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200, 300, 500, 1000];

            for (const milestone of milestones) {
              if (count === milestone && !referralMilestones.current.has(milestone)) {
                referralMilestones.current.add(milestone);
                await notificationsService.create(
                  user.id,
                  `referral_milestone_${milestone}` as any,
                  `🎉 ${milestone} referidos`,
                  `Has alcanzado ${milestone} referidos. ¡Tu red está creciendo!`,
                  milestone >= 100 ? 'high' : 'medium',
                  { count: milestone }
                );
                break;
              }
            }
          }
        }
      )
      .subscribe();

    // ============================================================
    // SUSCRIPCIÓN A NUEVOS LINKS CREADOS
    // ============================================================
    const linksChannel = supabase
      .channel(`links-created:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'links',
          filter: `user_id=eq.${user.id}`,
        },
        async (payload) => {
          const newLink = payload.new as any;

          // Verificar si es el primer link
          const { data: allLinks } = await supabase
            .from('links')
            .select('id')
            .eq('user_id', user.id);

          if (allLinks && allLinks.length === 1) {
            hasCheckedFirstLink.current = true;
            setTimeout(async () => {
              await notificationsService.notifyFirstLink(user.id, newLink.id);
            }, 1000);
          }

          // Notificar creación de link
          await notificationsService.notifyLinkCreated(
            user.id,
            newLink.id,
            newLink.slug || newLink.title || 'Link',
            !!newLink.password,
            !!newLink.is_private
          );

          // Verificar milestones de cantidad de links
          const linkCount = allLinks?.length || 0;
          const linkMilestones = [10, 25, 50, 100, 250, 500, 1000];
          if (linkMilestones.includes(linkCount)) {
            await notificationsService.notifyAchievement(
              user.id,
              `${linkCount} Links`,
              `Has creado ${linkCount} links. ¡Eres un creador activo!`,
              `achievement_${linkCount}_links` as any
            );
          }
        }
      )
      .subscribe();

    // ============================================================
    // SUSCRIPCIÓN A CAMBIOS EN BALANCE (para payouts disponibles)
    // ============================================================
    const balanceChannel = supabase
      .channel(`balance:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`,
        },
        async (payload) => {
          const profile = payload.new as any;
          const oldProfile = payload.old as any;

          // Verificar si el balance alcanzó umbrales para payout
          if (profile.balance >= 5 && (oldProfile?.balance || 0) < 5) {
            await notificationsService.notifyPayoutAvailable(user.id, profile.balance);
          } else if (profile.balance >= 10 && (oldProfile?.balance || 0) < 10) {
            await notificationsService.notifyPayoutAvailable(user.id, profile.balance);
          } else if (profile.balance >= 25 && (oldProfile?.balance || 0) < 25) {
            await notificationsService.notifyPayoutAvailable(user.id, profile.balance);
          } else if (profile.balance >= 50 && (oldProfile?.balance || 0) < 50) {
            await notificationsService.notifyPayoutAvailable(user.id, profile.balance);
          } else if (profile.balance >= 100 && (oldProfile?.balance || 0) < 100) {
            await notificationsService.notifyPayoutAvailable(user.id, profile.balance);
          }
        }
      )
      .subscribe();

    // ============================================================
    // VERIFICACIÓN INICIAL
    // ============================================================
    const checkInitialState = async () => {
      // Verificar primer link
      if (!hasCheckedFirstLink.current) {
        const { data: links } = await supabase
          .from('links')
          .select('id')
          .eq('user_id', user.id)
          .limit(1);

        if (links && links.length === 1) {
          hasCheckedFirstLink.current = true;
          setTimeout(async () => {
            await notificationsService.notifyFirstLink(user.id, links[0].id);
          }, 2000);
        }
      }

      // Verificar primera ganancia
      if (!hasCheckedFirstEarning.current) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('total_earnings')
          .eq('id', user.id)
          .single();

        if (profile && profile.total_earnings > 0) {
          hasCheckedFirstEarning.current = true;
          await notificationsService.notifyFirstEarning(user.id, profile.total_earnings);
        }
      }

      // Verificar balance disponible para payout
      const { data: profile } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', user.id)
        .single();

      if (profile && profile.balance >= 5) {
        await notificationsService.notifyPayoutAvailable(user.id, profile.balance);
      }
    };

    checkInitialState();

    // ============================================================
    // VERIFICACIONES PERIÓDICAS
    // ============================================================
    const interval = setInterval(async () => {
      // Verificar links expirando
      const { data: expiringLinks } = await supabase
        .from('links')
        .select('id, slug, title, expires_at')
        .eq('user_id', user.id)
        .not('expires_at', 'is', null)
        .gte('expires_at', new Date().toISOString());

      if (expiringLinks) {
        for (const link of expiringLinks) {
          const daysLeft = Math.ceil((new Date(link.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          if ([1, 3, 7].includes(daysLeft)) {
            await notificationsService.notifyLinkExpiring(
              user.id,
              link.id,
              link.slug || link.title || 'Link',
              daysLeft
            );
          }
        }
      }

      // Verificar links sin actividad
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { data: inactiveLinks } = await supabase
        .from('links')
        .select('id, slug, title, views, updated_at')
        .eq('user_id', user.id)
        .lt('updated_at', sevenDaysAgo)
        .gt('views', 0)
        .limit(5);

      if (inactiveLinks && inactiveLinks.length > 0) {
        for (const link of inactiveLinks) {
          await notificationsService.create(
            user.id,
            'link_no_clicks_7d',
            '📉 Link sin actividad',
            `"${link.slug || link.title}" no ha recibido clics en 7 días. Considera actualizarlo.`,
            'low',
            { link_id: link.id, days_inactive: 7 }
          );
        }
      }
    }, 60 * 60 * 1000); // Cada hora

    return () => {
      supabase.removeChannel(clicksChannel);
      supabase.removeChannel(revenueChannel);
      supabase.removeChannel(referralsChannel);
      supabase.removeChannel(linksChannel);
      supabase.removeChannel(balanceChannel);
      clearInterval(interval);
    };
  }, [user?.id]);
}
