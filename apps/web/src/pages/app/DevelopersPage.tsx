import React from 'react';
import { Copy, Key, Terminal } from 'lucide-react';
import '../../styles/PremiumBackground.css';

export function DevelopersPage() {
  return (
    <div className="lp-premium-bg lp-premium-shell">
      <div className="lp-premium-inner" style={{ maxWidth: '900px' }}>

        {/* Header */}
        <header style={{ marginBottom: '24px', textAlign: 'center' }}>
          <div className="lp-premium-chip" style={{ marginBottom: '12px' }}>
            <span className="lp-premium-chip-dot" />
            API DEVELOPERS
          </div>
          <h1 style={{
            fontSize: 'clamp(22px, 5vw, 28px)',
            fontWeight: 800,
            color: '#f9fafb',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            LinkPay API
            <span style={{
              fontSize: '12px',
              background: 'rgba(99, 102, 241, 0.2)',
              color: '#a5b4fc',
              padding: '4px 10px',
              borderRadius: '999px',
              border: '1px solid rgba(99, 102, 241, 0.4)'
            }}>
              v1.0
            </span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>
            Construye sobre nuestra infraestructura de monetización.
          </p>
        </header>

        {/* API Key Card */}
        <div className="lp-premium-card lp-premium-card-blue" style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#f9fafb'
          }}>
            <Key size={18} color="#60a5fa" /> Tu API Key
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
            <input
              readOnly
              value="sk_live_51Mz...q8Z9 (Oculta)"
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.8)',
                fontFamily: 'monospace',
                color: '#94a3b8',
                padding: '14px 16px',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '12px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
            <button style={{
              background: 'rgba(99, 102, 241, 0.2)',
              color: '#a5b4fc',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              padding: '14px 20px',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              minHeight: '48px',
              transition: 'all 0.2s ease'
            }}>
              Regenerar
            </button>
          </div>
        </div>

        {/* Code Example Card */}
        <div className="lp-premium-card lp-premium-card-purple">
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#f9fafb'
          }}>
            <Terminal size={18} color="#a78bfa" /> Ejemplo: Crear Link
          </h3>
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '12px',
            padding: 'clamp(16px, 4vw, 24px)',
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}>
            <pre style={{
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              color: '#e2e8f0',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
              fontSize: 'clamp(11px, 2.5vw, 13px)'
            }}>
              {`curl -X POST https://api.linkpay.io/v1/links \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{
    "url": "https://youtube.com/watch?v=...",
    "alias": "mi-video-viral"
  }'`}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
