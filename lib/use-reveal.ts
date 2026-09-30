"use client";

import { useEffect, useRef } from "react";

/**
 * Reveal-on-enter, once. No scroll listeners anywhere on this site.
 * The observer disconnects the moment it fires.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-revealed", "");
        obs.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
