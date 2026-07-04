"use client";

import { useActionState } from "react";
import { createContact } from "@/app/actions";
import { CheckCircle2, Send } from "lucide-react";

const inputClass =
  "w-full border-0 border-b-2 border-border bg-transparent pb-2.5 pt-1 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-primary transition-colors";

const labelClass =
  "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 mb-1";

function formAction(_: unknown, formData: FormData) {
  return createContact(formData);
}

export function ContactForm() {
  const [state, submitAction, isPending] = useActionState(formAction, null);

  if (state && "success" in state && state.success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/15 text-secondary mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <p className="font-heading text-lg font-bold text-foreground">Message envoyé !</p>
        <p className="mt-2 text-sm text-muted-foreground max-w-xs">
          Merci pour votre message. Notre équipe vous répondra sous 48h ouvrées.
        </p>
      </div>
    );
  }

  return (
    <form action={submitAction} className="space-y-7">
      {state && "error" in state && state.error && (
        <div className="rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {"error" in state ? state.error : ""}
        </div>
      )}

      {/* Nom + Email */}
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Votre nom
          </label>
          <input
            id="contact-name"
            name="name"
            className={inputClass}
            required
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
            className={inputClass}
            required
            placeholder="vous@exemple.tg"
          />
        </div>
      </div>

      {/* Sujet */}
      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          Sujet{" "}
          <span className="font-normal normal-case tracking-normal text-muted-foreground/50">
            (optionnel)
          </span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          className={inputClass}
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
          placeholder="Écrivez votre message ici…"
        />
      </div>

      {/* Bouton */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2.5 h-12 rounded-sm bg-primary px-8 text-sm font-bold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-primary/85 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          {isPending ? "Envoi en cours…" : "Envoyer le message"}
        </button>
      </div>
    </form>
  );
}
