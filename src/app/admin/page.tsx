import Link from "next/link";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboardPage() {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  let totalReg = 0, newReg = 0, pendingReg = 0, totalContacts = 0;
  let lastRegs: Awaited<ReturnType<typeof prisma.registration.findMany>> = [];
  let lastContacts: Awaited<ReturnType<typeof prisma.contact.findMany>> = [];

  try {
    [totalReg, newReg, pendingReg, lastRegs, lastContacts, totalContacts] = await Promise.all([
      prisma.registration.count(),
      prisma.registration.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.registration.count({ where: { status: "PENDING" } }),
      prisma.registration.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.contact.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.contact.count(),
    ]);
  } catch {
    // Base de données non connectée (Supabase non configuré)
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inscriptions totales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalReg}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Nouvelles (7 jours)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{newReg}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pendingReg}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Messages reçus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalContacts}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Dernières inscriptions</CardTitle>
            <Link href="/admin/inscriptions" className="text-sm font-medium text-primary hover:underline">
              Voir tout
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lastRegs.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune inscription.</p>
              ) : (
                lastRegs.map((r) => (
                  <div key={r.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{r.studentName}</p>
                      <p className="text-xs text-muted-foreground">{r.gradeLevel} · {r.parentName}</p>
                    </div>
                    <Badge variant={r.status === "PENDING" ? "outline" : "secondary"}>{r.status}</Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Derniers messages</CardTitle>
            <Link href="/admin/messages" className="text-sm font-medium text-primary hover:underline">
              Voir tout
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lastContacts.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun message.</p>
              ) : (
                lastContacts.map((c) => (
                  <div key={c.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">{c.subject || c.message.slice(0, 40)}…</p>
                    </div>
                    {c.repliedAt && <span className="text-xs text-muted-foreground">Répondu</span>}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
