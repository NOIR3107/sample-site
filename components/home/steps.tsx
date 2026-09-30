"use client";

import { useRef } from "react";
import { m, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Container } from "@/components/primitives/container";
import { FadeIn } from "@/components/motion/fx";

type Step = { title: string; text: string };

/**
 * Three steps, joined by a line that draws itself as the section passes
 * through the viewport (horizontal on desktop, down the left on phones).
 * Each number lights as the line reaches it.
 */
export function Steps({ heading, steps }: { heading: string; steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <section className="border-y border-mc-line bg-white py-24 lg:py-32">
      <Container>
        <FadeIn className="max-w-2xl">
          <h2 className="text-section text-mc-navy">{heading}</h2>
        </FadeIn>

        <ol ref={ref} className="relative mt-16 grid gap-12 lg:mt-20 lg:grid-cols-3 lg:gap-10">
          <div aria-hidden="true" className="absolute left-7 top-2 bottom-2 w-0.5 -translate-x-1/2 rounded-full bg-mc-line lg:left-0 lg:right-0 lg:top-7 lg:bottom-auto lg:h-0.5 lg:w-auto lg:translate-x-0">
            <m.div className="bg-thermal h-full w-full origin-top rounded-full lg:hidden" style={{ scaleY: progress }} />
            <m.div className="bg-thermal hidden h-full w-full origin-left rounded-full lg:block" style={{ scaleX: progress }} />
          </div>
          {steps.map((step, index) => (
            <StepItem key={step.title} step={step} index={index} count={steps.length} progress={progress} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

function StepItem({
  step,
  index,
  count,
  progress,
}: {
  step: Step;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const at = index / count;
  const lit = useTransform(progress, [Math.max(0, at - 0.02), at + 0.08], [0, 1]);
  const bg = useTransform(lit, [0, 1], ["#ffffff", "#0c1a26"]);
  const fg = useTransform(lit, [0, 1], ["#0c1a26", "#ffffff"]);
  const y = useTransform(lit, [0, 1], [16, 0]);
  const opacity = useTransform(lit, [0, 1], [0.45, 1]);

  return (
    <li className="relative grid grid-cols-[3.5rem_1fr] gap-5 lg:block">
      <m.span
        className="relative z-[1] inline-flex size-14 items-center justify-center rounded-full border border-mc-line font-display text-2xl"
        style={{ backgroundColor: bg, color: fg }}
      >
        {index + 1}
      </m.span>
      <m.div style={{ y, opacity }} className="lg:mt-8">
        <h3 className="text-[1.375rem] text-mc-navy">{step.title}</h3>
        <p className="mt-3 max-w-[34ch] text-body text-mc-muted">{step.text}</p>
      </m.div>
    </li>
  );
}
