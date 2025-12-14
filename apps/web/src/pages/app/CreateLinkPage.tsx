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
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import Confetti from 'react-confetti';

/* ═══════════════════════════════════════════════════════════════════════════
   CREATE LINK - Integrated with LinksHub
   Mobile-first, minimal text, maximum visual impact
   ═══════════════════════════════════════════════════════════════════════════ */

export function CreateLinkPage() {
  const navigate = useNavigate();

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
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message?.includes('alias') ? 'Alias ocupado' : err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.short_url);
      setCopied(true);
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
              <button onClick={() => navigate('/app/links')} className="lp-btn-primary">
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

          {/* BOTTOM SHEET */}
          <BottomSheet
            open={sheetOpen}
            onDismiss={() => setSheetOpen(false)}
            snapPoints={({ maxHeight }) => [Math.min(maxHeight * 0.7, 500)]}
          >
            <div className="lp-sheet">
              <h3>Opciones avanzadas</h3>

              <div className="lp-sheet-field">
                <label><Lock size={14} /> Contraseña</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Opcional"
                />
              </div>

              <div className="lp-sheet-field">
                <label><Calendar size={14} /> Expiración</label>
                <input
                  type="datetime-local"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
              </div>

              <div className="lp-sheet-field">
                <label><MousePointer2 size={14} /> Límite de clics</label>
                <input
                  type="number"
                  value={maxClicks}
                  onChange={(e) => setMaxClicks(e.target.value)}
                  placeholder="Sin límite"
                />
              </div>

              <div className="lp-sheet-toggle">
                <div
                  className={`lp-toggle ${isPrivate ? 'on' : ''}`}
                  onClick={() => setIsPrivate(!isPrivate)}
                >
                  <div className="lp-toggle-thumb" />
                </div>
                <span><EyeOff size={14} /> Enlace privado</span>
              </div>
            </div>
          </BottomSheet>

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
  /* ─── ANIMATIONS ─────────────────────────────────────────────────────────── */
  .lp-spin { animation: lp-spin 1s linear infinite; }
  @keyframes lp-spin { 100% { transform: rotate(360deg); } }

  @keyframes lp-glow-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }

  @keyframes lp-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  /* ─── SHELL (overridden by LinksHub to be relative) ─────────────────────── */
  .lp-create-shell {
    position: relative;
    min-height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    color: #fff;
  }

  /* ─── INNER CONTAINER ────────────────────────────────────────────────────── */
  .lp-create-inner {
    max-width: 480px;
    margin: 0 auto;
    padding: 0 16px;
  }

  /* ─── FORM ───────────────────────────────────────────────────────────────── */
  .lp-create-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* ─── CARDS ──────────────────────────────────────────────────────────────── */
  .lp-card-v2 {
    position: relative;
    background: 
      linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%),
      rgba(15, 23, 42, 0.95);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 20px;
    padding: 16px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    overflow: hidden;
    transition: all 0.3s;
  }

  .lp-card-v2:focus-within {
    border-color: rgba(139, 92, 246, 0.5);
    box-shadow: 0 0 40px rgba(139, 92, 246, 0.15);
  }

  .lp-card-glow {
    position: absolute;
    inset: -50%;
    background: radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.2) 0%, transparent 50%);
    pointer-events: none;
    animation: lp-glow-pulse 4s ease-in-out infinite;
  }

  /* URL Card - Blue accent */
  .lp-card-url {
    border-top: 3px solid rgba(59, 130, 246, 0.7);
  }

  .lp-card-url .lp-card-glow {
    background: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.25) 0%, transparent 50%);
  }

  /* Alias Card - Purple accent */
  .lp-card-alias {
    border-top: 3px solid rgba(139, 92, 246, 0.7);
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
    color: #8b5cf6;
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
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%);
    color: #60a5fa;
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

  /* ─── MODE SELECTOR ──────────────────────────────────────────────────────── */
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
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.25s;
    position: relative;
  }

  .lp-mode-btn:active {
    transform: scale(0.98);
  }

  .lp-mode-btn.active {
    border-color: rgba(139, 92, 246, 0.6);
    background: 
      linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%),
      rgba(15, 23, 42, 0.95);
    box-shadow: 0 0 40px rgba(139, 92, 246, 0.15);
  }

  .lp-mode-icon {
    width: 44px;
    height: 44px;
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
    background: linear-gradient(135deg, rgba(249, 115, 22, 0.3) 0%, rgba(234, 88, 12, 0.2) 100%);
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
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
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

  /* ─── BOTTOM SHEET ───────────────────────────────────────────────────────── */
  .lp-sheet {
    padding: 24px 20px;
  }

  .lp-sheet h3 {
    margin: 0 0 20px;
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
  }

  .lp-sheet-field {
    margin-bottom: 16px;
  }

  .lp-sheet-field label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 8px;
  }

  .lp-sheet-field input {
    width: 100%;
    padding: 14px 16px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-size: 16px;
    color: #1e293b;
    outline: none;
  }

  .lp-sheet-field input:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }

  .lp-sheet-toggle {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 0;
    border-top: 1px solid #e2e8f0;
    margin-top: 8px;
  }

  .lp-sheet-toggle span {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #64748b;
  }

  .lp-toggle {
    width: 50px;
    height: 28px;
    border-radius: 999px;
    background: #cbd5e1;
    padding: 2px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .lp-toggle.on {
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  }

  .lp-toggle-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s;
  }

  .lp-toggle.on .lp-toggle-thumb {
    transform: translateX(22px);
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

  /* ─── SUBMIT BUTTON ──────────────────────────────────────────────────────── */
  .lp-submit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 18px;
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%);
    border: none;
    border-radius: 16px;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s;
    box-shadow:
      0 0 60px rgba(139, 92, 246, 0.3),
      0 15px 40px -10px rgba(59, 130, 246, 0.4);
    margin-top: 8px;
  }

  .lp-submit:hover {
    transform: translateY(-2px);
    box-shadow:
      0 0 80px rgba(139, 92, 246, 0.4),
      0 20px 50px -10px rgba(59, 130, 246, 0.5);
  }

  .lp-submit:active {
    transform: scale(0.98);
  }

  .lp-submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
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
