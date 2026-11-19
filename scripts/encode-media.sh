#!/usr/bin/env bash
# Encode a source clip into the site's video set.
# Usage: scripts/encode-media.sh <input> <media-id> [start-seconds] [duration-seconds]
# Output (public/media): <id>.mp4 (≤1920w H.264, ≤2.4 Mbps), <id>-m.mp4 (960w H.264, ≤1 Mbps), <id>.jpg (poster)
# H.264 MP4 only: plays in every browser, and in tests VP9 WebM came out larger at equal quality.
set -euo pipefail
IN="$1"; ID="$2"; SS="${3:-0}"; DUR="${4:-10}"
OUT="public/media"; mkdir -p "$OUT"
VF="scale='min(1920,iw)':-2:flags=lanczos,fps=25,format=yuv420p"
VFM="scale='min(960,iw)':-2:flags=lanczos,fps=25,format=yuv420p"
ffmpeg -y -loglevel error -ss "$SS" -t "$DUR" -i "$IN" -an -vf "$VF" -c:v libx264 -preset veryfast -crf 27 -maxrate 2400k -bufsize 4800k -movflags +faststart "$OUT/$ID.mp4"
ffmpeg -y -loglevel error -ss "$SS" -t "$DUR" -i "$IN" -an -vf "$VFM" -c:v libx264 -preset veryfast -crf 28 -maxrate 1000k -bufsize 2000k -movflags +faststart "$OUT/$ID-m.mp4"
ffmpeg -y -loglevel error -ss "$SS" -i "$IN" -frames:v 1 -vf "scale='min(1920,iw)':-2" -q:v 4 "$OUT/$ID.jpg"
ls -la "$OUT/$ID".* "$OUT/$ID-m.mp4" | awk '{print $5, $9}'
# phone poster: 3:4 centre crop (portrait sources are just scaled)
ffmpeg -loglevel error -y -i "$OUT/$ID.jpg" -vf "crop='min(iw,ih*3/4)':ih,scale='min(540,iw)':-2" -q:v 5 "$OUT/$ID-m.jpg"
# card thumbnail
ffmpeg -loglevel error -y -i "$OUT/$ID.jpg" -vf "scale='min(640,iw)':-2:flags=lanczos" -q:v 5 "$OUT/$ID-t.jpg"
