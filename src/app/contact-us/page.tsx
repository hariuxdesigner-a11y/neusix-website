import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { VideoBackground } from "@/components/media/VideoBackground";
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
    <section className="relative isolate overflow-hidden text-paper">
      <VideoBackground id="contact" overlay="dark" priority />
      <div className="container-x grid min-h-[100svh] gap-12 pb-[clamp(48px,7vw,112px)] pt-[calc(var(--header-h)+clamp(40px,6vw,96px))] md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16 lg:gap-24">
        <div className="flex flex-col gap-12">
          <div>
            <p className="eyebrow text-paper/75">Contact</p>
            <h1 className="t-display mt-4">Get in Touch</h1>
            <p className="mt-5 max-w-[32ch] text-base leading-relaxed text-paper/85 sm:text-lg">Reach out to us for inquiries, partnerships, or schedule a meeting with our team.</p>
          </div>
          <address className="not-italic">
            <h2 className="t-h4">Office address</h2>
            <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-paper/80">{SITE.address.lines.join(" ")}</p>
          </address>
        </div>
        <div className="rounded-[clamp(18px,2vw,28px)] bg-paper p-[clamp(20px,3.5vw,44px)] text-ink shadow-[0_40px_100px_-40px_rgba(0,0,0,.6)]">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
