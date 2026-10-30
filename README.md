# Portfolio

Personal portfolio built with React, Vite, Tailwind CSS and Framer Motion, deployed to GitHub Pages at `/collection/`.

## Editing content

| What | Where |
| --- | --- |
| Projects and the academic brief | `src/data/projects.js` |
| Hero copy | `src/components/Hero.jsx` |
| Colour and type tokens | `src/index.css`, `tailwind.config.js` |
| Project screenshots | `public/images/previews/` |

`npm run capture` re-shoots the GarmentDB preview with the installed Chrome. The Triaj images are `assets/shot-*.png` from its live site, and the SomeFolio image is a saved library screenshot.

## Local development

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```

This builds the site and publishes `dist/` to the `gh-pages` branch. `REPO_BASE` in `vite.config.js` has to match the repository name.
