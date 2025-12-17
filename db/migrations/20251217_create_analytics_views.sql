DROP VIEW IF EXISTS analytics_events_daily CASCADE;
DROP VIEW IF EXISTS analytics_events CASCADE;

CREATE VIEW analytics_events AS
SELECT 
  ce.id,
  ce.created_at,
  ce.earned_amount,
  ce.is_paid,
  ce.link_id,
  l.slug as link_slug,
  l.title as link_title,
  ce.country,
  ce.device,
  COALESCE(l.user_id, bp.user_id) as owner_id
FROM click_events ce
LEFT JOIN links l ON ce.link_id = l.id
LEFT JOIN bio_profiles bp ON ce.bio_profile_id = bp.id;

CREATE VIEW analytics_events_daily AS
SELECT 
  DATE(ce.created_at) as day,
  COUNT(*) as clicks,
  SUM(ce.earned_amount) as earnings,
  SUM(CASE WHEN ce.is_paid THEN 1 ELSE 0 END) as paid_clicks,
  COALESCE(l.user_id, bp.user_id) as owner_id
FROM click_events ce
LEFT JOIN links l ON ce.link_id = l.id
LEFT JOIN bio_profiles bp ON ce.bio_profile_id = bp.id
GROUP BY DATE(ce.created_at), COALESCE(l.user_id, bp.user_id);

GRANT SELECT ON analytics_events TO authenticated;
GRANT SELECT ON analytics_events TO anon;
GRANT SELECT ON analytics_events_daily TO authenticated;
GRANT SELECT ON analytics_events_daily TO anon;

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referral_earnings FLOAT DEFAULT 0;
