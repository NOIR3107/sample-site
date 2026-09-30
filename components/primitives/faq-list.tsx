import { Plus } from "lucide-react";
import type { Faq } from "@/lib/content";

/**
 * Native details accordion. No JavaScript, keyboard and screen-reader
 * accessible by default, and it costs the bundle nothing.
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="border-b border-mc-line">
      {items.map((item) => (
        <details key={item.q} className="group border-t border-mc-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 transition-colors duration-150 ease-mc hover:text-mc-copper [&::-webkit-details-marker]:hidden">
            <span className="text-body text-mc-bone">{item.q}</span>
            <Plus
              aria-hidden="true"
              strokeWidth={1.5}
              className="mt-1 size-4 shrink-0 text-mc-copper transition-transform duration-150 ease-mc group-open:rotate-45"
            />
          </summary>
          <p className="max-w-[62ch] pb-7 text-body text-mc-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
