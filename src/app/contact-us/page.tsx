import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { SITE } from "@/content/site";

const title = "Contact NeuSix | Get in Touch for AI & Digital Solutions";
const description =
  "Reach out to NeuSix to discuss your AI transformation, digital modernisation, or software engineering needs. Our team is ready to help you unlock your next phase of growth.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact-us" },
  openGraph: { title, description, url: "/contact-us" },
};

export default function ContactPage() {
  return (
    <>
      <section className="container-x py-[clamp(48px,7vw,112px)]">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col gap-12 md:justify-between">
            <div className="reveal">
              <h1 className="t-display !text-[clamp(2.25rem,1.7rem+2.2vw,3.25rem)]">Get in Touch</h1>
              <p className="mt-4 max-w-[30ch] leading-relaxed">Reach out to us for inquiries, partnerships, or schedule a meeting with our team.</p>
            </div>
            <address className="reveal not-italic">
              <h2 className="t-h3">Office address</h2>
              <p className="mt-3 max-w-[40ch] text-sm leading-relaxed">{SITE.address.lines.join(" ")}</p>
            </address>
          </div>
          <div className="reveal md:pt-2">
            <ContactForm />
          </div>
        </div>
      </section>
      <TrustStrip />
    </>
  );
}
