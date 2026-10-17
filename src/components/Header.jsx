import profile from '../data/profile.json';
import { cx, toCode } from '../lib/utils.js';
import { Icon } from './ui.jsx';

export const MODES = [
  { id: 'personal', label: 'Personal', code: 'PERSONAL' },
  { id: 'university', label: 'University ePortfolio', code: 'UNI_EPORTFOLIO' },
];

export function ModeToggle({ mode, onChange }) {
  return (
    <div role="radiogroup" aria-label="Portfolio view" className="relative grid grid-cols-2 border border-zinc-800 bg-zinc-950 p-0.5">
      {/* Sliding indicator */}
      <span
        aria-hidden="true"
        className={cx(
          'absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] border border-emerald-400/40 bg-emerald-400/10 transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)]',
          mode === 'university' && 'translate-x-full'
        )}
      />
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          role="radio"
          aria-checked={mode === m.id}
          onClick={() => onChange(m.id)}
          className={cx(
            'relative z-10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors sm:px-3',
            mode === m.id ? 'text-emerald-300' : 'text-zinc-500 hover:text-zinc-300'
          )}
        >
          <span className="sm:hidden">{m.id === 'personal' ? 'PERSONAL' : 'UNI'}</span>
          <span className="hidden sm:inline">{m.code}</span>
        </button>
      ))}
    </div>
  );
}

function Ticker({ projects }) {
  const items = [
    'SYS_STATUS: ONLINE',
    `LOC: ${toCode(profile.location)}`,
    `INST: UBCO · B.A.SC Y1`,
    `FOCUS: ${profile.focus.map(toCode).join(' / ')}`,
    ...projects.map((p) => `[${p.code}] ${toCode(p.title)}: ${p.status.toUpperCase()}`),
    `BUILD: ${__BUILD_DATE__}`,
  ];
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center whitespace-nowrap px-4">
          <span className="mr-4 h-1 w-1 bg-emerald-500/60" />
          {t}
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-b border-zinc-800 bg-zinc-950 py-1.5 font-mono text-[10px] tracking-[0.14em] text-zinc-500 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]" aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  );
}

export default function Header({ mode, onModeChange, projects }) {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-md">
      <div className="border-b border-zinc-800">
        <div className="mx-auto flex h-12 max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-6 w-6 place-items-center border border-zinc-700 font-mono text-[10px] font-semibold text-emerald-400">SK</span>
            <span className="hidden font-mono text-xs tracking-wider text-zinc-200 sm:inline">{profile.name}</span>
            <span className="hidden font-mono text-[10px] tracking-[0.16em] text-zinc-600 lg:inline">// ENG_HUB</span>
          </a>
          <div className="flex items-center gap-2">
            <ModeToggle mode={mode} onChange={onModeChange} />
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="grid h-[30px] w-[30px] place-items-center border border-zinc-800 text-zinc-400 transition-colors hover:border-emerald-400/60 hover:text-emerald-300"
            >
              <Icon name="github" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
      <Ticker projects={projects} />
    </header>
  );
}
