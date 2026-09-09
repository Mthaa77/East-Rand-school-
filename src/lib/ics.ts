// Framework-free iCalendar (RFC 5545) builders shared by the client
// (per-event "Add to calendar") and the server (GET /api/calendar season feed).

export type IcsEventInput = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date "YYYY-MM-DD" — all-day event. */
  dateISO: string;
  venue?: string | null;
  /** Optional URL attached to the VEVENT (ticket page or deep link). */
  url?: string | null;
};

export function icsEscape(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

export function nextDayISO(dateISO: string): string {
  const [y, m, d] = dateISO.split("-").map(Number);
  const next = new Date(y, (m ?? 1) - 1, (d ?? 1) + 1);
  return `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}-${String(
    next.getDate()
  ).padStart(2, "0")}`;
}

function foldIcsLine(line: string): string[] {
  // RFC 5545 §3.1 — lines longer than 75 octets are folded with CRLF + space.
  if (line.length <= 74) return [line];
  const parts: string[] = [line.slice(0, 74)];
  let rest = line.slice(74);
  while (rest.length > 0) {
    parts.push(` ${rest.slice(0, 73)}`);
    rest = rest.slice(73);
  }
  return parts;
}

/**
 * Build a complete VCALENDAR. One event → same shape as the old per-event
 * download; many events → the subscribable season feed.
 */
export function buildIcs(
  items: IcsEventInput[],
  opts?: { calendarName?: string }
): string {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//East Rand School of the Arts//Notice Board//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...(opts?.calendarName ? [`X-WR-CALNAME:${icsEscape(opts.calendarName)}`] : []),
    "REFRESH-INTERVAL;VALUE=DURATION:PT12H",
    "X-PUBLISHED-TTL:PT12H",
  ];

  for (const item of items) {
    const start = item.dateISO.replaceAll("-", "");
    const end = nextDayISO(item.dateISO).replaceAll("-", "");
    lines.push(
      "BEGIN:VEVENT",
      `UID:${item.slug}@ersa.co.za`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${end}`,
      `SUMMARY:${icsEscape(item.title)}`,
      `DESCRIPTION:${icsEscape(
        `${item.summary}\n\nDates and details are confirmed with the school office: 010 007 1186.${item.url ? `\n${item.url}` : ""}`
      )}`,
      `LOCATION:${icsEscape(item.venue ?? "1 Jones Street, Daveyton, Benoni")}`,
      ...(item.url ? [`URL:${item.url}`] : []),
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");
  return lines.flatMap(foldIcsLine).join("\r\n");
}
