import { supabase } from './supabase';

export interface BioLink {
  id: string;
  title: string;
  url: string;
  active: boolean;
  thumbnail_url?: string;
  icon?: string;
  link_type?: 'normal' | 'monetized' | 'paywall';
  block_type?: 'link' | 'header' | 'divider' | 'spotlight';
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
  button_style: 'rounded' | 'square' | 'pill' | 'shadow' | 'outline' | 'glass';
  monetization_mode: 'lite' | 'standard' | 'turbo';
  accent_color?: string;
  cta_text?: string;
  cta_url?: string;
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
    // Registramos la visita visual (aunque pague 0, sirve para analytics)
    const amount = 0;
    await supabase.rpc('increment_bio_stats', { profile_row_id: profileId, amount });
  },

  // NUEVO: Pagar y loguear clic en enlace de Bio (se llama desde RedirectPage)
  trackLinkClick: async (
    profileId: string,
    mode: string,
    meta?: { country?: string; device?: string; referrer?: string }
  ) => {
    // SECURITY: We use the server-side RPC to track clicks and earnings
    let ip = '0.0.0.0';
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      if (ipData.ip) ip = ipData.ip;
    } catch (e) {
      console.warn('[BioService] IP fallback', e);
    }

    const { error } = await supabase.rpc('track_bio_click', {
      p_profile_id: profileId,
      p_ip_address: ip,
      p_user_agent: navigator.userAgent,
      p_country: meta?.country || 'Unknown'
    });

    if (error) {
      console.error('[BioService] Secure tracking error:', error);
    }
  }
};
