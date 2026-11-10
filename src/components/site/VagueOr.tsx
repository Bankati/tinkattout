/**
 * Vague à liseré or du bas des bandeaux (signature du site, reprise de l'accueil).
 * `fond` : couleur de la section qui suit, pour que la vague s'y fonde.
 */
const FOND = {
  background: "fill-background",
  muted: "fill-muted",
  "surface-ciel": "fill-surface-ciel",
} as const;

export type FondVague = keyof typeof FOND;

export function VagueOr({ fond = "background" }: { fond?: FondVague }) {
  return (
    <div aria-hidden="true" className="absolute bottom-0 left-0 z-10 w-full overflow-hidden leading-[0]">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="relative block h-12 w-[calc(100%+1px)] sm:h-16">
        <path d="M0,30 C300,72 900,-6 1200,28 L1200,60 L0,60 Z" className="fill-secondary" />
        <path d="M0,40 C300,80 900,0 1200,40 L1200,60 L0,60 Z" className={FOND[fond]} />
      </svg>
    </div>
  );
}
