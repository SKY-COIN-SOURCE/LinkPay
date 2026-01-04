import{r as n,j as a,S as i,c as p}from"./index-W6PFq6so.js";import{CreateLinkPage as o}from"./CreateLinkPage-Cvf0eeRJ.js";import{LinksPage as l}from"./LinksPage-CRWzvjRY.js";import"./copy-qCZGZcM8.js";import"./sparkles-DcLNGQTH.js";import"./chevron-down-Cw1MCczY.js";import"./eye-off-DGfDbf37.js";/* empty css                          */import"./shield-BeG_5G6H.js";function h(){const[t,r]=n.useState("create"),e=()=>{r("list")};return a.jsxs("div",{className:"lp-links-hub-shell",children:[a.jsx("style",{children:s}),a.jsxs("div",{className:"lp-links-hub-inner",children:[a.jsxs("div",{className:"lp-links-tabs-bar",children:[a.jsxs("button",{className:`lp-links-tab ${t==="create"?"active":""}`,onClick:()=>r("create"),children:[a.jsx(i,{size:18}),a.jsx("span",{children:"Crear Link"})]}),a.jsxs("button",{className:`lp-links-tab ${t==="list"?"active":""}`,onClick:()=>r("list"),children:[a.jsx(p,{size:18}),a.jsx("span",{children:"Mis Enlaces"})]})]}),a.jsxs("div",{className:"lp-links-content-wrapper",children:[a.jsx("div",{className:`lp-tab-content ${t==="create"?"active":""}`,children:a.jsx(o,{onSwitchToList:e})}),a.jsx("div",{className:`lp-tab-content ${t==="list"?"active":""}`,children:a.jsx(l,{})})]})]})]})}const s=`
  /* ═══════════════════════════════════════════════════════════════════════════
     LINKS HUB - VIBRANT WARM PALETTE (Coral/Pink/Orange) - FLUORESCENT
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-links-hub-shell {
    position: fixed;
    inset: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    
    /* Brighter Warm Gradient - Less black, more color */
    background: linear-gradient(160deg,
      #3d1f2a 0%,
      #4a2035 12%,
      #522540 25%,
      #4d2842 40%,
      #452538 55%,
      #3a2030 70%,
      #2d1a28 85%,
      #1a1218 100%);
  }

  /* Gradient Overlay - INTENSE fluorescent warm accents */
  .lp-links-hub-shell::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      /* Top center glow - INTENSE coral/pink */
      radial-gradient(ellipse 120% 60% at 50% 0%, rgba(251, 113, 133, 0.55) 0%, transparent 55%),
      /* Left accent - VIBRANT orange */
      radial-gradient(ellipse 70% 70% at 10% 35%, rgba(251, 146, 60, 0.45) 0%, transparent 55%),
      /* Right accent - HOT pink/magenta */
      radial-gradient(ellipse 60% 60% at 90% 30%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
      /* Center glow - warm fusion */
      radial-gradient(ellipse 80% 50% at 50% 50%, rgba(253, 186, 116, 0.25) 0%, transparent 50%),
      /* Bottom left - bright peach */
      radial-gradient(ellipse 60% 50% at 15% 80%, rgba(253, 186, 116, 0.35) 0%, transparent 55%),
      /* Bottom right - rose glow */
      radial-gradient(ellipse 70% 60% at 85% 85%, rgba(244, 114, 182, 0.35) 0%, transparent 55%);
  }

  /* Floating Particles - BRIGHT warm colors */
  .lp-links-hub-shell::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.8;
    background-image:
      radial-gradient(2px 2px at 10% 15%, rgba(251, 113, 133, 1), transparent),
      radial-gradient(1.5px 1.5px at 25% 28%, rgba(251, 146, 60, 0.95), transparent),
      radial-gradient(2.5px 2.5px at 42% 10%, rgba(236, 72, 153, 1), transparent),
      radial-gradient(1.5px 1.5px at 60% 38%, rgba(253, 186, 116, 0.9), transparent),
      radial-gradient(2px 2px at 78% 18%, rgba(244, 114, 182, 0.95), transparent),
      radial-gradient(1.5px 1.5px at 88% 42%, rgba(251, 113, 133, 0.9), transparent),
      radial-gradient(2px 2px at 15% 62%, rgba(251, 146, 60, 0.85), transparent),
      radial-gradient(1.5px 1.5px at 35% 72%, rgba(236, 72, 153, 0.9), transparent),
      radial-gradient(2.5px 2.5px at 55% 68%, rgba(253, 186, 116, 0.95), transparent),
      radial-gradient(1.5px 1.5px at 72% 78%, rgba(244, 114, 182, 0.85), transparent),
      radial-gradient(2px 2px at 85% 58%, rgba(251, 113, 133, 0.9), transparent),
      radial-gradient(1.5px 1.5px at 5% 88%, rgba(251, 146, 60, 0.8), transparent);
    background-size: 400px 300px;
    animation: lp-links-particles-float 25s linear infinite;
  }

  @keyframes lp-links-particles-float {
    0% { transform: translateY(0); }
    100% { transform: translateY(-300px); }
  }

  /* Desktop: offset for sidebar */
  @media (min-width: 769px) {
    .lp-links-hub-shell {
      left: 260px;
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     INNER - Content container, starts below MobileHeader (like Analytics)
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-links-hub-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    
    /* Start below MobileHeader (48px + safe area) - EXACTLY like Analytics */
    padding: calc(48px + env(safe-area-inset-top, 12px) + 12px) 12px calc(90px + env(safe-area-inset-bottom, 20px)) 12px;
    
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro', 'Inter', system-ui, sans-serif;
  }

  @media (min-width: 769px) {
    .lp-links-hub-inner {
      max-width: 800px;
      padding: 24px 24px 100px 24px;
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     TABS BAR - Transparente, botones opacos (como lpa-range-bar pero transparente)
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-links-tabs-bar {
    display: flex;
    gap: 8px;
    /* TRANSPARENTE - el fondo vibrante se ve a través */
    background: transparent;
    margin-bottom: 16px;
  }

  .lp-links-tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 16px;
    border-radius: 14px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    /* BOTONES OPACOS con glassmorphism */
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    color: #94a3b8;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 4px 15px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .lp-links-tab:hover {
    background: rgba(25, 20, 28, 0.95);
    border-color: rgba(251, 113, 133, 0.4);
    color: #fecdd3;
  }

  .lp-links-tab.active {
    background: linear-gradient(135deg, rgba(251, 113, 133, 0.3) 0%, rgba(244, 114, 182, 0.25) 100%);
    border-color: rgba(251, 113, 133, 0.6);
    color: #fff;
    box-shadow: 
      0 0 30px rgba(251, 113, 133, 0.25),
      0 4px 15px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  .lp-links-tab.active svg {
    color: #fda4af;
    filter: drop-shadow(0 0 6px rgba(251, 113, 133, 0.5));
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     CONTENT WRAPPER
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-links-content-wrapper {
    position: relative;
    z-index: 1;
  }

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
    background: transparent !important;
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
    background: transparent !important;
  }

  /* Hide duplicate backgrounds from child pages */
  .lp-links-content-wrapper .lp-bg,
  .lp-links-content-wrapper .lp-create-bg,
  .lp-links-content-wrapper .lp-create-bg::before,
  .lp-links-content-wrapper .lp-create-bg::after,
  .lp-links-content-wrapper .lp-premium-bg::before,
  .lp-links-content-wrapper .lp-premium-bg::after {
    display: none !important;
  }

  /* Adjust padding for inner containers */
  .lp-links-content-wrapper .lp-create-inner,
  .lp-links-content-wrapper .lp-links-inner {
    padding-top: 20px !important;
    padding-bottom: calc(90px + env(safe-area-inset-bottom, 20px) + 20px) !important;
    background: transparent !important;
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
`;export{h as LinksHub};
