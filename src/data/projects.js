const GITHUB_USER = 'https://github.com/skrunkleVEVO';
const preview = (file) => `${import.meta.env.BASE_URL}images/previews/${file}`;

export const GITHUB = GITHUB_USER;

// `glow` is sampled from each app's own interface.
export const PROJECTS = [
  {
    id: 'auraflow',
    title: 'AuraFlow',
    category: 'Mobile / Android App',
    tech: ['Kotlin', 'Accessibility Service', 'Android SDK'],
    description:
      'Android application designed to block short-form video feed addiction loops while maintaining full access to the rest of the application ecosystem.',
    detail:
      'No root, no VPN and no network access. It recognises feeds from resource view IDs rather than on-screen text, so it works in any language.',
    links: [{ label: 'GitHub', href: `${GITHUB_USER}/AuraFLow`, icon: 'github' }],
    glow: '45 212 191',
    thumb: null,
  },
  {
    id: 'somefolio',
    title: 'SomeFolio',
    category: 'Media Hub / PWA',
    tech: ['React', 'Vite', 'Tailwind CSS', 'PWA', 'Firebase'],
    description:
      'An offline-first personal library tracker for managing and organizing anime, manga, games, film, and books.',
    detail: 'Live search across AniList, Open Library, TVmaze and Wikipedia, with no API keys required.',
    liveUrl: 'https://skrunklevevo.github.io/SomeFolio/',
    links: [
      { label: 'Live site', href: 'https://skrunklevevo.github.io/SomeFolio/', icon: 'external', primary: true },
      { label: 'GitHub', href: `${GITHUB_USER}/SomeFolio`, icon: 'github' },
    ],
    glow: '217 70 239',
    image: { src: preview('somefolio-library.png'), width: 762, height: 549, alt: 'SomeFolio library showing an anime shelf with vibe filters and progress on each title' },
    thumb: preview('somefolio-library.png'),
  },
  {
    id: 'triaj',
    title: 'Triaj',
    category: 'Web App / Tool',
    tech: ['JavaScript', 'PWA', 'Firebase', 'Browser extension'],
    description:
      'Fast, interactive triage and prioritization interface built for streamlined task management and focus workflows.',
    detail: 'Pulls coursework in from Canvas, plans study blocks around classes and runs a focus timer, with a companion browser extension.',
    liveUrl: 'https://skrunklevevo.github.io/triaj/',
    links: [
      { label: 'Live site', href: 'https://skrunklevevo.github.io/triaj/', icon: 'external', primary: true },
      { label: 'GitHub', href: `${GITHUB_USER}/triaj`, icon: 'github' },
    ],
    glow: '96 124 214',
    image: { src: preview('triaj-shot-desktop.png'), width: 1280, height: 800, alt: 'Triaj dashboard with the next task, ranked top picks and the coming week' },
    phone: { src: preview('triaj-shot-phone.png'), width: 390, height: 844, alt: 'Triaj on a phone showing free time and the next task' },
    thumb: preview('triaj-shot-desktop.png'),
  },
  {
    id: 'garmentdb',
    title: 'GarmentDB',
    category: 'Web App / Closet Manager',
    tech: ['React', 'Tailwind CSS', 'Firebase'],
    description:
      'Digital closet catalog and outfit combination manager for categorizing wardrobe pieces, tagging styles, and archiving looks.',
    detail: 'Saved on the device with optional cloud sync, and it reads live local weather when building outfits. The closet in this screenshot is sample data.',
    liveUrl: 'https://skrunklevevo.github.io/garmentdb/',
    links: [
      { label: 'Live site', href: 'https://skrunklevevo.github.io/garmentdb/', icon: 'external', primary: true },
      { label: 'GitHub', href: `${GITHUB_USER}/garmentdb`, icon: 'github' },
    ],
    glow: '16 185 129',
    image: { src: preview('garmentdb-phone.jpg'), width: 780, height: 1688, alt: 'GarmentDB closet inventory on a phone, filled with a sample wardrobe' },
    thumb: preview('garmentdb-phone.jpg'),
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
  category: 'Academic Engineering Design',
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
