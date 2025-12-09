-- Migration: Fix Tracking RPCs (Connecting the cables)
-- Date: 2025-12-09

-- 1. Asegurar que existe la tabla de eventos de clic
CREATE TABLE IF NOT EXISTS click_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  link_id UUID REFERENCES links(id) ON DELETE CASCADE,
  bio_profile_id UUID REFERENCES bio_profiles(id) ON DELETE CASCADE,
  ip_address TEXT,
  user_agent TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clicks_ip_date ON click_events(ip_address, created_at);

-- 2. Función helper para bots
CREATE OR REPLACE FUNCTION is_bot(ua TEXT) RETURNS BOOLEAN AS $$
BEGIN
  RETURN (ua ILIKE '%bot%' OR ua ILIKE '%crawl%' OR ua ILIKE '%spider%' OR ua ILIKE '%headless%' OR ua IS NULL OR length(ua) < 10);
END;
$$ LANGUAGE plpgsql;

-- 3. RPC para contar visitas visuales en Bio (sin pagar, solo stats)
CREATE OR REPLACE FUNCTION increment_bio_stats(
  profile_row_id UUID,
  amount FLOAT DEFAULT 0
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE bio_profiles
  SET 
    views = COALESCE(views, 0) + 1,
    earnings = COALESCE(earnings, 0) + amount
  WHERE id = profile_row_id;
END;
$$;

-- 4. RPC para Links Cortos (Pago + Anti-fraude)
CREATE OR REPLACE FUNCTION track_link_click(
  p_link_id UUID,
  p_ip_address TEXT,
  p_user_agent TEXT,
  p_country TEXT,
  p_earnings_amount FLOAT DEFAULT 0.0015
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_link_exists BOOLEAN;
  v_daily_clicks INT;
  v_is_paid BOOLEAN := FALSE;
BEGIN
  -- Verificar existencia
  SELECT EXISTS(SELECT 1 FROM links WHERE id = p_link_id) INTO v_link_exists;
  IF NOT v_link_exists THEN
    RETURN json_build_object('success', false, 'error', 'Link not found');
  END IF;

  -- Filtrar bots
  IF is_bot(p_user_agent) THEN
    RETURN json_build_object('success', false, 'error', 'Bot detected');
  END IF;

  -- Contar clics de esta IP en 24h
  SELECT COUNT(*) INTO v_daily_clicks
  FROM click_events
  WHERE ip_address = p_ip_address
    AND created_at > (NOW() - INTERVAL '24 hours');

  -- Pagar solo los primeros 5 clics
  IF v_daily_clicks < 5 THEN
    v_is_paid := TRUE;
  ELSE
    v_is_paid := FALSE;
  END IF;

  -- Registrar evento
  INSERT INTO click_events (link_id, ip_address, user_agent, country)
  VALUES (p_link_id, p_ip_address, p_user_agent, p_country);

  -- Actualizar link
  UPDATE links
  SET 
    views = COALESCE(views, 0) + 1,
    earnings = CASE WHEN v_is_paid THEN COALESCE(earnings, 0) + p_earnings_amount ELSE earnings END
  WHERE id = p_link_id;

  RETURN json_build_object('success', true, 'paid', v_is_paid);
END;
$$;

-- 5. RPC para Clics en Enlaces de Bio (Pago + Anti-fraude)
CREATE OR REPLACE FUNCTION track_bio_click(
  p_profile_id UUID,
  p_ip_address TEXT,
  p_user_agent TEXT,
  p_country TEXT,
  p_earnings_amount FLOAT DEFAULT 0.0010
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_prof_exists BOOLEAN;
  v_daily_clicks INT;
  v_is_paid BOOLEAN := FALSE;
BEGIN
  SELECT EXISTS(SELECT 1 FROM bio_profiles WHERE id = p_profile_id) INTO v_prof_exists;
  IF NOT v_prof_exists THEN
    RETURN json_build_object('success', false, 'error', 'Profile not found');
  END IF;

  IF is_bot(p_user_agent) THEN
    RETURN json_build_object('success', false, 'error', 'Bot detected');
  END IF;

  SELECT COUNT(*) INTO v_daily_clicks
  FROM click_events
  WHERE ip_address = p_ip_address
    AND created_at > (NOW() - INTERVAL '24 hours');

  IF v_daily_clicks < 5 THEN
    v_is_paid := TRUE;
  ELSE
    v_is_paid := FALSE;
  END IF;

  INSERT INTO click_events (bio_profile_id, ip_address, user_agent, country)
  VALUES (p_profile_id, p_ip_address, p_user_agent, p_country);

  UPDATE bio_profiles
  SET 
    views = COALESCE(views, 0) + 1,
    earnings = CASE WHEN v_is_paid THEN COALESCE(earnings, 0) + p_earnings_amount ELSE earnings END
  WHERE id = p_profile_id;

  RETURN json_build_object('success', true, 'paid', v_is_paid);
END;
$$;
