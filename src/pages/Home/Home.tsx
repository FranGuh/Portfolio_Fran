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
            <ImgContainer source="/pictures/Aqua.png" alt="Aqua" title="Aqua" href="https://example.com"/>
            <ImgContainer source="/pictures/goatatwork.webp" alt="Goat" title="Goat" />
            <ImgContainer source="/pictures/Revy.png" alt="Revy" title="Revy" />
            <ImgContainer source="/pictures/minecraft.webp" alt="Minecraft" title="Steve" />
            <ImgContainer source="/pictures/Aqua.png" alt="Aqua" title="Aqua" />
            <ImgContainer source="/pictures/goatatwork.webp" alt="Goat" title="Goat" />
            <ImgContainer source="/pictures/Revy.png" alt="Revy" title="Revy" />
            <ImgContainer source="/pictures/minecraft.webp" alt="Minecraft" title="Steve" />
            {/* Agrega más ImgContainers */}
          </ScrollableContainer>
        </section>
      </div>
    </>
  );
};

export default Home;
