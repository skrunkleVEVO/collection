const GITHUB = 'https://github.com/skrunkleVEVO';

// Empty href = no public destination yet; the button renders as a muted "coming soon" pill.
const PROJECTS = {
  auraflow: {
    title: 'AuraFlow',
    tagline: 'Android short-form video blocker',
    status: 'Active',
    description:
      'Blocks Reels, Shorts and Spotlight on-device while keeping DMs, profiles and the rest of each app fully usable. No accounts, no analytics, no network.',
    tech: ['Kotlin', 'Accessibility Service', 'Android SDK'],
    highlights: [
      'Detects short-form feeds through the accessibility view hierarchy',
      'Per-app toggles for Instagram, YouTube, Snapchat and more',
      'Redirects away from the feed without breaking messaging',
      'Runs entirely on-device with nothing collected',
    ],
    links: [
      { label: 'View on GitHub', href: `${GITHUB}/AuraFLow`, icon: 'github', primary: true },
      { label: 'Releases', href: `${GITHUB}/AuraFLow/releases`, icon: 'download' },
    ],
  },
  secondary: [
    {
      title: 'SomeFolio',
      tagline: 'Media hub',
      description:
        'Offline-first tracker for anime, manga, games, film and books with live search, ratings, notes and a "what\'s next?" spinner.',
      tech: ['React', 'PWA', 'Firebase'],
      icon: 'library',
      tint: 'from-sky-400/30 to-indigo-500/30',
      links: [
        { label: 'Live demo', href: 'https://skrunklevevo.github.io/SomeFolio/', icon: 'external', primary: true },
        { label: 'GitHub', href: `${GITHUB}/SomeFolio`, icon: 'github' },
      ],
    },
    {
      title: 'Planner & Scheduler',
      tagline: 'Productivity + Canvas automation',
      description:
        'Ranks tasks by urgency, runs focus sessions, syncs deadlines to the calendar and pulls new Canvas course files automatically.',
      tech: ['Python', 'React', 'Canvas API'],
      icon: 'calendar',
      tint: 'from-amber-400/30 to-orange-500/30',
      links: [
        { label: 'More on GitHub', href: GITHUB, icon: 'github' },
        { label: 'Repo coming soon', href: '' },
      ],
    },
    {
      title: 'Aeris Drone Suppression',
      tagline: 'APSC 169 engineering design',
      description:
        'Autonomous drone network concept that detects wildfires at ignition and coordinates early suppression, with human responders keeping final authority.',
      tech: ['Systems Design', 'CAD', 'Technical Brief'],
      icon: 'drone',
      tint: 'from-rose-400/30 to-red-500/30',
      links: [{ label: 'PDF report', href: '', icon: 'doc' }],
    },
    {
      title: 'Aura and Artifacts',
      tagline: 'Minecraft mod',
      description:
        'Branching Aura skill tree, artifact weapons that scale with your build, custom player animations and modpack integrations.',
      tech: ['Java', 'Forge / Fabric'],
      icon: 'cube',
      tint: 'from-violet-400/30 to-fuchsia-500/30',
      links: [
        { label: 'More on GitHub', href: GITHUB, icon: 'github' },
        { label: 'Download coming soon', href: '' },
      ],
    },
  ],
};

const STACK = ['Kotlin', 'Java', 'Python', 'JavaScript', 'Lua', 'React', 'Android SDK', 'Forge / Fabric', 'CAD'];

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
  download: <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 20h14" />,
  doc: <path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6" />,
  arrow: <path d="M5 12h14m0 0-5-5m5 5-5 5" />,
  library: <path d="M4 5h4v14H4zM10 5h4v14h-4zM16.5 5.5l3.8 1-3.4 13.2-3.9-1" />,
  calendar: <path d="M4 7h16v13H4zM4 11h16M8 3v4M16 3v4" />,
  drone: <path d="M9 12h6M12 10v4M5 6.5a2 2 0 1 0 0 .01M19 6.5a2 2 0 1 0 0 .01M5 17.5a2 2 0 1 0 0 .01M19 17.5a2 2 0 1 0 0 .01M7 8l3 3M17 8l-3 3M7 16l3-3M17 16l-3-3" />,
  cube: <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12 4 7.5" />,
  phone: <path d="M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2" />,
  pin: <path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
};

function Icon({ name, className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/* ---------- Primitives ---------- */

function WindowDots({ title }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-full bg-red-500/80" />
      <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
      <span className="h-3 w-3 rounded-full bg-green-500/80" />
      {title && <span className="ml-3 hidden text-xs sm:inline font-medium text-zinc-500">{title}</span>}
    </div>
  );
}

function StatusDot({ label = 'STATUS: ONLINE' }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      {label}
    </span>
  );
}

function LinkButton({ label, href, icon, primary, small = true }) {
  if (!href) {
    return (
      <span className="pill-disabled" title="Not public yet">
        {icon && <Icon name={icon} className="h-3.5 w-3.5" />}
        {label}
      </span>
    );
  }
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`${primary ? 'pill-primary' : 'pill'} ${small ? 'pill-sm' : ''}`}
    >
      {icon && <Icon name={icon} className={small ? 'h-3.5 w-3.5' : 'h-4 w-4'} />}
      {label}
    </a>
  );
}

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section className="glass animate-rise p-6 sm:p-10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 blur-3xl" />
      <div className="mb-10 flex items-center justify-between">
        <WindowDots title="~/skrunklevevo" />
        <StatusDot />
      </div>

      <div className="relative max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-white min-[400px]:text-5xl sm:text-7xl">skrunklevevo</h1>
        <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
          First-year engineering student at UBCO. I build mobile-first apps, automation engines, custom tools and game
          mods, mostly to fix problems I actually have.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-500">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="pin" className="h-4 w-4" />
            Kelowna, BC
          </span>
          <span>B.A.Sc. Engineering · Year 1</span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton label="GitHub" href={GITHUB} icon="github" primary small={false} />
          <LinkButton label="See projects" href="#projects" icon="arrow" small={false} />
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ project }) {
  return (
    <article className="glass glass-hover flex flex-col p-6 sm:p-8 md:col-span-2 lg:row-span-2">
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-transparent blur-3xl" />

      <div className="relative mb-8 flex items-center justify-between">
        <WindowDots title="AuraFlow.apk" />
        <span className="font-mono text-xs text-emerald-400">● {project.status.toUpperCase()}</span>
      </div>

      <div className="relative flex flex-1 flex-col gap-8 md:flex-row">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div className="app-icon bg-gradient-to-br from-emerald-400/30 to-cyan-500/30 text-emerald-200">
              <Icon name="phone" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Featured project</p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{project.title}</h2>
            </div>
          </div>
          <p className="mt-2 text-lg font-medium text-zinc-300">{project.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        </div>

        <ul className="flex-1 space-y-3 rounded-xl border border-white/5 bg-black/20 p-5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-8 flex flex-wrap gap-2">
        {project.links.map((l) => (
          <LinkButton key={l.label} {...l} small={false} />
        ))}
      </div>
    </article>
  );
}

function ProjectCard({ project, className = '' }) {
  return (
    <article className={`glass glass-hover flex flex-col p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className={`app-icon bg-gradient-to-br ${project.tint} text-white/90`}>
          <Icon name={project.icon} className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight text-white">{project.title}</h3>
          <p className="text-sm text-zinc-500">{project.tagline}</p>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="badge">{t}</span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-white/5 pt-4">
        {project.links.map((l) => (
          <LinkButton key={l.label} {...l} />
        ))}
      </div>
    </article>
  );
}

function StackCard() {
  return (
    <article className="glass glass-hover flex flex-col p-6">
      <p className="text-xs font-medium text-zinc-500">Toolbox</p>
      <h3 className="mt-1 text-lg font-semibold tracking-tight text-white">What I build with</h3>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {STACK.map((s) => (
          <span key={s} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-6">
        <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white">
          Everything else on GitHub
          <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}

export default function App() {
  const [somefolio, planner, aeris, aura] = PROJECTS.secondary;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="animate-drift absolute -left-40 top-0 h-[38rem] w-[38rem] rounded-full bg-gradient-to-tr from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl" />
        <div className="animate-drift absolute -right-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-gradient-to-bl from-cyan-500/10 via-indigo-500/5 to-transparent blur-3xl [animation-delay:-9s]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-gradient-to-tr from-emerald-500/5 to-transparent blur-3xl" />
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-16">
        <Hero />

        <div id="projects" className="mt-16 flex scroll-mt-8 items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Projects</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">Apps, tools, mods and engineering design work.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <FeaturedCard project={PROJECTS.auraflow} />
          <ProjectCard project={somefolio} />
          <ProjectCard project={planner} />
          <ProjectCard project={aeris} />
          <ProjectCard project={aura} />
          <StackCard />
        </div>

        <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} skrunklevevo · Built with React + Tailwind</p>
          <StatusDot label="Building from Kelowna, BC" />
        </footer>
      </main>
    </div>
  );
}
