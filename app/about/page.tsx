import type { Metadata } from "next";
import {
  ClipboardList,
  Play,
  Receipt,
  Repeat,
  Ruler,
  Volume2,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { PageHeader } from "@/components/primitives/page-header";
import { StatGrid } from "@/components/primitives/stat-grid";
import { Reveal } from "@/components/motion/reveal";
import { ImageFrame } from "@/components/media/image-frame";
import { ContactStrip } from "@/components/layout/contact-strip";
import { getAbout } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "A small engineering team in Portland, Oregon that designs, installs and maintains climate systems. The engineer who sizes your system is the one who services it.",
};

const icons: Record<string, LucideIcon> = {
  ruler: Ruler,
  volume: Volume2,
  clipboard: ClipboardList,
  repeat: Repeat,
  receipt: Receipt,
};

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <>
      <PageHeader title={about.title} intro={about.intro} />

      {/* Image plus counters. */}
      <Container>
        <Reveal>
          <ImageFrame
            src={about.hero.src}
            alt={about.hero.alt}
            sizes="(min-width: 1440px) 1344px, 100vw"
            className="aspect-16/9"
          />
        </Reveal>
        <Reveal delay={60}>
          <StatGrid items={about.stats} className="mt-16 lg:mt-20" />
        </Reveal>
      </Container>

      {/* Mission: one statement, large, asymmetric. */}
      <Section>
        <Container>
          <Reveal className="grid grid-cols-12">
            <div className="col-span-12 md:col-start-2 md:col-span-10 lg:col-span-8">
              <h2 className="font-mono text-eyebrow uppercase text-mc-muted">
                {about.mission.heading}
              </h2>
              <p className="mt-8 text-section text-mc-bone">
                {about.mission.body}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Story. */}
      <Section surface ruled>
        <Container>
          <div className="grid grid-cols-12 gap-y-10">
            <Reveal className="col-span-12 lg:col-span-4">
              <h2 className="text-section text-mc-bone">
                {about.story.heading}
              </h2>
            </Reveal>
            <Reveal delay={60} className="col-span-12 lg:col-span-7 lg:col-start-6">
              {about.story.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-6 max-w-[62ch] text-body text-mc-muted first:mt-0"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Values. A numbered index again rather than a grid of icon cards. */}
      <Section>
        <Container>
          <Reveal className="grid grid-cols-12">
            <h2 className="col-span-12 text-section text-mc-bone lg:col-span-7">
              {about.values.heading}
            </h2>
          </Reveal>

          <ol className="mt-14 border-b border-mc-line lg:mt-20">
            {about.values.items.map((value, index) => {
              const Icon = icons[value.icon];
              return (
                <Reveal as="li" key={value.title} delay={index * 60}>
                  <div className="grid grid-cols-[2rem_1fr] items-start gap-x-4 gap-y-2 border-t border-mc-line py-7 lg:grid-cols-[3rem_minmax(0,18rem)_1fr] lg:gap-x-8 lg:py-9">
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-5 text-mc-copper"
                    />
                    <h3 className="text-card text-mc-bone">{value.title}</h3>
                    <p className="col-start-2 max-w-[52ch] text-body text-mc-muted lg:col-start-3">
                      {value.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </Section>

      {/* Team. Placeholder identities, marked as such. */}
      <Section surface ruled>
        <Container>
          <Reveal className="grid grid-cols-12 items-end gap-6">
            <h2 className="col-span-12 text-section text-mc-bone lg:col-span-7">
              {about.team.heading}
            </h2>
            <p className="col-span-12 max-w-[40ch] font-mono text-eyebrow uppercase leading-relaxed text-mc-muted lg:col-span-4 lg:col-start-9">
              {about.team.note}
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-10 sm:grid-cols-3 lg:mt-20">
            {about.team.members.map((member, index) => (
              <Reveal as="li" key={member.role} delay={index * 60}>
                {/* No stock headshots. A hairline plate with initials until
                    there are real people and real photographs. */}
                <div className="flex aspect-4/5 items-center justify-center border border-mc-line bg-mc-black">
                  <span className="font-mono text-4xl tracking-[0.08em] text-mc-line">
                    {member.initials}
                  </span>
                </div>
                <p className="mt-6 font-mono text-spec text-mc-muted underline decoration-mc-line decoration-dotted underline-offset-4">
                  [ {member.name} ]
                </p>
                <p className="mt-2 text-card text-mc-bone">{member.role}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Video slot. A facade, not an embed: there is no film yet. */}
      <Section>
        <Container>
          <Reveal className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-10 lg:col-start-2">
              <h2 className="text-section text-mc-bone">
                {about.video.heading}
              </h2>
              <div className="group relative mt-10">
                <ImageFrame
                  src={about.video.poster.src}
                  alt={about.video.poster.alt}
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  className="aspect-16/9 opacity-60"
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-5">
                  <span className="flex size-16 items-center justify-center rounded-full border border-mc-line bg-mc-black/80">
                    <Play
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="ml-0.5 size-6 text-mc-copper"
                    />
                  </span>
                  <span className="font-mono text-spec text-mc-muted underline decoration-mc-line decoration-dotted underline-offset-8">
                    [ {about.video.caption} ]
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ContactStrip />
    </>
  );
}
