import { supabase } from './supabaseClient';

// Tipos
export interface UserPreferences {
    theme_preference: 'light' | 'dark' | 'system';
    accent_color: string;
    notifications_enabled: boolean;
    weekly_summary_enabled: boolean;
    bio_public: boolean;
    hide_public_stats: boolean;
}

export interface UserSession {
    id: string;
    device_name: string;
    device_type: 'desktop' | 'mobile' | 'tablet';
    browser: string;
    os: string;
    location: string;
    is_current: boolean;
    last_active_at: string;
    created_at: string;
}

export interface ApiKey {
    id: string;
    name: string;
    key_prefix: string;
    permissions: string[];
    last_used_at: string | null;
    is_active: boolean;
    created_at: string;
}

export interface Webhook {
    id: string;
    name: string;
    url: string;
    events: string[];
    is_active: boolean;
    last_triggered_at: string | null;
    failure_count: number;
    created_at: string;
}

// ===== PREFERENCIAS =====

export const preferencesService = {
    // Obtener preferencias del usuario
    async get(): Promise<UserPreferences | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
            .from('profiles')
            .select('theme_preference, accent_color, notifications_enabled, weekly_summary_enabled, bio_public, hide_public_stats')
            .eq('id', user.id)
            .single();

        if (error) {
            console.error('Error loading preferences:', error);
            return null;
        }

        return data as UserPreferences;
    },

    // Actualizar preferencias
    async update(prefs: Partial<UserPreferences>): Promise<boolean> {
        const { error } = await supabase.rpc('update_user_preferences', {
            p_theme_preference: prefs.theme_preference,
            p_accent_color: prefs.accent_color,
            p_notifications_enabled: prefs.notifications_enabled,
            p_weekly_summary_enabled: prefs.weekly_summary_enabled,
            p_bio_public: prefs.bio_public,
            p_hide_public_stats: prefs.hide_public_stats
        });

        if (error) {
            console.error('Error updating preferences:', error);
            return false;
        }

        return true;
    }
};

// ===== SESIONES =====

export const sessionsService = {
    // Obtener sesiones activas
    async getActive(): Promise<UserSession[]> {
        const { data, error } = await supabase.rpc('get_active_sessions');

        if (error) {
            console.error('Error loading sessions:', error);
            return [];
        }

        return data || [];
    },

    // Revocar una sesión
    async revoke(sessionId: string): Promise<boolean> {
        const { data, error } = await supabase.rpc('revoke_session', {
            session_id: sessionId
        });

        if (error) {
            console.error('Error revoking session:', error);
            return false;
        }

        return data;
    },

    // Revocar todas las sesiones excepto la actual
    async revokeAll(): Promise<boolean> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { error } = await supabase
            .from('user_sessions')
            .delete()
            .eq('user_id', user.id)
            .eq('is_current', false);

        if (error) {
            console.error('Error revoking all sessions:', error);
            return false;
        }

        return true;
    }
};

// ===== API KEYS =====

export const apiKeysService = {
    // Obtener todas las API keys del usuario
    async getAll(): Promise<ApiKey[]> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('api_keys')
            .select('id, name, key_prefix, permissions, last_used_at, is_active, created_at')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error loading API keys:', error);
            return [];
        }

        return data || [];
    },

    // Crear una nueva API key
    async create(name: string, permissions: string[] = ['read']): Promise<{ key: string; id: string } | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        // Generar key único
        const rawKey = `lp_live_${crypto.randomUUID().replace(/-/g, '')}`;
        const keyPrefix = rawKey.slice(0, 12);

        // Hash del key (en producción usar bcrypt o similar)
        const keyHash = await hashKey(rawKey);

        const { data, error } = await supabase
            .from('api_keys')
            .insert({
                user_id: user.id,
                name,
                key_hash: keyHash,
                key_prefix: keyPrefix,
                permissions
            })
            .select('id')
            .single();

        if (error) {
            console.error('Error creating API key:', error);
            return null;
        }

        // Retornar el key solo una vez (después no se puede recuperar)
        return { key: rawKey, id: data.id };
    },

    // Desactivar API key
    async deactivate(keyId: string): Promise<boolean> {
        const { error } = await supabase
            .from('api_keys')
            .update({ is_active: false })
            .eq('id', keyId);

        if (error) {
            console.error('Error deactivating API key:', error);
            return false;
        }

        return true;
    },

    // Eliminar API key
    async delete(keyId: string): Promise<boolean> {
        const { error } = await supabase
            .from('api_keys')
            .delete()
            .eq('id', keyId);

        if (error) {
            console.error('Error deleting API key:', error);
            return false;
        }

        return true;
    }
};

// ===== WEBHOOKS =====

export const webhooksService = {
    // Obtener todos los webhooks
    async getAll(): Promise<Webhook[]> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('webhooks')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error loading webhooks:', error);
            return [];
        }

        return data || [];
    },

    // Crear webhook
    async create(name: string, url: string, events: string[]): Promise<Webhook | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
            .from('webhooks')
            .insert({
                user_id: user.id,
                name,
                url,
                events,
                secret: crypto.randomUUID()
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating webhook:', error);
            return null;
        }

        return data;
    },

    // Actualizar webhook
    async update(id: string, updates: Partial<Webhook>): Promise<boolean> {
        const { error } = await supabase
            .from('webhooks')
            .update(updates)
            .eq('id', id);

        if (error) {
            console.error('Error updating webhook:', error);
            return false;
        }

        return true;
    },

    // Eliminar webhook
    async delete(id: string): Promise<boolean> {
        const { error } = await supabase
            .from('webhooks')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting webhook:', error);
            return false;
        }

        return true;
    }
};

// ===== CUENTA =====

export const accountService = {
    // Eliminar cuenta
    async deleteAccount(): Promise<boolean> {
        const { error } = await supabase.rpc('delete_user_account');

        if (error) {
            console.error('Error deleting account:', error);
            return false;
        }

        // Cerrar sesión después de eliminar
        await supabase.auth.signOut();
        return true;
    }
};

// ===== UTILS =====

async function hashKey(key: string): Promise<string> {
    // En producción usar una librería como bcrypt
    // Por ahora usamos SHA-256 simple
    const encoder = new TextEncoder();
    const data = encoder.encode(key);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
