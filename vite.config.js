import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/
// Set this to '/<your-repo-name>/'. If the repo is named <user>.github.io, use '/'.
const REPO_BASE = '/portfolio/';

export default defineConfig({
  plugins: [react()],
  base: REPO_BASE,
});
