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

export const tabs: { id: TabId; label: string; short: string }[] = isSchoolMode
  ? [
      { id: 'about', label: 'About Me', short: 'About' },
      { id: 'apsc-169', label: 'APSC 169 Project', short: 'APSC 169' },
      { id: 'software', label: 'Personal Software', short: 'Software' },
      { id: 'reflection', label: 'Reflection', short: 'Reflection' },
    ]
  : [
      { id: 'about', label: 'About Me', short: 'About Me' },
      { id: 'projects', label: 'Projects', short: 'Projects' },
    ];

export const about = {
  title: 'I build software and systems to solve problems I actually run into.',
  subtitle: 'First-year engineering student at UBC Okanagan. Building web tools, mobile apps, and practical engineering designs.',
  sections: [
    {
      title: 'Why engineering',
      paragraphs: [
        'I chose engineering because I want to work on both digital software and the physical infrastructure people depend on. Code can change quickly and physical systems can’t, and I want to learn to design well under both sets of constraints.',
        'My APSC 169 team project is the physical side of that work: a safer, accessible route between upper campus housing and the lower transit hub.',
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
  skillGroups: [
    { name: 'Web', skills: ['React', 'Vite', 'Tailwind', 'JavaScript', 'PWAs', 'Firebase'] },
    { name: 'Mobile', skills: ['Kotlin', 'Android SDK', 'Accessibility Service'] },
    { name: 'Engineering design', skills: ['Stakeholder salience analysis', 'C-Sketch ideation', 'Weighted decision matrices', 'Sensitivity analysis'] },
    { name: 'Tools', skills: ['Git'] },
  ],
  disciplines: [
    { name: 'Software tools', items: 'AuraFlow, SomeFolio, Triaj, GarmentDB' },
    { name: 'Physical infrastructure', items: 'Campus Escarpment Mobility System' },
  ],
  bridge: [
    {
      side: 'Physical infrastructure',
      title: 'APSC 169 Project',
      text: 'A safer, accessible route across the McKinley Escarpment.',
      tab: 'apsc-169',
      image: `${import.meta.env.BASE_URL}images/apsc/upper-campus-road.jpg`,
    },
    {
      side: 'Digital tools',
      title: 'Personal Software',
      text: 'Four apps built for bottlenecks in my own day.',
      tab: 'software',
      image: `${import.meta.env.BASE_URL}images/previews/somefolio-desktop.jpg`,
    },
  ],
};

export type ProjectLink = { label: string; href: string; icon: 'github' | 'external'; primary?: boolean };

export type Project = {
  id: string;
  title: string;
  tag: string;
  headline: string;
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
    headline: 'Short-form video feed blocker',
    tech: ['Kotlin', 'Accessibility Service', 'Android SDK'],
    description:
      'Non-root Android app using Accessibility Services to detect and block addictive short-form video feed loops at the resource view layer while keeping primary messaging functional.',
    links: [{ label: 'GitHub', href: `${GITHUB_URL}/AuraFLow`, icon: 'github' }],
  },
  {
    id: 'somefolio',
    title: 'SomeFolio',
    tag: 'Web App / PWA',
    headline: 'Offline-first personal media library',
    tech: ['React', 'Vite', 'Tailwind', 'PWA', 'Firebase'],
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
    headline: 'Canvas-integrated focus & triage planner',
    tech: ['JavaScript', 'PWA', 'Firebase', 'Extension'],
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
    headline: 'Wardrobe & outfit combination catalog',
    tech: ['React', 'Tailwind', 'Firebase'],
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

const apscImage = (file: string) => `${import.meta.env.BASE_URL}images/apsc/${file}`;

/** Path or URL of the finished report PDF, such as `${import.meta.env.BASE_URL}report.pdf`. While empty, the page shows a placeholder. */
export const reportPdfUrl: string = '';

export const escarpment = {
  course: 'APSC 169',
  title: 'Campus Escarpment Mobility System',
  lede: 'An APSC 169 team project: getting people safely between upper campus housing and the lower transit hub, in every season.',
  stats: [
    { value: '30%', label: 'Steepest campus slopes on the McKinley Escarpment', major: true },
    { value: '5%', label: 'Maximum running slope of the proposed pathway', major: true },
    { value: '24 → 8', label: 'Concepts longlisted, then shortlisted', major: false },
    { value: '11', label: 'Stakeholder groups mapped for salience', major: false },
  ],
  overview: {
    plain:
      'UBCO is built along the McKinley Escarpment, and the grade separates upper campus housing (Nicola, Nechako, Purcell and Skeena) from the lower academic core and transit hub. A trip most students make every day crosses steep slopes, slippery winter surfaces and stretches with no sidewalk.',
    points: [
      { title: 'The grade', text: 'Campus slopes reach up to 30%. That makes the direct route a severe barrier for anyone with limited mobility.' },
      { title: 'Winter slip hazards', text: 'Water pools where drainage falls short, then freezes overnight. Snow and ice build up on the same steep surfaces people have to walk on.' },
      { title: 'Pedestrian safety gaps', text: 'Missing sidewalks push people into live traffic zones, such as International Mews near Nicola Residence.' },
    ],
  },
  exploration: {
    plain: 'Before proposing anything, we studied the land and checked what the university has already committed to.',
    points: [
      { title: 'Campus topography', text: 'Mapped where elevation shapes the route between housing, classes and transit, including a measured route along Discovery Avenue of about 240 m with roughly 20 m of climb.' },
      { title: 'UBCO Transportation Plan 2021–2040', text: 'Aligned the project with the campus’s long-term transportation direction.' },
      { title: 'Climate Action Plan 2030 (CAP 2030)', text: 'Prioritized pedestrian-first pathways over vehicle trips.' },
    ],
  },
  stakeholders: {
    plain: 'We mapped everyone the project touches, then rated each group’s power, urgency and legitimacy to work out whose needs had to shape the design first.',
    groups: [
      { name: 'Students with mobility impairments', power: 'Medium', urgency: 'High', legitimacy: 'High', salience: 'Primary' },
      { name: 'Students living on campus', power: 'Low', urgency: 'High', legitimacy: 'High', salience: 'Primary' },
      { name: 'UBCO Board of Governors', power: 'High', urgency: 'Medium', legitimacy: 'High', salience: 'Primary' },
      { name: 'UBCO Campus Planning', power: 'High', urgency: 'Medium', legitimacy: 'High', salience: 'Primary' },
      { name: 'Government', power: 'High', urgency: 'Low', legitimacy: 'High', salience: 'Primary' },
      { name: 'UBCO support staff (maintenance)', power: 'Medium', urgency: 'Medium', legitimacy: 'High', salience: 'Secondary' },
      { name: 'Faculty', power: 'Medium', urgency: 'Low', legitimacy: 'High', salience: 'Secondary' },
      { name: 'Indigenous groups', power: 'Low', urgency: 'Low', legitimacy: 'High', salience: 'Secondary' },
      { name: 'Off-campus commuter students', power: 'Very low', urgency: 'Medium', legitimacy: 'Medium', salience: 'Secondary' },
      { name: 'Visitors', power: 'Low', urgency: 'Low', legitimacy: 'Low', salience: 'Tertiary' },
      { name: 'Contractors and specialists', power: 'Low', urgency: 'Low', legitimacy: 'Low', salience: 'Tertiary' },
    ],
    requirements: [
      { title: 'Campus Mobility', text: 'Create safer options for travelling between areas of campus separated by elevation.' },
      { title: 'Universal Accessibility', text: 'Let everyone, including people with mobility issues, cross campus conveniently.' },
      { title: 'Weather Resilience', text: 'Operate reliably and safely through variable weather.' },
      { title: 'Feasibility', text: 'Stay realistic and within project constraints, including budget.' },
      { title: 'Capacity / Safety', text: 'Handle peak pedestrian flow at class changes and meet applicable safety and construction standards.' },
    ],
  },
  ideation: {
    plain: 'C-Sketch rounds produced 24 concepts, from the practical to the deliberately wild. We screened them against the requirements down to eight, then compared those in a weighted decision matrix so the choice could be checked rather than argued.',
    longlist: [
      'Elevator with ramps and lights',
      'Covered escalator and elevator',
      'Elevator between upper and lower campus',
      'Elevator with spiral staircase',
      'Heated sidewalks',
      'Rocket-powered transport',
      'Geothermal path heating with drainage',
      'Anti-slip materials on steps',
      'Tunnel with elevator',
      'Powered drainage, signs and benches',
      'Level sidewalk with ground lighting',
      'Added sidewalks and traffic control',
      'Illuminated railings',
      'Gyroscopic transport ball',
      'Inclined moving walkway',
      'Terraced path with rest platforms',
      'Pedestrian underpass',
      'Shared electric bicycles',
      'Rail-mounted platform lift',
      'Covered rest-stop network',
      'Permeable path with stormwater management',
      'Rebuilt stairs with landings',
      'Accessible route navigation',
      'Accessible switchback ramps',
    ],
    shortlist: [
      'Elevator system and bridge',
      'Covered escalator and elevator',
      'Covered switchback ramps',
      'Heated, slip-resistant sidewalks',
      'Electric campus shuttle',
      'Powered carriage',
      'Improved pedestrian pathways',
      'Accessible route navigation',
    ],
    selected: 'Improved pedestrian pathways',
    criteria: [
      { name: 'Safety', weight: 25, why: 'A solution that endangers its users fails, whatever else it does well.' },
      { name: 'Accessibility', weight: 20, why: 'Design for the most constrained users and the route works for everyone.' },
      { name: 'Feasibility', weight: 20, why: 'Construction, cost and maintenance decide whether anything actually gets built.' },
      { name: 'Weather Resilience', weight: 15, why: 'It has to hold up and stay safe through heat, snow and ice.' },
      { name: 'Travel Efficiency', weight: 10, why: 'A direct route keeps walking more practical than higher-impact transport.' },
      { name: 'Sustainability', weight: 10, why: 'Careless building could destroy green space or damage local ecosystems.' },
    ],
    contribution: {
      title: 'My leadership',
      text: 'I led the decision matrix’s weighting and sensitivity analysis: formulating the criteria weights, working through the mathematical scoring, and testing whether the ranking held when those weights changed.',
    },
  },
  prototypes: {
    plain: 'The team carried improved pedestrian pathways forward. Three prototypes test its riskiest assumptions, and results and photos will be added here when testing is complete.',
    badge: '[Phase 4 — Testing in Progress]',
    items: [
      {
        title: 'Prototype 1',
        subject: 'Drainage',
        text: 'A modelled drain grate and catch basin under a test surface, checking that the system keeps up with above-average rainfall. Trench drains would intercept runoff before it crosses the path.',
        specs: [] as { label: string; value: string }[],
        image: '',
        results: '',
      },
      {
        title: 'Prototype 2',
        subject: 'Grip Testing',
        text: 'A tilting ramp comparing an ordinary sidewalk surface with textured and friction-overlay surfaces, finding the angle where each starts to slip in dry, wet and icy conditions.',
        specs: [] as { label: string; value: string }[],
        image: '',
        results: '',
      },
      {
        title: 'Prototype 3',
        subject: 'Switchback Pathway',
        text: 'A virtual model of the full pathway, combining the first two prototypes with accessibility features and hydronic snow-melting loops.',
        specs: [
          { label: 'Span', value: '30–40 m' },
          { label: 'Running slope', value: '5% maximum' },
          { label: 'Handrails', value: 'Continuous, dual-height' },
          { label: 'Rest landings', value: '1.5 m × 1.5 m, every 9 m' },
          { label: 'Clear width', value: '1.8 m minimum' },
          { label: 'Snow melting', value: 'Hydronic loops' },
        ],
        image: '',
        results: '',
      },
    ],
    tradeoffs: [
      { title: 'A longer walk', text: 'Taking a 15% grade down to 5% triples the distance: a 50 m climb becomes 150 m, adding about one to two minutes at walking pace.' },
      { title: 'Still physical effort', text: 'A gentle slope is possible for far more people, but it isn’t the zero-effort trip an elevator or shuttle would be.' },
      { title: 'Depends on maintenance', text: 'Snow packed onto textured concrete cancels its grip, so the route still relies on timely clearing and salting.' },
    ],
  },
  gallery: {
    plain: 'Reference images of the escarpment and the conditions behind the project, with space for winter hazard photos.',
    items: [
      {
        src: apscImage('international-mews.jpg'),
        width: 1348,
        height: 866,
        title: 'International Mews',
        caption: 'A shared paved roadway with no separate sidewalk, on the way from the lower residences towards the academic buildings. The team noted water pooling here, even near the drains.',
        credit: 'Google Street View',
      },
      {
        src: apscImage('discovery-route.jpg'),
        width: 849,
        height: 802,
        title: 'Discovery Avenue route',
        caption: 'The measured study route along Discovery Avenue, about 240 m long with roughly 20 m of elevation change.',
        credit: 'Google Maps, team measurement',
      },
      {
        src: apscImage('upper-campus-road.jpg'),
        width: 1441,
        height: 840,
        title: 'Walking the hill',
        caption: 'A campus road and sidewalk climbing past residences. Heading downhill, the slope is steep enough that you have to catch yourself with each step.',
        credit: 'Google Street View',
      },
      {
        src: apscImage('switchback-alignment.jpg'),
        width: 364,
        height: 252,
        title: 'Switchback alignment',
        caption: 'An early sketch of a switchback alignment, drawn in red over an existing hillside path.',
        credit: 'Google satellite imagery, team overlay',
      },
      {
        src: '',
        width: 4,
        height: 3,
        title: 'Winter conditions',
        caption: 'Snow, ice and frozen runoff on the steepest stretch of the route.',
        credit: '',
      },
      {
        src: '',
        width: 4,
        height: 3,
        title: 'Stairs and handrails',
        caption: 'Existing staircases on the direct route, with gaps in handrails and rest points.',
        credit: '',
      },
    ],
    placeholder: '[Site Photo to Add]',
  },
  report: {
    title: 'Final report',
    plain: 'Scroll the full report here, or open it in its own tab.',
    placeholder: '[Final Report Placeholder]',
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
      text: 'Each phase changed what we thought the problem was. Topography and policy research showed that this was more than a steep hill: it was a connection between housing, classes and transit. The stakeholder analysis then changed the order of priorities, because rating groups by power, urgency and legitimacy made it clear whose needs had to shape the requirements first.',
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
      text: 'Two gaps stand out. For hydronic heat transfer, I can’t yet size a snow-melting loop myself, and our early cost range relied on vendor figures, so I’ll work through the heat transfer calculations from published design guidance, starting with one slab section and checking the assumptions with an instructor. For municipal infrastructure policy, I don’t yet know which City of Kelowna requirements would apply where a campus pathway meets public roads and drainage, so I’ll start with the city’s Pedestrian and Bicycle Master Plan, then ask campus planning who to speak with.',
    },
  ],
};
