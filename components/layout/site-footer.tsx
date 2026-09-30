import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Logo } from "@/components/primitives/logo";
import { getNav, getServices, getSite } from "@/lib/content";

/** Navy band closing every page. Contact first, then the full link set. */
export async function SiteFooter() {
  const [site, nav, services] = await Promise.all([getSite(), getNav(), getServices()]);
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[1] overflow-hidden bg-mc-navy pb-28 text-white lg:pb-0">
      <div aria-hidden="true" className="bg-thermal absolute inset-x-0 top-0 h-1" />
      <div aria-hidden="true" className="glow -right-40 -top-40 size-[30rem] bg-mc-frost/25" />

      <Container className="relative">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${site.name}, home`} className="inline-block">
              <Logo name={site.name} invert />
            </Link>
            <p className="mt-5 max-w-[36ch] text-sm leading-relaxed text-white/70">
              {site.description}
            </p>
            <a
              href={site.phone.href}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/[0.08] py-2 pl-2 pr-5 transition-colors duration-300 ease-mc hover:bg-white/[0.14]"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-mc-ember text-mc-navy">
                <Phone aria-hidden="true" strokeWidth={2} className="size-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.6875rem] uppercase tracking-[0.12em] text-white/60">
                  24/7 line
                </span>
                <span className="block text-lg font-semibold tabular-nums">{site.phone.display}</span>
              </span>
            </a>
          </div>

          <nav aria-label="Services" className="lg:col-span-3 lg:col-start-5">
            <p className="text-sm font-semibold text-white">Services</p>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}/`}
                    className="text-sm text-white/70 transition-colors duration-300 ease-mc hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <p className="text-sm font-semibold text-white">Company</p>
            <ul className="mt-5 space-y-3">
              {nav.footer.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors duration-300 ease-mc hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-sm font-semibold text-white">Visit or write</p>
            <address className="mt-5 space-y-4 not-italic">
              <a
                href={site.email.href}
                className="flex items-center gap-3 text-sm text-white/70 transition-colors duration-300 ease-mc hover:text-white"
              >
                <Mail aria-hidden="true" strokeWidth={1.75} className="size-4 shrink-0 text-mc-sky" />
                {site.email.display}
              </a>
              <a
                href={site.address.directionsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-start gap-3 text-sm text-white/70 transition-colors duration-300 ease-mc hover:text-white"
              >
                <MapPin aria-hidden="true" strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-mc-amber" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </a>
            </address>
            <dl className="mt-6 space-y-1 text-sm text-white/70">
              {site.hours.map((h) => (
                <div key={h.label}>
                  <dt className="inline text-white">{h.label}: </dt>
                  <dd className="inline">{h.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-6 flex gap-3">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="inline-flex min-h-10 items-center rounded-full border border-white/15 px-4 text-sm text-white/80 transition-colors duration-300 ease-mc hover:border-white/40 hover:text-white"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/60">
            &copy; {year} {site.name}. Licensed, bonded and insured in Oregon.
          </p>
          <ul className="flex gap-6">
            {nav.legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/60 transition-colors duration-300 ease-mc hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
