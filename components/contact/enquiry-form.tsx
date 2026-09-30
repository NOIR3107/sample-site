"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Enquiry form.
 *
 * This is a demo build with no server actions, so there is no handler behind
 * it. Rather than ship a button that does nothing when a prospect clicks it,
 * submitting composes a mail message with the fields filled in.
 *
 * Set NEXT_PUBLIC_FORM_ENDPOINT (Formspree, Web3Forms, anything that accepts
 * a POST) and the same form posts there instead. That is the only change
 * needed to make it real.
 */

const fieldBase =
  "w-full rounded-control border border-mc-line bg-mc-black px-4 py-3 text-body text-mc-bone " +
  "transition-colors duration-150 ease-mc placeholder:text-mc-muted hover:border-mc-muted " +
  "focus:border-mc-copper focus:outline-none";

const labelBase = "block font-mono text-eyebrow uppercase text-mc-muted";

export function EnquiryForm({
  services,
  variant = "full",
  email,
}: {
  services: { id: string; name: string }[];
  /** "short" is the callback form on service and project pages. */
  variant?: "full" | "short";
  email: string;
}) {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div
        role="status"
        className="border border-mc-line bg-mc-surface p-8 text-body text-mc-bone"
      >
        <p>Your mail client should have opened with the details filled in.</p>
        <p className="mt-3 text-sm text-mc-muted">
          If it did not, write to{" "}
          <a
            href={`mailto:${email}`}
            className="text-mc-bone underline decoration-mc-line underline-offset-4 hover:text-mc-copper"
          >
            {email}
          </a>
          .
        </p>
      </div>
    );
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (endpoint) return; // A real endpoint handles it; let the POST happen.

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const lines = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone")}`,
      `Service: ${get("service")}`,
      ...(variant === "full" ? [``, get("message")] : []),
    ];

    window.location.href =
      `mailto:${email}` +
      `?subject=${encodeURIComponent(`${get("service") || "Website"} enquiry`)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  return (
    <form
      action={endpoint}
      method={endpoint ? "POST" : undefined}
      onSubmit={onSubmit}
      className="grid gap-6 sm:grid-cols-2"
    >
      <div className="grid gap-2">
        <label htmlFor="name" className={labelBase}>
          Name
        </label>
        <input id="name" name="name" type="text" required className={fieldBase} />
      </div>

      <div className="grid gap-2">
        <label htmlFor="phone" className={labelBase}>
          Phone
        </label>
        <input id="phone" name="phone" type="tel" className={fieldBase} />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className={labelBase}>
          Email
        </label>
        <input id="email" name="email" type="email" required className={fieldBase} />
      </div>

      <div className="grid gap-2">
        <label htmlFor="service" className={labelBase}>
          Service
        </label>
        <select id="service" name="service" defaultValue="" className={fieldBase}>
          <option value="">Not sure yet</option>
          {services.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {variant === "full" && (
        <div className="grid gap-2 sm:col-span-2">
          <label htmlFor="message" className={labelBase}>
            What is the building doing?
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={`${fieldBase} resize-y`}
          />
        </div>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-mc-bone px-6 text-sm font-medium text-mc-black transition-colors duration-150 ease-mc hover:bg-white"
        >
          Send enquiry
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-4 transition-transform duration-150 ease-mc motion-safe:lg:group-hover:translate-x-1"
          />
        </button>

        {!endpoint && (
          <p className="mt-4 max-w-[52ch] font-mono text-eyebrow uppercase leading-relaxed text-mc-muted">
            Demo build. No form handler is wired, so this opens your mail
            client. Set NEXT_PUBLIC_FORM_ENDPOINT to post it instead.
          </p>
        )}
      </div>
    </form>
  );
}
