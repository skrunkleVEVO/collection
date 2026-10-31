export const ease = [0.23, 1, 0.32, 1];

export const spring = {
  press: { type: 'spring', duration: 0.3, bounce: 0.2 },
  hover: { type: 'spring', duration: 0.45, bounce: 0.15 },
  sheet: { type: 'spring', duration: 0.5, bounce: 0 },
};

export const tap = { whileTap: { scale: 0.98 }, transition: spring.press };

export const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-40px' } };
