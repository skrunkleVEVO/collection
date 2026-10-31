import { motion } from 'framer-motion';

import { Action } from '@/components/Action';
import { AuraFlowDemo } from '@/components/AuraFlowDemo';
import { InteractiveViewport } from '@/components/InteractiveViewport';
import { rise } from '@/lib/motion';

export function TechStack({ tech }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
      {tech.map((t) => (
        <li key={t} className="rounded-md border border-white/10 px-2 py-1 text-[13px] leading-none text-soft">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({ project }) {
  return (
    <motion.article
      variants={rise}
      id={project.id}
      className="flex scroll-mt-20 flex-col rounded-2xl border border-white/10 bg-surface p-2 transition-colors duration-200 hover-fine:border-white/20 sm:p-3"
    >
      {project.liveUrl ? <InteractiveViewport project={project} /> : <AuraFlowDemo />}

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-none tracking-tight text-white">{project.title}</h3>
        <p className="mt-2 text-[15px] text-soft">{project.tag}</p>
        <p className="mt-4 max-w-[38rem] text-base leading-relaxed text-ink">{project.description}</p>
        <div className="mt-4">
          <TechStack tech={project.tech} />
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.links.map((link) => (
            <Action key={link.label} {...link} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}
