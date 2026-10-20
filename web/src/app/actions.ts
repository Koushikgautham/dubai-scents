"use server";

import { z } from "zod";
import { getSupabase } from "@/lib/supabase";

export type FormState = { status: "idle" | "success" | "error"; message: string; fieldErrors?: Record<string, string> };

const consent = z.literal("on", { error: "Please confirm we can contact you." });

function honeypotTripped(formData: FormData) {
  // Hidden field humans never fill; bots usually do.
  return Boolean(formData.get("website"));
}

function flatten(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}

async function insert(table: string, row: Record<string, unknown>): Promise<FormState> {
  const db = getSupabase();
  if (!db) {
    console.warn(`[forms] Supabase not configured; would insert into ${table}`, row);
    return { status: "success", message: "Thanks! (Dev mode: not saved yet.)" };
  }
  const { error } = await db.from(table).insert(row);
  if (error) {
    // Duplicate waitlist email → treat as success (no info leak).
    if (error.code === "23505") return { status: "success", message: "You're already on the list. We'll be in touch." };
    console.error(`[forms] insert into ${table} failed`, error.message);
    return { status: "error", message: "Something went wrong. Please try again, or email us." };
  }
  return { status: "success", message: "" };
}

const waitlistSchema = z.object({
  email: z.email("Please enter a valid email.").max(254),
  source: z.string().max(40).optional(),
  consent,
});

export async function joinWaitlist(_: FormState, formData: FormData): Promise<FormState> {
  if (honeypotTripped(formData)) return { status: "success", message: "Thanks!" };
  const parsed = waitlistSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", message: "Please check the form.", fieldErrors: flatten(parsed.error) };
  const res = await insert("waitlist", {
    email: parsed.data.email.toLowerCase().trim(),
    source_page: parsed.data.source ?? "unknown",
    consent: true,
  });
  return res.status === "success" && !res.message ? { status: "success", message: "You're on the list. We'll write when we launch." } : res;
}

const tradeSchema = z.object({
  business_name: z.string().trim().min(2, "Business name is required.").max(120),
  business_type: z.enum(["d2c-brand", "attar-shop", "perfume-counter", "distributor", "other"], { error: "Choose a business type." }),
  city: z.string().trim().min(2, "City is required.").max(80),
  gstin: z.string().trim().max(20).optional().or(z.literal("")),
  contact_name: z.string().trim().min(2, "Your name is required.").max(80),
  email: z.email("Please enter a valid email.").max(254),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  interest: z.enum(["bulk-oils", "sample-kit", "both"], { error: "Choose what you're interested in." }),
  est_volume: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent,
});

export async function submitTradeEnquiry(_: FormState, formData: FormData): Promise<FormState> {
  if (honeypotTripped(formData)) return { status: "success", message: "Thanks!" };
  const parsed = tradeSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", message: "Please check the highlighted fields.", fieldErrors: flatten(parsed.error) };
  const { consent: _c, ...row } = parsed.data;
  void _c;
  const res = await insert("trade_enquiries", { ...row, consent: true });
  return res.status === "success" && !res.message
    ? { status: "success", message: "Thank you. We'll reply within two working days." }
    : res;
}

const contactSchema = z.object({
  name: z.string().trim().min(2, "Your name is required.").max(80),
  email: z.email("Please enter a valid email.").max(254),
  message: z.string().trim().min(5, "Please write a short message.").max(2000),
  consent,
});

export async function submitContact(_: FormState, formData: FormData): Promise<FormState> {
  if (honeypotTripped(formData)) return { status: "success", message: "Thanks!" };
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", message: "Please check the highlighted fields.", fieldErrors: flatten(parsed.error) };
  const { consent: _c, ...row } = parsed.data;
  void _c;
  const res = await insert("contact_messages", { ...row, consent: true });
  return res.status === "success" && !res.message ? { status: "success", message: "Thanks. We'll get back to you soon." } : res;
}
