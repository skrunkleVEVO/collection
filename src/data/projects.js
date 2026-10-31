const GITHUB_USER = 'https://github.com/skrunkleVEVO';
const preview = (file) => `${import.meta.env.BASE_URL}images/previews/${file}`;

export const GITHUB = GITHUB_USER;

export const PROJECTS = [
  {
    id: 'auraflow',
    title: 'AuraFlow',
    tag: 'Mobile / Android App',
    tech: ['Kotlin', 'Accessibility Service', 'Android SDK'],
    headline: 'Short-Form Video Feed Blocker',
    description:
      'Non-root Android app using Accessibility Services to detect and block addictive short-form video feeds (Reels/Shorts) at the resource view layer while keeping primary DMs and messaging functional.',
    links: [{ label: 'GitHub', href: `${GITHUB_USER}/AuraFLow`, icon: 'github' }],
  },
  {
    id: 'somefolio',
    title: 'SomeFolio',
    tag: 'Web App / PWA',
    tech: ['React', 'Vite', 'Tailwind CSS', 'PWA', 'Firebase'],
    headline: 'Offline-First Personal Media Library',
    description:
      'Unified tracking dashboard for manga, anime, games, and books featuring live multi-source API search (AniList, Open Library, TVMaze) with offline PWA storage.',
    liveUrl: 'https://skrunklevevo.github.io/SomeFolio/',
    links: [
      { label: 'Live demo', href: 'https://skrunklevevo.github.io/SomeFolio/', icon: 'external', primary: true },
      { label: 'GitHub', href: `${GITHUB_USER}/SomeFolio`, icon: 'github' },
    ],
    previews: {
      desktop: { src: preview('somefolio-desktop.jpg'), alt: 'SomeFolio on desktop: an anime shelf with cover art, ratings and progress' },
      mobile: { src: preview('somefolio-mobile.jpg'), alt: 'SomeFolio on a phone: an anime shelf with cover art, ratings and progress' },
    },
    previewNote: 'Screenshot with a sample shelf. The live app starts empty, with a short tour.',
  },
  {
    id: 'triaj',
    title: 'Triaj',
    tag: 'Web App / Productivity',
    tech: ['JavaScript', 'PWA', 'Firebase', 'Browser Extension'],
    headline: 'Canvas-Integrated Focus & Triage Planner',
    description:
      'Interactive task triage and scheduling system built to ingest university coursework from Canvas, structure focus blocks around class timetables, and execute timed study sessions.',
    liveUrl: 'https://skrunklevevo.github.io/triaj/',
    links: [
      { label: 'Live demo', href: 'https://skrunklevevo.github.io/triaj/', icon: 'external', primary: true },
      { label: 'GitHub', href: `${GITHUB_USER}/triaj`, icon: 'github' },
    ],
    previews: {
      desktop: { src: preview('triaj-shot-desktop.png'), alt: 'Triaj dashboard on desktop with the next task, ranked top picks and the coming week' },
      mobile: { src: preview('triaj-shot-phone.png'), alt: 'Triaj on a phone showing free time and the next task' },
    },
    previewNote: 'Screenshot from the Triaj site. The live link opens its landing page.',
  },
  {
    id: 'garmentdb',
    title: 'GarmentDB',
    tag: 'Web App / Closet Manager',
    tech: ['React', 'Tailwind CSS', 'Firebase'],
    headline: 'Digital Closet & Outfit Manager',
    description:
      'Digital closet catalog and outfit combination manager for categorizing wardrobe pieces, tagging styles, and archiving looks.',
    liveUrl: 'https://skrunklevevo.github.io/garmentdb/',
    links: [
      { label: 'Live demo', href: 'https://skrunklevevo.github.io/garmentdb/', icon: 'external', primary: true },
      { label: 'GitHub', href: `${GITHUB_USER}/garmentdb`, icon: 'github' },
    ],
    previews: {
      desktop: { src: preview('garmentdb-desktop.jpg'), alt: 'GarmentDB closet inventory on desktop, filled with a sample wardrobe' },
      mobile: { src: preview('garmentdb-mobile.jpg'), alt: 'GarmentDB closet inventory on a phone, filled with a sample wardrobe' },
    },
    previewNote: 'Screenshot with a sample closet. The live app starts empty.',
  },
];

const SOURCES = {
  record: {
    label: 'ScienceBlog, report on LONGi’s 35.5% tandem cell, Aug 2026',
    href: 'https://scienceblog.com/t-perovskite-silicon-tandem-35-5-efficiency-record/',
  },
  field: {
    label: 'IEEE Spectrum, encapsulated perovskite-silicon field trial, Feb 2023',
    href: 'https://spectrum.ieee.org/encapsulated-perovskite-field-trial',
  },
  lca: {
    label: 'Life cycle assessment of perovskite on silicon tandem PV modules at industrial scale',
    href: 'https://core.ac.uk/works/125933908',
  },
  leaching: {
    label: 'Sidler et al., lead leaching from rooftop perovskite modules, EES Solar, 2026',
    href: 'https://pubs.rsc.org/en/content/articlepdf/2026/el/d5el00191a',
  },
};

export const ENGINEERING = {
  id: 'perovskite',
  title: 'Sustainable Engineering & Design Project',
  tag: 'Academic Engineering Design',
  tech: ['Sustainable Design', 'Perovskite-Silicon Photovoltaics', 'Engineering Analysis'],
  description:
    'Engineering design analysis exploring long-term stability, environmental efficiency, and design trade-offs of commercial perovskite-silicon tandem solar cell integration.',
  question:
    'A tandem cell stacks a perovskite layer on silicon to use more of the spectrum. The design question is whether that efficiency survives the move from a certified lab cell to a module that has to last decades outdoors.',
  constraints: [
    { title: 'Long-term stability', text: 'A module has to hold its output for decades of heat, humidity and UV, and field tests point to the perovskite layer as the main source of degradation.' },
    { title: 'Lab-to-module scale', text: 'Record cells are small research devices. Efficiency falls as area grows, so a design has to be judged on module figures.' },
    { title: 'Lead containment', text: 'Most leading perovskite compositions contain lead, so encapsulation has to keep it contained across the module’s life, including damage and disposal.' },
    { title: 'Silicon compatibility', text: 'The perovskite step has to fit a silicon production line, which ties the cost case to manufacturing the industry already runs.' },
  ],
  metrics: [
    { value: '35.5%', label: 'Certified tandem research cell (ESTI, 2026)', source: SOURCES.record },
    { value: '31.4%', label: 'Best reported tandem module in the same announcement', source: SOURCES.record },
    { value: '~29%', label: 'Practical ceiling for single-junction crystalline silicon', source: SOURCES.record },
    { value: '>80%', label: 'Starting output kept after a year outdoors on the Red Sea coast, from a 21.6% cell', source: SOURCES.field },
    { value: '~0.01%', label: 'Share of human-toxicity impact from lead in one LCA of a 2 m² module', source: SOURCES.lca },
  ],
  tradeoffs: [
    { gain: 'About 6.5 points above silicon’s practical ceiling at cell level', cost: 'About 4 of those points are lost going from the record cell to the best module' },
    { gain: 'More energy from the same panel area, which can reduce material and land per kilowatt-hour', cost: 'That benefit only holds if the module lasts, and durability over decades is still an open question' },
    { gain: 'Lead’s share of lifecycle toxicity looks small, and rooftop tests found low leaching', cost: 'Both results assume encapsulation holds, and the field results cited here run from nine months to about a year' },
  ],
  sources: Object.values(SOURCES),
  sourceNote: 'Figures are published results used to frame the analysis, not measurements from this project.',
};
