-- ═══════════════════════════════════════════════════════════════════════════
-- CRON JOBS: Configurar tareas automáticas para gamificación
-- Fecha: 2026-01-04
-- Ejecutar DESPUÉS de ejecutar 20260104_gamification_dashboard.sql
-- ═══════════════════════════════════════════════════════════════════════════

-- NOTA IMPORTANTE: La extensión pg_cron ya está habilitada en Supabase
-- NO intentes crear la extensión, solo programa los jobs

-- 1. Eliminar jobs existentes si existen (para evitar duplicados)
-- Usamos DO block para manejar errores si el job no existe
DO $$
BEGIN
  PERFORM cron.unschedule('calculate-yesterday-revenue-daily');
EXCEPTION WHEN undefined_function THEN
  -- Si cron.unschedule no existe, la extensión no está habilitada
  RAISE NOTICE 'pg_cron no está disponible';
WHEN OTHERS THEN
  -- Otros errores (como job no existe) se ignoran
  NULL;
END $$;

DO $$
BEGIN
  PERFORM cron.unschedule('reset-lost-streaks-daily');
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- 3. Programar calculate_yesterday_revenue() todos los días a las 00:01 UTC
-- Esto calcula los ingresos de ayer y resetea goal_reached_today
SELECT cron.schedule(
  'calculate-yesterday-revenue-daily',  -- Nombre único del job
  '1 0 * * *',                          -- Cron expression: 00:01 UTC todos los días
  $$SELECT calculate_yesterday_revenue();$$
);

-- 4. Programar reset_lost_streaks() todos los días a las 00:05 UTC
-- Esto limpia streaks perdidos (después de calculate_yesterday_revenue)
SELECT cron.schedule(
  'reset-lost-streaks-daily',           -- Nombre único del job
  '5 0 * * *',                          -- Cron expression: 00:05 UTC todos los días
  $$SELECT reset_lost_streaks();$$
);

-- ═══════════════════════════════════════════════════════════════════════════
-- VERIFICACIÓN:
-- ═══════════════════════════════════════════════════════════════════════════
-- Para ver los jobs programados, ejecuta:
-- SELECT * FROM cron.job;
--
-- Para ver el historial de ejecuciones:
-- SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 20;
--
-- Para eliminar un job si es necesario:
-- SELECT cron.unschedule('nombre-del-job');
-- ═══════════════════════════════════════════════════════════════════════════

