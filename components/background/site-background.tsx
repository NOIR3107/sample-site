"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

/**
 * Site-wide background.
 *
 * Landing page: the moving aurora, in pastel: cool sky on the left, warm
 * peach on the right, pale air between. Every other
 * page: the topography contour lines. Both are lazy and off the critical
 * path, and both stop rendering when the tab is hidden or they are off
 * screen.
 */
const Aurora = dynamic(
  () => import("@/components/background/aurora").then((m) => m.Aurora),
  { ssr: false },
);

const Topography = dynamic(
  () => import("@/components/background/topography").then((m) => m.Topography),
  { ssr: false },
);

/* Module-level so the shader effect never sees a new array identity. */
const AURORA_STOPS = ["#a8dcfb", "#eaf4fa", "#ffd2b8"];

export function SiteBackground() {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <>
        <div className="aurora-layer" aria-hidden="true">
          <Aurora colorStops={AURORA_STOPS} amplitude={1.15} blend={0.7} light />
        </div>
      </>
    );
  }

  return (
    <div className="topo-layer" aria-hidden="true">
      <Topography lowColor="#e3eaed" midColor="#c3d4de" highColor="#7cc0ea" />
    </div>
  );
}
