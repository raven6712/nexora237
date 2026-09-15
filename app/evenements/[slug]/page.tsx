import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { RegistrationModal } from "@/components/domain/RegistrationModal";
import { getEventBySlug } from "@/services/events";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: "Événement introuvable — Nexora237" };

  return {
    title: `${event.title} — Nexora237`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.image_url ? [event.image_url] : [],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  // Section 34: données structurées pour les événements.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: `${event.date}${event.start_time ? "T" + event.start_time : ""}`,
    location: {
      "@type": "Place",
      name: event.location,
    },
    description: event.description,
  };

  return (
    <main className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="flex max-w-3xl flex-col gap-6">
        {event.image_url && (
          <div className="relative aspect-video overflow-hidden rounded-md">
            <Image
              src={event.image_url}
              alt={`Affiche de ${event.title}`}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        <Badge>{event.category}</Badge>
        <h1 className="font-display text-3xl font-semibold">{event.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <span className="flex items-center gap-2">
            <Calendar size={16} /> {new Date(event.date).toLocaleDateString("fr-FR")}
          </span>
          {event.start_time && (
            <span className="flex items-center gap-2">
              <Clock size={16} /> {event.start_time}
              {event.end_time ? ` – ${event.end_time}` : ""}
            </span>
          )}
          <span className="flex items-center gap-2">
            <MapPin size={16} /> {event.location}
          </span>
        </div>

        <p className="text-base text-foreground">{event.description}</p>

        {event.registration_required && <RegistrationModal event={event} />}
      </Container>
    </main>
  );
}
