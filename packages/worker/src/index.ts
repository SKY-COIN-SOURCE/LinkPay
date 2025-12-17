// CONSTANTES Y TIPOS
const DEFAULT_SB_URL = "https://lfkrexojbhwhtboilcsq.supabase.co";
const DEFAULT_SB_ANON = "sb_publishable_3SkVAYqpWMHKLedz8x22dw_S0bA9n1D";

export interface Env {
  LINKPAY_DB: D1Database;
  EPC: string; // "0.02"
  REF_PCT: string; // "0.10"
  ALLOWED_ORIGIN: string; // "*" o dominio
  RL: KVNamespace;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  STRIPE_CONNECT_CLIENT_ID?: string;
  STRIPE_PLATFORM_FEE_BPS?: string;
  STRIPE_TRANSFER_CURRENCY?: string;
  STRIPE_RETURN_URL?: string;
  STRIPE_REFRESH_URL?: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

type User = { email: string; ref_code: string; ref_earnings: number; referred_by?: string | null };
type Link = { id: number; owner_email: string; target: string; code: string; clicks: number; earnings: number };

function corsHeaders(origin?: string, allowedEnv?: string) {
  const allowed = allowedEnv || "*";
  const o = origin && origin !== "null" ? origin : allowed;
  return {
    "Access-Control-Allow-Origin": o === "*" ? "*" : origin || allowed,
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-Email, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

function json(body: unknown, init: ResponseInit = {}, origin?: string, allowedEnv?: string) {
  const headers = {
    "Content-Type": "application/json",
    ...corsHeaders(origin, allowedEnv),
    ...(init.headers || {}),
  };
  return new Response(JSON.stringify(body), { ...init, headers });
}

function rndCode(len = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

async function ensureSchema(env: Env) {
  // id INTEGER PK, owner_email TEXT, target TEXT, code TEXT UNIQUE, clicks INT, earnings REAL
  // users: email TEXT PK, ref_code TEXT UNIQUE, ref_earnings REAL, referred_by TEXT NULL
  await env.LINKPAY_DB.prepare(
    "CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, ref_code TEXT UNIQUE, ref_earnings REAL DEFAULT 0, referred_by TEXT)"
  ).run();
  await env.LINKPAY_DB.prepare(
    "CREATE TABLE IF NOT EXISTS links (id INTEGER PRIMARY KEY AUTOINCREMENT, owner_email TEXT NOT NULL, target TEXT NOT NULL, code TEXT UNIQUE NOT NULL, clicks INTEGER DEFAULT 0, earnings REAL DEFAULT 0)"
  ).run();
  await env.LINKPAY_DB.prepare(
    "CREATE INDEX IF NOT EXISTS idx_links_owner ON links(owner_email)"
  ).run();
}

async function creditReferral(env: Env, ownerEmail: string, epc: number, refPct: number) {
  const owner = await env.LINKPAY_DB.prepare("SELECT referred_by FROM users WHERE email=?").bind(ownerEmail).first<User>();
  if (owner && owner.referred_by) {
    const bonus = epc * refPct;
    await env.LINKPAY_DB.prepare("UPDATE users SET ref_earnings = ref_earnings + ? WHERE email=?").bind(bonus, owner.referred_by).run();
  }
}

async function isRateLimited(env: Env, code: string, ip: string) {
  try {
    if (!env.RL) return false;
    const key = `rl:${code}:${ip}`;
    const hit = await env.RL.get(key);
    if (hit) return true;
    await env.RL.put(key, "1", { expirationTtl: 300 });
    return false;
  } catch { return false; }
}

// --- Supabase helpers ---
function getSupabaseConfig(env: Env) {
  return {
    url: env.SUPABASE_URL || DEFAULT_SB_URL,
    anonKey: env.SUPABASE_ANON_KEY || DEFAULT_SB_ANON,
    serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY || "",
  };
}

async function callSupabaseRpc(env: Env, rpcName: string, params: any) {
  const { url, anonKey } = getSupabaseConfig(env);
  const resp = await fetch(`${url}/rest/v1/rpc/${rpcName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify(params),
  });
  return resp;
}

async function supabaseAdminRequest(env: Env, path: string, init: RequestInit = {}) {
  const { url, serviceRoleKey } = getSupabaseConfig(env);
  if (!serviceRoleKey) {
    throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY en las variables de entorno");
  }
  const headers = {
    "Content-Type": "application/json",
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    ...(init.headers || {}),
  };
  return fetch(`${url}${path.startsWith("/") ? "" : "/"}${path}`, {
    ...init,
    headers,
  });
}

async function getProfileStripe(env: Env, userId: string) {
  const resp = await supabaseAdminRequest(
    env,
    `/rest/v1/profiles?id=eq.${userId}&select=id,stripe_account_id,stripe_connect_status,stripe_payouts_enabled,stripe_requirements_due,stripe_charges_enabled,stripe_default_currency`
  );
  if (!resp.ok) {
    console.error("[stripe] No se pudo leer profile", await resp.text());
    return null;
  }
  const rows = await resp.json();
  return (rows && rows[0]) || null;
}

async function getProfileByAccountId(env: Env, accountId: string) {
  const resp = await supabaseAdminRequest(
    env,
    `/rest/v1/profiles?stripe_account_id=eq.${accountId}&select=id,stripe_account_id,stripe_connect_status,stripe_payouts_enabled,stripe_requirements_due,stripe_charges_enabled,stripe_default_currency`
  );
  if (!resp.ok) {
    console.error("[stripe] No se pudo leer profile por account id", await resp.text());
    return null;
  }
  const rows = await resp.json();
  return (rows && rows[0]) || null;
}

async function updateProfileStripe(env: Env, userId: string, payload: Record<string, unknown>) {
  const resp = await supabaseAdminRequest(env, `/rest/v1/profiles?id=eq.${userId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    console.error("[stripe] No se pudo actualizar profile", await resp.text());
  }
}

async function upsertStripePayment(env: Env, record: any) {
  const resp = await supabaseAdminRequest(env, "/rest/v1/stripe_payments", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates" },
    body: JSON.stringify(record),
  });
  if (!resp.ok) {
    console.error("[stripe] No se pudo registrar pago", await resp.text());
  }
}

async function requireUser(req: Request, env: Env) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) throw new Error("Falta token de sesión");
  const { url, anonKey } = getSupabaseConfig(env);
  const resp = await fetch(`${url}/auth/v1/user`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!resp.ok) {
    throw new Error("Token inválido");
  }
  return resp.json() as Promise<{ id: string; email: string }>;
}

// --- Stripe helpers ---
function getStripeConfig(env: Env) {
  const secretKey = env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error("Falta STRIPE_SECRET_KEY en variables de entorno");
  const currency = (env.STRIPE_TRANSFER_CURRENCY || "eur").toLowerCase();
  const feeBps = parseInt(env.STRIPE_PLATFORM_FEE_BPS || "0", 10) || 0;
  const returnUrl = env.STRIPE_RETURN_URL || env.ALLOWED_ORIGIN || "http://localhost:5173";
  const refreshUrl = env.STRIPE_REFRESH_URL || env.ALLOWED_ORIGIN || "http://localhost:5173";
  return {
    secretKey,
    webhookSecret: env.STRIPE_WEBHOOK_SECRET,
    clientId: env.STRIPE_CONNECT_CLIENT_ID,
    currency,
    feeBps,
    returnUrl,
    refreshUrl,
  };
}

async function stripeRequest(
  env: Env,
  path: string,
  body: URLSearchParams | string,
  options: { method?: string; idempotencyKey?: string } = {}
) {
  const { secretKey } = getStripeConfig(env);
  const headers: Record<string, string> = {
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  if (options.idempotencyKey) headers["Idempotency-Key"] = options.idempotencyKey;
  const method = options.method || "POST";
  const requestInit: RequestInit = {
    method,
    headers,
  };
  if (method !== "GET") {
    requestInit.body = typeof body === "string" ? body : body.toString();
  }
  return fetch(`https://api.stripe.com/v1${path}`, requestInit);
}

async function createStripeAccount(env: Env, email: string, country = "ES", metadata?: Record<string, string>) {
  const params = new URLSearchParams();
  params.append("type", "express");
  params.append("email", email);
  params.append("country", country);
  params.append("capabilities[transfers][requested]", "true");
  params.append("capabilities[card_payments][requested]", "true");
  if (metadata) {
    for (const [k, v] of Object.entries(metadata)) {
      params.append(`metadata[${k}]`, v);
    }
  }
  return stripeRequest(env, "/accounts", params);
}

async function createAccountLink(env: Env, accountId: string) {
  const { returnUrl, refreshUrl } = getStripeConfig(env);
  const params = new URLSearchParams();
  params.append("account", accountId);
  params.append("refresh_url", refreshUrl);
  params.append("return_url", returnUrl);
  params.append("type", "account_onboarding");
  return stripeRequest(env, "/account_links", params);
}

async function retrieveAccount(env: Env, accountId: string) {
  return stripeRequest(env, `/accounts/${accountId}`, "", { method: "GET" });
}

async function createPaymentIntent(
  env: Env,
  input: {
    amount: number;
    currency: string;
    applicationFeeAmount: number;
    destination: string;
    transferGroup: string;
    description?: string;
    metadata?: Record<string, string>;
    idempotencyKey?: string;
  }
) {
  const params = new URLSearchParams();
  params.append("amount", input.amount.toString());
  params.append("currency", input.currency);
  params.append("transfer_group", input.transferGroup);
  params.append("application_fee_amount", input.applicationFeeAmount.toString());
  params.append("automatic_payment_methods[enabled]", "true");
  params.append("transfer_data[destination]", input.destination);
  if (input.description) params.append("description", input.description);
  if (input.metadata) {
    for (const [k, v] of Object.entries(input.metadata)) {
      params.append(`metadata[${k}]`, v);
    }
  }
  return stripeRequest(env, "/payment_intents", params, { idempotencyKey: input.idempotencyKey });
}

function parseStripeSignature(sig: string | null) {
  if (!sig) return null;
  const parts = sig.split(",").map((p) => p.trim());
  const timestampPart = parts.find((p) => p.startsWith("t="));
  const v1Part = parts.find((p) => p.startsWith("v1="));
  if (!timestampPart || !v1Part) return null;
  const timestamp = timestampPart.split("=")[1];
  const signature = v1Part.split("=")[1];
  return { timestamp, signature };
}

function toHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function verifyStripeSignature(env: Env, req: Request, rawBody: string) {
  const { webhookSecret } = getStripeConfig(env);
  if (!webhookSecret) return false;
  const sigHeader = parseStripeSignature(req.headers.get("stripe-signature"));
  if (!sigHeader) return false;
  const encoder = new TextEncoder();
  const signedPayload = `${sigHeader.timestamp}.${rawBody}`;
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(webhookSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(signedPayload));
  const expected = toHex(signature);
  return timingSafeEqual(expected, sigHeader.signature);
}

// --- NEW: GENERATE HTML FOR REDIRECT ---
function generateRedirectHtml(dest: string, title: string, mode: string, pid: string) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirigiendo... | LinkPay</title>
  <style>
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #020617; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; overflow: hidden; }
    .loader { width: 48px; height: 48px; border: 4px solid #1e293b; border-bottom-color: #4f46e5; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .card { background: rgba(30, 41, 59, 0.5); padding: 40px; border-radius: 20px; text-align: center; border: 1px solid rgba(255,255,255,0.1); max-width: 90%; width: 400px; backdrop-filter: blur(10px); }
    h1 { font-size: 20px; margin-bottom: 10px; font-weight: 700; }
    p { color: #94a3b8; font-size: 14px; margin-bottom: 30px; }
    .timer { font-size: 48px; font-weight: 900; color: #4f46e5; font-variant-numeric: tabular-nums; margin-bottom: 10px; }
    .dest { color: #e2e8f0; font-weight: 600; font-size: 16px; margin-bottom: 5px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .ad-placeholder { background: #0f172a; border-radius: 12px; height: 250px; display: flex; align-items: center; justifyContent: center; margin-bottom: 20px; border: 1px dashed #334155; color: #475569; font-size: 12px; font-weight: 600; letter-spacing: 1px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="ad-placeholder">ESPACIO PUBLICITARIO (ADS)</div>
    <div class="timer" id="timer">5</div>
    <h1>${title || 'Enlace externo'}</h1>
    <span class="dest">${dest}</span>
    <p>Serás redirigido en unos segundos...</p>
    <div class="loader"></div>
  </div>
  <script>
    let timeLeft = 5;
    const timerStats = document.getElementById('timer');
    const dest = "${dest}";
    const pid = "${pid}";
    
    const interval = setInterval(() => {
      timeLeft--;
      timerStats.innerText = timeLeft;
      
      if (timeLeft <= 0) {
        clearInterval(interval);
        trackAndRedirect();
      }
    }, 1000);

    async function trackAndRedirect() {
      try {
        // Call our worker API to track securely
        await fetch('/api/track/bio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pid: pid, dest: dest })
        });
      } catch (e) { console.error(e); }
      
      window.location.href = dest;
    }
  </script>
</body>
</html>
  `;
}

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    await ensureSchema(env);
    const url = new URL(req.url);
    const origin = req.headers.get("origin") || undefined;
    const epc = parseFloat(env.EPC || "0.02");
    const refPct = parseFloat(env.REF_PCT || "0.10");

    // Preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin, env.ALLOWED_ORIGIN) });
    }

    // Stripe webhook (firma verificada)
    if (url.pathname === "/api/stripe/webhook" && req.method === "POST") {
      const rawBody = await req.text();
      const valid = await verifyStripeSignature(env, req, rawBody).catch(() => false);
      if (!valid) return new Response("invalid signature", { status: 400, headers: corsHeaders(origin, env.ALLOWED_ORIGIN) });

      let event: any;
      try {
        event = JSON.parse(rawBody);
      } catch {
        return new Response("invalid payload", { status: 400, headers: corsHeaders(origin, env.ALLOWED_ORIGIN) });
      }

      const type = event?.type;

      // payment_intent.succeeded -> registrar pago
      if (type === "payment_intent.succeeded") {
        const pi = event.data?.object || {};
        const creatorId = pi.metadata?.creator_id || pi.metadata?.user_id;
        const destination = pi.transfer_data?.destination || pi.metadata?.destination_account;
        await upsertStripePayment(env, {
          stripe_payment_intent_id: pi.id,
          stripe_charge_id: pi.latest_charge || null,
          user_id: pi.metadata?.user_id || null,
          creator_id: creatorId || null,
          amount: pi.amount_received || pi.amount || null,
          currency: pi.currency || "eur",
          status: "succeeded",
          transfer_group: pi.transfer_group || null,
          transfer_status: "succeeded",
          destination_account: destination || null,
          metadata: pi.metadata || {},
        });
      }

      // payment_intent.payment_failed -> log de fallo
      if (type === "payment_intent.payment_failed") {
        const pi = event.data?.object || {};
        await upsertStripePayment(env, {
          stripe_payment_intent_id: pi.id,
          user_id: pi.metadata?.user_id || null,
          creator_id: pi.metadata?.creator_id || null,
          amount: pi.amount || null,
          currency: pi.currency || "eur",
          status: "failed",
          error_message: pi.last_payment_error?.message || "payment_failed",
          metadata: pi.metadata || {},
        });
      }

      // account.updated -> refrescar estado en profile
      if (type === "account.updated") {
        try {
          const account = event.data?.object || {};
          const accountId = account.id as string;
          const profile = accountId ? await getProfileByAccountId(env, accountId) : null;
          if (profile?.id) {
            await updateProfileStripe(env, profile.id, {
              stripe_connect_status: account.details_submitted ? "verified" : "pending",
              stripe_payouts_enabled: !!account.payouts_enabled,
              stripe_charges_enabled: !!account.charges_enabled,
              stripe_requirements_due: account.requirements?.currently_due || [],
            });
          }
        } catch (e) {
          console.error("[stripe] account.updated handler error", e);
        }
      }

      // transfer.failed -> marcar error
      if (type === "transfer.failed") {
        const transfer = event.data?.object || {};
        await upsertStripePayment(env, {
          stripe_transfer_id: transfer.id,
          transfer_status: "failed",
          error_message: transfer.failure_message || "transfer_failed",
          destination_account: transfer.destination || null,
          transfer_group: transfer.transfer_group || null,
          amount: transfer.amount || null,
          currency: transfer.currency || "eur",
        });
      }

      return new Response("ok", { status: 200, headers: corsHeaders(origin, env.ALLOWED_ORIGIN) });
    }

    // --- NEW: BIO REDIRECT INTERSTITIAL (Worker SSR) ---
    if (url.pathname === "/l/bio-redirect" && req.method === "GET") {
      const dest = url.searchParams.get("url") || "";
      const title = url.searchParams.get("title") || "Enlace";
      const mode = url.searchParams.get("m") || "lite";
      const pid = url.searchParams.get("pid") || "";

      if (!dest) return new Response("Missing URL", { status: 400 });

      const html = generateRedirectHtml(dest, title, mode, pid);
      return new Response(html, {
        headers: {
          "Content-Type": "text/html;charset=UTF-8",
          ...corsHeaders(origin, env.ALLOWED_ORIGIN)
        }
      });
    }

    // --- NEW: SECURE TRACKING ENDPOINT ---
    if (url.pathname === "/api/track/bio" && req.method === "POST") {
      const { pid } = await req.json().catch(() => ({})) as any;
      if (pid) {
        const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "0.0.0.0";
        const ua = req.headers.get("user-agent") || "Unknown";
        const country = req.headers.get("cf-ipcountry") || "Unknown";

        // Call Supabase RPC securely
        // p_profile_id, p_ip_address, p_user_agent, p_country
        ctx.waitUntil(callSupabaseRpc(env, 'track_bio_click', {
          p_profile_id: pid,
          p_ip_address: ip,
          p_user_agent: ua,
          p_country: country
        }));
      }
      return json({ ok: true }, { status: 200 }, origin, env.ALLOWED_ORIGIN);
    }

    // Redirect endpoint /l/:code (Smart Links - Legacy D1)
    if (url.pathname.startsWith("/l/") && req.method === "GET") {
      const code = url.pathname.split("/")[2];
      const row = await env.LINKPAY_DB.prepare("SELECT * FROM links WHERE code=?").bind(code).first<Link>();
      if (!row) return new Response("Not found", { status: 404, headers: corsHeaders(origin, env.ALLOWED_ORIGIN) });
      const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "0.0.0.0";
      if (!(await isRateLimited(env, code, ip))) {
        await env.LINKPAY_DB.prepare("UPDATE links SET clicks = clicks + 1, earnings = earnings + ? WHERE id=?").bind(epc, row.id).run();
        await creditReferral(env, row.owner_email, epc, refPct);
      }
      return new Response(null, { status: 302, headers: { Location: row.target, ...corsHeaders(origin, env.ALLOWED_ORIGIN) } });
    }

    // API routes
    if (url.pathname.startsWith("/api/")) {
      // Stripe Connect - estado
      if (req.method === "GET" && url.pathname === "/api/stripe/connect/status") {
        try {
          const requester = await requireUser(req, env);
          const profile = await getProfileStripe(env, requester.id);
          let accountData: any = null;
          if (profile?.stripe_account_id) {
            const accResp = await retrieveAccount(env, profile.stripe_account_id);
            if (accResp.ok) {
              accountData = await accResp.json();
              await updateProfileStripe(env, requester.id, {
                stripe_connect_status: accountData.details_submitted ? "verified" : "pending",
                stripe_payouts_enabled: !!accountData.payouts_enabled,
                stripe_charges_enabled: !!accountData.charges_enabled,
                stripe_requirements_due: accountData.requirements?.currently_due || [],
              });
            }
          }
          return json(
            {
              accountId: profile?.stripe_account_id || accountData?.id || null,
              payoutsEnabled: accountData?.payouts_enabled ?? profile?.stripe_payouts_enabled ?? false,
              chargesEnabled: accountData?.charges_enabled ?? profile?.stripe_charges_enabled ?? false,
              requirementsDue: accountData?.requirements?.currently_due ?? profile?.stripe_requirements_due ?? [],
              connectStatus: profile?.stripe_connect_status || (accountData?.details_submitted ? "verified" : "pending"),
            },
            { status: 200 },
            origin,
            env.ALLOWED_ORIGIN
          );
        } catch (err: any) {
          return json({ error: err.message || "auth_error" }, { status: 401 }, origin, env.ALLOWED_ORIGIN);
        }
      }

      // Stripe Connect - crear enlace de onboarding
      if (req.method === "POST" && url.pathname === "/api/stripe/connect/link") {
        try {
          const requester = await requireUser(req, env);
          let profile = await getProfileStripe(env, requester.id);

          // Crear cuenta si no existe
          if (!profile?.stripe_account_id) {
            const accountResp = await createStripeAccount(env, requester.email || "", "ES", {
              user_id: requester.id,
              email: requester.email || "",
            });
            if (!accountResp.ok) {
              const txt = await accountResp.text();
              return json({ error: "stripe_account_error", detail: txt }, { status: 400 }, origin, env.ALLOWED_ORIGIN);
            }
            const account = await accountResp.json();
            await updateProfileStripe(env, requester.id, {
              stripe_account_id: account.id,
              stripe_connect_status: account.details_submitted ? "verified" : "pending",
              stripe_payouts_enabled: !!account.payouts_enabled,
              stripe_charges_enabled: !!account.charges_enabled,
              stripe_requirements_due: account.requirements?.currently_due || [],
            });
            profile = await getProfileStripe(env, requester.id);
          }

          if (!profile?.stripe_account_id) {
            return json({ error: "missing_account_id" }, { status: 400 }, origin, env.ALLOWED_ORIGIN);
          }

          const linkResp = await createAccountLink(env, profile.stripe_account_id);
          if (!linkResp.ok) {
            const txt = await linkResp.text();
            return json({ error: "account_link_error", detail: txt }, { status: 400 }, origin, env.ALLOWED_ORIGIN);
          }
          const linkData = await linkResp.json();
          return json(
            {
              accountId: profile.stripe_account_id,
              onboardingUrl: linkData.url,
              expiresAt: linkData.expires_at,
            },
            { status: 200 },
            origin,
            env.ALLOWED_ORIGIN
          );
        } catch (err: any) {
          return json({ error: err.message || "auth_error" }, { status: 401 }, origin, env.ALLOWED_ORIGIN);
        }
      }

      // Stripe - crear PaymentIntent para pagar a un creador
      if (req.method === "POST" && url.pathname === "/api/stripe/payments") {
        try {
          const requester = await requireUser(req, env);
          const payload = await req.json().catch(() => ({}));
          const creatorId = payload.creatorId as string;
          const amountInput = Number(payload.amount);
          const description = payload.description || "";
          const requestedCurrency = (payload.currency || "").toString().toLowerCase();
          const idempotencyKey =
            payload.idempotencyKey ||
            `pi_${requester.id}_${creatorId}_${Math.round(amountInput * 100)}_${requestedCurrency || 'eur'}`;

          if (!creatorId) return json({ error: "creator_id_required" }, { status: 400 }, origin, env.ALLOWED_ORIGIN);
          if (!amountInput || amountInput <= 0) {
            return json({ error: "amount_invalid" }, { status: 400 }, origin, env.ALLOWED_ORIGIN);
          }

          const stripeCfg = getStripeConfig(env);
          const currency = requestedCurrency || stripeCfg.currency;
          const amount = Math.round(amountInput * 100); // euros -> céntimos
          const platformFee = Math.max(0, Math.round((amount * stripeCfg.feeBps) / 10000));

          const creatorProfile = await getProfileStripe(env, creatorId);
          const destination = creatorProfile?.stripe_account_id;
          if (!destination) {
            return json({ error: "creator_without_account" }, { status: 400 }, origin, env.ALLOWED_ORIGIN);
          }
          if (creatorProfile?.stripe_payouts_enabled === false) {
            return json({ error: "payouts_disabled" }, { status: 400 }, origin, env.ALLOWED_ORIGIN);
          }

          const transferGroup = `lp_${creatorId}_${Date.now()}`;

          const piResp = await createPaymentIntent(env, {
            amount,
            currency,
            applicationFeeAmount: platformFee,
            destination,
            transferGroup,
            description,
            idempotencyKey,
            metadata: {
              creator_id: creatorId,
              user_id: requester.id,
            },
          });

          if (!piResp.ok) {
            const txt = await piResp.text();
            return json({ error: "payment_intent_error", detail: txt }, { status: 400 }, origin, env.ALLOWED_ORIGIN);
          }

          const pi = await piResp.json();

          await upsertStripePayment(env, {
            stripe_payment_intent_id: pi.id,
            user_id: requester.id,
            creator_id: creatorId,
            amount,
            currency,
            status: "created",
            transfer_group: transferGroup,
            destination_account: destination,
            application_fee_amount: platformFee,
          });

          return json(
            {
              clientSecret: pi.client_secret,
              paymentIntentId: pi.id,
              transferGroup,
              applicationFeeAmount: platformFee,
              destination,
              currency,
            },
            { status: 200 },
            origin,
            env.ALLOWED_ORIGIN
          );
        } catch (err: any) {
          return json({ error: err.message || "auth_error" }, { status: 401 }, origin, env.ALLOWED_ORIGIN);
        }
      }

      // Users
      if (req.method === "POST" && url.pathname === "/api/users") {
        const { email, ref } = await req.json().catch(() => ({}) as any);
        if (!email) return json({ error: "missing email" }, { status: 400 }, origin, env.ALLOWED_ORIGIN);

        // Resolve ref -> referred_by email
        let referred_by: string | null = null;
        if (ref) {
          const refUser = await env.LINKPAY_DB.prepare("SELECT email FROM users WHERE ref_code=?").bind(ref).first<User>();
          if (refUser) referred_by = refUser.email;
        }

        // Create or update user
        const existing = await env.LINKPAY_DB.prepare("SELECT * FROM users WHERE email=?").bind(email).first<User>();
        let user: User | null = existing || null;
        if (!existing) {
          const newCode = rndCode(8);
          await env.LINKPAY_DB.prepare("INSERT INTO users(email, ref_code, ref_earnings, referred_by) VALUES (?,?,0,?)").bind(email, newCode, referred_by).run();
          user = await env.LINKPAY_DB.prepare("SELECT * FROM users WHERE email=?").bind(email).first<User>();
        } else if (referred_by && !existing.referred_by) {
          await env.LINKPAY_DB.prepare("UPDATE users SET referred_by=? WHERE email=?").bind(referred_by, email).run();
          user = await env.LINKPAY_DB.prepare("SELECT * FROM users WHERE email=?").bind(email).first<User>();
        }

        return json({ user }, { status: 201 }, origin, env.ALLOWED_ORIGIN);
      }

      if (req.method === "GET" && url.pathname === "/api/users/me") {
        const email = req.headers.get("x-user-email");
        if (!email) return json({ error: "missing email" }, { status: 400 }, origin, env.ALLOWED_ORIGIN);
        const u = await env.LINKPAY_DB.prepare("SELECT * FROM users WHERE email=?").bind(email).first<User>();
        if (!u) return json({ error: "not found" }, { status: 404 }, origin, env.ALLOWED_ORIGIN);
        return json({ user: u }, { status: 200 }, origin, env.ALLOWED_ORIGIN);
      }

      // Links
      if (req.method === "GET" && url.pathname === "/api/links") {
        const owner = url.searchParams.get("owner");
        if (!owner) return json({ error: "missing owner" }, { status: 400 }, origin, env.ALLOWED_ORIGIN);
        const rows = await env.LINKPAY_DB.prepare("SELECT * FROM links WHERE owner_email=? ORDER BY id DESC").bind(owner).all<Link>();
        return json({ links: rows.results || [] }, { status: 200 }, origin, env.ALLOWED_ORIGIN);
      }

      if (req.method === "POST" && url.pathname === "/api/links") {
        const email = req.headers.get("x-user-email");
        if (!email) return json({ error: "missing email" }, { status: 400 }, origin, env.ALLOWED_ORIGIN);
        const { url: target } = await req.json().catch(() => ({}) as any);
        if (!target) return json({ error: "missing url" }, { status: 400 }, origin, env.ALLOWED_ORIGIN);
        // ensure user exists
        const u = await env.LINKPAY_DB.prepare("SELECT email FROM users WHERE email=?").bind(email).first<User>();
        if (!u) return json({ error: "user not found" }, { status: 404 }, origin, env.ALLOWED_ORIGIN);
        let code = rndCode(6);
        // ensure uniqueness
        for (let i = 0; i < 5; i++) {
          const dup = await env.LINKPAY_DB.prepare("SELECT id FROM links WHERE code=?").bind(code).first<Link>();
          if (!dup) break;
          code = rndCode(6);
        }
        await env.LINKPAY_DB.prepare("INSERT INTO links(owner_email, target, code, clicks, earnings) VALUES (?,?,?,?,0)").bind(email, target, code, 0).run();
        const link = await env.LINKPAY_DB.prepare("SELECT * FROM links WHERE code=?").bind(code).first<Link>();
        return json({ link }, { status: 201 }, origin, env.ALLOWED_ORIGIN);
      }

      if (req.method === "POST" && /^\/api\/links\/.+\/click$/.test(url.pathname)) {
        const code = url.pathname.split("/")[3];
        const row = await env.LINKPAY_DB.prepare("SELECT * FROM links WHERE code=?").bind(code).first<Link>();
        if (!row) return json({ error: "not found" }, { status: 404 }, origin, env.ALLOWED_ORIGIN);
        // Simulate click without rate limit (for demo button)
        await env.LINKPAY_DB.prepare("UPDATE links SET clicks = clicks + 1, earnings = earnings + ? WHERE id=?").bind(epc, row.id).run();
        await creditReferral(env, row.owner_email, epc, refPct);
        const updated = await env.LINKPAY_DB.prepare("SELECT * FROM links WHERE id=?").bind(row.id).first<Link>();
        return json({ link: updated }, { status: 200 }, origin, env.ALLOWED_ORIGIN);
      }

      return json({ error: "not_found" }, { status: 404 }, origin, env.ALLOWED_ORIGIN);
    }

    // Health
    if (url.pathname === "/" || url.pathname === "/health") return new Response("OK", { headers: corsHeaders(origin, env.ALLOWED_ORIGIN) });

    return new Response("Not found", { status: 404, headers: corsHeaders(origin, env.ALLOWED_ORIGIN) });
  },

  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    // Example placeholder for daily aggregates
    // Implement aggregation logic if needed
    return;
  }
} satisfies ExportedHandler<Env>;
