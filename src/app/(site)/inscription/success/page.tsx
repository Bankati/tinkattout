import Link from "next/link";
import { CheckCircle2, Home, Phone } from "lucide-react";
import { Container } from "@/components/site/Container";
import { Confetti } from "@/components/site/hero-dessins";
import { siteConfig, phoneHref } from "@/config/site";
import { boutonMarine, boutonContour, tailleBouton } from "@/components/ui/palette";

export const metadata = {
  title: "Demande reçue — École Tinka-Tout",
  description: "Votre pré-inscription a bien été enregistrée.",
};

export default function InscriptionSuccessPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cycle-periscolaire-soft to-white py-20 sm:py-32">
      {/* Confettis de fête autour de la coche (décor immobile, à partir de 640 px, jamais sous le texte) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden h-[420px] max-w-3xl sm:block">
        <Confetti.Point className="left-[22%] top-[16%] bg-cycle-maternelle" />
        <Confetti.Anneau className="right-[22%] top-[12%] border-cycle-primaire" />
        <Confetti.Triangle className="left-[14%] top-[40%] bg-cycle-periscolaire" />
        <Confetti.Etincelle className="right-[14%] top-[38%]" />
        <Confetti.Point className="right-[30%] top-[26%] h-2.5 w-2.5 bg-vie-ecole" />
        <Confetti.Point className="left-[30%] top-[28%] h-2.5 w-2.5 bg-secondary" />
        <Confetti.Triangle className="right-[8%] top-[66%] -rotate-[20deg] bg-cycle-maternelle" />
        <Confetti.Point className="left-[8%] top-[68%] h-3 w-3 bg-cycle-primaire" />
      </div>
      <Container className="relative flex max-w-lg flex-col items-center text-center">
        {/* Succès : coche vert foncé (accent) sur blanc, halo feuille */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-accent shadow-[0_0_0_10px_hsl(var(--cycle-periscolaire)/0.18)]">
          <CheckCircle2 className="h-12 w-12" aria-hidden="true" />
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
