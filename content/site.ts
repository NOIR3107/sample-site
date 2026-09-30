import type { NavItem } from "./types";

/**
 * Canonical origin for metadata, Open Graph, the sitemap and robots.txt.
 * Set NEXT_PUBLIC_SITE_URL once a custom domain exists; until then the host's
 * own production URL is used, so a fresh Vercel or Netlify deploy links to
 * itself rather than to a domain nobody owns yet.
 */
function resolveSiteUrl(): string {
  const trim = (u: string) => u.replace(/\/+$/, "");
  if (process.env.NEXT_PUBLIC_SITE_URL) return trim(process.env.NEXT_PUBLIC_SITE_URL);
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${trim(process.env.VERCEL_PROJECT_PRODUCTION_URL)}`;
  }
  if (process.env.URL) return trim(process.env.URL); // Netlify
  return "https://meridianclimate.com";
}

/**
 * Brand and contact. Everything a rebrand needs to touch first.
 *
 * The phone number uses the 555-01xx block, which is reserved for fictional
 * use, so this demo cannot ring a real person. Swap it before launch.
 */
export const site = {
  name: "Meridian Climate",
  shortName: "Meridian",
  tagline: "Heating & cooling, done right the first time.",
  description:
    "Heating, cooling, ventilation and climate-control systems for Portland homes and businesses. Engineered, installed and maintained by certified technicians. Get a free estimate online.",
  url: resolveSiteUrl(),
  locale: "en-US",

  phone: {
    display: "(503) 555-0148",
    href: "tel:+15035550148",
  },
  email: {
    display: "hello@meridianclimate.com",
    href: "mailto:hello@meridianclimate.com",
  },
  address: {
    line1: "2140 NW Nicolai Street",
    line2: "Portland, OR 97210",
    /* Approximate, for the map marker and bounding box. */
    lat: 45.5378,
    lon: -122.7,
    /* A plain link, not an embed. Nothing loads until the visitor clicks. */
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=2140+NW+Nicolai+Street+Portland+OR+97210",
  },
  hours: [
    { label: "Office", value: "Mon to Fri, 7:00 to 17:00" },
    { label: "Emergency line", value: "24 hours, 7 days a week" },
  ],

  /**
   * Top notice bar. Set to null to remove the bar entirely; the header
   * repositions itself automatically.
   */
  /* SAMPLE offer for the demo; replace with a real, current promotion. */
  notice: {
    text: "Fall tune-up before the first frost: $89 (usually $129)",
    linkLabel: "Book yours",
    href: "/contact/#book",
  } as { text: string; linkLabel: string; href: string } | null,

  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
} as const;

/** Header navigation. Most items are sections of the landing page. */
export const primaryNav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Comfort Club", href: "/#plans" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Service areas", href: "/#service-area" },
  { label: "About", href: "/about/" },
];

/** Footer navigation. Every real page stays reachable from here. */
export const footerNav: NavItem[] = [
  { label: "Services", href: "/services/" },
  { label: "Projects", href: "/projects/" },
  { label: "About", href: "/about/" },
  { label: "Journal", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
  { label: "Service Areas", href: "/#service-area" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];
