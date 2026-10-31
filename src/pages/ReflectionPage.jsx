import { motion } from 'framer-motion';

import { PageHeading } from '@/components/PageHeading';
import { reflection, reflectionVideoUrl } from '@/data/portfolioData';
import { group, inView, rise } from '@/lib/motion';
import { toEmbedUrl } from '@/lib/videoEmbed';

function ReflectionVideo() {
  const embed = toEmbedUrl(reflectionVideoUrl);
  return (
    <div className="card mt-10 aspect-video overflow-hidden rounded-2xl sm:mt-14">
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
    </div>
  );
}

export function ReflectionPage() {
  return (
    <section className="max-w-[64rem]">
      <PageHeading title={reflection.title} lede={reflection.lede} />
      <ReflectionVideo />
      <motion.div variants={group} {...inView} className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {reflection.cards.map(({ number, title, text }) => (
          <motion.article key={number} variants={rise} className="card rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[15px] tabular-nums text-soft">{number}</p>
              {reflection.draft && <p className="rounded-full border border-white/20 px-2.5 py-1 text-[13px] leading-none text-ink">Draft</p>}
            </div>
            <h2 className="mt-3 font-display text-[clamp(1.875rem,3vw,2.5rem)] leading-tight tracking-[-0.02em] text-white">{title}</h2>
            <p className="mt-4 max-w-[40rem] text-[17px] leading-relaxed text-ink">{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
