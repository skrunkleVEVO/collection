# Portfolio

A personal and academic portfolio built with React, Vite and Tailwind CSS, deployed to GitHub Pages.

## Editing content

| What | Where |
| --- | --- |
| Projects | `src/data/projects.json` |
| Name, bio, skills, social links | `src/data/profile.json` |
| Project images | `public/images/` (referenced as `images/<file>`) |
| PDF reports | `public/reports/` (referenced as `reports/<file>`) |

Each project accepts the following fields: `id`, `title`, `subtitle`, `category` (`Software & Apps`, `Games & Mods` or `Academic & Engineering`), `status`, `year`, `featured`, `eportfolio`, `techStack`, `summary`, `description`, `problem`, `solution`, `features`, `reflections`, `image`, `githubUrl`, `liveUrl` and `reportUrl`.

- Leave a URL as `""` to hide its button.
- If an image is missing, the card falls back to a gradient banner.
- `"eportfolio": true` includes the project in the University ePortfolio view.
- `"featured": true` sorts the project to the top.

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
