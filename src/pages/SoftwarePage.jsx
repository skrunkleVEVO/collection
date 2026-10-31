import { motion } from 'framer-motion';

import { PageHeading } from '@/components/PageHeading';
import { ProjectCard } from '@/components/ProjectCard';
import { projects, software } from '@/data/portfolioData';
import { group, inView } from '@/lib/motion';

const LAYOUT = [
  ['lg:col-span-5', 'lg:aspect-[8/7]'],
  ['lg:col-span-7', 'lg:aspect-[16/10]'],
  ['lg:col-span-7', 'lg:aspect-[16/10]'],
  ['lg:col-span-5', 'lg:aspect-[8/7]'],
];

export function ProjectGrid({ children }) {
  return (
    <motion.div variants={group} {...inView} className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 lg:grid-cols-12">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} className={LAYOUT[index][0]} stageShape={LAYOUT[index][1]} />
      ))}
      {children}
    </motion.div>
  );
}

export function SoftwarePage() {
  return (
    <section>
      <PageHeading title={software.title} lede={software.lede} />
      <ProjectGrid />
    </section>
  );
}
