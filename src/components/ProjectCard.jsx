import { cx, pad, toCode } from '../lib/utils.js';
import { Cell, ProjectLinks, SpecTag, StatusDot, Ticks } from './ui.jsx';

/** Architecture layers drawn as a signal path: numbered nodes joined by a rail. */
function Pipeline({ layers, vertical = false }) {
  return (
    <ol className={cx('relative', vertical ? 'space-y-2' : 'grid grid-cols-2 gap-2 sm:grid-cols-4')}>
      {layers.map((l, i) => (
        <li key={l.layer} className="relative border border-zinc-800 bg-zinc-950/80 p-2.5 transition-colors group-hover:border-zinc-700">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-wider text-emerald-400/90">{l.layer}</span>
            <span className="font-mono text-[9px] text-zinc-600">{pad(i + 1)}</span>
          </div>
          <p className="mt-1.5 text-[11.5px] leading-snug text-zinc-500">{l.detail}</p>
          {!vertical && i < layers.length - 1 && (
            <span aria-hidden="true" className="absolute -right-2 top-1/2 hidden h-px w-2 bg-emerald-500/40 sm:block" />
          )}
        </li>
      ))}
    </ol>
  );
}

function Header({ project, ordinal }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="meta">
        // [{project.code}] <span className="text-zinc-700">· {pad(ordinal)}</span>
      </span>
      <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
        <StatusDot status={project.status} />
        {project.status}
      </span>
    </div>
  );
}

function Stack({ items, max = 99 }) {
  return (
    <div className="flex flex-wrap gap-1">
      {items.slice(0, max).map((t) => (
        <span key={t} className="spec-tag">
          {toCode(t)}
        </span>
      ))}
    </div>
  );
}

/** Full-cell invisible button so the card opens the drawer while links stay clickable above it. */
function OpenButton({ project, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-label={`Open spec sheet: ${project.title}`}
      className="absolute inset-0 z-0 cursor-pointer focus-visible:outline-offset-[-2px]"
    />
  );
}

const OpenHint = () => (
  <span className="pointer-events-none font-mono text-[10px] uppercase tracking-wider text-zinc-600 transition-colors group-hover:text-emerald-400">
    SPEC →
  </span>
);

export default function ProjectCard({ project, size, index, ordinal, onOpen }) {
  const body = {
    feature: (
      <div className="flex h-full flex-col gap-6 p-5 sm:p-7">
        <Header project={project} ordinal={ordinal} />
        <div className="pointer-events-none">
          <p className="meta text-emerald-400/80">FEATURED_BUILD // {toCode(project.category)}</p>
          <h3 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-zinc-50 sm:text-6xl">{project.title}</h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-zinc-500">{project.subtitle}</p>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-400">{project.summary}</p>
        </div>
        <div className="pointer-events-none mt-auto">
          <p className="meta mb-2">ARCH_PIPELINE</p>
          <Pipeline layers={project.architecture} />
        </div>
        <div className="flex flex-wrap items-end justify-between gap-3 border-t border-zinc-800/80 pt-4">
          <div className="pointer-events-none flex flex-wrap gap-1">
            <SpecTag k="YEAR" v={project.year} />
            <SpecTag k="TECH_STACK" v={project.techStack.map(toCode).join(' / ')} />
          </div>
          <div className="flex items-center gap-3">
            <ProjectLinks project={project} />
            <OpenHint />
          </div>
        </div>
      </div>
    ),
    wide: (
      <div className="grid h-full gap-5 p-5 sm:grid-cols-[1.25fr_1fr] sm:p-6">
        <div className="flex flex-col gap-4">
          <Header project={project} ordinal={ordinal} />
          <div className="pointer-events-none">
            <h3 className="text-2xl font-semibold tracking-[-0.02em] text-zinc-50">{project.title}</h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-zinc-500">{project.subtitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.summary}</p>
          </div>
          <div className="mt-auto flex items-center gap-3">
            <ProjectLinks project={project} />
            <OpenHint />
          </div>
        </div>
        <dl className="pointer-events-none self-start border border-zinc-800 font-mono text-[10.5px] uppercase">
          {[
            ['CLASS', toCode(project.category)],
            ['YEAR', project.year],
            ['STACK', project.techStack.map(toCode).join(' · ')],
            ['LAYERS', project.architecture.map((l) => l.layer).join(' → ')],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-[4.5rem_1fr] border-b border-zinc-800 last:border-b-0">
              <dt className="border-r border-zinc-800 px-2 py-2 text-zinc-600">{k}</dt>
              <dd className="px-2 py-2 leading-relaxed tracking-wide text-zinc-300">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    ),
    tall: (
      <div className="flex h-full flex-col gap-4 p-5">
        <Header project={project} ordinal={ordinal} />
        <div className="pointer-events-none">
          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-zinc-50">{project.title}</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-zinc-500">{project.subtitle}</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.summary}</p>
        </div>
        <ul className="pointer-events-none space-y-0 border-t border-zinc-800">
          {project.features.map((f, i) => (
            <li key={f} className="flex gap-2.5 border-b border-zinc-800/70 py-2 text-[12.5px] leading-snug text-zinc-400">
              <span className="font-mono text-[10px] text-emerald-500/70">{pad(i + 1)}</span>
              {f}
            </li>
          ))}
        </ul>
        <div className="pointer-events-none mt-auto">
          <Stack items={project.techStack} />
        </div>
        <div className="flex items-center justify-between gap-3">
          <ProjectLinks project={project} />
          <OpenHint />
        </div>
      </div>
    ),
    compact: (
      <div className="flex h-full flex-col gap-3 p-5">
        <Header project={project} ordinal={ordinal} />
        <div className="pointer-events-none">
          <h3 className="text-lg font-semibold tracking-[-0.015em] text-zinc-50">{project.title}</h3>
          <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-zinc-500">{project.summary}</p>
        </div>
        <div className="pointer-events-none mt-auto">
          <Stack items={project.techStack} max={3} />
        </div>
        <div className="flex items-center justify-between gap-3">
          <ProjectLinks project={project} />
          <OpenHint />
        </div>
      </div>
    ),
  }[size];

  return (
    <Cell as="article" size={size} index={index} className={size === 'feature' ? 'bg-zinc-950' : undefined}>
      {size === 'feature' && <div aria-hidden="true" className="blueprint absolute inset-0 -z-20 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />}
      <Ticks />
      <OpenButton project={project} onOpen={onOpen} />
      {/* Content ignores the pointer so clicks fall through to OpenButton; only links opt back in. */}
      <div className="pointer-events-none relative z-[1] h-full [&_.out-link-off]:pointer-events-auto [&_a]:pointer-events-auto">
        {body}
      </div>
    </Cell>
  );
}

export { Pipeline };
