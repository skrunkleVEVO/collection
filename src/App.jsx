import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import projects from './data/projects.json';
import profile from './data/profile.json';

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const CATEGORIES = ['All Projects', 'Software & Apps', 'Games & Mods', 'Academic & Engineering'];

const VIEWS = {
  personal: { label: 'Personal', code: 'MODE::PERSONAL', heading: 'Project Index', blurb: profile.bio },
  eportfolio: { label: 'ePortfolio', code: 'MODE::EPORTFOLIO', heading: 'ePortfolio Index', blurb: profile.eportfolioIntro },
};

const CATEGORY_GLYPHS = {
  'Software & Apps': '</>',
  'Games & Mods': '▲▼',
  'Academic & Engineering': '⌬',
};

// "Software & Apps" -> "SOFTWARE_APPS"
const toCode = (text) =>
  text
    .toUpperCase()
    .replace(/ENGINEERING/g, 'ENG')
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_|_$/g, '');

const pad = (n) => String(n).padStart(2, '0');

// Relative paths in the JSON (e.g. "images/x.png") resolve against Vite's base,
// so they work both locally and under /<repo>/ on GitHub Pages.
const asset = (path) => (!path || /^https?:\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path}`);

const githubHandle = profile.githubUrl?.split('/').filter(Boolean).pop();

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const Icon = {
  github: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  ),
  linkedin: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true" {...p}>
      <rect x="2" y="4" width="20" height="16" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  ),
  external: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true" {...p}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  ),
  file: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true" {...p}>
      <path d="M14 2H5v20h14V7z" />
      <path d="M14 2v5h5M9 13h6M9 17h6" />
    </svg>
  ),
  close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true" {...p}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function StatusIndicator({ status }) {
  const active = status === 'Ongoing';
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] ${
        active ? 'text-emerald-400' : 'text-zinc-500'
      }`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {active && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
            active ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]' : 'bg-zinc-600'
          }`}
        />
      </span>
      {active ? 'Active' : status}
    </span>
  );
}

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return <time className="tabular-nums">{now.toLocaleTimeString('en-GB', { hour12: false })}</time>;
}

// Shows the project image; falls back to a hatched placeholder if it's missing or fails to load.
function Banner({ project, className = '' }) {
  const [failed, setFailed] = useState(false);
  const showImage = project.image && !failed;

  return (
    <div className={`relative overflow-hidden border-b border-zinc-800/80 ${className}`}>
      {showImage ? (
        <img
          src={asset(project.image)}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover opacity-80 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
        />
      ) : (
        <div className="hatch flex h-full w-full items-center justify-center">
          <span className="select-none font-mono text-4xl font-bold text-zinc-700 transition-colors duration-300 group-hover:text-zinc-400">
            {CATEGORY_GLYPHS[project.category] ?? '◆'}
          </span>
          <span className="label absolute left-3 top-2.5 text-zinc-600">ID::{project.id}</span>
          <span className="label absolute bottom-2.5 right-3 text-zinc-600">IMG_PENDING</span>
        </div>
      )}
    </div>
  );
}

function ProjectLinks({ project }) {
  const links = [
    project.githubUrl && { href: project.githubUrl, label: 'Source', icon: Icon.github },
    project.liveUrl && { href: project.liveUrl, label: 'Live', icon: Icon.external },
    project.reportUrl && { href: asset(project.reportUrl), label: 'Report', icon: Icon.file },
  ].filter(Boolean);

  if (!links.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {links.map(({ href, label, icon: LinkIcon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="link-btn"
        >
          <LinkIcon className="h-3 w-3" />
          {label}
        </a>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

function ViewToggle({ view, onChange }) {
  return (
    <div role="group" aria-label="Portfolio view" className="flex border border-zinc-800 bg-zinc-900/60 p-0.5">
      {Object.entries(VIEWS).map(([key, { label }]) => {
        const selected = view === key;
        return (
          <button
            key={key}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(key)}
            className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors focus:outline-none focus-visible:text-emerald-400 ${
              selected ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-500 hover:text-zinc-200'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function NavBar({ view, onViewChange }) {
  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#index" className="flex items-center gap-2.5 font-mono text-xs text-zinc-100">
          <span className="h-2.5 w-2.5 bg-emerald-400" aria-hidden="true" />
          <span className="font-semibold">{githubHandle || profile.name}</span>
          <span className="hidden text-zinc-600 sm:inline">/ portfolio</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {[
            ['#index', '00', 'Index'],
            ['#modules', '01', 'Modules'],
            ['#contact', '02', 'Contact'],
          ].map(([href, n, label]) => (
            <a key={href} href={href} className="label transition-colors hover:text-zinc-100">
              <span className="text-zinc-700">{n}</span> {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="label hidden lg:inline">
            LOCAL <Clock />
          </span>
          <ViewToggle view={view} onChange={onViewChange} />
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function SpecRow({ k, children }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-zinc-800/80 py-2.5 last:border-b-0">
      <dt className="label">{k}</dt>
      <dd className="text-right font-mono text-xs text-zinc-200">{children}</dd>
    </div>
  );
}

function Hero({ view, stats }) {
  const socials = [
    profile.githubUrl && { href: profile.githubUrl, label: 'GitHub', icon: Icon.github },
    profile.linkedinUrl && { href: profile.linkedinUrl, label: 'LinkedIn', icon: Icon.linkedin },
    profile.email && { href: `mailto:${profile.email}`, label: 'Email', icon: Icon.mail },
    profile.resumeUrl && { href: asset(profile.resumeUrl), label: 'Résumé', icon: Icon.file },
  ].filter(Boolean);

  return (
    <header id="index" className="relative scroll-mt-14 overflow-hidden border-b border-zinc-800/80">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 md:pt-16">
        <div className="label flex items-center justify-between">
          <span>// 00_Operator</span>
          <span className="text-emerald-400/80">{VIEWS[view].code}</span>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          <div className="animate-fade-up">
            <p className="font-mono text-xs text-emerald-400">
              <span className="text-zinc-600">$</span> whoami
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-[0.92] tracking-tighter text-zinc-100 sm:text-6xl md:text-7xl">
              {profile.name}
              <span className="cursor-blink text-emerald-400">_</span>
            </h1>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-zinc-400">{profile.role}</p>
            <p className="mt-8 max-w-xl border-l border-zinc-800 pl-5 text-[15px] leading-relaxed text-zinc-400">
              {VIEWS[view].blurb}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {socials.map(({ href, label, icon: SocialIcon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="link-btn px-3 py-1.5"
                >
                  <SocialIcon className="h-3.5 w-3.5" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          <aside
            className="brackets relative animate-fade-up self-start border border-zinc-800/80 bg-zinc-900/60 [animation-delay:120ms]"
            aria-label="Profile summary"
          >
            <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-2.5">
              <span className="label text-zinc-400">Spec_Sheet</span>
              <span className="label">REV.{new Date().getFullYear()}</span>
            </div>
            <dl className="px-4 py-1">
              {githubHandle && <SpecRow k="Handle">@{githubHandle}</SpecRow>}
              {profile.location && <SpecRow k="Location">{profile.location}</SpecRow>}
              <SpecRow k="Modules">{pad(stats.total)}</SpecRow>
              <SpecRow k="Active_Builds">
                <span className="inline-flex items-center gap-2">
                  <StatusIndicator status="Ongoing" />
                  <span>{pad(stats.active)}</span>
                </span>
              </SpecRow>
              <SpecRow k="Shipped">{pad(stats.total - stats.active)}</SpecRow>
              <SpecRow k="Last_Update">{stats.latestYear}</SpecRow>
            </dl>
          </aside>
        </div>

        <div className="mt-14 border-t border-zinc-800/80 pt-6">
          <p className="label">// Skills_Inventory</p>
          <dl className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {profile.skills.map(({ group, items }, i) => (
              <div key={group}>
                <dt className="font-mono text-[11px] text-zinc-500">
                  <span className="text-zinc-700">{pad(i + 1)}.</span> {group}
                </dt>
                <dd className="mt-2.5 flex flex-wrap gap-1">
                  {items.map((skill) => (
                    <span key={skill} className="tag">
                      {skill}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

function FilterTabs({ active, counts, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className="-mx-4 flex overflow-x-auto border-y border-zinc-800/80 px-4 sm:mx-0 sm:border-x sm:px-0"
    >
      {CATEGORIES.map((cat, i) => {
        const selected = active === cat;
        const disabled = counts[cat] === 0;
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={selected}
            disabled={disabled}
            onClick={() => onChange(cat)}
            className={`relative flex shrink-0 items-center gap-2 border-r border-zinc-800/80 px-4 py-3 font-mono text-[11px] uppercase tracking-wider transition-colors last:border-r-0 focus:outline-none focus-visible:bg-zinc-900 ${
              selected ? 'bg-zinc-900/60 text-zinc-100' : 'text-zinc-500 hover:bg-zinc-900/40 hover:text-zinc-200'
            } disabled:cursor-not-allowed disabled:opacity-30`}
          >
            {selected && <span className="absolute inset-x-0 -bottom-px h-px bg-emerald-400" />}
            <span className="text-zinc-700">{pad(i)}</span>
            {toCode(cat)}
            <span className={selected ? 'text-emerald-400' : 'text-zinc-600'}>[{pad(counts[cat])}]</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Project card + drawer                                               */
/* ------------------------------------------------------------------ */

function ProjectCard({ project, onOpen, index, total }) {
  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${project.title}: open details`}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(project);
        }
      }}
      style={{ animationDelay: `${index * 50}ms` }}
      className="group brackets relative flex animate-fade-up cursor-pointer flex-col border border-zinc-800/80 bg-zinc-900/60 transition duration-200 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:border-zinc-500 hover:shadow-[6px_6px_0_0_#27272a] focus:outline-none focus-visible:border-emerald-400"
    >
      <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
          <span className="text-zinc-300">
            [{pad(index + 1)}/{pad(total)}]
          </span>{' '}
          {toCode(project.category)}
        </span>
        <StatusIndicator status={project.status} />
      </div>

      <Banner project={project} className="aspect-[16/8]" />

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-tight tracking-tight text-zinc-100">{project.title}</h3>
          {project.featured && <span className="label mt-1 shrink-0 text-emerald-400">★ Pinned</span>}
        </div>
        {project.subtitle && <p className="mt-1 font-mono text-[11px] text-zinc-500">{project.subtitle}</p>}
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1">
          {project.techStack.map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-zinc-800/80 px-4 py-2.5">
        <ProjectLinks project={project} />
        <span className="label ml-auto shrink-0 transition-colors group-hover:text-emerald-400">
          {project.year} · Open →
        </span>
      </div>
    </article>
  );
}

function DrawerSection({ n, title, children }) {
  return (
    <section className="border-t border-zinc-800/80 pt-6">
      <h3 className="label">
        <span className="text-emerald-400">{pad(n)}</span> // {toCode(title)}
      </h3>
      <div className="mt-3 text-[15px] leading-relaxed text-zinc-300">{children}</div>
    </section>
  );
}

function ProjectDrawer({ project, open, onClose, view }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!project) return null;

  // In the ePortfolio view, reflections come first since that's what assessors read.
  const reflections = project.reflections && {
    key: 'reflections',
    title: 'Engineering reflections',
    content: <p className="border-l border-emerald-400/60 pl-4 text-zinc-300">{project.reflections}</p>,
  };

  const body = [
    project.problem && { key: 'problem', title: 'Problem statement', content: <p>{project.problem}</p> },
    project.solution && { key: 'solution', title: 'Solution', content: <p>{project.solution}</p> },
    project.features?.length > 0 && {
      key: 'features',
      title: 'Key features',
      content: (
        <ul className="space-y-2">
          {project.features.map((f, i) => (
            <li key={f} className="flex gap-3">
              <span className="mt-[3px] shrink-0 font-mono text-[11px] text-zinc-600">{pad(i + 1)}</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  const sections = (view === 'eportfolio' ? [reflections, ...body] : [...body, reflections]).filter(Boolean);

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-zinc-950/70 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`absolute inset-y-0 right-0 flex w-full max-w-xl flex-col border-l border-zinc-800 bg-zinc-950 transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-zinc-800/80 px-5">
          <span className="label">
            File // <span className="text-zinc-300">{project.id}.json</span>
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="link-btn px-2 py-1"
          >
            <span className="text-zinc-500">Esc</span>
            <Icon.close className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Banner project={project} className="aspect-[16/7]" />

          <div className="space-y-6 px-5 pb-12 pt-6 sm:px-8">
            <div>
              <StatusIndicator status={project.status} />
              <h2 id="drawer-title" className="mt-3 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                {project.title}
              </h2>
              {project.subtitle && <p className="mt-1 font-mono text-xs text-zinc-500">{project.subtitle}</p>}
              <p className="mt-5 text-[15px] leading-relaxed text-zinc-300">{project.description}</p>

              <dl className="mt-6 grid grid-cols-3 border border-zinc-800/80 bg-zinc-900/60">
                {[
                  ['Category', toCode(project.category)],
                  ['Status', project.status],
                  ['Year', project.year],
                ].map(([k, v]) => (
                  <div key={k} className="border-r border-zinc-800/80 px-3 py-2.5 last:border-r-0">
                    <dt className="label">{k}</dt>
                    <dd className="mt-1 font-mono text-xs text-zinc-200">{v || '—'}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4 flex flex-wrap gap-1">
                {project.techStack.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <ProjectLinks project={project} />
              </div>
            </div>

            {sections.map(({ key, title, content }, i) => (
              <DrawerSection key={key} n={i + 1} title={title}>
                {content}
              </DrawerSection>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  const [view, setView] = useState('personal');
  const [category, setCategory] = useState('All Projects');
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Personal view shows everything; ePortfolio view shows projects flagged "eportfolio": true.
  const pool = useMemo(
    () =>
      projects
        .filter((p) => view === 'personal' || p.eportfolio)
        .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))),
    [view]
  );

  const counts = useMemo(
    () =>
      Object.fromEntries(
        CATEGORIES.map((c) => [c, c === 'All Projects' ? pool.length : pool.filter((p) => p.category === c).length])
      ),
    [pool]
  );

  const stats = useMemo(
    () => ({
      total: pool.length,
      active: pool.filter((p) => p.status === 'Ongoing').length,
      latestYear: pool.reduce((max, p) => (p.year > max ? p.year : max), '—'),
    }),
    [pool]
  );

  const visible = category === 'All Projects' ? pool : pool.filter((p) => p.category === category);

  const changeView = (next) => {
    setView(next);
    setCategory(next === 'eportfolio' ? 'Academic & Engineering' : 'All Projects');
  };

  const closeTimer = useRef(null);

  const openProject = (project) => {
    clearTimeout(closeTimer.current);
    setSelected(project);
    requestAnimationFrame(() => setDrawerOpen(true));
  };

  // Unmount the drawer content after the slide-out transition finishes.
  const closeProject = useCallback(() => {
    setDrawerOpen(false);
    closeTimer.current = setTimeout(() => setSelected(null), 300);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950">
      <NavBar view={view} onViewChange={changeView} />
      <Hero view={view} stats={stats} />

      <main id="modules" className="mx-auto max-w-6xl scroll-mt-14 px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label">// 01_Modules</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">{VIEWS[view].heading}</h2>
          </div>
          <p className="label">
            Showing <span className="text-zinc-200">{pad(visible.length)}</span> of {pad(pool.length)} · Select a module to inspect
          </p>
        </div>

        <div className="mt-8">
          <FilterTabs active={category} counts={counts} onChange={setCategory} />
        </div>

        {visible.length > 0 ? (
          <div key={`${view}-${category}`} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} onOpen={openProject} index={i} total={visible.length} />
            ))}
          </div>
        ) : (
          <p className="label mt-16 border border-dashed border-zinc-800 py-12 text-center">No modules in this category yet.</p>
        )}
      </main>

      <footer id="contact" className="border-t border-zinc-800/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span className="label">
            © {new Date().getFullYear()} {profile.name} · Built with React / Vite / Tailwind
          </span>
          <span className="label flex items-center gap-4">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="transition-colors hover:text-zinc-100">
                {profile.email}
              </a>
            )}
            <StatusIndicator status="Ongoing" />
          </span>
        </div>
      </footer>

      <ProjectDrawer project={selected} open={drawerOpen} onClose={closeProject} view={view} />
    </div>
  );
}
