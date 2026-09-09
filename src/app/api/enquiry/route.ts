import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const enquirySchema = z
  .object({
    name: z.string().trim().min(2, "Please enter the learner or parent name.").max(120),
    email: z.string().trim().email("Please enter a valid email address.").max(160),
    phone: z
      .string()
      .trim()
      .min(7, "Please enter a contact number.")
      .max(24)
      .regex(/^[0-9+()\-\s]+$/, "Phone number can only contain digits and + ( ) -"),
    discipline: z.string().trim().max(60).optional().or(z.literal("")),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
    // Honeypot: humans never see this field; bots happily fill it.
    company: z.string().max(200).optional(),
    consent: z
      .boolean()
      .refine((v) => v === true, {
        message: "POPIA consent is required before we may store your details.",
      }),
  })
  .transform(({ consent: _consent, ...rest }) => rest);

// Simple in-memory rate limit: max 5 submissions per IP per 10 minutes
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many enquiries from this connection. Please phone the office." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { error: first?.message || "Invalid submission." },
        { status: 400 }
      );
    }

    const { name, email, phone, discipline, message, company } = parsed.data;

    // Honeypot tripped → pretend everything is fine, store nothing.
    if (company) {
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    const saved = await db.enquiry.create({
      data: {
        name,
        email,
        phone,
        discipline: discipline || null,
        message: message || null,
      },
    });

    return NextResponse.json(
      { ok: true, id: saved.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/enquiry] failed:", err);
    return NextResponse.json(
      { error: "The office inbox is unavailable right now — please phone the school." },
      { status: 500 }
    );
  }
}

// PATCH → status triage (contacted / closed / reopen) behind the shared admin key.
// Used by the in-page backstage panel so office staff never need curl.
const triageSchema = z.object({
  id: z.string().min(5),
  action: z.union([
    z.literal("contacted"),
    z.literal("closed"),
    z.literal("reopen"),
  ]),
});

export async function PATCH(req: NextRequest) {
  const key = req.headers.get("x-admin-key");
  const expected = process.env.ADMIN_KEY;
  if (!expected || !key || key !== expected) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => null);
    const parsed = triageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid triage request." }, { status: 400 });
    }

    const status =
      parsed.data.action === "reopen"
        ? "new"
        : parsed.data.action; // "contacted" | "closed"

    const updated = await db.enquiry.update({
      where: { id: parsed.data.id },
      data: { status },
      select: { id: true, status: true },
    });

    return NextResponse.json({ ok: true, enquiry: updated });
  } catch (err) {
    console.error("[/api/enquiry PATCH] failed:", err);
    return NextResponse.json({ error: "Triage failed." }, { status: 500 });
  }
}
