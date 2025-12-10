-- ============================================================
-- LINKPAY SETTINGS - SUPABASE SQL MIGRATIONS
-- ============================================================
-- Copia y pega este código en el SQL Editor de Supabase
-- Dashboard > SQL Editor > New Query > Pegar > Run
-- ============================================================

-- ============================================================
-- 1. PREFERENCIAS DE USUARIO EN TABLA PROFILES
-- ============================================================
-- Añade columnas para guardar preferencias de tema y notificaciones

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS theme_preference VARCHAR(10) DEFAULT 'dark',
ADD COLUMN IF NOT EXISTS accent_color VARCHAR(10) DEFAULT '#3b82f6',
ADD COLUMN IF NOT EXISTS notifications_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS weekly_summary_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS bio_public BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS hide_public_stats BOOLEAN DEFAULT false;

-- Comentarios para documentación
COMMENT ON COLUMN profiles.theme_preference IS 'Preferencia de tema: light, dark, system';
COMMENT ON COLUMN profiles.accent_color IS 'Color de acento principal en formato hex';
COMMENT ON COLUMN profiles.notifications_enabled IS 'Notificaciones de actividad activadas';
COMMENT ON COLUMN profiles.weekly_summary_enabled IS 'Resumen semanal por email activado';
COMMENT ON COLUMN profiles.bio_public IS 'Página de bio visible públicamente';
COMMENT ON COLUMN profiles.hide_public_stats IS 'Ocultar estadísticas en página pública';

-- ============================================================
-- 2. TABLA DE SESIONES ACTIVAS
-- ============================================================
-- Para mostrar dispositivos conectados y permitir cerrar sesiones

CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_token TEXT NOT NULL,
    device_name TEXT,
    device_type TEXT, -- 'desktop', 'mobile', 'tablet'
    browser TEXT,
    os TEXT,
    ip_address INET,
    location TEXT,
    is_current BOOLEAN DEFAULT false,
    last_active_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    expires_at TIMESTAMPTZ
);

-- Índices para búsquedas eficientes
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_last_active ON user_sessions(last_active_at);

-- RLS: Solo el usuario puede ver sus propias sesiones
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions" 
ON user_sessions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" 
ON user_sessions FOR DELETE 
USING (auth.uid() = user_id);

-- ============================================================
-- 3. TABLA DE API KEYS
-- ============================================================
-- Para integraciones externas con la API de LinkPay

CREATE TABLE IF NOT EXISTS api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    key_hash TEXT NOT NULL, -- Hash del API key (nunca guardamos el key en texto plano)
    key_prefix TEXT NOT NULL, -- Primeros 8 caracteres para identificación (ej: "lp_live_")
    permissions TEXT[] DEFAULT ARRAY['read'], -- 'read', 'write', 'admin'
    last_used_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_key_prefix ON api_keys(key_prefix);

ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own API keys" 
ON api_keys FOR ALL 
USING (auth.uid() = user_id);

-- ============================================================
-- 4. TABLA DE WEBHOOKS
-- ============================================================
-- Para enviar eventos a URLs externas

CREATE TABLE IF NOT EXISTS webhooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    secret TEXT, -- Para firmar los payloads
    events TEXT[] DEFAULT ARRAY['link.clicked'], -- 'link.clicked', 'link.created', 'payout.processed'
    is_active BOOLEAN DEFAULT true,
    last_triggered_at TIMESTAMPTZ,
    failure_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_webhooks_user_id ON webhooks(user_id);

ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own webhooks" 
ON webhooks FOR ALL 
USING (auth.uid() = user_id);

-- ============================================================
-- 5. TABLA DE INTEGRACIONES
-- ============================================================
-- Para conectar redes sociales y analytics

CREATE TABLE IF NOT EXISTS user_integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL, -- 'google_analytics', 'facebook_pixel', 'tiktok_pixel', 'instagram', 'youtube'
    provider_user_id TEXT,
    access_token TEXT,
    refresh_token TEXT,
    metadata JSONB DEFAULT '{}', -- Para guardar tracking IDs, etc
    is_connected BOOLEAN DEFAULT true,
    connected_at TIMESTAMPTZ DEFAULT now(),
    expires_at TIMESTAMPTZ,
    
    UNIQUE(user_id, provider)
);

CREATE INDEX IF NOT EXISTS idx_user_integrations_user_id ON user_integrations(user_id);

ALTER TABLE user_integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own integrations" 
ON user_integrations FOR ALL 
USING (auth.uid() = user_id);

-- ============================================================
-- 6. FUNCIÓN RPC: ELIMINAR CUENTA
-- ============================================================
-- Elimina todos los datos del usuario de forma segura

CREATE OR REPLACE FUNCTION delete_user_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    current_user_id UUID;
BEGIN
    -- Obtener el ID del usuario actual
    current_user_id := auth.uid();
    
    IF current_user_id IS NULL THEN
        RAISE EXCEPTION 'No authenticated user';
    END IF;
    
    -- Eliminar datos en orden (respetando foreign keys)
    DELETE FROM webhooks WHERE user_id = current_user_id;
    DELETE FROM api_keys WHERE user_id = current_user_id;
    DELETE FROM user_integrations WHERE user_id = current_user_id;
    DELETE FROM user_sessions WHERE user_id = current_user_id;
    DELETE FROM notifications WHERE user_id = current_user_id;
    DELETE FROM bio_links WHERE profile_id IN (SELECT id FROM bio_profiles WHERE user_id = current_user_id);
    DELETE FROM bio_profiles WHERE user_id = current_user_id;
    DELETE FROM links WHERE user_id = current_user_id;
    DELETE FROM profiles WHERE id = current_user_id;
    
    -- Nota: La eliminación del usuario de auth.users debe hacerse via API de Supabase
    -- desde el backend con service_role key
END;
$$;

-- ============================================================
-- 7. FUNCIÓN RPC: OBTENER SESIONES ACTIVAS
-- ============================================================

CREATE OR REPLACE FUNCTION get_active_sessions()
RETURNS TABLE (
    id UUID,
    device_name TEXT,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    location TEXT,
    is_current BOOLEAN,
    last_active_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id,
        s.device_name,
        s.device_type,
        s.browser,
        s.os,
        s.location,
        s.is_current,
        s.last_active_at,
        s.created_at
    FROM user_sessions s
    WHERE s.user_id = auth.uid()
    AND (s.expires_at IS NULL OR s.expires_at > now())
    ORDER BY s.last_active_at DESC;
END;
$$;

-- ============================================================
-- 8. FUNCIÓN RPC: REVOCAR SESIÓN
-- ============================================================

CREATE OR REPLACE FUNCTION revoke_session(session_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM user_sessions 
    WHERE id = session_id 
    AND user_id = auth.uid();
    
    RETURN FOUND;
END;
$$;

-- ============================================================
-- 9. FUNCIÓN RPC: ACTUALIZAR PREFERENCIAS
-- ============================================================

CREATE OR REPLACE FUNCTION update_user_preferences(
    p_theme_preference TEXT DEFAULT NULL,
    p_accent_color TEXT DEFAULT NULL,
    p_notifications_enabled BOOLEAN DEFAULT NULL,
    p_weekly_summary_enabled BOOLEAN DEFAULT NULL,
    p_bio_public BOOLEAN DEFAULT NULL,
    p_hide_public_stats BOOLEAN DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE profiles SET
        theme_preference = COALESCE(p_theme_preference, theme_preference),
        accent_color = COALESCE(p_accent_color, accent_color),
        notifications_enabled = COALESCE(p_notifications_enabled, notifications_enabled),
        weekly_summary_enabled = COALESCE(p_weekly_summary_enabled, weekly_summary_enabled),
        bio_public = COALESCE(p_bio_public, bio_public),
        hide_public_stats = COALESCE(p_hide_public_stats, hide_public_stats),
        updated_at = now()
    WHERE id = auth.uid();
    
    RETURN FOUND;
END;
$$;

-- ============================================================
-- 10. GRANTS PARA FUNCIONES RPC
-- ============================================================

GRANT EXECUTE ON FUNCTION delete_user_account() TO authenticated;
GRANT EXECUTE ON FUNCTION get_active_sessions() TO authenticated;
GRANT EXECUTE ON FUNCTION revoke_session(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION update_user_preferences(TEXT, TEXT, BOOLEAN, BOOLEAN, BOOLEAN, BOOLEAN) TO authenticated;

-- ============================================================
-- ¡LISTO! 
-- Ahora puedes usar estas tablas y funciones desde el frontend
-- ============================================================
