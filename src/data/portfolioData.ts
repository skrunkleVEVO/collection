/// <reference types="vite/client" />

/**
 * Everything the site says lives in this file.
 *
 * true:  About Me, APSC 169 Project, Personal Software, Reflection
 * false: About Me and a single Projects page, with Reflection hidden
 */
export const isSchoolMode: boolean = true;

/** A YouTube or Vimeo link. While empty, the Reflection page shows a placeholder. */
export const reflectionVideoUrl: string = '';

const preview = (file: string) => `${import.meta.env.BASE_URL}images/previews/${file}`;

const GITHUB_URL = 'https://github.com/skrunkleVEVO';

export const contact = {
  github: GITHUB_URL,
  githubLabel: 'github.com/skrunkleVEVO',
  /** Adds an Email button to the About page and footer once filled in. */
  email: '',
  /** Adds a LinkedIn button to the About page and footer once filled in. */
  linkedin: '',
};

export type TabId = 'about' | 'apsc-169' | 'software' | 'reflection' | 'projects';

export const tabs: { id: TabId; label: string }[] = isSchoolMode
  ? [
      { id: 'about', label: 'About Me' },
      { id: 'apsc-169', label: 'APSC 169 Project' },
      { id: 'software', label: 'Personal Software' },
      { id: 'reflection', label: 'Reflection' },
    ]
  : [
      { id: 'about', label: 'About Me' },
      { id: 'projects', label: 'Projects' },
    ];

export const about = {
  title: 'I build software and systems to solve problems I actually run into.',
  subtitle: 'First-year engineering student at UBC Okanagan. Building web tools, mobile software, and practical engineering designs.',
  sections: [
    {
      title: 'Why engineering',
      paragraphs: [
        'I chose engineering because I want to work on both digital software and the physical infrastructure people depend on. Code can change quickly and physical systems can’t, and I want to learn to design well under both sets of constraints.',
        'My APSC 169 project is the physical side of that work: a safer, accessible route across the steepest part of the UBCO campus.',
      ],
    },
    {
      title: 'Why I build my own tools',
      paragraphs: [
        'Most of my software starts with a bottleneck in my own day. AuraFlow is about focus, Triaj is about planning coursework, and SomeFolio and GarmentDB are about keeping things organized. When a tool doesn’t exist in the form I need, I build it and then use it.',
      ],
    },
    {
      title: 'Where I’m heading',
      paragraphs: ['I want a career where software and physical infrastructure systems meet, using each to make the other work better for the people who rely on it.'],
    },
  ],
  skills: ['React', 'Vite', 'Tailwind', 'Kotlin', 'Android SDK', 'Firebase', 'Git'],
};

export type ProjectLink = { label: string; href: string; icon: 'github' | 'external'; primary?: boolean };

export type Project = {
  id: string;
  title: string;
  tag: string;
  tech: string[];
  description: string;
  links: ProjectLink[];
  liveUrl?: string;
  previews?: Record<'desktop' | 'mobile', { src: string; alt: string }>;
  previewNote?: string;
};

export const projects: Project[] = [
  {
    id: 'auraflow',
    title: 'AuraFlow',
    tag: 'Mobile / Android App',
    tech: ['Kotlin', 'Accessibility Service', 'Android SDK'],
    description:
      'Non-root Android app using Accessibility Services to detect and block addictive short-form video feed loops at the resource view layer while keeping primary messaging functional.',
    links: [{ label: 'GitHub', href: `${GITHUB_URL}/AuraFLow`, icon: 'github' }],
  },
  {
    id: 'somefolio',
    title: 'SomeFolio',
    tag: 'Web App / PWA',
    tech: ['React', 'Vite', 'Tailwind CSS', 'PWA', 'Firebase'],
    description:
      'Offline-first personal library tracker for anime, manga, games, and books featuring multi-source API integration (AniList, Open Library, TVMaze).',
    liveUrl: 'https://skrunklevevo.github.io/SomeFolio/',
    links: [
      { label: 'Live demo', href: 'https://skrunklevevo.github.io/SomeFolio/', icon: 'external', primary: true },
      { label: 'GitHub', href: `${GITHUB_URL}/SomeFolio`, icon: 'github' },
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
    tag: 'Web App / Tool',
    tech: ['JavaScript', 'PWA', 'Firebase', 'Browser Extension'],
    description:
      'Canvas-integrated task triage and scheduling planner that pulls university coursework, structures focus blocks around class schedules, and runs timed focus sessions.',
    liveUrl: 'https://skrunklevevo.github.io/triaj/',
    links: [
      { label: 'Live demo', href: 'https://skrunklevevo.github.io/triaj/', icon: 'external', primary: true },
      { label: 'GitHub', href: `${GITHUB_URL}/triaj`, icon: 'github' },
    ],
    previews: {
      desktop: { src: preview('triaj-shot-desktop.png'), alt: 'Triaj dashboard on desktop with the next task, ranked top picks and the coming week' },
      mobile: { src: preview('triaj-shot-phone.png'), alt: 'Triaj on a phone showing free time and the next task' },
    },
    previewNote: 'Screenshot from the Triaj site. Running it live opens its landing page.',
  },
  {
    id: 'garmentdb',
    title: 'GarmentDB',
    tag: 'Web App / Closet Manager',
    tech: ['React', 'Tailwind CSS', 'Firebase'],
    description:
      'Digital closet catalog and outfit combination manager for categorizing wardrobe pieces, tagging styles, weather-based assembly, and archiving looks.',
    liveUrl: 'https://skrunklevevo.github.io/garmentdb/',
    links: [
      { label: 'Live demo', href: 'https://skrunklevevo.github.io/garmentdb/', icon: 'external', primary: true },
      { label: 'GitHub', href: `${GITHUB_URL}/garmentdb`, icon: 'github' },
    ],
    previews: {
      desktop: { src: preview('garmentdb-desktop.jpg'), alt: 'GarmentDB closet inventory on desktop, filled with a sample wardrobe' },
      mobile: { src: preview('garmentdb-mobile.jpg'), alt: 'GarmentDB closet inventory on a phone, filled with a sample wardrobe' },
    },
    previewNote: 'Screenshot with a sample closet. The live app starts empty.',
  },
];

export const software = {
  title: 'Personal software',
  lede: 'Tools I built for bottlenecks in my own focus, productivity and organization.',
};

export const escarpment = {
  course: 'APSC 169',
  title: 'Campus Escarpment Mobility Project',
  lede: 'An APSC 169 design project: getting people safely up and down the steepest part of the UBCO campus, in every season.',
  overview: {
    plain:
      'A steep grade separates upper campus housing from the classrooms and buses below. In winter it can turn icy, and in places there is no sidewalk, so people end up walking in the road.',
    points: [
      {
        title: 'The grade',
        text: 'The McKinley Escarpment reaches slopes of up to 30%, separating upper campus housing (Nicola, Nechako, Purcell and Skeena) from the lower academic core and transit exchange.',
      },
      {
        title: 'The accessibility barrier',
        text: 'A slope that steep is a severe barrier for anyone with limited mobility, and the most direct way between home and class runs straight across it.',
      },
      {
        title: 'The winter hazard',
        text: 'Icy conditions add to the risk, and missing sidewalks force pedestrians into live traffic zones, such as International Mews near Nicola Residence.',
      },
    ],
  },
  exploration: {
    plain: 'Before proposing anything, we studied the land and checked what the university has already committed to.',
    points: [
      { title: 'Campus topography analysis', text: 'Mapping the grade to see where the route between housing, classes and transit is hardest.' },
      { title: 'UBCO Transportation Plan 2021–2040', text: 'Aligning the project with the campus’s long-term transportation direction.' },
      { title: 'Climate Action Plan 2030 (CAP 2030)', text: 'Prioritizing pedestrian-first pathways over vehicle trips.' },
    ],
  },
  stakeholders: {
    plain: 'We worked out whose needs carry the most weight, then turned those needs into requirements any design has to meet.',
    salience: [
      { title: 'Power', text: 'Can this group influence whether and how the project happens?' },
      { title: 'Urgency', text: 'How time-sensitive and pressing is this group’s need?' },
      { title: 'Legitimacy', text: 'How valid and appropriate is this group’s claim on the project?' },
    ],
    requirements: [
      { title: 'Campus Mobility', text: 'Connect upper housing with the academic core and transit exchange.' },
      { title: 'Universal Accessibility', text: 'Be usable by everyone, regardless of mobility.' },
      { title: 'Weather Resilience', text: 'Stay safe and usable through icy winter conditions.' },
      { title: 'Feasibility', text: 'Be realistic to build and maintain on campus.' },
      { title: 'Capacity / Safety', text: 'Carry pedestrian traffic while keeping people out of live traffic.' },
    ],
  },
  ideation: {
    plain: 'We generated a wide range of ideas, narrowed them down, then scored the finalists against weighted criteria so the choice could be checked rather than argued.',
    longlist: 24,
    shortlist: 8,
    criteria: [
      { name: 'Safety', weight: 25 },
      { name: 'Accessibility', weight: 20 },
      { name: 'Feasibility', weight: 20 },
      { name: 'Weather Resilience', weight: 15 },
      { name: 'Travel Efficiency', weight: 10 },
      { name: 'Sustainability', weight: 10 },
    ],
    contribution: ['Formulating the criteria weights', 'The mathematical scoring', 'The sensitivity analysis'],
  },
  prototypes: {
    plain: 'Three prototypes test the drainage, the walking surface and the full pathway. Results and photos will be added here when testing is complete.',
    badge: '[Phase 4 — Testing in Progress]',
    items: [
      {
        title: 'Prototype 1',
        subject: 'Drainage',
        text: 'High-capacity trench drain and catch basin modeling.',
        specs: [] as { label: string; value: string }[],
        image: '',
        results: '',
      },
      {
        title: 'Prototype 2',
        subject: 'Grip & Surface Testing',
        text: 'Textured brushed aggregate vs. friction overlays in icy conditions.',
        specs: [] as { label: string; value: string }[],
        image: '',
        results: '',
      },
      {
        title: 'Prototype 3',
        subject: 'Integrated Switchback Pathway',
        text: 'The full pathway, combining slope, handrails, rest landings and snow melting.',
        specs: [
          { label: 'Span', value: '30–40 m' },
          { label: 'Slope', value: '5% switchback' },
          { label: 'Handrails', value: 'Continuous, dual-height' },
          { label: 'Rest landings', value: '1.5 m × 1.5 m, every 9 m' },
          { label: 'Snow melting', value: 'Hydronic loops' },
        ],
        image: '',
        results: '',
      },
    ],
  },
};

/** Set `draft` to false once the cards below are rewritten in your own words. It removes the Draft badges. */
export const reflection = {
  title: 'Reflection',
  lede: 'What this project taught me, why it matters, and what I’ll do with it next.',
  videoPlaceholder: '[Reflection Video Placeholder]',
  draft: true,
  cards: [
    {
      number: '3.1',
      title: 'What?',
      text: 'Each phase changed what we thought the problem was. Topography and policy research showed that this was more than a steep hill: it was a connection between housing, classes and transit. The stakeholder analysis then changed the order of priorities, because ranking groups by power, urgency and legitimacy made it clear whose needs had to shape the requirements first.',
    },
    {
      number: '3.2',
      title: 'So What?',
      text: 'Real projects can’t maximize everything. Safety, accessibility, feasibility, weather resilience, travel efficiency and sustainability pull against each other, and a weighted decision matrix forces those trade-offs into the open. Testing the result with a sensitivity analysis shows whether a decision holds up or depends on one debatable number. That is what makes it defensible to the people who live with the outcome.',
    },
    {
      number: '3.3',
      title: 'Now What?',
      text: 'In future courses and projects, I’ll write design requirements before choosing a solution, state the weights behind any comparison, and test how sensitive the result is to those weights. I’ll use the same approach in my software projects, where I’ve usually made these trade-offs informally.',
    },
    {
      number: '3.4',
      title: 'Information Gap Analysis',
      text: 'Two gaps stand out. For hydronic heat transfer, I can’t yet size a snow-melting loop, so I’ll work through the heat transfer calculations using published snow-melting design guidance, starting with a single slab section and checking the assumptions with an instructor. For infrastructure integration, I don’t yet know how a new pathway would tie into existing campus utilities and drainage, so I’ll look for campus planning records and ask the people responsible for them.',
    },
  ],
};
