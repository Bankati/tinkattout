import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import { Container } from "@/components/site/Container";
import { siteConfig } from "@/config/site";
import { prisma } from "@/lib/db";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const news = await prisma.news.findUnique({ where: { slug, published: true } });
    if (!news) return { title: "Actualité — École Tinka-Tout" };
    return {
      title: `${news.title} — École Tinka-Tout`,
      description: news.content.slice(0, 160),
    };
  } catch {
    return { title: "Actualité — École Tinka-Tout" };
  }
}

export default async function ActualiteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let news = null;
  try {
    news = await prisma.news.findUnique({ where: { slug, published: true } });
  } catch {
    // Base de données non connectée
  }
  if (!news) notFound();

  const imageSrc = news.imageUrl || siteConfig.images.hero;

  return (
    <>
      {/* ── Hero article ─────────────────────────────── */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <Image src={imageSrc} alt="" fill className="object-cover opacity-20" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/60" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
        <Container className="relative z-10 py-16 sm:py-24">
          <Link href="/actualites" className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Toutes les actualités
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-primary/50 border border-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary">
              <Tag className="h-3 w-3" /> {news.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(news.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl max-w-3xl leading-tight">
            {news.title}
          </h1>
        </Container>
      </section>

      {/* ── Contenu ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Image principale */}
            {news.imageUrl && (
              <div className="mb-10 overflow-hidden rounded-sm shadow-md">
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
                className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Retour aux actualités
              </Link>
              <Link
                href="/inscription"
                className="inline-flex h-11 items-center justify-center rounded-sm bg-primary px-7 text-sm font-bold uppercase tracking-widest text-white hover:bg-primary/85 transition-all hover:-translate-y-0.5 hover:shadow-lg"
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
