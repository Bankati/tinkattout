import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { logServerError, prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageRow } from "./MessageRow";

export default async function AdminMessagesPage() {
  await requireAdmin();
  await connection();

  let contacts: Awaited<ReturnType<typeof prisma.contact.findMany>> = [];
  let dbUnavailable = false;
  try {
    contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    dbUnavailable = true;
    logServerError("admin/messages", error);
  }

  return (
    <div className="space-y-6">
      {dbUnavailable && (
        <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          Base de données indisponible : les messages ne peuvent pas être affichés. Réessayez dans quelques instants.
        </div>
      )}
      <h2 className="font-serif text-2xl font-bold">Messages</h2>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Liste des messages reçus
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {contacts.length === 0 ? (
              <p className="p-6 text-muted-foreground">Aucun message.</p>
            ) : (
              contacts.map((c) => <MessageRow key={c.id} contact={c} />)
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
