import{r as s,af as m,F as h,j as e,U as E,Z as S}from"./index-D-0HiMVS.js";import{P as R}from"./PremiumLoader-DeyQUAuK.js";/* empty css                          */import{T}from"./trending-up-D99B-rYt.js";import{S as u}from"./sparkles-Bp_EaMA8.js";import{C as F}from"./copy--kPBvbPe.js";function P(){const[d,w]=s.useState(null),[v,y]=s.useState(!0),[o,j]=s.useState(""),[N,k]=s.useState(0),[p,c]=s.useState(!1);s.useEffect(()=>{z()},[]);const z=async()=>{try{const r=await m.getMyReferralCode();j(r||"");const a=await m.getNetwork();w(a||null);const{data:{user:n}}=await h.auth.getUser();if(n){const{data:t}=await h.from("profiles").select("referral_earnings").eq("id",n.id).single();k(Number((t==null?void 0:t.referral_earnings)||0))}}catch(r){console.error(r)}finally{y(!1)}},C=()=>{if(!o)return;const r=`${window.location.origin}/register?ref=${o}`;navigator.clipboard.writeText(r),c(!0),setTimeout(()=>c(!1),2e3)};function x(r){var n,t;if(!r)return 0;let a=((n=r.children)==null?void 0:n.length)||0;return(t=r.children)==null||t.forEach(i=>{a+=x(i)}),a}const l=x(d),f=({node:r,isRoot:a,depth:n=0})=>{var g;const t=r.children&&r.children.length>0,i=a?"#22c55e":r.level===1?"#8b5cf6":"#3b82f6";return e.jsxs("div",{className:"net-node-wrapper",children:[!a&&e.jsx("div",{className:"net-connection-line",style:{background:`linear-gradient(180deg, ${i}50, ${i})`}}),e.jsxs("div",{className:`net-node ${a?"net-node-root":""}`,style:{"--node-color":i},children:[e.jsx("div",{className:"net-node-glow"}),e.jsx("div",{className:"net-node-avatar",children:r.avatar_url?e.jsx("img",{src:r.avatar_url,alt:r.username||""}):e.jsx("span",{children:(g=(r.username||"?")[0])==null?void 0:g.toUpperCase()})}),e.jsxs("div",{className:"net-node-info",children:[e.jsxs("span",{className:"net-node-name",children:["@",r.username]}),e.jsxs("span",{className:"net-node-value",children:["€",Number(r.total_earnings||0).toFixed(2)]})]}),!a&&e.jsx("div",{className:"net-node-badge",style:{background:i},children:r.level===1?"10%":"5%"})]}),t&&e.jsx("div",{className:"net-children",children:r.children.map((b,M)=>e.jsx(f,{node:b,depth:n+1},b.id))})]})};return v?e.jsx(R,{size:"medium",text:"RED",subtext:"Cargando tu network..."}):e.jsxs("div",{className:"ref-shell lp-premium-bg",children:[e.jsx("style",{children:$}),e.jsxs("section",{className:"ref-hero",children:[e.jsx("div",{className:"ref-hero-bg"}),e.jsxs("div",{className:"ref-stats-row",children:[e.jsxs("div",{className:"ref-stat-card ref-stat-earnings",children:[e.jsx("div",{className:"ref-stat-icon",children:e.jsx(T,{size:20})}),e.jsxs("div",{className:"ref-stat-content",children:[e.jsxs("span",{className:"ref-stat-value",children:["€",N.toFixed(2)]}),e.jsx("span",{className:"ref-stat-label",children:"Comisiones"})]})]}),e.jsxs("div",{className:"ref-stat-card ref-stat-members",children:[e.jsx("div",{className:"ref-stat-icon",children:e.jsx(E,{size:20})}),e.jsxs("div",{className:"ref-stat-content",children:[e.jsx("span",{className:"ref-stat-value",children:l}),e.jsx("span",{className:"ref-stat-label",children:"Red"})]})]})]}),e.jsxs("div",{className:"ref-rates",children:[e.jsxs("div",{className:"ref-rate",children:[e.jsx(S,{size:14}),e.jsxs("span",{children:["Nivel 1: ",e.jsx("strong",{children:"10%"})]})]}),e.jsxs("div",{className:"ref-rate",children:[e.jsx(u,{size:14}),e.jsxs("span",{children:["Nivel 2: ",e.jsx("strong",{children:"5%"})]})]})]})]}),e.jsxs("section",{className:"ref-invite-card",children:[e.jsxs("div",{className:"ref-invite-header",children:[e.jsx(u,{size:16}),e.jsx("span",{children:"Tu enlace único"})]}),e.jsxs("div",{className:"ref-invite-box",children:[e.jsx("span",{className:"ref-invite-link",children:o?`linkpay.gg/r/${o}`:"..."}),e.jsxs("button",{className:`ref-copy-btn ${p?"copied":""}`,onClick:C,disabled:!o,children:[e.jsx(F,{size:16}),p?"¡Copiado!":"Copiar"]})]})]}),e.jsxs("section",{className:"ref-network-section",children:[e.jsxs("div",{className:"ref-network-header",children:[e.jsx("h2",{children:"Tu Red"}),l===0&&e.jsx("span",{className:"ref-network-empty-badge",children:"Vacía"})]}),!d||l===0?e.jsxs("div",{className:"ref-empty-network",children:[e.jsxs("div",{className:"ref-empty-orbs",children:[e.jsx("div",{className:"ref-empty-orb ref-empty-orb-1"}),e.jsx("div",{className:"ref-empty-orb ref-empty-orb-2"}),e.jsx("div",{className:"ref-empty-orb ref-empty-orb-3"})]}),e.jsx("p",{children:"Comparte tu enlace para empezar a construir"})]}):e.jsx("div",{className:"ref-network-tree",children:e.jsx(f,{node:d,isRoot:!0})})]})]})}const $=`
  /* ─── SHELL ─────────────────────────────────────────────────────────────── */
  .ref-shell {
    position: fixed;
    inset: 0;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding: 16px;
    padding-bottom: 140px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    color: #fff;
    background: linear-gradient(180deg, #0a0f1a 0%, #020617 50%, #000 100%);
  }

  @media (max-width: 768px) {
    .ref-shell {
      top: calc(48px + env(safe-area-inset-top, 0px));
    }
  }

  @media (min-width: 769px) {
    .ref-shell {
      left: 260px;
      padding: 24px;
      padding-bottom: 100px;
    }
  }

  /* ─── HERO SECTION ──────────────────────────────────────────────────────── */
  .ref-hero {
    position: relative;
    padding: 20px 0;
    margin-bottom: 16px;
  }

  .ref-hero-bg {
    position: absolute;
    inset: -50px -100px;
    background: 
      radial-gradient(ellipse 80% 60% at 50% 20%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
      radial-gradient(ellipse 60% 40% at 30% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 40%);
    pointer-events: none;
    animation: hero-pulse 8s ease-in-out infinite;
  }

  @keyframes hero-pulse {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }

  /* Stats Row */
  .ref-stats-row {
    display: flex;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .ref-stat-card {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border-radius: 20px;
    background: 
      linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%),
      rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(148, 163, 184, 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow:
      0 0 60px rgba(139, 92, 246, 0.1),
      0 20px 40px -10px rgba(0, 0, 0, 0.5);
  }

  .ref-stat-earnings {
    border-top: 2px solid rgba(34, 197, 94, 0.7);
  }

  .ref-stat-members {
    border-top: 2px solid rgba(139, 92, 246, 0.7);
  }

  .ref-stat-icon {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%);
    color: #a5b4fc;
  }

  .ref-stat-earnings .ref-stat-icon {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.2) 100%);
    color: #86efac;
  }

  .ref-stat-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ref-stat-value {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .ref-stat-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
  }

  /* Rates */
  .ref-rates {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 16px;
    position: relative;
    z-index: 1;
  }

  .ref-rate {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
  }

  .ref-rate strong {
    color: #a5b4fc;
    font-weight: 700;
  }

  .ref-rate svg {
    color: #8b5cf6;
  }

  /* ─── INVITE CARD ───────────────────────────────────────────────────────── */
  .ref-invite-card {
    background: 
      linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%),
      rgba(15, 23, 42, 0.95);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 20px;
    padding: 16px;
    margin-bottom: 20px;
    box-shadow:
      0 0 80px rgba(139, 92, 246, 0.15),
      0 20px 50px -10px rgba(0, 0, 0, 0.6);
  }

  .ref-invite-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-size: 13px;
    font-weight: 600;
    color: #a5b4fc;
  }

  .ref-invite-header svg {
    color: #8b5cf6;
  }

  .ref-invite-box {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .ref-invite-link {
    flex: 1;
    padding: 14px 16px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 14px;
    font-family: ui-monospace, SFMono-Regular, monospace;
    font-size: 13px;
    color: #e5e7eb;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .ref-copy-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 14px 18px;
    border: none;
    border-radius: 14px;
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
    min-height: 48px;
    white-space: nowrap;
  }

  .ref-copy-btn:active {
    transform: scale(0.95);
  }

  .ref-copy-btn.copied {
    background: linear-gradient(135deg, #22c55e 0%, #10b981 100%);
    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.4);
  }

  .ref-copy-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* ─── NETWORK SECTION ───────────────────────────────────────────────────── */
  .ref-network-section {
    background: 
      linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 24px;
    padding: 20px;
    min-height: 300px;
  }

  .ref-network-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .ref-network-header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #f1f5f9;
  }

  .ref-network-empty-badge {
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 500;
  }

  /* Empty state */
  .ref-empty-network {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 20px;
    text-align: center;
  }

  .ref-empty-orbs {
    position: relative;
    width: 120px;
    height: 80px;
    margin-bottom: 20px;
  }

  .ref-empty-orb {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.3) 100%);
    border: 2px solid rgba(139, 92, 246, 0.5);
    animation: orb-float 3s ease-in-out infinite;
  }

  .ref-empty-orb-1 {
    width: 50px;
    height: 50px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .ref-empty-orb-2 {
    width: 35px;
    height: 35px;
    bottom: 0;
    left: 15px;
    animation-delay: 0.5s;
  }

  .ref-empty-orb-3 {
    width: 35px;
    height: 35px;
    bottom: 0;
    right: 15px;
    animation-delay: 1s;
  }

  @keyframes orb-float {
    0%, 100% { transform: translateY(0) translateX(-50%); opacity: 0.7; }
    50% { transform: translateY(-8px) translateX(-50%); opacity: 1; }
  }

  .ref-empty-orb-2, .ref-empty-orb-3 {
    animation-name: orb-float-side;
  }

  @keyframes orb-float-side {
    0%, 100% { transform: translateY(0); opacity: 0.6; }
    50% { transform: translateY(-6px); opacity: 0.9; }
  }

  .ref-empty-network p {
    margin: 0;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }

  /* ─── NETWORK TREE ──────────────────────────────────────────────────────── */
  .ref-network-tree {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .net-node-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  /* Connection line */
  .net-connection-line {
    width: 3px;
    height: 24px;
    border-radius: 2px;
    margin-bottom: -2px;
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.5);
  }

  /* Node */
  .net-node {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: 
      linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%),
      rgba(15, 23, 42, 0.95);
    border: 1px solid rgba(148, 163, 184, 0.25);
    border-radius: 16px;
    min-width: 180px;
    transition: all 0.3s;
    box-shadow:
      0 0 40px rgba(139, 92, 246, 0.08),
      0 15px 35px -10px rgba(0, 0, 0, 0.5);
  }

  .net-node:hover {
    transform: scale(1.03);
    box-shadow:
      0 0 60px rgba(139, 92, 246, 0.15),
      0 20px 45px -10px rgba(0, 0, 0, 0.6);
  }

  .net-node-root {
    background: 
      linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%),
      rgba(15, 23, 42, 0.95);
    border-color: rgba(34, 197, 94, 0.5);
    box-shadow:
      0 0 60px rgba(34, 197, 94, 0.2),
      0 20px 45px -10px rgba(0, 0, 0, 0.6);
  }

  /* Glow effect */
  .net-node-glow {
    position: absolute;
    inset: -2px;
    border-radius: 18px;
    background: linear-gradient(135deg, var(--node-color, #8b5cf6) 0%, transparent 50%);
    opacity: 0.3;
    filter: blur(8px);
    pointer-events: none;
  }

  /* Avatar */
  .net-node-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--node-color, #8b5cf6);
    flex-shrink: 0;
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%);
    font-weight: 700;
    font-size: 16px;
    color: #fff;
  }

  .net-node-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .net-node-root .net-node-avatar {
    border-color: #22c55e;
    box-shadow: 0 0 25px rgba(34, 197, 94, 0.4);
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.2) 100%);
  }

  /* Info */
  .net-node-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .net-node-name {
    font-size: 13px;
    font-weight: 600;
    color: #f1f5f9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .net-node-value {
    font-size: 12px;
    color: #86efac;
    font-family: ui-monospace, SFMono-Regular, monospace;
    font-weight: 600;
  }

  /* Badge */
  .net-node-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border: 2px solid rgba(0, 0, 0, 0.2);
  }

  /* Children container */
  .net-children {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    padding-left: 20px;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .ref-stat-card {
      padding: 14px;
    }

    .ref-stat-value {
      font-size: 20px;
    }

    .net-node {
      min-width: 160px;
      padding: 10px 14px;
    }

    .net-node-avatar {
      width: 40px;
      height: 40px;
    }

    .net-node-name {
      font-size: 12px;
    }
  }
`;export{P as ReferralsPage};
