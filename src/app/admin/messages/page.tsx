import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageRow } from "./MessageRow";

export default async function AdminMessagesPage() {
  let contacts: Awaited<ReturnType<typeof prisma.contact.findMany>> = [];
  try {
    contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // Base de données non connectée (Supabase non configuré)
  }

  return (
    <div className="space-y-6">
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
