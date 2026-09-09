import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

// Public shape for approved stories — never exposes emails or moderation fields.
const PUBLIC_SELECT = {
  name: true,
  cohort: true,
  discipline: true,
  path: true,
  story: true,
  createdAt: true,
};

const storySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(160),
  cohort: z
    .string()
    .trim()
    .min(2, "Which year did you matric (or are you a current learner)?")
    .max(40),
  discipline: z.string().trim().min(2, "Choose your discipline.").max(40),
  path: z.string().trim().max(160).optional().or(z.literal("")),
  story: z
    .string()
    .trim()
    .min(30, "Please write at least a sentence or two (30+ characters).")
    .max(2000, "Please keep your story under 2000 characters."),
  consent: z.literal(true, {
    message: "Consent is required before we can review your story.",
  }),
  // Honeypot: humans never see this field; bots happily fill it.
  company: z.string().max(200).optional(),
});

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

// GET → approved stories only (public register). Cached 60s in-memory.
let storyCache: { data: unknown; at: number } | null = null;

export async function GET() {
  try {
    if (storyCache && Date.now() - storyCache.at < 60_000) {
      return NextResponse.json(storyCache.data);
    }
    const stories = await db.alumniStory.findMany({
      where: { status: "approved" },
      orderBy: { createdAt: "desc" },
      select: PUBLIC_SELECT,
      take: 12,
    });
    const payload = { stories, count: stories.length };
    storyCache = { data: payload, at: Date.now() };
    return NextResponse.json(payload);
  } catch (err) {
    console.error("[/api/alumni-story GET] failed:", err);
    return NextResponse.json({ error: "Could not load stories." }, { status: 500 });
  }
}

// PATCH → moderation (approve/archive) behind a shared admin key.
const moderationSchema = z.object({
  id: z.string().min(5),
  action: z.union([z.literal("approve"), z.literal("archive")]),
});

export async function PATCH(req: NextRequest) {
  const key = req.headers.get("x-admin-key");
  const expected = process.env.ADMIN_KEY;
  if (!expected || !key || key !== expected) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => null);
    const parsed = moderationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid moderation request." }, { status: 400 });
    }

    const status = parsed.data.action === "approve" ? "approved" : "archived";
    const updated = await db.alumniStory.update({
      where: { id: parsed.data.id },
      data: { status },
      select: { id: true, status: true },
    });

    storyCache = null; // bust the public cache on moderation changes
    return NextResponse.json({ ok: true, story: updated });
  } catch (err) {
    console.error("[/api/alumni-story PATCH] failed:", err);
    return NextResponse.json({ error: "Moderation failed." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions — please try again a bit later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = storySchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { error: first?.message || "Invalid submission." },
        { status: 400 }
      );
    }

    const { consent: _consent, path, company, ...data } = parsed.data;

    // Honeypot tripped → pretend everything is fine, store nothing.
    if (company) {
      return NextResponse.json(
        {
          ok: true,
          message:
            "Story received — thank you. The school reviews every submission before it appears anywhere.",
        },
        { status: 201 }
      );
    }

    await db.alumniStory.create({
      data: {
        ...data,
        path: path || null,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message:
          "Story received — thank you. The school reviews every submission before it appears anywhere.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/alumni-story] failed:", err);
    return NextResponse.json(
      { error: "Submission failed right now — please try again later." },
      { status: 500 }
    );
  }
}
