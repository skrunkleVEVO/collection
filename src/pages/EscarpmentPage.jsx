import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Action } from '@/components/Action';
import { PageHeading } from '@/components/PageHeading';
import { escarpment as E, reportPdfUrl } from '@/data/portfolioData';
import { group, inView, rise, spring, tap } from '@/lib/motion';
import { cn } from '@/lib/utils';

const CHAPTERS = [
  ['problem', 'The problem'],
  ['phase-1', 'Phase 1'],
  ['phase-2', 'Phase 2'],
  ['phase-3', 'Phase 3'],
  ['phase-4', 'Phase 4'],
  ['site-gallery', 'On site'],
  ['final-report', 'Final report'],
];

const STATEMENT = 'max-w-[54ch] text-xl leading-[1.6] text-ink';

// Pinned under the header on wide screens; the chapter links start on the axis like the main tabs.
function ChapterNav() {
  const [active, setActive] = useState(CHAPTERS[0][0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    CHAPTERS.forEach(([id]) => observer.observe(document.getElementById(id)));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Project chapters" className="field sticky top-[4.3rem] z-30 lead-in hidden border-b border-line lg:block">
      <div className="journal">
        <p className="t-label flex min-h-12 items-center lg:col-span-5">{E.course} case study</p>
        <ul className="flex flex-wrap gap-x-7 lg:col-span-7">
          {CHAPTERS.map(([id, label]) => (
            <li key={id} className="relative">
              <motion.button
                type="button"
                {...tap}
                onClick={() => document.getElementById(id).scrollIntoView()}
                aria-current={active === id ? 'true' : undefined}
                className={cn('flex min-h-12 items-center text-[15px] tracking-[0.005em] transition-colors duration-200', active === id ? 'text-white' : 'text-soft hover-fine:text-ink')}
              >
                {label}
              </motion.button>
              {active === id && <motion.span layoutId="chapter-marker" transition={spring.sheet} className="absolute inset-x-0 -bottom-px h-px bg-accent" />}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// Title in the left zone, plain-language paragraph on the axis, then the evidence.
function Chapter({ id, title, plain, children, className }) {
  return (
    <section id={id} className={cn('sheet scroll-mt-32', className)}>
      <motion.div variants={group} {...inView} className="journal gap-y-6">
        <motion.h2 variants={rise} className="t-title text-white lg:col-span-5">
          {title}
        </motion.h2>
        <motion.p variants={rise} className={cn(STATEMENT, 'lg:col-span-7 lg:pt-[0.55rem]')}>
          {plain}
        </motion.p>
      </motion.div>
      <div className="lead-in">{children}</div>
    </section>
  );
}

function Subheading({ children, className }) {
  return <h3 className={cn('t-lead text-white', className)}>{children}</h3>;
}

// Findings set as a column of short entries: no boxes, just a title and its sentence.
function Points({ items, className }) {
  return (
    <motion.ul variants={group} {...inView} className={cn('grid grid-cols-1 gap-x-8 gap-y-8', className)}>
      {items.map(({ title, text }) => (
        <motion.li key={title} variants={rise} className="border-t border-line pt-4">
          <p className="text-lg font-medium leading-snug text-white">{title}</p>
          <p className="mt-2 max-w-[44ch] text-lg leading-relaxed text-ink">{text}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function StatBar() {
  return (
    <motion.dl variants={group} {...inView} className="journal lead-in gap-y-12">
      {E.stats.map(({ value, label, major }, index) => (
        <motion.div key={label} variants={rise} className={cn('flex flex-col-reverse justify-end border-t border-line pt-5', major ? (index === 0 ? 'lg:col-span-5' : 'lg:col-span-7') : 'lg:col-span-3', index === 2 && 'lg:col-start-6')}>
          <dt className="t-label mt-4 max-w-[26ch]">{label}</dt>
          <dd className={cn('tabular-nums', major ? 't-huge text-accent' : 't-title text-white')}>{value}</dd>
        </motion.div>
      ))}
    </motion.dl>
  );
}

// Two slopes over the same horizontal distance, drawn to scale.
function SlopeComparison() {
  return (
    <motion.figure variants={rise} {...inView} className="lg:col-span-7">
      <div className="space-y-10">
        {[
          { grade: 30, label: 'Up to 30%', note: 'The escarpment today' },
          { grade: 5, label: '5%', note: 'The proposed pathway' },
        ].map(({ grade, label, note }) => (
          <div key={grade} className="grid grid-cols-1 items-end gap-x-6 gap-y-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <svg viewBox="0 0 200 62" className="block w-full" role="img" aria-label={`A ${grade}% slope drawn to scale`}>
              <polygon points={`0,62 200,62 200,${62 - grade * 2}`} className={grade === 30 ? 'fill-accent' : 'fill-accent/50'} />
            </svg>
            <div>
              <p className="t-title whitespace-nowrap text-white">{label}</p>
              <p className="t-label mt-2">{note}</p>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="t-label mt-6 border-t border-line pt-3">Both slopes are drawn to scale over the same horizontal distance.</figcaption>
    </motion.figure>
  );
}

const SALIENCE_TONE = { Primary: 'font-medium text-accent', Secondary: 'text-ink', Tertiary: 'text-soft' };
const RATINGS = [
  ['power', 'Power'],
  ['urgency', 'Urgency'],
  ['legitimacy', 'Legitimacy'],
];

function StakeholderTable() {
  return (
    <motion.div variants={rise} {...inView} className="lg:col-span-7 lg:col-start-6">
      <div className="t-label hidden grid-cols-[minmax(0,1fr)_5.5rem_5.5rem_5.5rem_6.5rem] gap-3 border-b border-line-strong pb-3 md:grid" aria-hidden="true">
        <span>Stakeholder</span>
        {RATINGS.map(([, label]) => (
          <span key={label}>{label}</span>
        ))}
        <span>Salience</span>
      </div>
      <ul>
        {E.stakeholders.groups.map((row) => (
          <li key={row.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 border-b border-line py-3.5 transition-colors duration-200 hover-fine:bg-surface md:grid-cols-[minmax(0,1fr)_5.5rem_5.5rem_5.5rem_6.5rem] md:items-center">
            <p className="text-base leading-snug text-white">{row.name}</p>
            <dl className="col-span-2 row-start-2 grid grid-cols-3 gap-2 md:contents">
              {RATINGS.map(([key, label]) => (
                <div key={key} className="md:contents">
                  <dt className="text-[13px] leading-tight text-soft md:sr-only">{label}</dt>
                  <dd className={cn('text-[15px]', row[key] === 'High' ? 'text-white' : 'text-soft')}>{row[key]}</dd>
                </div>
              ))}
            </dl>
            <p className={cn('col-start-2 row-start-1 text-[15px] md:col-start-auto md:row-start-auto', SALIENCE_TONE[row.salience])}>{row.salience}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ConceptFunnel() {
  const { longlist, shortlist, selected } = E.ideation;
  return (
    <div className="journal gap-y-28">
      <motion.div variants={rise} {...inView} className="lg:col-span-5">
        <p className="t-huge text-white">{longlist.length}</p>
        <h3 className="t-lead mt-3 text-white">C-Sketch concepts</h3>
        <ul className="mt-6 columns-1 gap-x-8 border-t border-line pt-4 text-[15px] leading-relaxed text-soft sm:columns-2">
          {longlist.map((concept) => (
            <li key={concept} className="break-inside-avoid">
              {concept}
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div variants={rise} {...inView} className="lg:col-span-7">
        <p className="t-huge text-accent">{shortlist.length}</p>
        <h3 className="t-lead mt-3 text-white">Shortlisted solutions</h3>
        <ul className="mt-6 border-t border-line">
          {shortlist.map((solution) => (
            <li
              key={solution}
              className={cn(
                't-lead flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line py-2.5',
                solution === selected ? 'border-accent bg-accent px-4 text-ground' : 'text-ink',
              )}
            >
              {solution}
              {solution === selected && <span>carried forward</span>}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function WeightBreakdown() {
  const [focus, setFocus] = useState(null);
  const { criteria } = E.ideation;
  return (
    <motion.div variants={group} {...inView} className="lg:col-span-7">
      <Subheading>Weighted decision matrix: six criteria</Subheading>
      <div className="mt-6 flex h-3 gap-px overflow-hidden" aria-hidden="true">
        {criteria.map(({ name, weight }, index) => (
          <motion.span
            key={name}
            className="h-full origin-left bg-accent transition-opacity duration-150"
            style={{ width: `${weight}%`, opacity: focus === null || focus === name ? 1 - index * 0.12 : 0.15 }}
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: spring.sheet } }}
          />
        ))}
      </div>
      <ul className="mt-6 border-b border-line">
        {criteria.map(({ name, weight, why }) => (
          <motion.li
            key={name}
            variants={rise}
            onPointerEnter={() => setFocus(name)}
            onPointerLeave={() => setFocus(null)}
            className="grid grid-cols-[minmax(0,1fr)_4.5rem] items-baseline gap-x-4 border-t border-line py-3.5 transition-colors duration-200 hover-fine:bg-surface sm:grid-cols-[11rem_minmax(0,1fr)_5rem] sm:px-3"
          >
            <span className="text-lg font-medium text-white">{name}</span>
            <span className="col-span-2 row-start-2 mt-1 text-lg leading-snug text-ink sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:mt-0">{why}</span>
            <span className="t-lead text-right tabular-nums text-accent">{weight}%</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function PrototypeEntry({ title, subject, text, specs, image, results, wide }) {
  return (
    <motion.article variants={rise} className={cn(wide ? 'lg:col-span-12' : 'border-t border-line pt-6 lg:col-span-6', wide && 'journal gap-y-8 bg-surface p-6 sm:p-10')}>
      <div className={cn(wide && 'lg:col-span-5')}>
        <h3 className="t-title text-white">{subject}</h3>
        <p className="t-label mt-3">
          {title}. {E.prototypes.badge}.
        </p>
        <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-ink">{text}</p>
        {results && <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-ink">{results}</p>}
      </div>
      {(specs.length > 0 || image) && (
        <div className={cn(wide && 'lg:col-span-7')}>
          {specs.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 xl:grid-cols-3">
              {specs.map(({ label, value }) => (
                <div key={label} className="border-t border-line pt-3">
                  <dt className="t-label">{label}</dt>
                  <dd className="mt-1.5 text-lg text-white">{value}</dd>
                </div>
              ))}
            </dl>
          )}
          {image && <img src={image} alt={`${title}: ${subject}`} loading="lazy" className="mt-6 w-full" />}
        </div>
      )}
    </motion.article>
  );
}

// A gutterless mosaic: photographs and flat tiles butted together, captions on a tone step beneath.
const MOSAIC = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-6', 'lg:col-span-6'];

function MosaicTile({ item: { src, width, height, title, caption, credit }, span, index }) {
  return (
    <motion.figure variants={rise} className={cn('group flex flex-col bg-ground', span)}>
      {src ? (
        <div className="overflow-hidden">
          <img
            src={src}
            alt={`${title}: ${caption}`}
            width={width}
            height={height}
            loading="lazy"
            draggable="false"
            className="block aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover-fine:scale-[1.03]"
          />
        </div>
      ) : (
        <p className="t-label grid aspect-[16/10] place-items-center bg-surface px-4 text-center">Site photo to come</p>
      )}
      <figcaption className="flex-1 px-5 pb-8 pt-5 lg:p-7">
        <p className="text-lg font-medium text-white">{title}</p>
        <p className="mt-2 max-w-[52ch] text-lg leading-relaxed text-ink">{caption}</p>
        {credit && <p className="t-label mt-3">{credit}</p>}
      </figcaption>
    </motion.figure>
  );
}

function ReportViewer() {
  if (!reportPdfUrl) {
    return <p className="grid h-[min(60svh,30rem)] place-items-center bg-surface px-4 text-center text-lg text-ink">The final report will be embedded here once it is submitted.</p>;
  }
  return (
    <motion.figure variants={rise} {...inView} className="w-full overflow-hidden bg-surface">
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-4 py-3 sm:px-5">
        <span className="text-[15px] text-ink">{E.title}: final report</span>
        <Action label="Open PDF" href={reportPdfUrl} icon="external" className="shrink-0" />
      </figcaption>
      <iframe src={`${reportPdfUrl}#view=FitH`} title={`${E.title} final report`} className="block h-[min(90svh,72rem)] w-full border-0 bg-surface" />
    </motion.figure>
  );
}

export function EscarpmentPage({ headingAs = 'h1' }) {
  const { prototypes } = E;
  return (
    <article id="escarpment" className="scroll-mt-24">
      <PageHeading as={headingAs} title={E.title} lede={E.lede} wide action={{ label: 'Skip to my role', onClick: () => document.getElementById('phase-3').scrollIntoView() }} />
      <StatBar />
      <ChapterNav />

      <div className="space-y-[var(--section)] pt-[var(--section)]">
        <Chapter id="problem" title="A daily trip across a 30% grade" plain={E.overview.plain}>
          <div className="journal gap-y-14">
            <SlopeComparison />
            <Points items={E.overview.points} className="lg:col-span-5" />
          </div>
        </Chapter>

        <Chapter id="phase-1" title="Phase 1: Site and policy" plain={E.exploration.plain}>
          <div className="journal">
            <Points items={E.exploration.points} className="lg:col-span-7 lg:col-start-6 lg:grid-cols-3" />
          </div>
        </Chapter>

        <Chapter id="phase-2" title="Phase 2: Stakeholders" plain={E.stakeholders.plain}>
          <div className="journal items-start gap-y-14">
            <div className="lg:col-span-5 lg:row-start-1">
              <Subheading className="mb-6">Core design requirements</Subheading>
              <Points items={E.stakeholders.requirements} />
            </div>
            <StakeholderTable />
          </div>
        </Chapter>

        <Chapter id="phase-3" title="Phase 3: Ideas, then a matrix" plain={E.ideation.plain}>
          <ConceptFunnel />
          <div className="journal gap-y-12 pt-[calc(var(--lead-in)*2)]">
            <motion.div variants={rise} {...inView} className="field self-start bg-accent py-10 text-ground sm:py-14 lg:sticky lg:top-40 lg:col-span-5 lg:mx-0 lg:px-10">
              <h3 className="t-title">{E.ideation.contribution.title}</h3>
              <p className="mt-5 text-xl leading-relaxed">{E.ideation.contribution.text}</p>
            </motion.div>
            <WeightBreakdown />
          </div>
        </Chapter>

        <Chapter id="phase-4" title="Phase 4: Testing the pathway" plain={prototypes.plain}>
          <motion.div variants={group} {...inView} className="journal gap-y-16">
            {prototypes.items.map((item, index) => (
              <PrototypeEntry key={item.title} {...item} wide={index === prototypes.items.length - 1} />
            ))}
          </motion.div>
          <div className="journal gap-y-8 pt-[calc(var(--lead-in)*2)]">
            <Subheading className="lg:col-span-5">The trade-offs we accepted</Subheading>
            <Points items={prototypes.tradeoffs} className="lg:col-span-7 md:grid-cols-3" />
          </div>
        </Chapter>

        <Chapter id="site-gallery" title="Campus issues on site" plain={E.gallery.plain}>
          <motion.div variants={group} {...inView} className="grid grid-cols-1 gap-px bg-line lg:grid-cols-12">
            {E.gallery.items.map((item, index) => (
              <MosaicTile key={item.title} item={item} span={MOSAIC[index]} index={index} />
            ))}
          </motion.div>
        </Chapter>

        <Chapter id="final-report" title={E.report.title} plain={E.report.plain}>
          <ReportViewer />
        </Chapter>
      </div>
    </article>
  );
}
