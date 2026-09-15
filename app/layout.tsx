import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const siteUrl = "https://nexora237.com"; // à remplacer par le domaine réel

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nexora237 — Connecter. Apprendre. Créer. Innover.",
    template: "%s",
  },
  description:
    "Une communauté qui rassemble les talents numériques, les créateurs et les innovateurs pour apprendre, collaborer et construire les solutions de demain.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Nexora237",
    title: "Nexora237 — Connecter. Apprendre. Créer. Innover.",
    description:
      "Une communauté qui rassemble les talents numériques, les créateurs et les innovateurs camerounais.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
