import type { Metadata } from "next";
import ProjectsClientView from "./ProjectsClientView";

export const metadata: Metadata = {
  title: "Projects & Engineering Builds | Muhammad Nur Ashiddiqi",
  description:
    "Explore the complete catalog of production DevOps architectures, automated CI/CD pipelines, Kubernetes container orchestration, and backend systems engineered by Muhammad Nur Ashiddiqi.",
  openGraph: {
    title: "Projects & Engineering Builds | Muhammad Nur Ashiddiqi",
    description:
      "Explore the complete catalog of production DevOps architectures, automated CI/CD pipelines, Kubernetes container orchestration, and backend systems.",
    url: "https://bulindev.tech/projects",
    type: "website",
    siteName: "Muhammad Nur Ashiddiqi — DevOps & Backend Engineer",
    images: [
      {
        url: "https://bulindev.tech/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Muhammad Nur Ashiddiqi — Engineered Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Engineering Builds | Muhammad Nur Ashiddiqi",
    description:
      "Explore the complete catalog of production DevOps architectures, automated CI/CD pipelines, Kubernetes container orchestration, and backend systems.",
    images: ["https://bulindev.tech/opengraph-image"],
  },
};

export default function AllProjectsPage() {
  return <ProjectsClientView />;
}
