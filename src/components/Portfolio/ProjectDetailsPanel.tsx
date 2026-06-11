// src/components/Portfolio/ProjectDetailsPanel.tsx
import { useState } from "react";
import type { ItemData } from "../../features/DetailSection/DetailSection";
import { useLanguage } from "../../contexts/LanguageContext";
import { getLocalizedProjectDesc, getLocalizedExperienceDesc, getLocalizedExperienceRole, getLocalizedProjectPeriod } from "../../data/projectTranslations";
import "./ProjectDetailsPanel.css";

interface ProjectDetailsPanelProps {
  item: ItemData | null;
  onClose: () => void;
  onOpenLightbox?: (imageUrl: string) => void;
}

export const ProjectDetailsPanel = ({ item, onClose, onOpenLightbox }: ProjectDetailsPanelProps) => {
  const { language, t } = useLanguage();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'architecture'>('details');

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
        <button className="ProjectDetailsPanel__close-btn" onClick={onClose} aria-label={language === "en" ? "Close" : "Cerrar"}>
          ✕
        </button>
      </div>

      <div className="ProjectDetailsPanel__body">
        {item.image && (
          <button
            type="button"
            className="ProjectDetailsPanel__img-container"
            onClick={() => {
              if (onOpenLightbox) {
                onOpenLightbox(item.image!);
              } else {
                setIsLightboxOpen(true);
              }
            }}
            aria-label={language === "en" ? "View fullscreen" : "Ver a pantalla completa"}
          >
            <img src={item.image} alt={displayTitle} className="ProjectDetailsPanel__img" />
          </button>
        )}

        <h2 className="ProjectDetailsPanel__title">
          {item.title || `${displayRole} ${language === "en" ? "at" : "en"} ${item.company}`}
        </h2>

        {item.company && isProject && (
          <h4 className="ProjectDetailsPanel__meta">{item.company}</h4>
        )}

        {item.period && (
          <div className="ProjectDetailsPanel__period">
            {getLocalizedProjectPeriod(item.title || item.company || "", language, item.period)}
          </div>
        )}

        {item.title === "Dog-bros (BroDogs)" && (
          <div className="ProjectDetailsPanel__tabs">
            <button 
              className={`ProjectDetailsPanel__tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              {language === "en" ? "Implementation & Tech" : "Implementación y Tech"}
            </button>
            <button 
              className={`ProjectDetailsPanel__tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
              onClick={() => setActiveTab('architecture')}
            >
              {language === "en" ? "Architecture Blueprint" : "Diseño de Arquitectura"}
            </button>
          </div>
        )}

        <div className="ProjectDetailsPanel__divider"></div>

        {activeTab === 'details' || item.title !== "Dog-bros (BroDogs)" ? (
          <>
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
                {item.company === "Cacao-Cocoa (RaukeIT)" && (
                  <a 
                    href="https://www.figma.com/design/7WwOrwfeQWIM29lMRMla73/Cacao?m=auto&t=HgMFoQ407ffaGWWZ-1" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ProjectDetailsPanel__figjam-btn"
                    style={{ marginTop: 'var(--space-2)' }}
                  >
                    🎨 {language === "en" ? "Figma Design" : "Diseño en Figma"}
                  </a>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="ProjectDetailsPanel__architecture">
            <h3 className="ProjectDetailsPanel__section-title">
              {language === "en" ? "System Design Blueprint" : "Plan de Arquitectura de Producción"}
            </h3>
            <p className="ProjectDetailsPanel__desc">
              {language === "en"
                ? "This blueprint maps the physical dark kitchen operations directly to software engineering patterns, outlining a production-ready architecture design and proactive risk mitigation strategies (not implemented in the current live frontend MVP)."
                : "Este plano mapea las operaciones físicas de la dark kitchen directamente con patrones de ingeniería de software, detallando una propuesta de arquitectura de producción y mitigación de riesgos (no implementados en el MVP actual de solo frontend)."}
            </p>
            <div className="architecture-grid">
              <div className="architecture-card">
                <h5>🛡️ {language === "en" ? "Early Payload Validation" : "Validación Temprana de Payload"}</h5>
                <p>
                  {language === "en" 
                    ? "Prevents 'last-mile' delivery failures by validating complete transaction details (payment method, bill denomination, exact address) at the client level before pushing to the core queue."
                    : "Previene fallos en la 'última milla' validando los detalles completos de la orden (método de pago, denominación del billete, dirección exacta) en el cliente antes de ingresarla a la cola del sistema."}
                </p>
              </div>
              <div className="architecture-card">
                <h5>🔄 {language === "en" ? "Asynchronous Decoupling" : "Desacoplamiento Asíncrono"}</h5>
                <p>
                  {language === "en"
                    ? "Kitchen preparation and courier dispatch operate as independent microservices. Couriers listen for the 'ORDER_READY' event, eliminating main-thread blocking and sync dependencies."
                    : "La preparación en cocina y el despacho de repartidores operan como microservicios desacoplados. Las motos escuchan el evento asíncrono 'ORDER_READY', eliminando bloqueos y dependencias síncronas."}
                </p>
              </div>
              <div className="architecture-card">
                <h5>⏱️ {language === "en" ? "Retention Async Timer" : "Timer Asíncrono de Retención"}</h5>
                <p>
                  {language === "en"
                    ? "A custom retention alarm (40-70 mins post-delivery) automates proactive QA. Captures high-value customer feedback for social proof (Instagram) or mitigates cold-delivery complaints offline."
                    : "Un temporizador automático (40-70 mins post-entrega) gatilla un QA proactivo. Captura reseñas de alto valor para marketing o contiene quejas por comida fría de forma offline antes de que lleguen a redes."}
                </p>
              </div>
              <div className="architecture-card">
                <h5>🚦 {language === "en" ? "Priority Queue (Jiutepec)" : "Cola de Prioridades (Jiutepec)"}</h5>
                <p>
                  {language === "en"
                    ? "Location-based routing algorithm. Orders from the immediate local zone (Jiutepec) are dynamically tagged as HIGH_PRIORITY to minimize overhead and maximize delivery turnaround."
                    : "Algoritmo de ruteo por geocercanía. Los pedidos de la zona local inmediata (Jiutepec) se etiquetan dinámicamente con ALTA_PRIORIDAD para reducir costos logísticos y acelerar los despachos."}
                </p>
              </div>
            </div>
            <div className="ProjectDetailsPanel__figjam-container" style={{ marginTop: 'var(--space-6)' }}>
              <a 
                href="https://www.figma.com/board/pQMpB4D8A26F9nYB0CG2gb/SamBurger?node-id=0-1&p=f&t=HgMFoQ407ffaGWWZ-0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ProjectDetailsPanel__figjam-btn"
              >
                🎨 {language === "en" ? "View Full Interactive FigJam Board" : "Ver Diagrama Completo en FigJam"}
              </a>
            </div>
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
