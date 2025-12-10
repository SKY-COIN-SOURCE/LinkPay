import { useState, useEffect } from 'react';

/**
 * Hook para animar un contador desde un valor inicial hasta un valor final
 * @param end - Valor final del contador
 * @param duration - Duración de la animación en ms (default: 1000)
 * @param start - Valor inicial (default: 0)
 */
export function useCountTo(end: number, duration: number = 1000, start: number = 0): number {
    const [count, setCount] = useState(start);

    useEffect(() => {
        if (end === start) {
            setCount(end);
            return;
        }

        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutQuad = progress * (2 - progress); // Easing function

            setCount(Math.floor(start + (end - start) * easeOutQuad));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [end, duration, start]);

    return count;
}

/**
 * Hook para detectar cuando un elemento es nuevo y mostrar pulse
 */
export function useNewItemPulse(itemId: string, newItems: Set<string>): boolean {
    const [isPulsing, setIsPulsing] = useState(newItems.has(itemId));

    useEffect(() => {
        if (newItems.has(itemId)) {
            setIsPulsing(true);
            const timer = setTimeout(() => setIsPulsing(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [itemId, newItems]);

    return isPulsing;
}

/**
 * Función para disparar confetti (usa canvas-confetti si está disponible)
 */
export async function triggerConfetti() {
    try {
        const confetti = (await import('canvas-confetti')).default;
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6366f1', '#f59e0b', '#22c55e', '#ec4899']
        });
    } catch {
        // canvas-confetti not installed, show fallback animation
        console.log('🎉 Milestone reached!');
    }
}

/**
 * Formatea números grandes con K/M
 */
export function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}
