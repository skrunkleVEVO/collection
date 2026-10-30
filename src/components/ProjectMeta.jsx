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

export function ProjectMeta({ project, children, className }) {
  return (
    <motion.div variants={group} {...inView} className={cn('flex flex-col items-start', className)}>
      <motion.h3 variants={rise} className="text-[clamp(2.5rem,4.6vw,4.5rem)] font-semibold leading-none tracking-[-0.035em] text-ink">
        {project.title}
      </motion.h3>
      <motion.p variants={rise} className="mt-3 text-[15px] text-soft">
        {project.category}
      </motion.p>
      <motion.p variants={rise} className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-ink">
        {project.description}
      </motion.p>
      {project.detail && (
        <motion.p variants={rise} className="mt-3 max-w-[34rem] text-[15px] leading-relaxed text-soft">
          {project.detail}
        </motion.p>
      )}
      <motion.div variants={rise}>
        <TechStack tech={project.tech} className="mt-6" />
      </motion.div>
      {children}
      {project.links && (
        <motion.div variants={rise} className="mt-7 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <Action key={link.label} {...link} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
