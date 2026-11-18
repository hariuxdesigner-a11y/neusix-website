import { MEDIA, mediaSrc, type MediaId } from "@/content/media";

/** Still frame of a clip (or the brand stand-in), for cards and thumbnails. No video is downloaded. */
export function MediaPoster({ id, className = "" }: { id: MediaId; className?: string }) {
  const m = MEDIA[id];
  return (
    <div aria-hidden className={`relative overflow-hidden bg-ink ${className}`}>
      {m.ready ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={mediaSrc(id).poster} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" style={{ objectPosition: m.focal }} />
      ) : (
        <div className="absolute inset-0" style={{ background: `radial-gradient(70% 80% at 75% 20%, ${m.tint}88 0%, transparent 60%), radial-gradient(60% 60% at 10% 90%, ${m.tint}55 0%, transparent 70%), #0f0f1f` }} />
      )}
    </div>
  );
}
