// CONSTANTS
const CONST_SB_URL = "https://lfkrexojbhwhtboilcsq.supabase.co";
const CONST_SB_KEY = "sb_publishable_3SkVAYqpWMHKLedz8x22dw_S0bA9n1D";

export interface Env {
  LINKPAY_DB: D1Database;
  EPC: string;      // "0.02"
  REF_PCT: string;  // "0.10"
  ALLOWED_ORIGIN: string; // "*" o dominio
  RL: KVNamespace;
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
    "Access-Control-Allow-Headers": "Content-Type, X-User-Email",
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

// --- NEW HELPER: Call Supabase RPC ---
async function callSupabaseRpc(rpcName: string, params: any) {
  const resp = await fetch(`${CONST_SB_URL}/rest/v1/rpc/${rpcName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': CONST_SB_KEY,
      'Authorization': `Bearer ${CONST_SB_KEY}`
    },
    body: JSON.stringify(params)
  });
  return resp;
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
        ctx.waitUntil(callSupabaseRpc('track_bio_click', {
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
