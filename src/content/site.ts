export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.neusix.com").replace(/\/$/, "");

export const SITE = {
  name: "NeuSix",
  legalName: "NeuSix Technology Services Private Limited",
  tagline: "Transforming enterprises with deep tech AI solutions and intelligent automation.",
  defaultTitle: "NeuSix | AI-Powered Enterprise Automation & Digital Innovation",
  defaultDescription:
    "NeuSix delivers AI-driven enterprise automation, digital transformation, and intelligent software solutions across healthcare, finance, retail, and manufacturing.",
  address: {
    lines: [
      "M/S. NeuSix Technology Services Private Limited,",
      "8-2-293/82/H/- Pt. No. 34-B, Huda Heights,",
      "Film Nagar, Banjara Hills, Hyderabad,",
      "Telangana - 500 034",
    ],
    locality: "Hyderabad",
    region: "Telangana",
    postalCode: "500034",
    country: "IN",
  },
};

export const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/neusix/", icon: "/assets/linkedin-01.svg" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61589978183199", icon: "/assets/div-1.svg" },
  { label: "Instagram", href: "https://www.instagram.com/neusix.24/", icon: "/assets/insta-01.svg" },
  { label: "YouTube", href: "https://youtube.com/@neusix-h8g?si=dpvjGbsvsZTvJzEV", icon: "/assets/div-3.svg" },
] as const;

export type NavLink = { label: string; href: string };
export type NavItem = NavLink | { label: string; children: NavLink[] };

export const SERVICE_LINKS: NavLink[] = [
  { label: "All Services", href: "/services/services-neusix" },
  { label: "AI Transformation", href: "/services/ai-transformation-page" },
  { label: "Modernization", href: "/services/modernization" },
  { label: "Digital Transformation", href: "/services/digital-transformation" },
  { label: "Software Engineering", href: "/services/software-engineering-services" },
  { label: "AI COE", href: "/services/ai-center-of-excellence" },
  { label: "ODC Services", href: "/services/offshore-development-center" },
];

export const NAV: NavItem[] = [
  { label: "Services", children: SERVICE_LINKS },
  {
    label: "Our Work",
    children: [
      { label: "Industries", href: "/our-work/industries" },
      { label: "Case Studies", href: "/our-work/case-studies" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Blogs", href: "/blog" },
      { label: "White Papers", href: "/white-papers" },
    ],
  },
  { label: "About", href: "/about" },
];

export const CONTACT_LINK: NavLink = { label: "Contact", href: "/contact-us" };

export const FOOTER_COMPANY: NavLink[] = [
  { label: "Blogs", href: "/blog" },
  { label: "White Papers", href: "/white-papers" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact-us" },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];
