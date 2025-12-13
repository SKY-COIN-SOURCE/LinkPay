import React, { useState } from 'react';
import { PlusSquare, Link2 } from 'lucide-react';

type TabType = 'create' | 'list';

interface LinksHubProps {
  initialTab?: TabType;
}

// Importaciones lazy para evitar problemas de shells fijos
const CreateLinkContent = React.lazy(() => import('./CreateLinkPage').then(m => ({ default: m.CreateLinkPage })));
const LinksListContent = React.lazy(() => import('./LinksPage').then(m => ({ default: m.LinksPage })));

export function LinksHub({ initialTab = 'create' }: LinksHubProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  return (
    <div className="lp-links-hub-shell">
      <style>{linksHubStyles}</style>

      {/* Premium Tabs - sticky below header */}
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

      {/* Content - lazy loaded */}
      <div className="lp-links-content">
        <React.Suspense fallback={<div className="lp-links-loading">Cargando...</div>}>
          {activeTab === 'create' && <CreateLinkContent />}
          {activeTab === 'list' && <LinksListContent />}
        </React.Suspense>
      </div>
    </div>
  );
}

const linksHubStyles = `
  .lp-links-hub-shell {
    min-height: 100dvh;
    background: linear-gradient(135deg, #0a0f1a 0%, #020617 50%, #000000 100%);
  }

  /* Tabs Bar - fixed below header */
  .lp-links-tabs-bar {
    position: fixed;
    top: calc(56px + env(safe-area-inset-top, 0px));
    left: 0;
    right: 0;
    z-index: 90;
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
      left: 260px;
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

  /* Content Area - starts below tabs bar */
  .lp-links-content {
    padding-top: calc(56px + env(safe-area-inset-top, 0px) + 60px);
  }

  @media (min-width: 769px) {
    .lp-links-content {
      padding-top: 60px;
    }
  }

  .lp-links-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    color: #94a3b8;
    font-size: 14px;
  }

  /* Override child shells - make them relative instead of fixed */
  .lp-links-content .lp-create-shell,
  .lp-links-content .lp-links-shell {
    position: relative !important;
    inset: auto !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    min-height: auto !important;
    padding-top: 0 !important;
  }

  /* Hide duplicate backgrounds from child pages */
  .lp-links-content .lp-bg,
  .lp-links-content .lp-create-bg {
    display: none !important;
  }
`;
