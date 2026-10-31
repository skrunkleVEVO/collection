import { Action } from '@/components/Action';
import { GITHUB } from '@/data/projects';

export function Hero() {
  return (
    <header className="flex min-h-[max(92svh,38rem)] flex-col">
      <div className="page-frame flex items-center justify-between gap-3 pt-5 sm:pt-7">
        <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="text-[15px] font-semibold tracking-tight text-ink">
          skrunkleVEVO
        </a>
        <p className="rounded-full border border-white/10 px-3 py-1.5 text-[13px] leading-none text-soft">UBCO Engineering — First Year</p>
      </div>

      <div className="page-frame mt-auto pb-10 pt-16 sm:pb-14">
        <h1 className="max-w-[17em] text-[clamp(2.625rem,6.6vw,6.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
          <span className="hero-line">
            <span className="hero-line-inner text-white">Software for personal friction.</span>
          </span>{' '}
          <span className="hero-line">
            <span className="hero-line-inner text-soft" style={{ animationDelay: '90ms' }}>
              Systems engineering for physical friction.
            </span>
          </span>
        </h1>

        <div className="hero-fade mt-8 flex flex-col gap-7 sm:mt-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <p className="max-w-[44rem] text-[17px] leading-relaxed text-ink sm:text-xl sm:leading-relaxed">
            First-year engineering student at UBC Okanagan. I build custom web tools, mobile apps, and automation to eliminate my own daily bottlenecks—and apply rigorous systems engineering to solve physical infrastructure and accessibility challenges on campus.
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Action label="View projects" href="#work" icon="down" primary />
            <Action label="GitHub" href={GITHUB} icon="github" />
          </div>
        </div>
      </div>
    </header>
  );
}
