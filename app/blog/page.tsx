import type { Metadata } from "next";
import { Container } from "@/components/primitives/container";
import { PageHeader } from "@/components/primitives/page-header";
import { Reveal } from "@/components/motion/reveal";
import { BlogCard } from "@/components/blog/blog-card";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on sizing, commissioning, ventilation and maintenance from the engineers who do the work.",
};

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        title="Journal"
        intro="Notes on the things that decide whether a system works: sizing, commissioning, pressure and what maintenance should actually measure."
      />

      <Container>
        {posts.length === 0 ? (
          <p className="border-t border-mc-line py-16 font-mono text-spec text-mc-muted">
            Nothing published yet.
          </p>
        ) : (
          <div className="grid gap-x-10 gap-y-14 pb-24 md:grid-cols-2 lg:pb-40">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 2) * 60}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
