import React, { useState, useEffect } from 'react';
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
  Sparkles,
} from 'lucide-react';
import { LinkService } from '../../lib/linkService';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useDataCache } from '../../context/DataCacheContext';
import { useToast } from '../../components/ui/Toast';

/* ═══════════════════════════════════════════════════════════════════════════
   CREATE LINK - Integrated with LinksHub
   Mobile-first, minimal text, maximum visual impact
   ═══════════════════════════════════════════════════════════════════════════ */

interface CreateLinkPageProps {
  onSwitchToList?: () => void;
}

export function CreateLinkPage({ onSwitchToList }: CreateLinkPageProps) {
  const navigate = useNavigate();
  const { refreshLinks, refreshDashboard } = useDataCache();
  const toast = useToast();

  // Core States
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [mode, setMode] = useState<'standard' | 'turbo'>('standard');

  // Advanced Options
  const [password, setPassword] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [maxClicks, setMaxClicks] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  // UI States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (result) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(t);
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

      const cleanAlias = alias.trim().toLowerCase();

      const data = await LinkService.create(finalUrl, cleanAlias || '', mode, {
        password: password || undefined,
        expiresAt: expirationDate ? new Date(expirationDate).toISOString() : undefined,
        maxClicks: maxClicks ? parseInt(maxClicks) : undefined,
        isPrivate,
      });

      const shortUrl = `${window.location.origin}/l/${data.slug}`;
      setResult({ ...data, short_url: shortUrl });

      // Refrescar caché en background para que los datos estén actualizados
      refreshLinks();
      refreshDashboard();

      toast.success('¡Link creado exitosamente!');
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message?.includes('alias') ? 'Alias ocupado' : err.message || 'Error';
      setErrorMsg(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.short_url);
      setCopied(true);
      toast.success('¡Enlace copiado al portapapeles!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setResult(null);
    setUrl('');
    setAlias('');
    setPassword('');
    setExpirationDate('');
    setMaxClicks('');
    setIsPrivate(false);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // SUCCESS VIEW
  // ═══════════════════════════════════════════════════════════════════════════

  if (result) {
    return (
      <div className="lp-create-shell">
        <style>{createLinkStyles}</style>

        {showConfetti && (
          <div className="lp-confetti">
            <Confetti numberOfPieces={200} recycle={false} />
          </div>
        )}

        <div className="lp-create-inner">
          <motion.div
            className="lp-success-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="lp-success-glow" />

            <div className="lp-success-icon">
              <Check size={32} />
            </div>

            <div className="lp-success-badge">
              {mode === 'turbo' ? '🚀 TURBO' : '⚡ SMART'} LINK
            </div>

            <h2>¡Link creado!</h2>

            <div className="lp-success-url-box">
              <input readOnly value={result.short_url} />
              <button onClick={copyToClipboard} className={copied ? 'copied' : ''}>
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>

            <div className="lp-success-actions">
              <button onClick={resetForm} className="lp-btn-ghost">
                Crear otro
              </button>
              <button
                onClick={() => {
                  if (onSwitchToList) {
                    onSwitchToList();
                  } else {
                    navigate('/app/links');
                  }
                }}
                className="lp-btn-primary"
              >
                Mis enlaces <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FORM VIEW
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div className="lp-create-shell">
      <style>{createLinkStyles}</style>

      <div className="lp-create-inner">
        <form className="lp-create-form" onSubmit={handleCreate}>
          {/* URL INPUT - Hero Card */}
          <div className="lp-card-v2 lp-card-url">
            <div className="lp-card-glow" />
            <div className="lp-input-group">
              <div className="lp-input-icon">
                <Link2 size={20} />
              </div>
              <input
                type="text"
                placeholder="Pega tu URL aquí..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
          </div>

          {/* ALIAS INPUT */}
          <div className="lp-card-v2 lp-card-alias">
            <div className="lp-card-glow" />
            <label className="lp-alias-label">
              <Sparkles size={14} />
              Alias personalizado
            </label>
            <div className="lp-alias-input">
              <span>linkpay.gg/</span>
              <input
                type="text"
                placeholder="mi-link"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </div>
          </div>

          {/* MODE SELECTOR */}
          <div className="lp-mode-section">
            <button
              type="button"
              className={`lp-mode-btn ${mode === 'standard' ? 'active' : ''}`}
              onClick={() => setMode('standard')}
            >
              <div className="lp-mode-icon standard">
                <Zap size={22} />
              </div>
              <div className="lp-mode-info">
                <span className="lp-mode-name">Estándar</span>
                <span className="lp-mode-desc">Equilibrio perfecto</span>
              </div>
              {mode === 'standard' && <div className="lp-mode-check"><Check size={16} /></div>}
            </button>

            <button
              type="button"
              className={`lp-mode-btn ${mode === 'turbo' ? 'active' : ''}`}
              onClick={() => setMode('turbo')}
            >
              <div className="lp-mode-icon turbo">
                <Rocket size={22} />
              </div>
              <div className="lp-mode-info">
                <span className="lp-mode-name">Turbo</span>
                <span className="lp-mode-desc">Máximo ingreso</span>
              </div>
              {mode === 'turbo' && <div className="lp-mode-check"><Check size={16} /></div>}
            </button>
          </div>

          {/* ADVANCED OPTIONS TRIGGER */}
          <button
            type="button"
            className="lp-advanced-btn"
            onClick={() => setSheetOpen(true)}
          >
            <Settings size={16} />
            <span>Opciones avanzadas</span>
            <ChevronDown size={16} />
          </button>

          {/* PREMIUM ADVANCED OPTIONS MODAL */}
          <AnimatePresence>
            {sheetOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="lp-modal-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSheetOpen(false)}
                />

                {/* Modal */}
                <motion.div
                  className="lp-modal"
                  initial={{ opacity: 0, y: 100, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 80, scale: 0.95 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                  <div className="lp-modal-glow" />

                  {/* Handle bar */}
                  <div className="lp-modal-handle">
                    <div className="lp-modal-handle-bar" />
                  </div>

                  {/* Header */}
                  <motion.div
                    className="lp-modal-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="lp-modal-icon">
                      <Settings size={20} />
                    </div>
                    <div>
                      <h3>Opciones Avanzadas</h3>
                      <p>Protege y personaliza tu enlace</p>
                    </div>
                  </motion.div>

                  {/* Fields with staggered animation */}
                  <div className="lp-modal-fields">
                    <motion.div
                      className="lp-modal-field"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <div className="lp-modal-field-icon">
                        <Lock size={18} />
                      </div>
                      <div className="lp-modal-field-content">
                        <label>Contraseña</label>
                        <input
                          type="text"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Sin contraseña"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="lp-modal-field"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="lp-modal-field-icon">
                        <Calendar size={18} />
                      </div>
                      <div className="lp-modal-field-content">
                        <label>Fecha de expiración</label>
                        <input
                          type="datetime-local"
                          value={expirationDate}
                          onChange={(e) => setExpirationDate(e.target.value)}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="lp-modal-field"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <div className="lp-modal-field-icon">
                        <MousePointer2 size={18} />
                      </div>
                      <div className="lp-modal-field-content">
                        <label>Límite de clics</label>
                        <input
                          type="number"
                          value={maxClicks}
                          onChange={(e) => setMaxClicks(e.target.value)}
                          placeholder="Sin límite"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="lp-modal-toggle-row"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => setIsPrivate(!isPrivate)}
                    >
                      <div className="lp-modal-field-icon">
                        <EyeOff size={18} />
                      </div>
                      <div className="lp-modal-toggle-content">
                        <span>Enlace privado</span>
                        <p>No aparece en tu lista pública</p>
                      </div>
                      <div className={`lp-modal-toggle ${isPrivate ? 'on' : ''}`}>
                        <div className="lp-modal-toggle-thumb" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Close button */}
                  <motion.button
                    className="lp-modal-close-btn"
                    onClick={() => setSheetOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Check size={18} />
                    Aplicar
                  </motion.button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ERROR */}
          {errorMsg && (
            <div className="lp-error">
              <AlertCircle size={16} />
              {errorMsg}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button type="submit" disabled={loading} className="lp-submit">
            {loading ? (
              <Loader2 className="lp-spin" size={20} />
            ) : (
              <>
                Crear link <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STYLES - Integrated with LinksHub (uses lp-create-* classes)
   ═══════════════════════════════════════════════════════════════════════════ */

const createLinkStyles = `
  /* ═══════════════════════════════════════════════════════════════════════════
     ANIMATIONS - DASHBOARD GALAXY STYLE
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .lp-spin { animation: lp-spin 1s linear infinite; }
  @keyframes lp-spin { 100% { transform: rotate(360deg); } }

  /* Floating orb animations */
  @keyframes lp-orb-float-1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(60px, 40px) scale(1.1); }
    50% { transform: translate(30px, 80px) scale(0.95); }
    75% { transform: translate(-20px, 50px) scale(1.05); }
  }

  @keyframes lp-orb-float-2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-50px, -40px) scale(1.08); }
    66% { transform: translate(-80px, 20px) scale(0.92); }
  }

  @keyframes lp-orb-float-3 {
    0%, 100% { transform: translateX(0) scale(1); }
    50% { transform: translateX(70px) scale(1.12); }
  }

  /* Card glow pulse */
  @keyframes lp-glow-pulse {
    0%, 100% { 
      opacity: 0.5;
      transform: scale(1);
    }
    50% { 
      opacity: 0.9;
      transform: scale(1.02);
    }
  }

  /* Ambient pulse */
  @keyframes lp-ambient-pulse {
    0% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
  }

  /* Star particles drift */
  @keyframes lp-particles-drift {
    0% { transform: translateY(0); }
    100% { transform: translateY(-200px); }
  }

  /* Card hover lift */
  @keyframes lp-card-breathe {
    0%, 100% { 
      transform: translateY(-3px);
      box-shadow: 0 0 50px rgba(99, 102, 241, 0.12), 0 20px 40px -10px rgba(0, 0, 0, 0.6);
    }
    50% { 
      transform: translateY(-6px);
      box-shadow: 0 0 70px rgba(99, 102, 241, 0.18), 0 28px 55px -10px rgba(0, 0, 0, 0.7);
    }
  }

  /* Button glow */
  @keyframes lp-btn-glow {
    0%, 100% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.3), 0 12px 35px -8px rgba(59, 130, 246, 0.4); }
    50% { box-shadow: 0 0 60px rgba(139, 92, 246, 0.45), 0 18px 45px -8px rgba(59, 130, 246, 0.5); }
  }

  /* Float animation */
  @keyframes lp-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     SHELL - Transparente (hereda fondo de LinksHub)
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .lp-create-shell {
    position: relative;
    min-height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    color: #fff;
    overflow-x: hidden;
    max-width: 100vw;
    /* TRANSPARENTE - hereda el fondo vibrante de LinksHub */
    background: transparent;
  }

  /* SIN ORBS NI EFECTOS PROPIOS - LinksHub provee el fondo */

  /* ═══════════════════════════════════════════════════════════════════════════
     INNER CONTAINER - Transparente, sin efectos propios
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .lp-create-inner {
    position: relative;
    max-width: 480px;
    margin: 0 auto;
    padding: 0 14px;
    z-index: 1;
    /* TRANSPARENTE - el fondo viene de LinksHub */
    background: transparent;
  }

  /* SIN ::before ni ::after - LinksHub provee TODOS los efectos */

  /* ═══════════════════════════════════════════════════════════════════════════
     FORM
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .lp-create-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
    position: relative;
    z-index: 2;
  }

  /* ─── CARDS - WARM CORAL/PINK/ORANGE PALETTE ─────────────────────────────── */
  .lp-card-v2 {
    position: relative;
    background: 
      linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 70%),
      rgba(30, 20, 28, 0.85);
    border: 1px solid rgba(251, 113, 133, 0.25);
    border-radius: 18px;
    padding: 16px;
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow:
      0 0 40px rgba(251, 113, 133, 0.08),
      0 16px 40px -12px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .lp-card-v2:focus-within {
    border-color: rgba(251, 113, 133, 0.5);
    transform: translateY(-3px);
    box-shadow:
      0 0 60px rgba(251, 113, 133, 0.15),
      0 0 30px rgba(244, 114, 182, 0.1),
      0 24px 50px -15px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .lp-card-glow {
    position: absolute;
    inset: -80%;
    background: 
      radial-gradient(circle at 50% 0%, rgba(251, 113, 133, 0.2) 0%, transparent 40%),
      radial-gradient(circle at 0% 100%, rgba(251, 146, 60, 0.12) 0%, transparent 40%);
    pointer-events: none;
    animation: lp-glow-pulse 4s ease-in-out infinite;
  }

  /* URL Card - CORAL accent */
  .lp-card-url {
    border-top: 3px solid rgba(251, 113, 133, 0.8);
    box-shadow:
      0 0 50px rgba(251, 113, 133, 0.12),
      0 0 20px rgba(244, 114, 182, 0.08),
      0 18px 45px -12px rgba(0, 0, 0, 0.55),
      inset 0 1px 0 rgba(251, 113, 133, 0.12);
  }

  .lp-card-url .lp-card-glow {
    background: 
      radial-gradient(circle at 50% 0%, rgba(251, 113, 133, 0.25) 0%, transparent 40%),
      radial-gradient(circle at 100% 100%, rgba(244, 114, 182, 0.15) 0%, transparent 40%);
  }

  /* Alias Card - ORANGE accent */
  .lp-card-alias {
    border-top: 3px solid rgba(251, 146, 60, 0.8);
    box-shadow:
      0 0 50px rgba(251, 146, 60, 0.12),
      0 0 20px rgba(253, 186, 116, 0.08),
      0 18px 45px -12px rgba(0, 0, 0, 0.55),
      inset 0 1px 0 rgba(251, 146, 60, 0.12);
  }

  .lp-alias-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 10px;
  }

  .lp-alias-label svg {
    color: #fb923c;
  }

  /* ─── INPUT GROUP ────────────────────────────────────────────────────────── */
  .lp-input-group {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .lp-input-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Coral/Pink gradient */
    background: linear-gradient(135deg, rgba(251, 113, 133, 0.35) 0%, rgba(244, 114, 182, 0.25) 100%);
    color: #fda4af;
    flex-shrink: 0;
  }

  .lp-input-group input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    color: #fff;
    padding: 12px 0;
  }

  .lp-input-group input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  /* ─── ALIAS INPUT ────────────────────────────────────────────────────────── */
  .lp-alias-input {
    display: flex;
    align-items: center;
    gap: 0;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    padding: 4px;
    position: relative;
    z-index: 1;
  }

  .lp-alias-input span {
    padding: 12px 4px 12px 14px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    font-family: ui-monospace, SFMono-Regular, monospace;
    white-space: nowrap;
  }

  .lp-alias-input input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    color: #fff;
    padding: 12px 14px 12px 0;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  .lp-alias-input input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  /* ─── MODE SELECTOR - WARM PALETTE ──────────────────────────────────────── */
  .lp-mode-section {
    display: flex;
    gap: 10px;
  }

  .lp-mode-btn {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    background: rgba(30, 20, 28, 0.9);
    border: 1px solid rgba(251, 113, 133, 0.15);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.25s;
    position: relative;
  }

  .lp-mode-btn:active {
    transform: scale(0.98);
  }

  .lp-mode-btn.active {
    border-color: rgba(251, 113, 133, 0.5);
    background: 
      linear-gradient(135deg, rgba(251, 113, 133, 0.15) 0%, rgba(244, 114, 182, 0.1) 100%),
      rgba(30, 20, 28, 0.95);
    box-shadow: 0 0 35px rgba(251, 113, 133, 0.15);
  }

  .lp-mode-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .lp-mode-icon.standard {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.2) 100%);
    color: #4ade80;
  }

  .lp-mode-icon.turbo {
    background: linear-gradient(135deg, rgba(251, 146, 60, 0.35) 0%, rgba(253, 186, 116, 0.25) 100%);
    color: #fb923c;
  }

  .lp-mode-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    text-align: left;
  }

  .lp-mode-name {
    font-size: 14px;
    font-weight: 600;
    color: #f1f5f9;
  }

  .lp-mode-desc {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
  }

  .lp-mode-check {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    /* Coral check badge */
    background: linear-gradient(135deg, #fb7185 0%, #f472b6 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  /* ─── ADVANCED BUTTON ────────────────────────────────────────────────────── */
  .lp-advanced-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .lp-advanced-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.8);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     ADVANCED OPTIONS MODAL - Transparent Glassmorphism (Friendly)
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 1000;
  }

  /* Mobile: Full width bottom sheet */
  .lp-modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 80vh;
    /* Transparent glassmorphism - see background through */
    background: rgba(30, 20, 28, 0.92);
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: none;
    padding: 16px 20px calc(100px + env(safe-area-inset-bottom, 20px));
    z-index: 1001;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.3);
  }

  /* Desktop: Center in CONTENT AREA (right of 192px sidebar) */
  @media (min-width: 769px) {
    .lp-modal {
      /* Position in center of content area */
      bottom: auto;
      top: 50%;
      /* Content area starts at 192px, so center is (192 + (100vw - 192) / 2) */
      left: calc(192px + (100vw - 192px) / 2);
      right: auto;
      transform: translate(-50%, -50%);
      width: 440px;
      max-width: calc(100vw - 192px - 40px);
      max-height: 75vh;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 24px;
      box-shadow:
        0 25px 80px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }
  }

  /* Remove glow - keep it clean */
  .lp-modal-glow {
    display: none;
  }

  /* Handle bar - Mobile only */
  .lp-modal-handle {
    display: flex;
    justify-content: center;
    padding: 0 0 16px;
  }

  .lp-modal-handle-bar {
    width: 40px;
    height: 4px;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 999px;
  }

  @media (min-width: 769px) {
    .lp-modal-handle {
      display: none;
    }
  }

  /* Header */
  .lp-modal-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .lp-modal-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(251, 113, 133, 0.15);
    color: #fda4af;
  }

  .lp-modal-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }

  .lp-modal-header p {
    margin: 2px 0 0;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
  }

  /* Fields container */
  .lp-modal-fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* Individual field - More transparent */
  .lp-modal-field {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    transition: all 0.2s ease;
  }

  .lp-modal-field:focus-within {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(251, 113, 133, 0.3);
  }

  .lp-modal-field-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(251, 113, 133, 0.12);
    color: #fda4af;
    flex-shrink: 0;
  }

  .lp-modal-field-content {
    flex: 1;
    min-width: 0;
  }

  .lp-modal-field-content label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 3px;
  }

  .lp-modal-field-content input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 15px;
    color: #fff;
    padding: 0;
  }

  .lp-modal-field-content input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  /* Toggle row */
  .lp-modal-toggle-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .lp-modal-toggle-row:active {
    transform: scale(0.98);
  }

  .lp-modal-toggle-content {
    flex: 1;
  }

  .lp-modal-toggle-content span {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
  }

  .lp-modal-toggle-content p {
    margin: 2px 0 0;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.45);
  }

  /* Toggle switch */
  .lp-modal-toggle {
    width: 48px;
    height: 26px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.15);
    padding: 2px;
    cursor: pointer;
    transition: all 0.25s ease;
    flex-shrink: 0;
  }

  .lp-modal-toggle.on {
    background: #fb7185;
  }

  .lp-modal-toggle-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.25s ease;
  }

  .lp-modal-toggle.on .lp-modal-toggle-thumb {
    transform: translateX(22px);
  }

  /* Apply button */
  .lp-modal-close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    margin-top: 16px;
    padding: 14px;
    background: #fb7185;
    border: none;
    border-radius: 14px;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .lp-modal-close-btn:hover {
    background: #f472b6;
  }

  .lp-modal-close-btn:active {
    transform: scale(0.98);
  }

  /* ─── ERROR ──────────────────────────────────────────────────────────────── */
  .lp-error {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 16px;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    font-size: 13px;
    color: #f87171;
  }

  /* ─── SUBMIT BUTTON - ANIMATED GLOW ──────────────────────────────────────── */
  .lp-submit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 18px;
    background: 
      linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%),
      linear-gradient(135deg, #8b5cf6 0%, #6366f1 40%, #3b82f6 100%);
    border: 1px solid rgba(139, 92, 246, 0.5);
    border-radius: 18px;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow:
      0 0 60px rgba(139, 92, 246, 0.35),
      0 0 25px rgba(99, 102, 241, 0.2),
      0 18px 45px -12px rgba(59, 130, 246, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    margin-top: 10px;
    animation: lp-btn-glow 3s ease-in-out infinite;
    position: relative;
    overflow: hidden;
  }

  /* Shimmer effect */
  .lp-submit::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s ease;
  }

  .lp-submit:hover::before {
    left: 100%;
  }

  .lp-submit:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow:
      0 0 100px rgba(139, 92, 246, 0.5),
      0 0 40px rgba(99, 102, 241, 0.3),
      0 25px 60px -15px rgba(59, 130, 246, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }

  .lp-submit:active {
    transform: scale(0.98);
    box-shadow:
      0 0 50px rgba(139, 92, 246, 0.3),
      0 0 20px rgba(99, 102, 241, 0.2),
      0 12px 30px -8px rgba(59, 130, 246, 0.4);
  }

  .lp-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    animation: none;
  }

  /* ─── SUCCESS VIEW ───────────────────────────────────────────────────────── */
  .lp-confetti {
    position: fixed;
    inset: 0;
    z-index: 100;
    pointer-events: none;
  }

  .lp-success-card {
    position: relative;
    max-width: 400px;
    margin: 40px auto 0;
    padding: 32px 24px;
    background: 
      linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%),
      rgba(15, 23, 42, 0.95);
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: 28px;
    text-align: center;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow:
      0 0 100px rgba(34, 197, 94, 0.2),
      0 30px 60px -15px rgba(0, 0, 0, 0.6);
    animation: lp-float 6s ease-in-out infinite;
  }

  .lp-success-glow {
    position: absolute;
    inset: -100px;
    background: radial-gradient(circle at 50% 30%, rgba(34, 197, 94, 0.3) 0%, transparent 50%);
    pointer-events: none;
  }

  .lp-success-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, #22c55e 0%, #10b981 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    box-shadow: 0 0 40px rgba(34, 197, 94, 0.5);
    position: relative;
    z-index: 1;
  }

  .lp-success-badge {
    display: inline-block;
    padding: 6px 14px;
    background: rgba(34, 197, 94, 0.2);
    border: 1px solid rgba(34, 197, 94, 0.4);
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    color: #4ade80;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
    position: relative;
    z-index: 1;
  }

  .lp-success-card h2 {
    margin: 0 0 20px;
    font-size: 24px;
    font-weight: 700;
    color: #f1f5f9;
    position: relative;
    z-index: 1;
  }

  .lp-success-url-box {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    position: relative;
    z-index: 1;
  }

  .lp-success-url-box input {
    flex: 1;
    padding: 14px 16px;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    font-size: 14px;
    font-family: ui-monospace, SFMono-Regular, monospace;
    color: #fff;
    outline: none;
  }

  .lp-success-url-box button {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .lp-success-url-box button.copied {
    background: linear-gradient(135deg, #22c55e 0%, #10b981 100%);
  }

  .lp-success-url-box button:active {
    transform: scale(0.95);
  }

  .lp-success-actions {
    display: flex;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .lp-btn-ghost {
    flex: 1;
    padding: 14px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    color: #f1f5f9;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .lp-btn-ghost:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .lp-btn-primary {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 14px;
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
  }

  .lp-btn-primary:active {
    transform: scale(0.98);
  }
`;
