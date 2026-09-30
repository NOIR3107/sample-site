import Link from "next/link";
import { ImageFrame } from "@/components/media/image-frame";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Shared by the homepage scroll strip and the projects index, so a change to
 * the card shape lands in both places.
 */
export function ProjectCard({
  project,
  sizes,
  className,
}: {
  project: Project;
  sizes: string;
  className?: string;
}) {
  return (
    <article className={cn("group relative", className)}>
      <ImageFrame
        src={project.cover.src}
        alt={project.cover.alt}
        sizes={sizes}
        className="aspect-4/3"
      />

      <p className="mt-6 font-mono text-spec text-mc-muted">#{project.code}</p>

      <h3 className="mt-2 text-card text-mc-bone">
        <Link
          href={`/projects/${project.slug}/`}
          className="transition-colors duration-150 ease-mc after:absolute after:inset-0 after:content-[''] group-hover:text-mc-copper"
        >
          {project.name}
        </Link>
      </h3>

      <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-mc-muted">
        {project.caption}
      </p>
    </article>
  );
}
