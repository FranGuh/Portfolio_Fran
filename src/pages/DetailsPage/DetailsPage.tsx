import { useParams, useNavigate } from 'react-router-dom'
import { cvData } from '../../data/cvData'
import Button from '../../components/UI/Button/Button'
import DetailSection from '../../features/DetailSection/DetailSection'
import FeatureSelector from '../../features/FeatureSelector/FeatureSelector'
import PageHeader from '../../components/UI/PageHeader/PageHeader'
import { SEOHead } from '../../components/SEOHead'
import { generateSlug } from '../../utils/slug'
import './DetailsPage.css'
import { useLanguage } from '../../contexts/LanguageContext'
import { InfrastructureDetail } from '../../features/InfrastructureDetail/InfrastructureDetail'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import HomeSection from '../../features/HomeSection/HomeSection'
import {
  getLocalizedProjectDesc,
  getLocalizedExperienceRole,
  getLocalizedExperienceDesc
} from '../../data/projectTranslations'

type DetailTarget =
  | { type: 'project'; data: NonNullable<(typeof cvData.projects)[number]> }
  | { type: 'experience'; data: NonNullable<(typeof cvData.experience)[number]> };

const DetailsPage = () => {
  const { slug: rawSlug } = useParams();
  const slug = rawSlug?.toLowerCase();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const project = cvData.projects.find(p => (p.slug ?? generateSlug(p.title)) === slug);
  const experience = !project ? cvData.experience.find(e => generateSlug(e.role) === slug) : null;
  const target: DetailTarget | null = project
    ? { type: 'project', data: project }
    : experience
      ? { type: 'experience', data: experience }
      : null;

  if (!target) {
    return <NotFoundPage />;
  }

  const { data: targetData, type } = target;
  const isExperience = type === 'experience';

  // Obtener descripciones y roles traducidos de manera dinámica y segura
  const displayDesc = !isExperience
    ? getLocalizedProjectDesc(targetData.title || "", language, targetData.description)
    : getLocalizedExperienceDesc(targetData.company || "", language, targetData.description);

  const displayRole = isExperience
    ? getLocalizedExperienceRole(targetData.company || "", language, targetData.role || "")
    : "";

  const pageTitle = isExperience 
    ? `${displayRole} ${language === "en" ? "at" : "en"} ${targetData.company}` 
    : targetData.title;

  return (
    <div className={`Details ${slug === 'desarrollador-e-implementador-de-infraestructura' ? 'Details--dark' : ''}`}>
      <SEOHead 
        title={pageTitle} 
        description={displayDesc} 
        image={targetData.image}
      />
      <HomeSection 
        text1={isExperience 
          ? (language === "en" ? 'My' : 'Mi') 
          : (language === "en" ? 'Project' : 'Detalle')
        }
        text2={isExperience 
          ? (language === "en" ? 'Experience' : 'Experiencia') 
          : (language === "en" ? 'Details' : 'Proyecto')
        }
      />
      <PageHeader 
        eyebrow={isExperience 
          ? (language === "en" ? 'Experience' : 'Experiencia') 
          : (language === "en" ? 'Project' : 'Proyecto')
        }
        title={pageTitle}
        description={displayDesc}
      />
      {slug === 'desarrollador-e-implementador-de-infraestructura' ? (
        <InfrastructureDetail />
      ) : (
        <>
          <DetailSection
            backgroundImg={targetData.image}
            backgroundAlt={pageTitle}
            title={pageTitle}
            description={displayDesc}
            items={[targetData]} 
            layout="right"
          />
          <FeatureSelector />
        </>
      )}

      <div className="Details__floating-container">
          <Button className='button--floating' onClick={() => navigate(-1)}>
          {language === "en" ? "Go back" : "Volver atrás"}
        </Button>
      </div>
    </div>
  )
}

export default DetailsPage
