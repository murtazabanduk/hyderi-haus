#!/bin/bash
# Compress video/image assets before they land in public/video or public/photos.
# Usage: optimize.sh <file1> [file2 ...]
# Re-encodes videos with ffmpeg (h264, capped width/bitrate) and downsamples
# images with sips (macOS built-in) to a sane max dimension + JPEG quality.
# Writes output next to the original as <name>.opt.<ext> — never overwrites
# the source, so the caller can compare and swap in the result.

set -euo pipefail

MAX_VIDEO_WIDTH=1920
VIDEO_CRF=26
MAX_IMAGE_DIM=2400
JPEG_QUALITY=70

for f in "$@"; do
  if [ ! -f "$f" ]; then
    echo "skip (not found): $f" >&2
    continue
  fi

  ext="${f##*.}"
  ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
  dir=$(dirname "$f")
  base=$(basename "$f" ".$ext")
  before_kb=$(( $(stat -f%z "$f") / 1024 ))

  case "$ext_lower" in
    mp4|mov|webm)
      out="$dir/$base.opt.mp4"
      ffmpeg -y -i "$f" \
        -vf "scale='min(${MAX_VIDEO_WIDTH},iw)':-2" \
        -c:v libx264 -crf "$VIDEO_CRF" -preset slow \
        -movflags +faststart \
        -an \
        "$out" -loglevel error
      after_kb=$(( $(stat -f%z "$out") / 1024 ))
      echo "$f: ${before_kb}KB -> $out: ${after_kb}KB"
      ;;
    jpg|jpeg)
      # sips corrupts its own quality setting if -Z and -s formatOptions run
      # in the same invocation (re-encodes at ~default quality regardless of
      # the flag) — so resize and quality must be two separate sips calls,
      # and only resize at all if the source actually exceeds the cap.
      out="$dir/$base.opt.jpg"
      cp "$f" "$out"
      width=$(sips -g pixelWidth "$out" | awk '/pixelWidth/{print $2}')
      height=$(sips -g pixelHeight "$out" | awk '/pixelHeight/{print $2}')
      if [ "$width" -gt "$MAX_IMAGE_DIM" ] || [ "$height" -gt "$MAX_IMAGE_DIM" ]; then
        sips -Z "$MAX_IMAGE_DIM" "$out" >/dev/null
      fi
      sips -s formatOptions "$JPEG_QUALITY" "$out" >/dev/null
      after_kb=$(( $(stat -f%z "$out") / 1024 ))
      if [ "$after_kb" -ge "$before_kb" ]; then
        cp "$f" "$out"
        after_kb=$before_kb
        echo "$f: ${before_kb}KB -> $out: ${after_kb}KB (already optimal, copied unchanged)"
      else
        echo "$f: ${before_kb}KB -> $out: ${after_kb}KB"
      fi
      ;;
    png)
      out="$dir/$base.opt.png"
      cp "$f" "$out"
      width=$(sips -g pixelWidth "$out" | awk '/pixelWidth/{print $2}')
      height=$(sips -g pixelHeight "$out" | awk '/pixelHeight/{print $2}')
      if [ "$width" -gt "$MAX_IMAGE_DIM" ] || [ "$height" -gt "$MAX_IMAGE_DIM" ]; then
        sips -Z "$MAX_IMAGE_DIM" "$out" >/dev/null
      fi
      after_kb=$(( $(stat -f%z "$out") / 1024 ))
      if [ "$after_kb" -ge "$before_kb" ]; then
        cp "$f" "$out"
        after_kb=$before_kb
        echo "$f: ${before_kb}KB -> $out: ${after_kb}KB (already optimal, copied unchanged)"
      else
        echo "$f: ${before_kb}KB -> $out: ${after_kb}KB"
      fi
      ;;
    *)
      echo "skip (unsupported extension): $f" >&2
      ;;
  esac
done
