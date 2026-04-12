import { useState, useEffect } from 'react';
import { cvData } from '../../data/cvData';

import AboutSection from '../../components/UI/AboutSection/AboutSection';
import DetailSection from '../../components/UI/DetailSection/DetailSection';
import HomeSection from '../../components/UI/HomeSection/HomeSection';
import { VercelIcon, ReactIcon, TsIcon, AWSIcon, AWSRDSIcon } from '../../components/UI/Icons/SvgIcons';
import './Portfolio.css';

export default function PortfolioPage() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [selectedTech, setSelectedTech] = useState<string | null>(null);

    // Lógica de Barra de Progreso
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${(totalScroll / windowHeight) * 100}`;
            setScrollProgress(Number(scroll));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
            <HomeSection
                text1="Mi"
                text2="Portafolio"
            />

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

            {/* 6. Experiencia Laboral */}
            <DetailSection
                layout="left"
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
        </div>
    );
}