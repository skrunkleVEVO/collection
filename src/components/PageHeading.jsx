export function PageHeading({ as: Title = 'h1', title, lede }) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-5 pt-12 sm:pt-24 lg:grid-cols-12 lg:items-end">
      <Title className="font-display text-[clamp(2.25rem,10vw,8.5rem)] leading-[0.98] tracking-[-0.035em] text-white lg:col-span-8 lg:text-[clamp(4rem,7vw,8.5rem)]">{title}</Title>
      {lede && <p className="max-w-[36rem] text-lg leading-relaxed text-soft sm:text-xl sm:leading-relaxed lg:col-span-4 lg:pb-2">{lede}</p>}
    </div>
  );
}
