"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitTradeEnquiry, type FormState } from "@/app/actions";
import { Field } from "./Field";

const initial: FormState = { status: "idle", message: "" };

export function TradeEnquiryForm() {
  const [state, action, pending] = useActionState(submitTradeEnquiry, initial);
  const e = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[22px] border border-paperline bg-[#ece2d3] p-8">
        <p className="display text-[36px]">Enquiry received.</p>
        <p className="mt-3 text-smoke">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-6 md:grid-cols-2">
      <div aria-hidden="true" className="hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <Field label="Business name" name="business_name" autoComplete="organization" error={e.business_name} required />
      <Field label="Business type" name="business_type" error={e.business_type}>
        <select id="f-business_type" name="business_type" defaultValue="" className="field" aria-invalid={Boolean(e.business_type)}>
          <option value="" disabled>Choose one</option>
          <option value="d2c-brand">Perfume / attar brand (D2C)</option>
          <option value="attar-shop">Attar shop</option>
          <option value="perfume-counter">Perfume counter / retailer</option>
          <option value="distributor">Distributor / wholesaler</option>
          <option value="other">Other</option>
        </select>
      </Field>
      <Field label="City" name="city" autoComplete="address-level2" error={e.city} required />
      <Field label="GSTIN" name="gstin" optional error={e.gstin} />
      <Field label="Your name" name="contact_name" autoComplete="name" error={e.contact_name} required />
      <Field label="Email" name="email" type="email" autoComplete="email" error={e.email} required />
      <Field label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" optional error={e.phone} />
      <Field label="Interested in" name="interest" error={e.interest}>
        <select id="f-interest" name="interest" defaultValue="" className="field" aria-invalid={Boolean(e.interest)}>
          <option value="" disabled>Choose one</option>
          <option value="bulk-oils">Bulk oils</option>
          <option value="sample-kit">A sample kit (from Jan 2027)</option>
          <option value="both">Both</option>
        </select>
      </Field>
      <div className="md:col-span-2">
        <Field label="Estimated volume" name="est_volume" optional hint="For example: 2 kg per month across 3 scents." error={e.est_volume} />
      </div>
      <div className="md:col-span-2">
        <Field label="Anything else?" name="message" optional error={e.message}>
          <textarea id="f-message" name="message" rows={4} className="field resize-y" placeholder="Scent profiles you're looking for, how you use oils, timelines…" />
        </Field>
      </div>
      <label className="flex items-start gap-3 text-[13px] text-smoke md:col-span-2">
        <input type="checkbox" name="consent" className="mt-1 accent-[var(--color-amber)]" />
        <span>You can contact me about this enquiry. See our <Link href="/privacy" className="underline underline-offset-2">privacy notice</Link>.</span>
      </label>
      {e.consent ? <p className="-mt-3 text-sm text-amber md:col-span-2">{e.consent}</p> : null}
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <button type="submit" disabled={pending} className="btn btn-dark disabled:opacity-60">{pending ? "Sending…" : "Send enquiry"}</button>
        {state.status === "error" ? <p role="alert" className="text-sm text-amber">{state.message}</p> : null}
      </div>
    </form>
  );
}
