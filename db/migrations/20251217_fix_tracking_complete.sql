ALTER TABLE click_events ADD COLUMN IF NOT EXISTS earned_amount FLOAT DEFAULT 0;
ALTER TABLE click_events ADD COLUMN IF NOT EXISTS is_paid BOOLEAN DEFAULT FALSE;
ALTER TABLE click_events ADD COLUMN IF NOT EXISTS device TEXT DEFAULT 'Desktop';

CREATE OR REPLACE FUNCTION is_bot(ua TEXT) RETURNS BOOLEAN AS $$
BEGIN
  RETURN (ua ILIKE '%bot%' OR ua ILIKE '%crawl%' OR ua ILIKE '%spider%' OR ua ILIKE '%headless%' OR ua IS NULL OR length(ua) < 10);
END;
$$ LANGUAGE plpgsql;

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
  v_earned FLOAT := 0;
  v_device TEXT := 'Desktop';
BEGIN
  SELECT EXISTS(SELECT 1 FROM links WHERE id = p_link_id) INTO v_link_exists;
  IF NOT v_link_exists THEN
    RETURN json_build_object('success', false, 'error', 'Link not found');
  END IF;

  IF is_bot(p_user_agent) THEN
    RETURN json_build_object('success', false, 'error', 'Bot detected');
  END IF;

  IF p_user_agent ILIKE '%tablet%' OR p_user_agent ILIKE '%ipad%' THEN
    v_device := 'Tablet';
  ELSIF p_user_agent ILIKE '%mobile%' OR p_user_agent ILIKE '%android%' OR p_user_agent ILIKE '%iphone%' THEN
    v_device := 'Mobile';
  END IF;

  SELECT COUNT(*) INTO v_daily_clicks
  FROM click_events
  WHERE ip_address = p_ip_address
    AND created_at > (NOW() - INTERVAL '24 hours');

  IF v_daily_clicks < 5 THEN
    v_is_paid := TRUE;
    v_earned := p_earnings_amount;
  END IF;

  INSERT INTO click_events (link_id, ip_address, user_agent, country, earned_amount, is_paid, device)
  VALUES (p_link_id, p_ip_address, p_user_agent, p_country, v_earned, v_is_paid, v_device);

  UPDATE links
  SET 
    views = COALESCE(views, 0) + 1,
    earnings = CASE WHEN v_is_paid THEN COALESCE(earnings, 0) + p_earnings_amount ELSE earnings END
  WHERE id = p_link_id;

  RETURN json_build_object('success', true, 'paid', v_is_paid, 'earned', v_earned);
END;
$$;

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
  v_earned FLOAT := 0;
  v_device TEXT := 'Desktop';
BEGIN
  SELECT EXISTS(SELECT 1 FROM bio_profiles WHERE id = p_profile_id) INTO v_prof_exists;
  IF NOT v_prof_exists THEN
    RETURN json_build_object('success', false, 'error', 'Profile not found');
  END IF;

  IF is_bot(p_user_agent) THEN
    RETURN json_build_object('success', false, 'error', 'Bot detected');
  END IF;

  IF p_user_agent ILIKE '%tablet%' OR p_user_agent ILIKE '%ipad%' THEN
    v_device := 'Tablet';
  ELSIF p_user_agent ILIKE '%mobile%' OR p_user_agent ILIKE '%android%' OR p_user_agent ILIKE '%iphone%' THEN
    v_device := 'Mobile';
  END IF;

  SELECT COUNT(*) INTO v_daily_clicks
  FROM click_events
  WHERE ip_address = p_ip_address
    AND created_at > (NOW() - INTERVAL '24 hours');

  IF v_daily_clicks < 5 THEN
    v_is_paid := TRUE;
    v_earned := p_earnings_amount;
  END IF;

  INSERT INTO click_events (bio_profile_id, ip_address, user_agent, country, earned_amount, is_paid, device)
  VALUES (p_profile_id, p_ip_address, p_user_agent, p_country, v_earned, v_is_paid, v_device);

  UPDATE bio_profiles
  SET 
    views = COALESCE(views, 0) + 1,
    earnings = CASE WHEN v_is_paid THEN COALESCE(earnings, 0) + p_earnings_amount ELSE earnings END
  WHERE id = p_profile_id;

  RETURN json_build_object('success', true, 'paid', v_is_paid, 'earned', v_earned);
END;
$$;

ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow service insert" ON click_events;
CREATE POLICY "Allow service insert" ON click_events FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow owner select" ON click_events;
CREATE POLICY "Allow owner select" ON click_events FOR SELECT USING (
  link_id IN (SELECT id FROM links WHERE user_id = auth.uid())
  OR bio_profile_id IN (SELECT id FROM bio_profiles WHERE user_id = auth.uid())
);

CREATE INDEX IF NOT EXISTS idx_clicks_country ON click_events(country);
CREATE INDEX IF NOT EXISTS idx_clicks_device ON click_events(device);
CREATE INDEX IF NOT EXISTS idx_clicks_created ON click_events(created_at DESC);
