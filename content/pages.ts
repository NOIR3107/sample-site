import { siteImages } from "./projects";

/** Copy for the inner pages, kept out of components like everything else. */
export const pages = {
  services: {
    title: "Services",
    intro:
      "Six disciplines, one team. The same engineers who size the system commission it and come back to maintain it.",
    sectors: [
      {
        id: "residential",
        title: "Residential",
        lead: "Homes that hold their temperature. Zoned comfort, concealed plant, and equipment you never hear from the next room.",
        body: [
          "We don't start with a unit. We start with a heat loss calculation, room by room, and a plan for where the plant can live without being heard.",
          "Most of the homes we work on are retrofits, so the constraint is space rather than capacity. Duct routes come off the survey, not off a catalogue. Commissioning is documented per room, and you get the airflow figure for each one.",
        ],
        points: [
          "Room-by-room load calculation",
          "Concealed plant and lined duct runs",
          "Independent zoning with scheduled setpoints",
          "Commissioning data recorded per room",
        ],
        image: siteImages.residential,
      },
      {
        id: "commercial",
        title: "Commercial",
        lead: "Buildings that stay in specification. Designed for load, maintained on schedule, documented for compliance.",
        body: [
          "A building does not fail on the day the plant breaks. It fails slowly, on filters, on balance, and on paperwork nobody kept.",
          "We design for the load the building actually carries, phase installation around the hours it operates, and hand over a maintenance record an audit can read. Where we maintain a building, we forecast plant replacement before it becomes an emergency.",
        ],
        points: [
          "Load and plant sizing from survey data",
          "Phased and out-of-hours installation",
          "Refrigerant and statutory logging",
          "Plant replacement forecasting",
        ],
        image: siteImages.commercial,
      },
    ],
  },

  projects: {
    title: "Projects",
    intro:
      "Eight buildings, residential and commercial. Each entry lists what was installed, what constrained it, and what was measured afterwards.",
  },


  contact: {
    title: "Contact",
    intro:
      "Call if it is urgent. Otherwise book a visit below, pick a time that suits you, and we will call to confirm.",
    picker: {
      heading: "Book a visit",
      note: "Takes about a minute. Tell us what you need and when suits you, and we will call to confirm the time.",
    },
    prompts: {
      heading: "What helps us answer quickly",
      items: [
        "The building type and rough floor area",
        "What is installed now, if you know it",
        "Whether this is a fault, a replacement or a new system",
        "When someone can be on site",
      ],
    },
  },
};
