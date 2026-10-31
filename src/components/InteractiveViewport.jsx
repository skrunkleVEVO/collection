import { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Play, Smartphone } from 'lucide-react';

import { Action } from '@/components/Action';
import { spring, tap } from '@/lib/motion';
import { useFitScale } from '@/lib/useFitScale';
import { cn } from '@/lib/utils';

// The app always renders at a real device size and is scaled to fit, so "Desktop" shows the
// desktop layout even on a phone, and the toggle triggers the app's own breakpoints.
const DEVICES = {
  desktop: { label: 'Desktop', Icon: Monitor, width: 1280, height: 720 },
  mobile: { label: 'Mobile', Icon: Smartphone, width: 390, height: 823 },
};

function DeviceToggle({ id, mode, onChange }) {
  return (
    <div role="group" aria-label="Preview size" className="flex shrink-0 rounded-lg border border-white/10 bg-surface p-0.5">
      {Object.entries(DEVICES).map(([key, { label, Icon }]) => (
        <motion.button
          key={key}
          type="button"
          {...tap}
          onClick={() => onChange(key)}
          aria-pressed={mode === key}
          className={cn(
            'relative flex min-h-10 items-center gap-1.5 rounded-md px-2.5 text-[13px] transition-colors duration-150',
            mode === key ? 'font-medium text-ground' : 'text-soft hover-fine:text-ink',
          )}
        >
          {mode === key && <motion.span layoutId={`viewport-toggle-${id}`} transition={spring.press} className="absolute inset-0 rounded-md bg-accent" />}
          <Icon className="relative size-3.5" aria-hidden="true" />
          <span className="relative">{label}</span>
        </motion.button>
      ))}
    </div>
  );
}

export function InteractiveViewport({ project, stageShape }) {
  const { id, title, liveUrl, previews, previewNote } = project;
  const [mode, setMode] = useState('desktop');
  const [live, setLive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const device = DEVICES[mode];
  const [frame, scale] = useFitScale(device.width);

  const stop = () => {
    setLive(false);
    setLoaded(false);
  };

  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-ground">
      <div className="flex min-h-[3.75rem] flex-wrap items-center gap-x-3 gap-y-1 border-b border-white/10 px-3 py-1.5">
        <p className="min-w-0 flex-[1_1_10rem] truncate text-[13px] text-soft">{liveUrl}</p>
        <div className="ml-auto">
          <DeviceToggle id={id} mode={mode} onChange={setMode} />
        </div>
      </div>

      {/* The stage's shape never changes, so toggling can't move anything else on the page. */}
      <div className={cn('stage-dots relative aspect-[3/4] overflow-hidden sm:aspect-[4/3]', stageShape)}>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            ref={frame}
            layout
            transition={spring.sheet}
            data-frame
            style={{ borderRadius: mode === 'mobile' ? 24 : 0 }}
            className={cn('relative shrink-0 overflow-hidden', mode === 'desktop' ? 'aspect-video w-full' : 'aspect-[9/19] h-[calc(100%-2rem)] ring-1 ring-white/20')}
          >
            <motion.div layout="position" transition={spring.sheet} className="absolute inset-0">
              {live ? (
                <>
                  {!loaded && <p className="absolute inset-0 grid place-items-center text-[15px] text-soft">Loading {title}…</p>}
                  {/* Only this element's size and scale change on toggle, so the running app keeps its state. */}
                  <iframe
                    src={liveUrl}
                    title={`${title}, running live`}
                    onLoad={() => setLoaded(true)}
                    className="absolute left-0 top-0 origin-top-left border-0 bg-transparent"
                    style={{ width: device.width, height: device.height, transform: `scale(${scale})` }}
                  />
                </>
              ) : (
                Object.keys(DEVICES).map((key) => (
                  <img
                    key={key}
                    src={previews[key].src}
                    alt={key === mode ? previews[key].alt : ''}
                    aria-hidden={key === mode ? undefined : true}
                    loading="lazy"
                    draggable="false"
                    className={cn('absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-200', key === mode ? 'opacity-100' : 'opacity-0')}
                  />
                ))
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="flex min-h-[3.875rem] flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-white/10 px-3 py-2">
        <figcaption className="min-w-0 flex-[1_1_12rem] text-[13px] leading-snug text-soft">{live ? 'Running the deployed app.' : previewNote}</figcaption>
        {live ? (
          <Action label="Close" onClick={stop} aria-label={`Close the live ${title} app`} className="shrink-0 px-4" />
        ) : (
          <motion.button
            type="button"
            {...tap}
            onClick={() => setLive(true)}
            aria-label={`Run ${title} live`}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-white/20 px-4 text-[15px] font-medium text-ink transition-colors duration-150 hover-fine:border-white/50"
          >
            <Play className="size-3.5 fill-current" aria-hidden="true" />
            Run live
          </motion.button>
        )}
      </div>
    </figure>
  );
}
