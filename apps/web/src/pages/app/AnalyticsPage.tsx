import React, { useEffect, useState } from 'react';
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
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const stats = await AnalyticsService.getDashboardData();
        setData(stats || { timeline: [], countries: [], devices: [] });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  if (loading) {
    return (
      <div className="lp-analytics-shell lp-bg">
        <style>{analyticsStyles}</style>
        <div className="lp-analytics-loading">
          <div className="lp-analytics-loading-orb">
            <Loader2 size={26} className="spin" />
          </div>
          <div className="lp-analytics-loading-text">
            <span>Cargando analítica en tiempo real…</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lp-analytics-shell lp-bg">
      <style>{analyticsStyles}</style>

      <div className="lp-analytics-inner">
        {/* HEADER CENTRADO */}
        <header className="lp-analytics-header lp-analytics-header--center">
          <div className="lp-analytics-header-left">
            <div className="lp-chip lp-chip-center">
              <span className="lp-chip-dot" />
              CREATOR ANALYTICS
            </div>
            <p>
              Inteligencia de datos en tiempo real. Mira cómo se mueven tus clics
              y tus ingresos a nivel global.
            </p>
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
                <h3>Tráfico e ingresos</h3>
                <span className="lp-card-badge">
                  <TrendingUp size={14} />
                  Últimos 30 días
                </span>
              </div>
              <p>Actividad combinada de todos tus Smart Links y Bio Page.</p>
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
                <p className="lp-empty-title">Aún no hay suficientes datos.</p>
                <p className="lp-empty-sub">
                  Empieza a compartir tus Smart Links para activar la analítica.
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
                <h3>Top geografías</h3>
                <p>Países que más clics generan en tus enlaces.</p>
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
                          width: `${
                            (item.value / data.countries[0].value) * 100
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
                  <p className="lp-empty-title">Sin datos geográficos.</p>
                  <p className="lp-empty-sub">
                    Cuando lleguen clics de varios países, verás el mapa vivo
                    aquí.
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
                <h3>Dispositivos</h3>
                <p>Cómo se reparte tu tráfico entre móvil, desktop y otros.</p>
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
                    <p className="lp-empty-title">Esperando tráfico…</p>
                    <p className="lp-empty-sub">
                      Cuando empiecen a entrar visitas, verás el reparto aquí.
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
                    <span className="lp-devices-label">Clics totales</span>
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

// ===================== ESTILOS ANALYTICS =====================

const analyticsStyles = `
  .spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    100% { transform: rotate(360deg); }
  }

  .lp-bg {
    min-height: 100dvh;
    background:
      radial-gradient(circle at 0% 0%, #1e3a8a 0, transparent 55%),
      radial-gradient(circle at 100% 100%, #0f172a 0, #020617 55%, #000 100%);
    background-color: #020617;
    position: relative;
    overflow: hidden;
  }

  .lp-bg::before,
  .lp-bg::after {
    content: "";
    position: absolute;
    inset: -40%;
    background:
      radial-gradient(circle at 20% 0%, rgba(56, 189, 248, 0.15), transparent 60%),
      radial-gradient(circle at 80% 100%, rgba(129, 140, 248, 0.16), transparent 55%);
    opacity: 0.9;
    filter: blur(32px);
    pointer-events: none;
    animation: lp-nebula 22s ease-in-out infinite alternate;
  }

  .lp-bg::after {
    background:
      radial-gradient(circle at 0% 100%, rgba(34, 197, 94, 0.18), transparent 55%),
      radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.16), transparent 55%);
    mix-blend-mode: screen;
    animation: lp-orbit 32s linear infinite;
  }

  @keyframes lp-nebula {
    0% { transform: translate3d(-10px, -10px, 0) scale(1); opacity: 0.85; }
    100% { transform: translate3d(20px, 10px, 0) scale(1.1); opacity: 1; }
  }
  @keyframes lp-orbit {
    0% { transform: rotate(0deg) scale(1.05); }
    100% { transform: rotate(360deg) scale(1.05); }
  }

  .lp-analytics-shell {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding-top: env(safe-area-inset-top, 0);
    padding-bottom: env(safe-area-inset-bottom, 0);
    z-index: 1;
  }

  /* Desplazar a la derecha en escritorio para respetar la sidebar */
  @media (min-width: 769px) {
    .lp-analytics-shell {
      left: 260px;
    }
  }

  .lp-analytics-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1080px;
    padding: 26px 16px 90px 16px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    color: #e5e7eb;
  }

  /* LOADING */
  .lp-analytics-loading {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 480px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding: 40px 20px 60px;
    border-radius: 26px;
    border: 1px solid rgba(148, 163, 184, 0.6);
    background: radial-gradient(circle at top, rgba(15,23,42,0.98), rgba(15,23,42,0.96));
    box-shadow: 0 26px 80px rgba(0, 0, 0, 0.95);
  }

  .lp-analytics-loading-orb {
    width: 56px;
    height: 56px;
    border-radius: 999px;
    background: radial-gradient(circle at 30% 0, #6366f1, #22c55e);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 0 0 1px rgba(191, 219, 254, 0.5),
      0 18px 42px rgba(15, 23, 42, 1);
  }

  .lp-analytics-loading-orb svg {
    color: #e5f2ff;
  }

  .lp-analytics-loading-text span {
    font-size: 14px;
    font-weight: 500;
    color: #cbd5f5;
  }

  /* HEADER */
  .lp-analytics-header {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: flex-end;
    margin-bottom: 20px;
  }

  .lp-analytics-header--center {
    justify-content: center;
    text-align: center;
  }

  .lp-analytics-header-left {
    max-width: 520px;
  }

  .lp-analytics-header--center .lp-analytics-header-left p {
    margin: 0;
    font-size: 13px;
    color: #9ca3af;
  }

  .lp-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(30, 64, 175, 0.8);
    color: #e5e7eb;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
    border: 1px solid rgba(148, 163, 184, 0.7);
    box-shadow:
      0 0 0 1px rgba(15, 23, 42, 0.9),
      0 0 18px rgba(59, 130, 246, 0.6);
    animation: lp-chip-glow 4.5s ease-in-out infinite;
  }

  .lp-chip-center {
    justify-content: center;
    width: 100%;
  }

  .lp-chip-dot {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.35);
  }

  @keyframes lp-chip-glow {
    0%, 100% {
      box-shadow:
        0 0 0 1px rgba(15, 23, 42, 0.9),
        0 0 12px rgba(59, 130, 246, 0.4);
    }
    50% {
      box-shadow:
        0 0 0 1px rgba(129, 140, 248, 0.9),
        0 0 24px rgba(129, 140, 248, 0.9);
    }
  }

  /* CARDS */
  .lp-analytics-card {
    position: relative;
    border-radius: 24px;
    border: 1px solid rgba(148, 163, 184, 0.7);
    background: radial-gradient(circle at top, rgba(15, 23, 42, 0.98), rgba(15,23,42,0.96));
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.95),
      0 0 0 1px rgba(15, 23, 42, 0.9);
    padding: 18px 18px 20px 18px;
    margin-bottom: 18px;
    overflow: hidden;
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    transition:
      transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1),
      box-shadow 0.25s ease,
      border-color 0.25s ease,
      background 0.25s ease;
  }

  .lp-analytics-card::before {
    content: "";
    position: absolute;
    inset: -120px;
    background:
      radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.35), transparent 55%),
      radial-gradient(circle at 100% 100%, rgba(129, 140, 248, 0.25), transparent 55%);
    opacity: 0.6;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  .lp-analytics-card-main {
    animation: lp-card-float 10s ease-in-out infinite;
  }

  @keyframes lp-card-float {
    0%, 100% { transform: translateY(-1px); }
    50% { transform: translateY(2px); }
  }

  .lp-analytics-card:hover {
    transform: translateY(-3px) scale(1.005);
    box-shadow:
      0 30px 80px rgba(0, 0, 0, 1),
      0 0 0 1px rgba(191, 219, 254, 0.6);
    border-color: rgba(191, 219, 254, 0.75);
  }

  .lp-card-header {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }

  .lp-card-icon-wrap {
    width: 34px;
    height: 34px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 14px 30px rgba(15, 23, 42, 0.95),
      0 0 0 1px rgba(15, 23, 42, 1);
  }

  .lp-card-icon-wrap.primary {
    background: radial-gradient(circle at 30% 0%, #6366f1, #1e293b);
    color: #e0e7ff;
  }

  .lp-card-icon-wrap.blue {
    background: radial-gradient(circle at 30% 0%, #3b82f6, #0f172a);
    color: #dbeafe;
  }

  .lp-card-icon-wrap.orange {
    background: radial-gradient(circle at 30% 0%, #f97316, #1f2937);
    color: #ffedd5;
  }

  .lp-card-title-block h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 800;
    color: #f9fafb;
  }

  .lp-card-title-block p {
    margin: 2px 0 0 0;
    font-size: 12px;
    color: #9ca3af;
  }

  .lp-card-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .lp-card-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    color: #c7d2fe;
    background: rgba(30, 64, 175, 0.7);
    border: 1px solid rgba(129, 140, 248, 0.7);
  }

  .lp-card-badge svg {
    color: #a5b4fc;
  }

  .lp-card-chart {
    position: relative;
    z-index: 1;
    height: 320px;
    border-radius: 18px;
    background: radial-gradient(circle at 0% 0%, rgba(30,64,175,0.45), rgba(15,23,42,0.96));
    padding: 8px;
    box-shadow:
      inset 0 0 0 1px rgba(30, 64, 175, 0.7),
      0 18px 40px rgba(15, 23, 42, 0.98);
  }

  /* Scan neon sobre la gráfica */
  .lp-card-chart::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      transparent 0%,
      rgba(244, 244, 245, 0.25) 35%,
      rgba(129, 140, 248, 0.55) 50%,
      transparent 70%
    );
    mix-blend-mode: screen;
    opacity: 0;
    transform: translateX(-120%);
    pointer-events: none;
    animation: lp-scan 9s linear infinite;
  }

  @keyframes lp-scan {
    0% { transform: translateX(-120%); opacity: 0; }
    10% { opacity: 0.5; }
    35% { opacity: 0; }
    100% { transform: translateX(120%); opacity: 0; }
  }

  .lp-empty-card {
    height: 100%;
    border-radius: 16px;
    border: 1px dashed rgba(148, 163, 184, 0.7);
    background: rgba(15, 23, 42, 0.96);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    text-align: center;
    padding: 24px;
  }

  .lp-empty-card.small {
    padding: 22px 18px;
  }

  .lp-empty-card.center {
    padding: 24px 18px;
  }

  .lp-empty-icon {
    width: 48px;
    height: 48px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 23, 42, 0.96);
    box-shadow:
      0 10px 26px rgba(15, 23, 42, 0.95),
      0 0 0 1px rgba(30, 64, 175, 0.8);
    margin-bottom: 10px;
  }

  .lp-empty-icon svg {
    color: #64748b;
  }

  .lp-empty-title {
    margin: 4px 0 2px 0;
    font-size: 13px;
    font-weight: 600;
    color: #e5e7eb;
  }

  .lp-empty-sub {
    margin: 0;
    font-size: 11px;
    color: #9ca3af;
  }

  /* GRID BELOW */
  .lp-analytics-grid {
    margin-top: 14px;
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: 16px;
  }

  .lp-card-body-list {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 6px;
  }

  /* COUNTRIES */
  .lp-country-row {
    padding: 8px 2px 6px 2px;
    border-radius: 12px;
    transition:
      background 0.18s ease,
      transform 0.18s ease,
      box-shadow 0.18s ease;
  }

  .lp-country-row:hover {
    background: rgba(15, 23, 42, 0.9);
    transform: translateY(-1px);
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.9);
  }

  .lp-country-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .lp-country-name {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #e5e7eb;
  }

  .lp-country-name img {
    border-radius: 3px;
    box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.9);
  }

  .lp-country-emoji {
    font-size: 16px;
  }

  .lp-country-metric {
    text-align: right;
    font-size: 12px;
  }

  .lp-country-value {
    font-weight: 700;
    color: #c4b5fd;
  }

  .lp-country-bar {
    width: 100%;
    height: 8px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.96);
    overflow: hidden;
    box-shadow: inset 0 0 0 1px rgba(30, 64, 175, 0.7);
  }

  .lp-country-bar-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 0.35s ease-out;
  }

  /* DEVICES */
  .lp-devices-content {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: 12px;
    margin-top: 4px;
  }

  .lp-devices-chart {
    position: relative;
    height: 230px;
    border-radius: 18px;
    background: radial-gradient(circle at 0% 0%, rgba(251, 191, 36, 0.3), rgba(15,23,42,0.97));
    box-shadow:
      inset 0 0 0 1px rgba(148, 163, 184, 0.7),
      0 16px 38px rgba(15, 23, 42, 1);
    padding: 4px;
  }

  /* Glow pulsante en el donut */
  .lp-devices-chart::after {
    content: "";
    position: absolute;
    inset: 18%;
    border-radius: 999px;
    border: 1px solid rgba(250, 250, 255, 0.1);
    box-shadow:
      0 0 40px rgba(52, 211, 153, 0.45),
      0 0 80px rgba(96, 165, 250, 0.3);
    mix-blend-mode: screen;
    opacity: 0.6;
    pointer-events: none;
    animation: lp-dev-pulse 5s ease-in-out infinite;
  }

  @keyframes lp-dev-pulse {
    0%, 100% { opacity: 0.35; transform: scale(0.98); }
    50% { opacity: 0.9; transform: scale(1.02); }
  }

  .lp-devices-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    pointer-events: none;
  }

  .lp-devices-total {
    display: block;
    font-size: 26px;
    font-weight: 900;
    color: #f9fafb;
    letter-spacing: -0.03em;
    margin-bottom: 2px;
  }

  .lp-devices-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: #cbd5f5;
    letter-spacing: 0.16em;
  }

  .lp-devices-legend {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
  }

  .lp-devices-legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #e5e7eb;
  }

  .lp-devices-dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.9);
  }

  .lp-devices-name {
    font-weight: 600;
  }

  .lp-devices-count {
    margin-left: auto;
    font-size: 11px;
    color: #9ca3af;
  }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .lp-analytics-grid {
      grid-template-columns: minmax(0, 1fr);
    }
    .lp-devices-content {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @media (max-width: 768px) {
    .lp-analytics-shell {
      left: 0;
    }
    .lp-analytics-inner {
      max-width: 520px;
      padding: 20px 12px 110px 12px;
    }
    .lp-analytics-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .lp-card-chart {
      height: 260px;
    }
  }
`;
