-- ============================================================
-- PUSH NOTIFICATIONS INFRASTRUCTURE
-- Table for storing push subscriptions and function to send notifications
-- ============================================================

-- Create push_subscriptions table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    endpoint TEXT NOT NULL UNIQUE,
    p256dh_key TEXT NOT NULL,
    auth_key TEXT NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT push_subscriptions_user_id_idx UNIQUE (user_id, endpoint)
);

-- Enable RLS
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can only manage their own subscriptions
CREATE POLICY "Users can manage their push subscriptions"
    ON public.push_subscriptions
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create index for quick lookups
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_user_id ON public.push_subscriptions(user_id);

-- ============================================================
-- FUNCTION: Queue push notification when notification is created
-- ============================================================
CREATE OR REPLACE FUNCTION public.queue_push_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Insert into push queue (will be processed by Edge Function or cron)
    INSERT INTO public.push_notification_queue (
        notification_id,
        user_id,
        title,
        message,
        priority,
        created_at
    ) VALUES (
        NEW.id,
        NEW.user_id,
        NEW.title,
        NEW.message,
        NEW.priority,
        NOW()
    );
    
    RETURN NEW;
END;
$$;

-- ============================================================
-- PUSH NOTIFICATION QUEUE TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.push_notification_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    notification_id UUID REFERENCES public.notifications(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    priority TEXT DEFAULT 'medium',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
    attempts INT DEFAULT 0,
    last_attempt_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    sent_at TIMESTAMPTZ
);

-- Index for finding pending notifications
CREATE INDEX IF NOT EXISTS idx_push_queue_pending 
    ON public.push_notification_queue(status, created_at) 
    WHERE status = 'pending';

-- Enable RLS on queue (only system can access)
ALTER TABLE public.push_notification_queue ENABLE ROW LEVEL SECURITY;

-- No direct user access to queue - handled by functions
CREATE POLICY "No direct access to push queue"
    ON public.push_notification_queue
    FOR ALL
    TO authenticated
    USING (false);

-- Service role can access everything
CREATE POLICY "Service role full access to push queue"
    ON public.push_notification_queue
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================
-- TRIGGER: Queue push on new high priority notifications
-- ============================================================
DROP TRIGGER IF EXISTS trigger_queue_push_notification ON public.notifications;
CREATE TRIGGER trigger_queue_push_notification
    AFTER INSERT ON public.notifications
    FOR EACH ROW
    WHEN (NEW.priority IN ('high', 'urgent'))
    EXECUTE FUNCTION public.queue_push_notification();

-- ============================================================
-- FUNCTION: Send push notification (called by Edge Function)
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_pending_push_notifications(batch_size INT DEFAULT 50)
RETURNS TABLE (
    queue_id UUID,
    user_id UUID,
    title TEXT,
    message TEXT,
    priority TEXT,
    endpoint TEXT,
    p256dh_key TEXT,
    auth_key TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Get pending notifications with their subscriptions
    RETURN QUERY
    SELECT 
        pq.id as queue_id,
        pq.user_id,
        pq.title,
        pq.message,
        pq.priority,
        ps.endpoint,
        ps.p256dh_key,
        ps.auth_key
    FROM public.push_notification_queue pq
    INNER JOIN public.push_subscriptions ps ON ps.user_id = pq.user_id
    WHERE pq.status = 'pending'
    AND pq.attempts < 3
    ORDER BY 
        CASE pq.priority 
            WHEN 'urgent' THEN 1 
            WHEN 'high' THEN 2 
            ELSE 3 
        END,
        pq.created_at ASC
    LIMIT batch_size;
END;
$$;

-- Function to mark notification as sent
CREATE OR REPLACE FUNCTION public.mark_push_sent(queue_ids UUID[])
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.push_notification_queue
    SET status = 'sent', sent_at = NOW()
    WHERE id = ANY(queue_ids);
END;
$$;

-- Function to mark notification as failed
CREATE OR REPLACE FUNCTION public.mark_push_failed(queue_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.push_notification_queue
    SET 
        attempts = attempts + 1,
        last_attempt_at = NOW(),
        status = CASE WHEN attempts >= 2 THEN 'failed' ELSE 'pending' END
    WHERE id = queue_id;
END;
$$;

-- Grant execute to service role
GRANT EXECUTE ON FUNCTION public.get_pending_push_notifications TO service_role;
GRANT EXECUTE ON FUNCTION public.mark_push_sent TO service_role;
GRANT EXECUTE ON FUNCTION public.mark_push_failed TO service_role;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Push notification infrastructure created successfully!';
END $$;
