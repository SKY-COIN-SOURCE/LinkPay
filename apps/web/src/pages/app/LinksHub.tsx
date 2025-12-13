import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlusSquare, Link2 } from 'lucide-react';

type TabType = 'create' | 'list';

export function LinksHub() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we came from a specific tab via query param
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get('tab') === 'list' ? 'list' : 'create';
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // Navigate to the actual page
    if (tab === 'create') {
      navigate('/app/create-link');
    } else {
      navigate('/app/my-links');
    }
  };

  // On mount, redirect to the appropriate page based on tab
  useEffect(() => {
    if (activeTab === 'create') {
      navigate('/app/create-link', { replace: true });
    } else {
      navigate('/app/my-links', { replace: true });
    }
  }, []);

  return (
    <div className="lp-links-hub">
      <style>{linksHubStyles}</style>

      {/* Loading state while redirecting */}
      <div className="lp-hub-loading">
        <div className="lp-hub-spinner" />
        <span>Cargando...</span>
      </div>
    </div>
  );
}

const linksHubStyles = `
  .lp-links-hub {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #0a0f1a 0%, #020617 50%, #000000 100%);
  }

  .lp-hub-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    color: #94a3b8;
    font-size: 14px;
  }

  .lp-hub-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid rgba(99, 102, 241, 0.2);
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
