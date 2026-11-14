import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { isDatabaseConfigured, logServerError, prisma } from "@/lib/db";

// Pages publiques, de la plus importante à la moins importante.
const PAGES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/inscription", priority: 0.9, changeFrequency: "monthly" },
  { path: "/classes", priority: 0.8, changeFrequency: "yearly" },
  { path: "/presentation", priority: 0.8, changeFrequency: "yearly" },
  { path: "/actualites", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/legal", priority: 0.2, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

// Régénéré au plus une fois par heure (nouvelles actualités).
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    changeFrequency,
    priority,
  }));

  // Sans base, le plan du site contient seulement les pages fixes.
  if (!isDatabaseConfigured) return entries;
  try {
    const news = await prisma.news.findMany({
      where: { published: true },
      select: { slug: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    for (const n of news) {
      entries.push({ url: `${siteConfig.url}/actualites/${n.slug}`, lastModified: n.createdAt, changeFrequency: "yearly", priority: 0.5 });
    }
  } catch (error) {
    logServerError("sitemap", error);
  }
  return entries;
}
