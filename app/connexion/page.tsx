import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { AuthForm } from "@/components/domain/AuthForm";

export const metadata: Metadata = {
  title: "Connexion — Nexora237",
};

export default function ConnexionPage() {
  return (
    <main className="flex min-h-[80vh] items-center py-16">
      <Container className="mx-auto flex max-w-md flex-col gap-6">
        <h1 className="font-display text-2xl font-semibold">Connexion</h1>
        <Suspense fallback={<div className="text-center text-sm text-muted">Changement...</div>}></Suspense>
        <AuthForm mode="connexion" />
        <p className="text-sm text-muted">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="text-primary">
            Créer un compte
          </Link>
        </p>
      </Container>
    </main>
  );
}
