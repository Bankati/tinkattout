import Link from "next/link";
import { CheckCircle2, Home, Phone } from "lucide-react";
import { Container } from "@/components/site/Container";
import { siteConfig, phoneHref } from "@/config/site";
import { boutonMarine, boutonContour, tailleBouton } from "@/components/ui/palette";

export const metadata = {
  title: "Demande reçue — École Tinka-Tout",
  description: "Votre pré-inscription a bien été enregistrée.",
};

export default function InscriptionSuccessPage() {
  return (
    <section className="py-20 sm:py-32 bg-white">
      <Container className="flex max-w-lg flex-col items-center text-center">
        {/* Succès : vert feuille doux, coche en vert foncé (accent) */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cycle-periscolaire-soft text-accent">
          <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
        </div>

        <h1 className="mt-8 font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Demande bien reçue !
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-sm">
          Merci pour votre confiance. Notre équipe examinera votre demande de
          pré-inscription et vous recontactera sous <strong>48h ouvrées</strong> pour
          finaliser le dossier.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
          En cas d&apos;urgence : <a href={phoneHref} className="inline-flex min-h-11 items-center text-primary font-semibold hover:underline">{siteConfig.contact.phone}</a>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className={`${boutonMarine} ${tailleBouton.md}`}
          >
            <Home className="h-4 w-4" aria-hidden="true" /> Retour à l&apos;accueil
          </Link>
          <Link
            href="/contact"
            className={`${boutonContour} ${tailleBouton.md}`}
          >
            Nous contacter
          </Link>
        </div>
      </Container>
    </section>
  );
}
