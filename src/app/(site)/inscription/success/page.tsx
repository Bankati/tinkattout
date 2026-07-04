import Link from "next/link";
import { CheckCircle2, Home, Phone } from "lucide-react";
import { Container } from "@/components/site/Container";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Demande reçue — École Tinka-Tout",
  description: "Votre pré-inscription a bien été enregistrée.",
};

export default function InscriptionSuccessPage() {
  return (
    <section className="py-20 sm:py-32 bg-white">
      <Container className="flex max-w-lg flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary/15 text-secondary">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <h1 className="mt-8 font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Demande bien reçue !
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-sm">
          Merci pour votre confiance. Notre équipe examinera votre demande de
          pré-inscription et vous recontactera sous <strong>48h ouvrées</strong> pour
          finaliser le dossier.
        </p>

        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4 text-primary shrink-0" />
          En cas d&apos;urgence : <a href={`tel:${siteConfig.contact.phone}`} className="text-primary font-semibold hover:underline">{siteConfig.contact.phone}</a>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-11 rounded-sm bg-primary px-7 text-sm font-bold uppercase tracking-widest text-white hover:bg-primary/85 transition-all hover:-translate-y-0.5 hover:shadow-lg group"
          >
            <Home className="h-4 w-4" /> Retour à l&apos;accueil
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-sm border border-border px-7 text-sm font-bold uppercase tracking-widest text-foreground hover:border-primary hover:text-primary transition-all"
          >
            Nous contacter
          </Link>
        </div>
      </Container>
    </section>
  );
}
