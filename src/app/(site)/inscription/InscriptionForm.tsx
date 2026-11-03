"use client";

import { useActionState, useEffect, useRef } from "react";
import { createInscription } from "@/app/actions";
import { GRADE_LEVELS } from "@/config/school";
import { User, Users } from "lucide-react";
import { boutonOr } from "@/components/ui/palette";

/* Champ encadré : contour border-input (3,57:1 sur blanc), arrondi 12 px comme l'aperçu de Reine. */
const inputClass =
  "flex h-11 w-full rounded-lg border-[1.5px] border-input bg-white px-4 py-2 text-base sm:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-foreground/80";

/** Cycles dans l'ordre de GRADE_LEVELS (Maternelle, puis Primaire). */
const CYCLES = Array.from(new Set(GRADE_LEVELS.map((g) => g.cycle)));

type FormState = {
  error?: string;
  values?: Record<string, string>;
  /** Numéro de la tentative : sert de clé pour remonter le formulaire avec les valeurs saisies. */
  attempt: number;
} | null;

/**
 * Contrat serveur : en cas d'erreur, createInscription renvoie { error, values }.
 * En cas de succès, elle redirige (aucun retour).
 */
async function formAction(prev: FormState, formData: FormData): Promise<FormState> {
  const result: unknown = await createInscription(formData);
  const r = (result && typeof result === "object" ? result : {}) as { error?: unknown; values?: unknown };
  return {
    error: typeof r.error === "string" ? r.error : undefined,
    values: r.values && typeof r.values === "object" ? (r.values as Record<string, string>) : undefined,
    attempt: (prev?.attempt ?? 0) + 1,
  };
}

export function InscriptionForm() {
  const [state, submitAction, isPending] = useActionState(formAction, null);
  const errorRef = useRef<HTMLDivElement>(null);
  const values = state?.values ?? {};

  // Sur téléphone, le message d'erreur est hors écran : on y amène le focus (et la vue).
  useEffect(() => {
    if (state?.error) errorRef.current?.focus();
  }, [state]);

  return (
    // La clé change à chaque réponse : le formulaire est recréé avec les valeurs
    // renvoyées par le serveur, ce qui contourne la réinitialisation automatique
    // de React 19 (notamment sur les <select>).
    <form key={state?.attempt ?? 0} action={submitAction} className="relative space-y-8">
      {state?.error && (
        <div
          ref={errorRef}
          role="alert"
          tabIndex={-1}
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive focus:outline-none focus-visible:ring-2 focus-visible:ring-destructive"
        >
          {state.error}
        </div>
      )}

      {/* Champ piège anti-robots : hors écran, ignoré par les humains et les lecteurs d'écran */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="inscription-website">Ne pas remplir ce champ</label>
        <input id="inscription-website" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>

      {/* Section Élève */}
      <fieldset className="min-w-0 space-y-5">
        <legend className="mb-5 flex w-full items-center gap-3 border-b border-border pb-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-heading text-base font-bold text-foreground">Informations élève</span>
        </legend>

        <div>
          <label htmlFor="studentName" className={labelClass}>Nom et prénom de l&apos;élève</label>
          <input
            id="studentName"
            name="studentName"
            className={inputClass}
            required
            autoComplete="off"
            autoCapitalize="words"
            defaultValue={values.studentName}
            placeholder="Kossi Mensah"
          />
        </div>

        <div>
          <label htmlFor="gradeLevel" className={labelClass}>Classe demandée</label>
          <select id="gradeLevel" name="gradeLevel" className={inputClass} required defaultValue={values.gradeLevel ?? ""}>
            <option value="">— Sélectionner un niveau —</option>
            {CYCLES.map((cycle) => (
              <optgroup key={cycle} label={cycle}>
                {GRADE_LEVELS.filter((g) => g.cycle === cycle).map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </fieldset>

      {/* Section Parent */}
      <fieldset className="min-w-0 space-y-5">
        <legend className="mb-5 flex w-full items-center gap-3 border-b border-border pb-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Users className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-heading text-base font-bold text-foreground">Informations parent / tuteur</span>
        </legend>

        <div>
          <label htmlFor="parentName" className={labelClass}>Nom du parent ou tuteur</label>
          <input
            id="parentName"
            name="parentName"
            className={inputClass}
            required
            autoComplete="name"
            autoCapitalize="words"
            defaultValue={values.parentName}
            placeholder="Ama Mensah"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>Adresse email</label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              className={inputClass}
              required
              defaultValue={values.email}
              placeholder="ama@exemple.tg"
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Téléphone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={inputClass}
              required
              defaultValue={values.phone}
              placeholder="+228 90 00 00 00"
            />
          </div>
        </div>
      </fieldset>

      {/* Consentement RGPD */}
      <div className="rounded-2xl border border-border bg-muted px-5 py-4 text-xs text-muted-foreground leading-relaxed">
        En soumettant ce formulaire, vous acceptez que vos données soient traitées
        dans le seul but de gérer votre demande de pré-inscription.
        Elles ne seront pas transmises à des tiers.
        Vous pouvez exercer vos droits (accès, rectification, suppression) en nous contactant.
      </div>

      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className={`${boutonOr} min-h-13 w-full px-8 py-3.5 text-base`}
      >
        {isPending ? "Envoi en cours…" : "Soumettre la pré-inscription"}
      </button>
      <p className="sr-only" aria-live="polite">{isPending ? "Envoi de la pré-inscription en cours" : ""}</p>
    </form>
  );
}
