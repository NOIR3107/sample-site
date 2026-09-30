import type { Metadata } from "next";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { PageHeader } from "@/components/primitives/page-header";
import { Reveal } from "@/components/motion/reveal";
import { FaqList } from "@/components/primitives/faq-list";
import { LocationMap } from "@/components/contact/location-map";
import { BookingForm } from "@/components/booking/booking-form";
import { getFaqs, getPage, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a visit or call Meridian Climate in Portland, Oregon about heating, cooling or ventilation. The first survey on a new system is free.",
};

export default async function ContactPage() {
  const [copy, site, faqs] = await Promise.all([
    getPage("contact"),
    getSite(),
    getFaqs(),
  ]);

  return (
    <>
      <PageHeader title={copy.title} intro={copy.intro} />

      <Container>
        {/* Details on the left, the enquiry form on the right. */}
        <div className="grid grid-cols-12 gap-y-16 pb-16 lg:gap-x-12 lg:pb-24">
          <Reveal className="col-span-12 lg:col-span-4">
            <dl className="border-t border-mc-line">
              <div className="border-b border-mc-line py-6">
                <dt className="font-mono text-eyebrow uppercase text-mc-muted">
                  Phone
                </dt>
                <dd className="mt-3">
                  <a
                    href={site.phone.href}
                    className="font-mono text-xl text-mc-bone transition-colors duration-150 ease-mc hover:text-mc-copper"
                  >
                    {site.phone.display}
                  </a>
                </dd>
              </div>

              <div className="border-b border-mc-line py-6">
                <dt className="font-mono text-eyebrow uppercase text-mc-muted">
                  Email
                </dt>
                <dd className="mt-3">
                  <a
                    href={site.email.href}
                    className="font-mono text-spec text-mc-bone transition-colors duration-150 ease-mc hover:text-mc-copper"
                  >
                    {site.email.display}
                  </a>
                </dd>
              </div>

              <div className="border-b border-mc-line py-6">
                <dt className="font-mono text-eyebrow uppercase text-mc-muted">
                  Workshop
                </dt>
                <dd className="mt-3 font-mono text-spec leading-relaxed text-mc-bone">
                  <p>{site.address.line1}</p>
                  <p>{site.address.line2}</p>
                </dd>
              </div>

              {site.hours.map((entry) => (
                <div key={entry.label} className="border-b border-mc-line py-6">
                  <dt className="font-mono text-eyebrow uppercase text-mc-muted">
                    {entry.label}
                  </dt>
                  <dd className="mt-3 font-mono text-spec text-mc-bone">
                    {entry.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-12">
              <h2 className="font-mono text-eyebrow uppercase text-mc-muted">
                {copy.prompts.heading}
              </h2>
              <ol className="mt-6 border-t border-mc-line">
                {copy.prompts.items.map((item, index) => (
                  <li
                    key={item}
                    className="grid grid-cols-[2rem_1fr] items-baseline gap-4 border-b border-mc-line py-4"
                  >
                    <span className="font-mono text-spec text-mc-copper">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-mc-bone">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal
            delay={60}
            id="book"
            className="col-span-12 lg:col-span-7 lg:col-start-6"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-mc-surface p-5 sm:p-9">
              <div aria-hidden="true" className="bg-thermal absolute inset-x-0 top-0 h-1" />
              <div aria-hidden="true" className="glow -right-24 -top-24 size-80 bg-mc-ember/20" />
              <div className="relative">
                <h2 className="text-section text-mc-bone">Book a visit</h2>
                <p className="mt-4 max-w-[46ch] text-body text-mc-muted">
                  {copy.picker.note}
                </p>
                <div className="mt-10">
                  <BookingForm
                    phone={site.phone}
                    email={site.email.display}
                    idPrefix="contact"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* The map gets its own band. In the address cell it was a 200px
            column on a page you had to scroll to reach. */}
        <div className="grid grid-cols-12 gap-y-10 border-t border-mc-line pt-16 lg:gap-x-12 lg:pt-24">
          <Reveal className="col-span-12 lg:col-span-4">
            <h2 className="text-section text-mc-bone">Where we are</h2>
            <p className="mt-6 font-mono text-spec leading-relaxed text-mc-bone">
              {site.address.line1}
              <br />
              {site.address.line2}
            </p>
            <a
              href={site.address.directionsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex min-h-11 items-center gap-3 font-mono text-spec text-mc-bone underline decoration-mc-line underline-offset-4 transition-colors duration-150 ease-mc hover:text-mc-copper hover:decoration-mc-copper"
            >
              Directions
            </a>
          </Reveal>

          <Reveal delay={60} className="col-span-12 lg:col-span-7 lg:col-start-6">
            <LocationMap
              address={`${site.address.line1}, ${site.address.line2}`}
              lat={site.address.lat}
              lon={site.address.lon}
            />
          </Reveal>
        </div>
      </Container>

      {/* FAQs. Native disclosures, no JavaScript. */}
      <Section ruled className="mt-16 lg:mt-24">
        <Container>
          <div className="grid grid-cols-12 gap-y-10">
            <Reveal className="col-span-12 lg:col-span-4">
              <h2 className="text-section text-mc-bone">Common questions</h2>
            </Reveal>
            <Reveal delay={60} className="col-span-12 lg:col-span-7 lg:col-start-6">
              <FaqList items={faqs} />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
