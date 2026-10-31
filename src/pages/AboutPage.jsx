import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { Action } from '@/components/Action';
import { about, contact, isSchoolMode, tabs } from '@/data/portfolioData';
import { group, inView, rise, spring } from '@/lib/motion';

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
    <h1 className="max-w-[15em] font-display text-[clamp(2.75rem,7.4vw,7.25rem)] leading-[1.02] tracking-[-0.03em] text-white">
      {about.title.split(' ').map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="hero-word">
            <span className={word === 'actually' ? 'hero-word-inner italic' : 'hero-word-inner'} style={{ animationDelay: `${index * 35}ms` }}>
              {word}
            </span>
          </span>{' '}
        </span>
      ))}
    </h1>
  );
}

function BridgeTile({ tile }) {
  return (
    <motion.a
      href={`#/${isSchoolMode ? tile.tab : 'projects'}`}
      variants={rise}
      whileTap={{ scale: 0.98 }}
      transition={spring.press}
      className="card group flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="aspect-[16/9] overflow-hidden border-b border-white/10">
        <img src={tile.image} alt="" loading="lazy" draggable="false" className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover-fine:scale-[1.03]" />
      </div>
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="text-[15px] text-soft">{tile.side}</p>
          <h2 className="mt-1 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight tracking-[-0.02em] text-white">{tile.title}</h2>
          <p className="mt-2 text-base leading-relaxed text-ink">{tile.text}</p>
        </div>
        <ArrowUpRight className="mt-1 size-5 shrink-0 text-soft transition-[transform,color] duration-200 ease-out group-hover-fine:-translate-y-0.5 group-hover-fine:translate-x-0.5 group-hover-fine:text-white" aria-hidden="true" />
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
        <div className="hero-fade">
          <p className="mt-6 max-w-[44rem] text-lg leading-relaxed text-soft sm:mt-8 sm:text-xl sm:leading-relaxed">{about.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Action label={isSchoolMode ? 'APSC 169 Project' : 'View projects'} href={`#/${nextTab.id}`} icon="next" primary />
            <ContactActions className="contents" />
          </div>
        </div>
      </section>

      <motion.section aria-label="Project areas" variants={group} {...inView} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {about.bridge.map((tile) => (
          <BridgeTile key={tile.title} tile={tile} />
        ))}
      </motion.section>

      <section aria-label="About" className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-24 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-7">
          {about.sections.map(({ title, paragraphs }) => (
            <motion.div key={title} variants={group} {...inView}>
              <motion.h2 variants={rise} className="font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.08] tracking-[-0.02em] text-white">
                {title}
              </motion.h2>
              {paragraphs.map((text) => (
                <motion.p key={text} variants={rise} className="mt-4 max-w-[40rem] text-lg leading-relaxed text-ink">
                  {text}
                </motion.p>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.aside variants={rise} {...inView} className="card self-start rounded-2xl p-4 sm:p-6 lg:sticky lg:top-24 lg:col-span-4 lg:col-start-9">
          <h2 className="font-display text-[1.75rem] leading-tight tracking-[-0.015em] text-white">Skills</h2>
          <dl className="mt-4">
            {about.skillGroups.map(({ name, skills }) => (
              <div key={name} className="border-t border-white/10 py-3">
                <dt className="text-[13px] text-soft">{name}</dt>
                <dd className="mt-1 text-base leading-snug text-ink">{skills.join(', ')}</dd>
              </div>
            ))}
          </dl>
          <h2 className="mt-5 font-display text-[1.75rem] leading-tight tracking-[-0.015em] text-white">Get in touch</h2>
          <ContactActions className="mt-4 flex flex-wrap gap-2" />
        </motion.aside>
      </section>
    </>
  );
}
