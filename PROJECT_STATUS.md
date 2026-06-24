# Ryan Minor — Solutions Engineer Portfolio · Status & Pickup Notes

_Last updated: 2026-06-23. Multi-page + warm theme + Obsidian-style graph._

## What it is
Ryan Minor's **personal portfolio**, redesigned around the new résumé and a clear career goal:
landing a **Solutions Engineer / Sales Engineer / Technical Solutions Consultant** role at a top SaaS company.
Repo: `ResumeWebsite/` · GitHub remote `github.com/rminor2/ResumeWebsite`.

## Tech
Plain **HTML / CSS / JS, no framework, no build** — just open `index.html` (or Live Server).
- `index.html` — semantic sections.
- `styles.css` — design system on a **warm theme** (CSS vars: brown primary `#644a40`, cream `#ffdfb5`, off-white `#f9f9f9` body, charcoal `#161616` dark sections; cards, responsive, reduced-motion).
- `script.js` — tubelight nav + footer builder, page transitions, scroll-reveal, stat counters, gooey morph, a **WebGL hero electric-waves shader** (Home), and an **Obsidian-style knowledge graph** (violet glowing nodes, additive glow, smooth drift) — all dependency-free.
- Source of truth résumé: `RyanMinor_SolutionsEngineer_Resume.pdf` (embedded + downloadable).

## Architecture — MULTI-PAGE (as of 2026-06-16, 2nd pass)
Converted from one long page into **separate detail pages** so each area reads as dedicated, in-depth work. Shared **tubelight nav** (floating glowing pill; labels on desktop, icons bottom-bar on mobile) + footer are rendered from one config in `script.js` (`#nav-root` / `#footer-root`), so all pages stay consistent. **Page transitions**: fade/slide out on internal link click → fade in on load.
- `index.html` — **Home**: dark aurora hero with a **gooey morphing** roles headline (SVG threshold filter), stat strip, + 3 overview cards routing to detail pages.
- `about.html` — narrative + about points + full **Skills** (SE / Technical / AI Workflow).
- `experience.html` — 3 roles in depth + stat strip + Education.
- `ai.html` — 6-step AI process + AI toolkit + the **animated knowledge-graph** canvas.
- `projects.html` — AI projects (Executive Ops Dashboard feature + Website Generation Co., WholesaleBot, Smart Money Signals, AI Knowledge System, this site) + technical projects.
- `resume.html` — résumé embed + download. `contact.html` — dark contact, "open to Austin, TX".
Components added this pass: **tubelight nav**, **gooey text morph** (home hero), **page transitions**. All vanilla/dependency-free.

## 3rd pass (2026-06-23) — theme, shader, graph, personal
- ✅ **Warm theme** applied site-wide (brown `#644a40` / cream `#ffdfb5` / off-white `#f9f9f9` / charcoal dark sections). Hero waves, gooey text, tube-lamp, graph highlights all retinted warm; favicon + theme-color updated.
- ✅ **Hero electric-waves WebGL shader** on Home (raw WebGL, no three.js; warm cream/amber tint; readability veil; perf-gated + reduced-motion).
- ✅ **Knowledge graph rebuilt Obsidian-style** (`ai.html`): Abyss `#171717` panel + 1px inset glow, **violet** amethyst/lavender nodes with additive radial glow + pulse + inner highlight, faint lavender links that light up on hover, **smooth organic drift (jitter removed)**, system-font labels, muted caption (rainbow legend removed). The graph is a self-contained "Obsidian view"; rest of site stays warm.
- ✅ **About Me** personal section added to `about.html` (cleaned-up bio: Austin TX, problem-solver, social side, outdoors) + hobby tags (hiking/biking/skiing/surfing/fly fishing). Section backgrounds re-balanced to alternate.
- ✅ **Résumé updated** (same filename): discovery count 13 → **24** reflected in `experience.html` bullet + stat. Demos stay 13.

## What's done (this redesign)
- ✅ Full visual redesign — modern SaaS look, positions Ryan as a **Solutions Engineer**, not just a dev.
- ✅ All content updated from the **new résumé** (source of truth); old content/résumé removed.
- ✅ **AI Experience / Process** section (define problem → requirements → architecture → plan → build/test → document & store in Obsidian; Claude as a coworker, not a replacement).
- ✅ **AI Projects** section with project data drawn from the work + Obsidian notes.
- ✅ **Animated knowledge-graph** visualization (curated network of projects/skills/categories; hover labels, drag, in-view-only animation for perf).
- ✅ Responsive (desktop/tablet/mobile) + mobile nav; reduced-motion support.
- ✅ **Résumé download fixed** (points at the real PDF) + in-page embed.
- ✅ SEO meta + Open Graph + favicon; `.gitignore` added (`.DS_Store`).
- ✅ Verified: serves 200, PDF reachable, no stale references.

## Remaining polish / next steps
- **Deploy** via GitHub Pages for a live URL (then add it to LinkedIn + the résumé's "Portfolio" link).
- Optional: drive the knowledge graph from **real Obsidian vault data** (parse markdown + `[[links]]`) instead of the curated set.
- Optional: add an OG share image (`og:image`) for nicer link previews.
- Optional: a couple of real screenshots/case-study detail pages for the flagship projects.
- Visual QA pass on a real device (the build was verified by serving locally; do a manual look on phone + tablet).

## Note on the sibling folder
`../ResumeWebsiteBuilder/` is a **separate project** (a PDF→site generator app) with its own `PROJECT_STATUS.md` — to be worked on later. This repo (`ResumeWebsite`) is the active portfolio.
