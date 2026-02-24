import Loader from "../../components/UI/Loader/Loader";
import "../../styles/bg.css";
import HomeSection from "../../components/UI/HomeSection/HomeSection";
import ImgContainer from "../../components/UI/ImgContainer/ImgContainer";
import "./Home.css";
import ScrollableContainer from "../../components/UI/ScrollableContainer/ScrollableContainer";
import AboutSection from "../../components/UI/AboutSection/AboutSection";
import FeatureSelector from "../../components/UI/FeatureSelector/FeatureSelector";
import { useImagePreloader } from "../../hooks/useImagePreloader";


const imagesToLoad = [
    "/pictures/ImgProyects/RedirectLink/Home.webp",
    "/pictures/ImgProyects/ComputerHelper/CSH.webp",
    "/pictures/ImgProyects/Chat/ChatMovil.webp",
    "/pictures/goatatwork.webp",
    "/pictures/drawsByMe/drawByMe.webp",
  ];

const Home = () => {
  const loading = useImagePreloader(imagesToLoad, "homePortfolioCargado");

  if (loading) return <Loader message="Cargando portfolio..." />;

  return (
    <>
      <HomeSection 
        text1="Ingeniero"
        text2="Full Stack"
      />
      {/* <h1 className="Home__title">Mis Proyectos</h1> */}
        <section className="Home__projects">
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
              title="computer-selector-helper"
              href="https://computer-selector-helper.vercel.app/"
            />
            <ImgContainer
              source="/pictures/ImgProyects/Chat/ChatMovil.webp"
              alt="Interfaz de Chatbot"
              title="Chat / Calendar"
              href="https://memories-app-red.vercel.app/chat"
            />
            <ImgContainer
              source="/pictures/goatatwork.webp"
              alt="Minecraft"
              title="Residencia Profesional"
              href="/detail"
            />
          </ScrollableContainer>
        </section>
      <div className="bg-pan-right">
        <AboutSection
          title="Programador"
          titleHead="Mi historia."
          subtitle="FULL STACK JUNIOR"
          description="Un día quise diseñar una web, así que me puse a investigar y, sin querer, estudié Ing. en Sistemas Computacionales.
Al inicio no me gustaba la carrera, pero al comenzar mis prácticas, todo cambió: me encantó programar y diseñar webs. En el camino, tuve que aprender bastante HTML y CSS para personalizar mis propios diseños.
Aprender React me motivó a conocer otras tecnologías como JSX y TSX. Luego, como no quedé satisfecho, quise saber cómo funcionaban otros frameworks de JavaScript, así que me adentré en Svelte.
Me apasionó tanto el desarrollo web que ahora me dedico a ello. Por ahora, me he enfocado en que mis proyectos resuelvan problemáticas reales."
          source="/pictures/drawsByMe/drawByMe.webp"
          alt="Dibujo hecho por mí en Adobe Photoshop"
        />
      </div>

      <FeatureSelector />
    </>
  );
};

export default Home;
