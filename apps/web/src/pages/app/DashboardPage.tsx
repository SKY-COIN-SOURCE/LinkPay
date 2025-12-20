import React, { useEffect, useState, useMemo, useCallback, memo, useRef } from 'react';
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
  Copy,
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
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
  const [linksToShow, setLinksToShow] = useState(30); // Paginación de 30 en 30
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const dropdownButtonRef = React.useRef<HTMLButtonElement>(null);
  const chartHeaderRef = React.useRef<HTMLDivElement>(null);
  const linksDropdownRef = React.useRef<HTMLDivElement>(null);
  const linksScrollRef = React.useRef<HTMLDivElement>(null);

  // Animation skip for cached data
  const [hasAnimated, setHasAnimated] = useState(false);
  const skipAnimation = useMemo(() => dashboardData !== null && !hasAnimated, []);

  useEffect(() => {
    if (!loading && dashboardData) setHasAnimated(true);
  }, [loading, dashboardData]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;
      
      // Close period dropdown
      if (
        showPeriodDropdown &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(target) &&
        !(target as HTMLElement).closest?.('.lp-d2-dropdown-time')
      ) {
        setShowPeriodDropdown(false);
      }
    };

    if (showPeriodDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showPeriodDropdown]);

  // Prevent body scroll when links dropdown is open (scroll bleed prevention)
  useEffect(() => {
    if (linksExpanded) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [linksExpanded]);

  // Handle keyboard navigation (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showPeriodDropdown) {
          setShowPeriodDropdown(false);
        }
        if (linksExpanded) {
          setLinksExpanded(false);
        }
      }
    };

    if (showPeriodDropdown || linksExpanded) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showPeriodDropdown, linksExpanded]);

  // Load more links handler
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    // Simulate slight delay for smooth UX
    setTimeout(() => {
      setLinksToShow(prev => prev + 30);
      setIsLoadingMore(false);
    }, 150);
  }, [isLoadingMore]);

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

  // Sorted links by views (descending) for dropdown
  const sortedLinks = useMemo(() => {
    if (!links || links.length === 0) return [];
    return [...links].sort((a, b) => (b.views || 0) - (a.views || 0));
  }, [links]);

  // Links to display (paginated)
  const displayedLinks = useMemo(() => {
    return sortedLinks.slice(0, linksToShow);
  }, [sortedLinks, linksToShow]);

  // Check if there are more links to load
  const hasMoreLinks = useMemo(() => {
    return sortedLinks.length > linksToShow;
  }, [sortedLinks.length, linksToShow]);

  // Animated values (balance, clicks, rpm - not affected by period filter)
  const animatedBalance = useCountTo(balance, 1200, skipAnimation);
  const animatedClicks = useCountTo(stats.totalClicks, 1200, skipAnimation);
  const animatedRpm = useCountTo(rpm, 1200, skipAnimation);

  // Filter revenue and chart data by selected time period
  const { filteredRevenue, chartData, yDomain } = useMemo(() => {
    const timeline = dashboardData?.timeline || [];
    const now = new Date();

    // Helper to parse date from timeline item
    // Note: timeline dates come from formatDateKey which returns "15 dic" format
    // We need to reconstruct the full date. Since we only have day/month,
    // we assume it's in the current year or recent past
    const parseDate = (item: any): Date => {
      if (item.date) {
        // Try ISO format first (YYYY-MM-DD)
        const isoDate = new Date(item.date);
        if (!isNaN(isoDate.getTime()) && item.date.includes('-')) {
          return isoDate;
        }

        // Try parsing as day-month format (es-ES format like "15 dic")
        const parts = item.date.trim().split(' ');
        if (parts.length === 2) {
          const day = parseInt(parts[0]);
          const monthMap: Record<string, number> = {
            'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5,
            'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11
          };
          const month = monthMap[parts[1].toLowerCase()];
          if (month !== undefined && !isNaN(day) && day >= 1 && day <= 31) {
            // Try current year first
            let year = now.getFullYear();
            const testDate = new Date(year, month, day);
            // If the date is in the future, use last year
            if (testDate > now) {
              year = year - 1;
            }
            return new Date(year, month, day);
          }
        }
      }
      // Fallback to created_at if available
      if (item.created_at) {
        return new Date(item.created_at);
      }
      return new Date(); // Last resort
    };

    // Filter timeline by period
    const filterByPeriod = (data: any[]) => {
      if (timePeriod === 'all') {
        // For 'all', return all data sorted by date
        return [...data].sort((a, b) => {
          const dateA = parseDate(a);
          const dateB = parseDate(b);
          return dateA.getTime() - dateB.getTime();
        });
      }

      const cutoff = new Date();
      if (timePeriod === 'today') {
        // For today, get today's date (data is aggregated by day)
        cutoff.setHours(0, 0, 0, 0);
        cutoff.setMinutes(0, 0, 0);
        cutoff.setSeconds(0, 0);
        cutoff.setMilliseconds(0);
      } else if (timePeriod === 'week') {
        // Last 7 days
        cutoff.setDate(now.getDate() - 7);
        cutoff.setHours(0, 0, 0, 0);
      } else if (timePeriod === 'month') {
        // Last 30 days
        cutoff.setDate(now.getDate() - 30);
        cutoff.setHours(0, 0, 0, 0);
      }

      const filtered = data.filter((item: any) => {
        const itemDate = parseDate(item);
        // Normalize to start of day for comparison
        const itemDay = new Date(itemDate);
        itemDay.setHours(0, 0, 0, 0);
        const cutoffDay = new Date(cutoff);
        cutoffDay.setHours(0, 0, 0, 0);
        return itemDay >= cutoffDay && itemDay <= now;
      });

      // Sort by date ascending
      return filtered.sort((a, b) => {
        const dateA = parseDate(a);
        const dateB = parseDate(b);
        return dateA.getTime() - dateB.getTime();
      });
    };

    const filtered = filterByPeriod(timeline);

    // Calculate filtered revenue
    const revenue = timePeriod === 'all'
      ? (dashboardData?.totalRevenue ?? 0)
      : filtered.reduce((acc: number, item: any) => acc + (item.earnings || 0), 0);

    // Generate date labels based on period
    const generateLabel = (item: any, index: number) => {
      if (!item?.date) {
        return '';
      }

      const d = parseDate(item);

      if (timePeriod === 'today') {
        // For today, show the day name and date since we only have daily data
        // Or show a time indicator if it's today's data
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const itemDay = new Date(d);
        itemDay.setHours(0, 0, 0, 0);

        if (itemDay.getTime() === today.getTime()) {
          return 'Hoy';
        }
        // Format as short date
        return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      } else if (timePeriod === 'week') {
        // Show day abbreviations: Lun, Mar, Mie, Jue, Vie, Sab, Dom
        const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
        // Only show label for first item, last item, or every other day if many items
        if (filtered.length <= 7) {
          return days[d.getDay()];
        } else {
          if (index === 0 || index === filtered.length - 1 || index % Math.ceil(filtered.length / 6) === 0) {
            return days[d.getDay()];
          }
          return '';
        }
      } else if (timePeriod === 'month') {
        // Show dates: 1, 5, 10, 15, 20, 25, 30 or at intervals
        const day = d.getDate();
        const showAtIntervals = [1, 5, 10, 15, 20, 25, 30];
        if (filtered.length <= 10) {
          // If few items, show all
          return day.toString();
        } else {
          // Show at key intervals
          if (showAtIntervals.includes(day) || index === 0 || index === filtered.length - 1 || index % Math.ceil(filtered.length / 8) === 0) {
            return day.toString();
          }
          return '';
        }
      } else {
        // Total: show month/date at intervals
        const day = d.getDate();
        const month = d.getMonth() + 1;
        // Show labels at intervals (max 8 labels)
        const interval = Math.max(1, Math.floor(filtered.length / 8));
        if (index === 0 || index === filtered.length - 1 || index % interval === 0) {
          return `${day}/${month}`;
        }
        return '';
      }
    };

    // Prepare chart data with proper date objects and labels
    let chartPoints: {
      date: Date;
      value: number;
      label: string;
      fullDate: string;
    }[];

    if (filtered.length === 0) {
      // Fallback: generate placeholder points for empty data
      const numPoints = timePeriod === 'today' ? 24 : timePeriod === 'week' ? 7 : timePeriod === 'month' ? 30 : 7;
      const baseDate = new Date();
      if (timePeriod === 'today') {
        baseDate.setHours(0, 0, 0, 0);
      } else if (timePeriod === 'week') {
        baseDate.setDate(baseDate.getDate() - 7);
      } else if (timePeriod === 'month') {
        baseDate.setDate(baseDate.getDate() - 30);
      }

      chartPoints = Array.from({ length: numPoints }, (_, i) => {
        const date = new Date(baseDate);
        if (timePeriod === 'today') {
          date.setHours(i);
        } else {
          date.setDate(baseDate.getDate() + i);
        }
        return {
          date,
          value: 0,
          label: generateLabel({ date: date.toISOString() }, i),
          fullDate: date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            ...(timePeriod === 'today' ? { hour: '2-digit', minute: '2-digit' } : {})
          })
        };
      });
    } else {
      // Map filtered data to chart points with labels
      chartPoints = filtered.map((t: any, i: number) => {
        const date = parseDate(t);
        return {
          date,
          value: t.earnings || 0,
          label: generateLabel(t, i),
          fullDate: date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            ...(timePeriod === 'today' ? { hour: '2-digit', minute: '2-digit' } : {})
          })
        };
      });
    }

    // Calculate smart Y-axis domain for better visualization
    const values = chartPoints.map(p => p.value).filter(v => v > 0);
    const maxValue = values.length > 0
      ? Math.max(...values)
      : 0;
    const minValue = values.length > 0
      ? Math.min(...values)
      : 0;

    // Add padding to domain (10% above max, ensure minimum range)
    // If all values are the same, create a small range for visibility
    let yDomainMax = maxValue > 0 ? maxValue * 1.1 : 0.1;
    let yDomainMin = Math.max(0, minValue > 0 ? Math.max(0, minValue * 0.95) : 0);

    // Ensure minimum range if all values are similar
    if (maxValue > 0 && Math.abs(yDomainMax - yDomainMin) < maxValue * 0.1) {
      yDomainMax = maxValue * 1.15;
      yDomainMin = Math.max(0, maxValue * 0.85);
    }

    // Ensure we always have a visible range
    if (yDomainMax === yDomainMin && yDomainMax > 0) {
      yDomainMax = yDomainMax * 1.1;
      yDomainMin = yDomainMin * 0.9;
    }

    return {
      filteredRevenue: revenue,
      chartData: chartPoints,
      yDomain: [yDomainMin, yDomainMax]
    };
  }, [dashboardData?.timeline, dashboardData?.totalRevenue, timePeriod]);

  // Animated revenue (responds to period filter)
  const animatedRevenue = useCountTo(filteredRevenue, 800, false);

  // Memoized tooltip component for performance
  const CustomTooltip = useCallback(({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload as { fullDate?: string; date?: Date };
    const value = payload[0].value as number;

    // Format date if fullDate is not available
    let displayDate = data.fullDate || label;
    if (!displayDate && data.date) {
      displayDate = data.date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...(timePeriod === 'today' ? { hour: '2-digit', minute: '2-digit' } : {})
      });
    }

    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.99) 0%, rgba(30, 41, 59, 0.97) 100%)',
        border: '1px solid rgba(74, 222, 128, 0.5)',
        borderRadius: '14px',
        padding: '14px 18px',
        boxShadow:
          '0 12px 48px rgba(0, 0, 0, 0.7), ' +
          '0 0 0 1px rgba(255, 255, 255, 0.08) inset, ' +
          '0 0 40px rgba(34, 197, 94, 0.25), ' +
          '0 4px 16px rgba(34, 197, 94, 0.15)',
        backdropFilter: 'blur(24px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
        pointerEvents: 'none',
        transform: 'translateZ(0)',
        zIndex: 1000,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle top accent line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.6), transparent)',
          opacity: 0.8
        }} />

        <div style={{
          color: '#94a3b8',
          fontSize: '11px',
          marginBottom: '10px',
          fontWeight: 500,
          letterSpacing: '0.03em',
          textTransform: 'uppercase'
        }}>
          {displayDate || 'Fecha no disponible'}
        </div>
        <div style={{
          color: '#4ade80',
          fontWeight: 900,
          fontSize: '20px',
          display: 'flex',
          alignItems: 'baseline',
          gap: '10px',
          lineHeight: 1,
          letterSpacing: '-0.02em'
        }}>
          <span style={{
            textShadow: '0 0 24px rgba(74, 222, 128, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)',
            fontFeatureSettings: '"tnum"',
            background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            €{value.toFixed(4)}
          </span>
          <span style={{
            color: '#64748b',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            opacity: 0.9
          }}>
            Ingresos
          </span>
        </div>
      </div>
    );
  }, [timePeriod]);

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
            {/* EARNINGS CARD - Centered like balance */}
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
              <span className="lp-d2-hint">{periodLabels[timePeriod]}</span>
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

          {/* ROW 2: CHART with time selector */}
          <motion.div
            className="lp-d2-chart-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            key={timePeriod}
          >
            <div className="lp-d2-chart-header" ref={chartHeaderRef}>
              <div className="lp-d2-chart-title">
                <TrendingUp size={16} className="lp-d2-icon green" />
                <span>Ingresos</span>
              </div>
              <div className="lp-d2-time-dropdown-wrapper">
                <motion.button
                  ref={dropdownButtonRef}
                  className="lp-d2-dropdown-btn"
                  onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setShowPeriodDropdown(!showPeriodDropdown);
                    }
                  }}
                  aria-expanded={showPeriodDropdown}
                  aria-haspopup="true"
                  aria-label={`Período seleccionado: ${periodLabels[timePeriod]}`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {periodLabels[timePeriod]}
                  <ChevronDown size={14} className={showPeriodDropdown ? 'rotated' : ''} />
                </motion.button>
                <AnimatePresence>
                  {showPeriodDropdown && (
                    <motion.div
                      className="lp-d2-dropdown lp-d2-dropdown-time"
                      initial={{ opacity: 0, y: -5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      role="menu"
                      aria-label="Seleccionar período"
                    >
                      {(['today', 'week', 'month', 'all'] as TimePeriod[]).map(p => (
                        <motion.button
                          key={p}
                          className={`lp-d2-dropdown-item ${timePeriod === p ? 'active' : ''}`}
                          onClick={() => { setTimePeriod(p); setShowPeriodDropdown(false); }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setTimePeriod(p);
                              setShowPeriodDropdown(false);
                            }
                          }}
                          role="menuitem"
                          aria-label={periodLabels[p]}
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                        >
                          {periodLabels[p]}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                className={`lp-d2-chart ${loading ? 'loading' : ''}`}
                key={`chart-${timePeriod}-${chartData.length}`}
                initial={{ opacity: 0, scale: 0.96, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -4 }}
                transition={{
                  duration: 0.45,
                  ease: [0.4, 0, 0.2, 1],
                  opacity: { duration: 0.35 }
                }}
              >
                {chartData.length === 0 || chartData.every(p => p.value === 0) ? (
                  <motion.div
                    className="lp-d2-chart-empty"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <BarChart3 size={32} />
                    <span>No hay datos disponibles para este período</span>
                  </motion.div>
                ) : (
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart
                      data={chartData}
                      margin={{ top: 12, right: 10, left: 2, bottom: 10 }}
                    >
                      <defs>
                        {/* Enhanced gradient with multiple stops for smoother fade */}
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity={0.65} />
                          <stop offset="30%" stopColor="#22c55e" stopOpacity={0.4} />
                          <stop offset="60%" stopColor="#22c55e" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
                        </linearGradient>
                        {/* Glow filter for the line stroke */}
                        <filter id="chartGlow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                        {/* Subtle shadow for depth */}
                        <filter id="chartShadow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                          <feOffset dx="0" dy="1" result="offsetblur" />
                          <feComponentTransfer>
                            <feFuncA type="linear" slope="0.3" />
                          </feComponentTransfer>
                          <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="4 4"
                        stroke="rgba(148, 163, 184, 0.18)"
                        vertical={false}
                        horizontal={true}
                        strokeWidth={1}
                        strokeOpacity={0.6}
                      />
                      <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600, fontFamily: 'Inter, -apple-system, sans-serif' }}
                        interval="preserveStartEnd"
                        minTickGap={12}
                        height={34}
                        style={{ userSelect: 'none' }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600, fontFamily: 'Inter, -apple-system, sans-serif' }}
                        tickFormatter={(value) => {
                          if (value === 0) return '€0';
                          if (value < 0.01) return `€${value.toFixed(4)}`;
                          if (value < 1) return `€${value.toFixed(2)}`;
                          return `€${value.toFixed(2)}`;
                        }}
                        width={60}
                        domain={yDomain}
                        style={{ userSelect: 'none' }}
                      />
                      <Tooltip
                        content={CustomTooltip}
                        cursor={{
                          stroke: '#22c55e',
                          strokeWidth: 2.5,
                          strokeDasharray: '8 5',
                          opacity: 0.75,
                          strokeLinecap: 'round',
                          strokeLinejoin: 'round'
                        }}
                        animationDuration={300}
                        animationEasing="ease-out"
                        allowEscapeViewBox={{ x: false, y: false }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#22c55e"
                        strokeWidth={3.5}
                        fill="url(#chartGradient)"
                        dot={false}
                        activeDot={{
                          r: 5,
                          fill: '#22c55e',
                          stroke: '#fff',
                          strokeWidth: 2,
                          style: {
                            filter: 'drop-shadow(0 0 6px rgba(34, 197, 94, 0.8))',
                            transition: 'none'
                          }
                        }}
                        isAnimationActive={true}
                        animationDuration={800}
                        animationEasing="ease-out"
                        connectNulls={false}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </motion.div>
            </AnimatePresence>
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
              onClick={() => {
                if (linksExpanded) {
                  setLinksToShow(30); // Reset al cerrar
                }
                setLinksExpanded(!linksExpanded);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLinksExpanded(!linksExpanded);
                }
              }}
              aria-expanded={linksExpanded}
              aria-controls="links-dropdown"
              aria-label={`${linksExpanded ? 'Cerrar' : 'Abrir'} lista de enlaces`}
            >
              <LinkIcon size={18} />
              <span>Mis Enlaces</span>
              <span className="lp-d2-links-count">{links.length}</span>
              {linksExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            <AnimatePresence>
              {linksExpanded && (
                <motion.div
                  ref={linksDropdownRef}
                  id="links-dropdown"
                  className="lp-d2-links-list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  role="region"
                  aria-label="Lista de enlaces"
                >
                  <div 
                    ref={linksScrollRef}
                    className="lp-d2-links-scroll"
                    onWheel={(e) => {
                      // Prevent scroll bleed: stop propagation when scrolling inside
                      e.stopPropagation();
                    }}
                    onTouchMove={(e) => {
                      // Prevent scroll bleed on touch devices
                      e.stopPropagation();
                    }}
                  >
                    {displayedLinks.length === 0 ? (
                      <motion.div
                        className="lp-d2-empty-state"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <LinkIcon size={32} className="lp-d2-empty-icon" />
                        <span className="lp-d2-empty-title">No tienes enlaces aún</span>
                        <span className="lp-d2-empty-subtitle">Crea tu primer enlace para empezar</span>
                        <motion.button
                          className="lp-d2-empty-cta"
                          onClick={() => navigate('/app/links')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Crear enlace
                        </motion.button>
                      </motion.div>
                    ) : (
                      displayedLinks.map((link, i) => (
                        <motion.div
                          key={link.id}
                          className="lp-d2-link-item"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: Math.min(i * 0.02, 0.3) }}
                          role="listitem"
                        >
                          <div className="lp-d2-link-info">
                            <span className="lp-d2-link-slug" title={link.title || link.slug}>
                              {link.title ? link.title : `/${link.slug}`}
                            </span>
                            <span className="lp-d2-link-clicks">{link.views || 0} clicks</span>
                          </div>
                          <div className="lp-d2-link-actions">
                            <span className="lp-d2-link-earn">{(link.earnings || 0).toFixed(4)}</span>
                            <motion.button
                              className="lp-d2-link-copy"
                              onClick={(e) => {
                                e.stopPropagation();
                                const url = `${window.location.origin}/${link.slug}`;
                                navigator.clipboard.writeText(url);
                                // Visual feedback (opcional: podrías añadir un toast)
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label={`Copiar enlace ${link.slug}`}
                              title="Copiar enlace"
                            >
                              <Copy size={14} />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                  
                  {/* Botón Ver Más - Solo si hay más enlaces */}
                  {hasMoreLinks && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.button
                        className="lp-d2-load-more"
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Cargar ${Math.min(30, sortedLinks.length - linksToShow)} enlaces más`}
                      >
                        {isLoadingMore ? (
                          <>
                            <span className="lp-d2-loading-spinner" />
                            <span>Cargando...</span>
                          </>
                        ) : (
                          <>
                            <span>Ver más</span>
                            <span className="lp-d2-load-more-count">
                              +{Math.min(30, sortedLinks.length - linksToShow)} enlaces
                            </span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Mensaje "Fin de resultados" cuando no hay más */}
                  {!hasMoreLinks && displayedLinks.length > 0 && (
                    <motion.div
                      className="lp-d2-end-message"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <span>Fin de resultados</span>
                    </motion.div>
                  )}

                  {/* Botón Ver Todos en página de enlaces */}
                  {links.length > 0 && (
                    <motion.button
                      className="lp-d2-view-all"
                      onClick={() => navigate('/app/links')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Ver todos los enlaces en la página de enlaces"
                    >
                      Ver todos en Enlaces <ExternalLink size={14} />
                    </motion.button>
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
