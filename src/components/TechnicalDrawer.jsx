import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

import { ENGINEERING as E } from '@/data/projects';
import { TechStack } from '@/components/ProjectMeta';
import { spring } from '@/lib/motion';

const FOCUSABLE = 'a[href], button:not([disabled])';

function Section({ title, children }) {
  return (
    <section className="mt-12">
      <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink">{title}</h3>
      {children}
    </section>
  );
}

export function TechnicalDrawer({ onClose }) {
  const panel = useRef(null);
  const closeButton = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();

    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !panel.current) return;
      const items = panel.current.querySelectorAll(FOCUSABLE);
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        className="absolute inset-0 bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.18 } }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%', transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] } }}
        transition={spring.sheet}
        className="absolute inset-y-0 right-0 w-full max-w-[44rem] overflow-y-auto overscroll-contain border-l border-white/10 bg-surface"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-surface px-5 py-3 sm:px-10">
          <p className="truncate text-[15px] text-soft">{E.category}</p>
          <button
            ref={closeButton}
            type="button"
            onClick={onClose}
            aria-label="Close technical brief"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 text-ink transition-[transform,background-color] duration-150 ease-out hover-fine:bg-white/10 active:scale-[0.97]"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 pb-16 pt-8 sm:px-10">
          <h2 id="drawer-title" className="text-[clamp(1.875rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
            Perovskite-silicon tandem cells
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink">{E.description}</p>
          <p className="mt-3 text-[17px] leading-relaxed text-ink">{E.question}</p>
          <TechStack tech={E.tech} className="mt-6" />

          <Section title="Key design constraints">
            <dl className="mt-5 space-y-5">
              {E.constraints.map(({ title, text }) => (
                <div key={title}>
                  <dt className="text-[17px] font-medium text-ink">{title}</dt>
                  <dd className="mt-1 text-base leading-relaxed text-soft">{text}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Sustainability metrics">
            <p className="mt-3 text-base leading-relaxed text-soft">{E.sourceNote}</p>
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left">
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Figure</th>
                    <th scope="col">What it measures</th>
                  </tr>
                </thead>
                <tbody>
                  {E.metrics.map(({ value, label, source }) => (
                    <tr key={label} className="border-t border-white/10 first:border-t-0">
                      <td className="w-[6.5rem] whitespace-nowrap py-4 pl-4 pr-2 align-top text-2xl font-semibold tabular-nums tracking-tight text-sun sm:w-[8rem]">{value}</td>
                      <td className="py-4 pl-2 pr-4 align-top text-[15px] leading-snug text-ink">
                        {label}{' '}
                        <a href={source.href} target="_blank" rel="noopener noreferrer" aria-label={`Source: ${source.label}`} className="text-soft underline underline-offset-4 transition-colors duration-150 hover-fine:text-ink">
                          source
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Technical analysis: the trade-offs">
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-[15px] leading-snug">
                <thead>
                  <tr className="text-soft">
                    <th scope="col" className="w-1/2 px-4 py-3 font-medium">The case for it</th>
                    <th scope="col" className="w-1/2 border-l border-white/10 px-4 py-3 font-medium">What it depends on</th>
                  </tr>
                </thead>
                <tbody>
                  {E.tradeoffs.map(({ gain, cost }) => (
                    <tr key={gain} className="border-t border-white/10">
                      <td className="px-4 py-3 align-top text-ink">{gain}</td>
                      <td className="border-l border-white/10 px-4 py-3 align-top text-ink">{cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Sources">
            <ul className="mt-4 space-y-3">
              {E.sources.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-[15px] leading-snug text-ink underline decoration-white/30 underline-offset-4 transition-colors duration-150 hover-fine:decoration-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </motion.div>
    </div>
  );
}
