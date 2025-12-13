import React, { useState, useEffect } from 'react';
import {
  Send,
  ArrowDownLeft,
  CheckCircle2,
  AlertCircle,
  History,
  Loader2,
  ArrowRightLeft,
  MoreHorizontal,
  CreditCard,
  Building2,
  X,
  ChevronDown,
} from 'lucide-react';
import { PayoutService, Transaction } from '../../lib/payoutService';
import { Validators } from '../../lib/validators';
import { supabase } from '../../lib/supabaseClient';
import { PremiumLoader } from '../../components/PremiumLoader';
import '../../styles/PremiumBackground.css';

/* ═══════════════════════════════════════════════════════════════════════════
   FINANCE PAGE - REVOLUT-STYLE MOBILE BANKING UX
   Diseño inspirado en Revolut con estilo LinkPay
   ═══════════════════════════════════════════════════════════════════════════ */

export function PayoutsPage() {
  // ─── STATE ───────────────────────────────────────────────────────────────
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Constants
  const MIN_PAYPAL = 5;
  const MIN_BANK = 10;
  const minWithdraw = withdrawMethod === 'PayPal' ? MIN_PAYPAL : MIN_BANK;

  // ─── LIFECYCLE ───────────────────────────────────────────────────────────
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (withdrawMethod === 'PayPal' && savedMethods.paypal) {
      setWithdrawAccount(savedMethods.paypal);
    }
    if (withdrawMethod === 'Bank' && savedMethods.bank) {
      setWithdrawAccount(savedMethods.bank);
    }
  }, [withdrawMethod, savedMethods]);

  const loadData = async () => {
    try {
      const [bal, txs] = await Promise.all([
        PayoutService.getBalance(),
        PayoutService.getHistory(),
      ]);
      setBalance(bal);
      setHistory(txs);

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
    } catch (err) {
      console.error('[Finance] loadData error:', err);
    } finally {
      setLoading(false);
    }
  };

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
      setWithdrawAmount('');
      loadData();
      setTimeout(() => {
        setWithdrawSuccess(false);
        setShowWithdraw(false);
      }, 2000);
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
      loadData();
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
  return (
    <div className="rev-shell lp-premium-bg">
      <style>{revStyles}</style>

      {/* BACKGROUND */}
      <div className="rev-bg">
        <div className="rev-bg-gradient" />
        <div className="rev-bg-glow" />
      </div>

      <div className="rev-container">

        {/* ═══════════════════════════════════════════════════════════════════
            BALANCE CARD - REVOLUT STYLE
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="rev-balance-section">
          <div className="rev-balance-card">
            <span className="rev-balance-label">LinkPay · EUR</span>
            <div className="rev-balance-amount">
              <span className="rev-amount-value">{balance.toFixed(2).split('.')[0]}</span>
              <span className="rev-amount-decimal">,{balance.toFixed(2).split('.')[1]} €</span>
            </div>
            <button className="rev-accounts-btn">
              <span>Billetera</span>
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="rev-dots">
            <span className="rev-dot active" />
            <span className="rev-dot" />
            <span className="rev-dot" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            QUICK ACTIONS - CIRCULAR BUTTONS
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="rev-actions">
          <button className="rev-action-item" onClick={() => setShowWithdraw(true)}>
            <div className="rev-action-circle">
              <ArrowDownLeft size={22} />
            </div>
            <span>Retirar</span>
          </button>

          <button className="rev-action-item" onClick={() => setShowSend(true)}>
            <div className="rev-action-circle">
              <Send size={22} />
            </div>
            <span>Enviar</span>
          </button>

          <button className="rev-action-item">
            <div className="rev-action-circle">
              <ArrowRightLeft size={22} />
            </div>
            <span>Mover</span>
          </button>

          <button className="rev-action-item">
            <div className="rev-action-circle">
              <MoreHorizontal size={22} />
            </div>
            <span>Más</span>
          </button>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            TRANSACTIONS LIST
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
              {history.map((tx) => {
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
            </div>
          )}
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          WITHDRAW MODAL
      ═══════════════════════════════════════════════════════════════════════ */}
      {showWithdraw && (
        <div className="rev-modal-overlay" onClick={() => setShowWithdraw(false)}>
          <div className="rev-modal" onClick={(e) => e.stopPropagation()}>
            <div className="rev-modal-header">
              <h3>Retirar fondos</h3>
              <button className="rev-modal-close" onClick={() => setShowWithdraw(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="rev-modal-body">
              {/* Amount */}
              <div className="rev-field">
                <label>Cantidad</label>
                <div className="rev-amount-input">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0"
                    className="rev-big-input"
                  />
                  <span className="rev-currency">€</span>
                </div>
                <p className="rev-hint">
                  Mín. PayPal: €{MIN_PAYPAL} · Transferencia: €{MIN_BANK}
                </p>
              </div>

              {/* Method */}
              <div className="rev-field">
                <label>Método</label>
                <div className="rev-method-toggle">
                  <button
                    className={`rev-method ${withdrawMethod === 'PayPal' ? 'active' : ''}`}
                    onClick={() => setWithdrawMethod('PayPal')}
                  >
                    <CreditCard size={18} />
                    PayPal
                  </button>
                  <button
                    className={`rev-method ${withdrawMethod === 'Bank' ? 'active' : ''}`}
                    onClick={() => setWithdrawMethod('Bank')}
                  >
                    <Building2 size={18} />
                    Banco
                  </button>
                </div>
              </div>

              {/* Account */}
              <div className="rev-field">
                <label>{withdrawMethod === 'PayPal' ? 'Email PayPal' : 'IBAN'}</label>
                <input
                  type={withdrawMethod === 'PayPal' ? 'email' : 'text'}
                  value={withdrawAccount}
                  onChange={(e) => setWithdrawAccount(e.target.value.toUpperCase())}
                  placeholder={withdrawMethod === 'PayPal' ? 'tu@email.com' : 'ES91...'}
                  className="rev-input"
                />
              </div>

              {withdrawMethod === 'Bank' && (
                <div className="rev-field">
                  <label>Titular</label>
                  <input
                    type="text"
                    value={withdrawIbanHolder}
                    onChange={(e) => setWithdrawIbanHolder(e.target.value)}
                    placeholder="Nombre completo"
                    className="rev-input"
                  />
                </div>
              )}

              {/* Error/Success */}
              {withdrawError && (
                <div className="rev-alert error">
                  <AlertCircle size={16} />
                  {withdrawError}
                </div>
              )}
              {withdrawSuccess && (
                <div className="rev-alert success">
                  <CheckCircle2 size={16} />
                  ¡Retiro solicitado!
                </div>
              )}
            </div>

            <button
              className="rev-submit-btn"
              onClick={handleWithdraw}
              disabled={withdrawLoading}
            >
              {withdrawLoading ? <Loader2 className="rev-spin" size={20} /> : 'Confirmar retiro'}
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SEND MODAL
      ═══════════════════════════════════════════════════════════════════════ */}
      {showSend && (
        <div className="rev-modal-overlay" onClick={() => setShowSend(false)}>
          <div className="rev-modal" onClick={(e) => e.stopPropagation()}>
            <div className="rev-modal-header">
              <h3>Enviar dinero</h3>
              <button className="rev-modal-close" onClick={() => setShowSend(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="rev-modal-body">
              {/* Recipient */}
              <div className="rev-field">
                <label>Destinatario</label>
                <input
                  type="email"
                  value={sendEmail}
                  onChange={(e) => setSendEmail(e.target.value)}
                  placeholder="email@ejemplo.com"
                  className="rev-input"
                />
              </div>

              {/* Amount */}
              <div className="rev-field">
                <label>Cantidad</label>
                <div className="rev-amount-input">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="0"
                    className="rev-big-input"
                  />
                  <span className="rev-currency">€</span>
                </div>
              </div>

              {/* Note */}
              <div className="rev-field">
                <label>Nota (opcional)</label>
                <input
                  type="text"
                  value={sendNote}
                  onChange={(e) => setSendNote(e.target.value)}
                  placeholder="¿Para qué es?"
                  className="rev-input"
                />
              </div>

              {/* Error/Success */}
              {sendError && (
                <div className="rev-alert error">
                  <AlertCircle size={16} />
                  {sendError}
                </div>
              )}
              {sendSuccess && (
                <div className="rev-alert success">
                  <CheckCircle2 size={16} />
                  ¡Envío completado!
                </div>
              )}
            </div>

            <button
              className="rev-submit-btn send"
              onClick={handleSend}
              disabled={sendLoading}
            >
              {sendLoading ? <Loader2 className="rev-spin" size={20} /> : 'Enviar'}
            </button>
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
  .rev-spin { animation: rev-spin 1s linear infinite; }
  @keyframes rev-spin { 100% { transform: rotate(360deg); } }

  @keyframes rev-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes rev-scale-in {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
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

  @media (min-width: 769px) {
    .rev-shell { left: 260px; }
  }

  /* ─── BACKGROUND ─────────────────────────────────────────────────────────── */
  .rev-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    background: linear-gradient(180deg, 
      #0a1628 0%, 
      #0d1f3c 30%,
      #0f172a 100%
    );
  }

  .rev-bg-gradient {
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6, 78, 125, 0.5) 0%, transparent 50%),
      radial-gradient(ellipse 60% 40% at 40% 10%, rgba(14, 116, 144, 0.3) 0%, transparent 40%);
    animation: rev-fade-up 1s ease-out;
  }

  .rev-bg-glow {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 60%);
    pointer-events: none;
  }

  .rev-container {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px 16px 100px;
    animation: rev-fade-up 0.5s ease-out;
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

  /* ─── BALANCE SECTION ────────────────────────────────────────────────────── */
  .rev-balance-section {
    padding: 40px 0 30px;
    text-align: center;
  }

  .rev-balance-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
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

  .rev-accounts-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 999px;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: background 0.2s;
  }

  .rev-accounts-btn:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .rev-dots {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 24px;
  }

  .rev-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transition: background 0.2s;
  }

  .rev-dot.active {
    background: #fff;
  }

  /* ─── QUICK ACTIONS ──────────────────────────────────────────────────────── */
  .rev-actions {
    display: flex;
    justify-content: center;
    gap: 24px;
    padding: 20px 0 30px;
  }

  .rev-action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .rev-action-circle {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all 0.2s;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .rev-action-item:hover .rev-action-circle {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  .rev-action-item:active .rev-action-circle {
    transform: scale(0.95);
  }

  .rev-action-item span {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
  }

  /* ─── TRANSACTIONS ───────────────────────────────────────────────────────── */
  .rev-transactions {
    background: rgba(15, 23, 42, 0.6);
    border-radius: 24px 24px 0 0;
    padding: 24px 20px;
    margin: 0 -16px;
    min-height: 300px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .rev-section-title {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 16px 4px;
  }

  .rev-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 50px 20px;
    color: rgba(255, 255, 255, 0.4);
  }

  .rev-empty p {
    margin: 16px 0 4px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
  }

  .rev-empty span {
    font-size: 13px;
  }

  .rev-tx-list {
    display: flex;
    flex-direction: column;
  }

  .rev-tx-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background 0.15s;
    border-radius: 12px;
    margin: 0 -4px;
    padding-left: 8px;
    padding-right: 8px;
  }

  .rev-tx-item:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .rev-tx-item:last-child {
    border-bottom: none;
  }

  .rev-tx-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .rev-tx-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rev-tx-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .rev-tx-name {
    font-size: 15px;
    font-weight: 500;
    color: #fff;
  }

  .rev-tx-date {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.45);
  }

  .rev-tx-right {
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
  }

  .rev-tx-amount {
    font-size: 15px;
    font-weight: 600;
  }

  .rev-tx-amount.positive { color: #22c55e; }
  .rev-tx-amount.negative { color: #fff; }

  .rev-tx-status {
    font-size: 11px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 999px;
  }

  .rev-tx-status.pending {
    background: rgba(245, 158, 11, 0.15);
    color: #fbbf24;
  }

  .rev-tx-status.failed {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
  }

  /* ─── MODAL ──────────────────────────────────────────────────────────────── */
  .rev-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
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
    width: 100%;
    max-width: 420px;
    background: #0f172a;
    border-radius: 24px 24px 0 0;
    padding: 0 0 34px;
    animation: rev-scale-in 0.25s ease-out;
    max-height: 90vh;
    overflow-y: auto;
  }

  @media (min-width: 769px) {
    .rev-modal {
      border-radius: 24px;
      margin-bottom: 0;
    }
  }

  .rev-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
  }

  .rev-field {
    margin-bottom: 20px;
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
    gap: 8px;
    padding: 20px 0;
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

  /* ─── MOBILE ADJUSTMENTS ─────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    .rev-shell { left: 0; }
    
    .rev-amount-value {
      font-size: 48px;
    }

    .rev-amount-decimal {
      font-size: 28px;
    }

    .rev-actions {
      gap: 20px;
    }

    .rev-action-circle {
      width: 52px;
      height: 52px;
    }
  }
`;
