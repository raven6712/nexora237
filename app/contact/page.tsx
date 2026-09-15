import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/domain/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Nexora237",
  description: "Contactez la communauté Nexora237.",
};

export default function ContactPage() {
  return (
    <main className="py-16">
      <Container className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SectionTitle
            eyebrow="Contact"
            title="Parlons de votre projet"
            description="Une question, une envie de collaborer ou de rejoindre la communauté ? Écrivez-nous."
          />

          <div className="relative h-48 overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="https://picsum.photos/id/1062/900/500"
              alt="Membres de la communauté Nexora237 en atelier"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>

          <div className="flex flex-col gap-3 text-sm italic text-muted">
            <span className="flex items-center gap-2">
              <Mail size={16} className="text-blue-400" /> contact@nexora237.com
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-400" /> Cameroun
            </span>
          </div>
        </div>

        <ContactForm />
      </Container>
    </main>
  );
}