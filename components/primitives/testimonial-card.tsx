import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/content";

/**
 * Renders a real quote when one exists. When it does not, it renders a
 * visible empty slot rather than an invented quote attributed to an invented
 * person, which the brief bans by name.
 */
export function TestimonialCard({ item }: { item: Testimonial }) {
  const hasQuote = item.quote.trim().length > 0;

  return (
    <figure className="flex h-full flex-col border-t border-mc-line pt-6">
      <Quote
        aria-hidden="true"
        strokeWidth={1.5}
        className="size-5 text-mc-copper"
      />

      <blockquote className="mt-5 flex-1">
        {hasQuote ? (
          <p className="max-w-[38ch] text-body text-mc-bone">{item.quote}</p>
        ) : (
          <p className="max-w-[38ch] font-mono text-spec leading-relaxed text-mc-muted underline decoration-mc-line decoration-dotted underline-offset-8">
            [ quote ]
          </p>
        )}
      </blockquote>

      <figcaption className="mt-8">
        <p className="font-mono text-eyebrow uppercase text-mc-muted">
          {item.context}
        </p>
        <p className="mt-2 font-mono text-spec text-mc-bone">
          {item.attribution || "[ name, role ]"}
        </p>
      </figcaption>
    </figure>
  );
}
