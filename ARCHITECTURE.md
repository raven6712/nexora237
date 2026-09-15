# Nexora237 — Document unique du projet

Ce document regroupe toutes les phases développées (1 à 12) : choix
techniques, structure, et ce qu'il reste à faire avant mise en production.

---

## 1. Stack et architecture (Phase 1)

Next.js 14 (App Router) + TypeScript + Tailwind + Supabase, organisé en :

```
app/            pages (App Router)
components/
  ui/           primitives (Button, Container, Badge, SectionTitle...)
  layout/       Navbar, Footer
  sections/     sections de la homepage (Hero, About, Domains, Ecosystem, Stats)
  domain/       composants liés aux données (EventCard, ProjectCard, AuthForm...)
  providers/    SmoothScrollProvider (Lenis + GSAP)
hooks/          useReducedMotion, useSupabaseUser
lib/            supabase/client.ts, supabase/server.ts, utils.ts, data/projects.ts
services/       events.ts, registrations.ts (accès Supabase)
types/          event.ts, profile.ts, project.ts
animations/     hero.ts, reveal.ts, counters.ts, lenis.ts
supabase/       schéma SQL (01_events, 02_profiles, 03_event_registrations)
```

Deux clients Supabase séparés (navigateur / serveur) : le client serveur lit
la session depuis les cookies pour que les requêtes RLS soient correctement
scopées ; le client navigateur n'est utilisé que dans les Client Components
(formulaires, inscription à un événement).

## 2. Design system (Phase 2)

- Palette réduite : neutres + **un seul accent** (violet `#6d5efc`) + 3
  couleurs sémantiques (succès/avertissement/danger) réservées aux statuts.
- Typographie fluide en `clamp()` — une seule famille de police (Inter).
- Composants de base : `Button` (transform+opacity uniquement, cible tactile
  44px minimum), `Container`, `SectionTitle` (Server Component non-animé),
  `Badge`.

## 3. Navbar + Footer (Phase 3)

Navbar sticky avec un simple seuil de scroll (`scrollY > 24`) qui change
`background-color`/`border-color` — pas de recalcul de hauteur ni de blur
coûteux. Menu mobile en dur (pas de librairie externe). Affiche
Connexion/Mon profil selon `useSupabaseUser`.

## 4-5. Homepage + animations (Phases 4-5)

- **Hero** : timeline GSAP jouée une seule fois au montage (NEXORA237 →
  talents → idées → projets → innovation), puis reste statique. Fond sur
  `prefers-reduced-motion` : tout apparaît directement, sans timeline.
- **Lenis** : instancié uniquement si l'utilisateur n'a pas demandé de
  réduire les animations ; synchronisé avec `ScrollTrigger` via
  `SmoothScrollProvider`.
- **`revealOnScroll`** (animations/reveal.ts) : révélation générique
  transform+opacity, `once: true` — ne se relance jamais.
- **Stats** : `AnimatedCounter` compte une seule fois à l'entrée dans le
  viewport (section 13).
- **Ecosystem** : diagramme en SVG pur (pas de WebGL/canvas), les lignes se
  dessinent une fois via `stroke-dashoffset` puis restent figées.

## 6. Projets (Phase 6)

Données statiques dans `lib/data/projects.ts`, avec la même forme qu'une
future table Supabase `projects` — un service `services/projects.ts`
pourra remplacer la source sans toucher aux composants. `ProjectCard` charge
les images en lazy loading et n'anime que `transform`.

## 7. Événements + Supabase (Phase 7)

Table `events` (SQL dans `supabase/01_events.sql`), RLS : lecture publique,
écriture réservée au rôle `service_role` (pour un futur dashboard admin).
`services/events.ts` ne sélectionne que les colonnes nécessaires et pagine
les événements passés (`limit(12)`). Page détail `/evenements/[slug]`
génère les métadonnées OG et les données structurées `schema.org/Event`.

## 8. Authentification (Phase 8)

`AuthForm` partagé entre `/connexion` et `/inscription`. À l'inscription,
`first_name`/`last_name` passent en métadonnées Supabase Auth, récupérées
par un trigger SQL (`handle_new_user`, dans `02_profiles.sql`) qui crée
automatiquement la ligne `profiles`. `middleware.ts` rafraîchit la session
à chaque requête.

## 9-10. Profil et inscriptions aux événements (Phases 9-10)

- `/profil` (Server Component) redirige vers `/connexion` si non
  authentifié, affiche `ProfileCard` (modification prénom/nom) et
  `MyRegistrations` (états chargement/vide/erreur, section 25/38).
- `RegistrationModal` couvre les 3 cas du brief : non connecté (section 21,
  avec redirection automatique post-connexion vers l'événement visé),
  formulaire préremplis (section 22), confirmation (section 24).
- Table `event_registrations` avec `UNIQUE(event_id, user_id)` (section 23)
  empêchant les doublons.

## 11. RLS et sécurité (Phase 11)

Voir les 3 fichiers SQL dans `supabase/`. Résumé des politiques :

| Table | Lecture | Écriture |
|---|---|---|
| `events` | publique | service_role uniquement |
| `profiles` | uniquement sa propre ligne | uniquement sa propre ligne |
| `event_registrations` | uniquement ses propres inscriptions | insert/delete uniquement pour soi-même |

Aucune clé service_role n'est exposée côté client (`.env.example`
documente la séparation). Le formulaire de contact reste frontend-only
comme demandé (section 26) — aucune donnée sensible n'y transite encore.

## 12. Performance, accessibilité, SEO (Phase 12)

- Images via `next/image` (AVIF/WebP, lazy loading hors du premier écran).
- `optimizePackageImports` pour GSAP/Lucide dans `next.config.mjs`.
- La majorité des pages sont des Server Components ; seuls les éléments
  interactifs (formulaires, Navbar, sections animées) sont des Client
  Components.
- `prefers-reduced-motion` respecté à 3 niveaux : CSS global, chaque
  fonction dans `animations/`, et Lenis désactivé entièrement.
- `app/sitemap.ts` (statique + événements dynamiques) et `app/robots.ts`.
- Cibles tactiles ≥44px, `focus-visible` explicite, `alt` sur chaque image,
  `aria-label` sur les icônes seules.

---

## Ce qu'il reste à faire avant mise en ligne

1. **Installer et tester réellement** (pas possible dans cet environnement
   sans accès réseau) :
   ```bash
   npm install
   cp .env.example .env.local   # renseigner les clés Supabase
   npm run dev
   ```
2. **Exécuter les 3 fichiers SQL** dans l'éditeur SQL Supabase, dans l'ordre
   (`01_events.sql`, `02_profiles.sql`, `03_event_registrations.sql`).
3. **Remplacer les images placeholder** (`/images/projects/...`) par de
   vrais fichiers optimisés.
4. **Brancher le formulaire de contact** à un vrai service d'envoi d'email
   (Resend, Supabase Edge Function...) — le point d'intégration est déjà
   isolé dans `ContactForm.tsx`.
5. **Remplacer `nexora237.com`** par le vrai domaine dans `layout.tsx`,
   `sitemap.ts` et `robots.ts`.
6. **Phase 13 (tests finaux)** : Lighthouse, test clavier complet, test sur
   les largeurs listées en section 7 du brief (360 à 1920px), vérification
   `prefers-reduced-motion` activé.

## Architecture évolutive (section 42)

Les dossiers `services/` et `types/` sont volontairement génériques pour
accueillir plus tard : dashboard admin, gestion des événements/projets côté
CMS, boîte de réception, newsletter, notifications — sans refonte de
l'existant.
