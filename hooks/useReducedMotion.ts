"use client";

import { useEffect, useState } from "react";

// Single source of truth for "should we animate?".
// GSAP timelines, Framer Motion variants, and Lenis all check this
// before running anything beyond an essential fade/opacity transition.
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}
