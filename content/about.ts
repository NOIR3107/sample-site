import type { ImageRef, ProofItem } from "./types";

const photo = (id: string, w = 1920) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type Value = {
  /** lucide icon name, resolved in the component. */
  icon: "ruler" | "volume" | "clipboard" | "repeat" | "receipt";
  title: string;
  body: string;
};

export type TeamMember = {
  /** Placeholder until real people are named. */
  name: string;
  role: string;
  initials: string;
  placeholder: boolean;
};

export const about = {
  title: "About",
  intro:
    "We are a small engineering team that designs, installs and maintains climate systems. The person who sized your system is the person who comes back to service it.",

  hero: {
    src: photo("photo-1497366811353-6870744d04b2"),
    alt: "Empty office floor with a concrete ceiling and black-framed glazing",
  } satisfies ImageRef,

  /**
   * Counters. Every value here is a slot for the operator to fill in, marked
   * as a placeholder rather than invented. The brief bans fabricated stats.
   */
  stats: [
    { label: "Years operating", value: "number", placeholder: true },
    { label: "Systems commissioned", value: "number", placeholder: true },
    { label: "Engineers on staff", value: "number", placeholder: true },
    { label: "Buildings under contract", value: "number", placeholder: true },
  ] satisfies ProofItem[],

  mission: {
    heading: "What we are for",
    body: "We don't sell equipment. We take responsibility for what the air in a building does, from the first load calculation to the fifth year of maintenance.",
  },

  story: {
    heading: "How we work",
    body: [
      "Most climate systems fail on a decision made before anything was installed. A unit sized off floor area rather than heat loss. A duct run chosen because it fitted, not because it was quiet. A commissioning sheet nobody filled in.",
      "So the survey comes first, and the specification comes out of the survey. Equipment is selected last, once the numbers say what the building actually needs.",
      "We keep the commissioning data for every job and hand a copy to the building owner. When we come back in year three, we are measuring against what we recorded on day one rather than guessing what changed.",
    ],
  },

  values: {
    heading: "What we hold to",
    items: [
      {
        icon: "ruler",
        title: "Measure, then specify",
        body: "Every system starts from a room-by-room calculation. Nothing is sized off a rule of thumb.",
      },
      {
        icon: "volume",
        title: "Quiet is a specification",
        body: "A noise target is agreed in writing before equipment is chosen, not hoped for afterwards.",
      },
      {
        icon: "clipboard",
        title: "Commission and document",
        body: "If it was not recorded, it was not commissioned. You get the figures for every room.",
      },
      {
        icon: "repeat",
        title: "Come back to the same building",
        body: "The engineer who installed the system is the one who maintains it.",
      },
      {
        icon: "receipt",
        title: "Say what it costs",
        body: "No variation without a written reason and a number attached to it.",
      },
    ] satisfies Value[],
  },

  team: {
    heading: "Who you will deal with",
    note: "Names and photographs are placeholders. Replace them in content/about.ts before launch.",
    members: [
      { name: "name", role: "Principal Engineer", initials: "PE", placeholder: true },
      { name: "name", role: "Commissioning Lead", initials: "CL", placeholder: true },
      { name: "name", role: "Service Manager", initials: "SM", placeholder: true },
    ] satisfies TeamMember[],
  },

  /**
   * Facade only. There is no film yet, so this renders a poster frame and a
   * clearly-marked slot rather than an embed that loads nothing.
   */
  video: {
    heading: "Inside a commissioning day",
    caption: "video",
    placeholder: true,
    poster: {
      src: photo("photo-1600607687920-4e2a09cf159d"),
      alt: "Dark dining room with a concrete floor, an open stair and full-height glazing",
    } satisfies ImageRef,
  },
};
