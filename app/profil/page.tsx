import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProfileCard } from "@/components/domain/ProfileCard";
import { MyRegistrations } from "@/components/domain/MyRegistrations";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Mon profil — Nexora237",
};

export default async function ProfilPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/connexion?redirect=/profil");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, email, created_at, updated_at")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/connexion?redirect=/profil");

  return (
    <main className="py-16">
      <Container className="flex max-w-2xl flex-col gap-10">
        <SectionTitle eyebrow="Mon compte" title="Mon profil" />
        <ProfileCard profile={profile} />

        <div className="flex flex-col gap-4">
          <SectionTitle title="Mes événements" />
          <MyRegistrations userId={user.id} />
        </div>
      </Container>
    </main>
  );
}
