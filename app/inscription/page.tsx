export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { AuthForm } from "@/components/domain/AuthForm";

export const metadata: Metadata = {
  title: "Inscription — Nexora237",
};

export default function InscriptionPage() {
  return (
    <main className="flex min-h-[80vh] items-center py-16">
      <Container className="mx-auto flex max-w-md flex-col gap-6">
        <h1 className="font-display text-2xl font-semibold">Créer un compte</h1>
        <Suspense fallback={<div className="text-center text-sm text-muted">Changement...</div>}></Suspense>
        <AuthForm mode="inscription" />
        <p className="text-sm text-muted">
          Déjà membre ?{" "}
          <Link href="/connexion" className="text-primary">
            Se connecter
          </Link>
        </p>
      </Container>
    </main>
  );
}
