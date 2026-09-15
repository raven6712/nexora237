import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateCounter(
  element: HTMLElement,
  target: number,
  { duration = 1.4 }: { duration?: number } = {}
) {
  if (typeof window === "undefined") return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced) {
    element.textContent = String(target);
    return;
  }

  const counter = { value: 0 };

  ScrollTrigger.create({
    trigger: element,
    start: "top 90%",
    once: true, // le compteur ne s'exécute qu'une seule fois (section 13)
    onEnter: () => {
      gsap.to(counter, {
        value: target,
        duration,
        ease: "power1.out",
        onUpdate: () => {
          element.textContent = String(Math.round(counter.value));
        },
      });
    },
  });
}
