-- Migration: Advanced Anti-Fraud & Smart Capping
-- Date: 2025-12-09

-- Ensure table exists
CREATE TABLE IF NOT EXISTS click_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  link_id TEXT REFERENCES links(id) ON DELETE CASCADE,
  bio_profile_id TEXT REFERENCES bio_profiles(id) ON DELETE CASCADE,
  ip_address TEXT,
  user_agent TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clicks_ip_date ON click_events(ip_address, created_at);

-- 1. Helper function to detect basic bots from User-Agent
CREATE OR REPLACE FUNCTION is_bot(ua TEXT) RETURNS BOOLEAN AS $$
BEGIN
  RETURN (ua ILIKE '%bot%' OR ua ILIKE '%crawl%' OR ua ILIKE '%spider%' OR ua ILIKE '%headless%' OR ua IS NULL OR length(ua) < 10);
END;
$$ LANGUAGE plpgsql;

-- 2. Smart RPC for Short Links
CREATE OR REPLACE FUNCTION track_link_click(
  p_link_id TEXT,
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
  -- 1. Validate existence
  SELECT EXISTS(SELECT 1 FROM links WHERE id = p_link_id) INTO v_link_exists;
  IF NOT v_link_exists THEN
    RETURN json_build_object('success', false, 'error', 'Link not found');
  END IF;

  -- 2. Basic Bot Filter
  IF is_bot(p_user_agent) THEN
    RETURN json_build_object('success', false, 'error', 'Bot detected');
  END IF;

  -- 3. Check IP activity in last 24h
  SELECT COUNT(*) INTO v_daily_clicks
  FROM click_events
  WHERE ip_address = p_ip_address
    AND created_at > (NOW() - INTERVAL '24 hours');

  -- 4. CAP: Pay only for the first 5 clicks per IP per day (Adjustable)
  -- This allows repeat users but stops "infinite" farming scripts.
  IF v_daily_clicks < 5 THEN
    v_is_paid := TRUE;
  ELSE
    v_is_paid := FALSE; -- Record stats but do not pay
  END IF;

  -- 5. Record the click
  INSERT INTO click_events (link_id, ip_address, user_agent, country)
  VALUES (p_link_id, p_ip_address, p_user_agent, p_country);

  -- 6. Update stats
  UPDATE links
  SET 
    views = COALESCE(views, 0) + 1,
    earnings = CASE WHEN v_is_paid THEN COALESCE(earnings, 0) + p_earnings_amount ELSE earnings END
  WHERE id = p_link_id;

  RETURN json_build_object('success', true, 'paid', v_is_paid, 'daily_clicks', v_daily_clicks);
END;
$$;

-- 3. Smart RPC for Bio Profiles
CREATE OR REPLACE FUNCTION track_bio_click(
  p_profile_id TEXT,
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
