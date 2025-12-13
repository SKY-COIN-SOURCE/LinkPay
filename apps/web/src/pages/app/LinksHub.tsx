import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlusSquare, Link2 } from 'lucide-react';

type TabType = 'create' | 'list';

export function LinksHub() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine initial tab from URL query param
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<TabType>(tabParam === 'list' ? 'list' : 'create');

  // Navigate to actual page when tab changes
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'create') {
      navigate('/app/links?tab=create', { replace: true });
    } else {
      navigate('/app/links?tab=list', { replace: true });
    }
  };

  return (
    <div className="lp-links-hub-shell">
      <style>{linksHubStyles}</style>

      {/* Premium Tabs */}
      <div className="lp-links-tabs-bar">
        <button
          className={`lp-links-tab ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => handleTabChange('create')}
        >
          <PlusSquare size={18} />
          <span>Crear Link</span>
        </button>
        <button
          className={`lp-links-tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => handleTabChange('list')}
        >
          <Link2 size={18} />
          <span>Mis Enlaces</span>
        </button>
      </div>

      {/* Redirect buttons to full pages */}
      <div className="lp-links-content">
        {activeTab === 'create' ? (
          <CreateLinkSection />
        ) : (
          <LinksListSection />
        )}
      </div>
    </div>
  );
}

// Simplified Create Link Section - inline form
function CreateLinkSection() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    try {
      // Import and use the LinkService
      const { LinkService } = await import('../../lib/linkService');
      const result = await LinkService.create({
        original_url: url.trim(),
        slug: alias.trim() || undefined,
      });

      if (result?.slug) {
        setSuccess(`${window.location.origin}/l/${result.slug}`);
        setUrl('');
        setAlias('');
      }
    } catch (error) {
      console.error('Error creating link:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    if (success) {
      navigator.clipboard.writeText(success);
    }
  };

  if (success) {
    return (
      <div className="lp-create-success">
        <div className="lp-success-icon">✓</div>
        <h3>¡Link creado!</h3>
        <div className="lp-success-url" onClick={copyLink}>
          {success}
          <span className="lp-copy-hint">Toca para copiar</span>
        </div>
        <button
          className="lp-btn-create-another"
          onClick={() => setSuccess(null)}
        >
          Crear otro link
        </button>
      </div>
    );
  }

  return (
    <form className="lp-create-form" onSubmit={handleSubmit}>
      <div className="lp-form-card">
        <label className="lp-form-label">URL de destino</label>
        <input
          type="url"
          className="lp-form-input"
          placeholder="https://ejemplo.com/tu-enlace"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      <div className="lp-form-card">
        <label className="lp-form-label">Alias (opcional)</label>
        <div className="lp-alias-row">
          <span className="lp-alias-prefix">linkpay.gg/</span>
          <input
            type="text"
            className="lp-form-input lp-alias-input"
            placeholder="mi-enlace"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="lp-btn-submit"
        disabled={loading || !url.trim()}
      >
        {loading ? 'Creando...' : 'Crear Smart Link'}
      </button>
    </form>
  );
}

// Simplified Links List Section
function LinksListSection() {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      const { LinkService } = await import('../../lib/linkService');
      const data = await LinkService.getAll();
      setLinks(data || []);
    } catch (error) {
      console.error('Error loading links:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/l/${slug}`);
  };

  const deleteLink = async (id: string) => {
    if (!confirm('¿Eliminar este enlace?')) return;
    try {
      const { LinkService } = await import('../../lib/linkService');
      await LinkService.deleteLink(id);
      setLinks(links.filter(l => l.id !== id));
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  if (loading) {
    return <div className="lp-links-loading">Cargando enlaces...</div>;
  }

  if (links.length === 0) {
    return (
      <div className="lp-links-empty">
        <div className="lp-empty-icon">🔗</div>
        <p>No tienes enlaces todavía</p>
        <p className="lp-empty-hint">Crea tu primer Smart Link en la pestaña "Crear Link"</p>
      </div>
    );
  }

  return (
    <div className="lp-links-list">
      <div className="lp-links-count">{links.length} enlaces</div>
      {links.map((link) => (
        <div key={link.id} className="lp-link-card">
          <div className="lp-link-info">
            <div className="lp-link-slug">/{link.slug}</div>
            <div className="lp-link-url">{link.original_url}</div>
            <div className="lp-link-stats">
              {link.clicks || 0} clics · €{(link.revenue || 0).toFixed(2)}
            </div>
          </div>
          <div className="lp-link-actions">
            <button
              className="lp-link-action-btn"
              onClick={() => copyLink(link.slug)}
            >
              📋
            </button>
            <button
              className="lp-link-action-btn lp-delete"
              onClick={() => deleteLink(link.id)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const linksHubStyles = `
  .lp-links-hub-shell {
    min-height: 100dvh;
    padding-top: calc(56px + env(safe-area-inset-top, 0px));
    padding-bottom: 100px;
    background: linear-gradient(180deg, #0a0f1a 0%, #020617 50%, #000000 100%);
  }

  @media (min-width: 769px) {
    .lp-links-hub-shell {
      padding-top: 0;
      margin-left: 260px;
    }
  }

  /* Tabs Bar */
  .lp-links-tabs-bar {
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    background: rgba(2, 6, 23, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(99, 102, 241, 0.15);
    position: sticky;
    top: 0;
    z-index: 10;
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

  /* Content */
  .lp-links-content {
    padding: 16px;
  }

  /* Create Form */
  .lp-create-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .lp-form-card {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(30, 64, 175, 0.5);
    border-radius: 16px;
    padding: 16px;
  }

  .lp-form-label {
    display: block;
    color: #e5e7eb;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .lp-form-input {
    width: 100%;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    background: rgba(15, 23, 42, 0.9);
    color: #f9fafb;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s;
  }

  .lp-form-input:focus {
    border-color: rgba(99, 102, 241, 0.7);
  }

  .lp-alias-row {
    display: flex;
    align-items: center;
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 12px;
    overflow: hidden;
  }

  .lp-alias-prefix {
    padding: 12px;
    color: #94a3b8;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.3);
    border-right: 1px solid rgba(148, 163, 184, 0.2);
  }

  .lp-alias-input {
    border: none !important;
    border-radius: 0 !important;
  }

  .lp-btn-submit {
    padding: 14px 24px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .lp-btn-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .lp-btn-submit:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
  }

  /* Success State */
  .lp-create-success {
    text-align: center;
    padding: 40px 20px;
  }

  .lp-success-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 16px;
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    color: white;
  }

  .lp-create-success h3 {
    color: #f9fafb;
    margin-bottom: 16px;
  }

  .lp-success-url {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(99, 102, 241, 0.5);
    border-radius: 12px;
    padding: 16px;
    color: #a5b4fc;
    font-size: 14px;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .lp-copy-hint {
    display: block;
    font-size: 11px;
    color: #94a3b8;
    margin-top: 8px;
  }

  .lp-btn-create-another {
    padding: 12px 24px;
    border-radius: 10px;
    border: 1px solid rgba(99, 102, 241, 0.5);
    background: transparent;
    color: #a5b4fc;
    font-size: 14px;
    cursor: pointer;
  }

  /* Links List */
  .lp-links-loading,
  .lp-links-empty {
    text-align: center;
    padding: 60px 20px;
    color: #94a3b8;
  }

  .lp-empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .lp-empty-hint {
    font-size: 13px;
    margin-top: 8px;
    opacity: 0.7;
  }

  .lp-links-count {
    color: #94a3b8;
    font-size: 13px;
    margin-bottom: 12px;
    padding: 0 4px;
  }

  .lp-links-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .lp-link-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(30, 64, 175, 0.5);
    border-radius: 14px;
    padding: 14px;
  }

  .lp-link-info {
    flex: 1;
    min-width: 0;
  }

  .lp-link-slug {
    color: #a5b4fc;
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 4px;
  }

  .lp-link-url {
    color: #94a3b8;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 6px;
  }

  .lp-link-stats {
    color: #64748b;
    font-size: 11px;
  }

  .lp-link-actions {
    display: flex;
    gap: 6px;
  }

  .lp-link-action-btn {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: none;
    background: rgba(255, 255, 255, 0.05);
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lp-link-action-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .lp-link-action-btn.lp-delete:hover {
    background: rgba(239, 68, 68, 0.2);
  }
`;
