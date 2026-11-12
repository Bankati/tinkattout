"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { siteConfig } from "@/config/site";

const FILTRES = ["Tout", "Classes", "Activités", "Sorties", "Événements"] as const;
type Filtre = (typeof FILTRES)[number];

const TOTAL = siteConfig.images.gallery.length;

// Textes alternatifs provisoires : l'école doit fournir une vraie description de chaque photo.
const PHOTOS = siteConfig.images.gallery.map((src, i) => ({
  src,
  cat: (["Classes", "Activités", "Sorties", "Événements", "Classes", "Activités"] as const)[i % 6],
  alt: "Photo " + (i + 1) + " sur " + TOTAL + " de la vie à l'école Tinka-Tout",
}));

export function GalerieGrid() {
  const [filter, setFilter] = useState<Filtre>("Tout");
  const [lightbox, setLightbox] = useState<(typeof PHOTOS)[number] | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const visible = filter === "Tout" ? PHOTOS : PHOTOS.filter((p) => p.cat === filter);

  function open(photo: (typeof PHOTOS)[number], trigger: HTMLElement) {
    triggerRef.current = trigger;
    setLightbox(photo);
  }

  function close() {
    setLightbox(null);
  }

  // Fenêtre ouverte : Échap pour fermer, focus gardé dans la fenêtre,
  // défilement de la page bloqué, puis focus rendu à la vignette d'origine.
  useEffect(() => {
    if (!lightbox) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setLightbox(null);
      } else if (e.key === "Tab") {
        // Un seul élément interactif dans la fenêtre : le bouton Fermer.
        e.preventDefault();
        closeRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [lightbox]);

  return (
    <>
      {/* Filtres */}
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filtrer les photos">
        {FILTRES.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`inline-flex min-h-11 items-center rounded-full px-5 text-xs font-bold uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              filter === f
                ? "bg-vie-ecole-strong text-white shadow-sm"
                : "border border-border bg-white text-foreground hover:border-vie-ecole-strong hover:text-vie-ecole-strong"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} photo{visible.length > 1 ? "s" : ""} affichée{visible.length > 1 ? "s" : ""}
      </p>

      {/* Grille */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((photo, i) => (
          <button
            key={photo.src + i}
            type="button"
            onClick={(e) => open(photo, e.currentTarget)}
            aria-haspopup="dialog"
            aria-label={"Agrandir : " + photo.alt}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Image
              src={photo.src}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 group-focus-visible:bg-primary/50 transition-all duration-300 flex items-center justify-center">
              <ZoomIn aria-hidden="true" className="h-8 w-8 text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 transition-all duration-300" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm overscroll-contain"
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Fermer la photo (Échap)"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="relative max-h-[85vh] max-w-5xl w-full">
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="max-h-[85vh] w-auto mx-auto object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
