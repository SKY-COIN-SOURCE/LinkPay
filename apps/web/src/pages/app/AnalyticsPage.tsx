import React, { useEffect, useMemo, useState, useCallback } from 'react';
import './Analytics.css';
import {
  TrendingUp,
  Link2,
  MousePointer2,
  DollarSign,
  BarChart3,
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
import { supabase } from '../../lib/supabaseClient';
import { LinkService, Link } from '../../lib/linkService';
import { AnalyticsService, TimeRange } from '../../lib/analyticsService';

type ChartView = 'revenue' | 'clicks' | 'links' | 'geo';

const RANGE_OPTIONS: { key: TimeRange; label: string }[] = [
  { key: '1d', label: 'Hoy' },
  { key: '7d', label: '7d' },
  { key: '30d', label: '30d' },
  { key: '12m', label: '1 año' },
];

const COLORS = ['#22d3ee', '#a855f7', '#22c55e', '#f97316', '#ef4444', '#3b82f6'];

// Fixed counter - NO overshoot
function useCountTo(end: number, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (end === 0) { setCount(0); return; }
    let startTime: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.min(end * ease, end));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(end);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  return count;
}

function formatMoney(v: number) {
  return `€${v.toFixed(4)}`;
}

function formatMoneyShort(v: number) {
  if (v >= 1000) return `€${(v / 1000).toFixed(1)}k`;
  return `€${v.toFixed(2)}`;
}

function formatNum(v: number) {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  return Math.floor(v).toLocaleString('es-ES');
}

// Custom tooltip
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="lp-tooltip">
      <div className="lp-tooltip-label">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} className="lp-tooltip-row" style={{ color: p.color }}>
          <span className="lp-tooltip-val">
            {p.name === 'earnings' ? formatMoneyShort(p.value) : formatNum(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function AnalyticsPage() {
  const [range, setRange] = useState<TimeRange>('30d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Stats like Dashboard
  const [stats, setStats] = useState({
    totalRevenue: 0,
    linkRevenue: 0,
    bioRevenue: 0,
    totalClicks: 0,
    activeLinks: 0,
    rpm: 0,
  });

  // All links for table
  const [links, setLinks] = useState<Link[]>([]);

  // Chart data
  const [timeseries, setTimeseries] = useState<any[]>([]);
  const [clicksByDay, setClicksByDay] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [devices, setDevices] = useState<any[]>([]);

  // Chart view toggle
  const [chartView, setChartView] = useState<ChartView>('revenue');

  // Animated values
  const animRevenue = useCountTo(stats.totalRevenue, 1500);
  const animClicks = useCountTo(stats.totalClicks, 1500);
  const animLinks = useCountTo(stats.activeLinks, 1500);
  const animRpm = useCountTo(stats.rpm, 1500);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch everything in parallel like Dashboard
      const [analyticsData, linksData] = await Promise.all([
        AnalyticsService.getDashboardData(range),
        LinkService.getAll(),
      ]);

      if (linksData) {
        setLinks(linksData);

        const linkRev = linksData.reduce((acc, l) => acc + (l.earnings || 0), 0);
        const linkClx = linksData.reduce((acc, l) => acc + (l.views || 0), 0);
        const bioRev = (analyticsData as any)?.bioRevenue || 0;
        const bioClx = (analyticsData as any)?.bioClicks || 0;
        const totalRev = linkRev + bioRev;
        const totalClx = linkClx + bioClx;
        const activeLinksCount = linksData.filter((l: any) => l.is_active !== false).length;

        setStats({
          totalRevenue: totalRev,
          linkRevenue: linkRev,
          bioRevenue: bioRev,
          totalClicks: totalClx,
          activeLinks: activeLinksCount,
          rpm: totalClx > 0 ? (totalRev / totalClx) * 1000 : 0,
        });
      }

      if (analyticsData) {
        setTimeseries(analyticsData.timeseries || []);
        setClicksByDay(analyticsData.clicksByDay || []);
        setCountries(analyticsData.countries || []);
        setDevices(analyticsData.devices || []);
      }

    } catch (err) {
      console.error('[Analytics] Error:', err);
      setError('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('analytics-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'links' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'click_events' }, () => fetchData())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchData]);

  // Top 5 links by earnings
  const topLinks = useMemo(() => {
    return [...links]
      .sort((a, b) => (b.earnings || 0) - (a.earnings || 0))
      .slice(0, 5);
  }, [links]);

  const hasData = stats.totalClicks > 0 || stats.totalRevenue > 0 || links.length > 0;

  // Loading
  if (loading) {
    return (
      <div className="lpa-shell">
        <div className="lpa-inner">
          <div className="lpa-range-bar">
            {RANGE_OPTIONS.map(o => <button key={o.key} className="lpa-range-btn">{o.label}</button>)}
          </div>
          <div className="lpa-stats-grid">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="lpa-stat-card lpa-skeleton">
                <div className="lpa-skel-line short" />
                <div className="lpa-skel-line" />
              </div>
            ))}
          </div>
          <div className="lpa-chart-card lpa-skeleton">
            <div className="lpa-skel-line short" />
            <div className="lpa-skel-chart" />
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="lpa-shell">
        <div className="lpa-inner">
          <div className="lpa-error">
            <AlertTriangle size={24} />
            <span>{error}</span>
            <button className="lpa-btn" onClick={fetchData}><RefreshCw size={14} /> Reintentar</button>
          </div>
        </div>
      </div>
    );
  }

  // Empty
  if (!hasData) {
    return (
      <div className="lpa-shell">
        <div className="lpa-inner">
          <div className="lpa-empty">
            <div className="lpa-empty-icon">📊</div>
            <h3>Sin datos todavía</h3>
            <p>Crea tu primer link y empieza a monetizar</p>
            <button className="lpa-btn" onClick={fetchData}><RefreshCw size={14} /> Refrescar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lpa-shell">
      <div className="lpa-inner">

        {/* Period selector */}
        <div className="lpa-range-bar">
          {RANGE_OPTIONS.map(opt => (
            <button
              key={opt.key}
              className={`lpa-range-btn ${range === opt.key ? 'active' : ''}`}
              onClick={() => setRange(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* 4 Stats Grid - 2x2 squares */}
        <div className="lpa-stats-grid">
          {/* Revenue */}
          <div className="lpa-stat-card green">
            <div className="lpa-stat-top">
              <div className="lpa-stat-icon"><DollarSign size={18} /></div>
              <span className="lpa-live-dot" />
            </div>
            <div className="lpa-stat-val">{formatMoney(animRevenue)}</div>
            <div className="lpa-stat-label">Ingresos</div>
            <div className="lpa-stat-sub">
              <span>Links €{stats.linkRevenue.toFixed(4)}</span>
              <span>Bio €{stats.bioRevenue.toFixed(4)}</span>
            </div>
          </div>

          {/* Clicks */}
          <div className="lpa-stat-card purple">
            <div className="lpa-stat-top">
              <div className="lpa-stat-icon"><MousePointer2 size={18} /></div>
            </div>
            <div className="lpa-stat-val">{formatNum(animClicks)}</div>
            <div className="lpa-stat-label">Clicks Totales</div>
          </div>

          {/* Active Links */}
          <div className="lpa-stat-card blue">
            <div className="lpa-stat-top">
              <div className="lpa-stat-icon"><Link2 size={18} /></div>
            </div>
            <div className="lpa-stat-val">{Math.floor(animLinks)}</div>
            <div className="lpa-stat-label">Links Activos</div>
          </div>

          {/* RPM */}
          <div className="lpa-stat-card orange">
            <div className="lpa-stat-top">
              <div className="lpa-stat-icon"><BarChart3 size={18} /></div>
            </div>
            <div className="lpa-stat-val">€{animRpm.toFixed(2)}</div>
            <div className="lpa-stat-label">RPM</div>
          </div>
        </div>

        {/* Chart Toggle Buttons */}
        <div className="lpa-chart-tabs">
          <button className={`lpa-tab ${chartView === 'revenue' ? 'active' : ''}`} onClick={() => setChartView('revenue')}>
            <TrendingUp size={14} /> Ingresos
          </button>
          <button className={`lpa-tab ${chartView === 'clicks' ? 'active' : ''}`} onClick={() => setChartView('clicks')}>
            <MousePointer2 size={14} /> Clicks
          </button>
          <button className={`lpa-tab ${chartView === 'links' ? 'active' : ''}`} onClick={() => setChartView('links')}>
            <Link2 size={14} /> Top Links
          </button>
          <button className={`lpa-tab ${chartView === 'geo' ? 'active' : ''}`} onClick={() => setChartView('geo')}>
            <Globe2 size={14} /> Geo
          </button>
        </div>

        {/* Chart Area */}
        <div className="lpa-chart-card">
          {chartView === 'revenue' && (
            <>
              <div className="lpa-chart-title">Ingresos en el tiempo</div>
              <div className="lpa-chart-wrap">
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={timeseries}>
                    <defs>
                      <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} width={35} tickFormatter={v => `€${v}`} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="earnings" stroke="#22c55e" strokeWidth={2} fill="url(#gRev)" name="earnings" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {chartView === 'clicks' && (
            <>
              <div className="lpa-chart-title">Clicks por día</div>
              <div className="lpa-chart-wrap">
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={clicksByDay}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} width={30} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="clicks" fill="#a855f7" radius={[4, 4, 0, 0]} name="clicks" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {chartView === 'links' && (
            <>
              <div className="lpa-chart-title">Top 5 Links por Ingresos</div>
              <div className="lpa-links-list">
                {topLinks.map((link, i) => (
                  <div className="lpa-link-row" key={link.id}>
                    <div className="lpa-link-rank" style={{ background: COLORS[i] }}>{i + 1}</div>
                    <div className="lpa-link-info">
                      <span className="lpa-link-name">{link.title || link.slug}</span>
                      <span className="lpa-link-slug">/{link.slug}</span>
                    </div>
                    <div className="lpa-link-stats">
                      <span className="lpa-link-clicks">{link.views || 0} clicks</span>
                      <span className="lpa-link-earn">{formatMoneyShort(link.earnings || 0)}</span>
                    </div>
                  </div>
                ))}
                {topLinks.length === 0 && (
                  <div className="lpa-empty-mini">No hay links todavía</div>
                )}
              </div>
            </>
          )}

          {chartView === 'geo' && (
            <>
              <div className="lpa-chart-title">Distribución Geográfica</div>
              {countries.length === 0 && devices.length === 0 ? (
                /* Professional empty state */
                <div className="lpa-geo-empty">
                  <div className="lpa-geo-empty-icon">🌍</div>
                  <div className="lpa-geo-empty-title">Sin datos geográficos</div>
                  <div className="lpa-geo-empty-desc">
                    Los datos de país y dispositivo aparecerán cuando tus enlaces reciban clicks
                  </div>
                </div>
              ) : (
                <div className="lpa-geo-grid">
                  {/* Countries with flags */}
                  <div className="lpa-geo-section">
                    <div className="lpa-geo-subtitle"><Globe2 size={12} /> Países</div>
                    {countries.slice(0, 5).map((c, i) => {
                      // Country flag emoji from country name
                      const getFlag = (name: string) => {
                        const flags: Record<string, string> = {
                          'SPAIN': '🇪🇸', 'MEXICO': '🇲🇽', 'ARGENTINA': '🇦🇷', 'COLOMBIA': '🇨🇴',
                          'CHILE': '🇨🇱', 'PERU': '🇵🇪', 'UNITED STATES': '🇺🇸', 'BRAZIL': '🇧🇷',
                          'GERMANY': '🇩🇪', 'FRANCE': '🇫🇷', 'ITALY': '🇮🇹', 'PORTUGAL': '🇵🇹',
                          'UNITED KINGDOM': '🇬🇧', 'CANADA': '🇨🇦', 'VENEZUELA': '🇻🇪', 'ECUADOR': '🇪🇨',
                          'ES': '🇪🇸', 'MX': '🇲🇽', 'AR': '🇦🇷', 'CO': '🇨🇴', 'US': '🇺🇸', 'BR': '🇧🇷',
                        };
                        return flags[name.toUpperCase()] || '🌐';
                      };
                      return (
                        <div className="lpa-geo-row" key={c.country}>
                          <span className="lpa-geo-flag">{getFlag(c.country)}</span>
                          <span className="lpa-geo-name">
                            {c.country === 'UNKNOWN' || c.country === 'Unknown' ? 'Desconocido' : c.country}
                          </span>
                          <span className="lpa-geo-bar">
                            <span className="lpa-geo-bar-fill" style={{ width: `${c.percent}%`, background: COLORS[i] }} />
                          </span>
                          <span className="lpa-geo-val">{c.percent.toFixed(0)}%</span>
                        </div>
                      );
                    })}
                    {countries.length === 0 && (
                      <div className="lpa-geo-placeholder">
                        <span>🌐</span> Esperando clicks...
                      </div>
                    )}
                  </div>

                  {/* Devices with icons */}
                  <div className="lpa-geo-section">
                    <div className="lpa-geo-subtitle"><Smartphone size={12} /> Dispositivos</div>
                    {devices.slice(0, 4).map((d, i) => {
                      const getDeviceIcon = (name: string) => {
                        const n = (name || '').toLowerCase();
                        if (n.includes('mobile') || n.includes('phone')) return '📱';
                        if (n.includes('tablet') || n.includes('ipad')) return '📲';
                        if (n.includes('desktop')) return '🖥️';
                        return '💻';
                      };
                      return (
                        <div className="lpa-geo-row" key={d.device}>
                          <span className="lpa-geo-flag">{getDeviceIcon(d.device)}</span>
                          <span className="lpa-geo-name">{d.device || 'Otro'}</span>
                          <span className="lpa-geo-bar">
                            <span className="lpa-geo-bar-fill" style={{ width: `${d.percent}%`, background: COLORS[i + 2] }} />
                          </span>
                          <span className="lpa-geo-val">{d.percent.toFixed(0)}%</span>
                        </div>
                      );
                    })}
                    {devices.length === 0 && (
                      <div className="lpa-geo-placeholder">
                        <span>📱</span> Esperando clicks...
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Quick Links Preview */}
        {links.length > 0 && chartView !== 'links' && (
          <div className="lpa-quick-links">
            <div className="lpa-quick-title">Últimos Links</div>
            {links.slice(0, 3).map((link, i) => (
              <div className="lpa-quick-row" key={link.id}>
                <span className="lpa-quick-dot" style={{ background: COLORS[i] }} />
                <span className="lpa-quick-name">{link.title || link.slug}</span>
                <span className="lpa-quick-earn">{formatMoneyShort(link.earnings || 0)}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
