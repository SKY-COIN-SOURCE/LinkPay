import React, { createContext, useContext, useState, ReactNode } from 'react';


// Import languages
import { es } from './es';
import { en } from './en';

export type Language = 'es' | 'en' | 'fr' | 'it'; // Add more as needed
type Translations = typeof es; // Assume structure matches es

// Helper to get nested properties
function getNested(obj: any, path: string): string {
    if (!obj) return path;
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null;
    }, obj) || path;
}

export interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('es');

    const translations: Record<string, Translations> = {
        es,
        en,
        // Fallback for others to en or es
        fr: en,
        it: en
    };

    const t = (key: string) => {
        const langData = translations[language] || translations['es'];
        const text = getNested(langData, key);
        return text;
    };

    return (
        <I18nContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useTranslation must be used within an I18nProvider');
    }
    return context;
}
