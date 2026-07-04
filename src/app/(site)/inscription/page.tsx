import Link from "next/link";
import { CheckCircle2, Clock, Shield, Phone } from "lucide-react";
import { Container } from "@/components/site/Container";
import { InscriptionForm } from "./InscriptionForm";
import { FadeIn } from "@/components/ui/motion";

export const metadata = {
  title: "Pré-inscription — École Tinka-Tout",
  description: "Pré-inscription en ligne en 3 minutes. Confirmation immédiate. L'École Tinka-Tout vous recontacte sous 48h.",
};

export default function InscriptionPage() {
  return (
    <>
      {/* ── En-tête ───────────────────────────────────── */}
      <section className="relative bg-primary py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 h-80 w-80 rounded-full border-[50px] border-white translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
        <Container className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Inscriptions 2025-2026</p>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Pré-inscription
          </h1>
          <p className="mt-4 max-w-2xl text-white/70 text-lg">
            Formulaire simple · Confirmation immédiate · Réponse sous 48h · Données protégées
          </p>
          <nav className="mt-5 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-secondary">Pré-inscription</span>
          </nav>
        </Container>
      </section>

      {/* ── Contenu ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">

            {/* Colonne info */}
            <FadeIn className="lg:col-span-2 space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Comment ça marche</p>
                <h2 className="gold-underline font-heading text-2xl font-bold text-foreground">
                  3 étapes simples
                </h2>
              </div>

              <ol className="space-y-5">
                {[
                  { step: "01", title: "Remplissez le formulaire", desc: "Informations sur l'élève et le parent ou tuteur légal." },
                  { step: "02", title: "Confirmation immédiate", desc: "Vous recevez un email de confirmation dès l'envoi." },
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
              <div className="rounded-sm border border-border bg-muted/30 p-6 space-y-3">
                <h3 className="font-heading text-sm font-bold text-foreground uppercase tracking-wide">Pourquoi Tinka-Tout ?</h3>
                {[
                  "20+ ans d'expérience à Lomé",
                  "100% de réussite au CEP",
                  "Effectifs maîtrisés (15 élèves max)",
                  "Équipe pédagogique qualifiée",
                  "Activités périscolaires incluses",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
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
                    <Icon className="h-4 w-4 text-primary shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Formulaire */}
            <FadeIn delay={0.1} className="lg:col-span-3">
              <div className="rounded-sm border border-border bg-white shadow-sm overflow-hidden">
                <div className="bg-primary/5 border-b border-border px-7 py-5">
                  <h2 className="font-heading text-lg font-bold text-foreground">Formulaire de pré-inscription</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">Renseignez les informations ci-dessous · 3 minutes suffisent</p>
                </div>
                <div className="p-7 sm:p-9">
                  <InscriptionForm />
                </div>
              </div>
            </FadeIn>

          </div>
        </Container>
      </section>
    </>
  );
}
