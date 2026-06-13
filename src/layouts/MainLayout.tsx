import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Navbar } from "./navbar/navbar";
import { LanguageProvider } from "../contexts/LanguageContext";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import ScrollToTop from "../components/UI/ScrollToTop/ScrollToTop";
import Loader from "../components/UI/Loader/Loader";

/**
 * Structural wrapper for every route (Outlet pattern).
 * - ErrorBoundary (keyed on pathname so navigation clears a previous error)
 *   wraps Suspense so a failed lazy-chunk load shows a recoverable fallback
 *   instead of blanking the SPA.
 * - Analytics / SpeedInsights live here because this layout is always mounted.
 */
export const MainLayout = () => {
  const { pathname } = useLocation();

  return (
    <LanguageProvider>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<Loader message="Cargando..." />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Analytics />
      <SpeedInsights />
    </LanguageProvider>
  );
};
