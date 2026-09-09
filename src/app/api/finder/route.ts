import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Anonymous tally of discipline-finder results. One row per completed quiz —
// no PII, no sessions, no answers — just which instrument the visitor landed on.

const VALID = new Set(["visual-arts", "design", "drama", "dance", "music"]);

// In-memory cache for the aggregate — busts on every new POST.
let cache: { data: unknown; at: number } | null = null;
const TTL = 60 * 1000; // 60s
const bust = () => (cache = null);

// Self-maintaining register: rows older than 90 days are pruned at most once
// an hour, so the tally stays current without a cron.
const KEEP_MS = 90 * 24 * 60 * 60 * 1000;
let lastPrune = 0;

async function prune() {
  if (Date.now() - lastPrune < 60 * 60 * 1000) return;
  lastPrune = Date.now();
  await db
    .finderResult.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - KEEP_MS) } } })
    .catch(() => {});
}

async function aggregate() {
  const grouped = await db.finderResult.groupBy({
    by: ["discipline"],
    _count: { _all: true },
  });
  const counts: Record<string, number> = {};
  for (const g of grouped) counts[g.discipline] = g._count._all;
  return { counts, total: grouped.reduce((n, g) => n + g._count._all, 0) };
}

export async function GET() {
  try {
    if (cache && Date.now() - cache.at < TTL) {
      return NextResponse.json(cache.data);
    }
    const payload = await aggregate();
    cache = { data: payload, at: Date.now() };
    return NextResponse.json(payload);
  } catch (err) {
    console.error("[/api/finder GET] failed:", err);
    return NextResponse.json({ error: "Could not load the tally." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as { discipline?: string } | null;
    const discipline = body?.discipline;
    if (!discipline || typeof discipline !== "string" || !VALID.has(discipline)) {
      return NextResponse.json({ error: "Unknown discipline." }, { status: 400 });
    }

    await prune();
    await db.finderResult.create({ data: { discipline } });
    bust();
    const payload = await aggregate();
    cache = { data: payload, at: Date.now() };
    return NextResponse.json(payload, { status: 201 });
  } catch (err) {
    console.error("[/api/finder POST] failed:", err);
    return NextResponse.json({ error: "Could not record the result." }, { status: 500 });
  }
}
