-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN: Gamificación Dashboard - Campos para streak y meta diaria
-- Fecha: 2026-01-04
-- Propósito: Añadir campos necesarios para gamificación real por usuario
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Añadir campos de gamificación a la tabla profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS daily_goal DECIMAL(10,4) DEFAULT 5.00,
ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_active_date DATE,
ADD COLUMN IF NOT EXISTS goal_reached_today BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS yesterday_revenue DECIMAL(10,4) DEFAULT 0;

-- 2. Índice para consultas de streak y actividad
CREATE INDEX IF NOT EXISTS idx_profiles_last_active ON profiles(last_active_date);
CREATE INDEX IF NOT EXISTS idx_profiles_streak ON profiles(current_streak DESC);

-- 3. Documentación de columnas
COMMENT ON COLUMN profiles.daily_goal IS 'Meta diaria personalizada del usuario en euros (default €5.00)';
COMMENT ON COLUMN profiles.current_streak IS 'Días consecutivos con actividad/ingresos';
COMMENT ON COLUMN profiles.last_active_date IS 'Última fecha con actividad para calcular streak';
COMMENT ON COLUMN profiles.goal_reached_today IS 'Si el usuario alcanzó su meta hoy (para celebración)';
COMMENT ON COLUMN profiles.yesterday_revenue IS 'Ingresos de ayer para calcular comparison %';

-- 4. Función para actualizar streak automáticamente cuando hay clicks (links Y bio_profiles)
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
DECLARE
  user_profile_id UUID;
  last_active DATE;
  current_streak_val INTEGER;
BEGIN
  -- Obtener el user_id del link O del bio_profile
  IF NEW.link_id IS NOT NULL THEN
    SELECT user_id INTO user_profile_id FROM links WHERE id = NEW.link_id;
  ELSIF NEW.bio_profile_id IS NOT NULL THEN
    SELECT user_id INTO user_profile_id FROM bio_profiles WHERE id = NEW.bio_profile_id;
  END IF;
  
  IF user_profile_id IS NOT NULL THEN
    -- Obtener datos actuales del perfil
    SELECT last_active_date, current_streak 
    INTO last_active, current_streak_val 
    FROM profiles 
    WHERE id = user_profile_id;
    
    -- Lógica de streak PERFECTA:
    -- Si nunca ha sido activo O fue activo hace más de 1 día: reiniciar a 1
    IF last_active IS NULL OR last_active < CURRENT_DATE - 1 THEN
      UPDATE profiles SET 
        current_streak = 1,
        last_active_date = CURRENT_DATE
      WHERE id = user_profile_id;
    -- Si fue activo ayer: incrementar streak (continuar)
    ELSIF last_active = CURRENT_DATE - 1 THEN
      UPDATE profiles SET 
        current_streak = COALESCE(current_streak_val, 0) + 1,
        last_active_date = CURRENT_DATE
      WHERE id = user_profile_id;
    -- Si ya fue activo hoy: mantener streak actual (no cambiar nada)
    ELSIF last_active = CURRENT_DATE THEN
      -- Ya activo hoy, mantener el streak sin cambios
      NULL;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Trigger para actualizar streak en cada click
DROP TRIGGER IF EXISTS trigger_update_streak ON click_events;
CREATE TRIGGER trigger_update_streak
AFTER INSERT ON click_events
FOR EACH ROW
EXECUTE FUNCTION update_user_streak();

-- 6. Función para calcular y guardar ingresos de ayer (ejecutar diariamente via cron)
CREATE OR REPLACE FUNCTION calculate_yesterday_revenue()
RETURNS void AS $$
BEGIN
  UPDATE profiles p SET
    yesterday_revenue = COALESCE((
      SELECT SUM(l.earnings)
      FROM links l
      WHERE l.user_id = p.id
      AND DATE(l.updated_at) = CURRENT_DATE - 1
    ), 0) + COALESCE((
      SELECT SUM(bp.earnings)
      FROM bio_profiles bp
      WHERE bp.user_id = p.id
      AND DATE(bp.updated_at) = CURRENT_DATE - 1
    ), 0),
    goal_reached_today = FALSE  -- Reiniciar para nuevo día
  WHERE EXISTS (SELECT 1 FROM links WHERE user_id = p.id)
     OR EXISTS (SELECT 1 FROM bio_profiles WHERE user_id = p.id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6.1. Función para verificar y reiniciar streaks perdidos (ejecutar diariamente via cron)
-- Esta función resetea a 0 los streaks de usuarios que no tuvieron actividad ayer
CREATE OR REPLACE FUNCTION reset_lost_streaks()
RETURNS void AS $$
BEGIN
  -- Resetear streaks de usuarios que no tuvieron actividad ayer (más de 1 día sin actividad)
  -- y que tienen last_active_date < CURRENT_DATE - 1 (perdieron el streak)
  UPDATE profiles p
  SET 
    current_streak = 0,
    last_active_date = NULL  -- Opcional: dejar NULL o mantener la última fecha
  WHERE p.last_active_date IS NOT NULL
    AND p.last_active_date < CURRENT_DATE - 1
    AND p.current_streak > 0
    -- Solo resetear si realmente no hubo actividad ayer (verificación adicional)
    AND NOT EXISTS (
      SELECT 1 FROM click_events ce
      LEFT JOIN links l ON ce.link_id = l.id
      LEFT JOIN bio_profiles bp ON ce.bio_profile_id = bp.id
      WHERE (l.user_id = p.id OR bp.user_id = p.id)
        AND DATE(ce.created_at) = CURRENT_DATE - 1
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Función RPC para obtener datos de gamificación del usuario actual
CREATE OR REPLACE FUNCTION get_user_gamification()
RETURNS TABLE(
  streak INTEGER,
  daily_goal DECIMAL,
  goal_reached BOOLEAN,
  yesterday_revenue DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.current_streak,
    p.daily_goal,
    p.goal_reached_today,
    p.yesterday_revenue
  FROM profiles p
  WHERE p.id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Función RPC para actualizar meta diaria del usuario
CREATE OR REPLACE FUNCTION set_daily_goal(new_goal DECIMAL)
RETURNS void AS $$
BEGIN
  UPDATE profiles SET daily_goal = new_goal WHERE id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Función RPC para marcar que se alcanzó la meta (para no repetir confetti)
CREATE OR REPLACE FUNCTION mark_goal_reached()
RETURNS void AS $$
BEGIN
  UPDATE profiles SET goal_reached_today = TRUE WHERE id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ═══════════════════════════════════════════════════════════════════════════
-- INSTRUCCIONES:
-- 1. Ejecutar este SQL en Supabase SQL Editor
-- 2. Verificar que las columnas se añadieron: SELECT * FROM profiles LIMIT 1;
-- 3. Configurar cron jobs en Supabase (Database > Cron Jobs):
--    a) calculate_yesterday_revenue() a las 00:01 todos los días
--    b) reset_lost_streaks() a las 00:05 todos los días (después de calculate_yesterday_revenue)
-- 
-- NOTAS IMPORTANTES:
-- - El streak se actualiza automáticamente con cada click (links Y bio_profiles)
-- - El streak se incrementa si hubo actividad ayer, se reinicia a 1 si fue hace más de 1 día
-- - reset_lost_streaks() limpia streaks perdidos (más de 1 día sin actividad)
-- - El streak funciona perfectamente: se acumula con actividad consecutiva y se pierde si no hay actividad
-- ═══════════════════════════════════════════════════════════════════════════
