import React, { useState } from 'react';
import { PlusSquare, Link2 } from 'lucide-react';
import { CreateLinkPage } from './CreateLinkPage';
import { LinksPage } from './LinksPage';
import '../../styles/PremiumBackground.css';

type TabType = 'create' | 'list';

export function LinksHub() {
    const [activeTab, setActiveTab] = useState<TabType>('create');

    return (
        <div className="lp-links-hub">
            <style>{linksHubStyles}</style>

            {/* Premium Background */}
            <div className="lp-bg" />

            {/* Tabs Container */}
            <div className="lp-hub-tabs-container">
                <div className="lp-hub-tabs">
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
            </div>

            {/* Content */}
            <div className="lp-hub-content">
                {activeTab === 'create' ? <CreateLinkPage /> : <LinksPage />}
            </div>
        </div>
    );
}

const linksHubStyles = `
  .lp-links-hub {
    min-height: 100dvh;
    position: relative;
  }

  /* Tabs Container - Fixed at top below header */
  .lp-hub-tabs-container {
    position: sticky;
    top: calc(56px + env(safe-area-inset-top, 0px));
    z-index: 40;
    background: rgba(2, 6, 23, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 12px 16px;
    border-bottom: 1px solid rgba(99, 102, 241, 0.15);
  }

  @media (min-width: 769px) {
    .lp-hub-tabs-container {
      top: 0;
    }
  }

  .lp-hub-tabs {
    display: flex;
    gap: 8px;
    max-width: 400px;
    margin: 0 auto;
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
    z-index: 1;
  }

  /* Override nested page backgrounds - they use their own */
  .lp-hub-content .lp-bg,
  .lp-hub-content .lp-create-bg {
    display: none;
  }

  .lp-hub-content .lp-create-shell,
  .lp-hub-content .lp-links-shell {
    position: relative;
    min-height: auto;
    padding-top: 0;
  }
`;
