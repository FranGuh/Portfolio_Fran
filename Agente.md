# 1. Huecos críticos (respóndelos si puedes)

Esto evita recomendaciones incorrectas:

* ¿Usas **SSR o es SPA pura con Vite? (importante para SEO)
* ¿Tienes `<Helmet>` o manejo de meta tags dinámicos?
* ¿Tus proyectos cargan imágenes pesadas? (ej: arte IA)
* ¿Tienes Lighthouse score aproximado?
* ¿Usas lazy loading (`React.lazy`) o todo carga de golpe?
* ¿Tu home tiene animaciones ya o es estático?

Si no respondes, el agente asumirá defaults (SPA simple → SEO limitado).

---

# 2. Prompt del agente auditor (versión fuerte)

Cópialo tal cual:

---

## PROMPT

Actúa como un **auditor senior de frontend especializado en React + TypeScript + performance + SEO + UX/UI**.

Tu tarea es auditar completamente este proyecto de portafolio construido con:

* React 19
* Vite
* TypeScript
* CSS Modules
* React Router

---

## CONTEXTO DEL PROYECTO

* Es un portafolio personal para **vender habilidades a reclutadores y desarrolladores**
* Está en producción
* Problemas percibidos:

  * Falta de coherencia (muchas cosas, poco foco)
  * Baja interactividad
  * Posible debilidad en SEO
* El estilo actual usa CSS Modules, sin sistema sólido de variables
* Se busca mejorar sin migrar a frameworks de CSS (ej: Tailwind)

---

## OBJETIVO DE LA AUDITORÍA

Debes generar un archivo llamado:

### `Revision.md`

Con un análisis **crítico, directo y sin suavizar errores**.

---

## ÁREAS DE EVALUACIÓN

### 1. Arquitectura

* Separación real entre pages / components / lógica
* Sobreingeniería vs falta de estructura
* Escalabilidad
* Organización de carpetas

---

### 2. CSS y estilos (PRIORIDAD ALTA)

* Uso correcto de CSS Modules
* Repetición de estilos
* Falta de variables (colores, spacing, tipografía)
* Inconsistencias visuales
* Propuesta de sistema de diseño mínimo (sin cambiar tecnología)

---

### 3. UX/UI (CRÍTICO)

* Claridad del mensaje (“qué vendes”)
* Flujo de navegación
* Jerarquía visual
* Call to action
* Interactividad pobre o inexistente
* Qué cambiar y cómo

---

### 4. Animaciones

Evalúa y decide:

* Si el proyecto necesita animaciones
* Qué tipo:

  * microinteractions (hover, feedback)
  * scroll-based
* Si usar:

  * CSS puro
  * Framer Motion
  * GSAP

⚠️ Justifica SIEMPRE la decisión. No recomendar GSAP sin razón fuerte.

---

### 5. Estado global

Evaluar si vale la pena usar:

* Zustand

Determinar:

* si hay prop drilling
* si el estado es realmente compartido
* si sería sobreingeniería

---

### 6. Performance (CRÍTICO)

* Tamaño del bundle
* Render innecesario
* Lazy loading
* Uso de imágenes
* Posibles cuellos de botella

Dar soluciones concretas.

---

### 7. SEO (CRÍTICO)

* Limitaciones de SPA con Vite
* Meta tags
* Open Graph
* Accesibilidad básica (impacta SEO)
* Alternativas:

  * pre-render
  * SSR (solo si aplica)

---

### 8. Dependencias

Detectar:

* librerías innecesarias
* duplicadas
* incompatibilidades (ej: tipos incorrectos)
* sugerencias de mejora

---

### 9. Code Smells

Detectar:

* componentes grandes
* lógica mezclada con UI
* duplicación
* nombres poco claros

---

## FORMATO DEL OUTPUT (`Revision.md`)

Debe seguir exactamente este orden:

### 1. Resumen Ejecutivo

* Estado general del proyecto (duro, honesto)

### 2. Problemas Críticos (Top 5)

* Qué rompe el valor del portafolio

### 3. Arquitectura

### 4. CSS y Sistema de Diseño

### 5. UX/UI

### 6. Animaciones

### 7. Estado Global

### 8. Performance

### 9. SEO

### 10. Dependencias

### 11. Plan de Mejora Priorizado

Formato:

* [ALTA] ...
* [MEDIA] ...
* [BAJA] ...

---

## REGLAS IMPORTANTES

* Sé crítico, no diplomático
* No des recomendaciones genéricas
* Cada problema debe incluir:

  * qué está mal
  * por qué está mal
  * cómo solucionarlo
* Evita sobreingeniería en las recomendaciones
* No sugieras tecnologías nuevas sin justificar impacto real

---

# 3. Observación rápida sobre tu package.json (antes del agente)

Hay errores claros:

* `@types/react-router-dom` v5 → **incompatible con v6**
* `"analytics": "github:vercel/analytics"` → redundante (ya tienes vercel analytics)

Esto el agente lo va a marcar como mala práctica.

---

# 4. Siguiente paso

Si quieres hacerlo más potente:

* pásame tu `src/` (aunque sea estructura + 2–3 archivos clave)
* o corre este agente en Cursor / Claude / GPT con acceso a repo

Y luego te ayudo a convertir el `Revision.md` en un **plan de refactor real**, no solo diagnóstico.

