import { motion } from 'framer-motion';

import { tabs } from '@/data/portfolioData';
import { spring, tap } from '@/lib/motion';
import { cn } from '@/lib/utils';

// Wordmark on the left margin, tabs starting on the axis. On phones the name row scrolls away and the tabs stay pinned.
export function Header({ active }) {
  return (
    <header className="sticky -top-[3.25rem] z-40 bg-ground lg:top-0">
      <div className="page-frame journal items-center py-2 lg:py-3">
        <a href={`#/${tabs[0].id}`} className="flex min-h-11 items-center self-start font-display text-xl tracking-[-0.01em] text-white lg:col-span-5">
          skrunkleVEVO
        </a>
        <nav aria-label="Primary" className="lg:col-span-7">
          <ul className={cn('grid gap-1 lg:flex lg:gap-8', tabs.length > 2 ? 'grid-cols-4' : 'grid-cols-2')}>
            {tabs.map(({ id, label, short }) => {
              const current = id === active;
              return (
                <li key={id}>
                  <motion.a
                    href={`#/${id}`}
                    {...tap}
                    aria-label={label}
                    aria-current={current ? 'page' : undefined}
                    className={cn(
                      'relative flex min-h-11 items-center justify-center whitespace-nowrap text-[15px] transition-colors duration-150 lg:justify-start',
                      current ? 'text-white' : 'text-soft hover-fine:text-ink',
                    )}
                  >
                    <span className="lg:hidden">{short}</span>
                    <span className="hidden lg:inline">{label}</span>
                    {current && <motion.span layoutId="nav-tab" transition={spring.press} className="absolute inset-x-0 bottom-1 h-0.5 bg-accent" />}
                  </motion.a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
