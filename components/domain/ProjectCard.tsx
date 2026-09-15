import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Project, ProjectStatus } from "@/types/project";

const statusLabel: Record<ProjectStatus, { label: string; tone: "default" | "success" | "warning" }> = {
  en_cours: { label: "En cours", tone: "warning" },
  termine: { label: "Terminé", tone: "success" },
  a_venir: { label: "À venir", tone: "default" },
};

export function ProjectCard({ project }: { project: Project }) {
  const status = statusLabel[project.status];

  return (
    <article className="group relative flex h-[420px] flex-col overflow-hidden rounded-2xl border border-white/10">
      <Image
        src={project.image_url}
        alt={`Aperçu du projet ${project.name}`}
        fill
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />

      <span className="absolute right-4 top-4 z-10">
        <Badge tone={status.tone}>{status.label}</Badge>
      </span>

      <div className="relative z-10 mt-auto flex flex-col gap-3 p-6">
        <span className="w-fit rounded-full border border-blue-400/40 bg-blue-500/20 px-3 py-1 text-sm text-blue-200">
          {project.category}
        </span>

        <h3 className="font-display text-2xl font-bold leading-tight text-white">{project.name}</h3>
        <p className="italic text-sm text-white/70">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="text-sm text-white/60">#{tech}</span>
          ))}
        </div>

        <Button size="sm" variant="secondary" className="mt-1 self-start">Découvrir</Button>
      </div>
    </article>
  );
}