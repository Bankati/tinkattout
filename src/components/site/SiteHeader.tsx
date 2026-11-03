"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { siteConfig, phoneHref, emailHref } from "@/config/site";
import { cn } from "@/lib/utils";
import { GraduationCap, Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { boutonOr, tailleBouton } from "@/components/ui/palette";

const MOBILE_MENU_ID = "menu-mobile";

export function SiteHeader({ className }: Readonly<{ className?: string }>) {
  const pathname = usePathname();
  // Le menu mobile est « ouvert pour une page donnée » : dès que l'URL change,
  // il se referme tout seul, sans setState dans un useEffect.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const mobileOpen = openedOn === pathname;
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setOpenedOn(null);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape" && mobileOpen) {
      closeMenu();
      toggleRef.current?.focus();
    }
  }

  return (
    <header className={cn("sticky top-0 z-50 w-full", className)} onKeyDown={onKeyDown}>

      {/* Bande « crayons » : une couleur par usage (Maternelle, Primaire, Périscolaire, Vie de l'école) */}
      <div className="bande-crayons" aria-hidden="true" />

      {/* ── Top bar ─────────────────────────────────────── */}
      <div className="hidden md:block bg-primary text-white text-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {siteConfig.contact.addressShort}
            </span>
            <a href={phoneHref} className="flex items-center gap-1.5 hover:text-secondary transition-colors">
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {siteConfig.contact.phone}
            </a>
          </div>
          <a href={emailHref} className="flex items-center gap-1.5 hover:text-secondary transition-colors">
            <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {siteConfig.contact.email}
          </a>
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
          <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="École Tinka-Tout — accueil">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-secondary group-hover:bg-primary/90 transition-colors">
              <GraduationCap className="h-6 w-6" aria-hidden="true" />
              <span aria-hidden="true" className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-cycle-maternelle ring-2 ring-white" />
            </div>
            <div className="leading-tight">
              <div className="font-heading text-lg font-bold text-foreground leading-none">
                École <span className="text-primary">Tinka-Tout</span>
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
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
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full px-3.5 text-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "bg-primary/10 font-semibold text-primary"
                      : "font-medium text-foreground/80 hover:bg-muted hover:text-primary"
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
              className={`${boutonOr} ${tailleBouton.sm} max-md:hidden`}
            >
              Pré-inscrire
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpenedOn((v) => (v === pathname ? null : pathname))}
              className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
              aria-controls={MOBILE_MENU_ID}
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ──────────────────────────────────── */}
      {/* Fermé : inert + invisible, donc ni tabulable ni lu par les lecteurs d'écran */}
      <div
        id={MOBILE_MENU_ID}
        inert={mobileOpen ? undefined : true}
        className={cn(
          "lg:hidden overflow-hidden bg-white border-t border-border transition-all duration-300 ease-in-out shadow-lg",
          mobileOpen ? "visible max-h-[600px] opacity-100" : "invisible max-h-0 opacity-0"
        )}
      >
        <nav className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6" aria-label="Navigation mobile">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center rounded-full px-4 py-3 text-sm font-medium transition-colors",
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
              onClick={closeMenu}
              className={`${boutonOr} ${tailleBouton.md} w-full`}
            >
              Pré-inscrire mon enfant
            </Link>
          </div>

          <div className="flex flex-col pt-2 pb-1 text-sm text-muted-foreground border-t border-border">
            <a href={phoneHref} className="flex min-h-11 items-center gap-2 hover:text-primary transition-colors">
              <Phone className="h-4 w-4 text-primary" aria-hidden="true" /> {siteConfig.contact.phone}
            </a>
            <a href={emailHref} className="flex min-h-11 items-center gap-2 break-all hover:text-primary transition-colors">
              <Mail className="h-4 w-4 text-primary" aria-hidden="true" /> {siteConfig.contact.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
