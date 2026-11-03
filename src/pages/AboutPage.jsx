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

function Hero() {
  const Title = usePageHeading();
  return (
    <section className="journal min-h-[calc(100svh-7rem)] content-end gap-y-8 pb-14 pt-[28svh] sm:pb-20 lg:min-h-[calc(100svh-4.25rem)] lg:items-end lg:pt-0">
      <Title className="t-display text-white max-lg:text-[11vw] lg:order-2 lg:col-span-7">
        {about.headline.map((line, index) => (
          <span key={line} className="mask-line">
            <span style={{ animationDelay: `${index * 110}ms` }}>{line}</span>
          </span>
        ))}
      </Title>
      <div className="hero-fade lg:order-1 lg:col-span-5 lg:pb-[0.6vw]">
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
    <motion.section variants={group} {...inView} className="journal gap-y-10 pt-28 sm:pt-44">
      <div className="lg:col-span-5">
        <motion.h2 variants={rise} className={SECTION_TITLE}>
          {about.sections[0].title}
        </motion.h2>
        <motion.figure variants={rise} className="mt-12 hidden w-[78%] lg:block">
          <img src={about.introImage.src} alt={about.introImage.alt} width="1441" height="840" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          <figcaption className="mt-4 max-w-[34ch] text-[15px] leading-snug text-soft">{about.introImage.note}</figcaption>
        </motion.figure>
      </div>
      <div className="space-y-6 lg:col-span-7 lg:pt-[0.6rem]">
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
          <figcaption className="mt-3 text-[15px] leading-snug text-soft">{about.introImage.note}</figcaption>
        </motion.figure>
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
      <motion.p variants={rise} className="max-w-[30ch] text-lg leading-relaxed text-ink lg:col-span-3 lg:pb-[0.8vw]">
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
    <section aria-labelledby="division-physical" className="field mt-28 pb-28 pt-20 sm:mt-44 sm:pb-40 sm:pt-28">
      <DivisionHead id="division-physical" title={about.divisions.physical.title} text={about.divisions.physical.text} />

      <motion.article variants={group} {...inView} className="journal mt-16 gap-y-12 sm:mt-24">
        <div className="self-start lg:sticky lg:top-28 lg:col-span-5">
          <motion.p variants={rise} className="tabular-nums text-accent" aria-label="From a 30 percent grade to a 5 percent pathway">
            <span className="t-huge block">30%</span>
            <span className="t-display mt-2 block text-white">to 5%</span>
          </motion.p>
          <motion.p variants={rise} className="mt-8 max-w-[34ch] text-lg leading-relaxed text-ink">
            The steepest campus slopes today, and the maximum running slope of the proposed pathway, drawn to scale on the case study.
          </motion.p>
        </div>
        <div className="min-w-0 lg:col-span-7">
          <motion.figure variants={rise} className="overflow-hidden">
            <img src={image.src} alt={image.alt} width="1348" height="866" loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <figcaption className="mt-3 text-[15px] text-soft">{image.caption}</figcaption>
          </motion.figure>
          <motion.h4 variants={rise} className="t-title mt-12 text-white">
            {escarpment.title}
          </motion.h4>
          <motion.p variants={rise} className="mt-5 max-w-[44ch] text-lg leading-relaxed text-ink">
            {escarpment.lede}
          </motion.p>
          <motion.dl variants={rise} className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 xl:grid-cols-4">
            {facts.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-[15px] text-soft">{label}</dt>
                <dd className="mt-1 text-lg leading-snug text-ink">{value}</dd>
              </div>
            ))}
          </motion.dl>
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
      className="aspect-[16/10] w-full object-cover object-left-top transition-transform duration-500 ease-out group-hover-fine:scale-[1.04]"
    />
  );
}

// The digital division: an index of rows, the name at display size, its line and stack on the axis, a crop of the app at the right margin.
export function DigitalIndex() {
  return (
    <section aria-labelledby="division-digital" className="pt-28 sm:pt-40">
      <DivisionHead id="division-digital" title={about.divisions.digital.title} text={about.divisions.digital.text} />
      <motion.ul variants={group} {...inView} className="mt-14 space-y-4 sm:mt-20">
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
            <motion.li key={project.id} variants={rise}>
              <a {...linkProps} className="group journal items-center gap-y-5 py-5 transition-colors duration-200 hover-fine:bg-surface/60 lg:-mx-4 lg:px-4">
                <h4 className="t-display flex items-start gap-3 text-white transition-colors duration-200 group-hover-fine:text-accent max-lg:text-[clamp(3rem,10vw,5rem)] lg:col-span-5">
                  {project.title}
                  <ArrowUpRight className="mt-[0.1em] size-[0.4em] shrink-0 text-soft transition-[transform,color] duration-200 ease-out group-hover-fine:-translate-y-1 group-hover-fine:translate-x-1 group-hover-fine:text-accent" aria-hidden="true" />
                </h4>
                <div className="lg:col-span-4">
                  <p className="t-lead text-ink">{project.headline}</p>
                  <p className="mt-2 text-[15px] leading-snug text-soft">
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
    <section id="archive" aria-labelledby="archive-title" className="scroll-mt-16 pt-28 sm:pt-44">
      <motion.div variants={group} {...inView} className="journal gap-y-5">
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
    <motion.section variants={group} {...inView} className="journal gap-y-10 pt-32 sm:pt-44">
      <div className="lg:col-span-5">
        <motion.h2 variants={rise} className={SECTION_TITLE}>
          {tools.title}
        </motion.h2>
        <motion.dl variants={rise} className="mt-10 grid grid-cols-3 gap-x-5 gap-y-5 lg:grid-cols-1">
          {about.facts.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-[15px] text-soft">{label}</dt>
              <dd className="mt-1 text-lg leading-snug text-ink">{value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
      <div className="space-y-12 lg:col-span-7">
        {tools.paragraphs.map((text) => (
          <motion.p key={text} variants={rise} className={cn(BODY, 'indent-[3em]')}>
            {text}
          </motion.p>
        ))}
        <motion.div variants={rise} className="pt-8">
          <h3 className="t-title text-white">{heading.title}</h3>
          {heading.paragraphs.map((text) => (
            <p key={text} className="t-lead mt-4 text-ink max-lg:text-xl max-lg:leading-[1.6]">
              {text}
            </p>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function Skills() {
  return (
    <motion.section variants={group} {...inView} className="journal gap-y-10 pt-32 sm:pt-52">
      <motion.h2 variants={rise} className={cn(SECTION_TITLE, 'lg:col-span-5')}>
        Skills
      </motion.h2>
      <dl className="space-y-2 lg:col-span-7">
        {about.skillGroups.map(({ name, skills }) => (
          <motion.div key={name} variants={rise} className="grid grid-cols-1 gap-x-8 gap-y-1 py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:items-baseline">
            <dt className="t-lead text-white">{name}</dt>
            <dd className="text-lg leading-relaxed text-ink">{skills.join(', ')}</dd>
          </motion.div>
        ))}
      </dl>
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
