"use client";

import { ChevronDown, GraduationCap } from "lucide-react";

type Item = { level: string; objectifs: string; matieres: string };

export function ClassesAccordion({ items }: { items: Item[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.level} className="group rounded-sm border border-border bg-white shadow-sm overflow-hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-open:bg-primary group-open:text-white transition-colors">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span className="font-heading text-lg font-bold text-foreground group-open:text-primary transition-colors">{item.level}</span>
            </div>
            <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
          </summary>

          <div className="border-t border-border px-6 pb-6 pt-5 bg-muted/20">
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-1.5">Objectifs</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.objectifs}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-1.5">Matières</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.matieres}</p>
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
