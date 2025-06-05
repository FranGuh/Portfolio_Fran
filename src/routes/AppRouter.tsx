import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Page404 from "../pages/Page404/Page404";
import { MainLayout } from "../layouts/MainLayout";
import About from "../pages/About/About";

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/about" element={<MainLayout><About /></MainLayout>} />
            <Route path="*" element={<MainLayout><Page404 /></MainLayout>} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;