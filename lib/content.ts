/**
 * THE CONTENT ACCESS LAYER.
 *
 * Components import from here and never from /content directly. Types are
 * re-exported through this file too, so a component that only imports from
 * `@/lib/content` has no compile-time knowledge of where the data lives.
 *
 * Every getter is async even though it returns a local array. That is the
 * whole point: swapping these bodies for Sanity `client.fetch(...)` calls
 * changes this file and nothing else. See README, "Moving to Sanity".
 */

import { site, primaryNav, footerNav, legalNav } from "@/content/site";
import { services } from "@/content/services";
import { projects, siteImages } from "@/content/projects";
import { home } from "@/content/home";
import { pages } from "@/content/pages";
import { about, type Value, type TeamMember } from "@/content/about";
import { posts, type Post } from "@/content/blog";
import {
  testimonials,
  faqs,
  type Testimonial,
  type Faq,
} from "@/content/social-proof";
import { legalDocs, type LegalDoc } from "@/content/legal";
import type {
  ProjectMeta,
  ImageRef,
  NavItem,
  ProofItem,
  Project,
  Sector,
  Service,
  Spec,
} from "@/content/types";

export type {
  Faq,
  Post,
  ProjectMeta,
  TeamMember,
  Testimonial,
  Value,
  ImageRef,
  LegalDoc,
  NavItem,
  ProofItem,
  Project,
  Sector,
  Service,
  Spec,
};

/* -- Site ---------------------------------------------------------------- */

export async function getSite() {
  return site;
}

export async function getNav(): Promise<{
  primary: NavItem[];
  footer: NavItem[];
  legal: NavItem[];
}> {
  return { primary: primaryNav, footer: footerNav, legal: legalNav };
}

export async function getSiteImages() {
  return siteImages;
}

/* -- Pages --------------------------------------------------------------- */

export async function getHome() {
  return home;
}

export async function getPage<K extends keyof typeof pages>(key: K) {
  return pages[key];
}

export async function getAbout() {
  return about;
}

export async function getTestimonials() {
  return testimonials;
}

export async function getFaqs(): Promise<Faq[]> {
  return faqs;
}

export async function getLegalDoc(slug: LegalDoc["slug"]): Promise<LegalDoc> {
  return legalDocs[slug];
}

/**
 * Prefills the subject line so an enquiry arrives already labelled with the
 * service it is about. This is how a customer "selects" a service on a site
 * with no server actions and no form handler.
 */
export function enquiryHref(mailtoHref: string, subject: string): string {
  return `${mailtoHref}?subject=${encodeURIComponent(subject)}`;
}

/* -- Collections --------------------------------------------------------- */

export async function getServices(): Promise<Service[]> {
  return services;
}

/* -- Services ------------------------------------------------------------ */

export async function getService(id: string): Promise<Service | null> {
  return services.find((s) => s.id === id) ?? null;
}

export async function getServiceIds(): Promise<string[]> {
  return services.map((s) => s.id);
}

/** Two siblings, wrapping, so a service page never dead-ends. */
export async function getRelatedServices(
  id: string,
  count = 2,
): Promise<Service[]> {
  const index = services.findIndex((s) => s.id === id);
  if (index === -1) return services.slice(0, count);
  return Array.from(
    { length: count },
    (_, i) => services[(index + i + 1) % services.length],
  );
}

/* -- Blog ---------------------------------------------------------------- */

export async function getPosts(): Promise<Post[]> {
  return [...posts].sort((a, b) => b.datetime.localeCompare(a.datetime));
}

export async function getPost(slug: string): Promise<Post | null> {
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPostSlugs(): Promise<string[]> {
  return posts.map((p) => p.slug);
}

export async function getRecentPosts(count = 4): Promise<Post[]> {
  return (await getPosts()).slice(0, count);
}

/* -- Projects ------------------------------------------------------------ */

export async function getProjects(): Promise<Project[]> {
  return projects;
}

/** The homepage strip shows the first four. */
export async function getFeaturedProjects(count = 4): Promise<Project[]> {
  return projects.slice(0, count);
}

/** The second image of each project, which appears nowhere else on the homepage. */
export async function getProjectDetails() {
  return projects.map((p) => ({
    slug: p.slug,
    code: p.code,
    name: p.name,
    image: p.detail,
  }));
}

export async function getProject(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getProjectSlugs(): Promise<string[]> {
  return projects.map((p) => p.slug);
}

/**
 * Wraps at the end so the portfolio loops instead of dead-ending on MC008.
 * Returns null only if the slug is unknown.
 */
export async function getNextProject(slug: string): Promise<Project | null> {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  return projects[(index + 1) % projects.length];
}
