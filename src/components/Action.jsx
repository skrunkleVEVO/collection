import { ICONS } from '@/components/Icons';
import { cn } from '@/lib/utils';

const VARIANTS = {
  primary: 'bg-sun text-ground hover-fine:bg-sun-bright',
  outline: 'border border-white/20 text-ink hover-fine:border-white/40 hover-fine:bg-white/5',
};

// A link when given href (external unless it starts with #), otherwise a button.
export function Action({ label, href, icon, variant = 'outline', primary, className, ...props }) {
  const Glyph = ICONS[icon];
  const classes = cn(
    'inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-[15px] font-medium',
    'transition-[transform,background-color,border-color] duration-150 ease-out active:scale-[0.97]',
    VARIANTS[primary ? 'primary' : variant],
    className,
  );
  const content = (
    <>
      {Glyph && <Glyph className="size-4 shrink-0" aria-hidden="true" />}
      {label}
    </>
  );

  if (!href) {
    return (
      <button type="button" className={classes} {...props}>
        {content}
      </button>
    );
  }
  const external = !href.startsWith('#');
  return (
    <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
      {content}
    </a>
  );
}
