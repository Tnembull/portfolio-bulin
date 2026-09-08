import type { Metadata } from "next";
import PageLayout from "@/components/app-layout/PageLayout";
import SkillsTab from "@/components/tabs/SkillsTab";

export const metadata: Metadata = {
  title: "Technical Skills & Capabilities | Muhammad Nur Ashiddiqi",
  description:
    "Explore the technical skills, cloud infrastructure expertise, DevOps tooling, programming languages, and industry certifications of Muhammad Nur Ashiddiqi.",
  openGraph: {
    title: "Technical Skills & Capabilities | Muhammad Nur Ashiddiqi",
    description:
      "Cloud infrastructure, DevOps, programming languages, and technical capabilities of Muhammad Nur Ashiddiqi.",
    url: "https://bulindev.tech/skills",
    type: "website",
    siteName: "Muhammad Nur Ashiddiqi — DevOps & Backend Engineer",
  },
  alternates: {
    canonical: "https://www.bulindev.tech/skills",
  },
};

export default function SkillsPage() {
  return (
    <PageLayout>
      <SkillsTab />
    </PageLayout>
  );
}
