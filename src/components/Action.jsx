import { motion } from 'framer-motion';

import { ICONS } from '@/components/Icons';
import { tap } from '@/lib/motion';
import { cn } from '@/lib/utils';

// Square, ruled buttons. Hover inverts the fill; the glyph nudges in the direction it points.
const VARIANTS = {
  primary: 'border-accent bg-accent text-ground hover-fine:border-ink hover-fine:bg-ink',
  outline: 'border-line-strong text-ink hover-fine:border-ink hover-fine:bg-ink hover-fine:text-ground',
};

const NUDGE = {
  next: 'group-hover-fine:translate-x-[3px]',
  external: 'group-hover-fine:-translate-y-[2px] group-hover-fine:translate-x-[2px]',
  down: 'group-hover-fine:translate-y-[2px]',
};

// A link when given href (external unless it starts with # or mailto:), otherwise a button.
export function Action({ label, href, icon, variant = 'outline', primary, className, ...props }) {
  const Glyph = ICONS[icon];
  const classes = cn(
    'group inline-flex min-h-11 max-w-full items-center justify-center gap-2.5 border px-5 text-[15px] font-medium tracking-[0.005em]',
    'transition-[background-color,border-color,color] duration-200 ease-out',
    VARIANTS[primary ? 'primary' : variant],
    className,
  );
  const content = (
    <>
      {Glyph && <Glyph className={cn('size-4 shrink-0 transition-transform duration-300 ease-out', NUDGE[icon])} aria-hidden="true" />}
      <span className="truncate">{label}</span>
    </>
  );

  if (!href) {
    return (
      <motion.button type="button" {...tap} className={classes} {...props}>
        {content}
      </motion.button>
    );
  }
  const external = !href.startsWith('#') && !href.startsWith('mailto:');
  return (
    <motion.a href={href} {...tap} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
      {content}
    </motion.a>
  );
}
