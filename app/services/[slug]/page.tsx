import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/motion/reveal";
import { ImageFrame } from "@/components/media/image-frame";
import { Button } from "@/components/primitives/button";
import { TestimonialCard } from "@/components/primitives/testimonial-card";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import {
  getRelatedServices,
  getService,
  getServiceIds,
  getServices,
  getSite,
  getTestimonials,
} from "@/lib/content";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getServiceIds()).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return { title: service.name, description: service.description };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const [related, site, allServices, social] = await Promise.all([
    getRelatedServices(slug, 2),
    getSite(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <article>
      <header className="pb-14 pt-36 lg:pb-20 lg:pt-52">
        <Container>
          <div className="grid grid-cols-12 items-end gap-8">
            <div className="col-span-12 lg:col-span-7">
              <p className="font-mono text-spec text-mc-copper">
                {service.number}
              </p>
              <h1 className="mt-6 text-hero text-mc-bone">{service.name}</h1>
              <p className="mt-8 max-w-[52ch] text-body text-mc-muted">
                {service.description}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              <Button href={site.phone.href} variant="ghost">
                <Phone
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-4 text-mc-copper"
                />
                <span className="font-mono">{site.phone.display}</span>
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <Container>
        <Reveal>
          <ImageFrame
            src={service.image.src}
            alt={service.image.alt}
            sizes="(min-width: 1440px) 1344px, 100vw"
            className="aspect-16/9"
          />
        </Reveal>
      </Container>

      {/* Lead plus how the work runs. */}
      <Section>
        <Container>
          <div className="grid grid-cols-12 gap-y-12">
            <Reveal className="col-span-12 lg:col-span-5">
              <p className="text-section text-mc-bone">{service.lead}</p>
            </Reveal>

            <Reveal delay={60} className="col-span-12 lg:col-span-6 lg:col-start-7">
              <h2 className="font-mono text-eyebrow uppercase text-mc-muted">
                How it runs
              </h2>
              <ol className="mt-8 border-b border-mc-line">
                {service.process.map((step, index) => (
                  <li
                    key={step}
                    className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-t border-mc-line py-5"
                  >
                    <span className="font-mono text-spec text-mc-copper">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body text-mc-bone">{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What you get. */}
      <Section surface ruled>
        <Container>
          <div className="grid grid-cols-12 gap-y-10">
            <Reveal className="col-span-12 lg:col-span-4">
              <h2 className="text-section text-mc-bone">What is included</h2>
            </Reveal>
            <Reveal delay={60} className="col-span-12 lg:col-span-7 lg:col-start-6">
              <ul className="border-t border-mc-line">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="border-b border-mc-line py-4 font-mono text-spec text-mc-bone"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Reviews. Empty slots until real quotes exist. */}
      <Section>
        <Container>
          <Reveal className="grid grid-cols-12 items-end gap-6">
            <h2 className="col-span-12 text-section text-mc-bone lg:col-span-7">
              {social.heading}
            </h2>
            <p className="col-span-12 max-w-[40ch] font-mono text-eyebrow uppercase leading-relaxed text-mc-muted lg:col-span-4 lg:col-start-9">
              {social.note}
            </p>
          </Reveal>
          <ul className="mt-14 grid gap-10 md:grid-cols-3 lg:mt-20">
            {social.items.map((item, index) => (
              <Reveal as="li" key={item.id} delay={index * 60}>
                <TestimonialCard item={item} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Callback form. */}
      <Section surface ruled>
        <Container>
          <div className="grid grid-cols-12 gap-y-10">
            <Reveal className="col-span-12 lg:col-span-4">
              <h2 className="text-section text-mc-bone">Ask us to call</h2>
              <p className="mt-6 max-w-[34ch] text-body text-mc-muted">
                Leave a number and say which building it is about. We will call
                back the same working day.
              </p>
            </Reveal>
            <Reveal delay={60} className="col-span-12 lg:col-span-7 lg:col-start-6">
              <EnquiryForm
                variant="short"
                email={site.email.display}
                services={allServices.map((s) => ({ id: s.id, name: s.name }))}
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Related services, so the page never dead-ends. */}
      <Section>
        <Container>
          <Reveal>
            <h2 className="font-mono text-eyebrow uppercase text-mc-muted">
              Also relevant
            </h2>
          </Reveal>
          <ul className="mt-8 border-b border-mc-line">
            {related.map((item, index) => (
              <Reveal as="li" key={item.id} delay={index * 60}>
                <Link
                  href={`/services/${item.id}/`}
                  className="group grid grid-cols-[2.5rem_1fr_1.5rem] items-baseline gap-x-4 border-t border-mc-line py-7 transition-colors duration-150 ease-mc hover:bg-mc-surface"
                >
                  <span className="font-mono text-spec text-mc-copper">
                    {item.number}
                  </span>
                  <span className="text-card text-mc-bone">{item.name}</span>
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-4 self-center justify-self-end text-mc-copper opacity-0 transition-opacity duration-150 ease-mc group-hover:opacity-100"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </article>
  );
}
