import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Fil d'Ariane « Accueil / Page » des bandeaux.
 * Sur marine : blanc 80 % (7,91:1) et page en or ; sur fond clair : gris (5,78:1) et page en or foncé.
 */
export function FilAriane({
  page,
  sur = "marine",
  className,
}: {
  page: string;
  sur?: "marine" | "clair";
  className?: string;
}) {
  const marine = sur === "marine";
  return (
    <nav aria-label="Fil d'Ariane" className={cn("text-xs", marine ? "text-white/80" : "text-muted-foreground", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            href="/"
            className={cn(
              "inline-flex min-h-11 items-center rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2",
              marine ? "hover:text-white focus-visible:ring-secondary" : "hover:text-foreground focus-visible:ring-ring",
            )}
          >
            Accueil
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className={marine ? "text-secondary" : "font-semibold text-secondary-strong"}>
          {page}
        </li>
      </ol>
    </nav>
  );
}
