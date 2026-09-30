import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fx";
import { getHome } from "@/lib/content";
import { cn } from "@/lib/cn";

const tones = {
  ember: { kicker: "text-mc-ember", button: "bg-mc-ember text-mc-navy font-semibold" },
  frost: { kicker: "text-mc-frost", button: "bg-mc-navy text-white" },
  navy: { kicker: "text-mc-navy", button: "bg-white text-mc-navy border border-mc-line" },
} as const;

/**
 * Three ways in, by intent. The best trade sites split the emergency caller
 * from the planned buyer; this adds the third visitor, the one who wants to
 * keep a working system working. Each card opens the booking form already
 * set to what they came for.
 */
export async function Intents() {
  const { intents } = await getHome();

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <FadeIn className="max-w-2xl">
          <h2 className="text-section text-mc-navy">{intents.heading}</h2>
        </FadeIn>

        <Stagger className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {intents.items.map((item) => {
            const tone = tones[item.tone];
            return (
              <StaggerItem
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-card border border-mc-line bg-white shadow-card transition-[transform,box-shadow] duration-500 ease-mc hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    quality={80}
                    className="img-zoom object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className={cn("text-sm font-semibold", tone.kicker)}>{item.kicker}</p>
                  <h3 className="mt-2 font-display text-[1.9rem] font-normal leading-tight tracking-[-0.02em] text-mc-navy">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-body text-mc-muted">{item.text}</p>
                  <a
                    href="/contact/#book"
                    data-book={item.need}
                    className={cn(
                      "mt-7 inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full px-6 text-sm transition-[transform,box-shadow] duration-300 ease-mc after:absolute after:inset-0 after:content-[''] hover:-translate-y-0.5 hover:shadow-card",
                      tone.button,
                    )}
                  >
                    {item.cta}
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={2}
                      className="size-4 transition-transform duration-300 ease-mc group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
