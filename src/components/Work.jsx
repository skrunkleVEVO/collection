import { motion } from 'framer-motion';

import { AuraFlowDemo } from '@/components/AuraFlowDemo';
import { LivePreview } from '@/components/LivePreview';
import { ProjectMeta } from '@/components/ProjectMeta';
import { ENGINEERING, PROJECTS } from '@/data/projects';
import { ease, group, inView, rise } from '@/lib/motion';

const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));
const NAV = [...PROJECTS, { id: ENGINEERING.id, title: 'Perovskite tandems' }];

function Index() {
  return (
    <motion.ul variants={rise} className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[clamp(1.25rem,2.4vw,2.25rem)] font-medium leading-tight tracking-[-0.02em] sm:gap-x-7">
      {NAV.map(({ id, title, thumb }) => (
        <li key={id}>
          <a href={`#${id}`} className="group inline-flex items-center gap-2 text-soft transition-colors duration-150 hover-fine:text-ink">
            {title}
            {thumb && (
              <img
                src={thumb}
                alt=""
                width="46"
                height="30"
                loading="lazy"
                className="hidden h-[0.8em] w-[1.2em] origin-left rounded-[3px] object-cover object-top transition-transform duration-200 ease-out group-hover-fine:scale-[1.6] sm:inline-block"
              />
            )}
          </a>
        </li>
      ))}
    </motion.ul>
  );
}

// Triaj's phone sits over the corner of its desktop frame.
function TriajPhone({ phone }) {
  return (
    <motion.img
      src={phone.src}
      alt={phone.alt}
      width={phone.width}
      height={phone.height}
      loading="lazy"
      draggable="false"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, delay: 0.12, ease }}
      className="pointer-events-none absolute -bottom-10 -right-2 z-10 hidden w-[24%] rounded-[1.25rem] border border-white/20 lg:block"
    />
  );
}

export function Work() {
  const { auraflow, somefolio, triaj, garmentdb } = byId;

  return (
    <main id="work" className="scroll-mt-4">
      <motion.div variants={group} {...inView} className="page-frame pt-24 sm:pt-40">
        <motion.h2 variants={rise} className="text-[clamp(3.25rem,9vw,8.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink">
          Selected work
        </motion.h2>
        <Index />
      </motion.div>

      <article id="auraflow" className="page-frame mt-20 grid scroll-mt-8 items-center gap-10 sm:mt-32 lg:grid-cols-12 lg:gap-6">
        <ProjectMeta project={auraflow} className="lg:col-span-5" />
        <AuraFlowDemo className="lg:col-span-6 lg:col-start-7" />
      </article>

      <article id="somefolio" className="page-frame mt-28 grid scroll-mt-8 items-end gap-10 sm:mt-48 lg:grid-cols-12 lg:gap-6">
        <LivePreview project={somefolio} className="lg:col-span-8" />
        <ProjectMeta project={somefolio} className="lg:col-span-4 lg:pl-6" />
      </article>

      <article id="triaj" className="page-frame mt-28 grid scroll-mt-8 items-start gap-10 sm:mt-48 lg:grid-cols-12 lg:gap-6">
        <ProjectMeta project={triaj} className="lg:col-span-4" />
        <div className="relative lg:col-span-8">
          <LivePreview project={triaj} />
          <TriajPhone phone={triaj.phone} />
        </div>
      </article>

      <article id="garmentdb" className="page-frame mb-28 mt-28 grid scroll-mt-8 items-center gap-10 sm:mb-48 sm:mt-48 lg:grid-cols-12 lg:gap-6">
        <div className="mx-auto w-full max-w-[22rem] lg:col-span-4 lg:col-start-2 lg:max-w-none">
          <LivePreview project={garmentdb} phone />
        </div>
        <ProjectMeta project={garmentdb} className="lg:col-span-5 lg:col-start-7" />
      </article>
    </main>
  );
}
