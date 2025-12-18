-- ════════════════════════════════════════════════════════════════
-- ⏰ CRON JOBS PARA PUSH NOTIFICATIONS
-- Ejecutar pushes automáticos en horarios óptimos
-- ════════════════════════════════════════════════════════════════

-- Habilitar extensión pg_cron
CREATE EXTENSION IF NOT EXISTS pg_cron;

GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- ═══════════════════════════════════════════════════════════════
-- CRON 1: Resumen diario a las 21:00 (9pm)
-- ═══════════════════════════════════════════════════════════════
SELECT cron.schedule(
  'daily-push-summary',
  '0 21 * * *',
  $$SELECT generate_daily_push_summary()$$
);

-- ═══════════════════════════════════════════════════════════════
-- CRON 2: Eventos importantes cada 4 horas
-- ═══════════════════════════════════════════════════════════════
SELECT cron.schedule(
  'important-push-events',
  '0 */4 * * *',
  $$SELECT generate_important_push()$$
);

-- ═══════════════════════════════════════════════════════════════
-- CRON 3: Re-engagement diario a las 12:00
-- ═══════════════════════════════════════════════════════════════
SELECT cron.schedule(
  'reengagement-push',
  '0 12 * * *',
  $$SELECT generate_reengagement_push()$$
);

-- VERIFICAR
SELECT jobid, schedule, command FROM cron.job;
