"use client";

import { ChevronDown } from "lucide-react";

export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details key={item.question} className="group rounded-sm border border-border bg-white shadow-sm overflow-hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <div className="flex items-center gap-3">
              <span className="font-heading text-xs font-bold text-secondary shrink-0 w-6 text-center">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-semibold text-foreground text-sm sm:text-base group-open:text-primary transition-colors">
                {item.question}
              </span>
            </div>
            <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="border-t border-border px-6 pb-6 pt-5 bg-muted/20">
            <p className="text-sm text-muted-foreground leading-relaxed pl-9">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
