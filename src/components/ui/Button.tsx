import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "dark" | "light" | "ghost-light";

const styles: Record<Variant, string> = {
  // #313168 pill, hover → #6D6EB5 (matches Webflow .button-2)
  primary: "bg-navy text-white hover:bg-lilac",
  dark: "bg-ink text-paper hover:bg-navy",
  light: "bg-mist text-navy hover:bg-navy hover:text-white",
  "ghost-light": "bg-white/10 text-paper ring-1 ring-white/25 hover:bg-white/20",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: { href: string; children: ReactNode; variant?: Variant; className?: string } & Omit<ComponentProps<typeof Link>, "href">) {
  const external = /^https?:/.test(href);
  const cls = `inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-8 py-3 text-center text-sm font-medium leading-tight transition-colors duration-200 ${styles[variant]} ${className}`;
  if (external)
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-1.5 text-sm font-medium text-navy ${className}`}>
      {children}
      <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" className="transition-transform group-hover:translate-x-1">
        <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
