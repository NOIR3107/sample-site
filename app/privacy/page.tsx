import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-doc";
import { getLegalDoc } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What Meridian Climate collects, what it does not, and how to ask for your data.",
};

export default async function PrivacyPage() {
  const doc = await getLegalDoc("privacy");
  return <LegalDocument doc={doc} />;
}
