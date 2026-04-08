import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Page404 from "../pages/Page404/Page404";
import { MainLayout } from "../layouts/MainLayout";
import About from "../pages/About/About";
import Details from "../pages/Details/Details";
import PortfolioPage from "../pages/Portfolio/Portfolio";

/**
 * Refactor: Implementación de Route Grouping para evitar repetición de Layouts.
 * Esto permite que el MainLayout actúe como un wrapper global para las rutas hijas.
 */
const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            {/* Definición de Rutas Protegidas/Estructurales bajo MainLayout */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/detail" element={<Details />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
            </Route>

            {/* Ruta para 404 o rutas que no requieran el MainLayout (ej. Login) */}
            <Route path="*" element={<Page404 />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;