import Link from "next/link";
import type { Post } from "@/lib/content";
import { cn } from "@/lib/cn";

export function BlogCard({ post, className }: { post: Post; className?: string }) {
  return (
    <article className={cn("group relative flex flex-col border-t border-mc-line pt-6", className)}>
      <div className="flex items-center gap-4 font-mono text-eyebrow uppercase text-mc-muted">
        <span className="text-mc-copper">{post.topic}</span>
        <time dateTime={post.datetime}>{post.date}</time>
      </div>

      <h3 className="mt-5 text-card text-mc-bone">
        <Link
          href={`/blog/${post.slug}/`}
          className="transition-colors duration-150 ease-mc after:absolute after:inset-0 after:content-[''] group-hover:text-mc-copper"
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-mc-muted">
        {post.excerpt}
      </p>

      <p className="mt-5 font-mono text-eyebrow uppercase text-mc-muted">
        {post.readMinutes} min read
      </p>
    </article>
  );
}
