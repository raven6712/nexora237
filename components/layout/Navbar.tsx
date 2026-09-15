"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/#domaines", label: "Domaines" },
  { href: "/projets", label: "Projets" },
  { href: "/evenements", label: "Événements" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading } = useSupabaseUser();

  useEffect(() => {
    // Simple threshold check, not a per-pixel transform — cheap, no layout thrash.
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color] duration-300",
        scrolled
          ? "bg-background/95 border-border py-2"
          : "bg-transparent border-transparent py-4"
      )}
      
    >
      
      <Container className="flex items-center justify-between">
        <Link href="/" className="font-display text-lg font-semibold">
        
          Nexora<span className="text-primary">237</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-nexora group-hover:scale-x-100" />
            </Link>
          ))}
          
        </nav>

        <div className="hidden md:block">
          {!loading &&
            (user ? (
              <Link href="/profil">
                <Button size="sm" variant="secondary">
                  Mon profil
                </Button>
              </Link>
            ) : (
              <Link href="/connexion">
                <Button size="sm">Connexion</Button>
              </Link>
            ))}
        </div>

        <button
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="p-2 md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {mobileOpen && (
        <Container className="flex flex-col gap-4 border-t border-border py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!loading &&
            (user ? (
              <Link href="/profil" onClick={() => setMobileOpen(false)}>
                <Button variant="secondary" className="w-full">
                  Mon profil
                </Button>
              </Link>
            ) : (
              <Link href="/connexion" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">Connexion</Button>
              </Link>
            ))}
        </Container>
      )}
    </header>
  );
}
