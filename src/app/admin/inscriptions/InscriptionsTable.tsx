"use client";
import { updateRegistrationStatus } from "./actions";
import { Badge } from "@/components/ui/badge";
import { REGISTRATION_STATUSES, type RegistrationStatus } from "@/config/school";
import type { Registration } from "@prisma/client";

const STATUS_VARIANT: Record<RegistrationStatus, "outline" | "secondary" | "destructive"> = {
  PENDING: "outline",
  APPROVED: "secondary",
  REJECTED: "destructive",
};

function statusLabel(status: string) {
  return REGISTRATION_STATUSES[status as RegistrationStatus] ?? status;
}

export function InscriptionsTable({ registrations }: { registrations: Registration[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <caption className="sr-only">Liste des demandes de pré-inscription</caption>
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th scope="col" className="p-3 text-left font-medium">Élève</th>
            <th scope="col" className="p-3 text-left font-medium">Classe</th>
            <th scope="col" className="p-3 text-left font-medium">Parent</th>
            <th scope="col" className="p-3 text-left font-medium">Contact</th>
            <th scope="col" className="p-3 text-left font-medium">Date</th>
            <th scope="col" className="p-3 text-left font-medium">Statut</th>
            <th scope="col" className="p-3 text-right font-medium">Changer le statut</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((r) => {
            const selectId = "statut-" + r.id;
            return (
              <tr key={r.id} className="border-b border-border">
                <td className="p-3 font-medium">{r.studentName}</td>
                <td className="p-3">{r.gradeLevel}</td>
                <td className="p-3">{r.parentName}</td>
                <td className="p-3">
                  <a href={"mailto:" + r.email} className="text-primary hover:underline break-all">{r.email}</a>
                  <br />
                  <a href={"tel:" + r.phone.replace(/\s+/g, "")} className="text-muted-foreground hover:underline">{r.phone}</a>
                </td>
                <td className="p-3 text-muted-foreground">{new Date(r.createdAt).toLocaleDateString("fr-FR")}</td>
                <td className="p-3">
                  <Badge variant={STATUS_VARIANT[r.status as RegistrationStatus] ?? "outline"}>
                    {statusLabel(r.status)}
                  </Badge>
                </td>
                <td className="p-3 text-right">
                  {/* Pas d'envoi automatique au changement : au clavier, les flèches
                      modifieraient le statut sans le vouloir. */}
                  <form action={updateRegistrationStatus} className="inline-flex items-center gap-2">
                    <input type="hidden" name="id" value={r.id} />
                    <label htmlFor={selectId} className="sr-only">
                      Nouveau statut pour {r.studentName}
                    </label>
                    <select
                      id={selectId}
                      name="status"
                      defaultValue={r.status}
                      className="h-11 rounded border border-input bg-background px-2 text-sm"
                    >
                      {Object.entries(REGISTRATION_STATUSES).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="h-11 rounded border border-input bg-background px-3 text-sm font-medium hover:bg-muted"
                    >
                      Enregistrer<span className="sr-only"> le statut de {r.studentName}</span>
                    </button>
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {registrations.length === 0 && <p className="p-6 text-center text-muted-foreground">Aucune inscription.</p>}
    </div>
  );
}
