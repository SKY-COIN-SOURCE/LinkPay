-- ════════════════════════════════════════════════════════════════════════════
-- 🧠 SISTEMA COMPLETO DE NOTIFICACIONES INTELIGENTES - LINKPAY
-- Versión Final - Diciembre 2024
-- ════════════════════════════════════════════════════════════════════════════
--
-- CONTENIDO:
-- 1. Permisos y RLS
-- 2. Trigger: Nuevos usuarios (auto_notify_new_user)
-- 3. Trigger: Links creados (auto_notify_link_created)
-- 4. Trigger: Clics en links (auto_notify_on_click)
-- 5. Trigger: Milestones de ganancias (auto_notify_earnings_milestone)
-- 6. Funciones programadas (resúmenes diarios/semanales)
-- 7. Función de generación masiva personalizada
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

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- ═══════════════════════════════════════════════════════════════════════════
-- SECCIÓN 2: TRIGGER - NUEVOS USUARIOS
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION auto_notify_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  -- Bienvenida inmediata
  INSERT INTO notifications (user_id, type, title, message, priority)
  VALUES (
    NEW.id,
    'welcome',
    '🎉 ¡Bienvenido a LinkPay!',
    '¡Hola ' || COALESCE(NEW.username, SPLIT_PART(NEW.email, '@', 1)) || 
      '! Crea tu primer link, compártelo, y empieza a ganar dinero con cada clic.',
    'high'
  );
  
  -- Tip inicial
  INSERT INTO notifications (user_id, type, title, message, priority)
  VALUES (
    NEW.id,
    'tip_of_the_day',
    '💡 Tip para empezar',
    COALESCE(NEW.username, SPLIT_PART(NEW.email, '@', 1)) || 
      ', comparte tus links en Stories de Instagram para tus primeros clics.',
    'low'
  );
  
  -- Anuncio del sistema
  INSERT INTO notifications (user_id, type, title, message, priority)
  VALUES (
    NEW.id,
    'announcement',
    '🚀 Novedades de LinkPay',
    COALESCE(NEW.username, SPLIT_PART(NEW.email, '@', 1)) || 
      ', tenemos notificaciones en tiempo real, push móvil, y más. ¡Explora!',
    'medium'
  );
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_auto_notify_new_user ON profiles;
CREATE TRIGGER trigger_auto_notify_new_user
  AFTER INSERT ON profiles FOR EACH ROW
  EXECUTE FUNCTION auto_notify_new_user();

-- ═══════════════════════════════════════════════════════════════════════════
-- SECCIÓN 3: TRIGGER - LINKS CREADOS
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
-- SECCIÓN 4: TRIGGER - CLICS EN LINKS
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
  
  -- Notificar en milestones específicos (evita spam)
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
-- SECCIÓN 5: TRIGGER - MILESTONES DE GANANCIAS
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
-- SECCIÓN 6: FUNCIONES PROGRAMADAS
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION generate_daily_summaries()
RETURNS INT LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  u RECORD;
  today_clicks BIGINT;
  today_earnings NUMERIC;
  count_sent INT := 0;
BEGIN
  FOR u IN SELECT p.id, p.username, p.email FROM profiles p LOOP
    SELECT COALESCE(SUM(views), 0), COALESCE(SUM(earnings), 0)
    INTO today_clicks, today_earnings
    FROM links WHERE user_id = u.id AND updated_at >= CURRENT_DATE;
    
    IF today_clicks > 0 OR today_earnings > 0 THEN
      INSERT INTO notifications (user_id, type, title, message, priority)
      VALUES (
        u.id,
        'daily_summary',
        '📊 Tu día en LinkPay',
        COALESCE(u.username, SPLIT_PART(u.email, '@', 1)) || ': ' || today_clicks || ' clics, €' || 
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
  FOR u IN SELECT p.id, p.username, p.email FROM profiles p LOOP
    SELECT COALESCE(SUM(views), 0), COALESCE(SUM(earnings), 0)
    INTO week_clicks, week_earnings
    FROM links WHERE user_id = u.id;
    
    IF week_clicks > 0 THEN
      INSERT INTO notifications (user_id, type, title, message, priority)
      VALUES (
        u.id,
        'weekly_summary',
        '📊 Tu semana en LinkPay',
        COALESCE(u.username, SPLIT_PART(u.email, '@', 1)) || ': ' || week_clicks || ' clics, €' || 
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
-- FIN DEL SISTEMA DE NOTIFICACIONES
-- ═══════════════════════════════════════════════════════════════════════════
