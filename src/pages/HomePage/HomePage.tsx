import "../../styles/bg.css";
import HomeSection from "../../features/HomeSection/HomeSection";
import ImgContainer from "../../components/UI/ImgContainer/ImgContainer";
import "./HomePage.css";
import "./HomeFloating.css";
import ScrollableContainer from "../../components/UI/ScrollableContainer/ScrollableContainer";
import AboutSection from "../../features/AboutSection/AboutSection";
import Button from "../../components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { generateSlug } from "../../utils/slug";
import { SEOHead } from "../../components/SEOHead";
import { useLanguage } from "../../contexts/LanguageContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <>
      <SEOHead 
        title="Ingeniero Full Stack" 
        description="Portafolio de Gustavo Francisco, Ingeniero Full Stack especializado en diseño funcional, experiencias modernas y despliegues en la nube." 
      />
      <HomeSection
        text1={t("home.intro")}
        text2={t("home.name")}
        titleAs="h1"
      />

      <section className="Home__proyects">
        <ScrollableContainer>
          <ImgContainer
            source="/pictures/ImgProyects/RedirectLink/Home.webp"
            alt={t("home.projects.redirectAlt")}
            title="RedirectLink"
            href="https://redirect-link-flame.vercel.app/"
          />
          <ImgContainer
            source="/pictures/ImgProyects/ComputerHelper/CSH.webp"
            alt={t("home.projects.selectorAlt")}
            title={t("home.projects.selectorTitle")}
            href="https://computer-selector-helper.vercel.app/"
          />
          <ImgContainer
            source="/pictures/goatatwork.webp"
            alt={t("home.projects.backendAlt")}
            title={t("home.projects.backendTitle")}
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
        <div className="Home__floating-card">
          <h2 className="Home__title Home__title--floating">{t("home.floatingTitle")}</h2>
          <p className="Home__motto">{t("home.floatingMotto")}</p>
          <Button className="" onClick={() => navigate("/portfolio")}>
            {t("home.exploreBtn")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
