import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';

const GITHUB = 'https://github.com/skrunkleVEVO';
const img = (file) => `${import.meta.env.BASE_URL}images/${file}`;

// Empty href = no public destination yet; it renders as a muted "coming soon" pill.
const PROJECTS = [
  {
    id: 'auraflow',
    index: '01',
    title: 'AuraFlow',
    category: 'Android app',
    year: '2026',
    tagline: 'Blocks short-form video feeds without breaking the rest of the app.',
    description:
      'AuraFlow uses Android\'s Accessibility Service to spot when you enter Reels, Shorts or Spotlight and steers you back out, while DMs, profiles and everything else keep working. It runs entirely on-device: no accounts, no analytics, no network.',
    tech: ['Kotlin', 'Accessibility Service', 'Android SDK'],
    highlights: [
      'Detects feeds through the accessibility view hierarchy',
      'Per-app toggles for Instagram, YouTube, Snapchat and more',
      'Messaging and non-feed screens stay fully usable',
      'Nothing collected, nothing sent',
    ],
    visual: 'auraflow',
    links: [
      { label: 'View on GitHub', href: `${GITHUB}/AuraFLow`, icon: 'github', primary: true },
      { label: 'Releases', href: `${GITHUB}/AuraFLow/releases`, icon: 'external' },
    ],
  },
  {
    id: 'somefolio',
    index: '02',
    title: 'SomeFolio',
    category: 'Media hub · PWA',
    year: '2026',
    tagline: 'One offline-first library for anime, manga, games, film and books.',
    description:
      'Live search across AniList, Open Library, TVmaze and Wikipedia with no API keys. Franchise stacking, half-star ratings, vibe tags, auto-saving notes and a "What\'s next?" spinner. Stored locally, with optional Firestore sync that merges edits per title.',
    tech: ['React', 'Vite', 'Tailwind', 'PWA', 'Firebase'],
    highlights: [
      'Cross-medium search with no API keys',
      'Franchise stacking groups a series into one card',
      'Works fully offline as an installable PWA',
      'Per-title last-write-wins sync',
    ],
    images: [{ src: img('somefolio-library.png'), alt: 'SomeFolio anime library grid with vibe filters' }],
    links: [
      { label: 'Live demo', href: 'https://skrunklevevo.github.io/SomeFolio/', icon: 'external', primary: true },
      { label: 'GitHub', href: `${GITHUB}/SomeFolio`, icon: 'github' },
    ],
  },
  {
    id: 'aura-and-artifacts',
    index: '03',
    title: 'Aura and Artifacts',
    category: 'Minecraft mod',
    year: '2026',
    tagline: 'An ability skill tree and artifact weapons for Minecraft.',
    description:
      'Players level an Aura skill tree, bind abilities like Time Stop to keys and wield artifact weapons whose effects scale with their build. Includes custom player animations, daily quests, an ability HUD and modpack integrations.',
    tech: ['Java', 'Forge / Fabric'],
    highlights: [
      'Branching Aura skill tree with levels and points',
      'Keybound abilities with cooldown HUD',
      'Daily quests and custom player animations',
      'Balance values in config for fast playtests',
    ],
    images: [
      { src: img('aura-pillars.png'), alt: 'Pillars of light erupting around the player' },
      { src: img('aura-timestop.png'), alt: 'Time Stop ability with the Aura HUD and daily quests' },
      { src: img('aura-beam.png'), alt: 'Radiant beam ability striking from the sky' },
      { src: img('aura-strike.webp'), alt: 'Top-down view of a targeted strike ability' },
    ],
    links: [
      { label: 'More on GitHub', href: GITHUB, icon: 'github' },
      { label: 'Download coming soon', href: '' },
    ],
  },
  {
    id: 'formatnt',
    index: '04',
    title: 'formatnt',
    category: 'Desktop tool',
    year: '2026',
    tagline: 'Local media toolkit: download, convert, compress to an exact size, trim and crop.',
    description:
      'Drop anything and formatnt suggests what to do next. One-click presets for Discord, TikTok and email, every common video, audio and image format, and a target-size compressor that re-encodes until the file fits. FFmpeg under the hood with NVENC GPU acceleration.',
    tech: ['FFmpeg', 'NVENC', 'Desktop'],
    highlights: [
      'Guaranteed target-size compression',
      'Presets for Discord, TikTok, email and more',
      'Video, audio and image conversion in one place',
      'GPU-accelerated encoding',
    ],
    images: [
      { src: img('formatnt-converter.png'), alt: 'formatnt converter presets and output formats' },
      { src: img('formatnt-workspace.png'), alt: 'formatnt workspace with drop zone and modules sidebar' },
      { src: img('formatnt-compressor.png'), alt: 'formatnt target-size compressor' },
    ],
    links: [{ label: 'GitHub', href: `${GITHUB}/FormatNT`, icon: 'github', primary: true }],
  },
  {
    id: 'planner',
    index: '05',
    title: 'Planner & Scheduler',
    category: 'Canvas automation',
    year: '2026',
    tagline: 'Ranks tasks, runs focus sessions and pulls Canvas files automatically.',
    description:
      'A single dashboard that ranks coursework by urgency and importance, syncs deadlines to the calendar, runs Pomodoro focus sessions and downloads new Canvas course files as they appear.',
    tech: ['Python', 'React', 'Canvas API'],
    highlights: [
      'Priority ranking by urgency and importance',
      'Built-in focus timer',
      'Calendar sync for deadlines and study blocks',
      'Automated Canvas file download and filing',
    ],
    visual: 'planner',
    links: [
      { label: 'More on GitHub', href: GITHUB, icon: 'github' },
      { label: 'Repo coming soon', href: '' },
    ],
  },
  {
    id: 'aeris',
    index: '06',
    title: 'Aeris Drone Suppression',
    category: 'APSC 169 · Engineering design',
    year: '2025',
    tagline: 'An autonomous drone network that catches wildfires at ignition.',
    description:
      'A speculative design for distributed drones that patrol high-risk terrain, detect ignitions early and coordinate first-stage suppression, while relaying live data to human responders who keep final authority. Evaluated against stakeholder needs, risk and sustainability.',
    tech: ['Systems Design', 'CAD', 'Technical Brief'],
    highlights: [
      'Detection, coordination and suppression architecture',
      'Concept CAD and design rationale',
      'Stakeholder, risk and sustainability analysis',
      'Technical brief and team presentation',
    ],
    visual: 'aeris',
    links: [{ label: 'PDF report', href: '', icon: 'doc' }],
  },
];

const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));

/* ---------- Motion presets ---------- */

const ease = [0.22, 1, 0.36, 1];
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

/* ---------- Icons ---------- */

const ICONS = {
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
    />
  ),
  external: <path d="M7 17 17 7M8 7h9v9" />,
  doc: <path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6" />,
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};

function Icon({ name, className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

function LinkButton({ label, href, icon, primary }) {
  if (!href) {
    return (
      <span className="pill-disabled" title="Not public yet">
        {icon && <Icon name={icon} />}
        {label}
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={primary ? 'pill-primary' : 'pill'}>
      {icon && <Icon name={icon} />}
      {label}
    </a>
  );
}

/* ---------- Illustrated covers for projects without screenshots ---------- */

function AuraFlowVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-zinc-950 to-cyan-950">
      <div className="absolute h-[70%] w-[70%] rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="relative aspect-[9/19] h-[82%] rounded-[2rem] border-[5px] border-zinc-800 bg-zinc-950 p-2.5 shadow-2xl shadow-black/60">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-zinc-800" />
        <div className="relative h-[52%] overflow-hidden rounded-xl">
          <div className="grid h-full grid-cols-2 gap-1 blur-[3px]">
            <div className="bg-gradient-to-b from-pink-500/50 to-orange-400/40" />
            <div className="bg-gradient-to-b from-violet-500/50 to-sky-400/40" />
            <div className="bg-gradient-to-b from-amber-400/40 to-rose-500/50" />
            <div className="bg-gradient-to-b from-sky-500/40 to-emerald-400/50" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-zinc-950/70 text-center">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="text-[11px] font-semibold text-white">Feed blocked</span>
            <span className="font-mono text-[9px] text-emerald-400">AURAFLOW</span>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {['bg-sky-400/60', 'bg-violet-400/60', 'bg-amber-400/60'].map((c) => (
            <div key={c} className="flex items-center gap-2">
              <div className={`h-5 w-5 rounded-full ${c}`} />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-2/3 rounded-full bg-zinc-700" />
                <div className="h-1.5 w-1/3 rounded-full bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlannerVisual() {
  const blocks = [
    [1, 2, 'bg-amber-400/70'],
    [1, 5, 'bg-zinc-600'],
    [2, 1, 'bg-orange-500/70'],
    [2, 4, 'bg-amber-400/40'],
    [3, 3, 'bg-amber-400/70'],
    [4, 2, 'bg-zinc-600'],
    [4, 5, 'bg-orange-500/70'],
    [5, 1, 'bg-amber-400/40'],
    [5, 4, 'bg-amber-400/70'],
  ];
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-amber-950/80 via-zinc-950 to-zinc-950 p-8">
      <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="relative grid w-full max-w-md grid-cols-[1fr_auto] gap-4">
        <div className="rounded-xl bg-zinc-900/80 p-4">
          <div className="mb-3 grid grid-cols-5 gap-1.5 font-mono text-[9px] text-zinc-500">
            {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-5 grid-rows-5 gap-1.5">
            {Array.from({ length: 25 }, (_, i) => {
              const col = (i % 5) + 1;
              const row = Math.floor(i / 5) + 1;
              const b = blocks.find(([c, r]) => c === col && r === row);
              return <div key={i} className={`h-5 rounded ${b ? b[2] : 'bg-zinc-800/60'}`} />;
            })}
          </div>
        </div>
        <div className="flex w-28 flex-col gap-2 rounded-xl bg-zinc-900/80 p-3">
          <span className="font-mono text-[9px] text-zinc-500">FOCUS</span>
          <span className="font-serif text-3xl text-white">24:59</span>
          <div className="mt-auto h-1 overflow-hidden rounded-full bg-zinc-800">
            <div className="h-full w-2/3 bg-amber-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AerisVisual() {
  const drones = [
    [150, 90],
    [300, 60],
    [430, 130],
    [220, 190],
    [380, 220],
  ];
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-950 to-red-950/60">
      <svg viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[40, 75, 110, 145, 180, 215].map((r, i) => (
          <ellipse key={r} cx="320" cy="170" rx={r * 1.6} ry={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" transform={`rotate(${-8 + i * 3} 320 170)`} />
        ))}
        {drones.map(([x, y], i) =>
          drones.slice(i + 1).map(([x2, y2]) => (
            <line key={`${x}-${x2}-${y2}`} x1={x} y1={y} x2={x2} y2={y2} stroke="rgba(52,211,153,0.12)" strokeDasharray="3 5" />
          )),
        )}
        <motion.circle
          cx="300"
          cy="170"
          r="18"
          fill="none"
          stroke="rgba(248,113,113,0.7)"
          initial={{ scale: 0.6, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
          style={{ transformOrigin: '300px 170px' }}
        />
        <circle cx="300" cy="170" r="6" fill="#f87171" />
        {drones.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="10" fill="rgba(52,211,153,0.12)" />
            <circle cx={x} cy={y} r="3.5" fill="#34d399" />
          </g>
        ))}
      </svg>
      <span className="absolute bottom-4 left-4 font-mono text-[10px] text-red-300/80">IGNITION DETECTED · 5 UNITS EN ROUTE</span>
    </div>
  );
}

const VISUALS = { auraflow: AuraFlowVisual, planner: PlannerVisual, aeris: AerisVisual };

function Cover({ project, imageIndex = 0 }) {
  if (project.images) {
    const image = project.images[imageIndex];
    return <img src={image.src} alt={image.alt} className="h-full w-full object-cover object-top" loading="lazy" draggable="false" />;
  }
  const Visual = VISUALS[project.visual];
  return <Visual />;
}

/* ---------- Gallery ---------- */

function GalleryCard({ project, onOpen, className = '', aspect = 'aspect-[4/3]' }) {
  return (
    <motion.button
      type="button"
      variants={rise}
      whileHover="hover"
      onClick={() => onOpen(project.id)}
      className={`group block w-full text-left ${className}`}
      aria-label={`Open ${project.title}`}
    >
      <motion.div variants={{ hover: { y: -6, scale: 1.02 } }} transition={{ duration: 0.5, ease }}>
        <motion.div layoutId={`media-${project.id}`} className={`relative overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl shadow-black/50 ${aspect}`}>
          <motion.div className="h-full w-full" variants={{ hover: { scale: 1.06 } }} transition={{ duration: 0.8, ease }}>
            <Cover project={project} />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />
          {project.images?.length > 1 && (
            <span className="absolute right-4 top-4 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] text-zinc-300 backdrop-blur">
              {project.images.length} shots
            </span>
          )}
        </motion.div>
      </motion.div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="meta">
            {project.index} — {project.category}
          </p>
          <h3 className="mt-2 font-serif text-3xl tracking-tight text-white sm:text-4xl">{project.title}</h3>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-zinc-400">{project.tagline}</p>
        </div>
        <span className="mt-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors duration-300 group-hover:border-white/40 group-hover:text-white">
          <Icon name="arrow" />
        </span>
      </div>
    </motion.button>
  );
}

function FeaturedCard({ project, onOpen }) {
  return (
    <motion.button
      type="button"
      variants={rise}
      whileHover="hover"
      onClick={() => onOpen(project.id)}
      className="group grid w-full items-center gap-8 text-left lg:grid-cols-12 lg:gap-12"
      aria-label={`Open ${project.title}`}
    >
      <motion.div className="lg:col-span-7" variants={{ hover: { y: -6, scale: 1.02 } }} transition={{ duration: 0.5, ease }}>
        <motion.div layoutId={`media-${project.id}`} className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl shadow-black/50">
          <motion.div className="h-full w-full" variants={{ hover: { scale: 1.06 } }} transition={{ duration: 0.8, ease }}>
            <Cover project={project} />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />
        </motion.div>
      </motion.div>

      <div className="lg:col-span-5">
        <p className="meta text-emerald-400">Featured · {project.index} — {project.category}</p>
        <h3 className="mt-4 font-serif text-5xl tracking-tight text-white sm:text-7xl">{project.title}</h3>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">{project.tagline}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="badge">{t}</span>
          ))}
        </div>
        <span className="mt-8 inline-flex items-center gap-2 border-b border-white/20 pb-1 text-sm font-medium text-white transition-colors group-hover:border-white">
          Read the case study <Icon name="arrow" />
        </span>
      </div>
    </motion.button>
  );
}

/* ---------- Expanded project ---------- */

function ProjectSheet({ project, onClose }) {
  const [shot, setShot] = useState(0);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-label={project.title}>
      <motion.div
        className="fixed inset-0 bg-zinc-950/85 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />

      <div className="pointer-events-none relative mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-12">
        <motion.button
          type="button"
          onClick={onClose}
          className="pointer-events-auto fixed right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-zinc-900/80 text-zinc-300 backdrop-blur transition-colors hover:text-white sm:right-8 sm:top-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          aria-label="Close"
        >
          <Icon name="close" className="h-5 w-5" />
        </motion.button>

        <motion.div
          layoutId={`media-${project.id}`}
          className="pointer-events-auto relative aspect-[16/10] overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl shadow-black/60"
          transition={{ duration: 0.6, ease }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={shot}
              className="h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Cover project={project} imageIndex={shot} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {project.images?.length > 1 && (
          <motion.div
            className="pointer-events-auto mt-3 flex gap-3 overflow-x-auto pb-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
            exit={{ opacity: 0 }}
          >
            {project.images.map((im, i) => (
              <button
                key={im.src}
                type="button"
                onClick={() => setShot(i)}
                className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl transition-opacity sm:h-20 sm:w-32 ${i === shot ? 'opacity-100 ring-2 ring-white/70' : 'opacity-40 hover:opacity-80'}`}
                aria-label={`Show screenshot ${i + 1}`}
              >
                <img src={im.src} alt="" className="h-full w-full object-cover object-top" />
              </button>
            ))}
          </motion.div>
        )}

        <motion.div
          className="pointer-events-auto mt-10 grid gap-10 md:grid-cols-12"
          variants={stagger}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
        >
          <div className="md:col-span-7">
            <motion.p variants={rise} className="meta">
              {project.index} — {project.category} · {project.year}
            </motion.p>
            <motion.h2 variants={rise} className="mt-3 font-serif text-5xl tracking-tight text-white sm:text-6xl">
              {project.title}
            </motion.h2>
            <motion.p variants={rise} className="mt-5 text-base leading-relaxed text-zinc-300">
              {project.description}
            </motion.p>
            <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <LinkButton key={l.label} {...l} />
              ))}
            </motion.div>
          </div>

          <motion.div variants={rise} className="md:col-span-5">
            <p className="meta">Highlights</p>
            <ul className="mt-4 divide-y divide-white/5 border-y border-white/5">
              {project.highlights.map((h) => (
                <li key={h} className="py-3 text-sm leading-relaxed text-zinc-300">
                  {h}
                </li>
              ))}
            </ul>
            <p className="meta mt-8">Built with</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="badge">{t}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function App() {
  const [openId, setOpenId] = useState(null);
  const open = openId ? byId[openId] : null;
  const p = byId;

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease }}>
      <div className="grain relative min-h-screen overflow-x-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-gradient-to-b from-emerald-500/[0.06] via-transparent to-transparent" aria-hidden="true" />

        <motion.header
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">skrunklevevo</span>
          <nav className="flex items-center gap-6 text-sm text-zinc-400">
            <a href="#work" className="transition-colors hover:text-white">Work</a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">GitHub</a>
          </nav>
        </motion.header>

        <main className="mx-auto max-w-7xl px-4 sm:px-8">
          <motion.section className="pb-20 pt-16 sm:pb-32 sm:pt-28" variants={stagger} initial="hidden" animate="show">
            <motion.p variants={rise} className="meta flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Engineering · UBC Okanagan · Year 1
            </motion.p>
            <motion.h1 variants={rise} className="mt-8 max-w-5xl font-serif text-5xl leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-8xl">
              I build apps, tools and mods <em className="text-zinc-500">to fix problems I actually have.</em>
            </motion.h1>
            <motion.p variants={rise} className="mt-8 max-w-xl text-base leading-relaxed text-zinc-400">
              I'm skrunklevevo, a first-year engineering student in Kelowna building mobile-first apps, automation engines,
              custom tools and game mods.
            </motion.p>
            <motion.div variants={rise} className="mt-10 flex flex-wrap gap-3">
              <LinkButton label="GitHub" href={GITHUB} icon="github" primary />
              <a href="#work" className="pill">
                Selected work
              </a>
            </motion.div>
          </motion.section>

          <section id="work" className="scroll-mt-8">
            <motion.div
              className="flex items-end justify-between border-t border-white/10 pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <h2 className="font-serif text-4xl tracking-tight text-white sm:text-6xl">Selected work</h2>
              <span className="meta hidden sm:block">2024 — 2026</span>
            </motion.div>

            <motion.div className="mt-12 sm:mt-16" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
              <FeaturedCard project={p.auraflow} onOpen={setOpenId} />
            </motion.div>

            <motion.div
              className="mt-24 grid gap-x-10 gap-y-20 md:grid-cols-12 sm:mt-32"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
            >
              <GalleryCard project={p.somefolio} onOpen={setOpenId} className="md:col-span-7" aspect="aspect-[16/11]" />
              <GalleryCard project={p['aura-and-artifacts']} onOpen={setOpenId} className="md:col-span-5 md:mt-40" aspect="aspect-[4/5]" />
              <GalleryCard project={p.formatnt} onOpen={setOpenId} className="md:col-span-5" aspect="aspect-[4/3]" />
              <GalleryCard project={p.planner} onOpen={setOpenId} className="md:col-span-6 md:col-start-7 md:mt-24" aspect="aspect-[16/11]" />
              <GalleryCard project={p.aeris} onOpen={setOpenId} className="md:col-span-8 md:col-start-3" aspect="aspect-[2/1]" />
            </motion.div>
          </section>

          <footer className="mt-32 flex flex-col gap-6 border-t border-white/10 py-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-serif text-3xl text-white sm:text-4xl">Let's build something.</p>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-zinc-400 transition-colors hover:text-white">
                github.com/skrunkleVEVO
              </a>
            </div>
            <p className="meta">© {new Date().getFullYear()} skrunklevevo · Kelowna, BC</p>
          </footer>
        </main>

        <AnimatePresence>{open && <ProjectSheet key={open.id} project={open} onClose={() => setOpenId(null)} />}</AnimatePresence>
      </div>
    </MotionConfig>
  );
}
