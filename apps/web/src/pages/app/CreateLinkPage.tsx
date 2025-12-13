import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
} from 'lucide-react';
import { LinkService } from '../../lib/linkService';
import { useNavigate } from 'react-router-dom';

// Nuevas librerías solo para UX
import { motion, AnimatePresence } from 'framer-motion';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import Confetti from 'react-confetti';
import './CreateLink.css';

export function CreateLinkPage() {
  const navigate = useNavigate();

  // Estados Básicos
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [mode, setMode] = useState<'standard' | 'turbo'>('standard');

  // Estados Avanzados (lógica de opciones)
  const [password, setPassword] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [maxClicks, setMaxClicks] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState<any>(null);

  // Estados NUEVOS solo para UX
  const [showConfetti, setShowConfetti] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [engineOpen, setEngineOpen] = useState(true); // pestaña motor abierta/cerrada

  // NEW: refs para auto-scroll móvil
  const engineRef = useRef<HTMLDivElement | null>(null);
  const [engineScrollY, setEngineScrollY] = useState<number | null>(null);

  useEffect(() => {
    if (result) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(t);
    } else {
      setShowConfetti(false);
    }
  }, [result]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setErrorMsg('');
    setLoading(true);

    try {
      let finalUrl = url.trim();
      if (!/^https?:\/\//i.test(finalUrl)) finalUrl = 'https://' + finalUrl;

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

  // NEW: toggle con auto-scroll SOLO en móvil
  const handleToggleEngine = () => {
    const isBrowser = typeof window !== 'undefined';
    const isMobile = isBrowser && window.innerWidth <= 800;

    if (!isMobile) {
      // En escritorio solo abrimos/cerramos, sin scroll especial
      setEngineOpen((prev) => !prev);
      return;
    }

    if (!isBrowser) {
      setEngineOpen((prev) => !prev);
      return;
    }

    if (!engineOpen) {
      // Vamos a abrir el panel en móvil
      const currentScroll = window.scrollY || window.pageYOffset;
      setEngineScrollY(currentScroll);
      setEngineOpen(true);

      // Dejamos que el contenido se expanda un poco y luego hacemos scroll
      setTimeout(() => {
        if (engineRef.current) {
          const rect = engineRef.current.getBoundingClientRect();
          const absoluteBottom = rect.bottom + window.scrollY;
          const viewportHeight =
            window.innerHeight || document.documentElement.clientHeight;

          // *** AJUSTE: más margen para que se vea también el botón "Crear enlace"
          const target = Math.max(
            0,
            absoluteBottom - viewportHeight + 220 // antes 24
          );

          window.scrollTo({ top: target, behavior: 'smooth' });
        }
      }, 60);
    } else {
      // Vamos a cerrar el panel
      const prev = engineScrollY;
      setEngineOpen(false);

      setTimeout(() => {
        if (prev != null) {
          window.scrollTo({ top: prev, behavior: 'smooth' });
        } else if (engineRef.current) {
          const top =
            engineRef.current.getBoundingClientRect().top +
            window.scrollY -
            40;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 80);
    }
  };

  // ============= VISTA DE ÉXITO =============

  const renderSuccessView = () => {
    if (!result) return null;

    return (
      <motion.div
        key="success"
        className="lp-create-shell lp-create-bg"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.22 }}
      >
        <style>{baseStyles}</style>

        {showConfetti && (
          <div className="lp-confetti-layer">
            <Confetti numberOfPieces={200} recycle={false} />
          </div>
        )}

        <div className="lp-create-inner lp-success-v2">
          <div className="lp-success-card-v2">
            <div className="lp-success-badge">SMART LINK CREADO</div>
            <div className="lp-success-icon-v2">
              <Check size={30} />
            </div>

            <h2>¡Tu Smart Link está activo!</h2>
            <p className="lp-success-sub">
              Modo:{' '}
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
                className="lp-btn-primary lp-btn-primary-gradient"
                onClick={() => navigate('/app/links')}
              >
                Ir a mis enlaces
              </button>
            </div>

            <p className="lp-success-foot">
              Tip: pega este Smart Link en tu bio de TikTok, Instagram o descripción de vídeo.
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  // ============= VISTA FORMULARIO SIMPLE =============

  const renderFormView = () => (
    <motion.div
      key="form"
      className="lp-create-shell lp-create-bg"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <style>{baseStyles}</style>

      <div className="lp-create-inner">

        <form className="lp-flow" onSubmit={handleCreate}>
          {/* 1. URL DESTINO */}
          <div className="lp-card-v2 lp-card-main lp-card-animate lp-card-url">
            <label className="lp-label-v2">URL de destino</label>
            <p className="lp-label-sub">
              Cualquier enlace público: vídeos, tiendas, redes, lo que quieras.
            </p>
            <div className="lp-input-icon-wrapper">
              <span className="lp-input-icon">
                <Link2 size={18} />
              </span>
              <input
                type="text"
                placeholder="https://tuvideo.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="lp-input-v2 lp-input-with-icon"
                required
              />
            </div>
          </div>

          {/* 2. ALIAS SIMPLE */}
          <div className="lp-card-v2 lp-card-main lp-card-animate lp-card-alias">
            <div className="lp-section-title">
              <span className="lp-section-icon">
                <Zap size={16} />
              </span>
              <div>
                <div className="lp-section-label">Nombre del enlace (alias)</div>
                <div className="lp-section-caption">
                  Para que se vea bonito y fácil de recordar.
                </div>
              </div>
            </div>

            <div className="lp-field-v2">
              <label className="lp-label-v2">Alias (opcional)</label>
              <div className="lp-alias-row-v2">
                <span className="lp-alias-prefix-v2">linkpay.gg/</span>
                <input
                  type="text"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="mi-enlace"
                  className="lp-input-v2 lp-alias-input-v2"
                />
              </div>
              <p className="lp-help-v2">Si lo dejas vacío, creamos uno automático.</p>
            </div>
          </div>

          {/* 3. MOTOR DE INGRESOS (ahora antes del botón y colapsable) */}
          <div
            ref={engineRef}
            className={`lp-engine-card ${engineOpen ? 'open' : 'closed'}`}
          >
            <button
              type="button"
              className="lp-engine-header-click"
              onClick={handleToggleEngine}
            >
              <div className="lp-engine-top">
                <div className="lp-engine-chip">
                  MODO {mode === 'standard' ? 'ESTÁNDAR' : 'TURBO'}
                </div>
                <div className="lp-engine-title">Motor de ingresos</div>
                <p className="lp-engine-sub">
                  Ajusta cómo mostramos anuncios y protege tu enlace (opcional).
                </p>
              </div>
              <ChevronDown
                size={18}
                className={`lp-engine-chevron ${engineOpen ? 'open' : ''}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {engineOpen && (
                <motion.div
                  className="lp-engine-body"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {/* Selector de modo */}
                  <div className="lp-mode-row-v2">
                    <button
                      type="button"
                      className={`lp-mode-pill-v2 ${mode === 'standard' ? 'active' : ''}`}
                      onClick={() => setMode('standard')}
                    >
                      <span className="lp-mode-pill-icon standard">
                        <Zap size={16} />
                      </span>
                      <div className="lp-mode-pill-texts">
                        <span className="main">Estándar</span>
                        <span className="sub">      Equilibrio entre experiencia y dinero.</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`lp-mode-pill-v2 ${mode === 'turbo' ? 'active' : ''}`}
                      onClick={() => setMode('turbo')}
                    >
                      <span className="lp-mode-pill-icon turbo">
                        <Rocket size={16} />
                      </span>
                      <div className="lp-mode-pill-texts">
                        <span className="main">Turbo</span>
                        <span className="sub">      Máximo dinero, más impacto publicitario.</span>
                      </div>
                    </button>
                  </div>

                  {/* Toggle avanzadas -> BottomSheet */}
                  <div className="lp-advanced-toggle-v2">
                    <button
                      type="button"
                      onClick={() => setSheetOpen(true)}
                    >
                      <Settings size={15} />
                      Opciones avanzadas (contraseña, fecha, clicks…)
                    </button>
                  </div>

                  <BottomSheet
                    open={sheetOpen}
                    onDismiss={() => setSheetOpen(false)}
                    snapPoints={({ maxHeight }) => [
                      Math.min(maxHeight * 0.6, 480),
                      Math.min(maxHeight * 0.9, 640),
                    ]}
                  >
                    <div className="lp-advanced-sheet-header">
                      <h3>Opciones avanzadas</h3>
                      <p>Solo si quieres controlar quién entra y hasta cuándo.</p>
                    </div>

                    <div className="lp-advanced-grid-v2 lp-advanced-grid-sheet">
                      <div className="lp-field-v2">
                        <label className="lp-label-v2">Contraseña</label>
                        <div className="lp-input-icon-wrapper">
                          <span className="lp-input-icon">
                            <Lock size={15} />
                          </span>
                          <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Opcional"
                            className="lp-input-v2 lp-input-with-icon"
                          />
                        </div>
                      </div>

                      <div className="lp-field-v2">
                        <label className="lp-label-v2">Fecha de expiración</label>
                        <div className="lp-input-icon-wrapper">
                          <span className="lp-input-icon">
                            <Calendar size={15} />
                          </span>
                          <input
                            type="datetime-local"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            className="lp-input-v2 lp-input-with-icon"
                          />
                        </div>
                      </div>

                      <div className="lp-field-v2">
                        <label className="lp-label-v2">Límite de clics</label>
                        <div className="lp-input-icon-wrapper">
                          <span className="lp-input-icon">
                            <MousePointer2 size={15} />
                          </span>
                          <input
                            type="number"
                            value={maxClicks}
                            onChange={(e) => setMaxClicks(e.target.value)}
                            placeholder="Ej: 100"
                            className="lp-input-v2 lp-input-with-icon"
                          />
                        </div>
                      </div>

                      <div className="lp-field-v2 lp-private-row-v2">
                        <div
                          className={`lp-switch-v2 ${isPrivate ? 'on' : ''}`}
                          onClick={() => setIsPrivate(!isPrivate)}
                        >
                          <div className="lp-switch-thumb-v2" />
                        </div>
                        <div className="lp-private-label-v2">
                          <EyeOff size={15} />
                          <span>Enlace privado (no aparece en tu lista pública)</span>
                        </div>
                      </div>
                    </div>
                  </BottomSheet>

                  {/* HUD resumen */}
                  <div className="lp-engine-footer">
                    <div className="lp-engine-stat">
                      <span className="label">Alias</span>
                      <span className="value">
                        {alias ? `linkpay.gg/${alias}` : 'Se generará automáticamente'}
                      </span>
                    </div>
                    <div className="lp-engine-stat">
                      <span className="label">Seguridad</span>
                      <span className="value">
                        {password || expirationDate || maxClicks || isPrivate
                          ? 'Reglas avanzadas activas'
                          : 'Modo simple · sin restricciones'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. CTA PRINCIPAL (botón debajo del motor) */}
          <div className="lp-footer-row">
            {errorMsg && (
              <div className="lp-error-v2">
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="lp-btn-primary lp-btn-primary-gradient lp-btn-submit-v2"
            >
              {loading ? (
                <Loader2 className="spin" size={18} />
              ) : (
                <>
                  Crear enlace <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );

  // ===================== RENDER =====================

  return (
    <AnimatePresence mode="wait" initial={false}>
      {result ? renderSuccessView() : renderFormView()}
    </AnimatePresence>
  );
}

// ===================== ESTILOS V2 =====================
const baseStyles = `
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { 100% { transform: rotate(360deg); } }

  /* ===== GLOBAL: fondo full-screen y sin bordes blancos ===== */
  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
    max-width: 100%;
    overflow-x: hidden;
    background: #020617;
    touch-action: pan-y; /* solo scroll vertical */
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  body {
    overscroll-behavior-y: none;
  }

  /* Todos los inputs a 16px para que iOS NO haga zoom */
  .lp-create-shell input,
  .lp-create-shell select,
  .lp-create-shell textarea {
    font-size: 16px;
  }

  /* Fondo general: "galaxia" azul animada */
  .lp-bg {
    min-height: 100dvh;
    background:
      radial-gradient(circle at 0% 0%, #1e3a8a 0, transparent 55%),
      radial-gradient(circle at 100% 100%, #0f172a 0, #020617 55%, #000 100%);
    background-color: #020617;
    position: relative;
    overflow: hidden;
  }

  .lp-bg::before,
  .lp-bg::after {
    content: "";
    position: absolute;
    inset: -40%;
    background:
      radial-gradient(circle at 20% 0%, rgba(56, 189, 248, 0.15), transparent 60%),
      radial-gradient(circle at 80% 100%, rgba(129, 140, 248, 0.16), transparent 55%);
    opacity: 0.9;
    filter: blur(32px);
    pointer-events: none;
    animation: lp-nebula 20s ease-in-out infinite alternate;
  }

  .lp-bg::after {
    background:
      radial-gradient(circle at 0% 100%, rgba(34, 197, 94, 0.18), transparent 55%),
      radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.16), transparent 55%);
    mix-blend-mode: screen;
    animation: lp-orbit 30s linear infinite;
  }

  @keyframes lp-nebula {
    0% { transform: translate3d(-10px, -10px, 0) scale(1); opacity: 0.85; }
    100% { transform: translate3d(20px, 10px, 0) scale(1.1); opacity: 1; }
  }

  @keyframes lp-orbit {
    0% { transform: rotate(0deg) scale(1.05); }
    100% { transform: rotate(360deg) scale(1.05); }
  }

  .lp-create-shell {
    position: fixed;
    /* Mobile: start below header */
    top: calc(56px + env(safe-area-inset-top, 0px));
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: env(safe-area-inset-bottom, 0);
    overflow-y: auto;
    overflow-x: hidden;
    font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    -webkit-overflow-scrolling: touch;
  }

  /* Desktop: no header offset needed */
  @media (min-width: 769px) {
    .lp-create-shell {
      top: 0;
      min-height: 100dvh;
    }
  }

  .lp-create-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1080px;
    padding: 32px 16px 72px 16px; /* más padding abajo para ver el botón */
    margin: 0 auto;
  }

  /* HEADER */
  .lp-header-v2 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-bottom: 18px;
  }

  .lp-header-left {
    text-align: center;
    max-width: 520px;
    margin: 0 auto;
  }

  .lp-header-left h1 {
    margin: 0 0 4px 0;
    font-weight: 900;
    letter-spacing: -0.03em;
    color: #f9fafb;
    font-size: 28px;
  }

  .lp-header-left p {
    margin: 0 auto;
    color: #9ca3af;
    font-size: 13px;
    max-width: 520px;
  }

  .lp-title-row {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .lp-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(30, 64, 175, 0.75);
    color: #e5e7eb;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
    border: 1px solid rgba(148, 163, 184, 0.65);
    box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.8),
      0 0 18px rgba(59, 130, 246, 0.45);
    animation: lp-chip-glow 4s ease-in-out infinite;
  }

  @keyframes lp-chip-glow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.8), 0 0 10px rgba(59, 130, 246, 0.35); }
    50% { box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.9), 0 0 22px rgba(96, 165, 250, 0.8); }
  }

  .lp-chip-dot {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.35);
  }

  /* FLOW base (móvil / tablet) */
  .lp-flow {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* CARDS */
  .lp-card-v2 {
    background: rgba(15, 23, 42, 0.94);
    border-radius: 20px;
    border: 1px solid rgba(30, 64, 175, 0.55);
    box-shadow: 0 14px 40px rgba(15, 23, 42, 0.85);
    padding: 16px 16px 18px 16px;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    transition:
      transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1),
      box-shadow 0.25s ease,
      border-color 0.25s ease,
      background 0.25s ease;
  }

  .lp-card-main {
    background: radial-gradient(circle at top, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  }

  .lp-card-v2:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 55px rgba(15, 23, 42, 0.95);
    border-color: rgba(129, 140, 248, 0.8);
  }

  .lp-card-animate {
    animation: lp-card-enter 0.45s ease-out;
  }

  @keyframes lp-card-enter {
    from { opacity: 0; transform: translateY(10px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .lp-label-v2 {
    font-size: 12px;
    font-weight: 700;
    color: #e5e7eb;
    margin-bottom: 4px;
  }

  .lp-label-sub {
    font-size: 11px;
    color: #9ca3af;
    margin: 0 0 10px 0;
  }

  .lp-input-icon-wrapper {
    position: relative;
  }

  .lp-input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lp-input-v2 {
    width: 100%;
    border-radius: 14px;
    border: 1px solid rgba(148, 163, 184, 0.7);
    padding: 11px 12px;
    font-size: 16px;
    font-weight: 500;
    outline: none;
    color: #f9fafb;
    background: rgba(15, 23, 42, 0.92);
    transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, transform 0.18s ease;
  }

  .lp-input-v2::placeholder {
    color: #6b7280;
  }

  .lp-input-with-icon {
    padding-left: 42px;
  }

  .lp-input-v2:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.4), 0 0 32px rgba(79, 70, 229, 0.5);
    background: rgba(15, 23, 42, 0.98);
    transform: translateY(-1px);
  }

  .lp-section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .lp-section-icon {
    width: 26px;
    height: 26px;
    border-radius: 999px;
    background: radial-gradient(circle at top, #facc15, #f97316);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0f172a;
    box-shadow: 0 12px 30px rgba(249, 115, 22, 0.55);
  }

  .lp-section-label {
    font-size: 13px;
    font-weight: 700;
    color: #e5e7eb;
  }

  .lp-section-caption {
    font-size: 11px;
    color: #9ca3af;
  }

  .lp-field-v2 {
    margin-top: 10px;
  }

  /* Alias */
  .lp-alias-row-v2 {
    display: flex;
    align-items: stretch;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(148, 163, 184, 0.7);
    background: rgba(15, 23, 42, 0.9);
  }

  .lp-alias-prefix-v2 {
    padding: 10px 10px;
    font-size: 11px;
    background: rgba(15, 23, 42, 0.96);
    color: #9ca3af;
    border-right: 1px solid rgba(51, 65, 85, 0.95);
    font-family: monospace;
    min-width: 104px;
    display: flex;
    align-items: center;
  }

  .lp-alias-input-v2 {
    border: none;
    background: transparent;
    padding: 9px 10px;
    font-size: 16px;
    color: #f9fafb;
    outline: none;
    flex: 1;
  }

  .lp-help-v2 {
    margin: 4px 0 0 0;
    font-size: 11px;
    color: #9ca3af;
  }

  /* ENGINE PANEL */
  .lp-engine-card {
    background: radial-gradient(circle at top left, #111827, #020617);
    border-radius: 24px;
    border: 1px solid rgba(148, 163, 184, 0.65);
    box-shadow: 0 22px 65px rgba(0, 0, 0, 0.9);
    padding: 10px 14px 12px 14px;
    color: #e5e7eb;
    width: 100%;
    position: relative;
    overflow: hidden;
    animation: lp-engine-float 8s ease-in-out infinite;
  }

  @keyframes lp-engine-float {
    0%, 100% { transform: translateY(-2px); }
    50% { transform: translateY(2px); }
  }

  .lp-engine-card::before {
    content: "";
    position: absolute;
    inset: -80px;
    background:
      radial-gradient(circle at top right, rgba(79, 70, 229, 0.35), transparent 55%);
    opacity: 0.9;
    pointer-events: none;
  }

  .lp-engine-card.open {
    padding-bottom: 14px;
  }

  .lp-engine-card.closed {
    padding-bottom: 8px;
  }

  .lp-engine-header-click {
    position: relative;
    z-index: 1;
    border: none;
    background: transparent;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0 4px 0;
    cursor: pointer;
  }

  .lp-engine-top {
    text-align: left;
  }

  .lp-engine-chip {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(22, 163, 74, 0.16);
    border: 1px solid rgba(34, 197, 94, 0.7);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #bbf7d0;
    margin-bottom: 8px;
  }

  .lp-engine-title {
    font-size: 16px;
    font-weight: 800;
    color: #f9fafb;
    margin-bottom: 2px;
  }

  .lp-engine-sub {
    font-size: 12px;
    color: #9ca3af;
    margin: 0 0 4px 0;
  }

  .lp-engine-chevron {
    flex-shrink: 0;
    color: #9ca3af;
    transition: transform 0.18s ease;
  }

  .lp-engine-chevron.open {
    transform: rotate(180deg);
  }

  .lp-engine-body {
    position: relative;
    z-index: 1;
    margin-top: 8px;
  }

  /* Mode pills v2 */
  .lp-mode-row-v2 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    position: relative;
    z-index: 1;
  }

  .lp-mode-pill-v2 {
    border-radius: 14px;
    border: 1px solid rgba(148, 163, 184, 0.55);
    background: rgba(15, 23, 42, 0.95);
    padding: 8px 10px;
    display: flex;
    gap: 10px;
    cursor: pointer;
    align-items: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }

  .lp-mode-pill-v2:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.9);
  }

  .lp-mode-pill-v2:active {
    transform: scale(0.97);
  }

  .lp-mode-pill-v2.active {
    border-color: #6366f1;
    background: radial-gradient(circle at top left, rgba(79, 70, 229, 0.45), #020617);
    box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.6),
      0 18px 40px rgba(79, 70, 229, 0.5);
  }

  .lp-mode-pill-icon {
    width: 26px;
    height: 26px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .lp-mode-pill-icon.standard {
    background: rgba(59, 130, 246, 0.22);
    color: #bfdbfe;
  }

  .lp-mode-pill-icon.turbo {
    background: rgba(249, 115, 22, 0.22);
    color: #fed7aa;
  }

  .lp-mode-pill-texts .main {
    font-size: 13px;
    font-weight: 700;
    color: #e5e7eb;
  }

  .lp-mode-pill-texts .sub {
    font-size: 11px;
    color: #9ca3af;
  }

  .lp-advanced-toggle-v2 {
    margin-top: 10px;
    position: relative;
    z-index: 1;
  }

  .lp-advanced-toggle-v2 button {
    border: none;
    background: transparent;
    color: #a5b4fc;
    font-weight: 600;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .lp-advanced-grid-v2 {
    margin-top: 10px;
    display: grid;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .lp-private-row-v2 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 4px;
  }

  .lp-switch-v2 {
    width: 42px;
    height: 22px;
    background: #e5e7eb;
    border-radius: 999px;
    position: relative;
    padding: 2px;
    cursor: pointer;
    transition: background 0.18s;
  }

  .lp-switch-v2.on {
    background: #22c55e;
  }

  .lp-switch-thumb-v2 {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 999px;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.25);
    transition: left 0.18s;
  }

  .lp-switch-v2.on .lp-switch-thumb-v2 {
    left: 22px;
  }

  .lp-private-label-v2 {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #e5e7eb;
    font-weight: 500;
  }

  /* HUD resumen */
  .lp-engine-footer {
    position: relative;
    z-index: 1;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid rgba(148, 163, 184, 0.45);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .lp-engine-stat {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #9ca3af;
  }

  .lp-engine-stat .label {
    text-transform: uppercase;
    letter-spacing: 0.09em;
    font-weight: 700;
    color: #6b7280;
  }

  .lp-engine-stat .value {
    font-weight: 600;
    color: #e5e7eb;
    text-align: right;
  }

  /* Footer CTA (botón final) */
  .lp-footer-row {
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lp-error-v2 {
    background: rgba(248, 113, 113, 0.12);
    border-radius: 999px;
    padding: 8px 12px;
    border: 1px solid rgba(248, 113, 113, 0.75);
    font-size: 12px;
    color: #fecaca;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .lp-btn-primary {
    border: none;
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
    transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  }

  .lp-btn-primary-gradient {
    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #22c55e 100%);
    box-shadow:
      0 20px 60px rgba(15, 23, 42, 0.9),
      0 0 0 1px rgba(248, 250, 252, 0.06);
    animation: lp-btn-glow 6s ease-in-out infinite;
  }

  @keyframes lp-btn-glow {
    0%, 100% { filter: saturate(1); box-shadow: 0 20px 60px rgba(15, 23, 42, 0.9), 0 0 0 1px rgba(248, 250, 252, 0.06); }
    50% { filter: saturate(1.15); box-shadow: 0 28px 80px rgba(15, 23, 42, 1), 0 0 0 1px rgba(191, 219, 254, 0.4); }
  }

  .lp-btn-primary:hover:not(:disabled) {
    transform: translateY(-1px) scale(1.01);
    box-shadow:
      0 24px 72px rgba(15, 23, 42, 0.95),
      0 0 0 1px rgba(248, 250, 252, 0.08);
    filter: saturate(1.1);
  }

  .lp-btn-primary:active:not(:disabled) {
    transform: scale(0.97);
  }

  .lp-btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    box-shadow: none;
  }

  .lp-btn-submit-v2 {
    width: 100%;
  }

  /* ÉXITO V2 */
  .lp-success-v2 {
    padding-top: 40px;
  }

  .lp-success-card-v2 {
    max-width: 520px;
    margin: 0 auto;
    background: radial-gradient(circle at top, #111827, #020617);
    border-radius: 26px;
    border: 1px solid rgba(148, 163, 184, 0.7);
    padding: 26px 20px 22px 20px;
    text-align: center;
    box-shadow: 0 28px 72px rgba(0, 0, 0, 0.96);
    color: #e5e7eb;
    position: relative;
    overflow: hidden;
  }

  .lp-success-card-v2::before {
    content: "";
    position: absolute;
    inset: -80px;
    background:
      radial-gradient(circle at top right, rgba(34, 197, 94, 0.4), transparent 55%);
    opacity: 0.9;
    pointer-events: none;
  }

  .lp-success-badge {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(34, 197, 94, 0.14);
    border: 1px solid rgba(74, 222, 128, 0.8);
    color: #bbf7d0;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  .lp-success-icon-v2 {
    position: relative;
    z-index: 1;
    width: 68px;
    height: 68px;
    border-radius: 999px;
    margin: 0 auto 14px auto;
    background: radial-gradient(circle at top, #22c55e, #16a34a);
    color: #0f172a;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 18px 40px rgba(22, 163, 74, 0.8);
  }

  .lp-success-card-v2 h2 {
    position: relative;
    z-index: 1;
    margin: 0 0 4px 0;
    font-size: 22px;
    font-weight: 900;
    color: #f9fafb;
  }

  .lp-success-sub {
    position: relative;
    z-index: 1;
    margin: 0 0 18px 0;
    font-size: 13px;
    color: #cbd5f5;
  }

  .lp-success-mode {
    color: #a5b4fc;
  }

  .lp-success-url {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: stretch;
    gap: 8px;
    margin-bottom: 18px;
  }

  .lp-success-url input {
    flex: 1;
    border-radius: 14px;
    border: 1px solid rgba(148, 163, 184, 0.75);
    padding: 10px 12px;
    font-size: 16px;
    font-weight: 600;
    color: #e5e7eb;
    font-family: monospace;
    outline: none;
    background: rgba(15, 23, 42, 0.9);
  }

  .lp-success-url button {
    border-radius: 14px;
    border: none;
    padding: 8px 10px;
    background: #0f172a;
    color: white;
    cursor: pointer;
  }

  .lp-success-actions {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

  .lp-btn-ghost {
    border: none;
    background: transparent;
    color: #cbd5f5;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
  }

  .lp-success-foot {
    position: relative;
    z-index: 1;
    font-size: 11px;
    color: #9ca3af;
    margin: 0;
  }

  .lp-confetti-layer {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 40;
  }

  /* BottomSheet */
  .rsbs-root {
    --rsbs-bg: rgba(15, 23, 42, 0.98);
    --rsbs-backdrop-bg: rgba(15, 23, 42, 0.7);
    --rsbs-handle-bg: #4b5563;
    color: #e5e7eb;
    font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  }

  .lp-advanced-sheet-header {
    padding: 4px 12px 10px;
  }

  .lp-advanced-sheet-header h3 {
    margin: 0 0 4px;
    font-size: 14px;
    font-weight: 700;
    color: #e5e7eb;
  }

  .lp-advanced-sheet-header p {
    margin: 0;
    font-size: 11px;
    color: #9ca3af;
  }

  .lp-advanced-grid-sheet {
    padding: 0 12px 12px;
  }

  /* ===== LAYOUT ESCRITORIO ===== */
  @media (min-width: 1024px) {
    /* *** AJUSTE: que el contenido se alinee con el área derecha (no centrado bajo el sidebar) */
    .lp-create-shell {
      justify-content: flex-start;
    }

    /* desplazamos todo a la derecha, dejando hueco para el sidebar (~260px) */
    .lp-create-inner {
      margin: 0 40px 0 260px;
    }

    .lp-flow {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
      grid-auto-rows: auto;
      column-gap: 18px;
      row-gap: 14px;
      grid-template-areas:
        "url engine"
        "alias engine"
        "footer footer";
      align-items: flex-start;
    }

    .lp-card-url {
      grid-area: url;
    }

    .lp-card-alias {
      grid-area: alias;
    }

    .lp-engine-card {
      grid-area: engine;
      align-self: stretch;
    }

    .lp-footer-row {
      grid-area: footer;
      max-width: 520px;
      justify-self: center;
    }
  }

  /* RESPONSIVE MÓVIL / TABLET */
  @media (max-width: 800px) {
    .lp-create-inner {
      max-width: 480px;
      margin: 0 auto;
      padding: 20px 16px 140px 16px;
    }

    .lp-header-v2 {
      flex-direction: column;
      gap: 10px;
    }

    .lp-header-left p {
      font-size: 12px;
      max-width: none;
    }

    .lp-card-v2 {
      padding: 12px 12px 14px 12px;
      border-radius: 18px;
    }

    .lp-label-sub,
    .lp-help-v2 {
      font-size: 10px;
    }

    .lp-engine-card {
      border-radius: 22px;
      animation-duration: 10s;
    }

    .lp-card-v2:hover {
      transform: none;
      box-shadow: 0 14px 40px rgba(15, 23, 42, 0.75);
    }
  }
`;
