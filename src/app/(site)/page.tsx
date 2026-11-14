import Image from "next/image";
import Link from "next/link";
import {
  Users, Trophy, BookOpen, Star,
  ArrowRight, CheckCircle2, GraduationCap,
  Phone, Mail, Blocks, Pencil, Palette, Sparkle,
} from "lucide-react";
import { Container } from "@/components/site/Container";
import { VagueOr } from "@/components/site/VagueOr";
import { siteConfig, yearsOpen } from "@/config/site";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Counter } from "@/components/ui/counter";
import {
  boutonOr, boutonMarine, boutonContourBlanc, tailleBouton, surtitreOr, CYCLE_COULEURS,
} from "@/components/ui/palette";

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════
          HÉRO
      ═══════════════════════════════════════════════ */}
      <section className="relative flex min-h-[680px] items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Image décorative : le texte par-dessus porte l'information */}
          <Image
            src={siteConfig.images.hero}
            alt=""
            fill
            sizes="100vw"
            className="object-cover animate-slow-zoom"
            preload
            fetchPriority="high"
          />
          {/* Voile marine nuit (règle de Reine) : 85 % partout sur téléphone ; sur grand écran,
              90 % puis 85 % jusqu'à 80 % de la largeur, puis marine 40 %. À 1024 px, le bloc de texte
              va jusqu'à 78 % : l'arrêt est donc à 80 % (et non 70 %) pour que le texte reste lisible
              même si la photo est blanche sous lui (blanc 90 % : 8,32:1 ; or : 5,05:1 au pire cas). */}
          <div className="absolute inset-0 bg-primary-deep/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-primary-deep/90 lg:via-primary-deep/85 lg:via-80% lg:to-primary/40" />
        </div>

        {/* Confettis : décor immobile, invisible pour les lecteurs d'écran. Affichés à partir de 1280 px,
            là où le texte s'arrête vers 68 % de la largeur : ils ne passent jamais sous le texte. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] hidden xl:block">
          <span className="absolute right-[9%] top-[14%] h-4 w-4 rounded-full bg-cycle-maternelle" />
          <span className="absolute right-[14%] top-[58%] h-9 w-9 rounded-full border-[6px] border-cycle-primaire" />
          <span className="absolute right-[20%] top-[26%] h-6 w-7 rotate-[14deg] bg-cycle-periscolaire [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
          <Sparkle className="absolute right-[6%] top-[70%] h-7 w-7 text-secondary" />
          <span className="absolute right-[4%] top-[40%] h-2.5 w-2.5 rounded-full bg-vie-ecole" />
        </div>

        <Container className="relative z-10 py-24">
          <div className="max-w-3xl">
            {/* Haut de page : fondu 100 % CSS, le contenu ne dépend pas du JavaScript */}
            <div className="animate-fade-up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border-[1.5px] border-secondary/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary">
                <GraduationCap className="h-3.5 w-3.5" />
                Lomé, Togo · Fondée en {siteConfig.foundedYear}
              </div>
            </div>

            <div className="animate-fade-up [animation-delay:80ms]">
              <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                L&apos;Excellence Éducative<br />
                <span className="inline-block text-secondary">pour vos Enfants</span>
              </h1>
            </div>

            <div className="animate-fade-up [animation-delay:160ms]">
              <p className="mt-6 max-w-xl text-lg text-white/90 leading-relaxed">
                De la Maternelle au CM2, l&apos;École Tinka-Tout offre un cadre
                bienveillant, une pédagogie rigoureuse et un accompagnement
                personnalisé pour chaque élève.
              </p>
            </div>

            <div className="animate-fade-up [animation-delay:240ms]">
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/inscription" className={`${boutonOr} ${tailleBouton.md}`}>
                  Pré-inscrire mon enfant
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/presentation" className={`${boutonContourBlanc} ${tailleBouton.md}`}>
                  Découvrir l&apos;école
                </Link>
              </div>
            </div>

            <div className="animate-fade-up [animation-delay:320ms]">
              <div className="mt-10 flex flex-wrap gap-5 text-sm text-white/85">
                {[`Depuis ${siteConfig.foundedYear}`, "100% taux de réussite au CEP", "Effectifs maîtrisés"].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" /> {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>

        {/* Vague blanche à liseré or en bas (composant partagé avec les autres pages) */}
        <VagueOr />
      </section>

      {/* ═══════════════════════════════════════════════
          BARRE DE STATS — inspirée FACAM
      ═══════════════════════════════════════════════ */}
      <section className="bg-background py-10 shadow-sm">
        <Container>
          {/* Visible dès le chargement (pas de fondu JS) : seuls les chiffres s'animent */}
          <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-6 sm:divide-x sm:divide-border">
            {[
              { value: 500,  suffix: "+", label: "Élèves accueillis",     icon: Users,    pastille: "bg-cycle-maternelle-soft text-cycle-maternelle-strong -rotate-3" },
              { value: yearsOpen, suffix: "", label: "Années d'existence", icon: Trophy,   pastille: "bg-secondary-soft text-secondary-strong rotate-3" },
              { value: 100,  suffix: "%", label: "Réussite au CEP",       icon: Star,     pastille: "bg-cycle-periscolaire-soft text-cycle-periscolaire-strong -rotate-3" },
              { value: 20,   suffix: "",  label: "Enseignants qualifiés", icon: BookOpen, pastille: "bg-cycle-primaire-soft text-cycle-primaire-strong rotate-3" },
            ].map(({ value, suffix, label, icon: Icon, pastille }, i) => (
              <div key={i} className="flex flex-col items-center gap-2 px-4 text-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${pastille}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-heading text-3xl font-bold text-primary">
                  <Counter value={value} suffix={suffix} />
                </div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
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
              <div className="relative overflow-hidden rounded-photo shadow-2xl">
                <Image
                  src={siteConfig.images.campus}
                  alt="Campus de l'école Tinka-Tout"
                  width={700}
                  height={500}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="w-full object-cover h-[420px]"
                />
                {/* Badge flottant */}
                <div className="absolute bottom-5 right-5 rounded-2xl bg-primary px-5 py-4 text-white shadow-xl">
                  <div className="font-heading text-2xl font-bold leading-none text-secondary">{siteConfig.foundedYear}</div>
                  <div className="text-xs uppercase tracking-widest text-white/85 mt-0.5">Fondée</div>
                </div>
              </div>
              {/* Décoration dorée */}
              <div aria-hidden="true" className="absolute -top-4 -left-4 h-24 w-24 rounded-3xl border-4 border-secondary/40 -z-10" />
            </FadeIn>

            {/* Texte */}
            <FadeIn delay={0.15} className="space-y-6">
              <div>
                <p className={`${surtitreOr} mb-3`}>Notre École</p>
                <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                  Bienvenue à l&apos;École<br />Tinka-Tout
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Fondée en <strong className="text-primary">{siteConfig.foundedYear}</strong> à Lomé, l&apos;École Tinka-Tout s&apos;est
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
                className="inline-flex min-h-11 items-center gap-2 font-bold text-primary text-sm hover:text-primary/80 transition-colors group"
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
      <section className="py-20 bg-muted">
        <Container>
          <FadeIn className="text-center mb-14">
            <p className={`${surtitreOr} mx-auto mb-3`}>Nos Cycles</p>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl inline-block">
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
                couleur: CYCLE_COULEURS.maternelle,
                icon: Blocks,
                desc: "Éveil, socialisation et développement psychomoteur dans un environnement ludique et sécurisé.",
                img: siteConfig.images.feature1,
                href: "/classes#maternelle",
              },
              {
                title: "Cycle Primaire",
                sub: "CP au CM2",
                couleur: CYCLE_COULEURS.primaire,
                icon: Pencil,
                desc: "Apprentissages fondamentaux avec un programme complet, équilibré et conforme aux standards nationaux.",
                img: siteConfig.images.feature2,
                href: "/classes#primaire",
              },
              {
                title: "Activités Périscolaires",
                sub: "Toutes classes",
                couleur: CYCLE_COULEURS.periscolaire,
                icon: Palette,
                desc: "Musique, arts plastiques, sport et langues étrangères pour un épanouissement complet.",
                img: siteConfig.images.feature3,
                href: "/classes#periscolaire",
              },
            ].map((cycle, i) => (
              <StaggerItem key={i} className="h-full">
                {/* Une seule couleur ludique par carte, celle du cycle : bord vif, pastille et badge doux, lien en texte sûr */}
                <Link
                  href={cycle.href}
                  className={`group flex h-full flex-col rounded-carte border border-border border-t-[6px] ${cycle.couleur.bord} bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl`}
                >
                  <div className="relative mx-3 mt-3 h-48 overflow-hidden rounded-2xl bg-muted">
                    <Image
                      src={cycle.img}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative flex flex-1 flex-col px-6 pb-6 pt-5">
                    <span aria-hidden="true" className={`absolute -top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-card ${cycle.couleur.doux} ${cycle.couleur.texte}`}>
                      <cycle.icon className="h-5 w-5" />
                    </span>
                    <span className={`self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${cycle.couleur.doux} ${cycle.couleur.texte}`}>
                      {cycle.sub}
                    </span>
                    <h3 className="mt-3 font-heading text-xl font-bold text-foreground">{cycle.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{cycle.desc}</p>
                    <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold ${cycle.couleur.texte} group-hover:gap-3 transition-all`}>
                      Découvrir <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
            <p className={`${surtitreOr} mx-auto mb-3`}>Notre ADN</p>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl inline-block">
              Nos Valeurs Pédagogiques
            </h2>
          </FadeIn>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Users,    title: "Union",       color: "bg-cycle-primaire-soft text-cycle-primaire-strong", desc: "Une communauté soudée où élèves, enseignants et familles avancent ensemble vers la réussite." },
              { icon: BookOpen, title: "Travail",     color: "bg-secondary-soft text-secondary-strong", desc: "La persévérance et l'effort au cœur de chaque apprentissage, valorisés chaque jour." },
              { icon: Trophy,   title: "Succès",      color: "bg-cycle-periscolaire-soft text-cycle-periscolaire-strong", desc: "Accompagner chaque enfant vers ses propres objectifs en célébrant chaque progrès." },
              { icon: Star,     title: "Excellence",  color: "bg-vie-ecole-soft text-vie-ecole-strong", desc: "Des standards élevés, un suivi rigoureux et une exigence bienveillante à chaque niveau." },
              { icon: CheckCircle2, title: "Respect", color: "bg-cycle-maternelle-soft text-cycle-maternelle-strong", desc: "Un cadre de vie harmonieux fondé sur la politesse, l'écoute et la tolérance." },
              { icon: GraduationCap, title: "Avenir", color: "bg-primary/10 text-primary", desc: "Préparer les citoyens de demain avec des bases solides et une curiosité permanente." },
            ].map(({ icon: Icon, title, color, desc }) => (
              <StaggerItem
                key={title}
                className="group flex gap-5 rounded-carte border border-border p-6 transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 bg-card"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${color}`}>
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
              <StaggerItem key={i} className="flex flex-col rounded-carte bg-white/10 border border-white/15 p-7 backdrop-blur-sm hover:bg-white/15 transition-colors">
                <div aria-hidden="true" className="mb-4 text-secondary text-4xl font-heading leading-none select-none">&ldquo;</div>
                <p className="text-white/90 text-sm leading-relaxed flex-1">{t.text}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/15 pt-5">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-secondary/60 shrink-0 bg-white/20">
                    <Image src={t.img} alt="" fill sizes="44px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white text-sm">{t.author}</p>
                    <p className="text-xs text-white/75 uppercase tracking-wide">{t.role}</p>
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
            <div className="relative overflow-hidden rounded-3xl bg-surface-ciel p-10 text-center sm:p-14">
              {/* Taches de couleur douce : décor immobile (2 couleurs ludiques au plus) */}
              <span aria-hidden="true" className="pointer-events-none absolute -left-16 -top-24 h-56 w-56 rounded-[46%_54%_60%_40%/50%_40%_60%_50%] bg-cycle-maternelle-soft" />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-28 -right-12 h-56 w-56 rounded-[46%_54%_60%_40%/50%_40%_60%_50%] bg-secondary-soft" />

              <p className={`${surtitreOr} relative mx-auto mb-4`}>Inscriptions ouvertes</p>
              <h2 className="relative font-heading text-3xl font-bold text-foreground sm:text-4xl">
                Rejoignez notre communauté éducative
              </h2>
              <p className="relative mt-4 max-w-xl mx-auto text-muted-foreground leading-relaxed">
                Les inscriptions pour l&apos;année scolaire <strong>{siteConfig.schoolYear}</strong> sont ouvertes.
                Soumettez votre demande en ligne en moins de 3 minutes.
              </p>

              <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/inscription" className={`${boutonOr} ${tailleBouton.md}`}>
                  Pré-inscrire mon enfant
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/contact" className={`${boutonMarine} ${tailleBouton.md}`}>
                  <Phone className="h-4 w-4" aria-hidden="true" /> Nous contacter
                </Link>
              </div>

              <p className="relative mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-3.5 w-3.5" /> {siteConfig.contact.email}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
