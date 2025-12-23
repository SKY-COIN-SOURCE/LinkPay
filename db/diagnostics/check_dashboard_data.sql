-- ═══════════════════════════════════════════════════════════════════════════
-- DIAGNÓSTICO: Verificar datos del Dashboard
-- Ejecuta esto en Supabase SQL Editor para ver si hay datos
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Ver click_events recientes (últimos 7 días)
SELECT 
  DATE(created_at) as fecha,
  COUNT(*) as clicks,
  COALESCE(SUM(earned_amount), 0) as earnings
FROM click_events
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY fecha DESC;

-- 2. Ver datos de analytics_events_daily (vista agregada)
SELECT 
  day,
  clicks,
  earnings,
  owner_id
FROM analytics_events_daily
WHERE day >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY day DESC
LIMIT 20;

-- 3. Verificar si hay datos de HOY específicamente
SELECT 
  'HOY' as periodo,
  COUNT(*) as clicks,
  COALESCE(SUM(earned_amount), 0) as earnings
FROM click_events
WHERE DATE(created_at) = CURRENT_DATE;

-- 4. Ver estructura de click_events
SELECT 
  column_name, 
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'click_events'
ORDER BY ordinal_position;

-- 5. Ver los últimos 10 click_events
SELECT 
  id,
  created_at,
  link_id,
  earned_amount,
  is_paid,
  country,
  device
FROM click_events
ORDER BY created_at DESC
LIMIT 10;
