# 🔍 Revisión Técnica Completa — Portfolio Fran

> **Auditor:** Agente Senior Frontend (Arquitectura · Performance · SEO · UX/UI)
> **Fecha:** 2026-04-09
> **Stack:** React 19 · Vite 6 · TypeScript 5.8 · CSS vanilla · React Router 6

---

## 1. Resumen Ejecutivo

**Calificación global: 4.5 / 10 — Proyecto funcional pero con deficiencias estructurales serias.**

El portafolio cumple la función mínima de mostrar proyectos, pero **no vende**. Un reclutador que acceda a este sitio no va a sentir que está viendo el trabajo de un desarrollador senior o de alguien que domina el frontend. Los problemas más graves son:

1. **🔴 SEGURIDAD CRÍTICA:** El archivo `.env` contiene credenciales de base de datos Supabase en texto plano y **está commiteado en el repo** (aunque `.gitignore` lo lista, el archivo ya existe en el proyecto). Esto es una **vulnerabilidad de seguridad de nivel crítico**.
2. **CSS desestructurado al extremo:** No existe un sistema de diseño. Hay colores hardcodeados en más de 15 archivos, variables CSS duplicadas y contradictorias entre `colors.css` y `variables.css`, y cero consistencia visual.
3. **SEO inexistente para una SPA:** Cero meta tags, cero Open Graph, cero `<meta description>`, título genérico "Portfolio Fran". Google no indexará nada útil.
4. **UX sin narrativa:** El portafolio no guía al usuario, no cuenta una historia, no tiene CTA claros, no tiene sección de contacto dedicada, y la navegación es confusa.
5. **Código muerto y carpetas vacías:** `types/`, `contexts/`, `features/`, `utils/` están vacíos o con código muerto. Interface `User` que no se usa en ningún lugar.

---

## 2. Problemas Críticos (Top 5)

| # | Severidad | Problema | Impacto |
|---|-----------|----------|---------|
| 1 | 🔴 CRÍTICA | `.env` con credenciales de Supabase visibles en el repositorio | Cualquier persona con acceso al repo puede leer/escribir la base de datos |
| 2 | 🔴 CRÍTICA | Cero SEO: sin meta tags, sin Open Graph, sin sitemap, título genérico | El sitio es invisible para Google. Un reclutador que comparta el link verá "Portfolio Fran" sin preview |
| 3 | 🟠 ALTA | SVG del logo (`Franguh.svg`) pesa **2.9 MB** — se carga como favicon Y dentro del componente HomeSection | Tiempo de carga inaceptable. Un SVG de 3 MB bloquea el renderizado |
| 4 | 🟠 ALTA | No existe sistema de diseño: 2 archivos de variables CSS conflictivos, colores hardcodeados en 15+ archivos | Impossible mantener o escalar. Cambiar un color requiere editar 15 archivos |
| 5 | 🟠 ALTA | Navegación con `window.location.href` en vez de React Router `useNavigate()` | Cada clic en "Ir a Portfolio" recarga toda la app. Destruye la experiencia SPA |

---

## 3. Auditoría por Carpetas

---

### 📁 components/UI/

#### Problemas detectados:
* **13 sub-carpetas** bajo `components/UI/` sin categorización. No se distingue entre átomos (Button), moléculas (ImgContainer), y organismos (AboutSection, DetailSection). Todo está al mismo nivel.
* `AboutSection` y `DetailSection` son **page-level sections**, no componentes UI reutilizables. Deberían estar en `features/` o en las propias páginas.
* `SkillBadge` no se usa en ningún componente — **código muerto**.
* `ParticleField` se renderiza con `count={0}` en `HomeSection`, así que genera **0 partículas**. El componente existe pero no hace nada visible.
* `NavbarLogo` está en `components/UI/Navbar/` pero el navbar real está en `layouts/navbar/`. **Dos ubicaciones distintas para el mismo feature.**
* Falta de barrel exports (`index.ts`) — cada import requiere path completo.

#### Code smells:
* `ImgContainer` recibe `LoaderProps` como nombre de interface — confunde con el componente `Loader`.
* `AboutSection` tiene un `IntersectionObserver` + `scroll` listener manual hardcodeado dentro del componente. Debería ser un hook reutilizable (`useParallax`).
* `LinkButton` se exporta como `LinkButton` pero se importa en `AboutSection` como `LinkButtom` (typo).
* `SvgIcons.tsx` tiene **24 KB / 190 líneas** de SVG inline. Pesa más que todos los componentes combinados.
* `R` component en `SvgIcons.tsx` (línea 189) es un componente vacío que retorna `<></>` — código muerto.

#### Riesgos:
* El `IntersectionObserver` en `AboutSection` no limpia el `scroll` listener si el componente se desmonta antes de que la imagen entre en viewport. **Memory leak potencial.**
* `ScrollableContainer` usa `requestAnimationFrame` sin cancelarlo en cleanup — posible leak en desmontaje rápido.

#### Mejores prácticas faltantes:
* No hay tipado de props con `React.FC` consistente — se mezcla `React.FC<Props>` con arrow functions destructuradas.
* No hay `aria-label` en los botones de scroll (`<` y `>`).
* No hay `key` estables — se usan índices de array como `key` en múltiples componentes.

#### Recomendaciones:
1. Mover `AboutSection`, `DetailSection`, `HomeSection`, `FeatureSelector` a `features/` o directamente co-locados con sus páginas.
2. Crear barrel exports (`index.ts`) por carpeta.
3. Extraer el parallax a `useParallax` hook.
4. Reemplazar SVGs inline por un icon sprite o archivos `.svg` con imports de Vite.
5. Eliminar `SkillBadge`, `ParticleField` (count=0), y el componente `R`.

#### Ejemplo de mejora:

```tsx
// hooks/useParallax.ts — Extraer la lógica de AboutSection
import { useEffect, useRef } from 'react';

export function useParallax(maxOffset = 30) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = 1 - rect.top / window.innerHeight;
      const offset = Math.min(maxOffset, Math.max(0, progress * maxOffset));
      el.style.transform = `translateY(${offset}px)`;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll, { passive: true });
        } else {
          window.removeEventListener('scroll', handleScroll);
          el.style.transform = 'translateY(0px)';
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [maxOffset]);

  return ref;
}
```

---

### 📁 contexts/

#### Problemas detectados:
* **Carpeta vacía.** Solo tiene un `README.md` explicando qué debería contener.
* El `README.md` menciona "auth, tema, carrito" — funcionalidades que no existen ni son relevantes para un portafolio.

#### Code smells:
* Carpeta placeholder sin código real = ruido en el proyecto.

#### Riesgos:
* Da la apariencia de que el proyecto está incompleto o abandonado.

#### Recomendaciones:
* **Eliminar la carpeta** hasta que haya un contexto real que implementar.
* Si se necesita un `ThemeContext` para dark mode (recomendado), implementarlo ahí.

---

### 📁 data/

#### Problemas detectados:
* `cvData.ts` mezcla **definiciones de interfaces** con **datos**. Las interfaces `Skill`, `Project`, `Experience`, `SkillCategory`, `CVData` deberían estar en `types/`.
* Datos personales sensibles hardcodeados: teléfono (`777-493-3706`), email, ubicación. En un repo público esto es un riesgo de privacidad.
* El campo `period` usa strings libres (`"Abril - Mayo 2025"`) en vez de un formato parseable. Imposible ordenar o filtrar por fecha.
* Las rutas de imagen están hardcodeadas como strings absolutos (`"/pictures/ImgProyects/..."`) — frágil y sin validación.

#### Code smells:
* La interface `Skill` solo tiene `name: string`. Es over-engineering tener un type dedicado para un solo campo. Usar `string[]` directamente.

#### Riesgos:
* Si se renombra una imagen o carpeta en `/public/pictures`, no hay warning en build — el error solo aparece en runtime con una imagen rota.

#### Mejores prácticas faltantes:
* Separar tipos de datos.
* Considerar un archivo JSON o CMS headless para los datos del CV si se quiere mantener editable sin tocar código.

#### Recomendaciones:
1. Mover interfaces a `types/cv.types.ts`.
2. Usar constantes o enums para tech stacks repetidos.
3. Considerar centralizar datos personales sensibles en variables de entorno (o simplemente no publicarlos en el repo).

---

### 📁 features/

#### Problemas detectados:
* **Carpeta vacía.** Solo `README.md` con texto: "Componentes envolventes como Navbar/Footer".
* El README describe algo que ya existe en `layouts/`. Contradicción directa.

#### Recomendaciones:
* Eliminar o repurposear como contenedor de feature-modules (`portfolio/`, `about/`) si se adopta arquitectura feature-based.

---

### 📁 hooks/

#### Problemas detectados:
* Solo un hook: `useImagePreloader`. El proyecto tiene al menos 3 piezas de lógica que deberían ser hooks:
  - Scroll parallax (`AboutSection`)
  - Scroll progress (`PortfolioPage`)
  - Scroll detection para navbar (`navbar.tsx`)
* El hook no tiene tipado genérico del Promise — `new Promise((resolve) => ...)` devuelve `Promise<unknown>`.

#### Code smells:
* `imageUrls` en el array de dependencias del `useEffect` causa re-ejecución si la referencia del array cambia. Si el consumidor no usa `useMemo` o no declara el array fuera del componente, el preloader re-ejecuta en cada render.

#### Mejores prácticas faltantes:
* Sin tests unitarios.
* El ADR es un buen detalle pero no valida que la implementación actual lo cumpla.

#### Recomendaciones:
1. Crear `useScrollProgress`, `useParallax`, `useScrollDirection` como hooks reutilizables.
2. Tipar correctamente la Promise: `new Promise<string>((resolve) => ...)`.
3. Agregar un timeout de seguridad al preloader para evitar que una imagen de 50 MB congele la app.

#### Ejemplo de mejora:

```tsx
// hooks/useScrollProgress.ts
import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(height > 0 ? (total / height) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
```

---

### 📁 layouts/

#### Problemas detectados:
* `MainLayout` usa un Fragment (`<>`) como wrapper. El `<main>` no tiene ninguna clase CSS — no se puede estilizar el contenedor principal globalmente.
* La navbar está duplicada: existe en `layouts/navbar/` Y hay componentes navbar en `components/UI/Navbar/`. La lógica está dividida entre dos ubicaciones.
* `navbar.tsx` usa `<a href={item.link}>` para navegación interna en vez de `<Link>` de React Router. **Cada clic recarga toda la app.**
* `MegaMenu.tsx` también usa `<a href={item.link}>` — misma falla.
* `navbar.css` tiene clases `.search` y `.sign-in` que no se usan en ningún componente — **CSS muerto**.
* `MegaMenu` cierra con animación de apertura pero no tiene animación de cierre.

#### Code smells:
* El `MegaMenu` tiene la animación `designerAppear` con `rotateX(180deg)` que causa un flip 3D completo. Es visualmente desorientador y poco profesional.
* `navbar.config.ts` tiene `children` con rutas inconsistentes: `"/Portfolio"` vs `"/portfolio"` (case-sensitive differencia en servidores linux).

#### Riesgos:
* El mega menu ocupa 100% de la viewport sin way to scroll — `overflow: hidden` en el overlay. Si el contenido crece, se corta.
* El z-index de la progress bar (9999) es mayor que el del navbar (10), pero el MegaMenu (15) está por debajo de la progress bar.

#### Recomendaciones:
1. Unificar navbar en una sola ubicación (preferiblemente `layouts/navbar/`).
2. Reemplazar TODOS los `<a href>` internos por `<Link to>` de React Router.
3. Eliminar CSS muerto (`.search`, `.sign-in`).
4. Agregar animación de cierre al MegaMenu.
5. Corregir la ruta `"/Portfolio"` a `"/portfolio"` en `navbar.config.ts`.

#### Ejemplo de mejora:

```tsx
// layouts/navbar/navbar.tsx — Usar Link de React Router
import { Link } from "react-router-dom";

// En el render:
<li key={index} className="navbar-item">
  <Link to={item.link ?? "/"}>{item.label}</Link>
</li>
```

---

### 📁 pages/

#### Problemas detectados:
* **Home:** La mayoría del contenido visual está en componentes de `components/UI/`. El componente `Home` es más un orquestador que una página — pero aún así contiene lógica de layout.
* **Home:** `window.location.href = '/portfolio'` en el botón flotante — **destruye la SPA navegando con recarga completa**.
* **About:** Es esencialmente una copia del contenido de Home (`AboutSection` con el mismo texto, mismo imagen, mismo layout). **Contenido duplicado al 90%.**
* **Details:** Tiene bloques enteros de código comentado (SVGs de Zelda, líneas 26-44, 60-79). **Código muerto visible.**
* **Details:** Los arrays `items` están vacíos `[]`, así que las secciones `DetailSection` no renderizan ningún item — **las tarjetas están vacías**.
* **Portfolio:** Usa `<main>` pero ya está dentro del `MainLayout` que también tiene `<main>` — **HTML semántico inválido (`<main>` anidado)**.
* **Portfolio:** No hay lazy loading de la página — se carga todo el bundle al inicio.
* **Page404:** No está dentro del `MainLayout`, por lo tanto no tiene navbar. El usuario queda atrapado sin navegación global.

#### Code smells:
* `Home.css` define `.Home__proyects` (con "y") pero el JSX usa `className="Home__projects"` (con "j"). **La clase CSS nunca se aplica.**
* Inconsistencia de estilos entre páginas: Home tiene `bg-pan-right`, About lo copia, Details lo copia, Portfolio no lo usa.
* `Details.css` y `About.css` tienen `.Details__floating` y `.About__floating` con estilos casi idénticos — **duplicación**.

#### Riesgos:
* El `useEffect` de scroll en `Portfolio.tsx` ejecuta `setState` en cada pixel de scroll sin throttle ni debounce — rendimiento cuestionable en móviles.

#### Recomendaciones:
1. Reemplazar todos los `window.location.href` por `useNavigate()` de React Router.
2. Eliminar todo código comentado.
3. Resolver el `<main>` anidado en Portfolio (quitar el de la página o el del layout).
4. Agregar lazy loading: `const Portfolio = lazy(() => import('./pages/Portfolio/Portfolio'))`.
5. Incluir Page404 dentro del layout o darle su propia navbar.
6. Corregir `.Home__proyects` → `.Home__projects`.
7. Diferenciar el contenido de About vs Home — actualmente son casi idénticos.

---

### 📁 routes/

#### Problemas detectados:
* No hay lazy loading de rutas. Todas las páginas se importan síncronamente — todo se carga en el bundle inicial.
* La ruta `/detail` en singular es inconsistente con la carpeta `Details/` (plural).
* No hay rutas para secciones internas (ej. `/portfolio#projects`, `/about#contact`).
* No hay meta-data per-route (título de página, meta description).

#### Recomendaciones:

1. Implementar `React.lazy()` + `Suspense` para code splitting.

##### pendiente

2. Crear un wrapper de route que actualice `document.title` y meta tags por ruta.

#### Ejemplo de mejora:

```tsx
// routes/AppRouter.tsx — Con lazy loading
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MainLayout } from "../layouts/MainLayout";
import Loader from "../components/UI/Loader/Loader";

const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../pages/About/About"));
const Details = lazy(() => import("../pages/Details/Details"));
const Portfolio = lazy(() => import("../pages/Portfolio/Portfolio"));
const Page404 = lazy(() => import("../pages/Page404/Page404"));

const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<Loader message="Cargando..." />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/details" element={<Details />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;
```

---

### 📁 styles/

#### Problemas detectados:
* **Dos archivos de variables que se contradicen:**
  - `colors.css`: `--color-primary: #F5F5F7` (gris claro)
  - `variables.css`: `--color-primary: #ff8903` (naranja)
  - Resultado: **depende del orden de importación**, lo cual es frágil e impredecible.
* `variables.css` define variables que SOLO usa `Button.css`. No es un sistema de diseño, es un parche local.
* `colors.css` define un `[data-theme="dark"]` pero **no hay toggle de tema** en toda la app. CSS muerto.
* `bg.css` importa `colors.css`, y `App.css` también importa `colors.css`. **Import duplicado.**
* `App.css` tiene el selector `h1, h2, h3, h4 .title` — **el espacio antes de `.title` es un bug CSS**. Le aplica el font-family a `h1, h2, h3` globalmente, pero solo a elementos `.title` *dentro* de `h4`.
* `App.css` repite `::selection` **tres veces** con el mismo estilo (líneas 16-41). **CSS redundante.**
* `bg.css` usa `100vh` para `.explosion-bg` en vez de `100dvh`. Inconsistente con el resto del proyecto.
* No se importa `variables.css` en ningún punto de la cascada global — solo funciona porque `Button.css` lo importa directamente.

#### Code smells:
* No hay sistema de spacing (padding, margin, gap) — cada componente inventa sus propios valores: `20px`, `1rem`, `2rem`, `0.8rem`, `0.5rem`, `3rem`, `4rem 2rem`, `2.5rem`... sin patrón.
* No hay scale tipográfica — tamaños como `1.5rem`, `2.5rem`, `4rem`, `6vw`, `0.85rem`, `1.1rem`, `0.9rem`, `2.2rem`, `1.8rem` dispersos por todo el proyecto.
* Colores hardcodeados en componentes: `#ff9800`, `#121212`, `#1c1c1c`, `#0a0a0a`, `#333`, `#444`, `#ffa927c6`, `#ffa527`, `#13da2e`, `#008080` — **ninguno usa variables CSS**.
* `font-family` declarada en 4+ archivos con variantes diferentes: `'Anton'`, `'Inter'`, `'Bebas Neue'`, `system-ui`, `monospace`.

#### Recomendaciones:
1. **Fusionar** `colors.css` y `variables.css` en un solo `design-tokens.css`.
2. Crear un sistema de spacing: `--space-xs: 0.25rem`, `--space-sm: 0.5rem`, etc.
3. Crear scale tipográfica: `--font-size-sm`, `--font-size-base`, `--font-size-lg`, etc.
4. Reemplazar TODOS los colores hardcodeados por variables CSS.
5. Eliminar `::selection` duplicados.
6. Corregir el selector `h1, h2, h3, h4 .title` a `h1, h2, h3, h4, .title`.
7. Eliminar dark theme CSS si no hay toggle (o implementar el toggle).

#### Ejemplo de mejora:

```css
/* styles/design-tokens.css — Sistema unificado */
:root {
  /* Colores */
  --color-bg: #ffffff;
  --color-surface: #f5f5f7;
  --color-text: #1a1a1a;
  --color-text-muted: #666;
  --color-text-light: #ffffff;
  --color-primary: #ff8903;
  --color-primary-hover: #e67a00;
  --color-accent: #ff9900;
  --color-danger: #ff4d4d;
  --color-brand-green: #13da2e;

  /* Superficies oscuras */
  --color-dark-bg: #0a0a0a;
  --color-dark-surface: #121212;
  --color-dark-card: #1c1c1c;
  --color-dark-border: #333;

  /* Tipografía */
  --font-display: 'Anton', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: monospace;

  --font-size-xs: 0.8rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
  --font-size-3xl: 2.5rem;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 500ms ease;

  /* Z-index */
  --z-navbar: 100;
  --z-megamenu: 150;
  --z-loader: 200;
  --z-progress: 90;
}
```

---

### 📁 types/

#### Problemas detectados:
* Contiene **una sola interface** `User` con `id`, `name`, `email` — que **no se usa en ningún lugar del proyecto**.
* La extensión es `.tsx` pero no contiene JSX. Debería ser `.ts`.
* Las interfaces reales del proyecto (`Skill`, `Project`, `Experience`, `CVData`, `ItemData`, `ButtonProps`, etc.) viven dispersas en los componentes.

#### Recomendaciones:
1. **Eliminar** `User` interface.
2. Centralizar tipos del dominio aquí: `cv.types.ts`, `navigation.types.ts`, `component.types.ts`.

---

### 📁 utils/

#### Problemas detectados:
* **Carpeta vacía.** Solo `README.md`.
* Hay lógica que debería estar aquí pero vive dentro de componentes:
  - Lógica de scroll smooth en `ScrollableContainer`
  - Lógica de image preloading podría tener helpers aquí

#### Recomendaciones:
* Eliminar hasta que haya utilities reales, o mover helpers sueltos aquí.

---

## 4. Arquitectura Global

### Separación de responsabilidades

| Aspecto | Estado | Comentario |
|---------|--------|------------|
| Datos vs UI | 🟡 Parcial | `cvData.ts` mezcla types con data |
| Lógica vs Presentación | 🔴 Malo | Scroll logic, IntersectionObserver inline en componentes |
| Routing vs Pages | 🟢 OK | Correcta separación con outlet pattern |
| Layout vs Content | 🟡 Parcial | Navbar dividido entre 2 carpetas |
| Shared vs Feature | 🔴 Malo | Todo en `components/UI/` sin categorizar |

### Escalabilidad
- El proyecto no escalaría. Agregar una nueva página requiere tocar estilos globales, copiar patrones de otras páginas, y duplicar lógica.
- No hay convenciones de naming consistentes: se mezclan `PascalCase` y `camelCase` en archivos CSS.

### Sobreingeniería
- `useImagePreloader` con `sessionStorage` para un portafolio de 5 imágenes es sobreingeniería. El browser cache ya maneja esto.
- Archivo `features/README.md` describe funcionalidades que no existen.
- `SkillBadge` componente creado pero nunca usado.
- `ParticleField` importado pero renderizado con `count={0}`.

### Underengineering
- No hay error boundaries.
- No hay sistema de diseño.
- No hay lazy loading.
- No hay SEO helpers.
- No hay accessibility audit.

---

## 5. Sistema de Estilos

### Diagnóstico: 🔴 CRÍTICO

**No existe un sistema de diseño. Lo que hay es una colección de estilos ad-hoc con múltiples fuentes de verdad que se contradicen.**

| Problema | Conteo | Archivos afectados |
|----------|--------|-------------------|
| Colores hardcodeados | 40+ instancias | 15 archivos CSS |
| `font-family` declarada | 5 variantes | 6+ archivos |
| Variables CSS duplicadas | `--color-primary` definida 2 veces con valores distintos | `colors.css`, `variables.css` |
| Spacing inconsistente | 15+ valores únicos | Todos los archivos |
| `border-radius: 0` implícito | Ningún componente usa border-radius | Diseño anguloso no intencional |
| CSS muerto | 10+ clases | navbar, colors, App.css |

### Por qué es crítico:
Un reclutador que inspeccione el código (y lo harán) verá caos en los estilos. Esto contradice directamente la propuesta de valor del portafolio: "Soy un desarrollador frontend que sabe lo que hace."

### CSS no es módulo
El prompt menciona "CSS Modules" pero el proyecto **no usa CSS Modules**. Usa CSS vanilla con convención BEM parcial. Los estilos son globales — cualquier clase puede colisionar con otra.

---

## 6. UX/UI

### ¿El portafolio "vende"? 🔴 NO

| Criterio | Evaluación |
|----------|------------|
| Primera impresión | 🟡 La hero section con gradiente naranja es llamativa pero genérica |
| Propuesta de valor clara | 🔴 "Ingeniero Full Stack" es lo primero que ves, pero no dice qué te hace especial |
| CTA principal | 🔴 No hay. El botón "Ir a Portfolio" está flotando en la esquina inferior, fácil de ignorar |
| Sección de contacto | 🔴 No existe. Los links de LinkedIn/GitHub están enterrados en AboutSection |
| Narrativa/Story | 🔴 El texto "Mi historia" aparece 2 veces (Home y About) con el mismo contenido |
| Responsive | 🟡 Funcional pero no optimizado para mobile. La navbar se oculta sin hamburger |
| Accesibilidad | 🔴 Sin aria labels, sin focus management, sin skip navigation |
| Interactividad | 🟡 Hover effects presentes pero sin micro-animations significativas |

### Problemas de flujo:
1. **Home → ?**: El usuario ve el hero, un carousel de proyectos, la misma bio que aparece en About, un FeatureSelector funcional... pero sin dirección.
2. **¿Dónde está el contacto?** Un reclutador quiere contactarte. Links de LinkedIn y GitHub están mezclados dentro de la bio, no tienen sección propia.
3. **Redundancia Home/About:** Mismo texto, misma imagen, mismo layout. El usuario siente que está leyendo lo mismo.
4. **Details vacío:** Las secciones `DetailSection` en la página Details tienen arrays `items=[]`. La página está esencialmente vacía de contenido real.

### Recomendaciones UX:
1. **Hero con CTA claro:** "Ver mis proyectos" o "Contáctame" como acción principal.
2. **Sección de contacto dedicada** con email, LinkedIn, GitHub, y un mensaje de disponibilidad.
3. **Eliminar página About** o diferenciarla radicalmente del Home.
4. **Footer** con información de contacto y links de navegación.
5. **Breadcrumbs o navegación contextual** para que el usuario sepa dónde está.

---

## 7. Animaciones

### Estado actual:
- Gradientes animados CSS (`bg-pan-right`, `bg-pan-pulse`) — funcionales pero costosos.
- Parallax manual con IntersectionObserver — funcional pero hardcodeado.
- Hover transitions — presentes y aceptables.
- MegaMenu flip animation — **visualmente desagradable** (rotateX 180°).
- `ParticleField` — importado pero renderizado con `count=0` (inactivo).

### Recomendación: CSS puro ✅

**No usar Framer Motion ni GSAP.** Justificación:

| Librería | Peso | Justificación para NO usar |
|----------|------|---------------------------|
| Framer Motion | ~32 KB | El portafolio no tiene transiciones de ruta, animaciones de lista, ni gestures que justifiquen el bundle extra |
| GSAP | ~27 KB | No hay scroll-triggered sequences complejas ni timelines. Las 3 animaciones del portafolio son resolubles con CSS |

**Lo que sí implementar con CSS:**
1. `@keyframes` para fade-in en scroll (usando IntersectionObserver toggle de clase).
2. `transition` para hover states (ya presentes).
3. Quitar el flip 3D del MegaMenu — usar una animación de slide-down sutil.
4. Agregar `animation-fill-mode: forwards` a los fade-ins para que no salten al desmontar.

---

## 8. Estado Global

### ¿Usar Zustand? 🔴 NO

**No hay necesidad real de estado global.** El portafolio tiene:
- Datos estáticos en `cvData.ts`
- Estado local de UI (scroll, toggle mega menu, filtro de tecnología)
- Sin autenticación, sin carrito, sin formularios multi-step

Zustand agregaría complejidad sin beneficio tangible. React Context sería suficiente si se implementa dark mode.

**Veredicto:** Rechazado. El costo supera el beneficio.

---

## 9. Performance

### Bundle

| Problema | Impacto | Solución |
|----------|---------|----------|
| `Franguh.svg` (2.9 MB) cargado como favicon Y como imagen | Bloquea primer render | Optimizar SVG (SVGO) o convertir a PNG de 32x32 para favicon. Lazy load la versión completa |
| `SvgIcons.tsx` (24 KB) importado globalmente | En el bundle inicial siempre | Mover a imports dinámicos o separar por íconos usados |
| Sin lazy loading de rutas | Todo el JS se carga al inicio | `React.lazy()` + `Suspense` |
| `analytics` duplicado en dependencies | `@vercel/analytics` + `analytics` (github:vercel/analytics) | Eliminar `analytics` package duplicado |
| Sin tree-shaking de íconos | Todos los SVG icons se incluyen aunque no se usen | Export individual por ícono |

### Rendering

| Problema | Impacto |
|----------|---------|
| Scroll handler sin throttle en `Portfolio.tsx` | `setState` en cada frame de scroll — re-render innecesario |
| `useImagePreloader` crea `new Image()` en cada carga de sesión | Bloquea render hasta que 5 imágenes descargan |
| `ParticleField` genera N divs en un loop (aunque count=0 actualmente) | Potencial bomba de rendimiento si count > 0 |
| `AboutSection` IntersectionObserver + scroll listener sin `{ passive: true }` | Bloquea el scroll smooth en mobile |

### Imágenes
- Las imágenes están en formato WebP ✅ (buena decisión).
- No hay `srcset` ni responsive images — la misma imagen de 480 KB se carga en mobile y desktop.
- No hay CDN de imágenes — se sirven directamente desde el hosting.

---

## 10. SEO

### Diagnóstico: 🔴 CRÍTICO — El sitio es invisible para motores de búsqueda.

#### Estado actual:

```html
<!-- index.html actual -->
<title>Portfolio Fran</title>
<!-- NO hay meta description -->
<!-- NO hay Open Graph tags -->
<!-- NO hay Twitter Card tags -->
<!-- NO hay canonical URL -->
<!-- NO hay robots.txt -->
<!-- NO hay sitemap.xml -->
<!-- NO hay structured data (JSON-LD) -->
<!-- NO hay lang="es" (está en lang="en") -->
```

#### Limitaciones de SPA sin SSR:
Google puede renderizar JavaScript pero con penalización de crawl budget. Para un portafolio personal, la realidad es:
- **Googlebot** eventualmente indexará el contenido, pero con delay.
- **Social media previews** (LinkedIn, Twitter, WhatsApp) **NO** ejecutan JS — si compartes el link, solo verán "Portfolio Fran" sin imagen ni descripción.

#### Soluciones realistas (sin migrar a SSR):

1. **`react-helmet-async`** para meta tags dinámicos por ruta:

```tsx
// components/SEOHead.tsx
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export const SEOHead = ({ title, description, image, url }: SEOProps) => (
  <Helmet>
    <html lang="es" />
    <title>{`${title} | Gustavo Francisco — Full Stack Developer`}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image || '/pictures/Homepicture.webp'} />
    <meta property="og:url" content={url || 'https://plynte.com'} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="canonical" href={url || 'https://plynte.com'} />
  </Helmet>
);
```

2. **Pre-rendering con `vite-plugin-prerender`** — genera HTML estático en build time para las 4-5 rutas fijas. Esto resuelve el problema de social previews sin SSR.

3. **Archivos estáticos:**
   - Crear `public/robots.txt`
   - Crear `public/sitemap.xml`
   - Agregar `manifest.json` para PWA-like behavior

4. **Corregir `lang="en"` → `lang="es"`** en `index.html` (el contenido está en español).

5. **Structured Data (JSON-LD):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Gustavo Francisco Salgado Andrade",
  "jobTitle": "Full Stack Developer",
  "url": "https://plynte.com",
  "sameAs": [
    "https://linkedin.com/in/gustavo-francisco-salgado-andrade-496553337",
    "https://github.com/FranGuh"
  ]
}
</script>
```

### Accesibilidad (impacta SEO):
- Sin `aria-label` en botones de navegación.
- Sin `role` en landmarks.
- Sin `alt` descriptivos (algunos son genéricos como "Minecraft").
- Sin skip-to-content link.
- Contraste de color no verificado.

---

## 11. Dependencias

### `package.json` — Análisis:

| Dependencia | Tipo | Problema |
|-------------|------|----------|
| `@vercel/analytics` | prod | ✅ OK |
| `@vercel/speed-insights` | prod | ✅ OK |
| `analytics` (github:vercel/analytics) | prod | 🔴 **DUPLICADA** con `@vercel/analytics`. Es el mismo paquete desde un GitHub URL directo |
| `react` ^19.1.0 | prod | ✅ OK |
| `react-dom` ^19.1.0 | prod | ✅ OK |
| `react-router-dom` ^6.30.1 | prod | ✅ OK pero no se usa `<Link>` |
| `@types/react-router-dom` ^5.3.3 | dev | 🔴 **INNECESARIA** — `react-router-dom` v6 incluye sus propios types. Esta es la versión de types para v5 |

### Dependencias faltantes:
| Paquete | Uso |
|---------|-----|
| `react-helmet-async` | Meta tags SEO dinámicos |
| `vite-plugin-prerender` | Pre-rendering para SEO |

### Recomendaciones:
1. **Eliminar** `analytics` (github URL) — ya está cubierto por `@vercel/analytics`.
2. **Eliminar** `@types/react-router-dom` v5 — incompatible con RR v6.
3. Considerar `react-helmet-async` para SEO.

---

## 12. Plan de Mejora Priorizado

### 🔴 PRIORIDAD ALTA (Hacer inmediatamente)

* **[ALTA]** Rotar credenciales de Supabase y eliminar `.env` del historial de Git (`git filter-branch` o BFG Repo-Cleaner).
* **[ALTA]** Reemplazar todos los `window.location.href` por `useNavigate()` / `<Link to>` de React Router.
* **[ALTA]** Optimizar `Franguh.svg` (2.9 MB → <50 KB con SVGO, o usar PNG para favicon).
* **[ALTA]** Implementar meta tags SEO con `react-helmet-async` + corregir `lang="en"` → `lang="es"`.
* **[ALTA]** Unificar variables CSS: fusionar `colors.css` + `variables.css` en un solo `design-tokens.css`.
* **[ALTA]** Eliminar dependencia duplicada `analytics` del `package.json`.
* **[ALTA]** Eliminar `@types/react-router-dom` v5 incompatible.

### 🟠 PRIORIDAD MEDIA (Siguiente sprint)

* **[MEDIA]** Implementar lazy loading de rutas con `React.lazy` + `Suspense`.
* **[MEDIA]** Crear sistema de design tokens (colores, spacing, tipografía) y reemplazar todos los valores hardcodeados.
* **[MEDIA]** Agregar sección de contacto dedicada visible desde todas las páginas.
* **[MEDIA]** Diferenciar contenido de Home vs About (actualmente son idénticos).
* **[MEDIA]** Crear un footer con links de navegación y contacto.
* **[MEDIA]** Unificar navbar en una sola ubicación (eliminar duplicación `layouts/navbar` + `components/UI/Navbar`).
* **[MEDIA]** Eliminar código muerto: `SkillBadge`, `User` type, `R` component, `ParticleField` (count=0), CSS muerto (`.search`, `.sign-in`, `::selection` duplicados, dark theme sin toggle).
* **[MEDIA]** Corregir el selector CSS roto `h1, h2, h3, h4 .title`.
* **[MEDIA]** Corregir inconsistencia de path `/Portfolio` vs `/portfolio` en navbar config.
* **[MEDIA]** Resolver `<main>` anidado en PortfolioPage.

### 🟡 PRIORIDAD BAJA (Mejora continua)

* **[BAJA]** Extraer hooks reutilizables: `useScrollProgress`, `useParallax`, `useScrollDirection`.
* **[BAJA]** Agregar `robots.txt`, `sitemap.xml`, y JSON-LD structured data.
* **[BAJA]** Reemplazar SVG icons inline con sprite o imports individuales.
* **[BAJA]** Agregar `srcset` para imágenes responsive.
* **[BAJA]** Throttle/debounce en scroll handlers.
* **[BAJA]** Agregar `{ passive: true }` a scroll listeners.
* **[BAJA]** Agregar barrel exports (`index.ts`) por carpeta de componentes.
* **[BAJA]** Mover interfaces de `cvData.ts` a `types/`.
* **[BAJA]** Considerar pre-rendering con `vite-plugin-prerender` para social previews.
* **[BAJA]** Agregar aria labels y accesibilidad básica.
* **[BAJA]** Eliminar carpetas vacías (`contexts/`, `features/`, `utils/`) o implementar su contenido.
* **[BAJA]** Renombrar `ImgContainer` LoaderProps interface.
* **[BAJA]** Fix de MegaMenu: reemplazar animación de flip 3D por slide-down.

---

> **Nota final:** Este portafolio tiene potencial. El uso de WebP, la estructura de rutas con outlet pattern, el uso de Vite+SWC, y el intento de documentación (ADR del useImagePreloader) muestran buen criterio. Pero la ejecución necesita refinamiento considerable para que un reclutador lo tome en serio como muestra de competencia frontend.
