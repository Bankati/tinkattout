import { connection } from "next/server";
import { GRADE_LEVEL_VALUES, REGISTRATION_STATUSES } from "@/config/school";
import { requireAdmin } from "@/lib/auth";
import { logServerError, prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { InscriptionsFilters } from "./InscriptionsFilters";
import { InscriptionsTable } from "./InscriptionsTable";
import { ExportCsvButton } from "./ExportCsvButton";

const KNOWN_GRADE_LEVELS: readonly string[] = GRADE_LEVEL_VALUES;

export default async function AdminInscriptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[]; classe?: string | string[] }>;
}) {
  await requireAdmin();
  await connection();

  const { status, classe } = await searchParams;
  // Filtres limités aux valeurs connues : une URL bricolée ne part pas telle quelle vers la base.
  const where: { status?: string; gradeLevel?: string } = {};
  if (typeof status === "string" && Object.hasOwn(REGISTRATION_STATUSES, status)) where.status = status;
  if (typeof classe === "string" && KNOWN_GRADE_LEVELS.includes(classe)) where.gradeLevel = classe;

  let registrations: Awaited<ReturnType<typeof prisma.registration.findMany>> = [];
  let dbUnavailable = false;
  try {
    registrations = await prisma.registration.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    dbUnavailable = true;
    logServerError("admin/inscriptions", error);
  }

  return (
    <div className="space-y-6">
      {dbUnavailable && (
        <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          Base de données indisponible : la liste des inscriptions ne peut pas être affichée. Réessayez dans quelques instants.
        </div>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-serif text-2xl font-bold">Inscriptions</h2>
        <div className="flex gap-2">
          <InscriptionsFilters />
          <ExportCsvButton data={registrations} />
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <InscriptionsTable registrations={registrations} />
        </CardContent>
      </Card>
    </div>
  );
}
