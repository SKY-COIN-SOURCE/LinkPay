import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useTranslation } from '../../i18n';
import './Analytics.css';
import {
  BarChart3,
  Globe,
  Smartphone,
  Calendar,
  Loader2,
  Map,
  TrendingUp,
} from 'lucide-react';
import { AnalyticsService } from '../../lib/analyticsService';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export function AnalyticsPage() {
  const { t } = useTranslation();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    loadData();
  }, [timeRange]);

  const loadData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const stats = await AnalyticsService.getDashboardData();
      setData(stats);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  if (loading) {
    return (
      <div className="lp-analytics-shell lp-bg">
        <div className="lp-analytics-loading">
          <div className="lp-analytics-loading-orb">
            <Loader2 size={26} className="spin" />
          </div>
          <div className="lp-analytics-loading-text">
            <span>{t('analytics.loading')}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lp-analytics-shell lp-bg">


      <div className="lp-analytics-inner">
        {/* HEADER CENTRADO */}
        <header className="lp-analytics-header lp-analytics-header--center">
          <div className="lp-analytics-header-left">
            <div className="lp-chip lp-chip-center">
              <span className="lp-chip-dot" />
              {t('analytics.chip')}
            </div>
            <p>{t('analytics.header')}</p>
          </div>
        </header>

        {/* TIMELINE CARD */}
        <section className="lp-analytics-card lp-analytics-card-main">
          <div className="lp-card-header">
            <div className="lp-card-icon-wrap primary">
              <Calendar size={20} />
            </div>
            <div className="lp-card-title-block">
              <div className="lp-card-title-row">
                <h3>{t('analytics.timeline.title')}</h3>
                <span className="lp-card-badge">
                  <TrendingUp size={14} />
                  {t('analytics.timeline.badge')}
                </span>
              </div>
              <p>{t('analytics.timeline.subtitle')}</p>
            </div>
          </div>

          <div className="lp-card-chart">
            {data?.timeline?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.timeline}>
                  <defs>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.38} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(148, 163, 184, 0.25)"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#9CA3AF' }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 14,
                      border: 'none',
                      background: 'rgba(15,23,42,0.98)',
                      boxShadow: '0 18px 40px rgba(15,23,42,0.95)',
                      color: '#E5E7EB',
                      fontSize: 12,
                    }}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="clicks"
                    stroke="#6366F1"
                    strokeWidth={2.6}
                    fillOpacity={1}
                    fill="url(#colorClicks)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="lp-empty-card">
                <div className="lp-empty-icon">
                  <BarChart3 size={40} />
                </div>
                <p className="lp-empty-title">{t('analytics.timeline.empty_title')}</p>
                <p className="lp-empty-sub">
                  {t('analytics.timeline.empty_desc')}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* GRID: COUNTRIES + DEVICES */}
        <section className="lp-analytics-grid">
          {/* PAÍSES */}
          <div className="lp-analytics-card lp-analytics-card-side">
            <div className="lp-card-header">
              <div className="lp-card-icon-wrap blue">
                <Globe size={20} />
              </div>
              <div className="lp-card-title-block">
                <h3>{t('analytics.locations.title')}</h3>
                <p>{t('analytics.locations.subtitle')}</p>
              </div>
            </div>

            <div className="lp-card-body-list">
              {data?.countries?.length > 0 ? (
                data.countries.map((item: any, index: number) => (
                  <div key={index} className="lp-country-row">
                    <div className="lp-country-main">
                      <div className="lp-country-name">
                        {item.country === 'Unknown' ? (
                          <span className="lp-country-emoji">🌍</span>
                        ) : (
                          <img
                            src={`https://flagcdn.com/20x15/${item.country.toLowerCase()}.png`}
                            alt={item.country}
                          />
                        )}
                        <span>
                          {item.country === 'Unknown'
                            ? 'Desconocido'
                            : item.country}
                        </span>
                      </div>
                      <div className="lp-country-metric">
                        <span className="lp-country-value">
                          {item.value} clics
                        </span>
                      </div>
                    </div>
                    <div className="lp-country-bar">
                      <div
                        className="lp-country-bar-fill"
                        style={{
                          width: `${(item.value / data.countries[0].value) * 100
                            }%`,
                          background: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="lp-empty-card small">
                  <div className="lp-empty-icon">
                    <Map size={32} />
                  </div>
                  <p className="lp-empty-title">{t('analytics.locations.empty')}</p>
                  <p className="lp-empty-sub">
                    {t('analytics.timeline.empty_desc')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* DISPOSITIVOS */}
          <div className="lp-analytics-card lp-analytics-card-side">
            <div className="lp-card-header">
              <div className="lp-card-icon-wrap orange">
                <Smartphone size={20} />
              </div>
              <div className="lp-card-title-block">
                <h3>{t('analytics.devices.title')}</h3>
                <p>{t('analytics.devices.subtitle')}</p>
              </div>
            </div>

            <div className="lp-devices-content">
              <div className="lp-devices-chart">
                {data?.devices?.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.devices}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {data.devices.map((entry: any, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: 14,
                          border: 'none',
                          background: 'rgba(15,23,42,0.98)',
                          boxShadow: '0 18px 40px rgba(15,23,42,0.95)',
                          color: '#E5E7EB',
                          fontSize: 12,
                        }}
                        labelStyle={{ color: '#9CA3AF' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="lp-empty-card center">
                    <div className="lp-empty-icon">
                      <Smartphone size={36} />
                    </div>
                    <p className="lp-empty-title">{t('analytics.devices.empty')}</p>
                    <p className="lp-empty-sub">
                      {t('analytics.timeline.empty_desc')}
                    </p>
                  </div>
                )}

                {data?.devices?.length > 0 && (
                  <div className="lp-devices-center">
                    <span className="lp-devices-total">
                      {data.devices.reduce(
                        (a: any, b: any) => a + b.value,
                        0
                      )}
                    </span>
                    <span className="lp-devices-label">{t('analytics.devices.total')}</span>
                  </div>
                )}
              </div>

              <div className="lp-devices-legend">
                {data?.devices?.map((entry: any, index: number) => (
                  <div key={index} className="lp-devices-legend-item">
                    <span
                      className="lp-devices-dot"
                      style={{
                        background: COLORS[index % COLORS.length],
                      }}
                    />
                    <span className="lp-devices-name">{entry.device}</span>
                    <span className="lp-devices-count">
                      {entry.value} clics
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


