# Auditoria UI/UX y Arquitectura Frontend

Fecha: 2026-05-05
Proyecto auditado: Portfolio_Fran
Stack real: React 19, Vite, TypeScript, React Router, CSS puro, EmailJS, Vercel Analytics.

## 1. Diagnostico

El proyecto ya tiene una estructura base razonable: `pages`, `features`, `components`, `layouts`, `data`, `hooks` y `styles`. El problema principal no es falta de carpetas, sino falta de criterio unico de producto: el portfolio mezcla narrativa personal, showcases, skills, experiencia, contacto, animacion, SEO y componentes reutilizables sin una jerarquia consistente.

La UI intenta verse tecnica y visual, pero todavia compite consigo misma: hero repetido, secciones pesadas, filtros, cards, skills, CTA y formulario aparecen con pesos parecidos. Para un portfolio orientado a reclutadores, el primer objetivo debe ser responder rapido: quien eres, que valor vendes, que proyectos prueban ese valor y como contactarte.

## 2. Problemas UX Principales

1. Mensaje principal debil en `src/features/HomeSection/HomeSection.tsx`.
   El hero muestra `Ingeniero / Full Stack` con logo, pero no explica propuesta de valor, stack fuerte, disponibilidad o CTA directo.

2. Home y Portfolio compiten.
   `src/pages/HomePage/HomePage.tsx` muestra proyectos, about y CTA a portfolio. `src/pages/PortfolioPage/PortfolioPage.tsx` vuelve a usar hero, about, proyectos, skills, experiencia y contacto. Hay duplicacion narrativa.

3. El componente `HomeSection` se usa como banner generico.
   En detalles y portfolio se usa para titulos de pagina, pero su semantica visual parece landing hero. Esto infla pantallas secundarias.

4. CTAs poco priorizados.
   El contacto real esta al final del portfolio. La home tiene CTA a portfolio, pero no CTA directo a contacto, CV, LinkedIn o proyecto destacado.

5. Filtros de tecnologia pueden generar ruido.
   En `PortfolioPage`, cada tecnologia crea un boton. A medida que crezcan proyectos, la zona de filtros puede dominar mas que los proyectos.

6. Estados y feedback limitados.
   El formulario tiene estados basicos, pero los botones deshabilitados no explican por que. Los cards clicables no siempre son semanticamente interactivos.

7. Accesibilidad mejorable.
   Hay `article` clicable en `ImgContainer` sin teclado ni rol de enlace/boton. Hay botones con solo `<` y `>` sin `aria-label` en `ScrollableContainer`.

## 3. Arquitectura de Informacion Propuesta

### Home

Objetivo: vender valor en 15 segundos.

Debe contener:

- Hero con nombre, rol, propuesta de valor y CTA primario.
- 2 o 3 proyectos destacados maximo.
- Resumen corto de experiencia real.
- CTA final a contacto o portfolio completo.

### Portfolio

Objetivo: probar capacidades.

Debe contener:

- Intro compacta, no hero de pantalla completa.
- Proyectos con filtros acotados.
- Experiencia profesional.
- Skills como soporte, no como bloque protagonista.
- Contacto.

### Details

Objetivo: profundizar en un proyecto o experiencia.

Debe contener:

- Titulo real del proyecto/experiencia.
- Problema, solucion, stack, rol, resultados y enlace.
- Navegacion de vuelta clara.

### About

Objetivo: dar contexto humano y profesional.

Debe evitar repetir todo lo de portfolio.

## 4. Plan de Componentes

Componentes actuales a preservar:

- `MainLayout`
- `Navbar`
- `SEOHead`
- `Button`
- `DetailSection`
- `ContactForm`
- `ImgContainer`

Componentes recomendados:

- `HeroSection`: reemplazar el uso generico de `HomeSection` en home.
- `PageHeader`: encabezado compacto para `PortfolioPage`, `DetailsPage`, `AboutPage` y `NotFoundPage`.
- `FeaturedProjects`: limitar proyectos destacados de home.
- `ProjectFilters`: extraer filtros de `PortfolioPage`.
- `ProjectCard`: extraer card desde `DetailSection`.
- `ExperienceCard`: evitar forzar experiencia y proyecto dentro del mismo shape visual.
- `CTASection`: contacto o accion final reutilizable.

## 5. Cambios Concretos Por Archivo

### `src/App.tsx`

- Problema: envuelve toda la app en `<main>` y `MainLayout` vuelve a crear otro `<main>`.
- Cambio recomendado: usar fragment o `<div id="app-shell">` en `App.tsx` y dejar el `<main>` solo en `MainLayout`.
- Riesgo: bajo.

### `src/routes/AppRouter.tsx`

- Problema: comentarios hablan de rutas protegidas/login que no existen.
- Cambio recomendado: limpiar comentarios y usar un solo `Route element={<MainLayout />}` para rutas normales y 404.
- Riesgo: bajo.

### `src/features/HomeSection/HomeSection.tsx`

- Problema: componente semantico de home usado como header generico.
- Cambio recomendado: renombrar conceptualmente a `HeroSection` para home y crear `PageHeader` compacto para paginas internas.
- Riesgo: medio si se cambia de golpe; hacerlo por extraccion incremental.

### `src/pages/HomePage/HomePage.tsx`

- Problema: importa `generateSlug` desde `DetailsPage`, creando dependencia page-to-page.
- Cambio recomendado: mover `generateSlug` a `src/utils/slug.ts`.
- Problema: estilos inline en titulo y parrafo.
- Cambio recomendado: moverlos a `HomePage.css`.
- Riesgo: bajo.

### `src/pages/PortfolioPage/PortfolioPage.tsx`

- Problema: `scrollProgress` actualiza estado en cada scroll sin throttle ni `requestAnimationFrame`.
- Cambio recomendado: usar CSS nativo si basta, o throttling con `requestAnimationFrame`.
- Problema: division por cero si la pagina no tiene scroll.
- Cambio recomendado: proteger `windowHeight <= 0`.
- Problema: demasiadas responsabilidades en una pagina.
- Cambio recomendado: extraer `ProjectFilters`, `SkillsGrid`, `ExperienceSection`.
- Riesgo: medio.

### `src/pages/DetailsPage/DetailsPage.tsx`

- Problema: `const targetData = ... as any`.
- Cambio recomendado: resolver union con discriminante local: `type: 'project' | 'experience'`.
- Problema: slug logic vive en una pagina.
- Cambio recomendado: mover a `src/utils/slug.ts`.
- Riesgo: bajo.

### `src/features/DetailSection/DetailSection.tsx`

- Problema: recibe `backgroundImg`, `backgroundAlt` y `layout`, pero no los usa.
- Cambio recomendado: implementar o eliminar props. Preferencia pragmaticamente: eliminar hasta que haya uso real.
- Problema: mezcla proyectos y experiencia en un solo card con campos opcionales.
- Cambio recomendado: mantener temporalmente, pero separar cuando se toque Details.
- Riesgo: medio si hay CSS dependiente.

### `src/components/UI/ImgContainer/ImgContainer.tsx`

- Problema: `article` con `onClick` no es accesible por teclado.
- Cambio recomendado: renderizar `<a>` cuando hay `href`, o `<button>` si es accion interna.
- Riesgo: bajo.

### `src/components/UI/ScrollableContainer/ScrollableContainer.tsx`

- Problema: botones `<` y `>` no tienen `aria-label`.
- Cambio recomendado: agregar `aria-label="Desplazar proyectos a la izquierda/derecha"`.
- Problema: animacion manual con `requestAnimationFrame` no cancela si el componente desmonta durante animacion.
- Cambio recomendado: guardar frame id y cancelarlo en cleanup si se mantiene esta animacion.
- Riesgo: bajo.

### `src/features/AboutSection/AboutSection.tsx`

- Problema: manipula `style.transform` directo en scroll. Funciona, pero mezcla comportamiento visual imperativo dentro del componente.
- Cambio recomendado: limitar efecto a una clase/variable CSS o mover a hook reutilizable si se usa en mas secciones.
- Riesgo: bajo.

### `src/components/Contacto/ContactForm.tsx`

- Problema: variables de EmailJS se usan sin validar presencia.
- Cambio recomendado: deshabilitar submit con mensaje claro si falta configuracion.
- Problema: `console.error` en cliente puede filtrar detalles innecesarios.
- Cambio recomendado: mostrar feedback de usuario y loguear solo en desarrollo.
- Riesgo: bajo.

### `src/styles/colors.css` y `src/styles/design-tokens.css`

- Problema: dos sistemas de tokens compiten y redefinen `--color-primary`.
- Cambio recomendado: unificar en `design-tokens.css` y dejar `colors.css` como deprecated o eliminarlo.
- Riesgo: medio por impacto visual global.

### `src/pages/PortfolioPage/PortfolioPage.css`

- Bug: `color: var();` en linea 148 es CSS invalido.
- Cambio recomendado: reemplazar por un token real o eliminar regla.
- Riesgo: bajo.

## 6. Riesgo General

Riesgo tecnico: medio-bajo.
Riesgo UX: medio.
Riesgo SEO: medio por ser SPA y depender de metadata cliente.
Riesgo de mantenibilidad: medio por CSS disperso, props no usadas y componentes con demasiadas responsabilidades.

## 7. Primer Refactor Seguro

Primer paso recomendado:

1. Corregir semantica raiz: quitar `<main>` de `App.tsx` o de `MainLayout`.
2. Mover `generateSlug` a `src/utils/slug.ts`.
3. Eliminar `any` de `DetailsPage`.
4. Arreglar `color: var();`.
5. Agregar accesibilidad basica a `ScrollableContainer` e `ImgContainer`.

Este lote es pequeno, comprobable y no cambia el concepto visual todavia.
