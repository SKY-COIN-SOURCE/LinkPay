import{r as t,$ as f,s as x,j as e,b as N,U as z}from"./index-CFKtuD05.js";import{N as g}from"./network-BX9dze1_.js";import{S as C}from"./share-2-CXuuxxkc.js";import{C as R}from"./copy-CUj1gJhI.js";function A(){const[s,h]=t.useState(null),[m,u]=t.useState(!0),[l,v]=t.useState(""),[w,o]=t.useState(0);t.useEffect(()=>{j()},[]);const j=async()=>{try{const r=await f.getMyReferralCode();v(r||"");const i=await f.getNetwork();h(i||null);const{data:{user:a}}=await x.auth.getUser();if(a){const{data:n}=await x.from("profiles").select("referral_earnings").eq("id",a.id).single();o(Number((n==null?void 0:n.referral_earnings)||0))}else o(0)}catch(r){console.error(r)}finally{u(!1)}},k=()=>{if(!l)return;const r=`${window.location.origin}/register?ref=${l}`;navigator.clipboard.writeText(r),alert("Enlace copiado")};function p(r){if(!r)return 0;let i=r.children?r.children.length:0;if(r.children&&r.children.length>0)for(const a of r.children)i+=p(a);return i}const y=p(s),d=({node:r,isRoot:i})=>{var a,n;return e.jsxs("div",{className:"lp-ref-node",children:[e.jsxs("div",{className:`lp-ref-node-card ${i?"is-root":""}`,children:[e.jsx("div",{className:"lp-ref-node-avatar",children:r.avatar_url?e.jsx("img",{src:r.avatar_url,alt:r.username||"user"}):e.jsx("div",{className:"lp-ref-node-avatar-fallback",children:((n=(a=(r.username||"?")[0])==null?void 0:a.toUpperCase)==null?void 0:n.call(a))||"?"})}),e.jsxs("div",{className:"lp-ref-node-text",children:[e.jsxs("span",{className:"lp-ref-node-username",children:["@",r.username]}),e.jsxs("span",{className:"lp-ref-node-earnings",children:["€",Number(r.total_earnings||0).toFixed(2)]})]}),!i&&e.jsx("span",{className:`lp-ref-node-badge lp-ref-node-badge-l${r.level}`,children:r.level===1?"10%":"5%"})]}),r.children&&r.children.length>0&&e.jsx("div",{className:"lp-ref-children",children:r.children.map(c=>e.jsxs("div",{className:"lp-ref-child-branch",children:[e.jsx("div",{className:"lp-ref-branch-line"}),e.jsx(d,{node:c})]},c.id))})]})};return m?e.jsxs("div",{className:"lp-ref-shell lp-ref-bg",children:[e.jsx("style",{children:b}),e.jsx("div",{className:"lp-ref-loading",children:e.jsx(N,{className:"lp-ref-spin",size:32})})]}):e.jsxs("div",{className:"lp-ref-shell lp-ref-bg",children:[e.jsx("style",{children:b}),e.jsxs("div",{className:"lp-ref-inner animate-enter",children:[e.jsxs("header",{className:"lp-ref-header",children:[e.jsxs("div",{className:"lp-ref-chip",children:[e.jsx("span",{className:"lp-ref-chip-dot"}),"CREATOR NETWORK"]}),e.jsxs("h1",{children:[e.jsx(g,{size:20}),"Creator referrals"]}),e.jsxs("p",{children:["Construye tu propia red de creadores. Ganas un"," ",e.jsx("strong",{children:"10%"})," de tus invitados directos y un"," ",e.jsx("strong",{children:"5%"})," de lo que generen sus invitados."]}),e.jsxs("div",{className:"lp-ref-kpis",children:[e.jsxs("div",{className:"lp-ref-kpi",children:[e.jsx("span",{className:"lp-ref-kpi-label",children:"Comisiones acumuladas"}),e.jsxs("div",{className:"lp-ref-kpi-value",children:[e.jsx("span",{className:"lp-ref-kpi-currency",children:"€"}),e.jsx("span",{children:w.toFixed(4)})]})]}),e.jsxs("div",{className:"lp-ref-kpi",children:[e.jsx("span",{className:"lp-ref-kpi-label",children:"Miembros en tu red"}),e.jsxs("div",{className:"lp-ref-kpi-value lp-ref-kpi-members",children:[e.jsx(z,{size:18}),e.jsx("span",{children:y})]})]})]})]}),e.jsxs("section",{className:"lp-ref-card lp-ref-invite",children:[e.jsxs("div",{className:"lp-ref-invite-left",children:[e.jsx("div",{className:"lp-ref-invite-icon",children:e.jsx(C,{size:18})}),e.jsxs("div",{children:[e.jsx("h3",{children:"Tu enlace único de invitación"}),e.jsx("p",{children:"Copia tu enlace y compártelo con otros creadores. Cada euro que generen queda conectado a tu red."})]})]}),e.jsx("div",{className:"lp-ref-invite-right",children:e.jsxs("div",{className:"lp-ref-link-box",children:[e.jsx("span",{className:"lp-ref-link-text",children:l?`${window.location.origin}/register?ref=${l}`:"Generando enlace..."}),e.jsxs("button",{type:"button",onClick:k,disabled:!l,className:"lp-ref-copy-btn",children:[e.jsx(R,{size:14}),"Copiar"]})]})})]}),e.jsxs("section",{className:"lp-ref-card lp-ref-network-card",children:[e.jsxs("div",{className:"lp-ref-network-header",children:[e.jsx("div",{className:"lp-ref-network-icon",children:e.jsx(g,{size:16})}),e.jsxs("div",{children:[e.jsx("h3",{children:"Mapa de tu red"}),e.jsx("p",{children:"Visualiza la estructura de tu red de referidos en vertical. Cada nivel baja un escalón."})]})]}),s?e.jsx("div",{className:"lp-ref-tree-wrapper",children:e.jsx(d,{node:s,isRoot:!0})}):e.jsxs("div",{className:"lp-ref-empty",children:[e.jsx("p",{className:"lp-ref-empty-title",children:"Todavía no tienes invitados."}),e.jsx("p",{className:"lp-ref-empty-sub",children:"Comparte tu enlace de invitación y el árbol se irá llenando automáticamente con cada nuevo creador."})]})]})]})]})}const b=`
  .lp-ref-spin {
    animation: lp-ref-spin 1s linear infinite;
  }
  @keyframes lp-ref-spin { 100% { transform: rotate(360deg); } }

  .lp-ref-bg {
    min-height: 100dvh;
    background:
      radial-gradient(circle at 0% 0%, #1e3a8a 0, transparent 55%),
      radial-gradient(circle at 100% 100%, #020617 0, #000 65%);
    background-color: #020617;
    position: relative;
    overflow: hidden;
  }

  .lp-ref-bg::before,
  .lp-ref-bg::after {
    content: "";
    position: absolute;
    inset: -40%;
    background:
      radial-gradient(circle at 10% 0%, rgba(56,189,248,0.16), transparent 60%),
      radial-gradient(circle at 90% 100%, rgba(129,140,248,0.18), transparent 55%);
    opacity: 0.9;
    filter: blur(26px);
    pointer-events: none;
  }
  .lp-ref-bg::after {
    background:
      radial-gradient(circle at 0% 100%, rgba(34,197,94,0.2), transparent 55%),
      radial-gradient(circle at 100% 0%, rgba(79,70,229,0.18), transparent 55%);
    mix-blend-mode: screen;
    animation: lp-ref-orbit 32s linear infinite;
  }
  @keyframes lp-ref-orbit {
    0% { transform: rotate(0deg) scale(1.02); }
    100% { transform: rotate(360deg) scale(1.02); }
  }

  .lp-ref-shell {
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
    .lp-ref-shell {
      left: 260px;
    }
  }

  .lp-ref-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1080px;
    padding: 24px 16px 110px 16px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    color: #e5e7eb;
  }

  .lp-ref-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100dvh;
    width: 100%;
  }

  .lp-ref-header {
    text-align: center;
    margin-bottom: 24px;
  }

  .lp-ref-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 999px;
    background: radial-gradient(circle at 0% 0%, rgba(37,99,235,0.9), rgba(15,23,42,0.98));
    border: 1px solid rgba(191,219,254,0.8);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #e5e7eb;
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 0 24px rgba(79,70,229,0.9);
    margin: 0 auto 10px;
    animation: lp-ref-chip-glow 4.2s ease-in-out infinite;
  }

  .lp-ref-chip-dot {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.3);
  }

  @keyframes lp-ref-chip-glow {
    0%,100% {
      box-shadow:
        0 0 0 1px rgba(15,23,42,1),
        0 0 18px rgba(79,70,229,0.6);
    }
    50% {
      box-shadow:
        0 0 0 1px rgba(129,140,248,1),
        0 0 28px rgba(129,140,248,1);
    }
  }

  .lp-ref-header h1 {
    margin: 0;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -0.04em;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #f9fafb;
  }

  .lp-ref-header h1 svg {
    color: #a5b4fc;
  }

  .lp-ref-header p {
    margin: 8px auto 0;
    max-width: 520px;
    font-size: 13px;
    color: #9ca3af;
  }

  .lp-ref-kpis {
    margin-top: 18px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }

  .lp-ref-kpi {
    min-width: 180px;
    border-radius: 16px;
    padding: 10px 12px;
    border: 1px solid rgba(148,163,184,0.8);
    background: radial-gradient(circle at top, rgba(15,23,42,0.99), rgba(15,23,42,0.97));
    box-shadow:
      0 16px 38px rgba(0,0,0,0.9),
      0 0 0 1px rgba(15,23,42,0.9);
  }

  .lp-ref-kpi-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #9ca3af;
  }

  .lp-ref-kpi-value {
    margin-top: 4px;
    display: flex;
    align-items: baseline;
    gap: 4px;
    font-weight: 800;
    color: #f9fafb;
  }

  .lp-ref-kpi-currency {
    font-size: 16px;
    color: #a5b4fc;
  }

  .lp-ref-kpi-value span:last-child {
    font-size: 20px;
    font-variant-numeric: tabular-nums;
  }

  .lp-ref-kpi-members {
    font-size: 18px;
    gap: 6px;
  }

  .lp-ref-kpi-members svg {
    color: #a5b4fc;
  }

  /* CARD GENÉRICA */
  .lp-ref-card {
    position: relative;
    border-radius: 22px;
    border: 1px solid rgba(148,163,184,0.7);
    background: radial-gradient(circle at top, rgba(15,23,42,0.99), rgba(15,23,42,0.97));
    box-shadow:
      0 20px 55px rgba(0,0,0,1),
      0 0 0 1px rgba(15,23,42,0.9);
    padding: 18px 16px 18px;
    overflow: hidden;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    margin-bottom: 16px;
  }

  .lp-ref-card::before {
    content: "";
    position: absolute;
    inset: -120px;
    background:
      radial-gradient(circle at 0% 0%, rgba(59,130,246,0.28), transparent 55%),
      radial-gradient(circle at 120% 120%, rgba(129,140,248,0.18), transparent 55%);
    opacity: 0.75;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  .lp-ref-card > * {
    position: relative;
    z-index: 1;
  }

  /* INVITACIÓN */
  .lp-ref-invite {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    align-items: center;
  }

  .lp-ref-invite-left {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1 1 220px;
    min-width: 0;
  }

  .lp-ref-invite-icon {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(37,99,235,0.15);
    border: 1px solid rgba(129,140,248,0.9);
    color: #bfdbfe;
    box-shadow:
      0 10px 26px rgba(15,23,42,0.9),
      0 0 0 1px rgba(15,23,42,1);
  }

  .lp-ref-invite-left h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 800;
    color: #f9fafb;
  }

  .lp-ref-invite-left p {
    margin: 2px 0 0 0;
    font-size: 12px;
    color: #9ca3af;
  }

  .lp-ref-invite-right {
    flex: 1 1 260px;
    min-width: 0;
  }

  .lp-ref-link-box {
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 999px;
    border: 1px solid rgba(148,163,184,0.8);
    background: rgba(15,23,42,0.96);
    padding: 6px 6px 6px 12px;
  }

  .lp-ref-link-text {
    flex: 1;
    min-width: 0;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    font-size: 12px;
    color: #e5e7eb;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lp-ref-copy-btn {
    border: none;
    border-radius: 999px;
    padding: 7px 10px;
    font-size: 11px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: radial-gradient(circle at 0% 0%, rgba(79,70,229,0.95), rgba(15,23,42,1));
    color: #f9fafb;
    cursor: pointer;
    box-shadow:
      0 0 0 1px rgba(191,219,254,0.9),
      0 14px 38px rgba(15,23,42,1);
    transition: transform 0.16s ease, box-shadow 0.16s ease, opacity 0.16s ease;
  }

  .lp-ref-copy-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .lp-ref-copy-btn:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow:
      0 0 0 1px rgba(221,239,254,1),
      0 20px 50px rgba(15,23,42,1);
  }

  /* NETWORK CARD */
  .lp-ref-network-card {
    margin-top: 4px;
  }

  .lp-ref-network-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .lp-ref-network-icon {
    width: 30px;
    height: 30px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 30% 0, #6366f1, #1e293b);
    color: #e0e7ff;
    box-shadow:
      0 14px 30px rgba(15,23,42,0.95),
      0 0 0 1px rgba(15,23,42,1);
  }

  .lp-ref-network-header h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 800;
    color: #f9fafb;
  }

  .lp-ref-network-header p {
    margin: 2px 0 0 0;
    font-size: 12px;
    color: #9ca3af;
  }

  .lp-ref-tree-wrapper {
    margin-top: 6px;
    padding-top: 4px;
  }

  /* VACÍO */
  .lp-ref-empty {
    border-radius: 16px;
    border: 1px dashed rgba(148,163,184,0.7);
    background: rgba(15,23,42,0.98);
    padding: 18px 14px;
    text-align: center;
  }

  .lp-ref-empty-title {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 600;
    color: #e5e7eb;
  }

  .lp-ref-empty-sub {
    margin: 0;
    font-size: 11px;
    color: #9ca3af;
  }

  /* ÁRBOL VERTICAL */
  .lp-ref-node {
    position: relative;
    padding-left: 14px;
  }

  /* línea vertical izquierda */
  .lp-ref-node::before {
    content: "";
    position: absolute;
    left: 6px;
    top: 22px;
    bottom: 0;
    width: 2px;
    background: rgba(148,163,184,0.6);
    opacity: 0.6;
  }

  .lp-ref-node-card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 14px;
    padding: 8px 10px;
    margin-bottom: 8px;
    background: rgba(15,23,42,0.98);
    border: 1px solid rgba(148,163,184,0.8);
    box-shadow:
      0 10px 26px rgba(15,23,42,0.95),
      0 0 0 1px rgba(15,23,42,1);
  }

  .lp-ref-node-card.is-root {
    border-color: rgba(129,140,248,0.95);
    box-shadow:
      0 0 0 1px rgba(129,140,248,1),
      0 0 30px rgba(79,70,229,0.9);
  }

  .lp-ref-node-avatar {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    overflow: hidden;
    border: 1px solid rgba(148,163,184,0.8);
    flex-shrink: 0;
  }

  .lp-ref-node-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .lp-ref-node-avatar-fallback {
    width: 100%;
    height: 100%;
    background: rgba(30,64,175,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    color: #e5e7eb;
  }

  .lp-ref-node-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .lp-ref-node-username {
    font-size: 12px;
    font-weight: 700;
    color: #e5e7eb;
  }

  .lp-ref-node-earnings {
    font-size: 11px;
    color: #a5b4fc;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
  }

  .lp-ref-node-badge {
    position: absolute;
    top: 6px;
    right: 8px;
    border-radius: 999px;
    padding: 2px 6px;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #f9fafb;
  }

  .lp-ref-node-badge-l1 {
    background: rgba(79,70,229,0.9);
    border: 1px solid rgba(191,219,254,0.9);
  }

  .lp-ref-node-badge-l2 {
    background: rgba(16,185,129,0.9);
    border: 1px solid rgba(187,247,208,0.9);
  }

  .lp-ref-children {
    margin-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-bottom: 4px;
  }

  .lp-ref-child-branch {
    position: relative;
  }

  .lp-ref-branch-line {
    position: absolute;
    left: -12px;
    top: 16px;
    width: 12px;
    height: 2px;
    background: rgba(148,163,184,0.7);
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .lp-ref-shell { left: 0; }
    .lp-ref-inner {
      max-width: 540px;
      padding: 20px 12px 120px 12px;
    }
    .lp-ref-invite {
      align-items: flex-start;
    }
    .lp-ref-link-box {
      border-radius: 16px;
    }
  }
`;export{A as ReferralsPage};
