import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, L } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/content/site";

export const metadata: Metadata = pageMetadata("/cookie-policy");

const address = SITE.address.lines.slice(1).join(" ");

const BROWSERS = [
  { name: "Google Chrome", href: "https://support.google.com/chrome/answer/95647" },
  { name: "Mozilla Firefox", href: "https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox" },
  { name: "Apple Safari", href: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" },
  { name: "Microsoft Edge", href: "https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      path="/cookie-policy"
      title="Cookie Policy"
      updated="20 November 2026"
      intro={
        <p>
          This policy explains what cookies are, how this website uses them, and how you can control them. It should be read together with our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      }
      sections={[
        {
          id: "what",
          title: "What cookies are",
          body: (
            <p>
              Cookies are small text files that a website stores on your device. Similar technologies, such as local storage and tracking pixels, work in comparable ways. They can be
              used to make a website work, to remember your choices, or to measure and track how people use websites.
            </p>
          ),
        },
        {
          id: "our-use",
          title: "How this website uses cookies",
          body: (
            <>
              <p>
                <strong>This website does not set cookies</strong>, and it does not use analytics, advertising or social media tracking technologies. In particular:
              </p>
              <L
                items={[
                  "Our fonts, images and videos are served from our own website, not from third-party services that could set cookies.",
                  "The contact form works without cookies.",
                  "We do not embed third-party content, such as maps or video players, that places cookies on your device.",
                ]}
              />
            </>
          ),
        },
        {
          id: "third-parties",
          title: "Third-party websites",
          body: (
            <p>
              When you follow a link from our website to another site, such as LinkedIn, Facebook, Instagram, YouTube or a shared document, that site may set its own cookies. Those
              cookies are controlled by the other site and covered by its own cookie and privacy policies.
            </p>
          ),
        },
        {
          id: "future",
          title: "If this changes",
          body: (
            <p>
              If we introduce cookies in future, we will update this policy first. Cookies that are strictly necessary for the website to work or to keep it secure do not need your
              consent; for any other cookies, such as analytics, we will ask for your consent where the law requires it, and you will be able to change your choice at any time.
            </p>
          ),
        },
        {
          id: "control",
          title: "How to control cookies",
          body: (
            <>
              <p>You can view, block and delete cookies in your browser settings. These guides explain how:</p>
              <L
                items={BROWSERS.map((b) => (
                  <a key={b.name} href={b.href} target="_blank" rel="noopener noreferrer">
                    {b.name}
                  </a>
                ))}
              />
              <p>Blocking all cookies may affect how other websites work.</p>
            </>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: <p>We may update this policy from time to time. The “Last updated” date at the top shows when it was last changed.</p>,
        },
        {
          id: "contact",
          title: "Contact us",
          body: (
            <p>
              Questions about cookies on this website? Contact us through our <Link href="/contact-us">Contact page</Link> or write to: {SITE.legalName}, {address}.
            </p>
          ),
        },
      ]}
    />
  );
}
