import "./AboutPage.css";
import AboutSection from "../../features/AboutSection/AboutSection";
import HomeSection from "../../features/HomeSection/HomeSection";
import Button from "../../components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { SEOHead } from "../../components/SEOHead";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import StorySection from "../../features/StorySection/StorySection";
import PhilosophySection from "../../features/PhilosophySection/PhilosophySection";
import LlmInsightsSection from "../../features/LlmInsightsSection/LlmInsightsSection";
import { useLanguage } from "../../contexts/LanguageContext";

const AboutPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title="Sobre Mí"
        description="Conoce mi historia como Applied AI Engineer, mi filosofía de diseño y mi enfoque técnico resolviendo problemas complejos."
      />
      {/* Siempre me he cuestionado si realmente tengo la capacidad de hacer algo importante,
      supongo que sí, pero a la hora de desarrollar una idea en mi cabeza soy incapaz de dejarla vivir ahi, me gusta profundizar sobre ella aun sabiendo
      que fracasaré pero almenos se que aprenderé de ello, últimamente cuestiono mis conocimientos día a día, aunque me cueste demasiado entenderlo." */}
      <HomeSection text1={t("home.intro")} text2={t("home.name")} />
      <div className="AboutPage__intro">
        <PageHeader
          eyebrow={t("about.eyebrow")}
          title={t("about.title")}
          description={t("about.introDescription")}
        />
      </div>
      <AboutSection
        title={t("about.sectionTitleAbout")}
        titleHead={t("about.sectionTitleHeadAbout")}
        subtitle={t("about.sectionSubtitleAbout")}
        description={t("about.sectionDescriptionAbout")}
        source="/pictures/drawsByMe/Artur_master.webp"
        alt="Dibujo hecho por mí en Adobe Photoshop"
      />

      <StorySection placeholder={false} />

      <PhilosophySection placeholder={false} />

      <LlmInsightsSection />

      <div className="About__floating">
        <Button className="button--floating" onClick={() => navigate("/portfolio")}>
          {t("about.buttonFloating")}
        </Button>
      </div>
    </>
  );
};

export default AboutPage;
