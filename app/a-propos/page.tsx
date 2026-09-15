import type { Metadata } from "next";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "À propos — Nexora237",
  description: "Qui est Nexora237 : mission, vision et valeurs de la communauté.",
};

export default function AProposPage() {
  return (
    <main>
      <About variant="full" />
    </main>
  );
}
