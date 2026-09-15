import Lenis from "lenis";

// Single Lenis instance for the whole app. Returns null (no smooth scroll,
// native browser scroll instead) when the user prefers reduced motion —
// per section 5, parallax/smooth-scroll must be disabled first.
export function createLenis(): Lenis | null {
  if (typeof window === "undefined") return null;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced) return null;

  return new Lenis({
    duration: 1.1,
    smoothWheel: true,
  });
}
