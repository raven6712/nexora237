"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import type { Profile } from "@/types/profile";

export function ProfileCard({ profile }: { profile: Profile }) {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ first_name: firstName, last_name: lastName })
      .eq("id", profile.id);

    setSaving(false);

    if (updateError) {
      setError("Impossible d'enregistrer les modifications.");
      return;
    }

    setEditing(false);
  }

  return (
    <div className="rounded-md border border-border bg-surface p-6">
      {editing ? (
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-muted" htmlFor="first_name">Prénom</label>
              <input
                id="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-sm border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-muted" htmlFor="last_name">Nom</label>
              <input
                id="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-sm border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
          {error && <p role="alert" className="text-sm text-danger">{error}</p>}
          <div className="flex gap-3">
            <Button type="submit" size="sm" disabled={saving}>
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(false)}>
              Annuler
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-xl font-semibold">
            {profile.first_name} {profile.last_name}
          </h2>
          <p className="text-sm text-muted">{profile.email}</p>
          <p className="text-sm text-muted">
            Membre depuis le{" "}
            {new Date(profile.created_at).toLocaleDateString("fr-FR")}
          </p>
          <Button
            size="sm"
            variant="secondary"
            className="mt-2 self-start"
            onClick={() => setEditing(true)}
          >
            Modifier mon profil
          </Button>
        </div>
      )}
    </div>
  );
}
