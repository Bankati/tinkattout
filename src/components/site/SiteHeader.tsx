"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { GraduationCap, Phone, Mail, MapPin, Menu, X } from "lucide-react";

export function SiteHeader({ className }: Readonly<{ className?: string }>) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header className={cn("sticky top-0 z-50 w-full", className)}>

      {/* ── Top bar ─────────────────────────────────────── */}
      <div className="hidden md:block bg-primary text-white text-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 opacity-90">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {siteConfig.contact.address}
            </span>
            <span className="flex items-center gap-1.5 opacity-90">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              {siteConfig.contact.phone}
            </span>
          </div>
          <span className="flex items-center gap-1.5 opacity-90">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            {siteConfig.contact.email}
          </span>
        </div>
      </div>

      {/* ── Main nav ─────────────────────────────────────── */}
      <div
        className={cn(
          "w-full bg-white transition-shadow duration-300",
          scrolled ? "shadow-md" : "shadow-sm"
        )}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white group-hover:bg-primary/90 transition-colors">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="leading-tight">
              <div className="font-heading text-lg font-bold text-foreground leading-none">
                École <span className="text-primary">Tinka-Tout</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Lomé · Togo
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            {siteConfig.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors rounded-sm",
                    "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full",
                    "after:bg-secondary after:transition-all after:duration-300",
                    active
                      ? "text-primary after:scale-x-100"
                      : "text-foreground/80 hover:text-primary after:scale-x-0 hover:after:scale-x-100"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/inscription"
              className="hidden md:inline-flex h-10 items-center justify-center rounded-sm bg-primary px-5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-primary/85 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Pré-inscrire
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-sm text-foreground hover:bg-muted transition-colors"
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ──────────────────────────────────── */}
      <div
        className={cn(
          "lg:hidden overflow-hidden bg-white border-t border-border transition-all duration-300 ease-in-out shadow-lg",
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-sm px-4 py-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="pt-3 pb-1">
            <Link
              href="/inscription"
              className="flex h-12 w-full items-center justify-center rounded-sm bg-primary px-6 text-sm font-bold uppercase tracking-widest text-white hover:bg-primary/90 transition-colors"
            >
              Pré-inscrire mon enfant
            </Link>
          </div>

          <div className="flex flex-col gap-2 pt-2 pb-1 text-xs text-muted-foreground border-t border-border">
            <span className="flex items-center gap-2 pt-2">
              <Phone className="h-3.5 w-3.5 text-primary" /> {siteConfig.contact.phone}
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-primary" /> {siteConfig.contact.email}
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
