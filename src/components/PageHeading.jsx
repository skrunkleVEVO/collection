export function PageHeading({ as: Title = 'h1', title, lede }) {
  return (
    <div className="max-w-[60rem] pt-12 sm:pt-20">
      <Title className="font-display text-[clamp(2.25rem,10vw,6.25rem)] leading-[1.02] tracking-[-0.03em] text-white">{title}</Title>
      {lede && <p className="mt-5 max-w-[44rem] text-lg leading-relaxed text-soft sm:text-xl sm:leading-relaxed">{lede}</p>}
    </div>
  );
}
