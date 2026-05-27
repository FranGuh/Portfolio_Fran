import React from "react";
import "./PhilosophySection.css";

interface PhilosophyItem {
  heading: string;
  body: string;
}

interface PhilosophySectionProps {
  title: string;
  items: PhilosophyItem[];
  placeholder?: boolean;
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({ title, items, placeholder }) => {
  if (placeholder) {
    return (
      <section className="PhilosophySection PhilosophySection--placeholder">
        <div className="PhilosophySection__placeholder-notice">
          Contenido pendiente — Gustavo lo completará pronto
        </div>
      </section>
    );
  }

  return (
    <section className="PhilosophySection">
      <div className="PhilosophySection__header">
        <h2 className="PhilosophySection__title">{title}</h2>
      </div>
      <div className="PhilosophySection__grid">
        {items.map((item, index) => (
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
