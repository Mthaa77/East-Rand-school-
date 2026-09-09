"use client";

import { Marquee } from "@/components/motion/marquee";

const items = [
  "2027 Grade 8 admissions — GDE online applications open",
  "The audition is the entrance exam — potential is trained here",
  "Gauteng Art winner — Mpho Moloi takes the R5 000 board at “Be the Voice”",
  "Five specialist disciplines: Visual Arts · Design · Dramatic Arts · Dance Studies · Music",
  "98.86% NSC pass rate — Class of 2025",
  "Sawubona · Molo · Goeiedag · Thobela · Ndaa — twelve languages, one welcome",
  "1 Jones Street, Daveyton, Benoni",
];

export function AnnouncementBar() {
  return (
    <div className="relative z-[80] border-b border-ink-950/25 bg-crimson-600 text-snow">
      <Marquee className="py-2" pauseOnHover>
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 text-[0.68rem] font-bold uppercase tracking-[0.22em] whitespace-nowrap"
          >
            <span className="inline-block size-1.5 rounded-full bg-snow/85 animate-[pulse-dot_2.4s_ease-in-out_infinite]" />
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
