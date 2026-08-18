---
name: add-project
description: Scaffold a new portfolio entry for the Hyderi Haus site — adds a Project object to src/data/projects.ts and places its images under public/photos. Use when the user wants to add a new project, building, or design study to the portfolio.
---

# Add a portfolio project

This site has no CMS — every project lives as one object in the `projects`
array in [src/data/projects.ts](../../../src/data/projects.ts), and routing,
the Work grid, and WorkDetail pager are all driven off that array
automatically (`Work.tsx` maps over `projects`, `WorkDetail.tsx` resolves by
`slug`, `getProject`/`adjacentProjects` handle lookup and prev/next). Adding a
project is purely a data-entry task — never touch the page components.

## Steps

1. **Gather inputs from the user** if not already given:
   - Project name, typology (`'Cultural' | 'Mixed-use' | 'Healthcare' | 'Urban' | 'Residential' | 'Interiors'`), location, year, status
   - A short summary (1–2 sentences, the tone used across existing entries — precise, architectural, not marketing fluff)
   - 1–3 body paragraphs
   - Source image files (ask for a path, or if the user already dropped files somewhere, locate them)
   - Whether any should be marked `featured` (shows on the Work grid highlight) — do NOT set `flagship: true` unless the user explicitly asks to replace the homepage hero project, since only one project may be flagship (`flagship` is looked up with `.find()` and assumes exactly one match).

2. **Place images**: copy source files into `public/photos/` using
   `<slug-prefix>-<view>.jpg` naming consistent with existing files (e.g.
   `the-monument` → `monument-aerial.jpg`, `monument-elevation.jpg`). Before
   copying, run the **optimize-media** skill on anything over ~800KB — this
   repo has a history of shipping oversized assets that hurt the site (see
   git log: `4ffe9dd`, `226f8b6`, `7064cb1`).

3. **Pick the slug and index**: slug is kebab-case of the name; `index` is
   the next two-digit string after the current highest (`projects.length + 1`
   zero-padded, e.g. `'08'`).

4. **Insert the new object** into the `projects` array in
   `src/data/projects.ts`, matching the existing field shape exactly
   (see the `Project` type at the top of the file). Use the `cover` field
   for the image shown on the Work grid card — pick the strongest single shot.

5. **Verify**: run `npm run build` (runs `tsc -b && vite build`) to confirm
   the new entry type-checks, then spot check the new route in the dev
   server (`/work/<slug>`) if a preview is available.

## Gotchas

- `featuredProjects` filters out the flagship project, so a `featured: true`
  project will show on the Work grid but never duplicate the homepage hero.
- Image `alt` text should describe what's actually visible (used for
  accessibility, not SEO keyword stuffing) — match the descriptive style of
  existing entries.
- `wide: true` on an `images[]` entry spans the full gallery width — use it
  for panoramic/aerial shots or multi-view sheets, matching existing usage.
