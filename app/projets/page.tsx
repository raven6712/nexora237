import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectCard } from "@/components/domain/ProjectCard";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projets — Nexora237",
  description: "Découvrez les projets construits par la communauté Nexora237.",
};

export default function ProjetsPage() {
  return (
    <main className="py-20">
      <Container className="flex flex-col gap-10">
        <SectionTitle
          eyebrow="Projets"
          title="Ce que la communauté construit"
          description="Des projets portés par les membres de Nexora237, dans tous les domaines de la tech."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </main>
  );
}
