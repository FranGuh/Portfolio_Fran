import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { lazy, Suspense } from "react";
import Loader from "../components/UI/Loader/Loader";
import ScrollToTop from "../components/UI/ScrollToTop/ScrollToTop";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));
const DetailsPage = lazy(() => import("../pages/DetailsPage/DetailsPage"));
const PortfolioPage = lazy(() => import("../pages/PortfolioPage/PortfolioPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const AppRouter = () => (
    <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Loader message="Cargando..." />}>
            <Routes>
                {/* Definición de Rutas Protegidas/Estructurales bajo MainLayout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/portfolio/:slug" element={<DetailsPage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                </Route>

                {/* Ruta para 404 o rutas que no requieran el MainLayout (ej. Login) */}
                <Route element={<MainLayout/>}>
                    <Route path="*"  element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Suspense>
    </BrowserRouter>
);

export default AppRouter;