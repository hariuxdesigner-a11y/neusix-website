// Shared between the contact form (client) and its server action.
export const INDUSTRIES = [
  "Healthcare & Life Sciences",
  "Retail & Consumer (Omnichannel)",
  "BFSI (Banking, Financial Services & Insurance)",
  "Manufacturing & Industrial",
  "Aviation, Travel & Logistics",
  "Real Estate & Construction",
  "Professional Services",
  "Energy & Utilities",
  "Public Sector & Smart Infrastructure",
] as const;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"industry" | "name" | "phone" | "email" | "message", string>>;
  values?: Record<string, string>;
};
