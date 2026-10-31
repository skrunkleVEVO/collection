import { motion } from 'framer-motion';

import { Action } from '@/components/Action';
import { about, contact, isSchoolMode, tabs } from '@/data/portfolioData';
import { group, inView, rise } from '@/lib/motion';

export function ContactActions({ className }) {
  return (
    <div className={className}>
      <Action label={contact.githubLabel} href={contact.github} icon="github" />
      {contact.linkedin && <Action label="LinkedIn" href={contact.linkedin} icon="link" />}
      {contact.email && <Action label="Email me" href={`mailto:${contact.email}`} icon="mail" />}
    </div>
  );
}

export function AboutPage() {
  const nextTab = tabs[1];

  return (
    <>
      <section className="flex min-h-[min(72svh,44rem)] flex-col justify-end pb-12 pt-16 sm:pb-20">
        <h1 className="max-w-[17em] text-[clamp(2.5rem,6.4vw,6rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
          <span className="hero-line">
            <span className="hero-line-inner">{about.title}</span>
          </span>
        </h1>
        <div className="hero-fade">
          <p className="mt-6 max-w-[44rem] text-lg leading-relaxed text-soft sm:mt-8 sm:text-xl sm:leading-relaxed">{about.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Action label={isSchoolMode ? 'APSC 169 Project' : 'View projects'} href={`#/${nextTab.id}`} icon="next" primary />
            <ContactActions className="contents" />
          </div>
        </div>
      </section>

      <section aria-label="About" className="grid grid-cols-1 gap-10 border-t border-white/10 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-12 lg:col-span-7">
          {about.sections.map(({ title, paragraphs }) => (
            <motion.div key={title} variants={group} {...inView}>
              <motion.h2 variants={rise} className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-tight text-white">
                {title}
              </motion.h2>
              {paragraphs.map((text) => (
                <motion.p key={text} variants={rise} className="mt-4 max-w-[40rem] text-[17px] leading-relaxed text-ink">
                  {text}
                </motion.p>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.aside variants={rise} {...inView} className="self-start rounded-2xl border border-white/10 bg-surface p-4 sm:p-6 lg:col-span-4 lg:col-start-9">
          <h2 className="text-lg font-semibold tracking-tight text-white">Technical skills</h2>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {about.skills.map((skill) => (
              <li key={skill} className="rounded-md border border-white/10 px-2.5 py-1.5 text-sm leading-none text-ink">
                {skill}
              </li>
            ))}
          </ul>
          <h2 className="mt-8 text-lg font-semibold tracking-tight text-white">Get in touch</h2>
          <ContactActions className="mt-4 flex flex-wrap gap-2" />
        </motion.aside>
      </section>
    </>
  );
}
