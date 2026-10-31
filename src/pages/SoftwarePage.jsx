import { motion } from 'framer-motion';

import { PageHeading } from '@/components/PageHeading';
import { ProjectCard } from '@/components/ProjectCard';
import { projects, software } from '@/data/portfolioData';
import { group, inView } from '@/lib/motion';

export function ProjectGrid({ children }) {
  return (
    <motion.div variants={group} {...inView} className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 lg:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
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
