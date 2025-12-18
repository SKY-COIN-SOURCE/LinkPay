-- ============================================================
-- 🎯 SISTEMA DE NOTIFICACIONES PERSONALIZADAS CON DATOS REALES
-- Lee datos reales de cada usuario para generar notificaciones
-- ============================================================

-- ============================================================
-- FUNCIÓN 1: Generar notificaciones basadas en DATOS REALES del usuario
-- ============================================================
CREATE OR REPLACE FUNCTION generate_personalized_notifications(target_user_id UUID DEFAULT NULL)
RETURNS TABLE(user_id UUID, notifications_created INT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  u RECORD;
  user_earnings NUMERIC;
  user_clicks BIGINT;
  user_links_count INT;
  user_countries TEXT[];
  top_link_alias TEXT;
  top_link_clicks BIGINT;
  recent_country TEXT;
  notif_count INT := 0;
BEGIN
  -- Iterar sobre usuarios (todos o uno específico)
  FOR u IN 
    SELECT p.id, p.username, p.email 
    FROM profiles p 
    WHERE (target_user_id IS NULL OR p.id = target_user_id)
  LOOP
    notif_count := 0;
    
    -- ═══════════════════════════════════════════════════════════
    -- LEER DATOS REALES DEL USUARIO
    -- ═══════════════════════════════════════════════════════════
    
    -- Total de ganancias
    SELECT COALESCE(SUM(l.earnings), 0), COALESCE(SUM(l.views), 0), COUNT(*)
    INTO user_earnings, user_clicks, user_links_count
    FROM links l
    WHERE l.user_id = u.id;
    
    -- Link con más clics
    SELECT l.alias, l.views
    INTO top_link_alias, top_link_clicks
    FROM links l
    WHERE l.user_id = u.id AND l.views > 0
    ORDER BY l.views DESC
    LIMIT 1;
    
    -- Países únicos (de clicks recientes)
    SELECT ARRAY_AGG(DISTINCT country) 
    INTO user_countries
    FROM (
      SELECT COALESCE(country, 'Desconocido') as country
      FROM click_events 
      WHERE link_id IN (SELECT id FROM links WHERE user_id = u.id)
      AND country IS NOT NULL
      LIMIT 20
    ) sub;
    
    -- ═══════════════════════════════════════════════════════════
    -- GENERAR NOTIFICACIONES BASADAS EN DATOS REALES
    -- ═══════════════════════════════════════════════════════════
    
    -- 🎉 BIENVENIDA (siempre)
    INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
    SELECT u.id, 'welcome', 
      '🎉 ¡Bienvenido a LinkPay!',
      '¡Hola ' || COALESCE(u.username, 'crack') || '! Ya tienes ' || user_links_count || ' links creados. ¡Sigue compartiendo y ganando!',
      'high', false, NOW() - INTERVAL '7 days'
    WHERE NOT EXISTS (
      SELECT 1 FROM notifications n WHERE n.user_id = u.id AND n.type = 'welcome' LIMIT 1
    );
    notif_count := notif_count + 1;
    
    -- 💰 PRIMERA GANANCIA (si tiene ganancias > 0)
    IF user_earnings > 0 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
      SELECT u.id, 'first_earning',
        '💰 ¡Tus primeras ganancias!',
        COALESCE(u.username, 'Crack') || ', has ganado €' || ROUND(user_earnings::numeric, 4) || ' en total. ¡El comienzo de algo grande!',
        'high', false, NOW() - INTERVAL '5 days'
      WHERE NOT EXISTS (
        SELECT 1 FROM notifications n WHERE n.user_id = u.id AND n.type = 'first_earning' LIMIT 1
      );
      notif_count := notif_count + 1;
    END IF;
    
    -- 🎯 MILESTONES DE GANANCIAS
    IF user_earnings >= 1 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
      VALUES (u.id, 'revenue_milestone_1', '🎯 ¡€1 alcanzado!',
        COALESCE(u.username, 'Crack') || ', tu balance total es de €' || ROUND(user_earnings::numeric, 2) || '. ¡Sigue así!',
        'high', false, NOW() - INTERVAL '4 days')
      ON CONFLICT DO NOTHING;
      notif_count := notif_count + 1;
    END IF;
    
    IF user_earnings >= 5 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
      VALUES (u.id, 'revenue_milestone_5', '🎯 ¡€5 alcanzados!',
        COALESCE(u.username, 'Crack') || ', llevas €' || ROUND(user_earnings::numeric, 2) || ' acumulados. ¡Impresionante!',
        'high', false, NOW() - INTERVAL '3 days')
      ON CONFLICT DO NOTHING;
      notif_count := notif_count + 1;
    END IF;
    
    IF user_earnings >= 10 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
      VALUES (u.id, 'revenue_milestone_10', '🎯 ¡€10 conseguidos!',
        '¡' || COALESCE(u.username, 'Crack') || ', €' || ROUND(user_earnings::numeric, 2) || ' listos para retirar!',
        'high', false, NOW() - INTERVAL '2 days')
      ON CONFLICT DO NOTHING;
      notif_count := notif_count + 1;
    END IF;
    
    -- 📊 MILESTONES DE CLICS
    IF user_clicks >= 10 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
      VALUES (u.id, 'link_milestone_10', '📊 10 clics alcanzados',
        COALESCE(u.username, 'Crack') || ', tus links ya tienen ' || user_clicks || ' clics en total. ¡Buen comienzo!',
        'low', false, NOW() - INTERVAL '3 days')
      ON CONFLICT DO NOTHING;
      notif_count := notif_count + 1;
    END IF;
    
    IF user_clicks >= 50 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
      VALUES (u.id, 'link_milestone_50', '📊 50 clics totales',
        '¡' || COALESCE(u.username, 'Crack') || ', ' || user_clicks || ' clics y subiendo! Tu contenido atrae.',
        'medium', false, NOW() - INTERVAL '2 days')
      ON CONFLICT DO NOTHING;
      notif_count := notif_count + 1;
    END IF;
    
    IF user_clicks >= 100 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
      VALUES (u.id, 'link_milestone_100', '📊 ¡100 clics!',
        COALESCE(u.username, 'Crack') || ', superaste los ' || user_clicks || ' clics. ¡Ya eres un pro!',
        'medium', false, NOW() - INTERVAL '1 day')
      ON CONFLICT DO NOTHING;
      notif_count := notif_count + 1;
    END IF;
    
    -- 🔗 TOP LINK
    IF top_link_alias IS NOT NULL AND top_link_clicks > 0 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
      VALUES (u.id, 'link_top_performer_day', '🏆 Tu mejor link',
        'Tu link "' || top_link_alias || '" lidera con ' || top_link_clicks || ' clics. ¡Sigue compartiéndolo!',
        'high', false, NOW() - INTERVAL '1 day')
      ON CONFLICT DO NOTHING;
      notif_count := notif_count + 1;
    END IF;
    
    -- 🌍 PAÍSES (si tiene clics de múltiples países)
    IF user_countries IS NOT NULL AND array_length(user_countries, 1) > 1 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
      VALUES (u.id, 'achievement_international', '🌍 Alcance internacional',
        COALESCE(u.username, 'Crack') || ', tus links reciben clics de ' || array_length(user_countries, 1) || ' países: ' || array_to_string(user_countries[1:3], ', ') || '...',
        'medium', false, NOW() - INTERVAL '2 days')
      ON CONFLICT DO NOTHING;
      notif_count := notif_count + 1;
    END IF;
    
    -- 🔗 LINKS CREADOS
    IF user_links_count >= 5 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
      VALUES (u.id, 'achievement_5_links', '🏆 5 links creados',
        '¡' || COALESCE(u.username, 'Crack') || ', ya tienes ' || user_links_count || ' links! Eres un creador activo.',
        'medium', false, NOW() - INTERVAL '3 days')
      ON CONFLICT DO NOTHING;
      notif_count := notif_count + 1;
    END IF;
    
    IF user_links_count >= 10 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
      VALUES (u.id, 'achievement_10_links', '🏆 10 links activos',
        COALESCE(u.username, 'Crack') || ', ¡' || user_links_count || ' links publicados! Eres un creador prolífico.',
        'medium', false, NOW() - INTERVAL '2 days')
      ON CONFLICT DO NOTHING;
      notif_count := notif_count + 1;
    END IF;
    
    -- 📢 ANUNCIO SISTEMA
    INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
    SELECT u.id, 'announcement',
      '🚀 LinkPay 2.0 está aquí',
      '¡Hola ' || COALESCE(u.username, 'crack') || '! Hemos añadido notificaciones en tiempo real, push móvil, y más. Con €' || ROUND(user_earnings::numeric, 2) || ' en tu cuenta, ¡sigue creciendo!',
      'high', false, NOW() - INTERVAL '1 hour'
    WHERE NOT EXISTS (
      SELECT 1 FROM notifications n WHERE n.user_id = u.id AND n.type = 'announcement' AND n.title LIKE '%2.0%' LIMIT 1
    );
    notif_count := notif_count + 1;
    
    -- 💡 TIP PERSONALIZADO
    IF user_clicks < 10 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
      VALUES (u.id, 'tip_of_the_day', '💡 Tip para empezar',
        COALESCE(u.username, 'Crack') || ', comparte tus links en Stories de Instagram para conseguir tus primeros clics.',
        'low', false, NOW() - INTERVAL '6 hours')
      ON CONFLICT DO NOTHING;
    ELSIF user_clicks < 50 THEN
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
      VALUES (u.id, 'tip_of_the_day', '💡 Tip para crecer',
        COALESCE(u.username, 'Crack') || ', con ' || user_clicks || ' clics vas bien. Publica en horarios pico (12-14h y 20-22h).',
        'low', false, NOW() - INTERVAL '5 hours')
      ON CONFLICT DO NOTHING;
    ELSE
      INSERT INTO notifications (user_id, type, title, message, priority, read, created_at)
      VALUES (u.id, 'tip_of_the_day', '💡 Tip de experto',
        COALESCE(u.username, 'Crack') || ', con ' || user_clicks || ' clics eres veterano. Usa múltiples plataformas para maximizar.',
        'low', false, NOW() - INTERVAL '4 hours')
      ON CONFLICT DO NOTHING;
    END IF;
    notif_count := notif_count + 1;
    
    -- Devolver resultado para este usuario
    user_id := u.id;
    notifications_created := notif_count;
    RETURN NEXT;
    
  END LOOP;
END;
$$;

-- ============================================================
-- FUNCIÓN 2: Trigger para crear notificación en cada CLIC REAL
-- ============================================================
CREATE OR REPLACE FUNCTION notify_on_click()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  link_owner_id UUID;
  link_alias TEXT;
  click_country TEXT;
  click_earnings NUMERIC;
BEGIN
  -- Obtener datos del link
  SELECT l.user_id, l.alias, l.earnings / NULLIF(l.views, 0)
  INTO link_owner_id, link_alias, click_earnings
  FROM links l
  WHERE l.id = NEW.link_id;
  
  click_country := COALESCE(NEW.country, 'Desconocido');
  click_earnings := COALESCE(click_earnings, 0.002);
  
  -- Solo crear notificación para clics significativos (no spamear)
  -- Notificar cada 10 clics o si es de un país nuevo
  IF (SELECT COUNT(*) FROM click_events WHERE link_id = NEW.link_id) % 10 = 0 THEN
    INSERT INTO notifications (user_id, type, title, message, priority, metadata)
    VALUES (
      link_owner_id,
      'link_click',
      '👆 ' || (SELECT COUNT(*) FROM click_events WHERE link_id = NEW.link_id) || ' clics en "' || link_alias || '"',
      'Tu link recibe clics desde ' || click_country || '. +€' || ROUND(click_earnings::numeric, 4),
      'low',
      jsonb_build_object(
        'link_id', NEW.link_id,
        'link_alias', link_alias,
        'country', click_country,
        'device', NEW.device_type,
        'earnings', click_earnings
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Crear trigger (si no existe)
DROP TRIGGER IF EXISTS trigger_notify_on_click ON click_events;
CREATE TRIGGER trigger_notify_on_click
  AFTER INSERT ON click_events
  FOR EACH ROW
  EXECUTE FUNCTION notify_on_click();

-- ============================================================
-- FUNCIÓN 3: Trigger para crear notificación en cada LINK CREADO
-- ============================================================
CREATE OR REPLACE FUNCTION notify_on_link_created()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_name TEXT;
  links_count INT;
BEGIN
  -- Obtener nombre del usuario y cantidad de links
  SELECT p.username, (SELECT COUNT(*) FROM links WHERE user_id = NEW.user_id)
  INTO user_name, links_count
  FROM profiles p
  WHERE p.id = NEW.user_id;
  
  INSERT INTO notifications (user_id, type, title, message, priority, metadata)
  VALUES (
    NEW.user_id,
    'link_created',
    '🔗 Link "' || NEW.alias || '" creado',
    COALESCE(user_name, 'Crack') || ', tu link #' || links_count || ' está listo. ¡Compártelo y empieza a ganar!',
    'low',
    jsonb_build_object('link_id', NEW.id, 'alias', NEW.alias)
  );
  
  -- Notificación especial para milestones de links
  IF links_count = 5 THEN
    INSERT INTO notifications (user_id, type, title, message, priority)
    VALUES (NEW.user_id, 'achievement_5_links', '🏆 ¡5 links creados!', 
      COALESCE(user_name, 'Crack') || ', acabas de crear tu 5º link. ¡Eres un creador activo!', 'medium');
  ELSIF links_count = 10 THEN
    INSERT INTO notifications (user_id, type, title, message, priority)
    VALUES (NEW.user_id, 'achievement_10_links', '🏆 ¡10 links!',
      COALESCE(user_name, 'Crack') || ', 10 links publicados. ¡Creador prolífico!', 'high');
  END IF;
  
  RETURN NEW;
END;
$$;

-- Crear trigger (si no existe)
DROP TRIGGER IF EXISTS trigger_notify_on_link_created ON links;
CREATE TRIGGER trigger_notify_on_link_created
  AFTER INSERT ON links
  FOR EACH ROW
  EXECUTE FUNCTION notify_on_link_created();

-- ============================================================
-- EJECUTAR: Generar notificaciones personalizadas ahora
-- ============================================================
SELECT * FROM generate_personalized_notifications();

-- Verificar resultados
SELECT 'Notificaciones totales:' as info, COUNT(*) as cantidad FROM notifications;
SELECT 'Por tipo:' as info, type, COUNT(*) as cantidad FROM notifications GROUP BY type ORDER BY cantidad DESC;
