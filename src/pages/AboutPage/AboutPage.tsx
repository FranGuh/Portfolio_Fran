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

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <SEOHead
        title="Sobre Mí"
        description="Conoce mi historia como Desarrollador Full Stack, mi filosofía de diseño y mi enfoque técnico resolviendo problemas complejos."
      />
      {/* Siempre me he cuestionado si realmente tengo la capacidad de hacer algo importante,
      supongo que sí, pero a la hora de desarrollar una idea en mi cabeza soy incapaz de dejarla vivir ahi, me gusta profundizar sobre ella aun sabiendo
      que fracasaré pero almenos se que aprenderé de ello, últimamente cuestiono mis conocimientos día a día, aunque me cueste demasiado entenderlo." */}
      <HomeSection text1="Soy" text2="Francisco" />
      <div className="AboutPage__intro">
        <PageHeader
          eyebrow="Sobre mi"
          title="FranGuh"
          description="Desarrollador full stack con enfoque en interfaces claras, arquitectura mantenible y aprendizaje constante."
        />
      </div>
      <AboutSection
        title="Desarrollador"
        titleHead="Creativo"
        subtitle="Orquestador de IA"
        description="Siempre cuestiono mis ideas y desafio mis propios límites. Cuando algo me interesa, lo llevo más allá, incluso sabiendo que puedo fallar. Para mí, cada intento es una forma de aprender y construir algo mejor. Últimamente he enfocado esa mentalidad en mejorar mis habilidades día a día, enfrentando lo que aún no entiendo. Algo que quisiera saber es si el ser humano tiene límites o si se los impone a sí mismo..."
        source="/pictures/drawsByMe/Artur_master.webp"
        alt="Dibujo hecho por mí en Adobe Photoshop"
      />

      <StorySection
        title="Mi Camino"
        paragraphs={[
          <>
            Empecé en el mundo del desarrollo no para seguir un camino convencional, sino por una curiosidad indomable. Para mí, programar nunca fue solo escribir código; es la capacidad única de <span className="StorySection__highlight">dar vida a ideas complejas</span> que de otro modo se quedarían atrapadas en mi cabeza.
          </>,
          <>
            No me conformo con que las cosas simplemente funcionen. Cuando una idea me obsesiona, me sumerjo en ella para entender el fondo del problema, diseñar la infraestructura y asegurar que sea escalable. Cuestiono mis conocimientos constantemente porque entiendo que <span className="StorySection__highlight">la única forma de crecer es enfrentar</span> lo que todavía no comprendo.
          </>
        ]}
        placeholder={false}
      />

      <PhilosophySection
        title="Cómo Trabajo"
        items={[
          {
            heading: "Procesamiento Eficiente de Datos",
            body: "Optimizo el flujo de información en tiempo real. Diseñé filtros capaces de limpiar flujos masivos de datos (como chats interactivos), eliminando el 90% del ruido innecesario para extraer solo información de alto valor, acelerando el procesamiento y reduciendo costos operativos."
          },
          {
            heading: "Máximo Rendimiento con Cero Desperdicio",
            body: "Desarrollo soluciones que corren de forma fluida en hardware común, evitando la dependencia total de servidores en la nube ultra costosos. Diseñé un sistema híbrido que distribuye dinámicamente el trabajo pesado de IA en caliente, logrando rapidez sin inflar el presupuesto."
          },
          {
            heading: "Estrategia de Costos en IA",
            body: "Aplico una mentalidad pragmática y rentable al usar modelos de lenguaje. Implemento inteligencia artificial local y ligera para procesar tareas masivas del día a día, y reservo los modelos comerciales más caros exclusivamente para auditorías críticas de control de calidad y planificación."
          },
          {
            heading: "Planificación y Tradeoffs",
            body: "No escribo una sola línea de código sin antes analizar el panorama técnico. Investigo exhaustivamente alternativas tecnológicas, documento decisiones de arquitectura (ADRs) y evalúo el balance entre costo, velocidad de desarrollo y mantenibilidad para evitar refactorizaciones costosas."
          }
        ]}
        placeholder={false}
      />

      <LlmInsightsSection
        title="Realizaciones en el Límite Técnico"
        subtitle="Conversaciones estratégicas y tradeoffs de arquitectura nacidos del desarrollo de sistemas de IA locales en hardware de consumo."
        insights={[
          {
            tag: "Rol del Ingeniero",
            title: "Director de la Orquesta (Human-in-the-Loop)",
            description: "Acepté que programar hoy en día es orquestar lógica abstracta. La IA no me reemplaza; es mi equipo gratuito de ingenieros a los que dirijo como CTO, validando cada decisión, gestionando edge cases y liderando la estrategia."
          },
          {
            tag: "IP y Distribución",
            title: "El Desafío del Empaquetado Local",
            description: "Un sistema complejo en local es inútil si no tiene distribución. Mi meta es encapsular múltiples redes neuronales (Ollama, Qwen, Whisper) en un ejecutable listo para usar, resolviendo la fricción técnica para el usuario común."
          },
          {
            tag: "Metodología",
            title: "Ingeniería de Sistemas de IA vs VibeCoding",
            description: "Rechazo la duplicación caótica de clones genéricos. Cada proyecto (VoiceAI, LiveAudio, Tauri Apps) se diseña con modularidad rigurosa, documentando tradeoffs en ADRs y priorizando la resiliencia y tolerancia a fallos."
          }
        ]}
      />

      <div className="About__floating">
        <Button className="button--floating" onClick={() => navigate("/portfolio")}>
          Ver Portafolio
        </Button>
      </div>
    </>
  );
};

export default AboutPage;
