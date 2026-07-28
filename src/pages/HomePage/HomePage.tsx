import "../../styles/bg.css";
import HomeSection from "../../features/HomeSection/HomeSection";
import ImgContainer from "../../components/UI/ImgContainer/ImgContainer";
import "./HomePage.css";
import "./HomeFloating.css";
import ScrollableContainer from "../../components/UI/ScrollableContainer/ScrollableContainer";
import AboutSection from "../../features/AboutSection/AboutSection";
import Button from "../../components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { SEOHead } from "../../components/SEOHead";
import { useLanguage } from "../../contexts/LanguageContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <>
      <SEOHead 
        title="Applied AI Engineer"
        description="Portafolio de Gustavo Francisco, Applied AI Engineer especializado en sistemas de IA, experiencias modernas y despliegues en la nube."
      />
      <HomeSection
        text1={t("home.intro")}
        text2={t("home.name")}
        titleAs="h1"
      />

      <section className="Home__proyects">
        <ScrollableContainer>
          <ImgContainer
            source="/pictures/ImgProyects/LiveAudio/LiveAudio.webp"
            alt={t("home.projects.liveAudioAlt")}
            title="LiveAudio"
            href="https://liveaudio.opencohost.com/"
          />
          <ImgContainer
            source="/pictures/ImgProyects/VoiceAI/VoiceAI.webp"
            alt={t("home.projects.openCohostAlt")}
            title="OpenCohost"
            href="https://opencohost.com/"
          />
          <ImgContainer
            source="/pictures/ImgProyects/Brick.draw/Home.webp"
            alt={t("home.projects.brickDrawAlt")}
            title="Brick.draw"
            href="https://github.com/plynte-labs/brick-draw"
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
