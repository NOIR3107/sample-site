import type { Metadata } from "next";
import { Container } from "@/components/primitives/container";
import { PageHeader } from "@/components/primitives/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/project/project-card";
import { getPage, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Eight heating, cooling and ventilation projects across homes and commercial buildings, with the systems installed and the figures measured.",
};

export default async function ProjectsPage() {
  const [copy, projects] = await Promise.all([
    getPage("projects"),
    getProjects(),
  ]);

  return (
    <>
      <PageHeader title={copy.title} intro={copy.intro} />

      <Container>
        <div className="grid gap-y-20 pb-24 md:grid-cols-2 md:gap-x-10 lg:gap-x-16 lg:pb-40">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={(index % 2) * 60}
              // Every second card drops, so the index reads as a composition
              // rather than a grid of equal tiles.
              className={index % 2 === 1 ? "md:mt-28" : undefined}
            >
              <ProjectCard
                project={project}
                sizes="(min-width: 768px) 46vw, 100vw"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
