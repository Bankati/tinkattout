"use client";

import { MotionConfig } from "framer-motion";

/**
 * Respecte le réglage système « réduire les animations » pour toutes les
 * animations framer-motion du site (déplacements coupés, fondus conservés).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
