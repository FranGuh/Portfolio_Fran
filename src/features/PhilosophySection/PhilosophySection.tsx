import React from "react";
import "./PhilosophySection.css";
import { useLanguage } from "../../contexts/LanguageContext";

interface PhilosophySectionProps {
  placeholder?: boolean;
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({ placeholder }) => {
  const { t } = useLanguage();

  if (placeholder) {
    return (
      <section className="PhilosophySection PhilosophySection--placeholder">
        <div className="PhilosophySection__placeholder-notice">
          Contenido pendiente — Gustavo lo completará pronto
        </div>
      </section>
    );
  }

  // Carga de ítems localizados desde el diccionario translations.ts
  const items = t("philosophy.items") || [];

  return (
    <section className="PhilosophySection">
      <div className="PhilosophySection__header">
        <h2 className="PhilosophySection__title">{t("philosophy.title")}</h2>
      </div>
      <div className="PhilosophySection__grid">
        {items.map((item: any, index: number) => (
          <article key={index} className="PhilosophyCard">
            <div className="PhilosophyCard__content">
              <h3 className="PhilosophyCard__title">{item.heading}</h3>
              <p className="PhilosophyCard__desc">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PhilosophySection;
