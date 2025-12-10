-- =============================================================================
-- MIGRACIÓN BIOPAGES: Fases 2 y 3
-- Ejecutar en Supabase SQL Editor
-- =============================================================================

-- ============================================
-- FASE 2: Link Scheduling
-- ============================================

-- Añadir campos de programación a bio_links
ALTER TABLE bio_links 
ADD COLUMN IF NOT EXISTS visible_from TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS visible_until TIMESTAMPTZ;

-- Índice para consultas de visibilidad
CREATE INDEX IF NOT EXISTS idx_bio_links_visibility 
ON bio_links(visible_from, visible_until) 
WHERE visible_from IS NOT NULL OR visible_until IS NOT NULL;

-- ============================================
-- FASE 3: Gamificación
-- ============================================

-- Crear tabla de badges/logros
CREATE TABLE IF NOT EXISTS bio_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES bio_profiles(id) ON DELETE CASCADE,
    badge_type TEXT NOT NULL, -- 'first_link', 'first_100_clicks', 'earning_machine', etc.
    earned_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(profile_id, badge_type)
);

-- Habilitar RLS
ALTER TABLE bio_achievements ENABLE ROW LEVEL SECURITY;

-- Política de lectura pública de achievements
CREATE POLICY "bio_achievements_select" ON bio_achievements
    FOR SELECT USING (true);

-- Política de insert solo para el owner
CREATE POLICY "bio_achievements_insert" ON bio_achievements
    FOR INSERT WITH CHECK (
        profile_id IN (SELECT id FROM bio_profiles WHERE user_id = auth.uid())
    );

-- Añadir campo de nivel/puntos al perfil
ALTER TABLE bio_profiles
ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS xp INTEGER DEFAULT 0;

-- ============================================
-- FUNCIONES AUXILIARES
-- ============================================

-- Función para verificar y otorgar achievements automáticamente
CREATE OR REPLACE FUNCTION check_bio_achievements(p_profile_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_links_count INTEGER;
    v_total_clicks INTEGER;
    v_earnings NUMERIC;
BEGIN
    -- Contar enlaces
    SELECT COUNT(*) INTO v_links_count 
    FROM bio_links WHERE profile_id = p_profile_id;
    
    -- Sumar clicks
    SELECT COALESCE(SUM(clicks), 0) INTO v_total_clicks 
    FROM bio_links WHERE profile_id = p_profile_id;
    
    -- Obtener earnings
    SELECT COALESCE(earnings, 0) INTO v_earnings 
    FROM bio_profiles WHERE id = p_profile_id;
    
    -- First Link Achievement
    IF v_links_count >= 1 THEN
        INSERT INTO bio_achievements (profile_id, badge_type)
        VALUES (p_profile_id, 'first_link')
        ON CONFLICT (profile_id, badge_type) DO NOTHING;
    END IF;
    
    -- 5 Links Achievement
    IF v_links_count >= 5 THEN
        INSERT INTO bio_achievements (profile_id, badge_type)
        VALUES (p_profile_id, 'link_builder')
        ON CONFLICT (profile_id, badge_type) DO NOTHING;
    END IF;
    
    -- 100 Clicks Achievement
    IF v_total_clicks >= 100 THEN
        INSERT INTO bio_achievements (profile_id, badge_type)
        VALUES (p_profile_id, 'first_100_clicks')
        ON CONFLICT (profile_id, badge_type) DO NOTHING;
    END IF;
    
    -- 1000 Clicks Achievement
    IF v_total_clicks >= 1000 THEN
        INSERT INTO bio_achievements (profile_id, badge_type)
        VALUES (p_profile_id, 'viral')
        ON CONFLICT (profile_id, badge_type) DO NOTHING;
    END IF;
    
    -- First Dollar Achievement
    IF v_earnings >= 1 THEN
        INSERT INTO bio_achievements (profile_id, badge_type)
        VALUES (p_profile_id, 'first_dollar')
        ON CONFLICT (profile_id, badge_type) DO NOTHING;
    END IF;
    
    -- Earning Machine (10$)
    IF v_earnings >= 10 THEN
        INSERT INTO bio_achievements (profile_id, badge_type)
        VALUES (p_profile_id, 'earning_machine')
        ON CONFLICT (profile_id, badge_type) DO NOTHING;
    END IF;
END;
$$;

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Ejecuta esto para verificar que todo está correcto:

-- SELECT column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'bio_links' 
-- AND column_name IN ('visible_from', 'visible_until');

-- SELECT column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'bio_profiles' 
-- AND column_name IN ('show_views', 'level', 'xp');

-- SELECT table_name FROM information_schema.tables 
-- WHERE table_name = 'bio_achievements';
