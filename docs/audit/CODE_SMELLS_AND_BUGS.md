# Smells, Bugs y Riesgos Detectados

## Criticos

### Dependencia de tipos incorrecta

- Archivo: `package.json`
- Problema: `@types/react-router-dom` es v5 mientras `react-router-dom` es v6. React Router v6 ya incluye tipos.
- Impacto: conflictos de tipos, autocompletado incorrecto y errores falsos en TS.
- Solucion: eliminar `@types/react-router-dom`.

### Semantica HTML con `<main>` anidado

- Archivos: `src/App.tsx`, `src/layouts/MainLayout.tsx`
- Problema: `App` renderiza `<main>` y `MainLayout` renderiza otro `<main>`.
- Impacto: mala semantica para accesibilidad y SEO tecnico.
- Solucion: dejar un solo `<main>` en el layout.

### CSS invalido

- Archivo: `src/pages/PortfolioPage/PortfolioPage.css`
- Problema: `color: var();`.
- Impacto: regla ignorada por el navegador y senal de deuda de CSS.
- Solucion: usar `color: var(--color-text-light);` o eliminar la regla.

## Altos

### `any` en DetailsPage

- Archivo: `src/pages/DetailsPage/DetailsPage.tsx`
- Problema: `const targetData = (project || experience) as any`.
- Impacto: oculta errores reales entre `Project` y `Experience`.
- Solucion: usar union discriminada local o helpers `getPortfolioTarget`.

### Props no usadas

- Archivo: `src/features/DetailSection/DetailSection.tsx`
- Problema: `backgroundImg`, `backgroundAlt` y `layout` se declaran pero no se usan.
- Impacto: API enganosa, deuda de mantenimiento y expectativas rotas desde `DetailsPage`.
- Solucion: implementar o eliminar. Preferencia: eliminar si no hay diseno activo que lo necesite.

### Coupling entre paginas

- Archivos: `src/pages/HomePage/HomePage.tsx`, `src/pages/DetailsPage/DetailsPage.tsx`
- Problema: `HomePage` importa `generateSlug` desde `DetailsPage`.
- Impacto: una pagina depende de otra por una utilidad comun.
- Solucion: mover a `src/utils/slug.ts`.

### Tokens CSS duplicados

- Archivos: `src/styles/colors.css`, `src/styles/design-tokens.css`, `src/styles/App.css`
- Problema: ambos archivos definen tokens similares y `--color-primary` significa cosas distintas.
- Impacto: cambios visuales impredecibles y dificil theming.
- Solucion: consolidar tokens en `design-tokens.css`.

## Medios

### Scroll state sin control de frecuencia

- Archivo: `src/pages/PortfolioPage/PortfolioPage.tsx`
- Problema: `setScrollProgress` corre en cada evento scroll.
- Impacto: renders excesivos en scroll.
- Solucion: `requestAnimationFrame`, throttle o eliminar si no aporta valor suficiente.

### Division por cero posible en progreso

- Archivo: `src/pages/PortfolioPage/PortfolioPage.tsx`
- Problema: `document.documentElement.scrollHeight - clientHeight` puede ser 0.
- Impacto: `NaN` en width.
- Solucion: si `windowHeight <= 0`, progreso 0.

### Interaccion no accesible

- Archivo: `src/components/UI/ImgContainer/ImgContainer.tsx`
- Problema: `article` clicable sin teclado ni semantica.
- Impacto: usuarios de teclado no pueden activar proyectos destacados.
- Solucion: renderizar `<a>` o `<button>`.

### Botones de scroll sin nombre accesible

- Archivo: `src/components/UI/ScrollableContainer/ScrollableContainer.tsx`
- Problema: botones solo tienen texto `<` y `>`.
- Impacto: lectores de pantalla anuncian controles pobres.
- Solucion: agregar `aria-label`.

### EmailJS sin validacion de entorno

- Archivo: `src/components/Contacto/ContactForm.tsx`
- Problema: si faltan `VITE_EMAILJS_*`, el usuario solo ve error al enviar.
- Impacto: mala UX y debugging tardio.
- Solucion: detectar configuracion ausente y deshabilitar submit con mensaje.

## Bajos

### Estilos inline

- Archivos: `src/pages/HomePage/HomePage.tsx`, `src/components/Contacto/ContactForm.tsx`
- Problema: estilos inline para spacing/tamanos.
- Impacto: rompe consistencia del sistema visual.
- Solucion: mover a CSS con tokens.

### Comentarios obsoletos

- Archivo: `src/routes/AppRouter.tsx`
- Problema: menciona rutas protegidas/login que no existen.
- Impacto: confunde a agentes y mantenedores.
- Solucion: actualizar o eliminar comentarios.

### Llaves por indice

- Archivos: `src/features/DetailSection/DetailSection.tsx`, `src/pages/PortfolioPage/PortfolioPage.tsx`
- Problema: `key={index}` en listas que podrian cambiar.
- Impacto: reconciliacion inestable si se reordenan items.
- Solucion: usar `title`, `role + company` o ids estables.

## Secretos y repositorio

- Existe `.env` en la raiz del proyecto.
- No se leyo su contenido.
- Debe verificarse que `.env` este ignorado por git y que no haya credenciales committeadas.

## Orden Recomendado de Correccion

1. Arreglar bugs seguros: CSS invalido, `<main>` anidado, tipos de router.
2. Arreglar accesibilidad rapida: `ImgContainer`, `ScrollableContainer`.
3. Extraer utilidades: `generateSlug`.
4. Tipar `DetailsPage` sin `any`.
5. Consolidar tokens CSS.
6. Replantear narrativa Home/Portfolio con componentes mas especificos.
