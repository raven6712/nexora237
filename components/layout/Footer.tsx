import Link from "next/link";
import { MapPin, Github, Instagram, Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";

const nav = [
  { href: "/a-propos", label: "À propos" },
  { href: "/projets", label: "Projets" },
  { href: "/evenements", label: "Événements" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-col gap-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <span className="font-display text-lg font-semibold">
              Nexora<span className="text-primary">237</span>
            </span>
            <p className="max-w-xs text-sm text-muted">
              Une communauté qui rassemble les talents numériques, les
              créateurs et les innovateurs camerounais.
            </p>
            <p className="flex items-center gap-2 text-sm text-muted">
              <MapPin size={16} /> Cameroun
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-foreground">
              Navigation
            </span>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-foreground">
              Réseaux sociaux
            </span>
            <div className="flex gap-4">
              <a aria-label="GitHub" href="#" className="text-muted hover:text-foreground">
                <Github size={20} />
              </a>
              <a aria-label="Instagram" href="#" className="text-muted hover:text-foreground">
                <Instagram size={20} />
              </a>
              <a aria-label="LinkedIn" href="#" className="text-muted hover:text-foreground">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Nexora237. Tous droits réservés.
        </p>
      </Container>
    </footer>
  );
}
