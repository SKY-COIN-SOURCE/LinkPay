import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useTranslation } from '../../i18n';
import './Dashboard.css';
import {
  Link as LinkIcon,
  Copy,
  TrendingUp,
  MousePointer2,
  Users,
  BarChart3,
  ArrowRight,
  Activity,
  DollarSign,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LinkService, Link } from '../../lib/linkService';
import { AnalyticsService } from '../../lib/analyticsService';
import { motion, AnimatePresence } from 'framer-motion';

// Hook para animar números (Count Up)
function useCountTo(end: number, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
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
  }, [end, duration]);

  return count;
}

export function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    linkRevenue: 0,
    bioRevenue: 0,
    totalClicks: 0,
    linkClicks: 0,
    bioClicks: 0,
    referralEarnings: 0,
    activeLinks: 0
  });

  // Valores animados
  const animatedRevenue = useCountTo(stats?.totalRevenue || 0, 2500);
  const animatedClicks = useCountTo(stats?.totalClicks || 0, 2000);
  const animatedReferrals = useCountTo(stats?.referralEarnings || 0, 2200);
  const animatedRPM = 1.22; // Hardcoded en el diseño original, podrías animarlo si vienes de BD

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [dashData, linksData] = await Promise.all([
        AnalyticsService.getDashboardData(),
        LinkService.getAll()
      ]);

      setStats(dashData);
      setLinks(linksData);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setLoading(false), 800); // Un poco más para apreciar el loader
    }
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

  // Variantes de animación para la Grid
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  if (loading) {
    return (
      <div className="lp-dashboard-shell">
        <div className="flex h-screen items-center justify-center flex-col gap-4">
          <Loader2 className="animate-spin text-indigo-500" size={48} />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-400 text-sm font-medium tracking-wider"
          >
            LOADING DASHBOARD...
          </motion.span>
        </div>
      </div>
    );
  }

  return (
    <div className="lp-dashboard-shell">
      <div className="lp-dashboard-inner">

        {/* HEADER */}
        <motion.header
          className="lp-dashboard-header-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="lp-chip-center">
            <span className="lp-chip-dot" />
            {t('dashboard.chip')}
          </div>
          <p className="lp-dashboard-subtitle-center">{t('dashboard.subtitle')}</p>
        </motion.header>

        {/* METRICS GRID */}
        <motion.div
          className="lp-dashboard-grid"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >

          {/* CARD 1: REVENUE (Primary High-Tech) */}
          <motion.div
            className="lp-dashboard-card lp-card-green"
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.25)" }}
          >
            <div className="lp-stat-header">
              <div className="lp-stat-icon"><DollarSign size={24} /></div>
              <div className="lp-trend-badge"><TrendingUp size={12} /> +12%</div>
            </div>
            <div>
              <div className="lp-stat-label">{t('dashboard.stats.revenue.label')}</div>
              <div className="lp-stat-value">€{animatedRevenue.toFixed(4)}</div>
              <div className="lp-substats">
                <div className="lp-substat-box">
                  <span className="lp-substat-label">{t('dashboard.stats.revenue.links')}</span>
                  <span className="lp-substat-value">€{(stats?.linkRevenue || 0).toFixed(4)}</span>
                </div>
                <div className="lp-substat-box">
                  <span className="lp-substat-label">{t('dashboard.stats.revenue.bio')}</span>
                  <span className="lp-substat-value">€{(stats?.bioRevenue || 0).toFixed(4)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD 2: CLICKS */}
          <motion.div
            className="lp-dashboard-card lp-card-blue"
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)" }}
          >
            <div className="lp-stat-header">
              <div className="lp-stat-icon"><MousePointer2 size={24} /></div>
              <div className="lp-trend-badge" style={{ color: '#60a5fa', background: 'rgba(59, 130, 246, 0.1)' }}><Activity size={12} /> +5%</div>
            </div>
            <div>
              <div className="lp-stat-label">{t('dashboard.stats.clicks.label')}</div>
              <div className="lp-stat-value">{animatedClicks.toFixed(0)}</div>
              <div className="lp-substats">
                <div className="lp-substat-box">
                  <span className="lp-substat-label">LINKS</span>
                  <span className="lp-substat-value">{stats?.linkClicks || 0}</span>
                </div>
                <div className="lp-substat-box">
                  <span className="lp-substat-label">BIO PAGE</span>
                  <span className="lp-substat-value">{stats?.bioClicks || 0}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD 3: REFERRALS */}
          <motion.div
            className="lp-dashboard-card lp-card-purple"
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.25)" }}
          >
            <div className="lp-stat-header">
              <div className="lp-stat-icon"><Users size={24} /></div>
              <motion.div whileTap={{ scale: 0.9 }}>
                <Copy size={18} className="text-slate-400 cursor-pointer hover:text-white transition-colors" onClick={copyReferral} />
              </motion.div>
            </div>
            <div>
              <div className="lp-stat-label">{t('dashboard.stats.referrals.label')}</div>
              <div className="lp-stat-value">€{animatedReferrals.toFixed(2)}</div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed opacity-80">
                {t('dashboard.stats.referrals.text')}
              </p>
            </div>
          </motion.div>

          {/* CARD 4: RPM */}
          <motion.div
            className="lp-dashboard-card lp-card-orange"
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.25)" }}
          >
            <div className="lp-stat-header">
              <div className="lp-stat-icon"><BarChart3 size={24} /></div>
            </div>
            <div>
              <div className="lp-stat-label">{t('dashboard.stats.rpm.label')}</div>
              <div className="lp-stat-value">€{animatedRPM}</div>
              <p className="text-xs text-slate-400 mt-2 opacity-80">
                {t('dashboard.stats.rpm.help') || 'Average revenue per 1k visits'}
              </p>
            </div>
          </motion.div>

        </motion.div>

        {/* RECENT ACTIVITY */}
        <motion.div
          className="lp-dashboard-card lp-recent-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">{t('dashboard.recent.title')}</h3>
              <p className="text-sm text-slate-400">{t('dashboard.recent.subtitle')}</p>
            </div>
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
                  <div className="text-xs text-slate-500">{link.clicks || 0} clicks</div>
                </div>
              </motion.div>
            ))}
            {visibleLinks.length === 0 && (
              <div className="text-center py-8 text-slate-500 text-sm italic">
                {t('dashboard.recent.empty_desc') || 'No links yet.'}
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
