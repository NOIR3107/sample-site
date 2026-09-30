"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useMotionValue, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type WorkCardData = {
  slug: string;
  code: string;
  name: string;
  sector: "residential" | "commercial";
  caption: string;
  cover: { src: string; alt: string };
};

/**
 * Horizontal gallery. Desktop with motion allowed: the section pins and
 * vertical scroll pans the strip sideways (sticky frame + useScroll,
 * transform only), the pinned height measured to exactly the travel
 * needed. Phones, tablets and reduced motion: a native swipe strip with
 * scroll-snap. `data-pinned` switches between the two in CSS.
 */
export function WorkGallery({
  projects,
  heading,
  sub,
  href,
  linkLabel,
}: {
  projects: WorkCardData[];
  heading: string;
  sub: string;
  href: string;
  linkLabel: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");

    const measure = () => {
      if (!mq.matches) {
        delete section.dataset.pinned;
        section.style.height = "";
        distance.set(0);
        return;
      }
      section.dataset.pinned = "";
      const travel = Math.max(0, track.scrollWidth - window.innerWidth);
      distance.set(travel);
      section.style.height = `${window.innerHeight + travel}px`;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [distance]);

  return (
    <section ref={sectionRef} className="work relative" aria-label={heading}>
      <div className="work-frame py-24">
        <div className="mx-auto flex w-full max-w-page flex-col gap-6 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <div className="max-w-2xl">
            <h2 className="text-section text-mc-navy">{heading}</h2>
            <p className="mt-4 text-lg text-mc-muted">{sub}</p>
          </div>
          <Link
            href={href}
            className="group inline-flex min-h-12 items-center gap-2 self-start rounded-full border border-mc-line bg-white px-5 text-sm text-mc-navy transition-[border-color,box-shadow] duration-300 ease-mc hover:border-mc-navy/30 hover:shadow-card lg:self-auto"
          >
            {linkLabel}
            <ArrowRight
              aria-hidden="true"
              strokeWidth={2}
              className="size-4 transition-transform duration-300 ease-mc group-hover:translate-x-1"
            />
          </Link>
        </div>

        <m.div
          ref={trackRef}
          style={{ x }}
          tabIndex={0}
          role="region"
          aria-label={`${heading}, scrollable`}
          className="work-track no-scrollbar mt-12 flex gap-5 px-6 pb-4 lg:mt-14 lg:gap-6 lg:px-12"
        >
          {projects.map((project) => (
            <article key={project.slug} className="group relative w-[78vw] max-w-[24rem] shrink-0 snap-start lg:w-[min(24rem,38vh)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-mc-raised shadow-card">
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  sizes="(min-width: 1024px) 24rem, 78vw"
                  quality={80}
                  className="img-zoom object-cover"
                />
              </div>
              <div className="mt-5 flex items-center gap-3 text-sm">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    project.sector === "residential" ? "bg-mc-peach text-mc-ember" : "bg-mc-ice text-mc-frost",
                  )}
                >
                  {project.sector === "residential" ? "Home" : "Commercial"}
                </span>
              </div>
              <h3 className="mt-3 font-display text-[1.6rem] font-normal leading-tight tracking-[-0.02em] text-mc-navy">
                <Link
                  href={`/projects/${project.slug}/`}
                  className="transition-colors duration-300 ease-mc after:absolute after:inset-0 after:content-[''] group-hover:text-mc-frost"
                >
                  {project.name}
                </Link>
              </h3>
              <p className="mt-2 line-clamp-2 max-w-[36ch] text-sm leading-relaxed text-mc-muted">{project.caption}</p>
            </article>
          ))}

          <Link
            href={href}
            className="group relative flex aspect-[4/5] w-[78vw] max-w-[24rem] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-card bg-mc-navy p-8 text-white lg:w-[min(24rem,38vh)]"
          >
            <div aria-hidden="true" className="glow -right-16 -top-16 size-64 bg-mc-ember/40" />
            <span className="relative inline-flex size-12 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-mc group-hover:rotate-45">
              <ArrowUpRight aria-hidden="true" strokeWidth={2} className="size-5" />
            </span>
            <span className="relative font-display text-[2.6rem] leading-[0.98] tracking-[-0.02em]">{linkLabel}</span>
          </Link>
        </m.div>
      </div>
    </section>
  );
}
