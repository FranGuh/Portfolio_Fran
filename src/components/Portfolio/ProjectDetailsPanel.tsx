// src/components/Portfolio/ProjectDetailsPanel.tsx
import { useState } from "react";
import type { ItemData } from "../../features/DetailSection/DetailSection";
import { useLanguage } from "../../contexts/LanguageContext";
import { getLocalizedProjectDesc, getLocalizedExperienceDesc, getLocalizedExperienceRole } from "../../data/projectTranslations";
import "./ProjectDetailsPanel.css";

interface ProjectDetailsPanelProps {
  item: ItemData | null;
  onClose: () => void;
  onOpenLightbox?: (imageUrl: string) => void;
}

export const ProjectDetailsPanel = ({ item, onClose, onOpenLightbox }: ProjectDetailsPanelProps) => {
  const { language, t } = useLanguage();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!item) return null;

  const isProject = Boolean(item.title);
  const displayTitle = item.title || item.company;

  // Descripciones localizadas estándar
  let displayDesc = isProject
    ? getLocalizedProjectDesc(item.title || "", language, item.description)
    : getLocalizedExperienceDesc(item.company || "", language, item.description);

  const displayRole = !isProject
    ? getLocalizedExperienceRole(item.company || "", language, item.role || "")
    : "";

  // Inyección de Meta-Inception bilingüe para Plynte.com
  const isPlynte = item.title === "Plynte.com";
  if (isPlynte) {
    displayDesc = language === "en"
      ? "You are exploring this exact portfolio. It was designed utilizing React 19, Vite 6, modular vanilla CSS, lazy loading of routes, and a resilient, bilingual SEO/GEO metadata architecture. Its styling includes premium glassmorphic accents with hardware acceleration and clean fallback states for automated screen capture."
      : "Estás explorando este exacto portafolio. Fue diseñado utilizando React 19, Vite 6, modularización en CSS Vanilla, carga perezosa (lazy loading) de rutas, y una arquitectura de metadatos SEO/GEO bilingüe y resiliente. Su estilo incluye acentos premium esmerilados con aceleración por hardware y estados de fallback limpios para capturas de pantalla automatizadas.";
  }

  return (
    <div className="ProjectDetailsPanel">
      {isPlynte && (
        <div className="ProjectDetailsPanel__watermark" aria-hidden="true">
          {language === "en" ? "THIS PORTFOLIO" : "ESTE PROYECTO"}
        </div>
      )}
      <div className="ProjectDetailsPanel__header">
        <h3 className="ProjectDetailsPanel__eyebrow">
          {isProject ? t("portfolio.titleProjects") : t("portfolio.titleExperience")}
        </h3>
        <button className="ProjectDetailsPanel__close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <div className="ProjectDetailsPanel__body">
        {item.image && (
          <div 
            className="ProjectDetailsPanel__img-container"
            onClick={() => {
              if (onOpenLightbox) {
                onOpenLightbox(item.image!);
              } else {
                setIsLightboxOpen(true);
              }
            }}
            title={language === "en" ? "Click to view fullscreen" : "Hacé clic para ver a pantalla completa"}
          >
            <img src={item.image} alt={displayTitle} className="ProjectDetailsPanel__img" />
          </div>
        )}

        <h2 className="ProjectDetailsPanel__title">
          {item.title || `${displayRole} ${language === "en" ? "at" : "en"} ${item.company}`}
        </h2>

        {item.company && isProject && (
          <h4 className="ProjectDetailsPanel__meta">{item.company}</h4>
        )}

        <div className="ProjectDetailsPanel__divider"></div>

        <p className="ProjectDetailsPanel__desc">{displayDesc}</p>

        <h3 className="ProjectDetailsPanel__section-title">
          {language === "en" ? "Technologies Used" : "Tecnologías Utilizadas"}
        </h3>
        <div className="ProjectDetailsPanel__tags">
          {item.techStack.map(tech => (
            <span key={tech} className="ProjectDetailsPanel__tag">{tech}</span>
          ))}
        </div>

        {item.link && (
          <div className="ProjectDetailsPanel__actions">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="ProjectDetailsPanel__link-btn">
              {t("portfolio.viewProject")}
            </a>
          </div>
        )}
      </div>

      {isLightboxOpen && item.image && (
        <div className="ProjectDetailsPanel__lightbox" onClick={() => setIsLightboxOpen(false)}>
          <button className="ProjectDetailsPanel__lightbox-close" onClick={() => setIsLightboxOpen(false)}>
            ✕
          </button>
          <img 
            src={item.image} 
            alt={displayTitle} 
            className="ProjectDetailsPanel__lightbox-img" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};
