import { GITHUB } from '@/data/projects';

export function Footer() {
  return (
    <footer className="pb-6 pt-16 sm:pt-24">
      <div className="page-frame flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <p className="max-w-[30rem] text-[17px] leading-snug text-ink">The code behind these apps is open on GitHub.</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1 text-[15px]">
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center text-ink underline decoration-white/30 underline-offset-4 transition-colors duration-150 hover-fine:decoration-white">
            github.com/skrunkleVEVO
          </a>
          <a href="#top" className="flex min-h-11 items-center text-soft transition-colors duration-150 hover-fine:text-ink">
            Back to top
          </a>
        </nav>
      </div>

      <div className="page-frame mt-14 sm:mt-24">
        <svg viewBox="0 0 1000 150" className="block w-full fill-ink" role="img" aria-label="skrunkleVEVO">
          <text x="0" y="122" textLength="1000" lengthAdjust="spacingAndGlyphs" fontSize="150" fontWeight="700" letterSpacing="-5">
            skrunkleVEVO
          </text>
        </svg>
        <p className="mt-4 text-[13px] text-soft">© {new Date().getFullYear()} skrunkleVEVO · Kelowna, BC</p>
      </div>
    </footer>
  );
}
