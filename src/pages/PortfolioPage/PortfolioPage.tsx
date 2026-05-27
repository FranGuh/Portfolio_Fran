import { useState, useEffect, useRef } from 'react';
import { cvData } from '../../data/cvData';

import AboutSection from '../../features/AboutSection/AboutSection';
import DetailSection from '../../features/DetailSection/DetailSection';
import HomeSection from '../../features/HomeSection/HomeSection';
import { VercelIcon, ReactIcon, TsIcon, AWSIcon, AWSRDSIcon } from '../../components/UI/Icons/SvgIcons';
import ContactForm from '../../components/Contacto/ContactForm';
import { SEOHead } from '../../components/SEOHead';
import PageHeader from '../../components/UI/PageHeader/PageHeader';
import './PortfolioPage.css';
import '../../styles/GlassUpgrades.css';
import { useLanguage } from '../../contexts/LanguageContext';

export default function PortfolioPage() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [selectedTech, setSelectedTech] = useState<string | null>(null);
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
            <DetailSection
                layout="right"
                title={t("portfolio.titleProjects")}
                description={selectedTech
                    ? t("portfolio.descProjectsFiltered").replace("{tech}", selectedTech)
                    : t("portfolio.descProjectsAll")}
                icons={[TsIcon, VercelIcon, ReactIcon]}
                items={filteredProjects}
            >
                {/* Este div completo entra como "children" en el DetailSection */}
                <div className="filter-pills">
                    <button
                        className={`filter-btn ${selectedTech === null ? 'active' : ''}`}
                        onClick={() => setSelectedTech(null)}
                    >
                        {t("portfolio.filterAll")}
                    </button>
                    {allProjectTechs.map(tech => (
                        <button
                            key={tech}
                            className={`filter-btn ${selectedTech === tech ? 'active' : ''}`}
                            onClick={() => setSelectedTech(tech)}
                        >
                            {tech}
                        </button>
                    ))}
                </div>
            </DetailSection>

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
        </div>
    );
}
