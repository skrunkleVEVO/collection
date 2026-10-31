import { GITHUB } from '@/data/projects';

export function Footer() {
  return (
    <footer className="page-frame mt-20 sm:mt-32">
      <div className="flex flex-col justify-between gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center">
        <p className="text-[13px] text-soft">© {new Date().getFullYear()} skrunkleVEVO · Kelowna, BC</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 text-[15px]">
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center text-ink underline decoration-white/30 underline-offset-4 transition-colors duration-150 hover-fine:decoration-white">
            github.com/skrunkleVEVO
          </a>
          <a href="#top" className="flex min-h-11 items-center text-soft transition-colors duration-150 hover-fine:text-ink">
            Back to top
          </a>
        </nav>
      </div>
    </footer>
  );
}
