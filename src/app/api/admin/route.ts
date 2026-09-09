import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Admin dashboard data for the in-page "backstage pass" panel.
// Every request must present the shared admin key in the x-admin-key header.

function authorised(req: NextRequest): boolean {
  const key = req.headers.get("x-admin-key");
  const expected = process.env.ADMIN_KEY;
  return Boolean(expected && key && key === expected);
}

export async function GET(req: NextRequest) {
  if (!authorised(req)) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  try {
    const [enquiries, stories, subscribers, subscriberCount, audienceGroups, finderGroups] = await Promise.all([
      db.enquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
      db.alumniStory.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
      db.newsletterSubscriber.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
      db.newsletterSubscriber.count(),
      db.newsletterSubscriber.groupBy({
        by: ["audience"],
        _count: { audience: true },
      }),
      db.finderResult.groupBy({
        by: ["discipline"],
        _count: { discipline: true },
      }),
    ]);

    const tally = (rows: { status: string }[], status: string) =>
      rows.filter((r) => r.status === status).length;

    return NextResponse.json({
      counts: {
        enquiries: {
          new: tally(enquiries, "new"),
          contacted: tally(enquiries, "contacted"),
          closed: tally(enquiries, "closed"),
        },
        stories: {
          new: tally(stories, "new"),
          approved: tally(stories, "approved"),
          archived: tally(stories, "archived"),
        },
        subscribers: subscriberCount,
        subscribersByAudience: audienceGroups
          .map((g) => ({ audience: g.audience, count: g._count.audience }))
          .sort((a, b) => b.count - a.count),
        finder: finderGroups
          .map((g) => ({ discipline: g.discipline, count: g._count.discipline }))
          .sort((a, b) => b.count - a.count),
      },
      enquiries,
      stories,
      subscribers,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[/api/admin GET] failed:", err);
    return NextResponse.json({ error: "Could not load the backstage data." }, { status: 500 });
  }
}
