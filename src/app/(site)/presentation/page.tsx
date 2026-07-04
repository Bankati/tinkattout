import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Users, BookOpen, Shield, Heart, MessageCircle } from "lucide-react";
import { Container } from "@/components/site/Container";
import { siteConfig } from "@/config/site";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { FAQ_ITEMS } from "@/config/faq";

export const metadata = {
  title: "Accueil — École Tinka-Tout",
  description: "Notre mission, nos valeurs, notre méthode pédagogique et nos réponses à vos questions.",
};

const VALEURS = [
  { icon: Heart,    label: "Bienveillance", desc: "Un environnement affectueux où chaque enfant se sent en sécurité." },
  { icon: BookOpen, label: "Exigence",      desc: "Des attentes élevées adaptées à chaque niveau pour progresser." },
  { icon: Users,    label: "Respect",       desc: "Le vivre-ensemble au cœur de la vie scolaire quotidienne." },
  { icon: Shield,   label: "Ouverture",     desc: "L'éveil à la diversité culturelle et à la curiosité intellectuelle." },
];

export default function PresentationPage() {
  return (
    <>
      {/* ── En-tête page ─────────────────────────────── */}
      <section className="relative bg-primary py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 h-80 w-80 rounded-full border-[50px] border-white translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
        <Container className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Notre École</p>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Accueil
          </h1>
          <p className="mt-4 max-w-2xl text-white/70 text-lg leading-relaxed">
            Découvrez notre projet éducatif, notre équipe, le cadre que nous offrons à vos enfants et les réponses à vos questions.
          </p>
          <nav className="mt-5 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-secondary">Présentation</span>
          </nav>
        </Container>
      </section>

      {/* ── Mission & Vision ─────────────────────────── */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 items-center">
            <FadeIn className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Qui sommes-nous</p>
                <h2 className="gold-underline font-heading text-3xl font-bold text-foreground">
                  Mission & Vision
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                L&apos;École Tinka-Tout a pour mission d&apos;offrir un enseignement primaire de qualité
                dans un cadre bienveillant et exigeant. Nous visons l&apos;épanouissement de chaque
                élève et la construction de bases solides pour la suite de sa scolarité.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Notre vision est celle d&apos;une école ouverte sur le monde, formant des citoyens
                responsables, capables d&apos;évoluer avec confiance dans la société togolaise et
                internationale de demain.
              </p>
              <ul className="space-y-3">
                {[
                  "Épanouissement personnel de chaque élève",
                  "Bases académiques solides et durables",
                  "Ouverture culturelle et citoyenneté",
                  "Partenariat actif avec les familles",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.15} className="relative">
              <div className="overflow-hidden rounded-sm shadow-xl">
                <Image
                  src={siteConfig.images.campus}
                  alt="Locaux de l'école Tinka-Tout"
                  width={700}
                  height={480}
                  className="w-full h-[380px] object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 rounded-sm bg-secondary p-5 shadow-xl hidden sm:block">
                <p className="font-heading text-2xl font-bold text-white leading-none">20+</p>
                <p className="text-[11px] text-white/80 uppercase tracking-wide mt-0.5">Années</p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── Nos Valeurs ──────────────────────────────── */}
      <section className="py-20 bg-muted/40">
        <Container>
          <FadeIn className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Ce qui nous guide</p>
            <h2 className="gold-underline gold-underline-center font-heading text-3xl font-bold text-foreground inline-block">
              Nos Valeurs
            </h2>
          </FadeIn>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALEURS.map(({ icon: Icon, label, desc }) => (
              <StaggerItem
                key={label}
                className="group rounded-sm bg-white border border-border p-7 text-center transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/20"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── Méthode pédagogique ──────────────────────── */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 items-start">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Notre approche</p>
              <h2 className="gold-underline font-heading text-3xl font-bold text-foreground mb-6">
                Méthode Pédagogique
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Nous privilégions une <strong className="text-foreground">pédagogie active</strong> où l&apos;élève
                  est acteur de ses apprentissages. Les enseignants s&apos;appuient sur des pratiques
                  éprouvées et adaptent leur démarche aux besoins de chaque classe.
                </p>
                <p>
                  Évaluation formative, travail en groupe et projets collectifs rythment l&apos;année
                  scolaire. Chaque enfant est suivi individuellement et ses progrès sont régulièrement
                  communiqués aux familles.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { val: "15",   unit: "élèves max",    label: "par classe" },
                  { val: "2×",   unit: "par trimestre", label: "réunions parents" },
                  { val: "100%", unit: "numérique",     label: "salle informatique" },
                  { val: "5",    unit: "langues",       label: "enseignées" },
                ].map(({ val, unit, label }) => (
                  <div key={label} className="rounded-sm border border-border p-4 bg-muted/30">
                    <div className="font-heading text-xl font-bold text-primary">
                      {val} <span className="text-sm font-normal text-muted-foreground">{unit}</span>
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Infrastructures</p>
              <h2 className="gold-underline font-heading text-3xl font-bold text-foreground mb-6">
                Cadre & Sécurité
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Locaux adaptés, effectifs maîtrisés et protocoles clairs garantissent un
                environnement sûr et serein. La relation avec les familles est au cœur de
                notre fonctionnement.
              </p>

              <div className="overflow-hidden rounded-sm shadow-md">
                <Image
                  src={siteConfig.images.feature2}
                  alt="Salle de classe"
                  width={600}
                  height={340}
                  className="w-full h-56 object-cover"
                />
              </div>

              <ul className="mt-6 space-y-3">
                {[
                  "Salles de classe climatisées",
                  "Cour de récréation sécurisée",
                  "Bibliothèque et salle informatique",
                  "Cantine avec repas équilibrés",
                  "Surveillance médicale",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="py-20 bg-muted/40">
        <Container>
          <FadeIn className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Questions fréquentes</p>
            <h2 className="gold-underline gold-underline-center font-heading text-3xl font-bold text-foreground inline-block">
              Vous avez des questions ?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Les réponses aux questions les plus souvent posées par les familles.
            </p>
          </FadeIn>

          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={FAQ_ITEMS} />

            <FadeIn className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-sm border border-border bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-heading font-bold text-foreground">Vous ne trouvez pas votre réponse ?</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Contactez-nous directement, nous vous répondons sous 48h.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-10 rounded-sm bg-primary px-5 text-xs font-bold uppercase tracking-widest text-white hover:bg-primary/85 transition-all shrink-0 group"
              >
                Nous écrire <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-16 bg-primary">
        <Container className="text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Venez visiter notre école
            </h2>
            <p className="mt-3 text-white/70 max-w-lg mx-auto">
              Prenez rendez-vous pour une visite guidée et rencontrez notre équipe pédagogique.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/inscription"
                className="inline-flex h-11 items-center justify-center rounded-sm bg-secondary px-7 text-sm font-bold uppercase tracking-widest text-white hover:bg-secondary/85 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Pré-inscrire mon enfant
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border-2 border-white/40 px-7 text-sm font-bold uppercase tracking-widest text-white hover:border-white hover:bg-white/10 transition-all"
              >
                Prendre rendez-vous <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
