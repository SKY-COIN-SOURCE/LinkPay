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
      // Simular un poco de carga para que la animación se aprecie
      setTimeout(() => setLoading(false), 600);
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

  if (loading) {
    return (
      <div className="lp-dashboard-shell">
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="animate-spin text-indigo-500" size={40} />
        </div>
      </div>
    );
  }

  return (
    <div className="lp-dashboard-shell">
      <div className="lp-dashboard-inner animate-enter">

        {/* HEADER */}
        <header className="lp-dashboard-header-center">
          <div className="lp-chip-center">
            <span className="lp-chip-dot" />
            {t('dashboard.chip')}
          </div>
          <p className="lp-dashboard-subtitle-center">{t('dashboard.subtitle')}</p>
        </header>

        {/* METRICS GRID */}
        <div className="lp-dashboard-grid">

          {/* CARD 1: REVENUE */}
          <div className="lp-dashboard-card lp-card-green">
            <div className="lp-stat-header">
              <div className="lp-stat-icon"><DollarSign size={24} /></div>
              <div className="lp-trend-badge"><TrendingUp size={12} /> +12%</div>
            </div>
            <div>
              <div className="lp-stat-label">{t('dashboard.stats.revenue.label')}</div>
              <div className="lp-stat-value">€{(stats?.totalRevenue || 0).toFixed(4)}</div>
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
          </div>

          {/* CARD 2: CLICKS */}
          <div className="lp-dashboard-card lp-card-blue">
            <div className="lp-stat-header">
              <div className="lp-stat-icon"><MousePointer2 size={24} /></div>
              <div className="lp-trend-badge"><Activity size={12} /> +5%</div>
            </div>
            <div>
              <div className="lp-stat-label">{t('dashboard.stats.clicks.label')}</div>
              <div className="lp-stat-value">{stats?.totalClicks || 0}</div>
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
          </div>

          {/* CARD 3: REFERRALS */}
          <div className="lp-dashboard-card lp-card-purple">
            <div className="lp-stat-header">
              <div className="lp-stat-icon"><Users size={24} /></div>
              <Copy size={16} className="text-slate-400 cursor-pointer hover:text-white" onClick={copyReferral} />
            </div>
            <div>
              <div className="lp-stat-label">{t('dashboard.stats.referrals.label')}</div>
              <div className="lp-stat-value">€{(stats?.referralEarnings || 0).toFixed(2)}</div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {t('dashboard.stats.referrals.text')}
              </p>
            </div>
          </div>

          {/* CARD 4: RPM */}
          <div className="lp-dashboard-card lp-card-orange">
            <div className="lp-stat-header">
              <div className="lp-stat-icon"><BarChart3 size={24} /></div>
            </div>
            <div>
              <div className="lp-stat-label">{t('dashboard.stats.rpm.label')}</div>
              <div className="lp-stat-value">€1.22</div>
              <p className="text-xs text-slate-400 mt-2">
                {t('dashboard.stats.rpm.help') || 'Average revenue per 1k visits'}
              </p>
            </div>
          </div>

        </div>

        {/* RECENT ACTIVITY */}
        <div className="lp-dashboard-card lp-recent-card">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">{t('dashboard.recent.title')}</h3>
              <p className="text-sm text-slate-400">{t('dashboard.recent.subtitle')}</p>
            </div>
            <button
              onClick={() => navigate('/app/links')}
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {t('dashboard.recent.view_all')} <ArrowRight size={14} />
            </button>
          </div>

          <div className="lp-recent-list">
            {visibleLinks.map((link) => (
              <div key={link.id} className="lp-recent-item">
                <div className="lp-link-icon-circle">
                  <LinkIcon size={16} />
                </div>
                <div className="lp-link-info">
                  <span className="lp-link-alias">/{link.slug}</span>
                  <span className="lp-link-url">{link.original_url}</span>
                </div>
                <div className="text-right">
                  <div className="lp-link-money">€{(link.earnings || 0).toFixed(4)}</div>
                  <div className="text-xs text-slate-500">{link.clicks || 0} clicks</div>
                </div>
              </div>
            ))}
            {visibleLinks.length === 0 && (
              <div className="text-center py-8 text-slate-500 text-sm">
                {t('dashboard.recent.empty_desc') || 'No links yet.'}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
