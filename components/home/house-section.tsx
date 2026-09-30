"use client";

import { useRef, useState } from "react";
import { m, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { Container } from "@/components/primitives/container";
import { LazyHouseScene, useOnScreen } from "@/components/scenes/lazy";
import type { HouseRoom } from "@/components/scenes/house-scene";
import { cn } from "@/lib/cn";

type Copy = {
  heading: string;
  sub: string;
  before: string;
  after: string;
  target: number;
  rooms: HouseRoom[];
};

/**
 * Pinned scroll story around the isometric house. The section is tall; the
 * stage sticks, and scroll progress balances the rooms from their "before"
 * temperatures to the target. The toggle is not a separate state: it
 * scrolls you to the start or the end of the story, so scroll stays the one
 * source of truth.
 */
export function HouseSection({ copy }: { copy: Copy }) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const badgeEls = useRef<(HTMLDivElement | null)[]>([]);
  const { near, visible } = useOnScreen(stage, "500px");

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const eased = useTransform(scrollYProgress, [0.12, 0.82], [0, 1], { clamp: true });
  const progress = useSpring(eased, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const bar = useTransform(progress, [0, 1], ["0%", "100%"]);

  const [balanced, setBalanced] = useState(false);
  const [temps, setTemps] = useState(copy.rooms.map((r) => r.before));
  useMotionValueEvent(progress, "change", (p) => {
    setBalanced(p > 0.5);
    const next = copy.rooms.map((r) => Math.round(r.before + (copy.target - r.before) * p));
    setTemps((prev) => (prev.every((t, i) => t === next[i]) ? prev : next));
  });

  const jump = (to: 0 | 1) => {
    const el = section.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * (to ? 0.86 : 0.08), behavior: "smooth" });
  };

  return (
    <section ref={section} aria-label={copy.heading} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden pt-20 lg:pt-16">
        <Container className="relative grid h-full grid-rows-[auto_1fr] gap-4 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-8">
          <div className="pt-4 lg:col-span-4 lg:pt-0">
            <h2 className="text-[2.1rem] leading-[1.02] tracking-[-0.02em] text-mc-navy sm:text-section">
              {copy.heading}
            </h2>
            <p className="mt-4 hidden max-w-[40ch] text-body text-mc-muted sm:block">{copy.sub}</p>

            <div role="group" aria-label="Compare" className="mt-5 inline-flex rounded-full border border-mc-line bg-white p-1 lg:mt-8">
              {[copy.before, copy.after].map((label, i) => {
                const on = balanced === (i === 1);
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={on}
                    onClick={() => jump(i as 0 | 1)}
                    className={cn(
                      "min-h-10 rounded-full px-4 text-sm transition-colors duration-300 ease-mc",
                      on ? "bg-mc-navy text-white" : "text-mc-navy/70 hover:text-mc-navy",
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <ul className="mt-6 hidden grid-cols-2 gap-3 lg:grid">
              {copy.rooms.map((room, i) => {
                const dev = temps[i] - copy.target;
                const state = Math.abs(dev) <= 1 ? "ok" : dev < 0 ? "cold" : "hot";
                return (
                  <li key={room.id} className="rounded-2xl border border-mc-line bg-white p-4">
                    <p className="text-sm text-mc-muted">{room.name}</p>
                    <p className="mt-1 flex items-baseline gap-2">
                      <span className="font-display text-[2rem] leading-none text-mc-navy tabular-nums">{temps[i]}°</span>
                      <span
                        className={cn(
                          "text-xs font-medium",
                          state === "ok" ? "text-emerald-600" : state === "cold" ? "text-mc-frost" : "text-mc-ember",
                        )}
                      >
                        {state === "ok" ? "Just right" : state === "cold" ? "Too cold" : "Too warm"}
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 hidden h-1 w-full max-w-sm overflow-hidden rounded-full bg-mc-line lg:block" aria-hidden="true">
              <m.div className="bg-thermal h-full rounded-full" style={{ width: bar }} />
            </div>
          </div>

          <div ref={stage} className="relative -mx-6 min-h-0 sm:mx-0 lg:col-span-8 lg:h-[82vh]">
            {near && (
              <LazyHouseScene
                progress={progress}
                rooms={copy.rooms}
                target={copy.target}
                active={visible}
                badgeEls={badgeEls}
              />
            )}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              {copy.rooms.map((room, i) => (
                <div
                  key={room.id}
                  ref={(el) => {
                    badgeEls.current[i] = el;
                  }}
                  data-state="cold"
                  style={{ visibility: "hidden" }}
                  className="group/badge absolute left-0 top-0 will-change-transform"
                >
                  <div className="flex flex-col items-center gap-1">
                    <span
                      data-temp
                      className="inline-flex size-9 items-center justify-center rounded-full bg-mc-navy font-display text-sm text-white shadow-card ring-[3px] ring-white transition-colors duration-500 group-data-[state=cold]/badge:bg-mc-frost group-data-[state=hot]/badge:bg-mc-ember sm:size-12 sm:text-lg sm:ring-4"
                    >
                      {room.before}°
                    </span>
                    <span className="hidden rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-mc-navy shadow-card sm:inline">
                      {room.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="sr-only">
              Illustration: a two-storey home in cutaway. Before, the bedroom is {copy.rooms[0].before} degrees and the nursery {copy.rooms[1].before}. After balancing, every room sits at {copy.target} degrees.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
