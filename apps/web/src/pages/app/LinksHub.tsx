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

      {/* Premium Tabs */}
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
  );
}

const linksHubStyles = `
  .lp-links-hub-shell {
    min-height: 100dvh;
    background: linear-gradient(180deg, #0a0f1a 0%, #020617 50%, #000000 100%);
    position: relative;
  }

  /* Tabs Bar - sticky at top */
  .lp-links-tabs-bar {
    position: sticky;
    top: calc(56px + env(safe-area-inset-top, 0px));
    z-index: 50;
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    background: rgba(2, 6, 23, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(99, 102, 241, 0.15);
  }

  @media (min-width: 769px) {
    .lp-links-tabs-bar {
      top: 0;
    }
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
  .lp-links-content-wrapper .lp-create-inner,
  .lp-links-content-wrapper .lp-links-inner {
    padding-top: 16px !important;
  }
`;
