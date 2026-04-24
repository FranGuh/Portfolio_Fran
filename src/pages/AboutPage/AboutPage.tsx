import HomeSection from "../../features/HomeSection/HomeSection";
import "./AboutPage.css";
import AboutSection from "../../features/AboutSection/AboutSection";
import Button from "../../components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { SEOHead } from "../../components/SEOHead";

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <SEOHead 
        title="Sobre Mí" 
        description="Conoce mi historia como Desarrollador Full Stack, mi filosofía de diseño y mi enfoque técnico resolviendo problemas complejos." 
      />
      {/* Siempre me he cuestionado si realmente tengo la capacidad de hacer algo importante,
      supongo que sí, pero a la hora de desarrollar una idea en mi cabeza soy incapaz de dejarla vivir ahi, me gusta profundizar sobre ella aun sabiendo
      que fracasaré pero almenos se que aprenderé de ello, últimamente cuestiono mis conocimientos día a día, aunque me cueste demasiado entenderlo." */}
      <HomeSection text1="Soy" text2="Francisco" />
      <AboutSection
        title="Desarrollador"
        titleHead="Creativo"
        subtitle="Sobre mí"
        description="Siempre cuestiono mis ideas y desafio mis propios límites.
         Cuando algo me interesa, lo llevo más allá, incluso sabiendo que puedo fallar. Para mí, cada intento es una forma de aprender y construir algo mejor. 
         Últimamente he enfocado esa mentalidad en mejorar mis habilidades día a día,
          enfrentando lo que aún no entiendo. Algo que quisiera saber es si el ser humano tiene límites o si se los impone a sí mismo..."
        source="/pictures/drawsByMe/Artur_master.webp"
        alt="Dibujo hecho por mí en Adobe Photoshop"
      />
      <div className="About__floating">
        <Button className="button--floating" onClick={() => navigate("/portfolio")}>
          Ver Portafolio
        </Button>
      </div>
      <div className="bg-pan-right">
        {/* Aquí puedes agregar más contenido o secciones si lo deseas */}
      </div>
    </>
  );
};

export default AboutPage;
