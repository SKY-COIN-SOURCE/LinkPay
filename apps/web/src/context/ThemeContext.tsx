import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { preferencesService } from '../lib/settingsService';

// Tipos
type ThemeMode = 'light' | 'dark';
type AccentColor = string;

interface ThemeContextValue {
    theme: ThemeMode;
    accentColor: AccentColor;
    setTheme: (theme: ThemeMode) => void;
    setAccentColor: (color: AccentColor) => void;
    toggleTheme: () => void;
    syncWithDB: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Colores de acento predefinidos
export const ACCENT_COLORS = [
    { name: 'Azul', value: '#3b82f6' },
    { name: 'Morado', value: '#8b5cf6' },
    { name: 'Verde', value: '#22c55e' },
    { name: 'Naranja', value: '#f97316' },
    { name: 'Rosa', value: '#ec4899' },
    { name: 'Cyan', value: '#06b6d4' },
];

// Hook para usar el tema
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// Provider
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<ThemeMode>('dark');
    const [accentColor, setAccentColorState] = useState<AccentColor>('#3b82f6');
    const [isLoaded, setIsLoaded] = useState(false);
    const saveTimeout = useRef<NodeJS.Timeout | null>(null);

    // Cargar preferencias al montar (primero localStorage, después DB)
    useEffect(() => {
        // 1. Cargar de localStorage inmediatamente
        const savedTheme = localStorage.getItem('lp_theme') as ThemeMode;
        const savedAccent = localStorage.getItem('lp_accent');

        if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
            setThemeState(savedTheme);
        }
        if (savedAccent) {
            setAccentColorState(savedAccent);
        }

        setIsLoaded(true);

        // 2. Intentar cargar de DB (sobrescribe si existe)
        loadFromDB();
    }, []);

    const loadFromDB = async () => {
        try {
            const prefs = await preferencesService.get();
            if (prefs) {
                if (prefs.theme_preference && ['light', 'dark'].includes(prefs.theme_preference)) {
                    setThemeState(prefs.theme_preference as ThemeMode);
                    localStorage.setItem('lp_theme', prefs.theme_preference);
                }
                if (prefs.accent_color) {
                    setAccentColorState(prefs.accent_color);
                    localStorage.setItem('lp_accent', prefs.accent_color);
                }
            }
        } catch (e) {
            // Silently fail - usar valores de localStorage
        }
    };

    // Aplicar tema al document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('lp_theme', theme);

        // Guardar en DB con debounce
        if (isLoaded) {
            debounceSaveToDB({ theme_preference: theme });
        }
    }, [theme, isLoaded]);

    // Aplicar color de acento
    useEffect(() => {
        document.documentElement.style.setProperty('--lp-accent', accentColor);
        document.documentElement.style.setProperty('--lp-accent-rgb', hexToRgb(accentColor));
        localStorage.setItem('lp_accent', accentColor);

        // Guardar en DB con debounce
        if (isLoaded) {
            debounceSaveToDB({ accent_color: accentColor });
        }
    }, [accentColor, isLoaded]);

    const debounceSaveToDB = (updates: any) => {
        if (saveTimeout.current) {
            clearTimeout(saveTimeout.current);
        }
        saveTimeout.current = setTimeout(async () => {
            try {
                await preferencesService.update(updates);
            } catch (e) {
                // Silently fail
            }
        }, 1000); // Esperar 1 segundo antes de guardar
    };

    const setTheme = (newTheme: ThemeMode) => {
        setThemeState(newTheme);
    };

    const setAccentColor = (color: AccentColor) => {
        setAccentColorState(color);
    };

    const toggleTheme = () => {
        setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const syncWithDB = async () => {
        await loadFromDB();
    };

    return (
        <ThemeContext.Provider value={{ theme, accentColor, setTheme, setAccentColor, toggleTheme, syncWithDB }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Helper: Hex a RGB
function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
    }
    return '59, 130, 246'; // Default azul
}

export default ThemeProvider;

