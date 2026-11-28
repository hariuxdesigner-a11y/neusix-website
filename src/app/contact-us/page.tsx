import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { VideoBackground } from "@/components/media/VideoBackground";
import { SITE } from "@/content/site";
import { CONTACT_STEPS, FAQS } from "@/content/extras";
import { FaqSection } from "@/components/cinematic/Extras";
import { SectionHead } from "@/components/cinematic/Bands";
import { WordRise } from "@/components/motion/WordRise";
import { Breadcrumbs, JsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/content/site";

export const metadata: Metadata = pageMetadata("/contact-us");

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", path: "/contact-us" }]} />
      <JsonLd data={{ "@type": "ContactPage", name: "Contact NeuSix", url: `${SITE_URL}/contact-us`, isPartOf: { "@id": `${SITE_URL}/#website` }, about: { "@id": `${SITE_URL}/#organization` } }} />
    <section data-light-top className="section-hero relative isolate overflow-hidden text-ink">
      <VideoBackground id="contact" overlay="dark" grade="light" priority />
      <div className="container-x grid min-h-[100svh] gap-12 pb-[clamp(48px,7vw,112px)] pt-[calc(var(--header-h)+clamp(40px,6vw,96px))] md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16 lg:gap-24">
        <div className="flex flex-col gap-12">
          <div>
            <p className="eyebrow text-navy">Contact</p>
            <h1 className="t-display mt-4">
              <WordRise>Get in Touch</WordRise>
            </h1>
            <p className="mt-5 max-w-[32ch] text-base font-medium leading-relaxed text-ink/85 sm:text-lg">Reach out to us for inquiries, partnerships, or schedule a meeting with our team.</p>
          </div>
          <address className="not-italic">
            <h2 className="t-h4">Office address</h2>
            <p className="mt-3 max-w-[40ch] text-sm font-medium leading-relaxed text-ink/80">{SITE.address.lines.join(" ")}</p>
          </address>
        </div>
        <div className="rounded-[clamp(18px,2vw,28px)] bg-paper p-[clamp(20px,3.5vw,44px)] text-ink shadow-[0_40px_100px_-40px_rgba(15,15,31,.35)] ring-1 ring-ink/5">
          <ContactForm />
        </div>
      </div>
    </section>

    <section aria-labelledby="next-title" className="section-y">
      <div className="container-x">
        <SectionHead id="next-title" eyebrow="What happens next" title="Book a Free Consultation" sub="Fast, practical, and tailored." />
        <ol className="mt-[clamp(32px,4vw,56px)] grid gap-5 md:grid-cols-3">
          {CONTACT_STEPS.map((st, i) => (
            <li key={st.n} className="reveal rounded-card border border-ink/10 bg-paper p-7" style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
              <span className="font-serif text-3xl text-brand">{st.n}</span>
              <h3 className="t-h4 mt-4">{st.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{st.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <FaqSection items={FAQS} cta={false} className="section-band border-t border-ink/5 bg-mist/50" />
    </>
  );
}
