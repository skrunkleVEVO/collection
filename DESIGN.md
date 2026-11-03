# Design

An engineering journal, laid out like a printed annual: oversized Newsreader titles, text held to one column line, and colour used in flat blocks. The archive keeps two divisions apart, **physical systems** and **digital tools**, because they fail differently.

## The axis

Everything hangs from one vertical line at column 6 of a 12-column grid (`.journal`), about 42% of the frame. Titles and running text start on it; the zone to its left (columns 1 to 5) holds section titles, side notes, facts and the odd photograph. On phones the axis collapses to the left margin.

## Tokens (`src/index.css`)

| Role | Token | Value |
| --- | --- | --- |
| Ground | `ground` | `#07080B` |
| Field, one tone up | `surface` | `#11141B` |
| Text | `ink` | `#E5E7EB` |
| Accent: actions, figures, the footer field | `accent` | `#9EBEE0` |
| Secondary text | `soft` | `#9CA3AF` |

No gradients, shadows, glass or hairlines. Surfaces separate by a tone step (`.field` is a full-bleed band of `surface`). Two blocks use the accent as a whole field: "My leadership" on the APSC page and the footer.

## Type scale

Newsreader for titles, Geist for reading. Six steps only:

| Class | Use |
| --- | --- |
| `.t-huge` | Division titles, the 30% grade, the concept counts |
| `.t-display` | Page titles, the home headline, project names |
| `.t-title` | Section titles |
| `.t-lead` | Short statements and subheads |
| `text-lg` / `text-xl` | Body |
| `text-[15px]` | Captions and labels |

No eyebrows above headings, no index numbers, no pill badges.

## Structure

- **Home:** a composed void with the headline on the axis; "Why engineering" with one photograph; the archive (a full-bleed field for the physical system, then an index of the four apps at display size); why I build tools; skills.
- **Case-study rows** (`ProjectRow`): the name at display size across the frame, the record in the left zone, the working app on the axis.
- **APSC 169:** chapters with the title in the left zone and the plain-language paragraph on the axis; site photos as a gutterless mosaic.
- Pages are hash routes that stay mounted, so a running app never reloads. Only the visible page renders an `h1`.

## Motion

- The home headline rises line by line through a mask on load, once.
- Sections enter part by part (heading, text, picture) with a short stagger.
- Presses scale to 0.98 on a spring; hovers are gated to real pointers.
- Reduced motion removes all travel.
