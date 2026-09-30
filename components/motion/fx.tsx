"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";

/**
 * Scroll-reveal vocabulary. Every section uses one of these rather than
 * inventing its own, so timing and easing stay consistent site-wide.
 *
 *   up      fade + rise 80px (the default)
 *   blur    blur to sharp
 *   scale   scale up from 92%
 *   clip    wipe in from the bottom edge
 *   left    slide in from the left
 *   right   slide in from the right
 *   tilt    3D tip forward into place
 *
 * MotionConfig reducedMotion="user" (in MotionProvider) strips the transform
 * parts for visitors who ask for less motion; opacity still fades.
 */
export type Effect = "up" | "blur" | "scale" | "clip" | "left" | "right" | "tilt";

const EASE = [0.16, 1, 0.3, 1] as const;

const hidden: Record<Effect, Record<string, string | number>> = {
  up: { opacity: 0, y: 80 },
  blur: { opacity: 0, filter: "blur(14px)", y: 24 },
  scale: { opacity: 0, scale: 0.92 },
  clip: { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
  left: { opacity: 0, x: -80 },
  right: { opacity: 0, x: 80 },
  tilt: { opacity: 0, rotateX: 18, y: 60, transformPerspective: 1200 },
};

const shown: Record<Effect, Record<string, string | number>> = {
  up: { opacity: 1, y: 0 },
  blur: { opacity: 1, filter: "blur(0px)", y: 0 },
  scale: { opacity: 1, scale: 1 },
  clip: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  tilt: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 1200 },
};

type Tag = "div" | "section" | "li" | "article" | "p" | "h2" | "h3" | "span" | "ul" | "ol" | "dl" | "figure";

export function FadeIn({
  children,
  effect = "up",
  delay = 0,
  duration = 0.9,
  amount = 0.25,
  as = "div",
  className,
  id,
}: {
  children: ReactNode;
  effect?: Effect;
  delay?: number;
  duration?: number;
  amount?: number;
  as?: Tag;
  className?: string;
  id?: string;
}) {
  const Comp = m[as] as typeof m.div;
  return (
    <Comp
      id={id}
      className={className}
      initial={hidden[effect]}
      whileInView={shown[effect]}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/* -- Stagger: a parent that releases its children 0.1s apart ------------- */

export function Stagger({
  children,
  as = "div",
  className,
  amount = 0.2,
  delay = 0,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
  amount?: number;
  delay?: number;
}) {
  const Comp = m[as] as typeof m.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: 0.1, delayChildren: delay } },
      }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  effect = "up",
  as = "div",
  className,
}: {
  children: ReactNode;
  effect?: Effect;
  as?: Tag;
  className?: string;
}) {
  const Comp = m[as] as typeof m.div;
  return (
    <Comp
      className={className}
      variants={{
        hidden: hidden[effect],
        shown: { ...shown[effect], transition: { duration: 0.9, ease: EASE } },
      }}
    >
      {children}
    </Comp>
  );
}
