"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Button } from "@/components/primitives/button";
import { Logo } from "@/components/primitives/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import type { NavItem } from "@/lib/content";
import { cn } from "@/lib/cn";

type Phone = { display: string; href: string };
type Notice = { text: string; linkLabel: string; href: string } | null;

/**
 * Fixed chrome: a navy offer bar on top, the header under it.
 *
 * At rest the header is transparent over the hero. After the first scroll
 * the offer bar slides away and the header turns to frosted white with a
 * hairline and a soft shadow, so Call and Get a free estimate stay on screen
 * for the whole page. The phone number is shown as text on desktop: on the
 * best-performing trade sites it is the single most-used link.
 */
export function HeaderShell({
  name,
  nav,
  phone,
  notice,
  hours,
}: {
  name: string;
  nav: NavItem[];
  phone: Phone;
  notice: Notice;
  hours: string;
}) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-mc",
        scrolled && notice && "-translate-y-9",
      )}
    >
      {notice && (
        <div className="relative h-9 overflow-hidden bg-mc-navy text-white">
          <Container className="flex h-full items-center justify-center gap-3 whitespace-nowrap">
            <p className="truncate text-xs sm:text-[0.8125rem]">{notice.text}</p>
            <Link
              href={notice.href}
              data-book="Maintenance"
              className="group inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-mc-amber sm:text-[0.8125rem]"
            >
              {notice.linkLabel}
              <ArrowRight
                aria-hidden="true"
                strokeWidth={2}
                className="size-3 transition-transform duration-300 ease-mc group-hover:translate-x-0.5"
              />
            </Link>
          </Container>
        </div>
      )}

      <header
        className={cn(
          "border-b transition-[background-color,border-color,box-shadow] duration-500 ease-mc",
          scrolled
            ? "border-mc-line bg-white/80 shadow-[0_10px_30px_-20px_rgba(12,26,38,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
            <Link
              href="/"
              aria-label={`${name}, home`}
              className="transition-opacity duration-300 ease-mc hover:opacity-75"
            >
              <Logo name={name} />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {nav.map((item) => {
                  const active = !item.href.includes("#") && pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "inline-flex min-h-10 items-center rounded-full px-3.5 text-[0.9375rem] transition-colors duration-300 ease-mc xl:px-4",
                          active
                            ? "bg-mc-navy/[0.06] text-mc-navy"
                            : "text-mc-navy/75 hover:bg-mc-navy/[0.05] hover:text-mc-navy",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2 lg:gap-4">
              {/* Desktop: the number as text. Below lg: an icon button. */}
              <a
                href={phone.href}
                className="group hidden items-center gap-2.5 text-mc-navy lg:inline-flex"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-mc-ember/12 text-mc-ember transition-transform duration-300 ease-mc group-hover:-rotate-12">
                  <Phone aria-hidden="true" strokeWidth={2} className="size-4" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-mc-muted">
                    24/7 line
                  </span>
                  <span className="block font-semibold tabular-nums">{phone.display}</span>
                </span>
              </a>
              <a
                href={phone.href}
                className="inline-flex size-11 items-center justify-center rounded-full border border-mc-line bg-white text-mc-ember lg:hidden"
              >
                <Phone aria-hidden="true" strokeWidth={2} className="size-4" />
                <span className="sr-only">Call {phone.display}</span>
              </a>

              {/* Wrapped: the button's own inline-flex would beat `hidden`. */}
              <div className="hidden lg:block">
                <Button href="/contact/#book" book="New system" className="group">
                  Get a free estimate
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={2}
                    className="size-4 transition-transform duration-300 ease-mc group-hover:translate-x-1"
                  />
                </Button>
              </div>

              <MobileNav items={nav} phone={phone} name={name} hours={hours} />
            </div>
          </div>
        </Container>
      </header>
    </div>
  );
}
