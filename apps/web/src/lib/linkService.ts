import { supabase } from './supabase';

export interface Link {
  id: string;
  title?: string;
  original_url: string;
  slug: string;
  views: number;
  earnings: number;
  monetization_mode: 'lite' | 'standard' | 'turbo';
  created_at: string;
  // Nuevos campos
  password?: string | null;
  expires_at?: string | null;
  max_clicks?: number | null;
  is_private?: boolean;
}

const EARNING_RATES = {
  lite: 0.0002,
  standard: 0.0008,
  turbo: 0.0020
};

export const LinkService = {

  // CREAR LINK (Ahora con opciones avanzadas)
  create: async (
    originalUrl: string, 
    customAlias?: string, 
    mode: 'lite' | 'standard' | 'turbo' = 'standard',
    advanced: { password?: string, expiresAt?: string, maxClicks?: number, isPrivate?: boolean } = {}
  ) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Debes iniciar sesión para crear enlaces.");

    let slug = customAlias;
    if (!slug || slug.trim() === '') {
       slug = Math.random().toString(36).substring(2, 8);
    } else {
       slug = slug.trim().replace(/[^a-zA-Z0-9-_]/g, '');
    }

    const { data, error } = await supabase
      .from('links')
      .insert([{
        user_id: user.id,
        original_url: originalUrl,
        slug: slug,
        monetization_mode: mode,
        title: 'Enlace LinkPay',
        views: 0,
        earnings: 0,
        is_active: true,
        // Guardamos los datos avanzados
        password: advanced.password || null,
        expires_at: advanced.expiresAt || null,
        max_clicks: advanced.maxClicks || null,
        is_private: advanced.isPrivate || false
      }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') throw new Error(`El alias "${slug}" ya está en uso.`);
      throw new Error("Error al guardar el enlace.");
    }
    
    return data;
  },

  getAll: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const { data, error } = await supabase.from('links').select('*').order('created_at', { ascending: false });
    if (error) { console.error(error); return []; }
    return data;
  },

// OBTENER LINK PÚBLICO (Con Validaciones de Seguridad)
getLinkBySlug: async (slug: string) => {
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle(); // 👈 importante

  if (error) {
    console.error('[getLinkBySlug] error', error);
    throw error; // 👈 no lo ocultamos
  }

  if (!data) {
    return null; // slug realmente no existe
  }

  // 1. Validar Expiración por Fecha
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return null; // Link caducado
  }

  // 2. Validar Expiración por Clics
  if (data.max_clicks && data.views >= data.max_clicks) {
    return null; // Link agotado
  }

  return data;
},
  trackClick: async (slug: string, deviceInfo: any) => {
    const { data: link } = await supabase.from('links').select('id, monetization_mode').eq('slug', slug).single();
    if (!link) return;

    const amountToPay = EARNING_RATES[link.monetization_mode as keyof typeof EARNING_RATES] || 0.0002;

    await supabase.from('clicks').insert({
      link_id: link.id,
      country: deviceInfo.country || 'Unknown',
      device: deviceInfo.device || 'Desktop',
      referrer: document.referrer || 'Direct'
    });

    await supabase.rpc('increment_stats', { link_row_id: link.id, amount: amountToPay });
  },

  deleteLink: async (id: string) => {
    const { error } = await supabase.from('links').delete().eq('id', id);
    if (error) throw error;
  }
};
