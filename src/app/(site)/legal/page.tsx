/**
 * PRD 5.9 — Mentions légales (conformité).
 */
import { Container } from "@/components/site/Container";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Mentions légales — École Tinka-Tout",
  description: "Mentions légales du site.",
};

export default function LegalPage() {
  return (
    <section className="py-12 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-serif text-4xl font-bold tracking-tight">
          Mentions légales
        </h1>
        <div className="mt-8 space-y-6 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Éditeur du site :</strong> {siteConfig.name}.
            Adresse : {siteConfig.contact.address}.
          </p>
          <p>
            <strong className="text-foreground">Contact :</strong> {siteConfig.contact.email} — {siteConfig.contact.phone}.
          </p>
          <p>
            <strong className="text-foreground">Hébergement :</strong> à compléter (nom et adresse de l&apos;hébergeur).
          </p>
          <p>
            Le site {siteConfig.name} est proposé en l&apos;état. L&apos;éditeur s&apos;efforce d&apos;en assurer la disponibilité et l&apos;exactitude des informations, sans garantie d&apos;exhaustivité.
          </p>
          <p>
            La reproduction ou l&apos;utilisation des contenus (textes, images) sans autorisation écrite est interdite.
          </p>
        </div>
      </Container>
    </section>
  );
}
