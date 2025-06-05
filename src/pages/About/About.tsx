import HomeSection from "../../components/UI/HomeSection/HomeSection";
import "./About.css";
import AboutSection from "../../components/UI/AboutSection/AboutSection";

const About = () => {
  return (
    <>
      <HomeSection text1="Soy" text2="Francisco" />
      <AboutSection
        title="Programador"
        titleHead="Web"
        subtitle="Mi historia."
        description="Un día quise diseñar una web, así que me puse a investigar y, sin querer, estudié Ing. en Sistemas Computacionales.

Al inicio no me gustaba la carrera, pero al comenzar mis prácticas, todo cambió: me encantó programar y diseñar webs. En el camino, tuve que aprender bastante HTML y CSS para personalizar mis propios diseños.

Aprender React me motivó a conocer otras tecnologías como JSX y TSX. Luego, como no quedé satisfecho, quise saber cómo funcionaban otros frameworks de JavaScript, así que me adentré en Svelte.

Me apasionó tanto el desarrollo web que ahora me dedico a ello. Por ahora, me he enfocado en que mis proyectos resuelvan problemáticas reales."
        source="/pictures/drawsByMe/drawByMe.png"
        alt="Dibujo hecho por mí en Adobe Photoshop"
      />
    </>
  );
};

export default About;
