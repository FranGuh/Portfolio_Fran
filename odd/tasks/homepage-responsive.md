# Homepage Responsive Layout

## Objective
Make the homepage readable and usable on mobile and tablet while preserving its existing visual identity and content.

## Problem and Why
The user reports that the homepage does not display well on mobile and tablet and explicitly requested responsive media queries and fluid typography with `clamp()`. Rendered inspection confirms mobile layout pressure in the floating CTA: at a 390×844 viewport, its content measures 440px wide inside a 380px container. The user also asked for the Anton display headings shown in the attached references to be easier to read with slightly looser tracking and a lighter weight.

## Scope
- Adjust existing CSS for the hero, About section, featured-project scroller/cards, and floating CTA.
- Add or refine mobile/tablet media queries and fluid type/spacing with `clamp()` where appropriate.
- Improve legibility of the referenced Anton display headings with modest tracking and a lighter weight; keep the current font family and do not change the body font or font tokens.
- Consolidate duplicate homepage floating-CTA rules only as needed for this responsive fix.
- Preserve existing content, component behavior, brand, unrelated working-tree edits, and shared global tokens.

## Constraints
- Authorized scope: homepage responsive layout and the referenced display-heading typography.
- Do not modify JSX, copy, font tokens, or unrelated user changes.
- Keep the change CSS-only unless rendered QA proves a structural issue that requires new approval.
- TDD mode: enabled by the session instructions. Repository runner: none configured. User approved rendered viewport checks plus `pnpm lint` and `pnpm build`, without adding test infrastructure.
- Delivery strategy: `ask-on-risk` (default); forecast is below the 400-authored-line planning heuristic.

## Tasks
- [x] **T1 — Repair homepage mobile/tablet layout and display-heading legibility.** Adjusted only the scoped CSS; verified Spanish and English at 320×568, 390×844, 768×1024, 1024×768, and desktop (1440px); ran `pnpm lint` and `pnpm build`; preserved unrelated edits.
  - Route: delegated direct. Trigger: implementation spans multiple non-trivial CSS files; a single bounded writer will own the style changes.
- Acceptance: no unintended horizontal page overflow; hero content is not clipped; About typography and image fit; project cards remain readable and reachable without controls obscuring them; floating CTA text/buttons fit; viewport checks and build/lint outcomes are recorded honestly.
  - Verification: rendered viewport checks (ES/EN), `pnpm lint`, `pnpm build`.

## Progress
- Feature branch created: `codex/homepage-responsive`.
- Implemented the responsive corrections in the seven scoped CSS files listed below: content-driven hero sizing and fluid typography, homepage-only About sizing to contain its image at tablet/desktop, responsive project cards/scroller, and a constrained floating CTA glow/card. Updated Anton display headings to weight 500 with modest tracking.
- Consolidated duplicate floating CTA and motto declarations in `HomePage.css`; retained the active definitions in `HomeFloating.css`.
- Home About image sizing overrides are explicitly scoped under `.Home__about-section`; the shared About page retains its existing base image behavior.
- Work-unit commit: pending; record its SHA here after commit.
- Pre-existing working-tree changes were preserved and excluded from staging.
- A prior Vite start attempt exited with `EPERM` while opening the project-local `.env` file. On 2026-09-24, the Codex In-App Browser successfully loaded the already-running local site at `http://localhost:5173/`; the earlier inventory was empty because no tab was open, not because the browser capability was unavailable.
- At 390×844, `document.documentElement.scrollWidth` equals its 380px client width, but `.Home__floating` reports 440px of content in a 380px container. On the portfolio route, the reference display headings compute to Anton, weight 600, and normal letter spacing; the home hero overrides this with weight 700 and 5px tracking.

## Verification Evidence
- Baseline reproduction: completed at 390×844 in Codex In-App Browser; `.Home__floating` measured 440px of content in a 380px container.
- Post-fix rendered QA (parent-run): English and Spanish at 320×568, 390×844, 768×1024, 1024×768, and desktop (1440px); `document.documentElement.scrollWidth` matched `clientWidth`, and CTA/title content stayed within the viewport. Captures were inspected at 320×568, 390×844, 768×1024, and 1440px; 1024×768 was confirmed by metrics. About image no longer overflows at 1024 or 1440px.
- `pnpm lint`: passed, exit code 0 (`$ eslint .`).
- `pnpm build`: passed, exit code 0; client, server, and SSG build completed. Rollup reported existing unused default React import warnings in TSX modules; no build errors.

## Next Step
Stage only the seven owned CSS files and this feature document, create the Conventional Commit, record its SHA here, and mirror the final document to Engram.

## Relevant Files
- `src/features/HomeSection/HomeSection.css` — homepage hero sizing and typography.
- `src/features/AboutSection/AboutSection.css` — About content and image layout.
- `src/pages/HomePage/HomePage.css` and `src/pages/HomePage/HomeFloating.css` — homepage floating CTA rules.
- `src/components/UI/ImgContainer/ImgContainer.css` and `src/components/UI/ScrollableContainer/ScrollableContainer.css` — featured project card sizing and scroller controls.
- `src/styles/App.css` — shared display-heading typography.
- `src/features/DetailSection/DetailSection.css`, `src/components/UI/PageHeader/PageHeader.css`, and `src/pages/PortfolioPage/PortfolioPage.css` — referenced portfolio display headings.
