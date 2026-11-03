import { PageHeading } from '@/components/PageHeading';
import { ProjectRow } from '@/components/ProjectCard';
import { projects, software } from '@/data/portfolioData';

export function SoftwareRows({ titleAs }) {
  return (
    <div className="mt-24 space-y-36 sm:mt-36 sm:space-y-52">
      {projects.map((project) => (
        <ProjectRow key={project.id} project={project} as={titleAs} />
      ))}
    </div>
  );
}

export function SoftwarePage() {
  return (
    <section>
      <PageHeading title={software.title} lede={software.lede} action={{ label: 'See the four apps', onClick: () => document.getElementById(projects[0].id).scrollIntoView() }} />
      <SoftwareRows />
    </section>
  );
}
