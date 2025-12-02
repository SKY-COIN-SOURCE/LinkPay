import { supabase } from './supabase';

export interface WithdrawalRequest {
  id: string;
  user_id: string;
  amount: number;
  method: 'PayPal' | 'Bank' | 'Crypto';
  account_details: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  created_at: string;
  email?: string; // Opcional si queremos mostrar el email del usuario
}

export const AdminService = {
  /**
   * Obtiene SOLO las retiradas pendientes (Optimizado para volumen alto)
   * Usamos paginación implícita limitando a 50 para no colapsar la UI.
   */
  getPendingWithdrawals: async (): Promise<WithdrawalRequest[]> => {
    const { data, error } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true }) // Las más antiguas primero (FIFO)
      .limit(50); // Límite de seguridad

    if (error) {
      console.error('Error fetching pending withdrawals:', error);
      return [];
    }
    return data as WithdrawalRequest[];
  },

  /**
   * Obtiene estadísticas globales reales (Dinero pendiente vs pagado)
   */
  getStats: async () => {
    // Nota: En producción masiva, esto se debería hacer con una Edge Function
    // para no contar millones de filas en el cliente. Para MVP sirve.
    const { count: pendingCount } = await supabase
      .from('withdrawals')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: approvedCount } = await supabase
      .from('withdrawals')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved');

    return {
      pending: pendingCount || 0,
      processed: approvedCount || 0
    };
  },

  /**
   * Acción Crítica: Aprobar Pagos
   */
  approveWithdrawal: async (id: string) => {
    const { error } = await supabase
      .from('withdrawals')
      .update({ status: 'approved', updated_at: new Date() })
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  /**
   * Acción Crítica: Rechazar Pagos
   */
  rejectWithdrawal: async (id: string) => {
    const { error } = await supabase
      .from('withdrawals')
      .update({ status: 'rejected', updated_at: new Date() })
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
