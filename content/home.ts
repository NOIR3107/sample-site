import type { ImageRef } from "./types";
import { siteImages } from "./projects";

const photo = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type Tone = "ember" | "frost" | "navy";

/**
 * Landing page copy, in page order.
 *
 * Structure follows what the best-performing HVAC sites do (researched
 * September 2026: Quilt, Aira, Jetson, Medley, and the ServiceTitan and
 * Hook Agency roundups): a clear promise with a rating beside the booking
 * button, three ways in by intent (broken / replacing / maintaining),
 * financing and a membership plan as products, reviews with names and
 * neighbourhoods, and service areas in plain text.
 *
 * One label per intent, everywhere:
 *   "Get a free estimate"   booking form, preset to a new system
 *   "Request a repair"      booking form, preset to repair
 *   "Join the Comfort Club" booking form, preset to maintenance
 *   "Call"                  dials the office
 *
 * ---------------------------------------------------------------------------
 * SAMPLE CONTENT. Everything in `sample` is placeholder copy for the demo:
 * the rating and review count, the reviews themselves, the prices, the
 * financing terms, the counters and the towns. None of it describes a real
 * business. Replace every value with real, verifiable figures and genuine
 * customer reviews before this site represents an actual company.
 * Publishing invented reviews or statistics for a real business is
 * deceptive advertising (in the US the FTC's rule on fake reviews applies).
 * ---------------------------------------------------------------------------
 */

export const sample = {
  rating: { score: "4.9", count: "612", source: "Google reviews" },
  since: "2014",
  offer: {
    text: "Fall tune-up before the first frost: $89",
    was: "$129",
    cta: "Book yours",
  },
  stats: [
    { value: 4.9, decimals: 1, suffix: "", label: "Average rating", note: "from 612 Google reviews" },
    { value: 24, decimals: 0, suffix: "/7", label: "Emergency line", note: "answered by a person, not a menu" },
    { value: 10, decimals: 0, suffix: "-yr", label: "Warranty", note: "parts and labor on new systems" },
    { value: 1, decimals: 0, suffix: " day", label: "Typical install", note: "for a whole-home heat pump" },
  ],
  financing: {
    headline: "0% APR for 18 months",
    detail: "On qualifying systems, or low monthly payments from $89 a month. Subject to credit approval.",
  },
  membership: {
    name: "Comfort Club",
    price: "$19",
    period: "a month",
    perks: [
      "Two precision tune-ups a year, heating and cooling",
      "Priority booking, and no overtime fees",
      "15% off every repair",
      "Transfers to the new owner if you sell",
    ],
  },
  reviews: [
    {
      title: "Finally warm upstairs",
      quote:
        "Our bedrooms were ten degrees colder than the kitchen every winter. Two weeks after the heat pump went in, every room sits within a degree of the thermostat.",
      name: "Sarah M.",
      place: "Sellwood",
      service: "Heat pump install",
    },
    {
      title: "Honest about the fix",
      quote:
        "Another company quoted a whole new system. Meridian found a failed capacitor, fixed it the same afternoon and showed us the old part.",
      name: "Michael R.",
      place: "Beaverton",
      service: "AC repair",
    },
    {
      title: "Spotless install",
      quote:
        "They laid floor protection, finished in a day and walked us through the app before leaving. You would not know anyone had been here.",
      name: "James K.",
      place: "Lake Oswego",
      service: "Ductless mini-split",
    },
    {
      title: "Answered at 2am",
      quote:
        "Furnace died in January. A real person picked up, a technician was here before breakfast and the house was warm by nine.",
      name: "Priya S.",
      place: "Gresham",
      service: "Emergency repair",
    },
    {
      title: "Worth the membership",
      quote:
        "The Comfort Club tune-ups caught a leaking coil before it became a summer breakdown. Priority booking alone pays for it.",
      name: "Daniel O.",
      place: "Tigard",
      service: "Comfort Club",
    },
    {
      title: "Quiet and clean air",
      quote:
        "New filtration and a balanced system. Allergy season is noticeably easier and we cannot hear the air handler at all.",
      name: "Hannah L.",
      place: "Northwest Portland",
      service: "Indoor air quality",
    },
  ],
  /** x / y are positions on the stylised map, in percent. */
  areas: [
    { name: "Portland", x: 50, y: 44, hq: true },
    { name: "Vancouver", x: 55, y: 14 },
    { name: "Hillsboro", x: 12, y: 42 },
    { name: "Beaverton", x: 30, y: 50 },
    { name: "Tigard", x: 34, y: 68 },
    { name: "Lake Oswego", x: 49, y: 72 },
    { name: "Milwaukie", x: 60, y: 62 },
    { name: "Happy Valley", x: 72, y: 64 },
    { name: "Gresham", x: 84, y: 46 },
    { name: "West Linn", x: 44, y: 86 },
  ],
};

export const home = {
  hero: {
    title: ["Heating & cooling,", "done right", "the first time."],
    /** Index of the title line set in italic. */
    accentLine: 1,
    sub: "Repairs, replacements and heat pump installs for Portland homes, by certified technicians. Upfront prices, tidy work and a 24/7 emergency line.",
    primary: "Get a free estimate",
    quickLabel: "Or tell us what you need",
    quick: [
      { label: "Repair", need: "Repair" },
      { label: "New system", need: "New system" },
      { label: "Tune-up", need: "Maintenance" },
      { label: "Air quality", need: "Air quality" },
    ],
    image: {
      src: photo("photo-1762500824959-ad78b31b4161", 2000),
      alt: "A family and their small dog relaxing on the living room floor of a bright home",
    } satisfies ImageRef,
  },

  credentials: [
    "Licensed, bonded and insured",
    "NATE-certified technicians",
    "EPA 608 refrigerant handling",
    "Upfront, written pricing",
  ],

  intents: {
    heading: "How can we help today?",
    items: [
      {
        tone: "ember",
        kicker: "Something stopped working",
        title: "Fast, honest repairs",
        text: "Heat pumps, furnaces and AC. Our 24/7 line always reaches a person, and we fix the cause, not the symptom.",
        cta: "Request a repair",
        need: "Repair",
        image: {
          src: photo("photo-1757219525975-03b5984bc6e8", 1200),
          alt: "Outdoor air conditioning condenser mounted on a wall bracket",
        },
      },
      {
        tone: "frost",
        kicker: "Ready for a new system",
        title: "Free in-home estimate",
        text: "A room-by-room survey, a fixed written price and financing from $89 a month. Most installs finish in a day.",
        cta: "Get a free estimate",
        need: "New system",
        image: {
          src: photo("photo-1776860155275-eee24bfb1dee", 1200),
          alt: "Modern white house with a heat pump unit installed beside the entrance",
        },
      },
      {
        tone: "navy",
        kicker: "Keep it running",
        title: "The Comfort Club",
        text: "Two tune-ups a year, priority booking and 15% off repairs, for $19 a month.",
        cta: "Join the Comfort Club",
        need: "Maintenance",
        image: {
          src: photo("photo-1642749776312-aa42ce20c9f5", 1200),
          alt: "Two technicians working among air conditioning units and ductwork on a rooftop",
        },
      },
    ] satisfies {
      tone: Tone;
      kicker: string;
      title: string;
      text: string;
      cta: string;
      need: string;
      image: ImageRef;
    }[],
  },

  house: {
    heading: "Every room, the right temperature.",
    sub: "Most homes have one room that is always too warm and one that never heats up. We find out why, then fix the system, not the thermostat.",
    before: "Before",
    after: "With Meridian",
    target: 71,
    /** Room temperatures before balancing; after, all settle near target. */
    rooms: [
      { id: "bed1", name: "Bedroom", before: 64 },
      { id: "bed2", name: "Nursery", before: 79 },
      { id: "living", name: "Living room", before: 76 },
      { id: "kitchen", name: "Kitchen", before: 67 },
    ],
  },

  services: {
    heading: "Everything your home needs to breathe easy.",
    href: "/services/",
    linkLabel: "All services",
    items: [
      {
        title: "Heat pumps",
        text: "Efficient heating and cooling in one system, sized room by room.",
        href: "/services/installation/",
        image: {
          src: photo("photo-1776860150272-653efc74193c", 1200),
          alt: "Outdoor heat pump unit on a lawn beside a modern building",
        },
      },
      {
        title: "Air conditioning",
        text: "Central and ductless systems that cool quietly and evenly.",
        href: "/services/installation/",
        image: {
          src: photo("photo-1762341123870-d706f257a12e", 1200),
          alt: "Wall-mounted ductless air conditioner displaying 22 degrees",
        },
      },
      {
        title: "Furnaces & heating",
        text: "Repair, replacement and tune-ups before the cold arrives.",
        href: "/services/service-repair/",
        image: {
          src: photo("photo-1632927126546-e3e051a0ba6e", 1200),
          alt: "A person in a knit sweater holding a warm mug beside candles",
        },
      },
      {
        title: "Indoor air quality",
        text: "Filtration, ventilation and humidity control for cleaner air.",
        href: "/services/air-quality/",
        image: {
          src: photo("photo-1493809842364-78817add7ffb", 1200),
          alt: "Bright white room with a herringbone floor, a tall window and a plant",
        },
      },
      {
        title: "Smart thermostats & zoning",
        text: "Control each room from your phone and stop heating empty ones.",
        href: "/services/controls-zoning/",
        image: {
          src: photo("photo-1759216853052-883040267c8c", 1200),
          alt: "A hand adjusting a smart thermostat set to 63 degrees",
        },
      },
      {
        title: "Commercial HVAC",
        text: "Rooftop units, VRF and planned maintenance for businesses.",
        href: "/services/#commercial",
        image: {
          src: photo("photo-1774290331891-5d759056c68d", 1200),
          alt: "Row of white commercial HVAC units on a rooftop",
        },
      },
    ] satisfies { title: string; text: string; href: string; image: ImageRef }[],
  },

  process: {
    heading: "Three steps to a more comfortable home.",
    steps: [
      {
        title: "Tell us what you need",
        text: "Book online in about a minute, or call. The first survey on a new system is free.",
      },
      {
        title: "Get a fixed, written price",
        text: "We measure every room, recommend the right system and put the price in writing. No surprises.",
      },
      {
        title: "Installed, then looked after",
        text: "Most installs finish in a day. We clean up, show you the controls and come back for every tune-up.",
      },
    ],
  },

  why: {
    heading: "Comfort you can measure.",
    sub: "Five things we hold to on every job, from a single bedroom to a forty-ton rooftop.",
    items: [
      {
        icon: "ruler",
        tone: "frost",
        title: "Sized to your home, not a rule of thumb.",
        body: "Every system starts with a room-by-room load calculation, so each room reaches temperature without the equipment working overtime.",
        image: {
          src: photo("photo-1600607687939-ce8a6c25118c"),
          alt: "Open-plan living room with pale sofas, a timber wall and low daylight",
        },
      },
      {
        icon: "volume",
        tone: "ember",
        title: "So quiet you will check it is on.",
        body: "We agree a noise target before choosing equipment, then measure it at the register on handover day.",
        image: {
          src: photo("photo-1529408632839-a54952c491e5"),
          alt: "Minimal living room with a low sofa, a desk and a dark screen",
        },
      },
      {
        icon: "clipboard",
        tone: "frost",
        title: "Every number, handed over.",
        body: "Airflow per room, refrigerant charge by weight and the control schedule as set. You keep the commissioning record.",
        image: {
          src: photo("photo-1770625467384-304e461ef1be"),
          alt: "A hand adjusting a modern digital thermostat on a white wall",
        },
      },
      {
        icon: "repeat",
        tone: "navy",
        title: "The same technician, every visit.",
        body: "The person who installed your system is the one who services it. Nobody starts from scratch, and nothing gets lost.",
        image: {
          src: photo("photo-1497366811353-6870744d04b2"),
          alt: "Empty office floor with a concrete ceiling and black-framed glazing",
        },
      },
      {
        icon: "receipt",
        tone: "ember",
        title: "The price, before the work.",
        body: "A fixed written quote up front. Nothing changes without a written reason and a number attached to it.",
        image: {
          src: photo("photo-1600607687920-4e2a09cf159d"),
          alt: "Dark dining room with a concrete floor, an open stair and full-height glazing",
        },
      },
    ] satisfies {
      icon: "ruler" | "volume" | "clipboard" | "repeat" | "receipt";
      tone: Tone;
      title: string;
      body: string;
      image: ImageRef;
    }[],
  },

  reveal: {
    title: "Air you never think about.",
    body: "Designed, installed and maintained by the same people, so comfort becomes something you stop noticing.",
    href: "/projects/",
    linkLabel: "See our work",
    image: {
      src: photo("photo-1600585154340-be6161a56a0c", 2400),
      alt: siteImages.residential.alt,
    } satisfies ImageRef,
  },

  plans: {
    heading: "Comfort now. Easy on the budget.",
    financingTitle: "Financing",
    financingCta: "Check your options",
    membershipCta: "Join the Comfort Club",
  },

  paths: {
    heading: "For homes and for businesses.",
    items: [
      {
        title: "For homes",
        tone: "ember",
        href: "/services/#residential",
        linkLabel: "Home services",
        text: "Zoned comfort, concealed equipment and systems you never hear from the next room.",
        image: {
          src: photo("photo-1756723903313-b3d2f705f472", 1600),
          alt: "A father and daughter playing together on the floor of a bright living room",
        },
      },
      {
        title: "For businesses",
        tone: "frost",
        href: "/services/#commercial",
        linkLabel: "Commercial services",
        text: "Designed for load, maintained on schedule and documented for compliance.",
        image: siteImages.commercial,
      },
    ] satisfies {
      title: string;
      tone: Tone;
      href: string;
      linkLabel: string;
      text: string;
      image: ImageRef;
    }[],
  },

  work: {
    heading: "Recent projects.",
    sub: "Real buildings, each handed over with the numbers we measured.",
    href: "/projects/",
    linkLabel: "All projects",
    slugs: ["mc001", "mc002", "mc003", "mc005", "mc006", "mc008"],
  },

  reviews: {
    heading: "Portland homeowners, in their words.",
  },

  area: {
    heading: "Proudly serving the Portland metro.",
    sub: "From our workshop on NW Nicolai Street, most of the metro is within forty minutes. Not sure if we cover you? Call and ask.",
  },

  faq: {
    heading: "Questions, answered.",
  },

  final: {
    heading: "Let's make your home feel right.",
    text: "Tell us what is going on. We will give you a clear answer, a fixed price and a time that suits you.",
    primary: "Get a free estimate",
    status: "Technicians on call 24/7",
  },
};
