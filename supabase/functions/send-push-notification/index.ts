// ============================================================
// EDGE FUNCTION: Send Push Notifications
// Deno Edge Function that processes the push queue and sends
// real push notifications via Web Push API
// ============================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// Web Push crypto for Deno
import * as base64 from "https://deno.land/std@0.168.0/encoding/base64.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// VAPID keys from environment
const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY') || ''
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY') || ''
const VAPID_SUBJECT = Deno.env.get('VAPID_SUBJECT') || 'mailto:support@linkpay.io'

interface PushNotification {
    queue_id: string
    user_id: string
    title: string
    message: string
    priority: string
    endpoint: string
    p256dh_key: string
    auth_key: string
}

// Send a single push notification
async function sendPushNotification(notification: PushNotification): Promise<boolean> {
    const payload = JSON.stringify({
        title: notification.title,
        body: notification.message,
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        tag: `linkpay-${notification.priority}`,
        data: {
            url: '/app',
            priority: notification.priority,
        },
    })

    try {
        // For web push, we need to use the web-push protocol
        // This is a simplified implementation - for production, use a proper web-push library
        const response = await fetch(notification.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Encoding': 'aes128gcm',
                'TTL': '86400',
                'Urgency': notification.priority === 'urgent' ? 'high' : 'normal',
            },
            body: payload,
        })

        if (response.ok || response.status === 201) {
            console.log(`Push sent to ${notification.endpoint.substring(0, 50)}...`)
            return true
        } else {
            console.error(`Push failed: ${response.status} ${response.statusText}`)
            return false
        }
    } catch (error) {
        console.error('Push error:', error)
        return false
    }
}

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // Create Supabase client with service role
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Get pending notifications from queue
        const { data: notifications, error } = await supabase
            .rpc('get_pending_push_notifications', { batch_size: 50 })

        if (error) {
            throw error
        }

        if (!notifications || notifications.length === 0) {
            return new Response(
                JSON.stringify({ message: 'No pending notifications', processed: 0 }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        console.log(`Processing ${notifications.length} push notifications...`)

        const sentIds: string[] = []
        const failedIds: string[] = []

        // Process each notification
        for (const notification of notifications as PushNotification[]) {
            const success = await sendPushNotification(notification)

            if (success) {
                sentIds.push(notification.queue_id)
            } else {
                failedIds.push(notification.queue_id)
                // Mark as failed immediately
                await supabase.rpc('mark_push_failed', { queue_id: notification.queue_id })
            }
        }

        // Mark successful ones as sent
        if (sentIds.length > 0) {
            await supabase.rpc('mark_push_sent', { queue_ids: sentIds })
        }

        const result = {
            message: 'Push notifications processed',
            total: notifications.length,
            sent: sentIds.length,
            failed: failedIds.length,
        }

        console.log(result)

        return new Response(
            JSON.stringify(result),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        console.error('Edge function error:', error)

        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        )
    }
})
