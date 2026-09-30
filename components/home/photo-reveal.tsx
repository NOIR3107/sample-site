import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollExpand } from "@/components/home/scroll-expand";
import { getHome } from "@/lib/content";

/** The page's full-bleed moment: a framed photograph that opens as you scroll. */
export async function PhotoReveal() {
  const { reveal } = await getHome();

  return (
    <ScrollExpand
      title={reveal.title}
      overlay={
        <>
          <p className="max-w-[34ch] font-display text-[1.75rem] leading-snug text-white sm:text-[2.25rem]">
            {reveal.body}
          </p>
          <Link
            href={reveal.href}
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-mc-navy transition-transform duration-300 ease-mc hover:-translate-y-0.5"
          >
            {reveal.linkLabel}
            <ArrowRight
              aria-hidden="true"
              strokeWidth={2}
              className="size-4 transition-transform duration-300 ease-mc group-hover:translate-x-1"
            />
          </Link>
        </>
      }
    >
      <Image src={reveal.image.src} alt={reveal.image.alt} fill sizes="100vw" quality={80} className="object-cover" />
    </ScrollExpand>
  );
}
