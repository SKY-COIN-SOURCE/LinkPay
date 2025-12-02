import { supabase } from './supabase';

export interface ReferralNode {
  id: string;
  username: string;
  avatar_url: string;
  total_earnings: number;
  level: number;
  children: ReferralNode[];
}

export const ReferralService = {
  
  // Obtener el código de referido del usuario actual
  getMyReferralCode: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    const { data } = await supabase
      .from('profiles')
      .select('referral_code, username')
      .eq('id', user.id)
      .single();
      
    // Si no tiene código, usar el username, o generar uno
    return data?.referral_code || data?.username || user.id.slice(0, 8);
  },

  // Construir el Árbol de la Red (Nivel Dios)
  getNetwork: async (): Promise<ReferralNode | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // 1. Obtener Usuario Raíz (Yo)
    const { data: me } = await supabase
      .from('profiles')
      .select('id, username, avatar_url, total_earnings')
      .eq('id', user.id)
      .single();

    if (!me) return null;

    // 2. Obtener Nivel 1 (Hijos)
    const { data: level1 } = await supabase
      .from('profiles')
      .select('id, username, avatar_url, total_earnings')
      .eq('referred_by', user.id);

    // 3. Obtener Nivel 2 (Nietos) - Para cada hijo
    // (En producción real esto se haría con una Recursive CTE en SQL, pero aquí JS es más rápido de implementar)
    const tree: ReferralNode = {
      ...me,
      level: 0,
      children: await Promise.all((level1 || []).map(async (child: any) => {
        const { data: level2 } = await supabase
          .from('profiles')
          .select('id, username, avatar_url, total_earnings')
          .eq('referred_by', child.id);
          
        return {
          ...child,
          level: 1,
          children: (level2 || []).map((grandchild: any) => ({
            ...grandchild,
            level: 2,
            children: []
          }))
        };
      }))
    };

    return tree;
  },

  // Registrar un referido (Se usa en el registro)
  registerReferral: async (referralCode: string) => {
    // Buscar dueño del código
    const { data: referrer } = await supabase
      .from('profiles')
      .select('id')
      .eq('referral_code', referralCode)
      .single();
      
    if (referrer) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('profiles').update({ referred_by: referrer.id }).eq('id', user.id);
      }
    }
  }
};
