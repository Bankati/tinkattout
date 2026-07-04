import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/site/Container";
import { siteConfig } from "@/config/site";
import { ContactForm } from "./ContactForm";
import { FadeIn } from "@/components/ui/motion";

export const metadata = {
  title: "Contact — École Tinka-Tout",
  description: "Coordonnées, horaires et formulaire de contact de l'École Tinka-Tout à Lomé.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#eaf5f4]">

      {/* ── Titre centré ──────────────────────────────── */}
      <section className="pt-16 pb-12 sm:pt-20 sm:pb-14 text-center">
        <FadeIn>
          <p className="text-xs font-bold uppercase tracking-widest text-primary/50 mb-3">
            Nous joindre
          </p>
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Prenons contact
          </h1>
          <p className="mt-4 max-w-lg mx-auto text-muted-foreground text-base leading-relaxed">
            Nous créons un environnement bienveillant où chaque enfant s&apos;épanouit.
            N&apos;hésitez pas à nous écrire ou à nous appeler — nous sommes là pour vous.
          </p>
        </FadeIn>
      </section>

      {/* ── Carte deux colonnes ───────────────────────── */}
      <section className="pb-20 sm:pb-24">
        <Container>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl overflow-hidden shadow-2xl grid lg:grid-cols-5">

              {/* ── Colonne gauche — infos (fond navy) ── */}
              <div className="relative bg-primary px-8 py-10 lg:col-span-2 flex flex-col overflow-hidden">

                {/* Cercles décoratifs */}
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-white/5" />
                <div className="pointer-events-none absolute bottom-16 right-8 h-36 w-36 rounded-full bg-white/5" />

                <div className="relative z-10 flex flex-col flex-1">
                  <h2 className="font-heading text-xl font-bold text-white mb-2">
                    Informations de contact
                  </h2>
                  <p className="text-white/55 text-sm mb-10 leading-relaxed">
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
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">
                          Téléphone
                        </p>
                        <a
                          href={`tel:${siteConfig.contact.phone}`}
                          className="text-sm text-white hover:text-secondary transition-colors font-medium"
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
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">
                          Email
                        </p>
                        <a
                          href={`mailto:${siteConfig.contact.email}`}
                          className="text-sm text-white hover:text-secondary transition-colors font-medium break-all"
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
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">
                          Adresse
                        </p>
                        <p className="text-sm text-white font-medium leading-relaxed">
                          {siteConfig.contact.address}
                        </p>
                      </div>
                    </li>

                    {/* Horaires */}
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-secondary">
                        <Clock style={{ height: "1.125rem", width: "1.125rem" }} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">
                          Horaires
                        </p>
                        <ul className="space-y-1">
                          {siteConfig.contact.hours.map((h) => (
                            <li key={h.label} className="text-sm text-white font-medium">
                              <span className="text-white/55">{h.label} : </span>
                              {h.value}
                            </li>
                          ))}
                          <li className="text-sm text-white/40">Dimanche : Fermé</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ── Colonne droite — formulaire (fond blanc) ── */}
              <div className="bg-white px-8 py-10 lg:col-span-3 lg:px-12">
                <h2 className="font-heading text-xl font-bold text-foreground mb-1">
                  Envoyez-nous un message
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Remplissez le formulaire et nous vous répondrons dans les plus brefs délais.
                </p>
                <ContactForm />
              </div>

            </div>
          </FadeIn>
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
              className="inline-flex items-center gap-2 h-12 rounded-sm bg-primary px-8 text-sm font-bold uppercase tracking-widest text-white hover:bg-primary/85 transition-all hover:-translate-y-0.5 hover:shadow-lg group"
            >
              Déposer une pré-inscription
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </Container>
      </section>

    </div>
  );
}
