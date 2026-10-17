import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import allProjects from './data/projects.json';
import Header, { MODES } from './components/Header.jsx';
import BentoGrid from './components/BentoGrid.jsx';
import SpecDrawer from './components/SpecDrawer.jsx';
import Footer from './components/Footer.jsx';

// ?view=eportfolio gives instructors a direct link to the university view.
const readMode = () => (new URLSearchParams(window.location.search).get('view') === 'eportfolio' ? 'university' : 'personal');

export default function App() {
  const [mode, setMode] = useState(readMode);
  const [activeId, setActiveId] = useState(null);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef();

  const projects = useMemo(() => allProjects.filter((p) => p.modes.includes(mode)), [mode]);
  const active = allProjects.find((p) => p.id === activeId) || null;
  const index = projects.findIndex((p) => p.id === activeId);

  const changeMode = (next) => {
    setMode(next);
    const url = new URL(window.location.href);
    if (next === 'university') url.searchParams.set('view', 'eportfolio');
    else url.searchParams.delete('view');
    window.history.replaceState(null, '', url);
  };

  const openProject = (project) => {
    clearTimeout(closeTimer.current);
    setActiveId(project.id);
    setOpen(true);
  };

  const close = useCallback(() => {
    setOpen(false);
    // Keep content mounted until the slide-out finishes.
    closeTimer.current = setTimeout(() => setActiveId(null), 400);
  }, []);

  const step = useCallback(
    (dir) => {
      if (!projects.length) return;
      const i = index < 0 ? 0 : (index + dir + projects.length) % projects.length;
      setActiveId(projects[i].id);
    },
    [index, projects]
  );

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const modeMeta = MODES.find((m) => m.id === mode);

  return (
    <div id="top" className="min-h-screen">
      <Header mode={mode} onModeChange={changeMode} projects={projects} />

      <main className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-6 sm:pt-8">
        <div className="mb-3 flex items-end justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
          <span>
            // INDEX <span className="text-zinc-700">—</span> {String(projects.length).padStart(2, '0')} BUILDS
          </span>
          <span>
            MODE: <span className="text-emerald-400">{modeMeta.code}</span>
          </span>
        </div>

        <BentoGrid mode={mode} projects={projects} onOpen={openProject} />
      </main>

      <Footer />

      <SpecDrawer
        project={active}
        open={open}
        onClose={close}
        onStep={step}
        position={{ index: Math.max(index, 0), total: projects.length }}
      />
    </div>
  );
}
