import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { spring, tap } from '@/lib/motion';
import { useFitScale } from '@/lib/useFitScale';
import { cn } from '@/lib/utils';

const SCREENS = [
  { id: 'home', label: 'Home', blocked: true },
  { id: 'reels', label: 'Reels', blocked: true },
  { id: 'messages', label: 'Messages', blocked: false },
  { id: 'profile', label: 'Profile', blocked: false },
];

const THREADS = [
  ['Maya', 'are you coming to the lab?'],
  ['Study group', 'problem 4 is the hard one'],
  ['Jordan', 'sent you the notes'],
  ['Sam', 'see you at 3'],
  ['Priya', 'thanks!'],
];

const PROFILE_TILES = [0.2, 0.12, 0.16, 0.1, 0.18, 0.14];

// Drawn at this size, then scaled to fit the phone frame.
const SCREEN_WIDTH = 270;

function Feed() {
  return (
    <div className="h-full space-y-2 p-2" aria-hidden="true">
      <div className="h-[58%] rounded-lg bg-white/15" />
      <div className="h-[40%] rounded-lg bg-white/10" />
    </div>
  );
}

function Messages() {
  return (
    <ul className="px-3 py-2">
      {THREADS.map(([name, text]) => (
        <li key={name} className="flex items-center gap-3 py-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-[13px] font-medium text-ink">{name[0]}</span>
          <span className="min-w-0">
            <span className="block text-[13px] font-medium text-ink">{name}</span>
            <span className="block truncate text-[13px] text-soft">{text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Profile() {
  return (
    <div className="p-3">
      <div className="flex items-center gap-3">
        <span className="size-12 rounded-full bg-white/15" />
        <span className="text-[13px] font-medium text-ink">Your profile</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-1" aria-hidden="true">
        {PROFILE_TILES.map((alpha) => (
          <span key={alpha} className="aspect-square rounded-sm bg-white" style={{ opacity: alpha }} />
        ))}
      </div>
    </div>
  );
}

const VIEWS = { home: Feed, reels: Feed, messages: Messages, profile: Profile };

// The wording and the overlay's behaviour come from the app: it covers feeds, stops above the
// tab bar, and "Open DMs" jumps to messages.
export function AuraFlowDemo() {
  const [screen, setScreen] = useState('reels');
  const [frame, scale] = useFitScale(SCREEN_WIDTH);
  const current = SCREENS.find((s) => s.id === screen);
  const View = VIEWS[screen];

  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-ground">
      <div className="flex min-h-[3.75rem] items-center border-b border-white/10 px-3 py-1.5">
        <p className="text-[13px] text-soft">Interactive recreation</p>
      </div>

      <div className="stage-dots relative aspect-[3/4] overflow-hidden sm:aspect-[4/3]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div ref={frame} className="relative aspect-[9/19] h-[calc(100%-2rem)] shrink-0 overflow-hidden rounded-3xl bg-ground ring-1 ring-white/20">
            <div
              className="absolute left-0 top-0 flex origin-top-left flex-col"
              style={{ width: SCREEN_WIDTH, height: (SCREEN_WIDTH * 19) / 9, transform: `scale(${scale})` }}
            >
              <div className="flex h-9 shrink-0 items-center justify-center" aria-hidden="true">
                <span className="h-1.5 w-14 rounded-full bg-white/15" />
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden" aria-live="polite">
                <View />
                <AnimatePresence initial={false}>
                  {current.blocked && (
                    <motion.div
                      key="overlay"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6, transition: { duration: 0.12 } }}
                      transition={spring.press}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-ground/95 px-5 text-center"
                    >
                      <p className="text-lg font-semibold tracking-tight text-ink">Instagram Feed Blocked</p>
                      <p className="mt-1.5 text-[13px] text-soft">Your DMs are still accessible</p>
                      <motion.button
                        type="button"
                        {...tap}
                        onClick={() => setScreen('messages')}
                        className="mt-5 min-h-11 rounded-full bg-accent px-5 text-[15px] font-medium text-ground"
                      >
                        Open DMs
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid shrink-0 grid-cols-4 border-t border-white/10 p-1">
                {SCREENS.map(({ id, label }) => (
                  <motion.button
                    key={id}
                    type="button"
                    {...tap}
                    onClick={() => setScreen(id)}
                    aria-pressed={id === screen}
                    className={cn('relative min-h-11 rounded-lg text-xs transition-colors duration-150', id === screen ? 'font-medium text-ink' : 'text-soft hover-fine:text-ink')}
                  >
                    {id === screen && <motion.span layoutId="auraflow-tab" transition={spring.press} className="absolute inset-0 rounded-lg bg-white/10" />}
                    <span className="relative">{label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="flex min-h-[3.875rem] items-center border-t border-white/10 px-3 py-2 text-[13px] leading-snug text-soft">
        Tap the tabs. A recreation using the app’s own wording, with made-up messages, not a screenshot.
      </figcaption>
    </figure>
  );
}
