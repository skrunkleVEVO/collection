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
  ['site-gallery', 'Photo grid'],
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
    <nav aria-label="Project chapters" className="sticky top-[3.8rem] z-30 mt-12 hidden border-b border-white/10 bg-ground/85 backdrop-blur-md lg:block">
      <ul className="flex flex-wrap gap-x-7">
        {CHAPTERS.map(([id, label]) => (
          <li key={id} className="relative">
            <motion.button
              type="button"
              {...tap}
              onClick={() => document.getElementById(id).scrollIntoView()}
              aria-current={active === id ? 'true' : undefined}
              className={cn('flex min-h-11 items-center text-sm transition-colors duration-150', active === id ? 'text-accent' : 'text-soft hover-fine:text-ink')}
            >
              {label}
            </motion.button>
            {active === id && <motion.span layoutId="chapter-marker" transition={spring.press} className="absolute inset-x-0 -bottom-px h-px bg-accent" />}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Kicker({ children }) {
  return <p className="text-[15px] text-accent">{children}</p>;
}

function ChapterTitle({ children }) {
  return <h2 className="mt-3 font-display text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[1.02] tracking-[-0.025em] text-white">{children}</h2>;
}

// Heading across the top in two columns, with the content running the full width below.
function Chapter({ id, kicker, title, plain, children }) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-white/10 pt-10 sm:pt-16">
      <motion.div variants={group} {...inView} className="grid grid-cols-1 gap-x-10 gap-y-5 lg:grid-cols-12 lg:items-end">
        <motion.div variants={rise} className="lg:col-span-7">
          {kicker && <Kicker>{kicker}</Kicker>}
          <ChapterTitle>{title}</ChapterTitle>
        </motion.div>
        <motion.p variants={rise} className="max-w-[40rem] text-lg leading-relaxed text-ink lg:col-span-5 lg:pb-1">
          {plain}
        </motion.p>
      </motion.div>
      <div className="mt-10 sm:mt-14">{children}</div>
    </section>
  );
}

// Heading holds in a side column while the content scrolls beside it.
function RailChapter({ id, kicker, title, plain, children }) {
  return (
    <section id={id} className="grid scroll-mt-32 grid-cols-1 gap-x-10 gap-y-8 border-t border-white/10 pt-10 sm:pt-16 lg:grid-cols-12">
      <motion.div variants={group} {...inView} className="self-start lg:sticky lg:top-36 lg:col-span-5">
        <motion.div variants={rise}>
          <Kicker>{kicker}</Kicker>
          <ChapterTitle>{title}</ChapterTitle>
        </motion.div>
        <motion.p variants={rise} className="mt-5 max-w-[32rem] text-lg leading-relaxed text-ink">
          {plain}
        </motion.p>
      </motion.div>
      <div className="min-w-0 lg:col-span-7">{children}</div>
    </section>
  );
}

function Subheading({ children, className }) {
  return <h3 className={cn('text-lg font-medium tracking-tight text-white', className)}>{children}</h3>;
}

function PointCard({ title, text }) {
  return (
    <motion.li variants={rise} className="card rounded-xl p-5">
      <p className="font-medium leading-snug tracking-tight text-white">{title}</p>
      <p className="mt-2 text-base leading-relaxed text-soft">{text}</p>
    </motion.li>
  );
}

function CardList({ items, className }) {
  return (
    <motion.ul variants={group} {...inView} className={cn('grid grid-cols-1 gap-3', className)}>
      {items.map((item) => (
        <PointCard key={item.title} {...item} />
      ))}
    </motion.ul>
  );
}

function StatBar() {
  return (
    <motion.dl variants={group} {...inView} className="card mt-10 grid grid-cols-2 rounded-2xl sm:mt-14 lg:grid-cols-12">
      {E.stats.map(({ value, label, major }, index) => (
        <motion.div
          key={label}
          variants={rise}
          className={cn(
            'flex flex-col-reverse justify-end border-white/10 p-5 sm:p-7',
            major ? 'lg:col-span-4' : 'lg:col-span-2',
            index % 2 === 1 && 'border-l',
            index >= 2 && 'border-t lg:border-t-0',
            index > 0 && 'lg:border-l',
          )}
        >
          <dt className="mt-3 text-[15px] leading-snug text-soft">{label}</dt>
          <dd className={cn('font-display leading-[0.95] tracking-[-0.03em] tabular-nums', major ? 'text-[clamp(3.5rem,9vw,9rem)] text-accent' : 'text-[clamp(2.25rem,3.6vw,3.75rem)] text-white')}>{value}</dd>
        </motion.div>
      ))}
    </motion.dl>
  );
}

// Two slopes over the same horizontal distance, drawn to scale.
function SlopeComparison() {
  return (
    <motion.figure variants={rise} {...inView} className="card flex flex-col justify-between rounded-2xl p-5 sm:p-8 lg:col-span-7">
      <div className="space-y-8">
        {[
          { grade: 30, label: 'Up to 30%', note: 'The escarpment today' },
          { grade: 5, label: '5%', note: 'The proposed pathway' },
        ].map(({ grade, label, note }) => (
          <div key={grade} className="grid grid-cols-1 items-end gap-x-6 gap-y-3 sm:grid-cols-[minmax(0,1fr)_11rem]">
            <svg viewBox="0 0 200 62" className="block w-full" role="img" aria-label={`A ${grade}% slope drawn to scale`}>
              <polygon points={`0,61 200,61 200,${61 - grade * 2}`} className={grade === 30 ? 'fill-accent/80' : 'fill-accent/45'} />
              <line x1="0" y1="61.5" x2="200" y2="61.5" stroke="rgb(255 255 255 / 0.2)" />
            </svg>
            <div>
              <p className="font-display text-[clamp(2rem,3.4vw,3rem)] leading-none tracking-[-0.02em] text-white">{label}</p>
              <p className="mt-2 text-[15px] leading-snug text-soft">{note}</p>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-6 border-t border-white/10 pt-3 text-[13px] leading-snug text-soft">Both slopes are drawn to scale over the same horizontal distance.</figcaption>
    </motion.figure>
  );
}

const LEVEL_TONE = { 'Very low': 'text-soft/70', Low: 'text-soft', Medium: 'text-ink', High: 'font-medium text-white' };
const SALIENCE_TONE = {
  Primary: 'border-accent bg-accent text-ground',
  Secondary: 'border-accent/40 text-accent',
  Tertiary: 'border-white/10 text-soft',
};
const RATINGS = [
  ['power', 'Power'],
  ['urgency', 'Urgency'],
  ['legitimacy', 'Legitimacy'],
];

function StakeholderTable() {
  return (
    <motion.div variants={rise} {...inView} className="card overflow-hidden rounded-2xl lg:col-span-8">
      <div className="hidden grid-cols-[minmax(0,1fr)_5.5rem_5.5rem_5.5rem_6.5rem] gap-3 border-b border-white/10 px-5 py-3 text-[13px] text-soft md:grid" aria-hidden="true">
        <span>Stakeholder</span>
        {RATINGS.map(([, label]) => (
          <span key={label}>{label}</span>
        ))}
        <span>Salience</span>
      </div>
      <ul>
        {E.stakeholders.groups.map((row) => (
          <li key={row.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 border-b border-white/10 px-4 py-3.5 last:border-b-0 sm:px-5 md:grid-cols-[minmax(0,1fr)_5.5rem_5.5rem_5.5rem_6.5rem] md:items-center">
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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <motion.div variants={rise} {...inView} className="card rounded-2xl p-5 sm:p-7 lg:col-span-8">
        <p className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.03em] text-accent">{longlist.length}</p>
        <h3 className="mt-2 text-[15px] text-soft">C-Sketch concepts</h3>
        <ol className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 text-[15px] leading-snug text-soft sm:grid-cols-2 xl:grid-cols-3">
          {longlist.map((concept, index) => (
            <li key={concept} className="grid grid-cols-[1.5rem_minmax(0,1fr)]">
              <span className="tabular-nums text-soft/70">{index + 1}</span>
              <span>{concept}</span>
            </li>
          ))}
        </ol>
      </motion.div>
      <motion.div variants={rise} {...inView} className="card rounded-2xl p-5 sm:p-7 lg:col-span-4">
        <p className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.03em] text-accent">{shortlist.length}</p>
        <h3 className="mt-2 text-[15px] text-soft">Shortlisted solutions</h3>
        <ul className="mt-6 space-y-1">
          {shortlist.map((solution) => (
            <li key={solution} className={cn('flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg py-1.5 text-base leading-snug', solution === selected ? '-mx-2.5 bg-accent/15 px-2.5 font-medium text-white' : 'text-ink')}>
              {solution}
              {solution === selected && <span className="text-[13px] font-normal text-accent">Carried forward</span>}
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
    <motion.div variants={group} {...inView} className="card rounded-2xl p-4 sm:p-7 lg:col-span-8">
      <Subheading>Weighted decision matrix: six criteria</Subheading>
      <div className="mt-5 flex h-3 gap-0.5 overflow-hidden rounded-full" aria-hidden="true">
        {criteria.map(({ name, weight }, index) => (
          <motion.span
            key={name}
            className="h-full origin-left rounded-[2px] bg-accent transition-opacity duration-150"
            style={{ width: `${weight}%`, opacity: focus === null || focus === name ? 1 - index * 0.12 : 0.15 }}
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
            <span className="text-right font-display text-2xl leading-none tabular-nums text-accent">{weight}%</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

const PROTOTYPE_SPANS = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-6'];

function PrototypeCard({ title, subject, text, specs, image, results, className }) {
  return (
    <motion.article variants={rise} className={cn('card flex flex-col rounded-2xl p-5 sm:p-6', className)}>
      <p className="self-start rounded-full border border-accent/40 px-2.5 py-1 text-[13px] leading-tight text-accent">{E.prototypes.badge}</p>
      <h3 className="mt-5 text-[15px] text-soft">{title}</h3>
      <p className="mt-1 font-display text-[2rem] leading-tight tracking-[-0.015em] text-white">{subject}</p>
      <p className="mt-3 text-base leading-relaxed text-ink">{text}</p>
      {specs.length > 0 && (
        <dl className="mt-5 grid grid-cols-1 gap-x-6 border-t border-white/10 text-[15px] sm:grid-cols-2">
          {specs.map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4 border-b border-white/10 py-2.5">
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

// Column span and photo height at wide widths, so each row of the grid lines up.
const GALLERY_LAYOUT = [
  ['lg:col-span-7', 'lg:h-[30rem]'],
  ['lg:col-span-5', 'lg:h-[30rem]'],
  ['lg:col-span-8', 'lg:h-[26rem]'],
  ['lg:col-span-4', 'lg:h-[26rem]'],
  ['lg:col-span-6', 'h-56'],
  ['lg:col-span-6', 'h-56'],
];

function GalleryItem({ item: { src, width, height, title, caption, credit }, span, photoHeight }) {
  return (
    <motion.figure variants={rise} className={cn('card group flex flex-col overflow-hidden rounded-2xl', span)}>
      {src ? (
        <div className="overflow-hidden">
          <img
            src={src}
            alt={`${title}: ${caption}`}
            width={width}
            height={height}
            loading="lazy"
            draggable="false"
            className={cn('block h-auto w-full object-cover transition-transform duration-500 ease-out group-hover-fine:scale-[1.02]', photoHeight)}
          />
        </div>
      ) : (
        <p className={cn('placeholder-hatch grid place-items-center px-4 text-center text-[15px] text-soft', photoHeight)}>{E.gallery.placeholder}</p>
      )}
      <figcaption className="flex-1 p-4 sm:p-5">
        <p className="font-medium tracking-tight text-white">{title}</p>
        <p className="mt-1.5 max-w-[46rem] text-[15px] leading-snug text-soft">{caption}</p>
        {credit && <p className="mt-2 text-[13px] leading-snug text-soft/80">{credit}</p>}
      </figcaption>
    </motion.figure>
  );
}

function ReportViewer() {
  if (!reportPdfUrl) {
    return <p className="card placeholder-hatch grid h-[min(70svh,36rem)] place-items-center rounded-2xl px-4 text-center text-[15px] text-soft sm:text-lg">{E.report.placeholder}</p>;
  }
  return (
    <motion.figure variants={rise} {...inView} className="card w-full overflow-hidden rounded-2xl">
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-white/10 px-4 py-2 sm:px-5">
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
      <PageHeading as={headingAs} title={E.title} lede={E.lede} />
      <StatBar />
      <ChapterNav />

      <div className="mt-14 space-y-20 sm:mt-20 sm:space-y-32">
        <Chapter id="problem" kicker="The problem and context" title="A daily trip across a 30% grade" plain={E.overview.plain}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <SlopeComparison />
            <CardList items={E.overview.points} className="lg:col-span-5" />
          </div>
        </Chapter>

        <RailChapter id="phase-1" kicker="Phase 1" title="Topography and policy alignment" plain={E.exploration.plain}>
          <CardList items={E.exploration.points} />
        </RailChapter>

        <Chapter id="phase-2" kicker="Phase 2" title="Stakeholder salience and design requirements" plain={E.stakeholders.plain}>
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
            <StakeholderTable />
            <div className="lg:col-span-4">
              <Subheading className="mb-3 pt-2 lg:pt-0">Core design requirements</Subheading>
              <CardList items={E.stakeholders.requirements} />
            </div>
          </div>
        </Chapter>

        <Chapter id="phase-3" kicker="Phase 3" title="C-Sketch ideation and the weighted decision matrix" plain={E.ideation.plain}>
          <ConceptFunnel />
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
            <WeightBreakdown />
            <motion.div variants={rise} {...inView} className="self-start rounded-2xl border border-accent/40 bg-accent/5 p-5 sm:p-7 lg:sticky lg:top-36 lg:col-span-4">
              <h3 className="font-display text-[2rem] leading-tight tracking-[-0.015em] text-white">{E.ideation.contribution.title}</h3>
              <p className="mt-3 text-[17px] leading-relaxed text-ink">{E.ideation.contribution.text}</p>
            </motion.div>
          </div>
        </Chapter>

        <Chapter id="phase-4" kicker="Phase 4" title="Testing and final prototype" plain={prototypes.plain}>
          <motion.div variants={group} {...inView} className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {prototypes.items.map((item, index) => (
              <PrototypeCard key={item.title} {...item} className={PROTOTYPE_SPANS[index]} />
            ))}
          </motion.div>
          <Subheading className="mb-3 mt-10">The trade-offs we accepted</Subheading>
          <CardList items={prototypes.tradeoffs} className="md:grid-cols-3" />
        </Chapter>

        <Chapter id="site-gallery" kicker="Photo grid" title="Campus issues on site" plain={E.gallery.plain}>
          <motion.div variants={group} {...inView} className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {E.gallery.items.map((item, index) => (
              <GalleryItem key={item.title} item={item} span={GALLERY_LAYOUT[index][0]} photoHeight={GALLERY_LAYOUT[index][1]} />
            ))}
          </motion.div>
        </Chapter>

        <Chapter id="final-report" kicker="Final report" title={E.report.title} plain={E.report.plain}>
          <ReportViewer />
        </Chapter>
      </div>
    </article>
  );
}
