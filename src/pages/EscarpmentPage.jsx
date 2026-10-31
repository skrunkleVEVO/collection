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
  ['site-gallery', 'Site gallery'],
  ['final-report', 'Final report'],
];

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
    <nav aria-label="Project chapters" className="sticky top-24 hidden self-start xl:block">
      <ul className="space-y-0.5 border-l border-white/10">
        {CHAPTERS.map(([id, label]) => (
          <li key={id} className="relative">
            {active === id && <motion.span layoutId="chapter-marker" transition={spring.press} className="absolute -left-px inset-y-1 w-px bg-white" />}
            <motion.button
              type="button"
              {...tap}
              onClick={() => document.getElementById(id).scrollIntoView()}
              aria-current={active === id ? 'true' : undefined}
              className={cn('flex min-h-10 w-full items-center pl-4 text-left text-sm transition-colors duration-150', active === id ? 'text-white' : 'text-soft hover-fine:text-ink')}
            >
              {label}
            </motion.button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Chapter({ id, kicker, title, plain, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-white/10 pt-8 sm:pt-12">
      <motion.div variants={group} {...inView} className="max-w-[46rem]">
        {kicker && (
          <motion.p variants={rise} className="text-[15px] text-soft">
            {kicker}
          </motion.p>
        )}
        <motion.h2 variants={rise} className="mt-2 font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-white">
          {title}
        </motion.h2>
        <motion.p variants={rise} className="mt-5 text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">
          {plain}
        </motion.p>
      </motion.div>
      <div className="mt-8 space-y-4 sm:mt-10">{children}</div>
    </section>
  );
}

function Subheading({ children }) {
  return <h3 className="pt-4 text-lg font-medium tracking-tight text-white">{children}</h3>;
}

function CardGrid({ items, columns = 'md:grid-cols-3' }) {
  return (
    <motion.ul variants={group} {...inView} className={cn('grid grid-cols-1 gap-3', columns)}>
      {items.map(({ title, text }) => (
        <motion.li key={title} variants={rise} className="card rounded-xl p-5">
          <p className="font-medium leading-snug tracking-tight text-white">{title}</p>
          <p className="mt-2 text-base leading-relaxed text-soft">{text}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function StatStrip() {
  return (
    <motion.dl variants={group} {...inView} className="card mt-10 grid grid-cols-2 gap-x-6 gap-y-7 rounded-2xl p-5 sm:mt-14 sm:p-7 lg:grid-cols-4">
      {E.stats.map(({ value, label }) => (
        <motion.div key={label} variants={rise} className="flex flex-col-reverse justify-end">
          <dt className="mt-2 text-[15px] leading-snug text-soft">{label}</dt>
          <dd className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] leading-none tracking-[-0.03em] tabular-nums text-white">{value}</dd>
        </motion.div>
      ))}
    </motion.dl>
  );
}

// Two slopes over the same horizontal distance, drawn to scale.
function SlopeComparison() {
  return (
    <motion.figure variants={rise} {...inView} className="card rounded-2xl p-5 sm:p-7">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        {[
          { grade: 30, label: 'Up to 30%', note: 'The escarpment today' },
          { grade: 5, label: '5%', note: 'The proposed pathway' },
        ].map(({ grade, label, note }) => (
          <div key={grade}>
            <svg viewBox="0 0 200 64" className="block w-full" role="img" aria-label={`A ${grade}% slope drawn to scale`}>
              <polygon points={`0,62 200,62 200,${62 - grade * 2}`} className={grade === 30 ? 'fill-white/80' : 'fill-white/40'} />
              <line x1="0" y1="62.5" x2="200" y2="62.5" stroke="rgb(255 255 255 / 0.2)" />
            </svg>
            <p className="mt-4 font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-none tracking-[-0.02em] text-white">{label}</p>
            <p className="mt-2 text-[15px] text-soft">{note}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-5 border-t border-white/10 pt-3 text-[13px] leading-snug text-soft">Both slopes are drawn to scale over the same horizontal distance.</figcaption>
    </motion.figure>
  );
}

const LEVEL_TONE = { 'Very low': 'text-soft/70', Low: 'text-soft', Medium: 'text-ink', High: 'font-medium text-white' };
const SALIENCE_TONE = {
  Primary: 'border-accent bg-accent text-ground',
  Secondary: 'border-white/30 text-ink',
  Tertiary: 'border-white/10 text-soft',
};
const RATINGS = [
  ['power', 'Power'],
  ['urgency', 'Urgency'],
  ['legitimacy', 'Legitimacy'],
];

function StakeholderTable() {
  return (
    <motion.div variants={rise} {...inView} className="card overflow-hidden rounded-2xl">
      <div className="hidden grid-cols-[minmax(0,1fr)_6rem_6rem_6rem_6.5rem] gap-3 border-b border-white/10 px-5 py-3 text-[13px] text-soft md:grid" aria-hidden="true">
        <span>Stakeholder</span>
        {RATINGS.map(([, label]) => (
          <span key={label}>{label}</span>
        ))}
        <span>Salience</span>
      </div>
      <ul>
        {E.stakeholders.groups.map((row) => (
          <li key={row.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 border-b border-white/10 px-4 py-3.5 last:border-b-0 sm:px-5 md:grid-cols-[minmax(0,1fr)_6rem_6rem_6rem_6.5rem] md:items-center">
            <p className="text-base leading-snug text-ink">{row.name}</p>
            <dl className="col-span-2 row-start-2 grid grid-cols-3 gap-2 md:contents">
              {RATINGS.map(([key, label]) => (
                <div key={key} className="md:contents">
                  <dt className="text-[13px] leading-tight text-soft md:sr-only">{label}</dt>
                  <dd className={cn('text-[15px]', LEVEL_TONE[row[key]])}>{row[key]}</dd>
                </div>
              ))}
            </dl>
            <p className={cn('col-start-2 row-start-1 justify-self-start rounded-full border px-2.5 py-1 text-[13px] leading-none md:col-start-auto md:row-start-auto', SALIENCE_TONE[row.salience])}>{row.salience}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ConceptFunnel() {
  const { longlist, shortlist, selected } = E.ideation;
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      <motion.div variants={rise} {...inView} className="card rounded-2xl p-5 lg:col-span-3">
        <p className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-[-0.03em] text-white">{longlist.length}</p>
        <h3 className="mt-2 text-[15px] text-soft">C-Sketch concepts</h3>
        <ol className="mt-5 grid grid-cols-1 gap-x-5 gap-y-1.5 text-[15px] leading-snug text-soft sm:grid-cols-2">
          {longlist.map((concept, index) => (
            <li key={concept} className="grid grid-cols-[1.5rem_minmax(0,1fr)]">
              <span className="tabular-nums text-soft/70">{index + 1}</span>
              <span>{concept}</span>
            </li>
          ))}
        </ol>
      </motion.div>
      <motion.div variants={rise} {...inView} className="card self-start rounded-2xl p-5 lg:col-span-2">
        <p className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-[-0.03em] text-white">{shortlist.length}</p>
        <h3 className="mt-2 text-[15px] text-soft">Shortlisted solutions</h3>
        <ul className="mt-5 space-y-1">
          {shortlist.map((solution) => (
            <li key={solution} className={cn('flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg py-1.5 text-base leading-snug', solution === selected ? '-mx-2.5 bg-white/10 px-2.5 font-medium text-white' : 'text-ink')}>
              {solution}
              {solution === selected && <span className="text-[13px] font-normal text-soft">Carried forward</span>}
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
    <motion.div variants={group} {...inView} className="card rounded-2xl p-4 sm:p-6">
      <div className="flex h-3 gap-0.5 overflow-hidden rounded-full" aria-hidden="true">
        {criteria.map(({ name, weight }, index) => (
          <motion.span
            key={name}
            className="h-full origin-left rounded-[2px] bg-accent transition-opacity duration-150"
            style={{ width: `${weight}%`, opacity: focus === null || focus === name ? 1 - index * 0.11 : 0.15 }}
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: spring.sheet } }}
          />
        ))}
      </div>
      <ul className="mt-5">
        {criteria.map(({ name, weight, why }) => (
          <motion.li
            key={name}
            variants={rise}
            onPointerEnter={() => setFocus(name)}
            onPointerLeave={() => setFocus(null)}
            className="grid grid-cols-[minmax(0,1fr)_3.25rem] items-baseline gap-x-3 border-t border-white/10 py-3 sm:grid-cols-[11rem_minmax(0,1fr)_4rem]"
          >
            <span className="text-base font-medium tracking-tight text-white">{name}</span>
            <span className="col-span-2 row-start-2 mt-1 text-[15px] leading-snug text-soft sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:mt-0">{why}</span>
            <span className="text-right font-display text-2xl leading-none tabular-nums text-white">{weight}%</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function PrototypeCard({ title, subject, text, specs, image, results }) {
  return (
    <motion.article variants={rise} className="card flex flex-col rounded-2xl p-5">
      <p className="self-start rounded-full border border-white/20 px-2.5 py-1 text-[13px] leading-tight text-ink">{E.prototypes.badge}</p>
      <h3 className="mt-5 text-[15px] text-soft">{title}</h3>
      <p className="mt-1 font-display text-[1.75rem] leading-tight tracking-[-0.015em] text-white">{subject}</p>
      <p className="mt-3 text-base leading-relaxed text-ink">{text}</p>
      {specs.length > 0 && (
        <dl className="mt-4 border-t border-white/10 text-[15px]">
          {specs.map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4 border-b border-white/10 py-2.5 last:border-b-0">
              <dt className="text-soft">{label}</dt>
              <dd className="text-right text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      )}
      {image && <img src={image} alt={`${title}: ${subject}`} loading="lazy" className="mt-4 rounded-lg border border-white/10" />}
      {results && <p className="mt-4 text-base leading-relaxed text-ink">{results}</p>}
    </motion.article>
  );
}

function GalleryItem({ src, width, height, title, caption, credit }) {
  return (
    <motion.figure variants={rise} className="card group mb-4 break-inside-avoid overflow-hidden rounded-2xl">
      {src ? (
        <div className="overflow-hidden">
          <img src={src} alt={`${title}: ${caption}`} width={width} height={height} loading="lazy" draggable="false" className="block h-auto w-full transition-transform duration-500 ease-out group-hover-fine:scale-[1.02]" />
        </div>
      ) : (
        <p className="placeholder-hatch grid aspect-[4/3] place-items-center px-4 text-center text-[15px] text-soft">{E.gallery.placeholder}</p>
      )}
      <figcaption className="p-4">
        <p className="font-medium tracking-tight text-white">{title}</p>
        <p className="mt-1.5 text-[15px] leading-snug text-soft">{caption}</p>
        {credit && <p className="mt-2 text-[13px] leading-snug text-soft/80">{credit}</p>}
      </figcaption>
    </motion.figure>
  );
}

function ReportViewer() {
  if (!reportPdfUrl) {
    return <p className="card placeholder-hatch grid h-[min(60svh,28rem)] place-items-center rounded-2xl px-4 text-center text-[15px] text-soft sm:text-lg">{E.report.placeholder}</p>;
  }
  return (
    <motion.figure variants={rise} {...inView} className="card overflow-hidden rounded-2xl">
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-white/10 px-4 py-2">
        <span className="text-[15px] text-ink">{E.title}: final report</span>
        <Action label="Open PDF" href={reportPdfUrl} icon="external" className="shrink-0" />
      </figcaption>
      <iframe src={`${reportPdfUrl}#view=FitH`} title={`${E.title} final report`} className="block h-[min(85svh,60rem)] w-full border-0 bg-surface" />
    </motion.figure>
  );
}

export function EscarpmentPage({ headingAs = 'h1' }) {
  const { prototypes } = E;
  return (
    <article id="escarpment" className="scroll-mt-24">
      <PageHeading as={headingAs} title={E.title} lede={E.lede} />
      <StatStrip />

      <div className="mt-14 grid grid-cols-1 gap-12 sm:mt-20 xl:grid-cols-[10rem_minmax(0,1fr)]">
        <ChapterNav />
        <div className="min-w-0 space-y-14 sm:space-y-20">
          <Chapter id="problem" kicker="The problem and context" title="A daily trip across a 30% grade" plain={E.overview.plain}>
            <SlopeComparison />
            <CardGrid items={E.overview.points} />
          </Chapter>

          <Chapter id="phase-1" kicker="Phase 1" title="Topography and policy alignment" plain={E.exploration.plain}>
            <CardGrid items={E.exploration.points} />
          </Chapter>

          <Chapter id="phase-2" kicker="Phase 2" title="Stakeholder salience and design requirements" plain={E.stakeholders.plain}>
            <StakeholderTable />
            <Subheading>Core design requirements</Subheading>
            <CardGrid items={E.stakeholders.requirements} columns="md:grid-cols-2 md:[&>li:last-child:nth-child(odd)]:col-span-2" />
          </Chapter>

          <Chapter id="phase-3" kicker="Phase 3" title="C-Sketch ideation and the weighted decision matrix" plain={E.ideation.plain}>
            <ConceptFunnel />
            <Subheading>Weighted decision matrix: six criteria</Subheading>
            <WeightBreakdown />
            <motion.div variants={rise} {...inView} className="rounded-2xl border border-white/25 p-5 sm:p-6">
              <h3 className="font-display text-[1.75rem] leading-tight tracking-[-0.015em] text-white">{E.ideation.contribution.title}</h3>
              <p className="mt-2 max-w-[44rem] text-[17px] leading-relaxed text-ink">{E.ideation.contribution.text}</p>
            </motion.div>
          </Chapter>

          <Chapter id="phase-4" kicker="Phase 4" title="Testing and final prototype" plain={prototypes.plain}>
            <motion.div variants={group} {...inView} className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
              {prototypes.items.map((item) => (
                <PrototypeCard key={item.title} {...item} />
              ))}
            </motion.div>
            <Subheading>The trade-offs we accepted</Subheading>
            <CardGrid items={prototypes.tradeoffs} />
          </Chapter>

          <Chapter id="site-gallery" title="Site conditions" plain={E.gallery.plain}>
            <motion.div variants={group} {...inView} className="columns-1 gap-4 md:columns-2 2xl:columns-3">
              {E.gallery.items.map((item) => (
                <GalleryItem key={item.title} {...item} />
              ))}
            </motion.div>
          </Chapter>

          <Chapter id="final-report" title={E.report.title} plain={E.report.plain}>
            <ReportViewer />
          </Chapter>
        </div>
      </div>
    </article>
  );
}
