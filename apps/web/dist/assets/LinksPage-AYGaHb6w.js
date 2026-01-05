import{c as B,p as Y,f as P,q as H,r as i,j as e,Z as y,n as X,E as q,k as j,t as w,v,T as N,o as G,h as K}from"./index-bP9XCf2U.js";/* empty css                          */import{E as z}from"./eye-off-Ced-V18Z.js";import{C}from"./copy-DLIt70zg.js";import{S as V}from"./shield-BptzWwQp.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],$=B("search",Z);function re(){const{links:E,loading:S,refresh:d}=Y(),o=P(),{confirm:L,ConfirmDialog:T}=H(),[x,A]=i.useState(""),[R,I]=i.useState(0),g=i.useRef(0),[M,b]=i.useState(new Set),D=E.filter(a=>!M.has(a.id)),f=async a=>{if(await L("¿Eliminar enlace?","Esta acción no se puede deshacer. El enlace dejará de funcionar inmediatamente.","danger"))try{b(r=>new Set(r).add(a)),await G.deleteLink(a),d(),o.success("Enlace eliminado correctamente")}catch{b(p=>{const t=new Set(p);return t.delete(a),t}),o.error("Error al eliminar el enlace")}},m=a=>{navigator.clipboard.writeText(`${window.location.origin}/l/${a}`),o.success("¡Enlace copiado al portapapeles!")},s=D.filter(a=>{var r;const n=x.toLowerCase();return((r=a.slug)==null?void 0:r.toLowerCase().includes(n))||a.original_url.toLowerCase().includes(n)}),h=s.length;i.useEffect(()=>{const a=g.current,n=h;if(a===n)return;const r=n-a,p=480,t=performance.now();let c;const k=F=>{const l=Math.min((F-t)/p,1),_=l<.5?2*l*l:-1+(4-2*l)*l,O=Math.round(a+r*_);I(O),l<1?c=requestAnimationFrame(k):g.current=n};return c=requestAnimationFrame(k),()=>cancelAnimationFrame(c)},[h]);const u=a=>{const n={lite:{bg:"rgba(16,185,129,0.16)",color:"#6EE7B7",border:"rgba(16,185,129,0.7)",icon:e.jsx(V,{size:12})},standard:{bg:"rgba(59,130,246,0.18)",color:"#BFDBFE",border:"rgba(59,130,246,0.7)",icon:e.jsx(y,{size:12})},turbo:{bg:"rgba(249,115,22,0.16)",color:"#FED7AA",border:"rgba(249,115,22,0.7)",icon:e.jsx(K,{size:12})}},r=n[a]||n.standard;return e.jsxs("span",{className:"lp-links-mode",style:{background:r.bg,color:r.color,borderColor:r.border},children:[r.icon,a]})};return e.jsxs("div",{className:"lp-links-shell",children:[e.jsx("style",{children:W}),e.jsx(T,{}),e.jsxs("div",{className:"lp-links-inner",children:[e.jsxs("div",{className:"lp-search-container",children:[e.jsxs("div",{className:"lp-search-bar",children:[e.jsx($,{className:"lp-search-icon",size:18}),e.jsx("input",{placeholder:"Buscar enlaces...",value:x,onChange:a=>A(a.target.value)})]}),e.jsx("button",{type:"button",onClick:d,className:"lp-refresh-btn",children:e.jsx(y,{size:16})})]}),e.jsx("div",{className:"lp-stats-row",children:e.jsxs("span",{className:"lp-stat-count",children:[e.jsx("strong",{children:R})," enlaces"]})}),S?e.jsxs("div",{className:"lp-loading-state",children:[e.jsx(X,{size:24,className:"spin"}),e.jsx("span",{children:"Cargando..."})]}):s.length===0?e.jsxs("div",{className:"lp-empty-state",children:[e.jsx(q,{size:32}),e.jsx("p",{children:"No hay enlaces aún"}),e.jsx("span",{children:'Crea tu primer link desde "Crear Link"'})]}):e.jsxs("div",{className:"lp-links-list",children:[e.jsxs("table",{className:"lp-links-table lp-desktop-only",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Enlace"}),e.jsx("th",{children:"Modo"}),e.jsx("th",{children:"Visitas"}),e.jsx("th",{children:"Revenue"}),e.jsx("th",{className:"lp-th-right",children:"Acciones"})]})}),e.jsx("tbody",{children:s.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs("div",{className:"lp-link-main",children:[e.jsxs("div",{className:"lp-link-slug-row",children:[e.jsxs("span",{className:"lp-link-slug",children:["/",a.slug]}),a.password&&e.jsx(j,{size:12,className:"lp-link-flag lp-link-flag-orange"}),a.expires_at&&e.jsx(w,{size:12,className:"lp-link-flag lp-link-flag-red"}),a.is_private&&e.jsx(z,{size:12,className:"lp-link-flag lp-link-flag-purple"})]}),e.jsx("span",{className:"lp-link-url",children:a.original_url})]})}),e.jsx("td",{children:u(a.monetization_mode||"standard")}),e.jsx("td",{children:e.jsxs("div",{className:"lp-link-visits",children:[e.jsx(v,{size:15}),a.views]})}),e.jsx("td",{children:e.jsxs("div",{className:"lp-link-revenue",children:["€",(a.earnings||0).toFixed(4)]})}),e.jsx("td",{className:"lp-td-right",children:e.jsxs("div",{className:"lp-link-actions",children:[e.jsx("button",{type:"button",onClick:()=>m(a.slug),className:"lp-btn-ghost",children:e.jsx(C,{size:15})}),e.jsx("button",{type:"button",onClick:()=>f(a.id),className:"lp-btn-danger",children:e.jsx(N,{size:15})})]})})]},a.id))})]}),e.jsx("div",{className:"lp-links-list lp-mobile-only",children:s.map(a=>e.jsxs("div",{className:"lp-link-card",children:[e.jsxs("div",{className:"lp-link-card-top",children:[e.jsxs("div",{className:"lp-link-card-main",children:[e.jsxs("div",{className:"lp-link-slug-row",children:[e.jsxs("span",{className:"lp-link-slug",children:["/",a.slug]}),a.password&&e.jsx(j,{size:11,className:"lp-link-flag lp-link-flag-orange"}),a.expires_at&&e.jsx(w,{size:11,className:"lp-link-flag lp-link-flag-red"}),a.is_private&&e.jsx(z,{size:11,className:"lp-link-flag lp-link-flag-purple"})]}),e.jsx("span",{className:"lp-link-url lp-link-url-mobile",children:a.original_url})]}),e.jsx("div",{className:"lp-link-card-mode",children:u(a.monetization_mode||"standard")})]}),e.jsxs("div",{className:"lp-link-card-bottom",children:[e.jsxs("div",{className:"lp-link-card-stats",children:[e.jsxs("span",{className:"lp-chip-stat",children:[e.jsx(v,{size:12}),a.views," visitas"]}),e.jsxs("span",{className:"lp-chip-money",children:["€",(a.earnings||0).toFixed(4)]})]}),e.jsxs("div",{className:"lp-link-card-actions",children:[e.jsx("button",{type:"button",onClick:()=>m(a.slug),className:"lp-btn-ghost",children:e.jsx(C,{size:14})}),e.jsx("button",{type:"button",onClick:()=>f(a.id),className:"lp-btn-danger",children:e.jsx(N,{size:14})})]})]})]},a.id))})]})]})]})}const W=`
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
      radial-gradient(circle at 100% 100%, #020617 0, #000 65%);
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
      radial-gradient(circle at 20% 0%, rgba(56,189,248,0.15), transparent 60%),
      radial-gradient(circle at 80% 100%, rgba(129,140,248,0.16), transparent 55%);
    opacity: 0.9;
    filter: blur(32px);
    pointer-events: none;
    animation: lp-nebula 22s ease-in-out infinite alternate;
  }
  .lp-bg::after {
    background:
      radial-gradient(circle at 0% 100%, rgba(34,197,94,0.18), transparent 55%),
      radial-gradient(circle at 100% 0%, rgba(59,130,246,0.16), transparent 55%);
    mix-blend-mode: screen;
    animation: lp-orbit 32s linear infinite;
  }
  @keyframes lp-nebula {
    0% { transform: translate3d(-10px,-10px,0) scale(1); opacity: 0.85; }
    100% { transform: translate3d(20px,10px,0) scale(1.08); opacity: 1; }
  }
  @keyframes lp-orbit {
    0% { transform: rotate(0deg) scale(1.04); }
    100% { transform: rotate(360deg) scale(1.04); }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     SHELL & INNER - Transparent, inherits LinksHub background
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-links-shell {
    position: relative;
    background: transparent;
    z-index: 1;
  }

  .lp-links-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro', system-ui, sans-serif;
    color: #e5e7eb;
    background: transparent;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     SEARCH BAR - Modern, minimal glassmorphism
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-search-container {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
  }

  .lp-search-bar {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: rgba(30, 20, 28, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(251, 113, 133, 0.2);
    border-radius: 14px;
    transition: all 0.25s;
  }

  .lp-search-bar:focus-within {
    border-color: rgba(251, 113, 133, 0.5);
    box-shadow: 0 0 30px rgba(251, 113, 133, 0.15);
  }

  .lp-search-icon {
    color: #fda4af;
    flex-shrink: 0;
  }

  .lp-search-bar input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 15px;
    color: #fff;
  }

  .lp-search-bar input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .lp-refresh-btn {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(30, 20, 28, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(251, 113, 133, 0.2);
    border-radius: 14px;
    color: #fda4af;
    cursor: pointer;
    transition: all 0.25s;
  }

  .lp-refresh-btn:hover {
    border-color: rgba(251, 113, 133, 0.5);
    background: rgba(251, 113, 133, 0.15);
  }

  .lp-refresh-btn:active {
    transform: scale(0.95);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     STATS ROW - Clean, minimal
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-stats-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 0 4px;
  }

  .lp-stat-count {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
  }

  .lp-stat-count strong {
    color: #fda4af;
    font-weight: 700;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     LOADING & EMPTY STATES
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-loading-state,
  .lp-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 60px 20px;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
  }

  .lp-loading-state svg {
    color: #fda4af;
  }

  .lp-empty-state svg {
    color: #fda4af;
    opacity: 0.5;
  }

  .lp-empty-state p {
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }

  .lp-empty-state span {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     LINKS LIST - Clean container
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-links-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .lp-links-card:hover {
    transform: translateY(-3px) scale(1.005);
    box-shadow:
      0 30px 80px rgba(0,0,0,1),
      0 0 0 1px rgba(191,219,254,0.6);
    border-color: rgba(191,219,254,0.75);
  }

  /* FILTROS */
  .lp-links-filters-row {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .lp-links-search {
    position: relative;
    flex: 1 1 0;
    min-width: 0;
    max-width: 360px;
  }

  .lp-links-search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
  }

  .lp-links-search input {
    width: 100%;
    padding: 10px 12px 10px 30px;
    border-radius: 999px;
    border: 1px solid rgba(148,163,184,0.8);
    background: rgba(15,23,42,0.96);
    color: #e5e7eb;
    font-size: 13px;
    outline: none;
    box-shadow:
      0 0 0 1px rgba(15,23,42,0.95),
      0 10px 30px rgba(15,23,42,0.9);
  }

  .lp-links-search input::placeholder {
    color: #6b7280;
  }

  .lp-links-search input:focus {
    border-color: rgba(129,140,248,0.9);
    box-shadow:
      0 0 0 1px rgba(129,140,248,0.9),
      0 0 24px rgba(79,70,229,0.8);
  }

  .lp-links-refresh {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba(56,189,248,0.8);
    background: radial-gradient(circle at 0% 0%, rgba(56,189,248,0.2), rgba(15,23,42,0.98));
    color: #e0f2fe;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 10px 30px rgba(15,23,42,0.9);
    transition: all 0.18s ease-out;
  }

  .lp-links-refresh svg {
    color: #7dd3fc;
  }

  .lp-links-refresh:hover {
    transform: translateY(-1px);
    box-shadow:
      0 18px 40px rgba(8,47,73,1),
      0 0 24px rgba(56,189,248,0.75);
  }

  .lp-links-meta {
    margin-top: 10px;
    font-size: 11px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #9ca3af;
    gap: 8px;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }

  /* 🔥 contador con glow + pulso */
  .lp-links-count {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 999px;
    background: radial-gradient(circle at 0% 0%, rgba(37,99,235,0.4), rgba(15,23,42,0.96));
    border: 1px solid rgba(129,140,248,0.9);
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 0 22px rgba(79,70,229,0.8);
    overflow: hidden;
    animation: lp-count-pulse 3.4s ease-in-out infinite;
  }

  .lp-links-count-glow {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(56,189,248,0.2), transparent, rgba(129,140,248,0.3));
    opacity: 0.7;
    mix-blend-mode: screen;
    transform: translateX(-40%);
    animation: lp-count-sheen 5s linear infinite;
    pointer-events: none;
  }

  .lp-links-count strong {
    position: relative;
    font-variant-numeric: tabular-nums;
    font-size: 13px;
    font-weight: 800;
    color: #e0f2fe;
  }

  .lp-links-count-label {
    position: relative;
    font-size: 11px;
    color: #cbd5f5;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  @keyframes lp-count-pulse {
    0%,100% {
      transform: translateY(0);
      box-shadow:
        0 0 0 1px rgba(15,23,42,1),
        0 0 18px rgba(79,70,229,0.7);
    }
    50% {
      transform: translateY(-1px);
      box-shadow:
        0 0 0 1px rgba(129,140,248,1),
        0 0 28px rgba(129,140,248,1);
    }
  }

  @keyframes lp-count-sheen {
    0% { transform: translateX(-60%); opacity: 0; }
    10% { opacity: 0.8; }
    50% { transform: translateX(60%); opacity: 0.5; }
    100% { transform: translateX(120%); opacity: 0; }
  }

  .lp-links-meta-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 999px;
    border: 1px solid rgba(148,163,184,0.7);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #cbd5f5;
    background: rgba(15,23,42,0.96);
  }

  .lp-links-meta-pill svg {
    color: #9ca3af;
  }

  /* CARD HEADER LISTADO */
  .lp-links-card-header {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 12px;
  }

  .lp-links-card-icon {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 30% 0%, #6366f1, #1e293b);
    color: #e0e7ff;
    box-shadow:
      0 14px 30px rgba(15,23,42,0.95),
      0 0 0 1px rgba(15,23,42,1);
  }

  .lp-links-card-title h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 800;
    color: #f9fafb;
  }

  .lp-links-card-title p {
    margin: 2px 0 0 0;
    font-size: 12px;
    color: #9ca3af;
  }

  /* LOADING / EMPTY */
  .lp-links-loading,
  .lp-links-empty {
    position: relative;
    z-index: 1;
    border-radius: 18px;
    border: 1px dashed rgba(148,163,184,0.7);
    background: rgba(15,23,42,0.97);
    padding: 26px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    text-align: center;
  }

  .lp-links-orb {
    width: 48px;
    height: 48px;
    border-radius: 999px;
    background: radial-gradient(circle at 30% 0, #6366f1, #22c55e);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 0 0 1px rgba(191,219,254,0.5),
      0 18px 42px rgba(15,23,42,1);
    margin-bottom: 10px;
  }

  .lp-links-orb svg {
    color: #e5f2ff;
  }

  .lp-links-loading p {
    margin: 0;
    font-size: 13px;
  }

  .lp-links-empty-icon {
    width: 42px;
    height: 42px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15,23,42,0.98);
    box-shadow:
      0 10px 26px rgba(15,23,42,0.95),
      0 0 0 1px rgba(30,64,175,0.8);
    margin-bottom: 10px;
  }

  .lp-links-empty-icon svg {
    color: #64748b;
  }

  .lp-links-empty-title {
    margin: 0 0 4px 0;
    font-size: 13px;
    font-weight: 600;
    color: #e5e7eb;
  }

  .lp-links-empty-sub {
    margin: 0;
    font-size: 11px;
    color: #9ca3af;
  }

  /* TABLA ESCRITORIO */
  .lp-links-table-wrapper {
    position: relative;
    z-index: 1;
    margin-top: 4px;
  }

  .lp-links-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    color: #e5e7eb;
  }

  .lp-links-table thead tr {
    background: radial-gradient(circle at 0% 0%, rgba(30,64,175,0.7), rgba(15,23,42,0.98));
  }

  .lp-links-table th,
  .lp-links-table td {
    padding: 10px 12px;
  }

  .lp-links-table th {
    text-align: left;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #9ca3af;
    border-bottom: 1px solid rgba(51,65,85,0.8);
  }

  .lp-links-table tbody tr {
    border-bottom: 1px solid rgba(30,41,59,0.95);
    transition: background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
  }

  .lp-links-table tbody tr:hover {
    background: radial-gradient(circle at 0% 0%, rgba(30,64,175,0.55), rgba(15,23,42,0.96));
    transform: translateY(-1px);
    box-shadow: 0 0 0 1px rgba(129,140,248,0.6);
  }

  .lp-th-right,
  .lp-td-right {
    text-align: right;
  }

  .lp-link-main {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .lp-link-slug-row {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .lp-link-slug {
    font-weight: 700;
    color: #fff;
    font-size: 14px;
  }

  .lp-link-flag-orange { color: #fb923c; }
  .lp-link-flag-red { color: #fda4af; }
  .lp-link-flag-purple { color: #f472b6; }

  .lp-link-url {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    max-width: 280px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lp-link-visits {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: #cbd5f5;
    font-weight: 500;
  }

  .lp-link-visits svg {
    color: #9ca3af;
  }

  .lp-link-revenue {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    font-weight: 700;
    color: #4ade80;
    font-size: 12px;
  }

  .lp-link-actions {
    display: inline-flex;
    gap: 6px;
    justify-content: flex-end;
  }

  .lp-btn-ghost,
  .lp-btn-danger {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(251, 113, 133, 0.15);
    background: rgba(30, 20, 28, 0.6);
    color: #e5e7eb;
    cursor: pointer;
    transition: all 0.2s ease-out;
  }

  .lp-btn-ghost svg { color: #fda4af; }
  .lp-btn-danger svg { color: #fca5a5; }

  .lp-btn-ghost:hover {
    border-color: rgba(251, 113, 133, 0.5);
    background: rgba(251, 113, 133, 0.15);
  }

  .lp-btn-danger:hover {
    border-color: rgba(248, 113, 113, 0.6);
    background: rgba(248, 113, 113, 0.2);
  }

  .lp-links-mode {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     MOBILE LINK CARDS - Transparent Premium Design (Coral/Pink palette)
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-link-card {
    position: relative;
    border-radius: 16px;
    padding: 16px;
    /* TRANSPARENT glassmorphism - see the vibrant background through */
    background: rgba(30, 20, 28, 0.5);
    backdrop-filter: blur(16px) saturate(1.3);
    -webkit-backdrop-filter: blur(16px) saturate(1.3);
    border: 1px solid rgba(251, 113, 133, 0.2);
    box-shadow:
      0 0 30px rgba(251, 113, 133, 0.08),
      0 8px 32px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .lp-link-card:hover {
    border-color: rgba(251, 113, 133, 0.4);
    background: rgba(30, 20, 28, 0.6);
    transform: translateY(-2px);
    box-shadow:
      0 0 50px rgba(251, 113, 133, 0.12),
      0 16px 48px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .lp-link-card:active {
    transform: scale(0.98);
  }

  .lp-link-card-top {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: flex-start;
  }

  .lp-link-card-main {
    min-width: 0;
  }

  .lp-link-url-mobile {
    max-width: 100%;
  }

  .lp-link-card-mode {
    flex-shrink: 0;
  }

  .lp-link-card-bottom {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(251, 113, 133, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .lp-link-card-stats {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
  }

  .lp-chip-stat,
  .lp-chip-money {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 6px 10px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
  }

  .lp-chip-stat {
    background: rgba(30, 20, 28, 0.7);
    border: 1px solid rgba(251, 113, 133, 0.15);
    color: rgba(255, 255, 255, 0.8);
  }

  .lp-chip-stat svg {
    color: #fda4af;
  }

  .lp-chip-money {
    background: rgba(34, 197, 94, 0.15);
    border: 1px solid rgba(34, 197, 94, 0.3);
    color: #86efac;
  }

  .lp-link-card-actions {
    display: inline-flex;
    gap: 6px;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     RESPONSIVE - Mobile First
     ═══════════════════════════════════════════════════════════════════════════ */

  /* Desktop */
  .lp-desktop-only { display: table; }
  .lp-mobile-only { display: none; }

  /* Tablet */
  @media (max-width: 900px) {
    .lp-desktop-only { display: none; }
    .lp-mobile-only { display: flex; flex-direction: column; gap: 12px; }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .lp-search-bar {
      padding: 14px 16px;
    }

    .lp-search-bar input {
      font-size: 16px;
    }

    .lp-refresh-btn {
      width: 52px;
      height: 52px;
    }

    .lp-link-card {
      padding: 14px;
    }

    .lp-btn-ghost,
    .lp-btn-danger {
      width: 40px;
      height: 40px;
    }

    .lp-chip-stat,
    .lp-chip-money {
      padding: 7px 12px;
      font-size: 11px;
    }
  }
`;export{re as LinksPage};
