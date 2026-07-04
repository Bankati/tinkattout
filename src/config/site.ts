export const siteConfig = {
  name: "École Tinka-Tout",
  tagline: "Excellence & Épanouissement pour vos enfants",
  description:
    "Une pédagogie bienveillante, un cadre sécurisé et un accompagnement personnalisé de la Maternelle au CM2 à Lomé.",
  contact: {
    phone: "+228 90 00 00 00",
    email: "contact@ecole-tinkatout.tg",
    address: "Quartier Bè, Avenue de la Paix, Lomé – Togo",
    hours: [
      { label: "Lundi – Vendredi", value: "07h30 – 16h30" },
      { label: "Samedi",           value: "08h00 – 12h00" },
    ],
  },
  nav: [
    { href: "/presentation", label: "Accueil"        },
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
