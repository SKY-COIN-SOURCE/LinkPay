const API = import.meta.env.VITE_API_BASE || ""; // mismo dominio => ""

export async function createUser(email: string, ref?: string) {
  const r = await fetch(`${API}/api/users`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, ref }),
  });
  return r.json();
}

export async function listLinks(owner: string) {
  const r = await fetch(`${API}/api/links?owner=${encodeURIComponent(owner)}`, {
    headers: { "x-user-email": owner },
  });
  return r.json();
}

export async function addLink(owner: string, url: string) {
  const r = await fetch(`${API}/api/links`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-user-email": owner },
    body: JSON.stringify({ url }),
  });
  return r.json();
}

export async function simulateClick(code: string) {
  const r = await fetch(`${API}/api/links/${code}/click`, { method: "POST" });
  return r.json();
}

export async function getMe(email: string) {
  const r = await fetch(`${API}/api/users/me`, { headers: { "x-user-email": email } });
  return r.json();
}
