import profile from '../data/profile.json';
import { asset, timeAgo, toCode, useClock, useRecentRepos } from '../lib/utils.js';
import { Cell, Icon, OutLink, SpecTag, StatusDot, Ticks } from './ui.jsx';

export function IntroModule({ size, index, mode }) {
  const time = useClock(profile.timezone);
  return (
    <Cell size={size} index={index}>
      <Ticks />
      <div className="flex h-full flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="meta">// [ID_00] OPERATOR</span>
          <span className="font-mono text-[10px] tabular-nums tracking-wider text-zinc-500">
            {toCode(profile.location)} · {time}
          </span>
        </div>
        <div>
          <h1 className="text-[2.6rem] font-semibold leading-none tracking-[-0.045em] text-zinc-50 sm:text-5xl">
            {profile.name}
            <span className="ml-1 inline-block h-[0.8em] w-[0.42em] translate-y-[0.06em] animate-blink bg-emerald-400" aria-hidden="true" />
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            {profile.role} <span className="text-zinc-700">/</span> {profile.school}
          </p>
        </div>
        <p className="max-w-lg text-[14.5px] leading-relaxed text-zinc-400">
          {mode === 'university' ? profile.eportfolioIntro : profile.bio}
        </p>
        <div className="mt-auto flex flex-wrap gap-1">
          {profile.focus.map((f) => (
            <span key={f} className="spec-tag">
              {toCode(f)}
            </span>
          ))}
        </div>
      </div>
    </Cell>
  );
}

export function StatusModule({ size, index, projects }) {
  const active = projects.filter((p) => /active/i.test(p.status)).length;
  return (
    <Cell size={size} index={index}>
      <div className="flex h-full flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="meta">// [SYS_STAT]</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-emerald-400">
            <StatusDot status="active" /> ONLINE
          </span>
        </div>
        <div className="mt-auto grid grid-cols-2 border border-zinc-800">
          {[
            ['MODULES', projects.length],
            ['ACTIVE', active],
          ].map(([k, v]) => (
            <div key={k} className="border-r border-zinc-800 p-3 last:border-r-0">
              <div className="font-mono text-3xl font-medium tabular-nums tracking-tight text-zinc-100">{String(v).padStart(2, '0')}</div>
              <div className="meta mt-1">{k}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          <div className="flex justify-between">
            <span>PROGRAM</span>
            <span className="text-zinc-300">B.A.SC · Y1</span>
          </div>
          <div className="flex justify-between">
            <span>BUILD</span>
            <span className="text-zinc-300">{__BUILD_DATE__}</span>
          </div>
        </div>
      </div>
    </Cell>
  );
}

export function StackModule({ size, index }) {
  return (
    <Cell size={size} index={index}>
      <div className="flex h-full flex-col p-5 sm:p-6">
        <span className="meta">// [TECH_MATRIX]</span>
        <dl className="mt-4 divide-y divide-zinc-800 border-y border-zinc-800">
          {profile.stack.map(({ group, items }) => (
            <div key={group} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3 py-2.5">
              <dt className="font-mono text-[10px] tracking-[0.16em] text-emerald-400/80">{group}</dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-zinc-300">
                {items.map((i) => (
                  <span key={i}>{i}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Cell>
  );
}

export function LogModule({ size, index }) {
  const { repos, error } = useRecentRepos(profile.githubUser, 4);
  return (
    <Cell size={size} index={index}>
      <div className="flex h-full flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="meta">// [PUSH_LOG] GITHUB</span>
          <span className="font-mono text-[10px] tracking-wider text-zinc-600">LIVE_FEED</span>
        </div>
        <ul className="mt-4 divide-y divide-zinc-800/80 border-y border-zinc-800 font-mono text-[11.5px]">
          {repos?.map((r) => (
            <li key={r.name}>
              <a
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                className="group/row flex items-center gap-3 py-2 text-zinc-400 transition-colors hover:text-emerald-300"
              >
                <span className="text-zinc-700">&gt;</span>
                <span className="truncate text-zinc-200 group-hover/row:text-emerald-300">{r.name}</span>
                <span className="hidden text-[10px] uppercase text-zinc-600 sm:inline">{r.language || '—'}</span>
                <span className="ml-auto tabular-nums text-zinc-600">{timeAgo(r.pushed_at)}</span>
                <Icon name="out" className="h-2.5 w-2.5 text-zinc-600 group-hover/row:text-emerald-300" />
              </a>
            </li>
          ))}
          {!repos && !error && (
            <li className="py-2 text-zinc-600">
              fetching<span className="animate-blink">_</span>
            </li>
          )}
          {error && <li className="py-2 text-zinc-600">FEED_OFFLINE: rate-limited or unreachable</li>}
        </ul>
        <div className="mt-auto pt-4">
          <OutLink href={profile.githubUrl} icon="github">
            github.com/{profile.githubUser}
          </OutLink>
        </div>
      </div>
    </Cell>
  );
}

export function ChannelsModule({ size, index }) {
  const channels = [
    ['GITHUB', profile.githubUrl, 'github'],
    ['LINKEDIN', profile.linkedinUrl, 'out'],
    ['EMAIL', profile.email && `mailto:${profile.email}`, 'out'],
    ['RESUME', profile.resumeUrl && asset(profile.resumeUrl), 'pdf'],
    ['THIS_SITE', 'https://github.com/skrunkleVEVO/collection', 'github'],
  ].filter(([, href]) => href);
  return (
    <Cell size={size} index={index}>
      <div className="flex h-full flex-col p-5">
        <span className="meta">// [COMMS]</span>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">Open to internships, collabs and interesting problems.</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {channels.map(([label, href, icon]) => (
            <OutLink key={label} href={href} icon={icon}>
              {label}
            </OutLink>
          ))}
        </div>
      </div>
    </Cell>
  );
}

export function AcademicModule({ size, index, onOpenId }) {
  return (
    <Cell size={size} index={index}>
      <div className="flex h-full flex-col p-5">
        <span className="meta">// [ACAD_REC]</span>
        <div className="mt-3">
          <div className="text-lg font-semibold tracking-tight text-zinc-100">{profile.school}</div>
          <div className="mt-0.5 font-mono text-[10.5px] uppercase tracking-wider text-zinc-500">{profile.program}</div>
        </div>
        <div className="mt-auto space-y-1.5 pt-4">
          <SpecTag k="COURSE" v="APSC 169" />
          <button
            type="button"
            onClick={() => onOpenId('aeris-apsc169')}
            className="flex w-full items-center justify-between border border-zinc-800 px-2 py-1.5 text-left font-mono text-[10.5px] uppercase tracking-wider text-zinc-300 transition-colors hover:border-emerald-400/60 hover:text-emerald-300"
          >
            OPEN DESIGN BRIEF <span>→</span>
          </button>
        </div>
      </div>
    </Cell>
  );
}
