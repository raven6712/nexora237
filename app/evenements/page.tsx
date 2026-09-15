import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EventCard } from "@/components/domain/EventCard";
import { getUpcomingEvents, getPastEvents } from "@/services/events";

export const metadata: Metadata = {
  title: "Événements — Nexora237",
  description: "Les événements à venir et passés de la communauté Nexora237.",
};

async function UpcomingEvents() {
  const events = await getUpcomingEvents();
  if (events.length === 0) {
    return <p className="text-muted">Aucun événement à venir pour le moment.</p>;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => <EventCard key={event.id} event={event} />)}
    </div>
  );
}

async function PastEvents() {
  const events = await getPastEvents();
  if (events.length === 0) return null;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => <EventCard key={event.id} event={event} isPast />)}
    </div>
  );
}

function EventsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => <div key={i} className="h-72 animate-pulse rounded-md bg-surface" />)}
    </div>
  );
}

export default function EvenementsPage() {
  return (
    <main className="py-20">
      <div className="relative mb-16 flex h-[45vh] min-h-[320px] items-end overflow-hidden">
        <Image src="https://picsum.photos/id/1074/1920/1080" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
        <Container className="relative z-10 pb-10">
          <span className="mb-3 inline-block w-fit rounded-full border border-blue-400/40 bg-blue-500/20 px-3 py-1 text-sm text-blue-200">
            Communauté numérique · Cameroun
          </span>
          <h1 className="font-display text-5xl font-bold text-white">Événements</h1>
          <p className="mt-2 max-w-xl italic text-white/70">
            Ateliers, meetups et conférences organisés par Nexora237.
          </p>
        </Container>
      </div>

      <Container className="flex flex-col gap-16">
        <SectionTitle eyebrow="À venir" title="Événements à venir" />
        <Suspense fallback={<EventsSkeleton />}>
         
          <UpcomingEvents />
        </Suspense>

        <div className="flex flex-col gap-6">
          <SectionTitle title="Événements passés" />
          <Suspense fallback={<EventsSkeleton />}>
           
            <PastEvents />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}