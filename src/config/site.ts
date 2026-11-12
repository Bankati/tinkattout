/** Réseaux sociaux : laisser vide tant que l'école n'a pas fourni de vraies adresses (aucun lien mort). */
export type SocialLink = {
  network: "facebook" | "x" | "instagram" | "youtube";
  label: string;
  href: string;
};

const socialLinks: SocialLink[] = [];

export const siteConfig = {
  name: "École Tinka-Tout",
  tagline: "Excellence & Épanouissement pour vos enfants",
  description:
    "Une pédagogie bienveillante, un cadre sécurisé et un accompagnement personnalisé de la Maternelle au CM2 à Lomé.",
  /** Année scolaire des inscriptions ouvertes — À CONFIRMER par la direction de l'école. */
  schoolYear: "2026-2027",
  /** Année de création de l'école. */
  foundedYear: 2020,
  contact: {
    phone: "+228 90 09 30 95",
    email: "contact@ecole-tinkatout.tg",
    address: "Von de la route de Kpotavé, à côté du bar « Carrefour des Grands », Lomé – Togo",
    /** Version courte pour la barre du haut. */
    addressShort: "Route de Kpotavé, Lomé",
    /** Position GPS de l'école (fournie par la direction). */
    location: { lat: 6.317394, lng: 1.219165 },
    hours: [
      { label: "Lundi – Vendredi", value: "07h00 – 18h00" },
      { label: "Samedi",           value: "07h30 – 12h00" },
    ],
  },
  social: socialLinks,
  nav: [
    { href: "/",             label: "Accueil"        },
    { href: "/presentation", label: "Présentation"   },
    { href: "/classes",      label: "Classes"        },
    { href: "/actualites",   label: "Vie de l'école" },
    { href: "/contact",      label: "Contact"        },
  ],
  images: {
    hero:     "/images/hero-section-accueil.jpg",
    feature1: "/images/pexels-yankrukov-8612967.jpg",
    feature2: "/images/pexels-yankrukov-8613085.jpg",
    feature3: "/images/pexels-yankrukov-8613119.jpg",
    campus:   "/images/pexels-yankrukov-8617808.jpg",
    gallery: [
      "/images/pexels-yankrukov-8613319.jpg",
      "/images/pexels-yankrukov-8612967.jpg",
      "/images/pexels-yankrukov-8613085.jpg",
      "/images/pexels-yankrukov-8613119.jpg",
      "/images/pexels-yankrukov-8617808.jpg",
      "/images/pexels-rdne-8363154.jpg",
    ],
  },
} as const;

/** Liens cliquables : le numéro sans espaces pour `tel:`. */
export const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`;
export const emailHref = `mailto:${siteConfig.contact.email}`;

/** Nombre d'années depuis la création (calculé, pour ne jamais devenir faux). */
export const yearsOpen = new Date().getFullYear() - siteConfig.foundedYear;

/** Itinéraire (ouvre l'application Google Maps sur téléphone) et carte intégrée OpenStreetMap (sans clé ni cookie publicitaire). */
const { lat, lng } = siteConfig.contact.location;
export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
export const mapEmbedSrc =
  `https://www.openstreetmap.org/export/embed.html?bbox=${[lng - 0.006, lat - 0.004, lng + 0.006, lat + 0.004].map((n) => n.toFixed(6)).join(",")}` +
  `&layer=mapnik&marker=${lat},${lng}`;
export const mapLargeHref = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`;
