import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * The copper arrow is the accent's main job on this site. It nudges 4px on
 * hover; nothing else in the row moves.
 */
export function ArrowLink({
  href,
  children,
  className,
  /** Stretch a hit area over the whole parent (parent needs `relative`). */
  overlay = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  overlay?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/arrow inline-flex items-center gap-3 text-sm text-mc-bone",
        "transition-colors duration-150 ease-mc hover:text-mc-copper",
        overlay && "after:absolute after:inset-0 after:content-['']",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        strokeWidth={1.5}
        className={cn(
          "size-4 shrink-0 text-mc-copper",
          "transition-transform duration-150 ease-mc",
          "motion-safe:lg:group-hover/arrow:translate-x-1",
        )}
      />
    </Link>
  );
}
