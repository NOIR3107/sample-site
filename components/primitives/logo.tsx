import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * The mark: a globe in the thermal gradient, cut by one meridian. Cold on
 * the left, warm on the right, which is the whole business in one shape.
 */
export function LogoMark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
    >
      <defs>
        <linearGradient id={`lm-${id}`} x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor="#2b84c6" />
          <stop offset="0.5" stopColor="#7cc0ea" />
          <stop offset="1" stopColor="#e8622b" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill={`url(#lm-${id})`} />
      <ellipse
        cx="16"
        cy="16"
        rx="6.5"
        ry="15"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
      />
      <path d="M1.5 16h29" stroke="#ffffff" strokeWidth="2" />
    </svg>
  );
}

export function Logo({
  name,
  className,
  invert = false,
}: {
  name: string;
  className?: string;
  /** White wordmark, for dark bands. */
  invert?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "font-display text-[1.35rem] leading-none tracking-[-0.02em]",
          invert ? "text-white" : "text-mc-navy",
        )}
      >
        {name}
      </span>
    </span>
  );
}
