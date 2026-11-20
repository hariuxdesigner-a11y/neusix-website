/*
 * The NeuSix "N" arch (from the brand favicon) as a decorative line that draws itself in when it
 * scrolls into view. Colour comes from `currentColor`; size from className. Purely decorative.
 */
const D = "M33.75 227C33.75 124 115 33.75 243 33.75C375 33.75 460.75 109 460.75 239V495.25";

export function NArch({ className = "", strokeWidth = 67.5, delay = 0, draw = true }: { className?: string; strokeWidth?: number; delay?: number; draw?: boolean }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 495 529"
      fill="none"
      className={`${draw ? "n-arch" : ""} pointer-events-none overflow-visible ${className}`}
      style={{ ["--arch-delay" as string]: `${delay}ms` }}
    >
      <path d={D} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" pathLength={1} />
    </svg>
  );
}
