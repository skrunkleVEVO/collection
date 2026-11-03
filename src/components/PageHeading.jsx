import { Action } from '@/components/Action';
import { usePageHeading } from '@/lib/pageContext';
import { cn } from '@/lib/utils';

// The title hangs from the axis; the lede sits in the left zone on the title's last baseline.
// `wide` lets a long title run the full frame, with the lede and action dropping onto the axis beneath it.
export function PageHeading({ as = 'h1', title, lede, wide = false, action }) {
  const Title = usePageHeading(as);
  return (
    <div className="journal gap-y-6 pb-4 pt-20 sm:pt-32 lg:items-end lg:pt-44">
      <Title className={cn('t-display text-white max-lg:text-[clamp(2.5rem,9.5vw,5rem)] lg:order-2', wide ? 'lg:col-span-12' : 'lg:col-span-7')}>{title}</Title>
      {(lede || action) && (
        <div className={cn('lg:order-1 lg:col-span-5 lg:pb-3', wide && 'lg:order-3 lg:col-span-7 lg:col-start-6 lg:pt-6')}>
          {lede && <p className={cn('max-w-[34ch] text-lg leading-relaxed text-ink', wide && 'lg:max-w-[48ch] lg:text-xl')}>{lede}</p>}
          {action && (
            <div className="mt-7">
              <Action primary icon="down" {...action} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
