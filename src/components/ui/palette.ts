/**
 * Classes partagées de la palette « marine, or soleil et crayons de couleur »
 * (proposition de Reine du 03/11/2026, validée par le boss).
 *
 * Règles de contraste (ne pas les contourner) :
 * - texte posé sur l'or ou sur une couleur vive : encre (text-foreground / text-secondary-foreground) ;
 * - texte sur fond clair : variantes *-strong, jamais la couleur vive ni l'or soleil ;
 * - texte blanc : seulement sur marine, primary-deep, foreground, *-strong, accent, destructive.
 */

const boutonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "disabled:cursor-wait disabled:opacity-60";

/** Tailles : zone cliquable de 44 px minimum. */
export const tailleBouton = {
  md: "min-h-12 px-7 text-sm",
  sm: "min-h-11 px-5 text-sm",
} as const;

/** Action principale « Pré-inscrire » : or soleil, texte encre (8,73:1), partout. */
export const boutonOr =
  boutonBase +
  " bg-secondary text-secondary-foreground shadow-bouton-or hover:-translate-y-0.5 hover:bg-secondary/90";

/** Action secondaire : marine, texte blanc (11,42:1). */
export const boutonMarine =
  boutonBase + " bg-primary text-primary-foreground hover:-translate-y-0.5 hover:bg-primary/90";

/** Bouton contour sur fond clair. */
export const boutonContour =
  boutonBase + " border-2 border-primary text-primary hover:bg-primary/5";

/** Bouton contour sur fond marine (blanc à 75 % minimum). */
export const boutonContourBlanc =
  boutonBase + " border-2 border-white/75 text-white hover:border-white hover:bg-white/10";

/**
 * Surtitre en badge « or doux » (or foncé sur or doux : 5,44:1).
 * Bloc à largeur ajustée : il reste au-dessus du titre ; ajouter mx-auto dans une section centrée.
 */
export const surtitreOr =
  "flex w-fit items-center gap-1.5 rounded-full bg-secondary-soft px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary-strong";

/**
 * Une couleur par cycle, identique sur toutes les pages.
 * vif : décor seulement (bord, confettis) ; doux : fond de badge ou de pastille ;
 * texte : écriture sur fond clair ; plein : fond avec texte blanc.
 */
export const CYCLE_COULEURS = {
  maternelle: {
    bord: "border-t-cycle-maternelle",
    vif: "bg-cycle-maternelle",
    doux: "bg-cycle-maternelle-soft",
    texte: "text-cycle-maternelle-strong",
    plein: "bg-cycle-maternelle-strong",
  },
  primaire: {
    bord: "border-t-cycle-primaire",
    vif: "bg-cycle-primaire",
    doux: "bg-cycle-primaire-soft",
    texte: "text-cycle-primaire-strong",
    plein: "bg-cycle-primaire-strong",
  },
  periscolaire: {
    bord: "border-t-cycle-periscolaire",
    vif: "bg-cycle-periscolaire",
    doux: "bg-cycle-periscolaire-soft",
    texte: "text-cycle-periscolaire-strong",
    plein: "bg-cycle-periscolaire-strong",
  },
} as const;

export type CycleId = keyof typeof CYCLE_COULEURS;
