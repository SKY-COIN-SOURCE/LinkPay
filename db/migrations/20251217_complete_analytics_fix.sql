-- ═══════════════════════════════════════════════════════════════════════════
-- COMPLETE FIX: Link Titles + Analytics Views
-- Execute this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. UPDATE EXISTING LINKS: Extract domain from URL as title
UPDATE links
SET title = COALESCE(
  NULLIF(
    regexp_replace(
      regexp_replace(original_url, '^https?://(www\.)?', ''),
      '/.*$', ''
    ),
    ''
  ),
  slug
)
WHERE title = 'Enlace LinkPay' OR title IS NULL;

-- 2. DROP AND RECREATE ANALYTICS VIEWS
DROP VIEW IF EXISTS analytics_events_daily CASCADE;
DROP VIEW IF EXISTS analytics_events CASCADE;

-- Create analytics_events view
CREATE VIEW analytics_events AS
SELECT 
  ce.id,
  ce.created_at,
  COALESCE(ce.earned_amount, 0) as earned_amount,
  COALESCE(ce.is_paid, false) as is_paid,
  ce.link_id,
  l.slug as link_slug,
  l.title as link_title,
  COALESCE(ce.country, 'Unknown') as country,
  COALESCE(ce.device, 'Desktop') as device,
  COALESCE(l.user_id, bp.user_id) as owner_id
FROM click_events ce
LEFT JOIN links l ON ce.link_id = l.id
LEFT JOIN bio_profiles bp ON ce.bio_profile_id = bp.id;

-- Create analytics_events_daily view
CREATE VIEW analytics_events_daily AS
SELECT 
  DATE(ce.created_at) as day,
  COUNT(*) as clicks,
  COALESCE(SUM(ce.earned_amount), 0) as earnings,
  COALESCE(SUM(CASE WHEN ce.is_paid THEN 1 ELSE 0 END), 0) as paid_clicks,
  COALESCE(l.user_id, bp.user_id) as owner_id
FROM click_events ce
LEFT JOIN links l ON ce.link_id = l.id
LEFT JOIN bio_profiles bp ON ce.bio_profile_id = bp.id
GROUP BY DATE(ce.created_at), COALESCE(l.user_id, bp.user_id);

-- 3. GRANT PERMISSIONS
GRANT SELECT ON analytics_events TO authenticated;
GRANT SELECT ON analytics_events TO anon;
GRANT SELECT ON analytics_events_daily TO authenticated;
GRANT SELECT ON analytics_events_daily TO anon;

-- 4. ENSURE CLICK_EVENTS HAS ALL REQUIRED COLUMNS
ALTER TABLE click_events ADD COLUMN IF NOT EXISTS earned_amount FLOAT DEFAULT 0;
ALTER TABLE click_events ADD COLUMN IF NOT EXISTS is_paid BOOLEAN DEFAULT false;
ALTER TABLE click_events ADD COLUMN IF NOT EXISTS device TEXT DEFAULT 'Desktop';
ALTER TABLE click_events ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'Unknown';

-- 5. CREATE INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_click_events_created_at ON click_events(created_at);
CREATE INDEX IF NOT EXISTS idx_click_events_link_id ON click_events(link_id);
CREATE INDEX IF NOT EXISTS idx_click_events_ip_time ON click_events(ip_address, created_at);
