import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  ArrowDownLeft,
  CheckCircle2,
  AlertCircle,
  History,
  Loader2,
  Wallet2,
  Banknote,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Building2,
  Mail,
  User,
  MessageSquare,
  Clock,
  XCircle,
} from 'lucide-react';
import { PayoutService, Transaction } from '../../lib/payoutService';
import { Validators } from '../../lib/validators';
import { supabase } from '../../lib/supabaseClient';

/* ═══════════════════════════════════════════════════════════════════════════
   FINANCE PAGE - REVOLUT-STYLE MOBILE BANKING UX
   ═══════════════════════════════════════════════════════════════════════════ */

export function PayoutsPage() {
  // ─── STATE ───────────────────────────────────────────────────────────────
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Refs for scrolling
  const withdrawRef = useRef<HTMLDivElement>(null);
  const sendRef = useRef<HTMLDivElement>(null);

  // Constants
  const MIN_PAYPAL = 5;
  const MIN_BANK = 10;
  const minWithdraw = withdrawMethod === 'PayPal' ? MIN_PAYPAL : MIN_BANK;
  const isReadyToWithdraw = balance >= MIN_PAYPAL;

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

  // ─── SCROLL HANDLERS ─────────────────────────────────────────────────────
  const scrollToWithdraw = () => {
    withdrawRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const scrollToSend = () => {
    sendRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // ─── WITHDRAW HANDLER ────────────────────────────────────────────────────
  const handleWithdraw = async () => {
    setWithdrawError('');
    setWithdrawSuccess(false);

    const amount = parseFloat(withdrawAmount);

    // Validations
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
      setTimeout(() => setWithdrawSuccess(false), 4000);
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
      setTimeout(() => setSendSuccess(false), 4000);
    } catch (err: any) {
      setSendError(err.message || 'Error al enviar.');
    } finally {
      setSendLoading(false);
    }
  };

  // ─── LOADING STATE ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="fin-shell fin-bg">
        <style>{finStyles}</style>
        <div className="fin-loading">
          <Loader2 className="fin-spin" size={40} />
          <span>Cargando finanzas...</span>
        </div>
      </div>
    );
  }

  // ─── RENDER ──────────────────────────────────────────────────────────────
  return (
    <div className="fin-shell fin-bg">
      <style>{finStyles}</style>
      <div className="fin-container">

        {/* ═══════════════════════════════════════════════════════════════════
            HERO WALLET CARD
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="fin-hero">
          <div className="fin-hero-glow" />

          <div className="fin-hero-badges">
            <span className="fin-badge fin-badge-primary">
              <Wallet2 size={14} />
              Billetera global
            </span>
            {isReadyToWithdraw && (
              <span className="fin-badge fin-badge-success">
                <Banknote size={12} />
                Listo para retirar
              </span>
            )}
          </div>

          <div className="fin-hero-balance">
            <span className="fin-balance-label">Saldo disponible</span>
            <div className="fin-balance-row">
              <span className="fin-balance-currency">€</span>
              <span className="fin-balance-amount">{balance.toFixed(2)}</span>
            </div>
            <p className="fin-balance-sub">
              Todo lo que has generado con Smart Links y Bio Page, listo para moverse.
            </p>
          </div>

          <div className="fin-hero-actions">
            <button
              type="button"
              className="fin-action-btn fin-action-withdraw"
              onClick={scrollToWithdraw}
            >
              <ArrowDownLeft size={18} />
              Retirar
            </button>
            <button
              type="button"
              className="fin-action-btn fin-action-send"
              onClick={scrollToSend}
            >
              <Send size={18} />
              Enviar
            </button>
          </div>
        </section>

        {/* MAIN GRID: Forms + Activity */}
        <div className="fin-grid">

          {/* LEFT COLUMN: Forms */}
          <div className="fin-forms">

            {/* ═══════════════════════════════════════════════════════════════
                WITHDRAW SECTION
            ═══════════════════════════════════════════════════════════════ */}
            <section ref={withdrawRef} className="fin-card fin-card-form">
              <div className="fin-card-header">
                <div className="fin-card-icon fin-icon-withdraw">
                  <ArrowDownLeft size={20} />
                </div>
                <div>
                  <h3>Solicitar retiro</h3>
                  <span className="fin-card-tag">Salida hacia tu cuenta</span>
                </div>
              </div>

              {/* Amount */}
              <div className="fin-field">
                <label>Cantidad</label>
                <div className="fin-input-wrap">
                  <span className="fin-input-prefix">€</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    className="fin-input fin-input-amount"
                  />
                </div>
                <p className="fin-hint">
                  Mínimo PayPal: <strong>€{MIN_PAYPAL}</strong> · Transferencia: <strong>€{MIN_BANK}</strong>
                </p>
              </div>

              {/* Method Toggle */}
              <div className="fin-field">
                <label>Método de retiro</label>
                <div className="fin-toggle-group">
                  <button
                    type="button"
                    className={`fin-toggle ${withdrawMethod === 'PayPal' ? 'is-active' : ''}`}
                    onClick={() => setWithdrawMethod('PayPal')}
                  >
                    <CreditCard size={16} />
                    PayPal
                  </button>
                  <button
                    type="button"
                    className={`fin-toggle ${withdrawMethod === 'Bank' ? 'is-active' : ''}`}
                    onClick={() => setWithdrawMethod('Bank')}
                  >
                    <Building2 size={16} />
                    Transferencia
                  </button>
                </div>
              </div>

              {/* Account Details */}
              {withdrawMethod === 'PayPal' ? (
                <div className="fin-field">
                  <label>Email de PayPal</label>
                  <div className="fin-input-wrap">
                    <span className="fin-input-prefix"><Mail size={16} /></span>
                    <input
                      type="email"
                      value={withdrawAccount}
                      onChange={(e) => setWithdrawAccount(e.target.value)}
                      placeholder="tu@email.com"
                      className="fin-input fin-input-icon"
                    />
                  </div>
                  {savedMethods.paypal && (
                    <p className="fin-hint fin-hint-ok">✓ Autocompletado desde Ajustes</p>
                  )}
                </div>
              ) : (
                <>
                  <div className="fin-field">
                    <label>IBAN</label>
                    <div className="fin-input-wrap">
                      <span className="fin-input-prefix"><Building2 size={16} /></span>
                      <input
                        type="text"
                        value={withdrawAccount}
                        onChange={(e) => setWithdrawAccount(e.target.value.toUpperCase())}
                        placeholder="ES91 2100 0418 4502 0005 1332"
                        className="fin-input fin-input-icon"
                      />
                    </div>
                    {savedMethods.bank && (
                      <p className="fin-hint fin-hint-ok">✓ Autocompletado desde Ajustes</p>
                    )}
                  </div>
                  <div className="fin-field">
                    <label>Titular de la cuenta</label>
                    <div className="fin-input-wrap">
                      <span className="fin-input-prefix"><User size={16} /></span>
                      <input
                        type="text"
                        value={withdrawIbanHolder}
                        onChange={(e) => setWithdrawIbanHolder(e.target.value)}
                        placeholder="Nombre completo"
                        className="fin-input fin-input-icon"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Error / Success */}
              {withdrawError && (
                <div className="fin-alert fin-alert-error">
                  <AlertCircle size={16} />
                  {withdrawError}
                </div>
              )}
              {withdrawSuccess && (
                <div className="fin-alert fin-alert-success">
                  <CheckCircle2 size={16} />
                  ¡Retiro solicitado correctamente!
                </div>
              )}

              {/* Submit */}
              <button
                type="button"
                onClick={handleWithdraw}
                disabled={withdrawLoading}
                className="fin-btn-primary"
              >
                {withdrawLoading ? (
                  <><Loader2 className="fin-spin" size={18} /> Procesando...</>
                ) : (
                  'Confirmar retiro'
                )}
              </button>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SEND MONEY SECTION
            ═══════════════════════════════════════════════════════════════ */}
            <section ref={sendRef} className="fin-card fin-card-form">
              <div className="fin-card-header">
                <div className="fin-card-icon fin-icon-send">
                  <Send size={20} />
                </div>
                <div>
                  <h3>Enviar a otro usuario</h3>
                  <span className="fin-card-tag">Transferencia interna</span>
                </div>
              </div>

              {/* Recipient */}
              <div className="fin-field">
                <label>Email del destinatario</label>
                <div className="fin-input-wrap">
                  <span className="fin-input-prefix"><Mail size={16} /></span>
                  <input
                    type="email"
                    value={sendEmail}
                    onChange={(e) => setSendEmail(e.target.value)}
                    placeholder="amigo@linkpay.io"
                    className="fin-input fin-input-icon"
                  />
                </div>
              </div>

              {/* Amount */}
              <div className="fin-field">
                <label>Cantidad</label>
                <div className="fin-input-wrap">
                  <span className="fin-input-prefix">€</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="0.00"
                    className="fin-input fin-input-amount"
                  />
                </div>
              </div>

              {/* Note (optional) */}
              <div className="fin-field">
                <label>Nota (opcional)</label>
                <div className="fin-input-wrap">
                  <span className="fin-input-prefix"><MessageSquare size={16} /></span>
                  <input
                    type="text"
                    value={sendNote}
                    onChange={(e) => setSendNote(e.target.value)}
                    placeholder="¡Gracias por tu ayuda!"
                    className="fin-input fin-input-icon"
                  />
                </div>
              </div>

              {/* Error / Success */}
              {sendError && (
                <div className="fin-alert fin-alert-error">
                  <AlertCircle size={16} />
                  {sendError}
                </div>
              )}
              {sendSuccess && (
                <div className="fin-alert fin-alert-success">
                  <CheckCircle2 size={16} />
                  ¡Envío completado!
                </div>
              )}

              {/* Submit */}
              <button
                type="button"
                onClick={handleSend}
                disabled={sendLoading}
                className="fin-btn-primary fin-btn-send"
              >
                {sendLoading ? (
                  <><Loader2 className="fin-spin" size={18} /> Enviando...</>
                ) : (
                  <>
                    <Send size={16} />
                    Enviar dinero
                  </>
                )}
              </button>
            </section>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              ACTIVITY TIMELINE
          ═══════════════════════════════════════════════════════════════════ */}
          <section className="fin-card fin-card-activity">
            <div className="fin-card-header">
              <div className="fin-card-icon fin-icon-history">
                <History size={20} />
              </div>
              <div>
                <h3>Actividad financiera</h3>
                <span className="fin-card-tag">Historial de movimientos</span>
              </div>
            </div>

            {history.length === 0 ? (
              <div className="fin-empty">
                <TrendingUp size={32} className="fin-empty-icon" />
                <p className="fin-empty-title">Sin movimientos aún</p>
                <p className="fin-empty-sub">
                  Cuando realices tu primer retiro o envío, aparecerá aquí.
                </p>
              </div>
            ) : (
              <div className="fin-timeline">
                {history.map((tx) => {
                  const isOut = tx.is_negative;
                  const iconBg = tx.type === 'transfer' ? 'fin-tx-send' : 'fin-tx-withdraw';
                  const Icon = tx.type === 'transfer' ? ArrowUpRight : ArrowDownLeft;
                  const label = tx.type === 'withdrawal'
                    ? 'Retiro'
                    : isOut
                      ? 'Envío'
                      : 'Recibido';

                  const statusClass =
                    tx.status === 'pending'
                      ? 'fin-status-pending'
                      : tx.status === 'failed'
                        ? 'fin-status-failed'
                        : 'fin-status-ok';

                  const statusLabel =
                    tx.status === 'pending'
                      ? 'Pendiente'
                      : tx.status === 'failed'
                        ? 'Rechazado'
                        : 'Completado';

                  return (
                    <div key={tx.id} className="fin-tx-item">
                      <div className="fin-tx-left">
                        <div className={`fin-tx-avatar ${iconBg}`}>
                          <Icon size={16} />
                        </div>
                        <div className="fin-tx-info">
                          <span className="fin-tx-label">{label}</span>
                          <span className="fin-tx-date">
                            <Clock size={10} /> {tx.date}
                          </span>
                        </div>
                      </div>
                      <div className="fin-tx-right">
                        <span className={`fin-tx-amount ${isOut ? 'is-out' : 'is-in'}`}>
                          {isOut ? '-' : '+'}€{Number(tx.amount).toFixed(2)}
                        </span>
                        <span className={`fin-status-pill ${statusClass}`}>
                          {statusLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   STYLES - MOBILE-FIRST REVOLUT-STYLE DESIGN
   ═══════════════════════════════════════════════════════════════════════════════ */

const finStyles = `
  /* ─── ANIMATIONS ─────────────────────────────────────────────────────────── */
  .fin-spin { animation: fin-spin 1s linear infinite; }
  @keyframes fin-spin { 100% { transform: rotate(360deg); } }

  @keyframes fin-glow-pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }

  @keyframes fin-fade-in {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ─── SHELL & BACKGROUND ─────────────────────────────────────────────────── */
  .fin-bg {
    min-height: 100dvh;
    background: 
      radial-gradient(ellipse at 0% 0%, rgba(30, 58, 138, 0.4) 0%, transparent 50%),
      radial-gradient(ellipse at 100% 100%, rgba(79, 70, 229, 0.15) 0%, transparent 50%),
      #020617;
    position: relative;
  }

  .fin-shell {
    position: fixed;
    inset: 0;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    z-index: 1;
  }

  @media (min-width: 769px) {
    .fin-shell { left: 260px; }
  }

  .fin-container {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px 16px 100px;
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif;
    color: #e5e7eb;
    animation: fin-fade-in 0.4s ease-out;
  }

  .fin-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 16px;
    color: #818cf8;
    font-size: 14px;
    font-weight: 500;
  }

  /* ─── HERO WALLET CARD ───────────────────────────────────────────────────── */
  .fin-hero {
    position: relative;
    background: linear-gradient(135deg, rgba(30, 58, 138, 0.6) 0%, rgba(15, 23, 42, 0.95) 100%);
    border: 1px solid rgba(129, 140, 248, 0.3);
    border-radius: 24px;
    padding: 28px 24px;
    margin-bottom: 20px;
    overflow: hidden;
    box-shadow: 
      0 20px 50px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .fin-hero-glow {
    position: absolute;
    top: -50%;
    right: -30%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%);
    pointer-events: none;
    animation: fin-glow-pulse 6s ease-in-out infinite;
  }

  .fin-hero-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
  }

  .fin-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .fin-badge-primary {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(129, 140, 248, 0.5);
    color: #c7d2fe;
  }

  .fin-badge-success {
    background: rgba(22, 163, 74, 0.15);
    border: 1px solid rgba(34, 197, 94, 0.5);
    color: #86efac;
  }

  .fin-hero-balance {
    position: relative;
    z-index: 1;
  }

  .fin-balance-label {
    display: block;
    font-size: 13px;
    color: #94a3b8;
    margin-bottom: 4px;
  }

  .fin-balance-row {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .fin-balance-currency {
    font-size: 28px;
    font-weight: 600;
    color: #a5b4fc;
  }

  .fin-balance-amount {
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #f9fafb;
    text-shadow: 0 0 40px rgba(129, 140, 248, 0.3);
  }

  .fin-balance-sub {
    margin: 8px 0 0;
    font-size: 13px;
    color: #94a3b8;
    max-width: 320px;
  }

  .fin-hero-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
    position: relative;
    z-index: 1;
  }

  .fin-action-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 20px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
  }

  .fin-action-withdraw {
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(99, 102, 241, 0.9) 100%);
    color: #fff;
    box-shadow: 0 8px 24px rgba(79, 70, 229, 0.4);
  }

  .fin-action-withdraw:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(79, 70, 229, 0.5);
  }

  .fin-action-send {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(129, 140, 248, 0.4);
    color: #c7d2fe;
  }

  .fin-action-send:hover {
    background: rgba(79, 70, 229, 0.2);
    border-color: rgba(129, 140, 248, 0.6);
    transform: translateY(-2px);
  }

  /* ─── GRID LAYOUT ────────────────────────────────────────────────────────── */
  .fin-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .fin-forms {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media (min-width: 900px) {
    .fin-grid {
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 24px;
    }
  }

  /* ─── CARDS ──────────────────────────────────────────────────────────────── */
  .fin-card {
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(100, 116, 139, 0.25);
    border-radius: 20px;
    padding: 24px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .fin-card:hover {
    border-color: rgba(129, 140, 248, 0.3);
  }

  .fin-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .fin-card-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #f1f5f9;
  }

  .fin-card-tag {
    display: block;
    font-size: 11px;
    color: #64748b;
    margin-top: 2px;
  }

  .fin-card-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .fin-icon-withdraw {
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.3) 0%, rgba(99, 102, 241, 0.2) 100%);
    color: #a5b4fc;
    border: 1px solid rgba(129, 140, 248, 0.3);
  }

  .fin-icon-send {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(96, 165, 250, 0.2) 100%);
    color: #93c5fd;
    border: 1px solid rgba(96, 165, 250, 0.3);
  }

  .fin-icon-history {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(192, 132, 252, 0.2) 100%);
    color: #d8b4fe;
    border: 1px solid rgba(168, 85, 247, 0.3);
  }

  /* ─── FORM FIELDS ────────────────────────────────────────────────────────── */
  .fin-field {
    margin-bottom: 16px;
  }

  .fin-field label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #94a3b8;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .fin-input-wrap {
    position: relative;
  }

  .fin-input-prefix {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #64748b;
    pointer-events: none;
  }

  .fin-input {
    width: 100%;
    padding: 14px 14px 14px 14px;
    border-radius: 12px;
    border: 1px solid rgba(100, 116, 139, 0.3);
    background: rgba(2, 6, 23, 0.6);
    color: #e5e7eb;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .fin-input-amount {
    padding-left: 32px;
    font-size: 20px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .fin-input-icon {
    padding-left: 44px;
  }

  .fin-input::placeholder {
    color: #475569;
  }

  .fin-input:focus {
    border-color: rgba(129, 140, 248, 0.6);
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.15);
  }

  .fin-hint {
    margin: 6px 0 0;
    font-size: 12px;
    color: #64748b;
  }

  .fin-hint-ok {
    color: #4ade80;
  }

  /* ─── TOGGLE GROUP ───────────────────────────────────────────────────────── */
  .fin-toggle-group {
    display: flex;
    gap: 8px;
  }

  .fin-toggle {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid rgba(100, 116, 139, 0.3);
    background: rgba(2, 6, 23, 0.6);
    color: #94a3b8;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .fin-toggle:hover {
    background: rgba(79, 70, 229, 0.1);
    border-color: rgba(129, 140, 248, 0.4);
  }

  .fin-toggle.is-active {
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.3) 0%, rgba(99, 102, 241, 0.2) 100%);
    border-color: rgba(129, 140, 248, 0.6);
    color: #e0e7ff;
    box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.3);
  }

  /* ─── ALERTS ─────────────────────────────────────────────────────────────── */
  .fin-alert {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 16px;
    animation: fin-fade-in 0.3s ease-out;
  }

  .fin-alert-error {
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.4);
    color: #fca5a5;
  }

  .fin-alert-success {
    background: rgba(34, 197, 94, 0.12);
    border: 1px solid rgba(34, 197, 94, 0.4);
    color: #86efac;
  }

  /* ─── BUTTONS ────────────────────────────────────────────────────────────── */
  .fin-btn-primary {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px 24px;
    border-radius: 14px;
    border: none;
    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 
      0 8px 24px rgba(79, 70, 229, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transition: all 0.2s ease;
  }

  .fin-btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 32px rgba(79, 70, 229, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .fin-btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .fin-btn-send {
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    box-shadow: 
      0 8px 24px rgba(59, 130, 246, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .fin-btn-send:hover:not(:disabled) {
    box-shadow: 
      0 12px 32px rgba(59, 130, 246, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  /* ─── ACTIVITY TIMELINE ──────────────────────────────────────────────────── */
  .fin-card-activity {
    min-height: 300px;
  }

  .fin-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px 20px;
    border: 1px dashed rgba(100, 116, 139, 0.3);
    border-radius: 16px;
    background: rgba(2, 6, 23, 0.4);
  }

  .fin-empty-icon {
    color: #475569;
    margin-bottom: 12px;
  }

  .fin-empty-title {
    margin: 0 0 4px;
    font-size: 14px;
    font-weight: 600;
    color: #94a3b8;
  }

  .fin-empty-sub {
    margin: 0;
    font-size: 12px;
    color: #64748b;
  }

  .fin-timeline {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .fin-tx-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 12px;
    border-radius: 14px;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(51, 65, 85, 0.4);
    transition: background 0.2s, border-color 0.2s;
  }

  .fin-tx-item:hover {
    background: rgba(51, 65, 85, 0.4);
    border-color: rgba(100, 116, 139, 0.4);
  }

  .fin-tx-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .fin-tx-avatar {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .fin-tx-withdraw {
    background: rgba(100, 116, 139, 0.2);
    border: 1px solid rgba(148, 163, 184, 0.3);
    color: #cbd5e1;
  }

  .fin-tx-send {
    background: rgba(59, 130, 246, 0.15);
    border: 1px solid rgba(96, 165, 250, 0.3);
    color: #93c5fd;
  }

  .fin-tx-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .fin-tx-label {
    font-size: 14px;
    font-weight: 600;
    color: #e2e8f0;
  }

  .fin-tx-date {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: #64748b;
  }

  .fin-tx-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }

  .fin-tx-amount {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 15px;
    font-weight: 700;
  }

  .fin-tx-amount.is-out { color: #f87171; }
  .fin-tx-amount.is-in { color: #4ade80; }

  .fin-status-pill {
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .fin-status-pending {
    background: rgba(245, 158, 11, 0.15);
    border: 1px solid rgba(245, 158, 11, 0.4);
    color: #fbbf24;
  }

  .fin-status-ok {
    background: rgba(34, 197, 94, 0.12);
    border: 1px solid rgba(34, 197, 94, 0.4);
    color: #4ade80;
  }

  .fin-status-failed {
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.4);
    color: #f87171;
  }

  /* ─── MOBILE ADJUSTMENTS ─────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    .fin-shell { left: 0; }
    
    .fin-container {
      padding: 16px 12px 100px;
    }

    .fin-hero {
      padding: 24px 20px;
      border-radius: 20px;
    }

    .fin-balance-amount {
      font-size: 42px;
    }

    .fin-hero-actions {
      flex-direction: column;
    }

    .fin-action-btn {
      padding: 16px 20px;
    }

    .fin-card {
      padding: 20px 16px;
      border-radius: 16px;
    }

    .fin-tx-item {
      padding: 12px 10px;
    }
  }
`;
