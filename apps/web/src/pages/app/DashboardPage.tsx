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
  Link2,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Copy,
  Zap,
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useCachedDashboard, useCachedPayouts } from '../../context/DataCacheContext';
import { PremiumLoader } from '../../components/PremiumLoader';
import { getUserGamification, calculateComparison, markGoalReached, shouldShowCelebration, GamificationData } from '../../lib/gamificationService';
import './Dashboard.css';
import '../app/Analytics.css'; // Importar estilos de Analytics para reutilizar cards

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
  const linksToShow = 3; // Solo TOP 3 enlaces en el dashboard - limpio y premium
  const dropdownButtonRef = React.useRef<HTMLButtonElement>(null);
  const chartHeaderRef = React.useRef<HTMLDivElement>(null);
  const linksDropdownRef = React.useRef<HTMLDivElement>(null);
  const linksScrollRef = React.useRef<HTMLDivElement>(null);
  const linksContentRef = React.useRef<HTMLDivElement>(null);

  // Animation skip for cached data
  const [hasAnimated, setHasAnimated] = useState(false);
  const skipAnimation = useMemo(() => dashboardData !== null && !hasAnimated, []);

  useEffect(() => {
    if (!loading && dashboardData) setHasAnimated(true);
  }, [loading, dashboardData]);

  // Gamification state - datos reales por usuario
  const [gamification, setGamification] = useState<GamificationData | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Cargar datos de gamificación del usuario
  useEffect(() => {
    getUserGamification().then(data => {
      if (data) setGamification(data);
    });
  }, []);

  // Calcular ingresos de HOY desde el timeline
  const todayRevenueCalc = useMemo(() => {
    const timeline = dashboardData?.timeline || [];
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    return timeline
      .filter((item: any) => {
        const itemDate = item.date || item.day;
        if (!itemDate) return false;
        const dateStr = typeof itemDate === 'string' ? itemDate.split('T')[0] : new Date(itemDate).toISOString().split('T')[0];
        return dateStr === todayStr;
      })
      .reduce((acc: number, item: any) => acc + (item.earnings || 0), 0);
  }, [dashboardData?.timeline]);

  // Calcular comparison con datos reales
  const comparisonPercent = useMemo(() => {
    if (!gamification) return null;
    return calculateComparison(todayRevenueCalc, gamification.yesterdayRevenue);
  }, [todayRevenueCalc, gamification?.yesterdayRevenue]);

  // Detectar si se alcanzó la meta para mostrar celebración
  useEffect(() => {
    if (!gamification) return;

    if (shouldShowCelebration(todayRevenueCalc, gamification.dailyGoal, gamification.goalReached)) {
      setShowCelebration(true);
      markGoalReached(); // Marcar para no repetir
      // Ocultar celebración después de 3 segundos
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [todayRevenueCalc, gamification]);

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

  // NO bloqueamos el scroll - dejamos que el dashboard se extienda naturalmente

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



  // Recalculate height when displayed links change - MOVED AFTER displayedLinks declaration

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


  // Calculate and extend dashboard when links are expanded - PRODUCTION READY
  const dashboardRef = React.useRef<HTMLDivElement>(null);
  const shellRef = React.useRef<HTMLDivElement>(null);
  const linksSectionRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (linksExpanded && linksSectionRef.current && dashboardRef.current && shellRef.current) {
      // Cuando está expandido: permitir scroll y ajustar altura
      const updateHeight = () => {
        if (!linksSectionRef.current || !dashboardRef.current || !shellRef.current) return;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!linksSectionRef.current || !dashboardRef.current || !shellRef.current) return;

            // Calcular altura exacta necesaria - incluye botón toggle + dropdown + acciones
            const sectionHeight = linksSectionRef.current.scrollHeight || linksSectionRef.current.offsetHeight;
            // Padding mínimo: navigation bar (90px) + espacio respirable (40px)
            const extraPadding = 130;

            dashboardRef.current.style.paddingBottom = `${sectionHeight + extraPadding}px`;
            // Permitir scroll suave
            shellRef.current.style.overflowY = 'auto';
            shellRef.current.style.overflowX = 'hidden';
          });
        });
      };

      // Actualizar altura después de animación
      updateHeight();
      const timeout1 = setTimeout(updateHeight, 350); // Después de la animación de 300ms
      const timeout2 = setTimeout(updateHeight, 500); // Segundo check para asegurar

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        if (dashboardRef.current) dashboardRef.current.style.paddingBottom = '';
        if (shellRef.current) {
          shellRef.current.style.overflowY = '';
          shellRef.current.style.overflowX = '';
        }
      };
    } else {
      // Cuando está cerrado: resetear padding
      if (dashboardRef.current) dashboardRef.current.style.paddingBottom = '';
      if (shellRef.current) {
        shellRef.current.style.overflowY = 'auto';
        shellRef.current.style.overflowX = 'hidden';
      }
    }
  }, [linksExpanded]);

  // Format money helper (from Analytics)
  const formatMoneyShort = useCallback((v: number) => {
    if (v >= 1000) return `€${(v / 1000).toFixed(1)}k`;
    if (v >= 1) return `€${v.toFixed(2)}`;
    return `€${v.toFixed(4)}`;
  }, []);

  // Format numbers compactly for stats cards (fits in small space)
  const formatCompact = useCallback((v: number) => {
    if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
    if (v >= 10000) return `${(v / 1000).toFixed(0)}k`;
    if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
    return v.toFixed(0);
  }, []);

  // Función para colapsar con scroll suave hacia arriba - UX Premium
  const collapseWithScroll = useCallback(() => {
    // Cerrar el dropdown primero
    setLinksExpanded(false);

    // Después hacer scroll suave al inicio de la página
    setTimeout(() => {
      if (shellRef.current) {
        shellRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 100);
  }, []);

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
      // PRIORITY 1: Use isoDate if available (new reliable format "YYYY-MM-DD")
      if (item.isoDate) {
        return new Date(item.isoDate + 'T00:00:00');
      }

      if (item.date) {
        // Try ISO format first (YYYY-MM-DD)
        if (item.date.includes('-') && item.date.length >= 10) {
          const isoDate = new Date(item.date);
          if (!isNaN(isoDate.getTime())) {
            return isoDate;
          }
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
            // Use current year, but if the date is in the future by more than 1 day, use last year
            let year = now.getFullYear();
            const testDate = new Date(year, month, day);
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            if (testDate > tomorrow) {
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

      // Get today's date string in ISO format for exact comparison
      const todayStr = now.toISOString().slice(0, 10); // "2024-12-23"

      if (timePeriod === 'today') {
        // EXACT match for today using isoDate string comparison (most reliable)
        const filtered = data.filter((item: any) => {
          // Use isoDate directly if available (new format)
          if (item.isoDate) {
            return item.isoDate === todayStr;
          }
          // Fallback: parse and compare
          const itemDate = parseDate(item);
          const itemStr = itemDate.toISOString().slice(0, 10);
          return itemStr === todayStr;
        });
        return filtered;
      }

      // For week/month, use cutoff date
      const cutoff = new Date(now);
      if (timePeriod === 'week') {
        cutoff.setDate(now.getDate() - 6); // Last 7 days including today
      } else if (timePeriod === 'month') {
        cutoff.setDate(now.getDate() - 29); // Last 30 days including today
      }
      cutoff.setHours(0, 0, 0, 0);
      const cutoffStr = cutoff.toISOString().slice(0, 10);

      const filtered = data.filter((item: any) => {
        // Use isoDate directly if available
        if (item.isoDate) {
          return item.isoDate >= cutoffStr && item.isoDate <= todayStr;
        }
        // Fallback: parse and compare
        const itemDate = parseDate(item);
        const itemStr = itemDate.toISOString().slice(0, 10);
        return itemStr >= cutoffStr && itemStr <= todayStr;
      });

      // Sort by date ascending
      return filtered.sort((a, b) => {
        const dateA = a.isoDate || parseDate(a).toISOString().slice(0, 10);
        const dateB = b.isoDate || parseDate(b).toISOString().slice(0, 10);
        return dateA.localeCompare(dateB);
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
        // Total: show day + abbreviated month (clearer format)
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const day = d.getDate();
        const monthAbbr = months[d.getMonth()];
        // Show labels at intervals (max 8 labels)
        const interval = Math.max(1, Math.floor(filtered.length / 8));
        if (index === 0 || index === filtered.length - 1 || index % interval === 0) {
          return `${day} ${monthAbbr}`;
        }
        return '';
      }
    };

    // SIEMPRE generar el período completo con todos los puntos (relleno de valores)
    // Esto asegura que: Hoy=24h, Semana=7días, Mes=30días
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    // Crear mapa de earnings por fecha usando TODO el timeline (no filtered)
    // Esto permite que cualquier período acceda a datos históricos
    const earningsMap = new Map<string, number>();
    timeline.forEach((item: any) => {
      const date = parseDate(item);
      const key = date.toISOString().slice(0, 10); // YYYY-MM-DD
      earningsMap.set(key, (earningsMap.get(key) || 0) + (item.earnings || 0));
    });

    let chartPoints: { date: Date; value: number; label: string; fullDate: string; }[] = [];

    if (timePeriod === 'today') {
      // HOY: Generar 24 puntos (0h a 23h)
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);
      const todayKey = today.toISOString().slice(0, 10);
      const todayEarnings = earningsMap.get(todayKey) || 0;

      for (let h = 0; h < 24; h++) {
        const date = new Date(today);
        date.setHours(h);

        // Etiquetas cada 4 horas para claridad
        const label = (h % 4 === 0 || h === 23) ? `${h}h` : '';

        // Para visualización, distribuir earnings en hora actual (o 0 si no hay)
        const value = h === now.getHours() ? todayEarnings : 0;

        chartPoints.push({
          date,
          value,
          label,
          fullDate: `Hoy a las ${h.toString().padStart(2, '0')}:00`
        });
      }

    } else if (timePeriod === 'week') {
      // SEMANA: Generar exactamente 7 días (desde hace 6 días hasta hoy)
      for (let d = 6; d >= 0; d--) {
        const date = new Date(now);
        date.setDate(now.getDate() - d);
        date.setHours(0, 0, 0, 0);

        const key = date.toISOString().slice(0, 10);
        const value = earningsMap.get(key) || 0;

        // Mostrar nombre del día, "Hoy" para el último
        const label = d === 0 ? 'Hoy' : dayNames[date.getDay()];

        chartPoints.push({
          date,
          value,
          label,
          fullDate: `${dayNames[date.getDay()]} ${date.getDate()} ${monthNames[date.getMonth()]}`
        });
      }

    } else if (timePeriod === 'month') {
      // MES: Generar TODOS los días del mes ACTUAL (enero = 31 días, etc.)
      const year = now.getFullYear();
      const month = now.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate(); // Días en el mes actual

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);

        const key = date.toISOString().slice(0, 10);
        const value = earningsMap.get(key) || 0;

        // Marcar "Hoy" si es el día actual, si no mostrar día
        const isToday = day === now.getDate();
        const label = isToday ? 'Hoy' : day.toString();

        chartPoints.push({
          date,
          value,
          label,
          fullDate: `${day} ${monthNames[month]} ${year}`
        });
      }

    } else {
      // TOTAL: Usar todos los datos disponibles con etiquetas claras
      if (filtered.length === 0) {
        // Sin datos: mostrar últimos 7 días vacíos
        for (let d = 6; d >= 0; d--) {
          const date = new Date(now);
          date.setDate(now.getDate() - d);
          date.setHours(0, 0, 0, 0);

          chartPoints.push({
            date,
            value: 0,
            label: d === 0 ? 'Hoy' : `${date.getDate()} ${monthNames[date.getMonth()]}`,
            fullDate: `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
          });
        }
      } else {
        // Con datos: mostrar todos los puntos disponibles
        const interval = Math.max(1, Math.floor(filtered.length / 8));

        filtered.forEach((item: any, i: number) => {
          const date = parseDate(item);
          const value = item.earnings || 0;

          const showLabel = i === 0 || i === filtered.length - 1 || i % interval === 0;
          const label = showLabel ? `${date.getDate()} ${monthNames[date.getMonth()]}` : '';

          chartPoints.push({
            date,
            value,
            label,
            fullDate: `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
          });
        });
      }
    }

    // Calculate smart Y-axis domain for better visualization
    const values = chartPoints.map(p => p.value).filter(v => v > 0);
    const maxValue = values.length > 0 ? Math.max(...values) : 0;

    // Add padding to domain
    let yDomainMax = maxValue > 0 ? maxValue * 1.15 : 0.01;
    let yDomainMin = 0;

    // Calcular revenue como suma de los chartPoints (coherencia gráfico-número)
    const calculatedRevenue = timePeriod === 'all'
      ? (dashboardData?.totalRevenue ?? 0)
      : chartPoints.reduce((acc, p) => acc + p.value, 0);

    return {
      filteredRevenue: calculatedRevenue,
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

      <div className="lp-dashboard-shell" ref={shellRef}>
        <div className="lp-dashboard-2" ref={dashboardRef}>

          {/* ROW 0: STREAK HEADER - Gamification Hero */}
          <motion.div
            className={`lp-d2-streak-header ${showCelebration ? 'celebrating' : ''}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 }}
          >
            <Zap size={20} className="lp-d2-streak-icon" />
            <span className="lp-d2-streak-text">
              {gamification?.streak ?? 0} DÍAS EN RACHA
            </span>
            <span className="lp-d2-streak-sub">
              {(gamification?.streak ?? 0) > 0 ? '¡Sigue así!' : '¡Empieza hoy!'}
            </span>
          </motion.div>

          {/* ROW 1: EARNINGS + BALANCE */}
          <div className="lp-d2-row-top">
            {/* EARNINGS CARD - Con streak y comparison */}
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
              {/* Comparison Badge - datos reales */}
              <div className="lp-d2-comparison">
                <span className="lp-d2-hint">{periodLabels[timePeriod]}</span>
                {comparisonPercent !== null && (
                  <span className={`lp-d2-comparison-badge ${comparisonPercent >= 0 ? 'positive' : 'negative'}`}>
                    {comparisonPercent >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {comparisonPercent >= 0 ? '+' : ''}{comparisonPercent}%
                  </span>
                )}
              </div>
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

          {/* ROW 2: STATS (4 columns) - Métricas clave primero */}
          <motion.div
            className="lp-d2-stats-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {/* CLICKS */}
            <div className="lp-d2-stat purple">
              <MousePointer2 size={20} />
              <span className="lp-d2-stat-value">{formatCompact(animatedClicks)}</span>
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

          {/* ROW 3: DAILY GOAL - Gamification Progress Bar */}
          <motion.div
            className={`lp-d2-goal-card ${showCelebration ? 'celebrating' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            <div className="lp-d2-goal-header">
              <span className="lp-d2-goal-label">⭕ Meta diaria</span>
              <span className="lp-d2-goal-target">€{(gamification?.dailyGoal ?? 5).toFixed(2)}</span>
            </div>
            <div className="lp-d2-goal-bar">
              <motion.div
                className="lp-d2-goal-fill"
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min((todayRevenueCalc / (gamification?.dailyGoal ?? 5)) * 100, 100)}%`
                }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
            </div>
            <div className="lp-d2-goal-info">
              <span className="lp-d2-goal-current">€{todayRevenueCalc.toFixed(4)}</span>
              <span className="lp-d2-goal-percent">
                {Math.min(Math.round((todayRevenueCalc / (gamification?.dailyGoal ?? 5)) * 100), 100)}%
              </span>
            </div>
            {/* Confetti Animation when goal reached */}
            {showCelebration && (
              <div className="lp-d2-confetti-container">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="lp-d2-confetti" style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`
                  }} />
                ))}
              </div>
            )}
          </motion.div>

          {/* ROW 4: CHART with time selector */}
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
                {/* Siempre mostrar gráfico - con valores 0 si no hay datos */}
                {chartData.length === 0 ? (
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

          {/* ROW 4: COLLAPSIBLE LINKS - Button OUTSIDE animated container to prevent mobile visibility issues */}
          <div
            ref={linksSectionRef}
            className="lp-d2-links-wrapper"
          >
            {/* Toggle button - OUTSIDE animation context, never affected by Framer Motion */}
            <button
              className="lp-d2-links-toggle"
              onClick={() => linksExpanded ? collapseWithScroll() : setLinksExpanded(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  linksExpanded ? collapseWithScroll() : setLinksExpanded(true);
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

            {/* Dropdown - animated separately, button is completely outside this */}
            <AnimatePresence>
              {linksExpanded && (
                <motion.div
                  ref={linksDropdownRef}
                  id="links-dropdown"
                  className="lp-d2-links-section"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                    opacity: { duration: 0.2 }
                  }}
                  role="region"
                  aria-label="Lista de enlaces"
                >
                  <div
                    ref={linksContentRef}
                    className="lp-d2-links-content"
                  >
                    <div
                      ref={linksScrollRef}
                      className="lp-d2-links-scroll"
                    >
                      {displayedLinks.length === 0 ? (
                        <div className="lpa-empty-links">
                          <Link2 size={40} className="lpa-empty-icon lpa-3d-icon" />
                          <div className="lpa-empty-title">Sin enlaces todavía</div>
                          <div className="lpa-empty-sub">Crea tu primer enlace para empezar</div>
                        </div>
                      ) : (
                        <div className="lpa-link-cards">
                          {displayedLinks.map((link, i) => {
                            const clicks = link.views || 0;
                            const earnings = link.earnings || 0;
                            const maxEarnings = sortedLinks.reduce((max, l) => Math.max(max, l.earnings || 0), 1);
                            const pct = maxEarnings > 0 ? (earnings / maxEarnings) * 100 : 0;
                            const epc = clicks > 0 ? earnings / clicks : 0;

                            // Top 3 get medals
                            const medals = [
                              { emoji: '🥇', name: 'gold', color: '#fbbf24' },
                              { emoji: '🥈', name: 'silver', color: '#94a3b8' },
                              { emoji: '🥉', name: 'bronze', color: '#f97316' },
                            ];
                            const medal = medals[i];

                            return (
                              <div
                                className={`lpa-link-card medal-${medal.name}`}
                                key={link.id}
                                onClick={() => {
                                  const url = `${window.location.origin}/${link.slug}`;
                                  navigator.clipboard.writeText(url);
                                }}
                              >
                                {/* Medal - Static, no animations */}
                                <div className={`lpa-medal-3d medal-${medal.name}`}>
                                  <span className="lpa-medal-emoji">{medal.emoji}</span>
                                </div>

                                {/* Main Content */}
                                <div className="lpa-link-card-content">
                                  <div className="lpa-link-card-header">
                                    <span className="lpa-link-card-title">{link.title || link.slug}</span>
                                    <span className="lpa-link-card-earnings">{formatMoneyShort(earnings)}</span>
                                  </div>

                                  {/* Progress Bar - CSS transition */}
                                  <div className="lpa-link-card-progress">
                                    <div
                                      className="lpa-link-card-progress-fill"
                                      style={{
                                        width: `${pct}%`,
                                        background: `linear-gradient(90deg, ${medal.color}, ${medal.color}88)`,
                                        transition: 'width 0.5s ease-out'
                                      }}
                                    />
                                  </div>

                                  {/* Stats Row */}
                                  <div className="lpa-link-card-stats">
                                    <div className="lpa-link-card-stat">
                                      <MousePointer2 size={12} />
                                      <span>{clicks} clicks</span>
                                    </div>
                                    {clicks > 0 && (
                                      <div className="lpa-link-card-stat epc">
                                        <TrendingUp size={12} />
                                        <span>€{epc.toFixed(4)}</span>
                                      </div>
                                    )}
                                    <div className="lpa-link-card-stat slug">
                                      <ExternalLink size={12} />
                                      <span>/{link.slug}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Botones - Recoger y Ver todos */}
                  <div className="lp-d2-links-actions">
                    {/* Botón Recoger para cerrar el desplegable con scroll suave */}
                    <motion.button
                      className="lp-d2-collapse-btn"
                      onClick={collapseWithScroll}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Recoger lista de enlaces"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <ChevronUp size={18} />
                      <span>Recoger</span>
                    </motion.button>

                    {/* Botón Ver Todos en página de enlaces */}
                    {links.length > 0 && (
                      <motion.button
                        className="lp-d2-view-all"
                        onClick={() => navigate('/app/links')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Ver todos los enlaces en la página de enlaces"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Ver todos en Enlaces <ExternalLink size={14} />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </>
  );
}
