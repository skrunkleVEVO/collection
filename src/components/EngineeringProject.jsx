import { motion } from 'framer-motion';

import { Action } from '@/components/Action';
import { TechStack } from '@/components/ProjectMeta';
import { SectionHeading } from '@/components/Work';
import { ENGINEERING as E } from '@/data/projects';
import { group, inView, rise } from '@/lib/motion';

export function EngineeringProject({ onOpen }) {
  return (
    <section className="page-frame pt-20 sm:pt-32">
      <SectionHeading title="Physical friction">Systems analysis applied to physical infrastructure.</SectionHeading>

      <motion.article variants={group} {...inView} id={E.id} className="grid scroll-mt-6 gap-10 rounded-2xl border border-white/10 bg-surface p-4 sm:p-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.h3 variants={rise} className="text-[clamp(1.875rem,4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-white">
            {E.title}
          </motion.h3>
          <motion.p variants={rise} className="mt-3 text-[15px] text-soft">
            {E.tag}
          </motion.p>
          <motion.p variants={rise} className="mt-6 max-w-[38rem] text-[17px] leading-relaxed text-ink">
            {E.description}
          </motion.p>
          <motion.div variants={rise}>
            <TechStack tech={E.tech} className="mt-5" />
          </motion.div>
          <motion.div variants={rise} className="mt-6">
            <Action label="Open technical brief" icon="doc" primary onClick={onOpen} aria-haspopup="dialog" />
          </motion.div>
        </div>

        <motion.div variants={rise} className="self-end lg:col-span-5">
          <p className="text-[clamp(4rem,9vw,8rem)] font-semibold leading-[0.9] tracking-[-0.04em] tabular-nums text-white">35.5%</p>
          <p className="mt-4 max-w-[26rem] text-[15px] leading-snug text-soft">
            Certified efficiency of LONGi’s record tandem research cell, against a practical ceiling of about 29% for silicon alone.
          </p>
        </motion.div>
      </motion.article>
    </section>
  );
}
