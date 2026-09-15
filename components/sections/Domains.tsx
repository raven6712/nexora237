import {
  Code2,
  BrainCircuit,
  Palette,
  Megaphone,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const domains = [
  { icon: Code2, title: "Développement web & mobile", text: "Sites, applications et produits numériques construits par la communauté.", color: "#faf600" },
  { icon: BrainCircuit, title: "Intelligence artificielle", text: "Modèles, automatisation et cas d'usage IA adaptés au contexte local.", color: "#667bf0" },
  { icon: Palette, title: "Design & UI/UX", text: "Interfaces claires, accessibles et pensées pour l'utilisateur final.", color: "#f54747" },
  { icon: Megaphone, title: "Digital Marketing", text: "Stratégies de contenu et de croissance pour les projets de la communauté.", color: "#02d7f3" },
  { icon: ShieldCheck, title: "Réseaux & cybersécurité", text: "Bonnes pratiques de sécurité et d'infrastructure réseau.", color: "#3cfc01" },
  { icon: Rocket, title: "Entrepreneuriat & innovation", text: "Accompagnement des porteurs de projets tech camerounais.", color: "#be66f1" },
];

export function Domains() {
  return (
    <section id="domaines" className="relative overflow-hidden py-20">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <Container className="relative flex flex-col gap-10">
        <RevealOnScroll>
          <SectionTitle eyebrow="Nos domaines" title="Six domaines, une seule communauté" />
        </RevealOnScroll>

        <RevealOnScroll className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map(({ icon: Icon, title, text, color }) => (
            <div key={title} style={{ ["--accent" as string]: color }} className="h-56 [perspective:1200px]">
              <div
                className={[
                  "group relative h-full w-full transition-transform duration-500 ease-nexora",
                  "[transform-style:preserve-3d]",
                  "hover:[transform:rotateY(180deg)]",
                  "focus-within:[transform:rotateY(180deg)]",
                ].join(" ")}
                tabIndex={0}
              >
                <div
                  className={[
                    "absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md",
                    "[backface-visibility:hidden]",
                    "transition-shadow duration-300",
                    "group-hover:border-[color:var(--accent)]/50 group-hover:shadow-[0_20px_40px_-15px_var(--accent)]",
                  ].join(" ")}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)",
                      color: "var(--accent)",
                      filter: "drop-shadow(0 0 10px var(--accent))",
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text font-display text-base font-semibold text-transparent">
                    {title}
                  </h3>
                </div>

                <div
                  className="absolute inset-0 flex flex-col justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  style={{ borderColor: "color-mix(in srgb, var(--accent) 40%, transparent)" }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ backgroundColor: "var(--accent)" }}>
                    <Icon size={18} />
                  </div>
                  <h3 className="font-display text-sm font-semibold" style={{ color: "var(--accent)" }}>{title}</h3>
                  <p className="italic text-sm text-muted">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </RevealOnScroll>
      </Container>
    </section>
  );
}