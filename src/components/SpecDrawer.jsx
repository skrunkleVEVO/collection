import { useEffect, useRef, useState } from 'react';
import { asset, cx, pad, toCode, useAssetAvailable } from '../lib/utils.js';
import { Icon, ProjectLinks, StatusDot, Ticks } from './ui.jsx';

function Section({ id, n, title, children }) {
  return (
    <section id={`spec-${id}`} data-spec={id} className="scroll-mt-28 border-t border-zinc-800 px-5 py-6 sm:px-7">
      <h3 className="mb-4 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
        <span className="text-emerald-400">{pad(n)}</span>
        <span className="h-px w-6 bg-zinc-700" />
        {title}
      </h3>
      {children}
    </section>
  );
}

/** Drawing-style title block: the at-a-glance metadata of the sheet. */
function TitleBlock({ project }) {
  const rows = [
    ['DOC_ID', project.code],
    ['CLASS', toCode(project.category)],
    ['STATUS', project.status.toUpperCase()],
    ['REV', project.year],
    ['VIEW', project.modes.map((m) => (m === 'university' ? 'UNI' : 'PERS')).join(' + ')],
    ['STACK', project.techStack.map(toCode).join(' · ')],
  ];
  return (
    <dl className="grid grid-cols-2 border border-zinc-800 bg-zinc-950/70 font-mono text-[10.5px] uppercase sm:grid-cols-3">
      {rows.map(([k, v], i) => (
        <div
          key={k}
          className={cx('border-b border-r border-zinc-800 px-3 py-2.5', k === 'STACK' && 'col-span-2 sm:col-span-3 border-r-0 border-b-0', i % 2 === 1 && 'max-sm:border-r-0', (i + 1) % 3 === 0 && 'sm:border-r-0')}
        >
          <dt className="text-[9px] tracking-[0.18em] text-zinc-600">{k}</dt>
          <dd className="mt-1 tracking-wider text-zinc-200">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Interactive stack: hover or focus a layer to trace its position in the system. */
function ArchitectureDiagram({ layers }) {
  const [hot, setHot] = useState(null);
  return (
    <ol className="relative space-y-3 pl-8">
      <span aria-hidden="true" className="absolute bottom-4 left-[11px] top-4 w-px bg-gradient-to-b from-emerald-500/50 via-zinc-700 to-zinc-800" />
      {layers.map((l, i) => (
        <li
          key={l.layer}
          tabIndex={0}
          onMouseEnter={() => setHot(i)}
          onMouseLeave={() => setHot(null)}
          onFocus={() => setHot(i)}
          onBlur={() => setHot(null)}
          className={cx(
            'relative border bg-zinc-950/80 px-4 py-3 outline-none transition-colors',
            hot === i ? 'border-emerald-400/50' : 'border-zinc-800'
          )}
        >
          <span
            aria-hidden="true"
            className={cx(
              'absolute -left-8 top-1/2 grid h-[22px] w-[22px] -translate-y-1/2 place-items-center border font-mono text-[9px] transition-colors',
              hot === i ? 'border-emerald-400 bg-emerald-400 text-zinc-950' : 'border-zinc-700 bg-zinc-950 text-zinc-400'
            )}
          >
            {pad(i + 1)}
          </span>
          <span aria-hidden="true" className="absolute -left-[10px] top-1/2 h-px w-2.5 bg-zinc-700" />
          <div className="flex items-baseline justify-between gap-3">
            <span className={cx('font-mono text-[11px] tracking-[0.16em] transition-colors', hot === i ? 'text-emerald-300' : 'text-zinc-300')}>
              {l.layer}
            </span>
            <span className="font-mono text-[9px] text-zinc-600">L{i}</span>
          </div>
          <p className="mt-1 text-[13.5px] leading-relaxed text-zinc-400">{l.detail}</p>
        </li>
      ))}
    </ol>
  );
}

function ReportViewer({ url }) {
  const state = useAssetAvailable(url);
  if (state === 'ok') {
    return (
      <div className="border border-zinc-800">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          <span>{url.split('/').pop()}</span>
          <a href={asset(url)} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-zinc-300 hover:text-emerald-300">
            <Icon name="expand" /> OPEN FULL
          </a>
        </div>
        <iframe title="Report PDF" src={`${asset(url)}#view=FitH`} className="h-[70vh] w-full bg-zinc-900" />
      </div>
    );
  }
  return (
    <div className="hatch grid h-40 place-items-center border border-dashed border-zinc-800 font-mono text-[10.5px] uppercase tracking-wider text-zinc-500">
      {state === 'checking' ? 'LOCATING DOCUMENT…' : 'REPORT PDF PENDING UPLOAD'}
    </div>
  );
}

export default function SpecDrawer({ project, open, onClose, onStep, position }) {
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const [activeSection, setActiveSection] = useState(null);
  const handlers = useRef({ onClose, onStep });
  handlers.current = { onClose, onStep };

  // Keyboard: Esc closes, arrows step through the current view's projects.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') handlers.current.onClose();
      else if (e.key === 'ArrowRight') handlers.current.onStep(1);
      else if (e.key === 'ArrowLeft') handlers.current.onStep(-1);
    };
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [open]);

  // Reset scroll on project change and track which section is in view.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root || !project) return;
    root.scrollTop = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.dataset.spec);
      },
      { root, rootMargin: '-25% 0px -60% 0px' }
    );
    root.querySelectorAll('[data-spec]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [project]);

  const sections = project
    ? [
        project.brief && ['brief', 'Engineering Brief'],
        ['problem', 'Problem'],
        ['solution', 'Solution'],
        ['architecture', 'Architecture'],
        ['spec', 'Spec / Features'],
        ['reflection', 'Reflection'],
        project.reportUrl && ['report', 'Report'],
        ['links', 'Links'],
      ].filter(Boolean)
    : [];
  const num = (id) => sections.findIndex(([s]) => s === id) + 1;

  return (
    <div className={cx('fixed inset-0 z-50', open ? 'pointer-events-auto' : 'pointer-events-none')} aria-hidden={!open} inert={open ? undefined : ''}>
      <div
        onClick={onClose}
        className={cx('absolute inset-0 bg-black/70 backdrop-blur-[2px] transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0')}
      />
      <aside
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={project ? `${project.title} spec sheet` : 'Spec sheet'}
        className={cx(
          'blueprint absolute inset-y-0 right-0 flex w-full max-w-[44rem] flex-col border-l border-emerald-500/20 shadow-[-24px_0_80px_-20px_rgba(0,0,0,0.9)] outline-none transition-transform duration-[380ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {project && (
          <>
            {/* Control bar */}
            <div className="flex h-11 shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-3 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
              <span className="flex items-center gap-2 pl-2">
                <span className="text-emerald-400">// SPEC_SHEET</span>
                <span className="hidden sm:inline">[{project.code}]</span>
                <span className="text-zinc-700">
                  {pad(position.index + 1)}/{pad(position.total)}
                </span>
              </span>
              <span className="flex items-center">
                {[
                  ['left', -1, 'Previous project'],
                  ['right', 1, 'Next project'],
                ].map(([icon, dir, label]) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => onStep(dir)}
                    aria-label={label}
                    className="grid h-8 w-8 place-items-center text-zinc-400 transition-colors hover:text-emerald-300"
                  >
                    <Icon name={icon} className="h-3.5 w-3.5" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-1 flex h-8 items-center gap-1.5 border border-zinc-800 px-2 text-zinc-400 transition-colors hover:border-emerald-400/60 hover:text-emerald-300"
                >
                  ESC <Icon name="x" className="h-3 w-3" />
                </button>
              </span>
            </div>

            <div ref={scrollRef} className="relative flex-1 overflow-y-auto overscroll-contain">
              {/* Title */}
              <div className="relative px-5 pb-6 pt-7 sm:px-7">
                <Ticks tone="border-emerald-500/40" />
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  <StatusDot status={project.status} /> STATUS: {project.status}
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-zinc-50 sm:text-[2.6rem] sm:leading-[1.05]">{project.title}</h2>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-emerald-400/80">{project.subtitle}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">{project.summary}</p>
                <div className="mt-5">
                  <TitleBlock project={project} />
                </div>
                <ProjectLinks project={project} className="mt-4" />
              </div>

              {/* Section index */}
              <nav className="sticky top-0 z-10 flex gap-px overflow-x-auto border-y border-zinc-800 bg-zinc-950/95 px-3 font-mono text-[10px] uppercase tracking-[0.14em] backdrop-blur [scrollbar-width:none]">
                {sections.map(([id, title], i) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollRef.current?.querySelector(`#spec-${id}`)?.scrollIntoView({ behavior: 'smooth' })}
                    className={cx(
                      'shrink-0 border-b px-2.5 py-2.5 transition-colors',
                      activeSection === id ? 'border-emerald-400 text-emerald-300' : 'border-transparent text-zinc-500 hover:text-zinc-300'
                    )}
                  >
                    {pad(i + 1)} {title.split(' ')[0]}
                  </button>
                ))}
              </nav>

              {project.brief && (
                <Section id="brief" n={num('brief')} title="Engineering Brief">
                  <ol className="space-y-px">
                    {project.brief.map((b, i) => {
                      const [head, ...rest] = b.split(': ');
                      return (
                        <li key={b} className="grid grid-cols-[2rem_1fr] border border-zinc-800 bg-zinc-950/70">
                          <span className="border-r border-zinc-800 py-3 text-center font-mono text-[10px] text-emerald-400">{pad(i + 1)}</span>
                          <p className="px-3 py-3 text-[14px] leading-relaxed text-zinc-400">
                            {rest.length ? (
                              <>
                                <b className="font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-200">{head}</b> {rest.join(': ')}
                              </>
                            ) : (
                              b
                            )}
                          </p>
                        </li>
                      );
                    })}
                  </ol>
                </Section>
              )}

              <Section id="problem" n={num('problem')} title="Problem">
                <p className="border-l-2 border-red-400/50 pl-4 text-[15px] leading-relaxed text-zinc-300">{project.problem}</p>
              </Section>

              <Section id="solution" n={num('solution')} title="Solution">
                <p className="border-l-2 border-emerald-400/60 pl-4 text-[15px] leading-relaxed text-zinc-300">{project.solution}</p>
              </Section>

              <Section id="architecture" n={num('architecture')} title="Architecture">
                <ArchitectureDiagram layers={project.architecture} />
              </Section>

              <Section id="spec" n={num('spec')} title="Spec / Features">
                <ul className="grid gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
                  {project.features.map((f, i) => (
                    <li key={f} className="bg-zinc-950 p-3.5">
                      <span className="font-mono text-[9px] tracking-[0.18em] text-zinc-600">FEAT_{pad(i + 1)}</span>
                      <p className="mt-1 text-[13.5px] leading-snug text-zinc-300">{f}</p>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="reflection" n={num('reflection')} title="Reflection">
                <blockquote className="relative border border-zinc-800 bg-zinc-950/70 p-5 text-[15px] italic leading-relaxed text-zinc-300">
                  <span className="absolute -top-2 left-4 bg-[#08090b] px-1.5 font-mono text-[9px] not-italic tracking-[0.18em] text-zinc-500">
                    OPERATOR_LOG
                  </span>
                  {project.reflections}
                </blockquote>
              </Section>

              {project.reportUrl && (
                <Section id="report" n={num('report')} title="Report">
                  <ReportViewer url={project.reportUrl} />
                </Section>
              )}

              <Section id="links" n={num('links')} title="Links">
                <ProjectLinks project={project} />
              </Section>

              <div className="border-t border-zinc-800 px-5 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-700 sm:px-7">
                // END {project.code} · ← → TO CYCLE · ESC TO CLOSE
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
