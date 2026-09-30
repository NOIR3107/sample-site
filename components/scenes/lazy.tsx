"use client";

import { useCallback, useEffect, useState, useSyncExternalStore, type RefObject } from "react";
import dynamic from "next/dynamic";

/**
 * three.js, React Three Fiber and drei only download when a scene is about
 * to scroll into view, never on the critical path. Both scenes are client
 * only (no server render of a WebGL canvas).
 */
export const LazyHouseScene = dynamic(() => import("@/components/scenes/house-scene"), {
  ssr: false,
});

/**
 * `near`: has come within `margin` of the viewport at least once (mount it).
 * `visible`: is on screen right now (keep its render loop running).
 */
export function useOnScreen(ref: RefObject<Element | null>, margin = "400px") {
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nearIo = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          nearIo.disconnect();
        }
      },
      { rootMargin: margin },
    );
    const visIo = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "80px",
    });
    nearIo.observe(el);
    visIo.observe(el);
    return () => {
      nearIo.disconnect();
      visIo.disconnect();
    };
  }, [ref, margin]);

  return { near, visible };
}

/** Matches a media query on the client; null during SSR and hydration. */
export function useMedia(query: string): boolean | null {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => null,
  );
}
