# Design

**Thesis:** software for personal friction, systems engineering for physical friction. The page is split along those two lines.

## Tokens (`src/index.css`)

| Role | Token | Value |
| --- | --- | --- |
| Ground | `ground` | `#0B0C0E` |
| Card surface | `surface` | `#181A1F` |
| Text and accent | `ink`, `accent` | `#E5E7EB` |
| Secondary text | `soft` | `#9CA3AF` |
| Lines | `border-white/10` | white at 10% |

Monochrome only. Colour on the page comes from the apps' own screenshots.

## Type

Geist for everything, with tight tracking on headings. JetBrains Mono for tech stack tags and viewport URLs. Body text is at least 15px, and 13px is the floor for captions.

## Components

- Projects are cards on `surface` with a title column and a detail column.
- `InteractiveViewport` is the only way web apps are shown. The app renders at a real device size (1280×720 or 390×844) and is scaled to fit, so the toggle triggers its real breakpoints. It rests as a screenshot and loads the app when asked.
- Buttons are full pills, one silver fill per group, with `scale(0.97)` on press.

## Motion

- The headline rises through a mask on load, once.
- Sections rise once as they enter, staggered 70ms.
- Springs handle the viewport resize (`layout`), toggle thumb and drawer.
- Hover effects are gated to real pointers, and reduced motion removes all travel.
