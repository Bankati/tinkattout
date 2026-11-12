"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, Settings, Users, LogOut } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Tableau de bord", short: "Accueil", icon: LayoutDashboard, exact: true },
  { href: "/admin/inscriptions", label: "Inscriptions", short: "Inscriptions", icon: Users, exact: false },
  { href: "/admin/messages", label: "Messages", short: "Messages", icon: MessageSquare, exact: false },
  { href: "/admin/settings", label: "Paramètres", short: "Paramètres", icon: Settings, exact: false },
] as const;

function LogoutButton({ className }: { className: string }) {
  return (
    <form action="/admin/logout" method="post">
      <button type="submit" className={className}>
        <LogOut className="h-4 w-4" aria-hidden="true" />
        Déconnexion
      </button>
    </form>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <>{children}</>;
  }

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      {/* Barre latérale : tablette et ordinateur */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r border-border bg-card sm:flex">
        <div className="flex h-14 items-center border-b border-border px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin" className="flex min-h-11 items-center gap-2 font-semibold">
            <span className="font-heading text-lg">Tinka-Tout Admin</span>
          </Link>
        </div>
        <nav aria-label="Administration" className="grid flex-1 content-start gap-1 px-2 py-4 text-sm font-medium lg:px-4">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 transition ${
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4">
          <LogoutButton className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition hover:text-destructive" />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col sm:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-card">
          <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
            <h1 className="text-lg font-semibold">Administration</h1>
            {/* Téléphone : la barre latérale est masquée, la déconnexion reste accessible ici */}
            <div className="sm:hidden">
              <LogoutButton className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-input px-3 text-sm text-muted-foreground transition hover:text-destructive" />
            </div>
          </div>
          {/* Téléphone : navigation en onglets défilants */}
          <nav aria-label="Administration" className="sm:hidden overflow-x-auto border-t border-border">
            <ul className="flex min-w-max gap-1 px-2 py-1">
              {NAV.map(({ href, short, icon: Icon, exact }) => {
                const active = isActive(href, exact);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${
                        active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {short}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
