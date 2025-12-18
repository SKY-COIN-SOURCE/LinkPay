-- ════════════════════════════════════════════════════════════════════════════
-- 🧠 SISTEMA DE ENGAGEMENT DOPAMINÉRGICO - LINKPAY
-- Notificaciones que enganchan usando datos REALES (sin bonuses falsos)
-- ════════════════════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════════════════
-- TRIGGER: Notificación CADA 5 CLICS (dopamina frecuente)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION engagement_notify_on_click()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  link_owner UUID;
  link_title TEXT;
  total_clicks INT;
  total_earnings NUMERIC;
  user_name TEXT;
  click_country TEXT;
BEGIN
  SELECT user_id, title, views, earnings INTO link_owner, link_title, total_clicks, total_earnings
  FROM links WHERE id = NEW.link_id;
  
  SELECT username INTO user_name FROM profiles WHERE id = link_owner;
  click_country := COALESCE(NEW.country, 'web');
  
  -- 💰 CADA 5 CLICS: Muestra ganancias REALES
  IF total_clicks % 5 = 0 AND total_clicks <= 100 THEN
    INSERT INTO notifications (user_id, type, title, message, priority)
    VALUES (link_owner, 'link_progress',
      '💰 "' || COALESCE(link_title, 'Tu link') || '" → ' || total_clicks || ' clics',
      COALESCE(user_name, 'Crack') || ', llevas €' || ROUND(total_earnings::numeric, 4) || ' ganados con este link.',
      'medium');
  END IF;
  
  -- 🔥 CADA 10 CLICS después de 100
  IF total_clicks > 100 AND total_clicks % 10 = 0 THEN
    INSERT INTO notifications (user_id, type, title, message, priority)
    VALUES (link_owner, 'link_on_fire',
      '🔥 ¡' || total_clicks || ' clics! €' || ROUND(total_earnings::numeric, 2),
      COALESCE(user_name, 'Crack') || ', "' || COALESCE(link_title, 'tu link') || '" no para. ¡Sigue compartiendo!',
      'high');
  END IF;
  
  -- 🌍 NUEVO PAÍS
  IF NOT EXISTS (SELECT 1 FROM click_events WHERE link_id = NEW.link_id AND country = NEW.country AND id != NEW.id)
     AND NEW.country IS NOT NULL THEN
    INSERT INTO notifications (user_id, type, title, message, priority)
    VALUES (link_owner, 'global_reach',
      '🌍 ¡' || click_country || ' te descubrió!',
      COALESCE(user_name, 'Crack') || ', primer clic desde ' || click_country || ' en "' || COALESCE(link_title, 'tu link') || '".',
      'high');
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_engagement_notify_on_click ON click_events;
CREATE TRIGGER trigger_engagement_notify_on_click
  AFTER INSERT ON click_events FOR EACH ROW
  EXECUTE FUNCTION engagement_notify_on_click();

-- ═══════════════════════════════════════════════════════════════════════════
-- FUNCIÓN: Generar notificaciones de engagement (solo datos reales)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION generate_engagement_notifications()
RETURNS INT LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  u RECORD;
  user_earnings NUMERIC;
  user_clicks BIGINT;
  top_link_title TEXT;
  top_link_clicks BIGINT;
  count_sent INT := 0;
BEGIN
  FOR u IN SELECT p.id, p.username FROM profiles p LOOP
    
    SELECT COALESCE(SUM(earnings), 0), COALESCE(SUM(views), 0)
    INTO user_earnings, user_clicks FROM links WHERE user_id = u.id;
    
    SELECT title, views INTO top_link_title, top_link_clicks
    FROM links WHERE user_id = u.id ORDER BY views DESC LIMIT 1;
    
    -- 💰 RECORDATORIO DE GANANCIAS REALES
    IF user_earnings > 0 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, created_at)
      SELECT u.id, 'earnings_reminder',
        '💰 Balance: €' || ROUND(user_earnings::numeric, 2),
        COALESCE(u.username, 'Crack') || ', tienes €' || ROUND(user_earnings::numeric, 2) || ' de ' || user_clicks || ' clics. ' ||
        CASE WHEN user_earnings >= 10 THEN '¡Ya puedes retirar!' ELSE 'Faltan €' || ROUND((10 - user_earnings)::numeric, 2) || ' para €10.' END,
        CASE WHEN user_earnings >= 10 THEN 'urgent' ELSE 'medium' END,
        NOW() - INTERVAL '2 hours'
      WHERE NOT EXISTS (SELECT 1 FROM notifications WHERE user_id = u.id AND type = 'earnings_reminder' AND created_at > NOW() - INTERVAL '12 hours');
    END IF;
    
    -- 📈 TOP LINK
    IF top_link_clicks > 0 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, created_at)
      SELECT u.id, 'top_link_update',
        '📈 "' || COALESCE(top_link_title, 'Tu link') || '" → ' || top_link_clicks || ' clics',
        COALESCE(u.username, 'Crack') || ', sigue compartiendo tu mejor link.',
        'medium', NOW() - INTERVAL '4 hours'
      WHERE NOT EXISTS (SELECT 1 FROM notifications WHERE user_id = u.id AND type = 'top_link_update' AND created_at > NOW() - INTERVAL '24 hours');
    END IF;
    
    -- 📊 PROGRESO AL RETIRO (datos reales)
    IF user_earnings > 0 AND user_earnings < 10 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, created_at)
      SELECT u.id, 'progress_bar',
        '📊 ' || ROUND(user_earnings * 10)::int || '% para €10',
        COALESCE(u.username, 'Crack') || ': €' || ROUND(user_earnings::numeric, 2) || ' de €10 para retirar.',
        'medium', NOW() - INTERVAL '5 hours'
      WHERE NOT EXISTS (SELECT 1 FROM notifications WHERE user_id = u.id AND type = 'progress_bar' AND created_at > NOW() - INTERVAL '24 hours');
    END IF;
    
    -- 🚀 POTENCIAL (proyección basada en datos reales)
    IF user_clicks > 0 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, created_at)
      SELECT u.id, 'growth_tip',
        '🚀 Con ' || (user_clicks * 3) || ' clics ganarías €' || ROUND((user_earnings * 3)::numeric, 2),
        COALESCE(u.username, 'Crack') || ', comparte más y multiplica tus ganancias.',
        'low', NOW() - INTERVAL '2 days'
      WHERE NOT EXISTS (SELECT 1 FROM notifications WHERE user_id = u.id AND type = 'growth_tip' AND created_at > NOW() - INTERVAL '7 days');
    END IF;
    
    count_sent := count_sent + 1;
  END LOOP;
  
  RETURN count_sent;
END;
$$;

-- ═══════════════════════════════════════════════════════════════════════════
-- FIN DEL SISTEMA DE ENGAGEMENT
-- ═══════════════════════════════════════════════════════════════════════════
