import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/motion/reveal";

/**
 * Shared top block for inner pages. The generous top padding is what clears
 * the absolutely-positioned site header, so every page gets it from here
 * rather than remembering to add it.
 */
export function PageHeader({
  title,
  intro,
  meta,
}: {
  title: string;
  intro?: string;
  /** Optional mono line under the title, e.g. a project code. */
  meta?: string;
}) {
  return (
    <header className="pb-16 pt-36 lg:pb-24 lg:pt-52">
      <Container>
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-hero text-mc-bone">{title}</h1>
            {meta && (
              <p className="mt-6 font-mono text-spec text-mc-copper">{meta}</p>
            )}
            {intro && (
              <p className="mt-8 max-w-[52ch] text-body text-mc-muted">
                {intro}
              </p>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

/** Same spacing contract, but revealed on scroll for below-the-fold blocks. */
export function SectionHeading({
  title,
  link,
}: {
  title: string;
  link?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 items-end gap-6">
      <Reveal className="col-span-12 lg:col-span-7">
        <h2 className="text-section text-mc-bone">{title}</h2>
      </Reveal>
      {link && (
        <Reveal className="col-span-12 lg:col-span-4 lg:col-start-9 lg:justify-self-end">
          {link}
        </Reveal>
      )}
    </div>
  );
}
