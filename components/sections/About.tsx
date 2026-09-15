import { Target, Compass, Gem } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const values = [
  { icon: Target, title: "Mission", text: "Rassembler les talents numériques camerounais pour apprendre et construire ensemble.", color: "#2563eb" },
  { icon: Compass, title: "Vision", text: "Faire de Nexora237 la référence des communautés tech au Cameroun et en Afrique centrale.", color: "#60a5fa" },
  { icon: Gem, title: "Valeurs", text: "Collaboration, ambition, créativité et transmission du savoir.", color: "#64748b" },
];

export function About({ variant = "compact" }: { variant?: "compact" | "full" }) {
  return (
    <section id="a-propos" className="relative overflow-hidden py-20">
      <div aria-hidden className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 translate-x-1/2 rounded-full bg-blue-900/30 blur-[100px]" />

      <Container className="relative flex flex-col gap-10">
        <RevealOnScroll>
          <SectionTitle
            eyebrow="Qui sommes-nous"
            title="À propos de Nexora237"
            description="Nexora237 est une communauté numérique camerounaise qui connecte les talents, les créateurs et les innovateurs autour de la technologie."
          />
        </RevealOnScroll>

        <RevealOnScroll className="grid gap-6 sm:grid-cols-3">
          {values.map(({ icon: Icon, title, text, color }) => (
            <div
              key={title}
              style={{ ["--accent" as string]: color }}
              className={[
                "group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md",
                "transition-all duration-300 ease-nexora",
                "hover:-translate-y-1 hover:border-[color:var(--accent)]/50",
                "hover:shadow-[0_20px_40px_-15px_var(--accent)]",
              ].join(" ")}
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)",
                  color: "var(--accent)",
                  filter: "drop-shadow(0 0 10px var(--accent))",
                }}
              >
                <Icon size={22} />
              </div>

              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{title}</h3>
              <p className="italic text-sm text-muted">{text}</p>
            </div>
          ))}
        </RevealOnScroll>

        {variant === "full" && (
          <RevealOnScroll className="max-w-3xl text-base text-muted">
            <p className="italic">
              Nexora237 est née de la volonté de créer un espace où les
              développeurs, designers, entrepreneurs et passionnés de
              technologie du Cameroun peuvent se rencontrer, apprendre les uns
              des autres et transformer leurs idées en projets concrets, à
              travers des événements, des formations et des collaborations
              ouvertes à tous les niveaux d'expérience.
            </p>
          </RevealOnScroll>
        )}
      </Container>
    </section>
  );
}