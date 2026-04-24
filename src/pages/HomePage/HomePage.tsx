import Loader from "../../components/UI/Loader/Loader";
import "../../styles/bg.css";
import HomeSection from "../../features/HomeSection/HomeSection";
import ImgContainer from "../../components/UI/ImgContainer/ImgContainer";
import "./HomePage.css";
import ScrollableContainer from "../../components/UI/ScrollableContainer/ScrollableContainer";
import AboutSection from "../../features/AboutSection/AboutSection";
import Button from "../../components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { useImagePreloader } from "../../hooks/useImagePreloader";
import { generateSlug } from "../DetailsPage/DetailsPage";
import { SEOHead } from "../../components/SEOHead";

const imagesToLoad = [
    "/pictures/ImgProyects/RedirectLink/Home.webp",
    "/pictures/ImgProyects/ComputerHelper/CSH.webp",
    "/pictures/ImgProyects/Chat/ChatMovil.webp",
    "/pictures/drawsByMe/drawByMe.webp",
];

const HomePage = () => {
  const loading = useImagePreloader(imagesToLoad, "homePortfolioCargado");
  const navigate = useNavigate();

  if (loading) return <Loader message="Cargando portfolio..." />;

  return (
    <>
      <SEOHead 
        title="Ingeniero Full Stack" 
        description="Portafolio de Gustavo Francisco, Ingeniero Full Stack especializado en diseño funcional, experiencias modernas y despliegues en la nube." 
      />
      <HomeSection 
        text1="Ingeniero"
        text2="Full Stack"
      />

      <section className="Home__proyects">
        <ScrollableContainer>
          <ImgContainer
            source="/pictures/ImgProyects/RedirectLink/Home.webp"
            alt="Landing RedirectLink"
            title="RedirectLink"
            href="https://redirect-link-flame.vercel.app/"
          />
          <ImgContainer
            source="/pictures/ImgProyects/ComputerHelper/CSH.webp"
            alt="Landing CSH"
            title="Selector de Laptops"
            href="https://computer-selector-helper.vercel.app/"
          />
          <ImgContainer
            source="/pictures/goatatwork.webp"
            alt="Plataforma RaukeIT"
            title="Backend & Cloud"
            href={`/portfolio/${generateSlug('Desarrollador e Implementador de Infraestructura')}`}
          />
        </ScrollableContainer>
      </section>

      <div className="bg-pan-right Home__about-section">
        <AboutSection
          title="Desarrollador"
          titleHead="Mi enfoque"
          subtitle="FULL STACK"
          description="Descubrí el desarrollo web accidentalmente, y desde entonces no he parado. Mi enfoque prioriza el diseño visual limpio (UX/UI) y arquitecturas sólidas (TSX/AWS/DBs). Constantemente aprendo e investigo para que cada línea de código aporte valor real."
          source="/pictures/drawsByMe/drawByMe.webp"
          alt="Ilustración creativa"
        />
      </div>

      <div className="Home__floating">
        <h2 className="Home__title" style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-2)" }}>Listo para empezar un proyecto</h2>
        <p className="Home__motto" style={{ marginBottom: "var(--space-6)" }}>Conoce más sobre mis proyectos.</p>
        <Button className="" onClick={() => navigate("/portfolio")}>
          Explorar Portfolio
        </Button>
      </div>
    </>
  );
};

export default HomePage;
