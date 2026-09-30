import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Every image on the site goes through here. `fill` plus an aspect-ratio on
 * the parent means the box is reserved before the bytes arrive, which is what
 * keeps CLS at zero. Zoom only fires if an ancestor carries `group`.
 */
export function ImageFrame({
  src,
  alt,
  sizes,
  className,
  preload = false,
}: {
  src: string;
  alt: string;
  /** Must match the rendered width at each breakpoint or the optimizer over-serves. */
  sizes: string;
  className?: string;
  /** Next 16 replacement for the deprecated `priority` prop. */
  preload?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-card bg-mc-surface", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={80}
        preload={preload}
        className="img-zoom object-cover"
      />
    </div>
  );
}
