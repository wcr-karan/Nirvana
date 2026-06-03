# Product

## Register

brand

## Users

Recruiters, hiring managers, and engineering leads evaluating Karan Thakur as a full-stack developer hire. They arrive with short attention and a tall stack of candidates, and they have already seen a hundred near-identical dark-mode developer portfolios today. Their job to be done: decide in well under a minute whether this person is worth a conversation. Secondary visitors: peers and potential collaborators who arrive from a link and judge on craft.

The site has to do two things at once for this audience: prove technical ability through the work itself, and be memorable enough that the person closes the tab still thinking about it.

## Product Purpose

Personal portfolio for Karan Thakur, full-stack developer and aspiring AI engineer. The goal is to get him hired. It differentiates a full-stack dev from the generic field by treating the portfolio as a built artifact, not a resume page: the hand-coded, performant, interactive presentation IS a sample of the work. It showcases three projects in depth rather than listing many shallowly.

Success looks like a recruiter remembering the site by its interaction (the brush-to-reveal), understanding what Karan builds, and reaching out. The site converts attention into a contact.

## Brand Personality

Playful, crafted, human. First-person voice with a little personality, never corporate boilerplate. Confident without bragging; the craft does the bragging. It should feel like a person made this by hand and enjoyed it, the opposite of a template. Emotional target: delight and a small "how did they do that" on first interaction, then quick clarity on who he is and what he ships.

## Anti-references

- **Dark terminal / neon "hacker" developer portfolio** (monospace, green-on-black, matrix energy). Explicitly rejected. This is the cliche the site is differentiating from.
- **Corporate SaaS template** (clean grid, stock blue, Webflow-default, soulless).
- **Sterile white minimal gallery** (so quiet it reads as empty, no voice).
- **Generic Awwwards scroll-jack clone** (smooth-scroll for its own sake, "experimental" tropes with no substance).

Signature reference (positive): the canvas mask reveal, where the pointer acts as a soft flashlight that wipes between two stacked image layers (source-in compositing; the circle follows the pointer directly — the comet trail and custom cursor were deliberately removed). This interaction is the site's hero mechanic; it recurs on the About portrait and on each project's detail page (wiping a painted title card off the product still). Home project cards deliberately do NOT repeat it — they use a printed curtain window instead, so the hero stays special.

## Design Principles

1. **The medium is the resume.** A full-stack dev proving skill should do it by building something tactile, performant, and hand-made, not by listing technologies. Every interaction is evidence.
2. **Show, don't tell.** Projects are experienced through the reveal and through real screens, not summarized in bullet lists. The work argues for itself.
3. **Playful, never gimmicky.** Effects exist to reveal and delight, and they earn their place only if they stay smooth (60fps) and degrade gracefully. No motion that doesn't mean something.
4. **Memorable over comprehensive.** Three projects, each given room. A visitor should leave remembering one striking thing, not skimming twenty.
5. **Earn the hire in ten seconds.** Under the play there is a fast, legible path: who he is, what he builds, proof, and how to contact. Delight must never cost clarity.

## Accessibility & Inclusion

WCAG AA target. Body text ≥4.5:1 contrast, large/bold text ≥3:1. Full `prefers-reduced-motion` alternatives are mandatory: the canvas brush-reveal collapses to a static crossfade or instant image swap, and entrance/stagger motion is suppressed. All content is visible by default and reachable by keyboard; the reveal is an enhancement layered over already-visible work, never a gate on it. Interactive elements have visible focus states and accessible names.
