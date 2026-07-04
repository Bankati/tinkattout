/**
 * PRD 5.9 — Politique de confidentialité (RGPD).
 */
import { Container } from "@/components/site/Container";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Politique de confidentialité — École Tinka-Tout",
  description: "Traitement des données personnelles et cookies.",
};

export default function PrivacyPage() {
  return (
    <section className="py-12 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-serif text-4xl font-bold tracking-tight">
          Politique de confidentialité
        </h1>
        <div className="mt-8 space-y-6 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Responsable du traitement :</strong> {siteConfig.name}.
            Contact : {siteConfig.contact.email}.
          </p>
          <p>
            <strong className="text-foreground">Données collectées :</strong> dans le cadre de la pré-inscription et du formulaire de contact, nous recueillons les noms, prénoms, adresses e-mail, numéros de téléphone et adresses postales que vous nous communiquez. Ces données sont utilisées uniquement pour traiter votre demande et vous recontacter.
          </p>
          <p>
            <strong className="text-foreground">Base légale :</strong> exécution de la relation précontractuelle (pré-inscription) et intérêt légitime (réponse aux messages).
          </p>
          <p>
            <strong className="text-foreground">Durée de conservation :</strong> les données sont conservées le temps nécessaire au traitement de la demande et, le cas échéant, à la gestion de la scolarité, puis archivées ou supprimées conformément à la réglementation.
          </p>
          <p>
            <strong className="text-foreground">Vos droits :</strong> accès, rectification, effacement, limitation du traitement, portabilité et opposition. Vous pouvez exercer ces droits en nous contactant à {siteConfig.contact.email}. Vous disposez du droit d&apos;introduire une réclamation auprès de la CNIL.
          </p>
          <p>
            <strong className="text-foreground">Cookies :</strong> le site peut utiliser des cookies techniques nécessaires au fonctionnement. Aucune publicité ciblée n&apos;est mise en œuvre via des cookies tiers sans votre consentement.
          </p>
        </div>
      </Container>
    </section>
  );
}
