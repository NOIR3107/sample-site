import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/primitives/button";
import { getSite } from "@/lib/content";

/**
 * Reusable call-to-action band. `variant="closing"` is the large end-of-page
 * statement; `variant="inline"` is the quieter mid-page one whose action is
 * the phone number rather than a second button with the same intent.
 */
export async function CtaBand({
  heading,
  text,
  cta,
  variant = "closing",
}: {
  heading: string;
  text?: string;
  cta?: { label: string; href: string };
  variant?: "closing" | "inline";
}) {
  const site = await getSite();
  const closing = variant === "closing";

  return (
    <section className="border-t border-mc-line bg-mc-surface">
      <Container>
        <Reveal
          className={
            closing
              ? "grid grid-cols-12 py-28 lg:py-44"
              : "grid grid-cols-12 items-end gap-8 py-16 lg:py-24"
          }
        >
          <div className={closing ? "col-span-12 lg:col-span-8" : "col-span-12 lg:col-span-7"}>
            <h2 className={closing ? "text-hero text-mc-bone" : "text-section text-mc-bone"}>
              {heading}
            </h2>
            {text && (
              <p className="mt-6 max-w-[46ch] text-body text-mc-muted">{text}</p>
            )}
          </div>

          <div
            className={
              closing
                ? "col-span-12 mt-12 flex flex-wrap items-center gap-4"
                : "col-span-12 lg:col-span-4 lg:col-start-9 lg:justify-self-end"
            }
          >
            {cta && (
              <Button href={cta.href} className="group">
                {cta.label}
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-4 transition-transform duration-150 ease-mc motion-safe:lg:group-hover:translate-x-1"
                />
              </Button>
            )}
            <Button href={site.phone.href} variant="ghost">
              <Phone
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-4 text-mc-copper"
              />
              <span className="font-mono">{site.phone.display}</span>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
