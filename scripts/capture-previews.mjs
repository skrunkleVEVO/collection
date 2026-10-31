// Screenshots live projects into public/images/previews. Run with `npm run capture`.
// Uses the installed Chrome (playwright-core downloads no browser).
// SomeFolio and GarmentDB are empty on a first visit, so their captures seed sample data into
// this throwaway browser's localStorage, using the same keys the apps themselves write.
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright-core';

const OUT = 'public/images/previews';

const svg = (body, fill) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240"><rect width="200" height="240" fill="#ececea"/><g fill="${fill}">${body}</g></svg>`,
  )}`;

const SHAPES = {
  top: '<path d="M70 50 30 76l14 34 20-10v94h72v-94l20 10 14-34-40-26c-6 14-54 14-60 0Z"/>',
  layer: '<path d="M72 40 42 56 18 176l30 6 14-72v94h76v-94l14 72 30-6-24-120-30-16c-8 14-48 14-56 0Z"/>',
  bottom: '<path d="M64 36h72l10 170h-36l-10-104-10 104H54Z"/>',
  shoe: '<path d="M38 110c20 8 36 2 48-14l62 46c14 8 20 20 18 34H38Z"/>',
};

const SAMPLE_CLOSET = [
  ['Boxy heavyweight tee', 'Top', 'Boxy', 'Black', 'top', '#1b1b1d'],
  ['Washed hoodie', 'Top', 'Oversized', 'Sage', 'layer', '#9cae8a'],
  ['Overshirt', 'Shirt', 'Regular', 'Olive', 'layer', '#66683a'],
  ['Shell jacket', 'Outerwear', 'Regular', 'Navy', 'layer', '#1d2747'],
  ['Wide-leg denim', 'Bottom', 'Wide', 'Navy', 'bottom', '#2f4468'],
  ['Straight chinos', 'Bottom', 'Straight', 'Khaki', 'bottom', '#b9a57e'],
  ['Leather boots', 'Footwear', '', 'Brown', 'shoe', '#6a4529'],
  ['Canvas sneakers', 'Footwear', '', 'White', 'shoe', '#c9c9c4'],
].map(([name, category, fit, color, shape, fill], i) => ({
  id: `sample-${i}`,
  name,
  category,
  fit,
  colors: [color],
  designs: [],
  status: i === 1 ? 'laundry' : 'active',
  notes: '',
  createdAt: 2000 - i,
  updatedAt: 2000 - i,
  photo: svg(SHAPES[shape], fill),
}));

function seedGarmentDb(closet) {
  localStorage.setItem('digital-closet:items', JSON.stringify(closet.map(({ photo, ...item }) => item)));
  for (const { id, photo } of closet) localStorage.setItem(`digital-closet:photo:${id}`, photo);
}

// Real titles and covers from AniList, the same source SomeFolio's own search uses.
const SHELF = ['Code Geass', 'Neon Genesis Evangelion', "JoJo's Bizarre Adventure", 'Cyberpunk: Edgerunners', 'ERASED', 'Re:ZERO', 'Mob Psycho 100', 'Steins;Gate', 'Vinland Saga', 'Frieren', 'Monster', 'Death Note'];

async function fetchShelf() {
  const entries = {};
  for (const [i, search] of SHELF.entries()) {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        query: 'query($s:String){Media(search:$s,type:ANIME){title{english romaji} episodes coverImage{extraLarge}}}',
        variables: { s: search },
      }),
    });
    const { data } = await res.json();
    const media = data.Media;
    const id = `sample-${i}`;
    entries[id] = {
      id,
      title: media.title.english || media.title.romaji,
      category: 'anime',
      status: i % 4 === 1 ? 'watching' : 'completed',
      rating: 7 + (i % 4),
      coverUrl: media.coverImage.extraLarge,
      updatedAt: 2000 - i,
      addedAt: 2000 - i,
      metadata: { episodes: media.episodes, progress: i % 4 === 1 ? Math.ceil((media.episodes || 2) / 2) : media.episodes },
    };
  }
  return { version: 1, entries, vibes: ['Cyberpunk', 'Dark Fantasy', 'Mind-Bender', 'Cozy', 'Mecha', 'Thriller'], vibesUpdatedAt: 1, prefs: {}, prefsUpdatedAt: 0 };
}

function seedSomeFolio(library) {
  localStorage.setItem('somefolio:library:v1', JSON.stringify(library));
  localStorage.setItem('somefolio:tour-seen:v1', '1');
}

const DESKTOP = { suffix: 'desktop', size: [1280, 720], scale: 1.5 };
const MOBILE = { suffix: 'mobile', size: [390, 844], scale: 2 };

const APPS = [
  { name: 'somefolio', url: 'https://skrunklevevo.github.io/SomeFolio/', seed: seedSomeFolio, arg: await fetchShelf() },
  { name: 'garmentdb', url: 'https://skrunklevevo.github.io/garmentdb/', seed: seedGarmentDb, arg: SAMPLE_CLOSET },
];

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });

for (const { name, url, seed, arg } of APPS) {
  for (const { suffix, size: [width, height], scale } of [DESKTOP, MOBILE]) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: scale });
    await context.addInitScript(seed, arg);
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
    await page.waitForTimeout(7000); // long enough for the "ready offline" toast to clear
    await page.screenshot({ path: `${OUT}/${name}-${suffix}.jpg`, type: 'jpeg', quality: 84 });
    console.log(name, suffix);
    await context.close();
  }
}

await browser.close();
