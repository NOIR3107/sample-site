import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  children: ReactNode;
  /** Alternating band. Depth comes from surface contrast, never shadow. */
  surface?: boolean;
  /** Hairline above the section instead of a colour change. */
  ruled?: boolean;
  id?: string;
  className?: string;
};

/** Vertical rhythm: 96px mobile, 160px desktop. */
export function Section({
  children,
  surface = false,
  ruled = false,
  id,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 lg:py-40",
        surface && "bg-mc-surface",
        ruled && "border-t border-mc-line",
        className,
      )}
    >
      {children}
    </section>
  );
}
