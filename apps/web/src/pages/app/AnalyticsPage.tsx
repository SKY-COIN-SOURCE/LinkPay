import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import './Analytics.css';
import {
  TrendingUp,
  TrendingDown,
  Link2,
  MousePointer2,
  DollarSign,
  BarChart3,
  Globe2,
  Smartphone,
  AlertTriangle,
  RefreshCw,
  Wallet,
  Zap,
  Activity,
  Gem,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Flame,
  Target,
  Sparkles,
  Calendar,
  Award,
  Trophy,
  Eye,
  Edit3,
  Plus,
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
import { Link as LinkType } from '../../lib/linkService';
import { TimeRange } from '../../lib/analyticsService';
import { useCachedAnalytics } from '../../context/DataCacheContext';
import {
  getUserGamification,
  calculateComparison,
  markGoalReached,
  shouldShowCelebration,
  GamificationData
} from '../../lib/gamificationService';

type ChartView = 'revenue' | 'clicks' | 'links' | 'geo';

const RANGE_OPTIONS: { key: TimeRange | 'custom'; label: string }[] = [
  { key: '1d', label: 'HOY' },
  { key: '7d', label: '7D' },
  { key: '30d', label: '30D' },
  { key: '12m', label: '1 AÑO' },
  { key: 'custom', label: 'PERSONALIZADO' },
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
  // ═══════════════════════════════════════════════════════════════════════════
  // DATOS CACHEADOS - Navegación instantánea
  // ═══════════════════════════════════════════════════════════════════════════
  const { data: analyticsData, links, loading, range, setRange, refresh } = useCachedAnalytics();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  // Chart view toggle
  const [chartView, setChartView] = useState<ChartView>('revenue');

  // ═══════════════════════════════════════════════════════════════════════════
  // VIEW FLAGS (DEV) + SCOPED PAGE CLASS (UI ONLY)
  // ═══════════════════════════════════════════════════════════════════════════
  const compareParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const compareOpacity = useMemo(() => {
    const raw = Number(compareParams.get('lp_opacity') ?? '0.5');
    if (Number.isNaN(raw)) return 0.5;
    return Math.min(1, Math.max(0.05, raw));
  }, [compareParams]);
  const showCompareOverlay = useMemo(() => {
    if (!import.meta.env.DEV) return false;
    if (chartView !== 'revenue') return false;
    return compareParams.get('lp_compare') === '1';
  }, [compareParams, chartView]);

  useEffect(() => {
    // Scope header + bottom-nav overrides ONLY to Analytics -> Ingresos.
    const cls = 'lp-analytics-ingresos';
    const html = document.documentElement;
    if (chartView === 'revenue') html.classList.add(cls);
    else html.classList.remove(cls);
    return () => html.classList.remove(cls);
  }, [chartView]);

  // Links expanded state
  const [linksExpanded, setLinksExpanded] = useState(false);

  // ═══════════════════════════════════════════════════════════════════════════
  // GAMIFICATION STATE - Enterprise-grade tracking
  // ═══════════════════════════════════════════════════════════════════════════
  const [gamification, setGamification] = useState<GamificationData | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Fetch gamification data on mount
  useEffect(() => {
    getUserGamification().then(data => {
      if (data) setGamification(data);
    });
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // TODAY'S REVENUE - Real-time calculation from timeline
  // ═══════════════════════════════════════════════════════════════════════════
  const todayRevenue = useMemo(() => {
    // Try from timeline first
    const timeline = analyticsData?.timeseries || [];
    const today = new Date().toISOString().slice(0, 10);

    const fromTimeline = timeline
      .filter((item: any) => {
        if (item.isoDate) return item.isoDate === today;
        const dateStr = item.date || item.day;
        if (!dateStr) return false;
        if (typeof dateStr === 'string' && dateStr.includes('-')) {
          return dateStr.split('T')[0] === today;
        }
        return false;
      })
      .reduce((acc: number, item: any) => acc + (item.earnings || 0), 0);

    // If we have timeline data for today, use it
    if (fromTimeline > 0) return fromTimeline;

    // Fallback: if range is '1d' (today), use total revenue
    if (range === '1d') {
      const linkRev = links?.reduce((acc: number, l: any) => acc + (l.earnings || 0), 0) || 0;
      const bioRev = (analyticsData as any)?.summary?.earnings || 0;
      return linkRev + bioRev;
    }

    return 0;
  }, [analyticsData, links, range]);

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPARISON BADGE - vs yesterday/previous period
  // ═══════════════════════════════════════════════════════════════════════════
  const comparisonPercent = useMemo(() => {
    const yesterdayRev = gamification?.yesterdayRevenue || 0;
    return calculateComparison(todayRevenue, yesterdayRev);
  }, [todayRevenue, gamification]);

  // ═══════════════════════════════════════════════════════════════════════════
  // MONTHLY PROJECTION - Smart prediction based on current rate
  // ═══════════════════════════════════════════════════════════════════════════
  const { monthlyProjection, monthProgress, daysRemaining } = useMemo(() => {
    const now = new Date();
    const currentDay = now.getDate();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysRemaining = daysInMonth - currentDay;

    // Calculate average daily earnings from total revenue
    const totalRev = links?.reduce((acc: number, l: any) => acc + (l.earnings || 0), 0) || 0;

    // If we have multiple days of data, calculate actual daily average
    let dailyAvg = 0;
    if (currentDay > 1 && totalRev > 0) {
      // Assume total revenue is from current month (simplification)
      dailyAvg = totalRev / currentDay;
    } else if (todayRevenue > 0) {
      dailyAvg = todayRevenue;
    }

    const projection = dailyAvg * daysInMonth;
    const progress = (currentDay / daysInMonth) * 100;

    return {
      monthlyProjection: projection,
      monthProgress: progress,
      daysRemaining
    };
  }, [links, todayRevenue]);

  // ═══════════════════════════════════════════════════════════════════════════
  // CELEBRATION DETECTION - Trigger when goal reached
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!gamification) return;

    if (shouldShowCelebration(todayRevenue, gamification.dailyGoal, gamification.goalReached)) {
      setShowCelebration(true);
      markGoalReached();
      // Hide confetti after 3 seconds
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [todayRevenue, gamification]);

  // Goal progress percentage
  const goalProgress = useMemo(() => {
    if (!gamification?.dailyGoal) return 0;
    return Math.min((todayRevenue / gamification.dailyGoal) * 100, 100);
  }, [todayRevenue, gamification]);

  // Calcular stats desde los datos cacheados
  const stats = useMemo(() => {
    const activeLinksCount = links?.filter((l: any) => l.is_active !== false).length || 0;
    const linkRev = links?.reduce((acc: number, l: any) => acc + (l.earnings || 0), 0) || 0;
    const linkClx = links?.reduce((acc: number, l: any) => acc + (l.views || 0), 0) || 0;
    const bioRev = (analyticsData as any)?.bioRevenue || 0;
    const bioClx = (analyticsData as any)?.bioClicks || 0;
    const totalRev = linkRev + bioRev;
    const totalClx = linkClx + bioClx;

    return {
      totalRevenue: totalRev,
      linkRevenue: linkRev,
      bioRevenue: bioRev,
      totalClicks: totalClx,
      linkClicks: linkClx,
      bioClicks: bioClx,
      activeLinks: activeLinksCount,
      rpm: totalClx > 0 ? (totalRev / totalClx) * 1000 : 0,
    };
  }, [links, analyticsData]);

  // Calcular datos de charts desde los datos cacheados
  const { timeseries, clicksByDay, countries, devices } = useMemo(() => {
    if (!analyticsData) {
      return { timeseries: [], clicksByDay: [], countries: [], devices: [] };
    }

    // Get timeseries from API
    let ts = analyticsData.timeseries || [];

    // Format dates for 7D range to show week days
    const formatChartDate = (dateStr: string) => {
      if (!dateStr) return '';
      try {
        const date = new Date(dateStr);
        if (Number.isNaN(date.getTime())) return dateStr;
        if (range === '7d') {
          const dayNames = ['Dom', 'Lun', 'Man', 'Ahb', 'Tur', 'Pai', 'Gdb'];
          return dayNames[date.getDay()];
        }
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
      } catch {
        return dateStr;
      }
    };

    // Convert to CUMULATIVE chart (progressive earnings over time)
    let cumulativeEarnings = 0;
    let cumulativeClicks = 0;
    let tsCumulative = ts.map((point: any) => {
      const pointDate = point?.isoDate || point?.date || point?.day || '';
      cumulativeEarnings += point.earnings || 0;
      cumulativeClicks += point.clicks || 0;
      return {
        date: formatChartDate(pointDate),
        earnings: cumulativeEarnings,
        clicks: cumulativeClicks,
      };
    });

    // If cumulative ends below total revenue, adjust last point (keeps existing behavior)
    const finalCumulative = tsCumulative.length > 0 ? tsCumulative[tsCumulative.length - 1].earnings : 0;
    if (finalCumulative < stats.totalRevenue && stats.totalRevenue > 0 && tsCumulative.length > 0) {
      const lastPoint = tsCumulative[tsCumulative.length - 1];
      tsCumulative[tsCumulative.length - 1] = {
        ...lastPoint,
        earnings: stats.totalRevenue,
        clicks: stats.totalClicks,
      };
    }

    // Fallback: if no timeseries data, create 7-day progression with proper day labels
    if (tsCumulative.length === 0 && stats.totalRevenue > 0) {
      const dayLabels = ['Lun', 'Man', 'Ahb', 'Tur', 'Pai', 'Gdb', 'Dom'];
      tsCumulative = dayLabels.map((label, i) => ({
        date: label,
        earnings: (stats.totalRevenue / 7) * (i + 1),
        clicks: Math.round((stats.totalClicks / 7) * (i + 1)),
      }));
    }

    // Normalize countries
    const countryCodeToName: Record<string, string> = {
      'ES': 'Spain', 'MX': 'Mexico', 'AR': 'Argentina', 'CO': 'Colombia',
      'CL': 'Chile', 'PE': 'Peru', 'US': 'United States', 'BR': 'Brazil',
      'DE': 'Germany', 'FR': 'France', 'IT': 'Italy', 'PT': 'Portugal',
      'GB': 'United Kingdom', 'CA': 'Canada', 'VE': 'Venezuela', 'EC': 'Ecuador',
      'UY': 'Uruguay', 'PY': 'Paraguay', 'BO': 'Bolivia', 'CR': 'Costa Rica',
      'PA': 'Panama', 'DO': 'Dominican Republic', 'GT': 'Guatemala', 'HN': 'Honduras',
      'NI': 'Nicaragua', 'SV': 'El Salvador', 'CU': 'Cuba', 'PR': 'Puerto Rico',
      'SPAIN': 'Spain', 'MEXICO': 'Mexico', 'ARGENTINA': 'Argentina', 'COLOMBIA': 'Colombia',
      'CHILE': 'Chile', 'PERU': 'Peru', 'UNITED STATES': 'United States', 'BRAZIL': 'Brazil',
      'GERMANY': 'Germany', 'FRANCE': 'France', 'ITALY': 'Italy', 'PORTUGAL': 'Portugal',
      'UNITED KINGDOM': 'United Kingdom', 'CANADA': 'Canada', 'VENEZUELA': 'Venezuela',
    };
    const rawCountries = analyticsData.countries || [];
    const mergedMap: Record<string, { clicks: number; percent: number }> = {};
    rawCountries.forEach((c: any) => {
      const key = c.country?.toUpperCase();
      const name = countryCodeToName[key] || c.country;
      if (!mergedMap[name]) {
        mergedMap[name] = { clicks: 0, percent: 0 };
      }
      mergedMap[name].clicks += c.value || c.clicks || 0;
      mergedMap[name].percent += c.percent || 0;
    });
    const normalizedCountries = Object.entries(mergedMap).map(([country, data]) => ({
      country,
      clicks: data.clicks,
      percent: data.percent
    })).sort((a, b) => b.percent - a.percent);

    return {
      timeseries: tsCumulative,
      clicksByDay: analyticsData.clicksByDay || [],
      countries: normalizedCountries,
      devices: analyticsData.devices || [],
    };
  }, [analyticsData, stats, range]);

  // Animated values - Skip animation si datos ya están cacheados
  const skipAnimation = analyticsData !== null;
  const animRevenue = useCountTo(stats.totalRevenue, 1500);
  const animClicks = useCountTo(stats.totalClicks, 1500);
  const animLinks = useCountTo(stats.activeLinks, 1500);
  const animRpm = useCountTo(stats.rpm, 1500);

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
            <button className="lpa-btn" onClick={refresh}><RefreshCw size={14} /> Reintentar</button>
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
            <button className="lpa-btn" onClick={refresh}><RefreshCw size={14} /> Refrescar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lpa-shell">
      {showCompareOverlay && (
        <div
          className="lpa-compare-overlay"
          aria-hidden="true"
          style={{
            opacity: compareOpacity,
            backgroundImage: "url('/mockups/analytics-ingresos.png')",
          }}
        />
      )}
      <div className="lpa-inner">

        {/* Period selector */}
        <div className="lpa-range-bar">
          {RANGE_OPTIONS.map(opt => (
            <button
              key={opt.key}
              className={`lpa-range-btn ${range === opt.key ? 'active' : ''}`}
              onClick={() => {
                if (opt.key !== 'custom') {
                  setRange(opt.key as TimeRange);
                }
                // TODO: Implement custom date range picker
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Chart Toggle Buttons */}
        <div className="lpa-chart-tabs-v3">
          <button className={`lpa-tab-v3 ${chartView === 'revenue' ? 'active' : ''}`} onClick={() => setChartView('revenue')}>
            INGRESOS
          </button>
          <button className={`lpa-tab-v3 ${chartView === 'clicks' ? 'active' : ''}`} onClick={() => setChartView('clicks')}>
            CLICKS
          </button>
          <button className={`lpa-tab-v3 ${chartView === 'links' ? 'active' : ''}`} onClick={() => setChartView('links')}>
            TOP LINKS
          </button>
          <button className={`lpa-tab-v3 ${chartView === 'geo' ? 'active' : ''}`} onClick={() => setChartView('geo')}>
            GEO
          </button>
          <button className="lpa-tab-v3" onClick={() => navigate('/app/referrals')}>
            REFERIDOS
          </button>
        </div>

        {/* Chart Area */}
        <div className="lpa-chart-card">
          {chartView === 'revenue' && (
            <>
              {/* ═══════════════════════════════════════════════════════════════
                  STREAK BADGE - Right aligned per mockup
                  ════════════════════════════════════════════════════════════════ */}
              <motion.div
                className="lpa-v4-streak-badge"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span className="lpa-v4-streak-emoji">🔥</span>
                <span className="lpa-v4-streak-racha">Racha</span>
                <span className="lpa-v4-streak-days">de 7 días</span>
                <span className="lpa-v4-streak-percent">+23%</span>
                <span className="lpa-v4-streak-chevron">›</span>
              </motion.div>

              {/* ═══════════════════════════════════════════════════════════════
                  HERO CARD - INGRESOS TOTALES with green glow
                  ════════════════════════════════════════════════════════════════ */}
              <motion.div
                className="lpa-v4-hero-card"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {showCelebration && (
                  <div className="lpa-confetti-container">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="lpa-confetti" style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 0.5}s`
                      }} />
                    ))}
                  </div>
                )}

                <div className="lpa-v4-hero-label">INGRESOS TOTALES</div>
                <div className="lpa-v4-hero-amount-row">
                  <span className="lpa-v4-hero-amount">{formatMoney(animRevenue)}</span>
                  <span className="lpa-v4-pulse-dot" />
                </div>

                <div className="lpa-v4-stats-row">
                  <div className="lpa-v4-stat">
                    <span className="lpa-v4-stat-value">€{animRpm.toFixed(2)}</span>
                    <span className="lpa-v4-stat-label yellow">RPM</span>
                  </div>
                  <div className="lpa-v4-stat">
                    <span className="lpa-v4-stat-value">{formatNum(animClicks)}</span>
                    <span className="lpa-v4-stat-label cyan">CLICKS</span>
                  </div>
                  <div className="lpa-v4-stat">
                    <span className="lpa-v4-stat-value">{stats.activeLinks}</span>
                    <span className="lpa-v4-stat-label purple">LINKS</span>
                  </div>
                </div>

                <div className="lpa-v4-goal-section">
                  <div className="lpa-v4-goal-header">
                    <span className="lpa-v4-goal-label">META DIARIA</span>
                    <span className="lpa-v4-goal-divider" aria-hidden="true" />
                    <span className="lpa-v4-goal-target">€{(gamification?.dailyGoal ?? 5).toFixed(2)}</span>
                  </div>
                  <div className="lpa-v4-goal-bar">
                    <motion.div
                      className="lpa-v4-goal-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${goalProgress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="lpa-v4-goal-footer">
                    <span className="lpa-v4-goal-progress">
                      €{todayRevenue.toFixed(2)} / €{(gamification?.dailyGoal ?? 5).toFixed(2)}
                    </span>
                    <span className="lpa-v4-goal-link">Ver Detalles &gt;</span>
                  </div>
                </div>
              </motion.div>

              {/* ═══════════════════════════════════════════════════════════════
                  SOURCES CARDS - EVOLUCIÓN DE INGRESOS
                  ════════════════════════════════════════════════════════════════ */}
              <div className="lpa-v4-section-label">EVOLUCIÓN DE INGRESOS</div>

              <div className="lpa-v4-sources-row">
                {/* Smart Links Card */}
                <motion.div
                  className="lpa-v4-source-card"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="lpa-v4-source-header">
                    <span className="lpa-v4-source-emoji">⚡</span>
                    <span>Smart Links</span>
                  </div>
                  <div className="lpa-v4-source-divider" />
                  <div className="lpa-v4-source-row">
                    <span className="lpa-v4-source-amount">€{stats.linkRevenue.toFixed(4)}</span>
                    <span className="lpa-v4-source-percent">{stats.totalRevenue > 0 ? ((stats.linkRevenue / stats.totalRevenue) * 100).toFixed(0) : 100}%</span>
                  </div>
                  <div className="lpa-v4-source-bar">
                    <div className="lpa-v4-source-bar-fill smart" style={{ width: `${stats.totalRevenue > 0 ? (stats.linkRevenue / stats.totalRevenue) * 100 : 100}%` }} />
                  </div>
                  <div className="lpa-v4-source-actions">
                    <button onClick={() => navigate('/app/links')} className="lpa-v4-btn-blue">
                      Ver Enlaces
                    </button>
                    <button onClick={() => navigate('/app/links?create=true')} className="lpa-v4-btn-green">
                      + Crear Link
                    </button>
                  </div>
                </motion.div>

                {/* Bio Page Card */}
                <motion.div
                  className="lpa-v4-source-card"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="lpa-v4-source-header">
                    <span className="lpa-v4-source-emoji">🌐</span>
                    <span>Bio Page</span>
                  </div>
                  <div className="lpa-v4-source-divider" />
                  <div className="lpa-v4-source-row">
                    <span className="lpa-v4-source-amount">€{stats.bioRevenue.toFixed(4)}</span>
                    <span className="lpa-v4-source-percent">{stats.totalRevenue > 0 && stats.bioRevenue > 0 ? ((stats.bioRevenue / stats.totalRevenue) * 100).toFixed(0) : 0}%</span>
                  </div>
                  <div className="lpa-v4-source-bar">
                    <div className="lpa-v4-source-bar-fill bio" style={{ width: `${stats.totalRevenue > 0 && stats.bioRevenue > 0 ? (stats.bioRevenue / stats.totalRevenue) * 100 : 0}%` }} />
                  </div>
                  <div className="lpa-v4-source-actions">
                    <button onClick={() => navigate('/app/bio')} className="lpa-v4-btn-gray">
                      Editar Bio
                    </button>
                    <button onClick={() => navigate('/app/bio')} className="lpa-v4-btn-gray-green">
                      Ver BioPages
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  CHART - V4 Design
                  ════════════════════════════════════════════════════════════════ */}
              <motion.div
                className="lpa-v4-chart-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="lpa-v4-chart-comparison">
                  <span className="lpa-v4-chart-percent">+23%</span>
                  <span className="lpa-v4-chart-text">Más que la semana pasada</span>
                </div>

                <div className="lpa-v4-chart">
                  <ResponsiveContainer width="100%" height={80}>
                    <AreaChart data={timeseries} margin={{ top: 10, right: 18, left: 10, bottom: 10 }}>
                      <defs>
                        <linearGradient id="gRevV4" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4ade80" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
                        </linearGradient>
                        <filter id="revGlowV4" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="2.2" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="earnings"
                        stroke="#4ade80"
                        strokeWidth={2.4}
                        fill="url(#gRevV4)"
                        filter="url(#revGlowV4)"
                        dot={(props: any) => {
                          const { cx, cy, index } = props || {};
                          const lastIndex = timeseries.length - 1;
                          if (index !== lastIndex || cx == null || cy == null) return null;
                          return (
                            <g>
                              {/* vertical guide like mock (clipped by chart) */}
                              <line
                                x1={cx}
                                y1={cy}
                                x2={cx}
                                y2={9999}
                                stroke="rgba(74, 222, 128, 0.45)"
                                strokeWidth={1}
                              />
                              {/* glow rings */}
                              <circle cx={cx} cy={cy} r={10} fill="rgba(74, 222, 128, 0.10)" />
                              <circle cx={cx} cy={cy} r={6} fill="rgba(74, 222, 128, 0.22)" />
                              <circle cx={cx} cy={cy} r={3.5} fill="#bbf7d0" stroke="#4ade80" strokeWidth={1} />
                            </g>
                          );
                        }}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: 'rgba(148, 163, 184, 0.85)', fontSize: 9, fontWeight: 600 }}
                        tickLine={false}
                        axisLine={false}
                        interval={range === '7d' ? 0 : 'preserveStartEnd'}
                        tickMargin={8}
                      />
                      <YAxis hide />
                      <CartesianGrid strokeDasharray="4 8" stroke="rgba(148, 163, 184, 0.10)" vertical={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* ═══════════════════════════════════════════════════════════════
                  PROYECCIÓN MENSUAL - V4 Design
                  ════════════════════════════════════════════════════════════════ */}
              <motion.div
                className="lpa-v4-projection"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <div className="lpa-v4-projection-header">
                  PROYECCIÓN MENSUAL: <span className="lpa-v4-projection-amount">€{monthlyProjection.toFixed(2)}</span>
                </div>
                <div className="lpa-v4-projection-content">
                  <div className="lpa-v4-projection-stat">
                    <div className="lpa-v4-projection-stat-row">
                      <span className="lpa-v4-projection-arrow">↗</span>
                      <span className="lpa-v4-projection-value green">€{animRpm.toFixed(2)}</span>
                    </div>
                    <span className="lpa-v4-projection-label">RPM EN VIVO</span>
                  </div>
                  <div className="lpa-v4-projection-stat">
                    <div className="lpa-v4-projection-views">
                      <span className="lpa-v4-projection-eye">👁</span>
                      <span className="lpa-v4-projection-value">{formatNum(Math.round(animClicks * 30))}</span>
                    </div>
                    <span className="lpa-v4-projection-label" style={{ color: '#64748b' }}>PROYECCIÓN DE VISTAS</span>
                  </div>
                  <div className="lpa-v4-circular-progress">
                    <svg viewBox="0 0 36 36" className="lpa-v4-circular-svg">
                      <defs>
                        <linearGradient id="circleGradientV4" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                      </defs>
                      <path
                        className="lpa-v4-circle-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="lpa-v4-circle-fg"
                        strokeDasharray={`${monthProgress}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        style={{ stroke: 'url(#circleGradientV4)' }}
                      />
                    </svg>
                    <span className="lpa-v4-circular-text">{Math.round(monthProgress)}%</span>
                  </div>
                </div>
              </motion.div>
            </>
          )}

          {chartView === 'clicks' && (
            <>
              {/* CLICKS HERO - Beast Mode */}
              <div className="lpa-clicks-hero">
                <div className="lpa-clicks-hero-glow" />
                <div className="lpa-clicks-hero-content">
                  <div className="lpa-clicks-hero-label"><MousePointer2 size={18} className="lpa-icon-animated-purple" /> Clicks Totales</div>
                  <div className="lpa-clicks-hero-number-row">
                    <motion.div
                      className="lpa-hero-3d-icon purple"
                      animate={{ rotateY: [0, 360], scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Zap size={32} />
                    </motion.div>
                    <div className="lpa-clicks-hero-amount">{formatNum(animClicks)}</div>
                  </div>
                  <div className="lpa-clicks-hero-live">
                    <span className="lpa-pulse-dot purple" />
                    <span>Tracking activo</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats Row - Same as Revenue */}
              <div className="lpa-revenue-quick-stats">
                <motion.div
                  className="lpa-quick-stat links"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <div className="lpa-quick-stat-glow" />
                  <span className="lpa-quick-stat-icon"><Link2 size={20} className="lpa-icon-bounce" /></span>
                  <div className="lpa-quick-stat-info">
                    <span className="lpa-quick-stat-val">{links.filter(l => (l.views || 0) > 0).length}</span>
                    <span className="lpa-quick-stat-label">Con Tráfico</span>
                  </div>
                </motion.div>
                <motion.div
                  className="lpa-quick-stat clicks"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <div className="lpa-quick-stat-glow" />
                  <span className="lpa-quick-stat-icon"><BarChart3 size={20} className="lpa-icon-bounce" /></span>
                  <div className="lpa-quick-stat-info">
                    <span className="lpa-quick-stat-val">{links.length > 0 ? Math.round(stats.totalClicks / links.length) : 0}</span>
                    <span className="lpa-quick-stat-label">Promedio/Link</span>
                  </div>
                </motion.div>
                <motion.div
                  className="lpa-quick-stat rpm"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <div className="lpa-quick-stat-glow" />
                  <span className="lpa-quick-stat-icon"><TrendingUp size={20} className="lpa-icon-bounce" /></span>
                  <div className="lpa-quick-stat-info">
                    <span className="lpa-quick-stat-val">€{stats.totalClicks > 0 ? (stats.totalRevenue / stats.totalClicks).toFixed(3) : '0.00'}</span>
                    <span className="lpa-quick-stat-label">Por Click</span>
                  </div>
                </motion.div>
              </div>

              {/* Chart Title */}
              <div className="lpa-chart-section-title">
                <span className="lpa-section-icon"><Activity size={16} className="lpa-icon-pulse-purple" /></span>
                <span className="lpa-section-text">Clicks por Día</span>
              </div>

              {/* Bar Chart - Enhanced */}
              <div className="lpa-chart-wrap premium purple">
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={clicksByDay}>
                    <defs>
                      <linearGradient id="gClicksPremium" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} width={25} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="clicks" fill="url(#gClicksPremium)" radius={[6, 6, 0, 0]} name="clicks" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Click Distribution by Source */}
              <div className="lpa-chart-section-title" style={{ marginTop: '16px' }}>
                <span className="lpa-section-icon"><Zap size={16} className="lpa-icon-shine" /></span>
                <span className="lpa-section-text">Distribución por Fuente</span>
              </div>
              <div className="lpa-click-report">
                <div className="lpa-click-breakdown">

                  {/* Bio Page Clicks - Show first if has clicks */}
                  {stats.bioClicks > 0 && (
                    <div className="lpa-click-item bio-special">
                      <div className="lpa-click-item-header">
                        <span className="lpa-click-rank" style={{ background: '#22d3ee' }}>
                          <Globe2 size={12} />
                        </span>
                        <span className="lpa-click-link-name">Bio Page</span>
                        <span className="lpa-click-count" style={{ color: '#22d3ee' }}>{stats.bioClicks}</span>
                      </div>
                      <div className="lpa-click-item-bar">
                        <div
                          className="lpa-click-item-fill"
                          style={{
                            width: `${stats.totalClicks > 0 ? (stats.bioClicks / stats.totalClicks) * 100 : 0}%`,
                            background: 'linear-gradient(90deg, #22d3ee, #06b6d4)'
                          }}
                        />
                      </div>
                      <div className="lpa-click-item-footer">
                        <span className="lpa-click-pct">{stats.totalClicks > 0 ? ((stats.bioClicks / stats.totalClicks) * 100).toFixed(1) : 0}% del total</span>
                        <span className="lpa-click-earn">{formatMoneyShort(stats.bioRevenue)}</span>
                      </div>
                    </div>
                  )}

                  {/* Smart Links */}
                  {[...links]
                    .sort((a, b) => (b.views || 0) - (a.views || 0))
                    .slice(0, stats.bioClicks > 0 ? 5 : 6)
                    .map((link, i) => {
                      const pct = stats.totalClicks > 0 ? ((link.views || 0) / stats.totalClicks) * 100 : 0;
                      return (
                        <div className="lpa-click-item" key={link.id}>
                          <div className="lpa-click-item-header">
                            <span className="lpa-click-rank" style={{ background: COLORS[i % COLORS.length] }}>
                              {i + 1}
                            </span>
                            <span className="lpa-click-link-name">{link.title || link.slug}</span>
                            <span className="lpa-click-count">{link.views || 0}</span>
                          </div>
                          <div className="lpa-click-item-bar">
                            <div
                              className="lpa-click-item-fill"
                              style={{
                                width: `${pct}%`,
                                background: COLORS[i % COLORS.length]
                              }}
                            />
                          </div>
                          <div className="lpa-click-item-footer">
                            <span className="lpa-click-pct">{pct.toFixed(1)}% del total</span>
                            <span className="lpa-click-earn">{formatMoneyShort(link.earnings || 0)}</span>
                          </div>
                        </div>
                      );
                    })}
                  {links.length === 0 && stats.bioClicks === 0 && (
                    <div className="lpa-empty-mini">Crea tu primer link para ver estadísticas</div>
                  )}
                </div>
              </div>
            </>
          )}

          {chartView === 'links' && (
            <>
              {/* LINKS HERO - Brutal Mobile First */}
              <motion.div
                className="lpa-links-hero"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
              >
                <div className="lpa-links-hero-glow" />
                <div className="lpa-links-hero-content">
                  <div className="lpa-links-hero-label"><Link2 size={18} className="lpa-icon-animated-blue" /> Enlaces Creados</div>
                  <div className="lpa-links-hero-number-row">
                    <motion.div
                      className="lpa-hero-3d-icon blue"
                      animate={{ rotateY: [0, 360], scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Link2 size={32} />
                    </motion.div>
                    <motion.div
                      className="lpa-links-hero-number"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                    >
                      {links.length}
                    </motion.div>
                  </div>
                  <div className="lpa-links-hero-live">
                    <span className="lpa-pulse-dot blue" />
                    <span>Dashboard en vivo</span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats Row - Same layout as Revenue */}
              <div className="lpa-revenue-quick-stats">
                <motion.div
                  className="lpa-quick-stat links-clicks"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <div className="lpa-quick-stat-glow" />
                  <span className="lpa-quick-stat-icon"><MousePointer2 size={20} className="lpa-icon-bounce" /></span>
                  <div className="lpa-quick-stat-info">
                    <span className="lpa-quick-stat-val">{formatNum(stats.linkClicks)}</span>
                    <span className="lpa-quick-stat-label">Clicks</span>
                  </div>
                </motion.div>
                <motion.div
                  className="lpa-quick-stat links-revenue"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <div className="lpa-quick-stat-glow" />
                  <span className="lpa-quick-stat-icon"><DollarSign size={20} className="lpa-icon-bounce" /></span>
                  <div className="lpa-quick-stat-info">
                    <span className="lpa-quick-stat-val">{formatMoneyShort(stats.linkRevenue)}</span>
                    <span className="lpa-quick-stat-label">Ingresos</span>
                  </div>
                </motion.div>
                <motion.div
                  className="lpa-quick-stat links-active"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <div className="lpa-quick-stat-glow" />
                  <span className="lpa-quick-stat-icon"><Zap size={20} className="lpa-icon-bounce" /></span>
                  <div className="lpa-quick-stat-info">
                    <span className="lpa-quick-stat-val">{links.filter(l => (l.views || 0) > 0).length}</span>
                    <span className="lpa-quick-stat-label">Con Tráfico</span>
                  </div>
                </motion.div>
              </div>

              {/* Section Title */}
              <div className="lpa-links-section-title">
                <BarChart3 size={16} className="lpa-icon-pulse-blue" />
                <span>Rendimiento por Enlace</span>
              </div>

              {/* Links List - COLLAPSIBLE INCREDIBLE CARDS */}
              <div className="lpa-link-cards">
                <AnimatePresence mode="sync">
                  {[...links]
                    .sort((a, b) => (b.earnings || 0) - (a.earnings || 0))
                    .slice(0, linksExpanded ? undefined : 3)
                    .map((link, i) => {
                      const clicks = link.views || 0;
                      const earnings = link.earnings || 0;
                      const maxEarnings = links.reduce((max, l) => Math.max(max, l.earnings || 0), 1);
                      const pct = maxEarnings > 0 ? (earnings / maxEarnings) * 100 : 0;
                      const epc = clicks > 0 ? earnings / clicks : 0;

                      // Top 3 get medals, rest get number
                      const medals = [
                        { emoji: '🥇', name: 'gold', color: '#fbbf24', bg: 'linear-gradient(145deg, #fde047 0%, #fbbf24 30%, #b45309 100%)' },
                        { emoji: '🥈', name: 'silver', color: '#94a3b8', bg: 'linear-gradient(145deg, #e2e8f0 0%, #94a3b8 30%, #475569 100%)' },
                        { emoji: '🥉', name: 'bronze', color: '#f97316', bg: 'linear-gradient(145deg, #fdba74 0%, #f97316 30%, #7c2d12 100%)' },
                      ];
                      const isTop3 = i < 3;
                      const medal = isTop3 ? medals[i] : { emoji: `${i + 1}`, name: 'rank', color: '#3b82f6', bg: 'linear-gradient(145deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)' };

                      return (
                        <motion.div
                          className={`lpa-link-card ${isTop3 ? `medal-${medal.name}` : 'rank-card'}`}
                          key={link.id}
                          initial={{ opacity: 0, y: 25, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ delay: isTop3 ? 0.1 + i * 0.12 : 0.05, type: 'spring', stiffness: 180, damping: 15 }}
                          whileHover={{ scale: 1.03, y: -4 }}
                          whileTap={{ scale: 0.97 }}
                          layout
                        >
                          {/* 4K DETAIL MEDAL - Less Movement, More Quality */}
                          <motion.div
                            className={`lpa-medal-3d ${isTop3 ? `medal-${medal.name}` : 'rank-badge'}`}
                            style={{ background: medal.bg }}
                            whileHover={{
                              rotateY: 20,
                              rotateX: -10,
                              scale: 1.15
                            }}
                            animate={isTop3 ? {
                              y: [0, -3, 0],
                              rotateY: [0, 4, 0, -4, 0],
                              rotateX: [0, -2, 0, 2, 0],
                            } : {}}
                            transition={isTop3 ? {
                              duration: 3.5 + i * 0.5,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            } : {}}
                          >
                            <motion.span
                              className="lpa-medal-emoji"
                              animate={isTop3 ? {
                                scale: [1, 1.05, 1],
                              } : {}}
                              transition={isTop3 ? {
                                duration: 2.5 + i * 0.3,
                                repeat: Infinity,
                                ease: 'easeInOut'
                              } : {}}
                            >
                              {medal.emoji}
                            </motion.span>
                          </motion.div>

                          {/* Main Content */}
                          <div className="lpa-link-card-content">
                            {/* Header */}
                            <div className="lpa-link-card-header">
                              <span className="lpa-link-card-title">{link.title || link.slug}</span>
                              <span className="lpa-link-card-earnings">{formatMoneyShort(earnings)}</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="lpa-link-card-progress">
                              <motion.div
                                className="lpa-link-card-progress-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                                style={{
                                  background: `linear-gradient(90deg, ${medal.color}, ${medal.color}88)`
                                }}
                              />
                            </div>

                            {/* Stats Row */}
                            <div className="lpa-link-card-stats">
                              <div className="lpa-link-card-stat">
                                <MousePointer2 size={12} className="lpa-3d-icon-sm" />
                                <span>{clicks} clicks</span>
                              </div>
                              {clicks > 0 && (
                                <div className="lpa-link-card-stat epc">
                                  <TrendingUp size={12} className="lpa-3d-icon-sm" />
                                  <span>€{epc.toFixed(4)}</span>
                                </div>
                              )}
                              <div className="lpa-link-card-stat slug">
                                <ExternalLink size={12} className="lpa-3d-icon-sm" />
                                <span>/{link.slug}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                </AnimatePresence>
              </div>

              {/* Expand/Collapse Button */}
              {links.length > 3 && (
                <motion.button
                  className="lpa-links-expand-btn"
                  onClick={() => setLinksExpanded(!linksExpanded)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    animate={{ rotate: linksExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                  <span>{linksExpanded ? 'Ver menos' : `Ver ${links.length - 3} más`}</span>
                </motion.button>
              )}

              {links.length === 0 && (
                <div className="lpa-empty-links">
                  <Link2 size={40} className="lpa-empty-icon lpa-3d-icon" />
                  <div className="lpa-empty-title">Sin enlaces todavía</div>
                  <div className="lpa-empty-sub">Crea tu primer enlace para empezar</div>
                </div>
              )}

              {/* Performance Summary */}
              {links.length > 0 && (
                <div className="lpa-links-summary">
                  <div className="lpa-summary-item">
                    <span className="lpa-summary-label">Mejor link:</span>
                    <span className="lpa-summary-val">
                      {[...links].sort((a, b) => (b.earnings || 0) - (a.earnings || 0))[0]?.title || '-'}
                    </span>
                  </div>
                  <div className="lpa-summary-item">
                    <span className="lpa-summary-label">Más clicks:</span>
                    <span className="lpa-summary-val">
                      {[...links].sort((a, b) => (b.views || 0) - (a.views || 0))[0]?.title || '-'}
                      <span className="lpa-summary-num">
                        ({[...links].sort((a, b) => (b.views || 0) - (a.views || 0))[0]?.views || 0})
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {chartView === 'geo' && (
            <div className="lpa-geo-premium">
              {/* HERO SECTION */}
              <motion.div
                className="lpa-geo-hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="lpa-geo-hero-glow" />
                <div className="lpa-geo-hero-content">
                  <div className="lpa-geo-hero-label"><Globe2 size={18} className="lpa-icon-animated-cyan" /> Países Alcanzados</div>
                  <div className="lpa-geo-hero-number-row">
                    <motion.div
                      className="lpa-hero-3d-icon cyan"
                      animate={{ rotateY: [0, 360], scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Globe2 size={32} />
                    </motion.div>
                    <div className="lpa-geo-hero-number">{countries.length}</div>
                  </div>
                  <div className="lpa-geo-hero-live">
                    <span className="lpa-pulse-dot cyan" />
                    <span>En tiempo real</span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats Row - Same layout as Revenue */}
              <div className="lpa-revenue-quick-stats">
                <motion.div
                  className="lpa-quick-stat geo-countries"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <div className="lpa-quick-stat-glow" />
                  <span className="lpa-quick-stat-icon"><Globe2 size={20} className="lpa-icon-bounce" /></span>
                  <div className="lpa-quick-stat-info">
                    <span className="lpa-quick-stat-val">{countries.length}</span>
                    <span className="lpa-quick-stat-label">Países</span>
                  </div>
                </motion.div>
                <motion.div
                  className="lpa-quick-stat geo-devices"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <div className="lpa-quick-stat-glow" />
                  <span className="lpa-quick-stat-icon"><Smartphone size={20} className="lpa-icon-bounce" /></span>
                  <div className="lpa-quick-stat-info">
                    <span className="lpa-quick-stat-val">{devices.length}</span>
                    <span className="lpa-quick-stat-label">Dispositivos</span>
                  </div>
                </motion.div>
                <motion.div
                  className="lpa-quick-stat geo-clicks"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <div className="lpa-quick-stat-glow" />
                  <span className="lpa-quick-stat-icon"><Zap size={20} className="lpa-icon-bounce" /></span>
                  <div className="lpa-quick-stat-info">
                    <span className="lpa-quick-stat-val">{countries.length > 0 ? countries.reduce((sum, c) => sum + (c.clicks || 0), 0) : 0}</span>
                    <span className="lpa-quick-stat-label">Clicks Geo</span>
                  </div>
                </motion.div>
              </div>

              {countries.length === 0 && devices.length === 0 ? (
                <motion.div
                  className="lpa-geo-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="lpa-geo-empty-icon">🌍</div>
                  <div className="lpa-geo-empty-title">Sin datos geográficos</div>
                  <div className="lpa-geo-empty-desc">
                    Los datos de país y dispositivo aparecerán cuando tus enlaces reciban clicks
                  </div>
                </motion.div>
              ) : (
                <div className="lpa-geo-grid-premium">
                  {/* COUNTRIES SECTION */}
                  <motion.div
                    className="lpa-geo-section-premium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="lpa-geo-section-header">
                      <div className="lpa-geo-section-icon countries"><Globe2 size={16} /></div>
                      <span>Países</span>
                      <span className="lpa-geo-section-count">{countries.length}</span>
                    </div>
                    <div className="lpa-geo-list">
                      <AnimatePresence>
                        {countries.slice(0, 6).map((c, i) => {
                          const flags: Record<string, string> = {
                            // Full country names (normalized)
                            'SPAIN': '🇪🇸', 'MEXICO': '🇲🇽', 'ARGENTINA': '🇦🇷', 'COLOMBIA': '🇨🇴',
                            'CHILE': '🇨🇱', 'PERU': '🇵🇪', 'UNITED STATES': '🇺🇸', 'BRAZIL': '🇧🇷',
                            'GERMANY': '🇩🇪', 'FRANCE': '🇫🇷', 'ITALY': '🇮🇹', 'PORTUGAL': '🇵🇹',
                            'UNITED KINGDOM': '🇬🇧', 'CANADA': '🇨🇦', 'VENEZUELA': '🇻🇪', 'ECUADOR': '🇪🇨',
                            'URUGUAY': '🇺🇾', 'PARAGUAY': '🇵🇾', 'BOLIVIA': '🇧🇴', 'COSTA RICA': '🇨🇷',
                            'PANAMA': '🇵🇦', 'DOMINICAN REPUBLIC': '🇩🇴', 'GUATEMALA': '🇬🇹', 'HONDURAS': '🇭🇳',
                            'NICARAGUA': '🇳🇮', 'EL SALVADOR': '🇸🇻', 'CUBA': '🇨🇺', 'PUERTO RICO': '🇵🇷',
                            'JAPAN': '🇯🇵', 'CHINA': '🇨🇳', 'INDIA': '🇮🇳', 'AUSTRALIA': '🇦🇺',
                            'NETHERLANDS': '🇳🇱', 'BELGIUM': '🇧🇪', 'SWITZERLAND': '🇨🇭', 'AUSTRIA': '🇦🇹',
                            'POLAND': '🇵🇱', 'SWEDEN': '🇸🇪', 'NORWAY': '🇳🇴', 'DENMARK': '🇩🇰',
                            'RUSSIA': '🇷🇺', 'UKRAINE': '🇺🇦', 'TURKEY': '🇹🇷', 'SOUTH KOREA': '🇰🇷',
                          };
                          const flag = flags[c.country?.toUpperCase()] || '🌐';
                          const isTop = i === 0;
                          return (
                            <motion.div
                              className={`lpa-geo-card ${isTop ? 'top' : ''}`}
                              key={c.country}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + i * 0.05 }}
                              whileHover={{ scale: 1.02, x: 3 }}
                            >
                              <div className="lpa-geo-card-flag">{flag}</div>
                              <div className="lpa-geo-card-info">
                                <div className="lpa-geo-card-name">
                                  {c.country === 'UNKNOWN' ? 'Desconocido' : c.country}
                                  {isTop && <span className="lpa-geo-badge-top">🥇 TOP</span>}
                                </div>
                                <div className="lpa-geo-card-bar">
                                  <motion.div
                                    className="lpa-geo-card-bar-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${c.percent}%` }}
                                    transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                                    style={{ background: isTop ? 'linear-gradient(90deg, #22d3ee, #06b6d4)' : COLORS[i] }}
                                  />
                                </div>
                              </div>
                              <div className="lpa-geo-card-stats">
                                <span className="lpa-geo-card-percent">{c.percent.toFixed(0)}%</span>
                                <span className="lpa-geo-card-clicks">{c.clicks} clicks</span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* DEVICES SECTION */}
                  <motion.div
                    className="lpa-geo-section-premium"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <div className="lpa-geo-section-header">
                      <div className="lpa-geo-section-icon devices"><Smartphone size={16} /></div>
                      <span>Dispositivos</span>
                      <span className="lpa-geo-section-count">{devices.length}</span>
                    </div>
                    <div className="lpa-geo-list">
                      <AnimatePresence>
                        {devices.slice(0, 5).map((d, i) => {
                          const n = (d.device || '').toLowerCase();
                          const deviceInfo = n.includes('mobile') || n.includes('phone')
                            ? { icon: '📱', color: '#22c55e' }
                            : n.includes('tablet') || n.includes('ipad')
                              ? { icon: '📲', color: '#f59e0b' }
                              : n.includes('desktop')
                                ? { icon: '🖥️', color: '#3b82f6' }
                                : { icon: '💻', color: '#8b5cf6' };
                          return (
                            <motion.div
                              className="lpa-geo-card"
                              key={d.device}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 + i * 0.05 }}
                              whileHover={{ scale: 1.02, x: 3 }}
                            >
                              <div className="lpa-geo-card-flag device" style={{ background: `${deviceInfo.color}22`, color: deviceInfo.color }}>{deviceInfo.icon}</div>
                              <div className="lpa-geo-card-info">
                                <div className="lpa-geo-card-name">{d.device || 'Otro'}</div>
                                <div className="lpa-geo-card-bar">
                                  <motion.div
                                    className="lpa-geo-card-bar-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${d.percent}%` }}
                                    transition={{ delay: 0.35 + i * 0.05, duration: 0.5 }}
                                    style={{ background: deviceInfo.color }}
                                  />
                                </div>
                              </div>
                              <div className="lpa-geo-card-stats">
                                <span className="lpa-geo-card-percent">{d.percent.toFixed(0)}%</span>
                                <span className="lpa-geo-card-clicks">{formatNum(d.value)} clicks</span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </div>


      </div>
    </div>
  );
}
