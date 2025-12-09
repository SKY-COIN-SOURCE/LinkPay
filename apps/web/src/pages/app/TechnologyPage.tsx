import React from 'react';
import { Cpu, Zap, Activity, Network, ShieldCheck, Server, Globe, Lock } from 'lucide-react';
import { useTranslation } from '../../i18n';
import './Technology.css';

export function TechnologyPage() {
   const { t } = useTranslation();

   return (
      <div className="lp-bg lp-tech-shell">
         <div className="animate-enter lp-tech-container">

            <div className="lp-tech-header">
               <h1 className="lp-tech-title">{t('tech.title')}</h1>
               <p className="lp-tech-desc">{t('tech.desc')}</p>
            </div>

            {/* DASHBOARD TECNOLÓGICO "BLACK BOX" */}
            <div className="lp-tech-blackbox">

               <div className="lp-blackbox-header">
                  <div className="lp-status-indicator">
                     <div className="lp-status-dot"></div>
                     <span className="lp-status-label">{t('tech.status.online')}</span>
                  </div>
                  <div className="lp-latency-code">
                     {t('tech.status.latency')}
                  </div>
               </div>

               <div className="lp-metrics-grid">
                  <div className="lp-metric-card">
                     <div className="lp-metric-label"><Zap size={14} style={{ display: 'inline', marginRight: 4 }} /> {t('tech.metrics.speed')}</div>
                     <div className="lp-metric-value">0.04s</div>
                  </div>
                  <div className="lp-metric-card">
                     <div className="lp-metric-label"><Activity size={14} style={{ display: 'inline', marginRight: 4 }} /> {t('tech.metrics.ai')}</div>
                     <div className="lp-metric-value">99.8%</div>
                  </div>
                  <div className="lp-metric-card">
                     <div className="lp-metric-label"><Network size={14} style={{ display: 'inline', marginRight: 4 }} /> {t('tech.metrics.nodes')}</div>
                     <div className="lp-metric-value">1,240</div>
                  </div>
               </div>

               <div className="lp-security-banner">
                  <ShieldCheck size={20} color="#4ade80" />
                  <span className="lp-security-text">
                     <strong>{t('tech.banner.text')}</strong> {t('tech.banner.sub')}
                  </span>
               </div>

            </div>

            {/* EXPLICACIÓN DE LA INNOVACIÓN */}
            <div className="lp-tech-cards-row">
               <div className="lp-tech-feature-card">
                  <h3 className="lp-feature-title">
                     <Cpu size={20} className="text-indigo-400" /> {t('tech.features.cpm_title')}
                  </h3>
                  <p className="lp-feature-desc">{t('tech.features.cpm_desc')}</p>
               </div>

               <div className="lp-tech-feature-card">
                  <h3 className="lp-feature-title">
                     <Globe size={20} className="text-blue-400" /> {t('tech.features.edge_title')}
                  </h3>
                  <p className="lp-feature-desc">{t('tech.features.edge_desc')}</p>
               </div>

               <div className="lp-tech-feature-card">
                  <h3 className="lp-feature-title">
                     <Lock size={20} className="text-emerald-400" /> {t('tech.features.fraud_title')}
                  </h3>
                  <p className="lp-feature-desc">{t('tech.features.fraud_desc')}</p>
               </div>

               <div className="lp-tech-feature-card">
                  <h3 className="lp-feature-title">
                     <Server size={20} className="text-purple-400" /> {t('tech.features.scale_title')}
                  </h3>
                  <p className="lp-feature-desc">{t('tech.features.scale_desc')}</p>
               </div>
            </div>

         </div>
      </div>
   );
}
