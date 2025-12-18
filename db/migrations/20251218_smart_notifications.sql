-- ════════════════════════════════════════════════════════════════════════════
-- 🧠 SISTEMA INTELIGENTE DE NOTIFICACIONES - SIN DUPLICADOS
-- Trackea milestones para no repetir notificaciones
-- ════════════════════════════════════════════════════════════════════════════

-- TABLA: Trackear milestones ya alcanzados
CREATE TABLE IF NOT EXISTS user_milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  link_id UUID REFERENCES links(id) ON DELETE CASCADE,
  milestone_type TEXT NOT NULL,
  milestone_value INT NOT NULL,
  achieved_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, link_id, milestone_type, milestone_value)
);

CREATE INDEX IF NOT EXISTS idx_user_milestones_lookup 
ON user_milestones(user_id, link_id, milestone_type, milestone_value);

GRANT ALL ON user_milestones TO authenticated;
GRANT ALL ON user_milestones TO anon;

-- ═══════════════════════════════════════════════════════════════════════════
-- FUNCIÓN SMART: Clics (trackea milestones, no duplica)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION smart_notify_on_click()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  link_owner UUID;
  link_title TEXT;
  total_clicks INT;
  total_earnings NUMERIC;
  user_name TEXT;
  click_country TEXT;
  milestone_reached INT;
  already_achieved BOOLEAN;
BEGIN
  SELECT user_id, title, views, earnings 
  INTO link_owner, link_title, total_clicks, total_earnings
  FROM links WHERE id = NEW.link_id;
  
  SELECT username INTO user_name FROM profiles WHERE id = link_owner;
  click_country := COALESCE(NEW.country, 'web');
  
  -- Milestones: 5,10,15,20,25,50,100,250,500,1000
  IF total_clicks IN (5,10,15,20,25,30,40,50,75,100,150,200,250,500,750,1000) THEN
    milestone_reached := total_clicks;
    
    SELECT EXISTS(
      SELECT 1 FROM user_milestones 
      WHERE user_id = link_owner AND link_id = NEW.link_id 
      AND milestone_type = 'clicks' AND milestone_value = milestone_reached
    ) INTO already_achieved;
    
    IF NOT already_achieved THEN
      INSERT INTO user_milestones (user_id, link_id, milestone_type, milestone_value)
      VALUES (link_owner, NEW.link_id, 'clicks', milestone_reached)
      ON CONFLICT DO NOTHING;
      
      INSERT INTO notifications (user_id, type, title, message, priority)
      VALUES (
        link_owner,
        CASE WHEN milestone_reached >= 500 THEN 'link_viral'
             WHEN milestone_reached >= 100 THEN 'link_trending'
             ELSE 'link_progress' END,
        CASE WHEN milestone_reached >= 500 THEN '🔥 ¡VIRAL! ' || milestone_reached || ' clics'
             WHEN milestone_reached >= 100 THEN '📈 ¡' || milestone_reached || ' clics!'
             ELSE '💰 ' || milestone_reached || ' clics' END,
        COALESCE(user_name, 'Crack') || ', "' || COALESCE(link_title, 'tu link') || 
          '" → ' || milestone_reached || ' clics. €' || ROUND(total_earnings::numeric, 4),
        CASE WHEN milestone_reached >= 500 THEN 'urgent' 
             WHEN milestone_reached >= 100 THEN 'high' ELSE 'medium' END
      );
    END IF;
  END IF;
  
  -- Nuevo país (solo primera vez)
  IF NEW.country IS NOT NULL THEN
    SELECT EXISTS(
      SELECT 1 FROM user_milestones 
      WHERE user_id = link_owner AND link_id = NEW.link_id 
      AND milestone_type = 'country_' || NEW.country
    ) INTO already_achieved;
    
    IF NOT already_achieved THEN
      INSERT INTO user_milestones (user_id, link_id, milestone_type, milestone_value)
      VALUES (link_owner, NEW.link_id, 'country_' || NEW.country, 1)
      ON CONFLICT DO NOTHING;
      
      INSERT INTO notifications (user_id, type, title, message, priority)
      VALUES (link_owner, 'global_reach',
        '🌍 ¡' || click_country || ' te descubrió!',
        COALESCE(user_name, 'Crack') || ', primer clic desde ' || click_country,
        'high');
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- ═══════════════════════════════════════════════════════════════════════════
-- FUNCIÓN SMART: Ganancias (trackea milestones, no duplica)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION smart_notify_earnings()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  user_name TEXT;
  new_total NUMERIC;
  milestone NUMERIC;
  already_achieved BOOLEAN;
BEGIN
  IF NEW.earnings <= OLD.earnings THEN RETURN NEW; END IF;
  
  SELECT username INTO user_name FROM profiles WHERE id = NEW.user_id;
  SELECT COALESCE(SUM(earnings), 0) INTO new_total FROM links WHERE user_id = NEW.user_id;
  
  FOR milestone IN SELECT unnest(ARRAY[0.01, 0.05, 0.10, 0.25, 0.50, 1, 2, 5, 10, 25, 50, 100]) LOOP
    IF new_total >= milestone THEN
      SELECT EXISTS(
        SELECT 1 FROM user_milestones 
        WHERE user_id = NEW.user_id AND link_id IS NULL
        AND milestone_type = 'earnings' AND milestone_value = (milestone * 100)::int
      ) INTO already_achieved;
      
      IF NOT already_achieved THEN
        INSERT INTO user_milestones (user_id, milestone_type, milestone_value)
        VALUES (NEW.user_id, 'earnings', (milestone * 100)::int)
        ON CONFLICT DO NOTHING;
        
        INSERT INTO notifications (user_id, type, title, message, priority)
        VALUES (
          NEW.user_id,
          CASE WHEN milestone < 1 THEN 'first_earning' ELSE 'revenue_milestone' END,
          CASE WHEN milestone = 0.01 THEN '💰 ¡Primera ganancia!'
               WHEN milestone >= 10 THEN '🎯 ¡€' || milestone::int || '!'
               ELSE '🎯 €' || milestone END,
          COALESCE(user_name, 'Crack') || ', balance €' || ROUND(new_total::numeric, 2),
          CASE WHEN milestone >= 10 THEN 'urgent' ELSE 'high' END
        );
        EXIT;
      END IF;
    END IF;
  END LOOP;
  
  RETURN NEW;
END;
$$;

-- ═══════════════════════════════════════════════════════════════════════════
-- TRIGGERS
-- ═══════════════════════════════════════════════════════════════════════════

DROP TRIGGER IF EXISTS trigger_auto_notify_on_click ON click_events;
DROP TRIGGER IF EXISTS trigger_engagement_notify_on_click ON click_events;
DROP TRIGGER IF EXISTS trigger_auto_notify_earnings ON links;
DROP TRIGGER IF EXISTS trigger_smart_notify_on_click ON click_events;
DROP TRIGGER IF EXISTS trigger_smart_notify_earnings ON links;

CREATE TRIGGER trigger_smart_notify_on_click
  AFTER INSERT ON click_events FOR EACH ROW
  EXECUTE FUNCTION smart_notify_on_click();

CREATE TRIGGER trigger_smart_notify_earnings
  AFTER UPDATE OF earnings ON links FOR EACH ROW
  EXECUTE FUNCTION smart_notify_earnings();

-- ═══════════════════════════════════════════════════════════════════════════
-- FIN
-- ═══════════════════════════════════════════════════════════════════════════
