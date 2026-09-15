import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 215, suffix: "+", label: "Membres" },
  { value: 5, suffix: "+", label: "Projets" },
  { value: 2, suffix: "+", label: "Événements" },
  { value: 6, suffix: "", label: "Domaines" },
];

export function Stats() {
  return (
    <section className="bg-[#1d4ed8] py-16">
      <Container className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <span className="text-sm text-muted">{stat.label}</span>
          </div>
        ))}
      </Container>
    </section>
  );
}
