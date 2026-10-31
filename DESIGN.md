# Design

A wide engineering drawing at night: an obsidian drafting table, a steel-blue lamp, and the project's real evidence laid across the full width of the screen. Digital tools and physical infrastructure share one system.

## Tokens (`src/index.css`)

| Role | Token | Value |
| --- | --- | --- |
| Ground, top of page | `ground` | `#07080B` |
| Surface, bottom of page and cards | `surface` | `#0D0F14` |
| Text | `ink` | `#E5E7EB` |
| Accent: tags, metrics, active states | `accent` | `#9EBEE0` |
| Secondary text | `soft` | `#9CA3AF` |
| Lines | `border-white/10` | white at 10% |

Steel blue is the only accent, used where something is active, measured or labelled. Other colour comes from real screenshots and site images.

## Type

Newsreader for display, set large with tight tracking. Geist for everything people read or operate. Body text is at least 15px, and 13px is the floor for captions.

## Surfaces

- The page sits on a fixed layer of steel-blue light and a two-weight drafting grid.
- The frame runs to 130rem with a fluid gutter. Layouts use a 12-column grid with uneven splits (7/5, 8/4, 3/3/6), and long text keeps a readable measure inside its column.
- `.card` is the one raised surface: lit top edge, soft shadow, and a light that follows the pointer.
- Placeholders use a diagonal hatch, like an unfinished area on a drawing.

## Components

- Pages are hash routes (`#/about`) that stay mounted, so changing tabs never reloads a running app.
- `InteractiveViewport` has a stage whose shape never changes, holding an `aspect-video` or `aspect-[9/19]` frame. The app renders at a real device size and is scaled to fit, and the same iframe element stays mounted across the toggle.
- The escarpment page opens each chapter with a plain-language paragraph, then the technical detail. On wide screens a chapter bar stays pinned under the header.

## Motion

- The headline rises word by word through a mask on load, once.
- Presses scale to 0.98 on a spring. Hovers change border colour and light, gated to real pointers.
- Springs handle the tab, toggle and chapter indicators and the viewport resize (`layout`).
- Reduced motion removes all travel.
