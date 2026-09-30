import { Container } from "@/components/primitives/container";
import { Button } from "@/components/primitives/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70dvh] items-center pt-36">
      <Container>
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-mono text-spec text-mc-copper">404</p>
            <h1 className="mt-6 text-hero text-mc-bone">No such page</h1>
            <p className="mt-8 max-w-[46ch] text-body text-mc-muted">
              The address does not match anything here. The project index is
              probably what you wanted.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button href="/projects/">Projects</Button>
              <Button href="/" variant="ghost">
                Home
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
