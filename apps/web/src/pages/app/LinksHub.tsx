import React, { useState } from 'react';
import { PlusSquare, Link2 } from 'lucide-react';
import { CreateLinkPage } from './CreateLinkPage';
import { LinksPage } from './LinksPage';

type TabType = 'create' | 'list';

export function LinksHub() {
  const [activeTab, setActiveTab] = useState<TabType>('create');

  return (
    <div className="lp-links-hub">
      <style>{linksHubStyles}</style>

      {/* Premium Tabs */}
      <div className="lp-hub-tabs-bar">
        <button
          className={`lp-hub-tab ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          <PlusSquare size={18} />
          <span>Crear Link</span>
        </button>
        <button
          className={`lp-hub-tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          <Link2 size={18} />
          <span>Mis Enlaces</span>
        </button>
      </div>

      {/* Content - Show one at a time */}
      <div className="lp-hub-content">
        {activeTab === 'create' && <CreateLinkPage />}
        {activeTab === 'list' && <LinksPage />}
      </div>
    </div>
  );
}

const linksHubStyles = `
  .lp-links-hub {
    min-height: 100dvh;
    background: linear-gradient(135deg, #0a0f1a 0%, #020617 50%, #000000 100%);
    position: relative;
  }

  /* Tabs Bar */
  .lp-hub-tabs-bar {
    position: sticky;
    top: 0;
    z-index: 30;
    display: flex;
    gap: 8px;
    padding: 12px 12px;
    background: rgba(2, 6, 23, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(99, 102, 241, 0.15);
  }

  .lp-hub-tab {
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

  .lp-hub-tab:hover {
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
    color: #e5e7eb;
  }

  .lp-hub-tab.active {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.2) 100%);
    border-color: rgba(99, 102, 241, 0.5);
    color: #f9fafb;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
  }

  .lp-hub-tab.active svg {
    color: #a5b4fc;
  }

  /* Content Area */
  .lp-hub-content {
    position: relative;
  }

  /* Override child page shells - they must be relative, not fixed */
  .lp-hub-content .lp-create-shell,
  .lp-hub-content .lp-links-shell {
    position: relative !important;
    inset: auto !important;
    min-height: auto !important;
    padding-top: 0 !important;
  }

  /* Hide duplicate backgrounds */
  .lp-hub-content .lp-bg,
  .lp-hub-content .lp-create-bg,
  .lp-hub-content .lp-links-bg {
    display: none !important;
  }
`;
