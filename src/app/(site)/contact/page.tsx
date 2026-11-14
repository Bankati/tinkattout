import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight, Navigation } from "lucide-react";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { LettreCarte, Confetti } from "@/components/site/hero-dessins";
import { siteConfig, phoneHref, emailHref, directionsHref, mapEmbedSrc, mapLargeHref } from "@/config/site";
import { ContactForm } from "./ContactForm";
import { FadeIn } from "@/components/ui/motion";
import { boutonOr, boutonMarine, tailleBouton, surtitreOr } from "@/components/ui/palette";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact, horaires et plan d'accès",
  description:
    "Téléphone, horaires, adresse et plan d'accès de l'École Tinka-Tout, route de Kpotavé à Lomé. Écrivez-nous ou venez visiter l'école.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface-ciel">

      {/* ── Bandeau : la lettre et la carte (fond ciel quadrillé) ── */}
      <PageHero
        ton="ciel"
        surtitre="Nous joindre"
        titre="Prenons contact"
        description={<>Nous créons un environnement bienveillant où chaque enfant s&apos;épanouit. N&apos;hésitez pas à nous écrire ou à nous appeler — nous sommes là pour vous.</>}
        ariane="Contact"
        dessin={<LettreCarte />}
        confettis={<>
          <Confetti.Point className="right-[47%] top-[14%] bg-cycle-maternelle" />
          <Confetti.Etincelle className="right-[3%] top-[10%]" />
          <Confetti.Point className="right-[46%] top-[80%] h-2.5 w-2.5 bg-vie-ecole" />
        </>}
        vague="surface-ciel"
      />

      {/* ── Carte deux colonnes ───────────────────────── */}
      <section className="pb-20 sm:pb-24">
        <Container>
          {/* Carte affichée sans attendre le JavaScript (formulaire + coordonnées) */}
          <div className="animate-fade-up [animation-delay:80ms]">
            <div className="rounded-carte overflow-hidden shadow-2xl grid lg:grid-cols-5">

              {/* ── Colonne gauche — infos (fond navy) ── */}
              <div className="relative bg-primary px-6 py-10 sm:px-8 lg:col-span-2 flex flex-col overflow-hidden">

                {/* Cercles décoratifs */}
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-white/5" />
                <div aria-hidden="true" className="pointer-events-none absolute bottom-16 right-8 h-36 w-36 rounded-full bg-white/5" />

                <div className="relative z-10 flex flex-col flex-1">
                  <h2 className="font-heading text-xl font-bold text-white mb-2">
                    Informations de contact
                  </h2>
                  <p className="text-white/80 text-sm mb-10 leading-relaxed">
                    N&apos;hésitez pas à nous écrire ou à nous appeler directement.
                    Notre équipe se fera un plaisir de vous renseigner.
                  </p>

                  <ul className="space-y-7 flex-1">
                    {/* Téléphone */}
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-secondary">
                        <Phone style={{ height: "1.125rem", width: "1.125rem" }} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/75 mb-1">
                          Téléphone
                        </p>
                        <a
                          href={phoneHref}
                          className="inline-flex min-h-11 items-center text-sm text-white hover:text-secondary transition-colors font-medium"
                        >
                          {siteConfig.contact.phone}
                        </a>
                      </div>
                    </li>

                    {/* Email */}
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-secondary">
                        <Mail style={{ height: "1.125rem", width: "1.125rem" }} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/75 mb-1">
                          Email
                        </p>
                        <a
                          href={emailHref}
                          className="inline-flex min-h-11 items-center text-sm text-white hover:text-secondary transition-colors font-medium break-all"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </div>
                    </li>

                    {/* Adresse */}
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-secondary">
                        <MapPin style={{ height: "1.125rem", width: "1.125rem" }} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/75 mb-1">
                          Adresse
                        </p>
                        <p className="text-sm text-white font-medium leading-relaxed">
                          {siteConfig.contact.address}
                        </p>
                        <a
                          href={directionsHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-secondary hover:text-white transition-colors"
                        >
                          <Navigation className="h-4 w-4" aria-hidden="true" />
                          Itinéraire
                          <span className="sr-only"> (s&apos;ouvre dans Google Maps)</span>
                        </a>
                      </div>
                    </li>

                    {/* Horaires */}
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-secondary">
                        <Clock style={{ height: "1.125rem", width: "1.125rem" }} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/75 mb-1">
                          Horaires
                        </p>
                        <ul className="space-y-1">
                          {siteConfig.contact.hours.map((h) => (
                            <li key={h.label} className="text-sm text-white font-medium">
                              <span className="text-white/75">{h.label} : </span>
                              {h.value}
                            </li>
                          ))}
                          <li className="text-sm text-white/75">Dimanche : Fermé</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ── Colonne droite — formulaire (fond blanc) ── */}
              <div className="bg-white px-6 py-10 sm:px-8 lg:col-span-3 lg:px-12">
                <h2 className="font-heading text-xl font-bold text-foreground mb-1">
                  Envoyez-nous un message
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Remplissez le formulaire et nous vous répondrons dans les plus brefs délais.
                </p>
                <ContactForm />
              </div>

            </div>
          </div>
        </Container>
      </section>

      {/* ── Plan d'accès ──────────────────────────────── */}
      <section className="pb-20 sm:pb-24" aria-labelledby="plan-acces">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <p className={`${surtitreOr} mb-3`}>Plan d&apos;accès</p>
              <h2 id="plan-acces" className="font-heading text-2xl font-bold text-foreground">
                Venir à l&apos;école
              </h2>
            </div>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${boutonMarine} ${tailleBouton.md}`}
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Itinéraire
              <span className="sr-only"> (s&apos;ouvre dans Google Maps)</span>
            </a>
          </div>
          <div className="overflow-hidden rounded-carte shadow-xl bg-white">
            <iframe
              title={`Carte : emplacement de ${siteConfig.name}`}
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-80 w-full border-0 sm:h-96"
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            <a href={mapLargeHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline hover:text-primary">
              Agrandir la carte
            </a>{" "}
            · © les contributeurs d&apos;OpenStreetMap
          </p>
        </Container>
      </section>

      {/* ── CTA Inscription ───────────────────────────── */}
      <section className="py-14 bg-white border-t border-border">
        <Container className="text-center">
          <FadeIn>
            <p className="text-muted-foreground text-sm mb-4">
              Vous souhaitez inscrire votre enfant ?
            </p>
            <Link
              href="/inscription"
              className={`${boutonOr} ${tailleBouton.md} group`}
            >
              Déposer une pré-inscription
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </FadeIn>
        </Container>
      </section>

    </div>
  );
}
