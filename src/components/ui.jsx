import { asset, cx, trackSpotlight, useAssetAvailable } from '../lib/utils.js';

const paths = {
  out: 'M7 17 17 7M8 7h9v9',
  github:
    'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
  live: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-9 9h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z',
  pdf: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M9 13h6M9 17h4',
  lock: 'M7 11V8a5 5 0 0 1 10 0v3M6 11h12v10H6z',
  x: 'M6 6l12 12M18 6 6 18',
  left: 'M15 18 9 12l6-6',
  right: 'm9 18 6-6-6-6',
  expand: 'M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7',
};

export function Icon({ name, className = 'h-3 w-3' }) {
  const filled = name === 'github';
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth="1.75"
      strokeLinecap="square"
    >
      <path d={paths[name]} />
    </svg>
  );
}

/** Corner registration marks for a positioned parent. */
export function Ticks({ tone = 'border-zinc-700' }) {
  return (
    <>
      <span aria-hidden="true" className={cx('pointer-events-none absolute left-1.5 top-1.5 h-2 w-2 border-l border-t', tone)} />
      <span aria-hidden="true" className={cx('pointer-events-none absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r', tone)} />
    </>
  );
}

export function SpecTag({ k, v, tone }) {
  return (
    <span className={cx('spec-tag', tone)}>
      {k}:<b className={tone ? 'text-current' : undefined}>{v}</b>
    </span>
  );
}

export function StatusDot({ status }) {
  const active = /active/i.test(status);
  return (
    <span className="relative inline-flex h-1.5 w-1.5">
      {active && <span className="absolute inset-0 animate-ping bg-emerald-400/60" />}
      <span className={cx('relative h-1.5 w-1.5', active ? 'bg-emerald-400' : 'bg-zinc-500')} />
    </span>
  );
}

export function OutLink({ href, icon = 'out', children, className }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cx('out-link', className)} onClick={(e) => e.stopPropagation()}>
      <Icon name={icon} />
      {children}
      <Icon name="out" className="h-2.5 w-2.5 opacity-50" />
    </a>
  );
}

function ReportLink({ url, label = 'PDF_REPORT' }) {
  const state = useAssetAvailable(url);
  if (state === 'ok') return <OutLink href={asset(url)} icon="pdf">{label}</OutLink>;
  return (
    <span className="out-link-off" title="Report not uploaded yet">
      <Icon name="pdf" />
      {state === 'checking' ? 'PDF: …' : 'PDF: PENDING'}
    </span>
  );
}

/** Every outbound link a project has; private projects say so instead of linking nowhere. */
export function ProjectLinks({ project, className }) {
  const { githubUrl, liveUrl, reportUrl } = project;
  const any = githubUrl || liveUrl || reportUrl;
  return (
    <div className={cx('flex flex-wrap gap-1.5', className)}>
      {githubUrl && <OutLink href={githubUrl} icon="github">SRC</OutLink>}
      {liveUrl && <OutLink href={liveUrl} icon="live">LIVE</OutLink>}
      {reportUrl && <ReportLink url={reportUrl} />}
      {!any && (
        <span className="out-link-off" title="Source not public yet">
          <Icon name="lock" />
          SRC: PRIVATE
        </span>
      )}
    </div>
  );
}

const SPANS = {
  feature: 'md:col-span-2 md:row-span-2',
  wide: 'md:col-span-2',
  tall: 'md:row-span-2',
  compact: '',
};

/** Bento cell: sharp frame, spotlight on hover, staggered entrance. */
export function Cell({ size = 'compact', index = 0, className, children, as: Tag = 'section', ...rest }) {
  return (
    <Tag
      onMouseMove={trackSpotlight}
      style={{ animationDelay: `${index * 45}ms` }}
      className={cx('cell group min-w-0 animate-cell-in', SPANS[size], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
