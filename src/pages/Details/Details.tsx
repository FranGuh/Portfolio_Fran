import Button from '../../components/UI/Button/Button'
import DetailSection from '../../components/UI/DetailSection/DetailSection'
import HomeSection from '../../components/UI/HomeSection/HomeSection'
import { HtmlIcon, VercelIcon, TsIcon, ReactIcon, CssIcon } from '../../components/UI/Icons/SvgIcons'
import './Details.css'

const Details = () => {
  return (
    <div className='Details'>
      <HomeSection 
        text1='Detalles'
        text2='Portfolio'
      />
      <DetailSection
      backgroundImg="/pictures/ImgProyects/Zelda.webp"
      backgroundAlt="Fondo de la princesa Zelda"
      title="Soy Gustavo Francisco –  Desarrollador Web Frontend / Backend"
      description="Soy desarrollador web con experiencia en HTML, CSS y JavaScript/TypeScript, especializado en el desarrollo Frontend utilizando React para crear aplicaciones web dinámicas y SPA (Single Page Applications).

También he explorado otros frameworks como Svelte.
Tengo conocimientos en bases de datos en la nube como MongoDB Atlas y experiencia utilizando servicios en la nube como AWS. Me interesa crear interfaces agradables, accesibles y funcionales, cuidando el diseño visual con HTML y CSS.
"
      icons={[HtmlIcon, TsIcon, VercelIcon]}
      images={[
        {
          source: "/pictures/ImgProyects/Zelda2.svg",
          alt: "Zelda",
          title: "Zelda",
          href: "https://redirect-link-flame.vercel.app/",
        },
        {
          source: "/pictures/ImgProyects/Prunia.svg",
          alt: "Zelda",
          title: "Prunia",
          href: "https://redirect-link-flame.vercel.app/",
        },
        {
          source: "/pictures/ImgProyects/Josha.svg",
          alt: "Zelda",
          title: "Josha",
          href: "https://redirect-link-flame.vercel.app/",
        },
      ]}
    />

    <DetailSection
      backgroundImg="/pictures/ImgProyects/Talk.svg"
      backgroundAlt="Fondo de la princesa Zelda"
      title="Desarrollo de mi propio portafolio web."
      description="En mi tiempo libre he desarrollado varios proyectos prácticos, incluyendo:
Implementación de un chatbot con DeepSeek desplegado en Vercel.
Desarrollo de mi propio portafolio web.
Un sistema experto con inferencia que recomienda computadoras en base a preguntas seleccionadas por el usuario.

Estoy en búsqueda de una oportunidad laboral que me permita seguir creciendo como desarrollador web y dedicarme de forma plena a este campo profesional que me apasiona."
      icons={[CssIcon, TsIcon, ReactIcon]}
      images={[
        {
          source: "/pictures/ImgProyects/Urbosa.svg",
          alt: "Zelda",
          title: "Urbosa",
          href: "https://redirect-link-flame.vercel.app/",
        },
        {
          source: "/pictures/ImgProyects/Prunia.svg",
          alt: "Zelda",
          title: "Prunia",
          href: "https://redirect-link-flame.vercel.app/",
        },
        {
          source: "/pictures/ImgProyects/Sapo.svg",
          alt: "Zelda",
          title: "Sapo",
          href: "https://redirect-link-flame.vercel.app/",
        },
      ]}
      layout='left'
    />
    <div className="Details__floating">
      <Button text="Sobre Mí" redirection="/about"/>
    </div>
    </div>
  )
}

export default Details
