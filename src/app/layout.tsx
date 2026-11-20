import type { Metadata, Viewport } from "next";
import { Lora, Google_Sans_Flex } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LineIcon } from "@/components/motion/LineIcon";
import { SERVICES } from "@/content/services";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SITE, SITE_URL, SOCIAL } from "@/content/site";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const gsf = Google_Sans_Flex({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-gsf",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE.defaultTitle, template: "%s" },
  description: SITE.defaultDescription,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    url: SITE_URL,
    images: [{ url: "/og/default.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image", title: SITE.defaultTitle, description: SITE.defaultDescription, images: ["/og/default.jpg"] },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fcfcfd",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE.name,
  description: SITE.defaultDescription,
  legalName: SITE.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/ssi.png`,
  sameAs: SOCIAL.map((s) => s.href),
  address: {
    "@type": "PostalAddress",
    streetAddress: "8-2-293/82/H/- Pt. No. 34-B, Huda Heights, Film Nagar, Banjara Hills",
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lora.variable} ${gsf.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll-reveal styles only hide content when they can also show it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader icons={Object.fromEntries([...SERVICES.map((s) => [s.href, <LineIcon key={s.slug} src={s.cardGfx} stroke={1.5} mono className="size-full" />]), ["/our-work/industries", <LineIcon key="ind" src="/assets/cs-i3.svg" stroke={1.4} mono className="size-full" />], ["/our-work/case-studies", <LineIcon key="cs" src="/assets/outcome-banner.svg" stroke={1.4} mono className="size-full" />], ["/blog", <LineIcon key="blog" src="/assets/discover-01.svg" stroke={1.4} mono className="size-full" />], ["/white-papers", <LineIcon key="wp" src="/assets/plan-01.svg" stroke={1.4} mono className="size-full" />]])} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
        <SmoothScroll />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: SITE.name, publisher: { "@id": `${SITE_URL}/#organization` }, inLanguage: "en" }),
          }}
        />
      </body>
    </html>
  );
}
