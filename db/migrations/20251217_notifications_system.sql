-- ============================================================
-- SISTEMA DE NOTIFICACIONES PROFESIONAL COMPLETO
-- Migración idempotente - se puede ejecutar múltiples veces
-- ============================================================

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can delete own notifications" ON notifications;

-- Crear tabla si no existe
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Eliminar índices si existen antes de crearlos
DROP INDEX IF EXISTS idx_notifications_user_id;
DROP INDEX IF EXISTS idx_notifications_user_read;
DROP INDEX IF EXISTS idx_notifications_created_at;
DROP INDEX IF EXISTS idx_notifications_type;
DROP INDEX IF EXISTS idx_notifications_priority;
DROP INDEX IF EXISTS idx_notifications_user_unread;
DROP INDEX IF EXISTS idx_notifications_user_priority_unread;

-- Crear índices optimizados (sin usar now() que no es IMMUTABLE)
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_priority ON notifications(priority);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, read, created_at DESC) WHERE read = false;
CREATE INDEX idx_notifications_user_priority_unread ON notifications(user_id, priority, read) WHERE read = false;

-- NOTA: No creamos índice con now() porque no es IMMUTABLE
-- Las consultas recientes se pueden hacer con WHERE created_at > 'fecha' en la query

-- Habilitar RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Crear políticas de RLS
CREATE POLICY "Users can view own notifications" 
ON notifications FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" 
ON notifications FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notifications" 
ON notifications FOR DELETE 
USING (auth.uid() = user_id);

-- Eliminar funciones si existen
DROP FUNCTION IF EXISTS cleanup_old_notifications();
DROP FUNCTION IF EXISTS create_notification(UUID, TEXT, TEXT, TEXT, TEXT, JSONB);
DROP FUNCTION IF EXISTS notify_link_click(UUID, TEXT, TEXT, NUMERIC);
DROP FUNCTION IF EXISTS notify_milestone(UUID, TEXT, TEXT, TEXT, TEXT, JSONB);

-- Trigger para limpiar notificaciones antiguas (mantener solo últimas 500 por usuario)
CREATE OR REPLACE FUNCTION cleanup_old_notifications()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM notifications
    WHERE user_id = NEW.user_id
    AND id NOT IN (
        SELECT id FROM notifications
        WHERE user_id = NEW.user_id
        ORDER BY created_at DESC
        LIMIT 500
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Comentar si no quieres limpieza automática
-- DROP TRIGGER IF EXISTS cleanup_notifications_trigger ON notifications;
-- CREATE TRIGGER cleanup_notifications_trigger
-- AFTER INSERT ON notifications
-- FOR EACH ROW
-- EXECUTE FUNCTION cleanup_old_notifications();

-- ============================================================
-- FUNCIONES HELPER PARA CREAR NOTIFICACIONES
-- ============================================================

-- Función genérica para crear notificaciones
CREATE OR REPLACE FUNCTION create_notification(
    p_user_id UUID,
    p_type TEXT,
    p_title TEXT,
    p_message TEXT,
    p_priority TEXT DEFAULT 'medium',
    p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID AS $$
DECLARE
    v_notification_id UUID;
BEGIN
    INSERT INTO notifications (user_id, type, title, message, priority, metadata)
    VALUES (p_user_id, p_type, p_title, p_message, p_priority, p_metadata)
    RETURNING id INTO v_notification_id;
    
    RETURN v_notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para crear notificación de clic en link
CREATE OR REPLACE FUNCTION notify_link_click(
    p_user_id UUID,
    p_link_id TEXT,
    p_link_alias TEXT,
    p_revenue NUMERIC
)
RETURNS UUID AS $$
BEGIN
    RETURN create_notification(
        p_user_id,
        'link_click',
        'Nuevo clic en tu link',
        format('Tu link "%s" recibió un nuevo clic. +€%s', p_link_alias, p_revenue),
        'low',
        jsonb_build_object('link_id', p_link_id, 'link_alias', p_link_alias, 'revenue', p_revenue)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para crear notificación de milestone
CREATE OR REPLACE FUNCTION notify_milestone(
    p_user_id UUID,
    p_type TEXT,
    p_title TEXT,
    p_message TEXT,
    p_priority TEXT DEFAULT 'medium',
    p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID AS $$
BEGIN
    RETURN create_notification(
        p_user_id,
        p_type,
        p_title,
        p_message,
        p_priority,
        p_metadata
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- ELIMINAR VISTAS SI EXISTEN Y RECREARLAS
-- ============================================================

DROP VIEW IF EXISTS notifications_summary;
DROP VIEW IF EXISTS notifications_by_category;

-- Vista de resumen de notificaciones
CREATE VIEW notifications_summary AS
SELECT 
    user_id,
    COUNT(*) as total_notifications,
    COUNT(*) FILTER (WHERE read = false) as unread_count,
    COUNT(*) FILTER (WHERE priority = 'urgent' AND read = false) as urgent_unread,
    COUNT(*) FILTER (WHERE priority = 'high' AND read = false) as high_unread,
    MAX(created_at) as last_notification_at,
    COUNT(*) FILTER (WHERE created_at > now() - interval '24 hours') as last_24h_count
FROM notifications
GROUP BY user_id;

-- Vista de notificaciones agrupadas por categoría
CREATE VIEW notifications_by_category AS
SELECT 
    user_id,
    CASE 
        WHEN type LIKE 'link_%' OR type LIKE 'bio_page_%' THEN 'activity'
        WHEN type LIKE 'revenue_%' OR type LIKE 'payout_%' OR type LIKE 'first_earning%' THEN 'financial'
        WHEN type LIKE 'referral_%' OR type LIKE 'achievement_%' THEN 'social'
        WHEN type LIKE 'security_%' THEN 'security'
        ELSE 'system'
    END as category,
    COUNT(*) as count,
    COUNT(*) FILTER (WHERE read = false) as unread_count
FROM notifications
GROUP BY user_id, category;

-- ============================================================
-- COMENTARIOS Y DOCUMENTACIÓN
-- ============================================================

COMMENT ON TABLE notifications IS 'Sistema completo de notificaciones profesionales para usuarios - 50+ tipos';
COMMENT ON COLUMN notifications.type IS 'Tipo de notificación: link_click, revenue_milestone_100, referral_signup, etc.';
COMMENT ON COLUMN notifications.priority IS 'Prioridad: low, medium, high, urgent';
COMMENT ON COLUMN notifications.metadata IS 'Datos adicionales en formato JSON (link_id, amount, etc.)';
COMMENT ON COLUMN notifications.read_at IS 'Timestamp de cuando se marcó como leída';
