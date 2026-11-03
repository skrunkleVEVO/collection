import { PageHeading } from '@/components/PageHeading';
import { software } from '@/data/portfolioData';
import { DigitalIndex, PhysicalEntry } from '@/pages/AboutPage';
import { EscarpmentPage } from '@/pages/EscarpmentPage';
import { SoftwareRows } from '@/pages/SoftwarePage';

// The single page used when isSchoolMode is false: both divisions of the archive, then every case study in full.
export function ProjectsPage() {
  return (
    <>
      <PageHeading title="Projects" lede={software.lede} />
      <PhysicalEntry href="#escarpment" />
      <DigitalIndex />
      <section aria-label="Software case studies">
        <SoftwareRows titleAs="h3" />
      </section>
      <div className="mt-32 sm:mt-48">
        <EscarpmentPage headingAs="h2" />
      </div>
    </>
  );
}
