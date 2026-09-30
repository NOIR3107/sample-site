import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Button } from "@/components/primitives/button";
import { FadeIn } from "@/components/motion/fx";
import { getHome, getSite } from "@/lib/content";

/** The last word before the footer: both actions, and the live line. */
export async function FinalCta() {
  const [{ final }, site] = await Promise.all([getHome(), getSite()]);

  return (
    <section className="pb-24 lg:pb-32">
      <Container>
        <FadeIn
          effect="scale"
          className="relative overflow-hidden rounded-[2rem] border border-mc-line bg-white px-6 py-16 text-center shadow-card sm:px-12 lg:py-24"
        >
          <div aria-hidden="true" className="glow -left-24 -top-24 size-96 bg-mc-sky/35" />
          <div
            aria-hidden="true"
            className="glow -bottom-32 -right-24 size-96 bg-mc-peach"
            style={{ "--dx": "-3rem", "--dy": "-2rem", "--dur": "20s" } as React.CSSProperties}
          />
          <div className="relative mx-auto max-w-3xl">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-mc-line bg-white px-4 py-1.5 text-sm text-mc-navy">
              <span className="live-dot inline-block size-2 rounded-full bg-emerald-500" aria-hidden="true" />
              {final.status}
            </p>
            <h2 className="mt-7 text-section text-mc-navy">{final.heading}</h2>
            <p className="mx-auto mt-5 max-w-[48ch] text-lg text-mc-muted">{final.text}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/contact/#book" book="New system" size="lg" className="group">
                {final.primary}
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="size-4 transition-transform duration-300 ease-mc group-hover:translate-x-1"
                />
              </Button>
              <Button href={site.phone.href} variant="ember" size="lg">
                <Phone aria-hidden="true" strokeWidth={2} className="size-4" />
                Call <span className="tabular-nums">{site.phone.display}</span>
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
