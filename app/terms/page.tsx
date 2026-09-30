import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-doc";
import { getLegalDoc } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms covering use of the Meridian Climate website.",
};

export default async function TermsPage() {
  const doc = await getLegalDoc("terms");
  return <LegalDocument doc={doc} />;
}
