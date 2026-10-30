# Design

**World:** the waterline. Night over Okanagan Lake: a near-black ground, one deep lake field, and sun yellow for what you can act on. The hero seam cuts through the headline, and the lake field returns for the academic project.

## Tokens (`src/index.css`)

| Role | Token | Value |
| --- | --- | --- |
| Ground | `ground` | `rgb(10 12 14)` |
| Raised surface | `surface` | `rgb(18 21 25)` |
| Text | `ink` | `rgb(244 245 241)` |
| Secondary text | `soft` | `rgb(170 177 186)` |
| Field | `lake` | `rgb(8 66 84)` |
| Action and key figure | `sun` | `rgb(247 197 72)` |
| Lines | `border-white/10` | white at 10% |

## Type

Geist for everything; JetBrains Mono only for tech stack tags. Display is tight (-0.035em to -0.04em) with leading near 1. Body text is at least 15px, and 13px is the floor for captions.

## Components

- Buttons are full pills, one sun fill per group, with `scale(0.97)` on press.
- Each project uses its own composition; there is no repeated card grid.
- Previews rest as screenshots with a glow tinted from that app, and only load the live app when asked.

## Motion

- The one loud moment is the masked headline rise on load.
- Sections rise once as they enter, staggered 70ms.
- Springs handle hover, tabs and the drawer; the drawer exits faster than it enters.
- Hover effects are gated to real pointers, and reduced motion removes all travel.
