import "./HomeSection.css";
import logo from "/Franguh.svg";
import "../../styles/bg.css";
import ParticleField from "../../components/UI/ParticleField/ParticleField";

interface HomeSectionProps {
  text1?: string;
  text2?: string;
  titleAs?: 'h1' | 'p';
}

const HomeSection = ({ text1 = "MI", text2 = "PORTFOLIO", titleAs = 'p' }: HomeSectionProps) => {
  const TitleTag = titleAs;
  return (
    <section className="HomeSection explosion-bg">
      <ParticleField count={0} />
      <div className="HomeSection__content">
        <img src={logo} alt="Mi logo" className="HomeSection__logo" fetchPriority="high" decoding="async" />
        <TitleTag className="HomeSection__title">
          <span>{text1}</span>
          <span>{text2}</span>
        </TitleTag>
      </div>
      <button
        className="HomeSection__scroll-indicator"
        aria-label="Scroll to next section"
        onClick={() => {
          const nextSec = document.querySelector("#SobreMi");
          if (nextSec) nextSec.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </section>
  );
};

export default HomeSection;
