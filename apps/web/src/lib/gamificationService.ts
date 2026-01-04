import { supabase } from './supabaseClient';

/**
 * Gamification Service - Dashboard IPO Ready
 * Maneja streak, meta diaria, comparison, y celebraciones
 */

export interface GamificationData {
    streak: number;
    dailyGoal: number;
    goalReached: boolean;
    yesterdayRevenue: number;
    comparisonPercent: number | null;
}

/**
 * Obtener datos de gamificación del usuario actual
 */
export async function getUserGamification(): Promise<GamificationData | null> {
    try {
        const { data, error } = await supabase
            .rpc('get_user_gamification');

        if (error || !data || data.length === 0) {
            console.error('Error fetching gamification data:', error);
            return getDefaultGamification();
        }

        const row = data[0];
        return {
            streak: row.streak ?? 0,
            dailyGoal: parseFloat(row.daily_goal) || 5.00,
            goalReached: row.goal_reached ?? false,
            yesterdayRevenue: parseFloat(row.yesterday_revenue) || 0,
            comparisonPercent: null // Se calcula en el dashboard
        };
    } catch (err) {
        console.error('getUserGamification error:', err);
        return getDefaultGamification();
    }
}

/**
 * Valores por defecto para usuarios nuevos o errores
 */
function getDefaultGamification(): GamificationData {
    return {
        streak: 0,
        dailyGoal: 5.00,
        goalReached: false,
        yesterdayRevenue: 0,
        comparisonPercent: null
    };
}

/**
 * Calcular porcentaje de comparación con ayer
 * @param todayRevenue - Ingresos de hoy
 * @param yesterdayRevenue - Ingresos de ayer
 * @returns Porcentaje de cambio (positivo = mejora, negativo = peor)
 */
export function calculateComparison(todayRevenue: number, yesterdayRevenue: number): number | null {
    if (yesterdayRevenue === 0) {
        // Si ayer fue 0, no podemos calcular porcentaje
        return todayRevenue > 0 ? 100 : null;
    }

    const change = ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;
    return Math.round(change);
}

/**
 * Actualizar la meta diaria del usuario
 */
export async function setDailyGoal(newGoal: number): Promise<boolean> {
    try {
        const { error } = await supabase.rpc('set_daily_goal', { new_goal: newGoal });
        return !error;
    } catch {
        return false;
    }
}

/**
 * Marcar que se alcanzó la meta (para no repetir confetti)
 */
export async function markGoalReached(): Promise<boolean> {
    try {
        const { error } = await supabase.rpc('mark_goal_reached');
        return !error;
    } catch {
        return false;
    }
}

/**
 * Verificar si se debe mostrar celebración
 * @param currentRevenue - Ingresos actuales del día
 * @param dailyGoal - Meta diaria del usuario
 * @param goalAlreadyReached - Si ya se mostró la celebración
 */
export function shouldShowCelebration(
    currentRevenue: number,
    dailyGoal: number,
    goalAlreadyReached: boolean
): boolean {
    return currentRevenue >= dailyGoal && !goalAlreadyReached;
}
