import { useState, useEffect, useRef } from 'react';
import { cvData } from '../../data/cvData';

import AboutSection from '../../features/AboutSection/AboutSection';
import DetailSection from '../../features/DetailSection/DetailSection';
import type { ItemData } from '../../features/DetailSection/DetailSection';
import HomeSection from '../../features/HomeSection/HomeSection';
import { VercelIcon, ReactIcon, TsIcon, AWSIcon, AWSRDSIcon } from '../../components/UI/Icons/SvgIcons';
import ContactForm from '../../components/Contacto/ContactForm';
import { SEOHead } from '../../components/SEOHead';
import PageHeader from '../../components/UI/PageHeader/PageHeader';
import { ProjectDetailsPanel } from '../../components/Portfolio/ProjectDetailsPanel';
import './PortfolioPage.css';
import '../../styles/GlassUpgrades.css';
import { useLanguage } from '../../contexts/LanguageContext';

const CORE_TECHS = ["React", "TypeScript", "Python", "AWS", "Ollama", "NextJS", "Vite", "Android", "Cloudflare"];

export default function PortfolioPage() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [selectedTech, setSelectedTech] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<ItemData | null>(null);
    const [lightboxActiveImage, setLightboxActiveImage] = useState<string | null>(null);
    const [isLightboxVisible, setIsLightboxVisible] = useState(false);
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const scrollFrameRef = useRef<number | null>(null);
    const { language, t } = useLanguage();

    useEffect(() => {
        const updateProgress = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
            setScrollProgress(progress);
            scrollFrameRef.current = null;
        };

        const handleScroll = () => {
            if (scrollFrameRef.current !== null) return;
            scrollFrameRef.current = requestAnimationFrame(updateProgress);
        };

        window.addEventListener('scroll', handleScroll);
        updateProgress();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollFrameRef.current !== null) {
                cancelAnimationFrame(scrollFrameRef.current);
            }
        };
    }, []);

    const closeTimeoutRef = useRef<number | null>(null);

    const openLightbox = (imageUrl: string) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setLightboxActiveImage(imageUrl);
        // Esperamos un frame para aplicar la clase is-open y disparar la animación de entrada
        requestAnimationFrame(() => {
            setIsLightboxVisible(true);
        });
    };

    const closeLightbox = () => {
        setIsLightboxVisible(false);
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        closeTimeoutRef.current = window.setTimeout(() => {
            setLightboxActiveImage(null);
            closeTimeoutRef.current = null;
        }, 300); // Mismo tiempo que la transición de CSS (0.3s)
    };

    // Cerrar el modal/lightbox automáticamente si el usuario hace scroll o desplaza la pantalla
    useEffect(() => {
        if (!isLightboxVisible) return;

        const handleScrollClose = () => {
            closeLightbox();
        };

        window.addEventListener('scroll', handleScrollClose, { passive: true, capture: true });
        
        return () => {
            window.removeEventListener('scroll', handleScrollClose, { capture: true });
        };
    }, [isLightboxVisible]);

    // Extraer tecnologías únicas para el filtro
    const allProjectTechs = Array.from(
        new Set(cvData.projects.flatMap(p => p.techStack))
    ).sort();

    // Filtrado de proyectos para inyectar en DetailSection
    const filteredProjects = selectedTech
        ? cvData.projects.filter(p => p.techStack.includes(selectedTech))
        : cvData.projects;

    return (
        <div className="PortfolioPage" id="PortofioPage">
            <SEOHead 
                title="Portafolio de Proyectos" 
                description="Explora mis proyectos recientes, arquitecturas en la nube y mi experiencia técnica trabajando con stacks modernos." 
            />
            <HomeSection
                text1={language === "en" ? "My" : "Mi"}
                text2={language === "en" ? "Portfolio" : "Portafolio"}
            />
            <div className="PortfolioPage__intro-section">
                <PageHeader
                    eyebrow={t("portfolio.eyebrow")}
                    title={t("portfolio.title")}
                    description={t("portfolio.description")}
                />
            </div>

            {/* 1. UX Reclutador: Barra de progreso global */}
            <div className="PortfolioPage__progress-container">
                <div
                    className="PortfolioPage__progress-bar"
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>


            {/* 2. Hero y Biografía */}
            <div className='bg-pan-right'>
                <AboutSection
                    titleHead={language === "en" ? "Systems" : "En Sistemas"}
                    title={language === "en" ? "Computer" : "Ingeniero"}
                    imageClassName='alternative-image'
                    subtitle={language === "en" ? "Engineer" : "Computacionales"}
                    description={language === "en" ? "Specialized in dynamic resource optimization and operational continuity through automated systems. Experienced in cloud servers administration, comprehensive technical support and processes automation." : cvData.profile.bio}
                    source="/pictures/Homepicture.webp"
                    alt="Ilustración Gustavo"
                />
            </div>
            

            {/* 4. UX Reclutador: Filtro dinámico de proyectos */}
            <div className={`ProjectsDashboard ${selectedProject ? "has-split-layout" : ""}`}>
                <div className="ProjectsDashboard__list">
                    <DetailSection
                        layout="right"
                        title={t("portfolio.titleProjects")}
                        description={selectedTech
                            ? t("portfolio.descProjectsFiltered").replace("{tech}", selectedTech)
                            : t("portfolio.descProjectsAll")}
                        icons={[TsIcon, VercelIcon, ReactIcon]}
                        items={filteredProjects}
                        onSelectItem={(item) => setSelectedProject(item)}
                        selectedItem={selectedProject}
                    >
                        {/* Este div completo entra como "children" en el DetailSection */}
                        <div className="filter-pills">
                            <button
                                className={`filter-btn ${selectedTech === null ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedTech(null);
                                    setSelectedProject(null);
                                }}
                            >
                                {t("portfolio.filterAll")}
                            </button>
                            {allProjectTechs
                                .filter(tech => isFilterExpanded || CORE_TECHS.includes(tech) || selectedTech === tech)
                                .map(tech => (
                                    <button
                                        key={tech}
                                        className={`filter-btn ${selectedTech === tech ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedTech(tech);
                                            setSelectedProject(null);
                                        }}
                                    >
                                        {tech}
                                    </button>
                                ))
                            }
                            {allProjectTechs.length > allProjectTechs.filter(tech => CORE_TECHS.includes(tech) || selectedTech === tech).length && (
                                <button
                                    className="filter-btn filter-btn--toggle"
                                    onClick={() => setIsFilterExpanded(prev => !prev)}
                                >
                                    {isFilterExpanded 
                                        ? (language === "en" ? "Show less" : "Ver menos")
                                        : (language === "en" 
                                            ? `Show all (+${allProjectTechs.length - allProjectTechs.filter(tech => CORE_TECHS.includes(tech) || selectedTech === tech).length})` 
                                            : `Ver más (+${allProjectTechs.length - allProjectTechs.filter(tech => CORE_TECHS.includes(tech) || selectedTech === tech).length})`
                                          )
                                    }
                                </button>
                            )}
                        </div>
                    </DetailSection>
                </div>

                {/* Panel de detalles en desktop (Split Screen) */}
                <div className="ProjectsDashboard__panel-desktop">
                    <ProjectDetailsPanel 
                        key={selectedProject ? `desktop-${selectedProject.title || selectedProject.company}` : 'desktop-empty'}
                        item={selectedProject} 
                        onClose={() => setSelectedProject(null)} 
                        onOpenLightbox={openLightbox}
                    />
                </div>
            </div>

            {/* Bottom Sheet en Mobile (GPU optimized) */}
            <div 
                className={`bottom-sheet-backdrop ${selectedProject ? "is-open" : ""}`} 
                onClick={() => setSelectedProject(null)}
            ></div>
            <div className={`bottom-sheet-container ${selectedProject ? "is-open" : ""}`}>
                <ProjectDetailsPanel 
                    key={selectedProject ? `mobile-${selectedProject.title || selectedProject.company}` : 'mobile-empty'}
                    item={selectedProject} 
                    onClose={() => setSelectedProject(null)} 
                    onOpenLightbox={openLightbox}
                />
            </div>

            <section className="PortfolioPage__skills-grid">
                <div className="skills-container-alternative">
                    <h3 className="">
                        {language === "en" ? "I like to develop " : "Me gusta desarrollar "}
                        <span>{t("portfolio.skillsSpan1")}</span>
                        {language === "en" ? " and share " : " y compartir "}
                        <span>{t("portfolio.skillsSpan2")}</span>
                    </h3>
                </div>
            </section>

            {/* 6. Experiencia Laboral */}
            <DetailSection
                layout="center"
                title={t("portfolio.titleExperience")}
                description={t("portfolio.descExperience")}
                icons={[ReactIcon, AWSRDSIcon, AWSIcon]}
                items={cvData.experience}
            />

            <section className="PortfolioPage__skills-grid">
                <div className="skills-container">
                    {cvData.skills.map((skillGroup, index) => (
                        <div key={index} className="skill-category">
                            <h3 className="skill-category__title">{skillGroup.category}</h3>
                            <div className="skill-category__tags">
                                {skillGroup.skills.map((skill, i) => (
                                    <span key={i} className="skill-tag">{skill.name}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <ContactForm />

            {lightboxActiveImage && (
                <div className={`ProjectDetailsPanel__lightbox ${isLightboxVisible ? "is-open" : ""}`} onClick={closeLightbox}>
                    <button className="ProjectDetailsPanel__lightbox-close" onClick={closeLightbox}>
                        ✕
                    </button>
                    <img 
                        src={lightboxActiveImage} 
                        alt="Preview fullscreen" 
                        className="ProjectDetailsPanel__lightbox-img" 
                        onClick={(e) => e.stopPropagation()} 
                    />
                </div>
            )}
        </div>
    );
}
