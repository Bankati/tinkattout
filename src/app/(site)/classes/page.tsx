import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/Container";
import { PageHero, Or } from "@/components/site/PageHero";
import { EscalierNiveaux, Confetti } from "@/components/site/hero-dessins";
import { siteConfig } from "@/config/site";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { ClassesAccordion } from "./ClassesAccordion";
import {
  boutonOr, boutonMarine, boutonContourBlanc, tailleBouton, surtitreOr, CYCLE_COULEURS,
} from "@/components/ui/palette";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Classes et programme, de la maternelle au CM2",
  description:
    "Petite Section, Moyenne Section, Grande Section, CP, CE1, CE2, CM1 et CM2 à Lomé : cycles, objectifs, matières et compétences par niveau à l'École Tinka-Tout.",
  path: "/classes",
});

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
    id: "maternelle",
    couleur: CYCLE_COULEURS.maternelle,
    // Pas encore de programme détaillé publié pour la maternelle : on oriente vers l'école.
    cta: { href: "/contact", label: "Nous contacter" },
  },
  {
    title: "Primaire",
    ages: "6 – 11 ans",
    img: siteConfig.images.feature2,
    desc: "Apprentissages fondamentaux du CP au CM2 avec un encadrement rigoureux et personnalisé.",
    id: "primaire",
    couleur: CYCLE_COULEURS.primaire,
    cta: { href: "#programme", label: "Voir le programme" },
  },
  {
    title: "Périscolaire",
    ages: "Toutes classes",
    img: siteConfig.images.feature3,
    desc: "Activités artistiques, sportives et linguistiques proposées après les cours chaque soir.",
    id: "periscolaire",
    couleur: CYCLE_COULEURS.periscolaire,
    cta: { href: "/contact", label: "Nous contacter" },
  },
];

export default function ClassesPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════
          BANDEAU — l'escalier de la PS au CM2 (variante A, sans photo)
      ══════════════════════════════════════════════════ */}
      <PageHero
        surtitre="Nos niveaux"
        titre={<>L&apos;excellence commence<br />dès la première<br /><Or>classe</Or></>}
        titreClassName="lg:text-[2.75rem] lg:leading-[1.15]"
        description="De la Maternelle au CM2, chaque enfant bénéficie d'un encadrement personnalisé, de méthodes pédagogiques actives et d'un environnement stimulant."
        actions={<>
          <Link href="/inscription" className={`${boutonOr} ${tailleBouton.md} group`}>
            Pré-inscrire mon enfant
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
          <Link href="#cycles" className={`${boutonContourBlanc} ${tailleBouton.md}`}>
            Voir les cycles
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </>}
        dessin={<EscalierNiveaux cycles={CYCLES.slice(0, 2).map((c) => ({ nom: c.title, ages: c.ages }))} />}
        confettis={<>
          <Confetti.Point className="right-[5%] top-[10%] bg-cycle-maternelle" />
          <Confetti.Point className="right-[44%] top-[14%] h-2.5 w-2.5 bg-vie-ecole" />
        </>}
        vague="muted"
      />

      {/* ══════════════════════════════════════════════════
          NOS TROIS CYCLES — style cartes programmes
      ══════════════════════════════════════════════════ */}
      <section id="cycles" className="py-20 bg-muted">
        <Container>
          <FadeIn className="mb-14 text-center">
            <p className={`${surtitreOr} mx-auto mb-3`}>Organisation</p>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Nos Trois Cycles
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
              Un parcours cohérent et progressif, conçu pour accompagner chaque enfant
              à son rythme du plus jeune âge jusqu&apos;au CM2.
            </p>
          </FadeIn>

          <StaggerContainer className="grid gap-7 sm:grid-cols-3">
            {CYCLES.map(({ title, ages, img, desc, id, cta, couleur }) => (
              <StaggerItem key={title} className="h-full">
                {/* Même couleur de cycle que sur l'accueil : bord vif et badge doux */}
                <div id={id} className={`group flex h-full flex-col overflow-hidden rounded-carte border border-border border-t-[6px] ${couleur.bord} bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>

                  {/* Image */}
                  <div className="relative mx-3 mt-3 aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 640px) 33vw, 100vw"
                    />
                  </div>

                  {/* Contenu centré */}
                  <div className="flex flex-1 flex-col items-center px-6 py-7 text-center">
                    <span className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${couleur.doux} ${couleur.texte}`}>
                      {ages}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-foreground mt-1">
                      {title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                    <Link
                      href={cta.href}
                      className={`${boutonMarine} ${tailleBouton.sm} mt-6 group/btn`}
                    >
                      {cta.label}
                      <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" aria-hidden="true" />
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
      <section id="programme" className="py-20 bg-white">
        <Container>
          <FadeIn className="mb-12">
            <p className={`${surtitreOr} mb-3`}>Détail</p>
            <h2 className="font-heading text-3xl font-bold text-foreground">
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
      <section className="py-20 bg-muted">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <FadeIn>
              <div className="overflow-hidden rounded-photo shadow-xl">
                <Image
                  src={siteConfig.images.campus}
                  alt="Élèves en classe"
                  width={680}
                  height={420}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="w-full h-72 object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.15} className="space-y-5">
              <p className={surtitreOr}>Rejoindre Tinka-Tout</p>
              <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                Une place pour votre enfant
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Les inscriptions pour l&apos;année {siteConfig.schoolYear} sont ouvertes.
                Soumettez une demande de pré-inscription en ligne et nous vous
                recontacterons sous 48h pour finaliser le dossier.
              </p>
              <Link
                href="/inscription"
                className={`${boutonOr} ${tailleBouton.md} group`}
              >
                Pré-inscrire mon enfant
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
