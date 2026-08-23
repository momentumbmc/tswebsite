# Plan: TradeSchool → Fintech + Corporate Tier-1 (9.8/10)

> **Source of truth:** `tradeschool-design-system (1).md` + existing code `css/styles.css`
> **Goal:** 6.8/10 → 9.8/10. No colour-token hue change. Minimal/no animation. Audience: professionals + corporate clients.
> **References:** stripe.com (infrastructure precision), linear.app (grid/rules), ft.com/goldmansachs.com (editorial authority), Bloomberg Terminal (mono data).

## Deviation Audit (Spec vs Current)

| Spec | Requires | Deviation | Sev |
|------|----------|-----------|-----|
| §2 Colour | One accent, accent-deep for text | Correct - no fix | - |
| §3 Type | Newsreader 400/500, Inter 400/500/600, Mono 400/500 | 510 non-standard weights, font load order wrong | High |
| §4 Spacing | 64px mobile / 128px desktop, radius 2/4/8 max, shadow only sticky | 40/80 padding, card hover shadow, button shadow, blur header | Critical |
| §5 Grid | 4/8/12 cols 20/32/64/auto1200 | 100vw -50vw overflow hack | High |
| §6 A11y | 44x44, 4.5:1, focus-not-obscured | footer 0.4 fails, sticky covers focus | Critical |
| §7 Tables | 2-col stack, 3-4 col sticky+affordance | who-table separate border | Low |
| §8 Components | No scroll animation, 150ms hover only | 800ms translateY on all paragraphs | Critical |
| §9 Imagery | No stock, annotated chart hero, 11-level SVG, ladder, curve once | hero-home/board parody violates | Critical |
| §10 Pages | Rare dark block, plain prose beats | stat-block short, prose not constrained | High |

## Phase A — Restore Restraint (P0, 3h, 7.2→8.2)

### A1 Stillness
- **File:** `css/styles.css:91-101` Delete `.animate-on-scroll` block (opacity 0 translateY). Keep only reduced-motion guard.
- **File:** `js/scripts.js:68-90` Delete scrollObserver block. Keep mobile nav + sticky CTA + scroll affordance only.
- **File:** `css/styles.css:216` Change `a transition: all 200ms var(--ease)` → `transition: color 150ms ease-out, background-color 150ms ease-out, border-color 150ms ease-out` (hover/focus only).
- **Verify:** No element has `animate-on-scroll` class after load, no transform on scroll, `prefers-reduced-motion: reduce` still present `css/styles.css:79`.

### A2 Elevation Purge
- **File:** `css/styles.css:575-577` Delete `.card:hover {transform, box-shadow}`. Replace with `.card:hover {border-color: var(--color-border)}` or remove entirely.
- **File:** `css/styles.css:367-368` Delete `transform:translateY(-1px)` + `box-shadow` on `.btn-primary:hover`. Keep `background-color: var(--color-accent-deep)`.
- **File:** `css/styles.css:381-384` Delete `backdrop-filter:blur(8px)` and `-webkit-backdrop-filter`. Set `background-color: var(--color-canvas)` solid. Keep `border-bottom:1px solid var(--color-border)`.
- **File:** `css/styles.css:371-374` Delete `:active` transform.
- **Verify:** Only `.sticky-cta-bar` has shadow `css/styles.css:41`.

### A3 Spacing to Spec
- **File:** `css/styles.css:34-35` Change `--section-pad-block:40px→64px; --section-pad-block-lg:80px→128px;`
- **Verify:** Mobile section pad 64px, desktop 128px.

## Phase B — Typography & Grid Precision (P1, 4h, 8.2→9.0)

### B1 Weight Fix
- **File:** `css/styles.css:128` `font-weight:510→500` on `.text-2xl`
- **File:** `css/styles.css:352` `font-weight:510→500` on `.btn-primary`
- **File:** `css/styles.css:510,510` `font-weight:510→500` etc.
- **File:** `css/styles.css:437-439` `font-weight:510→500` on `.desktop-nav a.active`
- **File:** `css/styles.css:531` `font-weight:510→500` on mobile overlay active
- **File:** `css/styles.css:761` `font-weight:510→500` on `th`
- **File:** All HTML `13-19` Reorder: `preconnect` first, then single `stylesheet` with `Inter 400;500;600` + `Newsreader 400;500 italic` `display=swap`.
- **Verify:** No 510 weight, no faux bold on Win.

### B2 Scale Cap
- **File:** `css/styles.css:157-168` Add `h1,h2{ text-wrap: balance }`
- **Verify:** Hero headline no bad wrap at 320px.

### B3 Full-Bleed Fix
- **File:** `css/styles.css:928-935` Replace `100vw -50vw` with `box-shadow:0 0 0 100vmax var(--color-anchor); clip-path: inset(0 -100vmax)` keep `full-bleed-content` 1200px.
- **Verify:** No horizontal scrollbar at 320px, 1440px.

### B4 A11y Contrast
- **File:** `css/styles.css:1144` `footer-copyright rgba(243,241,234,0.4)→rgba(243,241,234,0.65)` (≈4.6:1)
- **File:** `css/styles.css:1160` `stat-sources rgba(243,241,234,0.4)→rgba(243,241,234,0.65)`
- **File:** Add `main > section:last-of-type {padding-bottom: calc(128px + 80px)}` to avoid `2.4.11 Focus Not Obscured` with sticky bar.
- **Verify:** axe contrast pass.

## Phase C — Content Is Graphic (P2, 5h, 9.0→9.6)

### C1 Hero Swap
- **File:** Keep `assets/hero-home.webp` (spec §9.1 real chart) as primary. Remove `hero-home.svg` board import if any. Ensure `css/styles.css:975` `object-fit:cover`.
- **File:** Verify `assets/bg-auction-curve.svg` used only on Home + Curriculum heroes (`index.html:63`, `curriculum.html:56`).
- **File:** Build/replace `diagram-eleven-levels.webp` teaser already done, no extra board SVG.
- **Verify:** No Linear/Jira board parody visuals.

### C2 Curve Motif Once
- **File:** Confirm `bg-auction-curve.svg` not used on who-its-for/market-education.
- **Verify:** One accent per viewport.

### C3 Outcome Ladder
- **File:** Keep `curriculum.html:328` ladder + table, no red/green, ensure `ladder-cell-*` uses ink weight progression `css/styles.css:810-822` (already correct).
- **Verify:** Ladder uses mono, no semantic colour.

## Phase D — Page Beats & Polish (P3, 2h, 9.6→9.8)

### D1 Prose Beats
- **File:** Ensure `index.html:86` plain prose no card, `max-width:65ch` via `.me-prose` or new `.prose`.
- **File:** `why-were-different.html:235` keep `border-left:1px solid var(--color-border)` example rule.
- **Verify:** Reading sections feel like FT, not UI module.

### D2 Tables
- **File:** `css/styles.css:1198` `who-table border-collapse:separate→collapse`
- **Verify:** Hairlines consistent.

### D3 CTA Consistency
- **File:** All pages label exactly `Book a one-on-one session`, `color.accent` fill, `4px radius 44px`.
- **Verify:** Grep all HTML `Book a one-on-one session` present.

## Acceptance
- Lighthouse A11y 100, axe pass, 320px reflow, one accent per viewport, no scroll animation.

## Execution Order
A1→A2→A3 → B1→B2→B3→B4 → C1→C2→C3 → D1→D2→D3 → Final QA
