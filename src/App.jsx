import { useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'framer-motion';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { tabs } from '@/data/portfolioData';
import { AboutPage } from '@/pages/AboutPage';
import { EscarpmentPage } from '@/pages/EscarpmentPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { ReflectionPage } from '@/pages/ReflectionPage';
import { SoftwarePage } from '@/pages/SoftwarePage';

// Elements are created once and pages stay mounted, so changing tabs never reloads a running preview.
const PAGES = {
  about: <AboutPage />,
  'apsc-169': <EscarpmentPage />,
  software: <SoftwarePage />,
  reflection: <ReflectionPage />,
  projects: <ProjectsPage />,
};

const SITE_NAME = 'skrunkleVEVO';

function activeFromHash() {
  const id = window.location.hash.replace(/^#\//, '');
  return tabs.some((tab) => tab.id === id) ? id : tabs[0].id;
}

export default function App() {
  const [active, setActive] = useState(activeFromHash);
  const main = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const onPointerMove = (event) => {
      const card = event.target.closest?.('.card');
      if (!card) return;
      const box = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${event.clientX - box.left}px`);
      card.style.setProperty('--spot-y', `${event.clientY - box.top}px`);
    };
    document.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => document.removeEventListener('pointermove', onPointerMove);
  }, []);

  useEffect(() => {
    const onHashChange = () => setActive(activeFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.title = `${tabs.find((tab) => tab.id === active).label} | ${SITE_NAME}`;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    main.current.focus({ preventScroll: true });
  }, [active]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-[100svh] flex-col overflow-x-clip">
        <Header active={active} />
        <main ref={main} tabIndex={-1} className="page-frame flex-1 outline-none">
          {tabs.map(({ id }) => (
            <div key={id} hidden={id !== active} className="page">
              {PAGES[id]}
            </div>
          ))}
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
