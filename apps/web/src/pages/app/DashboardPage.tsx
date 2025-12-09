import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../i18n';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  MousePointer2,
  BarChart3,
  Users,
  Copy,
  Loader2,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { LinkService } from '../../lib/linkService';
import { BioService } from '../../lib/bioService';
import { supabase } from '../../lib/supabase';

type DashboardStats = {
  revenue: number; // total enlaces + bio
  clicks: number;  // total enlaces + bio
  rpm: number;
  referralEarnings: number;

  // desglose
  revenueShort: number;
  revenueBio: number;
  clicksShort: number;
  clicksBio: number;
};

// Hook visual para animar números (no toca lógica)
function useCountTo(value: number, duration = 800) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const from = display;
    const delta = value - from;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + delta * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return display;
}



export function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [stats, setStats] = useState<DashboardStats>({
    revenue: 0,
    clicks: 0,
    rpm: 0,
    referralEarnings: 0,
    revenueShort: 0,
    revenueBio: 0,
    clicksShort: 0,
    clicksBio: 0,
  });

  const [links, setLinks] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(prof);

      const realLinks = await LinkService.getAll();
      const safeLinks = realLinks || [];
      setLinks(safeLinks);

      const revenueShort = safeLinks.reduce(
        (acc: number, l: any) => acc + (Number(l.earnings) || 0),
        0
      );
      const clicksShort = safeLinks.reduce(
        (acc: number, l: any) => acc + (Number(l.views) || 0),
        0
      );

      const bioProfile = await BioService.getOrCreateProfile(user);
      const revenueBio = Number(bioProfile?.earnings || 0);
      const clicksBio = Number(bioProfile?.views || 0);

      const totalRevenue = revenueShort + revenueBio;
      const totalClicks = clicksShort + clicksBio;
      const rpm = totalClicks > 0 ? (totalRevenue / totalClicks) * 1000 : 0;

      setStats({
        revenue: totalRevenue,
        clicks: totalClicks,
        rpm,
        referralEarnings: Number(prof?.referral_earnings) || 0,
        revenueShort,
        revenueBio,
        clicksShort,
        clicksBio,
      });
    } catch (error) {
      console.error('Error cargando dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyReferral = () => {
    if (profile?.id) {
      const refLink = `${window.location.origin}/register?ref=${profile.referral_code || profile.id
        }`;
      navigator.clipboard.writeText(refLink);
      alert('Link de referido copiado');
    }
  };

  // Números animados (solo visual)
  const animatedRevenue = useCountTo(stats.revenue);
  const animatedClicks = useCountTo(stats.clicks);
  const animatedRPM = useCountTo(stats.rpm);
  const animatedReferrals = useCountTo(stats.referralEarnings);

  const gridVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] as any },
    },
  };

  if (loading) {
    return (
      <div className="lp-dashboard-shell lp-bg">

        <div className="lp-bg-grid" />
        <div className="lp-bg-orb orb-left" />
        <div className="lp-bg-orb orb-right" />
        <div className="lp-dashboard-inner">
          <div className="lp-dashboard-loading">
            <Loader2 className="spin" size={42} />
            <span>Cargando tu panel en tiempo real…</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key="dashboard"
        className="lp-dashboard-shell lp-bg"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
      >


        {/* Capas extra de fondo */}
        <div className="lp-bg-grid" />
        <div className="lp-bg-orb orb-left" />
        <div className="lp-bg-orb orb-right" />
        <div className="lp-bg-sparks" />

        <div className="lp-dashboard-inner">
          {/* HEADER */}
          <header className="lp-dash-header">
            <motion.div
              className="lp-dash-header-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="lp-chip lp-chip-dash">
                <span className="lp-chip-dot" />
                {t('dashboard.chip')}
              </div>
              <h2>{t('dashboard.title')}</h2>
              <div className="lp-dash-title-row">
                <p>{t('dashboard.subtitle')}</p>
              </div>
            </motion.div>
          </header>

          {/* GRID PRINCIPAL */}
          <motion.section
            className="lp-dash-stats-grid"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {/* INGRESOS */}
            <motion.article
              className="lp-dash-card lp-dash-card-primary"
              variants={cardVariants}
              whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <div className="lp-dash-card-header">
                <div className="lp-dash-icon-pill pill-green">
                  <DollarSign size={18} />
                </div>
                <div className="lp-dash-card-label">
                  <span>{t('dashboard.stats.revenue.label')}</span>
                  <small>{t('dashboard.stats.revenue.sub')}</small>
                </div>
              </div>

              <div className="lp-dash-value-row">
                <div className="lp-dash-main-value lp-value-glow">
                  €{animatedRevenue.toFixed(4)}
                </div>
                <div className="lp-dash-status-pill">
                  <TrendingUp size={14} />
                  Activo
                </div>
              </div>

              <div className="lp-dash-split-row">
                <div>
                  <span className="label">Enlaces</span>
                  <span className="value">
                    €{stats.revenueShort.toFixed(4)}
                  </span>
                </div>
                <div>
                  <span className="label">Bio Page</span>
                  <span className="value">
                    €{stats.revenueBio.toFixed(4)}
                  </span>
                </div>
              </div>

              <div className="lp-dash-card-glow" />
            </motion.article>

            {/* CLICS */}
            <motion.article
              className="lp-dash-card"
              variants={cardVariants}
              whileHover={{ y: -6, rotateX: 2, rotateY: 2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <div className="lp-dash-card-header">
                <div className="lp-dash-icon-pill pill-blue">
                  <MousePointer2 size={18} />
                </div>
                <div className="lp-dash-card-label">
                  <span>{t('dashboard.stats.clicks.label')}</span>
                  <small>{t('dashboard.stats.clicks.sub')}</small>
                </div>
              </div>

              <div className="lp-dash-value-row">
                <div className="lp-dash-main-value alt">
                  {animatedClicks.toFixed(0)}
                </div>
              </div>

              <div className="lp-dash-split-row">
                <div>
                  <span className="label">Enlaces</span>
                  <span className="value">{stats.clicksShort}</span>
                </div>
                <div>
                  <span className="label">Bio Page</span>
                  <span className="value">{stats.clicksBio}</span>
                </div>
              </div>
            </motion.article>

            {/* REFERIDOS */}
            <motion.article
              className="lp-dash-card lp-dash-card-referrals"
              variants={cardVariants}
              whileHover={{ y: -6, rotateX: 2, rotateY: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <div className="lp-dash-card-header ref-header">
                <div className="lp-dash-icon-pill pill-violet">
                  <Users size={18} />
                </div>
                <div className="lp-dash-card-label">
                  <span>{t('dashboard.stats.referrals.label')}</span>
                  <small>{t('dashboard.stats.referrals.sub')}</small>
                </div>
                <button
                  type="button"
                  onClick={copyReferral}
                  className="lp-ref-copy-btn"
                  title="Copiar link de referido"
                >
                  <Copy size={14} />
                </button>
              </div>

              <div className="lp-dash-value-row">
                <div className="lp-dash-main-value">
                  €{animatedReferrals.toFixed(2)}
                </div>
              </div>

              <p className="lp-dash-ref-text">
                {t('dashboard.stats.referrals.text')}
              </p>

              <div className="lp-dash-card-glow ref" />
            </motion.article>

            {/* RPM */}
            <motion.article
              className="lp-dash-card"
              variants={cardVariants}
              whileHover={{ y: -6, rotateX: 2, rotateY: 1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <div className="lp-dash-card-header">
                <div className="lp-dash-icon-pill pill-amber">
                  <BarChart3 size={18} />
                </div>
                <div className="lp-dash-card-label">
                  <span>{t('dashboard.stats.rpm.label')}</span>
                  <small>{t('dashboard.stats.rpm.sub')}</small>
                </div>
              </div>

              <div className="lp-dash-value-row">
                <div className="lp-dash-main-value alt">
                  €{animatedRPM.toFixed(2)}
                </div>
              </div>

              <p className="lp-dash-helper">
                {t('dashboard.stats.rpm.helper')}
              </p>
            </motion.article>
          </motion.section>

          {/* ACTIVIDAD RECIENTE */}
          <motion.section
            className="lp-dash-recent"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <div className="lp-dash-recent-header">
              <div>
                <h2>{t('dashboard.recent.title')}</h2>
                <p>{t('dashboard.recent.subtitle')}</p>
              </div>
              <button
                type="button"
                className="lp-dash-link-btn"
                onClick={() => navigate('/app/links')}
              >
                {t('dashboard.recent.view_all')} <ArrowRight size={14} />
              </button>
            </div>

            {links.length === 0 ? (
              <div className="lp-dash-empty">
                <p>{t('dashboard.recent.empty')}</p>
                <button
                  type="button"
                  onClick={() => navigate('/app/links/new')}
                >
                  {t('dashboard.recent.create_first')}
                </button>
              </div>
            ) : (
              <>
                {/* DESKTOP */}
                <div className="lp-dash-table-wrapper">
                  <table className="lp-dash-table">
                    <thead>
                      <tr>
                        <th>{t('dashboard.recent.table.link')}</th>
                        <th className="th-center">{t('dashboard.recent.table.mode')}</th>
                        <th className="th-right">{t('dashboard.recent.table.visits')}</th>
                        <th className="th-right">{t('dashboard.recent.table.earned')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {links.slice(0, 5).map((link: any, idx: number) => (
                        <motion.tr
                          key={link.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: 0.05 * idx }}
                        >
                          <td>
                            <div className="lp-link-main">
                              <span className="slug">/{link.slug}</span>
                              <span className="url">{link.original_url}</span>
                            </div>
                          </td>
                          <td className="td-center">
                            <span className="lp-mode-pill-table">
                              {link.monetization_mode || 'standard'}
                            </span>
                          </td>
                          <td className="td-right">{link.views}</td>
                          <td className="td-right">
                            <span className="lp-earn-pill">
                              €
                              {Number(link.earnings || 0).toFixed(4)}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* MÓVIL */}
                <div className="lp-dash-recent-list">
                  {links.slice(0, 5).map((link: any, idx: number) => (
                    <motion.div
                      key={link.id}
                      className="lp-recent-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.04 * idx }}
                      whileHover={{ y: -3 }}
                    >
                      <div className="top-row">
                        <div className="info">
                          <div className="slug">/{link.slug}</div>
                          <div className="url">{link.original_url}</div>
                        </div>
                        <span className="earn">
                          €{Number(link.earnings || 0).toFixed(4)}
                        </span>
                      </div>
                      <div className="bottom-row">
                        <span>Visitas: {link.views}</span>
                        <span>
                          Modo: {link.monetization_mode || 'standard'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.section>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ===================== ESTILOS DASHBOARD V2 =====================
// Styles moved to ./Dashboard.css
