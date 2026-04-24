import { useParams, useNavigate } from 'react-router-dom'
import { cvData } from '../../data/cvData'
import Button from '../../components/UI/Button/Button'
import DetailSection from '../../features/DetailSection/DetailSection'
import FeatureSelector from '../../features/FeatureSelector/FeatureSelector'
import HomeSection from '../../features/HomeSection/HomeSection'
import { SEOHead } from '../../components/SEOHead'
import './DetailsPage.css'

export const generateSlug = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const DetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Buscar en proyectos y luego en experiencia
  const project = cvData.projects.find(p => generateSlug(p.title) === slug);
  const experience = !project ? cvData.experience.find(e => generateSlug(e.role) === slug) : null;
  
  const targetData = (project || experience) as any; // Hack: Type union resolving

  if (!targetData) {
    return (
      <div className='Details Details__not-found'>
        <SEOHead title="No encontrado" description="El recurso especificado no ha sido encontrado." />
        <h2>El proyecto o experiencia no fue encontrado</h2>
        <br />
        <Button onClick={() => navigate("/portfolio")}>Volver a Portafolio</Button>
      </div>
    );
  }

  const isExperience = 'company' in targetData;

  return (
    <div className='Details'>
      <SEOHead 
        title={targetData.title || `${targetData.role} en ${targetData.company}`} 
        description={targetData.description} 
        image={targetData.image}
      />
      <HomeSection 
        text1={isExperience ? 'Experiencia' : 'Proyecto'}
        text2='Detalles'
      />
      <DetailSection
        backgroundImg={targetData.image}
        backgroundAlt={targetData.title || targetData.role}
        title={targetData.title || `${targetData.role} en ${targetData.company}`}
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
