import { Hero } from "@/components/home/hero";
import { Credentials } from "@/components/home/credentials";
import { Intents } from "@/components/home/intents";
import { HouseSection } from "@/components/home/house-section";
import { Services } from "@/components/home/services";
import { Paths } from "@/components/home/paths";
import { WhyUs } from "@/components/home/why-us";
import { PhotoReveal } from "@/components/home/photo-reveal";
import { Steps } from "@/components/home/steps";
import { StatsBand } from "@/components/home/stats-band";
import { Plans } from "@/components/home/plans";
import { SelectedWork } from "@/components/home/selected-work";
import { Reviews } from "@/components/home/reviews";
import { ServiceArea } from "@/components/home/service-area";
import { FaqSection } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";
import { getHome, getSite } from "@/lib/content";
import { sample } from "@/content/home";

/**
 * Landing page, in the order a homeowner decides:
 *
 *   Can they help, and can I act now?   Hero, credentials, three ways in
 *   Do they understand my problem?      The balancing house (3D)
 *   Do they do what I need?             Services, homes and businesses
 *   Why them?                           Five promises, the full-bleed photo
 *   What happens next?                  Three steps, the numbers
 *   Can I afford it?                    Financing and the Comfort Club
 *   Show me, and who says so?           Projects, reviews
 *   Do they come to me?                 Service area, FAQs
 *   Book.                               Final call to action
 */
export default async function HomePage() {
  const [home, site] = await Promise.all([getHome(), getSite()]);

  return (
    <>
      <Hero />
      <Credentials />
      <Intents />
      <HouseSection copy={home.house} />
      <Services />
      <Paths />
      <WhyUs />
      <PhotoReveal />
      <Steps heading={home.process.heading} steps={home.process.steps} />
      <StatsBand />
      <Plans />
      <SelectedWork />
      <Reviews heading={home.reviews.heading} reviews={sample.reviews} rating={sample.rating} />
      <ServiceArea heading={home.area.heading} sub={home.area.sub} areas={sample.areas} phone={site.phone} />
      <FaqSection />
      <FinalCta />
    </>
  );
}
