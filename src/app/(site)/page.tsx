import Image from "next/image";
import Link from "next/link";
import {
  Users, Trophy, BookOpen, Star,
  ArrowRight, CheckCircle2, GraduationCap,
  Phone, Mail,
} from "lucide-react";
import { Container } from "@/components/site/Container";
import { siteConfig } from "@/config/site";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Counter } from "@/components/ui/counter";

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════
          HÉRO
      ═══════════════════════════════════════════════ */}
      <section className="relative flex min-h-[680px] items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-section-accueil.jpg"
            alt="École Tinka-Tout"
            fill
            className="object-cover animate-slow-zoom"
            priority
          />
          {/* Overlay en dégradé navy — lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(217,58%,16%)]/88 via-[hsl(217,58%,26%)]/75 to-[hsl(217,58%,26%)]/50" />
        </div>

        {/* Bande dorée verticale gauche */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary z-10 hidden lg:block" />

        <Container className="relative z-10 py-24">
          <div className="max-w-3xl">
            <FadeIn>
              <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-secondary/50 bg-secondary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary">
                <GraduationCap className="h-3.5 w-3.5" />
                Lomé, Togo · Fondée en 2005
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                L&apos;Excellence Éducative<br />
                <span className="text-secondary">pour vos Enfants</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-xl text-lg text-white/80 leading-relaxed">
                De la Maternelle au CM2, l&apos;École Tinka-Tout offre un cadre
                bienveillant, une pédagogie rigoureuse et un accompagnement
                personnalisé pour chaque élève.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/inscription"
                  className="inline-flex h-12 items-center justify-center rounded-sm bg-secondary px-7 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-secondary/85 hover:shadow-xl hover:-translate-y-0.5"
                >
                  Pré-inscrire mon enfant
                </Link>
                <Link
                  href="/presentation"
                  className="inline-flex h-12 items-center justify-center rounded-sm border-2 border-white/60 bg-transparent px-7 text-sm font-bold uppercase tracking-widest text-white transition-all hover:border-white hover:bg-white/10 hover:-translate-y-0.5"
                >
                  Découvrir l&apos;école
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-5 text-sm text-white/70">
                {["20+ ans d'expérience", "100% taux de réussite au CEP", "Effectifs maîtrisés"].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" /> {item}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>

        {/* Vague blanche en bas */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="relative block w-[calc(100%+1px)] h-12 sm:h-16">
            <path d="M0,40 C300,80 900,0 1200,40 L1200,60 L0,60 Z" className="fill-background" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BARRE DE STATS — inspirée FACAM
      ═══════════════════════════════════════════════ */}
      <section className="bg-background py-10 shadow-sm">
        <Container>
          <StaggerContainer className="grid grid-cols-2 gap-6 sm:grid-cols-4 divide-x divide-border">
            {[
              { value: 500,  suffix: "+", label: "Élèves accueillis",     icon: Users     },
              { value: 20,   suffix: "+", label: "Années d'expérience",   icon: Trophy    },
              { value: 100,  suffix: "%", label: "Réussite au CEP",       icon: Star      },
              { value: 30,   suffix: "+", label: "Enseignants qualifiés", icon: BookOpen  },
            ].map(({ value, suffix, label, icon: Icon }, i) => (
              <StaggerItem key={i} className="flex flex-col items-center gap-2 px-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-heading text-3xl font-bold text-primary">
                  <Counter value={value} suffix={suffix} />
                </div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════
          PRÉSENTATION
      ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 items-center">

            {/* Image */}
            <FadeIn className="relative order-last lg:order-first">
              <div className="relative overflow-hidden rounded-sm shadow-2xl">
                <Image
                  src={siteConfig.images.campus}
                  alt="Campus de l'école Tinka-Tout"
                  width={700}
                  height={500}
                  className="w-full object-cover h-[420px]"
                />
                {/* Badge flottant */}
                <div className="absolute bottom-5 right-5 rounded-sm bg-primary px-5 py-4 text-white shadow-xl">
                  <div className="font-heading text-2xl font-bold leading-none text-secondary">2005</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/80 mt-0.5">Fondée</div>
                </div>
              </div>
              {/* Décoration dorée */}
              <div className="absolute -top-4 -left-4 h-24 w-24 rounded-sm border-4 border-secondary/30 -z-10" />
            </FadeIn>

            {/* Texte */}
            <FadeIn delay={0.15} className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Notre École</p>
                <h2 className="gold-underline font-heading text-3xl font-bold text-foreground sm:text-4xl">
                  Bienvenue à l&apos;École<br />Tinka-Tout
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Fondée en <strong className="text-primary">2005</strong> à Lomé, l&apos;École Tinka-Tout s&apos;est
                imposée comme une référence en matière d&apos;éducation primaire au Togo.
                Notre approche pédagogique allie rigueur académique et épanouissement personnel.
              </p>

              <ul className="space-y-3">
                {[
                  "Pédagogie active centrée sur l'élève",
                  "Effectifs maîtrisés pour un suivi personnalisé",
                  "Environnement sûr et bienveillant",
                  "Activités périscolaires enrichissantes",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/presentation"
                className="inline-flex items-center gap-2 font-semibold text-primary text-sm uppercase tracking-wide hover:text-primary/80 transition-colors group"
              >
                En savoir plus sur notre projet éducatif
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════
          NOS PROGRAMMES — grille style FACAM
      ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/40">
        <Container>
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Nos Cycles</p>
            <h2 className="gold-underline gold-underline-center font-heading text-3xl font-bold text-foreground sm:text-4xl inline-block">
              Nos Programmes d&apos;Apprentissage
            </h2>
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
              Un parcours structuré et adapté à chaque étape du développement de votre enfant.
            </p>
          </FadeIn>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Cycle Maternelle",
                sub: "2 – 5 ans",
                desc: "Éveil, socialisation et développement psychomoteur dans un environnement ludique et sécurisé.",
                img: siteConfig.images.feature1,
                href: "/classes",
              },
              {
                title: "Cycle Primaire",
                sub: "CP au CM2",
                desc: "Apprentissages fondamentaux avec un programme complet, équilibré et conforme aux standards nationaux.",
                img: siteConfig.images.feature2,
                href: "/classes",
              },
              {
                title: "Activités Périscolaires",
                sub: "Toutes classes",
                desc: "Musique, arts plastiques, sport et langues étrangères pour un épanouissement complet.",
                img: siteConfig.images.feature3,
                href: "/classes",
              },
            ].map((cycle, i) => (
              <StaggerItem key={i}>
                <Link
                  href={cycle.href}
                  className="group block overflow-hidden rounded-sm bg-white shadow-sm border border-border transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-52 overflow-hidden bg-muted">
                    <Image
                      src={cycle.img}
                      alt={cycle.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-secondary">{cycle.sub}</span>
                      <h3 className="font-heading text-lg font-bold">{cycle.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground leading-relaxed">{cycle.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary group-hover:gap-3 transition-all">
                      Découvrir <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════
          VALEURS PÉDAGOGIQUES
      ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <Container>
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Notre ADN</p>
            <h2 className="gold-underline gold-underline-center font-heading text-3xl font-bold text-foreground sm:text-4xl inline-block">
              Nos Valeurs Pédagogiques
            </h2>
          </FadeIn>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Users,    title: "Union",       color: "bg-blue-50 text-blue-700",   desc: "Une communauté soudée où élèves, enseignants et familles avancent ensemble vers la réussite." },
              { icon: BookOpen, title: "Travail",     color: "bg-amber-50 text-amber-700", desc: "La persévérance et l'effort au cœur de chaque apprentissage, valorisés chaque jour." },
              { icon: Trophy,   title: "Succès",      color: "bg-green-50 text-green-700", desc: "Accompagner chaque enfant vers ses propres objectifs en célébrant chaque progrès." },
              { icon: Star,     title: "Excellence",  color: "bg-purple-50 text-purple-700", desc: "Des standards élevés, un suivi rigoureux et une exigence bienveillante à chaque niveau." },
              { icon: CheckCircle2, title: "Respect", color: "bg-rose-50 text-rose-700",  desc: "Un cadre de vie harmonieux fondé sur la politesse, l'écoute et la tolérance." },
              { icon: GraduationCap, title: "Avenir", color: "bg-teal-50 text-teal-700",  desc: "Préparer les citoyens de demain avec des bases solides et une curiosité permanente." },
            ].map(({ icon: Icon, title, color, desc }) => (
              <StaggerItem
                key={title}
                className="group flex gap-5 rounded-sm border border-border p-6 transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 bg-white"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-sm ${color} transition-colors group-hover:bg-primary group-hover:text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground group-hover:text-primary transition-colors">{title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════
          TÉMOIGNAGES — fond navy (FACAM-inspired)
      ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-primary relative overflow-hidden">
        {/* Motif décoratif */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full border-[60px] border-white translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full border-[40px] border-white -translate-x-1/2 translate-y-1/2" />
        </div>

        <Container className="relative z-10">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Ils nous font confiance</p>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Témoignages des Parents
            </h2>
          </FadeIn>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                text: "L'École Tinka-Tout a transformé mon enfant. Il est devenu plus curieux, plus sociable et adore aller à l'école chaque matin. L'équipe pédagogique est exceptionnelle.",
                author: "Aïcha Mensah",
                role: "Maman de Karim, CE1",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80",
              },
              {
                text: "Depuis que nos jumeaux ont intégré Tinka-Tout, nous constatons des progrès remarquables dans leur autonomie et leur confiance en eux. Un programme vraiment équilibré.",
                author: "Komlan Agbéviadé",
                role: "Papa de Yawa et Yao, GS",
                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80",
              },
              {
                text: "Ce qui distingue Tinka-Tout, c'est l'attention personnalisée portée à chaque enfant. Les enseignants connaissent parfaitement leurs forces et les aident à progresser.",
                author: "Fatou Diop",
                role: "Maman d'Aminata, CM2",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
              },
            ].map((t, i) => (
              <StaggerItem key={i} className="flex flex-col rounded-sm bg-white/10 border border-white/15 p-7 backdrop-blur-sm hover:bg-white/15 transition-colors">
                <div className="mb-4 text-secondary text-4xl font-serif leading-none select-none">&ldquo;</div>
                <p className="text-white/85 text-sm leading-relaxed flex-1">{t.text}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/15 pt-5">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-secondary/60 shrink-0 bg-white/20">
                    <Image src={t.img} alt={t.author} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white text-sm">{t.author}</p>
                    <p className="text-[11px] text-white/55 uppercase tracking-wide">{t.role}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <Container>
          <FadeIn>
            <div className="rounded-sm bg-muted/50 border border-border p-10 sm:p-14 text-center relative overflow-hidden">
              {/* Accent doré */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary" />

              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Inscriptions ouvertes</p>
              <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                Rejoignez notre communauté éducative
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-muted-foreground leading-relaxed">
                Les inscriptions pour l&apos;année scolaire <strong>2025-2026</strong> sont ouvertes.
                Soumettez votre demande en ligne en moins de 3 minutes.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/inscription"
                  className="inline-flex h-12 items-center justify-center rounded-sm bg-primary px-8 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-primary/85 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Pré-inscrire mon enfant
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-border px-8 text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:border-primary hover:text-primary hover:-translate-y-0.5"
                >
                  <Phone className="h-4 w-4" /> Nous contacter
                </Link>
              </div>

              <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-3.5 w-3.5" /> {siteConfig.contact.email}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
