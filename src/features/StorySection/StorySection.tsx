import React from "react";
import "./StorySection.css";

interface StorySectionProps {
  title: string;
  paragraphs: React.ReactNode[];
  placeholder?: boolean;
}

const StorySection: React.FC<StorySectionProps> = ({ title, paragraphs, placeholder }) => {
  if (placeholder) {
    return (
      <section className="StorySection StorySection--placeholder">
        <div className="StorySection__placeholder-notice">
          Contenido pendiente — Gustavo lo completará pronto
        </div>
      </section>
    );
  }

  return (
    <section className="StorySection">
      <div className="StorySection__content">
        <div className="StorySection__left">
          <div className="StorySection__outline-title">Origen</div>
          <h2 className="StorySection__title">{title}</h2>
        </div>
        <div className="StorySection__text">
          {paragraphs.map((p, index) => (
            <p key={index} className="StorySection__paragraph">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
