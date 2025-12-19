import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useTranslation } from '../../i18n';
import './Dashboard.css';
import {
  Link as LinkIcon,
  Copy,
  TrendingUp,
  MousePointer2,
  BarChart3,
  ArrowRight,
  DollarSign,
  Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from '../../lib/linkService';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { PremiumLoader } from '../../components/PremiumLoader';
import { useCachedDashboard } from '../../context/DataCacheContext';

// Hook para animar números (Count Up) - Optimizado para no re-animar en navegación
function useCountTo(end: number, duration = 2000, skip = false) {
  const [count, setCount] = useState(skip ? end : 0);

  useEffect(() => {
    // Si skip es true, mostrar valor final inmediatamente (datos cacheados)
    if (skip) {
      setCount(end);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // EaseOutExpo function
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

export function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ═══════════════════════════════════════════════════════════════════════════
  // USAR DATOS CACHEADOS - Navegación instantánea
  // ═══════════════════════════════════════════════════════════════════════════
  const { data: dashboardData, links, loading, isRefreshing, refresh } = useCachedDashboard();

  // User info for greeting
  const [userName, setUserName] = useState<string>('');
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        const name = user.email.split('@')[0];
        setUserName(name.charAt(0).toUpperCase() + name.slice(1));
      }
    };
    getUser();
  }, []);

  // Determinar si debemos animar o mostrar valores instantáneamente
  const [hasAnimated, setHasAnimated] = useState(false);
  const skipAnimation = useMemo(() => {
    return dashboardData !== null && !hasAnimated;
  }, []);

  useEffect(() => {
    if (!loading && dashboardData) {
      setHasAnimated(true);
    }
  }, [loading, dashboardData]);

  // Stats calculados
  const realtimeStats = useMemo(() => ({
    totalRevenue: dashboardData?.totalRevenue ?? 0,
    linkRevenue: dashboardData?.linkRevenue ?? 0,
    bioRevenue: dashboardData?.bioRevenue ?? 0,
    totalClicks: dashboardData?.totalClicks ?? 0,
    linkClicks: dashboardData?.linkClicks ?? 0,
    bioClicks: dashboardData?.bioClicks ?? 0,
  }), [dashboardData]);

  // Calculate real RPM
  const rpm = useMemo(() => {
    if (realtimeStats.totalClicks === 0) return 0;
    return (realtimeStats.totalRevenue / realtimeStats.totalClicks) * 1000;
  }, [realtimeStats.totalRevenue, realtimeStats.totalClicks]);

  // Animated values
  const animatedRevenue = useCountTo(realtimeStats.totalRevenue, 1500, skipAnimation);
  const animatedClicks = useCountTo(realtimeStats.totalClicks, 1500, skipAnimation);
  const animatedRpm = useCountTo(rpm, 1500, skipAnimation);

  // Visual Trigger State
  const [revenueIncreased, setRevenueIncreased] = useState(false);

  const triggerRevenuePulse = () => {
    setRevenueIncreased(true);
    setTimeout(() => setRevenueIncreased(false), 2000);
  };

  const copyReferral = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const refLink = `${window.location.origin}/register?ref=${user.id}`;
      navigator.clipboard.writeText(refLink);
      alert(t('dashboard.stats.referrals.copy_alert'));
    }
  };

  const visibleLinks = links.slice(0, 5);

  const gridVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.06 }
    }
  };

  const cardVariants: any = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 180, damping: 22 }
    }
  };

  if (loading) {
    return <PremiumLoader size="medium" text="LINKPAY" subtext="Preparando tu dashboard..." />;
  }

  return (
    <>
      {/* BACKGROUND - Same structure as Wallet */}
      <div className="lp-bg">
        <div className="lp-bg-gradient" />
        <div className="lp-bg-glow" />
      </div>

      <div className="lp-dashboard-shell">
        <div className="lp-dashboard-inner">

          {/* WELCOME HEADER */}
          <motion.div
            className="lp-welcome-header"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="lp-welcome-title">
              {userName ? `Hola, ${userName} 👋` : 'Bienvenido 👋'}
            </h1>
            <p className="lp-welcome-subtitle">
              {realtimeStats.totalRevenue > 0 ? 'Tu cuenta está generando ingresos 🔥' : 'Tu panel de control'}
            </p>
          </motion.div>

          {/* METRICS GRID */}
          <motion.div
            className="lp-dashboard-grid"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >

            {/* CARD 1: REVENUE + REFERRALS */}
            <motion.div
              className={`lp-dashboard-card lp-card-green ${revenueIncreased ? 'pulse-green' : ''}`}
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.25)" }}
            >
              <div className="lp-stat-header">
                <div className="lp-stat-icon"><DollarSign size={24} /></div>
                <div className="lp-trend-badge"><TrendingUp size={12} /> LIVE</div>
              </div>
              <div>
                <div className="lp-stat-label">{t('dashboard.stats.revenue.label')}</div>
                <div className="lp-stat-value">€{animatedRevenue.toFixed(4)}</div>

                {/* Mini Sparkline */}
                <div className="h-1 w-full bg-slate-800/50 rounded-full mt-2 mb-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "circOut" }}
                  />
                </div>

                <div className="lp-substats" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                  <div className="lp-substat-box">
                    <span className="lp-substat-label">{t('dashboard.stats.revenue.links')}</span>
                    <span className="lp-substat-value">€{realtimeStats.linkRevenue.toFixed(4)}</span>
                  </div>
                  <div className="lp-substat-box">
                    <span className="lp-substat-label">{t('dashboard.stats.revenue.bio')}</span>
                    <span className="lp-substat-value">€{realtimeStats.bioRevenue.toFixed(4)}</span>
                  </div>
                  <div className="lp-substat-box">
                    <span className="lp-substat-label">REFERIDOS</span>
                    <span className="lp-substat-value">€0.00</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: CLICKS - PURPLE with breakdown */}
            <motion.div
              className="lp-dashboard-card lp-card-purple"
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.25)" }}
            >
              <div className="lp-stat-header">
                <div className="lp-stat-icon"><MousePointer2 size={24} /></div>
              </div>
              <div>
                <div className="lp-stat-label">{t('dashboard.stats.clicks.label')}</div>
                <div className="lp-stat-value">{animatedClicks.toFixed(0)}</div>

                <div className="lp-substats" style={{ gridTemplateColumns: '1fr 1fr', marginTop: '12px' }}>
                  <div className="lp-substat-box">
                    <span className="lp-substat-label">LINKS</span>
                    <span className="lp-substat-value">{realtimeStats.linkClicks}</span>
                  </div>
                  <div className="lp-substat-box">
                    <span className="lp-substat-label">BIO PAGE</span>
                    <span className="lp-substat-value">{realtimeStats.bioClicks}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 3: RPM - Compact */}
            <motion.div
              className="lp-dashboard-card lp-card-orange"
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.25)" }}
            >
              <div className="lp-stat-header">
                <div className="lp-stat-icon"><BarChart3 size={24} /></div>
              </div>
              <div>
                <div className="lp-stat-label">RPM MEDIO</div>
                <div className="lp-stat-value">€{animatedRpm.toFixed(2)}</div>
                <div className="lp-substat-label" style={{ marginTop: '8px' }}>
                  POR 1000 VISITAS
                </div>
              </div>
            </motion.div>


          </motion.div>

          {/* QUICK ACTIONS - Navigation shortcuts */}
          <motion.div
            className="lp-quick-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <motion.button
              className="lp-action-btn"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/app/links/create')}
            >
              <LinkIcon size={20} />
              <span>Crear Link</span>
            </motion.button>
            <motion.button
              className="lp-action-btn"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/app/analytics')}
            >
              <BarChart3 size={20} />
              <span>Analytics</span>
            </motion.button>
            <motion.button
              className="lp-action-btn"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/app/finance')}
            >
              <DollarSign size={20} />
              <span>Finanzas</span>
            </motion.button>
            <motion.button
              className="lp-action-btn"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/app/bio')}
            >
              <Share2 size={20} />
              <span>Bio Page</span>
            </motion.button>
          </motion.div>


          {/* RECENT ACTIVITY - BLUE */}
          <motion.div
            className="lp-dashboard-card lp-recent-card lp-card-blue"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="lp-stat-label">ACTIVIDAD RECIENTE</div>
              <motion.button
                whileHover={{ x: 4, color: "#818cf8" }}
                onClick={() => navigate('/app/links')}
                className="text-sm font-semibold text-indigo-400 flex items-center gap-1 transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {t('dashboard.recent.view_all')} <ArrowRight size={14} />
              </motion.button>
            </div>

            <div className="lp-recent-list">
              {visibleLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  className="lp-recent-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + (i * 0.05) }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.06)", scale: 1.005 }}
                >
                  <div className="lp-link-icon-circle">
                    <LinkIcon size={16} />
                  </div>
                  <div className="lp-link-info">
                    <span className="lp-link-alias">/{link.slug}</span>
                    <span className="lp-link-url">{link.original_url}</span>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <div className="lp-link-money">€{(link.earnings || 0).toFixed(4)}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{link.views || 0} clicks</div>
                  </div>
                </motion.div>
              ))}
              {visibleLinks.length === 0 && (
                <div style={{ textAlign: 'center', padding: '32px 0', color: '#94a3b8', fontSize: '14px', fontStyle: 'italic' }}>
                  {t('dashboard.recent.empty_desc') || 'No links yet.'}
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
