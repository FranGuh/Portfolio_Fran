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
import { generateSlug } from "../../utils/slug";
import { SEOHead } from "../../components/SEOHead";
import { useLanguage } from "../../contexts/LanguageContext";

const imagesToLoad = [
    "/pictures/ImgProyects/RedirectLink/Home.webp",
    "/pictures/ImgProyects/ComputerHelper/CSH.webp",
    "/pictures/ImgProyects/Chat/ChatMovil.webp",
    "/pictures/drawsByMe/drawByMe.webp",
];

const HomePage = () => {
  const loading = useImagePreloader(imagesToLoad, "homePortfolioCargado");
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (loading) return <Loader message="Cargando portfolio..." />;

  return (
    <>
      <SEOHead 
        title="Ingeniero Full Stack" 
        description="Portafolio de Gustavo Francisco, Ingeniero Full Stack especializado en diseño funcional, experiencias modernas y despliegues en la nube." 
      />
      <HomeSection 
        text1={t("home.intro")}
        text2={t("home.name")}
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
          title={t("about.sectionTitle")}
          titleHead={t("about.sectionTitleHead")}
          subtitle={t("about.sectionSubtitle")}
          description={t("about.sectionDescription")}
          source="/pictures/drawsByMe/drawByMe.webp"
          alt="Ilustración creativa"
        />
      </div>

      <div className="Home__floating">
        <h2 className="Home__title Home__title--floating">{t("home.floatingTitle")}</h2>
        <p className="Home__motto" style={{ marginBottom: "var(--space-6)" }}>{t("home.floatingMotto")}</p>
        <Button className="" onClick={() => navigate("/portfolio")}>
          {t("home.exploreBtn")}
        </Button>
      </div>
    </>
  );
};

export default HomePage;
