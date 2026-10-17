import { useCallback, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

import { cn } from '@/lib/utils';

// Magic UI MagicCard: a 1px border that lights up under the cursor, plus a faint inner spotlight.
export function MagicCard({
  children,
  className,
  gradientSize = 220,
  gradientColor = 'hsl(var(--foreground) / 0.06)',
  gradientOpacity = 1,
  gradientFrom = 'hsl(var(--glow-from))',
  gradientTo = 'hsl(var(--glow-to))',
  ...props
}) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const reset = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [gradientSize, mouseX, mouseY]);

  const handlePointerMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    reset();
  }, [reset]);

  const border = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientFrom}, ${gradientTo}, hsl(var(--border)) 100%)`;
  const spotlight = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`;

  return (
    <div
      className={cn('group relative rounded-xl', className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerEnter={reset}
      {...props}
    >
      <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-border" style={{ background: border }} />
      <div className="absolute inset-px rounded-[inherit] bg-card" />
      <motion.div
        className="pointer-events-none absolute inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight, opacity: gradientOpacity }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent transition-colors duration-300 group-hover:border-zinc-500/50" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
