import type { MetadataRoute } from "next";
import { getUpcomingEvents, getPastEvents } from "@/services/events";

const siteUrl = "https://nexora237.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/a-propos",
    "/projets",
    "/evenements",
    "/contact",
    "/connexion",
    "/inscription",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const [upcoming, past] = await Promise.all([
    getUpcomingEvents().catch(() => []),
    getPastEvents().catch(() => []),
  ]);

  const eventRoutes = [...upcoming, ...past].map((event) => ({
    url: `${siteUrl}/evenements/${event.slug}`,
    lastModified: new Date(event.updated_at),
  }));

  return [...staticRoutes, ...eventRoutes];
}
