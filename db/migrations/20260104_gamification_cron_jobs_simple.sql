-- ═══════════════════════════════════════════════════════════════════════════
-- CRON JOBS: Configurar tareas automáticas para gamificación (VERSIÓN SIMPLE)
-- Fecha: 2026-01-04
-- Ejecutar DESPUÉS de ejecutar 20260104_gamification_dashboard.sql
-- 
-- IMPORTANTE: NO intenta crear la extensión pg_cron (ya debería estar habilitada)
-- Si obtienes error, ejecuta estas líneas UNA POR UNA
-- ═══════════════════════════════════════════════════════════════════════════

-- Paso 1: (OPCIONAL) Si los jobs ya existen, elimínalos primero ejecutando:
-- SELECT cron.unschedule('calculate-yesterday-revenue-daily');
-- SELECT cron.unschedule('reset-lost-streaks-daily');
-- Si obtienes error "job not found", está bien, significa que no existían.

-- Paso 2: Programar calculate_yesterday_revenue() todos los días a las 00:01 UTC
SELECT cron.schedule(
  'calculate-yesterday-revenue-daily',
  '1 0 * * *',
  $$SELECT calculate_yesterday_revenue();$$
);

-- Paso 3: Programar reset_lost_streaks() todos los días a las 00:05 UTC
SELECT cron.schedule(
  'reset-lost-streaks-daily',
  '5 0 * * *',
  $$SELECT reset_lost_streaks();$$
);

-- Paso 4: Verificar que se crearon correctamente
SELECT jobid, jobname, schedule, command 
FROM cron.job 
WHERE jobname IN ('calculate-yesterday-revenue-daily', 'reset-lost-streaks-daily');

