import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Stagger, StaggerItem } from "@/components/motion/fx";
import { getHome } from "@/lib/content";

/** A quiet strip of facts under the hero. Credentials, not adjectives. */
export async function Credentials() {
  const { credentials } = await getHome();

  return (
    <section aria-label="Credentials" className="border-y border-mc-line bg-white/70 backdrop-blur">
      <Container>
        <Stagger as="ul" className="grid grid-cols-1 gap-x-8 gap-y-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((item) => (
            <StaggerItem as="li" key={item} className="flex items-center gap-3 text-sm text-mc-navy">
              <BadgeCheck aria-hidden="true" strokeWidth={1.75} className="size-5 shrink-0 text-mc-frost" />
              {item}
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
