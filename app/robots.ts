import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/profil"],
    },
    sitemap: "https://nexora237.com/sitemap.xml",
  };
}
