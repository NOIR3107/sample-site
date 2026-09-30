import { cn } from "@/lib/cn";

/**
 * Rationed deliberately: at most one per three sections. Mono is what makes
 * this read as engineering rather than marketing.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-eyebrow uppercase text-mc-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
