"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { Logo } from "@/components/primitives/logo";
import type { NavItem } from "@/lib/content";

/**
 * Full-screen menu below lg. The burger folds into an X, links rise in
 * sequence, and the two actions sit in the thumb zone at the bottom.
 *
 * Portalled to <body>: the header it opens from is translated and blurred
 * once the page scrolls, and either would trap a fixed overlay inside it.
 */
export function MobileNav({
  items,
  phone,
  name,
  hours,
}: {
  items: NavItem[];
  phone: { display: string; href: string };
  name: string;
  hours: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex size-11 items-center justify-center rounded-full border border-mc-line bg-white text-mc-navy"
      >
        <span aria-hidden="true" className="burger">
          <span />
          <span />
          <span />
        </span>
        <span className="sr-only">Open menu</span>
      </button>

      {open &&
        createPortal(
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[70] flex flex-col overflow-hidden bg-mc-black"
          >
            <div aria-hidden="true" className="glow -right-24 -top-24 size-80 bg-mc-sky/40" />
            <div
              aria-hidden="true"
              className="glow -bottom-32 -left-24 size-96 bg-mc-peach"
              style={{ "--dx": "3rem", "--dy": "-2rem" } as React.CSSProperties}
            />

            <div className="relative flex h-16 shrink-0 items-center justify-between px-6">
              <Link href="/" onClick={close} aria-label={`${name}, home`}>
                <Logo name={name} />
              </Link>
              <button
                type="button"
                onClick={close}
                autoFocus
                className="inline-flex size-11 items-center justify-center rounded-full border border-mc-line bg-white text-mc-navy"
              >
                <span aria-hidden="true" className="burger burger-x">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav aria-label="Primary" className="relative flex-1 overflow-y-auto px-6 pt-6">
              <ul>
                {items.map((item, index) => (
                  <li
                    key={item.href}
                    className="mc-rise border-b border-mc-line"
                    style={{ "--rise-delay": `${60 + index * 55}ms` } as React.CSSProperties}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      className="group flex min-h-16 items-center justify-between font-display text-[2.1rem] tracking-[-0.02em] text-mc-navy"
                    >
                      {item.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        strokeWidth={1.75}
                        className="size-6 text-mc-muted transition-colors duration-300 group-active:text-mc-ember"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              className="mc-rise relative grid shrink-0 gap-3 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6"
              style={{ "--rise-delay": "380ms" } as React.CSSProperties}
            >
              <Link
                href="/contact/#book"
                data-book="New system"
                onClick={close}
                className="btn-sheen inline-flex min-h-14 items-center justify-center rounded-full bg-mc-navy text-base font-medium text-white"
              >
                Get a free estimate
              </Link>
              <a
                href={phone.href}
                onClick={close}
                className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border border-mc-line bg-white text-base text-mc-navy"
              >
                <Phone aria-hidden="true" strokeWidth={2} className="size-4 text-mc-ember" />
                Call <span className="font-semibold tabular-nums">{phone.display}</span>
              </a>
              <p className="pt-1 text-center text-xs text-mc-muted">Office {hours}. Emergency line 24/7.</p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
