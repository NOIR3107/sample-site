import { Container } from "@/components/primitives/container";
import { CountUp } from "@/components/motion/count-up";
import { Stagger, StaggerItem } from "@/components/motion/fx";
import { sample } from "@/content/home";

/**
 * Aira-style big numbers on a navy band: four facts a homeowner can act on,
 * each counting up as it enters the viewport. Sample values, flagged in
 * content/home.ts.
 */
export function StatsBand() {
  return (
    <section aria-label="At a glance" className="relative overflow-hidden bg-mc-navy py-20 text-white lg:py-28">
      <div aria-hidden="true" className="glow -left-32 top-0 size-[28rem] bg-mc-frost/30" />
      <div
        aria-hidden="true"
        className="glow -right-32 bottom-0 size-[28rem] bg-mc-ember/25"
        style={{ "--dx": "-4rem", "--dy": "-2rem", "--dur": "22s" } as React.CSSProperties}
      />
      <Container className="relative">
        <Stagger as="dl" className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {sample.stats.map((stat) => (
            <StaggerItem key={stat.label} className="border-t border-white/15 pt-6">
              <dt className="text-sm font-medium text-white/70">{stat.label}</dt>
              <dd className="mt-3">
                <span className="font-display text-[3.25rem] leading-none tracking-[-0.03em] sm:text-[4.5rem] lg:text-[5.25rem]">
                  <CountUp to={stat.value} decimals={stat.decimals} />
                  {stat.suffix}
                </span>
                <span className="mt-3 block max-w-[24ch] text-sm text-white/65">{stat.note}</span>
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
