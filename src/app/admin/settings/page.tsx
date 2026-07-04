import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold">Paramètres</h2>
      <Card>
        <CardHeader>
          <CardTitle>Coordonnées du site</CardTitle>
          <p className="text-sm text-muted-foreground">
            Ces informations sont affichées sur la page Contact et dans le pied de page.
            Pour les modifier, éditez le fichier <code className="rounded bg-muted px-1">src/config/site.ts</code>.
          </p>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>Email :</strong> {siteConfig.contact.email}</p>
          <p><strong>Téléphone :</strong> {siteConfig.contact.phone}</p>
          <p><strong>Adresse :</strong> {siteConfig.contact.address}</p>
        </CardContent>
      </Card>
    </div>
  );
}
