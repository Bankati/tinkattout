import { CheckCircle2, Clock, Shield, Phone } from "lucide-react";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { CheminEtapes, Confetti } from "@/components/site/hero-dessins";
import { siteConfig } from "@/config/site";
import { InscriptionForm } from "./InscriptionForm";

export const metadata = {
  title: "Pré-inscription — École Tinka-Tout",
  description: "Pré-inscription en ligne en 3 minutes. L'École Tinka-Tout vous recontacte sous 48h.",
};

/* Les 3 étapes, affichées dans le bandeau (vrai contenu, lu par les lecteurs d'écran). */
const ETAPES = [
  { titre: "Remplissez le formulaire", desc: "Informations sur l'élève et le parent ou tuteur légal." },
  { titre: "Confirmation à l'écran", desc: "Un message confirme l'enregistrement de votre demande dès l'envoi." },
  { titre: "Nous vous rappelons", desc: "Notre équipe vous contacte sous 48h pour finaliser le dossier." },
] as const;

export default function InscriptionPage() {
  return (
    <>
      {/* ── Bandeau : le chemin en 3 étapes (variante A) ── */}
      <PageHero
        surtitre={`Inscriptions ${siteConfig.schoolYear}`}
        titre="Pré-inscription"
        ariane="Pré-inscription"
        dessin={<CheminEtapes etapes={ETAPES} />}
        confettis={<>
          <Confetti.Point className="right-[3%] top-[12%] bg-cycle-maternelle" />
          <Confetti.Triangle className="right-[3%] top-[62%] bg-cycle-periscolaire" />
        </>}
      >
        {/* Sur téléphone, les 3 étapes juste en dessous disent déjà l'essentiel */}
        <ul className="mt-7 hidden flex-wrap gap-x-5 gap-y-3 text-sm text-white/85 sm:flex">
          {["Formulaire simple", "Confirmation à l'écran", "Réponse sous 48h", "Données protégées"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" /> {item}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* ── Contenu ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">

            {/* Colonne info (visible sans attendre le JavaScript) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Avantages */}
              <div className="rounded-carte border border-border bg-muted p-6 space-y-3">
                <h2 className="font-heading text-sm font-bold text-foreground uppercase tracking-wide">Pourquoi Tinka-Tout ?</h2>
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
