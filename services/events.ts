import { createClient } from "@/lib/supabase/server";
import type { NexoraEvent } from "@/types/event";

const EVENT_COLUMNS =
  "id, title, slug, description, image_url, date, start_time, end_time, location, category, registration_required, registration_link, created_at, updated_at";

export async function getUpcomingEvents(): Promise<NexoraEvent[]> {
  const supabase = createClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("events")
    .select(EVENT_COLUMNS)
    .gte("date", today)
    .order("date", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getPastEvents(): Promise<NexoraEvent[]> {
  const supabase = createClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("events")
    .select(EVENT_COLUMNS)
    .lt("date", today)
    .order("date", { ascending: false })
    .limit(12); // pagination simple : pas de récupération illimitée (section 32)

  if (error) throw error;
  return data ?? [];
}

export async function getEventBySlug(slug: string): Promise<NexoraEvent | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("events")
    .select(EVENT_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}
