import { supabase } from './supabase';

export interface BioLink {
  id: string;
  title: string;
  url: string;
  active: boolean;
  thumbnail_url?: string;
  clicks: number;
  order_index: number;
}

export interface BioProfile {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  description: string;
  avatar_url: string;
  background_url?: string;
  theme: 'light' | 'dark' | 'blue' | 'gradient' | 'custom';
  button_style: 'rounded' | 'square' | 'pill' | 'shadow';
  monetization_mode: 'lite' | 'standard' | 'turbo';
  links: BioLink[];
  earnings?: number;
  views?: number;
}

const BIO_RATES = { lite: 0.0001, standard: 0.0005, turbo: 0.0015 };

export const BioService = {
  
  getOrCreateProfile: async (user: any) => {
    const { data: existing } = await supabase
      .from('bio_profiles')
      .select('*, links:bio_links(*)')
      .eq('user_id', user.id)
      .maybeSingle();

    if (existing) {
      if (existing.links) existing.links.sort((a: any, b: any) => a.order_index - b.order_index);
      // Default button style si es antiguo
      if (!existing.button_style) existing.button_style = 'rounded';
      return existing;
    }

    // Crear perfil nuevo
    const username = user.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '') + Math.floor(Math.random() * 100);
    const { data: newProfile, error } = await supabase
      .from('bio_profiles')
      .insert([{
        user_id: user.id,
        username: username,
        display_name: username,
        description: 'Bienvenido a mi LinkPay.',
        theme: 'light',
        button_style: 'rounded',
        monetization_mode: 'lite'
      }])
      .select()
      .single();

    if (error) throw error;
    return { ...newProfile, links: [] };
  },

  getPublicProfile: async (username: string) => {
    const { data } = await supabase
      .from('bio_profiles')
      .select('*, links:bio_links(*)')
      .eq('username', username)
      .single();
    
    if (data && data.links) data.links.sort((a: any, b: any) => a.order_index - b.order_index);
    return data;
  },

  updateProfile: async (id: string, updates: Partial<BioProfile>) => {
    await supabase.from('bio_profiles').update(updates).eq('id', id);
  },

  addLink: async (profileId: string, title: string, url: string) => {
    const { count } = await supabase.from('bio_links').select('*', { count: 'exact', head: true }).eq('profile_id', profileId);
    await supabase.from('bio_links').insert([{ profile_id: profileId, title, url, order_index: (count || 0) + 1 }]);
  },

  updateLink: async (linkId: string, updates: Partial<BioLink>) => {
    await supabase.from('bio_links').update(updates).eq('id', linkId);
  },

  deleteLink: async (linkId: string) => {
    await supabase.from('bio_links').delete().eq('id', linkId);
  },

  // Reordenar enlaces (Intercambiar índices)
  reorderLinks: async (links: BioLink[]) => {
    for (let i = 0; i < links.length; i++) {
      await supabase.from('bio_links').update({ order_index: i }).eq('id', links[i].id);
    }
  },

  uploadImage: async (file: File, userId: string, type: 'avatar' | 'background' | 'thumbnail') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${type}_${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage.from('bio-images').upload(fileName, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from('bio-images').getPublicUrl(fileName);
    return data.publicUrl;
  },

  trackView: async (profileId: string, mode: string) => {
    // Mantenemos por compatibilidad, pero ya no inyectamos dinero aquí si no quieres
    // const amount = BIO_RATES[mode as keyof typeof BIO_RATES] || 0.0001;
    // await supabase.rpc('increment_bio_stats', { profile_row_id: profileId, amount });
  },

  // NUEVO: Pagar y loguear clic en enlace de Bio (se llama desde RedirectPage)
  trackLinkClick: async (
    profileId: string,
    mode: string,
    meta?: { country?: string; device?: string; referrer?: string }
  ) => {
    const amount = BIO_RATES[mode as keyof typeof BIO_RATES] || 0.0001;

    // 1) Actualizar earnings de la Bio
    await supabase.rpc('increment_bio_stats', {
      profile_row_id: profileId,
      amount: amount
    });

    // 2) Registrar clic detallado para Analytics
    try {
      const ref =
        meta?.referrer ||
        (typeof document !== 'undefined'
          ? document.referrer || 'Direct'
          : 'Direct');

      await supabase.from('bio_clicks').insert({
        profile_id: profileId,
        country: meta?.country || 'Unknown',
        device: meta?.device || 'Unknown',
        referrer: ref
      });
    } catch (err) {
      console.warn('[BioService.trackLinkClick] error logueando bio_click', err);
    }
  }
};
