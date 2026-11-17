"use client";

import { useActionState } from "react";
import { submitContact } from "./actions";
import { INDUSTRIES, type ContactState } from "./shared";

const field =
  "block w-full rounded-md border bg-paper px-3 text-sm text-ink placeholder:text-slate/80 transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-lilac/40 aria-[invalid=true]:border-red";

function Err({ id, msg }: { id: string; msg?: string }) {
  return msg ? (
    <p id={id} className="mt-1.5 text-xs text-red">
      {msg}
    </p>
  ) : null;
}

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, { status: "idle" });
  const fe = state.fieldErrors || {};
  const v = state.values || {};

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-card bg-mist p-8 text-center">
        <p className="font-medium">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-3.5" aria-describedby={state.status === "error" ? "form-status" : undefined}>
      <div>
        <label htmlFor="cf-industry" className="sr-only">
          Area of interest (required)
        </label>
        <select
          id="cf-industry"
          name="industry"
          required
          defaultValue={v.industry || ""}
          aria-invalid={!!fe.industry}
          aria-describedby={fe.industry ? "e-industry" : undefined}
          className={`${field} h-11 border-mist-2`}
        >
          <option value="" disabled>
            Area of interest
          </option>
          {INDUSTRIES.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <Err id="e-industry" msg={fe.industry} />
      </div>
      <div>
        <label htmlFor="cf-name" className="sr-only">
          Full name
        </label>
        <input id="cf-name" name="name" type="text" autoComplete="name" placeholder="Full name" defaultValue={v.name} className={`${field} h-11 border-mist-2`} />
      </div>
      <div>
        <label htmlFor="cf-phone" className="sr-only">
          Phone (required)
        </label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="Phone"
          defaultValue={v.phone}
          aria-invalid={!!fe.phone}
          aria-describedby={fe.phone ? "e-phone" : undefined}
          className={`${field} h-11 border-mist-2`}
        />
        <Err id="e-phone" msg={fe.phone} />
      </div>
      <div>
        <label htmlFor="cf-email" className="sr-only">
          Company email (required)
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Company email"
          defaultValue={v.email}
          aria-invalid={!!fe.email}
          aria-describedby={fe.email ? "e-email" : undefined}
          className={`${field} h-11 border-mist-2`}
        />
        <Err id="e-email" msg={fe.email} />
      </div>
      <div>
        <label htmlFor="cf-message" className="sr-only">
          Message
        </label>
        <textarea id="cf-message" name="message" rows={4} placeholder="Message" defaultValue={v.message} className={`${field} resize-y border-mist-2 py-2.5`} />
      </div>
      {/* honeypot (hidden from people and assistive tech) */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="cf-hp">Company website</label>
        <input id="cf-hp" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-3 inline-flex min-h-12 w-full max-w-[200px] items-center justify-center rounded-full bg-navy px-8 text-sm font-medium text-white transition-colors hover:bg-lilac disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Please wait..." : "Submit"}
      </button>
      {state.status === "error" && state.message && (
        <p id="form-status" role="alert" className="rounded-md bg-red/10 px-4 py-3 text-sm text-red">
          {state.message}
        </p>
      )}
    </form>
  );
}
