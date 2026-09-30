/**
 * Placeholder legal copy for a demonstration build. It is deliberately short
 * and factual. Anything a real operator must supply is marked inline so it
 * cannot ship unnoticed.
 */

export type LegalDoc = {
  slug: "privacy" | "terms";
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

export const legalDocs: Record<LegalDoc["slug"], LegalDoc> = {
  privacy: {
    slug: "privacy",
    title: "Privacy",
    updated: "September 2026",
    intro:
      "This site does not run analytics, does not set cookies, and loads no third-party content unless you ask it to. The only personal data we hold is what you send us directly.",
    sections: [
      {
        heading: "What we collect",
        body: [
          "Nothing automatically. There is no analytics script, no advertising pixel and no cookie banner, because there is nothing to consent to.",
          "If you call or email us, we hold your name, your contact details and the details of the work you are asking about, for as long as we need them to do the work and to meet our record-keeping obligations.",
        ],
      },
      {
        heading: "The map",
        body: [
          "The contact page shows a map only after you press View on map. Until you press it, nothing is requested from any mapping service and no third party knows you visited.",
          "Once you press it, map tiles are loaded from OpenStreetMap, which will see your IP address as it would for any image you load from another site. We send no referrer with that request. Pressing Directions opens Google Maps in a new tab, at which point Google's own terms apply.",
        ],
      },
      {
        heading: "Images",
        body: [
          "Photography on this site is served through an image optimizer, which requests the source file from its origin. No visitor information is passed to that origin beyond what any image request contains.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Write to the email address on the contact page and we will respond inside 30 days.",
        ],
      },
      {
        heading: "Contact",
        body: [
          "Questions about this notice go to the email address on the contact page. The registered entity and any required regulator details should be added here before launch.",
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms",
    updated: "September 2026",
    intro:
      "These terms cover use of this website. They do not cover installation or service work, which is governed by the written contract for that job.",
    sections: [
      {
        heading: "Accuracy",
        body: [
          "Project figures, specifications and prices on this site are illustrative and are not an offer. Nothing here forms a quotation. Work is quoted after a survey of the actual building.",
        ],
      },
      {
        heading: "Use of the site",
        body: [
          "You may read, link to and quote this site. You may not copy its text, photography or layout for another commercial site.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "We keep this site accurate, but we do not warrant that it is free of error. We are not liable for decisions taken on the basis of this site alone rather than on a survey.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "These terms are governed by the law of the State of Oregon. Substitute the correct jurisdiction and registered entity before launch.",
        ],
      },
    ],
  },
};
