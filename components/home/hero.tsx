import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Button } from "@/components/primitives/button";
import { Magnetic } from "@/components/motion/magnetic";
import { HeroPhoto } from "@/components/home/hero-photo";
import { getHome, getSite } from "@/lib/content";
import { sample } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * Hero, after the category leaders: one clear promise in a warm serif, the
 * booking button with the rating right beside it (a star rating next to the
 * booking button outperforms either alone), the phone number, and Aira's
 * trick of letting people say what they need in one tap.
 */
export async function Hero() {
  const [{ hero }, site] = await Promise.all([getHome(), getSite()]);
  const lead = sample.reviews[0];

  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pt-36 lg:pb-28 lg:pt-40">
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p
              className="mc-rise inline-flex items-center gap-2.5 rounded-full border border-mc-line bg-white/80 py-1.5 pl-1.5 pr-4 text-sm text-mc-navy backdrop-blur"
            >
              <span className="rounded-full bg-mc-ice px-2.5 py-0.5 text-xs font-semibold text-mc-frost">
                Since {sample.since}
              </span>
              Heating &amp; cooling across the Portland metro
            </p>

            <h1 className="mt-7 text-hero text-mc-navy">
              {hero.title.map((line, index) => (
                <span
                  key={line}
                  className={cn("mc-lift block", index === hero.accentLine && "italic text-mc-ember")}
                  style={{ "--rise-delay": `${80 + index * 110}ms` } as React.CSSProperties}
                >
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="mc-rise mt-7 max-w-[35rem] text-lg leading-relaxed text-mc-muted sm:text-xl"
              style={{ "--rise-delay": "420ms" } as React.CSSProperties}
            >
              {hero.sub}
            </p>

            <div
              className="mc-rise mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ "--rise-delay": "540ms" } as React.CSSProperties}
            >
              <Magnetic className="flex sm:inline-flex">
                <Button href="/contact/#book" book="New system" size="lg" className="group w-full sm:w-auto">
                  {hero.primary}
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={2}
                    className="size-4 transition-transform duration-300 ease-mc group-hover:translate-x-1"
                  />
                </Button>
              </Magnetic>
              <Button href={site.phone.href} variant="ghost" size="lg" className="w-full sm:w-auto">
                <Phone aria-hidden="true" strokeWidth={2} className="size-4 text-mc-ember" />
                Call <span className="font-semibold tabular-nums">{site.phone.display}</span>
              </Button>
            </div>

            <div
              className="mc-rise mt-6 flex items-center gap-3 text-sm text-mc-muted"
              style={{ "--rise-delay": "640ms" } as React.CSSProperties}
            >
              <span className="stars" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg key={i} viewBox="0 0 20 20" className="size-4 fill-current">
                    <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
                  </svg>
                ))}
              </span>
              <span>
                <strong className="font-semibold text-mc-navy">{sample.rating.score}</strong> from{" "}
                {sample.rating.count} {sample.rating.source}
              </span>
            </div>

            <div
              className="mc-rise mt-10 border-t border-mc-line pt-6"
              style={{ "--rise-delay": "740ms" } as React.CSSProperties}
            >
              <p className="text-sm font-medium text-mc-navy">{hero.quickLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {hero.quick.map((q) => (
                  <li key={q.label}>
                    <a
                      href="/contact/#book"
                      data-book={q.need}
                      className="inline-flex min-h-11 items-center rounded-full border border-mc-line bg-white px-4 text-sm text-mc-navy transition-[border-color,transform,box-shadow] duration-300 ease-mc hover:-translate-y-0.5 hover:border-mc-navy/30 hover:shadow-card"
                    >
                      {q.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-6">
            <HeroPhoto
              image={hero.image}
              quote={{ text: "Every room sits within a degree of the thermostat.", name: lead.name, place: lead.place }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
