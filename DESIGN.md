# Design

# Nirvana Design System Specification
Visual system for Karan Thakur's portfolio. Direction: **Cinematic Dark / The One-Sheet Wall** — crimson + gold on warm black. The hero's full-bleed canvas reveal (a poster the cursor wipes away to expose the person beneath) is the centerpiece; everything after it is printed matter from the same film — one-sheet posters, billing blocks, printer's slugs, a rating card. Strategy in [PRODUCT.md](./PRODUCT.md); this is the how-it-looks.

## Theme

Dark, cinematic, dramatic. Physical scene: a recruiter in a dim room at night, the screen the only light; the page should feel like the lobby wall outside a screening — printed one-sheets under a moving gallery light — not a glowing IDE. This is dark **cinematic**, deliberately NOT the dark **terminal/neon hacker** dev-portfolio cliche (no monospace body, no green-on-black, no matrix).

Color strategy: **Committed.** A warm near-black carries the stage; crimson is the dramatic light (glows, the rating card, the CTA wipe); gold is the signal (links, indices, the reveal glow, the cast list). Off-white warm ink does the reading work.

## Color

OKLCH is the source of truth; hex shown for reference.

| Token | OKLCH | ~Hex | Role |
|---|---|---|---|
| `--bg` | `oklch(0.155 0.012 40)` | `#16100E` | Body background, warm near-black stage. |
| `--bg-deep` | `oklch(0.125 0.01 40)` | `#100B09` | Hero backing; nav when scrolled. |
| `--bg-raise` | `oklch(0.205 0.014 40)` | `#221A15` | Raised surfaces. |
| `--paper` | `oklch(0.225 0.016 45)` | ~`#2A211A` | Poster stock: brighter than the stage, still dark and warm (never cream). |
| `--ink` | `oklch(0.94 0.012 70)` | `#F2EADD` | Primary text, ~13:1 on bg. |
| `--ink-soft` | `oklch(0.74 0.018 65)` | `#B8A693` | Secondary text, ~7:1 on bg. |
| `--crimson` | `oklch(0.55 0.225 25)` | `#D6142A` | Light source: glows, accents. Decorative/large only. |
| `--crimson-deep` | `oklch(0.45 0.21 25)` | `#C0001A` | Reference red. Rating card + solid buttons (off-white text ≈5.4:1). |
| `--gold` | `oklch(0.73 0.095 82)` | `#C9A44A` | Signal: links, cast list, route lines, reveal glow. |

Rules:
- Crimson is the **light**, gold is the **signal**, off-white is the **text**. Small text is `--ink` / `--ink-soft` / `--gold`, never crimson at body size.
- Off-white `#F2EADD` on `--crimson-deep` is ≈5.4:1 (AA); on the brighter `--crimson` it is not — reserve `--crimson` for fills behind large or non-text elements.
- The scene-cut device: sections sit transparent on the stage; recessed scenes use `.scene-deep` (translucent hard-edged darkening, so the KeyLight still glows through).

## Typography

Exactly three families (cut from seven). Print micro-steps exist for billing matter only.

- **Display** — `Anton`, ultra-condensed. Name, section heads, poster titles, the email, the rating card. ALL-CAPS allowed here only.
- **Body** — `Cormorant Garamond` (serif). All prose; italic for taglines, the critic blurb, and the hero persona lines. Weight 500, sized ≥19px on dark.
- **Mono** — `JetBrains Mono`. The print voice: billing blocks, slugs, stamps, placard bills, nav links, buttons, hints.

Scale: `--step-hero` clamp(3.75rem, 13vw, 6rem); `--step-h2` →4.5rem; `--step-h3` →2.5rem; lead →1.6rem; body 1.1875rem; meta 0.8125rem. Print micro: `--step-bill` 11px and `--step-bill-sm` 9px — **decorative or duplicated info only, aria-hidden where redundant**; every load-bearing fact also appears at body size (placards, detail pages). `text-wrap: balance` on headings, `pretty` on prose.

## The Reveal (signature)

The hero canvas: the cover photo shows by default and a circle following the pointer directly wipes in the reveal photo via `source-in` on a reused offscreen canvas. DPR-aware; rAF; image-error fallback. **No comet trail and no custom cursor — both were deliberately removed; do not reintroduce.**

- Canvas is `aria-hidden`; all copy is live DOM on top, never gated on the reveal.
- Fallbacks (mandatory): reduced motion + mouse = cover crossfades to reveal on hover/focus; touch = the work shows by default.
- Where it lives: the **hero** (full-bleed, the two real photos), **About** (same photos in a portrait `BrushReveal`), and **detail pages** (a canvas-painted Anton title card — `src/lib/titlecard.js`, painted after `document.fonts` resolves — wiped away to expose the product still). Home project cards do NOT repeat the canvas; they use the curtain window instead, so the hero mechanic stays special.

## The One-Sheet Wall (projects)

Each project is a DOM-built 27×40 one-sheet (`PosterFrame`) on `--paper`, hung on a staggered 12-column wall (never a grid), resting at ≤0.6° rotations with trim marks outside the corners.

- Shared anatomy: top strip (KARAN THAKUR PRESENTS) · bespoke typographic art · key-art window · serif tagline · rating stamp (the one joke per poster; every stamp encodes a true capability) · billing block · slug. All micro print aria-hidden.
- Bespoke art per project: Indian Monitor (stacked title + dotted gold signal trace to a pulsing endpoint), Legal Analyzer (section mark § knocked out of a gold field), Skill-Swap (title + 13% echo, with a connecting wire below).
- The key-art window holds the real product still (`screenSVG` v2 placeholder until real screenshots land) behind a printed curtain. Fine pointer: hover/focus wipes the curtain up, plus a one-time auto-peek at ~55% visibility so non-hoverers still see the product. Touch: still shows by default; a real button toggles poster/screen.
- Placard beside each poster carries every fact at body size: bill line (01 · REALTIME · 2026), title, blurb, stack, case-file CTA + Code/Demo links.
- A static cast list (all three titles as jump links) sits under the PROJECTS head, so a hurried recruiter sees the whole slate in two seconds.

## Print grammar (connective tissue)

- `.print-slug` dividers between scenes (✕ SHEET 02/05 · THE WORK ✕) replace decorative seams.
- `.trims` crop marks replace the old film-gate brackets everywhere.
- Contact is an MPAA-style **rating card**: solid `--crimson-deep`, double off-white border, "approved for ALL AUDIENCES", an H / HIREABLE stamp that seats itself once at 60% visibility, the email huge in Anton.
- Footer is a centered billing block with registration crosses and the single bumper line: KARAN THAKUR WILL RETURN.

## Motion

- Framer Motion for hero stagger + nav slide only; everything else is the `Reveal` component (visible by default, IntersectionObserver + hard-timeout fallback — never `whileInView` with `initial:hidden`). Native scroll; **no pins, no scrubs, no smooth-scroll** (anchors land instantly via `scroll-margin-top`).
- Three named entrances: fade (default) · `pinup` (posters settle 0.8° onto their rest angle) · `stamp` (scale 1.6→1 onto −4°). One entrance per element, 0.3–0.8s, ease-out-expo.
- Hovers animate transform/opacity/clip-path only; the poster's deep hover shadow is pre-rendered and opacity-crossfaded.
- Global `prefers-reduced-motion` blanket zeroes transitions; rest rotations are layout, not motion, and persist.
- `KeyLight` (the travelling light) is kept as the gallery lamp walking the wall; its alpha budget keeps text ≥AA at the bright core.

## Layout

- Max width 1280px, gutter `clamp(1.25rem,5vw,6rem)`. Hero is full-viewport, two-corner persona UI, billing strip pinned to the frame's bottom edge (hidden <820px).
- Wall rows: poster cols 1–7 / placard 8–13, flipped and pushed down on alternate rows; single column <860px (poster capped 420px, placard below).
- About: two columns, sticky brush portrait with trim marks + production slug; critic blurb with mono attribution; credits-style CAST OF TECHNOLOGIES rows (OSS gets the ALSO FEATURING pair).
- Semantic z-scale; film-grain overlay.

## Anti-pattern guardrails

- Dark **cinematic**, not dark **terminal**: no monospace body, no neon-green, no hacker tropes.
- No side-stripe borders, no gradient text, no decorative glassmorphism, no identical card grid, no eyebrow on every section, no numbered scaffolding by reflex (01–03 on the wall is the real billing order).
- Wit budget: **one joke per surface** (poster stamp · card stamp · footer bumper). Taglines stay literal; placard copy stays plain.
- `--paper` stays dark and warm — never cream/beige. Rotations ≤0.6°. No pin dots.
- Crimson never carries small body text. Test headings at 360 / 820 / 1280 — Anton is wide, and Indian Monitor's stacked title is the likely breaker.
