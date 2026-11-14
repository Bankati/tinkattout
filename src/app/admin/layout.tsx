import type { Metadata } from "next";
import { AdminShell } from "./AdminShell";

/** Espace privé : jamais dans Google. */
export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
