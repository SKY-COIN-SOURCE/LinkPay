# LinkPay Monorepo (Cloudflare Stack)

**Todo unificado**: Frontend PWA (Cloudflare Pages) + API/Redirects (Workers) + DB (D1).

## Requisitos
- Node 18+
- PNPM o NPM
- Cuenta Cloudflare y CLI: `npm i -g wrangler`

## Pasos rápidos

```bash
# 0) Instalar deps del monorepo
pnpm i   # o npm i

# 1) Crear DB D1
wrangler d1 create linkpay-db
# Copia el database_id que te devuelve y pégalo en wrangler.toml

# 2) Aplicar esquema
wrangler d1 execute linkpay-db --file=./db/schema.sql

# 3) Desarrollo local (API + Web)
pnpm dev

# 4) Deploy API (Worker)
pnpm deploy:api

# 5) Build y deploy web (Pages)
pnpm -C apps/web build
pnpm deploy:web   # o usa el dashboard de Cloudflare Pages
```

## Rutas
- API: `/api/*`
- Short links: `/l/:code` → redirige y suma click
- Health: `/health`

## Variables/Binds
- D1: `LINKPAY_DB`
- `EPC` (euros por clic), `REF_PCT` (porcentaje referido), `ALLOWED_ORIGIN`

> Este repo es una base funcional. Añade autent real, límites antifraude y reporting cuando valides.