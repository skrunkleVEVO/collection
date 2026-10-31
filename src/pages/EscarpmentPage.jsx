import { motion } from 'framer-motion';

import { PageHeading } from '@/components/PageHeading';
import { escarpment as E } from '@/data/portfolioData';
import { group, inView, rise, spring } from '@/lib/motion';

// Two slopes over the same horizontal distance, drawn to scale.
function SlopeComparison() {
  return (
    <figure className="rounded-2xl border border-white/10 bg-surface p-5 sm:p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {[
          { grade: 30, label: 'Up to 30%', note: 'The escarpment today' },
          { grade: 5, label: '5%', note: 'The proposed switchback pathway' },
        ].map(({ grade, label, note }) => (
          <div key={grade}>
            <svg viewBox="0 0 200 64" className="block w-full" role="img" aria-label={`A ${grade}% slope drawn to scale`}>
              <polygon points={`0,62 200,62 200,${62 - grade * 2}`} className={grade === 30 ? 'fill-white/80' : 'fill-white/40'} />
              <line x1="0" y1="62.5" x2="200" y2="62.5" stroke="rgb(255 255 255 / 0.2)" />
            </svg>
            <p className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-none tracking-tight text-white">{label}</p>
            <p className="mt-2 text-[15px] text-soft">{note}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-5 border-t border-white/10 pt-3 text-[13px] leading-snug text-soft">Both slopes are drawn to scale over the same horizontal distance.</figcaption>
    </figure>
  );
}

function Phase({ kicker, title, plain, children }) {
  return (
    <section className="grid grid-cols-1 gap-x-8 gap-y-4 border-t border-white/10 pt-8 sm:pt-12 lg:grid-cols-12">
      <motion.div variants={group} {...inView} className="self-start lg:sticky lg:top-24 lg:col-span-4">
        <motion.p variants={rise} className="text-[15px] text-soft">
          {kicker}
        </motion.p>
        <motion.h2 variants={rise} className="mt-2 text-[clamp(1.625rem,3vw,2.5rem)] font-semibold leading-[1.08] tracking-tight text-white">
          {title}
        </motion.h2>
      </motion.div>
      <div className="min-w-0 lg:col-span-8">
        <motion.p variants={rise} {...inView} className="max-w-[44rem] text-lg leading-relaxed text-ink">
          {plain}
        </motion.p>
        <div className="mt-8 space-y-4">{children}</div>
      </div>
    </section>
  );
}

function Subheading({ children }) {
  return <h3 className="pt-3 text-lg font-semibold tracking-tight text-white first:pt-0">{children}</h3>;
}

function CardGrid({ items, columns = 'sm:grid-cols-3' }) {
  return (
    <motion.ul variants={group} {...inView} className={`grid grid-cols-1 gap-3 ${columns}`}>
      {items.map(({ title, text }) => (
        <motion.li key={title} variants={rise} className="rounded-xl border border-white/10 bg-surface p-4 transition-colors duration-200 hover-fine:border-white/20">
          <p className="font-medium leading-snug tracking-tight text-white">{title}</p>
          <p className="mt-2 text-base leading-relaxed text-soft">{text}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function WeightChart() {
  return (
    <motion.ul variants={group} {...inView} className="space-y-3 rounded-xl border border-white/10 bg-surface p-4 sm:p-5">
      {E.ideation.criteria.map(({ name, weight }) => (
        <li key={name} className="grid grid-cols-[minmax(0,1fr)_3rem] items-baseline gap-x-3 gap-y-1.5 sm:grid-cols-[10rem_minmax(0,1fr)_3rem] sm:items-center">
          <span className="text-[15px] text-ink">{name}</span>
          <span className="col-span-2 row-start-2 h-2 overflow-hidden rounded-full bg-white/10 sm:col-span-1 sm:col-start-2 sm:row-start-1" aria-hidden="true">
            <motion.span
              className="block h-full origin-left rounded-full bg-accent"
              style={{ width: `${(weight / 25) * 100}%` }}
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: spring.sheet } }}
            />
          </span>
          <span className="text-right text-[15px] font-medium tabular-nums text-white">{weight}%</span>
        </li>
      ))}
    </motion.ul>
  );
}

function Funnel() {
  const { longlist, shortlist } = E.ideation;
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-surface p-4 sm:gap-6 sm:p-5">
      {[
        [longlist, 'concepts from C-Sketch ideation'],
        [shortlist, 'shortlisted solutions'],
      ].map(([value, label], index) => (
        <div key={label} className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">
          {index > 0 && <span className="h-px w-6 shrink-0 bg-white/20 sm:w-12" aria-hidden="true" />}
          <div className="min-w-0">
            <p className="text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-tight tabular-nums text-white">{value}</p>
            <p className="mt-2 text-[15px] leading-snug text-soft">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PrototypeCard({ title, subject, text, specs, image, results }) {
  return (
    <motion.article variants={rise} className="flex flex-col rounded-2xl border border-white/10 bg-surface p-5 transition-colors duration-200 hover-fine:border-white/20">
      <p className="self-start rounded-full border border-white/20 px-2.5 py-1 text-[13px] leading-tight text-ink">{E.prototypes.badge}</p>
      <h3 className="mt-5 text-[15px] text-soft">{title}</h3>
      <p className="mt-1 text-xl font-semibold leading-snug tracking-tight text-white">{subject}</p>
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

export function EscarpmentPage({ headingAs = 'h1' }) {
  return (
    <article id="escarpment" className="scroll-mt-20">
      <PageHeading as={headingAs} title={E.title} lede={E.lede} />

      <div className="mt-12 space-y-14 sm:mt-16 sm:space-y-20">
        <Phase kicker="Overview" title="The problem" plain={E.overview.plain}>
          <SlopeComparison />
          <CardGrid items={E.overview.points} />
        </Phase>

        <Phase kicker="Phase 1" title="Exploration & Policy Alignment" plain={E.exploration.plain}>
          <CardGrid items={E.exploration.points} />
        </Phase>

        <Phase kicker="Phase 2" title="Stakeholder Analysis & Design Requirements" plain={E.stakeholders.plain}>
          <Subheading>Stakeholder Salience Analysis</Subheading>
          <CardGrid items={E.stakeholders.salience} />
          <Subheading>Core design requirements</Subheading>
          <CardGrid items={E.stakeholders.requirements} columns="sm:grid-cols-2 sm:[&>li:last-child:nth-child(odd)]:col-span-2" />
        </Phase>

        <Phase kicker="Phase 3" title="Ideation & Weighted Decision Matrix" plain={E.ideation.plain}>
          <Funnel />
          <Subheading>The six weighted criteria</Subheading>
          <WeightChart />
          <motion.div variants={rise} {...inView} className="rounded-xl border border-white/20 p-4 sm:p-5">
            <h3 className="text-lg font-semibold tracking-tight text-white">My contribution</h3>
            <ul className="mt-3 space-y-1.5 text-[17px] leading-snug text-ink">
              {E.ideation.contribution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </Phase>

        <section className="border-t border-white/10 pt-8 sm:pt-12">
          <motion.div variants={group} {...inView} className="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <motion.p variants={rise} className="text-[15px] text-soft">
                Phase 4
              </motion.p>
              <motion.h2 variants={rise} className="mt-2 text-[clamp(1.625rem,3vw,2.5rem)] font-semibold leading-[1.08] tracking-tight text-white">
                Prototype Testing & Final Design
              </motion.h2>
            </div>
            <motion.p variants={rise} className="max-w-[44rem] text-lg leading-relaxed text-ink lg:col-span-8">
              {E.prototypes.plain}
            </motion.p>
          </motion.div>
          <motion.div variants={group} {...inView} className="mt-8 grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
            {E.prototypes.items.map((item) => (
              <PrototypeCard key={item.title} {...item} />
            ))}
          </motion.div>
        </section>
      </div>
    </article>
  );
}
