import { motion } from 'framer-motion';

import { ICONS } from '@/components/Icons';
import { tap } from '@/lib/motion';
import { cn } from '@/lib/utils';

const VARIANTS = {
  primary: 'border border-accent bg-accent text-ground hover-fine:border-white hover-fine:bg-white',
  outline: 'border border-white/20 text-ink hover-fine:border-white/50',
};

// A link when given href (external unless it starts with # or mailto:), otherwise a button.
export function Action({ label, href, icon, variant = 'outline', primary, className, ...props }) {
  const Glyph = ICONS[icon];
  const classes = cn(
    'inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium',
    'transition-[background-color,border-color] duration-150 ease-out',
    VARIANTS[primary ? 'primary' : variant],
    className,
  );
  const content = (
    <>
      {Glyph && <Glyph className="size-4 shrink-0" aria-hidden="true" />}
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
