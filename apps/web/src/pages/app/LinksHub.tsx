import React, { useState } from 'react';
import { PlusSquare, Link2 } from 'lucide-react';
import { CreateLinkPage } from './CreateLinkPage';
import { LinksPage } from './LinksPage';

type TabType = 'create' | 'list';

export function LinksHub() {
  const [activeTab, setActiveTab] = useState<TabType>('create');

  return (
    <div className="lp-links-hub-shell">
      <style>{linksHubStyles}</style>

      {/* Inner container - starts below MobileHeader like Analytics */}
      <div className="lp-links-hub-inner">

        {/* Tabs Bar - Transparent background, opaque buttons */}
        <div className="lp-links-tabs-bar">
          <button
            className={`lp-links-tab ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            <PlusSquare size={18} />
            <span>Crear Link</span>
          </button>
          <button
            className={`lp-links-tab ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            <Link2 size={18} />
            <span>Mis Enlaces</span>
          </button>
        </div>

        {/* Content - renders actual pages */}
        <div className="lp-links-content-wrapper">
          <div className={`lp-tab-content ${activeTab === 'create' ? 'active' : ''}`}>
            <CreateLinkPage />
          </div>
          <div className={`lp-tab-content ${activeTab === 'list' ? 'active' : ''}`}>
            <LinksPage />
          </div>
        </div>
      </div>
    </div>
  );
}

const linksHubStyles = `
  /* ═══════════════════════════════════════════════════════════════════════════
     LINKS HUB - PREMIUM VIBRANT BACKGROUND
     Matching Analytics/Wallet/Dashboard quality
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-links-hub-shell {
    position: fixed;
    inset: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    
    /* Vibrant Purple-Cyan-Green Gradient - Premium */
    background: linear-gradient(180deg,
      #1a1040 0%,
      #1e1650 15%,
      #201a55 30%,
      #1a2050 50%,
      #152545 70%,
      #0f1a35 85%,
      #0a1020 100%);
  }

  /* Gradient Overlay - Fluorescent accents */
  .lp-links-hub-shell::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 100% 50% at 50% 0%, rgba(139, 92, 246, 0.35) 0%, transparent 50%),
      radial-gradient(ellipse 60% 60% at 15% 40%, rgba(34, 211, 238, 0.25) 0%, transparent 50%),
      radial-gradient(ellipse 50% 50% at 85% 35%, rgba(16, 185, 129, 0.22) 0%, transparent 45%),
      radial-gradient(ellipse 50% 40% at 20% 85%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse 60% 50% at 80% 90%, rgba(168, 85, 247, 0.18) 0%, transparent 50%);
  }

  /* Floating Particles - Animated like Analytics/Wallet */
  .lp-links-hub-shell::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.6;
    background-image:
      radial-gradient(1.5px 1.5px at 10% 15%, rgba(139, 92, 246, 0.8), transparent),
      radial-gradient(1px 1px at 25% 28%, rgba(34, 211, 238, 0.7), transparent),
      radial-gradient(2px 2px at 42% 10%, rgba(16, 185, 129, 0.75), transparent),
      radial-gradient(1px 1px at 60% 38%, rgba(168, 85, 247, 0.6), transparent),
      radial-gradient(1.5px 1.5px at 78% 18%, rgba(34, 197, 94, 0.7), transparent),
      radial-gradient(1px 1px at 88% 42%, rgba(99, 102, 241, 0.65), transparent),
      radial-gradient(1.5px 1.5px at 15% 62%, rgba(34, 211, 238, 0.6), transparent),
      radial-gradient(1px 1px at 35% 72%, rgba(16, 185, 129, 0.65), transparent),
      radial-gradient(2px 2px at 55% 68%, rgba(139, 92, 246, 0.7), transparent),
      radial-gradient(1px 1px at 72% 78%, rgba(34, 197, 94, 0.6), transparent),
      radial-gradient(1.5px 1.5px at 85% 58%, rgba(168, 85, 247, 0.65), transparent),
      radial-gradient(1px 1px at 5% 88%, rgba(99, 102, 241, 0.55), transparent);
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
    background: rgba(15, 23, 42, 0.9);
    border-color: rgba(139, 92, 246, 0.4);
    color: #e5e7eb;
  }

  .lp-links-tab.active {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.35) 0%, rgba(99, 102, 241, 0.3) 100%);
    border-color: rgba(139, 92, 246, 0.6);
    color: #f9fafb;
    box-shadow: 
      0 0 30px rgba(139, 92, 246, 0.3),
      0 4px 15px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  .lp-links-tab.active svg {
    color: #c4b5fd;
    filter: drop-shadow(0 0 6px rgba(139, 92, 246, 0.5));
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
`;
