import { contact } from '@/data/portfolioData';

const LINK = 'flex min-h-11 items-center text-ink underline decoration-white/30 underline-offset-4 transition-colors duration-150 hover-fine:decoration-white';

export function Footer() {
  return (
    <footer className="page-frame mt-20 sm:mt-32">
      <div className="flex flex-col justify-between gap-3 border-t border-white/10 py-5 sm:flex-row sm:items-center">
        <p className="text-[13px] text-soft">© {new Date().getFullYear()} skrunkleVEVO · Kelowna, BC</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 text-[15px]">
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className={LINK}>
            {contact.githubLabel}
          </a>
          {contact.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={LINK}>
              LinkedIn
            </a>
          )}
          {contact.email && (
            <a href={`mailto:${contact.email}`} className={LINK}>
              {contact.email}
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
}
