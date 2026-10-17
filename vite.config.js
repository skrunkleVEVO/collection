import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/
// Set this to '/<your-repo-name>/'. If the repo is named <user>.github.io, use '/'.
const REPO_BASE = '/collection/';

export default defineConfig({
  plugins: [react()],
  base: REPO_BASE,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
});
