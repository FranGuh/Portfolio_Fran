import "./HomeSection.css";
import logo from "/Franguh.svg";
import "../../styles/bg.css";
import ParticleField from "../../components/UI/ParticleField/ParticleField";

const HomeSection = ({text1="MI",text2="PORTFOLIO"}) => {
  return (
    <section className="HomeSection explosion-bg">
      <ParticleField count={0} />
      <div className="HomeSection__content">
        <img src={logo} alt="Mi logo" className="HomeSection__logo" fetchPriority="high" decoding="async" />
        <h1 className="HomeSection__title">
          <span>{text1}</span>
          <span>{text2}</span>
        </h1>
      </div>
      <div className="HomeSection__scroll-indicator" onClick={() => {
        const nextSec = document.querySelector("#SobreMi");
        if (nextSec) nextSec.scrollIntoView({ behavior: 'smooth' });
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
};

export default HomeSection;
