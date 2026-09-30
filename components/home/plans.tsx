import { ArrowRight, Check, Landmark, ShieldCheck } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fx";
import { getHome } from "@/lib/content";
import { sample } from "@/content/home";

/**
 * Financing and the membership plan, presented as products with their own
 * section and nav item, which is how the best-performing contractors sell
 * them. Terms are sample values, flagged in content/home.ts.
 */
export async function Plans() {
  const { plans } = await getHome();
  const club = sample.membership;

  return (
    <section id="plans" className="py-24 lg:py-32">
      <Container>
        <FadeIn className="max-w-2xl">
          <h2 className="text-section text-mc-navy">{plans.heading}</h2>
        </FadeIn>

        <Stagger className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-12">
          <StaggerItem className="relative overflow-hidden rounded-card border border-mc-line bg-white p-8 shadow-card lg:col-span-5 lg:p-10">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-mc-ice text-mc-frost">
              <Landmark aria-hidden="true" strokeWidth={1.75} className="size-6" />
            </span>
            <p className="mt-6 text-sm font-semibold text-mc-frost">{plans.financingTitle}</p>
            <p className="mt-2 font-display text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-mc-navy">
              {sample.financing.headline}
            </p>
            <p className="mt-4 max-w-[40ch] text-body text-mc-muted">{sample.financing.detail}</p>
            <a
              href="/contact/#book"
              data-book="New system"
              className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-mc-line bg-white px-6 text-sm text-mc-navy transition-[border-color,box-shadow,transform] duration-300 ease-mc hover:-translate-y-0.5 hover:border-mc-navy/30 hover:shadow-card"
            >
              {plans.financingCta}
              <ArrowRight
                aria-hidden="true"
                strokeWidth={2}
                className="size-4 transition-transform duration-300 ease-mc group-hover:translate-x-1"
              />
            </a>
          </StaggerItem>

          <StaggerItem className="relative overflow-hidden rounded-card bg-mc-navy p-8 text-white shadow-lift lg:col-span-7 lg:p-10">
            <div aria-hidden="true" className="glow -right-20 -top-24 size-80 bg-mc-ember/35" />
            <div className="relative grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
              <div>
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/10 text-mc-amber">
                  <ShieldCheck aria-hidden="true" strokeWidth={1.75} className="size-6" />
                </span>
                <p className="mt-6 text-sm font-semibold text-mc-amber">Membership</p>
                <p className="mt-2 font-display text-[2.4rem] leading-[1.05] tracking-[-0.02em]">
                  The {club.name}
                </p>
              </div>
              <p className="sm:text-right">
                <span className="font-display text-[3.5rem] leading-none tracking-[-0.03em]">{club.price}</span>
                <span className="ml-1 text-white/70">{club.period}</span>
              </p>
            </div>
            <ul className="relative mt-8 grid gap-3 sm:grid-cols-2">
              {club.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-[0.9375rem] text-white/85">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-mc-amber text-mc-navy">
                    <Check aria-hidden="true" strokeWidth={3} className="size-3" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <a
              href="/contact/#book"
              data-book="Maintenance"
              className="btn-sheen group relative mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-mc-ember px-6 text-sm font-semibold text-mc-navy shadow-ember transition-transform duration-300 ease-mc hover:-translate-y-0.5"
            >
              {plans.membershipCta}
              <ArrowRight
                aria-hidden="true"
                strokeWidth={2}
                className="size-4 transition-transform duration-300 ease-mc group-hover:translate-x-1"
              />
            </a>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
