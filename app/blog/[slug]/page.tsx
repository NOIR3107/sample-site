import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/motion/reveal";
import { getPost, getPostSlugs, getPosts } from "@/lib/content";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = await getPosts();
  const index = all.findIndex((p) => p.slug === slug);
  const next = all[(index + 1) % all.length];

  return (
    <article className="relative">
      <header className="pb-12 pt-36 lg:pb-16 lg:pt-52">
        <Container>
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-9">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-eyebrow uppercase text-mc-muted">
                <span className="text-mc-copper">{post.topic}</span>
                <time dateTime={post.datetime}>{post.date}</time>
                <span>{post.readMinutes} min read</span>
              </div>
              <h1 className="mt-7 text-hero text-mc-bone">{post.title}</h1>
            </div>
          </div>
        </Container>
      </header>

      <Container>
        <Reveal className="grid grid-cols-12 pb-20 lg:pb-28">
          <div className="col-span-12 lg:col-span-7 lg:col-start-2">
            <p className="text-section text-mc-bone">{post.excerpt}</p>
            {post.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-7 max-w-[62ch] text-body text-mc-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>

      {next && next.slug !== post.slug && (
        <Section surface ruled className="py-16 lg:py-24">
          <Container>
            <Link href={`/blog/${next.slug}/`} className="group block">
              <p className="font-mono text-eyebrow uppercase text-mc-muted">
                Next
              </p>
              <p className="mt-5 flex items-center gap-4 text-section text-mc-bone transition-colors duration-150 ease-mc group-hover:text-mc-copper">
                {next.title}
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-7 shrink-0 text-mc-copper transition-transform duration-150 ease-mc motion-safe:lg:group-hover:translate-x-1"
                />
              </p>
            </Link>
          </Container>
        </Section>
      )}
    </article>
  );
}
