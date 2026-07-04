"use client";

import { useActionState } from "react";
import { createInscription } from "@/app/actions";
import { User, Users } from "lucide-react";

const inputClass =
  "flex h-11 w-full rounded-sm border border-input bg-white px-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-foreground/80";

function formAction(_: unknown, formData: FormData) {
  return createInscription(formData);
}

export function InscriptionForm() {
  const [state, submitAction, isPending] = useActionState(formAction, null);

  return (
    <form action={submitAction} className="space-y-8">
      {state?.error && (
        <div className="rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      {/* Section Élève */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-4 w-4" />
          </div>
          <h2 className="font-heading text-base font-bold text-foreground">Informations élève</h2>
        </div>

        <div>
          <label htmlFor="studentName" className={labelClass}>Nom et prénom de l&apos;élève</label>
          <input id="studentName" name="studentName" className={inputClass} required placeholder="Kossi Mensah" />
        </div>

        <div>
          <label htmlFor="gradeLevel" className={labelClass}>Classe demandée</label>
          <select id="gradeLevel" name="gradeLevel" className={inputClass} required>
            <option value="">— Sélectionner un niveau —</option>
            <optgroup label="Maternelle">
              <option value="Petite Section">Petite Section (PS)</option>
              <option value="Moyenne Section">Moyenne Section (MS)</option>
              <option value="Grande Section">Grande Section (GS)</option>
            </optgroup>
            <optgroup label="Primaire">
              <option value="CP">CP</option>
              <option value="CE1">CE1</option>
              <option value="CE2">CE2</option>
              <option value="CM1">CM1</option>
              <option value="CM2">CM2</option>
            </optgroup>
          </select>
        </div>
      </div>

      {/* Section Parent */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Users className="h-4 w-4" />
          </div>
          <h2 className="font-heading text-base font-bold text-foreground">Informations parent / tuteur</h2>
        </div>

        <div>
          <label htmlFor="parentName" className={labelClass}>Nom du parent ou tuteur</label>
          <input id="parentName" name="parentName" className={inputClass} required placeholder="Ama Mensah" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>Adresse email</label>
            <input id="email" name="email" type="email" className={inputClass} required placeholder="ama@exemple.tg" />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Téléphone</label>
            <input id="phone" name="phone" type="tel" className={inputClass} required placeholder="+228 90 00 00 00" />
          </div>
        </div>
      </div>

      {/* Consentement RGPD */}
      <div className="rounded-sm border border-border bg-muted/30 px-5 py-4 text-xs text-muted-foreground leading-relaxed">
        En soumettant ce formulaire, vous acceptez que vos données soient traitées
        dans le seul but de gérer votre demande de pré-inscription.
        Elles ne seront pas transmises à des tiers.
        Vous pouvez exercer vos droits (accès, rectification, suppression) en nous contactant.
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-13 w-full items-center justify-center rounded-sm bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-md transition-all hover:bg-primary/85 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Envoi en cours…" : "Soumettre la pré-inscription"}
      </button>
    </form>
  );
}
