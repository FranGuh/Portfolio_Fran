// src/data/cvData.ts
export interface Skill {
  name: string;
}

export interface Project {
  title: string;
  period: string;
  description: string;
  techStack: string[];
  link?: string;
  image: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  techStack: string[];
  image?: string;
  link?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface CVData {
  profile: {
    name: string;
    subtitle: string;
    bio: string;
    contact: { phone: string; email: string; web: string; location: string };
  };
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
}

export const cvData: CVData = {
  profile: {
    name: "Gustavo Francisco Salgado Andrade",
    subtitle: "Ingeniero en Sistemas Computacionales | Full-Stack",
    bio: "Especializado en la optimización de recursos TI y continuidad operativa mediante sistemas automatizados. Experiencia en administración de servidores Cloud, soporte técnico integral y automatización de procesos mediante programación.",
    contact: {
      phone: "777-493-3706",
      email: "gitrafuh@gmail.com",
      web: "plynte.com",
      location: "Morelos, México (Dispuesto a reubicarme)",
    },
  },
  skills: [
    {
      category: "Frontend",
      skills: [
        { name: "React" },
        { name: "TypeScript" },
        { name: "NextJs" },
        { name: "Svelte" },
        { name: "Tailwind" },
        { name: "CSS3" },
      ],
    },
    {
      category: "Backend & BD",
      skills: [
        { name: "Python" },
        { name: "NodeJS" },
        { name: "ExpressJS" },
        { name: "PostgreSQL" },
        { name: "MySQL" },
        { name: "Mongo Atlas" },
      ],
    },
    {
      category: "Cloud & Infra",
      skills: [
        { name: "AWS (EC2, S3)" },
        { name: "Vercel" },
        { name: "Cloudflare" },
        { name: "Linux" },
      ],
    },
  ],
  experience: [
    {
      role: "Desarrollador e Implementador de Infraestructura",
      company: "RaukeIT",
      period: "Abril - Mayo 2025",
      description:
        "Plataforma web que permite a los usuarios compartir y subir sus experiencias visuales mediante clasificación.",
      techStack: [
        "React",
        "AWS S3",
        "ExpressJS",
        "PostgreSQL",
        "Stripe",
        "JWT",
        "AWS RDS",
      ],
      image: "/pictures/goatatwork.webp",
    },
    {
      role: "Desarrollador Web",
      company: "Cacao-Cocoa (RaukeIT)",
      period: "Febrero - Abril 2025",
      description:
        "Página web de catálogo de productos de chocolate y desarrollo de módulos de administración centralizados.",
      techStack: ["React", "AWS S3", "HTML5", "CSS3", "Mongo Atlas"],
      image: "/pictures/ImgProyects/Cacao/Home.webp",
      link: "https://thecacaococoa.com/productos",
    },
  ],
  projects: [
    {
      title: "Brick.draw",
      period: "Marzo 2026 - Actualidad",
      description:
        "Software de escritorio de uso ligero para uso creativo, inspirado en Paint y Photoshop para dibujo en capas con la posibilidad de comunicarse con un servicio para mejorar los dibujos del usuario mediante modelos locales de Stable Diffusion XL. ",
      techStack: [
        "React",
        "TypeScript",
        "Tauri",
        "Tailwind",
        "Rust",
        "Zustand",
      ],
      image: "/pictures/ImgProyects/Brick.draw/Home.webp",
    },
    {
      title: "Dog-bros (BroDogs)",
      period: "Marzo 2026 - Actualidad",
      description:
        "Sistema web para previsualizar el menú de una dark kitchen y calcular pedidos.",
      techStack: [
        "React",
        "TypeScript",
        "NextJS",
        "Tailwind",
        "Vercel",
        "Zustand",
      ],
      image: "/pictures/ImgProyects/BroDogs/Landing.webp",
      link: "https://san-burgus.vercel.app/",
    },
    {
      title: "Floppy",
      period: "Febrero 2026 - Actualidad",
      description:
        "Pipeline automatizado de visión artificial para procesamiento masivo de datos y gestión de VRAM.",
      techStack: [
        "Python",
        "DBSCAN",
        "Miniconda",
        "CUDA",
        "SQLite",
        "face_recognition",
        "Sklearn",
      ],
      image: "/pictures/ImgProyects/Floppy/Home.webp",
    },
    {
      title: "Plynte.com",
      period: "Junio 2025 - Actualidad",
      description:
        "Sistema web que permite mostrar mi portfolio, así como gestionar tráfico y visualizar estadísticas del sitio mediante Cloudflare.",
      techStack: ["Typescript", "React", "CSS3", "i18n", "Cloudflare", "Vercel"],
      image: "/pictures/ImgProyects/Plynte/image.webp",
    },
    {
      title: "Computer Selector Helper ",
      period: "Junio 2025",
      description: "Sistema experto recomendador de laptops usando inferencia.",
      techStack: ["Javascript", "React", "CSS3", "Vercel"],
      image: "/pictures/ImgProyects/ComputerHelper/CSH.webp",
      link: "https://computer-selector-helper.vercel.app/",
    },
    {
      title: "Redirect - Link ",
      period: "Junio 2025",
      description:
        "Sistema web que permite redireccionar y agrupar links a proyectos importantes (Clon para uso personal de linktree). ",
      techStack: ["Javascript", "React", "CSS3", "Vercel"],
      image: "/pictures/ImgProyects/RedirectLink/Home.webp",
      link: "https://redirect-link-flame.vercel.app/",
    },
    {
      title: "Sloppy",
      period: "Marzo 2026 - Actualidad",
      description:
        "API de visión artificial para la generación de imágenes utilizando modelos de Stable Diffusion XL, se conecta con Brick.draw para mejorar los dibujos del usuario mediante inferencia local.",
      techStack: [
        "Python",
        "Miniconda",
        "SDXL",
        "PyTorch",
        "Transformers",
        "FastAPI",
        "CUDA",
        "HuggingFace",
      ],
      image: "/pictures/ImgProyects/Sloppy/SloppyDraw.webp",
    },
    {
      title: "VoiceAI",
      period: "Mayo 2025 - Actualidad",
      description: "Sistema de co-host de voz con IA para streamers. Ingiere chats de Twitch/YouTube en tiempo real con SmartAggregator, genera respuestas con Ollama (11 modelos locales), sintetiza voz con QwenTTS y Edge-TTS, y gestiona agenda editorial con Cue Cards vía importación de Markdown desde LLM externo. Local-first y determinístico.",
      techStack: ["Python", "Ollama", "QwenTTS", "Edge-TTS", "CustomTkinter", "Flask", "SQLite", "SmartAggregator"],
      image: "/pictures/Aqua.webp"
    },
    {
      title: "LiveAudio",
      period: "Mayo 2025 - Actualidad",
      description: "Sistema de subtitulado automático en tiempo real para streamers. Ofrece detección de voz continua con Silero VAD + pre-buffer para no perder la primera palabra, transcripción Whisper local con prompt de contexto configurable, 7 temas visuales integrables en OBS y empaquetado portable con Nuitka.",
      techStack: ["Python", "Whisper", "Silero VAD", "OBS", "CustomTkinter", "Nuitka"],
      image: "/pictures/Aqua.webp"
    },
    {
      title: "VoiceAI Kira",
      period: "Mayo 2026 - Actualidad",
      description: "Sitio web público de marketing y documentación bilingüe (EN/ES) para el asistente VoiceAI Kira. Explica el producto a streamers sin tecnicismos, con demos configurables para OBS, matriz de compatibilidad de hardware y guías de onboarding.",
      techStack: ["React", "TypeScript", "Vite", "CSS3"],
      image: "/pictures/Aqua.webp"
    },
    {
      title: "RememberCompanion",
      period: "Mayo 2026 - Actualidad",
      description: "Aplicación móvil para Android enfocada en el diario de productividad local-first. Registra pensamientos, acciones cotidianas y el nivel de satisfacción diaria bajo un esquema de cifrado de base de datos SQLCipher para garantizar máxima privacidad por actividad.",
      techStack: ["React Native", "TypeScript", "SQLite", "SQLCipher", "Android"],
      image: "/pictures/Aqua.webp"
    },
    {
      title: "Chat App — Grok",
      period: "Mayo 2025",
      description: "Interfaz de chatbot (UI pura) optimizada para dispositivos móviles que consume la API de Grok (xAI) para interacciones conversacionales fluidas.",
      techStack: ["React", "TypeScript", "CSS3", "Grok API"],
      image: "/pictures/ImgProyects/Chat/ChatMovil.webp"
    }
  ],
};
