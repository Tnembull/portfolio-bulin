import type { Metadata } from "next";
import { getProjectBySlugOrId } from "@/lib/supabase";
import ProjectDetailClient from "./ProjectDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlugOrId(slug);

  if (!project) {
    return {
      title: "Project Not Found | Muhammad Nur Ashiddiqi",
      description: "The requested engineering project could not be found.",
    };
  }

  const title = `${project.title} — ${project.category || "Engineering Project"}`;
  const description =
    project.longDescription ||
    project.description ||
    "Production engineering build overview by Muhammad Nur Ashiddiqi.";
  const canonicalUrl = `https://bulindev.tech/projects/${project.slug || project.id}`;
  const imageUrl = project.image || "https://bulindev.tech/opengraph-image";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.title} | Muhammad Nur Ashiddiqi`,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "Muhammad Nur Ashiddiqi — DevOps & Backend Engineer",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
          type: imageUrl.endsWith(".png") ? "image/png" : "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Tnembull",
      creator: "@Tnembull",
      title: `${project.title} | Muhammad Nur Ashiddiqi`,
      description,
      images: [
        {
          url: imageUrl,
          alt: project.title,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlugOrId(slug);

  return <ProjectDetailClient project={project || undefined} />;
}
