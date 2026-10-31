import { motion } from 'framer-motion';

import { tabs } from '@/data/portfolioData';
import { spring, tap } from '@/lib/motion';
import { cn } from '@/lib/utils';

export function Header({ active }) {
  return (
    <header className="z-40 border-b border-white/10 bg-ground sm:sticky sm:top-0">
      <div className="page-frame flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <a href={`#/${tabs[0].id}`} className="flex min-h-11 items-center text-[15px] font-semibold tracking-tight text-white">
          skrunkleVEVO
        </a>
        <nav aria-label="Primary">
          <ul className="grid grid-cols-2 gap-1 sm:flex">
            {tabs.map(({ id, label }) => {
              const current = id === active;
              return (
                <li key={id}>
                  <motion.a
                    href={`#/${id}`}
                    {...tap}
                    aria-current={current ? 'page' : undefined}
                    className={cn(
                      'relative flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg px-3 text-sm transition-colors duration-150',
                      current ? 'font-medium text-white' : 'text-soft hover-fine:text-ink',
                    )}
                  >
                    {current && <motion.span layoutId="nav-tab" transition={spring.press} className="absolute inset-0 rounded-lg border border-white/10 bg-surface" />}
                    <span className="relative">{label}</span>
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
