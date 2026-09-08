import type { Metadata } from "next";
import PageLayout from "@/components/app-layout/PageLayout";
import ExperienceTab from "@/components/tabs/ExperienceTab";

export const metadata: Metadata = {
  title: "Work Experience & Education | Muhammad Nur Ashiddiqi",
  description:
    "Explore the career history, professional roles, academic background, and industry credentials of Muhammad Nur Ashiddiqi — DevOps & Backend Engineer.",
  openGraph: {
    title: "Work Experience & Education | Muhammad Nur Ashiddiqi",
    description:
      "Career history, professional roles, and industry credentials of Muhammad Nur Ashiddiqi.",
    url: "https://bulindev.tech/experience",
    type: "website",
    siteName: "Muhammad Nur Ashiddiqi — DevOps & Backend Engineer",
  },
  alternates: {
    canonical: "https://www.bulindev.tech/experience",
  },
};

export default function ExperiencePage() {
  return (
    <PageLayout>
      <ExperienceTab />
    </PageLayout>
  );
}
