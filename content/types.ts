/**
 * Shapes for the local content layer. These are deliberately close to what a
 * Sanity schema would return so the swap in lib/content.ts stays a one-file
 * change. Nothing here imports from React.
 */

export type ImageRef = {
  /** Absolute URL. Every image URL on the site lives in /content. */
  src: string;
  /** Describes what is actually in the frame, not what we wish were there. */
  alt: string;
};

export type Sector = "residential" | "commercial";

export type Service = {
  /** Stable anchor target, e.g. /services/#system-design */
  id: string;
  /** Two-digit index rendered in mono: 01 ... 06 */
  number: string;
  name: string;
  description: string;
  /** Opening paragraph on the service detail page. */
  lead: string;
  /** How the work actually runs, numbered on the detail page. */
  process: string[];
  /** Shown when the service is expanded on /services/. */
  includes: string[];
  image: ImageRef;
  sector: Sector | "both";
};

export type Spec = {
  label: string;
  value: string;
};

/** Headline metadata strip on a project page. */
export type ProjectMeta = {
  client: string;
  location: string;
  capacity: string;
  systemType: string;
};

export type Project = {
  /** mc001 ... mc008 */
  slug: string;
  /** Displayed in mono as #MC001 */
  code: string;
  name: string;
  sector: Sector;
  location: string;
  year: string;
  /** [equipment] + [technical detail] + [measured outcome] */
  caption: string;
  meta: ProjectMeta;
  specs: Spec[];
  body: string[];
  cover: ImageRef;
  detail: ImageRef;
};

export type ProofItem = {
  label: string;
  value: string;
  /**
   * True when the value is a slot for the operator to fill in. Rendered with a
   * visible placeholder treatment rather than an invented number.
   */
  placeholder?: boolean;
};

export type NavItem = {
  label: string;
  href: string;
};
