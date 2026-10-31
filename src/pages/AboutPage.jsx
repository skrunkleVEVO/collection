import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { Action } from '@/components/Action';
import { about, contact, isSchoolMode, tabs } from '@/data/portfolioData';
import { group, inView, rise, spring } from '@/lib/motion';
import { cn } from '@/lib/utils';

export function ContactActions({ className }) {
  return (
    <div className={className}>
      <Action label={contact.githubLabel} href={contact.github} icon="github" />
      {contact.linkedin && <Action label="LinkedIn" href={contact.linkedin} icon="link" />}
      {contact.email && <Action label="Email me" href={`mailto:${contact.email}`} icon="mail" />}
    </div>
  );
}

function Headline() {
  return (
    <h1 className="font-display text-[clamp(2.75rem,8vw,10.5rem)] leading-[0.98] tracking-[-0.035em] text-white">
      {about.title.split(' ').map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="hero-word">
            <span className="hero-word-inner" style={{ animationDelay: `${index * 35}ms` }}>
              {word}
            </span>
          </span>{' '}
        </span>
      ))}
    </h1>
  );
}

function BridgeTile({ tile, className }) {
  return (
    <motion.a
      href={`#/${isSchoolMode ? tile.tab : 'projects'}`}
      variants={rise}
      whileTap={{ scale: 0.98 }}
      transition={spring.press}
      className={cn('card group flex flex-col overflow-hidden rounded-2xl', className)}
    >
      <div className="h-56 overflow-hidden border-b border-white/10 sm:h-72 xl:h-96">
        <img src={tile.image} alt="" loading="lazy" draggable="false" className="h-full w-full object-cover object-left-top transition-transform duration-500 ease-out group-hover-fine:scale-[1.03]" />
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 p-5 sm:p-7">
        <div>
          <p className="text-[15px] text-accent">{tile.side}</p>
          <h2 className="mt-1 font-display text-[clamp(2rem,3.4vw,3.25rem)] leading-tight tracking-[-0.02em] text-white">{tile.title}</h2>
          <p className="mt-2 text-base leading-relaxed text-ink">{tile.text}</p>
        </div>
        <ArrowUpRight className="mt-1 size-5 shrink-0 text-soft transition-[transform,color] duration-200 ease-out group-hover-fine:-translate-y-0.5 group-hover-fine:translate-x-0.5 group-hover-fine:text-accent" aria-hidden="true" />
      </div>
    </motion.a>
  );
}

export function AboutPage() {
  const nextTab = tabs[1];

  return (
    <>
      <section className="flex min-h-[calc(100svh-4rem)] flex-col justify-end pb-12 pt-14 sm:pb-16">
        <Headline />
        <div className="hero-fade mt-8 grid grid-cols-1 gap-x-10 gap-y-8 border-t border-white/10 pt-8 sm:mt-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="max-w-[44rem] text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">{about.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Action label={isSchoolMode ? 'APSC 169 Project' : 'View projects'} href={`#/${nextTab.id}`} icon="next" primary />
              <ContactActions className="contents" />
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-5">
            {about.disciplines.map(({ name, items }) => (
              <div key={name}>
                <dt className="text-[15px] text-accent">{name}</dt>
                <dd className="mt-2 text-base leading-snug text-ink">{items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <motion.section aria-label="Project areas" variants={group} {...inView} className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {about.bridge.map((tile, index) => (
          <BridgeTile key={tile.title} tile={tile} className={index === 0 ? 'lg:col-span-7' : 'lg:col-span-5'} />
        ))}
      </motion.section>

      <section aria-label="About" className="mt-20 divide-y divide-white/10 border-t border-white/10 sm:mt-32">
        {about.sections.map(({ title, paragraphs }) => (
          <motion.div key={title} variants={group} {...inView} className="grid grid-cols-1 gap-x-10 gap-y-4 py-10 sm:py-16 lg:grid-cols-12">
            <motion.h2 variants={rise} className="font-display text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[1.02] tracking-[-0.025em] text-white lg:col-span-6">
              {title}
            </motion.h2>
            <div className="space-y-4 lg:col-span-6">
              {paragraphs.map((text) => (
                <motion.p key={text} variants={rise} className="max-w-[42rem] text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>
        ))}
      </section>

      <motion.section aria-label="Skills and contact" variants={group} {...inView} className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <motion.div variants={rise} className="card rounded-2xl p-5 sm:p-7 lg:col-span-8">
          <h2 className="font-display text-[2.25rem] leading-tight tracking-[-0.02em] text-white">Skills</h2>
          <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
            {about.skillGroups.map(({ name, skills }) => (
              <div key={name} className="border-t border-white/10 pt-3">
                <dt className="text-[15px] text-accent">{name}</dt>
                <dd className="mt-2 text-base leading-snug text-ink">{skills.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
        <motion.div variants={rise} className="card rounded-2xl p-5 sm:p-7 lg:col-span-4">
          <h2 className="font-display text-[2.25rem] leading-tight tracking-[-0.02em] text-white">Get in touch</h2>
          <ContactActions className="mt-5 flex flex-wrap gap-2" />
        </motion.div>
      </motion.section>
    </>
  );
}
