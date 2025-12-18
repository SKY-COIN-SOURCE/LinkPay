import{d as z,o as D,r as n,j as e,Z as k,p,l as Y,E as B,i as w,q as j,T as y,n as O,f as q}from"./index-Dsm589PJ.js";/* empty css                          */import{E as v}from"./eye-off-i4G3Ajpb.js";import{C as N}from"./copy-DWXU52ur.js";import{S as X}from"./shield-48c4Exnx.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],P=z("funnel",H);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],$=z("search",V);function W(){const{links:C,loading:L,refresh:c}=D(),[d,S]=n.useState(""),[E,A]=n.useState(0),x=n.useRef(0),[R,g]=n.useState(new Set),F=C.filter(a=>!R.has(a.id)),b=async a=>{if(window.confirm("¿Eliminar enlace?"))try{g(i=>new Set(i).add(a)),await O.deleteLink(a),c()}catch{g(s=>{const t=new Set(s);return t.delete(a),t}),alert("Error al eliminar.")}},m=a=>{navigator.clipboard.writeText(`${window.location.origin}/l/${a}`),alert("Copiado")},r=F.filter(a=>{var s;const i=d.toLowerCase();return((s=a.slug)==null?void 0:s.toLowerCase().includes(i))||a.original_url.toLowerCase().includes(i)}),h=r.length;n.useEffect(()=>{const a=x.current,i=h;if(a===i)return;const s=i-a,t=480,T=performance.now();let o;const u=_=>{const l=Math.min((_-T)/t,1),M=l<.5?2*l*l:-1+(4-2*l)*l,I=Math.round(a+s*M);A(I),l<1?o=requestAnimationFrame(u):x.current=i};return o=requestAnimationFrame(u),()=>cancelAnimationFrame(o)},[h]);const f=a=>{const i={lite:{bg:"rgba(16,185,129,0.16)",color:"#6EE7B7",border:"rgba(16,185,129,0.7)",icon:e.jsx(X,{size:12})},standard:{bg:"rgba(59,130,246,0.18)",color:"#BFDBFE",border:"rgba(59,130,246,0.7)",icon:e.jsx(k,{size:12})},turbo:{bg:"rgba(249,115,22,0.16)",color:"#FED7AA",border:"rgba(249,115,22,0.7)",icon:e.jsx(q,{size:12})}},s=i[a]||i.standard;return e.jsxs("span",{className:"lp-links-mode",style:{background:s.bg,color:s.color,borderColor:s.border},children:[s.icon,a]})};return e.jsxs("div",{className:"lp-links-shell lp-premium-bg",children:[e.jsx("style",{children:Z}),e.jsxs("div",{className:"lp-links-inner lp-premium-inner",children:[e.jsxs("section",{className:"lp-links-card lp-links-card-filters",children:[e.jsxs("div",{className:"lp-links-filters-row",children:[e.jsxs("div",{className:"lp-links-search",children:[e.jsx($,{className:"lp-links-search-icon",size:16}),e.jsx("input",{placeholder:"Buscar por slug o URL…",value:d,onChange:a=>S(a.target.value)})]}),e.jsxs("button",{type:"button",onClick:c,className:"lp-links-refresh",children:[e.jsx(k,{size:16}),"Refrescar"]})]}),e.jsxs("div",{className:"lp-links-meta",children:[e.jsxs("span",{className:"lp-links-count",children:[e.jsx("span",{className:"lp-links-count-glow"}),e.jsx("strong",{children:E}),e.jsx("span",{className:"lp-links-count-label",children:"enlaces visibles"})]}),e.jsxs("span",{className:"lp-links-meta-pill",children:[e.jsx(P,{size:12}),"Filtro instantáneo"]})]})]}),e.jsxs("section",{className:"lp-links-card lp-links-card-main",children:[e.jsxs("div",{className:"lp-links-card-header",children:[e.jsx("div",{className:"lp-links-card-icon",children:e.jsx(p,{size:18})}),e.jsxs("div",{className:"lp-links-card-title",children:[e.jsx("h3",{children:"Todos tus enlaces"}),e.jsx("p",{children:"Vista avanzada con visitas, revenue y modo de monetización de cada Smart Link."})]})]}),L?e.jsxs("div",{className:"lp-links-loading",children:[e.jsx("div",{className:"lp-links-orb",children:e.jsx(Y,{size:22,className:"spin"})}),e.jsx("p",{children:"Cargando enlaces…"})]}):r.length===0?e.jsxs("div",{className:"lp-links-empty",children:[e.jsx("div",{className:"lp-links-empty-icon",children:e.jsx(B,{size:24})}),e.jsx("p",{className:"lp-links-empty-title",children:"No hay enlaces aún."}),e.jsxs("p",{className:"lp-links-empty-sub",children:["Crea tu primer Smart Link desde la pestaña ",e.jsx("strong",{children:"Crear Link"}),"."]})]}):e.jsxs("div",{className:"lp-links-table-wrapper",children:[e.jsxs("table",{className:"lp-links-table lp-desktop-only",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Enlace"}),e.jsx("th",{children:"Modo"}),e.jsx("th",{children:"Visitas"}),e.jsx("th",{children:"Revenue"}),e.jsx("th",{className:"lp-th-right",children:"Acciones"})]})}),e.jsx("tbody",{children:r.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs("div",{className:"lp-link-main",children:[e.jsxs("div",{className:"lp-link-slug-row",children:[e.jsxs("span",{className:"lp-link-slug",children:["/",a.slug]}),a.password&&e.jsx(w,{size:12,className:"lp-link-flag lp-link-flag-orange"}),a.expires_at&&e.jsx(j,{size:12,className:"lp-link-flag lp-link-flag-red"}),a.is_private&&e.jsx(v,{size:12,className:"lp-link-flag lp-link-flag-purple"})]}),e.jsx("span",{className:"lp-link-url",children:a.original_url})]})}),e.jsx("td",{children:f(a.monetization_mode||"standard")}),e.jsx("td",{children:e.jsxs("div",{className:"lp-link-visits",children:[e.jsx(p,{size:15}),a.views]})}),e.jsx("td",{children:e.jsxs("div",{className:"lp-link-revenue",children:["€",(a.earnings||0).toFixed(4)]})}),e.jsx("td",{className:"lp-td-right",children:e.jsxs("div",{className:"lp-link-actions",children:[e.jsx("button",{type:"button",onClick:()=>m(a.slug),className:"lp-btn-ghost",children:e.jsx(N,{size:15})}),e.jsx("button",{type:"button",onClick:()=>b(a.id),className:"lp-btn-danger",children:e.jsx(y,{size:15})})]})})]},a.id))})]}),e.jsx("div",{className:"lp-links-list lp-mobile-only",children:r.map(a=>e.jsxs("div",{className:"lp-link-card",children:[e.jsxs("div",{className:"lp-link-card-top",children:[e.jsxs("div",{className:"lp-link-card-main",children:[e.jsxs("div",{className:"lp-link-slug-row",children:[e.jsxs("span",{className:"lp-link-slug",children:["/",a.slug]}),a.password&&e.jsx(w,{size:11,className:"lp-link-flag lp-link-flag-orange"}),a.expires_at&&e.jsx(j,{size:11,className:"lp-link-flag lp-link-flag-red"}),a.is_private&&e.jsx(v,{size:11,className:"lp-link-flag lp-link-flag-purple"})]}),e.jsx("span",{className:"lp-link-url lp-link-url-mobile",children:a.original_url})]}),e.jsx("div",{className:"lp-link-card-mode",children:f(a.monetization_mode||"standard")})]}),e.jsxs("div",{className:"lp-link-card-bottom",children:[e.jsxs("div",{className:"lp-link-card-stats",children:[e.jsxs("span",{className:"lp-chip-stat",children:[e.jsx(p,{size:12}),a.views," visitas"]}),e.jsxs("span",{className:"lp-chip-money",children:["€",(a.earnings||0).toFixed(4)]})]}),e.jsxs("div",{className:"lp-link-card-actions",children:[e.jsx("button",{type:"button",onClick:()=>m(a.slug),className:"lp-btn-ghost",children:e.jsx(N,{size:14})}),e.jsx("button",{type:"button",onClick:()=>b(a.id),className:"lp-btn-danger",children:e.jsx(y,{size:14})})]})]})]},a.id))})]})]})]})]})}const Z=`
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

  .lp-links-shell {
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

  /* respetar sidebar en escritorio */
  @media (min-width: 769px) {
    .lp-links-shell {
      left: 260px;
    }
  }

  .lp-links-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1080px;
    padding: 26px 16px 100px 16px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    color: #e5e7eb;
  }

  /* HEADER */
  .lp-links-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .lp-links-header p {
    margin: 6px 0 0 0;
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
    box-shadow: 0 0 0 3px rgba(34,197,94,0.35);
  }

  @keyframes lp-chip-glow {
    0%,100% {
      box-shadow:
        0 0 0 1px rgba(15,23,42,0.9),
        0 0 12px rgba(59,130,246,0.4);
    }
    50% {
      box-shadow:
        0 0 0 1px rgba(129,140,248,0.9),
        0 0 24px rgba(129,140,248,0.9);
    }
  }

  /* CARDS */
  .lp-links-card {
    position: relative;
    border-radius: 22px;
    border: 1px solid rgba(148, 163, 184, 0.7);
    background: radial-gradient(circle at top, rgba(15,23,42,0.98), rgba(15,23,42,0.96));
    box-shadow:
      0 20px 60px rgba(0,0,0,0.95),
      0 0 0 1px rgba(15,23,42,0.9);
    padding: 16px 16px 18px;
    margin-bottom: 18px;
    overflow: hidden;
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    transition:
      transform 0.22s cubic-bezier(0.22, 0.61, 0.36, 1),
      box-shadow 0.22s ease,
      border-color 0.22s ease;
  }

  .lp-links-card::before {
    content: "";
    position: absolute;
    inset: -120px;
    background:
      radial-gradient(circle at 0% 0%, rgba(59,130,246,0.35), transparent 55%),
      radial-gradient(circle at 100% 100%, rgba(129,140,248,0.25), transparent 55%);
    opacity: 0.6;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  .lp-links-card-main {
    animation: lp-card-float 10s ease-in-out infinite;
  }

  @keyframes lp-card-float {
    0%,100% { transform: translateY(-1px); }
    50% { transform: translateY(2px); }
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
    color: #e5e7eb;
    font-size: 13px;
  }

  .lp-link-flag-orange { color: #fdba74; }
  .lp-link-flag-red { color: #fca5a5; }
  .lp-link-flag-purple { color: #c4b5fd; }

  .lp-link-url {
    font-size: 11px;
    color: #9ca3af;
    max-width: 260px;
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
    width: 28px;
    height: 28px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    background: rgba(15,23,42,0.98);
    color: #e5e7eb;
    cursor: pointer;
    transition: all 0.18s ease-out;
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 10px 24px rgba(15,23,42,0.9);
  }

  .lp-btn-ghost svg { color: #bfdbfe; }
  .lp-btn-danger svg { color: #fecaca; }

  .lp-btn-ghost:hover {
    border-color: rgba(129,140,248,0.9);
    box-shadow:
      0 0 0 1px rgba(129,140,248,0.95),
      0 0 22px rgba(79,70,229,0.9);
  }

  .lp-btn-danger:hover {
    border-color: rgba(248,113,113,0.9);
    box-shadow:
      0 0 0 1px rgba(248,113,113,0.95),
      0 0 22px rgba(248,113,113,0.9);
  }

  .lp-links-mode {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 999px;
    border-width: 1px;
    border-style: solid;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  /* LISTA MOBILE */
  .lp-links-list {
    margin-top: 6px;
    display: none;
  }

  .lp-link-card {
    border-radius: 16px;
    padding: 10px 10px 10px;
    margin-bottom: 12px;
    border: 1px solid rgba(30,64,175,0.8);
    background: radial-gradient(circle at 0% 0%, rgba(30,64,175,0.7), rgba(15,23,42,0.96));
    box-shadow:
      0 16px 40px rgba(15,23,42,1),
      0 0 0 1px rgba(15,23,42,1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .lp-link-card:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow:
      0 22px 60px rgba(15,23,42,1),
      0 0 0 1px rgba(191,219,254,0.7);
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
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .lp-link-card-stats {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    align-items: center;
  }

  .lp-chip-stat,
  .lp-chip-money {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 600;
  }

  .lp-chip-stat {
    background: rgba(15,23,42,0.96);
    border: 1px solid rgba(148,163,184,0.7);
    color: #cbd5f5;
  }

  .lp-chip-stat svg {
    color: #9ca3af;
  }

  .lp-chip-money {
    background: rgba(22,163,74,0.16);
    border: 1px solid rgba(34,197,94,0.8);
    color: #bbf7d0;
  }

  .lp-link-card-actions {
    display: inline-flex;
    gap: 6px;
  }

  /* RESPONSIVE */
  .lp-desktop-only { display: table; }
  .lp-mobile-only { display: none; }

  @media (max-width: 900px) {
    .lp-links-inner {
      max-width: 100%;
      padding: 20px 16px 140px 16px;
    }
  }

  @media (max-width: 768px) {
    .lp-links-shell {
      left: 0;
    }
    .lp-desktop-only { display: none; }
    .lp-mobile-only { display: block; }

    .lp-links-filters-row {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }

    .lp-links-search {
      max-width: 100%;
    }

    .lp-links-search input {
      padding: 14px 14px 14px 38px;
      font-size: 16px;
      border-radius: 14px;
    }

    .lp-links-refresh {
      justify-content: center;
      width: 100%;
      padding: 14px;
      border-radius: 14px;
    }

    .lp-links-meta {
      font-size: 11px;
      align-items: flex-start;
      flex-direction: column;
      gap: 10px;
    }

    .lp-links-meta-pill {
      width: 100%;
      justify-content: center;
      padding: 8px 12px;
    }

    .lp-link-card {
      padding: 14px;
      margin-bottom: 12px;
    }

    .lp-btn-ghost,
    .lp-btn-danger {
      width: 44px;
      height: 44px;
    }

    .lp-chip-stat,
    .lp-chip-money {
      padding: 6px 10px;
      font-size: 11px;
    }
  }
`;export{W as LinksPage};
