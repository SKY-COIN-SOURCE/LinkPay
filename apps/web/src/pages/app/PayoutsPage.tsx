import React, { useState, useEffect } from 'react';
import {
  Send,
  ArrowDownLeft,
  CheckCircle2,
  AlertCircle,
  History,
  Loader2,
  Wallet2,
  Banknote,
} from 'lucide-react';
import { PayoutService, Transaction } from '../../lib/payoutService';
import { Validators } from '../../lib/validators';
import { supabase } from '../../lib/supabase';

export function PayoutsPage() {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<'withdraw' | 'send'>('withdraw');

  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'PayPal' | 'Bank'>('PayPal');
  const [account, setAccount] = useState('');
  const [sendEmail, setSendEmail] = useState('');

  const [savedMethods, setSavedMethods] = useState<{ paypal: string; bank: string }>({
    paypal: '',
    bank: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'error' | 'success' | null; msg: string }>({
    type: null,
    msg: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (method === 'PayPal' && savedMethods.paypal) setAccount(savedMethods.paypal);
    if (method === 'Bank' && savedMethods.bank) setAccount(savedMethods.bank);
  }, [method, savedMethods]);

  const loadData = async () => {
    try {
      const bal = await PayoutService.getBalance();
      setBalance(bal);
      const txs = await PayoutService.getHistory();
      setHistory(txs);

      const {
        data: { user },
      } = await supabase.auth.getUser();
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
          if (data.paypal_email) setAccount(data.paypal_email);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAction = async () => {
    setStatus({ type: null, msg: '' });
    const numericAmount = parseFloat(amount);

    if (!amount || numericAmount <= 0) {
      return setStatus({ type: 'error', msg: 'Cantidad inválida.' });
    }
    if (numericAmount > balance) {
      return setStatus({ type: 'error', msg: 'Saldo insuficiente.' });
    }

    setLoading(true);
    try {
      if (activeTab === 'withdraw') {
        await PayoutService.requestPayout(numericAmount, method, account);
        setStatus({ type: 'success', msg: 'Retiro solicitado correctamente.' });
      } else {
        if (!Validators.isValidEmail(sendEmail)) throw new Error('Email inválido.');
        await PayoutService.sendMoney(sendEmail, numericAmount);
        setStatus({ type: 'success', msg: `Has enviado €${amount} a ${sendEmail}` });
      }
      setAmount('');
      loadData();
    } catch (err: any) {
      setStatus({ type: 'error', msg: err.message || 'Error al procesar.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lp-fin-shell lp-fin-bg">
      <style>{finStyles}</style>
      <div className="lp-fin-inner animate-enter">
        {/* HEADER */}
        <header className="lp-fin-header">
          <div className="lp-fin-chip">
            <span className="lp-fin-chip-dot" />
            CREATOR FINANCE
          </div>
          <p>
            Controla en tiempo real todo el dinero que entra y sale de tu universo LinkPay. Retiros,
            envíos y flujo de caja en un mismo lugar.
          </p>
        </header>

        <section className="lp-fin-grid">
          {/* COLUMNA IZQUIERDA: SALDO + FORMULARIO */}
          <div className="lp-fin-left">
            {/* TARJETA SALDO */}
            <div className="lp-fin-card lp-fin-balance">
              <div className="lp-fin-badge-row">
                <span className="lp-fin-badge">
                  <Wallet2 size={14} />
                  Billetera global
                </span>
                <span className="lp-fin-badge-soft">
                  <Banknote size={12} />
                  Listo para retirar
                </span>
              </div>

              <div className="lp-fin-balance-main">
                <span className="lp-fin-balance-label">Saldo disponible</span>
                <div className="lp-fin-balance-amount">
                  <span className="lp-fin-currency">€</span>
                  <span className="lp-fin-balance-number">
                    {balance.toFixed(2)}
                  </span>
                </div>
                <p className="lp-fin-balance-sub">
                  Todo lo que has generado con tus Smart Links y Bio Page, listo para moverse donde
                  quieras.
                </p>
              </div>

              <div className="lp-fin-tabs">
                <button
                  type="button"
                  onClick={() => setActiveTab('withdraw')}
                  className={`lp-fin-tab ${activeTab === 'withdraw' ? 'is-active' : ''}`}
                >
                  <ArrowDownLeft size={16} />
                  Retirar
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('send')}
                  className={`lp-fin-tab ${activeTab === 'send' ? 'is-active' : ''}`}
                >
                  <Send size={16} />
                  Enviar
                </button>
              </div>
            </div>

            {/* FORMULARIO ACCIÓN */}
            <div className="lp-fin-card lp-fin-form">
              <div className="lp-fin-form-header">
                <h3>{activeTab === 'withdraw' ? 'Solicitar retiro' : 'Enviar dinero'}</h3>
                <span className="lp-fin-form-tag">
                  {activeTab === 'withdraw' ? 'Salida hacia tu cuenta' : 'Transferencia interna'}
                </span>
              </div>

              {/* CANTIDAD */}
              <div className="lp-fin-field">
                <label>CANTIDAD (€)</label>
                <div className="lp-fin-input-wrapper">
                  <span className="lp-fin-input-prefix">€</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="lp-fin-input lp-fin-input-amount"
                  />
                </div>
                {activeTab === 'withdraw' && (
                  <p className="lp-fin-hint">
                    Mínimo PayPal: <strong>€5</strong> · Transferencia bancaria: <strong>€10</strong>
                  </p>
                )}
              </div>

              {/* CAMPOS SEGÚN TAB */}
              {activeTab === 'withdraw' ? (
                <>
                  <div className="lp-fin-field">
                    <label>MÉTODO</label>
                    <div className="lp-fin-method-row">
                      {(['PayPal', 'Bank'] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMethod(m)}
                          className={`lp-fin-method ${method === m ? 'is-active' : ''}`}
                        >
                          {m === 'PayPal' ? 'PayPal' : 'Bank Transfer'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="lp-fin-field">
                    <label>CUENTA DESTINO</label>
                    <input
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                      placeholder={method === 'PayPal' ? 'tu@email.com' : 'ES91…'}
                      className="lp-fin-input"
                    />
                    {((method === 'PayPal' && savedMethods.paypal) ||
                      (method === 'Bank' && savedMethods.bank)) && (
                      <p className="lp-fin-hint lp-fin-hint-success">
                        ✓ Autocompletado desde Ajustes
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="lp-fin-field">
                  <label>EMAIL DEL USUARIO</label>
                  <input
                    value={sendEmail}
                    onChange={(e) => setSendEmail(e.target.value)}
                    placeholder="amigo@linkpay.io"
                    className="lp-fin-input"
                  />
                  <p className="lp-fin-hint">
                    Envía dinero a otro creador que use LinkPay. La operación queda registrada en
                    tu historial.
                  </p>
                </div>
              )}

              {/* ESTADO */}
              {status.type && (
                <div
                  className={`lp-fin-status ${
                    status.type === 'error' ? 'lp-fin-status-error' : 'lp-fin-status-ok'
                  }`}
                >
                  {status.type === 'error' ? (
                    <AlertCircle size={18} />
                  ) : (
                    <CheckCircle2 size={18} />
                  )}
                  <span>{status.msg}</span>
                </div>
              )}

              {/* BOTÓN PRINCIPAL */}
              <button
                type="button"
                onClick={handleAction}
                disabled={loading}
                className="lp-fin-main-btn"
              >
                {loading ? (
                  <span className="lp-fin-btn-loading">
                    <Loader2 className="spin" size={18} />
                    Procesando…
                  </span>
                ) : activeTab === 'withdraw' ? (
                  'Confirmar retiro'
                ) : (
                  'Enviar dinero'
                )}
              </button>
            </div>
          </div>

          {/* COLUMNA DERECHA: HISTORIAL */}
          <div className="lp-fin-card lp-fin-history">
            <div className="lp-fin-history-header">
              <div className="lp-fin-history-icon">
                <History size={18} />
              </div>
              <div>
                <h3>Actividad financiera</h3>
                <p>Todos los retiros y envíos asociados a tu cuenta.</p>
              </div>
            </div>

            {history.length === 0 ? (
              <div className="lp-fin-history-empty">
                <p className="lp-fin-history-empty-title">No hay movimientos todavía.</p>
                <p className="lp-fin-history-empty-sub">
                  Cuando realices tu primer retiro o envío, aparecerá aquí una línea de tiempo
                  completa.
                </p>
              </div>
            ) : (
              <div className="lp-fin-history-list">
                {history.map((tx) => {
                  const isOut = tx.is_negative;
                  const typeLabel = tx.type === 'withdrawal' ? 'Retiro' : 'Transferencia';
                  const statusClass =
                    tx.status === 'pending'
                      ? 'lp-fin-status-pill-pending'
                      : 'lp-fin-status-pill-ok';

                  return (
                    <div key={tx.id} className="lp-fin-history-item">
                      <div className="lp-fin-history-left">
                        <div
                          className={`lp-fin-history-avatar ${
                            tx.type === 'transfer' ? 'is-transfer' : 'is-withdraw'
                          }`}
                        >
                          {tx.type === 'transfer' ? (
                            <Send size={16} />
                          ) : (
                            <ArrowDownLeft size={16} />
                          )}
                        </div>
                        <div className="lp-fin-history-text">
                          <span className="lp-fin-history-title">{typeLabel}</span>
                          <span className="lp-fin-history-date">{tx.date}</span>
                        </div>
                      </div>

                      <div className="lp-fin-history-right">
                        <span className={`lp-fin-history-amount ${isOut ? 'is-out' : 'is-in'}`}>
                          {isOut ? '-' : '+'}€{Number(tx.amount).toFixed(2)}
                        </span>
                        <span className={`lp-fin-status-pill ${statusClass}`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

/* =============== ESTILOS FINANZAS =============== */

const finStyles = `
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { 100% { transform: rotate(360deg); } }

  .lp-fin-bg {
    min-height: 100dvh;
    background:
      radial-gradient(circle at 0% 0%, #1e3a8a 0, transparent 55%),
      radial-gradient(circle at 100% 100%, #020617 0, #000 65%);
    background-color: #020617;
    position: relative;
    overflow: hidden;
  }
  .lp-fin-bg::before,
  .lp-fin-bg::after {
    content: "";
    position: absolute;
    inset: -40%;
    background:
      radial-gradient(circle at 12% 0%, rgba(56,189,248,0.14), transparent 60%),
      radial-gradient(circle at 88% 100%, rgba(129,140,248,0.18), transparent 55%);
    opacity: 0.9;
    filter: blur(20px); /* un poco menos blur para que vaya más fluido */
    pointer-events: none;
  }
  .lp-fin-bg::after {
    background:
      radial-gradient(circle at 0% 100%, rgba(34,197,94,0.2), transparent 55%),
      radial-gradient(circle at 100% 0%, rgba(79,70,229,0.18), transparent 55%);
    mix-blend-mode: screen;
    animation: lp-fin-orbit 30s linear infinite;
  }
  @keyframes lp-fin-orbit {
    0% { transform: rotate(0deg) scale(1.02); }
    100% { transform: rotate(360deg) scale(1.02); }
  }

  .lp-fin-shell {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding-top: env(safe-area-inset-top, 0);
    padding-bottom: env(safe-area-inset-bottom, 0);
    z-index: 1;
  }

  /* respetar sidebar en escritorio */
  @media (min-width: 769px) {
    .lp-fin-shell {
      left: 260px;
    }
  }

  .lp-fin-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1080px;
    padding: 24px 16px 110px 16px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    color: #e5e7eb;
  }

  .lp-fin-header {
    text-align: center;
    margin-bottom: 22px;
  }

  .lp-fin-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 999px;
    background: radial-gradient(circle at 0% 0%, rgba(37,99,235,0.9), rgba(15,23,42,0.98));
    border: 1px solid rgba(191,219,254,0.8);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #e5e7eb;
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 0 24px rgba(79,70,229,0.9);
    margin: 0 auto 8px;
    animation: lp-fin-chip-glow 4.2s ease-in-out infinite;
  }

  .lp-fin-chip-dot {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.3);
  }

  @keyframes lp-fin-chip-glow {
    0%,100% {
      box-shadow:
        0 0 0 1px rgba(15,23,42,1),
        0 0 18px rgba(79,70,229,0.6);
    }
    50% {
      box-shadow:
        0 0 0 1px rgba(129,140,248,1),
        0 0 28px rgba(129,140,248,1);
    }
  }

  .lp-fin-header p {
    margin: 4px 0 0 0;
    font-size: 13px;
    color: #9ca3af;
  }

  .lp-fin-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1.1fr);
    gap: 18px;
  }

  @media (max-width: 900px) {
    .lp-fin-inner {
      max-width: 520px;
      padding: 20px 12px 120px 12px;
    }
    .lp-fin-grid {
      grid-template-columns: minmax(0,1fr);
    }
  }

  .lp-fin-left {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .lp-fin-card {
    position: relative;
    border-radius: 22px;
    border: 1px solid rgba(148,163,184,0.7);
    background: radial-gradient(circle at top, rgba(15,23,42,0.99), rgba(15,23,42,0.97));
    box-shadow:
      0 16px 40px rgba(0,0,0,0.9),
      0 0 0 1px rgba(15,23,42,0.9);
    padding: 18px 18px 20px;
    overflow: hidden;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition:
      transform 0.22s cubic-bezier(0.22, 0.61, 0.36, 1),
      box-shadow 0.22s ease,
      border-color 0.22s ease;
  }

  .lp-fin-card::before {
    content: "";
    position: absolute;
    inset: -120px;
    background:
      radial-gradient(circle at 0% 0%, rgba(59,130,246,0.28), transparent 55%),
      radial-gradient(circle at 120% 120%, rgba(129,140,248,0.18), transparent 55%);
    opacity: 0.75;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  .lp-fin-card:hover {
    transform: translateY(-2px) scale(1.003);
    box-shadow:
      0 22px 55px rgba(0,0,0,1),
      0 0 0 1px rgba(191,219,254,0.75);
    border-color: rgba(191,219,254,0.8);
  }

  .lp-fin-balance {
    padding-bottom: 18px;
  }

  .lp-fin-balance-main {
    position: relative;
    z-index: 1;
    margin-top: 12px;
  }

  .lp-fin-badge-row {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  .lp-fin-badge,
  .lp-fin-badge-soft {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
  }

  .lp-fin-badge {
    background: rgba(15,23,42,0.96);
    border: 1px solid rgba(191,219,254,0.8);
    color: #e5e7eb;
  }

  .lp-fin-badge svg {
    color: #bfdbfe;
  }

  .lp-fin-badge-soft {
    background: rgba(22,163,74,0.16);
    border: 1px solid rgba(34,197,94,0.8);
    color: #bbf7d0;
  }

  .lp-fin-balance-label {
    display: block;
    font-size: 12px;
    color: #9ca3af;
    margin-bottom: 4px;
    margin-top: 8px;
  }

  .lp-fin-balance-amount {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .lp-fin-currency {
    font-size: 20px;
    color: #a5b4fc;
    font-weight: 600;
  }

  .lp-fin-balance-number {
    font-size: 38px;
    font-weight: 900;
    letter-spacing: -0.04em;
    color: #f9fafb;
    text-shadow: 0 0 32px rgba(79,70,229,0.7);
  }

  .lp-fin-balance-sub {
    margin: 6px 0 0 0;
    font-size: 12px;
    color: #9ca3af;
  }

  .lp-fin-tabs {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 10px;
    margin-top: 16px;
  }

  .lp-fin-tab {
    flex: 1;
    border-radius: 999px;
    border: 1px solid rgba(148,163,184,0.7);
    background: rgba(15,23,42,0.98);
    color: #e5e7eb;
    font-size: 12px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 10px;
    cursor: pointer;
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 12px 24px rgba(15,23,42,0.9);
    transition: all 0.18s ease-out;
  }

  .lp-fin-tab svg { color: #9ca3af; }

  .lp-fin-tab.is-active {
    background: radial-gradient(circle at 0% 0%, rgba(79,70,229,0.9), rgba(15,23,42,1));
    border-color: rgba(191,219,254,0.95);
    box-shadow:
      0 0 0 1px rgba(129,140,248,1),
      0 0 30px rgba(79,70,229,1);
  }

  .lp-fin-tab.is-active svg { color: #e5e7eb; }

  /* FORM */
  .lp-fin-form {
    margin-top: 4px;
  }

  .lp-fin-form-header {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: center;
    margin-bottom: 10px;
  }

  .lp-fin-form-header h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 800;
    color: #f9fafb;
  }

  .lp-fin-form-tag {
    padding: 3px 8px;
    border-radius: 999px;
    border: 1px solid rgba(148,163,184,0.7);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #cbd5f5;
    background: rgba(15,23,42,0.96);
  }

  .lp-fin-field {
    position: relative;
    z-index: 1;
    margin-top: 8px;
    margin-bottom: 10px;
  }

  .lp-fin-field label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    color: #9ca3af;
    margin-bottom: 5px;
    letter-spacing: 0.06em;
  }

  .lp-fin-input-wrapper {
    position: relative;
  }

  .lp-fin-input-prefix {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #9ca3af;
    pointer-events: none;
  }

  .lp-fin-input-amount {
    padding-left: 26px !important;
    font-size: 18px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  /* ⚠️ Inputs: mínimo 16px para evitar zoom en iOS */
  .lp-fin-input {
    width: 100%;
    padding: 11px 11px;
    border-radius: 12px;
    border: 1px solid rgba(148,163,184,0.8);
    background: rgba(15,23,42,0.98);
    color: #e5e7eb;
    font-size: 16px;
    outline: none;
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 10px 26px rgba(15,23,42,0.9);
  }

  .lp-fin-input::placeholder {
    color: #6b7280;
  }

  .lp-fin-input:focus {
    border-color: rgba(129,140,248,0.95);
    box-shadow:
      0 0 0 1px rgba(129,140,248,0.95),
      0 0 26px rgba(79,70,229,0.9);
  }

  .lp-fin-method-row {
    display: flex;
    gap: 8px;
  }

  .lp-fin-method {
    flex: 1;
    border-radius: 10px;
    border: 1px solid rgba(148,163,184,0.7);
    background: rgba(15,23,42,0.96);
    color: #e5e7eb;
    padding: 9px 10px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s ease-out;
  }

  .lp-fin-method.is-active {
    background: radial-gradient(circle at 0% 0%, rgba(56,189,248,0.85), rgba(15,23,42,1));
    border-color: rgba(191,219,254,0.95);
    color: #0f172a;
    box-shadow:
      0 0 0 1px rgba(191,219,254,1),
      0 0 24px rgba(56,189,248,0.9);
  }

  .lp-fin-hint {
    margin: 4px 0 0 0;
    font-size: 11px;
    color: #9ca3af;
  }

  .lp-fin-hint-success {
    color: #4ade80;
  }

  .lp-fin-status {
    margin-top: 8px;
    margin-bottom: 10px;
    padding: 9px 10px;
    border-radius: 10px;
    font-size: 12px;
    display: flex;
    gap: 6px;
    align-items: center;
    font-weight: 600;
  }

  .lp-fin-status svg { flex-shrink: 0; }

  .lp-fin-status-error {
    background: rgba(248,113,113,0.12);
    border: 1px solid rgba(248,113,113,0.9);
    color: #fecaca;
  }

  .lp-fin-status-ok {
    background: rgba(22,163,74,0.12);
    border: 1px solid rgba(34,197,94,0.9);
    color: #bbf7d0;
  }

  .lp-fin-main-btn {
    width: 100%;
    margin-top: 6px;
    border-radius: 999px;
    border: none;
    padding: 13px 14px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    background: radial-gradient(circle at 0% 0%, rgba(79,70,229,0.95), rgba(15,23,42,1));
    color: #f9fafb;
    box-shadow:
      0 0 0 1px rgba(191,219,254,0.9),
      0 18px 48px rgba(15,23,42,1);
    transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
  }

  .lp-fin-main-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .lp-fin-main-btn:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow:
      0 0 0 1px rgba(221,239,254,1),
      0 24px 60px rgba(15,23,42,1);
  }

  .lp-fin-btn-loading {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
  }

  /* HISTORIAL */
  .lp-fin-history {
    min-height: 260px;
  }

  .lp-fin-history-header {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 14px;
  }

  .lp-fin-history-icon {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 30% 0, #6366f1, #1e293b);
    color: #e0e7ff;
    box-shadow:
      0 14px 30px rgba(15,23,42,0.95),
      0 0 0 1px rgba(15,23,42,1);
  }

  .lp-fin-history-header h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 800;
    color: #f9fafb;
  }

  .lp-fin-history-header p {
    margin: 2px 0 0 0;
    font-size: 12px;
    color: #9ca3af;
  }

  .lp-fin-history-empty {
    position: relative;
    z-index: 1;
    border-radius: 16px;
    border: 1px dashed rgba(148,163,184,0.7);
    background: rgba(15,23,42,0.98);
    padding: 20px 16px;
    text-align: center;
  }

  .lp-fin-history-empty-title {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 600;
    color: #e5e7eb;
  }

  .lp-fin-history-empty-sub {
    margin: 0;
    font-size: 11px;
    color: #9ca3af;
  }

  .lp-fin-history-list {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 4px;
  }

  .lp-fin-history-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 10px 8px;
    border-radius: 14px;
    border: 1px solid rgba(30,64,175,0.8);
    background: radial-gradient(circle at 0% 0%, rgba(30,64,175,0.7), rgba(15,23,42,0.96));
    box-shadow:
      0 18px 42px rgba(15,23,42,1),
      0 0 0 1px rgba(15,23,42,1);
  }

  .lp-fin-history-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .lp-fin-history-avatar {
    width: 34px;
    height: 34px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 14px 30px rgba(15,23,42,0.95);
  }

  .lp-fin-history-avatar.is-transfer {
    background: rgba(59,130,246,0.18);
    border: 1px solid rgba(59,130,246,0.9);
    color: #bfdbfe;
  }

  .lp-fin-history-avatar.is-withdraw {
    background: rgba(148,163,184,0.16);
    border: 1px solid rgba(148,163,184,0.9);
    color: #e5e7eb;
  }

  .lp-fin-history-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .lp-fin-history-title {
    font-size: 13px;
    font-weight: 700;
    color: #e5e7eb;
  }

  .lp-fin-history-date {
    font-size: 11px;
    color: #9ca3af;
  }

  .lp-fin-history-right {
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-end;
  }

  .lp-fin-history-amount {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    font-size: 13px;
    font-weight: 700;
  }

  .lp-fin-history-amount.is-out { color: #fca5a5; }
  .lp-fin-history-amount.is-in { color: #4ade80; }

  .lp-fin-status-pill {
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .lp-fin-status-pill-pending {
    background: rgba(245,158,11,0.12);
    border: 1px solid rgba(245,158,11,0.9);
    color: #fed7aa;
  }

  .lp-fin-status-pill-ok {
    background: rgba(22,163,74,0.12);
    border: 1px solid rgba(34,197,94,0.9);
    color: #bbf7d0;
  }

  @media (max-width: 768px) {
    .lp-fin-shell { left: 0; }
    .lp-fin-history-item {
      padding: 9px 8px;
    }
  }
`;
