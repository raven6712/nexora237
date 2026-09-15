import gsap from "gsap";

// Orchestre l'apparition du Hero une seule fois au chargement (section 9).
// Aucun scrollTrigger ici : ce n'est pas lié au scroll, et surtout aucune
// boucle — une fois le timeline terminé, le Hero reste statique.
export function playHeroIntro(container: HTMLElement) {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const words = container.querySelectorAll<HTMLElement>("[data-hero-word]");
  const title = container.querySelector<HTMLElement>("[data-hero-title]");
  const cta = container.querySelector<HTMLElement>("[data-hero-cta]");

  if (prefersReduced) {
    gsap.set([title, ...Array.from(words), cta], { opacity: 1, y: 0 });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 })
    .fromTo(
      words,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
      "-=0.3"
    )
    .fromTo(
      cta,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.2"
    );
}
