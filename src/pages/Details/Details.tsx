import Button from '../../components/UI/Button/Button'
import DetailSection from '../../features/DetailSection/DetailSection'
import FeatureSelector from '../../features/FeatureSelector/FeatureSelector'
import HomeSection from '../../features/HomeSection/HomeSection'
import { HtmlIcon, VercelIcon, TsIcon, ReactIcon, CssIcon } from '../../components/UI/Icons/SvgIcons'
import './Details.css'
import { useNavigate } from 'react-router-dom'

const Details = () => {
  const navigate = useNavigate();
  return (
    <div className='Details'>
      <HomeSection 
        text1='Detalles'
        text2='Portfolio'
      />
      <DetailSection
      backgroundImg="/pictures/Aqua.webp"
      backgroundAlt="Fondo de la princesa Zelda"
      title="Soy Gustavo Francisco"
      description="Soy desarrollador web con experiencia en HTML, CSS y JavaScript/TypeScript, especializado en el desarrollo Frontend utilizando React para crear aplicaciones web dinámicas y SPA (Single Page Applications).

También he explorado otros frameworks como Svelte.
Tengo conocimientos en bases de datos en la nube como MongoDB Atlas y experiencia utilizando servicios en la nube como AWS. Me interesa crear interfaces agradables, accesibles y funcionales, cuidando el diseño visual con HTML y CSS.
"
      icons={[HtmlIcon, TsIcon, VercelIcon]}
      items={[
        // {
        //   source: "/pictures/ImgProyects/Zelda2.svg",
        //   alt: "Zelda",
        //   title: "Zelda",
        //   href: "https://redirect-link-flame.vercel.app/",
        // },
      ]}
    />

    <FeatureSelector />

    <DetailSection
      backgroundImg="/pictures/Aqua.webp"
      backgroundAlt="Fondo de la princesa Zelda"
      title="Desarrollo de mi propio portafolio web."
      description="En mi tiempo libre he desarrollado varios proyectos prácticos, incluyendo:
Implementación de un chatbot con DeepSeek desplegado en Vercel.
Desarrollo de mi propio portafolio web.
Un sistema experto con inferencia que recomienda computadoras en base a preguntas seleccionadas por el usuario.

Estoy en búsqueda de una oportunidad laboral que me permita seguir creciendo como desarrollador web y dedicarme de forma plena a este campo profesional que me apasiona."
      icons={[CssIcon, TsIcon, ReactIcon]}
      items={[
        // {
        //   source: "/pictures/ImgProyects/Urbosa.svg",
        //   alt: "Zelda",
        //   title: "Urbosa",
        //   href: "https://redirect-link-flame.vercel.app/",
        // },
      ]}
      layout='left'
    />
    <div className="Details__floating">
        <Button className='button--floating' onClick={() => navigate("/about")}>
        Volver a Sobre mí
      </Button>
    </div>
    <div className="bg-pan-right">
      {/* Aquí puedes agregar más contenido o secciones si lo deseas */}
    </div>
    </div>
  )
}

export default Details
