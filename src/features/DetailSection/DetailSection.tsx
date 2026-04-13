import React from "react";
import "./DetailSection.css";

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

export interface ItemData {
  title?: string;
  role?: string;
  company?: string;
  description: string;
  techStack: string[];
  image?: string;
  link?: string;
}

interface DetailSectionProps {
  title: string;
  description: string;
  items: ItemData[];
  icons?: IconComponent[];
  backgroundImg?: string;
  backgroundAlt?: string;
  layout?: "left" | "right";
  children?: React.ReactNode;
}

const DetailSection = ({ title, description, items, icons, children }: DetailSectionProps) => {
  return (
    <section className="ProjectsSection">
      <div className="ProjectsSection__header">
        <div className="ProjectsSection__header-text">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {icons && (
          <div className="ProjectsSection__icons">
            {icons.map((Icon, index) => (
              <Icon key={index} className="ProjectsSection__icon" />
            ))}
          </div>
        )}
      </div>

      {children && (
        <div className="ProjectsSection__controls">
          {children}
        </div>
      )}

      <div className="ProjectsSection__grid">
        {items.map((item, index) => (
          <article key={index} className="ProjectCard">
            <img
              src={item.image || '/pictures/default-project.jpg'}
              alt={item.title || item.company}
              className="ProjectCard__img"
              loading="lazy"
            />

            <div className="ProjectCard__content">
              <h3 className="ProjectCard__title">
                {item.title || `${item.role} en ${item.company}`}
              </h3>
              <p className="ProjectCard__desc">{item.description}</p>

              <div className="ProjectCard__tags">
                {item.techStack && item.techStack.map(tech => (
                  <span key={tech} className="ProjectCard__tag">{tech}</span>
                ))}
              </div>

              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="ProjectCard__link">
                  Ver Proyecto ➔
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DetailSection;