import React from "react";
import "./StorySection.css";
import { useLanguage } from "../../contexts/LanguageContext";

interface StorySectionProps {
  placeholder?: boolean;
}

const StorySection: React.FC<StorySectionProps> = ({ placeholder }) => {
  const { t } = useLanguage();

  if (placeholder) {
    return (
      <section className="StorySection StorySection--placeholder">
        <div className="StorySection__placeholder-notice">
          Contenido pendiente — Gustavo lo completará pronto
        </div>
      </section>
    );
  }

  const p1 = t("story.paragraphs.0");
  const p2 = t("story.paragraphs.1");
  const h1 = t("story.highlights.0");
  const h2 = t("story.highlights.1");

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(highlight);
    if (parts.length <= 1) return text;
    return (
      <>
        {parts[0]}
        <span className="StorySection__highlight">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="StorySection">
      <div className="StorySection__content">
        <div className="StorySection__left">
          <div className="StorySection__outline-title">{t("story.origin")}</div>
          <h2 className="StorySection__title">{t("story.title")}</h2>
        </div>
        <div className="StorySection__text">
          <p className="StorySection__paragraph">
            {highlightText(p1, h1)}
          </p>
          <p className="StorySection__paragraph">
            {highlightText(p2, h2)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
