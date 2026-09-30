import type { Metadata } from "next";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { PageHeader } from "@/components/primitives/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ImageFrame } from "@/components/media/image-frame";
import { ServiceCard } from "@/components/service/service-card";
import { getPage, getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "System design, installation, service, maintenance, air quality and controls for homes and buildings in Portland, Oregon.",
};

export default async function ServicesPage() {
  const [copy, services] = await Promise.all([
    getPage("services"),
    getServices(),
  ]);

  return (
    <>
      <PageHeader title={copy.title} intro={copy.intro} />

      {/* Cards here, numbered index on the homepage. Each links to its own
          page, which is where the detail now lives. */}
      <Container>
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 3) * 60}>
              <ServiceCard
                service={service}
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
              />
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Two sector blocks. Image side alternates so the pair is not a
          repeated left-image row. */}
      {copy.sectors.map((sector, index) => (
        <Section key={sector.id} surface={index === 1}>
          <Container>
            <div
              id={sector.id}
              className="grid grid-cols-12 items-start gap-y-12 scroll-mt-28 lg:gap-x-12"
            >
              <Reveal
                className={
                  index === 0
                    ? "col-span-12 lg:col-span-5"
                    : "col-span-12 lg:col-span-5 lg:col-start-8 lg:row-start-1"
                }
              >
                <ImageFrame
                  src={sector.image.src}
                  alt={sector.image.alt}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="aspect-4/5"
                />
              </Reveal>

              <Reveal
                delay={60}
                className={
                  index === 0
                    ? "col-span-12 lg:col-span-6 lg:col-start-7"
                    : "col-span-12 lg:col-span-6 lg:col-start-1 lg:row-start-1"
                }
              >
                <h2 className="text-section text-mc-bone">{sector.title}</h2>
                <p className="mt-8 max-w-[46ch] text-body text-mc-bone">
                  {sector.lead}
                </p>
                {sector.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-6 max-w-[52ch] text-body text-mc-muted"
                  >
                    {paragraph}
                  </p>
                ))}

                <ul className="mt-10 border-t border-mc-line">
                  {sector.points.map((point) => (
                    <li
                      key={point}
                      className="border-b border-mc-line py-4 font-mono text-spec text-mc-bone"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}
