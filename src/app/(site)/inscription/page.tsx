import Link from "next/link";
import { CheckCircle2, Clock, Shield, Phone } from "lucide-react";
import { Container } from "@/components/site/Container";
import { siteConfig } from "@/config/site";
import { InscriptionForm } from "./InscriptionForm";
import { surtitreOr } from "@/components/ui/palette";

export const metadata = {
  title: "Pré-inscription — École Tinka-Tout",
  description: "Pré-inscription en ligne en 3 minutes. L'École Tinka-Tout vous recontacte sous 48h.",
};

export default function InscriptionPage() {
  return (
    <>
      {/* ── En-tête ───────────────────────────────────── */}
      <section className="relative bg-primary py-16 sm:py-20 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 h-80 w-80 rounded-full border-[50px] border-white translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
        <Container className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Inscriptions {siteConfig.schoolYear}</p>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Pré-inscription
          </h1>
          <p className="mt-4 max-w-2xl text-white/85 text-lg">
            Formulaire simple · Confirmation à l&apos;écran · Réponse sous 48h · Données protégées
          </p>
          <nav aria-label="Fil d'Ariane" className="mt-5 text-xs text-white/80">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="inline-flex min-h-11 items-center hover:text-white transition-colors">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-secondary">Pré-inscription</li>
            </ol>
          </nav>
        </Container>
      </section>

      {/* ── Contenu ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">

            {/* Colonne info (visible sans attendre le JavaScript) */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <p className={`${surtitreOr} mb-3`}>Comment ça marche</p>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  3 étapes simples
                </h2>
              </div>

              <ol className="space-y-5">
                {[
                  { step: "01", title: "Remplissez le formulaire", desc: "Informations sur l'élève et le parent ou tuteur légal." },
                  { step: "02", title: "Confirmation à l'écran", desc: "Un message confirme l'enregistrement de votre demande dès l'envoi." },
                  { step: "03", title: "Nous vous rappelons", desc: "Notre équipe vous contacte sous 48h pour finaliser le dossier." },
                ].map(({ step, title, desc }) => (
                  <li key={step} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white font-heading font-bold text-sm">
                      {step}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Avantages */}
              <div className="rounded-carte border border-border bg-muted p-6 space-y-3">
                <h3 className="font-heading text-sm font-bold text-foreground uppercase tracking-wide">Pourquoi Tinka-Tout ?</h3>
                {[
                  `Au service des familles de Lomé depuis ${siteConfig.foundedYear}`,
                  "100% de réussite au CEP",
                  "Effectifs maîtrisés (15 élèves max)",
                  "Équipe pédagogique qualifiée",
                  "Activités périscolaires incluses",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Garanties */}
              <div className="space-y-3">
                {[
                  { icon: Clock,   text: "Réponse garantie sous 48h ouvrées" },
                  { icon: Shield,  text: "Vos données sont protégées et confidentielles" },
                  { icon: Phone,   text: "Accompagnement personnalisé à chaque étape" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Icon className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Formulaire (visible sans attendre le JavaScript) */}
            <div className="order-first lg:order-none lg:col-span-3">
              <div className="rounded-carte border border-border border-t-[6px] border-t-secondary bg-card shadow-sm overflow-hidden">
                <div className="bg-secondary-soft border-b border-border px-5 py-5 sm:px-7">
                  <h2 className="font-heading text-lg font-bold text-foreground">Formulaire de pré-inscription</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">Renseignez les informations ci-dessous · 3 minutes suffisent</p>
                </div>
                <div className="p-5 sm:p-9">
                  <InscriptionForm />
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}
