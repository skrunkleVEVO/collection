import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import projects from './data/projects.json';
import profile from './data/profile.json';

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const CATEGORIES = ['All Projects', 'Software & Apps', 'Games & Mods', 'Academic & Engineering'];

const VIEWS = {
  personal: { label: 'Personal Projects', heading: 'Projects', blurb: profile.bio },
  eportfolio: { label: 'University ePortfolio', heading: 'ePortfolio', blurb: profile.eportfolioIntro },
};

const CATEGORY_STYLES = {
  'Software & Apps': {
    badge: 'bg-sky-500/15 text-sky-300 ring-sky-400/30',
    banner: 'from-sky-500/40 via-indigo-500/25 to-ink-800',
    glyph: '</>',
  },
  'Games & Mods': {
    badge: 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/30',
    banner: 'from-emerald-500/40 via-teal-500/25 to-ink-800',
    glyph: '▲▼',
  },
  'Academic & Engineering': {
    badge: 'bg-amber-500/15 text-amber-300 ring-amber-400/30',
    banner: 'from-amber-500/40 via-orange-500/25 to-ink-800',
    glyph: '⌬',
  },
};

// Relative paths in the JSON (e.g. "images/x.png") resolve against Vite's base,
// so they work both locally and under /<repo>/ on GitHub Pages.
const asset = (path) => (!path || /^https?:\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path}`);

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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  ),
  external: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  ),
  file: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M9 13h6M9 17h6" />
    </svg>
  ),
  close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...p}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function CategoryBadge({ category }) {
  const style = CATEGORY_STYLES[category]?.badge ?? 'bg-white/10 text-slate-300 ring-white/20';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${style}`}>
      {category}
    </span>
  );
}

function StatusDot({ status }) {
  const ongoing = status === 'Ongoing';
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
      <span className={`h-1.5 w-1.5 rounded-full ${ongoing ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
      {status}
    </span>
  );
}

// Shows the project image; falls back to a category gradient if it's missing or fails to load.
function Banner({ project, className = '' }) {
  const [failed, setFailed] = useState(false);
  const style = CATEGORY_STYLES[project.category];
  const showImage = project.image && !failed;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${style?.banner ?? 'from-ink-700 to-ink-800'} ${className}`}>
      {showImage ? (
        <img
          src={asset(project.image)}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="select-none font-mono text-4xl font-bold text-white/25">{style?.glyph ?? '◆'}</span>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
        </div>
      )}
    </div>
  );
}

function ProjectLinks({ project, size = 'sm' }) {
  const links = [
    project.githubUrl && { href: project.githubUrl, label: 'GitHub', icon: Icon.github },
    project.liveUrl && { href: project.liveUrl, label: 'Live Demo', icon: Icon.external },
    project.reportUrl && { href: asset(project.reportUrl), label: 'PDF Report', icon: Icon.file },
  ].filter(Boolean);

  if (!links.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {links.map(({ href, label, icon: LinkIcon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`link-btn ${size === 'lg' ? 'px-4 py-2 text-sm' : ''}`}
        >
          <LinkIcon className="h-3.5 w-3.5" />
          {label}
        </a>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero({ view }) {
  const socials = [
    profile.githubUrl && { href: profile.githubUrl, label: 'GitHub', icon: Icon.github },
    profile.linkedinUrl && { href: profile.linkedinUrl, label: 'LinkedIn', icon: Icon.linkedin },
    profile.email && { href: `mailto:${profile.email}`, label: 'Email', icon: Icon.mail },
    profile.resumeUrl && { href: asset(profile.resumeUrl), label: 'Résumé', icon: Icon.file },
  ].filter(Boolean);

  return (
    <header className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(124,156,255,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.10),transparent_50%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="animate-fade-up">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{profile.role}</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">{VIEWS[view].blurb}</p>
          {profile.location && <p className="mt-3 text-sm text-slate-500">{profile.location}</p>}

          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map(({ href, label, icon: SocialIcon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="link-btn px-4 py-2 text-sm"
              >
                <SocialIcon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="animate-fade-up rounded-2xl border border-white/10 bg-ink-900/70 p-6 backdrop-blur [animation-delay:120ms]">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Skills inventory</h2>
          <dl className="mt-5 space-y-5">
            {profile.skills.map(({ group, items }) => (
              <div key={group}>
                <dt className="text-xs font-medium text-slate-500">{group}</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span key={skill} className="chip">
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

function ViewToggle({ view, onChange }) {
  const isEportfolio = view === 'eportfolio';
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange('personal')}
        className={`text-sm font-semibold transition ${!isEportfolio ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
      >
        {VIEWS.personal.label}
      </button>
      <button
        type="button"
        role="switch"
        aria-checked={isEportfolio}
        aria-label="Toggle University ePortfolio view"
        onClick={() => onChange(isEportfolio ? 'personal' : 'eportfolio')}
        className={`relative h-7 w-14 shrink-0 rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
          isEportfolio ? 'border-amber-400/40 bg-amber-500/30' : 'border-accent/40 bg-accent/30'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
            isEportfolio ? 'translate-x-[30px]' : 'translate-x-0.5'
          }`}
        />
      </button>
      <button
        type="button"
        onClick={() => onChange('eportfolio')}
        className={`text-sm font-semibold transition ${isEportfolio ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
      >
        {VIEWS.eportfolio.label}
      </button>
    </div>
  );
}

function FilterTabs({ active, counts, onChange }) {
  return (
    <div role="tablist" aria-label="Filter projects by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {CATEGORIES.map((cat) => {
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
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              selected
                ? 'border-accent/60 bg-accent/15 text-white'
                : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200'
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            {cat}
            <span className={`rounded-full px-1.5 text-[11px] ${selected ? 'bg-accent/30 text-white' : 'bg-white/10 text-slate-400'}`}>
              {counts[cat]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Project card + drawer                                               */
/* ------------------------------------------------------------------ */

function ProjectCard({ project, onOpen, index }) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(project);
        }
      }}
      style={{ animationDelay: `${index * 50}ms` }}
      className="group flex animate-fade-up cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900 transition hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-accent/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Banner project={project} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <CategoryBadge category={project.category} />
          <StatusDot status={project.status} />
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-white">{project.title}</h3>
        {project.subtitle && <p className="text-sm text-slate-500">{project.subtitle}</p>}
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <ProjectLinks project={project} />
          <span className="shrink-0 text-xs font-medium text-accent opacity-0 transition group-hover:opacity-100">
            Details →
          </span>
        </div>
      </div>
    </article>
  );
}

function DrawerSection({ title, children }) {
  return (
    <section className="border-t border-white/5 pt-6">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</h3>
      <div className="mt-3 text-[15px] leading-relaxed text-slate-300">{children}</div>
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
  const reflections = project.reflections && (
    <DrawerSection key="reflections" title="Engineering reflections">
      <p className="border-l-2 border-amber-400/50 pl-4 italic text-slate-300">{project.reflections}</p>
    </DrawerSection>
  );

  const body = [
    project.problem && (
      <DrawerSection key="problem" title="Problem statement">
        <p>{project.problem}</p>
      </DrawerSection>
    ),
    project.solution && (
      <DrawerSection key="solution" title="Solution">
        <p>{project.solution}</p>
      </DrawerSection>
    ),
    project.features?.length > 0 && (
      <DrawerSection key="features" title="Key features">
        <ul className="space-y-2">
          {project.features.map((f) => (
            <li key={f} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </DrawerSection>
    ),
  ];

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-ink-900 shadow-2xl ring-1 ring-white/10 transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="relative">
          <Banner project={project} className="aspect-[16/7]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white backdrop-blur transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Icon.close className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 pb-10 sm:px-8">
          <div className="-mt-6 relative">
            <div className="flex flex-wrap items-center gap-3">
              <CategoryBadge category={project.category} />
              <StatusDot status={project.status} />
              {project.year && <span className="text-[11px] text-slate-500">{project.year}</span>}
            </div>
            <h2 id="drawer-title" className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {project.title}
            </h2>
            {project.subtitle && <p className="mt-1 text-slate-400">{project.subtitle}</p>}
            <p className="mt-4 text-[15px] leading-relaxed text-slate-300">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <ProjectLinks project={project} size="lg" />
            </div>
          </div>

          {view === 'eportfolio' ? [reflections, ...body] : [...body, reflections]}
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
    <div className="min-h-screen bg-ink-950">
      <Hero view={view} />

      <main id="projects" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-ink-900/60 p-5 sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">{VIEWS[view].heading}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {visible.length} {visible.length === 1 ? 'project' : 'projects'} · click a card for details
              </p>
            </div>
            <ViewToggle view={view} onChange={changeView} />
          </div>
          <FilterTabs active={category} counts={counts} onChange={setCategory} />
        </div>

        {visible.length > 0 ? (
          <div key={`${view}-${category}`} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} onOpen={openProject} index={i} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-slate-500">No projects in this category yet.</p>
        )}
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} {profile.name} · Built with React, Vite & Tailwind CSS
      </footer>

      <ProjectDrawer project={selected} open={drawerOpen} onClose={closeProject} view={view} />
    </div>
  );
}
