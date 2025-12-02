import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lfkrexojbhwhtboilcsq.supabase.co';
const supabaseKey = 'sb_publishable_3SkVAYqpWMHKLedz8x22dw_S0bA9n1D'; // Tu llave pública

export const supabase = createClient(supabaseUrl, supabaseKey);
