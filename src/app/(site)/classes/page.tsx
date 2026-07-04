import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/Container";
import { siteConfig } from "@/config/site";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { ClassesAccordion } from "./ClassesAccordion";

export const metadata = {
  title: "Classes & Programme — École Tinka-Tout",
  description: "Parcours pédagogique du CP au CM2 — objectifs, matières et compétences par niveau.",
};

const CLASSES = [
  {
    level: "CP",
    objectifs: "Entrée dans la lecture, l'écriture et la numération. Développement de l'autonomie et du vivre-ensemble.",
    matieres: "Français (lecture, écriture, étude de la langue), Mathématiques, Questionner le monde, EPS, Arts.",
  },
  {
    level: "CE1",
    objectifs: "Consolidation des fondamentaux, lecture fluide, calcul et résolution de problèmes.",
    matieres: "Français, Mathématiques, Questionner le monde, Langue vivante, EPS, Arts.",
  },
  {
    level: "CE2",
    objectifs: "Approfondissement des compétences, début de la rédaction et raisonnements structurés.",
    matieres: "Français, Mathématiques, Sciences, Histoire-Géographie, Langue vivante, EPS, Arts.",
  },
  {
    level: "CM1",
    objectifs: "Renforcement des acquis, préparation à la fin de cycle, travail en projet.",
    matieres: "Français, Mathématiques, Sciences, Histoire-Géographie, EMC, Langue vivante, EPS, Arts.",
  },
  {
    level: "CM2",
    objectifs: "Consolidation et préparation à l'entrée au collège. Autonomie et méthodologie.",
    matieres: "Français, Mathématiques, Sciences, Histoire-Géographie, EMC, Langue vivante, EPS, Arts.",
  },
];

const CYCLES = [
  {
    title: "Maternelle",
    ages: "2 – 5 ans",
    img: siteConfig.images.feature1,
    desc: "Éveil, jeu et socialisation dans un environnement rassurant et bienveillant pour les plus petits.",
    href: "#maternelle",
  },
  {
    title: "Primaire",
    ages: "6 – 11 ans",
    img: siteConfig.images.feature2,
    desc: "Apprentissages fondamentaux du CP au CM2 avec un encadrement rigoureux et personnalisé.",
    href: "#primaire",
  },
  {
    title: "Périscolaire",
    ages: "Toutes classes",
    img: siteConfig.images.feature3,
    desc: "Activités artistiques, sportives et linguistiques proposées après les cours chaque soir.",
    href: "#periscolaire",
  },
];

/* Images pour la mosaïque hero */
const MOSAIC_IMAGES = [
  siteConfig.images.feature1,
  siteConfig.images.feature2,
  siteConfig.images.feature3,
  siteConfig.images.campus,
  "/images/pexels-rdne-8363154.jpg",
  "/images/pexels-yankrukov-8613319.jpg",
];

export default function ClassesPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════
          HERO — style split : texte gauche + mosaïque droite
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">

        {/* Blob décoratif arrière-plan */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-amber-50 blur-3xl opacity-70" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[hsl(217,58%,95%)] blur-2xl opacity-80" />

        {/* Dots colorés décoratifs */}
        <div className="pointer-events-none absolute top-16 left-[44%] h-3.5 w-3.5 rounded-full bg-orange-400 hidden lg:block" />
        <div className="pointer-events-none absolute top-[38%] right-[36%] h-3 w-3 rounded-full bg-emerald-500 hidden lg:block" />
        <div className="pointer-events-none absolute bottom-[28%] left-[22%] h-3 w-3 rounded-full bg-blue-500 hidden lg:block" />
        <div className="pointer-events-none absolute top-[55%] right-12 h-2.5 w-2.5 rounded-full bg-rose-500 hidden lg:block" />
        <div className="pointer-events-none absolute top-24 right-[42%] h-2 w-2 rounded-full bg-amber-400 hidden lg:block" />

        <Container className="relative z-10">
          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* ── Colonne texte ── */}
            <FadeIn className="max-w-lg">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-secondary">
                Nos niveaux
              </p>
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
                L&apos;excellence commence
                <br />
                dès la première
                <br />
                <span className="text-primary">classe</span>
              </h1>
              <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
                De la Maternelle au CM2, chaque enfant bénéficie d&apos;un
                encadrement personnalisé, de méthodes pédagogiques actives et
                d&apos;un environnement stimulant.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/inscription"
                  className="inline-flex h-12 items-center gap-2.5 rounded-lg bg-foreground px-7 text-sm font-bold text-white transition-all hover:bg-foreground/85 hover:-translate-y-0.5 hover:shadow-lg group"
                >
                  Pré-inscrire mon enfant
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#cycles"
                  className="inline-flex h-12 items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Voir les cycles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>

            {/* ── Colonne mosaïque ── */}
            <FadeIn delay={0.15} className="hidden lg:block">
              <div className="flex gap-3 h-[480px]">

                {/* Colonne 1 */}
                <div className="flex flex-1 flex-col gap-3">
                  <div className="relative flex-1 overflow-hidden rounded-[2rem]">
                    <Image src={MOSAIC_IMAGES[0]} alt="Élèves maternelle" fill className="object-cover" sizes="20vw" />
                  </div>
                  <div className="relative flex-[0.75] overflow-hidden rounded-[2rem]">
                    <Image src={MOSAIC_IMAGES[3]} alt="Campus" fill className="object-cover" sizes="20vw" />
                  </div>
                </div>

                {/* Colonne 2 — décalée vers le bas */}
                <div className="flex flex-1 flex-col gap-3 mt-8">
                  <div className="relative flex-[0.75] overflow-hidden rounded-[2rem]">
                    <Image src={MOSAIC_IMAGES[1]} alt="Élèves primaire" fill className="object-cover" sizes="20vw" />
                  </div>
                  <div className="relative flex-1 overflow-hidden rounded-[2rem]">
                    <Image src={MOSAIC_IMAGES[4]} alt="Activités" fill className="object-cover" sizes="20vw" />
                  </div>
                </div>

                {/* Colonne 3 */}
                <div className="flex flex-1 flex-col gap-3">
                  <div className="relative flex-[0.65] overflow-hidden rounded-[2rem]">
                    <Image src={MOSAIC_IMAGES[2]} alt="Périscolaire" fill className="object-cover" sizes="20vw" />
                  </div>
                  <div className="relative flex-1 overflow-hidden rounded-[2rem]">
                    <Image src={MOSAIC_IMAGES[5]} alt="Élèves en cours" fill className="object-cover" sizes="20vw" />
                  </div>
                </div>

              </div>
            </FadeIn>

          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════
          NOS TROIS CYCLES — style cartes programmes
      ══════════════════════════════════════════════════ */}
      <section id="cycles" className="py-20 bg-gray-50">
        <Container>
          <FadeIn className="mb-14 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Organisation</p>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Nos Trois Cycles
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
              Un parcours cohérent et progressif, conçu pour accompagner chaque enfant
              à son rythme du plus jeune âge jusqu&apos;au CM2.
            </p>
          </FadeIn>

          <StaggerContainer className="grid gap-7 sm:grid-cols-3">
            {CYCLES.map(({ title, ages, img, desc, href }) => (
              <StaggerItem key={title}>
                <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                  {/* Image carrée */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={img}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Contenu centré */}
                  <div className="flex flex-1 flex-col items-center px-6 py-7 text-center">
                    <span className="mb-2 inline-block rounded-full bg-secondary/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary">
                      {ages}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-foreground mt-1">
                      {title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                    <Link
                      href={href}
                      className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-primary hover:-translate-y-0.5 hover:shadow-md group/btn"
                    >
                      En savoir plus
                      <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════
          PROGRAMME DÉTAILLÉ CP→CM2
      ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <Container>
          <FadeIn className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Détail</p>
            <h2 className="gold-underline font-heading text-3xl font-bold text-foreground">
              Programme par Niveau
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Objectifs pédagogiques et matières enseignées pour chaque classe du primaire.
            </p>
          </FadeIn>
          <div className="max-w-3xl">
            <ClassesAccordion items={CLASSES} />
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════
          IMAGE + CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <FadeIn>
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={siteConfig.images.campus}
                  alt="Élèves en classe"
                  width={680}
                  height={420}
                  className="w-full h-72 object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.15} className="space-y-5">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary">Rejoindre Tinka-Tout</p>
              <h2 className="gold-underline font-heading text-2xl font-bold text-foreground sm:text-3xl">
                Une place pour votre enfant
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Les inscriptions pour l&apos;année 2025-2026 sont ouvertes.
                Soumettez une demande de pré-inscription en ligne et nous vous
                recontacterons sous 48h pour finaliser le dossier.
              </p>
              <Link
                href="/inscription"
                className="inline-flex items-center gap-2 h-12 rounded-lg bg-primary px-7 text-sm font-bold uppercase tracking-widest text-white hover:bg-primary/85 transition-all hover:-translate-y-0.5 hover:shadow-lg group"
              >
                Pré-inscrire mon enfant
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
