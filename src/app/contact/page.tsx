import type { Metadata } from "next";
import PageLayout from "@/components/app-layout/PageLayout";
import ContactTab from "@/components/tabs/ContactTab";

export const metadata: Metadata = {
  title: "Contact & Collaboration | Muhammad Nur Ashiddiqi",
  description:
    "Get in touch with Muhammad Nur Ashiddiqi — DevOps & Backend Engineer. Available for cloud infrastructure consulting, backend architecture, and engineering collaborations.",
  openGraph: {
    title: "Contact & Collaboration | Muhammad Nur Ashiddiqi",
    description:
      "Initiate collaboration or reach out to Muhammad Nur Ashiddiqi — DevOps & Backend Engineer.",
    url: "https://bulindev.tech/contact",
    type: "website",
    siteName: "Muhammad Nur Ashiddiqi — DevOps & Backend Engineer",
  },
  alternates: {
    canonical: "https://www.bulindev.tech/contact",
  },
};

export default function ContactPage() {
  return (
    <PageLayout>
      <ContactTab />
    </PageLayout>
  );
}
