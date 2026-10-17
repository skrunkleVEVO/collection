import ProjectCard from './ProjectCard.jsx';
import { AcademicModule, ChannelsModule, IntroModule, LogModule, StackModule, StatusModule } from './Modules.jsx';

/**
 * Hand-placed bento layouts per mode. Each slot is [kind, projectId | null, size].
 * On a 4-column grid these tile without gaps; any project in the mode that isn't
 * listed here is appended as a compact cell, so new JSON entries still show up.
 */
const LAYOUTS = {
  personal: [
    ['project', 'auraflow', 'feature'],
    ['intro', null, 'wide'],
    ['status', null, 'compact'],
    ['project', 'aura-and-artifacts', 'tall'],
    ['project', 'somefolio', 'wide'],
    ['project', 'planner-scheduler', 'compact'],
    ['project', 'automation-extension', 'compact'],
    ['project', 'media-downloader', 'compact'],
    ['stack', null, 'wide'],
    ['project', 'roblox-game', 'compact'],
    ['channels', null, 'compact'],
    ['log', null, 'wide'],
  ],
  university: [
    ['project', 'aeris-apsc169', 'feature'],
    ['intro', null, 'wide'],
    ['status', null, 'compact'],
    ['project', 'auraflow', 'tall'],
    ['project', 'engineering-eportfolio', 'wide'],
    ['academic', null, 'compact'],
    ['stack', null, 'wide'],
    ['channels', null, 'wide'],
  ],
};

const MODULES = {
  intro: IntroModule,
  status: StatusModule,
  stack: StackModule,
  log: LogModule,
  channels: ChannelsModule,
  academic: AcademicModule,
};

export default function BentoGrid({ mode, projects, onOpen }) {
  const byId = Object.fromEntries(projects.map((p) => [p.id, p]));
  const placed = new Set(LAYOUTS[mode].filter(([k]) => k === 'project').map(([, id]) => id));
  const slots = [
    ...LAYOUTS[mode].filter(([k, id]) => k !== 'project' || byId[id]),
    ...projects.filter((p) => !placed.has(p.id)).map((p) => ['project', p.id, 'compact']),
  ];

  let ordinal = 0;
  return (
    <div
      key={mode}
      className="grid grid-cols-1 gap-2 md:grid-cols-2 md:auto-rows-[minmax(15rem,auto)] lg:grid-cols-4 [grid-auto-flow:dense]"
    >
      {slots.map(([kind, id, size], index) => {
        if (kind === 'project') {
          ordinal += 1;
          return <ProjectCard key={id} project={byId[id]} size={size} index={index} ordinal={ordinal} onOpen={onOpen} />;
        }
        const Module = MODULES[kind];
        return (
          <Module
            key={kind}
            size={size}
            index={index}
            mode={mode}
            projects={projects}
            onOpenId={(pid) => byId[pid] && onOpen(byId[pid])}
          />
        );
      })}
    </div>
  );
}
