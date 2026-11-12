"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Composant FadeIn
 * Fait apparaître les éléments avec un léger décalage vers le haut.
 *
 * À réserver aux blocs situés SOUS la ligne de flottaison : le HTML serveur
 * part invisible jusqu'au chargement du JavaScript. Pour le haut de page,
 * utiliser la classe CSS `animate-fade-up` (aucune dépendance au JS).
 * L'attribut data-reveal permet de les réafficher quand le JS est désactivé
 * (voir <noscript> dans app/layout.tsx).
 *
 * @param children - Le contenu à animer
 * @param delay - Le délai avant le début de l'animation (pour les effets en cascade)
 * @param className - Classes CSS additionnelles
 */
export function FadeIn({ 
  children, 
  delay = 0, 
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  className?: string;
}) {
  const ref = useRef(null);
  // useInView détecte quand l'élément entre dans l'écran
  // once: true signifie que l'animation ne se joue qu'une seule fois
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      data-reveal=""
      initial={{ opacity: 0, y: 20 }} // État de départ (invisible, décalé vers le bas)
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} // État final
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }} // Configuration de la transition
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Composant StaggerContainer
 * Permet d'animer une liste d'enfants les uns après les autres.
 */
export function StaggerContainer({
  children,
  className = "",
  delayChildren = 0.1,
  staggerChildren = 0.1
}: {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren,
            staggerChildren // Délai entre chaque enfant
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Composant StaggerItem
 * À utiliser comme enfant direct de StaggerContainer
 */
export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      data-reveal=""
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
