import { forwardRef, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ArrowUpRight, FileText, X } from 'lucide-react';

import { BentoGrid } from '@/components/magicui/bento-grid';
import { MagicCard } from '@/components/magicui/magic-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const GITHUB = 'https://github.com/skrunkleVEVO';
const img = (file) => `${import.meta.env.BASE_URL}images/${file}`;

// Empty href = no public destination yet; it renders as a muted "coming soon" pill.
const PROJECTS = [
  {
    id: 'auraflow',
    index: '01',
    title: 'AuraFlow',
    category: 'Android app',
    group: 'mobile',
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
    group: 'mobile',
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
    group: 'engineering',
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
    group: 'tools',
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
    group: 'tools',
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
    group: 'engineering',
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

/* ---------- Grid layout ---------- */

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'mobile', label: 'Mobile & Apps' },
  { id: 'tools', label: 'Tools & Automation' },
  { id: 'engineering', label: 'Engineering & Mods' },
];

// Bento order. "All" uses the hand-tuned spans below; a filtered view (two cards) splits 7 / 5.
const GRID_ORDER = ['auraflow', 'somefolio', 'planner', 'aeris', 'aura-and-artifacts', 'formatnt'];
const SPANS_ALL = {
  auraflow: 'md:col-span-2 lg:col-span-7 lg:row-span-2',
  somefolio: 'lg:col-span-5',
  planner: 'lg:col-span-5',
  aeris: 'md:col-span-2 lg:col-span-4',
  'aura-and-artifacts': 'lg:col-span-4',
  formatnt: 'lg:col-span-4',
};
const SPANS_FILTERED = ['lg:col-span-7', 'lg:col-span-5'];

/* ---------- Motion presets ---------- */

const ease = [0.22, 1, 0.36, 1];
const spring = { type: 'spring', stiffness: 300, damping: 20 };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/* ---------- Icons & links ---------- */

// Lucide v1 ships no brand marks, so GitHub stays inline.
function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

const ICONS = { github: GithubIcon, external: ArrowUpRight, doc: FileText };

function LinkButton({ label, href, icon, primary, size }) {
  const Glyph = ICONS[icon];
  if (!href) {
    return (
      <Button asChild variant="outline" size={size} className="cursor-default border-dashed text-muted-foreground hover:bg-transparent hover:text-muted-foreground">
        <span title="Not public yet">
          {Glyph && <Glyph />}
          {label}
        </span>
      </Button>
    );
  }
  return (
    <Button asChild variant={primary ? 'default' : 'outline'} size={size}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {Glyph && <Glyph />}
        {label}
      </a>
    </Button>
  );
}

function TechTags({ tech, className }) {
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {tech.map((t) => (
        <Badge key={t} variant="outline">
          {t}
        </Badge>
      ))}
    </div>
  );
}

/* ---------- Illustrated covers for projects without screenshots ---------- */

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
          <span className="font-mono text-2xl font-semibold text-white">24:59</span>
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


/* ---------- Project cards ---------- */

function FilterBar({ value, onChange }) {
  return (
    <div className="sticky top-4 z-30 flex justify-center">
      <div className="flex max-w-full gap-1 overflow-x-auto rounded-full border bg-background/70 p-1 shadow-lg shadow-black/40 backdrop-blur-xl [scrollbar-width:none]">
        {FILTERS.map((f) => {
          const active = f.id === value;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange(f.id)}
              aria-pressed={active}
              className={cn(
                'relative shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                active ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {active && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-primary" transition={spring} />}
              <span className="relative">{f.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// forwardRef so AnimatePresence's popLayout mode can measure exiting cards.
const ProjectCard = forwardRef(function ProjectCard({ project, onOpen, className }, ref) {
  const live = project.links.filter((l) => l.href);
  const links = live.length ? live : project.links;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.01, y: -4 }}
      transition={spring}
      className={cn('rounded-2xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-emerald-500/5', className)}
    >
      <MagicCard className="h-full rounded-2xl">
        <div className="flex h-full flex-col p-2">
          <button
            type="button"
            onClick={() => onOpen(project.id)}
            className="flex min-h-0 w-full flex-1 flex-col rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Open ${project.title}`}
          >
            <motion.div layoutId={`media-${project.id}`} className="relative min-h-0 flex-1 overflow-hidden rounded-xl bg-muted">
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                <Cover project={project} />
              </div>
              {project.images?.length > 1 && (
                <Badge variant="secondary" className="absolute right-3 top-3 bg-background/70 backdrop-blur">
                  {project.images.length} shots
                </Badge>
              )}
            </motion.div>

            <div className="flex flex-col gap-2 px-3 pb-3 pt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{project.category}</span>
                <span className="font-mono">{project.year}</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">{project.title}</h3>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </div>
              <p className="line-clamp-2 text-sm leading-relaxed text-zinc-300">{project.tagline}</p>
            </div>
          </button>

          <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-3">
            <TechTags tech={project.tech} />
            <div className="flex flex-wrap gap-2">
              {links.map((l) => (
                <LinkButton key={l.label} {...l} size="sm" />
              ))}
            </div>
          </div>
        </div>
      </MagicCard>
    </motion.div>
  );
});

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
        className="fixed inset-0 bg-background/85 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />

      <div className="pointer-events-none relative mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-12">
        <motion.div
          className="pointer-events-auto fixed right-4 top-4 z-10 sm:right-8 sm:top-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <Button variant="outline" size="icon" onClick={onClose} className="bg-background/80 backdrop-blur" aria-label="Close">
            <X />
          </Button>
        </motion.div>

        <motion.div
          layoutId={`media-${project.id}`}
          className="pointer-events-auto relative aspect-[16/10] overflow-hidden rounded-2xl border bg-muted"
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
                className={cn(
                  'h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition-opacity sm:h-20 sm:w-32',
                  i === shot ? 'opacity-100 ring-2 ring-ring' : 'opacity-40 hover:opacity-80',
                )}
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
            <motion.p variants={rise} className="text-sm text-muted-foreground">
              {project.category} · {project.year}
            </motion.p>
            <motion.h2 variants={rise} className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
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
            <h3 className="text-sm font-medium text-foreground">Highlights</h3>
            <ul className="mt-3 divide-y border-y">
              {project.highlights.map((h) => (
                <li key={h} className="py-3 text-sm leading-relaxed text-zinc-300">
                  {h}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-sm font-medium text-foreground">Built with</h3>
            <TechTags tech={project.tech} className="mt-3" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function App() {
  const [openId, setOpenId] = useState(null);
  const [filter, setFilter] = useState('all');
  const open = openId ? byId[openId] : null;
  const visible = GRID_ORDER.map((id) => byId[id]).filter((p) => filter === 'all' || p.group === filter);

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease }}>
      {/* overflow-x-clip (not hidden) so the sticky filter bar still sticks */}
      <div className="relative min-h-screen overflow-x-clip">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-gradient-to-b from-emerald-500/[0.06] via-transparent to-transparent" aria-hidden="true" />

        <motion.header
          className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="font-mono text-sm font-medium text-foreground">skrunklevevo</span>
          <nav className="flex items-center gap-1">
            <Button asChild variant="ghost" size="sm">
              <a href="#work">Work</a>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <a href={GITHUB} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          </nav>
        </motion.header>

        <main className="mx-auto max-w-6xl px-4 sm:px-8">
          <motion.section className="pb-16 pt-14 sm:pb-24 sm:pt-24" variants={stagger} initial="hidden" animate="show">
            <motion.div variants={rise}>
              <Badge variant="outline" className="gap-2 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Engineering · UBC Okanagan · Year 1
              </Badge>
            </motion.div>
            <motion.h1 variants={rise} className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              I build apps, tools and mods <span className="text-muted-foreground">to fix problems I actually have.</span>
            </motion.h1>
            <motion.p variants={rise} className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              I'm skrunklevevo, a first-year engineering student in Kelowna building mobile-first apps, automation engines,
              custom tools and game mods.
            </motion.p>
            <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3">
              <LinkButton label="GitHub" href={GITHUB} icon="github" primary />
              <Button asChild variant="outline">
                <a href="#work">Selected work</a>
              </Button>
            </motion.div>
          </motion.section>

          <section id="work" className="scroll-mt-8">
            <div className="flex items-end justify-between border-t pt-6">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Selected work</h2>
              <span className="hidden font-mono text-xs text-muted-foreground sm:block">2024 — 2026</span>
            </div>

            <div className="mt-8">
              <FilterBar value={filter} onChange={setFilter} />
            </div>

            <BentoGrid className="mt-8 auto-rows-[28rem] md:grid-cols-2 lg:auto-rows-[25rem] lg:grid-cols-12">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpen={setOpenId}
                    className={filter === 'all' ? SPANS_ALL[project.id] : SPANS_FILTERED[i]}
                  />
                ))}
              </AnimatePresence>
            </BentoGrid>
          </section>

          <footer className="mt-24 flex flex-col gap-6 border-t py-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-2xl font-semibold tracking-tight text-foreground">Let's build something.</p>
              <Button asChild variant="link" className="h-auto px-0 text-muted-foreground hover:text-foreground">
                <a href={GITHUB} target="_blank" rel="noopener noreferrer">
                  github.com/skrunkleVEVO
                </a>
              </Button>
            </div>
            <p className="font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} skrunklevevo · Kelowna, BC</p>
          </footer>
        </main>

        <AnimatePresence>{open && <ProjectSheet key={open.id} project={open} onClose={() => setOpenId(null)} />}</AnimatePresence>
      </div>
    </MotionConfig>
  );
}
