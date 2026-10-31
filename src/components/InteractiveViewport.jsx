import { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Monitor, Play, Smartphone, X } from 'lucide-react';

import { spring } from '@/lib/motion';
import { cn } from '@/lib/utils';

// The app always renders at a real device size and is scaled to fit, so "Desktop" shows the
// desktop layout even on a phone, and the toggle triggers the app's own breakpoints.
const DEVICES = {
  desktop: { label: 'Desktop', Icon: Monitor, width: 1280, height: 720 },
  mobile: { label: 'Mobile', Icon: Smartphone, width: 390, height: 844 },
};

const STAGE_PADDING = 24;
const MIN_MOBILE_STAGE = 600;

function measure(stageWidth, mode) {
  const desktopHeight = Math.round((stageWidth * 9) / 16);
  if (mode === 'desktop') return { stageHeight: desktopHeight, width: stageWidth, height: desktopHeight };
  const stageHeight = Math.max(desktopHeight, MIN_MOBILE_STAGE);
  const height = stageHeight - STAGE_PADDING * 2;
  return { stageHeight, width: Math.round((height * DEVICES.mobile.width) / DEVICES.mobile.height), height };
}

function DeviceToggle({ id, mode, onChange }) {
  return (
    <div role="group" aria-label="Preview size" className="flex shrink-0 rounded-lg border border-white/10 bg-ground p-0.5">
      {Object.entries(DEVICES).map(([key, { label, Icon }]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          aria-pressed={mode === key}
          className={cn(
            'relative flex min-h-9 items-center gap-1.5 rounded-md px-2.5 text-[13px] transition-colors duration-150',
            'after:absolute after:inset-x-0 after:-inset-y-1 after:content-[""]',
            mode === key ? 'font-medium text-ground' : 'text-soft hover-fine:text-ink',
          )}
        >
          {mode === key && <motion.span layoutId={`viewport-toggle-${id}`} transition={spring.press} className="absolute inset-0 rounded-md bg-accent" />}
          <Icon className="relative size-3.5" aria-hidden="true" />
          <span className="relative">{label}</span>
        </button>
      ))}
    </div>
  );
}

export function InteractiveViewport({ project, className }) {
  const { id, title, liveUrl, previews } = project;
  const [mode, setMode] = useState('desktop');
  const [live, setLive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [stageWidth, setStageWidth] = useState(0);
  const stage = useRef(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const node = stage.current;
    setStageWidth(node.clientWidth);
    const observer = new ResizeObserver(([entry]) => setStageWidth(Math.round(entry.contentRect.width)));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const device = DEVICES[mode];
  const preview = previews[mode];
  const frame = measure(stageWidth, mode);
  const scale = frame.width / device.width;

  const stop = () => {
    setLive(false);
    setLoaded(false);
  };

  return (
    <figure className={cn('overflow-hidden rounded-xl border border-white/10 bg-ground', className)}>
      <div className="flex min-h-12 flex-wrap items-center gap-x-3 gap-y-1 border-b border-white/10 px-3 py-1.5">
        <p className="min-w-0 basis-full truncate font-mono text-[13px] text-soft [font-variant-ligatures:none] sm:flex-1 sm:basis-0">{liveUrl}</p>
        <div className="ml-auto">
          <DeviceToggle id={id} mode={mode} onChange={setMode} />
        </div>
      </div>

      <motion.div
        ref={stage}
        initial={false}
        animate={{ height: frame.stageHeight }}
        transition={reduceMotion ? { duration: 0 } : spring.sheet}
        className="relative flex items-center justify-center overflow-hidden"
      >
        <motion.div
          layout
          transition={spring.sheet}
          style={{ width: frame.width, height: frame.height, borderRadius: mode === 'mobile' ? 28 : 0 }}
          data-frame
          className={cn('relative shrink-0 overflow-hidden', mode === 'mobile' && 'border border-white/20')}
        >
          <motion.div layout="position" transition={spring.sheet} className="absolute inset-0">
            {live ? (
              <>
                {!loaded && <p className="absolute inset-0 grid place-items-center text-[15px] text-soft">Loading {title}…</p>}
                <iframe
                  src={liveUrl}
                  title={`${title}, running live`}
                  onLoad={() => setLoaded(true)}
                  className="absolute left-0 top-0 origin-top-left border-0 bg-transparent"
                  style={{ width: device.width, height: device.height, transform: `scale(${scale})` }}
                />
              </>
            ) : (
              <AnimatePresence initial={false} mode="popLayout">
                <motion.img
                  key={mode}
                  src={preview.src}
                  alt={preview.alt}
                  loading="lazy"
                  draggable="false"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </AnimatePresence>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-white/10 px-3 py-2">
        <figcaption className="min-w-[14rem] flex-1 text-[13px] leading-snug text-soft">{live ? 'Running the deployed app.' : project.previewNote}</figcaption>
        <div className="flex shrink-0 items-center gap-1">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title} in a new tab`}
            className="flex min-h-11 items-center gap-1 px-3 text-[13px] text-soft transition-colors duration-150 hover-fine:text-ink"
          >
            New tab
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
          {live ? (
            <button
              type="button"
              onClick={stop}
              aria-label={`Close the live ${title} app`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-[15px] font-medium text-ink transition-[transform,background-color] duration-150 ease-out hover-fine:bg-white/5 active:scale-[0.97]"
            >
              <X className="size-3.5" aria-hidden="true" />
              Close
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setLive(true)}
              aria-label={`Run ${title} live`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 text-[15px] font-medium text-ground transition-[transform,background-color] duration-150 ease-out hover-fine:bg-white active:scale-[0.97]"
            >
              <Play className="size-3.5 fill-current" aria-hidden="true" />
              Run live
            </button>
          )}
        </div>
      </div>
    </figure>
  );
}
