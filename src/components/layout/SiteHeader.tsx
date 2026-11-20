"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { CONTACT_LINK, NAV, SERVICE_LINKS, type NavLink } from "@/content/site";
import { ACCENT_HEX, SERVICES } from "@/content/services";
import { getCaseStudy } from "@/content/case-studies";
import { FEATURED_POST, tagLabel } from "@/content/resources";
import { Icon, LinkArrow } from "@/components/ui/Icon";
import { NArch } from "@/components/brand/NArch";

/** Routes whose top section is light: the header starts solid there. Everything else opens on a dark/video hero. */
/** Pages without a dark video hero start with a solid header. Pages can also opt in with a `data-light-top` element (e.g. the 404 page). */
const LIGHT_TOP = ["/resources", "/blog", "/white-papers", "/privacy-policy", "/terms-of-service", "/cookie-policy"];

const isActive = (p: string, href: string) => p === href || (href !== "/" && p.startsWith(href + "/"));

/* ── mega-menu content (all labels/descriptions are existing NeuSix copy) ───────────── */
type Panel = { title: string; subtitle: string; items: { label: string; href: string; text: string; accent?: string }[]; footer: { label: string; href: string }; feature?: { eyebrow: string; title: string; text: string; href: string } };

const serviceText = (href: string) => SERVICES.find((s) => s.href === href);
const featured = getCaseStudy("logistics-ports")!;

const PANELS: Record<string, Panel> = {
  Services: {
    title: "Our Services",
    subtitle: "Services designed to ship measurable outcomes",
    items: SERVICE_LINKS.filter((l) => l.href !== "/services/services-neusix").map((l) => {
      const s = serviceText(l.href)!;
      return { label: l.label, href: l.href, text: s.cardText, accent: ACCENT_HEX[s.accent] };
    }),
    footer: { label: "All Services", href: "/services/services-neusix" },
  },
  "Our Work": {
    title: "Our Work",
    subtitle: "AI transformation across industries built to survive the real world.",
    items: [
      { label: "Industries", href: "/our-work/industries", text: "Healthcare, Retail, BFSI, Manufacturing, Aviation, Real Estate, Professional Services, Energy, Public Sector" },
      { label: "Case Studies", href: "/our-work/case-studies", text: "AI Transformation that moves from pilots to production" },
    ],
    footer: { label: "Book a Free Consultation", href: "/contact-us" },
    feature: { eyebrow: `Case Study | ${featured.industry}`, title: featured.title, text: featured.impact, href: `/case-studies/${featured.slug}` },
  },
  Resources: {
    title: "Resources",
    subtitle: "Insights and guides on AI transformation, modernization and delivery.",
    items: [
      { label: "Blogs", href: "/blog", text: "Practical articles on AI transformation, governance, AI COE, modernization and engagement models" },
      { label: "White Papers", href: "/white-papers", text: "In-depth guides for enterprise leaders, from AI strategy to modernization" },
    ],
    footer: { label: "All Resources", href: "/resources" },
    feature: { eyebrow: `Latest article | ${tagLabel(FEATURED_POST.tag)}`, title: FEATURED_POST.title, text: FEATURED_POST.readTime, href: `/blog/${FEATURED_POST.slug}` },
  },
};

function Logo({ light }: { light: boolean }) {
  return (
    <Link href="/" aria-label="NeuSix home" className="relative z-10 inline-flex shrink-0 items-center py-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={light ? "/assets/neusix-logo-white.svg" : "/assets/group-1.svg"} alt="NeuSix" width={94} height={16} className="h-auto w-[clamp(92px,7.4vw,112px)]" />
    </Link>
  );
}

function Chevron({ open }: { open: boolean }) {
  return <Icon name="chevron-down" size={14} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />;
}

function MegaPanel({ panel, id, onNavigate, icons }: { panel: Panel; id: string; onNavigate: () => void; icons: Record<string, ReactNode> }) {
  return (
    <div id={id} className="mx-auto w-full max-w-[1120px] overflow-hidden rounded-[22px] bg-paper text-ink shadow-[0_30px_80px_-30px_rgba(15,15,31,.55)] ring-1 ring-ink/5">
      <div className="grid gap-8 p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:p-10">
        <div>
          <p className="t-h4">{panel.title}</p>
          <p className="mt-2 max-w-[26ch] text-sm leading-relaxed text-slate">{panel.subtitle}</p>
        </div>
        <div className={`grid gap-x-6 gap-y-2 ${panel.feature ? "lg:grid-cols-[1fr_1fr]" : "sm:grid-cols-2"}`}>
          <ul className={panel.feature ? "space-y-1" : "contents"}>
            {panel.items.map((it) => (
              <li key={it.href}>
                <Link href={it.href} onClick={onNavigate} className="group flex gap-4 rounded-xl p-3 transition-colors hover:bg-mist focus-visible:bg-mist">
                  {icons[it.href] ? (
                    <span aria-hidden className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-mist transition-colors duration-200 group-hover:bg-paper group-hover:ring-1 group-hover:ring-ink/10">
                      <span className="size-9 text-brand">{icons[it.href]}</span>
                      {it.accent && <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full ring-2 ring-paper" style={{ background: it.accent }} />}
                    </span>
                  ) : (
                    <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-lilac" />
                  )}
                  <span>
                    <span className="block text-[15px] font-medium">{it.label}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-slate">{it.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {panel.feature && (
            <Link href={panel.feature.href} onClick={onNavigate} className="group relative isolate flex min-h-[200px] flex-col justify-end overflow-hidden rounded-2xl bg-ink p-6 text-paper">
              <span aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(80%_80%_at_80%_10%,rgba(109,110,181,.55),transparent_60%)]" />
              <span className="text-xs text-lilac-soft">{panel.feature.eyebrow}</span>
              <span className="t-h4 mt-2">{panel.feature.title}</span>
              <span className="mt-2 text-[13px] text-paper/85">{panel.feature.text}</span>
            </Link>
          )}
        </div>
      </div>
      <Link href={panel.footer.href} onClick={onNavigate} className="group flex items-center justify-between border-t border-ink/5 bg-mist/70 px-8 py-4 text-sm font-medium transition-colors hover:bg-mist lg:px-10">
        {panel.footer.label}
        <LinkArrow />
      </Link>
    </div>
  );
}

function MobileMenu({ open, pathname, onClose }: { open: boolean; pathname: string; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div
      id="mobile-menu"
      hidden={!open}
      className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 isolate overflow-y-auto bg-ink text-paper nav:hidden"
    >
      <NArch strokeWidth={26} draw={false} className="pointer-events-none fixed bottom-[-6%] right-[-14%] -z-10 h-[62%] text-paper/[.06]" />
      <nav aria-label="Mobile" className="container-x flex min-h-full flex-col pb-10 pt-4">
        <ul className="divide-y divide-white/10">
          {NAV.map((item) =>
            "children" in item ? (
              <li key={item.label}>
                <button type="button" aria-expanded={expanded === item.label} onClick={() => setExpanded((v) => (v === item.label ? null : item.label))} className="flex w-full items-center justify-between py-5 font-serif text-2xl">
                  {item.label}
                  <Chevron open={expanded === item.label} />
                </button>
                <ul hidden={expanded !== item.label} className="grid gap-1 pb-4">
                  {item.children.map((c: NavLink) => (
                    <li key={c.href}>
                      <Link href={c.href} onClick={onClose} aria-current={isActive(pathname, c.href) ? "page" : undefined} className="block rounded-lg px-3 py-3 text-[15px] text-paper/85 hover:bg-white/10 aria-[current=page]:text-lilac-soft">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href} onClick={onClose} aria-current={isActive(pathname, item.href) ? "page" : undefined} className="block py-5 font-serif text-2xl aria-[current=page]:text-lilac-soft">
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
        <Link href={CONTACT_LINK.href} onClick={onClose} className="mt-auto flex min-h-13 items-center justify-center rounded-full bg-paper py-4 text-sm font-medium text-ink">
          {CONTACT_LINK.label}
        </Link>
      </nav>
    </div>
  );
}

export function SiteHeader({ icons = {} }: { icons?: Record<string, ReactNode> }) {
  const pathname = usePathname() || "/";
  const [markedLight, setMarkedLight] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the page marker after each navigation
    setMarkedLight(!!document.querySelector("[data-light-top]"));
  }, [pathname]);
  const lightTop = markedLight || LIGHT_TOP.some((p) => pathname.startsWith(p));
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [panel, setPanel] = useState<string | null>(null);
  const [prevPath, setPrevPath] = useState(pathname);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const uid = useId();

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenu(false);
    setPanel(null);
  }

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 480 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (panel) {
          headerRef.current?.querySelector<HTMLButtonElement>(`[data-panel="${panel}"]`)?.focus();
          setPanel(null);
        }
        setMenu(false);
      }
    };
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setPanel(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [panel]);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
    if (menu) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [menu]);

  // Opening a mega panel no longer flips the header: it keeps the look of where you are on the page.
  const solid = lightTop || scrolled;
  const onDark = !solid || menu; // transparent over a dark/video hero (or mobile menu open) → light text
  const itemCls = (on: boolean, current: boolean) =>
    `relative flex h-10 items-center gap-1.5 rounded-full px-4 text-[15px] font-medium tracking-[-0.005em] transition-colors duration-200 focus-visible:outline-offset-2 ${
      onDark
        ? `${on ? "bg-white/15" : "hover:bg-white/10"} ${current ? "text-paper" : "text-paper/90 hover:text-paper"}`
        : `${on ? "bg-mist text-ink" : "hover:bg-mist hover:text-ink"} ${current ? "text-ink" : "text-ink/80"}`
    }`;
  const currentMark = (current: boolean) =>
    current ? <span aria-hidden className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full ${onDark ? "bg-lilac-soft" : "bg-brand"}`} /> : null;
  const open = (k: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPanel(k);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setPanel(null), 160);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow,color] duration-300 ${hidden && !menu && !panel ? "-translate-y-full" : ""} ${
        menu ? "bg-ink text-paper" : solid ? "border-b border-ink/[.07] bg-paper/95 text-ink backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent bg-gradient-to-b from-ink/55 to-transparent text-paper"
      }`}
      style={{ height: "var(--header-h)" }}
      onMouseLeave={scheduleClose}
    >
      <div className="container-x grid h-full grid-cols-[auto_1fr_auto] items-center gap-6 nav:grid-cols-[1fr_auto_1fr]">
        <Logo light={onDark || menu} />

        <nav aria-label="Main" className="hidden items-center gap-0.5 nav:flex">
          {NAV.map((item) =>
            "children" in item ? (
              <button
                key={item.label}
                type="button"
                data-panel={item.label}
                aria-expanded={panel === item.label}
                aria-controls={`${uid}-${item.label}`}
                onMouseEnter={() => open(item.label)}
                onClick={() => setPanel((p) => (p === item.label ? null : item.label))}
                onKeyDown={(e) => {
                  // Tab / ArrowDown from an open trigger moves into its panel
                  if (panel === item.label && ((e.key === "Tab" && !e.shiftKey) || e.key === "ArrowDown")) {
                    const first = document.getElementById(`${uid}-${item.label}`)?.querySelector<HTMLElement>("a,button");
                    if (first) {
                      e.preventDefault();
                      first.focus();
                    }
                  }
                }}
                className={itemCls(panel === item.label, (item.children.some((c) => isActive(pathname, c.href)) || (item.label === "Resources" && /^\/(resources|blog-tags)(\/|$)/.test(pathname))))}
              >
                {item.label}
                <Chevron open={panel === item.label} />
                {currentMark((item.children.some((c) => isActive(pathname, c.href)) || (item.label === "Resources" && /^\/(resources|blog-tags)(\/|$)/.test(pathname))))}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={scheduleClose}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={itemCls(false, isActive(pathname, item.href))}
              >
                {item.label}
                {currentMark(isActive(pathname, item.href))}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center justify-self-end gap-3 nav:flex">
          <Link
            href={CONTACT_LINK.href}
            data-cta
            className={`group inline-flex h-11 items-center justify-center gap-2 rounded-full pl-6 pr-5 text-[15px] font-medium transition-colors duration-200 ${onDark ? "bg-paper text-ink hover:bg-lilac-soft" : "bg-ink text-paper hover:bg-brand"}`}
          >
            {CONTACT_LINK.label}
            <LinkArrow />
          </Link>
        </div>

        <button
          type="button"
          className="relative z-10 -mr-2 inline-flex size-11 items-center justify-center justify-self-end rounded-full col-start-3 nav:hidden"
          aria-expanded={menu}
          aria-controls="mobile-menu"
          aria-label={menu ? "Close menu" : "Open menu"}
          onClick={() => setMenu((v) => !v)}
        >
          <Icon name={menu ? "x" : "menu"} size={24} />
        </button>
      </div>

      {/* desktop mega panels */}
      {Object.entries(PANELS).map(([k, p]) => (
        <div
          key={k}
          hidden={panel !== k}
          className="absolute inset-x-0 top-full hidden px-[var(--gutter)] pt-2 nav:block [&[hidden]]:hidden"
          onMouseEnter={() => open(k)}
          onMouseLeave={scheduleClose}
          onKeyDown={(e) => {
            if (e.key !== "Tab") return;
            const items = [...e.currentTarget.querySelectorAll<HTMLElement>("a,button")];
            const trigger = headerRef.current?.querySelector<HTMLElement>(`[data-panel="${k}"]`);
            const navItems = [...(headerRef.current?.querySelectorAll<HTMLElement>("nav[aria-label=Main] > *, a[data-cta]") ?? [])];
            if (!e.shiftKey && document.activeElement === items[items.length - 1]) {
              // leaving the panel forwards: continue with the nav item after the trigger
              const next = navItems[navItems.indexOf(trigger!) + 1];
              if (next) {
                e.preventDefault();
                setPanel(null);
                next.focus();
              }
            } else if (e.shiftKey && document.activeElement === items[0]) {
              e.preventDefault();
              trigger?.focus();
            }
          }}
        >
          <div className="animate-[megaIn_.22s_ease-out]">
            <MegaPanel panel={p} id={`${uid}-${k}`} onNavigate={() => setPanel(null)} icons={icons} />
          </div>
        </div>
      ))}

      <MobileMenu open={menu} pathname={pathname} onClose={() => setMenu(false)} />
    </header>
  );
}
