import React, { useEffect, useMemo, useState } from 'react';
import './Analytics.css';
import '../../styles/PremiumBackground.css';
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Link2,
  MousePointer2,
  Activity,
  Globe2,
  Smartphone,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  AnalyticsService,
  AnalyticsResponse,
  TimeRange,
  TopLink,
  CountryStat,
  DeviceStat,
} from '../../lib/analyticsService';
type StatCardProps = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta?: number | null;
  icon: React.ReactNode;
  accent: 'cyan' | 'purple' | 'green' | 'red';
  sparkline?: number[];
};

const RANGE_OPTIONS: { key: TimeRange; label: string }[] = [
  { key: '1d', label: 'Hoy' },
  { key: '7d', label: '7 días' },
  { key: '30d', label: '30 días' },
  { key: '12m', label: '12 meses' },
];

const COLORS = ['#22d3ee', '#a855f7', '#22c55e', '#f97316', '#ef4444', '#0ea5e9'];

function useCountTo(end: number, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(end * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  return count;
}

function formatNumber(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 10_000) return `${(value / 1000).toFixed(1)}k`;
  return value.toLocaleString('es-ES');
}

function formatCurrency(value: number) {
  if (value >= 1000) return `€${(value / 1000).toFixed(1)}k`;
  return `€${value.toFixed(2)}`;
}

function DeltaTag({ delta }: { delta: number | null | undefined }) {
  if (delta === null || delta === undefined) return <span className="lp-delta neutral">–</span>;
  const positive = delta >= 0;
  const Icon = positive ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={`lp-delta ${positive ? 'up' : 'down'}`}>
      <Icon size={14} />
      {Math.abs(delta).toFixed(1)}%
    </span>
  );
}

function StatCard({
  label,
  value,
  prefix,
  suffix,
  delta,
  icon,
  accent,
  sparkline = [],
}: StatCardProps) {
  const animated = useCountTo(value);
  const displayValue = suffix
    ? `${animated.toFixed(1)}`
    : prefix === '€'
      ? animated.toFixed(2)
      : formatNumber(animated);
  return (
    <div className={`lp-card lp-stat-card accent-${accent}`}>
      <div className="lp-card-top">
        <div className="lp-card-icon">{icon}</div>
        <DeltaTag delta={delta ?? null} />
      </div>
      <div className="lp-card-body">
        <div className="lp-stat-value">
          <span className="lp-stat-prefix">{prefix}</span>
          {displayValue}
          <span className="lp-stat-suffix">{suffix}</span>
        </div>
        <div className="lp-stat-label">{label}</div>
      </div>
      {sparkline.length > 0 && (
        <div className="lp-sparkline">
          <ResponsiveContainer width="100%" height={50}>
            <AreaChart data={sparkline.map((v, i) => ({ idx: i, v }))}>
              <defs>
                <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--lp-accent)" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="var(--lp-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                dataKey="v"
                type="monotone"
                stroke="var(--lp-accent)"
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#spark-${label})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="lp-card lp-skeleton-card">
      <div className="lp-skeleton-line w-24" />
      <div className="lp-skeleton-line w-16" />
      <div className="lp-skeleton-line w-full h-10 mt-4" />
    </div>
  );
}

function EmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="lp-empty-state">
      <div className="lp-empty-illustration">🚀</div>
      <h3>Aún no hay datos</h3>
      <p>Crea tu primer link y comienza a monetizar en segundos.</p>
      <button className="lp-btn" onClick={onRetry}>Refrescar</button>
    </div>
  );
}

export function AnalyticsPage() {
  const [range, setRange] = useState<TimeRange>('30d');
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await AnalyticsService.getDashboardData(range);
      setData(res);
    } catch (err) {
      console.error('[AnalyticsPage] load error', err);
      setError('No pudimos cargar Analytics. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  const hasData = useMemo(() => {
    if (!data) return false;
    return (
      data.summary.earnings > 0 ||
      data.summary.clicks > 0 ||
      data.topLinks.length > 0
    );
  }, [data]);

  if (loading) {
    return (
      <div className="lp-analytics-shell lp-premium-bg">
        <div className="lp-analytics-inner">
          <div className="lp-header">
            <div className="lp-chip">
              <span className="lp-dot" />
              Analytics
            </div>
            <div className="lp-title">Panel en vivo</div>
          </div>
          <div className="lp-grid lp-grid-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
          <div className="lp-card lp-skeleton-chart">
            <div className="lp-skeleton-line w-32" />
            <div className="lp-skeleton-line w-20" />
            <div className="lp-skeleton-chart-lines" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lp-analytics-shell lp-premium-bg">
        <div className="lp-analytics-inner">
          <div className="lp-error">
            <div className="lp-error-icon">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3>Algo salió mal</h3>
              <p>{error}</p>
            </div>
            <button className="lp-btn" onClick={fetchData}>
              <RefreshCw size={16} />
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !hasData) {
    return (
      <div className="lp-analytics-shell lp-premium-bg">
        <div className="lp-analytics-inner">
          <EmptyState onRetry={fetchData} />
        </div>
      </div>
    );
  }

  const { summary } = data;

  return (
    <div className="lp-analytics-shell lp-premium-bg">
      <div className="lp-analytics-inner">
        <header className="lp-header">
          <div>
            <div className="lp-chip">
              <span className="lp-dot" />
              Analytics
            </div>
            <h1 className="lp-title">Inteligencia en tiempo real</h1>
            <p className="lp-subtitle">
              Visualiza ingresos, clics, conversión y desempeño por link, país y dispositivo.
            </p>
          </div>
          <div className="lp-range-switch">
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                className={`lp-range-btn ${range === opt.key ? 'active' : ''}`}
                onClick={() => setRange(opt.key)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </header>

        {/* Stat cards */}
        <div className="lp-grid lp-grid-4">
          <StatCard
            label="Total Earnings"
            value={summary.earnings}
            prefix="€"
            delta={summary.deltas.earnings}
            accent="purple"
            icon={<TrendingUp size={18} />}
            sparkline={data.timeseries.map((d) => d.earnings)}
          />
          <StatCard
            label="Total Clicks"
            value={summary.clicks}
            delta={summary.deltas.clicks}
            accent="cyan"
            icon={<MousePointer2 size={18} />}
          />
          <StatCard
            label="Conversion Rate"
            value={summary.conversionRate * 100}
            suffix="%"
            delta={summary.deltas.conversionRate}
            accent="green"
            icon={<Activity size={18} />}
          />
          <StatCard
            label="Active Links"
            value={summary.activeLinks}
            delta={summary.deltas.activeLinks}
            accent="red"
            icon={<Link2 size={18} />}
          />
        </div>

        {/* Main chart */}
        <div className="lp-card lp-chart-card">
          <div className="lp-card-head">
            <div>
              <p className="lp-card-kicker">Ingresos vs Clics</p>
              <h3 className="lp-card-title">Curva de crecimiento</h3>
            </div>
            <DeltaTag delta={summary.deltas.earnings} />
          </div>
          <div className="lp-chart-body">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={data.timeseries}>
                <defs>
                  <linearGradient id="gradEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis
                  yAxisId="left"
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `€${v.toFixed(2)}`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{ background: 'rgba(15,23,42,0.96)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 14 }}
                  labelStyle={{ color: '#cbd5e1' }}
                  formatter={(value: number, name: string) => {
                    if (name === 'earnings') return [formatCurrency(value), 'Earnings'];
                    return [formatNumber(value), 'Clicks'];
                  }}
                />
                <Area
                  yAxisId="left"
                  dataKey="earnings"
                  type="monotone"
                  stroke="#a855f7"
                  strokeWidth={2.6}
                  fill="url(#gradEarnings)"
                  name="earnings"
                />
                <Area
                  yAxisId="right"
                  dataKey="clicks"
                  type="monotone"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  fill="url(#gradClicks)"
                  name="clicks"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary charts */}
        <div className="lp-grid lp-grid-3">
          <div className="lp-card lp-chart-card">
            <div className="lp-card-head">
              <div>
                <p className="lp-card-kicker">Tráfico</p>
                <h3 className="lp-card-title">Clicks por día</h3>
              </div>
            </div>
            <div className="lp-chart-body small">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data.clicksByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(15,23,42,0.96)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 14 }}
                    labelStyle={{ color: '#cbd5e1' }}
                  />
                  <Bar dataKey="clicks" radius={[6, 6, 4, 4]} fill="#22d3ee" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lp-card lp-chart-card">
            <div className="lp-card-head">
              <div>
                <p className="lp-card-kicker">Top Links</p>
                <h3 className="lp-card-title">Ingresos líderes</h3>
              </div>
            </div>
            <div className="lp-chart-body small">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={data.topLinks.map((l) => ({
                    name: l.title || l.slug || l.id.slice(0, 6),
                    earnings: l.earnings,
                  }))}
                  layout="vertical"
                  margin={{ left: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" horizontal />
                  <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" tick={{ fill: '#cbd5e1', fontSize: 12 }} width={120} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(15,23,42,0.96)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 14 }}
                    formatter={(val: number) => formatCurrency(val)}
                  />
                  <Bar dataKey="earnings" radius={[6, 6, 6, 6]}>
                    {data.topLinks.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lp-card lp-chart-card">
            <div className="lp-card-head">
              <div>
                <p className="lp-card-kicker">Dispositivos</p>
                <h3 className="lp-card-title">Distribution</h3>
              </div>
            </div>
            <div className="lp-chart-body small devices">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={data.devices}
                    dataKey="value"
                    nameKey="device"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {data.devices.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: 'rgba(15,23,42,0.96)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 14 }}
                    formatter={(val: number, name: string) => [`${val} clicks`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="lp-legend">
                {data.devices.map((d, i) => (
                  <div key={d.device + i} className="lp-legend-row">
                    <span className="lp-dot" style={{ background: COLORS[i % COLORS.length] }} />
                    <span>{d.device || 'Unknown'}</span>
                    <span className="lp-legend-value">
                      {d.value} · {d.percent.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Countries + table */}
        <div className="lp-grid lp-grid-2">
          <div className="lp-card lp-table-card">
            <div className="lp-card-head">
              <div>
                <p className="lp-card-kicker">Regiones</p>
                <h3 className="lp-card-title">Países con más clics</h3>
              </div>
              <Globe2 size={18} className="lp-muted-icon" />
            </div>
            <div className="lp-table">
              {data.countries.map((c: CountryStat, i: number) => (
                <div className="lp-table-row" key={c.country + i}>
                  <div className="lp-country">
                    <span className="lp-dot" style={{ background: COLORS[i % COLORS.length] }} />
                    {c.country === 'Unknown' ? 'Desconocido' : c.country}
                  </div>
                  <div className="lp-progress">
                    <div
                      className="lp-progress-bar"
                      style={{ width: `${Math.max(5, c.percent)}%`, background: COLORS[i % COLORS.length] }}
                    />
                  </div>
                  <div className="lp-table-value">
                    {c.value} · {c.percent.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lp-card lp-table-card">
            <div className="lp-card-head">
              <div>
                <p className="lp-card-kicker">Top performers</p>
                <h3 className="lp-card-title">Links</h3>
              </div>
              <Smartphone size={18} className="lp-muted-icon" />
            </div>
            <div className="lp-table header">
              <div className="lp-table-row head">
                <span>Link</span>
                <span>Clicks</span>
                <span>Earnings</span>
                <span>CTR</span>
                <span>Tendencia</span>
              </div>
              {data.topLinks.map((l: TopLink, idx: number) => (
                <div className="lp-table-row" key={l.id}>
                  <div className="lp-link-name">
                    <span className="lp-dot" style={{ background: COLORS[idx % COLORS.length] }} />
                    <div>
                      <div className="lp-link-title">{l.title || l.slug || 'Link'}</div>
                      <div className="lp-link-sub">{l.slug || l.id.slice(0, 6)}</div>
                    </div>
                  </div>
                  <span className="lp-table-value">{l.clicks}</span>
                  <span className="lp-table-value">{formatCurrency(l.earnings)}</span>
                  <span className="lp-table-value">{(l.ctr * 100).toFixed(1)}%</span>
                  <div className="lp-sparkline mini">
                    <ResponsiveContainer width="100%" height={40}>
                      <AreaChart data={l.sparkline.map((v, i) => ({ idx: i, v }))}>
                        <defs>
                          <linearGradient id={`mini-${l.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS[idx % COLORS.length]} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={COLORS[idx % COLORS.length]} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          dataKey="v"
                          type="monotone"
                          stroke={COLORS[idx % COLORS.length]}
                          strokeWidth={1.8}
                          fill={`url(#mini-${l.id})`}
                          isAnimationActive={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
