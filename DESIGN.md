# Design

A dual-purpose site: an academic ePortfolio that an instructor reads, and a developer portfolio that a stranger skims. It stays quiet so the project content can lead.

## Tokens (`src/index.css`)

| Role | Token | Value |
| --- | --- | --- |
| Ground | `ground` | `#0B0C0E` |
| Card surface | `surface` | `#141519` |
| Text and accent | `ink`, `accent` | `#E5E7EB` |
| Secondary text | `soft` | `#9CA3AF` |
| Lines | `border-white/10` | white at 10% |

Monochrome only. Colour on the page comes from the apps' own screenshots.

## Type

Geist throughout, with tight tracking on headings. Body text is at least 15px, and 13px is the floor for captions.

## Components

- Pages are hash routes (`#/about`) that stay mounted, so changing tabs never reloads a running app.
- `InteractiveViewport` has a stage whose shape never changes, holding an `aspect-video` or `aspect-[9/19]` frame. The app renders at a real device size and is scaled to fit, and the same iframe element stays mounted across the toggle.
- The escarpment page opens each phase with a plain-language paragraph for general readers, then cards with the technical detail.

## Motion

- Presses scale to 0.98 on a spring. Hovers change border colour, gated to real pointers.
- Springs handle the tab and toggle indicators and the viewport resize (`layout`).
- The headline rises through a mask on load, once. Reduced motion removes all travel.
