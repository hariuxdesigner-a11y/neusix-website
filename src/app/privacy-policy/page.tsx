import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, L } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/content/site";

export const metadata: Metadata = pageMetadata("/privacy-policy");

const address = SITE.address.lines.slice(1).join(" ");

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      path="/privacy-policy"
      title="Privacy Policy"
      updated="20 November 2026"
      intro={
        <p>
          This policy explains how {SITE.legalName} (“NeuSix”, “we”, “us”) collects, uses, shares and protects personal data when you visit this website or contact us through it, and
          the choices and rights you have.
        </p>
      }
      sections={[
        {
          id: "who-we-are",
          title: "Who we are",
          body: (
            <>
              <p>
                {SITE.legalName} is a company incorporated in India with its registered office at {address}. For personal data collected through this website, NeuSix decides why and
                how the data is processed (a “Data Fiduciary” under India’s Digital Personal Data Protection Act, 2023, and a “controller” under the UK and EU General Data Protection
                Regulation where those laws apply).
              </p>
            </>
          ),
        },
        {
          id: "scope",
          title: "Scope of this policy",
          body: (
            <p>
              This policy covers this website and the enquiries you send through it. Personal data that we process while delivering services to our clients is governed by the
              agreements we sign with those clients, not by this policy.
            </p>
          ),
        },
        {
          id: "data-we-collect",
          title: "Personal data we collect",
          body: (
            <>
              <p>
                <strong>Information you give us.</strong> When you use the contact form we collect your full name, email address, phone number, the area you are interested in and your
                message. Please do not include confidential business information or sensitive personal data in the form.
              </p>
              <p>
                <strong>Information collected automatically.</strong> Like most websites, our hosting provider records technical information when pages are requested: your IP address,
                browser and device type, the pages requested, the referring page and the date and time. Your IP address is also used briefly to limit repeated form submissions and protect
                the form from spam.
              </p>
              <p>
                <strong>Cookies.</strong> This website does not use cookies for analytics, advertising or tracking. See our <Link href="/cookie-policy">Cookie Policy</Link> for details.
              </p>
              <p>
                <strong>Children.</strong> This website is intended for business users. We do not knowingly collect personal data from anyone under 18.
              </p>
            </>
          ),
        },
        {
          id: "how-we-use",
          title: "How we use your personal data",
          body: (
            <>
              <L
                items={[
                  "To reply to your enquiry and arrange the consultation or information you asked for.",
                  "To communicate with you about your enquiry and any resulting business discussions.",
                  "To keep the website and its forms secure and working, and to prevent spam and abuse.",
                  "To meet our legal and regulatory obligations and to establish, exercise or defend legal claims.",
                ]}
              />
              <p>We do not sell your personal data, and we do not use it for automated decision-making that has legal or similarly significant effects on you.</p>
            </>
          ),
        },
        {
          id: "legal-basis",
          title: "Why we are allowed to use it",
          body: (
            <>
              <p>
                Under Indian law we process the data you submit on the basis of your consent, which you give when you send the form, and for legitimate uses permitted by the Digital
                Personal Data Protection Act, 2023, such as complying with the law. You can withdraw your consent at any time (see “Your rights”); this does not affect processing that
                took place before you withdrew it.
              </p>
              <p>
                Where the UK or EU GDPR applies, we rely on our legitimate interests in responding to business enquiries and securing our website, on taking steps at your request before
                entering into a contract, and on compliance with legal obligations.
              </p>
            </>
          ),
        },
        {
          id: "sharing",
          title: "Who we share it with",
          body: (
            <>
              <L
                items={[
                  "Service providers that run the website and our communications on our behalf, such as website hosting and email delivery providers. They may only use the data to provide their services to us.",
                  "Professional advisers such as lawyers and auditors, where needed.",
                  "Government authorities, courts or regulators where we are required to by law.",
                  "A buyer or successor if NeuSix is involved in a merger, acquisition or sale of assets, subject to this policy.",
                ]}
              />
              <p>We do not share your personal data with third parties for their own marketing.</p>
            </>
          ),
        },
        {
          id: "transfers",
          title: "International transfers",
          body: (
            <p>
              NeuSix operates from India and works with clients in other countries. Your data may be processed in India and in other countries where we or our service providers
              operate. Where we transfer personal data internationally, we do so in line with applicable law and with appropriate safeguards.
            </p>
          ),
        },
        {
          id: "retention",
          title: "How long we keep it",
          body: (
            <p>
              We keep enquiry data only for as long as we need it for the purposes described above, including any business relationship that follows, and for any period required by law.
              After that we delete it or anonymise it. Technical logs are kept for limited periods by our hosting provider for security and operations.
            </p>
          ),
        },
        {
          id: "security",
          title: "How we protect it",
          body: (
            <p>
              We use reasonable technical and organisational security measures, including encrypted (HTTPS) connections to this website and access limited to the people who need the
              data to respond to you. No method of transmission or storage is completely secure, but we work to protect your data and will notify you and the relevant authorities of a
              personal data breach where the law requires it.
            </p>
          ),
        },
        {
          id: "your-rights",
          title: "Your rights",
          body: (
            <>
              <p>Subject to the law that applies to you, you can:</p>
              <L
                items={[
                  "ask for a summary of the personal data we hold about you and how we use it;",
                  "ask us to correct, complete or update it;",
                  "ask us to erase it where it is no longer needed or you withdraw consent;",
                  "withdraw your consent at any time;",
                  "nominate another person to exercise your rights if you die or become incapacitated (India);",
                  "object to or ask us to restrict processing, and ask for a copy of your data in a portable format (UK and EU);",
                  "raise a grievance with us, and complain to the relevant data protection authority.",
                ]}
              />
              <p>
                To exercise any of these rights, contact us through our <Link href="/contact-us">Contact page</Link> or write to us at our registered office. We may need to verify your
                identity before acting on a request, and we will respond within the time the law requires.
              </p>
            </>
          ),
        },
        {
          id: "grievances",
          title: "Grievances and complaints",
          body: (
            <p>
              If you have a concern about how we handle your personal data, please contact us first so we can try to resolve it. If you are not satisfied with our response, you may
              complain to the Data Protection Board of India or, if you are in the UK or EU, to your local data protection authority (in the UK, the Information Commissioner’s Office).
            </p>
          ),
        },
        {
          id: "third-party-links",
          title: "Links to other websites",
          body: (
            <p>
              Our website links to other sites, such as our social media pages and some published articles. Those sites have their own privacy policies, and we are not responsible for
              how they handle your data.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: <p>We may update this policy from time to time. The “Last updated” date at the top shows when it was last changed. Significant changes will be highlighted on this page.</p>,
        },
        {
          id: "contact",
          title: "Contact us",
          body: (
            <p>
              For any questions about this policy or your personal data, contact us through our <Link href="/contact-us">Contact page</Link> or write to: {SITE.legalName}, {address}.
            </p>
          ),
        },
      ]}
    />
  );
}
