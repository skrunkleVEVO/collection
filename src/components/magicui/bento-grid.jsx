import { cn } from '@/lib/utils';

export function BentoGrid({ children, className, ...props }) {
  return (
    <div className={cn('grid w-full auto-rows-[24rem] grid-cols-1 gap-4 md:grid-cols-3', className)} {...props}>
      {children}
    </div>
  );
}
