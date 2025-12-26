import React, { useState, useEffect } from 'react';
import {
  Send,
  ArrowDownLeft,
  CheckCircle2,
  AlertCircle,
  History,
  Loader2,
  ChevronDown,
  CreditCard,
  Building2,
  X,
} from 'lucide-react';
import { PayoutService, Transaction } from '../../lib/payoutService';
import { Validators } from '../../lib/validators';
import { supabase } from '../../lib/supabaseClient';
import { PremiumLoader } from '../../components/PremiumLoader';
import { useCachedPayouts } from '../../context/DataCacheContext';
import '../../styles/PremiumBackground.css';

/* ═══════════════════════════════════════════════════════════════════════════
   FINANCE PAGE - REVOLUT-STYLE MOBILE BANKING UX
   Diseño inspirado en Revolut con estilo LinkPay
   ═══════════════════════════════════════════════════════════════════════════ */

export function PayoutsPage() {
  // ═══════════════════════════════════════════════════════════════════════════
  // DATOS CACHEADOS - Navegación instantánea
  // ═══════════════════════════════════════════════════════════════════════════
  const { balance, history, loading, refresh } = useCachedPayouts();

  // Modal states
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showSend, setShowSend] = useState(false);

  // Withdraw form
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState<'PayPal' | 'Bank'>('PayPal');
  const [withdrawAccount, setWithdrawAccount] = useState('');
  const [withdrawIbanHolder, setWithdrawIbanHolder] = useState('');
  const [withdrawError, setWithdrawError] = useState('');
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [withdrawInfo, setWithdrawInfo] = useState('');

  // Send form
  const [sendEmail, setSendEmail] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sendNote, setSendNote] = useState('');
  const [sendError, setSendError] = useState('');
  const [sendLoading, setSendLoading] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // Saved methods
  const [savedMethods, setSavedMethods] = useState<{ paypal: string; bank: string }>({
    paypal: '',
    bank: '',
  });

  // Pagination for transactions - show 3 by default
  const [visibleCount, setVisibleCount] = useState(3);
  const LOAD_MORE_COUNT = 10;

  // Constants
  const MIN_PAYPAL = 5;
  const MIN_BANK = 10;
  const minWithdraw = withdrawMethod === 'PayPal' ? MIN_PAYPAL : MIN_BANK;

  // ─── CARGAR MÉTODOS GUARDADOS ─────────────────────────────────────────────
  useEffect(() => {
    const loadSavedMethods = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('paypal_email, bank_details')
          .eq('id', user.id)
          .single();

        if (data) {
          setSavedMethods({
            paypal: data.paypal_email || '',
            bank: data.bank_details || '',
          });
          if (data.paypal_email) setWithdrawAccount(data.paypal_email);
        }
      }
    };
    loadSavedMethods();
  }, []);

  useEffect(() => {
    if (withdrawMethod === 'PayPal' && savedMethods.paypal) {
      setWithdrawAccount(savedMethods.paypal);
    }
    if (withdrawMethod === 'Bank' && savedMethods.bank) {
      setWithdrawAccount(savedMethods.bank);
    }
  }, [withdrawMethod, savedMethods]);

  // ─── WITHDRAW HANDLER ────────────────────────────────────────────────────
  const handleWithdraw = async () => {
    setWithdrawError('');
    setWithdrawSuccess(false);

    const amount = parseFloat(withdrawAmount);

    if (!withdrawAmount || isNaN(amount) || amount <= 0) {
      return setWithdrawError('Introduce una cantidad válida.');
    }
    if (amount > balance) {
      return setWithdrawError('Saldo insuficiente.');
    }
    if (amount < minWithdraw) {
      return setWithdrawError(`Mínimo ${withdrawMethod === 'PayPal' ? 'PayPal' : 'transferencia'}: €${minWithdraw}`);
    }

    if (withdrawMethod === 'PayPal') {
      if (!Validators.isValidEmail(withdrawAccount)) {
        return setWithdrawError('Introduce un email de PayPal válido.');
      }
    } else {
      if (!Validators.isValidIBAN(withdrawAccount)) {
        return setWithdrawError('Introduce un IBAN válido.');
      }
    }

    setWithdrawLoading(true);
    try {
      await PayoutService.requestPayout(amount, withdrawMethod, withdrawAccount);
      setWithdrawSuccess(true);
      setWithdrawInfo('¡Listo! Tu solicitud está en proceso.');
      setWithdrawAmount('');
      refresh();
      setTimeout(() => {
        setWithdrawSuccess(false);
        setShowWithdraw(false);
        setWithdrawInfo('');
      }, 2400);
    } catch (err: any) {
      setWithdrawError(err.message || 'Error al procesar el retiro.');
    } finally {
      setWithdrawLoading(false);
    }
  };

  // ─── SEND HANDLER ────────────────────────────────────────────────────────
  const handleSend = async () => {
    setSendError('');
    setSendSuccess(false);

    const amount = parseFloat(sendAmount);

    if (!sendEmail || !Validators.isValidEmail(sendEmail)) {
      return setSendError('Introduce un email válido.');
    }
    if (!sendAmount || isNaN(amount) || amount <= 0) {
      return setSendError('Introduce una cantidad válida.');
    }
    if (amount > balance) {
      return setSendError('Saldo insuficiente.');
    }

    setSendLoading(true);
    try {
      await PayoutService.sendMoney(sendEmail, amount);
      setSendSuccess(true);
      setSendAmount('');
      setSendEmail('');
      setSendNote('');
      refresh();
      setTimeout(() => {
        setSendSuccess(false);
        setShowSend(false);
      }, 2000);
    } catch (err: any) {
      setSendError(err.message || 'Error al enviar.');
    } finally {
      setSendLoading(false);
    }
  };

  // ─── LOADING STATE ───────────────────────────────────────────────────────
  if (loading) {
    return <PremiumLoader size="medium" text="FINANZAS" subtext="Cargando tu billetera..." />;
  }

  // ─── RENDER ──────────────────────────────────────────────────────────────
  const remainingCount = Math.max(history.length - visibleCount, 0);
  const nextBatchCount = Math.min(LOAD_MORE_COUNT, remainingCount);

  return (
    <div className="rev-shell">
      <style>{revStyles}</style>

      {/* BACKGROUND */}
      <div className="rev-bg">
        <div className="rev-bg-gradient" />
        <div className="rev-bg-glow" />
      </div>

      {/* MAIN CONTENT */}
      <div className="rev-content">

        {/* ═══════════════════════════════════════════════════════════════════
            ZONA PRINCIPAL - BALANCE CENTRADO 
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="rev-hero-zone">
          {/* BALANCE */}
          <div className="rev-balance-card">
            <span className="rev-balance-label">Personal · EUR</span>
            <div className="rev-balance-amount">
              <span className="rev-amount-value">{balance.toFixed(2).split('.')[0]}</span>
              <span className="rev-amount-decimal">,{balance.toFixed(2).split('.')[1]} €</span>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS - Pegados a la tarjeta */}
        <div className="rev-actions">
          <button className="rev-action-item" onClick={() => setShowWithdraw(true)}>
            <div className="rev-action-circle">
              <ArrowDownLeft size={22} />
            </div>
            <span>Solicitar<br />retiro</span>
          </button>
          <button className="rev-action-item" onClick={() => setShowSend(true)}>
            <div className="rev-action-circle">
              <Send size={22} />
            </div>
            <span>Enviar<br />interno</span>
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            ACTIVIDAD RECIENTE
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="rev-transactions">
          <h3 className="rev-section-title">Actividad reciente</h3>

          {history.length === 0 ? (
            <div className="rev-empty">
              <History size={32} />
              <p>Sin movimientos aún</p>
              <span>Tus transacciones aparecerán aquí</span>
            </div>
          ) : (
            <div className="rev-tx-list">
              {history.slice(0, visibleCount).map((tx) => {
                const isOut = tx.is_negative;
                const label = tx.type === 'withdrawal'
                  ? 'Retiro'
                  : isOut ? 'Envío' : 'Recibido';

                // Random color for avatar
                const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
                const colorIndex = tx.id.charCodeAt(0) % colors.length;
                const avatarColor = colors[colorIndex];

                const statusLabel = tx.status === 'pending' ? 'Pendiente' :
                  tx.status === 'failed' ? 'Rechazado' : '';

                return (
                  <div key={tx.id} className="rev-tx-item">
                    <div className="rev-tx-left">
                      <div
                        className="rev-tx-avatar"
                        style={{ background: avatarColor }}
                      >
                        {tx.type === 'withdrawal' ? (
                          <ArrowDownLeft size={18} color="#fff" />
                        ) : (
                          <Send size={18} color="#fff" />
                        )}
                      </div>
                      <div className="rev-tx-info">
                        <span className="rev-tx-name">{label}</span>
                        <span className="rev-tx-date">{tx.date}</span>
                      </div>
                    </div>
                    <div className="rev-tx-right">
                      <span className={`rev-tx-amount ${isOut ? 'negative' : 'positive'}`}>
                        {isOut ? '-' : '+'}{Number(tx.amount).toFixed(2)} €
                      </span>
                      {statusLabel && (
                        <span className={`rev-tx-status ${tx.status}`}>{statusLabel}</span>
                      )}
                    </div>
                  </div>
                );
              })}
              {visibleCount < history.length && (
                <button
                  type="button"
                  className="rev-tx-more"
                  onClick={() => setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, history.length))}
                >
                  Ver todo
                </button>
              )}
            </div>
          )}
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          WITHDRAW MODAL - PREMIUM DESIGN
      ═══════════════════════════════════════════════════════════════════════ */}
      {showWithdraw && (
        <div className="lp-modal-overlay" onClick={() => setShowWithdraw(false)}>
          <div className="lp-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header con icono */}
            <div className="lp-modal-header">
              <button className="lp-modal-close" onClick={() => setShowWithdraw(false)}>
                <X size={22} />
              </button>
              <div className="lp-modal-icon withdraw">
                <ArrowDownLeft size={28} />
              </div>
              <h2>Retirar fondos</h2>
              <p className="lp-modal-subtitle">Recibe tu dinero en PayPal o cuenta bancaria</p>
            </div>

            {/* Body */}
            <div className="lp-modal-body">
              {/* Amount Hero */}
              <div className="lp-amount-hero">
                <div className="lp-amount-row">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0"
                    className="lp-amount-input"
                  />
                  <span className="lp-amount-currency">EUR</span>
                </div>
                <div className="lp-amount-available">
                  Disponible: <strong>{balance.toFixed(2)} €</strong>
                </div>
              </div>

              {/* Success Message */}
              {withdrawInfo && (
                <div className="lp-success-banner">
                  <CheckCircle2 size={20} />
                  <span>{withdrawInfo}</span>
                </div>
              )}

              {/* Method Selector */}
              <div className="lp-field">
                <label>Método de pago</label>
                <div className="lp-method-grid">
                  <button
                    className={`lp-method-card ${withdrawMethod === 'PayPal' ? 'active' : ''}`}
                    onClick={() => setWithdrawMethod('PayPal')}
                  >
                    <div className="lp-method-icon paypal">
                      <CreditCard size={20} />
                    </div>
                    <div className="lp-method-info">
                      <span className="lp-method-name">PayPal</span>
                      <span className="lp-method-min">Mín. {MIN_PAYPAL}€</span>
                    </div>
                    {withdrawMethod === 'PayPal' && <CheckCircle2 size={18} className="lp-method-check" />}
                  </button>
                  <button
                    className={`lp-method-card ${withdrawMethod === 'Bank' ? 'active' : ''}`}
                    onClick={() => setWithdrawMethod('Bank')}
                  >
                    <div className="lp-method-icon bank">
                      <Building2 size={20} />
                    </div>
                    <div className="lp-method-info">
                      <span className="lp-method-name">Transferencia</span>
                      <span className="lp-method-min">Mín. {MIN_BANK}€</span>
                    </div>
                    {withdrawMethod === 'Bank' && <CheckCircle2 size={18} className="lp-method-check" />}
                  </button>
                </div>
              </div>

              {/* Account Input */}
              <div className="lp-field">
                <label>{withdrawMethod === 'PayPal' ? 'Email de PayPal' : 'Número IBAN'}</label>
                <input
                  type={withdrawMethod === 'PayPal' ? 'email' : 'text'}
                  value={withdrawAccount}
                  onChange={(e) => setWithdrawAccount(withdrawMethod === 'Bank' ? e.target.value.toUpperCase() : e.target.value)}
                  placeholder={withdrawMethod === 'PayPal' ? 'tu@email.com' : 'ES00 0000 0000 0000 0000 0000'}
                  className="lp-input"
                />
              </div>

              {withdrawMethod === 'Bank' && (
                <div className="lp-field">
                  <label>Titular de la cuenta</label>
                  <input
                    type="text"
                    value={withdrawIbanHolder}
                    onChange={(e) => setWithdrawIbanHolder(e.target.value)}
                    placeholder="Nombre y apellidos"
                    className="lp-input"
                  />
                </div>
              )}

              {/* Error */}
              {withdrawError && (
                <div className="lp-error-banner">
                  <AlertCircle size={18} />
                  <span>{withdrawError}</span>
                </div>
              )}

              {/* Success */}
              {withdrawSuccess && (
                <div className="lp-success-banner">
                  <CheckCircle2 size={18} />
                  <span>¡Solicitud enviada correctamente!</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="lp-modal-footer">
              <button
                className="lp-btn-primary"
                onClick={handleWithdraw}
                disabled={withdrawLoading || withdrawSuccess}
              >
                {withdrawLoading ? (
                  <Loader2 className="lp-spin" size={20} />
                ) : withdrawSuccess ? (
                  <><CheckCircle2 size={20} /> Enviado</>
                ) : (
                  <>Solicitar retiro</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SEND MODAL - PREMIUM DESIGN
      ═══════════════════════════════════════════════════════════════════════ */}
      {showSend && (
        <div className="lp-modal-overlay" onClick={() => setShowSend(false)}>
          <div className="lp-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header con icono */}
            <div className="lp-modal-header">
              <button className="lp-modal-close" onClick={() => setShowSend(false)}>
                <X size={22} />
              </button>
              <div className="lp-modal-icon send">
                <Send size={28} />
              </div>
              <h2>Enviar dinero</h2>
              <p className="lp-modal-subtitle">Transfiere fondos a otro usuario de LinkPay</p>
            </div>

            {/* Body */}
            <div className="lp-modal-body">
              {/* Recipient */}
              <div className="lp-field">
                <label>Destinatario</label>
                <div className="lp-input-icon-wrapper">
                  <input
                    type="email"
                    value={sendEmail}
                    onChange={(e) => setSendEmail(e.target.value)}
                    placeholder="email@ejemplo.com"
                    className="lp-input with-icon"
                  />
                  <Send size={18} className="lp-input-icon" />
                </div>
              </div>

              {/* Amount Hero */}
              <div className="lp-amount-hero">
                <div className="lp-amount-row">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="0"
                    className="lp-amount-input"
                  />
                  <span className="lp-amount-currency">EUR</span>
                </div>
                <div className="lp-amount-available">
                  Disponible: <strong>{balance.toFixed(2)} €</strong>
                </div>
              </div>

              {/* Note */}
              <div className="lp-field">
                <label>Nota <span className="lp-optional">(opcional)</span></label>
                <input
                  type="text"
                  value={sendNote}
                  onChange={(e) => setSendNote(e.target.value)}
                  placeholder="Ej: Pago por colaboración"
                  className="lp-input"
                />
              </div>

              {/* Error */}
              {sendError && (
                <div className="lp-error-banner">
                  <AlertCircle size={18} />
                  <span>{sendError}</span>
                </div>
              )}

              {/* Success */}
              {sendSuccess && (
                <div className="lp-success-banner">
                  <CheckCircle2 size={18} />
                  <span>¡Dinero enviado correctamente!</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="lp-modal-footer">
              <button
                className="lp-btn-primary blue"
                onClick={handleSend}
                disabled={sendLoading || sendSuccess}
              >
                {sendLoading ? (
                  <Loader2 className="lp-spin" size={20} />
                ) : sendSuccess ? (
                  <><CheckCircle2 size={20} /> Enviado</>
                ) : (
                  <>Enviar ahora</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   STYLES - REVOLUT AUTHENTIC DESIGN
   ═══════════════════════════════════════════════════════════════════════════════ */

const revStyles = `
  /* ─── ANIMATIONS ─────────────────────────────────────────────────────────── */
  .rev-spin, .lp-spin { animation: rev-spin 1s linear infinite; }
  @keyframes rev-spin { 100% { transform: rotate(360deg); } }

  @keyframes rev-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes rev-scale-in {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes lp-slide-up {
    from { opacity: 0; transform: translateY(100%); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes lp-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes lp-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     PREMIUM MODALS - MOBILE FIRST
  ═══════════════════════════════════════════════════════════════════════════ */
  .lp-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    animation: lp-fade-in 0.2s ease-out;
    padding: 0;
  }

  @media (min-width: 769px) {
    .lp-modal-overlay {
      left: 260px;
      align-items: center;
      padding: 20px;
    }
  }

  .lp-modal {
    width: 100%;
    max-width: 100%;
    background: linear-gradient(180deg, #1a1f2e 0%, #0f1319 100%);
    border-radius: 28px 28px 0 0;
    animation: lp-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    max-height: 95vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.5);
  }

  @media (min-width: 769px) {
    .lp-modal {
      max-width: 440px;
      border-radius: 24px;
      max-height: 90vh;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
    }
  }

  /* ─── MODAL HEADER ─────────────────────────────────────────────────────────── */
  .lp-modal-header {
    position: relative;
    text-align: center;
    padding: 28px 24px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .lp-modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.08);
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.2s;
  }

  .lp-modal-close:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
  }

  .lp-modal-icon {
    width: 64px;
    height: 64px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    color: #fff;
  }

  .lp-modal-icon.withdraw {
    background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
    box-shadow: 0 8px 32px rgba(139, 92, 246, 0.4);
  }

  .lp-modal-icon.send {
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4);
  }

  .lp-modal-header h2 {
    margin: 0 0 6px;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.02em;
  }

  .lp-modal-subtitle {
    margin: 0;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 400;
  }

  /* ─── MODAL BODY ──────────────────────────────────────────────────────────── */
  .lp-modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 24px 20px;
  }

  @media (min-width: 769px) {
    .lp-modal-body {
      padding: 24px;
    }
  }

  /* ─── AMOUNT HERO ──────────────────────────────────────────────────────────── */
  .lp-amount-hero {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 24px;
    text-align: center;
  }

  .lp-amount-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  .lp-amount-input {
    background: transparent;
    border: none;
    font-size: 48px;
    font-weight: 300;
    color: #fff;
    width: 140px;
    text-align: right;
    outline: none;
    font-family: inherit;
    letter-spacing: -2px;
  }

  .lp-amount-input::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }

  .lp-amount-input::-webkit-outer-spin-button,
  .lp-amount-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .lp-amount-currency {
    font-size: 20px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 0.05em;
  }

  .lp-amount-available {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
  }

  .lp-amount-available strong {
    color: #22c55e;
    font-weight: 600;
  }

  /* ─── FIELDS ──────────────────────────────────────────────────────────────── */
  .lp-field {
    margin-bottom: 20px;
  }

  .lp-field label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .lp-optional {
    font-weight: 400;
    color: rgba(255, 255, 255, 0.35);
    text-transform: none;
    letter-spacing: 0;
  }

  .lp-input {
    width: 100%;
    padding: 16px 18px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    font-size: 16px;
    font-family: inherit;
    outline: none;
    transition: all 0.2s;
  }

  .lp-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  .lp-input:focus {
    border-color: rgba(139, 92, 246, 0.5);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
  }

  .lp-input-icon-wrapper {
    position: relative;
  }

  .lp-input.with-icon {
    padding-right: 48px;
  }

  .lp-input-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.3);
  }

  /* ─── METHOD GRID ──────────────────────────────────────────────────────────── */
  .lp-method-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .lp-method-card {
    position: relative;
    background: rgba(255, 255, 255, 0.04);
    border: 2px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }

  .lp-method-card:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
  }

  .lp-method-card.active {
    background: rgba(139, 92, 246, 0.15);
    border-color: #8b5cf6;
  }

  .lp-method-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .lp-method-icon.paypal {
    background: linear-gradient(135deg, #0070ba 0%, #003087 100%);
  }

  .lp-method-icon.bank {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  }

  .lp-method-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .lp-method-name {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
  }

  .lp-method-min {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
  }

  .lp-method-check {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #8b5cf6;
  }

  /* ─── BANNERS ──────────────────────────────────────────────────────────────── */
  .lp-success-banner {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: rgba(34, 197, 94, 0.15);
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: 14px;
    color: #4ade80;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
    animation: lp-pulse 0.4s ease-out;
  }

  .lp-error-banner {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.25);
    border-radius: 14px;
    color: #fca5a5;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
  }

  /* ─── MODAL FOOTER ─────────────────────────────────────────────────────────── */
  .lp-modal-footer {
    padding: 16px 20px 28px;
    padding-bottom: calc(28px + env(safe-area-inset-bottom, 0px));
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  @media (min-width: 769px) {
    .lp-modal-footer {
      padding: 20px 24px 24px;
    }
  }

  .lp-btn-primary {
    width: 100%;
    padding: 18px 24px;
    border: none;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.2s;
    background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
    box-shadow: 0 8px 32px rgba(139, 92, 246, 0.35);
  }

  .lp-btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(139, 92, 246, 0.45);
  }

  .lp-btn-primary:active:not(:disabled) {
    transform: translateY(0);
  }

  .lp-btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .lp-btn-primary.blue {
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.35);
  }

  .lp-btn-primary.blue:hover:not(:disabled) {
    box-shadow: 0 12px 40px rgba(59, 130, 246, 0.45);
  }

  /* ─── SHELL ──────────────────────────────────────────────────────────────── */
  .rev-shell {
    position: fixed;
    inset: 0;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
    color: #fff;
  }

  /* Mobile: full screen - header is transparent overlay */
  @media (max-width: 768px) {
    .rev-shell {
      top: 0;
    }
  }

  /* Desktop: sidebar offset */
  @media (min-width: 769px) {
    .rev-shell { 
      left: 260px; 
      top: 0;
    }
  }

  /* ─── BACKGROUND - STUNNING UNDERWATER EFFECT ────────────────────────────── */
  .rev-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    background: linear-gradient(180deg, 
      #001a2c 0%, 
      #003352 25%,
      #004d7a 50%,
      #003352 75%,
      #001a2c 100%
    );
    overflow: hidden;
  }

  .rev-bg-gradient {
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse 120% 60% at 50% -10%, rgba(0, 180, 216, 0.4) 0%, transparent 50%),
      radial-gradient(ellipse 100% 50% at 20% 20%, rgba(0, 119, 182, 0.35) 0%, transparent 45%),
      radial-gradient(ellipse 80% 60% at 80% 30%, rgba(72, 202, 228, 0.25) 0%, transparent 40%),
      radial-gradient(ellipse 60% 40% at 50% 80%, rgba(0, 150, 199, 0.2) 0%, transparent 50%);
    animation: rev-fade-up 1.2s ease-out;
  }

  .rev-bg-glow {
    position: absolute;
    top: -150px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(72, 202, 228, 0.35) 0%, rgba(0, 180, 216, 0.15) 30%, transparent 60%);
    pointer-events: none;
    animation: rev-glow-pulse 4s ease-in-out infinite alternate;
  }

  /* Floating particles effect */
  .rev-bg::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.7;
    background-image:
      radial-gradient(1px 1px at 15% 20%, rgba(255, 255, 255, 0.7), transparent),
      radial-gradient(1px 1px at 25% 35%, rgba(255, 255, 255, 0.5), transparent),
      radial-gradient(2px 2px at 40% 15%, rgba(72, 202, 228, 0.9), transparent),
      radial-gradient(1px 1px at 55% 45%, rgba(255, 255, 255, 0.6), transparent),
      radial-gradient(1px 1px at 70% 25%, rgba(255, 255, 255, 0.4), transparent),
      radial-gradient(2px 2px at 85% 50%, rgba(0, 180, 216, 0.8), transparent),
      radial-gradient(1px 1px at 10% 70%, rgba(255, 255, 255, 0.5), transparent),
      radial-gradient(1px 1px at 30% 80%, rgba(255, 255, 255, 0.6), transparent),
      radial-gradient(2px 2px at 60% 75%, rgba(144, 224, 239, 0.7), transparent),
      radial-gradient(1px 1px at 80% 85%, rgba(255, 255, 255, 0.4), transparent);
    background-size: 350px 250px;
    animation: rev-particles-float 20s linear infinite;
  }

  /* Secondary floating orb */
  .rev-bg::after {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    bottom: 10%;
    right: -100px;
    background: radial-gradient(circle, rgba(0, 180, 216, 0.25) 0%, rgba(72, 202, 228, 0.1) 40%, transparent 60%);
    border-radius: 50%;
    filter: blur(40px);
    animation: rev-orb-float 15s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes rev-glow-pulse {
    0% { opacity: 0.8; transform: translateX(-50%) scale(1); }
    100% { opacity: 1; transform: translateX(-50%) scale(1.1); }
  }

  @keyframes rev-particles-float {
    0% { transform: translateY(0); }
    100% { transform: translateY(-250px); }
  }

  @keyframes rev-orb-float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-30px, -50px) scale(1.05); }
    66% { transform: translate(-60px, 20px) scale(0.95); }
  }

  /* ─── CONTENT CONTAINER ─────────────────────────────────────────────────── */
  .rev-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-height: 100dvh;
    padding: 24px 16px 100px;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  @media (max-width: 768px) {
    .rev-content {
      padding: calc(48px + env(safe-area-inset-top, 0px) + 16px) 16px calc(100px + env(safe-area-inset-bottom, 0px)) 16px;
      max-width: 100%;
    }
  }

  /* ─── HERO ZONE - BALANCE + ACCIONES ────────────────────────────────────── */
  .rev-hero-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px !important;
    padding-bottom: 0;
  }

  @media (max-width: 768px) {
    .rev-hero-zone {
      padding-top: 30px !important;
      padding-bottom: 0;
    }
  }

  .rev-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    gap: 16px;
    color: #94a3b8;
    font-size: 14px;
  }

  /* ─── BALANCE SECTION - CENTRADO ─────────────────────────────────────── */
  .rev-balance-section {
    padding: 40px 0 24px;
    text-align: center;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .rev-balance-section {
      padding: 28px 0 20px;
    }
  }

  .rev-balance-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    .rev-balance-card {
      margin-bottom: 12px;
    }
  }

  .rev-balance-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
  }

  .rev-balance-amount {
    display: flex;
    align-items: baseline;
    justify-content: center;
    flex-wrap: nowrap;
  }

  .rev-amount-value {
    font-size: 56px;
    font-weight: 300;
    letter-spacing: -2px;
    color: #fff;
  }

  .rev-amount-decimal {
    font-size: 32px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.8);
    margin-left: 2px;
  }

  /* ─── CUENTAS BUTTON (REVOLUT STYLE) ──────────────────────────────────── */
  .rev-cuentas-btn {
    margin-top: 12px;
    padding: 10px 24px;
    border-radius: 999px;
    border: none;
    background: rgba(56, 189, 248, 0.2);
    color: #38bdf8;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .rev-cuentas-btn:hover {
    background: rgba(56, 189, 248, 0.3);
    transform: scale(1.02);
  }

  .rev-cuentas-btn:active {
    transform: scale(0.98);
  }

  /* ─── DOTS INDICATOR (REVOLUT STYLE) ─────────────────────────────────── */
  .rev-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin: 20px 0 28px;
  }

  .rev-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transition: all 0.2s ease;
  }

  .rev-dot.active {
    width: 8px;
    height: 8px;
    background: #fff;
  }

  /* ─── QUICK ACTIONS - JUSTO ENCIMA DE ACTIVIDAD ─────────────────────────── */
  .rev-actions {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 80px !important;
    margin-bottom: 2px;
    padding: 0;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .rev-actions {
      gap: 40px;
      margin-top: 80px !important;
      margin-bottom: 2px;
    }
  }

  .rev-action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    min-width: 80px;
  }

  .rev-action-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all 0.2s;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }

  .rev-action-item:hover .rev-action-circle {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .rev-action-item:active .rev-action-circle {
    transform: scale(0.96);
  }

  .rev-action-item span {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  /* ─── BUTTONS & ALERTS ─────────────────────────────────────────────────── */
  .rev-primary {
    background: linear-gradient(90deg, #6366f1, #22d3ee);
    border: none;
    color: #fff;
    border-radius: 12px;
    padding: 10px 16px;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
  }

  .rev-primary:disabled { opacity: 0.6; cursor: not-allowed; }

  .rev-alert {
    margin-top: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid transparent;
  }

  .rev-alert.error {
    background: rgba(239, 68, 68, 0.1);
    color: #fecdd3;
    border: 1px solid rgba(239, 68, 68, 0.25);
  }

  .rev-alert.info {
    background: rgba(59, 130, 246, 0.12);
    color: #bfdbfe;
    border-color: rgba(59, 130, 246, 0.35);
  }

  .rev-requirements {
    margin-top: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px dashed rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.04);
    color: #e2e8f0;
    font-size: 12px;
  }

  /* ─── TRANSACTIONS - REVOLUT STYLE GLASSMORPHISM CARD ───────────────────── */
  .rev-transactions {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 16px;
    margin: 0;
    flex: none;
    overflow: visible;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 4px 20px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 768px) {
    .rev-transactions {
      margin: -20px -4px 0 -4px;
      border-radius: 20px;
      padding: 6px 12px 14px 12px;
    }
  }

  .rev-tx-loading {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    color: rgba(255, 255, 255, 0.5);
  }

  .rev-tx-more {
    width: 100%;
    margin: 12px 0 0;
    padding: 12px;
    border-radius: 12px;
    border: none;
    background: transparent;
    color: #60a5fa;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .rev-tx-more:hover {
    background: rgba(59, 130, 246, 0.15);
  }

  .rev-section-title {
    font-size: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: -4px 0 8px 2px;
  }

  .rev-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px 20px;
    color: rgba(255, 255, 255, 0.4);
    min-height: 100px;
  }

  .rev-empty p {
    margin: 12px 0 4px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
  }

  .rev-empty span {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
  }

  .rev-tx-list {
    display: flex;
    flex-direction: column;
  }

  .rev-tx-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    transition: background 0.15s;
    border-radius: 8px;
    margin: 0;
  }

  .rev-tx-item:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .rev-tx-item:last-child {
    border-bottom: none;
  }

  .rev-tx-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .rev-tx-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .rev-tx-avatar svg {
    width: 16px;
    height: 16px;
  }

  .rev-tx-info {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .rev-tx-name {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }

  .rev-tx-date {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }

  .rev-tx-right {
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
  }

  .rev-tx-amount {
    font-size: 14px;
    font-weight: 600;
  }

  .rev-tx-amount.positive { color: #4ade80; }
  .rev-tx-amount.negative { color: #fff; }

  .rev-tx-status {
    font-size: 10px;
    font-weight: 500;
    padding: 2px 6px;
    border-radius: 999px;
  }

  .rev-tx-status.pending {
    background: rgba(245, 158, 11, 0.2);
    color: #fbbf24;
  }

  .rev-tx-status.failed {
    background: rgba(239, 68, 68, 0.2);
    color: #f87171;
  }

  /* ─── MODAL ──────────────────────────────────────────────────────────────── */
  .rev-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    animation: rev-fade-up 0.2s ease-out;
  }

  @media (min-width: 769px) {
    .rev-modal-overlay {
      left: 260px;
      align-items: center;
    }
  }

  .rev-modal {
    width: min(520px, calc(100% - 24px));
    margin: 0 12px;
    background: linear-gradient(180deg, #0b1222 0%, #0c152a 100%);
    border-radius: 20px 20px 0 0;
    padding: 0 0 34px;
    animation: rev-scale-in 0.25s ease-out;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.4);
  }

  @media (min-width: 769px) {
    .rev-modal {
      border-radius: 20px;
      margin-bottom: 0;
      width: 520px;
      margin-left: 0;
      margin-right: 0;
    }
  }

  .rev-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 20px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .rev-modal-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }

  .rev-modal-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    padding: 4px;
    display: flex;
    transition: color 0.15s;
  }

  .rev-modal-close:hover {
    color: #fff;
  }

  .rev-modal-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (max-width: 768px) {
    .rev-modal-header { padding: 16px 18px 12px; }
    .rev-modal-body { padding: 16px; gap: 14px; }
  }

  .rev-field {
    margin-bottom: 12px;
  }

  .rev-field label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 10px;
  }

  .rev-input {
    width: 100%;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }

  .rev-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  .rev-input:focus {
    border-color: rgba(56, 189, 248, 0.5);
    background: rgba(255, 255, 255, 0.08);
  }

  .rev-amount-input {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 18px 0;
  }

  .rev-big-input {
    width: 120px;
    background: none;
    border: none;
    font-size: 48px;
    font-weight: 300;
    color: #fff;
    text-align: right;
    outline: none;
  }

  .rev-big-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  .rev-currency {
    font-size: 32px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.6);
  }

  .rev-hint {
    margin: 8px 0 0;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
  }

  .rev-method-toggle {
    display: flex;
    gap: 10px;
  }

  .rev-method {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .rev-method:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .rev-method.active {
    background: rgba(56, 189, 248, 0.15);
    border-color: rgba(56, 189, 248, 0.4);
    color: #38bdf8;
  }

  .rev-alert {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .rev-alert.error {
    background: rgba(239, 68, 68, 0.12);
    color: #f87171;
  }

  .rev-alert.success {
    background: rgba(34, 197, 94, 0.12);
    color: #4ade80;
  }

  .rev-submit-btn {
    width: calc(100% - 40px);
    margin: 0 20px;
    padding: 16px;
    border-radius: 14px;
    border: none;
    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rev-submit-btn:hover:not(:disabled) {
    opacity: 0.9;
  }

  .rev-submit-btn:active:not(:disabled) {
    transform: scale(0.98);
  }

  .rev-submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .rev-submit-btn.send {
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  }

  /* ─── MOBILE ADJUSTMENTS - REVOLUT PERFECT ─────────────────────────────── */
  @media (max-width: 768px) {
    .rev-shell { left: 0; }
    
    .rev-hero-zone {
      padding-top: 8px;
      padding-bottom: 0;
    }
    
    .rev-amount-value {
      font-size: 48px;
    }

    .rev-amount-decimal {
      font-size: 28px;
    }

    .rev-cuentas-btn {
      margin-top: 8px;
      padding: 8px 20px;
      font-size: 13px;
    }

    .rev-dots {
      margin: 16px 0 20px;
    }

    .rev-actions {
      gap: 32px;
      margin-top: 0;
      padding: 0;
      justify-content: center;
      width: 100%;
    }

    .rev-action-item {
      min-width: 60px;
      padding: 4px;
    }

    .rev-action-circle {
      width: 52px;
      height: 52px;
    }

    .rev-action-item span {
      font-size: 10px;
      text-align: center;
      line-height: 1.2;
      margin-top: 4px;
    }

    .rev-transactions {
      margin-top: 32px;
    }
  }
`;
