export function PageHeading({ as: Title = 'h1', title, lede }) {
  return (
    <div className="max-w-[56rem] pt-12 sm:pt-20">
      <Title className="text-[clamp(1.75rem,9.2vw,5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">{title}</Title>
      {lede && <p className="mt-5 max-w-[44rem] text-lg leading-relaxed text-soft sm:text-xl sm:leading-relaxed">{lede}</p>}
    </div>
  );
}
