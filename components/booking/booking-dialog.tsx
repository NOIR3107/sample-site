"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CalendarCheck, X } from "lucide-react";
import { BookingForm } from "@/components/booking/booking-form";

/**
 * One dialog for the whole site. Any element carrying `data-book` opens it,
 * so buttons stay plain links to /contact/#book and still work if this
 * script never loads. The value of `data-book` (if any) preselects what the
 * visitor needs, e.g. data-book="Repair".
 *
 * The click is intercepted in the capture phase with preventDefault only.
 * Next's <Link> checks `defaultPrevented` before navigating, and any other
 * onClick on the trigger (closing the mobile menu, say) still runs.
 *
 * Native <dialog> with showModal(): the browser supplies the focus trap,
 * Escape to close and an inert page behind it. On phones it docks to the
 * bottom as a sheet.
 */
const TITLES: Record<string, string> = {
  "New system": "Get a free estimate",
  Maintenance: "Book a tune-up",
  Repair: "Request a repair",
  "Air quality": "Better indoor air",
};

export function BookingDialog({
  phone,
  email,
}: {
  phone: { display: string; href: string };
  email: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [need, setNeed] = useState<string | undefined>();
  /** Bumped on every open so the form starts clean each time. */
  const [session, setSession] = useState(0);

  const close = useCallback(() => ref.current?.close(), []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const target = event.target as Element | null;
      const trigger = target?.closest?.("[data-book]");
      if (!trigger || dialog.contains(trigger)) return;

      event.preventDefault();
      setNeed(trigger.getAttribute("data-book") || undefined);
      setSession((s) => s + 1);
      if (!dialog.open) {
        dialog.showModal();
        document.documentElement.style.overflow = "hidden";
      }
    };

    const onClose = () => {
      document.documentElement.style.overflow = "";
    };

    document.addEventListener("click", onClick, true);
    dialog.addEventListener("close", onClose);
    return () => {
      document.removeEventListener("click", onClick, true);
      dialog.removeEventListener("close", onClose);
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="book-title"
      className="book-dialog"
      onClick={(event) => {
        // A click on the dialog element itself is a click on the backdrop.
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="relative max-h-[inherit] overflow-y-auto rounded-t-[1.75rem] border border-mc-line bg-white shadow-float sm:rounded-card">
        {/* Thermal hairline across the top edge. */}
        <div aria-hidden="true" className="bg-thermal sticky top-0 z-10 h-1 w-full" />

        <div className="px-5 pb-8 pt-6 sm:px-9 sm:pb-10 sm:pt-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="inline-flex items-center gap-2 text-sm text-mc-frost">
                <CalendarCheck aria-hidden="true" strokeWidth={1.75} className="size-4" />
                Takes about a minute
              </p>
              <h2 id="book-title" className="mt-2 text-[2.25rem] leading-none tracking-[-0.02em] text-mc-navy">
                {TITLES[need ?? ""] ?? "Book a visit"}
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              className="-mr-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-mc-line bg-white text-mc-navy transition-colors duration-300 ease-mc hover:border-mc-navy/30"
            >
              <X aria-hidden="true" strokeWidth={1.75} className="size-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <div className="mt-8">
            {session > 0 && (
              <BookingForm
                key={session}
                phone={phone}
                email={email}
                defaultNeed={need}
                idPrefix="dlg"
                onDone={close}
              />
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
