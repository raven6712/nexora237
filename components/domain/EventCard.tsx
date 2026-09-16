import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { NexoraEvent } from "@/types/event";

const fallbackPhotos = [
  "https://picsum.photos/id/180/900/1200",
  "https://picsum.photos/id/1076/900/1200",
  "https://picsum.photos/id/1005/900/1200",
  "https://picsum.photos/id/1015/900/1200",
];

function pickFallback(seed: string) {
  const index = seed.charCodeAt(0) % fallbackPhotos.length;
  return fallbackPhotos[index] ?? fallbackPhotos[0]!;
}

export function EventCard({ event, isPast = false }: { event: NexoraEvent; isPast?: boolean }) {
  const photo = event.image_url || pickFallback(event.id);

  return (
    <article className="group relative flex h-[420px] flex-col overflow-hidden rounded-2xl border border-white/10">
      <Image
        src={photo}
        alt={`Affiche de l'événement ${event.title}`}
        fill
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />

      {isPast && (
        <span className="absolute right-4 top-4 z-10">
          <Badge tone="default">Terminé</Badge>
        </span>
      )}

      <div className="relative z-10 mt-auto flex flex-col gap-3 p-6">
        <span className="w-fit rounded-full border border-blue-400/40 bg-blue-500/20 px-3 py-1 text-sm text-blue-200">
          {event.category}
        </span>

        <h3 className="font-display text-2xl font-bold leading-tight text-white">{event.title}</h3>

        <div className="flex flex-col gap-1 text-sm italic text-white/70">
          <span className="flex items-center gap-2">
            <Calendar size={14} /> {new Date(event.date).toLocaleDateString("fr-FR")}
          </span>
          {event.start_time && (
            <span className="flex items-center gap-2">
              <Clock size={14} /> {event.start_time}
            </span>
          )}
          <span className="flex items-center gap-2">
            <MapPin size={14} /> {event.location}
          </span>
        </div>

        <div className="mt-2 flex gap-2">
          <Link href={`/evenements/${event.slug}`}>
            <Button size="sm" variant="secondary">Voir l'événement</Button>
          </Link>
          {!isPast && event.registration_required && (
            <Link href={`/evenements/${event.slug}#inscription`}>
              <Button size="sm">S'inscrire</Button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}