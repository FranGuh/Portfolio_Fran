import { useParams, useNavigate } from 'react-router-dom'
import { cvData } from '../../data/cvData'
import Button from '../../components/UI/Button/Button'
import DetailSection from '../../features/DetailSection/DetailSection'
import FeatureSelector from '../../features/FeatureSelector/FeatureSelector'
import PageHeader from '../../components/UI/PageHeader/PageHeader'
import { SEOHead } from '../../components/SEOHead'
import { generateSlug } from '../../utils/slug'
import './DetailsPage.css'

type DetailTarget =
  | { type: 'project'; data: NonNullable<(typeof cvData.projects)[number]> }
  | { type: 'experience'; data: NonNullable<(typeof cvData.experience)[number]> };

const DetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const project = cvData.projects.find(p => generateSlug(p.title) === slug);
  const experience = !project ? cvData.experience.find(e => generateSlug(e.role) === slug) : null;
  const target: DetailTarget | null = project
    ? { type: 'project', data: project }
    : experience
      ? { type: 'experience', data: experience }
      : null;

  if (!target) {
    return (
      <div className='Details Details__not-found'>
        <SEOHead title="No encontrado" description="El recurso especificado no ha sido encontrado." />
        <h2>El proyecto o experiencia no fue encontrado</h2>
        <br />
        <Button onClick={() => navigate("/portfolio")}>Volver a Portafolio</Button>
      </div>
    );
  }

  const { data: targetData, type } = target;
  const isExperience = type === 'experience';
  const pageTitle = isExperience ? `${targetData.role} en ${targetData.company}` : targetData.title;

  return (
    <div className='Details'>
      <SEOHead 
        title={pageTitle} 
        description={targetData.description} 
        image={targetData.image}
      />
      <PageHeader 
        eyebrow={isExperience ? 'Experiencia' : 'Proyecto'}
        title={pageTitle}
        description={targetData.description}
      />
      <DetailSection
        backgroundImg={targetData.image}
        backgroundAlt={pageTitle}
        title={pageTitle}
        description={targetData.description}
        items={[targetData]} 
        layout="right"
      />

      <FeatureSelector />

      <div className="Details__floating-container">
          <Button className='button--floating' onClick={() => navigate(-1)}>
          Volver atrás
        </Button>
      </div>
    </div>
  )
}

export default DetailsPage
