/**
 * PRD 5.10+ — Connexion admin (mot de passe + session).
 */
import { redirect } from "next/navigation";
import { AdminLoginForm } from "./AdminLoginForm";
import { getSession } from "@/lib/auth";

export default async function AdminLoginPage() {
  const ok = await getSession();
  if (ok) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-lg">
        <h1 className="font-serif text-2xl font-bold text-center">Administration</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Connectez-vous pour accéder au back-office.
        </p>
        <AdminLoginForm />
      </div>
    </div>
  );
}
