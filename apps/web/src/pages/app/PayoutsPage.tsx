import React, { useState, useEffect } from 'react';
import { Send, ArrowDownLeft, CheckCircle2, AlertCircle, History, Loader2 } from 'lucide-react';
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
    <div className="animate-enter" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0F172A', marginBottom: '8px' }}>
          Mi Billetera
        </h1>
        <p style={{ color: '#64748B', fontSize: '16px' }}>Gestiona tu dinero centralizado.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
        {/* IZQUIERDA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              background: '#0F172A',
              borderRadius: '24px',
              padding: '32px',
              color: 'white',
              boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                color: '#94A3B8',
                marginBottom: '8px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Saldo Total
            </div>
            <div style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-1px', marginBottom: '24px' }}>
              €{balance.toFixed(2)}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setActiveTab('withdraw')}
                style={{
                  flex: 1,
                  background: activeTab === 'withdraw' ? 'white' : 'rgba(255,255,255,0.1)',
                  color: activeTab === 'withdraw' ? '#0F172A' : 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <ArrowDownLeft size={18} /> Retirar
              </button>
              <button
                onClick={() => setActiveTab('send')}
                style={{
                  flex: 1,
                  background: activeTab === 'send' ? 'white' : 'rgba(255,255,255,0.1)',
                  color: activeTab === 'send' ? '#0F172A' : 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Send size={18} /> Enviar
              </button>
            </div>
          </div>

          <div
            style={{
              background: 'white',
              padding: '24px',
              borderRadius: '24px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            }}
          >
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '800',
                marginBottom: '20px',
                color: '#0F172A',
              }}
            >
              {activeTab === 'withdraw' ? 'Solicitar Retiro' : 'Enviar Dinero'}
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '700',
                  marginBottom: '8px',
                  color: '#64748B',
                }}
              >
                CANTIDAD (€)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  outline: 'none',
                }}
              />
              {activeTab === 'withdraw' && (
                <p style={{ marginTop: '6px', fontSize: '12px', color: '#94A3B8' }}>
                  Mínimo PayPal: €5 · Transferencia bancaria: €10
                </p>
              )}
            </div>

            {activeTab === 'withdraw' ? (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '700',
                      marginBottom: '8px',
                      color: '#64748B',
                    }}
                  >
                    MÉTODO
                  </label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {(['PayPal', 'Bank'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMethod(m)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          borderRadius: '10px',
                          border: method === m ? '2px solid #0F172A' : '1px solid #E2E8F0',
                          background: method === m ? '#F1F5F9' : 'white',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '700',
                      marginBottom: '8px',
                      color: '#64748B',
                    }}
                  >
                    CUENTA DESTINO
                  </label>
                  <input
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    placeholder={method === 'PayPal' ? 'tu@email.com' : 'ES91...'}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                  />
                  {((method === 'PayPal' && savedMethods.paypal) ||
                    (method === 'Bank' && savedMethods.bank)) && (
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#10B981',
                        marginTop: '4px',
                        fontWeight: '600',
                      }}
                    >
                      ✓ Autocompletado desde Ajustes
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    color: '#64748B',
                  }}
                >
                  EMAIL DEL USUARIO
                </label>
                <input
                  value={sendEmail}
                  onChange={(e) => setSendEmail(e.target.value)}
                  placeholder="amigo@linkpay.io"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    fontSize: '16px',
                    outline: 'none',
                  }}
                />
              </div>
            )}

            {status.type && (
              <div
                style={{
                  marginBottom: '16px',
                  padding: '12px',
                  borderRadius: '10px',
                  background: status.type === 'error' ? '#FEF2F2' : '#F0FDF4',
                  color: status.type === 'error' ? '#DC2626' : '#16A34A',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {status.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />} {status.msg}
              </div>
            )}

            <button
              onClick={handleAction}
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: '#0F172A',
                color: 'white',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : activeTab === 'withdraw' ? (
                'Confirmar Retiro'
              ) : (
                'Enviar Dinero'
              )}
            </button>
          </div>
        </div>

        {/* DERECHA: HISTORIAL */}
        <div
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '24px',
            border: '1px solid #E2E8F0',
            height: 'fit-content',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: '800',
              marginBottom: '24px',
              color: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <History size={20} className="text-slate-400" /> Actividad
          </h3>
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94A3B8', fontSize: '14px' }}>
              No hay movimientos.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {history.map((tx, i) => (
                <div
                  key={tx.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 0',
                    borderBottom: i === history.length - 1 ? 'none' : '1px solid #F1F5F9',
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: tx.type === 'transfer' ? '#EFF6FF' : '#F1F5F9',
                        color: tx.type === 'transfer' ? '#2563EB' : '#64748B',
                      }}
                    >
                      {tx.type === 'transfer' ? <Send size={18} /> : <ArrowDownLeft size={18} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '14px' }}>
                        {tx.type === 'withdrawal' ? 'Retiro' : 'Transferencia'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{tx.date}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontWeight: '800',
                        fontSize: '15px',
                        color: tx.is_negative ? '#0F172A' : '#16A34A',
                      }}
                    >
                      {tx.is_negative ? '-' : '+'}€{Number(tx.amount).toFixed(2)}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: tx.status === 'pending' ? '#F59E0B' : '#64748B',
                        textTransform: 'uppercase',
                      }}
                    >
                      {tx.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
