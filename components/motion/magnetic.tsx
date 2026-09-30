"use client";

import { useRef, type ReactNode } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Magnetic hover. The child drifts a few pixels toward the pointer and
 * springs back on leave. Mouse only: touch never triggers it, and reduced
 * motion turns it off. Motion values, so no React re-render per move.
 */
export function Magnetic({
  children,
  strength = 0.22,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <m.span
      ref={ref}
      className={className ?? "inline-flex"}
      style={{ x, y }}
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((event.clientX - (r.left + r.width / 2)) * strength);
        y.set((event.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.span>
  );
}
