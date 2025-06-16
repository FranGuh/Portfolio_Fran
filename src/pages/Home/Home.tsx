import { useEffect, useState } from "react";
import Loader from "../../components/UI/Loader/Loader";
import "../../styles/bg.css";
import HomeSection from "../../components/UI/HomeSection/HomeSection";
import ImgContainer from "../../components/UI/ImgContainer/ImgContainer";
import './Home.css';
import ScrollableContainer from "../../components/UI/ScrollableContainer/ScrollableContainer";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader message="Cargando portfolio..." />;

  return (
    <>
      <HomeSection />
      {/* <h1 className="Home__title">HOME PORTFOLIO</h1> */}
      <div
        className="bg-pan-right"
        style={{ padding: "2rem" }}
      >
        <h1>Mis Proyectos</h1>
         <section className="Home__projects">
          <ScrollableContainer>
            <ImgContainer source="/pictures/Aqua.webp" alt="Aqua" title="RedirectLink" href="https://redirect-link-flame.vercel.app/"/>
            <ImgContainer source="/pictures/goatatwork.webp" alt="Goat" title="computer-selector-helper" href="https://computer-selector-helper.vercel.app/" />
            <ImgContainer source="/pictures/Revy.webp" alt="Revy" title="Chat / Calendar" href="https://memories-app-red.vercel.app/chat"/>
            <ImgContainer
              source="/pictures/minecraft.webp"
              alt="Minecraft"
              title="Detail"
              href="/detail"
            />
            {/* más ImgContainers */}
          </ScrollableContainer>
        </section>
      </div>
    </>
  );
};

export default Home;
