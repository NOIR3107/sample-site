import { CountUp } from "@/components/motion/count-up";
import { cn } from "@/lib/cn";

/**
 * Spec values are strings like "22 dB at the register" or "2,650 sq ft".
 * When one opens with a number, that number counts up as the row scrolls in
 * and the rest of the string is left alone.
 */
function splitLeadingNumber(value: string) {
  const m = /^(\d[\d,]*)(.*)$/.exec(value.trim());
  if (!m) return null;
  const n = Number(m[1].replace(/,/g, ""));
  if (!Number.isFinite(n) || n === 0) return null;
  return { n, rest: m[2] };
}

/** Key on the left in sans, value on the right in mono. Hairline between. */
export function SpecRow({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-1 border-t border-mc-line py-4",
        "sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8",
        className,
      )}
    >
      <dt className="text-sm text-mc-muted">{label}</dt>
      <dd className="font-mono text-spec text-mc-bone">
        {(() => {
          const parsed = splitLeadingNumber(value);
          if (!parsed) return value;
          return (
            <>
              {/* The whole string stays readable to assistive tech and with
                  JavaScript off; only the visual copy animates. */}
              <span className="sr-only">{value}</span>
              <span aria-hidden="true">
                <CountUp to={parsed.n} />
                {parsed.rest}
              </span>
            </>
          );
        })()}
      </dd>
    </div>
  );
}
