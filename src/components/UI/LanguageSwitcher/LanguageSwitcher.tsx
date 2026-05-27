// src/components/UI/LanguageSwitcher/LanguageSwitcher.tsx
import React from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import "./LanguageSwitcher.css";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleLanguage();
    }
  };

  return (
    <div className="LanguageSwitcher__container">
      <button
        className="LanguageSwitcher__btn"
        onClick={toggleLanguage}
        onKeyDown={handleKeyDown}
        aria-label={`Cambiar idioma, actualmente en ${language === "es" ? "Español" : "Inglés"} / Change language, currently in ${language === "es" ? "Spanish" : "English"}`}
        title="Cambiar idioma / Change language"
      >
        <span className={`LanguageSwitcher__option ${language === "es" ? "active" : ""}`}>
          ES
        </span>
        <span className="LanguageSwitcher__divider">/</span>
        <span className={`LanguageSwitcher__option ${language === "en" ? "active" : ""}`}>
          EN
        </span>
      </button>
    </div>
  );
};
