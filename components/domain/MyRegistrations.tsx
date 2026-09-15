"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { NexoraEvent } from "@/types/event";

interface RegistrationWithEvent {
  id: string;
  status: string;
  events: NexoraEvent;
}

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "empty" }
  | { status: "loaded"; registrations: RegistrationWithEvent[] };

export function MyRegistrations({ userId }: { userId: string }) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("event_registrations")
      .select("id, status, events(*)")
      .eq("user_id", userId)
      .then(({ data, error }) => {
        if (error) {
          setState({ status: "error" });
          return;
        }
        if (!data || data.length === 0) {
          setState({ status: "empty" });
          return;
        }
        setState({
          status: "loaded",
          registrations: data as unknown as RegistrationWithEvent[],
        });
      });
  }, [userId]);

  if (state.status === "loading") {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-md bg-surface" />
        ))}
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <p className="text-sm text-danger">
        Impossible de charger vos inscriptions. Réessayez plus tard.
      </p>
    );
  }

  if (state.status === "empty") {
    return (
      <p className="text-sm text-muted">
        Vous n'êtes inscrit à aucun événement pour le moment.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {state.registrations.map((reg) => (
        <li
          key={reg.id}
          className="flex items-center justify-between rounded-md border border-border bg-surface p-4"
        >
          <div>
            <Link
              href={`/evenements/${reg.events.slug}`}
              className="font-medium hover:text-primary"
            >
              {reg.events.title}
            </Link>
            <p className="text-sm text-muted">
              {new Date(reg.events.date).toLocaleDateString("fr-FR")} —{" "}
              {reg.events.location}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
