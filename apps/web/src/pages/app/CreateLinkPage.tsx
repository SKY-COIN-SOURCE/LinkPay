import React, { useState } from 'react';
import {
  Link2,
  Zap,
  Rocket,
  ArrowRight,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  Settings,
  Calendar,
  Lock,
  MousePointer2,
  EyeOff,
} from 'lucide-react';
import { LinkService } from '../../lib/linkService';
import { useNavigate } from 'react-router-dom';

export function CreateLinkPage() {
  const navigate = useNavigate();

  // Estados Básicos
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [mode, setMode] = useState<'standard' | 'turbo'>('standard'); // solo 2 modos

  // Estados Avanzados
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [password, setPassword] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [maxClicks, setMaxClicks] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setErrorMsg('');
    setLoading(true);

    try {
      let finalUrl = url.trim();
      if (!/^https?:\/\//i.test(finalUrl)) finalUrl = 'https://' + finalUrl;

      // 🧱 NORMALIZAMOS EL ALIAS: sin espacios, en minúsculas
      const cleanAlias = alias.trim();
      const normalizedAlias = cleanAlias ? cleanAlias.toLowerCase() : '';

      const data = await LinkService.create(finalUrl, normalizedAlias, mode, {
        password: password || undefined,
        expiresAt: expirationDate ? new Date(expirationDate).toISOString() : undefined,
        maxClicks: maxClicks ? parseInt(maxClicks) : undefined,
        isPrivate,
      });

      const shortUrl = `${window.location.origin}/l/${data.slug}`;
      setResult({ ...data, short_url: shortUrl });
    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes('alias')) {
        setErrorMsg('Este alias ya está ocupado. Prueba otro.');
      } else {
        setErrorMsg(err.message || 'Error al crear el enlace.');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.short_url);
      alert('¡Copiado!');
    }
  };

  // ===================== VISTA EXITO =====================
  if (result) {
    return (
      <div className="lp-create-shell">
        <style>{baseStyles}</style>
        <div className="lp-create-inner lp-success">
          <div className="lp-success-card">
            <div className="lp-success-icon">
              <Check size={28} />
            </div>
            <h2>¡Enlace listo!</h2>
            <p className="lp-success-sub">
              Estrategia:{' '}
              <strong className="lp-success-mode">
                {result.monetization_mode?.toUpperCase()}
              </strong>
            </p>

            <div className="lp-success-url">
              <input readOnly value={result.short_url} />
              <button type="button" onClick={copyToClipboard}>
                <Copy size={18} />
              </button>
            </div>

            <div className="lp-success-actions">
              <button
                type="button"
                className="lp-btn-ghost"
                onClick={() => {
                  setResult(null);
                  setUrl('');
                  setAlias('');
                  setPassword('');
                  setExpirationDate('');
                  setMaxClicks('');
                  setIsPrivate(false);
                }}
              >
                Crear otro
              </button>
              <button
                type="button"
                className="lp-btn-primary"
                onClick={() => navigate('/app/links')}
              >
                Mis enlaces
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===================== VISTA FORM =====================
  return (
    <div className="lp-create-shell">
      <style>{baseStyles}</style>

      <div className="lp-create-inner">
        {/* HEADER */}
        <header className="lp-header">
          <div>
            <h1>Crear Enlace</h1>
            <p>Transforma tus URLs en máquinas de ingresos.</p>
          </div>
        </header>

        <form className="lp-form" onSubmit={handleCreate}>
          {/* URL */}
          <div className="lp-card lp-card-url">
            <label className="lp-label">URL de destino</label>
            <div className="lp-input-icon-wrapper">
              <span className="lp-input-icon">
                <Link2 size={18} />
              </span>
              <input
                type="text"
                placeholder="https://tuvideo.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="lp-input lp-input-with-icon"
                required
              />
            </div>
          </div>

          {/* CONFIG */}
          <div className="lp-card lp-card-config">
            <div className="lp-card-title">
              <Zap size={18} />
              <span>Configuración</span>
            </div>

            {/* Alias */}
            <div className="lp-field">
              <label className="lp-label">Alias (opcional)</label>
              <div className="lp-alias-row">
                <span className="lp-alias-prefix">linkpay.gg/</span>
                <input
                  type="text"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="mi-enlace"
                  className="lp-input lp-alias-input"
                />
              </div>
              <p className="lp-help">Déjalo vacío para generar uno aleatorio.</p>
            </div>

            {/* Estrategia de monetización */}
            <div className="lp-field">
              <label className="lp-label small">Estrategia de monetización</label>
              <div className="lp-mode-row">
                <button
                  type="button"
                  className={`lp-mode-pill ${mode === 'standard' ? 'active' : ''}`}
                  onClick={() => setMode('standard')}
                >
                  <span className="lp-mode-icon">
                    <Zap size={16} />
                  </span>
                  <span className="lp-mode-text-main">Estándar</span>
                  <span className="lp-mode-text-sub">Balance ideal</span>
                </button>

                <button
                  type="button"
                  className={`lp-mode-pill ${mode === 'turbo' ? 'active' : ''}`}
                  onClick={() => setMode('turbo')}
                >
                  <span className="lp-mode-icon turbo">
                    <Rocket size={16} />
                  </span>
                  <span className="lp-mode-text-main">Turbo</span>
                  <span className="lp-mode-text-sub">Máximos ingresos</span>
                </button>
              </div>
            </div>

            {/* Opciones avanzadas */}
            <div className="lp-advanced-toggle">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <Settings size={15} />
                {showAdvanced
                  ? 'Ocultar opciones avanzadas'
                  : 'Opciones avanzadas (contraseña, expiración...)'}
              </button>
            </div>

            {showAdvanced && (
              <div className="lp-advanced-grid">
                <div className="lp-field">
                  <label className="lp-label">Contraseña</label>
                  <div className="lp-input-icon-wrapper">
                    <span className="lp-input-icon">
                      <Lock size={15} />
                    </span>
                    <input
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Opcional"
                      className="lp-input lp-input-with-icon"
                    />
                  </div>
                </div>

                <div className="lp-field">
                  <label className="lp-label">Fecha de expiración</label>
                  <div className="lp-input-icon-wrapper">
                    <span className="lp-input-icon">
                      <Calendar size={15} />
                    </span>
                    <input
                      type="datetime-local"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                      className="lp-input lp-input-with-icon"
                    />
                  </div>
                </div>

                <div className="lp-field">
                  <label className="lp-label">Límite de clics</label>
                  <div className="lp-input-icon-wrapper">
                    <span className="lp-input-icon">
                      <MousePointer2 size={15} />
                    </span>
                    <input
                      type="number"
                      value={maxClicks}
                      onChange={(e) => setMaxClicks(e.target.value)}
                      placeholder="Ej: 100"
                      className="lp-input lp-input-with-icon"
                    />
                  </div>
                </div>

                <div className="lp-field lp-private-row">
                  <div
                    className={`lp-switch ${isPrivate ? 'on' : ''}`}
                    onClick={() => setIsPrivate(!isPrivate)}
                  >
                    <div className="lp-switch-thumb" />
                  </div>
                  <div className="lp-private-label">
                    <EyeOff size={15} />
                    <span>Enlace privado</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="lp-error">
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="lp-btn-primary lp-btn-submit"
          >
            {loading ? (
              <Loader2 className="spin" size={18} />
            ) : (
              <>
                Crear enlace <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// ===================== ESTILOS CSS-IN-JS =====================

const baseStyles = `
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { 100% { transform: rotate(360deg); } }

  .lp-create-shell {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .lp-create-inner {
    width: 100%;
    max-width: 800px;
    padding: 8px 12px 96px 12px;
  }

  .lp-header h1 {
    margin: 0 0 2px 0;
    font-weight: 900;
    letter-spacing: -0.03em;
    color: #0f172a;
  }

  .lp-header p {
    margin: 0;
    color: #64748b;
  }

  .lp-form {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .lp-card {
    background: white;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
  }

  .lp-card-url {
    padding: 14px 12px 14px 12px;
  }

  .lp-card-config {
    padding: 14px 12px 16px 12px;
  }

  .lp-card-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 10px;
    font-size: 13px;
  }

  .lp-card-title svg {
    color: #eab308;
  }

  .lp-label {
    font-size: 12px;
    font-weight: 700;
    color: #475569;
    text-transform: none;
    margin-bottom: 4px;
  }
  .lp-label.small {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #94a3b8;
  }

  .lp-field {
    margin-top: 10px;
  }

  .lp-input {
    width: 100%;
    border-radius: 12px;
    border: 1px solid #cbd5e1;
    padding: 10px 12px;
    font-size: 14px;
    font-weight: 500;
    outline: none;
    color: #0f172a;
    background: #ffffff;
  }

  .lp-input-icon-wrapper {
    position: relative;
  }

  .lp-input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lp-input-with-icon {
    padding-left: 38px;
  }

  .lp-alias-row {
    display: flex;
    align-items: stretch;
    border-radius: 12px;
    overflow: hidden;
  }

  .lp-alias-prefix {
    padding: 9px 10px;
    font-size: 11px;
    background: #f1f5f9;
    color: #64748b;
    border: 1px solid #cbd5e1;
    border-right: none;
    font-family: monospace;
    min-width: 96px;
    display: flex;
    align-items: center;
  }

  .lp-alias-input {
    border-radius: 0 12px 12px 0;
    border-left: none;
    font-size: 13px;
  }

  .lp-help {
    margin: 4px 0 0 0;
    font-size: 11px;
    color: #94a3b8;
  }

  .lp-mode-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 6px;
  }

  .lp-mode-pill {
    border-radius: 999px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .lp-mode-pill.active {
    border-color: #2563eb;
    background: #eff6ff;
    box-shadow: 0 8px 18px rgba(37, 99, 235, 0.18);
  }

  .lp-mode-icon {
    width: 20px;
    height: 20px;
    border-radius: 999px;
    background: rgba(37,99,235,0.10);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1d4ed8;
  }

  .lp-mode-icon.turbo {
    background: rgba(249,115,22,0.12);
    color: #c2410c;
  }

  .lp-mode-text-main {
    font-size: 12px;
    font-weight: 700;
    color: #0f172a;
  }

  .lp-mode-text-sub {
    font-size: 10px;
    color: #64748b;
  }

  .lp-advanced-toggle {
    margin-top: 10px;
  }

  .lp-advanced-toggle button {
    border: none;
    background: transparent;
    color: #4f46e5;
    font-weight: 600;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .lp-advanced-grid {
    margin-top: 10px;
    display: grid;
    gap: 10px;
  }

  .lp-private-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 4px;
  }

  .lp-switch {
    width: 42px;
    height: 22px;
    background: #e2e8f0;
    border-radius: 999px;
    position: relative;
    padding: 2px;
    cursor: pointer;
    transition: background 0.18s;
  }

  .lp-switch.on {
    background: #2563eb;
  }

  .lp-switch-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 999px;
    box-shadow: 0 1px 3px rgba(15,23,42,0.25);
    transition: left 0.18s;
  }

  .lp-switch.on .lp-switch-thumb {
    left: 22px;
  }

  .lp-private-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #334155;
    font-weight: 600;
  }

  .lp-error {
    margin-top: 8px;
    background: #fef2f2;
    border-radius: 12px;
    padding: 10px 12px;
    border: 1px solid #fecaca;
    font-size: 12px;
    color: #b91c1c;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .lp-btn-primary {
    border: none;
    background: #0f172a;
    color: white;
    border-radius: 999px;
    padding: 13px 18px;
    font-size: 15px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    box-shadow: 0 14px 30px rgba(15,23,42,0.35);
  }

  .lp-btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    box-shadow: none;
  }

  .lp-btn-submit {
    width: 100%;
    margin-top: 6px;
  }

  /* ÉXITO */
  .lp-success {
    padding-top: 24px;
  }

  .lp-success-card {
    background: white;
    border-radius: 24px;
    border: 1px solid #e2e8f0;
    padding: 24px 18px;
    text-align: center;
    box-shadow: 0 18px 40px rgba(15,23,42,0.22);
  }

  .lp-success-icon {
    width: 60px;
    height: 60px;
    border-radius: 999px;
    margin: 0 auto 18px auto;
    background: #dcfce7;
    color: #16a34a;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lp-success-card h2 {
    margin: 0 0 4px 0;
    font-size: 22px;
    font-weight: 900;
    color: #0f172a;
  }

  .lp-success-sub {
    margin: 0 0 18px 0;
    font-size: 13px;
    color: #64748b;
  }

  .lp-success-mode {
    color: #4f46e5;
  }

  .lp-success-url {
    display: flex;
    align-items: stretch;
    gap: 8px;
    margin-bottom: 18px;
  }

  .lp-success-url input {
    flex: 1;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    padding: 10px 12px;
    font-size: 13px;
    font-weight: 600;
    color: #0f172a;
    font-family: monospace;
    outline: none;
  }

  .lp-success-url button {
    border-radius: 12px;
    border: none;
    padding: 8px 10px;
    background: #0f172a;
    color: white;
    cursor: pointer;
  }

  .lp-success-actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .lp-btn-ghost {
    border: none;
    background: transparent;
    color: #64748b;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
  }

  /* ------- RESPONSIVE ------- */

  @media (max-width: 640px) {
    .lp-create-inner {
      padding: 6px 10px 86px 10px;
    }
    .lp-header h1 {
      font-size: 22px;
    }
    .lp-header p {
      font-size: 13px;
    }
    .lp-card-url,
    .lp-card-config {
      padding: 12px 10px;
    }
    .lp-mode-row {
      gap: 6px;
    }
    .lp-mode-pill {
      padding: 7px 8px;
    }
  }

  @media (min-width: 641px) {
    .lp-advanced-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;
