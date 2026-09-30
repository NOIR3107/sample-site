"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

/**
 * CountUp, from React Bits, as shipped.
 *
 * Adapted only to accept a prefix and suffix, so a spec value like
 * "22 dB" or "2,650 sq ft" can count its number while keeping its unit. The
 * full value is always in the DOM for assistive tech and for no-JS.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  separator = ",",
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: {
  to: number;
  from?: number;
  duration?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
  /** Fixed decimal places, e.g. 1 for a 4.9 rating. */
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 20 + 40 * (1 / duration),
    stiffness: 100 * (1 / duration),
  });
  const inView = useInView(ref, { once: true, margin: "0px" });

  const format = (n: number) => {
    const s = Intl.NumberFormat("en-US", {
      useGrouping: !!separator,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(n);
    return `${prefix}${separator ? s.replace(/,/g, separator) : s}${suffix}`;
  };

  useEffect(() => {
    if (ref.current) ref.current.textContent = format(from);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from]);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (ref.current) ref.current.textContent = format(to);
      return;
    }
    motionValue.set(to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to, motionValue]);

  useEffect(() => {
    const unsub = springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = format(latest);
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [springValue]);

  return <span ref={ref} className={className} aria-label={format(to)} />;
}
