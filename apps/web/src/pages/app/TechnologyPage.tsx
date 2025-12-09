import React from 'react';
import { Cpu, Zap, Activity, Network, ShieldCheck, Server, Globe, Lock } from 'lucide-react';
import './Technology.css';

export function TechnologyPage() {
   return (
      <div className="lp-bg lp-tech-shell">
         <div className="animate-enter lp-tech-container">

            <div className="lp-tech-header">
               <h1 className="lp-tech-title">LinkPay Neural Engine™</h1>
               <p className="lp-tech-desc">
                  Nuestra infraestructura de monetización impulsada por IA optimiza cada visita en tiempo real,
                  garantizando el CPM más alto sin comprometer la experiencia del usuario.
               </p>
            </div>

            {/* DASHBOARD TECNOLÓGICO "BLACK BOX" */}
            <div className="lp-tech-blackbox">

               <div className="lp-blackbox-header">
                  <div className="lp-status-indicator">
                     <div className="lp-status-dot"></div>
                     <span className="lp-status-label">SYSTEM ONLINE</span>
                  </div>
                  <div className="lp-latency-code">
                     lat: 12ms | region: global-edge
                  </div>
               </div>

               <div className="lp-metrics-grid">
                  <div className="lp-metric-card">
                     <div className="lp-metric-label"><Zap size={14} style={{ display: 'inline', marginRight: 4 }} /> Auction Speed</div>
                     <div className="lp-metric-value">0.04s</div>
                  </div>
                  <div className="lp-metric-card">
                     <div className="lp-metric-label"><Activity size={14} style={{ display: 'inline', marginRight: 4 }} /> AI Prediction</div>
                     <div className="lp-metric-value">99.8%</div>
                  </div>
                  <div className="lp-metric-card">
                     <div className="lp-metric-label"><Network size={14} style={{ display: 'inline', marginRight: 4 }} /> Active Nodes</div>
                     <div className="lp-metric-value">1,240</div>
                  </div>
               </div>

               <div className="lp-security-banner">
                  <ShieldCheck size={20} color="#4ade80" />
                  <span className="lp-security-text">
                     <strong>Active Threat Protection:</strong> El algoritmo bloquea el 99.9% del tráfico bot antes de que afecte tu reputación.
                  </span>
               </div>

            </div>

            {/* EXPLICACIÓN DE LA INNOVACIÓN */}
            <div className="lp-tech-cards-row">
               <div className="lp-tech-feature-card">
                  <h3 className="lp-feature-title">
                     <Cpu size={20} className="text-indigo-400" /> Predictive CPM
                  </h3>
                  <p className="lp-feature-desc">
                     No vendemos tu tráfico a ciegas. Nuestra IA analiza el historial del visitante y predice qué anunciante pagará más en el futuro inmediato, reservando el espacio antes de la carga.
                  </p>
               </div>

               <div className="lp-tech-feature-card">
                  <h3 className="lp-feature-title">
                     <Globe size={20} className="text-blue-400" /> Edge Computing Global
                  </h3>
                  <p className="lp-feature-desc">
                     Tus enlaces se sirven desde 240+ puntos de presencia (PoP) de Cloudflare. La lógica de monetización ocurre en el "borde" (edge), eliminando latencia y aumentando las conversiones.
                  </p>
               </div>

               <div className="lp-tech-feature-card">
                  <h3 className="lp-feature-title">
                     <Lock size={20} className="text-emerald-400" /> Anti-Fraud Shield
                  </h3>
                  <p className="lp-feature-desc">
                     Utilizamos huella digital de dispositivo (fingerprinting) avanzada para detectar granjas de clicks y bots. Solo monetizas humanos reales, protegiendo tu cuenta de bloqueos.
                  </p>
               </div>

               <div className="lp-tech-feature-card">
                  <h3 className="lp-feature-title">
                     <Server size={20} className="text-purple-400" /> Serverless Scalability
                  </h3>
                  <p className="lp-feature-desc">
                     Sin servidores que mantener. Nuestra arquitectura serverless escala automáticamente para manejar millones de clicks por segundo sin caídas ni tiempos de espera.
                  </p>
               </div>
            </div>

         </div>
      </div>
   );
}
