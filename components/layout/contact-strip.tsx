import { Phone } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { getSite } from "@/lib/content";

/**
 * Contact details immediately under the hero.
 *
 * Taken from the Constructor X construction template, which puts phone, email
 * and address in a strip directly below the fold. For a trade business that is
 * the right instinct: the number is the conversion, and burying it in the
 * footer costs calls.
 *
 * The execution is ours, not theirs. Hairline-divided mono cells rather than
 * a filled bar, and no superlatives.
 */
export async function ContactStrip() {
  const site = await getSite();

  return (
    <section className="border-b border-mc-line">
      <Container>
        <dl className="grid divide-y divide-mc-line md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="py-8 md:pr-8">
            <dt className="font-mono text-eyebrow uppercase text-mc-muted">
              Call
            </dt>
            <dd className="mt-3">
              <a
                href={site.phone.href}
                className="inline-flex min-h-11 items-center gap-3 font-mono text-xl text-mc-bone transition-colors duration-150 ease-mc hover:text-mc-copper"
              >
                <Phone
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-4 shrink-0 text-mc-copper"
                />
                {site.phone.display}
              </a>
            </dd>
          </div>

          <div className="py-8 md:px-8">
            <dt className="font-mono text-eyebrow uppercase text-mc-muted">
              Email
            </dt>
            <dd className="mt-3">
              <a
                href={site.email.href}
                className="inline-flex min-h-11 items-center font-mono text-spec text-mc-bone transition-colors duration-150 ease-mc hover:text-mc-copper"
              >
                {site.email.display}
              </a>
            </dd>
          </div>

          <div className="py-8 md:pl-8">
            <dt className="font-mono text-eyebrow uppercase text-mc-muted">
              Workshop
            </dt>
            <dd className="mt-3 font-mono text-spec leading-relaxed text-mc-muted">
              <p>{site.address.line1}</p>
              <p>{site.address.line2}</p>
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
