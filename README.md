# Portfolio

A personal and academic portfolio built with React, Vite and Tailwind CSS, deployed to GitHub Pages.

## Editing content

| What | Where |
| --- | --- |
| Projects | `src/data/projects.json` |
| Name, bio, skills, social links | `src/data/profile.json` |
| Project images | `public/images/` (referenced as `images/<file>`) |
| PDF reports | `public/reports/` (referenced as `reports/<file>`) |

Each project accepts: `id`, `code` (e.g. `SYS_01`), `title`, `subtitle`, `category`, `status` (`Active` gets the live indicator), `year`, `modes` (`["personal"]`, `["university"]` or both), `techStack`, `summary`, `problem`, `solution`, `architecture` (list of `{ layer, detail }`), `features`, `reflections`, optional `brief` (list of `"Head: text"` lines), `githubUrl`, `liveUrl` and `reportUrl`.

- Leave a URL as `""` to hide its button. A project with no links shows `SRC: PRIVATE`.
- Report PDFs go in `public/reports/`. Until the file exists the card shows `PDF: PENDING`.
- Bento placement per view lives in `LAYOUTS` in `src/components/BentoGrid.jsx`. Projects not listed there are appended as compact cells.
- `?view=eportfolio` links straight to the University ePortfolio view.

## Local development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Set `REPO_BASE` in `vite.config.js` to `'/<repo-name>/'`. If the repo is named `<user>.github.io`, set it to `'/'`.
2. Run:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<user>/<repo-name>.git
git push -u origin main
npm run deploy
```

3. On GitHub, go to **Settings → Pages**, set **Source: Deploy from a branch** and select the **`gh-pages`** branch, folder **`/ (root)`**.
4. The site will be live at `https://<user>.github.io/<repo-name>/` within a minute or two.

To publish later changes, run `npm run deploy` again.
