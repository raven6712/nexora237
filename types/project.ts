export type ProjectStatus = "en_cours" | "termine" | "a_venir";

export interface Project {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
  technologies: string[];
  status: ProjectStatus;
}
