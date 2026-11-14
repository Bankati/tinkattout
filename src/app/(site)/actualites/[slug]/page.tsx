import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { cache } from "react";
import type { News } from "@prisma/client";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import { Container } from "@/components/site/Container";
import { VagueOr } from "@/components/site/VagueOr";
import { Confetti } from "@/components/site/hero-dessins";
import { logServerError, prisma } from "@/lib/db";
import { boutonOr, tailleBouton } from "@/components/ui/palette";
import { pageMetadata } from "@/lib/seo";

const MAX_SLUG_LENGTH = 200;

type NewsLookup = { ok: true; news: News | null } | { ok: false };

// cache() : generateMetadata et la page partagent une seule requête par affichage.
const getPublishedNews = cache(async (slug: string): Promise<NewsLookup> => {
  if (slug.length > MAX_SLUG_LENGTH) return { ok: true, news: null };
  try {
    return { ok: true, news: await prisma.news.findUnique({ where: { slug, published: true } }) };
  } catch (error) {
    logServerError("actualites/[slug]", error);
    return { ok: false };
  }
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getPublishedNews(slug);
  if (!result.ok || !result.news) return { title: "Actualité", robots: { index: false, follow: true } };
  return pageMetadata({
    title: result.news.title,
    description: result.news.content.slice(0, 160),
    path: `/actualites/${result.news.slug}`,
  });
}

export default async function ActualiteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const result = await getPublishedNews(slug);

  if (!result.ok) {
    return (
      <section className="py-20 bg-white">
        <Container>
          <div role="alert" className="mx-auto max-w-3xl rounded-carte border border-destructive/30 bg-destructive/5 py-12 text-center text-sm text-destructive">
            Cette actualité est momentanément indisponible (base de données injoignable). Réessayez dans quelques instants.
          </div>
          <div className="mt-8 text-center">
            <Link href="/actualites" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Toutes les actualités
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const news = result.news;
  if (!news) notFound();

  return (
    <>
      {/* ── Bandeau article : marine nuit, confettis prune (aucune photo ici : elle est dans le contenu) ── */}
      <section className="relative overflow-hidden bg-primary-deep bg-gradient-to-r from-primary-deep from-45% to-primary text-white">
        <div aria-hidden="true" className="motif-ecole pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] hidden xl:block">
          <div className="absolute right-[6%] top-[10%] h-64 w-72 rounded-full bg-vie-ecole opacity-[0.18] blur-[40px]" />
          <Confetti.Point className="right-[12%] top-[22%] bg-vie-ecole" />
          <Confetti.Anneau className="right-[20%] top-[58%] border-vie-ecole" />
          <Confetti.Triangle className="right-[6%] top-[46%] bg-cycle-periscolaire" />
          <Confetti.Etincelle className="right-[28%] top-[24%]" />
          <Confetti.Point className="right-[4%] top-[72%] h-2.5 w-2.5 bg-cycle-maternelle" />
        </div>
        <Container className="relative z-10 pt-14 pb-24 sm:pt-16 lg:pt-20 lg:pb-28">
          <div className="max-w-3xl animate-fade-up">
            <Link href="/actualites" className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-sm text-xs font-bold uppercase tracking-widest text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Toutes les actualités
            </Link>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-vie-ecole-strong px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                <Tag className="h-3 w-3" aria-hidden="true" /> {news.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/80">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {new Date(news.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>
            <h1 className="font-heading text-3xl font-bold leading-tight text-balance sm:text-4xl md:text-5xl">
              {news.title}
            </h1>
          </div>
        </Container>
        <VagueOr />
      </section>

      {/* ── Contenu ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Image principale */}
            {news.imageUrl && (
              <div className="mb-10 overflow-hidden rounded-photo shadow-md">
                <Image
                  src={news.imageUrl}
                  alt={news.title}
                  width={1200}
                  height={600}
                  className="w-full h-72 sm:h-96 object-cover"
                />
              </div>
            )}

            {/* Corps de l'article */}
            <div className="prose prose-sm sm:prose max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {news.content}
            </div>

            {/* Footer article */}
            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-border pt-8">
              <Link
                href="/actualites"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                Retour aux actualités
              </Link>
              <Link
                href="/inscription"
                className={`${boutonOr} ${tailleBouton.md}`}
              >
                Pré-inscrire mon enfant
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
