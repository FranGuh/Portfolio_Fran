import React from "react";
import "./DetailSection.css";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  getLocalizedProjectDesc,
  getLocalizedExperienceRole,
  getLocalizedExperienceDesc
} from "../../data/projectTranslations";

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
  layout?: "left" | "right" | "center";
  children?: React.ReactNode;
  onSelectItem?: (item: ItemData) => void;
  selectedItem?: ItemData | null;
}

const DetailSection = ({ title, description, items, icons, backgroundImg, backgroundAlt, layout = "right", children, onSelectItem, selectedItem }: DetailSectionProps) => {
  const { language, t } = useLanguage();

  return (
    <section className={`ProjectsSection ProjectsSection--${layout} ${selectedItem ? "has-active-selection" : ""}`}>
      <div className="ProjectsSection__header">
        {backgroundImg && (
          <img
            src={backgroundImg}
            alt={backgroundAlt || title}
            className="ProjectsSection__header-img"
            loading="lazy"
          />
        )}
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
        {items.map((item, index) => {
          // Obtener textos localizados de proyectos y experiencias de manera segura
          const isProject = Boolean(item.title);
          const displayDesc = isProject
            ? getLocalizedProjectDesc(item.title || "", language, item.description)
            : getLocalizedExperienceDesc(item.company || "", language, item.description);

          const displayRole = !isProject
            ? getLocalizedExperienceRole(item.company || "", language, item.role || "")
            : "";

          const isSelected = selectedItem && (
            (isProject && selectedItem.title === item.title) ||
            (!isProject && selectedItem.company === item.company)
          );

          return (
            <article 
              key={index} 
              className={`ProjectCard ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectItem?.(item)}
              style={onSelectItem ? { cursor: 'pointer' } : undefined}
            >
              {isProject && item.title === "Plynte.com" && (
                <div className="ProjectCard__watermark" aria-hidden="true">
                  {language === "en" ? "THIS PORTFOLIO" : "ESTE PROYECTO"}
                </div>
              )}
              <img
                src={item.image || '/pictures/default-project.jpg'}
                alt={item.title || item.company}
                className="ProjectCard__img"
                loading="lazy"
                draggable={false}
                style={{ pointerEvents: 'none' }}
              />

              <div className="ProjectCard__content">
                <h3 className="ProjectCard__title">
                  {item.title || `${displayRole} ${language === "en" ? "at" : "en"} ${item.company}`}
                </h3>
                <p className="ProjectCard__desc">{displayDesc}</p>

                <div className="ProjectCard__tags">
                  {item.techStack && item.techStack.map(tech => (
                    <span key={tech} className="ProjectCard__tag">{tech}</span>
                  ))}
                </div>

                {item.link && (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ProjectCard__link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t("portfolio.viewProject")}
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default DetailSection;
