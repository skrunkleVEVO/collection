import { motion } from 'framer-motion';

import { tabs } from '@/data/portfolioData';
import { spring, tap } from '@/lib/motion';
import { cn } from '@/lib/utils';

// On phones the name row scrolls away and the tabs stay pinned.
export function Header({ active }) {
  return (
    <header className="sticky -top-[3.25rem] z-40 border-b border-white/10 bg-ground/80 backdrop-blur-md sm:top-0">
      <div className="page-frame flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <a href={`#/${tabs[0].id}`} className="flex min-h-11 items-center self-start font-display text-xl tracking-[-0.01em] text-white">
          skrunkleVEVO
        </a>
        <nav aria-label="Primary">
          <ul className={cn('grid gap-1 sm:flex', tabs.length > 2 ? 'grid-cols-4' : 'grid-cols-2')}>
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
                      'relative flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg px-1 text-[13px] transition-colors duration-150 sm:px-3 sm:text-sm',
                      current ? 'font-medium text-white' : 'text-soft hover-fine:text-ink',
                    )}
                  >
                    {current && <motion.span layoutId="nav-tab" transition={spring.press} className="absolute inset-0 rounded-lg border border-white/10 bg-surface" />}
                    <span className="relative sm:hidden">{short}</span>
                    <span className="relative hidden sm:inline">{label}</span>
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
