import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageFrame } from "@/components/media/image-frame";
import type { Service } from "@/lib/content";
import { cn } from "@/lib/cn";

/** Card form of a service, used on the services index. */
export function ServiceCard({
  service,
  sizes,
  className,
}: {
  service: Service;
  sizes: string;
  className?: string;
}) {
  return (
    <article className={cn("group relative", className)}>
      <ImageFrame
        src={service.image.src}
        alt={service.image.alt}
        sizes={sizes}
        className="aspect-4/3"
      />

      <p className="mt-6 font-mono text-spec text-mc-copper">
        {service.number}
      </p>

      <h3 className="mt-2 flex items-center gap-3 text-card text-mc-bone">
        <Link
          href={`/services/${service.id}/`}
          className="transition-colors duration-150 ease-mc after:absolute after:inset-0 after:content-[''] group-hover:text-mc-copper"
        >
          {service.name}
        </Link>
        <ArrowRight
          aria-hidden="true"
          strokeWidth={1.5}
          className="size-4 shrink-0 text-mc-copper opacity-0 transition-opacity duration-150 ease-mc group-hover:opacity-100"
        />
      </h3>

      <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-mc-muted">
        {service.description}
      </p>
    </article>
  );
}
