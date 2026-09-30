"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m } from "motion/react";
import { ClipboardCheck, Receipt, Repeat, Ruler, Volume2 } from "lucide-react";
import type { ImageRef } from "@/lib/content";
import { cn } from "@/lib/cn";

type Tone = "ember" | "frost" | "navy";

export type WhyItem = {
  icon: "ruler" | "volume" | "clipboard" | "repeat" | "receipt";
  tone: Tone;
  title: string;
  body: string;
  image: ImageRef;
};

const icons = { ruler: Ruler, volume: Volume2, clipboard: ClipboardCheck, repeat: Repeat, receipt: Receipt };

const tint: Record<Tone, string> = {
  ember: "bg-mc-peach text-mc-ember",
  frost: "bg-mc-ice text-mc-frost",
  navy: "bg-mc-navy text-white",
};

/**
 * Scroll-told list. On desktop the photograph holds in a sticky frame while
 * the five promises scroll past; whichever sits in the middle of the
 * viewport is lit and its picture cross-fades in with a slow zoom. On phones
 * each promise carries its own picture. One IntersectionObserver per item,
 * no scroll listener.
 */
export function WhyScroller({ items }: { items: WhyItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28 h-[min(72vh,42rem)] overflow-hidden rounded-card bg-mc-raised shadow-lift">
          {items.map((item, index) => (
            <m.div
              key={item.image.src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: index === active ? 1 : 0, scale: index === active ? 1 : 1.08 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={item.image.src}
                alt={index === active ? item.image.alt : ""}
                fill
                sizes="(min-width: 1440px) 560px, 40vw"
                quality={80}
                className="object-cover"
              />
            </m.div>
          ))}
          <div className="absolute inset-x-6 bottom-6 flex gap-1.5" aria-hidden="true">
            {items.map((item, index) => (
              <span key={item.title} className="h-1 flex-1 overflow-hidden rounded-full bg-white/40">
                <m.span
                  className="block h-full rounded-full bg-white"
                  initial={false}
                  animate={{ width: index <= active ? "100%" : "0%" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            ))}
          </div>
        </div>
      </div>

      <ol className="lg:col-span-7 lg:col-start-6">
        {items.map((item, index) => (
          <Row key={item.title} item={item} index={index} active={index === active} onActive={setActive} />
        ))}
      </ol>
    </div>
  );
}

function Row({
  item,
  index,
  active,
  onActive,
}: {
  item: WhyItem;
  index: number;
  active: boolean;
  onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const Icon = icons[item.icon];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActive(index);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index, onActive]);

  return (
    <li
      ref={ref}
      className={cn(
        "border-t border-mc-line py-10 first:border-t-0 first:pt-0 lg:flex lg:min-h-[60vh] lg:items-center lg:border-t-0 lg:py-0",
        "transition-opacity duration-700 ease-mc",
        active ? "lg:opacity-100" : "lg:opacity-30",
      )}
    >
      <div>
        <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-card lg:hidden">
          <Image src={item.image.src} alt={item.image.alt} fill sizes="100vw" quality={80} className="object-cover" />
        </div>
        <span className={cn("inline-flex size-14 items-center justify-center rounded-2xl", tint[item.tone])}>
          <Icon aria-hidden="true" strokeWidth={1.75} className="size-7" />
        </span>
        <h3 className="mt-6 max-w-[18ch] font-display text-[2.1rem] font-normal leading-[1.05] tracking-[-0.02em] text-mc-navy lg:text-[2.9rem]">
          {item.title}
        </h3>
        <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-mc-muted">{item.body}</p>
      </div>
    </li>
  );
}
