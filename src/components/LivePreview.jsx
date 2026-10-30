import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Play, X } from 'lucide-react';

import { ease, spring } from '@/lib/motion';
import { cn } from '@/lib/utils';

// Rests as a screenshot. "Run it here" swaps in the real deployed app, so nothing loads until asked.
export function LivePreview({ project, phone = false, className }) {
  const [live, setLive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { image, liveUrl, title, glow } = project;
  const host = liveUrl.replace('https://', '');

  const stop = () => {
    setLive(false);
    setLoaded(false);
  };

  return (
    <motion.figure
      className={cn('group relative', className)}
      style={{ '--glow': glow }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="preview-glow" aria-hidden="true" />
      <motion.div
        whileHover={live ? undefined : { scale: 1.012 }}
        transition={spring.hover}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface"
      >
        <div className="flex h-10 items-center gap-3 border-b border-white/10 px-3">
          <span className="min-w-0 flex-1 truncate text-[13px] text-soft">{host}</span>
          {live && (
            <>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${title} in a new tab`}
                className="grid size-7 place-items-center rounded-md text-soft transition-colors duration-150 hover-fine:bg-white/10 hover-fine:text-ink"
              >
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={stop}
                aria-label={`Close the live ${title} app`}
                className="grid size-7 place-items-center rounded-md text-soft transition-colors duration-150 hover-fine:bg-white/10 hover-fine:text-ink"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        <div
          className={cn('relative overflow-hidden bg-ground', live && !phone && 'preview-live-tall')}
          style={live && !phone ? undefined : { aspectRatio: phone ? '390 / 844' : `${image.width} / ${image.height}` }}
        >
          <AnimatePresence initial={false}>
            {live ? (
              <motion.div key="live" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {!loaded && <p className="absolute inset-0 grid place-items-center text-[15px] text-soft">Loading {title}…</p>}
                <iframe
                  src={liveUrl}
                  title={`${title}, running live`}
                  onLoad={() => setLoaded(true)}
                  className="relative h-full w-full border-0 bg-transparent"
                />
              </motion.div>
            ) : (
              <motion.div key="still" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  draggable="false"
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover-fine:scale-[1.02]"
                />
                <div className="preview-overlay" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setLive(true)}
                  className="preview-run absolute bottom-4 left-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-sun px-4 text-[15px] font-medium text-ground transition-[transform,background-color,opacity] duration-150 ease-out hover-fine:bg-sun-bright active:scale-[0.97]"
                >
                  <Play className="size-3.5 fill-current" aria-hidden="true" />
                  Run {title} here
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.figure>
  );
}
