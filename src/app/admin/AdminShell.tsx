"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, Settings, Users, LogOut } from "lucide-react";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r border-border bg-card sm:flex">
        <div className="flex h-14 items-center border-b border-border px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <span className="font-serif text-lg">Tinka-Tout Admin</span>
          </Link>
        </div>
        <nav className="grid flex-1 items-start gap-1 px-2 py-4 text-sm font-medium lg:px-4">
          <Link
            href="/admin"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
              pathname === "/admin" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Tableau de bord
          </Link>
          <Link
            href="/admin/inscriptions"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
              pathname.startsWith("/admin/inscriptions") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Users className="h-4 w-4" />
            Inscriptions
          </Link>
          <Link
            href="/admin/messages"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
              pathname.startsWith("/admin/messages") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Messages
          </Link>
          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
              pathname.startsWith("/admin/settings") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Settings className="h-4 w-4" />
            Paramètres
          </Link>
        </nav>
        <div className="p-4">
          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </form>
        </div>
      </aside>
      <div className="flex flex-1 flex-col sm:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border bg-card px-4 sm:px-6">
          <h1 className="text-lg font-semibold">Administration</h1>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
