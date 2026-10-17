import profile from '../data/profile.json';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-800">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-6 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>
          // END_OF_SHEET · © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="flex flex-wrap gap-4">
          <span>REACT · VITE · TAILWIND</span>
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-emerald-300">
            GITHUB ↗
          </a>
          <a href="#top" className="transition-colors hover:text-emerald-300">
            TOP ↑
          </a>
        </span>
      </div>
    </footer>
  );
}
