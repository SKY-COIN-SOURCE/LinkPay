import { supabase } from './supabaseClient';

export type TimeRange = '1d' | '7d' | '30d' | '12m';

type Nullable<T> = T | null;

type DailyRow = {
  day: string;
  clicks: number;
  earnings: number;
  paid_clicks: number;
};

type EventRow = {
  link_id: string | null;
  link_slug: string | null;
  link_title: string | null;
  created_at: string;
  earned_amount: number | string | null;
  is_paid: boolean | null;
  country?: string | null;
  device?: string | null;
};

export type AnalyticsSummary = {
  earnings: number;
  clicks: number;
  conversionRate: number;
  activeLinks: number;
  deltas: {
    earnings: Nullable<number>;
    clicks: Nullable<number>;
    conversionRate: Nullable<number>;
    activeLinks: Nullable<number>;
  };
  previous: {
    earnings: number;
    clicks: number;
    conversionRate: number;
  };
};

export type CountryStat = { country: string; value: number; percent: number };
export type DeviceStat = { device: string; value: number; percent: number };

export type TopLink = {
  id: string;
  slug?: string | null;
  title?: string | null;
  earnings: number;
  clicks: number;
  ctr: number;
  sparkline: number[];
};

export type AnalyticsResponse = {
  range: TimeRange;
  summary: AnalyticsSummary;
  timeseries: { date: string; earnings: number; clicks: number }[];
  clicksByDay: { date: string; clicks: number }[];
  countries: CountryStat[];
  devices: DeviceStat[];
  topLinks: TopLink[];
  lastUpdated: string;
};

type RangeWindow = {
  since: Date;
  until: Date;
  previousSince: Date;
  previousUntil: Date;
};

const RANGE_DAYS: Record<TimeRange, number> = {
  '1d': 1,
  '7d': 7,
  '30d': 30,
  '12m': 365,
};

function getRangeWindow(range: TimeRange): RangeWindow {
  const days = RANGE_DAYS[range] ?? 30;
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  since.setDate(since.getDate() - (days - 1));

  const until = new Date();
  until.setHours(23, 59, 59, 999);

  const previousUntil = new Date(since);
  previousUntil.setDate(previousUntil.getDate() - 1);
  previousUntil.setHours(23, 59, 59, 999);

  const previousSince = new Date(previousUntil);
  previousSince.setDate(previousSince.getDate() - (days - 1));
  previousSince.setHours(0, 0, 0, 0);

  return { since, until, previousSince, previousUntil };
}

function aggregateDaily(rows: DailyRow[]) {
  return rows.reduce(
    (acc, row) => {
      acc.clicks += Number(row.clicks || 0);
      acc.earnings += Number(row.earnings || 0);
      acc.paid_clicks += Number(row.paid_clicks || 0);
      return acc;
    },
    { clicks: 0, earnings: 0, paid_clicks: 0 }
  );
}

function pctChange(current: number, previous: number): Nullable<number> {
  if (previous === 0) return current > 0 ? 100 : null;
  return ((current - previous) / Math.abs(previous)) * 100;
}

function formatDateKey(date: Date) {
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

function ensureDailyContinuity(rows: DailyRow[], since: Date, until: Date) {
  const map = new Map<string, DailyRow>();
  rows.forEach((r) => map.set(r.day, r));

  const cursor = new Date(since);
  const filled: DailyRow[] = [];
  while (cursor <= until) {
    const key = cursor.toISOString().slice(0, 10);
    const existing = map.get(key);
    filled.push(
      existing || { day: key, clicks: 0, earnings: 0, paid_clicks: 0 }
    );
    cursor.setDate(cursor.getDate() + 1);
  }
  return filled;
}

function buildSparkline(events: EventRow[], since: Date, until: Date, buckets = 14) {
  if (!events.length) return Array(buckets).fill(0);
  const rangeMs = until.getTime() - since.getTime();
  const bucketMs = rangeMs / buckets;
  const series = Array(buckets).fill(0);

  events.forEach((ev) => {
    const ts = new Date(ev.created_at).getTime();
    const idx = Math.min(
      buckets - 1,
      Math.max(0, Math.floor((ts - since.getTime()) / bucketMs))
    );
    series[idx] += Number(ev.earned_amount || 0);
  });

  return series;
}

function buildDailyFromEvents(events: EventRow[], since: Date, until: Date): DailyRow[] {
  const buckets: Record<string, DailyRow> = {};
  events.forEach((ev) => {
    const day = new Date(ev.created_at).toISOString().slice(0, 10);
    if (!buckets[day]) {
      buckets[day] = { day, clicks: 0, earnings: 0, paid_clicks: 0 };
    }
    buckets[day].clicks += 1;
    buckets[day].earnings += Number(ev.earned_amount || 0);
    buckets[day].paid_clicks += ev.is_paid ? 1 : 0;
  });
  return Object.values(buckets)
    .filter((r) => {
      const d = new Date(r.day);
      return d >= since && d <= until;
    })
    .sort((a, b) => (a.day < b.day ? -1 : 1));
}

function buildCountries(events: EventRow[]): CountryStat[] {
  const map = new Map<string, number>();
  events.forEach((ev) => {
    const key = (ev.country || 'Unknown').toUpperCase();
    map.set(key, (map.get(key) || 0) + 1);
  });
  const total = Array.from(map.values()).reduce((a, b) => a + b, 0);
  return Array.from(map.entries())
    .map(([country, value]) => ({
      country,
      value,
      percent: total ? (value / total) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value);
}

function buildDevices(events: EventRow[]): DeviceStat[] {
  const map = new Map<string, number>();
  events.forEach((ev) => {
    const key = ev.device || 'Unknown';
    map.set(key, (map.get(key) || 0) + 1);
  });
  const total = Array.from(map.values()).reduce((a, b) => a + b, 0);
  return Array.from(map.entries())
    .map(([device, value]) => ({
      device,
      value,
      percent: total ? (value / total) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value);
}

function buildTopLinks(events: EventRow[], since: Date, until: Date) {
  const map = new Map<
    string,
    { slug: string | null; title: string | null; earnings: number; clicks: number; paid: number; evs: EventRow[] }
  >();
  events.forEach((ev) => {
    if (!ev.link_id) return;
    if (!map.has(ev.link_id)) {
      map.set(ev.link_id, {
        slug: ev.link_slug,
        title: ev.link_title,
        earnings: 0,
        clicks: 0,
        paid: 0,
        evs: [],
      });
    }
    const item = map.get(ev.link_id)!;
    item.earnings += Number(ev.earned_amount || 0);
    item.clicks += 1;
    item.paid += ev.is_paid ? 1 : 0;
    item.evs.push(ev);
  });

  const topLinks = Array.from(map.entries())
    .map(([id, v]) => ({
      id,
      slug: v.slug,
      title: v.title,
      earnings: v.earnings,
      clicks: v.clicks,
      ctr: v.clicks > 0 ? v.paid / v.clicks : 0,
      sparkline: buildSparkline(v.evs, since, until, 14),
    }))
    .sort((a, b) => b.earnings - a.earnings)
    .slice(0, 5);

  return { topLinks };
}

export const AnalyticsService = {
  async getDashboardData(range: TimeRange = '30d'): Promise<AnalyticsResponse | null> {
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;
    if (!user) return null;

    const { since, until, previousSince, previousUntil } = getRangeWindow(range);

    const [
      dailyNowRes,
      dailyPrevRes,
      activeLinksRes,
      eventsRes,
      linksRes,
    ] = await Promise.all([
      supabase
        .from('analytics_events_daily')
        .select('day, clicks, earnings, paid_clicks')
        .eq('owner_id', user.id)
        .gte('day', since.toISOString())
        .lt('day', until.toISOString())
        .order('day', { ascending: true }),
      supabase
        .from('analytics_events_daily')
        .select('day, clicks, earnings, paid_clicks')
        .eq('owner_id', user.id)
        .gte('day', previousSince.toISOString())
        .lt('day', previousUntil.toISOString())
        .order('day', { ascending: true }),
      supabase
        .from('links')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('is_active', true),
      supabase
        .from('analytics_events')
        .select(
          'created_at, earned_amount, is_paid, link_id, link_slug, link_title, country, device'
        )
        .eq('owner_id', user.id)
        .gte('created_at', since.toISOString())
        .lt('created_at', until.toISOString())
        .order('created_at', { ascending: false })
        .limit(5000),
      supabase
        .from('links')
        .select('id, slug, title, earnings, views')
        .eq('user_id', user.id),
    ]);

    const dailyNowData = (dailyNowRes.data as DailyRow[]) || [];
    const dailyPrevData = (dailyPrevRes.data as DailyRow[]) || [];
    let events = (eventsRes.data as EventRow[]) || [];
    const links = linksRes.data || [];

    // Fallback: si la vista analytics_events falla por RLS o vacía, intentamos desde click_events por link_id
    if ((!events || events.length === 0) && links.length > 0) {
      const linkIds = links.map((l: any) => l.id);
      const direct = await supabase
        .from('click_events')
        .select('created_at, earned_amount, is_paid, link_id, country, device')
        .in('link_id', linkIds)
        .gte('created_at', since.toISOString())
        .lt('created_at', until.toISOString())
        .order('created_at', { ascending: false })
        .limit(5000);
      if (!direct.error && direct.data) {
        events = direct.data as EventRow[];
      }
    }

    const dailyNow = ensureDailyContinuity(
      dailyNowData.length ? dailyNowData : buildDailyFromEvents(events, since, until),
      since,
      until
    );
    const dailyPrev = ensureDailyContinuity(
      dailyPrevData.length
        ? dailyPrevData
        : buildDailyFromEvents(events, previousSince, previousUntil),
      previousSince,
      previousUntil
    );

    const totalsNow = aggregateDaily(dailyNow);
    const totalsPrev = aggregateDaily(dailyPrev);

    // Si no hay eventos, rellenamos totales desde links (views/earnings)
    if ((!events || events.length === 0) && links.length > 0) {
      totalsNow.earnings = links.reduce((acc: number, l: any) => acc + (l.earnings || 0), 0);
      totalsNow.clicks = links.reduce((acc: number, l: any) => acc + (l.views || 0), 0);
      totalsNow.paid_clicks = 0;
    }

    const conversionRate =
      totalsNow.clicks > 0 ? totalsNow.paid_clicks / totalsNow.clicks : 0;
    const prevConversion =
      totalsPrev.clicks > 0 ? totalsPrev.paid_clicks / totalsPrev.clicks : 0;

    const summary: AnalyticsSummary = {
      earnings: totalsNow.earnings,
      clicks: totalsNow.clicks,
      conversionRate,
      activeLinks: activeLinksRes.count || 0,
      deltas: {
        earnings: pctChange(totalsNow.earnings, totalsPrev.earnings),
        clicks: pctChange(totalsNow.clicks, totalsPrev.clicks),
        conversionRate: pctChange(conversionRate, prevConversion),
        activeLinks: null, // No periodo previo directo para links activos
      },
      previous: {
        earnings: totalsPrev.earnings,
        clicks: totalsPrev.clicks,
        conversionRate: prevConversion,
      },
    };

    const countries = buildCountries(events);
    const devices = buildDevices(events);
    const { topLinks } = events.length
      ? buildTopLinks(events, since, until)
      : {
          topLinks: links
            .map((l: any) => ({
              id: l.id,
              slug: l.slug,
              title: l.title,
              earnings: l.earnings || 0,
              clicks: l.views || 0,
              ctr: 0,
              sparkline: Array(14).fill(0),
            }))
            .sort((a: any, b: any) => b.earnings - a.earnings)
            .slice(0, 5),
        };

    const timeseries = dailyNow.map((d) => ({
      date: formatDateKey(new Date(d.day)),
      earnings: Number(d.earnings || 0),
      clicks: Number(d.clicks || 0),
    }));

    const clicksByDay = dailyNow.map((d) => ({
      date: formatDateKey(new Date(d.day)),
      clicks: Number(d.clicks || 0),
    }));

    return {
      range,
      summary,
      timeseries,
      clicksByDay,
      countries,
      devices,
      topLinks,
      lastUpdated: new Date().toISOString(),
    };
  },
};
