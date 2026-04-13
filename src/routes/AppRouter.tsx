import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { lazy, Suspense } from "react";
import Loader from "../components/UI/Loader/Loader";


const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../pages/About/About"));
const Details = lazy(() => import("../pages/Details/Details"));
const PortfolioPage = lazy(() => import("../pages/Portfolio/Portfolio"));
const Page404 = lazy(() => import("../pages/Page404/Page404"));

/**
 * Refactor: Implementación de Route Grouping para evitar repetición de Layouts.
 * Esto permite que el MainLayout actúe como un wrapper global para las rutas hijas.
 */

//<Suspense fallback = {<div style={{ display:"flex", alignItems:"center", justifyContent:"center" ,width:"100dvw", height: "100dvh",fontSize: "10rem", color:"white", background:"black" }}>Cargando...</div>}>//<Suspense fallback = {<div style={{ display:"flex", alignItems:"center", justifyContent:"center" ,width:"100dvw", height: "100dvh",fontSize: "10rem", color:"white", background:"black" }}>Cargando...</div>}>

const AppRouter = () => (
    <BrowserRouter>
        <Suspense fallback={<Loader message="Cargando..." />}>
            <Routes>
                {/* Definición de Rutas Protegidas/Estructurales bajo MainLayout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/detail" element={<Details />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                </Route>

                {/* Ruta para 404 o rutas que no requieran el MainLayout (ej. Login) */}
                <Route element={<MainLayout/>}>
                    <Route path="*"  element={<Page404></Page404>}/>
                </Route>
            </Routes>
        </Suspense>
    </BrowserRouter>
);

export default AppRouter;