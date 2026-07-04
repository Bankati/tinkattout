import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
} from "lucide-react";

const SocialFacebook  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const SocialX         = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const SocialInstagram = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const SocialYoutube   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white">

      {/* ── Main grid ───────────────────────────────────── */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-16 pb-10 sm:px-6 lg:px-8
                      md:grid-cols-2 xl:grid-cols-4">

        {/* Col 1 – Présentation */}
        <div className="space-y-5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/70 group-hover:bg-primary transition-colors">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-heading text-base font-bold">
                École <span className="text-secondary">Tinka-Tout</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-white/50">
                Lomé · Togo
              </div>
            </div>
          </Link>

          <p className="text-sm text-white/60 leading-relaxed">
            Éducation de qualité de la Maternelle au CM2. Un environnement
            bienveillant qui favorise l&apos;épanouissement et l&apos;excellence
            depuis 2005.
          </p>

          <div className="flex gap-3 pt-1">
            {[
              { Icon: SocialFacebook,  href: "#" },
              { Icon: SocialX,         href: "#" },
              { Icon: SocialInstagram, href: "#" },
              { Icon: SocialYoutube,   href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="flex h-9 w-9 items-center justify-center rounded-sm
                           bg-white/10 text-white/70 transition-all
                           hover:bg-secondary hover:text-white hover:-translate-y-0.5"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 – Liens rapides */}
        <div className="space-y-5">
          <h3 className="gold-underline font-heading text-sm font-bold uppercase tracking-widest text-white">
            Liens Rapides
          </h3>
          <ul className="space-y-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-secondary"
                >
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-secondary" />
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/inscription"
                className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-secondary"
              >
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-secondary" />
                Pré-inscription
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3 – Horaires */}
        <div className="space-y-5">
          <h3 className="gold-underline font-heading text-sm font-bold uppercase tracking-widest text-white">
            Horaires d&apos;Ouverture
          </h3>
          <ul className="space-y-3 text-sm">
            {siteConfig.contact.hours.map((h) => (
              <li key={h.label} className="flex items-start gap-2">
                <Clock className="h-4 w-4 shrink-0 text-secondary mt-0.5" />
                <div>
                  <span className="block font-medium text-white/90">{h.label}</span>
                  <span className="text-white/55">{h.value}</span>
                </div>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <Clock className="h-4 w-4 shrink-0 text-white/30 mt-0.5" />
              <div>
                <span className="block font-medium text-white/50">Dimanche</span>
                <span className="text-white/35">Fermé</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Col 4 – Contact */}
        <div className="space-y-5">
          <h3 className="gold-underline font-heading text-sm font-bold uppercase tracking-widest text-white">
            Nous Contacter
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-secondary mt-0.5" />
              <span className="text-white/60 leading-relaxed">{siteConfig.contact.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-secondary" />
              <a href={`tel:${siteConfig.contact.phone}`} className="text-white/60 hover:text-secondary transition-colors">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-secondary" />
              <a href={`mailto:${siteConfig.contact.email}`} className="text-white/60 hover:text-secondary transition-colors">
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>

          <Link
            href="/inscription"
            className="mt-2 inline-flex h-10 items-center justify-center rounded-sm
                       border border-secondary/60 px-5 text-xs font-bold uppercase tracking-widest
                       text-secondary transition-all hover:bg-secondary hover:text-white hover:border-secondary"
          >
            Pré-inscrire mon enfant
          </Link>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/40 sm:flex-row sm:px-6 lg:px-8">
          <p>© {year} École Tinka-Tout — Tous droits réservés</p>
          <div className="flex gap-4">
            <Link href="/legal"   className="hover:text-white/70 transition-colors">Mentions légales</Link>
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
