import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "light" | "ember";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-mc " +
  "active:scale-[0.97] motion-reduce:active:scale-100";

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-sm",
  lg: "min-h-14 px-7 text-base",
};

const variants: Record<Variant, string> = {
  // Navy ink: the primary action. White on navy clears 16:1.
  primary:
    "btn-sheen bg-mc-navy text-white shadow-card hover:-translate-y-0.5 hover:bg-[#17304a] hover:shadow-lift",
  // White card with a hairline. For the second action beside a primary.
  ghost:
    "border border-mc-line bg-white text-mc-navy hover:-translate-y-0.5 hover:border-mc-navy/30 hover:shadow-card",
  // For dark bands.
  light: "bg-white text-mc-navy hover:-translate-y-0.5 hover:bg-mc-ice",
  // Heat and urgency: emergency and offers. Navy ink on ember clears 4.7:1.
  ember:
    "btn-sheen bg-mc-ember font-semibold text-mc-navy shadow-ember hover:-translate-y-0.5 hover:bg-[#f0773f]",
};

/**
 * `book` turns the button into a booking trigger. It still links to the
 * booking form on /contact/, so it works without JavaScript; with it, the
 * BookingDialog intercepts the click and opens in place. Pass a string to
 * preselect what the visitor needs.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  book,
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  book?: boolean | string;
  className?: string;
  ariaLabel?: string;
}) {
  const classes = cn(base, sizes[size], variants[variant], className);
  const bookAttr =
    book === undefined || book === false
      ? undefined
      : book === true
        ? ""
        : book;

  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        className={classes}
        data-book={bookAttr}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} data-book={bookAttr} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
