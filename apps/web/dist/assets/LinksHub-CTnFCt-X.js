import{r as e,j as a,S as n,c as p}from"./index-D-0HiMVS.js";import{CreateLinkPage as i}from"./CreateLinkPage-DMe2cX8R.js";import{LinksPage as o}from"./LinksPage-FMtrZu0Y.js";import"./copy--kPBvbPe.js";import"./sparkles-Bp_EaMA8.js";import"./chevron-down-BQ4tECBt.js";import"./eye-off-BtsB-Z8z.js";/* empty css                          */import"./shield-UiBa7U0I.js";function u(){const[t,r]=e.useState("create");return a.jsxs("div",{className:"lp-links-hub-shell",children:[a.jsx("style",{children:l}),a.jsxs("div",{className:"lp-links-tabs-bar",children:[a.jsxs("button",{className:`lp-links-tab ${t==="create"?"active":""}`,onClick:()=>r("create"),children:[a.jsx(n,{size:18}),a.jsx("span",{children:"Crear Link"})]}),a.jsxs("button",{className:`lp-links-tab ${t==="list"?"active":""}`,onClick:()=>r("list"),children:[a.jsx(p,{size:18}),a.jsx("span",{children:"Mis Enlaces"})]})]}),a.jsxs("div",{className:"lp-links-content-wrapper",children:[a.jsx("div",{className:`lp-tab-content ${t==="create"?"active":""}`,children:a.jsx(i,{})}),a.jsx("div",{className:`lp-tab-content ${t==="list"?"active":""}`,children:a.jsx(o,{})})]})]})}const l=`
  .lp-links-hub-shell {
    min-height: 100dvh;
    background: linear-gradient(180deg, #0a0f1a 0%, #020617 50%, #000000 100%);
    position: relative;
    overflow-x: hidden;
    /* Block horizontal scroll on mobile */
    max-width: 100vw;
  }

  /* Tabs Bar - Transparent like header */
  .lp-links-tabs-bar {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    background: transparent;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(99, 102, 241, 0.1);
  }

  .lp-links-tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.2);
    background: rgba(15, 23, 42, 0.5);
    color: #94a3b8;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .lp-links-tab:hover {
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
    color: #e5e7eb;
  }

  .lp-links-tab.active {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.2) 100%);
    border-color: rgba(99, 102, 241, 0.5);
    color: #f9fafb;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
  }

  .lp-links-tab.active svg {
    color: #a5b4fc;
  }

  /* Content Wrapper */
  .lp-links-content-wrapper {
    position: relative;
  }

  /* Tab Content */
  .lp-tab-content {
    display: none;
  }

  .lp-tab-content.active {
    display: block;
  }

  /* ===== CRITICAL: Override child page shells to be relative ===== */
  
  /* CreateLinkPage shell */
  .lp-links-content-wrapper .lp-create-shell {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    inset: auto !important;
    min-height: auto !important;
    height: auto !important;
  }

  /* LinksPage shell */
  .lp-links-content-wrapper .lp-links-shell {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    inset: auto !important;
    min-height: auto !important;
    height: auto !important;
  }

  /* Hide duplicate backgrounds from child pages */
  .lp-links-content-wrapper .lp-bg,
  .lp-links-content-wrapper .lp-create-bg::before,
  .lp-links-content-wrapper .lp-create-bg::after {
    display: none !important;
  }

  /* Remove padding-top from inner containers since tabs handle it */
  /* Add padding-bottom for bottom nav bar clearance */
  .lp-links-content-wrapper .lp-create-inner,
  .lp-links-content-wrapper .lp-links-inner {
    padding-top: 16px !important;
    padding-bottom: 120px !important;
  }

  /* ===== PREMIUM CARD ANIMATIONS - MATCHING DASHBOARD ===== */
  
  /* Card entrance animation */
  @keyframes lp-card-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }

  @keyframes lp-card-glow-pulse {
    0%, 100% { 
      box-shadow: 0 0 40px rgba(99, 102, 241, 0.12), 0 20px 40px -10px rgba(0, 0, 0, 0.7);
    }
    50% { 
      box-shadow: 0 0 60px rgba(99, 102, 241, 0.2), 0 25px 50px -10px rgba(0, 0, 0, 0.8);
    }
  }

  /* Premium card base style for Links section */
  .lp-links-content-wrapper .lp-card-v2,
  .lp-links-content-wrapper .lp-links-card {
    position: relative;
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 60%),
      radial-gradient(ellipse at top left, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%) !important;
    border: 1px solid rgba(148, 163, 184, 0.25) !important;
    transform: translateY(-3px);
    box-shadow:
      0 0 60px rgba(99, 102, 241, 0.12),
      0 0 25px rgba(99, 102, 241, 0.08),
      0 25px 50px -12px rgba(0, 0, 0, 0.75),
      inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(20px) saturate(1.3);
    -webkit-backdrop-filter: blur(20px) saturate(1.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    animation: lp-card-glow-pulse 4s ease-in-out infinite;
  }

  .lp-links-content-wrapper .lp-card-v2:hover,
  .lp-links-content-wrapper .lp-links-card:hover {
    transform: translateY(-6px) scale(1.01) !important;
    border-color: rgba(129, 140, 248, 0.5) !important;
    box-shadow:
      0 0 100px rgba(99, 102, 241, 0.2),
      0 0 40px rgba(99, 102, 241, 0.15),
      0 35px 70px -15px rgba(0, 0, 0, 0.85),
      inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
  }

  /* URL Card - Blue accent glow */
  .lp-links-content-wrapper .lp-card-url {
    border-top: 3px solid rgba(59, 130, 246, 0.8) !important;
    box-shadow:
      0 0 60px rgba(59, 130, 246, 0.15),
      0 20px 40px -10px rgba(0, 0, 0, 0.7),
      inset 0 1px 0 rgba(59, 130, 246, 0.15) !important;
  }

  /* Alias Card - Orange/Amber accent glow */
  .lp-links-content-wrapper .lp-card-alias {
    border-top: 3px solid rgba(249, 115, 22, 0.8) !important;
    box-shadow:
      0 0 60px rgba(249, 115, 22, 0.15),
      0 20px 40px -10px rgba(0, 0, 0, 0.7),
      inset 0 1px 0 rgba(249, 115, 22, 0.15) !important;
  }

  /* Engine Card - Green accent glow */
  .lp-links-content-wrapper .lp-engine-card {
    border: 2px solid rgba(34, 197, 94, 0.6) !important;
    box-shadow:
      0 0 80px rgba(34, 197, 94, 0.15),
      0 25px 50px -12px rgba(0, 0, 0, 0.8),
      inset 0 1px 0 rgba(34, 197, 94, 0.15) !important;
    animation: lp-card-float 8s ease-in-out infinite;
  }

  /* Links list cards - Purple accent */
  .lp-links-content-wrapper .lp-link-card {
    border-left: 3px solid rgba(168, 85, 247, 0.7) !important;
    box-shadow:
      0 0 50px rgba(168, 85, 247, 0.12),
      0 16px 40px rgba(15, 23, 42, 0.9),
      0 0 0 1px rgba(15, 23, 42, 0.9) !important;
  }

  .lp-links-content-wrapper .lp-link-card:hover {
    border-left-color: rgba(168, 85, 247, 1) !important;
    box-shadow:
      0 0 80px rgba(168, 85, 247, 0.2),
      0 22px 60px rgba(15, 23, 42, 1),
      0 0 0 1px rgba(191, 219, 254, 0.5) !important;
  }
`;export{u as LinksHub};
