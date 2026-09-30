"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { Container } from "@/components/primitives/container";
import { FadeIn } from "@/components/motion/fx";

type Review = { title: string; quote: string; name: string; place: string; service: string };

function Stars() {
  return (
    <span className="stars" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-4 fill-current" aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * A wall of reviews with names, neighbourhoods and the job they came from,
 * the way Jetson does it. On desktop the three columns drift at different
 * speeds as you scroll, which keeps a dense grid of text feeling alive.
 * Sample reviews for the demo, flagged in content/home.ts.
 */
export function Reviews({
  heading,
  reviews,
  rating,
}: {
  heading: string;
  reviews: Review[];
  rating: { score: string; count: string; source: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const offsets = [
    useTransform(scrollYProgress, [0, 1], [40, -40]),
    useTransform(scrollYProgress, [0, 1], [90, -90]),
    useTransform(scrollYProgress, [0, 1], [20, -20]),
  ];
  const columns: Review[][] = [[], [], []];
  reviews.forEach((r, i) => columns[i % 3].push(r));

  return (
    <section id="reviews" className="overflow-hidden py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <FadeIn className="max-w-2xl">
            <h2 className="text-section text-mc-navy">{heading}</h2>
          </FadeIn>
          <FadeIn delay={0.1} className="flex items-center gap-4 rounded-full border border-mc-line bg-white py-2 pl-3 pr-5 shadow-card">
            <span className="font-display text-3xl leading-none text-mc-navy">{rating.score}</span>
            <span>
              <Stars />
              <span className="block text-xs text-mc-muted">
                {rating.count} {rating.source}
              </span>
            </span>
          </FadeIn>
        </div>

        <div ref={ref} className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {columns.map((col, c) => (
            <Column key={c} reviews={col} y={offsets[c]} className={c === 2 ? "md:col-span-2 lg:col-span-1" : ""} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Column({
  reviews,
  y,
  className,
}: {
  reviews: Review[];
  y: MotionValue<number>;
  className?: string;
}) {
  return (
    <m.div style={{ y }} className={`grid content-start gap-5 max-lg:transform-none! ${className ?? ""}`}>
      {reviews.map((r) => (
        <FadeIn
          as="figure"
          key={r.name}
          effect="blur"
          className="rounded-card border border-mc-line bg-white p-7 shadow-card"
        >
          <Stars />
          <p className="mt-4 text-lg font-medium text-mc-navy">&ldquo;{r.title}&rdquo;</p>
          <blockquote className="mt-3 text-body text-mc-muted">{r.quote}</blockquote>
          <figcaption className="mt-6 flex items-center gap-3 border-t border-mc-line pt-5">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-mc-ice font-medium text-mc-frost">
              {r.name.charAt(0)}
            </span>
            <span className="text-sm">
              <span className="block font-medium text-mc-navy">
                {r.name}, {r.place}
              </span>
              <span className="text-mc-muted">{r.service}</span>
            </span>
          </figcaption>
        </FadeIn>
      ))}
    </m.div>
  );
}
