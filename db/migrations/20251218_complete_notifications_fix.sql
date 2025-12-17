-- ============================================================
-- 🔧 ARREGLO COMPLETO DEL SISTEMA DE NOTIFICACIONES
-- Ejecuta TODO este script en Supabase SQL Editor
-- ============================================================

-- 1. ASEGURAR RLS ESTÁ HABILITADO
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 2. ELIMINAR POLÍTICAS ANTIGUAS Y CREAR NUEVAS
DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can insert own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can delete own notifications" ON public.notifications;
DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;
DROP POLICY IF EXISTS "Enable read for users based on user_id" ON public.notifications;
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON public.notifications;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON public.notifications;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON public.notifications;

-- 3. CREAR POLÍTICAS CORRECTAS
-- Política SELECT: usuarios ven sus propias notificaciones
CREATE POLICY "notifications_select_own"
  ON public.notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Política INSERT: usuarios pueden insertar para sí mismos
CREATE POLICY "notifications_insert_own"
  ON public.notifications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Política UPDATE: usuarios pueden actualizar sus propias notificaciones
CREATE POLICY "notifications_update_own"
  ON public.notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Política DELETE: usuarios pueden eliminar sus propias notificaciones
CREATE POLICY "notifications_delete_own"
  ON public.notifications FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 4. POLÍTICA ESPECIAL: Permitir que service_role inserte para cualquiera
CREATE POLICY "notifications_service_insert"
  ON public.notifications FOR INSERT
  TO service_role
  WITH CHECK (true);

-- 5. ASEGURAR REALTIME ESTÁ HABILITADO
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- 6. PERMISOS GRANT
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;

-- ============================================================
-- 7. LIMPIAR NOTIFICACIONES EXISTENTES (OPCIONAL - descomenta si quieres)
-- ============================================================
-- DELETE FROM notifications;

-- ============================================================
-- 8. INSERTAR 50+ NOTIFICACIONES VARIADAS PARA CADA USUARIO
-- ============================================================

-- Primero eliminar las de prueba anteriores para evitar duplicados
DELETE FROM notifications WHERE metadata->>'broadcast' = 'true';

-- Insertar notificaciones variadas para todos los usuarios con perfil
INSERT INTO notifications (user_id, type, title, message, priority, read, metadata, created_at)
SELECT 
  p.id,
  n.type,
  n.title,
  n.message,
  n.priority,
  false,
  n.metadata::jsonb,
  NOW() - (n.hours_ago || ' hours')::interval
FROM profiles p
CROSS JOIN (VALUES
  -- ============================================================
  -- 💰 INGRESOS Y PAGOS (Verde/Dorado) - Las más importantes
  -- ============================================================
  ('first_earning', '💰 ¡Tu primera ganancia!', 'Has ganado €0.003 con tu primer clic verificado. ¡El comienzo de algo increíble!', 'high', '{"amount": 0.003}', 2),
  ('revenue_milestone_1', '🎯 ¡Milestone: €1 alcanzado!', 'Tu balance total superó €1. ¡Vas por el camino correcto!', 'high', '{"milestone": 1}', 5),
  ('revenue_milestone_5', '🎯 ¡Milestone: €5 alcanzados!', 'Has acumulado €5 en ganancias totales. ¡Increíble progreso!', 'high', '{"milestone": 5}', 12),
  ('payout_available', '💸 Retiro disponible', 'Tu balance de €10+ está listo para retirar. Ve a Pagos para solicitar tu dinero.', 'high', '{"amount": 10.50}', 8),
  ('payout_processed', '✅ Retiro procesado', 'Tu retiro de €15.00 ha sido enviado a tu cuenta. Llegará en 24-48h.', 'high', '{"amount": 15}', 24),
  ('daily_earnings_record', '📈 ¡Récord diario!', 'Ganaste €2.50 hoy - tu mejor día hasta ahora. ¡Sigue así!', 'high', '{"amount": 2.50}', 6),
  
  -- ============================================================
  -- 🔐 SEGURIDAD (Rojo) - Urgentes
  -- ============================================================
  ('security_new_login', '🔐 Nuevo inicio de sesión', 'Detectamos un login desde Chrome en MacOS (Madrid, España). Si no fuiste tú, cambia tu contraseña.', 'medium', '{"device": "Chrome", "location": "Madrid"}', 3),
  ('security_password_changed', '🔒 Contraseña actualizada', 'Tu contraseña fue cambiada exitosamente. Si no hiciste este cambio, contacta soporte.', 'high', '{}', 48),
  
  -- ============================================================
  -- 👥 REFERIDOS (Morado) - Muy motivantes
  -- ============================================================
  ('referral_signup', '👥 ¡Nuevo referido!', 'Alguien se registró usando tu enlace. Ganarás el 10% de todas sus ganancias.', 'high', '{}', 4),
  ('referral_earnings', '💜 Comisión de referido', 'Ganaste €0.15 de las ganancias de tu referido. ¡El dinero pasivo es real!', 'high', '{"amount": 0.15}', 7),
  ('referral_first_earning', '🎉 Tu referido hizo su primera ganancia', 'Tu referido acaba de ganar su primer €. Eso significa comisiones para ti.', 'high', '{}', 10),
  
  -- ============================================================
  -- 🔥 VIRAL Y TRENDING (Rosa) - Celebraciones
  -- ============================================================
  ('link_viral', '🔥 ¡Tu link se volvió VIRAL!', 'Tu link recibió +500 clics en las últimas 24h. ¡Estás en llamas!', 'urgent', '{"clicks": 543}', 1),
  ('link_top_performer_day', '🏆 Top Link del Día', 'Tu link fue el que más ganó hoy en toda la plataforma. ¡Felicidades campeón!', 'high', '{}', 14),
  ('link_trending', '📈 Link en tendencia', 'Tu link está recibiendo más clics de lo habitual. ¡Aprovecha el momento!', 'high', '{}', 9),
  
  -- ============================================================
  -- 🏆 LOGROS Y ACHIEVEMENTS (Dorado)
  -- ============================================================
  ('achievement_first_link', '🏆 Logro: Primer Link', 'Creaste tu primer link monetizado. ¡Bienvenido oficialmente a LinkPay!', 'medium', '{}', 72),
  ('achievement_10_links', '🏆 Logro: 10 Links', 'Ya tienes 10 links activos. ¡Eres un creador prolífico!', 'medium', '{}', 36),
  ('achievement_100_clicks', '🏆 Logro: 100 Clics', 'Tus links han recibido 100 clics en total. ¡El momentum crece!', 'medium', '{}', 20),
  ('streak_bonus', '🔥 Bonus por racha', 'Llevas 7 días seguidos con actividad. +€0.10 bonus desbloqueado.', 'medium', '{"days": 7, "bonus": 0.10}', 11),
  ('achievement_first_payout', '🏆 Logro: Primer Retiro', 'Solicitaste tu primer retiro. ¡El dinero real está en camino!', 'high', '{}', 25),
  
  -- ============================================================
  -- 🚀 SISTEMA Y ANUNCIOS (Azul)
  -- ============================================================
  ('welcome', '🎉 ¡Bienvenido a LinkPay!', 'Gracias por unirte. Crea tu primer link, compártelo, y empieza a ganar dinero con cada clic.', 'high', '{}', 96),
  ('announcement', '🚀 LinkPay 2.0 está aquí', 'Nuevas notificaciones en tiempo real, push al móvil, colores por categoría y más. ¡Disfruta!', 'high', '{"version": "2.0", "broadcast": true}', 1),
  ('new_feature', '✨ Nueva función: Analytics Geo', 'Ahora puedes ver de qué países vienen tus clics. Ve a Analytics para explorar.', 'medium', '{}', 30),
  ('push_enabled', '🔔 Push activado', 'Recibirás notificaciones importantes directamente en tu dispositivo.', 'low', '{}', 2),
  ('system_update', '🛠️ Mantenimiento completado', 'Hemos mejorado la velocidad de carga. Todo funciona más rápido ahora.', 'low', '{}', 50),
  
  -- ============================================================
  -- 👆 ACTIVIDAD DE LINKS (Cyan) - Frecuentes
  -- ============================================================
  ('link_created', '🔗 Link creado', 'Tu nuevo link está listo. Copia y compártelo para empezar a ganar.', 'low', '{}', 18),
  ('link_click', '👆 Nuevo clic', 'Tu link recibió un clic desde España (móvil). +€0.0025', 'low', '{"country": "ES", "device": "mobile", "earnings": 0.0025}', 0.5),
  ('link_click', '👆 Nuevo clic', 'Tu link recibió un clic desde México (desktop). +€0.0018', 'low', '{"country": "MX", "device": "desktop", "earnings": 0.0018}', 1),
  ('link_click', '👆 Nuevo clic', 'Tu link recibió un clic desde Argentina (móvil). +€0.0015', 'low', '{"country": "AR", "device": "mobile", "earnings": 0.0015}', 1.5),
  ('link_first_click', '🎯 ¡Primer clic!', 'Tu link acaba de recibir su primer clic. ¡Está funcionando!', 'medium', '{}', 15),
  ('link_new_country', '🌍 Nuevo país: Colombia', 'Tu link recibió su primer clic desde Colombia. ¡Tu alcance crece!', 'low', '{}', 16),
  ('link_new_country', '🌍 Nuevo país: Chile', 'Primer clic desde Chile. ¡Estás llegando a más lugares!', 'low', '{}', 22),
  ('link_milestone_10', '📊 10 clics alcanzados', 'Tu link llegó a 10 clics. ¡Buen comienzo!', 'low', '{}', 13),
  ('link_milestone_50', '📊 50 clics alcanzados', 'Tu link superó 50 clics. ¡Está ganando tracción!', 'medium', '{}', 17),
  ('link_milestone_100', '📊 100 clics alcanzados', 'Tu link llegó a 100 clics. ¡Ya eres un pro!', 'medium', '{}', 28),
  
  -- ============================================================
  -- 📄 BIO PAGES (Cyan)
  -- ============================================================
  ('bio_page_view', '👁️ Tu BioPage fue vista', 'Alguien visitó tu página de bio. +1 visita.', 'low', '{}', 3),
  ('bio_page_milestone_10', '📄 10 visitas en BioPage', 'Tu BioPage alcanzó 10 visitas. ¡La gente te encuentra!', 'low', '{}', 21),
  ('bio_page_link_click', '👆 Clic en BioPage', 'Alguien hizo clic en uno de tus links desde tu BioPage.', 'low', '{}', 4),
  
  -- ============================================================
  -- 💡 TIPS Y CONSEJOS (Gris) - Educativos
  -- ============================================================
  ('tip_of_the_day', '💡 Tip: Usa Stories', 'Los links en Stories de Instagram generan 3x más clics. ¡Pruébalo!', 'low', '{}', 8),
  ('tip_of_the_day', '💡 Tip: Horarios pico', 'Los mejores horarios para compartir son 12-14h y 20-22h.', 'low', '{}', 32),
  ('tip_of_the_day', '💡 Tip: Descripción atractiva', 'Añade emojis y un call-to-action a tus links para más clics.', 'low', '{}', 56),
  ('tip_of_the_day', '💡 Tip: Múltiples plataformas', 'Comparte en Twitter, TikTok, e Instagram para maximizar alcance.', 'low', '{}', 80),
  ('daily_summary', '📊 Resumen del día', 'Hoy: 15 clics, €0.04 ganados. ¡Buen trabajo!', 'low', '{"clicks": 15, "earnings": 0.04}', 12),
  ('weekly_summary', '📊 Resumen semanal', 'Esta semana: 87 clics, €0.22 ganados. +45% vs semana pasada.', 'medium', '{"clicks": 87, "earnings": 0.22}', 168),
  
  -- ============================================================
  -- 🎮 GAMIFICACIÓN (Variados)
  -- ============================================================
  ('daily_bonus_claimed', '🎁 Bonus diario reclamado', 'Has reclamado tu bonus de €0.01 por entrar hoy. ¡Vuelve mañana!', 'low', '{"bonus": 0.01}', 6),
  ('level_up', '⬆️ ¡Subiste de nivel!', 'Ahora eres nivel 3: "Creador Emergente". Nuevas ventajas desbloqueadas.', 'medium', '{"level": 3}', 40),
  ('badge_earned', '🏅 Nueva insignia', 'Desbloqueaste la insignia "Madrugador" por crear links antes de las 8am.', 'low', '{}', 60),
  
  -- ============================================================
  -- ⚠️ ALERTAS Y AVISOS
  -- ============================================================
  ('link_expiring', '⏰ Link por expirar', 'Tu link "oferta-black" expira en 24h. Renuévalo si quieres mantenerlo activo.', 'medium', '{}', 26),
  ('low_activity', '📉 Actividad baja', 'Tus links no han recibido clics en 3 días. ¡Comparte para reactivar!', 'low', '{}', 75)

) AS n(type, title, message, priority, metadata, hours_ago);

-- ============================================================
-- 9. VERIFICAR QUE TODO ESTÁ CORRECTO
-- ============================================================
SELECT 'Notificaciones insertadas:' as status, COUNT(*) as total FROM notifications;
SELECT 'Por usuario:' as status, user_id, COUNT(*) as total FROM notifications GROUP BY user_id;
