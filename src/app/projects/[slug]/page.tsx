import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Proyek Tidak Ditemukan",
    };
  }

  const title = `${project.title} — ${project.category}`;
  const description = project.description;
  const imageUrl = project.image;

  return {
    title,
    description,
    openGraph: {
      title: `${project.title} | Muhammad Nur Ashiddiqi`,
      description: project.description,
      type: "article",
      url: `https://bulindev.tech/projects/${project.slug}`,
      siteName: "Muhammad Nur Ashiddiqi — DevOps Engineer",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Muhammad Nur Ashiddiqi`,
      description: project.description,
      images: [imageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  return <ProjectDetailClient project={project} />;
}
