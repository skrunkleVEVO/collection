# Portfolio

Academic ePortfolio for APSC 169 and personal software showcase, built with React, Vite, Tailwind CSS and Framer Motion. Deployed to GitHub Pages at `/collection/`.

## Editing content

Everything the site says is in `src/data/portfolioData.ts`.

| What | Setting |
| --- | --- |
| Four-tab ePortfolio, or About Me and Projects only | `isSchoolMode` |
| Reflection video (YouTube or Vimeo link) | `reflectionVideoUrl` |
| Remove the Draft badges on the reflection cards | `reflection.draft` |
| Email and LinkedIn buttons | `contact` |
| Phase 4 test results and photos | `escarpment.prototypes.items` (`image`, `results`) |

`npm run capture` re-shoots the SomeFolio and GarmentDB previews at desktop and mobile sizes with the installed Chrome, using sample data. The Triaj images are `assets/shot-*.png` from its live site.

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
