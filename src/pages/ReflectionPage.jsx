import { motion } from 'framer-motion';

import { PageHeading } from '@/components/PageHeading';
import { reflection, reflectionVideoUrl } from '@/data/portfolioData';
import { group, inView, rise } from '@/lib/motion';
import { toEmbedUrl } from '@/lib/videoEmbed';

function ReflectionVideo() {
  const embed = toEmbedUrl(reflectionVideoUrl);
  return (
    <motion.div variants={rise} {...inView} className="aspect-video overflow-hidden bg-surface lg:col-span-7 lg:col-start-6">
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
        <div className="relative h-full">
          <img src={`${import.meta.env.BASE_URL}images/apsc/upper-campus-road.jpg`} alt="" width="1441" height="840" className="h-full w-full object-cover opacity-40" />
          <p className="absolute inset-0 grid place-items-center px-4 text-center text-lg text-white">The reflection video will play here once it is recorded.</p>
        </div>
      )}
    </motion.div>
  );
}

// Each question is a journal entry: the question at display size in the left zone, the answer on the axis.
function Entry({ title, text, image }) {
  return (
    <motion.article variants={group} {...inView} className="journal gap-y-6">
      <motion.div variants={rise} className="lg:col-span-5">
        <h2 className="t-title text-white">{title}</h2>
        {reflection.draft && <p className="mt-4 text-[15px] text-soft">Draft, to be rewritten in my own words.</p>}
        {image && (
          <figure className="mt-10 hidden w-[78%] lg:block">
            <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="mt-3 max-w-[34ch] text-[15px] leading-snug text-soft">{image.caption}</figcaption>
          </figure>
        )}
      </motion.div>
      <motion.p variants={rise} className="max-w-[60ch] text-xl leading-[1.6] text-ink lg:col-span-7 lg:max-w-none lg:pt-3">
        {text}
      </motion.p>
    </motion.article>
  );
}

export function ReflectionPage() {
  return (
    <section>
      <PageHeading title={reflection.title} lede={reflection.lede} action={{ label: 'Read the four answers', onClick: () => document.getElementById('reflection-entries').scrollIntoView() }} />
      <div className="journal mt-16 sm:mt-24">
        <ReflectionVideo />
      </div>
      <div id="reflection-entries" className="mt-28 scroll-mt-24 space-y-28 sm:mt-44 sm:space-y-40">
        {reflection.cards.map((card) => (
          <Entry key={card.number} {...card} />
        ))}
      </div>
    </section>
  );
}
