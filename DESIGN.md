# Design

An editorial engineering journal at night: a dark drafting table under one lamp, with the project's real evidence on it. Digital tools and physical infrastructure share one system.

## Tokens (`src/index.css`)

| Role | Token | Value |
| --- | --- | --- |
| Ground | `ground` | `#0B0C0E` |
| Card surface | `surface` | `#141519` |
| Text and accent | `ink`, `accent` | `#E5E7EB` |
| Secondary text | `soft` | `#9CA3AF` |
| Lines | `border-white/10` | white at 10% |

Monochrome only. Colour on the page comes from real screenshots and site images.

## Type

Newsreader for display, set large with tight tracking. Geist for everything people read or operate. Body text is at least 15px, and 13px is the floor for captions.

## Surfaces

- The page sits on a fixed layer of ambient light and faint survey lines.
- `.card` is the one raised surface: lit top edge, soft shadow, and a light that follows the pointer.
- Placeholders use a diagonal hatch, like an unfinished area on a drawing.

## Components

- Pages are hash routes (`#/about`) that stay mounted, so changing tabs never reloads a running app.
- `InteractiveViewport` has a stage whose shape never changes, holding an `aspect-video` or `aspect-[9/19]` frame. The app renders at a real device size and is scaled to fit, and the same iframe element stays mounted across the toggle.
- The escarpment page opens each chapter with a plain-language paragraph, then the technical detail. On wide screens a chapter list follows the scroll.

## Motion

- The headline rises word by word through a mask on load, once.
- Presses scale to 0.98 on a spring. Hovers change border colour and light, gated to real pointers.
- Springs handle the tab, toggle and chapter indicators and the viewport resize (`layout`).
- Reduced motion removes all travel.
