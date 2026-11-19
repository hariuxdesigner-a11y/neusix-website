/*
 * NeuSix UI icon set: one stroke style everywhere (1.5px, round caps/joins, currentColor),
 * matching the line weight of the brand's line-art icons. Use for arrows, chevrons, toggles.
 */
const PATHS = {
  "arrow-right": "M3.5 10h13M11.5 5l5 5-5 5",
  "arrow-left": "M16.5 10h-13M8.5 5l-5 5 5 5",
  "arrow-up-right": "M6 14 14 6M7.5 6H14v6.5",
  "chevron-down": "M5 7.5 10 12.5 15 7.5",
  "chevron-left": "M12.5 5 7.5 10l5 5",
  "chevron-right": "M7.5 5l5 5-5 5",
  plus: "M10 4v12M4 10h12",
  x: "M5 5l10 10M15 5 5 15",
  menu: "M3.5 7h13M3.5 13h13",
  "trend-up": "M3.5 13.5 8 9l3 3 5.5-5.5M12 6.5h4.5V11",
  "trend-down": "M3.5 6.5 8 11l3-3 5.5 5.5M12 13.5h4.5V9",
  play: "M7 5.5v9l7-4.5z",
  pause: "M7 5v10M13 5v10",
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 18, className = "", strokeWidth = 1.5 }: { name: IconName; size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg aria-hidden focusable="false" width={size} height={size} viewBox="0 0 20 20" fill="none" className={`shrink-0 ${className}`}>
      <path d={PATHS[name]} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill={name === "play" ? "currentColor" : "none"} />
    </svg>
  );
}

/** Animated arrow for text links ("Explore", "All Services"…). Needs a `group` parent. */
export function LinkArrow({ className = "" }: { className?: string }) {
  return <Icon name="arrow-right" size={16} className={`transition-transform duration-300 group-hover:translate-x-1 ${className}`} />;
}

/** Round arrow button used on every card (one shape site-wide). `tone="image"` on photos/video. */
export function ArrowChip({ tone = "light", dir = "right", className = "" }: { tone?: "light" | "dark" | "image"; dir?: "right" | "left" | "up-right"; className?: string }) {
  const tones = {
    light: "bg-mist text-ink group-hover:bg-ink group-hover:text-paper",
    dark: "bg-white/10 text-paper group-hover:bg-paper group-hover:text-ink",
    image: "bg-paper/15 text-paper backdrop-blur group-hover:bg-paper group-hover:text-ink",
  };
  return (
    <span aria-hidden className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${tones[tone]} ${className}`}>
      <Icon name={dir === "left" ? "arrow-left" : dir === "up-right" ? "arrow-up-right" : "arrow-right"} size={18} />
    </span>
  );
}
