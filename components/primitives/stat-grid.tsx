import type { ProofItem } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Counters. Values marked as placeholders render in brackets with a dotted
 * rule rather than as invented numbers, which the brief bans.
 */
export function StatGrid({
  items,
  className,
}: {
  items: ProofItem[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="border-t border-mc-line pt-5">
          <dd
            className={
              item.placeholder
                ? "font-mono text-3xl tracking-[-0.02em] text-mc-muted underline decoration-mc-line decoration-dotted underline-offset-8"
                : "font-mono text-3xl tracking-[-0.02em] text-mc-bone"
            }
          >
            {item.placeholder ? `[ ${item.value} ]` : item.value}
          </dd>
          <dt className="mt-4 font-mono text-eyebrow uppercase text-mc-muted">
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
