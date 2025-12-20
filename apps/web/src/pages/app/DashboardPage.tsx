import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  Wallet,
  MousePointer2,
  BarChart3,
  Users,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useCachedDashboard, useCachedPayouts } from '../../context/DataCacheContext';
import { PremiumLoader } from '../../components/PremiumLoader';
import './Dashboard.css';

// Hook para animar números
function useCountTo(end: number, duration = 1200, skip = false) {
  const [count, setCount] = useState(skip ? end : 0);

  useEffect(() => {
    if (skip) {
      setCount(end);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(end * ease);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, skip]);

  return count;
}

// Tipos de período temporal
type TimePeriod = 'today' | 'week' | 'month' | 'all';

export function DashboardPage() {
  const navigate = useNavigate();

  // Data hooks
  const { data: dashboardData, links, loading } = useCachedDashboard();
  const { balance } = useCachedPayouts();

  // UI State
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('all');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [linksExpanded, setLinksExpanded] = useState(false);

  // Animation skip for cached data
  const [hasAnimated, setHasAnimated] = useState(false);
  const skipAnimation = useMemo(() => dashboardData !== null && !hasAnimated, []);

  useEffect(() => {
    if (!loading && dashboardData) setHasAnimated(true);
  }, [loading, dashboardData]);

  // Stats from real data
  const stats = useMemo(() => ({
    totalRevenue: dashboardData?.totalRevenue ?? 0,
    totalClicks: dashboardData?.totalClicks ?? 0,
    linkClicks: dashboardData?.linkClicks ?? 0,
    bioClicks: dashboardData?.bioClicks ?? 0,
  }), [dashboardData]);

  // Calculate RPM
  const rpm = useMemo(() => {
    if (stats.totalClicks === 0) return 0;
    return (stats.totalRevenue / stats.totalClicks) * 1000;
  }, [stats.totalRevenue, stats.totalClicks]);

  // Top performing link
  const topLink = useMemo(() => {
    if (!links || links.length === 0) return null;
    return [...links].sort((a, b) => (b.earnings || 0) - (a.earnings || 0))[0];
  }, [links]);

  // Animated values
  const animatedRevenue = useCountTo(stats.totalRevenue, 1200, skipAnimation);
  const animatedBalance = useCountTo(balance, 1200, skipAnimation);
  const animatedClicks = useCountTo(stats.totalClicks, 1200, skipAnimation);
  const animatedRpm = useCountTo(rpm, 1200, skipAnimation);

  // Chart data from timeline (simplified)
  const chartData = useMemo(() => {
    const timeline = dashboardData?.timeline || [];
    if (timeline.length === 0) {
      // Fallback data for visual
      return Array.from({ length: 7 }, (_, i) => ({ day: i, value: Math.random() * 0.01 }));
    }
    return timeline.slice(-7).map((t: any, i: number) => ({
      day: i,
      value: t.revenue || 0
    }));
  }, [dashboardData?.timeline]);

  // Period labels
  const periodLabels: Record<TimePeriod, string> = {
    today: 'Hoy',
    week: 'Semana',
    month: 'Mes',
    all: 'Total'
  };

  if (loading) {
    return <PremiumLoader size="medium" text="LINKPAY" subtext="Cargando dashboard..." />;
  }

  return (
    <>
      {/* Background */}
      <div className="lp-bg">
        <div className="lp-bg-gradient" />
        <div className="lp-bg-glow" />
      </div>

      <div className="lp-dashboard-shell">
        <div className="lp-dashboard-2">

          {/* ROW 1: EARNINGS + BALANCE */}
          <div className="lp-d2-row-top">
            {/* EARNINGS CARD with dropdown */}
            <motion.div
              className="lp-d2-card lp-d2-earnings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="lp-d2-card-header">
                <DollarSign size={18} className="lp-d2-icon green" />
                <span className="lp-d2-label">INGRESOS</span>
              </div>
              <div className="lp-d2-value green">{animatedRevenue.toFixed(4)}</div>
              <button
                className="lp-d2-dropdown-btn"
                onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
              >
                {periodLabels[timePeriod]}
                <ChevronDown size={14} className={showPeriodDropdown ? 'rotated' : ''} />
              </button>

              <AnimatePresence>
                {showPeriodDropdown && (
                  <motion.div
                    className="lp-d2-dropdown"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    {(['today', 'week', 'month', 'all'] as TimePeriod[]).map(p => (
                      <button
                        key={p}
                        className={`lp-d2-dropdown-item ${timePeriod === p ? 'active' : ''}`}
                        onClick={() => { setTimePeriod(p); setShowPeriodDropdown(false); }}
                      >
                        {periodLabels[p]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* BALANCE CARD */}
            <motion.div
              className="lp-d2-card lp-d2-balance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              onClick={() => navigate('/app/finance')}
            >
              <div className="lp-d2-card-header">
                <Wallet size={18} className="lp-d2-icon blue" />
                <span className="lp-d2-label">BALANCE</span>
              </div>
              <div className="lp-d2-value blue">{animatedBalance.toFixed(2)}</div>
              <span className="lp-d2-hint">Disponible</span>
            </motion.div>
          </div>

          {/* ROW 2: CHART */}
          <motion.div
            className="lp-d2-chart-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="lp-d2-chart-header">
              <TrendingUp size={16} className="lp-d2-icon green" />
              <span>Ingresos - Ultimos 7 dias</span>
            </div>
            <div className="lp-d2-chart">
              <ResponsiveContainer width="100%" height={80}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    strokeWidth={2}
                    fill="url(#chartGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* ROW 3: STATS (4 columns) */}
          <motion.div
            className="lp-d2-stats-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            {/* CLICKS */}
            <div className="lp-d2-stat purple">
              <MousePointer2 size={20} />
              <span className="lp-d2-stat-value">{animatedClicks.toFixed(0)}</span>
              <span className="lp-d2-stat-label">CLICKS</span>
            </div>

            {/* RPM */}
            <div className="lp-d2-stat orange">
              <BarChart3 size={20} />
              <span className="lp-d2-stat-value">{animatedRpm.toFixed(2)}</span>
              <span className="lp-d2-stat-label">RPM</span>
            </div>

            {/* REFERIDOS */}
            <div className="lp-d2-stat cyan">
              <Users size={20} />
              <span className="lp-d2-stat-value">0</span>
              <span className="lp-d2-stat-label">REFERIDOS</span>
            </div>

            {/* TOP LINK */}
            <div
              className="lp-d2-stat indigo"
              onClick={() => topLink && navigate('/app/links')}
            >
              <LinkIcon size={20} />
              <span className="lp-d2-stat-value">{topLink ? `/${topLink.slug}` : '-'}</span>
              <span className="lp-d2-stat-label">TOP LINK</span>
            </div>
          </motion.div>

          {/* ROW 4: COLLAPSIBLE LINKS */}
          <motion.div
            className="lp-d2-links-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              className="lp-d2-links-toggle"
              onClick={() => setLinksExpanded(!linksExpanded)}
            >
              <LinkIcon size={18} />
              <span>Mis Enlaces</span>
              <span className="lp-d2-links-count">{links.length}</span>
              {linksExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            <AnimatePresence>
              {linksExpanded && (
                <motion.div
                  className="lp-d2-links-list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {links.slice(0, 5).map((link, i) => (
                    <div key={link.id} className="lp-d2-link-item">
                      <div className="lp-d2-link-info">
                        <span className="lp-d2-link-slug">/{link.slug}</span>
                        <span className="lp-d2-link-clicks">{link.views || 0} clicks</span>
                      </div>
                      <span className="lp-d2-link-earn">{(link.earnings || 0).toFixed(4)}</span>
                    </div>
                  ))}
                  {links.length === 0 && (
                    <div className="lp-d2-empty">No tienes enlaces aun</div>
                  )}
                  {links.length > 5 && (
                    <button
                      className="lp-d2-view-all"
                      onClick={() => navigate('/app/links')}
                    >
                      Ver todos <ExternalLink size={14} />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </>
  );
}
