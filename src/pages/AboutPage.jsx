import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { Action } from '@/components/Action';
import { AuraFlowSnapshot } from '@/components/AuraFlowDemo';
import { about, escarpment, isSchoolMode, projects } from '@/data/portfolioData';
import { group, inView, rise } from '@/lib/motion';
import { usePageHeading } from '@/lib/pageContext';
import { cn } from '@/lib/utils';

const SECTION_TITLE = 't-title text-white';
const DIVISION_TITLE = 't-huge text-white';
const STATEMENT = 't-lead text-ink';
const BODY = 'max-w-[54ch] text-xl leading-[1.6] text-ink';

const scrollTo = (id) => () => document.getElementById(id)?.scrollIntoView();

// A spec list: each fact sits on its own hairline, label over value, like a title block on a drawing.
export function Facts({ items, className }) {
  return (
    <motion.dl variants={rise} className={cn('grid gap-x-6 gap-y-5', className)}>
      {items.map(({ label, value }) => (
        <div key={label} className="border-t border-line pt-3">
          <dt className="t-label">{label}</dt>
          <dd className="mt-1.5 text-lg leading-snug text-ink">{value}</dd>
        </div>
      ))}
    </motion.dl>
  );
}

function Hero() {
  const Title = usePageHeading();
  return (
    <section className="journal min-h-[calc(100svh-7rem)] content-end gap-y-8 pb-14 pt-[28svh] sm:pb-20 lg:min-h-[calc(100svh-4.3rem)] lg:items-end lg:pt-0">
      <Title className="t-display text-white max-lg:text-[11vw] lg:order-2 lg:col-span-7">
        {about.headline.map((line, index) => (
          <span key={line} className="mask-line">
            <span style={{ animationDelay: `${index * 110}ms` }}>{line}</span>
          </span>
        ))}
      </Title>
      <div className="hero-fade lg:order-1 lg:col-span-5 lg:pb-[0.55vw]">
        <p className="max-w-[34ch] text-lg leading-relaxed text-ink">{about.subtitle}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Action label="Open the archive" icon="down" primary onClick={scrollTo('archive')} />
        </div>
      </div>
    </section>
  );
}

// Right-half statement on the axis; one photograph hangs in the left zone below its heading.
function Intro() {
  const [first, ...rest] = about.sections[0].paragraphs;
  return (
    <motion.section variants={group} {...inView} className="section-gap">
      <div className="sheet journal gap-y-10">
        <div className="lg:col-span-5">
          <motion.h2 variants={rise} className={SECTION_TITLE}>
            {about.sections[0].title}
          </motion.h2>
          <motion.figure variants={rise} className="lead-in hidden w-[78%] lg:block">
            <img src={about.introImage.src} alt={about.introImage.alt} width="1441" height="840" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <figcaption className="t-label mt-3 max-w-[34ch]">{about.introImage.note}</figcaption>
          </motion.figure>
        </div>
        <div className="space-y-6 lg:col-span-7 lg:pt-[0.55rem]">
          <motion.p variants={rise} className={cn(BODY, 'indent-[3em]')}>
            {first}
          </motion.p>
          {rest.map((text) => (
            <motion.p key={text} variants={rise} className={BODY}>
              {text}
            </motion.p>
          ))}
          <motion.figure variants={rise} className="ml-auto w-[62%] pt-4 lg:hidden">
            <img src={about.introImage.src} alt={about.introImage.alt} width="1441" height="840" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <figcaption className="t-label mt-3">{about.introImage.note}</figcaption>
          </motion.figure>
        </div>
      </div>
    </motion.section>
  );
}

function DivisionHead({ id, title, text }) {
  return (
    <motion.div variants={group} {...inView} className="journal items-end gap-y-5">
      <motion.h3 id={id} variants={rise} className={cn(DIVISION_TITLE, 'lg:col-span-9')}>
        {title}
      </motion.h3>
      <motion.p variants={rise} className="max-w-[30ch] text-lg leading-relaxed text-ink lg:col-span-3 lg:pb-[0.9vw]">
        {text}
      </motion.p>
    </motion.div>
  );
}

// The physical division: one full-bleed field, the grade set as type, the site photograph on the axis.
export function PhysicalEntry({ href }) {
  const { image, facts } = about.physicalEntry;
  const target = href ?? (isSchoolMode ? '#/apsc-169' : undefined);
  return (
    <section aria-labelledby="division-physical" className="field lead-in pb-[var(--section)] pt-[calc(var(--section)*0.7)]">
      <DivisionHead id="division-physical" title={about.divisions.physical.title} text={about.divisions.physical.text} />

      <motion.article variants={group} {...inView} className="journal lead-in gap-y-12 border-t border-line pt-[var(--lead-in)]">
        <div className="self-start lg:sticky lg:top-28 lg:col-span-5">
          <motion.p variants={rise} className="text-accent" aria-label="From a 30 percent grade to a 5 percent pathway">
            <span className="t-huge block">30%</span>
            <span className="t-display mt-2 block text-white">to 5%</span>
          </motion.p>
          <motion.p variants={rise} className="mt-8 max-w-[34ch] text-lg leading-relaxed text-ink">
            The steepest campus slopes today, and the maximum running slope of the proposed pathway, drawn to scale on the case study.
          </motion.p>
        </div>
        <div className="min-w-0 lg:col-span-7">
          <motion.figure variants={rise} className="group">
            <div className="overflow-hidden">
              <img src={image.src} alt={image.alt} width="1348" height="866" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover-fine:scale-[1.02]" />
            </div>
            <figcaption className="t-label mt-3">{image.caption}</figcaption>
          </motion.figure>
          <motion.h4 variants={rise} className="t-title lead-in text-white">
            {escarpment.title}
          </motion.h4>
          <motion.p variants={rise} className="mt-5 max-w-[44ch] text-lg leading-relaxed text-ink">
            {escarpment.lede}
          </motion.p>
          <Facts items={facts} className="mt-10 grid-cols-2 xl:grid-cols-4" />
          <motion.div variants={rise} className="mt-10">
            {target?.startsWith('#/') ? (
              <Action label="Read the case study" href={target} icon="next" primary />
            ) : (
              <Action label="Read the case study" icon="down" primary onClick={scrollTo('escarpment')} />
            )}
          </motion.div>
        </div>
      </motion.article>
    </section>
  );
}

function Thumbnail({ project }) {
  if (!project.previews) return <AuraFlowSnapshot />;
  return (
    <img
      src={project.previews.desktop.src}
      alt=""
      loading="lazy"
      draggable="false"
      className="aspect-[16/10] w-full object-cover object-left-top transition-transform duration-700 ease-out group-hover-fine:scale-[1.035]"
    />
  );
}

// The digital division: a ruled index, the name at display size, its line and stack on the axis, a crop of the app at the right margin.
export function DigitalIndex() {
  return (
    <section aria-labelledby="division-digital" className="section-gap">
      <DivisionHead id="division-digital" title={about.divisions.digital.title} text={about.divisions.digital.text} />
      <motion.ul variants={group} {...inView} className="lead-in border-b border-line">
        {projects.map((project) => {
          const linkProps = isSchoolMode
            ? { href: `#/software` }
            : {
                href: `#${project.id}`,
                onClick: (event) => {
                  event.preventDefault();
                  scrollTo(project.id)();
                },
              };
          return (
            <motion.li key={project.id} variants={rise} className="index-row">
              <a {...linkProps} className="group journal items-center gap-y-5 py-6 lg:py-5">
                <h4 className="t-display flex items-start gap-3 text-white max-lg:text-[clamp(3rem,10vw,5rem)] lg:col-span-5">
                  {project.title}
                  <ArrowUpRight
                    strokeWidth={1.25}
                    className="mt-[0.12em] size-[0.36em] shrink-0 text-soft max-lg:hidden transition-[transform,color] duration-300 ease-out group-hover-fine:-translate-y-[0.06em] group-hover-fine:translate-x-[0.06em] group-hover-fine:text-accent"
                    aria-hidden="true"
                  />
                </h4>
                <div className="lg:col-span-4">
                  <p className="t-lead text-ink">{project.headline}</p>
                  <p className="t-label mt-2">
                    {project.tag}. {project.tech.join(', ')}.
                  </p>
                </div>
                <div className="overflow-hidden lg:col-span-3">
                  <Thumbnail project={project} />
                </div>
              </a>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}

function Archive() {
  return (
    <section id="archive" aria-labelledby="archive-title" className="section-gap scroll-mt-16">
      <motion.div variants={group} {...inView} className="sheet journal gap-y-5">
        <motion.h2 id="archive-title" variants={rise} className={cn(SECTION_TITLE, 'lg:col-span-5')}>
          The archive
        </motion.h2>
        <motion.p variants={rise} className={cn(STATEMENT, 'lg:col-span-7')}>
          Kept apart because they fail differently: a pathway can’t be patched overnight, and an app can.
        </motion.p>
      </motion.div>
      <PhysicalEntry />
      <DigitalIndex />
    </section>
  );
}

function WhyTools() {
  const [, tools, heading] = about.sections;
  return (
    <motion.section variants={group} {...inView} className="section-gap">
      <div className="sheet journal gap-y-10">
        <div className="lg:col-span-5">
          <motion.h2 variants={rise} className={SECTION_TITLE}>
            {tools.title}
          </motion.h2>
          <Facts items={about.facts} className="lead-in grid-cols-1 sm:grid-cols-3 lg:w-[78%] lg:grid-cols-1" />
        </div>
        <div className="lg:col-span-7 lg:pt-[0.55rem]">
          {tools.paragraphs.map((text) => (
            <motion.p key={text} variants={rise} className={cn(BODY, 'indent-[3em]')}>
              {text}
            </motion.p>
          ))}
          <motion.div variants={rise} className="lead-in border-t border-line pt-[var(--lead-in)]">
            <h3 className="t-title text-white">{heading.title}</h3>
            {heading.paragraphs.map((text) => (
              <p key={text} className="t-lead mt-5 text-ink max-lg:text-xl max-lg:leading-[1.6]">
                {text}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function Skills() {
  return (
    <motion.section variants={group} {...inView} className="section-gap">
      <div className="sheet journal gap-y-10">
        <motion.h2 variants={rise} className={cn(SECTION_TITLE, 'lg:col-span-5')}>
          Skills
        </motion.h2>
        <dl className="border-b border-line lg:col-span-7">
          {about.skillGroups.map(({ name, skills }) => (
            <motion.div key={name} variants={rise} className="grid grid-cols-1 gap-x-8 gap-y-1 border-t border-line py-5 first:border-t-0 first:pt-1 sm:grid-cols-[13rem_minmax(0,1fr)] sm:items-baseline">
              <dt className="t-lead text-white">{name}</dt>
              <dd className="text-lg leading-relaxed text-ink">{skills.join(', ')}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </motion.section>
  );
}

export function AboutPage() {
  return (
    <>
      <Hero />
      <Intro />
      <Archive />
      <WhyTools />
      <Skills />
    </>
  );
}
