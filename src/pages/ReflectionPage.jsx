import { motion } from 'framer-motion';

import { PageHeading } from '@/components/PageHeading';
import { reflection, reflectionVideoUrl } from '@/data/portfolioData';
import { group, inView, rise } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { toEmbedUrl } from '@/lib/videoEmbed';

function ReflectionVideo({ className }) {
  const embed = toEmbedUrl(reflectionVideoUrl);
  return (
    <motion.div variants={rise} className={cn('card aspect-video overflow-hidden rounded-2xl', className)}>
      {embed ? (
        <iframe
          src={embed}
          title="Reflection video"
          allow="accelerometer; encrypted-media; fullscreen; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="h-full w-full border-0"
        />
      ) : (
        <p className="placeholder-hatch grid h-full place-items-center px-4 text-center text-[15px] text-soft sm:text-lg">{reflection.videoPlaceholder}</p>
      )}
    </motion.div>
  );
}

function ReflectionCard({ number, title, text, className }) {
  return (
    <motion.article variants={rise} className={cn('card flex flex-col rounded-2xl p-5 sm:p-7', className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-2xl leading-none tabular-nums text-accent">{number}</p>
        {reflection.draft && <p className="rounded-full border border-white/20 px-2.5 py-1 text-[13px] leading-none text-ink">Draft</p>}
      </div>
      <h2 className="mt-4 font-display text-[clamp(1.875rem,3vw,2.75rem)] leading-tight tracking-[-0.02em] text-white">{title}</h2>
      <p className="mt-4 text-[17px] leading-relaxed text-ink">{text}</p>
    </motion.article>
  );
}

export function ReflectionPage() {
  const [first, ...rest] = reflection.cards;
  const restSpans = ['lg:col-span-4', 'lg:col-span-3', 'lg:col-span-5'];
  return (
    <section>
      <PageHeading title={reflection.title} lede={reflection.lede} />
      <motion.div variants={group} {...inView} className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 lg:grid-cols-12">
        <ReflectionVideo className="lg:col-span-8" />
        <ReflectionCard {...first} className="lg:col-span-4" />
        {rest.map((card, index) => (
          <ReflectionCard key={card.number} {...card} className={restSpans[index]} />
        ))}
      </motion.div>
    </section>
  );
}
