import type { ComponentType } from "react";
import type { RouteRecord } from "vite-react-ssg";
import { MainLayout } from "../layouts/MainLayout";
import { cvData } from "../data/cvData";
import { generateSlug } from "../utils/slug";

/**
 * Adapts a default-exported page module to react-router's `lazy` contract
 * (which expects a named `Component` export) without editing each page file.
 * vite-react-ssg awaits this during static generation, so the real page content
 * is rendered into the static HTML instead of a Suspense fallback.
 */
const lazyDefault =
  (loader: () => Promise<{ default: ComponentType }>) => async () => ({
    Component: (await loader()).default,
  });

// Single source of truth for the prerendered /portfolio/:slug pages.
const portfolioSlugs = [
  ...cvData.projects.map((project) => generateSlug(project.title)),
  ...cvData.experience.map((experience) => generateSlug(experience.role)),
];

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <MainLayout />,
    entry: "src/layouts/MainLayout.tsx",
    children: [
      {
        index: true,
        lazy: lazyDefault(() => import("../pages/HomePage/HomePage")),
      },
      {
        path: "about",
        lazy: lazyDefault(() => import("../pages/AboutPage/AboutPage")),
      },
      {
        path: "portfolio",
        lazy: lazyDefault(() => import("../pages/PortfolioPage/PortfolioPage")),
      },
      {
        path: "portfolio/:slug",
        lazy: lazyDefault(() => import("../pages/DetailsPage/DetailsPage")),
        getStaticPaths: () => portfolioSlugs.map((slug) => `portfolio/${slug}`),
      },
      {
        path: "*",
        lazy: lazyDefault(() => import("../pages/NotFoundPage/NotFoundPage")),
      },
    ],
  },
];

export default routes;
