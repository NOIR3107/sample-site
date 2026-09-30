import { Container } from "@/components/primitives/container";
import { FadeIn } from "@/components/motion/fx";
import { WhyScroller } from "@/components/home/why-scroller";
import { getHome } from "@/lib/content";

export async function WhyUs() {
  const { why } = await getHome();

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <FadeIn className="max-w-3xl">
          <h2 className="text-section text-mc-navy">{why.heading}</h2>
          <p className="mt-5 max-w-[48ch] text-lg text-mc-muted">{why.sub}</p>
        </FadeIn>
        <div className="mt-16 lg:mt-20">
          <WhyScroller items={why.items} />
        </div>
      </Container>
    </section>
  );
}
