"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform } from "motion/react";
import type { ImageRef } from "@/lib/content";

/**
 * The hero photograph. It unveils from a rounded inset on load, then drifts
 * slower than the page and eases back in scale as you scroll away, so the
 * top of the page has depth without a single animated gradient. A review
 * card overlaps the lower corner: proof sitting next to the promise.
 */
export function HeroPhoto({
  image,
  quote,
}: {
  image: ImageRef;
  quote: { text: string; name: string; place: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div ref={ref} className="relative">
      {/* The unveil is a CSS clip-path wipe, not a fade: an image at
          opacity 0 is not a Largest Contentful Paint candidate, and CSS runs
          before hydration. */}
      <div className="hero-unveil relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-mc-raised shadow-float sm:aspect-[5/4] lg:aspect-[4/5]">
        <m.div className="absolute inset-0" style={{ y, scale }}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            sizes="(min-width: 1024px) 46vw, 100vw"
            quality={80}
            className="object-cover"
          />
        </m.div>
      </div>

      <m.figure
        style={{ y: cardY }}
        className="relative mx-5 -mt-14 sm:absolute sm:mx-0 sm:mt-0 sm:-bottom-6 sm:right-6 sm:w-80 lg:-left-10 lg:bottom-10 lg:right-auto"
      >
        <div
          className="mc-rise rounded-2xl border border-mc-line bg-white/95 p-5 shadow-lift backdrop-blur"
          style={{ "--rise-delay": "900ms" } as React.CSSProperties}
        >
        <div className="stars" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }, (_, i) => (
            <svg key={i} viewBox="0 0 20 20" className="size-4 fill-current" aria-hidden="true">
              <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
            </svg>
          ))}
        </div>
        <blockquote className="mt-3 text-[0.9375rem] leading-snug text-mc-navy">
          &ldquo;{quote.text}&rdquo;
        </blockquote>
        <figcaption className="mt-3 text-sm text-mc-muted">
          {quote.name}, {quote.place}
        </figcaption>
        </div>
      </m.figure>
    </div>
  );
}
