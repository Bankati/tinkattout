/**
 * Bandeau du haut des pages intérieures, dans la famille de l'accueil
 * (plan de Majoie et maquettes de Reine du 10/11/2026, validés par le boss).
 *
 * Composant serveur : aucun JavaScript envoyé. Fondus 100 % CSS (coupés par « réduire les animations »).
 * Règles de contraste : aucun décor sous le texte ; les confettis ne s'affichent qu'à partir de 1280 px,
 * dans la colonne du dessin.
 */
import type { ReactNode } from "react";
import { GraduationCap, type LucideIcon } from "lucide-react";
import { Container } from "./Container";
import { FilAriane } from "./FilAriane";
import { VagueOr, type FondVague } from "./VagueOr";
import { surtitreOr } from "@/components/ui/palette";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  /** marine : fond marine nuit (comme l'accueil) ; ciel : fond ciel quadrillé (Contact). */
  ton?: "marine" | "ciel";
  surtitre: ReactNode;
  iconeSurtitre?: LucideIcon;
  /** Le seul <h1> de la page. Mettre la partie en or dans <Or>. */
  titre: ReactNode;
  titreClassName?: string;
  description?: ReactNode;
  actions?: ReactNode;
  /** Nom de la page dans le fil d'Ariane (aucun fil si absent). */
  ariane?: string;
  /** Contenu sous le texte (ex. liste de garanties). */
  children?: ReactNode;
  /** Dessin de la colonne de droite (dessous sur téléphone). */
  dessin?: ReactNode;
  /** Confettis (voir hero-dessins) : affichés à partir de 1280 px seulement. */
  confettis?: ReactNode;
  /** Couleur de la section suivante. */
  vague?: FondVague;
};

/** Partie du titre en or (marine) ou en marine (fond clair). */
export function Or({ children }: { children: ReactNode }) {
  return <span className="text-secondary [.hero-ciel_&]:text-primary">{children}</span>;
}

export function PageHero({
  ton = "marine",
  surtitre,
  iconeSurtitre: IconeSurtitre = GraduationCap,
  titre,
  titreClassName,
  description,
  actions,
  ariane,
  children,
  dessin,
  confettis,
  vague = "background",
}: PageHeroProps) {
  const marine = ton === "marine";
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        marine
          ? "bg-primary-deep bg-gradient-to-r from-primary-deep from-45% to-primary text-white"
          : "hero-ciel quadrillage-ciel bg-surface-ciel text-foreground",
      )}
    >
      {marine && <div aria-hidden="true" className="motif-ecole pointer-events-none absolute inset-0" />}

      {confettis && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] hidden xl:block">
          {confettis}
        </div>
      )}

      <Container
        className={cn(
          "relative z-10 grid items-center gap-10 pt-14 pb-24 sm:pt-16 lg:gap-12 lg:pt-20 lg:pb-28",
          dessin && "lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]",
        )}
      >
        <div className={cn("min-w-0", dessin ? "max-w-xl" : "max-w-3xl")}>
          <div className="animate-fade-up">
            {marine ? (
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border-[1.5px] border-secondary/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary">
                <IconeSurtitre className="h-3.5 w-3.5" aria-hidden="true" />
                {surtitre}
              </p>
            ) : (
              <p className={`${surtitreOr} mb-4`}>{surtitre}</p>
            )}
          </div>

          <div className="animate-fade-up [animation-delay:80ms]">
            <h1 className={cn("font-heading text-4xl font-bold leading-tight text-balance sm:text-5xl", titreClassName)}>
              {titre}
            </h1>
          </div>

          {description && (
            <div className="animate-fade-up [animation-delay:160ms]">
              <p className={cn("mt-5 text-lg leading-relaxed", marine ? "text-white/85" : "text-muted-foreground")}>
                {description}
              </p>
            </div>
          )}

          {children && <div className="animate-fade-up [animation-delay:200ms]">{children}</div>}

          {actions && (
            <div className="animate-fade-up [animation-delay:240ms]">
              <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
            </div>
          )}

          {ariane && (
            <div className="animate-fade-up [animation-delay:280ms]">
              <FilAriane page={ariane} sur={marine ? "marine" : "clair"} className="mt-5" />
            </div>
          )}
        </div>

        {dessin && (
          <div className="mx-auto w-full min-w-0 max-w-sm animate-fade-up [animation-delay:200ms] lg:max-w-none">
            {dessin}
          </div>
        )}
      </Container>

      <VagueOr fond={vague} />
    </section>
  );
}

/** Bandeau sobre des pages administratives (mentions légales, confidentialité) : crème, sans décor ni animation. */
export function BandeauSobre({
  icone: Icone,
  titre,
  ariane,
  description,
}: {
  icone: LucideIcon;
  titre: string;
  ariane: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border bg-muted">
      <Container className="max-w-3xl py-10 sm:py-14">
        <div className="flex items-start gap-6">
          <div aria-hidden="true" className="mt-9 hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:flex">
            <Icone className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <FilAriane page={ariane} sur="clair" className="mb-1" />
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">{titre}</h1>
            <div aria-hidden="true" className="mt-3.5 h-1 w-14 rounded-sm bg-secondary" />
            {description && <p className="mt-3 text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
      </Container>
    </section>
  );
}
