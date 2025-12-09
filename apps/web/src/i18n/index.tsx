import React, { createContext, useContext, useState, ReactNode } from 'react';


// Import languages
import { es } from './es';

type Language = 'es';
type Translations = typeof es;

// Helper to get nested properties
function getNested(obj: any, path: string): string {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null;
    }, obj) || path;
}

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('es');

    const translations: Record<Language, Translations> = {
        es,
    };

    const t = (key: string) => {
        const text = getNested(translations[language], key);
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
