import { useEffect, useState } from 'react';

/** Resolve a public/ path against the Vite base; absolute URLs pass through. */
export const asset = (path) => (!path || /^https?:\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path}`);

export const pad = (n, width = 2) => String(n).padStart(width, '0');

export const cx = (...classes) => classes.filter(Boolean).join(' ');

/** Upper-snake a label for metadata: "Game Mod" -> "GAME_MOD". */
export const toCode = (text) =>
  String(text)
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_|_$/g, '');

/** Track the cursor inside an element and expose it as --mx / --my for the spotlight. */
export const trackSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

/** HEAD-check a same-origin asset (e.g. a PDF in public/reports) so missing files show as pending, not 404. */
export function useAssetAvailable(url) {
  const [state, setState] = useState(url ? 'checking' : 'none');
  useEffect(() => {
    if (!url) return setState('none');
    if (/^https?:\/\//.test(url)) return setState('ok');
    let alive = true;
    setState('checking');
    fetch(asset(url), { method: 'HEAD' })
      .then((r) => {
        const type = r.headers.get('content-type') || '';
        // Vite's dev server answers unknown paths with index.html, so also check the type.
        if (alive) setState(r.ok && !type.includes('text/html') ? 'ok' : 'missing');
      })
      .catch(() => alive && setState('missing'));
    return () => {
      alive = false;
    };
  }, [url]);
  return state;
}

/** Ticking clock in a given IANA timezone. */
export function useClock(timeZone) {
  const fmt = () =>
    new Date().toLocaleTimeString('en-CA', { timeZone, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);
  return time;
}

/** Most recently pushed public repos, cached for the session. */
export function useRecentRepos(user, limit = 4) {
  const [repos, setRepos] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const key = `gh-repos:${user}`;
    try {
      const cached = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (cached) return setRepos(cached.slice(0, limit));
    } catch {
      /* storage unavailable */
    }
    fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=${limit}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        const slim = data.map(({ name, html_url, pushed_at, language }) => ({ name, html_url, pushed_at, language }));
        try {
          sessionStorage.setItem(key, JSON.stringify(slim));
        } catch {
          /* storage unavailable */
        }
        setRepos(slim);
      })
      .catch(() => setError(true));
  }, [user, limit]);
  return { repos, error };
}

export const timeAgo = (iso) => {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  const units = [
    ['y', 31536000],
    ['mo', 2592000],
    ['d', 86400],
    ['h', 3600],
    ['m', 60],
  ];
  for (const [label, size] of units) if (s >= size) return `${Math.floor(s / size)}${label}`;
  return 'now';
};
