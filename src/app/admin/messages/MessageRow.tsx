"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { markContactReplied } from "./actions";
import type { Contact } from "@prisma/client";

export function MessageRow({ contact }: { contact: Contact }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left hover:bg-muted/50"
      >
        <div className="min-w-0 flex-1">
          <p className="font-medium">{contact.name}</p>
          <p className="truncate text-sm text-muted-foreground">{contact.subject || contact.email}</p>
        </div>
        <div className="flex items-center gap-2">
          {contact.repliedAt && (
            <span className="rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">Répondu</span>
          )}
          <span className="text-xs text-muted-foreground">
            {new Date(contact.createdAt).toLocaleDateString("fr-FR")}
          </span>
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>
      {open && (
        <div className="border-t border-border bg-muted/20 px-4 pb-4 pt-2">
          <p className="text-sm">
            <strong>Email : </strong>
            <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a>
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{contact.message}</p>
          {!contact.repliedAt && (
            <form action={markContactReplied} className="mt-3">
              <input type="hidden" name="id" value={contact.id} />
              <button type="submit" className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm hover:bg-muted">
                Marquer comme répondu
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
