import { createClient } from "@/lib/supabase/client";

export async function registerForEvent({
  eventId,
  userId,
  phone,
}: {
  eventId: string;
  userId: string;
  phone?: string;
}) {
  const supabase = createClient();

  const { error } = await supabase.from("event_registrations").insert({
    event_id: eventId,
    user_id: userId,
    phone: phone || null,
  });

  if (error) throw error;
}
