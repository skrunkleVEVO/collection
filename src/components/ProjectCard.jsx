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
      className="card flex scroll-mt-24 flex-col rounded-2xl p-2 sm:p-3"
    >
      {project.liveUrl ? <InteractiveViewport project={project} /> : <AuraFlowDemo />}

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="font-display text-[clamp(2.25rem,3.6vw,3.25rem)] leading-none tracking-[-0.025em] text-white">{project.title}</h3>
        <p className="mt-3 text-lg font-medium leading-snug tracking-tight text-ink">{project.headline}</p>
        <p className="mt-1 text-[15px] text-soft">{project.tag}</p>
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
