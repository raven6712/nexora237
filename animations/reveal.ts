import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
}

// Entrée → repos, jamais d'animation permanente (section 4/12).
// `once: true` sur le ScrollTrigger : l'animation ne se relance pas au
// re-scroll, ce qui évite tout recalcul inutile après la première entrée.
export function revealOnScroll(
  target: gsap.TweenTarget,
  { y = 24, duration = 0.6, stagger = 0.08 }: RevealOptions = {}
) {
  if (typeof window === "undefined") return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced) {
    gsap.set(target, { opacity: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    target,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: target as gsap.DOMTarget,
        start: "top 85%",
        once: true,
      },
    }
  );
}
