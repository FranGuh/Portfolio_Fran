import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
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
