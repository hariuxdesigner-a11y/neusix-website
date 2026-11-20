import type { Metadata } from "next";
import { SEO } from "@/content/seo";
import { SITE, SITE_URL } from "@/content/site";

/**
 * Full metadata for a page: title, description, canonical URL, Open Graph and Twitter cards
 * with the page's own 1200×630 share image (public/og/<key>.jpg).
 */
export function pageMetadata(
  path: string,
  over: { title?: string; description?: string; og?: string; type?: "website" | "article"; noindex?: boolean } = {},
): Metadata {
  const base = SEO[path];
  const title = over.title ?? base?.title ?? SITE.defaultTitle;
  const description = over.description ?? base?.description ?? SITE.defaultDescription;
  const image = `/og/${over.og ?? base?.og ?? "default"}.jpg`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: over.type ?? "website",
      siteName: SITE.name,
      locale: "en_US",
      url: path,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    ...(over.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** BreadcrumbList structured data ("Home › Services › Modernization" in search results). */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />;
}

/** Any other schema.org object. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...data }) }} />;
}
