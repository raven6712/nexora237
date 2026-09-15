"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const nodes = ["Talents", "Projets", "Formations", "Événements", "Opportunités", "Innovation", "Communauté"];

export function Ecosystem() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = svgRef.current.querySelectorAll("line");

    if (prefersReduced) {
      lines.forEach((line) => line.setAttribute("stroke-dashoffset", "0"));
      return;
    }

    lines.forEach((line) => {
      const length = line.getTotalLength();
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;
    });

    ScrollTrigger.create({
      trigger: svgRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.to(lines, { strokeDashoffset: 0, duration: 1, stagger: 0.15, ease: "power2.out" });
      },
    });
  }, []);

  const radius = 140;
  const center = { x: 200, y: 200 };
  const positions = nodes.map((_, i) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    return { x: center.x + radius * Math.cos(angle), y: center.y + radius * Math.sin(angle) };
  });

  return (
    <section className="py-20">
      <Container className="flex flex-col items-center gap-10">
        <RevealOnScroll>
          <SectionTitle
            align="center"
            eyebrow="L'écosystème"
            title="Tout est connecté chez Nexora237"
            description="Talents, projets, formations, événements : tout circule dans un seul réseau."
          />
        </RevealOnScroll>

        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          className="h-auto w-full max-w-md"
          role="img"
          aria-label="Diagramme illustrant les liens entre talents, projets, formations, événements, opportunités, innovation et communauté au sein de Nexora237"
        >
          {positions.map((pos, i) => (
            <line key={i} x1={center.x} y1={center.y} x2={pos.x} y2={pos.y} stroke="var(--color-primary)" strokeWidth={1.5} opacity={0.5} />
          ))}
          <circle cx={center.x} cy={center.y} r={36} fill="var(--color-primary)" />
          <text x={center.x} y={center.y + 5} textAnchor="middle" fill="var(--color-primary-foreground)" fontSize="12" fontWeight="600">
            Nexora237
          </text>
          {positions.map((pos, i) => (
            <g key={nodes[i]}>
              <circle cx={pos.x} cy={pos.y} r={26} fill="var(--color-surface)" stroke="var(--color-border)" />
              <text x={pos.x} y={pos.y + 4} textAnchor="middle" fill="var(--color-foreground)" fontSize="9">
                {nodes[i]}
              </text>
            </g>
          ))}
        </svg>
      </Container>
    </section>
  );
}