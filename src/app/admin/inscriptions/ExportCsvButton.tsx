"use client";

import type { Registration } from "@prisma/client";
import { REGISTRATION_STATUSES, type RegistrationStatus } from "@/config/school";

// Injection de formule (Excel, LibreOffice) : une cellule qui commence par = + - @ (ou tabulation,
// retour chariot) serait exécutée comme une formule. Le préfixe ' la force en texte.
const FORMULA_START = /^[=+\-@\t\r]/;

function csvCell(value: string): string {
  const safe = FORMULA_START.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

function statusLabel(status: string): string {
  return Object.hasOwn(REGISTRATION_STATUSES, status)
    ? REGISTRATION_STATUSES[status as RegistrationStatus]
    : status;
}

export function ExportCsvButton({ data }: { data: Registration[] }) {
  function download() {
    const headers = ["Élève", "Classe", "Parent", "Email", "Téléphone", "Statut", "Date"];
    const rows = data.map((r) => [
      r.studentName,
      r.gradeLevel,
      r.parentName,
      r.email,
      r.phone,
      statusLabel(r.status),
      new Date(r.createdAt).toLocaleDateString("fr-FR"),
    ]);
    const csv = [headers.join(";"), ...rows.map((row) => row.map(csvCell).join(";"))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inscriptions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={download}
      className="inline-flex h-9 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium hover:bg-muted"
    >
      Exporter CSV
    </button>
  );
}
