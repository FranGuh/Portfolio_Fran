// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, type TranslationTree, type TranslationValue } from "../data/translations";

export type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <T = string>(key: string) => T | string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Spanish so the server-rendered (SSG) markup and the first client
  // render match — reading localStorage here would run during render and break
  // static generation (no `window` in Node) and cause a hydration mismatch.
  const [language, setLanguageState] = useState<Language>("es");

  // Restore the persisted language after mount (client-only).
  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_lang");
      if (saved === "es" || saved === "en") setLanguageState(saved);
    } catch {
      /* localStorage unavailable (private mode / SSR) — keep default */
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("portfolio_lang", lang);
    } catch {
      /* ignore persistence failure */
    }
  };

  // SEO dinámico nativo: actualiza el atributo lang del HTML ante cambios de idioma
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Función traductora ligera que navega objetos anidados (ej. t('navbar.inicio'))
  const t = <T = string,>(key: string): T | string => {
    const keys = key.split(".");
    let current: TranslationValue | undefined = translations[language];

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = Array.isArray(current)
          ? current[Number(k)]
          : (current as TranslationTree)[k];
      } else {
        return key; // Fallback: retorna la clave si no la encuentra
      }
    }

    return (current as T | undefined) ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return context;
};
