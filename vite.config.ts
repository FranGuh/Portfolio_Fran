import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { portfolioJsonLd } from './src/data/structuredData'

// Injects the site-wide JSON-LD @graph (generated from cvData) into the head of
// the built index.html, which vite-react-ssg then reuses as the template for
// every prerendered page. Keeps structured data in one route-invariant place
// and sourced from a single source of truth (audit GEO-2).
const structuredData = () => ({
  name: 'portfolio-structured-data',
  transformIndexHtml: () => [
    {
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      children: portfolioJsonLd(),
      injectTo: 'head' as const,
    },
  ],
})

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), structuredData()],
  build: {
    // The SSR/SSG pass externalizes React, so manualChunks must only run for
    // the client build (audit PERF-1: isolate the stable React/runtime vendor
    // chunk so app-shell changes don't bust its long-term cache).
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            },
          },
        },
  },
}))
