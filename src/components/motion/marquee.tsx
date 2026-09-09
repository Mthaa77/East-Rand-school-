"use client";

import { ReactNode } from "react";

/**
 * Infinite CSS marquee. Content is duplicated so the loop is seamless.
 * `reverse` flips direction; hover pauses.
 */
export function Marquee({
  children,
  className = "",
  speed = "normal",
  reverse = false,
  pauseOnHover = true,
}: {
  children: ReactNode;
  className?: string;
  speed?: "normal" | "slow";
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  const anim =
    speed === "slow" ? "animate-[marquee_70s_linear_infinite]" : "animate-[marquee_40s_linear_infinite]";
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex w-max items-center ${
          reverse ? "[animation-direction:reverse]" : ""
        } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""} ${anim}`}
      >
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
