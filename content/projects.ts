import type { Project } from "./types";

/**
 * Photography. Every image URL on the site resolves through this helper, so
 * re-pointing the whole site at a different source is a one-function change.
 *
 * Subjects were chosen against the brief: architectural interiors, building
 * elevations, roof planes and concrete. No technicians, no hard hats, no
 * clipboards, no handshakes. See the README for the known gap list.
 */
const photo = (id: string, w = 1920) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const projects: Project[] = [
  {
    slug: "mc001",
    code: "MC001",
    name: "Alder Street House",
    sector: "residential",
    location: "Portland, Oregon",
    year: "2024",
    caption:
      "Ducted heat pump across four zones, plant concealed in the roof void, 22 dB at the register.",
    meta: {
      client: "Private owner",
      location: "Portland, Oregon",
      capacity: "3.5 ton",
      systemType: "Ducted air-source heat pump",
    },
    specs: [
      { label: "Building", value: "Detached house, 1962" },
      { label: "Floor area", value: "2,650 sq ft" },
      { label: "System", value: "Ducted air-source heat pump" },
      { label: "Zones", value: "4" },
      { label: "Commissioned", value: "March 2024" },
      { label: "Measured", value: "22 dB at the register" },
    ],
    body: [
      "The owners did not want to hear the system. That ruled out an upper-floor plant location and set the duct velocity before anything was drawn.",
      "Plant sits in the roof void on isolation mounts, the trunk is oversized one size, and the last three feet to each register are lined. Four zones run independently off a single outdoor unit. The bedrooms hold setpoint overnight without the fan stepping up.",
    ],
    cover: {
      src: photo("photo-1600607687939-ce8a6c25118c"),
      alt: "Open-plan living room with pale sofas, a timber wall and low daylight",
    },
    detail: {
      src: photo("photo-1529408632839-a54952c491e5"),
      alt: "Minimal living room with a low sofa, a desk and a dark screen",
    },
  },
  {
    slug: "mc002",
    code: "MC002",
    name: "Burnside Exchange",
    sector: "commercial",
    location: "Portland, Oregon",
    year: "2023",
    caption:
      "Rooftop VRF replacement over a live retail floor, phased across six nights, zero trading hours lost.",
    meta: {
      client: "Retail operator",
      location: "Portland, Oregon",
      capacity: "40 ton",
      systemType: "Variable refrigerant flow, rooftop",
    },
    specs: [
      { label: "Building", value: "Retail, two floors" },
      { label: "Floor area", value: "18,400 sq ft" },
      { label: "System", value: "Variable refrigerant flow, rooftop" },
      { label: "Zones", value: "11" },
      { label: "Commissioned", value: "October 2023" },
      { label: "Measured", value: "Zero trading hours lost" },
    ],
    body: [
      "We do not close a shop to change its plant. We work the hours the shop is shut.",
      "The old units came out and the replacements went in across six nights, one zone at a time, with temporary cooling covering whichever zone was offline. Pipework was reused where pressure testing allowed it. The floor traded every day of the programme.",
    ],
    cover: {
      src: photo("photo-1460317442991-0ec209397118"),
      alt: "Mixed-use retail and apartment facade with stacked balconies",
    },
    detail: {
      src: photo("photo-1481253127861-534498168948"),
      alt: "Concrete and glass building elevation seen from below",
    },
  },
  {
    slug: "mc003",
    code: "MC003",
    name: "Fremont Glasshouse",
    sector: "residential",
    location: "Portland, Oregon",
    year: "2024",
    caption:
      "Radiant floor and ventilation for a glazed extension, balanced to hold 21°C through winter.",
    meta: {
      client: "Private owner",
      location: "Portland, Oregon",
      capacity: "2 ton",
      systemType: "Radiant floor with heat-recovery ventilation",
    },
    specs: [
      { label: "Building", value: "Extension to a 1920s house" },
      { label: "Glazed area", value: "540 sq ft" },
      { label: "System", value: "Radiant floor with heat-recovery ventilation" },
      { label: "Zones", value: "2" },
      { label: "Commissioned", value: "January 2024" },
      { label: "Measured", value: "Holds 21°C through winter" },
    ],
    body: [
      "A room that is mostly glass loses heat at the perimeter and gains it at the head. Treating those as one problem is what makes glazed rooms uncomfortable.",
      "Radiant loops run tight along the glass line and open up toward the existing house. Ventilation is separate, ducted at low level, and recovers heat off the extract. The room holds temperature with no fan running in the corner.",
    ],
    cover: {
      src: photo("photo-1497366754035-f200968a6e72"),
      alt: "Empty interior with black-framed glass partitions and a polished concrete floor",
    },
    detail: {
      src: photo("photo-1493809842364-78817add7ffb"),
      alt: "Bright white room with a herringbone floor, a tall window and a single plant",
    },
  },
  {
    slug: "mc004",
    code: "MC004",
    name: "Ladd Addition Row House",
    sector: "residential",
    location: "Portland, Oregon",
    year: "2023",
    caption:
      "Two-stage condensing system in a 1908 row house, ducts threaded through existing chases, 11 registers and no ceiling opened.",
    meta: {
      client: "Private owner",
      location: "Portland, Oregon",
      capacity: "80 kBTU",
      systemType: "Two-stage gas condensing, ducted",
    },
    specs: [
      { label: "Building", value: "Row house, 1908" },
      { label: "Floor area", value: "1,980 sq ft" },
      { label: "System", value: "Two-stage gas condensing, ducted" },
      { label: "Registers", value: "11" },
      { label: "Commissioned", value: "November 2023" },
      { label: "Measured", value: "No ceiling opened" },
    ],
    body: [
      "The house is protected and the plaster is original. Any route that needed a new chase was not a route.",
      "We surveyed the existing chases first and sized the system to what they could carry, rather than sizing the system and then hunting for somewhere to put it. Eleven registers, all in existing openings. The ceilings came through the job untouched.",
    ],
    cover: {
      src: photo("photo-1524230572899-a752b3835840"),
      alt: "White arched corridor receding into shadow",
    },
    detail: {
      src: photo("photo-1497604401993-f2e922e5cb0a"),
      alt: "White tiled architectural surface curving away from the camera",
    },
  },
  {
    slug: "mc005",
    code: "MC005",
    name: "Nicolai Street Kitchen",
    sector: "commercial",
    location: "Portland, Oregon",
    year: "2024",
    caption:
      "Dedicated outdoor air unit over a restaurant kitchen, make-up air balanced against the dining room, 4,200 CFM at the hood.",
    meta: {
      client: "Restaurant operator",
      location: "Portland, Oregon",
      capacity: "4,200 CFM",
      systemType: "Dedicated outdoor air with hood make-up",
    },
    specs: [
      { label: "Building", value: "Restaurant" },
      { label: "Floor area", value: "3,100 sq ft" },
      { label: "System", value: "Dedicated outdoor air, hood make-up" },
      { label: "Extract", value: "4,200 CFM at the hood" },
      { label: "Commissioned", value: "June 2024" },
      { label: "Measured", value: "Kitchen held negative to the dining room" },
    ],
    body: [
      "Kitchens fail on pressure, not on capacity. If the kitchen sits positive, the dining room smells like the pass.",
      "Make-up air is introduced at the kitchen perimeter and trimmed against the hood so the space stays slightly negative across the service window. The dining room runs on its own supply. Nothing crosses the threshold except the food.",
    ],
    cover: {
      src: photo("photo-1517248135467-4c7edcad34c4"),
      alt: "Empty restaurant dining room in dark timber under low lighting",
    },
    detail: {
      src: photo("photo-1552566626-52f8b828add9"),
      alt: "Restaurant interior with services and ductwork exposed in the ceiling",
    },
  },
  {
    slug: "mc006",
    code: "MC006",
    name: "Kearney Tower",
    sector: "commercial",
    location: "Portland, Oregon",
    year: "2022",
    caption:
      "Four-pipe fan coil retrofit across nine floors, existing risers reused, 3% design flow variance floor to floor.",
    meta: {
      client: "Building owner",
      location: "Portland, Oregon",
      capacity: "160 ton",
      systemType: "Four-pipe fan coil",
    },
    specs: [
      { label: "Building", value: "Office, nine floors" },
      { label: "Floor area", value: "74,000 sq ft" },
      { label: "System", value: "Four-pipe fan coil" },
      { label: "Floors", value: "9" },
      { label: "Commissioned", value: "August 2022" },
      { label: "Measured", value: "3% flow variance floor to floor" },
    ],
    body: [
      "Replacing risers in an occupied tower costs more than the plant does. We kept them.",
      "Each floor was surveyed, flushed and rebalanced before new coils went in, and the commissioning data was recorded floor by floor rather than sampled. Design flow is held within 3% from the second floor to the tenth. The building manager has the figures for every one.",
    ],
    cover: {
      src: photo("photo-1511818966892-d7d671e672a2"),
      alt: "Skyscrapers photographed from street level in black and white",
    },
    detail: {
      src: photo("photo-1497366811353-6870744d04b2"),
      alt: "Empty office floor with a concrete ceiling and black-framed glazing",
    },
  },
  {
    slug: "mc007",
    code: "MC007",
    name: "Marquam Gallery",
    sector: "commercial",
    location: "Portland, Oregon",
    year: "2023",
    caption:
      "Chilled beam and displacement ventilation in a gallery, air introduced at floor level, 28 dB in the main hall.",
    meta: {
      client: "Gallery trust",
      location: "Portland, Oregon",
      capacity: "24 ton",
      systemType: "Passive chilled beam, displacement ventilation",
    },
    specs: [
      { label: "Building", value: "Gallery" },
      { label: "Floor area", value: "9,400 sq ft" },
      { label: "System", value: "Passive chilled beam, displacement ventilation" },
      { label: "Zones", value: "5" },
      { label: "Commissioned", value: "May 2023" },
      { label: "Measured", value: "28 dB in the main hall" },
    ],
    body: [
      "Galleries need stable air and silence, and the usual way of getting stable air makes noise.",
      "Supply enters at floor level at low velocity and rises with the heat in the room, so there is no throw and no diffuser roar. Chilled beams carry the sensible load without a fan in the space. The main hall measures 28 dB with the system at design.",
    ],
    cover: {
      src: photo("photo-1439337153520-7082a56a81f4"),
      alt: "White spiral gallery atrium seen from the ground floor",
    },
    detail: {
      src: photo("photo-1486406146926-c627a92ad1ab"),
      alt: "Glass office towers seen from street level looking up",
    },
  },
  {
    slug: "mc008",
    code: "MC008",
    name: "Swan Island Studio",
    sector: "commercial",
    location: "Portland, Oregon",
    year: "2024",
    caption:
      "Variable refrigerant flow across a 14,000 square foot studio, twelve independent zones, one outdoor unit.",
    meta: {
      client: "Studio operator",
      location: "Portland, Oregon",
      capacity: "30 ton",
      systemType: "Variable refrigerant flow",
    },
    specs: [
      { label: "Building", value: "Studio and workshop" },
      { label: "Floor area", value: "14,000 sq ft" },
      { label: "System", value: "Variable refrigerant flow" },
      { label: "Zones", value: "12" },
      { label: "Outdoor units", value: "1" },
      { label: "Commissioned", value: "September 2024" },
    ],
    body: [
      "A studio changes use every week. Sizing for the worst case in every zone at once would have meant plant twice the size and half the efficiency.",
      "Twelve zones run off a single outdoor unit, with diversity taken on the real schedule rather than the nameplate. Zones that sit idle cost nothing. Peak draw across the whole building is lower than the old system serving half the floor.",
    ],
    cover: {
      src: photo("photo-1487958449943-2429e8be8625"),
      alt: "Angular glass and steel building against an overcast sky",
    },
    detail: {
      src: photo("photo-1470723710355-95304d8aece4"),
      alt: "City at night with traffic light trails on the arterial below",
    },
  },
];

/** Hero and split-panel photography, kept beside the project images. */
export const siteImages = {
  hero: {
    src: photo("photo-1600607687920-4e2a09cf159d", 2400),
    alt: "Dark dining room with a concrete floor, an open stair and full-height glazing",
  },
  residential: {
    src: photo("photo-1600585154340-be6161a56a0c"),
    alt: "Single-storey modern house at dusk, lit from within, seen across a lawn",
  },
  commercial: {
    src: photo("photo-1600585154526-990dced4db0d"),
    alt: "Dark tower facade with vertical louvers photographed at dusk",
  },
};
