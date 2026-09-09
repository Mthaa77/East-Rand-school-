import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buildIcs } from "@/lib/ics";

// Subscribable season calendar — every dated, published, still-upcoming
// event as one RFC-5545 feed. Parents can add the URL to Google Calendar /
// Apple Calendar ("Subscribe to calendar") or download the .ics directly.

export async function GET(req: NextRequest) {
  try {
    const today = new Date();
    const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const events = await db.schoolEvent.findMany({
      where: {
        published: true,
        category: "event",
        dateISO: { gte: todayISO },
      },
      orderBy: [{ dateISO: "asc" }],
    });

    const origin = req.nextUrl.origin;
    const ics = buildIcs(
      events.map((e) => ({
        slug: e.slug,
        title: e.title,
        summary: e.summary,
        dateISO: e.dateISO!,
        venue: e.venue,
        url: e.ctaHref ?? `${origin}/#notice-${e.slug}`,
      })),
      { calendarName: "ERSA — On Stage (season calendar)" }
    );

    return new NextResponse(ics, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'inline; filename="ersa-season.ics"',
        "Cache-Control": "public, max-age=900",
      },
    });
  } catch (err) {
    console.error("[/api/calendar] failed:", err);
    return NextResponse.json({ error: "Could not build the season calendar." }, { status: 500 });
  }
}
