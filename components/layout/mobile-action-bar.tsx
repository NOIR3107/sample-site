"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { CalendarCheck, Phone } from "lucide-react";

/**
 * Phones only. Once the visitor scrolls past the hero's own buttons, Call
 * and Free estimate dock at the bottom of the screen, in the thumb zone,
 * for the rest of the page.
 */
export function MobileActionBar({
  phone,
}: {
  phone: { display: string; href: string };
}) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) =>
    setShow(y > window.innerHeight * 0.65),
  );

  return (
    <AnimatePresence>
      {show && (
        <m.div
          key="action-bar"
          initial={{ y: "130%" }}
          animate={{ y: 0 }}
          exit={{ y: "130%" }}
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <div className="mx-auto flex max-w-md gap-2 rounded-full border border-mc-line bg-white/90 p-1.5 shadow-float backdrop-blur-xl">
            <a
              href={phone.href}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-mc-line bg-white text-sm font-medium text-mc-navy active:scale-[0.97]"
            >
              <Phone aria-hidden="true" strokeWidth={2} className="size-4 text-mc-ember" />
              Call now
              <span className="sr-only"> {phone.display}</span>
            </a>
            <Link
              href="/contact/#book"
              data-book="New system"
              className="btn-sheen inline-flex min-h-12 flex-[1.35] items-center justify-center gap-2 rounded-full bg-mc-navy text-sm font-semibold text-white active:scale-[0.97]"
            >
              <CalendarCheck aria-hidden="true" strokeWidth={2} className="size-4" />
              Free estimate
            </Link>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
