/**
 * Dessins des bandeaux (maquettes de Reine du 10/11/2026), en SVG dans la page : aucune image à télécharger.
 * Couleurs uniquement par jetons du site (fill-secondary, fill-cycle-primaire…), jamais de code couleur en dur.
 * Les dessins décoratifs sont cachés aux lecteurs d'écran ; les étapes de la pré-inscription sont du vrai contenu.
 * Mouvements : 100 % CSS (animate-* de globals.css), coupés par le réglage « réduire les animations ».
 * Une pièce SVG qui a déjà un attribut transform est enveloppée dans un <g> animé (sinon le CSS l'écraserait).
 */
import { MapPin, Clock, Sparkle, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { GRADE_LEVELS } from "@/config/school";
import { cn } from "@/lib/utils";

/* ─── Confettis (même famille que l'accueil) ─────────────────────────── */

type Pos = { className: string };

export const Confetti = {
  Point: ({ className }: Pos) => <span className={cn("confetti absolute h-4 w-4 animate-flotte rounded-full", className)} />,
  Anneau: ({ className }: Pos) => (
    <span className={cn("confetti absolute h-9 w-9 animate-flotte rounded-full border-[6px]", className)} />
  ),
  Triangle: ({ className }: Pos) => (
    <span
      className={cn(
        "confetti absolute h-6 w-7 rotate-[14deg] animate-flotte [clip-path:polygon(50%_0,100%_100%,0_100%)]",
        className,
      )}
    />
  ),
  Etincelle: ({ className }: Pos) => (
    <Sparkle className={cn("confetti absolute h-7 w-7 animate-scintille text-secondary", className)} />
  ),
};

/* ─── Présentation : l'école et ses 4 valeurs ─────────────────────────── */

export function DessinEcole() {
  return (
    <svg viewBox="0 0 500 390" aria-hidden="true" focusable="false" className="block h-auto w-full font-sans" fontWeight={700} fontSize={16} textAnchor="middle">
      <ellipse cx="250" cy="354" rx="210" ry="16" className="fill-white" opacity=".07" />
      {/* Soleil : les rayons tournent */}
      <g className="animate-tourne" style={{ transformOrigin: "420px 70px" }}>
        <path
          d="M420 34v-12M420 106v12M456 70h12M384 70h-12M445 45l8-8M395 95l-8 8M445 95l8 8M395 45l-8-8"
          className="stroke-secondary"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <circle cx="420" cy="70" r="26" className="fill-secondary" />
      {/* Bâtiment */}
      <rect x="120" y="170" width="260" height="180" rx="14" className="fill-muted" />
      <polygon points="100,182 250,82 400,182" className="fill-secondary stroke-secondary" strokeWidth="12" strokeLinejoin="round" />
      <circle cx="250" cy="142" r="19" className="fill-white stroke-secondary-strong" strokeWidth="3" />
      <path d="M250 131v11l7 5" className="stroke-foreground" strokeWidth="3" strokeLinecap="round" fill="none" />
      <line x1="250" y1="76" x2="250" y2="36" className="stroke-muted" strokeWidth="3" strokeLinecap="round" />
      <path d="M250,36 L282,44 L250,54 Z" className="piece-svg origin-left animate-drapeau fill-cycle-maternelle" />
      <g className="fill-surface-ciel stroke-cycle-primaire" strokeWidth="3">
        <rect x="146" y="198" width="30" height="30" rx="6" />
        <rect x="194" y="198" width="30" height="30" rx="6" />
        <rect x="276" y="198" width="30" height="30" rx="6" />
        <rect x="324" y="198" width="30" height="30" rx="6" />
        <rect x="146" y="262" width="30" height="30" rx="6" />
        <rect x="324" y="262" width="30" height="30" rx="6" />
      </g>
      {/* Les lumières des classes s'allument tour à tour */}
      <g className="fill-secondary-soft">
        <rect x="149" y="201" width="24" height="24" rx="4" className="animate-lueur" />
        <rect x="279" y="201" width="24" height="24" rx="4" className="animate-lueur [animation-delay:-1.1s]" />
        <rect x="327" y="265" width="24" height="24" rx="4" className="animate-lueur [animation-delay:-2.2s]" />
      </g>
      <path d="M222,350 V296 a28,28 0 0 1 56,0 V350 Z" className="fill-primary" />
      <circle cx="266" cy="322" r="4" className="fill-secondary" />
      {/* Bande « crayons » au pied du bâtiment */}
      <rect x="120" y="344" width="65" height="8" className="fill-cycle-maternelle" />
      <rect x="185" y="344" width="65" height="8" className="fill-cycle-primaire" />
      <rect x="250" y="344" width="65" height="8" className="fill-cycle-periscolaire" />
      <rect x="315" y="344" width="65" height="8" className="fill-vie-ecole" />
      {/* Les 4 valeurs de la section « Ce qui nous guide » */}
      <g className="animate-flotte" style={{ animationDelay: "0s", animationDuration: "5s" }}>
        <g transform="rotate(-5 79 128)">
          <rect x="4" y="108" width="150" height="40" rx="20" className="fill-vie-ecole-soft" />
          <text x="79" y="134" className="fill-vie-ecole-strong">Bienveillance</text>
        </g>
      </g>
      <g className="animate-flotte" style={{ animationDelay: "-1.4s", animationDuration: "5.8s" }}>
        <g transform="rotate(4 438 158)">
          <rect x="380" y="138" width="116" height="40" rx="20" className="fill-secondary-soft" />
          <text x="438" y="164" className="fill-secondary-strong">Exigence</text>
        </g>
      </g>
      <g className="animate-flotte" style={{ animationDelay: "-2.6s", animationDuration: "4.6s" }}>
        <g transform="rotate(3 64 290)">
          <rect x="8" y="270" width="112" height="40" rx="20" className="fill-cycle-maternelle-soft" />
          <text x="64" y="296" className="fill-cycle-maternelle-strong">Respect</text>
        </g>
      </g>
      <g className="animate-flotte" style={{ animationDelay: "-0.7s", animationDuration: "6.2s" }}>
        <g transform="rotate(-4 432 300)">
          <rect x="366" y="280" width="132" height="40" rx="20" className="fill-cycle-primaire-soft" />
          <text x="432" y="306" className="fill-cycle-primaire-strong">Ouverture</text>
        </g>
      </g>
    </svg>
  );
}

/* ─── Pré-inscription : le chemin en 3 étapes (vrai contenu, lu par les lecteurs d'écran) ─── */

export type Etape = { titre: string; desc: string };

const PASTILLES = ["bg-cycle-maternelle", "bg-cycle-primaire", "bg-cycle-periscolaire"] as const;
const PLACEMENT = ["lg:self-start", "lg:self-end", "lg:self-start lg:ml-10"] as const;

export function CheminEtapes({ etapes }: { etapes: readonly Etape[] }) {
  return (
    <div className="relative lg:min-h-[410px]">
      {/* Chemin pointillé or entre les étapes (grand écran) */}
      <svg
        viewBox="0 0 494 410"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      >
        <path
          d="M150,70 C330,70 420,90 400,150 M300,215 C200,240 120,250 150,290 M340,345 C390,360 420,370 440,372"
          fill="none"
          className="animate-pointilles stroke-secondary"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="1 12"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <ol aria-label="Les étapes de la pré-inscription" className="relative flex flex-col gap-3 lg:gap-7">
        {etapes.map((e, i) => (
          <li
            key={e.titre}
            className={cn(
              "flex animate-fade-up items-start gap-3.5 rounded-carte bg-white p-4 text-foreground shadow-[0_14px_30px_rgb(5_12_28/0.35)] lg:w-[300px]",
              PLACEMENT[i % PLACEMENT.length],
            )}
            style={{ animationDelay: `${350 + i * 220}ms` }}
          >
            <span
              aria-hidden="true"
              className={cn(
                "flex h-11 w-11 shrink-0 animate-rebond items-center justify-center rounded-full font-heading text-base font-bold text-foreground",
                PASTILLES[i % PASTILLES.length],
              )}
              style={{ animationDelay: `${i * 0.8}s` }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <p className="font-heading text-base font-bold leading-snug">
                <span className="sr-only">Étape {i + 1} : </span>
                {e.titre}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{e.desc}</p>
            </div>
          </li>
        ))}
      </ol>
      {/* Arrivée : étoile or */}
      <div aria-hidden="true" className="absolute right-6 bottom-1.5 hidden h-14 w-14 lg:block">
        <span className="absolute inset-0 animate-ping rounded-full bg-secondary opacity-40 [animation-duration:2.4s]" />
        <span className="relative flex h-14 w-14 animate-rebond items-center justify-center rounded-full bg-secondary text-foreground shadow-bouton-or">
          <Star className="h-7 w-7" />
        </span>
      </div>
    </div>
  );
}

/* ─── Classes : l'escalier de la PS au CM2 (suit la liste des niveaux de config/school.ts) ─── */

function abrege(label: string, value: string) {
  return label.match(/\(([^)]+)\)/)?.[1] ?? value;
}

export function EscalierNiveaux({ cycles }: { cycles: { nom: string; ages: string }[] }) {
  const n = GRADE_LEVELS.length;
  const pas = 504 / n;
  const largeur = pas - 7;
  const montee = (294 - 56) / Math.max(n - 1, 1);
  const marches = GRADE_LEVELS.map((g, i) => {
    const h = 56 + i * montee;
    return { x: 12 + i * pas, y: 372 - h, h, label: abrege(g.label, g.value), maternelle: g.cycle === "Maternelle" };
  });
  const sommet = marches[n - 1];
  const cx = sommet.x + largeur / 2;

  return (
    <div aria-hidden="true">
      <svg viewBox="0 0 520 392" focusable="false" className="block h-auto w-full font-heading" fontWeight={700} fontSize={20} textAnchor="middle">
        {marches.map((m, i) => (
          <g key={m.label} className="piece-svg origin-bottom animate-pousse" style={{ animationDelay: `${300 + i * 110}ms` }}>
            <rect x={m.x} y={m.y} width={largeur} height={m.h} rx="10" className={m.maternelle ? "fill-cycle-maternelle" : "fill-cycle-primaire"} />
            <rect x={m.x + 6} y={m.y + 6} width={largeur - 12} height="6" rx="3" className="fill-white" opacity=".35" />
            <text x={m.x + largeur / 2} y={m.y + 36} className="fill-foreground">{m.label}</text>
          </g>
        ))}
        {/* Drapeau or au sommet */}
        <line x1={cx} y1={sommet.y} x2={cx} y2={sommet.y - 48} className="stroke-muted" strokeWidth="3" strokeLinecap="round" />
        <path
          d={`M${cx},${sommet.y - 48} L${cx + 31},${sommet.y - 40} L${cx},${sommet.y - 30} Z`}
          className="piece-svg origin-left animate-drapeau fill-secondary"
        />
        <rect x="0" y="372" width="520" height="6" rx="3" className="fill-secondary" />
        <g transform="translate(300 60) scale(1.3)">
          <g fill="none" className="piece-svg origin-center animate-scintille stroke-secondary" strokeWidth="2" strokeLinejoin="round">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          </g>
        </g>
        <circle cx="60" cy="250" r="14" fill="none" className="animate-flotte stroke-cycle-periscolaire" strokeWidth="5" />
      </svg>
      <div className="mt-3.5 flex flex-wrap justify-center gap-x-3.5 gap-y-2 text-[13px] text-white/85">
        {cycles.map((c, i) => (
          <span key={c.nom} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-1">
            <i className={cn("inline-block h-2.5 w-2.5 rounded-full", i === 0 ? "bg-cycle-maternelle" : "bg-cycle-primaire")} />
            {c.nom} · {c.ages}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Vie de l'école : le tableau d'affichage (galerie comprise) ─────────── */

const ombre = "drop-shadow-[0_6px_7px_rgb(17_28_50/0.2)]";

function Punaise({ x, className }: { x: number; className: string }) {
  return (
    <g>
      <circle cx={x} cy="0" r="10" className={className} />
      <circle cx={x - 3} cy="-3" r="3" className="fill-white" opacity=".7" />
    </g>
  );
}

function Lignes({ x, y, largeurs, className }: { x: number; y: number; largeurs: number[]; className: string }) {
  return (
    <g className={className} opacity=".22">
      {largeurs.map((l, i) => (
        <rect key={i} x={x} y={y + i * 17} width={l} height="7" rx="3.5" />
      ))}
    </g>
  );
}

export function TableauAffichage() {
  return (
    <svg viewBox="0 0 470 358" aria-hidden="true" focusable="false" className="mx-auto block h-auto w-full max-w-[470px] font-heading" fontWeight={700}>
      <defs>
        <pattern id="liege-points" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" className="fill-secondary-strong" opacity=".22" />
          <circle cx="10" cy="11" r="1.2" className="fill-secondary-strong" opacity=".12" />
        </pattern>
        <clipPath id="scene-coin">
          <rect x="12" y="12" width="146" height="90" rx="4" />
        </clipPath>
      </defs>
      {/* Cadre or foncé et liège */}
      <rect width="470" height="358" rx="22" className="fill-secondary-strong" />
      <rect x="14" y="14" width="442" height="330" rx="8" className="fill-secondary-soft" />
      <rect x="14" y="14" width="442" height="330" rx="8" fill="url(#liege-points)" />

      {/* Annonces */}
      <g className="piece-svg origin-top animate-balance" style={{ animationDelay: "0s", animationDuration: "4.5s" }}>
        <g transform="translate(36 40) rotate(-4)" className={ombre}>
          <rect width="190" height="104" rx="6" className="fill-vie-ecole-soft" />
          <text x="16" y="48" fontSize="18" className="fill-vie-ecole-strong">Annonces</text>
          <Lignes x={16} y={64} largeurs={[158, 110]} className="fill-vie-ecole-strong" />
          <Punaise x={95} className="fill-cycle-maternelle" />
        </g>
      </g>

      {/* Événements */}
      <g className="piece-svg origin-top animate-balance" style={{ animationDelay: "-1.5s", animationDuration: "5.2s" }}>
        <g transform="translate(250 34) rotate(3)" className={ombre}>
          <rect width="184" height="104" rx="6" className="fill-white" />
          <rect width="184" height="8" rx="3" className="fill-cycle-primaire" />
          <text x="16" y="50" fontSize="18" className="fill-cycle-primaire-strong">Événements</text>
          <Lignes x={16} y={66} largeurs={[152, 92]} className="fill-cycle-primaire-strong" />
          <Punaise x={92} className="fill-cycle-periscolaire" />
        </g>
      </g>

      {/* Moments de vie : un cadre photo dessiné (aucune photo) */}
      <g className="piece-svg origin-top animate-balance" style={{ animationDelay: "-3s", animationDuration: "5.8s" }}>
        <g transform="translate(164 176) rotate(2)" className={ombre}>
          <rect width="170" height="140" rx="6" className="fill-white" />
          <g clipPath="url(#scene-coin)">
            <rect x="12" y="12" width="146" height="90" className="fill-surface-ciel" />
            <circle cx="124" cy="36" r="13" className="piece-svg origin-center animate-rebond fill-secondary" />
            <path d="M12 84 Q48 58 84 78 T158 70 V102 H12Z" className="fill-cycle-periscolaire" />
            <path d="M12 96 Q62 82 112 96 T158 92 V102 H12Z" className="fill-cycle-periscolaire-soft" />
            <circle cx="46" cy="84" r="4" className="fill-cycle-maternelle" />
            <circle cx="58" cy="88" r="3" className="fill-cycle-maternelle" />
          </g>
          <text x="85" y="126" fontSize="15" textAnchor="middle" className="fill-foreground">Moments de vie</text>
          <Punaise x={85} className="fill-vie-ecole" />
        </g>
      </g>

      {/* Étoile */}
      <g className="piece-svg origin-top animate-balance" style={{ animationDelay: "-0.8s", animationDuration: "4s" }}>
        <g transform="translate(40 214) rotate(-7)" className={ombre}>
          <rect width="96" height="96" rx="6" className="fill-secondary" />
          <g transform="translate(28 28) scale(1.67)" fill="none" className="stroke-foreground" strokeWidth="2" strokeLinejoin="round">
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
          </g>
          <Punaise x={48} className="fill-cycle-primaire" />
        </g>
      </g>

      {/* Petit mot */}
      <g className="piece-svg origin-top animate-balance" style={{ animationDelay: "-2.2s", animationDuration: "4.8s" }}>
        <g transform="translate(336 214) rotate(5)" className={ombre}>
          <rect width="110" height="92" rx="6" className="fill-cycle-periscolaire-soft" />
          <Lignes x={12} y={30} largeurs={[86, 70, 48]} className="fill-cycle-periscolaire-strong" />
          <Punaise x={55} className="fill-cycle-maternelle" />
        </g>
      </g>
    </svg>
  );
}

/* ─── Contact : la lettre et la carte (adresse et horaires réels de config/site.ts) ─── */

export function LettreCarte() {
  const { addressShort, hours } = siteConfig.contact;
  return (
    <div aria-hidden="true" className="relative lg:h-[400px]">
      <svg viewBox="0 0 300 220" focusable="false" className="mx-auto block w-[220px] lg:absolute lg:top-2.5 lg:left-0 lg:mx-0 lg:w-[300px]">
        <path d="M24,92 L150,22 L276,92 Z" className="fill-secondary-soft stroke-primary" strokeWidth="3" strokeLinejoin="round" />
        <g className="animate-lettre">
          <g transform="rotate(-3 150 90)">
            <rect x="56" y="14" width="188" height="150" rx="8" className="fill-white stroke-border" strokeWidth="2" />
            <g strokeLinecap="round" strokeWidth="6">
              <path d="M78 42 H170" className="stroke-cycle-primaire" />
              <path d="M78 62 H222" className="stroke-border" />
              <path d="M78 80 H210" className="stroke-border" />
              <path d="M78 98 H190" className="stroke-border" />
            </g>
            <rect x="196" y="28" width="34" height="40" rx="3" className="fill-secondary-soft stroke-secondary" strokeWidth="2" strokeDasharray="4 3" />
            <circle cx="213" cy="48" r="9" className="fill-secondary" />
          </g>
        </g>
        <path d="M24,92 L150,160 L276,92 L276,204 Q276,214 266,214 L34,214 Q24,214 24,204 Z" className="fill-white stroke-primary" strokeWidth="3" strokeLinejoin="round" />
        <path d="M24,206 L118,144 M276,206 L182,144" className="stroke-primary" strokeWidth="3" strokeLinecap="round" opacity=".35" />
        <g className="piece-svg origin-center animate-rebond">
          <circle cx="150" cy="160" r="15" className="fill-cycle-maternelle" />
          <path d="M144 160 l4 4 8 -8" className="stroke-foreground" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>

      <svg viewBox="0 0 240 160" focusable="false" className="absolute top-[150px] left-[150px] hidden h-40 w-60 lg:block">
        <path d="M10,20 C80,40 60,130 170,120 S230,150 236,158" fill="none" className="animate-pointilles stroke-primary" strokeWidth="3" strokeDasharray="2 11" strokeLinecap="round" />
      </svg>

      <div className="relative -mt-2.5 overflow-hidden rounded-carte bg-white text-foreground shadow-[0_16px_32px_rgb(16_90_147/0.18)] lg:absolute lg:right-0 lg:bottom-1.5 lg:mt-0 lg:w-[280px] lg:rotate-2 lg:animate-flotte lg:[animation-duration:6s]">
        <svg viewBox="0 0 280 92" preserveAspectRatio="xMidYMid slice" focusable="false" className="block h-[92px] w-full">
          <rect width="280" height="92" className="fill-cycle-periscolaire-soft" />
          <path d="M-10 70 C60 50 120 80 190 40 S270 20 300 30" className="stroke-white" strokeWidth="12" fill="none" />
          <path d="M120 -10 L150 100" className="stroke-white" strokeWidth="8" />
          <rect x="30" y="12" width="40" height="26" rx="4" className="fill-secondary-soft" />
          <rect x="200" y="56" width="46" height="26" rx="4" className="fill-surface-ciel" />
          <g className="piece-svg origin-bottom animate-rebond">
            <path d="M160 52c0 10-12 20-12 20s-12-10-12-20a12 12 0 0 1 24 0z" className="fill-cycle-maternelle" />
            <circle cx="148" cy="51" r="4.5" className="fill-white" />
          </g>
        </svg>
        <div className="px-4 pt-3.5 pb-4">
          <p className="flex items-center gap-2 font-heading text-base font-bold">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-surface-ciel text-cycle-primaire-strong">
              <MapPin className="h-4 w-4" />
            </span>
            {addressShort}
          </p>
          {hours.map((h, i) => (
            <p key={h.label} className="mt-2 flex justify-between gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                {i === 0 ? <Clock className="h-3.5 w-3.5" /> : <span className="w-3.5" />}
                {h.label}
              </span>
              <strong className="font-semibold text-foreground">{h.value}</strong>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
