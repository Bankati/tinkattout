"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Composant Counter
 * Affiche un nombre qui s'incrémente de 0 à la valeur cible.
 *
 * - La valeur finale est écrite dans le HTML serveur : sans JavaScript (ou
 *   avant son chargement), le visiteur voit déjà le bon chiffre.
 * - L'animation ne se joue que si le compteur est hors écran au chargement
 *   et si le réglage « réduire les animations » n'est pas activé.
 * - Les lecteurs d'écran lisent uniquement la valeur finale.
 *
 * @param value - La valeur numérique finale
 * @param suffix - Un suffixe optionnel (ex: "%", "+")
 */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldAnimate = useRef(false);
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50, // Amortissement (plus c'est haut, moins ça rebondit)
    stiffness: 100, // Raideur (vitesse)
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const finalText = `${value}${suffix}`;

  // Au montage : si le compteur est déjà visible, on garde la valeur finale
  // (pas de saut 500 → 0). Sinon on le remet à 0, hors de la vue du visiteur.
  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion) return;
    const rect = node.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visible) {
      shouldAnimate.current = true;
      node.textContent = `0${suffix}`;
    }
  }, [reduceMotion, suffix]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !isInView || !shouldAnimate.current) return;
    const unsubscribe = springValue.on("change", (latest) => {
      node.textContent = `${Math.round(latest)}${suffix}`;
    });
    motionValue.set(value);
    return unsubscribe; // écouteur retiré au démontage
  }, [isInView, value, suffix, motionValue, springValue]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {finalText}
      </span>
      <span className="sr-only">{finalText}</span>
    </>
  );
}
