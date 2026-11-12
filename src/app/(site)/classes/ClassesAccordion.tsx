"use client";

import { ChevronDown, GraduationCap } from "lucide-react";

type Item = { level: string; objectifs: string; matieres: string };

export function ClassesAccordion({ items }: { items: Item[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.level} className="group rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary">
            <div className="flex items-center gap-4">
              {/* Classes du primaire : couleur du cycle Primaire (ciel), comme sur l'accueil */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cycle-primaire-soft text-cycle-primaire-strong group-open:bg-cycle-primaire-strong group-open:text-white transition-colors">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="font-heading text-lg font-bold text-foreground group-open:text-cycle-primaire-strong transition-colors">{item.level}</span>
            </div>
            <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
          </summary>

          <div className="border-t border-border px-6 pb-6 pt-5 bg-muted/40">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-secondary-strong mb-1.5">Objectifs</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.objectifs}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-secondary-strong mb-1.5">Matières</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.matieres}</p>
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
