import { supabase } from './supabase';

interface RawEvent {
  created_at: string;
  country?: string | null;
  device?: string | null;
}

export const AnalyticsService = {
  // Obtener resumen general (links + bio)
  getDashboardData: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Últimos 30 días
    const since = new Date();
    since.setDate(since.getDate() - 30);

    // 1) CLICS DE LINKS
    const { data: linkClicks, error: linksErr } = await supabase
      .from('clicks')
      .select('created_at, country, device')
      .gte('created_at', since.toISOString());

    if (linksErr) {
      console.warn('[AnalyticsService] error cargando clicks:', linksErr);
    }

    // 3. OBTENER INFORMACIÓN DE PERFILES BIO (Earnings + Views)
    const { data: bioProfiles, error: profErr } = await supabase
      .from('bio_profiles')
      .select('earnings, views, monetization_mode')
      .eq('user_id', user.id);

    if (profErr) {
      console.warn('[AnalyticsService] error cargando bio_profiles:', profErr);
    }

    const { data: bioClicks, error: bioErr } = await supabase
      .from('click_events')
      .select('created_at, country, device')
      .not('bio_profile_id', 'is', null) // Filtrar solo eventos de bio
      .gte('created_at', since.toISOString());

    if (bioErr) {
      console.warn('[AnalyticsService] error cargando bio_clicks:', bioErr);
    }

    const allEvents: RawEvent[] = [
      ...(linkClicks || []),
      ...(bioClicks || []),
    ];

    const timeline = processTimeline(allEvents);
    const devices = processDevices(allEvents);
    const countries = processCountries(allEvents);

    // Calcular Totales Globales
    const bioRevenue = bioProfiles?.reduce((acc, curr) => acc + (curr.earnings || 0), 0) || 0;
    const bioViewsTotal = bioProfiles?.reduce((acc, curr) => acc + (curr.views || 0), 0) || 0;

    return {
      timeline,
      devices,
      countries,
      totalClicks: allEvents.length,
      bioRevenue, // Total acumulado de Bios
      bioClicks: bioViewsTotal, // Total acumulado de visitas a Bio
    };
  },
};

// ---------- HELPERS ----------

function processTimeline(events: RawEvent[]) {
  const days: Record<string, number> = {};

  // Inicializar últimos 30 días a 0
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
    days[key] = 0;
  }

  events.forEach((e) => {
    const key = new Date(e.created_at).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
    if (days[key] !== undefined) days[key]++;
  });

  return Object.keys(days).map((date) => ({
    date,
    clicks: days[date],
  }));
}

function processDevices(events: RawEvent[]) {
  const counts: Record<string, number> = {
    Mobile: 0,
    Desktop: 0,
    Tablet: 0,
  };

  events.forEach((e) => {
    const dev = (e.device as string) || 'Desktop';
    if (dev === 'Mobile') counts.Mobile++;
    else if (dev === 'Tablet') counts.Tablet++;
    else counts.Desktop++;
  });

  const result = [
    { device: 'Móvil', value: counts.Mobile },
    { device: 'Escritorio', value: counts.Desktop },
    { device: 'Tablet', value: counts.Tablet },
  ].filter((d) => d.value > 0);

  return result;
}

function processCountries(events: RawEvent[]) {
  const counts: Record<string, number> = {};

  events.forEach((e) => {
    const c = (e.country || 'Unknown').toUpperCase();
    counts[c] = (counts[c] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([country, value]) => ({ country, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}
