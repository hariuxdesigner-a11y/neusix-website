import fs from "node:fs";
import path from "node:path";

/*
 * Inlines one of NeuSix's own line-art SVGs (from /public) so it can animate:
 * strokes draw themselves on, then dots/filled shapes pop in (Abridge-style icon animation).
 * Rendered on the server at build time; reduced motion shows the finished icon.
 */
const cache = new Map<string, string>();
let n = 0;

function load(src: string) {
  let raw = cache.get(src);
  if (raw === undefined) {
    try {
      raw = fs.readFileSync(path.join(process.cwd(), "public", src.replace(/^\//, "")), "utf8");
    } catch {
      raw = "";
    }
    cache.set(src, raw);
  }
  return raw;
}

export function LineIcon({
  src,
  className = "",
  delay = 0,
  trigger = "self",
  stroke,
  mono = false,
  knock,
  color,
}: {
  src: string;
  className?: string;
  delay?: number;
  trigger?: "self" | "parent";
  stroke?: number;
  /** recolour to currentColor */
  mono?: boolean;
  /** surface colour behind the icon: dark "knock-out" shapes are repainted with it (icons drawn for dark backgrounds) */
  knock?: string;
  /** colour for mono icons */
  color?: string;
}) {
  let svg = /\.svg$/i.test(src) ? load(src) : "";
  // bitmap-based or very large files are not line art: load them as normal images instead
  if (!svg || !svg.includes("<svg") || svg.includes("<image") || svg.length > 40_000) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" aria-hidden className={`object-contain ${className}`} />;
  }
  const uid = `li${(n++).toString(36)}`;
  let k = 0;
  const tag = (chunk: string) =>
    chunk.replace(/<(path|circle|ellipse|rect|line|polyline|polygon)\b([^>]*?)(\/?)>/g, (_m, t: string, attrs: string, close: string) => {
      const i = k++;
      const stroked = /stroke="(?!none)[^"]+"/.test(attrs) && !/stroke-dasharray/.test(attrs); // dashed lines fade in instead
      // light/dark "knock-out" fills keep their colour in mono mode
      const darkKnock = /fill="(#0f0f1f|#1e1f41|#222344|#000|#000000|black)"/i.test(attrs);
      const lightKnock = !stroked && /fill="(#f{3,6}|#fcfcfd|#f1f1f9|white)"/i.test(attrs);
      const dashed = /stroke="(?!none)[^"]+"/.test(attrs) && /stroke-dasharray/.test(attrs);
      const extra = stroked ? ` pathLength="1" data-d="s"${darkKnock ? ` data-k="dark"` : ""}` : dashed ? ` data-d="f" data-dash=""` : darkKnock ? ` data-d="f" data-k="dark"` : lightKnock ? ` data-d="f" data-k="light"` : ` data-d="f"`;
      return `<${t}${attrs}${extra} style="--k:${i}"${close}>`;
    });
  svg = svg
    .replace(/<\?xml[^>]*>/, "")
    // unique ids per instance (clip paths / gradients)
    .replace(/id="([^"]+)"/g, `id="$1-${uid}"`)
    .replace(/url\(#([^)]+)\)/g, `url(#$1-${uid})`)
    .replace(/href="#([^"]+)"/g, `href="#$1-${uid}"`)
    .replace(/<svg\b([^>]*)>/, (m, attrs: string) => `<svg${attrs.replace(/\s(width|height)="[^"]*"/g, "")} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">`);
  // animate only visible artwork, never shapes inside defs / masks / clip paths / filters / patterns
  svg = svg
    .split(/(<(defs|mask|clipPath|pattern|filter|symbol|linearGradient|radialGradient)\b[\s\S]*?<\/\2>)/)
    .map((chunk, idx) => (idx % 3 === 0 ? tag(chunk) : idx % 3 === 1 ? chunk : ""))
    .join("");
  return (
    <span
      aria-hidden
      className={`draw-icon ${mono ? "icon-mono" : ""} ${knock ? "icon-knock" : ""} ${/<filter\b/.test(svg) ? "draw-soft" : ""} ${trigger === "parent" ? "draw-parent" : ""} inline-block [&>svg]:size-full ${className}`}
      style={{ ["--draw-delay" as string]: `${delay}ms`, ...(stroke ? { ["--icon-stroke" as string]: `${stroke}px` } : {}), ...(knock ? { ["--knock" as string]: knock } : {}), ...(color ? { color } : {}) }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
