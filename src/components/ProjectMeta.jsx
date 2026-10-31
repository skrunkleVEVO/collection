import { motion } from 'framer-motion';

import { Action } from '@/components/Action';
import { group, inView, rise } from '@/lib/motion';
import { cn } from '@/lib/utils';

export function TechStack({ tech, className }) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)} aria-label="Tech stack">
      {tech.map((t) => (
        <li key={t} className="rounded-md border border-white/10 px-2 py-1 font-mono text-[13px] leading-none text-soft">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function ProjectTitle({ project }) {
  return (
    <>
      <motion.h3 variants={rise} className="text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.035em] text-white">
        {project.title}
      </motion.h3>
      <motion.p variants={rise} className="mt-3 text-[clamp(1.125rem,1.6vw,1.375rem)] font-medium leading-snug tracking-tight text-ink">
        {project.headline}
      </motion.p>
      <motion.p variants={rise} className="mt-2 text-[15px] text-soft">
        {project.tag}
      </motion.p>
    </>
  );
}

export function ProjectBody({ project }) {
  return (
    <>
      <motion.p variants={rise} className="max-w-[38rem] text-[17px] leading-relaxed text-ink">
        {project.description}
      </motion.p>
      <motion.div variants={rise}>
        <TechStack tech={project.tech} className="mt-5" />
      </motion.div>
      <motion.div variants={rise} className="mt-6 flex flex-wrap gap-3">
        {project.links.map((link) => (
          <Action key={link.label} {...link} />
        ))}
      </motion.div>
    </>
  );
}

// Title on the left and details on the right on wide screens, stacked on phones.
export function ProjectMeta({ project }) {
  return (
    <motion.div variants={group} {...inView} className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <ProjectTitle project={project} />
      </div>
      <div className="lg:col-span-7">
        <ProjectBody project={project} />
      </div>
    </motion.div>
  );
}
