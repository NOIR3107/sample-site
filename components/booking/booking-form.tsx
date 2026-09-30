"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { m } from "motion/react";
import { ArrowRight, CircleAlert, House, Building2, Phone } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Booking form. One component, three homes: the dialog every "Book a visit"
 * button opens, the booking band at the foot of the homepage, and #book on
 * the contact page.
 *
 * Set NEXT_PUBLIC_FORM_ENDPOINT (Formspree, Web3Forms, or anything that
 * accepts a POST) and requests are posted there. Without it, submitting
 * opens the visitor's email app with the request filled in, so the button
 * never silently does nothing.
 */

export const NEEDS = [
  "New system",
  "Repair",
  "Maintenance",
  "Air quality",
  "Not sure yet",
] as const;

const TIMES = [
  { value: "Morning", hint: "8 to 12" },
  { value: "Afternoon", hint: "12 to 5" },
] as const;

/* -- Next six weekdays, computed on the client only ----------------------- */

type Day = { value: string; weekday: string; date: string };
let cachedDays: Day[] | null = null;

function getDays(): Day[] {
  if (cachedDays) return cachedDays;
  const out: Day[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (out.length < 6) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue;
    const pad = (n: number) => String(n).padStart(2, "0");
    out.push({
      value: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    });
  }
  cachedDays = out;
  return out;
}

const noopSubscribe = () => () => {};

/** Null during SSR and hydration, the real dates straight after. */
function useUpcomingDays() {
  return useSyncExternalStore(noopSubscribe, getDays, () => null);
}

/* -- Styles --------------------------------------------------------------- */

const fieldBase =
  "w-full rounded-control border border-mc-line bg-white px-4 py-3 text-body text-mc-navy " +
  "placeholder:text-mc-muted transition-[border-color,box-shadow] duration-300 ease-mc " +
  "hover:border-mc-navy/30 focus:border-mc-frost focus:outline-none focus:ring-4 focus:ring-mc-frost/15 " +
  "user-invalid:border-[#c2410c]";

const labelBase = "text-sm font-medium text-mc-navy";

const chip =
  "inline-flex min-h-11 cursor-pointer select-none items-center justify-center gap-2 rounded-full border px-4 text-sm " +
  "border-mc-line bg-white text-mc-navy/85 transition-[background-color,border-color,color,transform] duration-300 ease-mc " +
  "hover:border-mc-navy/30 active:scale-[0.97] " +
  "peer-checked:border-mc-navy peer-checked:bg-mc-navy peer-checked:text-white " +
  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-mc-frost";

function Chip({
  name,
  value,
  defaultChecked,
  children,
  className,
}: {
  name: string;
  value: string;
  defaultChecked?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className="relative">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className={cn(chip, className)}>{children}</span>
    </label>
  );
}

function Group({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="grid gap-3">
      <legend className={cn(labelBase, "mb-3")}>{legend}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

/* -- Form ----------------------------------------------------------------- */

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

export function BookingForm({
  phone,
  email,
  defaultNeed,
  idPrefix = "bk",
  onDone,
}: {
  phone: { display: string; href: string };
  email: string;
  defaultNeed?: string;
  /** Keeps ids unique when more than one form is on the page. */
  idPrefix?: string;
  /** Shown as a "Done" button on the success screen when provided. */
  onDone?: () => void;
}) {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  const days = useUpcomingDays();
  const [status, setStatus] = useState<Status>("idle");
  const [firstName, setFirstName] = useState("");

  const id = (k: string) => `${idPrefix}-${k}`;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    setFirstName(get("name").split(/\s+/)[0] ?? "");

    if (endpoint) {
      setStatus("sending");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }

    const lines = [
      `Need: ${get("need") || "Not specified"}`,
      `Property: ${get("property") || "Not specified"}`,
      `Preferred day: ${get("day") || "Any"}`,
      `Preferred time: ${get("time") || "Any"}`,
      ``,
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      `ZIP code: ${get("zip")}`,
      ...(get("notes") ? [``, get("notes")] : []),
    ];

    window.location.href =
      `mailto:${email}` +
      `?subject=${encodeURIComponent(`Visit request: ${get("need") || "General"}`)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;
    setStatus("mailto");
  };

  if (status === "sent" || status === "mailto") {
    return (
      <div role="status" className="flex flex-col items-start py-6">
        <svg viewBox="0 0 52 52" className="size-14" aria-hidden="true">
          <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-mc-line" />
          <m.circle
            cx="26"
            cy="26"
            r="24"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotate: -90, transformOrigin: "center" }}
          />
          <m.path
            d="M16 27l7 7 13-15"
            fill="none"
            stroke="#16a34a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <h3 className="mt-6 text-card text-mc-navy">
          {status === "sent"
            ? `Thanks${firstName ? `, ${firstName}` : ""}. Request received.`
            : "Almost done."}
        </h3>
        <p className="mt-3 max-w-[40ch] text-body text-mc-muted">
          {status === "sent"
            ? "We will call you to confirm the time. If it is urgent, call us now."
            : "Your email app should have opened with everything filled in. Press send and we will call you to confirm."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {onDone && (
            <button
              type="button"
              onClick={onDone}
              className="inline-flex min-h-12 items-center rounded-full bg-mc-navy px-6 text-sm font-medium text-white transition-transform duration-300 ease-mc active:scale-[0.97]"
            >
              Done
            </button>
          )}
          <a
            href={phone.href}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-mc-line bg-white px-6 text-sm text-mc-navy transition-colors duration-300 ease-mc hover:border-mc-navy/30"
          >
            <Phone aria-hidden="true" strokeWidth={2} className="size-4 text-mc-ember" />
            <span className="font-mono">{phone.display}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      action={endpoint}
      method={endpoint ? "POST" : undefined}
      className="grid gap-7"
    >
      <Group legend="What do you need?">
        {NEEDS.map((need) => (
          <Chip key={need} name="need" value={need} defaultChecked={need === defaultNeed}>
            {need}
          </Chip>
        ))}
      </Group>

      <Group legend="Where?">
        <Chip name="property" value="Home" defaultChecked>
          <House aria-hidden="true" strokeWidth={1.75} className="size-4" />
          Home
        </Chip>
        <Chip name="property" value="Business">
          <Building2 aria-hidden="true" strokeWidth={1.75} className="size-4" />
          Business
        </Chip>
      </Group>

      <fieldset className="grid gap-3">
        <legend className={cn(labelBase, "mb-3")}>Preferred day</legend>
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {days
            ? days.map((day) => (
                <label key={day.value} className="relative shrink-0">
                  <input type="radio" name="day" value={`${day.weekday} ${day.date}`} className="peer sr-only" />
                  <span
                    className={cn(
                      chip,
                      "min-h-16 w-[4.75rem] flex-col gap-0.5 rounded-2xl px-2",
                    )}
                  >
                    <span className="text-xs opacity-70">{day.weekday}</span>
                    <span className="font-medium">{day.date}</span>
                  </span>
                </label>
              ))
            : Array.from({ length: 6 }, (_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="min-h-16 w-[4.75rem] shrink-0 animate-pulse rounded-2xl bg-mc-navy/[0.05]"
                />
              ))}
        </div>
      </fieldset>

      <Group legend="Preferred time">
        {TIMES.map((t) => (
          <Chip key={t.value} name="time" value={`${t.value} (${t.hint})`}>
            {t.value}
            <span className="opacity-60">{t.hint}</span>
          </Chip>
        ))}
      </Group>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={id("name")} className={labelBase}>
            Your name
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            className={fieldBase}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor={id("phone")} className={labelBase}>
            Phone
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            className={fieldBase}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor={id("zip")} className={labelBase}>
            ZIP code
          </label>
          <input
            id={id("zip")}
            name="zip"
            type="text"
            autoComplete="postal-code"
            inputMode="numeric"
            className={fieldBase}
          />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <label htmlFor={id("notes")} className={labelBase}>
            Anything we should know? <span className="text-mc-muted">(optional)</span>
          </label>
          <textarea
            id={id("notes")}
            name="notes"
            rows={2}
            placeholder="For example: upstairs bedroom never warms up."
            className={cn(fieldBase, "resize-y")}
          />
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 text-sm text-[#c2410c]">
          <CircleAlert aria-hidden="true" strokeWidth={1.75} className="mt-0.5 size-4 shrink-0" />
          That did not go through. Please try again, or call {phone.display}.
        </p>
      )}

      <div className="grid gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-sheen group inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-mc-navy text-base font-semibold text-white shadow-card transition-[background-color,transform] duration-300 ease-mc hover:bg-[#17304a] active:scale-[0.98] disabled:opacity-70"
        >
          {status === "sending" ? "Sending..." : "Request my visit"}
          <ArrowRight
            aria-hidden="true"
            strokeWidth={2}
            className="size-4 transition-transform duration-300 ease-mc group-hover:translate-x-1"
          />
        </button>
        <p className="text-center text-sm text-mc-muted">
          {endpoint ? "No payment needed." : "Opens your email app with the details filled in."}{" "}
          Prefer to talk?{" "}
          <a href={phone.href} className="font-medium text-mc-navy underline decoration-mc-line underline-offset-4 hover:decoration-mc-frost">
            Call {phone.display}
          </a>
        </p>
      </div>
    </form>
  );
}
