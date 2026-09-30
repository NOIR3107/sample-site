import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import "./globals.css";
import { SiteBackground } from "@/components/background/site-background";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { BookingDialog } from "@/components/booking/booking-dialog";
import { MotionProvider } from "@/components/motion/motion-provider";
import { site } from "@/content/site";

/* Newsreader, a text serif with optical sizes, sets the headlines: warm and
   domestic, the register the best home-comfort brands use. Geist does the
   reading and the interface, Geist Mono the readings. Every file is local,
   so neither dev nor build depends on reaching Google Fonts. */
const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader.woff2", style: "normal", weight: "300 600" },
    { path: "./fonts/newsreader-italic.woff2", style: "italic", weight: "300 600" },
  ],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f6f5",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-dvh bg-mc-black text-mc-bone antialiased">
        <a
          href="#main"
          className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[90] focus:bg-mc-bone focus:px-4 focus:py-2 focus:text-sm focus:text-mc-black"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteBackground />
          <SiteHeader />
          <main id="main" className="site-main">
            {children}
          </main>
          <SiteFooter />
          <MobileActionBar phone={site.phone} />
          <BookingDialog phone={site.phone} email={site.email.display} />
        </MotionProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
