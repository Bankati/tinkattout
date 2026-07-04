"use client";

import type { Registration } from "@prisma/client";

export function ExportCsvButton({ data }: { data: Registration[] }) {
  function download() {
    const headers = ["Élève", "Classe", "Parent", "Email", "Téléphone", "Statut", "Date"];
    const rows = data.map((r) => [
      r.studentName,
      r.gradeLevel,
      r.parentName,
      r.email,
      r.phone,
      r.status,
      new Date(r.createdAt).toLocaleDateString("fr-FR"),
    ]);
    const csv = [headers.join(";"), ...rows.map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";"))].join("\n");
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
