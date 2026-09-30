import type { Service } from "./types";

const photo = (id: string, w = 1920) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * The six services. Names and one-line descriptions are fixed by the brief and
 * must not be rewritten. Everything below the description drives the service
 * detail page at /services/[slug]/.
 */
export const services: Service[] = [
  {
    id: "system-design",
    number: "01",
    name: "System Design",
    description:
      "Load calculations, equipment selection and duct layout before anything is ordered.",
    lead: "Design is where a system is won or lost. Every decision after it is constrained by the numbers produced here, which is why nothing gets ordered until the calculation is finished.",
    process: [
      "Survey the building: fabric, glazing, orientation, occupancy and existing plant.",
      "Calculate heat loss and heat gain room by room, not by floor area.",
      "Select equipment against the calculated load, with the noise target agreed in writing first.",
      "Draw the duct or pipe layout and issue a written specification.",
    ],
    includes: [
      "Room-by-room heat loss and heat gain",
      "Equipment selection and sizing",
      "Duct and pipe layout drawings",
      "Written specification before anything is ordered",
    ],
    image: {
      src: photo("photo-1497366754035-f200968a6e72"),
      alt: "Empty interior with black-framed glass partitions and a polished concrete floor",
    },
    sector: "both",
  },
  {
    id: "installation",
    number: "02",
    name: "Installation",
    description:
      "Concealed plant, balanced airflow, and commissioning documented room by room.",
    lead: "An installation is judged on what you can hear and what you can see. Plant goes where it will not be heard, and the commissioning data is recorded rather than assumed.",
    process: [
      "Agree plant locations and access before the first fixing.",
      "Install ductwork and pipework to the issued layout, on isolation where it matters.",
      "Balance airflow to the design figures at every register.",
      "Commission, record the numbers, and hand over the sheet.",
    ],
    includes: [
      "Plant siting on isolation mounts",
      "Ductwork and pipework installation",
      "Airflow balanced to the design figures",
      "Commissioning sheet recorded per room",
    ],
    image: {
      src: photo("photo-1600607687920-4e2a09cf159d"),
      alt: "Dark dining room with a concrete floor, an open stair and full-height glazing",
    },
    sector: "both",
  },
  {
    id: "service-repair",
    number: "03",
    name: "Service & Repair",
    description:
      "Diagnostics on the first visit. Parts on the second, if a second is needed.",
    lead: "We don't diagnose by replacing parts until the fault goes away. The first visit is for measurement, so the second visit carries the right component.",
    process: [
      "Attend, measure and identify the fault rather than the symptom.",
      "Report what failed, why, and what it will cost to put right.",
      "Source the part and return with it.",
      "Re-measure against the commissioning figures before leaving.",
    ],
    includes: [
      "Fault diagnosis on the first visit",
      "Refrigerant leak testing",
      "Parts sourced and replaced",
      "Written report of what failed and why",
    ],
    image: {
      src: photo("photo-1552566626-52f8b828add9"),
      alt: "Restaurant interior with services and ductwork exposed in the ceiling",
    },
    sector: "both",
  },
  {
    id: "maintenance",
    number: "04",
    name: "Maintenance",
    description:
      "Scheduled attention that keeps efficiency where it was on day one.",
    lead: "A maintenance visit is worth paying for when it produces numbers. We measure the same things that were measured at commissioning and compare them.",
    process: [
      "Visit on schedule, before the heating and cooling seasons.",
      "Measure charge, airflow and static pressure.",
      "Compare against the commissioning record and flag any drift.",
      "Leave a written report with the figures on it.",
    ],
    includes: [
      "Scheduled visits, two or four a year",
      "Filters supplied and replaced",
      "Refrigerant charge and airflow checked",
      "Efficiency logged against commissioning",
    ],
    image: {
      src: photo("photo-1524230572899-a752b3835840"),
      alt: "White arched corridor receding into shadow",
    },
    sector: "both",
  },
  {
    id: "air-quality",
    number: "05",
    name: "Air Quality",
    description:
      "Filtration, humidity control and ventilation, measured rather than assumed.",
    lead: "Air quality claims are easy to make and hard to verify. We measure the room before specifying anything, and measure it again afterwards.",
    process: [
      "Measure particulates, CO2 and humidity in the occupied space.",
      "Identify whether the problem is filtration, ventilation rate or moisture.",
      "Specify to the measured load, not to a product category.",
      "Verify the ventilation rate after installation.",
    ],
    includes: [
      "Particulate and CO2 measurement",
      "Filtration specified to the load",
      "Humidity control",
      "Ventilation rates verified, not assumed",
    ],
    image: {
      src: photo("photo-1497604401993-f2e922e5cb0a"),
      alt: "White tiled architectural surface curving away from the camera",
    },
    sector: "both",
  },
  {
    id: "controls-zoning",
    number: "06",
    name: "Controls & Zoning",
    description:
      "Independent zones, scheduled setpoints, and a system that runs itself.",
    lead: "Most buildings waste more on schedules than on equipment. Zoning fixes the rooms that fight each other; scheduling fixes the hours nobody is in.",
    process: [
      "Map how the building is actually occupied, hour by hour.",
      "Group rooms into zones that behave the same way.",
      "Place sensors where they read the room, not the door.",
      "Configure schedules and hand over documentation.",
    ],
    includes: [
      "Zone planning, damper and valve layout",
      "Thermostat and sensor placement",
      "Schedules and setpoints configured",
      "Handover with the schedule documented",
    ],
    image: {
      src: photo("photo-1481253127861-534498168948"),
      alt: "Concrete and glass building elevation seen from below",
    },
    sector: "both",
  },
];
