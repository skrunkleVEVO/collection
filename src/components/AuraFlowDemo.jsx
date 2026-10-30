import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { spring } from '@/lib/motion';
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

const PROFILE_TILES = ['#3f5d6b', '#7a6a55', '#55704f', '#6b4f5d', '#4f5a70', '#70664f'];

function Feed() {
  return (
    <div className="h-full space-y-2 p-2" aria-hidden="true">
      <div className="h-[58%] rounded-lg bg-[#5f4b6b]" />
      <div className="h-[40%] rounded-lg bg-[#3f6b66]" />
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
        {PROFILE_TILES.map((color) => (
          <span key={color} className="aspect-square rounded-sm" style={{ backgroundColor: color }} />
        ))}
      </div>
    </div>
  );
}

const VIEWS = { home: Feed, reels: Feed, messages: Messages, profile: Profile };

// The wording and the overlay's behaviour come from the app: it covers feeds, stops above the
// tab bar, and "Open DMs" jumps to messages.
export function AuraFlowDemo({ className }) {
  const [screen, setScreen] = useState('reels');
  const current = SCREENS.find((s) => s.id === screen);
  const View = VIEWS[screen];

  return (
    <figure data-ui className={cn('flex flex-col items-center rounded-2xl border border-white/10 bg-lake px-4 pb-6 pt-8 sm:pt-10', className)}>
      <div className="w-full max-w-[18rem] overflow-hidden rounded-[2rem] border border-white/20 bg-ground">
        <div className="flex h-9 items-center justify-center" aria-hidden="true">
          <span className="h-1.5 w-14 rounded-full bg-white/15" />
        </div>

        <div className="relative h-[24rem] overflow-hidden" aria-live="polite">
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
                <button
                  type="button"
                  onClick={() => setScreen('messages')}
                  className="mt-5 min-h-11 rounded-full bg-sun px-5 text-[15px] font-medium text-ground transition-transform duration-150 ease-out active:scale-[0.97]"
                >
                  Open DMs
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-4 border-t border-white/10 p-1.5">
          {SCREENS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setScreen(id)}
              aria-pressed={id === screen}
              className={cn(
                'relative min-h-11 rounded-lg text-[13px] transition-colors duration-150',
                id === screen ? 'font-medium text-ink' : 'text-soft hover-fine:text-ink',
              )}
            >
              {id === screen && <motion.span layoutId="auraflow-tab" transition={spring.press} className="absolute inset-0 rounded-lg bg-white/10" />}
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>
      </div>
      <figcaption className="mt-5 max-w-sm text-center text-[13px] leading-snug text-ink">
        Tap the tabs. This is a recreation of the overlay using the app’s own wording, with made-up messages, not a screenshot.
      </figcaption>
    </figure>
  );
}
