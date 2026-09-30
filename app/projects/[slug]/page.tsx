import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUp } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/motion/reveal";
import { ImageFrame } from "@/components/media/image-frame";
import { SpecRow } from "@/components/primitives/spec-row";
import { getNextProject, getProject, getProjectSlugs } from "@/lib/content";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

/** Only the eight known codes exist; anything else is a 404, not a render. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: `${project.name} (#${project.code})`,
    description: project.caption,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const next = await getNextProject(slug);
  const images = [project.cover, project.detail];

  return (
    <article id="top">
      <header className="pb-16 pt-36 lg:pb-24 lg:pt-52">
        <Container>
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-9">
              <p className="font-mono text-spec text-mc-copper">
                #{project.code}
              </p>
              <h1 className="mt-6 text-hero text-mc-bone">{project.name}</h1>
              <p className="mt-8 max-w-[56ch] font-mono text-spec leading-relaxed text-mc-muted">
                {project.caption}
              </p>
            </div>
          </div>
        </Container>
      </header>

      {/* Spec table. Keys in sans, values in mono, one hairline per row. */}
      <Container>
        <Reveal>
          <dl className="grid border-b border-mc-line md:grid-cols-2 md:gap-x-16">
            {project.specs.map((spec) => (
              <SpecRow key={spec.label} label={spec.label} value={spec.value} />
            ))}
          </dl>
        </Reveal>
      </Container>

      <Container>
        <Reveal className="grid grid-cols-12 py-16 lg:py-24">
          <div className="col-span-12 lg:col-span-7 lg:col-start-2">
            {project.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-6 max-w-[62ch] text-body text-mc-bone first:mt-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* Vertical image stack, full width, generous gaps. */}
      <Container>
        <div className="flex flex-col gap-6 pb-24 lg:gap-16 lg:pb-40">
          {images.map((image, index) => (
            <Reveal key={image.src} delay={index * 60}>
              <ImageFrame
                src={image.src}
                alt={image.alt}
                sizes="(min-width: 1440px) 1344px, 100vw"
                className="aspect-16/10"
              />
            </Reveal>
          ))}
        </div>
      </Container>

      {/* The loop. Without this the portfolio dead-ends on MC008. */}
      {next && (
        <section className="border-t border-mc-line bg-mc-surface">
          <Container>
            <div className="flex flex-col gap-10 py-16 sm:flex-row sm:items-end sm:justify-between lg:py-24">
              <Link href={`/projects/${next.slug}/`} className="group block">
                <p className="font-mono text-eyebrow uppercase text-mc-muted">
                  Next project
                </p>
                <p className="mt-5 flex items-center gap-4 text-section text-mc-bone transition-colors duration-150 ease-mc group-hover:text-mc-copper">
                  {next.name}
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-7 shrink-0 text-mc-copper transition-transform duration-150 ease-mc motion-safe:lg:group-hover:translate-x-1"
                  />
                </p>
                <p className="mt-3 font-mono text-spec text-mc-muted">
                  #{next.code}
                </p>
              </Link>

              <a
                href="#top"
                className="group inline-flex min-h-11 shrink-0 items-center gap-3 self-start text-sm text-mc-muted transition-colors duration-150 ease-mc hover:text-mc-bone sm:self-end"
              >
                Back to top
                <ArrowUp
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-4 text-mc-copper transition-transform duration-150 ease-mc motion-safe:lg:group-hover:-translate-y-1"
                />
              </a>
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
