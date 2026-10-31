import { motion } from 'framer-motion';

import { AuraFlowDemo } from '@/components/AuraFlowDemo';
import { InteractiveViewport } from '@/components/InteractiveViewport';
import { ProjectBody, ProjectMeta, ProjectTitle } from '@/components/ProjectMeta';
import { PROJECTS } from '@/data/projects';
import { group, inView, rise } from '@/lib/motion';

const CARD = 'scroll-mt-6 rounded-2xl border border-white/10 bg-surface p-4 sm:p-8';

export function SectionHeading({ title, children }) {
  return (
    <motion.div variants={group} {...inView} className="mb-8 max-w-[44rem] sm:mb-12">
      <motion.h2 variants={rise} className="text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
        {title}
      </motion.h2>
      <motion.p variants={rise} className="mt-4 text-[17px] leading-relaxed text-soft sm:text-xl sm:leading-relaxed">
        {children}
      </motion.p>
    </motion.div>
  );
}

export function Work() {
  const [auraflow, ...webApps] = PROJECTS;

  return (
    <main id="work" className="page-frame scroll-mt-6 pt-20 sm:pt-32">
      <SectionHeading title="Personal friction">Four tools I built to remove my own daily bottlenecks.</SectionHeading>

      <div className="space-y-5 sm:space-y-8">
        <article id={auraflow.id} className={`${CARD} grid items-center gap-8 lg:grid-cols-12`}>
          <motion.div variants={group} {...inView} className="lg:col-span-7">
            <ProjectTitle project={auraflow} />
            <div className="mt-6">
              <ProjectBody project={auraflow} />
            </div>
          </motion.div>
          <AuraFlowDemo className="lg:col-span-5" />
        </article>

        {webApps.map((project) => (
          <article key={project.id} id={project.id} className={CARD}>
            <ProjectMeta project={project} />
            <InteractiveViewport project={project} className="mt-8" />
          </article>
        ))}
      </div>
    </main>
  );
}
