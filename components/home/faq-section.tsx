import { Container } from "@/components/primitives/container";
import { FaqList } from "@/components/primitives/faq-list";
import { FadeIn } from "@/components/motion/fx";
import { getFaqs, getHome } from "@/lib/content";

export async function FaqSection() {
  const [{ faq }, faqs] = await Promise.all([getHome(), getFaqs()]);

  return (
    <section id="faq" className="border-t border-mc-line bg-white py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <FadeIn className="lg:col-span-4">
            <h2 className="text-section text-mc-navy">{faq.heading}</h2>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <FaqList items={faqs} />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
