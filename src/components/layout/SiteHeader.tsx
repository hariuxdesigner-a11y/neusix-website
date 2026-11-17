"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CONTACT_LINK, NAV, type NavItem } from "@/content/site";

/** Pages whose hero is dark: the header switches to the dark style there (as on the live site). */
const DARK_ROUTES = ["/our-work/industries"];

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
}

function Logo({ dark }: { dark: boolean }) {
  return (
    <Link href="/" aria-label="NeuSix home" className="relative z-10 inline-flex shrink-0 items-center py-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dark ? "/assets/neusix-logo-white.svg" : "/assets/group-1.svg"}
        alt="NeuSix"
        width={94}
        height={16}
        className="h-auto w-[94px]"
      />
    </Link>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DesktopDropdown({ item, dark, pathname }: { item: Extract<NavItem, { children: unknown }>; dark: boolean; pathname: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = item.children.some((c) => isActive(pathname, c.href));

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close on route change (state reset during render instead of in an effect).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        closeTimer.current = setTimeout(() => setOpen(false), 120);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full px-4 py-5 text-sm transition-colors ${
          dark ? "text-paper hover:text-lilac-soft" : "text-[#222] hover:text-brand"
        } ${active ? (dark ? "text-lilac-soft" : "text-brand") : ""}`}
      >
        {item.label}
        <Chevron open={open} />
      </button>
      <div
        id={id}
        hidden={!open}
        className={`absolute left-0 top-full min-w-[220px] overflow-hidden rounded-xl py-2 shadow-[0_12px_32px_-12px_rgba(15,15,31,.25)] ring-1 ${
          dark ? "bg-ink ring-white/10" : "bg-paper ring-mist-2"
        }`}
      >
        <ul>
          {item.children.map((c) => {
            const cur = isActive(pathname, c.href);
            return (
              <li key={c.href}>
                <Link
                  href={c.href}
                  aria-current={cur ? "page" : undefined}
                  className={`block px-5 py-2.5 text-sm transition-colors ${
                    dark
                      ? "text-paper hover:bg-white/10"
                      : `hover:bg-mist hover:text-brand ${cur ? "bg-mist text-brand" : "text-ink"}`
                  }`}
                >
                  {c.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function MobileMenu({ open, dark, pathname, onClose }: { open: boolean; dark: boolean; pathname: string; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div
      id="mobile-menu"
      hidden={!open}
      className={`absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t pb-8 shadow-lg nav:hidden ${
        dark ? "border-white/10 bg-ink text-paper" : "border-mist-2 bg-paper text-ink"
      }`}
    >
      <nav aria-label="Mobile" className="container-x">
        <ul className="divide-y divide-current/10">
          {NAV.map((item) =>
            "children" in item ? (
              <li key={item.label}>
                <button
                  type="button"
                  aria-expanded={expanded === item.label}
                  onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                  className="flex w-full items-center justify-between py-4 text-base"
                >
                  {item.label}
                  <Chevron open={expanded === item.label} />
                </button>
                <ul hidden={expanded !== item.label} className="pb-3">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        onClick={onClose}
                        aria-current={isActive(pathname, c.href) ? "page" : undefined}
                        className={`block rounded-lg px-4 py-3 text-[15px] ${dark ? "hover:bg-white/10" : "hover:bg-mist"} aria-[current=page]:font-semibold`}
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="block py-4 text-base aria-[current=page]:font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
        <Link
          href={CONTACT_LINK.href}
          onClick={onClose}
          className={`mt-6 flex min-h-12 items-center justify-center rounded-full text-sm font-medium ${dark ? "bg-paper text-ink" : "bg-ink text-paper"}`}
        >
          {CONTACT_LINK.label}
        </Link>
      </nav>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const dark = DARK_ROUTES.includes(pathname);
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-[11px] ${dark ? "bg-ink/90 text-paper" : "bg-paper/70 text-ink"}`}
      style={{ height: "var(--header-h)" }}
    >
      <div className="container-x flex h-full items-center justify-between gap-6">
        <Logo dark={dark} />

        <nav aria-label="Main" className="hidden items-center nav:flex">
          {NAV.map((item) =>
            "children" in item ? (
              <DesktopDropdown key={item.label} item={item} dark={dark} pathname={pathname} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={`px-5 py-5 text-sm transition-colors ${
                  dark ? "text-paper hover:text-lilac-soft" : "text-[#222] hover:text-brand"
                } aria-[current=page]:text-brand`}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            href={CONTACT_LINK.href}
            aria-current={isActive(pathname, CONTACT_LINK.href) ? "page" : undefined}
            className={`ml-6 inline-flex h-9 min-w-[116px] items-center justify-center rounded-full px-6 text-sm transition-colors ${
              dark ? "bg-paper text-ink hover:bg-lilac-soft" : "bg-ink text-white hover:bg-navy"
            }`}
          >
            {CONTACT_LINK.label}
          </Link>
        </nav>

        <button
          type="button"
          className="relative z-10 -mr-2 inline-flex size-11 items-center justify-center rounded-lg nav:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg aria-hidden width="22" height="22" viewBox="0 0 24 24">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
      <MobileMenu open={open} dark={dark} pathname={pathname} onClose={() => setOpen(false)} />
    </header>
  );
}
