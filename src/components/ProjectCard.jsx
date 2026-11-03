import { motion } from 'framer-motion';

import { Action } from '@/components/Action';
import { AuraFlowDemo } from '@/components/AuraFlowDemo';
import { InteractiveViewport } from '@/components/InteractiveViewport';
import { group, inView, rise } from '@/lib/motion';
import { Facts } from '@/pages/AboutPage';

// One case-study row: it opens on a sheet rule, the name at display size across the frame,
// the record in the left zone and the working app on the axis.
export function ProjectRow({ project, as: Title = 'h2' }) {
  const facts = [
    { label: 'Platform', value: project.tag },
    { label: 'Built with', value: project.tech.join(', ') },
    { label: 'Status', value: project.liveUrl ? 'Deployed, in daily use' : 'Source on GitHub' },
  ];

  return (
    <motion.article variants={group} {...inView} id={project.id} className="sheet scroll-mt-24">
      <motion.div variants={rise} className="journal items-end gap-y-3">
        <Title className="t-display text-white max-lg:text-[clamp(3.25rem,13vw,6rem)] lg:col-span-7">{project.title}</Title>
        <p className="t-lead text-ink lg:col-span-5 lg:pb-[0.55vw]">{project.headline}</p>
      </motion.div>

      <div className="journal lead-in gap-y-10">
        <div className="order-2 flex flex-col lg:order-1 lg:col-span-5">
          <motion.p variants={rise} className="max-w-[40ch] text-lg leading-relaxed text-ink">
            {project.description}
          </motion.p>
          <Facts items={facts} className="mt-8 grid-cols-1 sm:grid-cols-3 lg:w-[78%] lg:grid-cols-1" />
          <motion.div variants={rise} className="mt-8 flex flex-wrap gap-2 lg:mt-auto lg:pt-10">
            {project.links.map((link) => (
              <Action key={link.label} {...link} aria-label={`${project.title}: ${link.label}`} />
            ))}
          </motion.div>
        </div>
        <motion.div variants={rise} className="order-1 min-w-0 lg:order-2 lg:col-span-7">
          {project.liveUrl ? <InteractiveViewport project={project} stageShape="lg:aspect-[16/10]" /> : <AuraFlowDemo stageShape="lg:aspect-[16/10]" />}
        </motion.div>
      </div>
    </motion.article>
  );
}
