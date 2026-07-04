"use client";

import { useRouter, useSearchParams } from "next/navigation";

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
    <div className="flex flex-wrap gap-2">
      <select
        value={searchParams.get("status") || ""}
        onChange={(e) => setFilter("status", e.target.value)}
        className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
      >
        <option value="">Tous les statuts</option>
        <option value="PENDING">En attente</option>
        <option value="APPROVED">Approuvé</option>
        <option value="REJECTED">Refusé</option>
      </select>
      <select
        value={searchParams.get("classe") || ""}
        onChange={(e) => setFilter("classe", e.target.value)}
        className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
      >
        <option value="">Toutes les classes</option>
        <option value="CP">CP</option>
        <option value="CE1">CE1</option>
        <option value="CE2">CE2</option>
        <option value="CM1">CM1</option>
        <option value="CM2">CM2</option>
        <option value="6ème">6ème</option>
      </select>
    </div>
  );
}
