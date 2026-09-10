import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// In-memory cache — the events list changes rarely and saves a DB hit per visit.
let cache: { data: unknown; at: number } | null = null;
const TTL = 60 * 1000; // 60s

/* Browser/CDN cache: short max-age (repeat visits skip the network entirely),
   stale-while-revalidate keeps the board instant while a fresh copy builds. */
const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
} as const;

export async function GET() {
  try {
    if (cache && Date.now() - cache.at < TTL) {
      return NextResponse.json(cache.data, { headers: CACHE_HEADERS });
    }

    const events = await db.schoolEvent.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { dateISO: "desc" }],
      select: {
        id: true,
        slug: true,
        title: true,
        summary: true,
        category: true,
        status: true,
        tone: true,
        dateISO: true,
        venue: true,
        ctaLabel: true,
        ctaHref: true,
        sourceNote: true,
      },
    });

    const payload = { events, lastVerified: "September 2026" };
    cache = { data: payload, at: Date.now() };
    return NextResponse.json(payload, { headers: CACHE_HEADERS });
  } catch (err) {
    console.error("[/api/events] failed:", err);
    return NextResponse.json(
      { error: "Could not load events right now." },
      { status: 500 }
    );
  }
}
