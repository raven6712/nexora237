export interface NexoraEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  date: string; // ISO date
  start_time: string | null;
  end_time: string | null;
  location: string;
  category: string;
  registration_required: boolean;
  registration_link: string | null;
  created_at: string;
  updated_at: string;
}
