export const ease = [0.23, 1, 0.32, 1];

export const spring = {
  press: { type: 'spring', duration: 0.3, bounce: 0.2 },
  hover: { type: 'spring', duration: 0.45, bounce: 0.15 },
  sheet: { type: 'spring', duration: 0.5, bounce: 0 },
};

export const tap = { whileTap: { scale: 0.97 }, transition: { type: 'spring', duration: 0.25, bounce: 0 } };

export const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

// Full transform strings rather than `y`, so the entrance runs on the compositor and holds up while the page is still loading.
export const rise = {
  hidden: { opacity: 0, transform: 'translateY(20px)' },
  show: { opacity: 1, transform: 'translateY(0px)', transition: { duration: 0.7, ease } },
};

export const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -12% 0px' } };
