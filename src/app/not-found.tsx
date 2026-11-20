import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { WordRise } from "@/components/motion/WordRise";
import { ArrowChip } from "@/components/ui/Icon";
import { NArch } from "@/components/brand/NArch";

export const metadata: Metadata = { title: "Page not found | NeuSix", robots: { index: false } };

const LINKS = [
  { label: "Services", text: "AI transformation, modernization and engineering services.", href: "/services/services-neusix" },
  { label: "Case Studies", text: "AI transformation that moves from pilots to production.", href: "/our-work/case-studies" },
  { label: "Industries", text: "Where we help across nine industries.", href: "/our-work/industries" },
  { label: "Resources", text: "Blogs and white papers from the NeuSix team.", href: "/resources" },
];

export default function NotFound() {
  return (
    <section data-light-top className="container-x relative isolate pb-[var(--section-y)] pt-[calc(var(--header-h)+clamp(48px,8vw,120px))]">
      <NArch strokeWidth={26} delay={250} className="absolute right-[var(--gutter)] top-[calc(var(--header-h)+24px)] -z-10 hidden h-[clamp(220px,26vw,380px)] text-brand/20 md:block" />
      <p className="eyebrow text-brand">Error 404</p>
      <h1 className="t-display mt-4 max-w-[16ch]">
        <WordRise>This page could not be found.</WordRise>
      </h1>
      <p className="rise mt-5 max-w-[52ch] leading-relaxed text-body" style={{ ["--d" as string]: "400ms" }}>
        The link may be outdated or the page may have moved. Try one of these instead:
      </p>
      <ul className="stagger mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group flex h-full min-h-[180px] flex-col justify-between rounded-[20px] bg-mist p-6 transition-colors hover:bg-lilac-soft/60">
              <span>
                <span className="t-h4 block">{l.label}</span>
                <span className="mt-2 block text-sm leading-relaxed text-body">{l.text}</span>
              </span>
              <ArrowChip className="mt-6 !bg-paper" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/" variant="dark">
          Back to home
        </Button>
        <Button href="/contact-us" variant="light">
          Contact
        </Button>
      </div>
    </section>
  );
}
