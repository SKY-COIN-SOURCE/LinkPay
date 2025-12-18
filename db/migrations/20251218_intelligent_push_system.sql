-- ════════════════════════════════════════════════════════════════
-- 🧠 SISTEMA INTELIGENTE DE PUSH NOTIFICATIONS
-- Resúmenes siempre + eventos importantes + variedad de mensajes
-- ════════════════════════════════════════════════════════════════

-- TABLA: Cola de push pendientes
CREATE TABLE IF NOT EXISTS push_notification_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  priority TEXT DEFAULT 'medium',
  type TEXT NOT NULL,
  scheduled_at TIMESTAMP DEFAULT NOW(),
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_push_queue_pending 
ON push_notification_queue(user_id, sent_at) WHERE sent_at IS NULL;

GRANT ALL ON push_notification_queue TO authenticated;
GRANT ALL ON push_notification_queue TO anon;

-- ════════════════════════════════════════════════════════════════
-- FUNCIÓN: Generar resumen diario inteligente (SIEMPRE se envía)
-- ════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION generate_daily_push_summary()
RETURNS INT LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  u RECORD;
  today_clicks BIGINT;
  today_earnings NUMERIC;
  messages TEXT[];
  selected_msg TEXT;
  count_queued INT := 0;
BEGIN
  messages := ARRAY[
    '📊 Hoy: {clicks} clics, €{earnings}. ¿Mañana más?',
    '💰 €{earnings} ganados hoy con {clicks} clics. ¡Bien hecho!',
    '🔥 {clicks} personas vieron tu contenido hoy. €{earnings} ganados.',
    '📈 Resumen del día: {clicks} clics = €{earnings}. ¡Sigue así!',
    '🎯 Tu día en LinkPay: {clicks} visitas, €{earnings} en tu bolsillo.',
    '✨ Hoy conseguiste {clicks} clics y €{earnings}. ¡Mañana más!',
    '💪 {clicks} clics hoy. {earnings}€ más cerca de tu próximo retiro.',
    '🌟 Otro día productivo: {clicks} clics, €{earnings} ganados.'
  ];
  
  FOR u IN 
    SELECT p.id, p.username, ps.endpoint 
    FROM profiles p 
    JOIN push_subscriptions ps ON ps.user_id = p.id 
  LOOP
    SELECT COALESCE(SUM(views), 0), COALESCE(SUM(earnings), 0)
    INTO today_clicks, today_earnings
    FROM links 
    WHERE user_id = u.id 
    AND created_at >= CURRENT_DATE;
    
    IF today_clicks > 0 OR today_earnings > 0 OR NOT EXISTS (
      SELECT 1 FROM push_notification_queue 
      WHERE user_id = u.id AND type = 'daily_summary' 
      AND created_at > NOW() - INTERVAL '7 days'
    ) THEN
      selected_msg := messages[1 + floor(random() * array_length(messages, 1))::int];
      selected_msg := REPLACE(selected_msg, '{clicks}', today_clicks::text);
      selected_msg := REPLACE(selected_msg, '{earnings}', ROUND(today_earnings::numeric, 2)::text);
      
      INSERT INTO push_notification_queue (user_id, title, body, priority, type)
      VALUES (u.id, '📊 Tu resumen del día', selected_msg, 'medium', 'daily_summary');
      count_queued := count_queued + 1;
    END IF;
  END LOOP;
  
  RETURN count_queued;
END;
$$;

-- ════════════════════════════════════════════════════════════════
-- FUNCIÓN: Generar push de eventos importantes
-- ════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION generate_important_push()
RETURNS INT LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  u RECORD;
  top_link RECORD;
  total_earnings NUMERIC;
  count_queued INT := 0;
  viral_messages TEXT[];
  payout_messages TEXT[];
  msg TEXT;
BEGIN
  viral_messages := ARRAY[
    '🔥 ¡"{link}" está on fire! {clicks} clics y subiendo',
    '🚀 ¡Viral! "{link}" llegó a {clicks} clics',
    '📈 ¡Boom! {clicks} clics en "{link}". ¡Sigue compartiéndolo!',
    '🌟 "{link}" es tendencia: {clicks} clics. ¡No pares!'
  ];
  
  payout_messages := ARRAY[
    '💰 ¡Ya tienes €{amount}! Puedes solicitar tu retiro',
    '🎉 €{amount} listos para retirar. ¡Entra y cobra!',
    '🏆 Felicidades, €{amount} en tu cuenta. ¿Los retiras?',
    '💵 Tu balance llegó a €{amount}. ¡Hora de cobrar!'
  ];
  
  FOR u IN 
    SELECT p.id, p.username, ps.endpoint 
    FROM profiles p 
    JOIN push_subscriptions ps ON ps.user_id = p.id 
  LOOP
    SELECT l.id, l.title, l.slug, l.views, l.earnings
    INTO top_link
    FROM links l
    WHERE l.user_id = u.id AND l.views >= 100
    ORDER BY l.views DESC LIMIT 1;
    
    IF top_link.id IS NOT NULL THEN
      IF NOT EXISTS (
        SELECT 1 FROM push_notification_queue 
        WHERE user_id = u.id AND type = 'viral_link' 
        AND created_at > NOW() - INTERVAL '12 hours'
      ) THEN
        msg := viral_messages[1 + floor(random() * array_length(viral_messages, 1))::int];
        msg := REPLACE(msg, '{link}', COALESCE(top_link.title, top_link.slug));
        msg := REPLACE(msg, '{clicks}', top_link.views::text);
        
        INSERT INTO push_notification_queue (user_id, title, body, priority, type)
        VALUES (u.id, '🔥 ¡Link viral!', msg, 'high', 'viral_link');
        count_queued := count_queued + 1;
      END IF;
    END IF;
    
    SELECT COALESCE(SUM(earnings), 0) INTO total_earnings FROM links WHERE user_id = u.id;
    
    IF total_earnings >= 10 THEN
      IF NOT EXISTS (
        SELECT 1 FROM push_notification_queue 
        WHERE user_id = u.id AND type = 'payout_ready' 
        AND created_at > NOW() - INTERVAL '7 days'
      ) THEN
        msg := payout_messages[1 + floor(random() * array_length(payout_messages, 1))::int];
        msg := REPLACE(msg, '{amount}', ROUND(total_earnings::numeric, 2)::text);
        
        INSERT INTO push_notification_queue (user_id, title, body, priority, type)
        VALUES (u.id, '💰 ¡Retiro disponible!', msg, 'urgent', 'payout_ready');
        count_queued := count_queued + 1;
      END IF;
    END IF;
  END LOOP;
  
  RETURN count_queued;
END;
$$;

-- ════════════════════════════════════════════════════════════════
-- FUNCIÓN: Generar push de re-engagement
-- ════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION generate_reengagement_push()
RETURNS INT LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  u RECORD;
  days_inactive INT;
  earnings NUMERIC;
  count_queued INT := 0;
  messages TEXT[];
  msg TEXT;
BEGIN
  messages := ARRAY[
    '👋 {name}, te echamos de menos. €{earnings} te esperan.',
    '🌟 ¡Hola {name}! Han pasado {days} días. €{earnings} acumulados.',
    '💰 {name}, tienes €{earnings}. ¿Vuelves a compartir links?',
    '🚀 {name}, tus links siguen trabajando. €{earnings} ganados.',
    '🔔 {name}, hace {days} días que no te vemos. ¡Tus fans te extrañan!'
  ];
  
  FOR u IN 
    SELECT p.id, p.username, p.email, ps.endpoint,
           EXTRACT(DAY FROM NOW() - COALESCE(p.last_active_at, p.created_at))::int as days_away
    FROM profiles p 
    JOIN push_subscriptions ps ON ps.user_id = p.id 
    WHERE p.last_active_at < NOW() - INTERVAL '3 days'
       OR (p.last_active_at IS NULL AND p.created_at < NOW() - INTERVAL '3 days')
  LOOP
    days_inactive := COALESCE(u.days_away, 3);
    
    IF NOT EXISTS (
      SELECT 1 FROM push_notification_queue 
      WHERE user_id = u.id AND type = 'reengagement' 
      AND created_at > NOW() - INTERVAL '3 days'
    ) THEN
      SELECT COALESCE(SUM(l.earnings), 0) INTO earnings FROM links l WHERE l.user_id = u.id;
      
      msg := messages[1 + floor(random() * array_length(messages, 1))::int];
      msg := REPLACE(msg, '{name}', COALESCE(u.username, SPLIT_PART(u.email, '@', 1)));
      msg := REPLACE(msg, '{days}', days_inactive::text);
      msg := REPLACE(msg, '{earnings}', ROUND(earnings::numeric, 2)::text);
      
      INSERT INTO push_notification_queue (user_id, title, body, priority, type)
      VALUES (u.id, '👋 Te echamos de menos', msg, 'low', 'reengagement');
      count_queued := count_queued + 1;
    END IF;
  END LOOP;
  
  RETURN count_queued;
END;
$$;

-- ════════════════════════════════════════════════════════════════
-- FUNCIÓN MAESTRA: Ejecutar todas las generaciones
-- ════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION generate_all_smart_push()
RETURNS TABLE(type TEXT, queued INT) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY SELECT 'daily_summary'::TEXT, generate_daily_push_summary();
  RETURN QUERY SELECT 'important_events'::TEXT, generate_important_push();
  RETURN QUERY SELECT 'reengagement'::TEXT, generate_reengagement_push();
END;
$$;

-- ════════════════════════════════════════════════════════════════
-- FIN
-- ════════════════════════════════════════════════════════════════
