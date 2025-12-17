ALTER TABLE bio_achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own achievements" ON bio_achievements;
CREATE POLICY "Users can view own achievements" ON bio_achievements 
  FOR SELECT USING (
    profile_id IN (SELECT id FROM bio_profiles WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can insert own achievements" ON bio_achievements;
CREATE POLICY "Users can insert own achievements" ON bio_achievements 
  FOR INSERT WITH CHECK (
    profile_id IN (SELECT id FROM bio_profiles WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can update own achievements" ON bio_achievements;
CREATE POLICY "Users can update own achievements" ON bio_achievements 
  FOR UPDATE USING (
    profile_id IN (SELECT id FROM bio_profiles WHERE user_id = auth.uid())
  );

GRANT SELECT, INSERT, UPDATE ON bio_achievements TO authenticated;
