import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import Prisma from "@prisma/client";

const AUDIENCES = ["parent", "alumni", "artist", "educator"] as const;

const subscribeSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address.").max(160),
  source: z.string().trim().max(40).optional(),
  // Who the subscriber is — helps the office address notices well.
  audience: z.enum(AUDIENCES).optional(),
  // Honeypot: humans never see this field; bots happily fill it.
  company: z.string().max(200).optional(),
});

// Simple in-memory rate limit: max 8 subscribes per IP per 10 minutes
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 8;

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
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many attempts — please try again a bit later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { error: first?.message || "Invalid subscription." },
        { status: 400 }
      );
    }

    const email = parsed.data.email.toLowerCase();
    const source = parsed.data.source || "footer";
    const audience = parsed.data.audience ?? "parent";

    // Honeypot tripped → pretend everything is fine, store nothing.
    if (parsed.data.company) {
      return NextResponse.json(
        { ok: true, message: "You're on the list." },
        { status: 201 }
      );
    }

    try {
      await db.newsletterSubscriber.create({ data: { email, source, audience } });
      return NextResponse.json({ ok: true, message: "You're on the list." }, { status: 201 });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        return NextResponse.json(
          { ok: true, message: "You're already on the list — see you at the next showcase." },
          { status: 200 }
        );
      }
      throw err;
    }
  } catch (err) {
    console.error("[/api/newsletter] failed:", err);
    return NextResponse.json(
      { error: "Subscription failed right now — please try again later." },
      { status: 500 }
    );
  }
}
