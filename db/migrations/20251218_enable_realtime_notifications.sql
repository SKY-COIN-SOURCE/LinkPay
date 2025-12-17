-- ============================================================
-- ENABLE REALTIME REPLICATION FOR NOTIFICATIONS TABLE
-- This is CRITICAL for real-time notifications to work
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Enable realtime on the notifications table
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- 2. Ensure RLS is enabled but allows realtime triggers
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 3. Policy for users to see their own notifications in realtime
DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 4. Policy for system to insert notifications
DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;
CREATE POLICY "System can insert notifications"
  ON public.notifications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 5. Policy for users to update their own notifications (mark as read)
DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 6. Policy for users to delete their own notifications
DROP POLICY IF EXISTS "Users can delete own notifications" ON public.notifications;
CREATE POLICY "Users can delete own notifications"
  ON public.notifications FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 7. Grant REPLICA permission for realtime to work
GRANT SELECT ON public.notifications TO anon, authenticated;

-- ============================================================
-- TEST: Insert sample notifications with different types
-- Replace 'YOUR_USER_ID' with your actual user ID from auth.users
-- ============================================================

-- Get your user ID first:
-- SELECT id, email FROM auth.users LIMIT 5;

-- Then run these with your actual user_id:
/*
INSERT INTO notifications (user_id, type, title, message, priority, read, metadata) VALUES
-- INGRESOS (Verde/Dorado)
('YOUR_USER_ID', 'first_earning', '💰 ¡Primera ganancia!', 'Has ganado €0.05 con tu primer clic. ¡El comienzo de algo grande!', 'high', false, '{}'),
('YOUR_USER_ID', 'revenue_milestone_1', '🎯 ¡€1 alcanzado!', 'Tu balance total ha llegado a €1. ¡Sigue así!', 'high', false, '{}'),

-- SEGURIDAD (Rojo)
('YOUR_USER_ID', 'security_new_login', '🔐 Nuevo inicio de sesión', 'Se detectó un nuevo login desde Chrome en MacOS.', 'medium', false, '{}'),

-- REFERIDOS (Morado)
('YOUR_USER_ID', 'referral_signup', '👥 ¡Nuevo referido!', 'María se unió usando tu enlace. Ganarás comisiones de sus ganancias.', 'high', false, '{}'),

-- VIRAL (Rosa)
('YOUR_USER_ID', 'link_viral', '🔥 ¡Tu link se volvió viral!', 'Tu link "mi-promo" superó 500 clics en 24h. ¡Increíble!', 'urgent', false, '{}'),

-- LOGROS (Dorado)
('YOUR_USER_ID', 'achievement_first_link', '🏆 Logro desbloqueado', 'Creaste tu primer link. ¡Bienvenido a LinkPay!', 'medium', false, '{}'),

-- SISTEMA (Azul)
('YOUR_USER_ID', 'announcement', '🚀 ¡Bienvenido a LinkPay 2.0!', 'Hemos lanzado notificaciones en tiempo real, push al móvil, y más.', 'high', false, '{}'),

-- ACTIVIDAD (Cyan)
('YOUR_USER_ID', 'link_click', '👆 Nuevo clic', 'Tu link recibió un clic desde España (móvil). +€0.003', 'low', false, '{}'),

-- TIPS (Gris)
('YOUR_USER_ID', 'tip_of_the_day', '💡 Consejo del día', 'Comparte tus links en Stories para más alcance.', 'low', false, '{}');
*/

-- ============================================================
-- VERIFY REALTIME IS ENABLED
-- ============================================================
SELECT schemaname, tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime';

-- Should show: public | notifications
