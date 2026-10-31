import { motion } from 'framer-motion';

import { Action } from '@/components/Action';
import { PageHeading } from '@/components/PageHeading';
import { escarpment as E, software } from '@/data/portfolioData';
import { rise } from '@/lib/motion';
import { EscarpmentPage } from '@/pages/EscarpmentPage';
import { ProjectGrid } from '@/pages/SoftwarePage';

// The single page used when isSchoolMode is false: every project together.
export function ProjectsPage() {
  return (
    <>
      <section>
        <PageHeading title="Projects" lede={software.lede} />
        <ProjectGrid>
          <motion.article variants={rise} className="card flex flex-col items-start rounded-2xl p-5 sm:p-7 lg:col-span-12">
            <h2 className="font-display text-[clamp(2.25rem,3.6vw,3.25rem)] leading-tight tracking-[-0.025em] text-white">{E.title}</h2>
            <p className="mt-2 text-[15px] text-soft">Academic Engineering Design</p>
            <p className="mt-4 max-w-[44rem] text-base leading-relaxed text-ink">{E.lede}</p>
            <div className="mt-6">
              <Action label="Read the project" icon="down" primary onClick={() => document.getElementById('escarpment').scrollIntoView()} />
            </div>
          </motion.article>
        </ProjectGrid>
      </section>
      <div className="mt-16 sm:mt-24">
        <EscarpmentPage headingAs="h2" />
      </div>
    </>
  );
}
