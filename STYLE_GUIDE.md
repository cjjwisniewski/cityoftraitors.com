# City of Traitors — Style Guide

This guide defines the visual, typographic, and UI conventions for **cityoftraitors.com**. The aesthetic pairs **2026 editorial clarity** with the **1998 *Exodus* / old-frame Magic: The Gathering** atmosphere of *City of Traitors*.

---

## 1. Design Principles

1. **Old Magic, Not Dated Web** — Evoke weathered stone, obsidian slate, and burnished gold card frames through subtle lighting, hairline bevels, and serif/display contrast rather than heavy skeuomorphic textures or flat `#222` boxes.
2. **Art-Forward Restraint** — Let Kev Walker's *City of Traitors* artwork and tournament photography breathe with deep vignettes and clean framing.
3. **Editorial Readability** — Long-form tournament reports should read like a modern print/digital essay (`72ch` measure, generous line-height, calm contrast).
4. **No Literal Mana Symbols in UI Chrome** — Avoid placing numbered mana circles (such as `(2)`) in headers, badges, or cards. Use geometric diamond/citadel marks instead.

---

## 2. Color Palette & Tokens

Defined in `cityoftraitors.com/src/app.css`:

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--color-bg` | `#0b0b0d` | Primary page canvas (deep obsidian) |
| `--color-bg-elevated` | `#121216` | Elevated sections and hero container |
| `--color-surface` | `#16161b` | Card and article backgrounds |
| `--color-surface-hover` | `#1c1c23` | Interactive card hover state |
| `--color-primary` | `#f2ece1` | Headings and high-emphasis text |
| `--color-text` | `#d6cfc2` | Body and article prose |
| `--color-text-muted` | `#938c7f` | Captions, descriptions, secondary links |
| `--color-secondary` | `#756e63` | Dividers, disclaimers, muted metadata |
| `--color-accent` | `#c9a66b` | Burnished *Exodus* gold (links, borders, CTAs) |
| `--color-accent-bright` | `#e4c58e` | Hover states, active highlights, progress bar |
| `--color-accent-dim` | `rgba(201, 166, 107, 0.16)` | Active nav pills, subtle badges, author avatar |
| `--color-border` | `rgba(201, 166, 107, 0.18)` | Standard framed borders |
| `--color-border-strong` | `rgba(201, 166, 107, 0.42)` | Card hover borders and active outlines |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.07)` | Resting card borders and section rules |

### Ambient Lighting & Pattern
The `body` background layers two soft radial gradients over `#0b0b0d` (warm gold glow at `50% -10%` and subtle amber at `85% 20%`), paired with a `64px x 64px` *Exodus* nested-diamond lattice in `body::before` (`z-index: 0`, with `.app-container` at `z-index: 1`) masked with a radial vignette.

---

## 3. Typography

| Role | Variable | Font Stack | Usage |
| :--- | :--- | :--- | :--- |
| **Display** | `--font-display` | `'Goudy Medieval', 'Newsreader', Georgia, serif` | Brand wordmark, `h1`–`h6`, article section headers |
| **Editorial Prose** | `--font-serif` | `'Newsreader', Georgia, 'Times New Roman', serif` | Article body (`1.16rem`, `1.78` line-height), hero subtitle, lead text, blockquotes |
| **UI & Chrome** | `--font-sans` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | Navigation links, buttons, card descriptions, footer |
| **Metadata & Code** | `--font-mono` | `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace` | Dates, reading time, breadcrumbs, entry counts, `code`/`pre` blocks |

### Heading & Prose Rules
- Display headings use `font-weight: 400`, `letter-spacing: 0.015em`, and `line-height: 1.18`.
- Article prose is constrained to `--prose-width: 72ch`.
- Markdown posts that repeat the frontmatter title as a leading `# Title` have that first `<h1>` automatically hidden via `.content :global(> h1:first-child) { display: none; }`.

---

## 4. Layout, Radii & Elevation

- **Max Container Width**: `--max-width: 1120px` (header, main, footer).
- **Editorial Column Width**: `820px` (Chronicles feed, blog post card, About layout).
- **Border Radii**:
  - `--radius-sm`: `6px` (buttons, inline code)
  - `--radius-md`: `12px` (post cards, author box, Seeker callout, images)
  - `--radius-lg`: `18px` (hero showcase, main article container, error card)
- **Card Elevation**: Subtle top-down surface gradient (`var(--color-surface)` to `#121216`/`#131318`), `1px` subtle border, and an `inset 0 1px 0 rgba(255, 255, 255, 0.04)` top highlight. Hovering lifts cards by `-2px` and brightens the border to `--color-border-strong`.

---

## 5. Components & Motifs

- **Brand Crest & Favicon (Nested Diamond Motif)**: Both the header `.brand-crest` and `favicon.svg` use the signature nested burnished-gold diamond emblem (`#16161b` fill, `#c9a66b` outer/inner strokes, and a `#f2ece1` ivory center point). This diamond geometry is echoed in the footer divider ornament and the Seeker card header (`.seeker-mark`).
- **Sticky Header**: Frosted obsidian (`rgba(11, 11, 13, 0.78)` + `backdrop-filter: blur(16px)`), `1px` gold hairline bottom border, and pill-shaped nav items with active state highlighting.
- **Hero Showcase**: Uses `/assets/city_of_traitors.png` behind a multi-stop radial/linear vignette, framed by an inset hairline border with corner-bracket accents (`.corner`).
- **Buttons**:
  - `.btn-primary`: Solid `--color-accent` background with `#110f0b` dark ink text.
  - `.btn-secondary`: Translucent dark surface (`rgba(18, 18, 22, 0.78)`) with `--color-border-strong` outline.
- **Chronicle Reading View**:
  - Fixed `2px` burnished-gold reading progress bar at the top of the viewport.
  - `← Back to Chronicles` monospace breadcrumb.
  - Author footer card with a circular initials monogram (`.author-avatar`).

---

## 6. Content & Formatting Conventions

- **Dates**: Always store post dates in `YYYY-MM-DD` format in frontmatter and format them with `formatPostDate()` from `src/lib/utils/format.js` so dates render consistently (e.g., `Feb 23, 2026`) without UTC-to-local timezone day shifts.
- **Reading Time**: Computed automatically from raw markdown word count (`220` wpm) via `estimateReadingTime()`.
- **External Links**: Open external tools (such as `https://seeker.cityoftraitors.com/`) with `target="_blank" rel="noopener noreferrer"`.
