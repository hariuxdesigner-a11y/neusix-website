"use server";

import { headers } from "next/headers";
import { z } from "zod";
import nodemailer from "nodemailer";
import { INDUSTRIES, type ContactState } from "./shared";



const Schema = z.object({
  industry: z.enum(INDUSTRIES, { message: "Please choose an area of interest." }),
  name: z.string().trim().max(120).optional().default(""),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number.")
    .max(40)
    .regex(/^[+()\-.\s\d]{6,}$/, "Please enter a valid phone number."),
  email: z.string().trim().min(1, "Please enter your company email.").max(200).email("Please enter a valid email address."),
  message: z.string().trim().max(5000).optional().default(""),
});



// Simple per-IP rate limit (per server process): 5 submissions / 10 minutes.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const FAIL = "Oops! Something went wrong while submitting the form.";

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = Object.fromEntries(["industry", "name", "phone", "email", "message"].map((k) => [k, String(formData.get(k) ?? "")]));

  // Honeypot: real users never fill this hidden field. Pretend nothing happened to bots, but send nothing.
  if (String(formData.get("company_website") ?? "").length > 0) return { status: "error", message: FAIL };

  const parsed = Schema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const k = issue.path[0] as keyof NonNullable<ContactState["fieldErrors"]>;
      if (!fieldErrors[k]) fieldErrors[k] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") || "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (limited(ip)) return { status: "error", message: "Too many submissions. Please try again in a few minutes.", values };

  const d = parsed.data;
  const subject = `New enquiry: ${d.industry}${d.name ? ` — ${d.name}` : ""}`;
  const text = `Area of interest: ${d.industry}\nName: ${d.name || "-"}\nPhone: ${d.phone}\nEmail: ${d.email}\n\nMessage:\n${d.message || "-"}\n`;
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">
<tr><td><b>Area of interest</b></td><td>${esc(d.industry)}</td></tr>
<tr><td><b>Name</b></td><td>${esc(d.name || "-")}</td></tr>
<tr><td><b>Phone</b></td><td>${esc(d.phone)}</td></tr>
<tr><td><b>Email</b></td><td>${esc(d.email)}</td></tr>
<tr><td valign="top"><b>Message</b></td><td>${esc(d.message || "-").replace(/\n/g, "<br>")}</td></tr></table>`;

  try {
    let delivered = false;

    // Option A: SMTP (e.g. Hostinger business email). Configure SMTP_* and CONTACT_TO in the environment.
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
    if (SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_TO) {
      const port = Number(SMTP_PORT || 465);
      const transport = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
      await transport.sendMail({ from: CONTACT_FROM || SMTP_USER, to: CONTACT_TO, replyTo: d.email, subject, text, html });
      delivered = true;
    }

    // Option B (optional, can be combined): POST the submission as JSON to a webhook (CRM, Zapier, Make…).
    if (process.env.CONTACT_WEBHOOK_URL) {
      const res = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, source: "neusix.com/contact-us", submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      delivered = true;
    }

    if (!delivered) {
      console.error("[contact] No delivery channel configured: set SMTP_* + CONTACT_TO and/or CONTACT_WEBHOOK_URL.");
      return { status: "error", message: FAIL, values };
    }
    return { status: "success", message: "Thank you! Your submission has been received!" };
  } catch (err) {
    console.error("[contact] Delivery failed:", err);
    return { status: "error", message: FAIL, values };
  }
}
