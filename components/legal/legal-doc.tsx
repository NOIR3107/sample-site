import { Container } from "@/components/primitives/container";
import { PageHeader } from "@/components/primitives/page-header";
import { Reveal } from "@/components/motion/reveal";
import type { LegalDoc } from "@/lib/content";

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHeader
        title={doc.title}
        meta={`Updated ${doc.updated}`}
        intro={doc.intro}
      />

      <Container>
        <div className="grid grid-cols-12 pb-24 lg:pb-40">
          <div className="col-span-12 lg:col-span-7 lg:col-start-2">
            {doc.sections.map((section, index) => (
              <Reveal
                key={section.heading}
                delay={index * 60}
                className="border-t border-mc-line py-10 lg:py-14"
              >
                <h2 className="text-card text-mc-bone">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-5 max-w-[62ch] text-body text-mc-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
