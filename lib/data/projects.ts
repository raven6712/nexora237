import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    name: "Nexora Learn",
    description: "Plateforme communautaire de formations tech pour les membres de Nexora237.",
    image_url: "https://picsum.photos/id/60/900/600",
    category: "Développement web",
    technologies: ["Next.js", "Supabase", "Tailwind"],
    status: "en_cours",
  },
  {
    id: "2",
    name: "CamerAI",
    description: "Assistant IA en français local pour aider les entrepreneurs camerounais.",
    image_url: "https://picsum.photos/id/1/900/600",
    category: "Intelligence artificielle",
    technologies: ["Python", "FastAPI", "OpenAI"],
    status: "a_venir",
  },
  {
    id: "3",
    name: "Nexora Design System",
    description: "Bibliothèque de composants UI partagée pour les projets de la communauté.",
    image_url: "https://picsum.photos/id/96/900/600",
    category: "Design & UI/UX",
    technologies: ["React", "Storybook", "Figma"],
    status: "termine",
  },
];