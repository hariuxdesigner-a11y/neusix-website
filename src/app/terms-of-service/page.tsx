import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, L } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/content/site";

export const metadata: Metadata = pageMetadata("/terms-of-service");

const address = SITE.address.lines.slice(1).join(" ");

export default function TermsPage() {
  return (
    <LegalPage
      path="/terms-of-service"
      title="Terms of Service"
      updated="20 November 2026"
      intro={
        <p>
          These terms apply to your use of this website, operated by {SITE.legalName} (“NeuSix”, “we”, “us”). By using the website you agree to them. If you do not agree, please do
          not use the website.
        </p>
      }
      sections={[
        {
          id: "about",
          title: "About us",
          body: (
            <p>
              {SITE.legalName} is a company incorporated in India with its registered office at {address}.
            </p>
          ),
        },
        {
          id: "use",
          title: "Using the website",
          body: (
            <>
              <p>You may use this website for lawful purposes only. You must not:</p>
              <L
                items={[
                  "attempt to gain unauthorised access to the website, its servers or any connected systems;",
                  "introduce malware or interfere with the website’s operation or security;",
                  "use automated tools to copy or extract content in a way that burdens the website or breaches these terms;",
                  "submit false, misleading, unlawful or spam content through our forms;",
                  "use the website in any way that infringes the rights of others or breaks applicable law.",
                ]}
              />
            </>
          ),
        },
        {
          id: "ip",
          title: "Intellectual property",
          body: (
            <>
              <p>
                The NeuSix name, logo, text, graphics, illustrations and other content on this website belong to NeuSix or its licensors and are protected by intellectual property laws.
                Some photography and video is used under licence from third parties.
              </p>
              <p>
                You may view and share pages for your own information, and quote short extracts with attribution and a link to the source. You may not otherwise copy, modify, republish
                or commercially use our content, or use our name and logo, without our prior written permission.
              </p>
            </>
          ),
        },
        {
          id: "information",
          title: "Information on this website",
          body: (
            <>
              <p>
                The content of this website is general information about NeuSix and its services. It is not professional advice and is not an offer to provide services on particular
                terms. Any services we provide are governed by a separate written agreement.
              </p>
              <p>
                Case studies and outcome figures describe specific client engagements and typical ranges. They do not guarantee similar results, which depend on each organisation’s
                circumstances.
              </p>
            </>
          ),
        },
        {
          id: "enquiries",
          title: "Enquiries and communications",
          body: (
            <p>
              Sending an enquiry through the website does not create a contract or a client relationship. Please do not send confidential information through the contact form. We
              handle the personal data you submit as described in our <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>
          ),
        },
        {
          id: "links",
          title: "Third-party links",
          body: (
            <p>
              The website contains links to websites run by others, such as social media platforms and published documents. We do not control those websites and are not responsible
              for their content, availability or practices.
            </p>
          ),
        },
        {
          id: "availability",
          title: "Availability and changes",
          body: (
            <p>
              We aim to keep the website available and accurate, but we may change, suspend or withdraw any part of it at any time without notice, and we do not guarantee that it will
              be uninterrupted or error-free.
            </p>
          ),
        },
        {
          id: "disclaimer",
          title: "Disclaimer",
          body: (
            <p>
              To the extent permitted by law, the website and its content are provided “as is” and “as available”, without warranties of any kind, express or implied, including
              warranties of accuracy, fitness for a particular purpose or non-infringement.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Limitation of liability",
          body: (
            <p>
              To the extent permitted by law, NeuSix will not be liable for any indirect, incidental, special or consequential loss, or for any loss of profits, revenue, data or business
              opportunity, arising from your use of, or inability to use, this website or its content. Nothing in these terms limits liability that cannot be limited under applicable
              law.
            </p>
          ),
        },
        {
          id: "indemnity",
          title: "Indemnity",
          body: (
            <p>
              You agree to compensate NeuSix for any claims, losses or costs arising from your breach of these terms or your misuse of the website, to the extent permitted by law.
            </p>
          ),
        },
        {
          id: "law",
          title: "Governing law and jurisdiction",
          body: (
            <p>
              These terms are governed by the laws of India. The courts at Hyderabad, Telangana, have exclusive jurisdiction over any dispute arising from them or from your use of the
              website.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to these terms",
          body: <p>We may update these terms from time to time. The “Last updated” date shows when they last changed. Continuing to use the website means you accept the updated terms.</p>,
        },
        {
          id: "contact",
          title: "Contact us",
          body: (
            <p>
              Questions about these terms? Contact us through our <Link href="/contact-us">Contact page</Link> or write to: {SITE.legalName}, {address}.
            </p>
          ),
        },
      ]}
    />
  );
}
