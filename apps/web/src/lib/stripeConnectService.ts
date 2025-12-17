import { supabase } from './supabaseClient';

const API = import.meta.env.VITE_API_BASE || '';

async function authHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Debes iniciar sesión.');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session.access_token}`,
  };
}

export const StripeConnectService = {
  async getStatus() {
    const headers = await authHeaders();
    const resp = await fetch(`${API}/api/stripe/connect/status`, { headers });
    const json = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(json.error || 'No se pudo obtener el estado de Stripe.');
    return json;
  },

  async createOnboardingLink() {
    const headers = await authHeaders();
    const resp = await fetch(`${API}/api/stripe/connect/link`, { method: 'POST', headers });
    const json = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(json.error || 'No se pudo crear el enlace de onboarding.');
    return json as { onboardingUrl: string; accountId: string };
  },

  async createPaymentIntent(creatorId: string, amount: number, currency = 'eur', description?: string) {
    const headers = await authHeaders();
    const resp = await fetch(`${API}/api/stripe/payments`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ creatorId, amount, currency, description }),
    });
    const json = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(json.error || 'No se pudo crear el cobro.');
    return json as {
      clientSecret: string;
      paymentIntentId: string;
      transferGroup: string;
      applicationFeeAmount: number;
      destination: string;
      currency: string;
    };
  },
};
