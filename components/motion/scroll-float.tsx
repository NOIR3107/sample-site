"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollFloat, from React Bits, as shipped. Characters rise and settle as the
 * heading scrolls through, scrubbed to scroll position.
 *
 * Two changes only: the animation is skipped entirely under reduced motion
 * (the original always runs), and the tween is scoped to a gsap context so it
 * reverts cleanly on unmount rather than leaking a ScrollTrigger per mount.
 */
export function ScrollFloat({
  children,
  className = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
}: {
  children: string;
  className?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const chars = useMemo(
    () =>
      Array.from(children).map((char, i) => (
        <span className="sf-char" key={`${char}-${i}`}>
          {char === " " ? "\u00A0" : char}
        </span>
      )),
    [children],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".sf-char"),
        { willChange: "opacity, transform", opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: "50% 0%" },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          scrollTrigger: { trigger: el, start: scrollStart, end: scrollEnd, scrub: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <span ref={ref} className={`sf-wrap ${className}`.trim()}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">{chars}</span>
    </span>
  );
}
