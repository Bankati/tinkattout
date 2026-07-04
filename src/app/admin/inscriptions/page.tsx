import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { InscriptionsFilters } from "./InscriptionsFilters";
import { InscriptionsTable } from "./InscriptionsTable";
import { ExportCsvButton } from "./ExportCsvButton";

export default async function AdminInscriptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; classe?: string }>;
}) {
  const { status, classe } = await searchParams;
  const where: { status?: string; gradeLevel?: string } = {};
  if (status) where.status = status;
  if (classe) where.gradeLevel = classe;

  let registrations: Awaited<ReturnType<typeof prisma.registration.findMany>> = [];
  try {
    registrations = await prisma.registration.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // Base de données non connectée (Supabase non configuré)
  }

  return (
    <div className="space-y-6">
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
