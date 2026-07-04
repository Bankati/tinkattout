"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { siteConfig } from "@/config/site";

const FILTRES = ["Tout", "Classes", "Activités", "Sorties", "Événements"] as const;

const PHOTOS = siteConfig.images.gallery.map((src, i) => ({
  src,
  cat: (["Classes", "Activités", "Sorties", "Événements", "Classes", "Activités"] as const)[i % 6],
  alt: `Photo école Tinka-Tout ${i + 1}`,
}));

export function GalerieGrid() {
  const [filter, setFilter] = useState<string>("Tout");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const visible = filter === "Tout" ? PHOTOS : PHOTOS.filter((p) => p.cat === filter);

  return (
    <>
      {/* Filtres */}
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTRES.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
              filter === f
                ? "bg-primary text-white shadow-sm"
                : "border border-border bg-white text-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grille */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ src, alt }, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setLightbox(src)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-all duration-300 flex items-center justify-center">
              <ZoomIn className="h-8 w-8 text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="relative max-h-[85vh] max-w-5xl w-full">
            <Image
              src={lightbox}
              alt="Agrandissement"
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto mx-auto object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
