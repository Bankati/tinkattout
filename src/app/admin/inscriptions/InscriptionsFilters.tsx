"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GRADE_LEVELS, REGISTRATION_STATUSES } from "@/config/school";

const CYCLES = Array.from(new Set(GRADE_LEVELS.map((g) => g.cycle)));

const selectClass =
  "h-11 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function InscriptionsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setFilter(key: string, value: string) {
    const p = new URLSearchParams(searchParams.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    router.push(`/admin/inscriptions?${p.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="Filtrer les inscriptions">
      <div className="flex flex-col gap-1">
        <label htmlFor="filtre-statut" className="text-xs font-medium text-muted-foreground">
          Statut
        </label>
        <select
          id="filtre-statut"
          value={searchParams.get("status") || ""}
          onChange={(e) => setFilter("status", e.target.value)}
          className={selectClass}
        >
          <option value="">Tous les statuts</option>
          {Object.entries(REGISTRATION_STATUSES).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="filtre-classe" className="text-xs font-medium text-muted-foreground">
          Classe
        </label>
        <select
          id="filtre-classe"
          value={searchParams.get("classe") || ""}
          onChange={(e) => setFilter("classe", e.target.value)}
          className={selectClass}
        >
          <option value="">Toutes les classes</option>
          {CYCLES.map((cycle) => (
            <optgroup key={cycle} label={cycle}>
              {GRADE_LEVELS.filter((g) => g.cycle === cycle).map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
}
