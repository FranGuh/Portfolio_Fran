// src/data/projectTranslations.ts

export const projectTranslations: Record<string, { description: { es: string; en: string }; period?: { es: string; en: string } }> = {
  "Brick.draw": {
    description: {
      es: "Software de escritorio ligero para uso creativo, inspirado en Paint y Photoshop para dibujo en capas, con la posibilidad de comunicarse con Sloppy (un servicio de visión artificial local) para mejorar los dibujos del usuario mediante modelos de Stable Diffusion XL.",
      en: "Lightweight desktop creative software inspired by Paint and Photoshop for layered drawing, featuring integration with Sloppy (a local computer vision service) to enhance user drawings using Stable Diffusion XL models."
    }
  },
  "Dog-bros (BroDogs)": {
    description: {
      es: "Sistema web para previsualizar el menú de una dark kitchen y calcular pedidos.",
      en: "Web application to preview a dark kitchen menu and calculate order pricing."
    }
  },
  "Floppy": {
    description: {
      es: "Pipeline automatizado de visión artificial para procesamiento masivo de datos y gestión de VRAM.",
      en: "Automated computer vision pipeline for high-volume data processing and dynamic VRAM management."
    }
  },
  "Plynte.com": {
    description: {
      es: "Sistema web que permite mostrar mi portfolio, así como gestionar tráfico y visualizar estadísticas del sitio mediante Cloudflare.",
      en: "Web application to display my portfolio, manage site traffic, and view operational analytics via Cloudflare."
    }
  },
  "Computer Selector Helper": {
    description: {
      es: "Sistema experto recomendador de laptops usando inferencia.",
      en: "Expert laptop recommendation engine utilizing logical inference rules."
    }
  },
  "Redirect - Link": {
    description: {
      es: "Sistema web que permite redireccionar y agrupar links a proyectos importantes (Clon para uso personal de linktree).",
      en: "Web system to redirect and group links to important projects (personal Linktree clone)."
    }
  },
  "Sloppy": {
    description: {
      es: "API de visión artificial para la generación de imágenes utilizando modelos de Stable Diffusion XL, se conecta con Brick.draw para mejorar los dibujos del usuario mediante inferencia local.",
      en: "Computer vision API for image generation utilizing Stable Diffusion XL models, connecting with Brick.draw to enhance user sketches via local inference."
    }
  },
  "VoiceAI": {
    description: {
      es: "Sistema de co-host de voz con IA para streamers. Ingiere chats de Twitch/YouTube en tiempo real con SmartAggregator, genera respuestas con Ollama (11 modelos locales), sintetiza voz con QwenTTS y Edge-TTS, y gestiona agenda editorial con Cue Cards vía importación de Markdown desde LLM externo. Local-first y determinístico.",
      en: "AI voice co-host system for streamers. Ingests Twitch/YouTube chats in real time with SmartAggregator, generates responses with Ollama (11 local models), synthesizes voice with QwenTTS and Edge-TTS, and manages an editorial agenda with Cue Cards via Markdown import from an external LLM. Local-first and deterministic."
    }
  },
  "LiveAudio": {
    description: {
      es: "Sistema de subtitulado automático en tiempo real para streamers. Ofrece detección de voz continua con Silero VAD + pre-buffer para no perder la primera palabra, transcripción Whisper local con prompt de contexto configurable, 7 temas visuales integrables en OBS y empaquetado portable con Nuitka.",
      en: "Real-time automatic subtitling system for streamers. Provides continuous voice detection with Silero VAD + pre-buffer to prevent losing the first word, local Whisper transcription with a configurable context prompt, 7 OBS-integrable visual themes, and portable packaging via Nuitka."
    }
  },
  "VoiceAI Kira": {
    description: {
      es: "Sitio web público de marketing y documentación bilingüe (EN/ES) para el asistente VoiceAI Kira. Explica el producto a streamers sin tecnicismos, con demos configurables para OBS, matriz de compatibilidad de hardware y guías de onboarding.",
      en: "Public marketing website and bilingual documentation (EN/ES) for the VoiceAI Kira assistant. Explains the product to streamers in a non-technical manner, featuring configurable OBS demos, hardware compatibility matrices, and onboarding guides."
    }
  },
  "RememberCompanion": {
    description: {
      es: "Aplicación móvil para Android enfocada en el diario de productividad local-first. Registra pensamientos, acciones cotidianas y el nivel de satisfacción diaria bajo un esquema de cifrado de base de datos SQLCipher para garantizar máxima privacidad por actividad.",
      en: "Android mobile application focused on a local-first productivity journal. Records thoughts, daily actions, and daily satisfaction scores under a SQLCipher database encryption scheme to guarantee maximum privacy per activity."
    }
  },
  "Chat App — DeepSeek": {
    description: {
      es: "Interfaz de chatbot (UI pura) optimizada para dispositivos móviles que consume la API de DeepSeek para interacciones conversacionales fluidas.",
      en: "Chatbot interface (pure UI) optimized for mobile devices that consumes the DeepSeek API for fluid conversational interactions."
    }
  }
};

export const experienceTranslations: Record<string, { role: { es: string; en: string }; description: { es: string; en: string } }> = {
  "RaukeIT": {
    role: {
      es: "Desarrollador e Implementador de Infraestructura",
      en: "Infrastructure Developer & Implementer"
    },
    description: {
      es: "Plataforma web que permite a los usuarios compartir y subir sus experiencias visuales mediante clasificación.",
      en: "Web platform enabling users to share and upload visual experiences through classification."
    }
  },
  "Cacao-Cocoa (RaukeIT)": {
    role: {
      es: "Desarrollador Web",
      en: "Web Developer"
    },
    description: {
      es: "Página web de catálogo de productos de chocolate y desarrollo de módulos de administración centralizados.",
      en: "Chocolate product catalog website and development of centralized administration modules."
    }
  }
};

export function getLocalizedProjectDesc(title: string, lang: string, fallback: string): string {
  const trans = projectTranslations[title];
  if (trans && trans.description) {
    return lang === "en" ? trans.description.en : trans.description.es;
  }
  return fallback;
}

export function getLocalizedProjectPeriod(title: string, lang: string, fallback: string): string {
  const trans = projectTranslations[title];
  if (trans && trans.period) {
    return lang === "en" ? trans.period.en : trans.period.es;
  }
  
  let result = fallback;
  
  if (lang === "en") {
    if (result.includes("Actualidad")) {
      result = result.replace("Actualidad", "Present");
    }
    if (result.includes("[COMPLETAR]")) {
      result = result.replace("[COMPLETAR]", "TO COMPLETE");
    }
    
    const months = {
      "Enero": "January", "Febrero": "February", "Marzo": "March", "Abril": "April",
      "Mayo": "May", "Junio": "June", "Julio": "July", "Agosto": "August",
      "Septiembre": "September", "Octubre": "October", "Noviembre": "November", "Diciembre": "December"
    };
    for (const [esMonth, enMonth] of Object.entries(months)) {
      result = result.replace(esMonth, enMonth);
    }
  }
  
  return result;
}

export function getLocalizedExperienceRole(company: string, lang: string, fallback: string): string {
  const trans = experienceTranslations[company];
  if (trans && trans.role) {
    return lang === "en" ? trans.role.en : trans.role.es;
  }
  return fallback;
}

export function getLocalizedExperienceDesc(company: string, lang: string, fallback: string): string {
  const trans = experienceTranslations[company];
  if (trans && trans.description) {
    return lang === "en" ? trans.description.en : trans.description.es;
  }
  return fallback;
}
