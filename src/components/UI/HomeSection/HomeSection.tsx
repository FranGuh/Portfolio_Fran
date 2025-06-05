import "./HomeSection.css";
import logo from "/Franguh.svg";
import "../../../styles/bg.css";
import ParticleField from "../ParticleField/ParticleField";

const HomeSection = ({text1="MI",text2="PORTFOLIO"}) => {
  return (
    <section className="HomeSection explosion-bg">
      <ParticleField count={80} />
      <div className="HomeSection__content">
        <img src={logo} alt="Mi logo" className="HomeSection__logo" />
        <h1 className="HomeSection__title">
          <span>{text1}</span>
          <span>{text2}</span>
        </h1>
      </div>
    </section>
  );
};

export default HomeSection;
