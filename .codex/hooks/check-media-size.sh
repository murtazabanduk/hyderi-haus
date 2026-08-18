#!/bin/bash
# PostToolUse hook: after a Bash command touches public/video or public/photos,
# flag any file over the size budget so Claude reaches for the optimize-media
# skill instead of shipping another oversized hero asset (see commits 4ffe9dd,
# 226f8b6, 7064cb1 — repeated hero-video lag fixes).

input=$(cat)
command=$(echo "$input" | jq -r '.tool_input.command // empty')

[ -z "$command" ] && exit 0
echo "$command" | grep -qE 'public/(video|photos)' || exit 0

project_root="${CLAUDE_PROJECT_DIR:-/Users/murtazabanduk/archy site}"
video_limit_kb=1536   # 1.5MB
photo_limit_kb=800

flagged=""

# Only look at files the command just touched (mtime < 2min), so already-
# committed assets aren't re-flagged on every unrelated ls/grep/git call.
while IFS= read -r -d '' f; do
  size_kb=$(( $(stat -f%z "$f") / 1024 ))
  if [ "$size_kb" -gt "$video_limit_kb" ]; then
    flagged+="$f (${size_kb}KB, budget ${video_limit_kb}KB)\n"
  fi
done < <(find "$project_root/public/video" -type f \( -iname '*.mp4' -o -iname '*.mov' -o -iname '*.webm' \) -mmin -2 -print0 2>/dev/null)

while IFS= read -r -d '' f; do
  size_kb=$(( $(stat -f%z "$f") / 1024 ))
  if [ "$size_kb" -gt "$photo_limit_kb" ]; then
    flagged+="$f (${size_kb}KB, budget ${photo_limit_kb}KB)\n"
  fi
done < <(find "$project_root/public/photos" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -mmin -2 -print0 2>/dev/null)

if [ -n "$flagged" ]; then
  echo -e "Oversized media detected under public/video or public/photos:\n$flagged\nConsider running the optimize-media skill before committing — this site has a history of hero-video/mobile-lag regressions from unoptimized assets." >&2
  exit 2
fi

exit 0
