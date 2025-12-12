import React from 'react';
import { Copy, Key, Terminal } from 'lucide-react';

export function DevelopersPage() {
  const containerStyle: React.CSSProperties = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '24px 16px 140px 16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif'
  };

  const cardStyle: React.CSSProperties = {
    background: 'white',
    padding: 'clamp(20px, 4vw, 32px)',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
    marginBottom: '24px'
  };

  const codeBlockStyle: React.CSSProperties = {
    background: '#0F172A',
    borderRadius: '16px',
    padding: 'clamp(16px, 4vw, 24px)',
    color: '#F8FAFC',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
    fontSize: 'clamp(11px, 2.5vw, 13px)',
    overflowX: 'auto',
    border: '1px solid #334155',
    WebkitOverflowScrolling: 'touch'
  };

  return (
    <div className="animate-enter" style={containerStyle}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontSize: 'clamp(22px, 5vw, 28px)',
          fontWeight: 800,
          color: '#0F172A',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          LinkPay API
          <span style={{
            fontSize: '14px',
            background: '#EFF6FF',
            color: '#2563EB',
            padding: '4px 8px',
            borderRadius: '6px'
          }}>
            v1.0
          </span>
        </h1>
        <p style={{ color: '#64748B', fontSize: '15px' }}>
          Construye sobre nuestra infraestructura de monetización.
        </p>
      </div>

      <div style={cardStyle}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Key size={18} color="#64748B" /> Tu API Key
        </h3>
        <div style={{
          display: 'flex',
          gap: '12px',
          flexDirection: 'column'
        }}>
          <input
            readOnly
            value="sk_live_51Mz...q8Z9 (Oculta)"
            style={{
              width: '100%',
              background: '#F8FAFC',
              fontFamily: 'monospace',
              color: '#64748B',
              padding: '14px 16px',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
          <button style={{
            background: 'white',
            color: '#0F172A',
            border: '1px solid #E2E8F0',
            padding: '14px 20px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            minHeight: '48px'
          }}>
            Regenerar
          </button>
        </div>
      </div>

      <h3 style={{
        fontSize: '18px',
        fontWeight: 700,
        marginBottom: '16px',
        color: '#0F172A'
      }}>
        Ejemplo: Crear Link
      </h3>
      <div style={codeBlockStyle}>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {`curl -X POST https://api.linkpay.io/v1/links \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{
    "url": "https://youtube.com/watch?v=...",
    "alias": "mi-video-viral"
  }'`}
        </pre>
      </div>
    </div>
  );
}
