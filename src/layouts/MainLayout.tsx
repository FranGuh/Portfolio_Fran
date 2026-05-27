import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar/navbar";
import { LanguageProvider } from "../contexts/LanguageContext";

/**
 * Refactor: De Pattern "Children" a "Outlet Pattern".
 * El Layout ahora actúa como un Wrapper estructural. 
 * No necesita props de children, ya que gestiona el renderizado de rutas hijas vía Outlet.
 */
export const MainLayout = () => {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        {/* El Outlet es el placeholder donde se renderizarán las rutas hijas definidas en AppRouter */}
        <Outlet />
      </main>
    </LanguageProvider>
  );
};
