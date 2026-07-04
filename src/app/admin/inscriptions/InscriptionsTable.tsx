"use client";
import { updateRegistrationStatus } from "./actions";
import { Badge } from "@/components/ui/badge";
import type { Registration } from "@prisma/client";

export function InscriptionsTable({ registrations }: { registrations: Registration[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="p-3 text-left font-medium">Élève</th>
            <th className="p-3 text-left font-medium">Classe</th>
            <th className="p-3 text-left font-medium">Parent</th>
            <th className="p-3 text-left font-medium">Contact</th>
            <th className="p-3 text-left font-medium">Date</th>
            <th className="p-3 text-left font-medium">Statut</th>
            <th className="p-3 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((r) => (
            <tr key={r.id} className="border-b border-border">
              <td className="p-3 font-medium">{r.studentName}</td>
              <td className="p-3">{r.gradeLevel}</td>
              <td className="p-3">{r.parentName}</td>
              <td className="p-3">
                <a href={`mailto:${r.email}`} className="text-primary hover:underline">{r.email}</a>
                <br />
                <span className="text-muted-foreground">{r.phone}</span>
              </td>
              <td className="p-3 text-muted-foreground">{new Date(r.createdAt).toLocaleDateString("fr-FR")}</td>
              <td className="p-3">
                <Badge variant={r.status === "PENDING" ? "outline" : "secondary"}>{r.status}</Badge>
              </td>
              <td className="p-3 text-right">
                <form action={updateRegistrationStatus} className="inline-flex gap-1">
                  <input type="hidden" name="id" value={r.id} />
                  <select
                    name="status"
                    defaultValue={r.status}
                    onChange={(e) => e.target.form?.requestSubmit()}
                    className="h-8 rounded border border-input bg-background px-2 text-xs"
                  >
                    <option value="PENDING">En attente</option>
                    <option value="APPROVED">Approuvé</option>
                    <option value="REJECTED">Refusé</option>
                  </select>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {registrations.length === 0 && <p className="p-6 text-center text-muted-foreground">Aucune inscription.</p>}
    </div>
  );
}
