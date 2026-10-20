"use client";

import Link from "next/link";
import { useActionState } from "react";
import { joinWaitlist, type FormState } from "@/app/actions";

const initial: FormState = { status: "idle", message: "" };

export function WaitlistForm({ source, tone = "dark" }: { source: string; tone?: "dark" | "light" }) {
  const [state, action, pending] = useActionState(joinWaitlist, initial);
  const err = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <p role="status" className="display text-[28px]">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} noValidate className="w-full max-w-[520px]">
      <input type="hidden" name="source" value={source} />
      <div aria-hidden="true" className="hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`email-${source}`}>Email</label>
        <input
          id={`email-${source}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email"
          aria-invalid={Boolean(err.email)}
          aria-describedby={err.email ? `email-err-${source}` : undefined}
          className="field rounded-full px-5"
        />
        <button type="submit" disabled={pending} className={`btn ${tone === "dark" ? "btn-primary" : "btn-dark"} shrink-0 justify-center disabled:opacity-60`}>
          {pending ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      {err.email ? <p id={`email-err-${source}`} className="mt-2 text-sm text-glow">{err.email}</p> : null}
      <label className="mt-4 flex items-start gap-3 text-left text-[13px] text-smoke">
        <input type="checkbox" name="consent" required className="mt-1 accent-[var(--color-amber)]" />
        <span>
          Email me about the launch. I can unsubscribe anytime. See our <Link href="/privacy" className="underline underline-offset-2">privacy notice</Link>.
        </span>
      </label>
      {err.consent ? <p className="mt-1 text-sm text-glow">{err.consent}</p> : null}
      {state.status === "error" && !Object.keys(err).length ? <p role="alert" className="mt-3 text-sm text-glow">{state.message}</p> : null}
    </form>
  );
}
