import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { SERVICES } from "@/content/services";
import { CASE_STUDIES } from "@/content/case-studies";
import { BLOG_POSTS } from "@/content/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths: { p: string; pr: number; mod?: string }[] = [
    { p: "/", pr: 1 },
    { p: "/services/services-neusix", pr: 0.9 },
    ...SERVICES.map((s) => ({ p: s.href, pr: 0.9 })),
    { p: "/our-work/industries", pr: 0.8 },
    { p: "/our-work/case-studies", pr: 0.8 },
    ...CASE_STUDIES.map((c) => ({ p: `/case-studies/${c.slug}`, pr: 0.7 })),
    { p: "/resources", pr: 0.7 },
    { p: "/blog", pr: 0.8 },
    ...BLOG_POSTS.map((b) => ({ p: `/blog/${b.slug}`, pr: 0.7, mod: b.date })),
    { p: "/white-papers", pr: 0.6 },
    { p: "/about", pr: 0.8 },
    { p: "/contact-us", pr: 0.8 },
    { p: "/privacy-policy", pr: 0.3 },
    { p: "/terms-of-service", pr: 0.3 },
    { p: "/cookie-policy", pr: 0.3 },
  ];
  return paths.map(({ p, pr, mod }) => ({ url: `${SITE_URL}${p === "/" ? "" : p}`, lastModified: mod ? new Date(mod) : now, changeFrequency: "monthly", priority: pr }));
}
