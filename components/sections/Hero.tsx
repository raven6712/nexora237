"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Code2,
  BrainCircuit,
  Palette,
  Megaphone,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Marquee } from "@/components/ui/Marquee";
import { playHeroIntro } from "@/animations/hero";

const rotatingWords = ["Connecter.", "Apprendre.", "Créer.", "Innover.","Transformer."];

const marqueeItems = [
  { icon: Code2, label: "Développement" },
  { icon: BrainCircuit, label: "Intelligence Artificielle" },
  { icon: Palette, label: "Design & UI/UX" },
  { icon: Megaphone, label: "Digital Marketing" },
  { icon: ShieldCheck, label: "Cybersécurité" },
  { icon: Rocket, label: "Entrepreneuriat" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      playHeroIntro(containerRef.current);
    }
  }, []);

  return (
    <section className="relative flex min-h-[95vh] flex-col overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-primary/30 via-[#0a1e3f] to-background"
      />

      <Image
        src="/images/nup.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-50"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-primary/10"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/40 blur-3xl animate-glow-pulse"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-32 h-80 w-80 rounded-full bg-primary/30 blur-3xl animate-glow-pulse [animation-delay:2s]"
      />

      <div className="relative z-10 border-b border-border/60 bg-background/40 py-4 backdrop-blur-sm">
        <Marquee>
          {marqueeItems.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-2 text-sm text-muted">
              <Icon size={16} className="text-primary" />
              {label}
            </span>
          ))}
        </Marquee>
      </div>

      <Container
        ref={containerRef}
        className="relative z-10 flex flex-1 flex-col items-start justify-end gap-6 pb-20 pt-16"
      >
        <div className="flex flex-wrap items-center gap-3 rounded-sm border border-border bg-surface/60 px-4 py-2 text-sm text-muted backdrop-blur-sm">
          <span>Communauté numérique</span>
          <span className="text-primary">•</span>
          <span>Cameroun</span>
        </div>

        <h1 data-hero-title className="font-display text-hero font-semibold leading-[0.95] opacity-0">
          <AnimatedText words={rotatingWords} className="text-primary" />
          <br />
          <span className="bg-gradient-to-r from-primary via-[#60a5fa] to-foreground bg-clip-text text-transparent">
            NEXORA237
          </span>
        </h1>

        <p data-hero-word className="max-w-xl italic text-lg text-muted opacity-0">
          Une communauté qui rassemble les talents numériques, les créateurs
          et les innovateurs pour apprendre, collaborer et construire les
          solutions de demain.
        </p>

        <div data-hero-cta className="flex flex-wrap gap-4 opacity-0">
          <Link href="/a-propos">
            <Button size="lg">Découvrir Nexora237</Button>
          </Link>
          <Link href="/evenements">
            <Button size="lg" variant="secondary">
              Voir les événements
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}