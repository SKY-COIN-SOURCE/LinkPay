import React, { useEffect, useMemo, useState } from "react";
import {
  createUser,
  listLinks,
  addLink,
  simulateClick,
  getMe,
} from "./api";

/*
 * A polished single–page application for LinkPay.
 *
 * The goal of this component is to provide a cohesive, modern interface that feels
 * inspired by premium products like Apple and Stripe while remaining simple to
 * maintain. The landing page walks new users through the concept of LinkPay
 * with a hero section, an overview of how the product works, a list of
 * benefits, and a final call to action. Once a user signs up, the dashboard
 * reveals real‑time metrics, link creation, referral information and a table of
 * their monetised links. Throughout the UI we reuse consistent colours and
 * spacing to maintain a cohesive look.
 */

// Brand colours used throughout the app. Adjust these values to tweak the
// overall colour palette.
const BRAND = { primary: "#0A66FF", light: "#E6F0FF" } as const;

// Format currency values nicely according to Spanish locale.
const currency = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

// Hook to display transient toast messages. When show() is called a message
// appears near the bottom of the viewport for a couple of seconds.
function useToast() {
  const [msg, setMsg] = useState<string>("");
  const [type, setType] = useState<"ok" | "err">("ok");
  const show = (m: string, t: "ok" | "err" = "ok") => {
    setMsg(m);
    setType(t);
    // Hide the toast after ~2.2s
    setTimeout(() => setMsg(""), 2200);
  };
  const el =
    msg.length > 0 ? (
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl px-4 py-2 text-sm shadow transition-opacity z-50 ${
          type === "ok" ? "bg-black text-white" : "bg-red-600 text-white"
        }`}
      >
        {msg}
      </div>
    ) : null;
  return { show, el };
}

// Ensure user‑supplied URLs include a protocol. If the input doesn’t begin
// with http:// or https:// we prefix https://. Returns null for malformed
// values.
function normalizeUrl(raw: string): string | null {
  let s = raw.trim();
  if (!/^https?:\/\//i.test(s)) s = "https://" + s;
  try {
    // Attempt to construct a URL object to validate the string
    // eslint-disable-next-line no-new
    new URL(s);
    return s;
  } catch {
    return null;
  }
}

// A simple mock panel illustrating what a LinkPay dashboard could look like.
// It’s purely presentational and does not reflect your real data. Feel free
// to replace the numbers with your own API calls or keep it as a static
// illustration on the landing page.
const DashboardMock: React.FC = () => {
  const bars = [28, 60, 42, 82, 55, 92, 66];
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-md shadow-sm p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-black/50">Visitas hoy</p>
            <p className="text-2xl md:text-3xl font-bold">12 487</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-black/50">Ganancias hoy</p>
            <p className="text-2xl md:text-3xl font-bold" style={{ color: BRAND.primary }}>
              €184,20
            </p>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-wide text-black/50">Referidos</p>
            <p className="text-2xl md:text-3xl font-bold">312</p>
          </div>
        </div>
        <div className="mt-6 h-24 flex items-end gap-2">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-md"
              style={{
                height: `${h}%`,
                backgroundColor: BRAND.light,
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div
                className="w-full rounded-md"
                style={{ height: "40%", background: BRAND.primary }}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl bg-black/5 px-3 py-2">
            <span className="text-black/60">CTR</span>
            <span className="float-right font-semibold">3,8 %</span>
          </div>
          <div className="rounded-xl bg-black/5 px-3 py-2">
            <span className="text-black/60">eCPC</span>
            <span className="float-right font-semibold">€0,015</span>
          </div>
          <div className="rounded-xl bg-black/5 px-3 py-2">
            <span className="text-black/60">Clicks</span>
            <span className="float-right font-semibold">8 921</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  // State for authentication and user data
  const [email, setEmail] = useState<string>(localStorage.getItem("lp_email") || "");
  const [authed, setAuthed] = useState<boolean>(!!email);
  const [items, setItems] = useState<any[]>([]);
  const [url, setUrl] = useState<string>("");
  const [me, setMe] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { show, el: toastEl } = useToast();
  const base = `${location.origin}/l/`;

  // Fetch user and links when authenticated
  useEffect(() => {
    if (!authed || !email) return;
    getMe(email)
      .then((r) => {
        if (r?.user) setMe(r.user);
      })
      .catch(() => {
        /* ignore errors here */
      });
    listLinks(email)
      .then((d) => setItems(d.links || []))
      .catch(() => setItems([]));
  }, [authed, email]);

  // Derived totals
  const clicks = useMemo(() => items.reduce((a, l) => a + (l.clicks || 0), 0), [items]);
  const earnings = useMemo(() => items.reduce((a, l) => a + (l.earnings || 0), 0), [items]);

  // Handle sign up / login
  async function onLogin() {
    if (!email || !email.includes("@") || email.trim().length < 6) {
      show("Introduce un email válido", "err");
      return;
    }
    setLoading(true);
    try {
      const ref = new URLSearchParams(location.search).get("ref") || undefined;
      const r = await createUser(email, ref);
      if (r.user) {
        localStorage.setItem("lp_email", email);
        setAuthed(true);
        setMe(r.user);
        show("¡Bienvenido a LinkPay!");
      } else {
        show(r?.error || "No se pudo crear el usuario", "err");
      }
    } catch {
      show("Error de red", "err");
    } finally {
      setLoading(false);
    }
  }

  // Logout handler
  function onLogout() {
    localStorage.removeItem("lp_email");
    setEmail("");
    setAuthed(false);
    setItems([]);
    setMe(null);
  }

  // Create a new monetised link
  async function onCreate() {
    const n = normalizeUrl(url);
    if (!n) {
      show("URL inválida", "err");
      return;
    }
    setLoading(true);
    try {
      const r = await addLink(email, n);
      if (r.link) {
        setItems([r.link, ...items]);
        setUrl("");
        show("Enlace monetizado");
      } else {
        show(r?.error || "No se pudo crear el enlace", "err");
      }
    } catch {
      show("Error de red", "err");
    } finally {
      setLoading(false);
    }
  }

  // Copy text to clipboard
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      show("Copiado ✅");
    } catch {
      show("No se pudo copiar", "err");
    }
  }

  // Simulate click for demo purposes
  async function onSimulate(id: number, code: string) {
    try {
      const r = await simulateClick(code);
      if (r.link) setItems(items.map((x) => (x.id === id ? r.link : x)));
    } catch {
      show("Error al simular clic", "err");
    }
  }

  return (
    <div
      className="min-h-screen w-full bg-white text-black flex flex-col"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      {/* Toast notification */}
      {toastEl}

      {/* Navigation bar */}
      <nav className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-semibold text-lg" aria-label="LinkPay Home">
            <div className="h-6 w-6 rounded-xl" style={{ background: BRAND.primary }} />
            <span>LinkPay</span>
            <span className="ml-2 rounded-full bg-black/5 px-2 py-0.5 text-xs font-medium">Beta</span>
          </a>
          {/* Primary nav links for the landing page */}
          <div className="hidden md:flex items-center gap-6 text-sm text-black/70">
            {!authed && (
              <>
                <a className="hover:text-black" href="#how-it-works">
                  Cómo funciona
                </a>
                <a className="hover:text-black" href="#benefits">
                  Beneficios
                </a>
              </>
            )}
            {authed && (
              <a className="hover:text-black" href="#dashboard">
                Panel
              </a>
            )}
          </div>
          <div className="flex items-center gap-3">
            {authed ? (
              <button
                onClick={onLogout}
                className="inline-flex items-center justify-center rounded-2xl px-5 py-2 text-sm font-semibold border border-black/10 bg-white hover:bg-black/5"
              >
                Cerrar sesión
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </nav>

      {/* Landing page */}
      {!authed && (
        <>
          {/* Hero */}
          <section id="hero" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Cobra por compartir lo que ya compartes.
            </h1>
            <p className="mt-5 text-lg md:text-xl text-black/70 max-w-3xl mx-auto">
              <strong>LinkPay</strong> convierte cualquier link que compartas en dinero real. Crea tu cuenta,
              comparte enlaces, y gana por cada clic. Así de simple.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <input
                type="email"
                disabled={loading}
                className="w-full sm:w-auto rounded-2xl border border-black/10 px-4 py-3 min-w-[250px]"
                placeholder="tucorreo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={onLogin}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold text-white disabled:opacity-60"
                style={{ background: BRAND.primary }}
              >
                {loading ? "Cargando…" : "Empezar gratis"}
              </button>
            </div>
            <div className="mt-12 md:mt-16">
              <DashboardMock />
            </div>
          </section>

          {/* Cómo funciona */}
          <section id="how-it-works" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Cómo funciona</h2>
              <p className="mt-3 text-black/70">Tres pasos simples para empezar a ganar.</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  emoji: "👤",
                  title: "Crea tu cuenta",
                  desc: "Regístrate gratis en segundos.",
                },
                {
                  emoji: "🔗",
                  title: "Pega cualquier enlace",
                  desc: "Te damos un nuevo link listo para monetizar.",
                },
                {
                  emoji: "💸",
                  title: "Comparte y cobra",
                  desc: "Gana dinero cada vez que alguien haga clic.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-md shadow-sm p-6 h-full"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: BRAND.light, color: BRAND.primary, fontSize: "1.5rem" }}
                    >
                      {item.emoji}
                    </div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-black/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Beneficios */}
          <section id="benefits" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                  Monetiza lo que ya compartes
                </h2>
                <ul className="mt-6 space-y-3">
                  {[
                    "Monetiza enlaces de TikTok, WhatsApp, Telegram, YouTube, Twitter, etc.",
                    "Gana desde el primer clic.",
                    "Panel en tiempo real: visitas, ganancias, referidos.",
                    "Programa de referidos: gana el 10 % de lo que generen tus amigos.",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 text-xl" style={{ color: BRAND.primary }}>
                        ✔️
                      </span>
                      <span className="text-black/80">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <DashboardMock />
            </div>
          </section>

          {/* Final CTA */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-24">
            <div className="relative isolate overflow-hidden rounded-3xl border border-black/5 p-10 md:p-14 text-center">
              <div
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  // Use a plain string here; template literals are not allowed in JSX style objects
                  background:
                    "radial-gradient(60% 80% at 50% 0%, rgba(10,102,255,0.15), transparent 60%)",
                }}
              />
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight max-w-3xl mx-auto">
                Miles de personas comparten enlaces cada día. ¿Por qué no cobrar por ello?
              </h2>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onLogin}
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold text-white disabled:opacity-60"
                  style={{ background: BRAND.primary }}
                >
                  {loading ? "Cargando…" : "Empieza ahora →"}
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold border border-black/10 bg-white hover:bg-black/5"
                  onClick={() => show("Solo disponible por invitación", "err")}
                >
                  Solicitar invitación
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Dashboard page for authenticated users */}
      {authed && (
        <section id="dashboard" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          {/* User header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Panel de control</h2>
            <div className="text-sm text-black/70">
              Sesión iniciada como <strong>{email}</strong>
            </div>
          </div>
          {/* KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-md shadow-sm p-5">
              <p className="text-xs uppercase tracking-wide text-black/50">Clicks</p>
              <p className="text-2xl font-bold">{clicks}</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-md shadow-sm p-5">
              <p className="text-xs uppercase tracking-wide text-black/50">Ganancias</p>
              <p className="text-2xl font-bold" style={{ color: BRAND.primary }}>
                {currency.format(earnings)}
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-md shadow-sm p-5">
              <p className="text-xs uppercase tracking-wide text-black/50">Referidos</p>
              <p className="text-2xl font-bold" style={{ color: BRAND.primary }}>
                {currency.format(me?.ref_earnings || 0)}
              </p>
            </div>
          </div>

          {/* Create link */}
          <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-md shadow-sm p-5 mt-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                className="flex-1 rounded-2xl border border-black/10 px-4 py-3"
                placeholder="Pega cualquier enlace (https://...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
              />
              <button
                onClick={onCreate}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
                style={{ background: BRAND.primary }}
              >
                {loading ? "Monetizando…" : "Monetizar"}
              </button>
            </div>
            <p className="mt-2 text-xs text-black/50">
              Tu enlace corto comenzará por <code>{base}</code>
            </p>
          </div>

          {/* Links table */}
          <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-md shadow-sm p-4 mt-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-black/60">
                  <tr>
                    <th className="p-3">Enlace</th>
                    <th className="p-3">Código</th>
                    <th className="p-3">Clicks</th>
                    <th className="p-3">€</th>
                    <th className="p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td className="p-3 text-black/50" colSpan={5}>
                        Aún no tienes enlaces.
                      </td>
                    </tr>
                  ) : (
                    items.map((l) => {
                      const short = `${base}${l.code}`;
                      return (
                        <tr key={l.id} className="border-t border-black/5">
                          <td className="p-3 max-w-[380px] truncate">
                            <a
                              className="hover:underline"
                              href={l.target}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {l.target}
                            </a>
                          </td>
                          <td className="p-3">
                            <code className="rounded bg-black/5 px-2 py-1">{l.code}</code>
                          </td>
                          <td className="p-3">{l.clicks}</td>
                          <td className="p-3">{currency.format(l.earnings || 0)}</td>
                          <td className="p-3">
                            <div className="flex flex-col sm:flex-row gap-2">
                              <button
                                className="px-3 py-2 border border-black/10 rounded-2xl text-sm"
                                onClick={() => copy(short)}
                              >
                                Copiar
                              </button>
                              <a
                                href={`/l/${l.code}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-3 py-2 border border-black/10 rounded-2xl text-sm"
                              >
                                Abrir
                              </a>
                              <button
                                className="px-3 py-2 border border-black/10 rounded-2xl text-sm"
                                onClick={() => onSimulate(l.id, l.code)}
                              >
                                Simular clic
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Referral program */}
          <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-md shadow-sm p-5 mt-8">
            <p className="text-sm text-black/60">Programa de referidos</p>
            <div className="mt-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="text-sm">
                <span className="text-black/60">Tu código:</span>{" "}
                <code className="rounded bg-black/5 px-2 py-1">
                  {me?.ref_code || "(generando…)"}
                </code>
              </div>
              {me?.ref_code && (
                <button
                  className="border border-black/10 bg-white hover:bg-black/5 px-3 py-2 rounded-2xl text-sm"
                  onClick={() => copy(`${location.origin}/?ref=${me.ref_code}`)}
                >
                  Copiar link de invitación
                </button>
              )}
            </div>
            <p className="mt-2 text-xs text-black/50">
              Comparte tu link. Ganas el 10 % de lo que generen tus invitados.
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-black/5 bg-white/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-black/70 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-semibold">
            <div className="h-5 w-5 rounded-lg" style={{ background: BRAND.primary }}></div>
            <span>LinkPay</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-4">
            <a href="#" className="hover:text-black">
              Términos
            </a>
            <a href="#" className="hover:text-black">
              Privacidad
            </a>
            <a href="#" className="hover:text-black">
              Contacto
            </a>
            <a href="#" className="hover:text-black">
              FAQ
            </a>
          </nav>
          <p className="text-xs">© LinkPay 2025. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}