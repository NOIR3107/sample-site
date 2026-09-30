/**
 * Testimonials and FAQs.
 *
 * The brief bans fabricated testimonials with invented names outright, so the
 * quotes here are deliberately empty slots. The component renders the frame,
 * the attribution structure and the context label, and marks the quote itself
 * as a placeholder. Drop real, attributable quotes in and the placeholder
 * treatment disappears on its own.
 */

export type Testimonial = {
  id: string;
  /** What kind of job the quote would come from. Real information. */
  context: string;
  /** Empty string means "not supplied yet"; the card renders a slot. */
  quote: string;
  attribution: string;
};

export const testimonials = {
  heading: "In their words",
  note: "These are empty slots, not invented quotes. Add real attributable ones in content/social-proof.ts.",
  items: [
    {
      id: "t1",
      context: "Residential, ducted heat pump retrofit",
      quote: "",
      attribution: "",
    },
    {
      id: "t2",
      context: "Commercial, out-of-hours plant replacement",
      quote: "",
      attribution: "",
    },
    {
      id: "t3",
      context: "Maintenance contract, third year",
      quote: "",
      attribution: "",
    },
  ] satisfies Testimonial[],
};

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Do you charge for a survey?",
    a: "Not for the first visit on a new system. We look at the building, talk about what it needs to do, and tell you whether we are the right people for it. Detailed load calculations are chargeable work and we say so before starting them.",
  },
  {
    q: "How quickly can you attend a breakdown?",
    a: "Contract holders get a four-hour response, which is written into the agreement. Everyone else is scheduled in the order the calls come in, usually within two working days.",
  },
  {
    q: "Will you work on a system somebody else installed?",
    a: "Yes. We will measure it before quoting, and if the original installation is the cause of the problem we will tell you that rather than working around it.",
  },
  {
    q: "Can you install without opening ceilings?",
    a: "Often, but not always. It depends on what routes already exist. We survey the chases first and size the system to what they can carry, rather than choosing equipment and then hunting for space.",
  },
  {
    q: "What do you hand over at the end of a job?",
    a: "The commissioning record: airflow per room, refrigerant charge by weight, static pressure across the coil, and the control schedule as configured. Keep it. Every future service visit is measured against it.",
  },
];
