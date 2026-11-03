"use client";

import { useActionState, useEffect, useRef } from "react";
import { createContact } from "@/app/actions";
import { CheckCircle2, Send } from "lucide-react";
import { boutonMarine, tailleBouton } from "@/components/ui/palette";

/* Champ encadré (contour border-input : 3,57:1 sur blanc), comme le formulaire de pré-inscription. */
const inputClass =
  "flex min-h-11 w-full rounded-lg border-[1.5px] border-input bg-white px-4 py-2.5 text-base sm:text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors";

const labelClass =
  "block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1";

type FormState = {
  success?: boolean;
  error?: string;
  values?: Record<string, string>;
  /** Numéro de la tentative : sert de clé pour remonter le formulaire avec les valeurs saisies. */
  attempt: number;
} | null;

/** Contrat serveur : erreur = { error, values } ; succès = { success: true }. */
async function formAction(prev: FormState, formData: FormData): Promise<FormState> {
  const result: unknown = await createContact(formData);
  const r = (result && typeof result === "object" ? result : {}) as {
    success?: unknown;
    error?: unknown;
    values?: unknown;
  };
  return {
    success: r.success === true,
    error: typeof r.error === "string" ? r.error : undefined,
    values: r.values && typeof r.values === "object" ? (r.values as Record<string, string>) : undefined,
    attempt: (prev?.attempt ?? 0) + 1,
  };
}

export function ContactForm() {
  const [state, submitAction, isPending] = useActionState(formAction, null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const values = state?.values ?? {};

  useEffect(() => {
    if (state?.success) successRef.current?.focus();
    else if (state?.error) errorRef.current?.focus();
  }, [state]);

  if (state?.success) {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="flex flex-col items-center justify-center py-16 px-6 text-center focus:outline-none"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cycle-periscolaire-soft text-accent mb-4">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <p className="font-heading text-lg font-bold text-foreground">Message envoyé !</p>
        <p className="mt-2 text-sm text-muted-foreground max-w-xs">
          Merci pour votre message. Notre équipe vous répondra sous 48h ouvrées.
        </p>
      </div>
    );
  }

  return (
    // Clé = numéro de tentative : les champs reprennent les valeurs renvoyées par le serveur.
    <form key={state?.attempt ?? 0} action={submitAction} className="relative space-y-6">
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
        <label htmlFor="contact-website">Ne pas remplir ce champ</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>

      {/* Nom + Email */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Votre nom
          </label>
          <input
            id="contact-name"
            name="name"
            className={inputClass}
            required
            autoComplete="name"
            autoCapitalize="words"
            defaultValue={values.name}
            placeholder="Ex : Kofi Mensah"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Votre email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            className={inputClass}
            required
            defaultValue={values.email}
            placeholder="vous@exemple.tg"
          />
        </div>
      </div>

      {/* Sujet */}
      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          Sujet{" "}
          <span className="font-normal normal-case tracking-normal">
            (optionnel)
          </span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          className={inputClass}
          autoComplete="off"
          defaultValue={values.subject}
          placeholder="Objet de votre message"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className={inputClass + " resize-none h-auto"}
          required
          defaultValue={values.message}
          placeholder="Écrivez votre message ici…"
        />
      </div>

      {/* Bouton */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className={`${boutonMarine} ${tailleBouton.md} group`}
        >
          <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          {isPending ? "Envoi en cours…" : "Envoyer le message"}
        </button>
        <p className="sr-only" aria-live="polite">{isPending ? "Envoi du message en cours" : ""}</p>
      </div>
    </form>
  );
}
