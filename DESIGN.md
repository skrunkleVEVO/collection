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

No gradients, shadows or glass. Two kinds of separation:

- **Rules**, like a drawing sheet: `line` (ink at 12%) and `line-strong` (ink at 28%), always 1px. Every section opens on a full-width rule (`.sheet`); facts, findings, index rows, table rows and ledgers each sit on their own hairline. The header has a bottom rule and its tab indicator sits on it. Photographs carry a 1px inner edge so light images keep a drawn border. Rules are open lines, not closed boxes; only the app viewers are framed.
- **Tone steps**: `.field` is a full-bleed band of `surface`. Two blocks use the accent as a whole field: "My leadership" on the APSC page and the footer.

## Type scale

Newsreader for titles, Geist for reading. Six steps only:

| Class | Use |
| --- | --- |
| `.t-huge` | Division titles, the 30% grade, the concept counts |
| `.t-display` | Page titles, the home headline, project names |
| `.t-title` | Section titles |
| `.t-lead` | Short statements and subheads |
| `text-lg` / `text-xl` | Body |
| `.t-label` | Captions and labels (15px, soft) |

Display weights get lighter as size grows (huge 300, display 340, title 380), and Newsreader's optical-size axis is on, so large settings get finer contrast. Text renders with greyscale smoothing, kerning and ligatures; figures are lining and tabular.

## Rhythm

`--section` is the one gap between sections; `--lead-in` is the one gap between a heading and what it introduces.

No eyebrows above headings, no index numbers, no pill badges.

## Structure

- **Home:** a composed void with the headline on the axis; "Why engineering" with one photograph; the archive (a full-bleed field for the physical system, then an index of the four apps at display size); why I build tools; skills.
- **Case-study rows** (`ProjectRow`): the name at display size across the frame, the record in the left zone, the working app on the axis.
- **APSC 169:** chapters with the title in the left zone and the plain-language paragraph on the axis; site photos as a gutterless mosaic.
- Pages are hash routes that stay mounted, so a running app never reloads. Only the visible page renders an `h1`.

## Motion

- The home headline rises line by line through a mask on load, once.
- Sections enter part by part (heading, text, picture) with a short stagger.
- Presses scale to 0.97. Hovers are gated to real pointers.
- Buttons are square and ruled; hover inverts the fill and the glyph nudges the way it points.
- Index rows: an accent rule sweeps across the top edge on hover, in from the left and out to the right. Footer links do the same with an underline over a faint resting rule.
- Entrances use full transform strings so they run on the compositor.
- Reduced motion removes all travel.
