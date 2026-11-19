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

export function LineIcon({ src, className = "", delay = 0, trigger = "self" }: { src: string; className?: string; delay?: number; trigger?: "self" | "parent" }) {
  let svg = /\.svg$/i.test(src) ? load(src) : "";
  if (!svg || !svg.includes("<svg")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" aria-hidden className={`object-contain ${className}`} />;
  }
  const uid = `li${(n++).toString(36)}`;
  let k = 0;
  const tag = (chunk: string) =>
    chunk.replace(/<(path|circle|ellipse|rect|line|polyline|polygon)\b([^>]*?)(\/?)>/g, (_m, t: string, attrs: string, close: string) => {
      const i = k++;
      const stroked = /stroke="(?!none)[^"]+"/.test(attrs) && !/stroke-dasharray/.test(attrs); // dashed lines fade in instead
      const extra = stroked ? ` pathLength="1" data-d="s"` : ` data-d="f"`;
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
      className={`draw-icon ${/<filter\b/.test(svg) ? "draw-soft" : ""} ${trigger === "parent" ? "draw-parent" : ""} inline-block [&>svg]:size-full ${className}`}
      style={{ ["--draw-delay" as string]: `${delay}ms` }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
