# Plan Para Agente de Mejora

Este documento sirve como briefing para un agente que continue el trabajo sin perder foco.

## Objetivo

Mejorar el portfolio sin reescribirlo. Priorizar valor para reclutadores, claridad visual, accesibilidad, performance ligera y mantenibilidad.

## Reglas de Trabajo

- No migrar a Tailwind, Next, Astro o CSS Modules sin necesidad demostrada.
- No mezclar refactor UI con cambio de contenido profesional grande.
- No tocar `.env` ni commitear secretos.
- Mantener React Router y Vite por ahora.
- Preferir cambios pequenos y verificables.
- Preservar rutas actuales: `/`, `/about`, `/portfolio`, `/portfolio/:slug`, `*`.
- Ejecutar `pnpm lint` y `pnpm build` tras cambios de codigo.

## Prioridad 1: Correcciones Seguras

Archivos objetivo:

- `src/App.tsx`
- `src/layouts/MainLayout.tsx`
- `src/pages/PortfolioPage/PortfolioPage.css`
- `package.json`
- `src/components/UI/ScrollableContainer/ScrollableContainer.tsx`
- `src/components/UI/ImgContainer/ImgContainer.tsx`

Tareas:

1. Dejar un solo `<main>`.
2. Corregir `color: var();`.
3. Quitar `@types/react-router-dom`.
4. Agregar `aria-label` a botones de scroll.
5. Convertir `ImgContainer` en enlace/boton accesible.

Validacion:

- `pnpm lint`
- `pnpm build`
- Navegacion manual por home y portfolio.

## Prioridad 2: Reducir Deuda de Tipos y Coupling

Archivos objetivo:

- `src/pages/DetailsPage/DetailsPage.tsx`
- `src/pages/HomePage/HomePage.tsx`
- `src/utils/slug.ts`
- `src/features/DetailSection/DetailSection.tsx`

Tareas:

1. Crear `src/utils/slug.ts` con `generateSlug`.
2. Actualizar imports.
3. Eliminar `as any` en `DetailsPage`.
4. Decidir si `DetailSection` usa o elimina `backgroundImg`, `backgroundAlt`, `layout`.

Validacion:

- Abrir `/portfolio/:slug` desde proyectos y experiencia.
- Probar recurso inexistente.
- `pnpm build`.

## Prioridad 3: Reordenar Narrativa UI

Archivos objetivo:

- `src/features/HomeSection/HomeSection.tsx`
- `src/pages/HomePage/HomePage.tsx`
- `src/pages/PortfolioPage/PortfolioPage.tsx`
- `src/pages/DetailsPage/DetailsPage.tsx`

Tareas:

1. Crear `PageHeader` compacto para paginas internas.
2. Reservar el hero grande solo para home.
3. En home, agregar CTA primario claro: `Ver proyectos` o `Contactar`.
4. Reducir proyectos destacados a maximo 3.
5. Hacer que `PortfolioPage` empiece con intro compacta y no con hero pesado.

Validacion manual:

- En desktop, el primer viewport debe explicar que vende Gustavo.
- En mobile, CTA debe aparecer sin scroll excesivo.
- Portfolio no debe sentirse como segunda home.

## Prioridad 4: Sistema Visual Minimo

Archivos objetivo:

- `src/styles/design-tokens.css`
- `src/styles/colors.css`
- CSS de pages/features/components.

Tareas:

1. Definir tokens unicos de color, spacing, radius, shadow y typography.
2. Deprecar o fusionar `colors.css`.
3. Quitar hex repetidos comunes como `#ff9800`, `#101010`, `#333`.
4. Reemplazar estilos inline por clases.

Validacion:

- Cambiar un color principal debe impactar consistentemente.
- No debe romper contraste en fondos oscuros.

## Prioridad 5: SEO y Contenido

Archivos objetivo:

- `src/components/SEOHead.tsx`
- `src/pages/*`
- `public/sitemap.xml`
- `public/robots.txt`

Tareas:

1. Revisar dominio canonical: actualmente default `https://plynte.com`.
2. Usar URLs canonicas por pagina.
3. Revisar Open Graph con imagen absoluta si se requiere compartir bien.
4. Evaluar prerender solo si SEO real importa mas que simplicidad.

Validacion:

- Inspeccionar HTML generado.
- Lighthouse SEO.

## Prompt Operativo Para Agente

Actua como agente senior frontend React/TypeScript. Trabaja sobre este portfolio personal en Vite. Tu prioridad es mejorar claridad para reclutadores, accesibilidad, performance y mantenibilidad con cambios pequenos. Lee `docs/audit/UI_UX_AUDIT.md` y `docs/audit/CODE_SMELLS_AND_BUGS.md` antes de tocar codigo. No hagas migraciones de framework. No toques `.env`. Implementa un lote pequeno, ejecuta `pnpm lint` y `pnpm build`, y reporta archivos modificados, riesgos y pruebas manuales.

## Definicion de Terminado

- Cambios pequenos y revisables.
- Sin rutas rotas.
- Build exitoso.
- Lint sin errores nuevos.
- UI sigue funcionando en desktop y mobile.
- Documentar cualquier decision no obvia.
