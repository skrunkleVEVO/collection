import { motion } from 'framer-motion';

import { Action } from '@/components/Action';
import { TechStack } from '@/components/ProjectMeta';
import { ENGINEERING as E } from '@/data/projects';
import { group, inView, rise } from '@/lib/motion';

export function EngineeringProject({ onOpen }) {
  return (
    <section id={E.id} className="scroll-mt-8 bg-lake py-20 sm:py-32">
      <motion.div variants={group} {...inView} className="page-frame grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <motion.h3 variants={rise} className="text-[clamp(1.875rem,4.6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
            {E.title}
          </motion.h3>
          <motion.p variants={rise} className="mt-4 text-[15px] text-ink">
            {E.category}
          </motion.p>
          <motion.p variants={rise} className="mt-6 max-w-[36rem] text-[17px] leading-relaxed text-ink">
            {E.description}
          </motion.p>
          <motion.div variants={rise}>
            <TechStack tech={E.tech} className="mt-6 [&_li]:border-white/20 [&_li]:text-ink" />
          </motion.div>
          <motion.div variants={rise} className="mt-8">
            <Action label="Open technical brief" icon="doc" primary onClick={onOpen} aria-haspopup="dialog" />
          </motion.div>
        </div>

        <motion.div variants={rise} className="self-end lg:col-span-5">
          <p className="text-[clamp(4.5rem,11vw,10rem)] font-semibold leading-[0.9] tracking-[-0.04em] tabular-nums text-sun">35.5%</p>
          <p className="mt-4 max-w-[26rem] text-[17px] leading-snug text-ink">
            Certified efficiency of LONGi’s record tandem research cell, against a practical ceiling of about 29% for silicon alone.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
