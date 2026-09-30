import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fx";
import { getHome } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Six services, each with a real photograph of the thing itself, in a
 * zigzag of wide and narrow cells that always fills its rows:
 *
 *   lg  A A B      sm  A A
 *       C D D          B C
 *       E E F          D E
 *                      F F
 */
const WIDE_LG = new Set([0, 3, 4]);
const WIDE_SM = new Set([0, 5]);

export async function Services() {
  const { services } = await getHome();

  return (
    <section id="services" className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <FadeIn className="max-w-2xl">
            <h2 className="text-section text-mc-navy">{services.heading}</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href={services.href}
              className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-mc-line bg-white px-5 text-sm text-mc-navy transition-[border-color,box-shadow] duration-300 ease-mc hover:border-mc-navy/30 hover:shadow-card"
            >
              {services.linkLabel}
              <ArrowRight
                aria-hidden="true"
                strokeWidth={2}
                className="size-4 transition-transform duration-300 ease-mc group-hover:translate-x-1"
              />
            </Link>
          </FadeIn>
        </div>

        <Stagger className="mt-12 grid auto-rows-[22rem] gap-5 sm:grid-cols-2 sm:auto-rows-[24rem] lg:mt-16 lg:auto-rows-[26rem] lg:grid-cols-3">
          {services.items.map((service, index) => (
            <StaggerItem
              key={service.title}
              effect={index % 2 ? "up" : "scale"}
              className={cn(
                "group relative overflow-hidden rounded-card bg-mc-navy",
                WIDE_SM.has(index) ? "sm:col-span-2" : "sm:col-span-1",
                WIDE_LG.has(index) ? "lg:col-span-2" : "lg:col-span-1",
              )}
            >
              <div className="absolute inset-0">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes={WIDE_LG.has(index) ? "(min-width: 1024px) 62vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
                  quality={80}
                  className="img-zoom object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-mc-navy/85 via-mc-navy/20 to-transparent"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-[1.75rem] font-normal leading-tight tracking-[-0.02em] text-white lg:text-[2rem]">
                      <Link href={service.href} className="after:absolute after:inset-0 after:content-['']">
                        {service.title}
                      </Link>
                    </h3>
                    <p className="mt-2 max-w-[34ch] text-[0.9375rem] leading-relaxed text-white/80">
                      {service.text}
                    </p>
                  </div>
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-[transform,background-color,color] duration-500 ease-mc group-hover:rotate-45 group-hover:bg-white group-hover:text-mc-navy">
                    <ArrowUpRight aria-hidden="true" strokeWidth={2} className="size-5" />
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
