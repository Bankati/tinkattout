import type { Metadata } from "next";
import { Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MotionProvider } from "@/components/ui/motion-provider";
import { siteConfig } from "@/config/site";

// Configuration de la police pour le corps du texte (Body)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Configuration de la police pour les titres (Headings)
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

const defaultTitle = "École Tinka-Tout — École maternelle et primaire à Lomé";
const defaultDescription =
  "École maternelle et primaire à Lomé (Togo), de la Petite Section au CM2 : petits effectifs, 100 % de réussite au CEP, " +
  "activités périscolaires. Pré-inscriptions ouvertes.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: defaultTitle, template: `%s — ${siteConfig.name}` },
  description: defaultDescription,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_TG",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    images: [{ url: siteConfig.images.hero, width: 2000, height: 1121, alt: "Élèves de l'École Tinka-Tout à Lomé" }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [siteConfig.images.hero],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn(poppins.variable, quicksand.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground">
        {/* Sans JavaScript, les blocs animés au défilement restent visibles. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: "<style>[data-reveal]{opacity:1!important;transform:none!important}</style>",
          }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
