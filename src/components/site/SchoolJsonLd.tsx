import { siteConfig } from "@/config/site";

/**
 * Fiche d'identité de l'école pour Google (schema.org, type School) :
 * nom, adresse, position, téléphone et horaires, repris de siteConfig.
 */
export function SchoolJsonLd() {
  const { contact } = siteConfig;
  const data = {
    "@context": "https://schema.org",
    "@type": "School",
    "@id": `${siteConfig.url}/#ecole`,
    name: siteConfig.name,
    alternateName: "Tinka-Tout",
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/apple-icon.png`,
    image: `${siteConfig.url}${siteConfig.images.hero}`,
    telephone: contact.phone.replace(/\s+/g, ""),
    email: contact.email,
    foundingDate: String(siteConfig.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.replace(/, Lomé – Togo$/, ""),
      addressLocality: "Lomé",
      addressCountry: "TG",
    },
    geo: { "@type": "GeoCoordinates", latitude: contact.location.lat, longitude: contact.location.lng },
    hasMap: `https://www.google.com/maps?q=${contact.location.lat},${contact.location.lng}`,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "07:30", closes: "12:00" },
    ],
    areaServed: { "@type": "City", name: "Lomé" },
    sameAs: siteConfig.social.map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      // « < » échappé : le contenu ne peut pas fermer la balise script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
