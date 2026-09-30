import { WorkGallery } from "@/components/home/work-gallery";
import { getHome, getProjects } from "@/lib/content";

/** Server wrapper: picks the projects and hands plain data to the gallery. */
export async function SelectedWork() {
  const [{ work }, projects] = await Promise.all([getHome(), getProjects()]);

  const picked = work.slugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p) => p !== undefined)
    .map((p) => ({
      slug: p.slug,
      code: p.code,
      name: p.name,
      sector: p.sector,
      caption: p.caption,
      cover: p.cover,
    }));

  return (
    <WorkGallery projects={picked} heading={work.heading} sub={work.sub} href={work.href} linkLabel={work.linkLabel} />
  );
}
