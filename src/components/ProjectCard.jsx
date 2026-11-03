import { motion } from 'framer-motion';

import { Action } from '@/components/Action';
import { AuraFlowDemo } from '@/components/AuraFlowDemo';
import { InteractiveViewport } from '@/components/InteractiveViewport';
import { group, inView, rise } from '@/lib/motion';

// One case-study row: the name at display size across the frame, the record in the left zone, the working app on the axis.
export function ProjectRow({ project, as: Title = 'h2' }) {
  const facts = [
    ['Platform', project.tag],
    ['Built with', project.tech.join(', ')],
    ['Status', project.liveUrl ? 'Deployed, in daily use' : 'Source on GitHub'],
  ];

  return (
    <motion.article variants={group} {...inView} id={project.id} className="scroll-mt-24">
      <motion.div variants={rise} className="journal items-end gap-y-3">
        <Title className="t-display text-white max-lg:text-[clamp(3.25rem,13vw,6rem)] lg:col-span-7">
          {project.title}
        </Title>
        <p className="t-lead text-ink lg:col-span-5 lg:pb-3">{project.headline}</p>
      </motion.div>

      <div className="journal mt-8 gap-y-10 sm:mt-12">
        <motion.div variants={rise} className="order-2 flex flex-col lg:order-1 lg:col-span-5">
          <p className="max-w-[40ch] text-lg leading-relaxed text-ink">{project.description}</p>
          <dl className="mt-8 grid grid-cols-1 gap-y-5 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-1">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="text-[15px] text-soft">{label}</dt>
                <dd className="mt-1 text-lg leading-snug text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-2 lg:mt-auto lg:pt-10">
            {project.links.map((link) => (
              <Action key={link.label} {...link} aria-label={`${project.title}: ${link.label}`} />
            ))}
          </div>
        </motion.div>
        <motion.div variants={rise} className="order-1 min-w-0 lg:order-2 lg:col-span-7">
          {project.liveUrl ? <InteractiveViewport project={project} stageShape="lg:aspect-[16/10]" /> : <AuraFlowDemo stageShape="lg:aspect-[16/10]" />}
        </motion.div>
      </div>
    </motion.article>
  );
}
