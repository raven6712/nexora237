"use client";

import { useEffect, useRef } from "react";
import { animateCounter } from "@/animations/counters";

export function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) animateCounter(ref.current, value);
  }, [value]);

  return (
    <span className="font-display text-3xl font-semibold text-foreground">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
