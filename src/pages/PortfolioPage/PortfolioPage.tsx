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

export default function PortfolioPage() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [selectedTech, setSelectedTech] = useState<string | null>(null);
    const scrollFrameRef = useRef<number | null>(null);

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
                text1="Mi"
                text2="Portafolio"
            />
            <div className="PortfolioPage__intro-section">
                <PageHeader
                    eyebrow="Portafolio"
                    title="Proyectos, experiencia y stack real"
                    description="Una vista directa de lo que he construido, las tecnologias que uso y el tipo de problemas que puedo resolver."
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
                    titleHead="Ingeniero"
                    title="En Sistemas"
                    imageClassName='alternative-image'
                    subtitle="Computacionales"
                    description={cvData.profile.bio}
                    source="/pictures/Homepicture.webp"
                    alt="Ilustración Gustavo"
                />
            </div>
            

            {/* 4. UX Reclutador: Filtro dinámico de proyectos */}
            <DetailSection
                layout="right"
                title="Mis Proyectos"
                description={selectedTech
                    ? `Mostrando proyectos construidos con ${selectedTech}.`
                    : "Desarrollo enfocado en resolver problemáticas reales con tecnologías modernas."}
                icons={[TsIcon, VercelIcon, ReactIcon]}
                items={filteredProjects}
            >
                {/* Este div completo entra como "children" en el DetailSection */}
                <div className="filter-pills">
                    <button
                        className={`filter-btn ${selectedTech === null ? 'active' : ''}`}
                        onClick={() => setSelectedTech(null)}
                    >
                        Todos
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
                    <h3 className="">Me gusta desarrollar <span>mis ideas</span> y compartir <span>mis aprendizajes</span></h3>
                </div>
            </section>

            {/* 6. Experiencia Laboral */}
            <DetailSection
                layout="center"
                title="Experiencia Profesional"
                description="Implementación de infraestructura, desarrollo web y continuidad operativa en entornos reales."
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
