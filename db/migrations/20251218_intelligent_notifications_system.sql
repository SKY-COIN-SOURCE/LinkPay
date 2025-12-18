-- ════════════════════════════════════════════════════════════════════════════
-- 🧠 SISTEMA COMPLETO DE NOTIFICACIONES INTELIGENTES - LINKPAY
-- ════════════════════════════════════════════════════════════════════════════
-- 
-- Este archivo contiene todo el sistema de notificaciones:
-- 1. Permisos y RLS
-- 2. Triggers automáticos en tiempo real
-- 3. Funciones de generación de notificaciones personalizadas
-- 4. Funciones de resúmenes programados
--
-- ════════════════════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════════════════
-- SECCIÓN 1: PERMISOS Y RLS
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_all_for_authenticated" ON notifications;
CREATE POLICY "allow_all_for_authenticated" 
ON notifications FOR ALL TO authenticated 
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

GRANT ALL ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;

ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- ═══════════════════════════════════════════════════════════════════════════
-- SECCIÓN 2: TRIGGER - NOTIFICACIÓN AL CREAR LINK
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION auto_notify_link_created()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  user_name TEXT;
  links_count INT;
BEGIN
  SELECT username INTO user_name FROM profiles WHERE id = NEW.user_id;
  SELECT COUNT(*) INTO links_count FROM links WHERE user_id = NEW.user_id;
  
  INSERT INTO notifications (user_id, type, title, message, priority, metadata)
  VALUES (
    NEW.user_id,
    'link_created',
    '🔗 Link "' || COALESCE(NEW.title, NEW.slug) || '" creado',
    COALESCE(user_name, 'Crack') || ', tu link #' || links_count || ' está listo. ¡Compártelo!',
    'low',
    jsonb_build_object('link_id', NEW.id, 'slug', NEW.slug, 'title', NEW.title)
  );
  
  -- Achievements por cantidad de links
  IF links_count = 3 THEN
    INSERT INTO notifications (user_id, type, title, message, priority)
    VALUES (NEW.user_id, 'achievement_3_links', '🏆 ¡3 links!', 
      COALESCE(user_name, 'Crack') || ', ya tienes 3 links activos.', 'medium');
  ELSIF links_count = 5 THEN
    INSERT INTO notifications (user_id, type, title, message, priority)
    VALUES (NEW.user_id, 'achievement_5_links', '🏆 ¡5 links!',
      COALESCE(user_name, 'Crack') || ', 5 links. ¡Creador activo!', 'medium');
  ELSIF links_count = 10 THEN
    INSERT INTO notifications (user_id, type, title, message, priority)
    VALUES (NEW.user_id, 'achievement_10_links', '🏆 ¡10 links!',
      COALESCE(user_name, 'Crack') || ', ¡10 links! Creador prolífico.', 'high');
  ELSIF links_count = 25 THEN
    INSERT INTO notifications (user_id, type, title, message, priority)
    VALUES (NEW.user_id, 'achievement_25_links', '🏆 ¡25 links!',
      COALESCE(user_name, 'Crack') || ', 25 links. ¡Veterano!', 'high');
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_auto_notify_link_created ON links;
CREATE TRIGGER trigger_auto_notify_link_created
  AFTER INSERT ON links FOR EACH ROW
  EXECUTE FUNCTION auto_notify_link_created();

-- ═══════════════════════════════════════════════════════════════════════════
-- SECCIÓN 3: TRIGGER - NOTIFICACIÓN INTELIGENTE EN CLICKS
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION auto_notify_on_click()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  link_owner UUID;
  link_title TEXT;
  link_slug TEXT;
  total_clicks INT;
  total_earnings NUMERIC;
  user_name TEXT;
  click_country TEXT;
BEGIN
  SELECT user_id, title, slug, views, earnings 
  INTO link_owner, link_title, link_slug, total_clicks, total_earnings
  FROM links WHERE id = NEW.link_id;
  
  SELECT username INTO user_name FROM profiles WHERE id = link_owner;
  click_country := COALESCE(NEW.country, 'Desconocido');
  
  -- Notificar en milestones específicos
  IF total_clicks IN (10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000) THEN
    INSERT INTO notifications (user_id, type, title, message, priority, metadata)
    VALUES (
      link_owner,
      CASE 
        WHEN total_clicks >= 500 THEN 'link_viral'
        WHEN total_clicks >= 100 THEN 'link_trending'
        ELSE 'link_milestone_' || total_clicks::text
      END,
      CASE
        WHEN total_clicks >= 1000 THEN '🔥 ¡' || total_clicks || ' clics!'
        WHEN total_clicks >= 500 THEN '🔥 ¡VIRAL! ' || total_clicks || ' clics'
        WHEN total_clicks >= 100 THEN '📈 ¡' || total_clicks || ' clics!'
        ELSE '📊 ' || total_clicks || ' clics'
      END,
      COALESCE(user_name, 'Crack') || ', tu link "' || COALESCE(link_title, link_slug) || 
        '" llegó a ' || total_clicks || ' clics. €' || ROUND(total_earnings::numeric, 2) || ' ganados.',
      CASE WHEN total_clicks >= 500 THEN 'urgent' WHEN total_clicks >= 100 THEN 'high' ELSE 'medium' END,
      jsonb_build_object('link_id', NEW.link_id, 'clicks', total_clicks, 'country', click_country)
    );
  END IF;
  
  -- Primer clic de un país nuevo
  IF NOT EXISTS (
    SELECT 1 FROM click_events 
    WHERE link_id = NEW.link_id AND country = NEW.country AND id != NEW.id
  ) AND NEW.country IS NOT NULL THEN
    INSERT INTO notifications (user_id, type, title, message, priority, metadata)
    VALUES (
      link_owner,
      'link_new_country',
      '🌍 Nuevo país: ' || click_country,
      COALESCE(user_name, 'Crack') || ', primer clic desde ' || click_country || ' en "' || 
        COALESCE(link_title, link_slug) || '".',
      'low',
      jsonb_build_object('link_id', NEW.link_id, 'country', click_country)
    );
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_auto_notify_on_click ON click_events;
CREATE TRIGGER trigger_auto_notify_on_click
  AFTER INSERT ON click_events FOR EACH ROW
  EXECUTE FUNCTION auto_notify_on_click();

-- ═══════════════════════════════════════════════════════════════════════════
-- SECCIÓN 4: TRIGGER - MILESTONES DE GANANCIAS
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION auto_notify_earnings_milestone()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  user_name TEXT;
  old_total NUMERIC;
  new_total NUMERIC;
  milestone NUMERIC;
BEGIN
  IF NEW.earnings <= OLD.earnings THEN
    RETURN NEW;
  END IF;
  
  SELECT username INTO user_name FROM profiles WHERE id = NEW.user_id;
  SELECT COALESCE(SUM(earnings), 0) INTO new_total FROM links WHERE user_id = NEW.user_id;
  old_total := new_total - (NEW.earnings - OLD.earnings);
  
  FOR milestone IN SELECT unnest(ARRAY[0.01, 0.10, 0.50, 1, 2, 5, 10, 25, 50, 100]) LOOP
    IF old_total < milestone AND new_total >= milestone THEN
      INSERT INTO notifications (user_id, type, title, message, priority)
      VALUES (
        NEW.user_id,
        CASE WHEN milestone = 0.01 THEN 'first_earning' ELSE 'revenue_milestone_' || milestone::int END,
        CASE
          WHEN milestone = 0.01 THEN '💰 ¡Primera ganancia!'
          WHEN milestone >= 10 THEN '🎯 ¡€' || milestone::int || ' conseguidos!'
          ELSE '🎯 €' || milestone || ' alcanzados'
        END,
        COALESCE(user_name, 'Crack') || ', tu balance llegó a €' || ROUND(new_total::numeric, 2) || 
          CASE WHEN milestone >= 10 THEN '. ¡Puedes solicitar retiro!' ELSE '. ¡Sigue así!' END,
        CASE WHEN milestone >= 10 THEN 'high' WHEN milestone >= 1 THEN 'high' ELSE 'medium' END
      );
      EXIT;
    END IF;
  END LOOP;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_auto_notify_earnings ON links;
CREATE TRIGGER trigger_auto_notify_earnings
  AFTER UPDATE OF earnings ON links FOR EACH ROW
  EXECUTE FUNCTION auto_notify_earnings_milestone();

-- ═══════════════════════════════════════════════════════════════════════════
-- SECCIÓN 5: FUNCIONES DE RESÚMENES PROGRAMADOS
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION generate_daily_summaries()
RETURNS INT LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  u RECORD;
  today_clicks BIGINT;
  today_earnings NUMERIC;
  count_sent INT := 0;
BEGIN
  FOR u IN SELECT p.id, p.username FROM profiles p LOOP
    SELECT COALESCE(SUM(views), 0), COALESCE(SUM(earnings), 0)
    INTO today_clicks, today_earnings
    FROM links WHERE user_id = u.id AND updated_at >= CURRENT_DATE;
    
    IF today_clicks > 0 OR today_earnings > 0 THEN
      INSERT INTO notifications (user_id, type, title, message, priority)
      VALUES (
        u.id,
        'daily_summary',
        '📊 Tu día en LinkPay',
        COALESCE(u.username, 'Crack') || ': ' || today_clicks || ' clics, €' || 
          ROUND(today_earnings::numeric, 4) || ' ganados hoy.',
        'low'
      );
      count_sent := count_sent + 1;
    END IF;
  END LOOP;
  RETURN count_sent;
END;
$$;

CREATE OR REPLACE FUNCTION generate_weekly_summaries()
RETURNS INT LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  u RECORD;
  week_clicks BIGINT;
  week_earnings NUMERIC;
  count_sent INT := 0;
BEGIN
  FOR u IN SELECT p.id, p.username FROM profiles p LOOP
    SELECT COALESCE(SUM(views), 0), COALESCE(SUM(earnings), 0)
    INTO week_clicks, week_earnings
    FROM links WHERE user_id = u.id;
    
    IF week_clicks > 0 THEN
      INSERT INTO notifications (user_id, type, title, message, priority)
      VALUES (
        u.id,
        'weekly_summary',
        '📊 Tu semana en LinkPay',
        COALESCE(u.username, 'Crack') || ': ' || week_clicks || ' clics, €' || 
          ROUND(week_earnings::numeric, 2) || ' totales.',
        'medium'
      );
      count_sent := count_sent + 1;
    END IF;
  END LOOP;
  RETURN count_sent;
END;
$$;

-- ═══════════════════════════════════════════════════════════════════════════
-- SECCIÓN 6: FUNCIÓN DE GENERACIÓN DE NOTIFICACIONES PERSONALIZADAS
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION generate_mega_notifications(target_user_id UUID DEFAULT NULL)
RETURNS TABLE(out_user_id UUID, notifications_created INT)
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  u RECORD;
  user_earnings NUMERIC;
  user_clicks BIGINT;
  user_links_count INT;
  top_link_title TEXT;
  top_link_clicks BIGINT;
  recent_link_title TEXT;
  days_active INT;
BEGIN
  FOR u IN SELECT p.id, p.username, p.created_at FROM profiles p 
           WHERE (target_user_id IS NULL OR p.id = target_user_id)
  LOOP
    SELECT COALESCE(SUM(l.earnings), 0), COALESCE(SUM(l.views), 0), COUNT(*)
    INTO user_earnings, user_clicks, user_links_count
    FROM links l WHERE l.user_id = u.id;
    
    SELECT l.title, l.views INTO top_link_title, top_link_clicks
    FROM links l WHERE l.user_id = u.id ORDER BY l.views DESC LIMIT 1;
    
    SELECT l.title INTO recent_link_title
    FROM links l WHERE l.user_id = u.id ORDER BY l.created_at DESC LIMIT 1;
    
    days_active := GREATEST(1, EXTRACT(DAY FROM NOW() - COALESCE(u.created_at, NOW())));
    
    -- Insertar notificaciones personalizadas basadas en datos reales
    INSERT INTO notifications (user_id, type, title, message, priority, read, created_at) VALUES
    (u.id, 'welcome', '🎉 ¡Bienvenido!', '¡Hola ' || COALESCE(u.username, 'crack') || '! ' || user_links_count || ' links, €' || ROUND(user_earnings::numeric, 2) || ' ganados.', 'high', false, NOW() - INTERVAL '7 days'),
    (u.id, 'announcement', '🚀 LinkPay 2.0', COALESCE(u.username, 'Crack') || ', notificaciones en tiempo real activas.', 'high', false, NOW() - INTERVAL '1 hour')
    ON CONFLICT DO NOTHING;
    
    IF user_earnings > 0 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at) VALUES
      (u.id, 'first_earning', '💰 ¡Primera ganancia!', COALESCE(u.username, 'Crack') || ', €' || ROUND(user_earnings::numeric, 4) || ' ganados.', 'high', false, NOW() - INTERVAL '5 days')
      ON CONFLICT DO NOTHING;
    END IF;
    
    IF top_link_title IS NOT NULL THEN
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at) VALUES
      (u.id, 'link_top_performer_day', '🏆 Tu mejor link', '"' || top_link_title || '" lidera con ' || COALESCE(top_link_clicks, 0) || ' clics.', 'high', false, NOW() - INTERVAL '8 hours')
      ON CONFLICT DO NOTHING;
    END IF;
    
    out_user_id := u.id;
    notifications_created := 10;
    RETURN NEXT;
  END LOOP;
END;
$$;

-- ═══════════════════════════════════════════════════════════════════════════
-- FIN DEL SISTEMA DE NOTIFICACIONES
-- ═══════════════════════════════════════════════════════════════════════════
