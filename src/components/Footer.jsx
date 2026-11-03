import { contact, tabs } from '@/data/portfolioData';

const PLACE = 'link-draw inline-flex min-h-11 items-center t-lead';
const SMALL = 'link-draw inline-flex min-h-11 items-center text-[15px] tracking-[0.005em]';

// The name opens the footer on a full field of the accent, like the back cover of a printed journal.
export function Footer() {
  return (
    <footer className="mt-32 bg-accent text-ground sm:mt-48">
      <div className="page-frame flex min-h-[80svh] flex-col gap-y-20 pb-6 pt-10 sm:pt-14">
        <p aria-hidden="true" className="whitespace-nowrap font-display text-[14.4vw] font-[300] leading-[0.8] tracking-[-0.05em]">
          skrunkleVEVO
        </p>

        <div className="journal gap-y-12 border-t border-ground/25 pt-8">
          <div className="lg:col-span-5">
            <h2 className="t-title">Reach me</h2>
            <ul className="mt-6">
              <li>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className={PLACE}>
                  {contact.githubLabel}
                </a>
              </li>
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className={PLACE}>
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.linkedin && (
                <li>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={PLACE}>
                    LinkedIn
                  </a>
                </li>
              )}
              <li className="flex min-h-11 items-center t-lead">Kelowna, BC</li>
            </ul>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:col-span-7">
            <ul>
              {tabs.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#/${id}`} className={SMALL}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-[15px] leading-relaxed sm:col-span-2 sm:max-w-[26rem] sm:pt-3">
              A first-year engineering journal from UBC Okanagan: one physical system on the McKinley Escarpment, four digital tools in daily use.
            </p>
          </nav>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-ground/25 pt-3 text-[15px]">
          <p>© {new Date().getFullYear()} skrunkleVEVO</p>
          <a href="#top" onClick={(event) => (event.preventDefault(), window.scrollTo({ top: 0 }))} className={SMALL}>
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
