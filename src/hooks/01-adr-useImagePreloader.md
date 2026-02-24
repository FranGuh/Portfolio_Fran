# ADR: Estrategia de Precarga de Imágenes (Image Preloader)

## 1. Contexto y Problema
En la página principal del portafolio se muestran múltiples imágenes que ilustran los proyectos. Inicialmente, se utilizaba un "loader falso" basado en un `setTimeout` de 200ms. Esto presentaba dos problemas:
1.  **Falsos positivos:** El loader desaparecía antes de que las imágenes reales se descargaran, provocando que la página se viera a medio construir o sufriera saltos en el diseño (layout shifts).
2.  **Carga innecesaria en recargas:** Al volver a visitar la página, el usuario era forzado a esperar el tiempo del loader, incluso si las imágenes ya estaban en la caché de su navegador.

## 2. Decisión
Se decidió implementar un Custom Hook llamado `useImagePreloader` para manejar la carga de imágenes de forma dinámica y real. 

La estrategia consta de tres pilares:
* **Promise.all y el objeto Image:** Se crean Promesas que instancian objetos `Image` nativos de JavaScript. El loader solo desaparece cuando todas las Promesas se resuelven (las imágenes están en caché).
* **Manejo de Errores a Nivel de Imagen:** Si una imagen individual falla (Error 404), la Promesa se resuelve (`resolve(url)`) en lugar de ser rechazada (`reject`). Esto evita que un error menor congele toda la aplicación en una pantalla de carga infinita.
* **Optimización con sessionStorage:** Se guarda un flag booleano en la sesión del navegador para registrar si la carga inicial ya ocurrió. Esto evita volver a mostrar el loader durante la misma sesión de navegación, eliminando el parpadeo.

## 3. Consecuencias (Graceful Degradation)

### Positivas
* **Mejor Experiencia de Usuario (UX):** La página solo se muestra cuando el diseño está completo y listo para visualizarse.
* **Código Modular:** La lógica de carga queda aislada del componente de UI (`Home`), cumpliendo con el principio de responsabilidad única.

### Negativas / Riesgos Mitigados
* **Navegadores Estrictos:** Si el usuario tiene bloqueado el uso de `sessionStorage`, el código lanzará una excepción al intentar leer/escribir.
    * *Mitigación:* Se implementaron bloques `try...catch` alrededor de las operaciones de `sessionStorage`. En caso de fallo, la aplicación se "degrada elegantemente": simplemente ignora la caché de sesión y muestra el loader temporalmente, pero **nunca** bloquea la renderización de la página.

## 4. Flujo de Ejecución

1.  El componente consume `useImagePreloader(imagesArray, "storageKey")`.
2.  El Hook verifica `sessionStorage`:
    * Si existe "storageKey": Retorna `isLoading = false` inmediatamente. Fin del flujo.
    * Si NO existe (o falla): Retorna `isLoading = true` y continúa.
3.  El `useEffect` itera sobre el array de imágenes y dispara una Promesa por cada una.
4.  El navegador descarga las imágenes en segundo plano.
5.  Una vez finalizadas todas las descargas (con éxito o error), el `Promise.all` se resuelve.
6.  Se intenta guardar "storageKey" en `sessionStorage`.
7.  Se actualiza el estado a `setIsLoading(false)`.
8.  El componente re-renderiza, desmonta el `<Loader />` y muestra la UI final.

## 5. Ejemplo de Uso

```tsx
import { useImagePreloader } from "../../hooks/useImagePreloader";
import Loader from "../../components/UI/Loader/Loader";

// 1. Declarar el array de imágenes fuera del componente para evitar re-renderizados
const imagesToLoad = [
  "/ruta/imagen1.webp",
  "/ruta/imagen2.webp",
];

const MiComponente = () => {
  // 2. Invocar el Hook con el array y una clave única
  const loading = useImagePreloader(imagesToLoad, "miComponenteCargado");

  // 3. Renderizado condicional
  if (loading) return <Loader message="Cargando..." />;

  return (
    <div>
      {/* Contenido principal con las imágenes ya en caché */}
    </div>
  );
};