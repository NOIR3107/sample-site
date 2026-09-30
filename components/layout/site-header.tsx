import { HeaderShell } from "@/components/layout/header-shell";
import { getNav, getSite } from "@/lib/content";

/**
 * Server wrapper. The shell is a client leaf only because it reacts to
 * scroll position and the current route; everything it needs arrives as
 * plain props.
 */
export async function SiteHeader() {
  const [site, nav] = await Promise.all([getSite(), getNav()]);

  return (
    <HeaderShell
      name={site.name}
      nav={nav.primary}
      phone={site.phone}
      notice={site.notice}
      hours={site.hours[0].value}
    />
  );
}
