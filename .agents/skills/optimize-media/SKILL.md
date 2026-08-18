---
name: optimize-media
description: Compress video/image assets before they're added to public/video or public/photos on the Hyderi Haus site. Use before committing any new hero video, project photo, or when asked to shrink/optimize media — this repo has a history of hero-video lag caused by unoptimized assets (see git log commits 4ffe9dd, 226f8b6, 7064cb1, d4bb3f8).
---

# Optimize media before adding it to public/

This site's hero has repeatedly shipped with oversized video causing mobile
lag — four straight commits (`d4bb3f8`, `4ffe9dd`, `226f8b6`, `7064cb1`) were
fixes for exactly this. Run new assets through this skill before they land in
`public/video` or `public/photos`.

## Budgets

- Video: aim under **1.5MB** per hero clip (1920px max width, h264 crf 26, no audio track — hero videos are muted background loops).
- Photos: aim under **800KB** (2400px max dimension, JPEG quality ~70).

The `check-media-size` hook will flag anything over budget automatically
after a Bash command touches those directories, but optimize proactively
rather than waiting for the nag.

## Usage

```bash
.Codex/skills/optimize-media/optimize.sh <file1> [file2 ...]
```

Each input produces a sibling `<name>.opt.<ext>` — it never overwrites the
source. Compare sizes in the output, and if the result looks good, move it
into place:

```bash
mv public/video/new-clip.opt.mp4 public/video/new-clip.mp4
```

## How it works / gotchas

- Video goes through `ffmpeg`: scales down to 1920px width (only if larger), re-encodes h264 at crf 26, strips audio, adds `+faststart` for streaming.
- Images go through `sips` (macOS built-in, no extra install needed): resizes only if the source actually exceeds 2400px in either dimension, then applies JPEG quality 70 as a **separate** sips call.
  - **Do not combine `sips -Z <dim> -s formatOptions <q>` in one invocation** — sips silently ignores the quality setting when a resize also happens in the same command, and can produce a *larger* file than the source. Always resize and re-quality as two separate calls (this is what the script does).
- The script compares before/after size and falls back to copying the original unchanged if the "optimized" version would have been bigger (protects against sips regressions on already-efficient sources).
- PNGs only get resized, not re-quantized — if a screenshot/PNG is still too big after resizing, consider converting it to JPEG instead (PNG lacks lossy compression via sips).
