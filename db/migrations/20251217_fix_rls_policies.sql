ALTER TABLE click_events DISABLE ROW LEVEL SECURITY;

ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all inserts" ON click_events;
CREATE POLICY "Allow all inserts" ON click_events FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service insert" ON click_events;

DROP POLICY IF EXISTS "Allow owner select" ON click_events;
CREATE POLICY "Allow owner select" ON click_events FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role full access" ON click_events;
CREATE POLICY "Service role full access" ON click_events FOR ALL USING (true) WITH CHECK (true);

GRANT ALL ON click_events TO authenticated;
GRANT ALL ON click_events TO anon;
GRANT ALL ON click_events TO service_role;

ALTER TABLE links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own links" ON links;
CREATE POLICY "Users can view own links" ON links FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own links" ON links;
CREATE POLICY "Users can update own links" ON links FOR UPDATE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Service can update links" ON links;
CREATE POLICY "Service can update links" ON links FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can read links by slug" ON links;
CREATE POLICY "Anyone can read links by slug" ON links FOR SELECT USING (true);

GRANT SELECT ON links TO anon;
GRANT ALL ON links TO authenticated;

ALTER TABLE bio_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read bio_profiles" ON bio_profiles;
CREATE POLICY "Anyone can read bio_profiles" ON bio_profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service can update bio_profiles" ON bio_profiles;
CREATE POLICY "Service can update bio_profiles" ON bio_profiles FOR UPDATE USING (true) WITH CHECK (true);

GRANT SELECT ON bio_profiles TO anon;
GRANT ALL ON bio_profiles TO authenticated;
