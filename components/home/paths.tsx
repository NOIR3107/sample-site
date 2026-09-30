import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, House } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fx";
import { getHome } from "@/lib/content";
import { cn } from "@/lib/cn";

const toneStyles = {
  ember: { icon: "bg-mc-ember text-mc-navy", link: "text-mc-amber" },
  frost: { icon: "bg-mc-sky text-mc-navy", link: "text-mc-sky" },
  navy: { icon: "bg-white text-mc-navy", link: "text-white" },
} as const;

/**
 * Homes and businesses. On desktop the panel under the pointer widens and
 * the other gives way (a grid-template transition driven by :has(), no
 * script). On phones they stack.
 */
export async function Paths() {
  const { paths } = await getHome();

  return (
    <section className="pb-24 lg:pb-32">
      <Container>
        <FadeIn className="max-w-3xl">
          <h2 className="text-section text-mc-navy">{paths.heading}</h2>
        </FadeIn>

        <Stagger className="paths mt-12 grid gap-4 lg:mt-16 lg:h-[36rem] lg:gap-5">
          {paths.items.map((item, index) => {
            const Icon = index === 0 ? House : Building2;
            const tone = toneStyles[item.tone];
            return (
              <StaggerItem key={item.title} effect={index ? "right" : "left"} className="min-w-0">
                <article className="group relative h-full min-h-[28rem] overflow-hidden rounded-card">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    quality={80}
                    className="img-zoom object-cover"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-mc-navy via-mc-navy/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9 lg:p-11">
                    <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", tone.icon)}>
                      <Icon aria-hidden="true" strokeWidth={1.75} className="size-6" />
                    </span>
                    <h3 className="mt-6 font-display text-[2.4rem] font-normal leading-none tracking-[-0.02em] lg:text-[3.1rem]">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-[38ch] text-body text-white/85">{item.text}</p>
                    <Link
                      href={item.href}
                      className={cn(
                        "mt-6 inline-flex items-center gap-2 text-sm font-semibold after:absolute after:inset-0 after:content-['']",
                        tone.link,
                      )}
                    >
                      {item.linkLabel}
                      <ArrowRight
                        aria-hidden="true"
                        strokeWidth={2}
                        className="size-4 transition-transform duration-300 ease-mc group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
