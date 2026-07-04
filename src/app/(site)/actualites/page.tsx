import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowRight, Images } from "lucide-react";
import { Container } from "@/components/site/Container";
import { siteConfig } from "@/config/site";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { prisma } from "@/lib/db";
import { GalerieGrid } from "./GalerieGrid";

export const metadata = {
  title: "Vie de l'École — École Tinka-Tout",
  description: "Actualités, annonces, événements et galerie photos de l'École Tinka-Tout à Lomé.",
};

export default async function VieEcolePage() {
  let news: Awaited<ReturnType<typeof prisma.news.findMany>> = [];
  try {
    news = await prisma.news.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // Base de données non connectée (Supabase non configuré)
  }

  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="relative bg-primary py-16 sm:py-20 overflow-hidden">
        {/* Motif fournitures scolaires */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/pattern-ecole.svg')",
            backgroundSize: "550px 550px",
            backgroundRepeat: "repeat",
            opacity: 0.09,
          }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
        <Container className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
            Vie de l&apos;école
          </p>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Actualités & Galerie
          </h1>
          <p className="mt-4 max-w-2xl text-white/70 text-lg">
            Annonces, événements et moments de vie à l&apos;École Tinka-Tout.
          </p>
          {/* Ancres rapides */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#actualites"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
            >
              <Tag className="h-3.5 w-3.5 text-secondary" /> Actualités
            </a>
            <a
              href="#galerie"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
            >
              <Images className="h-3.5 w-3.5 text-secondary" /> Galerie photos
            </a>
          </div>
          <nav className="mt-5 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-secondary">Vie de l&apos;école</span>
          </nav>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION ACTUALITÉS
      ══════════════════════════════════════════════ */}
      <section id="actualites" className="py-20 bg-white scroll-mt-20">
        <Container>
          <FadeIn className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
              Dernières nouvelles
            </p>
            <h2 className="gold-underline font-heading text-3xl font-bold text-foreground">
              Actualités
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Retrouvez toutes les annonces, événements et actualités pédagogiques de l&apos;école.
            </p>
          </FadeIn>

          {news.length === 0 ? (
            <FadeIn>
              <div className="rounded-xl border border-border bg-gray-50 py-20 text-center">
                <p className="font-heading text-lg font-bold text-foreground">
                  Aucune actualité pour le moment
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Revenez bientôt pour suivre la vie de notre école.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                >
                  Nous contacter <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
          ) : (
            <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((n) => (
                <StaggerItem key={n.id}>
                  <Link
                    href={`/actualites/${n.slug}`}
                    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <Image
                        src={n.imageUrl ?? siteConfig.images.hero}
                        alt={n.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        <Tag className="h-3 w-3" /> {n.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="mb-2 flex items-center gap-1.5 text-[11px] text-muted-foreground uppercase tracking-wide">
                        <Calendar className="h-3.5 w-3.5 text-secondary" />
                        {new Date(n.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric", month: "long", year: "numeric",
                        })}
                      </p>
                      <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {n.title}
                      </h3>
                      <p className="mt-2 flex-1 line-clamp-3 text-sm text-muted-foreground leading-relaxed">
                        {n.content.slice(0, 130)}…
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary group-hover:gap-3 transition-all">
                        Lire la suite <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          SÉPARATEUR VISUEL
      ══════════════════════════════════════════════ */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          SECTION GALERIE
      ══════════════════════════════════════════════ */}
      <section id="galerie" className="py-20 bg-white scroll-mt-20">
        <Container>
          <FadeIn className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
              Photos
            </p>
            <h2 className="gold-underline font-heading text-3xl font-bold text-foreground">
              Galerie
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Quelques moments de vie à l&apos;école : classes, activités et événements.
            </p>
          </FadeIn>

          <GalerieGrid />
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════ */}
      <section className="py-14 bg-gray-50 border-t border-border">
        <Container className="text-center">
          <FadeIn>
            <p className="text-muted-foreground text-sm mb-4">
              Vous souhaitez inscrire votre enfant ?
            </p>
            <Link
              href="/inscription"
              className="inline-flex items-center gap-2 h-12 rounded-sm bg-primary px-8 text-sm font-bold uppercase tracking-widest text-white hover:bg-primary/85 transition-all hover:-translate-y-0.5 hover:shadow-lg group"
            >
              Pré-inscrire mon enfant
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
