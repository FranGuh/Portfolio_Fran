// src/data/translations.ts
export const translations: Record<string, any> = {
  es: {
    navbar: {
      inicio: "INICIO",
      sobreMi: "SOBRE MÍ",
      portfolio: "PORTFOLIO",
      detalles: "Detalles",
      inicioSub: "Inicio",
      sobreMiSub: "Sobre mí",
      detallesSub: "Detalles",
      portfolioSub: "Portfolio",
    },
    seo: {
      homeTitle: "Inicio",
      homeDesc: "Portfolio de Gustavo Francisco (FranGuh) — Desarrollador Full Stack y Diseñador de Sistemas de IA locales.",
      aboutTitle: "Sobre Mí",
      aboutDesc: "Conoce mi historia como Desarrollador Full Stack, mi filosofía de diseño y mi enfoque técnico resolviendo problemas complejos.",
      portfolioTitle: "Portafolio",
      portfolioDesc: "Explora mis proyectos destacados en desarrollo de software, automatización e integración local de modelos de inteligencia artificial.",
    },
    home: {
      intro: "Soy",
      name: "Francisco",
      floatingTitle: "Cada línea de código que escribo resuelve un problema real",
      floatingMotto: "Mirá lo que construí. Si te sirve, trabajemos juntos.",
      exploreBtn: "Explorar Portfolio",
      projects: {
        selectorTitle: "Selector de Laptops",
        backendTitle: "Backend & Cloud",
        redirectAlt: "Landing RedirectLink",
        selectorAlt: "Landing CSH",
        backendAlt: "Plataforma RaukeIT"
      }
    },
    about: {
      eyebrow: "Sobre mi",
      title: "FranGuh",
      introDescription: "Desarrollador full stack con enfoque en interfaces claras, arquitectura mantenible y aprendizaje constante.",
      sectionTitle: "Desarrollador",
      sectionTitleHead: "Mi enfoque",
      sectionSubtitle: "FULL STACK",
      sectionDescription: "Descubrí el desarrollo web accidentalmente, y desde entonces no he parado. Mi enfoque prioriza el diseño visual limpio (UX/UI) y arquitecturas sólidas (TSX/AWS/DBs). Constantemente aprendo e investigo para que cada línea de código aporte valor real.",
      sectionTitleAbout: "Desarrollador",
      sectionTitleHeadAbout: "Creativo",
      sectionSubtitleAbout: "Orquestador de IA",
      sectionDescriptionAbout: "Siempre cuestiono mis ideas y desafio mis propios límites. Cuando algo me interesa, lo llevo más allá, incluso sabiendo que puedo fallar. Para mí, cada intento es una forma de aprender y construir algo mejor. Últimamente he enfocado esa mentalidad en mejorar mis habilidades día a día, enfrentando lo que aún no entiendo. Algo que quisiera saber es si el ser humano tiene límites o si se los impone a sí mismo...",
      buttonFloating: "Ver Portafolio",
    },
    story: {
      origin: "Origen",
      title: "Mi Camino",
      paragraphs: [
        "Empecé en el mundo del desarrollo no para seguir un camino convencional, sino por una curiosidad indomable. Para mí, programar nunca fue solo escribir código; es la capacidad única de dar vida a ideas complejas que de otro modo se quedarían atrapadas en mi cabeza.",
        "No me conformo con que las cosas simplemente funcionen. Cuando una idea me obsesiona, me sumerjo en ella para entender el fondo del problema, diseñar la infraestructura y asegurar que sea escalable. Cuestiono mis conocimientos constantemente porque entiendo que la única forma de crecer es enfrentar lo que todavía no comprendo."
      ],
      highlights: [
        "dar vida a ideas complejas",
        "la única forma de crecer es enfrentar"
      ]
    },
    philosophy: {
      title: "Cómo Trabajo",
      items: [
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
      ]
    },
    insights: {
      title: "Realizaciones en el Límite Técnico",
      subtitle: "Conversaciones estratégicas y tradeoffs de arquitectura nacidos del desarrollo de sistemas de IA locales en hardware de consumo.",
      items: [
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
      ]
    },
    contact: {
      eyebrow: "Contacto",
      title: "Hablemos de tu próximo proyecto",
      description: "Si buscás a alguien que entienda tu problema y lo resuelva, escribime.",
      nameLabel: "Nombre / Empresa",
      namePlaceholder: "John Doe Corp.",
      emailLabel: "Correo electrónico de contacto",
      emailPlaceholder: "john@example.com",
      messageLabel: "Mensaje (máx. 500 caracteres)",
      messagePlaceholder: "Hola, me gustaría conversar sobre... (Acepta solo texto limpio)",
      buttonSend: "Enviar mensaje",
      buttonSending: "Enviando...",
      success: "¡Mensaje enviado con éxito!",
      error: "Ocurrió un error al enviar. Intenta de nuevo más tarde.",
      errorFields: "Caracteres inválidos detectados. Solo utiliza texto estándar.",
      errorEmail: "El formulario no está configurado todavía. Usa LinkedIn o GitHub para contactarme."
    },
    portfolio: {
      eyebrow: "Portafolio",
      title: "Proyectos, experiencia y stack real",
      description: "Una vista directa de lo que he construido, las tecnologías que uso y el tipo de problemas que puedo resolver.",
      titleProjects: "Mis Proyectos",
      descProjectsAll: "Desarrollo enfocado en resolver problemáticas reales con tecnologías modernas.",
      descProjectsFiltered: "Mostrando proyectos construidos con {tech}.",
      titleExperience: "Experiencia Profesional",
      descExperience: "Implementación de infraestructura, desarrollo web y continuidad operativa en entornos reales.",
      filterAll: "Todos",
      viewProject: "Ver Proyecto ➔",
      keyFeatures: "Características Clave",
      backToPortfolio: "Volver a Portfolio ➔",
      periodLabel: "Período de Desarrollo",
      techUsed: "Tecnologías Utilizadas",
      periodText: "Período",
      techText: "Tecnologías",
      skillsSubtitle: "Me gusta desarrollar {span1} y compartir {span2}",
      skillsSpan1: "mis ideas",
      skillsSpan2: "mis aprendizajes",
    }
  },
  en: {
    navbar: {
      inicio: "HOME",
      sobreMi: "ABOUT ME",
      portfolio: "PORTFOLIO",
      detalles: "Details",
      inicioSub: "Home",
      sobreMiSub: "About me",
      detallesSub: "Details",
      portfolioSub: "Portfolio",
    },
    seo: {
      homeTitle: "Home",
      homeDesc: "Portfolio of Gustavo Francisco (FranGuh) — Full Stack Developer and Local AI Systems Designer.",
      aboutTitle: "About Me",
      aboutDesc: "Learn about my journey as a Full Stack Developer, my design philosophy, and my technical approach to solving complex problems.",
      portfolioTitle: "Portfolio",
      portfolioDesc: "Explore my featured projects in software development, automation, and local integration of AI models.",
    },
    home: {
      intro: "I am",
      name: "Francisco",
      floatingTitle: "Every line of code I write solves a real problem",
      floatingMotto: "Check out what I built. If it works for you, let's work together.",
      exploreBtn: "Explore Portfolio",
      projects: {
        selectorTitle: "Laptop Selector",
        backendTitle: "Backend & Cloud",
        redirectAlt: "RedirectLink Landing",
        selectorAlt: "CSH Landing",
        backendAlt: "RaukeIT Platform"
      }
    },
    about: {
      eyebrow: "About me",
      title: "FranGuh",
      introDescription: "Full stack developer focused on clean interfaces, maintainable architecture, and continuous learning.",
      sectionTitle: "Developer",
      sectionTitleHead: "My approach",
      sectionSubtitle: "FULL STACK",
      sectionDescription: "I discovered web development accidentally, and since then I haven't stopped. My approach prioritizes clean visual design (UX/UI) and solid architectures (TSX/AWS/DBs). I constantly learn and research so that every line of code contributes real value.",
      sectionTitleAbout: "Developer",
      sectionTitleHeadAbout: "Creative",
      sectionSubtitleAbout: "AI Orchestrator",
      sectionDescriptionAbout: "I always question my ideas and challenge my own limits. When something interests me, I push it further, even knowing I might fail. For me, every attempt is a way to learn and build something better. Lately, I have focused that mindset on improving my skills day by day, facing what I still do not understand. One thing I would like to know is if humans have limits or if they impose them on themselves...",
      buttonFloating: "View Portfolio",
    },
    story: {
      origin: "Origin",
      title: "My Journey",
      paragraphs: [
        "I started in the development world not to follow a conventional path, but out of an indomitable curiosity. For me, programming was never just about writing code; it is the unique ability to bring complex ideas to life that would otherwise remain trapped inside my head.",
        "I don't settle for things simply working. When an idea obsesses me, I dive deep into it to understand the root of the problem, design the infrastructure, and ensure it is scalable. I constantly question my knowledge because I understand that the only way to grow is to face what I still do not comprehend."
      ],
      highlights: [
        "bring complex ideas to life",
        "the only way to grow is to face"
      ]
    },
    philosophy: {
      title: "How I Work",
      items: [
        {
          heading: "Efficient Data Processing",
          body: "I optimize real-time data flows. I designed filters capable of cleaning massive data streams (like interactive chats), removing 90% of unnecessary noise to extract only high-value information, accelerating processing and reducing operational costs."
        },
        {
          heading: "Maximum Performance, Zero Waste",
          body: "I develop solutions that run smoothly on consumer hardware, avoiding absolute dependence on ultra-expensive cloud servers. I designed a hybrid system that dynamically distributes heavy AI workloads on the fly, achieving speed without inflating the budget."
        },
        {
          heading: "AI Cost Strategy",
          body: "I apply a pragmatic and cost-effective mindset when using language models. I implement lightweight local AI for high-volume day-to-day tasks, reserving expensive commercial models exclusively for critical quality assurance (QA) and planning audits."
        },
        {
          heading: "Planning & Tradeoffs",
          body: "I don't write a single line of code without first analyzing the technical landscape. I thoroughly research technology alternatives, document architectural decisions (ADRs), and balance cost, velocity, and maintainability to prevent expensive refactoring."
        }
      ]
    },
    insights: {
      title: "Realizations at the Technical Edge",
      subtitle: "Strategic conversations and architectural tradeoffs born from developing local AI systems on consumer hardware.",
      items: [
        {
          tag: "Engineer's Role",
          title: "Orchestrator (Human-in-the-Loop)",
          description: "I accepted that programming today is about orchestrating abstract logic. AI doesn't replace me; it is my free engineering team that I direct as a CTO, validating every decision, managing edge cases, and leading the strategy."
        },
        {
          tag: "IP & Distribution",
          title: "The Local Packaging Challenge",
          description: "A complex local system is useless without distribution. My goal is to encapsulate multiple neural networks (Ollama, Qwen, Whisper) into a ready-to-use executable, solving the technical friction for the average user."
        },
        {
          tag: "Methodology",
          title: "AI Systems Engineering vs VibeCoding",
          description: "I reject the chaotic duplication of generic clones. Every project (VoiceAI, LiveAudio, Tauri Apps) is designed with rigorous modularity, documenting tradeoffs in ADRs, and prioritizing resilience and fault tolerance."
        }
      ]
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about your next project",
      description: "If you are looking for someone who understands your problem and solves it, write to me.",
      nameLabel: "Name / Company",
      namePlaceholder: "John Doe Corp.",
      emailLabel: "Contact Email",
      emailPlaceholder: "john@example.com",
      messageLabel: "Message (max. 500 characters)",
      messagePlaceholder: "Hi, I would like to discuss... (Accepts only clean text)",
      buttonSend: "Send Message",
      buttonSending: "Sending...",
      success: "Message sent successfully!",
      error: "An error occurred while sending. Please try again later.",
      errorFields: "Invalid characters detected. Please use standard text only.",
      errorEmail: "The form is not configured yet. Use LinkedIn or GitHub to contact me."
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Projects, experience and real stack",
      description: "A direct view of what I have built, the technologies I use and the type of problems I can solve.",
      titleProjects: "My Projects",
      descProjectsAll: "Development focused on solving real-world problems with modern technologies.",
      descProjectsFiltered: "Showing projects built with {tech}.",
      titleExperience: "Professional Experience",
      descExperience: "Infrastructure implementation, web development and operational continuity in real environments.",
      filterAll: "All",
      viewProject: "View Project ➔",
      keyFeatures: "Key Features",
      backToPortfolio: "Back to Portfolio ➔",
      periodLabel: "Development Period",
      techUsed: "Technologies Used",
      periodText: "Period",
      techText: "Technologies",
      skillsSubtitle: "I like to develop {span1} and share {span2}",
      skillsSpan1: "my ideas",
      skillsSpan2: "my learnings",
    }
  }
};
