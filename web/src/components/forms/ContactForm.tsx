"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitContact, type FormState } from "@/app/actions";
import { Field } from "./Field";

const initial: FormState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const e = state.fieldErrors ?? {};

  if (state.status === "success") {
    return <p role="status" className="display text-[36px]">{state.message}</p>;
  }

  return (
    <form action={action} noValidate className="grid gap-6">
      <div aria-hidden="true" className="hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <Field label="Your name" name="name" autoComplete="name" error={e.name} required />
      <Field label="Email" name="email" type="email" autoComplete="email" error={e.email} required />
      <Field label="Message" name="message" error={e.message}>
        <textarea id="f-message" name="message" rows={5} className="field resize-y" aria-invalid={Boolean(e.message)} />
      </Field>
      <label className="flex items-start gap-3 text-[13px] text-smoke">
        <input type="checkbox" name="consent" className="mt-1 accent-[var(--color-amber)]" />
        <span>You can reply to me about this message. See our <Link href="/privacy" className="underline underline-offset-2">privacy notice</Link>.</span>
      </label>
      {e.consent ? <p className="-mt-3 text-sm text-amber">{e.consent}</p> : null}
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">{pending ? "Sending…" : "Send message"}</button>
        {state.status === "error" ? <p role="alert" className="text-sm text-glow">{state.message}</p> : null}
      </div>
    </form>
  );
}
