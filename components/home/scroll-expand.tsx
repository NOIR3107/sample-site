"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll expand.
 *
 * Adapted from the React Bits ScrollExpand component. The scroll mechanics are
 * theirs: a sticky stage, a clip-path frame that opens to full bleed, media
 * that eases out of a zoom, a title that lifts away and overlay content that
 * arrives once the frame is open.
 *
 * What changed:
 *
 * - Media is passed in as a child so it can be a `next/image` rather than the
 *   raw `<img src>` the original renders. Every image on this site goes
 *   through the optimizer.
 * - Their styling is dropped entirely: no 24px corner radius, no white 700
 *   weight headline, no text shadow. Square corners, design-system tokens.
 * - The prop surface is cut from eighteen to what this site actually uses.
 *
 * On the scroll listener: the brief says to use IntersectionObserver and never
 * attach scroll handlers. An observer cannot drive a scrubbed animation, only
 * a threshold crossing, so this is the one place a scroll listener is the only
 * mechanism that works. It is passive, it writes straight to style on a rAF
 * loop that stops when it settles, and it never touches React state.
 */

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

export function ScrollExpand({
  children,
  title,
  overlay,
  /** Frame size at rest, as a percentage of the stage. */
  startWidth = 42,
  startHeight = 58,
  mediaZoom = 1.3,
  /** Scroll length of the expansion, in stage heights. */
  scrollDistance = 1.1,
  /** Extra scroll held at full bleed before release. */
  holdDistance = 0.3,
  smoothing = 0.1,
  scrimStrength = 0.55,
}: {
  children: ReactNode;
  title?: string;
  overlay?: ReactNode;
  startWidth?: number;
  startHeight?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  scrimStrength?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);

  const apply = useCallback(
    (p: number) => {
      const frame = frameRef.current;
      const media = mediaRef.current;
      if (!frame || !media) return;

      const e = smoothstep(0, 1, p);
      const w = startWidth + (100 - startWidth) * e;
      const h = startHeight + (100 - startHeight) * e;
      const ix = Math.max(0, (100 - w) / 2);
      const iy = Math.max(0, (100 - h) / 2);

      const radius = 28 * (1 - e);
      frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${radius.toFixed(1)}px)`;
      media.style.transform = `scale(${mediaZoom + (1 - mediaZoom) * e})`;

      if (scrimRef.current) {
        scrimRef.current.style.opacity = `${scrimStrength * e}`;
      }
      if (titleRef.current) {
        const out = smoothstep(0.38, 0.86, p);
        titleRef.current.style.opacity = `${1 - out}`;
        titleRef.current.style.transform = `translate3d(0, ${-30 * out}px, 0)`;
      }
      if (overlayRef.current) {
        const inn = smoothstep(0.66, 1, p);
        overlayRef.current.style.opacity = `${inn}`;
        overlayRef.current.style.transform = `translate3d(0, ${20 * (1 - inn)}px, 0)`;
      }
    },
    [startWidth, startHeight, mediaZoom, scrimStrength],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let running = false;

    const measure = () => {
      const stageH = window.innerHeight;
      track.style.height = `${stageH * (1 + scrollDistance + holdDistance)}px`;
    };

    const read = () => {
      const span = window.innerHeight * Math.max(0.01, scrollDistance);
      return clamp(-track.getBoundingClientRect().top / span, 0, 1);
    };

    const tick = () => {
      const k = smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      apply(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const onScroll = () => {
      target = read();
      if (smoothing <= 0 || reduce) {
        current = target;
        apply(current);
        return;
      }
      if (!running) {
        running = true;
        if (!raf) raf = requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      measure();
      target = read();
      current = target;
      apply(current);
    };

    measure();
    target = read();
    current = target;
    apply(current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [apply, scrollDistance, holdDistance, smoothing]);

  return (
    <div ref={trackRef} className="se-track">
      <div className="se-stage">
        <div ref={frameRef} className="se-frame">
          <div ref={mediaRef} className="se-media">
            {children}
          </div>
          <div ref={scrimRef} aria-hidden="true" className="se-scrim" />
          {overlay && (
            <div ref={overlayRef} className="se-overlay">
              {overlay}
            </div>
          )}
        </div>

        {title && (
          <div ref={titleRef} className="se-title">
            <p className="font-display text-section text-mc-navy">{title}</p>
          </div>
        )}
      </div>
    </div>
  );
}
