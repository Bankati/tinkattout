"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * Composant Counter
 * Affiche un nombre qui s'incrémente de 0 à la valeur cible.
 * Idéal pour les statistiques (ex: "15 ans d'expérience").
 * 
 * @param value - La valeur numérique finale
 * @param suffix - Un suffixe optionnel (ex: "%", "+")
 */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50, // Amortissement (plus c'est haut, moins ça rebondit)
    stiffness: 100, // Raideur (vitesse)
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  // Met à jour le texte du span à chaque changement de valeur
  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} />;
}
