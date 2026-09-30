"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Loads Motion's DOM animation features once for the whole tree, so each
 * animated component ships as the lightweight `m` element rather than the
 * full `motion` bundle. `reducedMotion="user"` makes every Motion transform
 * respect the visitor's reduced-motion setting automatically.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
