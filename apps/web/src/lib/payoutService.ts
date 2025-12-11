import { supabase } from './supabaseClient';
import { LinkService } from './linkService';
import { BioService } from './bioService';

export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface Transaction {
  id: string;
  type: 'withdrawal' | 'transfer';
  amount: number;
  status: TransactionStatus;
  is_negative: boolean;
  date: string; // string preparada para pintar
}

async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error('Debes iniciar sesión.');
  return data.user;
}

/**
 * Calcula el saldo total disponible:
 *  - Suma earnings de links
 *  - Suma earnings de Bio Page
 *  - Suma earnings de referidos
 *  - Ajusta con movimientos de la tabla `transactions`
 */
async function computeBalanceWithMovements(userId: string): Promise<number> {
  // 1. LINKS
  const links = await LinkService.getAll();
  const safeLinks = links || [];
  const revenueShort = safeLinks.reduce(
    (acc: number, l: any) => acc + (Number(l.earnings) || 0),
    0
  );

  // 2. BIO PAGE (Sumar de TODOS los perfiles)
  const { data: bioProfiles } = await supabase
    .from('bio_profiles')
    .select('earnings')
    .eq('user_id', userId);

  const revenueBio = bioProfiles?.reduce((acc, p) => acc + (Number(p.earnings) || 0), 0) || 0;

  // 3. REFERIDOS
  const { data: profileRow } = await supabase
    .from('profiles')
    .select('referral_earnings')
    .eq('id', userId)
    .single();

  const referralEarnings = Number(profileRow?.referral_earnings || 0);

  const gross = revenueShort + revenueBio + referralEarnings;

  // 4. MOVIMIENTOS (withdraw / transfer)
  try {
    const { data: txs, error: txError } = await supabase
      .from('transactions')
      .select('amount, is_negative, type, status')
      .eq('user_id', userId)
      .in('status', ['pending', 'completed']);

    if (txError || !txs) {
      console.warn('[PayoutService.getBalance] No se pudo leer transactions:', txError);
      return gross;
    }

    const netMovements = txs.reduce((acc, row: any) => {
      const amt = Number(row.amount) || 0;
      const negative =
        row.is_negative ??
        (row.type === 'withdrawal' || row.type === 'transfer_out');

      return acc + (negative ? -amt : amt);
    }, 0);

    return gross + netMovements;
  } catch (e) {
    console.warn('[PayoutService.getBalance] Error leyendo movimientos:', e);
    return gross;
  }
}

export const PayoutService = {
  /**
   * Saldo total disponible para el usuario actual.
   */
  async getBalance(): Promise<number> {
    const user = await getCurrentUser();
    const balance = await computeBalanceWithMovements(user.id);
    return balance < 0 ? 0 : balance;
  },

  /**
   * Historial de movimientos para el panel de la derecha.
   */
  async getHistory(): Promise<Transaction[]> {
    const user = await getCurrentUser();

    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(
          'id, type, amount, status, is_negative, created_at'
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(40);

      if (error || !data) {
        console.warn('[PayoutService.getHistory] error', error);
        return [];
      }

      return data.map((row: any) => {
        const type: 'withdrawal' | 'transfer' =
          row.type === 'withdrawal' ? 'withdrawal' : 'transfer';

        return {
          id: row.id,
          type,
          amount: Number(row.amount) || 0,
          status: (row.status || 'completed') as TransactionStatus,
          is_negative:
            row.is_negative ??
            (row.type === 'withdrawal' || row.type === 'transfer_out'),
          date: row.created_at
            ? new Date(row.created_at).toLocaleString()
            : '',
        };
      });
    } catch (e) {
      console.warn('[PayoutService.getHistory] excepción', e);
      return [];
    }
  },

  /**
   * Registrar una solicitud de retiro.
   * Mínimos:
   *  - PayPal: 5 €
   *  - Bank:  10 €
   */
  async requestPayout(amount: number, method: string, account: string) {
    if (!amount || amount <= 0) throw new Error('Cantidad inválida.');
    if (!method || !account) throw new Error('Método o cuenta incompletos.');

    const user = await getCurrentUser();

    // Seguridad extra: recalcular saldo antes de aceptar
    const balance = await computeBalanceWithMovements(user.id);
    if (amount > balance) throw new Error('Saldo insuficiente.');

    const min =
      method === 'PayPal'
        ? 5
        : method === 'Bank'
          ? 10
          : 5;

    if (amount < min) {
      if (method === 'PayPal') {
        throw new Error('El retiro mínimo por PayPal es de €5.00');
      } else if (method === 'Bank') {
        throw new Error('El retiro mínimo por transferencia bancaria es de €10.00');
      } else {
        throw new Error('Cantidad inferior al mínimo disponible.');
      }
    }

    const { error } = await supabase.from('transactions').insert({
      user_id: user.id,
      type: 'withdrawal',
      amount,
      is_negative: true,
      status: 'pending',
      meta: {
        method,
        account,
      },
    });

    if (error) {
      console.error('[PayoutService.requestPayout] error', error);
      throw new Error('No se pudo registrar el retiro.');
    }
  },

  /**
   * Enviar dinero a otro usuario por email.
   * Usa la función SQL `transfer_between_users` (security definer).
   */
  async sendMoney(targetEmail: string, amount: number) {
    if (!amount || amount <= 0) throw new Error('Cantidad inválida.');
    if (!targetEmail) throw new Error('Email destino requerido.');

    const sender = await getCurrentUser();

    // Comprobar saldo del emisor con mismo cálculo que en retiros
    const balance = await computeBalanceWithMovements(sender.id);
    if (amount > balance) throw new Error('Saldo insuficiente.');

    const { error } = await supabase.rpc('transfer_between_users', {
      target_email: targetEmail,
      amount_value: amount,
    });

    if (error) {
      console.error('[PayoutService.sendMoney] error', error);
      throw new Error('No se pudo completar la transferencia.');
    }
  },
};
