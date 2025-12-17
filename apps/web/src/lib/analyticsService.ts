import { supabase } from './supabaseClient';

export type TimeRange = '1d' | '7d' | '30d' | '12m';

type Nullable<T> = T | null;

type DailyRow = {
  day: string;
  clicks: number;
  earnings: number;
  paid_clicks: number;
};

type TopLinkAgg = {
  link_id: string;
  link_slug: string | null;
  link_title: string | null;
  earnings: number | string | null;
  clicks: number | string | null;
};

type EventRow = {
  link_id: string | null;
  created_at: string;
  earned_amount: number | string | null;
  is_paid: boolean | null;
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

export const AnalyticsService = {
  async getDashboardData(range: TimeRange = '30d'): Promise<AnalyticsResponse | null> {
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;
    if (!user) return null;

    const { since, until, previousSince, previousUntil } = getRangeWindow(range);

    const [
      dailyNowRes,
      dailyPrevRes,
      countriesRes,
      devicesRes,
      activeLinksRes,
      topLinksAggRes,
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
        .from('analytics_events')
        .select('country, value:count()', { group: 'country' })
        .eq('owner_id', user.id)
        .gte('created_at', since.toISOString())
        .lt('created_at', until.toISOString()),
      supabase
        .from('analytics_events')
        .select('device, value:count()', { group: 'device' })
        .eq('owner_id', user.id)
        .gte('created_at', since.toISOString())
        .lt('created_at', until.toISOString()),
      supabase
        .from('links')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('is_active', true),
      supabase
        .from('analytics_events')
        .select(
          'link_id, link_slug, link_title, earnings:sum(earned_amount), clicks:count()',
          { group: 'link_id, link_slug, link_title' }
        )
        .eq('owner_id', user.id)
        .gte('created_at', since.toISOString())
        .lt('created_at', until.toISOString())
        .order('earnings', { ascending: false })
        .limit(5),
    ]);

    const dailyNow = ensureDailyContinuity(
      (dailyNowRes.data as DailyRow[]) || [],
      since,
      until
    );
    const dailyPrev = ensureDailyContinuity(
      (dailyPrevRes.data as DailyRow[]) || [],
      previousSince,
      previousUntil
    );

    const totalsNow = aggregateDaily(dailyNow);
    const totalsPrev = aggregateDaily(dailyPrev);

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

    const countriesRaw = (countriesRes.data as { country: string; value: number }[]) || [];
    const totalCountry = countriesRaw.reduce((acc, c) => acc + Number(c.value || 0), 0);
    const countries: CountryStat[] = countriesRaw
      .map((c) => ({
        country: c.country || 'Unknown',
        value: Number(c.value || 0),
        percent: totalCountry ? (Number(c.value || 0) / totalCountry) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);

    const devicesRaw = (devicesRes.data as { device: string; value: number }[]) || [];
    const totalDevice = devicesRaw.reduce((acc, d) => acc + Number(d.value || 0), 0);
    const devices: DeviceStat[] = devicesRaw
      .map((d) => ({
        device: d.device || 'Unknown',
        value: Number(d.value || 0),
        percent: totalDevice ? (Number(d.value || 0) / totalDevice) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);

    const topAgg = (topLinksAggRes.data as TopLinkAgg[]) || [];
    const topLinkIds = topAgg.map((l) => l.link_id).filter(Boolean);

    let sparkEvents: EventRow[] = [];
    if (topLinkIds.length > 0) {
      const sparkRes = await supabase
        .from('analytics_events')
        .select('link_id, created_at, earned_amount, is_paid')
        .in('link_id', topLinkIds)
        .eq('owner_id', user.id)
        .gte('created_at', since.toISOString())
        .lt('created_at', until.toISOString())
        .limit(5000);
      sparkEvents = (sparkRes.data as EventRow[]) || [];
    }

    const topLinks: TopLink[] = topAgg.map((l) => {
      const linkEvents = sparkEvents.filter((e) => e.link_id === l.link_id);
      const paidClicks = linkEvents.filter((e) => e.is_paid).length;
      const clicks = Number(l.clicks || linkEvents.length || 0);
      const earnings = Number(l.earnings || 0);
      const ctr = clicks > 0 ? paidClicks / clicks : 0;
      return {
        id: l.link_id,
        slug: l.link_slug,
        title: l.link_title,
        earnings,
        clicks,
        ctr,
        sparkline: buildSparkline(linkEvents, since, until, 14),
      };
    });

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
