import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const shareImage = { url: siteConfig.images.hero, width: 2000, height: 1121, alt: "Élèves de l'École Tinka-Tout à Lomé" };

/**
 * Métadonnées d'une page : titre (complété par « — École Tinka-Tout »), description,
 * adresse canonique et aperçu de partage (WhatsApp, Facebook…).
 * Next remplace l'objet openGraph du layout au lieu de le fusionner : on le redonne en entier ici.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const fullTitle = `${title} — ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_TG",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [shareImage.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
