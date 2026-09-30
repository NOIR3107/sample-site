"use client";

import type { CSSProperties, ReactNode, Ref } from "react";
import { useReveal } from "@/lib/use-reveal";

type Allowed = "div" | "li" | "article" | "section" | "header" | "figure";

/**
 * Client leaf. Children are passed in as a prop, so everything inside stays a
 * Server Component and never reaches the browser bundle.
 */
export function Reveal({
  as = "div",
  delay = 0,
  className,
  id,
  children,
}: {
  as?: Allowed;
  /** Stagger siblings by 60ms steps. */
  delay?: number;
  className?: string;
  /** Lets a revealed section double as an in-page scroll target. */
  id?: string;
  children: ReactNode;
}) {
  const ref = useReveal();
  // Typed as "div": React Three Fiber widens JSX's intrinsic elements, which
  // collapses a generic ElementType's props to never.
  const Tag = as as "div";

  return (
    <Tag
      ref={ref as Ref<HTMLDivElement>}
      id={id}
      data-reveal=""
      className={className}
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined
      }
    >
      {children}
    </Tag>
  );
}
