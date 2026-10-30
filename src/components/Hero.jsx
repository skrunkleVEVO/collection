import { Action } from '@/components/Action';
import { GITHUB } from '@/data/projects';

export function Hero() {
  return (
    <header className="hero relative flex min-h-[max(100svh,40rem)] flex-col overflow-hidden">
      <div className="hero-water" aria-hidden="true">
        <div className="hero-glow" />
      </div>

      <h1 className="hero-headline">
        <span className="hero-line">
          <span className="hero-line-inner hero-line-dry">I build what</span>
        </span>{' '}
        <span className="hero-line">
          <span className="hero-line-inner hero-line-wet" style={{ animationDelay: '110ms' }}>
            I need.
          </span>
        </span>
      </h1>

      <div className="page-frame relative flex items-center justify-between gap-3 pt-5 sm:pt-7">
        <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="text-[15px] font-semibold tracking-tight text-ink">
          skrunkleVEVO
        </a>
        <p className="rounded-full border border-white/10 px-3 py-1.5 text-[13px] leading-none text-ink">UBCO Engineering — First Year</p>
      </div>

      <div className="page-frame hero-fade relative mt-auto flex flex-col gap-6 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:pb-10">
        <p className="max-w-[34rem] text-[17px] leading-snug text-ink sm:text-xl">
          First-year engineering student at UBC Okanagan, building web and mobile apps, automation and custom tools alongside my coursework.
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Action label="View projects" href="#work" icon="down" primary />
          <Action label="GitHub" href={GITHUB} icon="github" className="border-white/30" />
        </div>
      </div>
    </header>
  );
}
