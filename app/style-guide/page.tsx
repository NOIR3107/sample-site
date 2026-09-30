import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { PageHeader } from "@/components/primitives/page-header";
import { Button } from "@/components/primitives/button";
import { ArrowLink } from "@/components/primitives/arrow-link";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { SpecRow } from "@/components/primitives/spec-row";
import { StatGrid } from "@/components/primitives/stat-grid";
import { FaqList } from "@/components/primitives/faq-list";
import { TestimonialCard } from "@/components/primitives/testimonial-card";
import { getFaqs, getTestimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Style guide",
  description:
    "Colour, type, spacing and components for the Meridian Climate design system.",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "Black", token: "--color-mc-black", hex: "#0A0C0E", use: "Page background" },
  { name: "Surface", token: "--color-mc-surface", hex: "#12161A", use: "Raised bands and cards" },
  { name: "Line", token: "--color-mc-line", hex: "#1F262C", use: "Hairline borders" },
  { name: "Bone", token: "--color-mc-bone", hex: "#EDEBE6", use: "Primary text" },
  { name: "Muted", token: "--color-mc-muted", hex: "#7C858D", use: "Secondary text" },
  { name: "Copper", token: "--color-mc-copper", hex: "#B4643C", use: "The only accent" },
];

const typeScale = [
  { role: "Hero", cls: "text-hero", sample: "Air You Never Think About" },
  { role: "Section", cls: "text-section", sample: "Selected Work" },
  { role: "Card title", cls: "text-card", sample: "Alder Street House" },
  { role: "Body", cls: "text-body", sample: "We design systems, sized to the building." },
  { role: "Spec (mono)", cls: "font-mono text-spec", sample: "22 dB at the register" },
];

export default async function StyleGuidePage() {
  const [faqs, social] = await Promise.all([getFaqs(), getTestimonials()]);

  return (
    <>
      <PageHeader
        title="Style guide"
        intro="The tokens and components this site is built from. Not linked in the nav and not indexed; it exists so a designer or developer can see the system in one place."
      />

      <Container>
        {/* Colour */}
        <section className="border-t border-mc-line pt-12">
          <Eyebrow>Colour</Eyebrow>
          <p className="mt-5 max-w-[52ch] text-body text-mc-muted">
            Six values, one accent. Copper appears on under five percent of any
            screen and is never a large fill behind text. Never pure black and
            never pure white.
          </p>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {swatches.map((s) => (
              <li key={s.token}>
                <div
                  className="h-24 w-full border border-mc-line"
                  style={{ backgroundColor: s.hex }}
                />
                <p className="mt-4 text-card text-mc-bone">{s.name}</p>
                <p className="mt-2 font-mono text-spec text-mc-copper">{s.hex}</p>
                <p className="mt-1 font-mono text-eyebrow uppercase text-mc-muted">
                  {s.token}
                </p>
                <p className="mt-2 text-sm text-mc-muted">{s.use}</p>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      {/* Type */}
      <Section ruled>
        <Container>
          <Eyebrow>Type</Eyebrow>
          <p className="mt-5 max-w-[52ch] text-body text-mc-muted">
            Instrument Sans for everything, JetBrains Mono on technical detail:
            codes, spec values, prices, the phone number and eyebrows.
          </p>
          <dl className="mt-12 border-b border-mc-line">
            {typeScale.map((t) => (
              <div
                key={t.role}
                className="grid gap-3 border-t border-mc-line py-8 lg:grid-cols-[12rem_1fr] lg:gap-8"
              >
                <dt className="font-mono text-eyebrow uppercase text-mc-muted">
                  {t.role}
                </dt>
                <dd className={`${t.cls} text-mc-bone`}>{t.sample}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Controls */}
      <Section surface ruled>
        <Container>
          <Eyebrow>Controls</Eyebrow>
          <p className="mt-5 max-w-[52ch] text-body text-mc-muted">
            Two-pixel radius on controls, zero on cards and images. No shadows
            anywhere: depth comes from surface contrast and hairlines.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button href="/contact/" className="group">
              Primary
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-4 transition-transform duration-150 ease-mc motion-safe:lg:group-hover:translate-x-1"
              />
            </Button>
            <Button href="/contact/" variant="ghost">
              Ghost
            </Button>
            <ArrowLink href="/projects/">Arrow link</ArrowLink>
          </div>

          <div className="mt-14 max-w-xl">
            <Eyebrow>Spec rows</Eyebrow>
            <dl className="mt-6 border-b border-mc-line">
              <SpecRow label="System" value="Ducted air-source heat pump" />
              <SpecRow label="Zones" value="4" />
              <SpecRow label="Measured" value="22 dB at the register" />
            </dl>
          </div>
        </Container>
      </Section>

      {/* Placeholder convention */}
      <Section ruled>
        <Container>
          <Eyebrow>Placeholder convention</Eyebrow>
          <p className="mt-5 max-w-[62ch] text-body text-mc-muted">
            Anything the operator has to supply renders in brackets with a
            dotted rule, rather than as an invented number or a fabricated
            quote. Fill the value in and the treatment disappears on its own.
          </p>
          <StatGrid
            className="mt-12"
            items={[
              { label: "Real value", value: "EPA 608 Universal" },
              { label: "Awaiting input", value: "number", placeholder: true },
              { label: "Awaiting input", value: "year", placeholder: true },
              { label: "Real value", value: "4 hours" },
            ]}
          />
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {social.items.slice(0, 3).map((item) => (
              <li key={item.id}>
                <TestimonialCard item={item} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Disclosure */}
      <Section surface ruled>
        <Container>
          <Eyebrow>Disclosure</Eyebrow>
          <div className="mt-8 max-w-2xl">
            <FaqList items={faqs.slice(0, 3)} />
          </div>
        </Container>
      </Section>
    </>
  );
}
