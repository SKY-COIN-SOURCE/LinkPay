import React from 'react';
import { Copy, Key, Terminal } from 'lucide-react';

export function DevelopersPage() {
  return (
    <div className="animate-enter" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="font-heading" style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
          LinkPay API <span style={{ fontSize: '14px', background: '#EFF6FF', color: '#2563EB', padding: '4px 8px', borderRadius: '6px', verticalAlign: 'middle' }}>v1.0</span>
        </h1>
        <p style={{ color: '#64748B', fontSize: '16px' }}>
          Construye sobre nuestra infraestructura de monetización.
        </p>
      </div>

      <div className="card-panel" style={{ background: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '32px' }}>
         <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
           <Key size={18} color="#64748B" /> Tu API Key
         </h3>
         <div style={{ display: 'flex', gap: '12px' }}>
            <input 
              readOnly 
              value="sk_live_51Mz...q8Z9 (Oculta)" 
              className="input-field"
              style={{ background: '#F8FAFC', fontFamily: 'monospace', color: '#64748B' }}
            />
            <button className="btn-primary" style={{ background: 'white', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: 'none' }}>Regenerar</button>
         </div>
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#0F172A' }}>Ejemplo: Crear Link</h3>
      <div style={{ background: '#0F172A', borderRadius: '16px', padding: '24px', color: '#F8FAFC', fontFamily: 'monospace', fontSize: '13px', overflowX: 'auto', border: '1px solid #334155' }}>
<pre style={{ margin: 0 }}>
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
