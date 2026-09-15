"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { createClient } from "@/lib/supabase/client";
import { registerForEvent } from "@/services/registrations";
import { Button } from "@/components/ui/Button";
import type { NexoraEvent } from "@/types/event";
import type { Profile } from "@/types/profile";

type Step = "form" | "submitting" | "success" | "error";

export function RegistrationModal({ event }: { event: NexoraEvent }) {
  const { user, loading } = useSupabaseUser();
  const [step, setStep] = useState<Step>("form");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch the profile once we know the user, to prefill name/surname (section 22).
  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from("profiles")
      .select("id, first_name, last_name, email, created_at, updated_at")
      .eq("id", user.id)
      .single()
      .then(({ data }) => setProfile(data));
  }, [user]);

  if (loading) return null;

  // Section 21: utilisateur non connecté.
  if (!user) {
    return (
      <div id="inscription" className="rounded-md border border-border bg-surface p-6">
        <p className="mb-4 text-base text-foreground">
          Vous devez vous connecter ou créer un compte pour vous inscrire à
          cet événement.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={`/inscription?redirect=/evenements/${event.slug}`}>
            <Button>Créer un compte</Button>
          </Link>
          <Link href={`/connexion?redirect=/evenements/${event.slug}`}>
            <Button variant="secondary">Se connecter</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div id="inscription" className="rounded-md border border-success/30 bg-success/10 p-6">
        <h3 className="mb-2 font-display text-lg font-semibold">
          🎉 Inscription confirmée !
        </h3>
        <p className="mb-4 text-sm text-muted">
          Vous êtes maintenant inscrit à cet événement.
        </p>
        <div className="mb-4 flex flex-col gap-1 text-sm">
          <span>{event.title}</span>
          <span>{new Date(event.date).toLocaleDateString("fr-FR")}</span>
          {event.start_time && <span>{event.start_time}</span>}
          <span>{event.location}</span>
        </div>
        <Link href="/profil">
          <Button size="sm">Voir mes inscriptions</Button>
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("submitting");
    setErrorMessage("");

    try {
      await registerForEvent({ eventId: event.id, userId: user!.id, phone });
      setStep("success");
    } catch (err) {
      setStep("error");
      setErrorMessage(
        err instanceof Error && err.message.includes("duplicate")
          ? "Vous êtes déjà inscrit à cet événement."
          : "Une erreur est survenue. Merci de réessayer."
      );
    }
  }

  return (
    <form
      id="inscription"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-md border border-border bg-surface p-6"
    >
      <h3 className="font-display text-lg font-semibold">
        S'inscrire à {event.title}
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted" htmlFor="first_name">Prénom</label>
          <input
            id="first_name"
            className="rounded-sm border border-border bg-background px-3 py-2 text-sm"
            defaultValue={profile?.first_name ?? ""}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted" htmlFor="last_name">Nom</label>
          <input
            id="last_name"
            className="rounded-sm border border-border bg-background px-3 py-2 text-sm"
            defaultValue={profile?.last_name ?? ""}
            readOnly
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted" htmlFor="phone">
          Téléphone (facultatif)
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="rounded-sm border border-border bg-background px-3 py-2 text-sm"
        />
      </div>

      {step === "error" && (
        <p role="alert" className="text-sm text-danger">
          {errorMessage}
        </p>
      )}

      <Button type="submit" disabled={step === "submitting"}>
        {step === "submitting" ? "Envoi..." : "Confirmer mon inscription"}
      </Button>
    </form>
  );
}
