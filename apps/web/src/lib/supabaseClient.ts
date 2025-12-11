import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en .env');
}

// Cliente Supabase con persistencia de sesión configurada
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,           // Mantener sesión en localStorage
    storageKey: 'linkpay-auth',     // Key única para evitar conflictos
    autoRefreshToken: true,         // Refrescar tokens automáticamente
    detectSessionInUrl: true,       // Para magic links y OAuth
  }
});
