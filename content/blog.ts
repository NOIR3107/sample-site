export type Post = {
  slug: string;
  title: string;
  /** Shown on cards and as the meta description. */
  excerpt: string;
  date: string;
  /** ISO, for <time dateTime> and sorting. */
  datetime: string;
  readMinutes: number;
  topic: string;
  body: string[];
};

/**
 * Four posts, written in the brand voice on real HVAC topics rather than
 * filler. Add posts here and both /blog/ and /blog/[slug]/ pick them up.
 */
export const posts: Post[] = [
  {
    slug: "why-oversized-systems-run-worse",
    title: "An oversized system is a worse system",
    excerpt:
      "Bigger plant does not mean more comfort. It means short cycles, swings of two degrees, and a compressor that never reaches steady state.",
    date: "August 2026",
    datetime: "2026-08-14",
    readMinutes: 4,
    topic: "Sizing",
    body: [
      "The most common fault we are called to is not a broken unit. It is a unit that was never the right size.",
      "An oversized system reaches setpoint fast, shuts off, and starts again a few minutes later. Each of those starts draws the highest current the compressor will ever see, and none of them last long enough for the system to settle into the efficiency it was rated at. The room swings either side of setpoint instead of holding it, and in cooling weather the coil never runs long enough to pull moisture out of the air, so the room reads cold and feels damp.",
      "It happens because sizing off floor area is quick and sizing off heat loss is not. A room-by-room calculation takes a surveyor most of a day in a house and several days in a building. Skipping it and adding a margin feels safe. It is the opposite.",
      "If a system in your building runs in short bursts, cools without drying, or trips its breaker on start, sizing is the first thing to check. The fix is rarely a bigger unit.",
    ],
  },
  {
    slug: "what-commissioning-should-leave-behind",
    title: "What commissioning should leave behind",
    excerpt:
      "A commissioning sheet is not paperwork. It is the only record of what the system did on the day it worked properly.",
    date: "July 2026",
    datetime: "2026-07-02",
    readMinutes: 3,
    topic: "Commissioning",
    body: [
      "Ask for the commissioning data on a system installed five years ago and you will usually be told it exists somewhere. It rarely does.",
      "That matters more than it sounds. Without a record of the airflow at each register, the refrigerant charge, and the static pressure across the coil, nobody can say whether the system has drifted. Every future service visit becomes a fresh guess rather than a comparison.",
      "We record airflow per room, charge by weight, and static pressure at commissioning, and we hand a copy to the building owner. A year later a 12% drop in flow at one register is a blocked return, not a mystery.",
      "If you are having a system installed, make the commissioning record a condition of final payment. It costs the contractor an afternoon and it is worth years of straightforward maintenance.",
    ],
  },
  {
    slug: "kitchens-fail-on-pressure",
    title: "Commercial kitchens fail on pressure, not capacity",
    excerpt:
      "If the kitchen sits positive to the dining room, the dining room smells like the pass. Extract is only half the problem.",
    date: "May 2026",
    datetime: "2026-05-21",
    readMinutes: 4,
    topic: "Commercial",
    body: [
      "Most kitchen ventilation complaints are described as a smell problem. They are almost always a pressure problem.",
      "A hood pulls a large volume of air out of the kitchen. That air has to come back from somewhere. If make-up air is not introduced deliberately, it arrives through the nearest opening, which is usually the service window from the dining room, and it arrives fast enough to be felt. Get the balance the other way round and the kitchen sits positive, pushing cooking air out into the room the customers are in.",
      "The fix is to introduce make-up air at the kitchen perimeter and trim it against the hood so the kitchen stays slightly negative across the whole service window. The dining room runs on its own supply.",
      "It is a balancing job rather than an equipment job, and it is measurable. If nobody has put a gauge across the threshold, nobody knows whether it works.",
    ],
  },
  {
    slug: "filters-are-not-a-maintenance-plan",
    title: "Changing filters is not a maintenance plan",
    excerpt:
      "Filters are the visible part. Charge, airflow and controls drift quietly, and none of them announce themselves.",
    date: "March 2026",
    datetime: "2026-03-09",
    readMinutes: 3,
    topic: "Maintenance",
    body: [
      "Filter changes are easy to sell because they are easy to see. They are also the least interesting thing happening to a system over five years.",
      "Refrigerant charge drifts. Airflow falls as ducts collect dust and dampers creep. Control schedules get overridden by someone who was cold once in February and never changed it back. None of these announce themselves. The building simply costs more to run each year and nobody can point at the reason.",
      "A maintenance visit worth paying for measures the same things that were measured at commissioning and compares them. That is the whole value: a number this year against the number from day one.",
      "If your maintenance report is a tick sheet with no figures on it, you are paying for filter changes.",
    ],
  },
];
